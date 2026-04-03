import { Footer } from "@/components.v2/index.components";
import FeaturedNews from "@/components.v3/home/FeaturedNews";
import { REGISTER_WEBINAR, WEBINAR_DETAILS } from "../api/URLs";
import { Lato, Open_Sans } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./webinar.module.css";

const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"] });
const openSans = Open_Sans({
  weight: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
});

type WebinarPayload = Record<string, unknown>;

const SPEAKER_LINKEDIN = "https://www.linkedin.com/in/nitya-shah-25ba53187/";
const SPEAKER_X = "https://x.com/NityaShah2000";
const SPEAKER_IMAGE_URL = "/itya.png" ?? "";

function ordinalSuffix(n: number): string {
  const j = n % 10;
  const k = n % 100;
  if (k >= 11 && k <= 13) return `${n}th`;
  if (j === 1) return `${n}st`;
  if (j === 2) return `${n}nd`;
  if (j === 3) return `${n}rd`;
  return `${n}th`;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;
const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

function parseWebinarDate(raw?: string): Date | null {
  if (!raw?.trim()) return null;
  const s = raw.trim();
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    const y = parseInt(iso[1], 10);
    const m = parseInt(iso[2], 10) - 1;
    const d = parseInt(iso[3], 10);
    const dt = new Date(y, m, d, 12, 0, 0, 0);
    return isNaN(dt.getTime()) ? null : dt;
  }
  const dmy = s.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})/);
  if (dmy) {
    const dt = new Date(parseInt(dmy[3], 10), parseInt(dmy[2], 10) - 1, parseInt(dmy[1], 10), 12, 0, 0, 0);
    return isNaN(dt.getTime()) ? null : dt;
  }
  const parsed = new Date(s);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function formatDateWithDay(dateStr?: string): string {
  const d = parseWebinarDate(dateStr);
  if (!d) return "";
  const day = ordinalSuffix(d.getDate());
  const month = MONTH_NAMES[d.getMonth()];
  const year = d.getFullYear();
  const dow = WEEKDAY_NAMES[d.getDay()];
  return `${day} ${month}, ${year} - ${dow}`;
}

function formatTime(t?: string) {
  if (!t) return "";
  return String(t).slice(0, 5);
}

function formatDateLine(dateStr?: string, start?: string, end?: string) {
  const formatted = formatDateWithDay(dateStr);
  if (!formatted) return "Date & time TBA";
  const startT = formatTime(start);
  const endT = formatTime(end);
  if (startT && endT) return `${formatted} · ${startT} – ${endT} IST`;
  return formatted;
}

const AGENDA = [
  { n: "01", t: "What Drives Stock Prices", b: "Stock prices follow earnings — but it's the triggers that get you there first. Business and sector triggers that drive earnings growth, and how identifying them early is the real edge in investing." },
  { n: "02", t: "Identifying Business Moats", b: "What makes a business durable over time — pricing power, switching costs, network effects, and how to spot them." },
  { n: "03", t: "Valuation Frameworks That Work", b: "Practical valuation methods beyond the P/E ratio — how to determine if a business is cheap, fair, or expensive." },
  { n: "04", t: "Assessing Management Quality", b: "Reading promoter behaviour, corporate governance signals, and how to verify what the numbers don't say." },
  { n: "05", t: "When to Buy, Hold & Sell", b: "Entry and exit frameworks — how to think about conviction, position sizing, and managing emotions around price movements." },
  { n: "06", t: "Building a Portfolio with Intent", b: "Diversification, concentration, sector allocation — how to construct a portfolio that reflects your thesis, not just noise." },
  { n: "07", t: "Risk Management & Margin of Safety", b: "Protecting the downside — how to size positions, avoid blowups, and think about risk before thinking about returns." },
  { n: "08", t: "Live Q&A", b: "Ask Nitya Shah anything — frameworks, sectors, real case studies. Nothing is off the table." },
];

function isValidInMobile10(digits: string) {
  return /^[6-9]\d{9}$/.test(digits);
}

function WebinarPublicPageInner() {
  const router = useRouter();
  const slug = useMemo(() => {
    if (!router.isReady) return "";
    const s = router.query.slug;
    if (!s) return "";
    return Array.isArray(s) ? s[0] : s;
  }, [router.isReady, router.query.slug]);

  const whatsappCampaignName = useMemo(() => {
    const q = router.query;
    const w = typeof q.whatsapp_campaign_name === "string" ? q.whatsapp_campaign_name : "";
    const u = typeof q.utm_campaign === "string" ? q.utm_campaign : "";
    const fromQuery = (w || u || "").trim();
    const fromEnv = (process.env.NEXT_PUBLIC_WEBINAR_WHATSAPP_CAMPAIGN ?? "").trim();
    return fromQuery || fromEnv;
  }, [router.query]);

  const [data, setData] = useState<WebinarPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [city, setCity] = useState("");
  const [experience, setExperience] = useState("");
  const [source, setSource] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    let cancelled = false;
    if (!slug) {
      setLoading(false);
      setErr("Webinar not found");
      return;
    }
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const url = WEBINAR_DETAILS(slug);
        const res = await fetch(url, { method: "GET" });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error((json as { message?: string })?.message || "Webinar not found");
        }
        if (!cancelled) setData(json?.data ?? json);
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router.isReady, slug]);

  const heading = String(data?.heading ?? data?.title ?? "Webinar");
  const title = String(data?.title ?? "");
  const description = String(data?.description ?? "");
  const date = String(data?.date ?? "");
  const startTime = String(data?.start_time ?? "");
  const endTime = String(data?.end_time ?? "");
  const isFree = data?.is_free !== false;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setToast("Please enter your name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setToast("Please enter a valid email.");
      return;
    }
    if (!phoneLocal.trim()) {
      setToast("Please enter your 10-digit mobile number.");
      return;
    }
    if (!isValidInMobile10(phoneLocal)) {
      setToast("Enter a valid 10-digit Indian mobile number (starts with 6–9).");
      return;
    }
    const mobile = `+91${phoneLocal}`;
    setSubmitting(true);
    setToast(null);
    try {
      const res = await fetch(REGISTER_WEBINAR, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          full_name: name.trim(),
          email: email.trim(),
          mobile,
          city: city.trim(),
          experience: experience || "",
          how_did_you_hear_about_us: source || "",
          whatsapp_campaign_name: whatsappCampaignName,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((j as { message?: string })?.message || "Registration failed");
      }
      setDone(true);
    } catch (e) {
      setToast(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  if (!router.isReady || loading) {
    return (
      <>
        <Head>
          <title>Webinar | Kamayakya</title>
          <meta name="robots" content="index,follow" />
        </Head>
        <div className={`${styles.page} ${lato.className}`} style={{ padding: 120, textAlign: "center" }}>
          Loading…
        </div>
      </>
    );
  }

  if (err || !data) {
    return (
      <div className={`${styles.page} ${lato.className}`}>
        <Head>
          <title>Webinar | Kamayakya</title>
          <meta name="robots" content="noindex" />
        </Head>
        <div className={styles.errorBox}>
          <h1 className={openSans.className} style={{ fontSize: 24, marginBottom: 12 }}>
            {err || "Not found"}
          </h1>
          <Link href="https://www.kamayakya.com" style={{ color: "#125b54" }}>
            Back to Kamayakya
          </Link>
        </div>
      </div>
    );
  }

  const eyebrow = formatDateLine(date, startTime, endTime);
  const dateDisplay = formatDateWithDay(date) || "Date TBA";
  const timeDisplay =
    formatTime(startTime) && formatTime(endTime)
      ? `${formatTime(startTime)} – ${formatTime(endTime)} IST`
      : "Time TBA";
  const metaDesc =
    description.length > 10 ? description.substring(0, 160) : "Register for the Kamayakya webinar.";

  return (
    <>
      <Head>
        <title>Kamayakya | {heading}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={`https://www.kamayakya.com/webinar/${slug}`} />
        <meta property="og:title" content={`Kamayakya | ${heading}`} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={`https://www.kamayakya.com/webinar/${slug}`} />
        <meta property="og:type" content="website" />
      </Head>
      <div className={`${styles.page} ${lato.className}`}>
        <nav className={styles.nav}>
          <a className={styles.navLogo} href="https://www.kamayakya.com" target="_blank" rel="noreferrer">
            <span className={styles.k1}>Kamaya</span>
            <span className={styles.k2}>Kya</span>
          </a>
          <div className={styles.navBadge}>Free Masterclass</div>
        </nav>

        <section className={styles.hero} id="top">
          <div className={styles.heroLeft}>
            <div className={`${styles.eyebrow} ${openSans.className}`}>{eyebrow}</div>
            <h1 className={openSans.className}>
              {heading}
              {title ? (
                <span className={styles.accent}>{title}</span>
              ) : (
                <span className={styles.accent}>Investing Masterclass</span>
              )}
            </h1>
            <div className={styles.heroDivider} />
            <p className={styles.heroSub}>
              {description ||
                "A free, live session on how to research and invest with conviction — the same playbook our analysts use every day. Open to all investors across India."}
            </p>
            <div className={styles.eventMeta}>
              <div className={styles.metaItem}>
                <div className={styles.metaIcon}>📅</div>
                <div className={styles.metaText}>
                  <strong>{dateDisplay}</strong>
                  <span>{timeDisplay}</span>
                </div>
              </div>
              <div className={styles.metaItem}>
                <div className={styles.metaIcon}>💻</div>
                <div className={styles.metaText}>
                  <strong>Online — Live</strong>
                  <span>Details shared on registration</span>
                </div>
              </div>
              <div className={styles.metaItem}>
                <div className={styles.metaIcon}>🎓</div>
                <div className={styles.metaText}>
                  <strong>{isFree ? "100% Free" : "Paid session"}</strong>
                  <span>{isFree ? "No cost, no catch" : ""}</span>
                </div>
              </div>
            </div>
            <a href="#learn" className={`${styles.ctaBtn} ${openSans.className}`}>
              See What&apos;s Inside
            </a>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroFormWrap}>
              {!done ? (
                <div>
                  <p className={`${styles.formTitle} ${openSans.className}`}>Secure Your Spot</p>
                  <p className={styles.formSub}>{eyebrow}</p>
                  <form onSubmit={onSubmit}>
                    <div className={styles.formGroup}>
                      <label>
                        Full Name <span>*</span>
                      </label>
                      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" required />
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>
                          Email <span>*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>
                          Mobile <span>*</span>
                        </label>
                        <div className={styles.phoneRow}>
                          <span className={styles.phonePrefix}>+91</span>
                          <input
                            className={styles.phoneInput}
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel-national"
                            value={phoneLocal}
                            onChange={(e) => setPhoneLocal(e.target.value.replace(/\D/g, "").slice(0, 10))}
                            placeholder="98765 43210"
                            required
                            aria-label="Mobile number (10 digits, India)"
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>City</label>
                        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Mumbai, Delhi…" />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Experience</label>
                        <select value={experience} onChange={(e) => setExperience(e.target.value)}>
                          <option value="">Select</option>
                          <option>Just starting out</option>
                          <option>1–3 years</option>
                          <option>3–7 years</option>
                          <option>7+ years</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>How did you hear about us?</label>
                      <select value={source} onChange={(e) => setSource(e.target.value)}>
                        <option value="">Select a source</option>
                        <option>Instagram / Facebook</option>
                        <option>Google</option>
                        <option>WhatsApp / Telegram</option>
                        <option>Smallcase Platform</option>
                        <option>Friend / Referral</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <button type="submit" className={`${styles.formSubmit} ${openSans.className}`} disabled={submitting}>
                      {submitting ? "Registering…" : "Register Free"}
                    </button>
                    <p className={styles.formDisclaimer}>
                      We respect your privacy. Your details will only be used to send you the webinar link and relevant
                      updates from Kamayakya Research.
                    </p>
                  </form>
                </div>
              ) : (
                <div className={styles.successBox}>
                  <div className={styles.successCheck}>✓</div>
                  <h3 className={`${openSans.className}`} style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>
                    You&apos;re Registered!
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.65 }}>
                    We&apos;ll send the webinar link to your email before the session. See you there!
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.learnSection}`} id="learn">
          <div className={`${styles.sectionLabel} ${openSans.className}`}>Session Agenda</div>
          <h2 className={`${styles.sectionTitle} ${openSans.className}`}>What You&apos;ll Learn</h2>
          <p className={styles.sectionBody}>
            {description ||
              "A no-fluff, practical masterclass on the fundamentals of smart investing — from finding ideas to building conviction to managing a portfolio."}
          </p>
          <p className={styles.learnNote}>
            Practical frameworks you can use immediately — no jargon, no fluff.
          </p>
          <div className={styles.learnGrid}>
            {AGENDA.map((a) => (
              <div key={a.n} className={styles.learnCard}>
                <div className={`${styles.cardNum} ${openSans.className}`}>Agenda {a.n}</div>
                <h3 className={`${openSans.className} text-center`}>{a.t}</h3>
                <p className={"text-center "}>{a.b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.numbersSection}>
          <div className={`${styles.sectionLabel} ${openSans.className}`}>By The Numbers</div>
          <h2 className={`${styles.sectionTitle} ${openSans.className}`}>Numbers That Speak</h2>
          <p className={styles.sectionBody} style={{ marginBottom: 0 }}>
            Three years of rigorous research, ground-up analysis, and trust.
          </p>
          <div className={styles.numbersGrid}>
            {[
              { v: "6,000+", l: "Delighted Investors" },
              { v: "80+", l: "Stock Recommendations" },
              { v: "₹55 Cr+", l: "AUM on Smallcase" },
              { v: "50+", l: "Plant Visits & 300+ Management Interactions" },
            ].map((x) => (
              <div key={x.l} className={styles.numberCard}>
                <div className={`${styles.numberVal} ${openSans.className}`}>{x.v}</div>
                <div className={styles.numberLabel}>{x.l}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.speakerSection}>
          <div className={`${styles.sectionLabel} ${openSans.className}`}>About the Speaker</div>
          <h2 className={`${styles.sectionTitle} ${openSans.className}`} style={{ marginBottom: 4 }}>
            Meet Nitya Shah
          </h2>
          <p className={`${styles.speakerHeaderRole} ${openSans.className}`}>
            Co-founder, Kamayakya Wealth Management Pvt. Ltd.
          </p>
          <div className={styles.speakerInner}>
            <div className={styles.speakerLeftCol}>
              <div className={styles.speakerPhotoFrame}>
                {SPEAKER_IMAGE_URL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={SPEAKER_IMAGE_URL} alt="Nitya Shah" className={styles.speakerPhoto} />
                ) : (
                  <div className={styles.speakerPhotoPlaceholder}>NS</div>
                )}
              </div>
              <div className={styles.speakerSocials}>
                <a
                  href={SPEAKER_LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialLogoLink}
                  title="Nitya on LinkedIn"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iMTAiIGZpbGw9IiMwQTY2QzIiLz48cmVjdCB4PSI5IiB5PSIxOCIgd2lkdGg9IjciIGhlaWdodD0iMjEiIHJ4PSIxIiBmaWxsPSJ3aGl0ZSIvPjxjaXJjbGUgY3g9IjEyLjUiIGN5PSIxMS41IiByPSI0IiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0yMCAxOGg2LjV2M3MyLTMuNSA3LTMuNWM2IDAgOSA0IDkgMTB2MTEuNUgzNlYyOWMwLTMtMS41LTUtNC41LTVzLTUgMi01IDV2MTBIMjBWMTh6IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg=="
                    alt="LinkedIn"
                    width={44}
                    height={44}
                    style={{ display: "block", borderRadius: 10 }}
                  />
                </a>
                <a href={SPEAKER_X} target="_blank" rel="noreferrer" className={styles.socialLogoLink} title="Nitya on X">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iMTAiIGZpbGw9IiMwMDAwMDAiLz48cGF0aCBkPSJNOSA5aDkuNWw3LjUgMTAuOEwzNC4yIDlINDJMMjkuNSAyMy41IDQzIDM5aC05LjVsLTguMi0xMS41TDE2IDM5SDguNUwyMS41IDI0eiIgZmlsbD0id2hpdGUiLz48L3N2Zz4="
                    alt="X"
                    width={44}
                    height={44}
                    style={{ display: "block", borderRadius: 10 }}
                  />
                </a>
              </div>
            </div>
            <div className={styles.speakerBio}>
              <div className={styles.bioItems}>
                <div className={styles.bioItem}>
                  <div className={styles.bioIcon}>🎓</div>
                  <div>
                    <p className={`${styles.bioItemTitle} ${openSans.className}`}>Qualified Analyst</p>
                    <p className={styles.bioItemBody}>
                      MSc Investment Management from Bayes Business School, London (Cass), CFA Level 1 cleared, M.Com from
                      Pune University, NISM RA &amp; PMS exams cleared.
                    </p>
                  </div>
                </div>
                <div className={styles.bioItem}>
                  <div className={styles.bioIcon}>📈</div>
                  <div>
                    <p className={`${styles.bioItemTitle} ${openSans.className}`}>Investment Experience</p>
                    <p className={styles.bioItemBody}>
                      5+ years in equity investing with a sharp focus on fundamental, ground-up research.
                    </p>
                  </div>
                </div>
                <div className={styles.bioItem}>
                  <div className={styles.bioIcon}>🔬</div>
                  <div>
                    <p className={`${styles.bioItemTitle} ${openSans.className}`}>Product &amp; Research Expertise</p>
                    <p className={styles.bioItemBody}>
                      2 years in product development and research at a SEBI RIA firm, building actionable investment
                      frameworks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedNews />

        <Footer />

        {toast ? <div className={`${styles.toast} ${styles.toastShow}`}>{toast}</div> : null}
      </div>
    </>
  );
}

export default WebinarPublicPageInner;
