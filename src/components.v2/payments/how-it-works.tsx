import React, { useState, useEffect, useRef } from "react";
import { ContactModal } from "@/components.v2/payments/contact-modal";

const PHASE_THEMES = {
  1: {
    accent: "#125b54",
    accentSoft: "rgba(18, 91, 84, 0.08)",
    accentGlow: "rgba(18, 91, 84, 0.18)",
  },
  2: {
    accent: "#B35300",
    accentSoft: "rgba(255, 158, 41, 0.1)",
    accentGlow: "rgba(255, 158, 41, 0.22)",
  },
  3: {
    accent: "#142d51",
    accentSoft: "rgba(20, 45, 81, 0.08)",
    accentGlow: "rgba(20, 45, 81, 0.2)",
  },
};

/* ─── Custom Scrollable Trail ─────────────────────────────────────────────── */
const ScrollableTrail = ({
  children,
  active,
  theme,
}: {
  children: React.ReactNode;
  active: boolean;
  theme: typeof PHASE_THEMES[1];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [thumbTop, setThumbTop] = useState(0);
  const [showScrollbar, setShowScrollbar] = useState(false);

  const draggingRef = useRef<{
    dragging: boolean;
    startY: number;
    startScroll: number;
  }>({ dragging: false, startY: 0, startScroll: 0 });

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) { setShowScrollbar(false); return; }
    setShowScrollbar(true);
    const ratio = scrollTop / maxScroll;
    const maxThumb = clientHeight - 64 - 32;
    setThumbTop(Math.max(0, ratio * maxThumb));
  };

  const getPointerY = (e: MouseEvent | TouchEvent) => {
    if ("touches" in e && e.touches.length) return e.touches[0].clientY;
    return (e as MouseEvent).clientY;
  };

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (e.type === "mousedown" && (e as React.MouseEvent).button !== 0) return;
    if (e.type === "mousedown") e.preventDefault();
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const scrollEl = containerRef.current;
    if (!scrollEl) return;
    draggingRef.current = { dragging: true, startY: clientY, startScroll: scrollEl.scrollTop };
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const scrollEl = containerRef.current;
    if (!scrollEl) return;
    const target = e.target as HTMLElement;
    if (target.closest(".phase-scrollbar-thumb")) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const thumbH = 32;
    const trackH = rect.height;
    const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
    const pct = scrollEl.scrollTop / maxScroll;
    const thumbTopPos = pct * (trackH - thumbH);
    const thumbMidY = thumbTopPos + thumbH / 2;
    const direction = clickY > thumbMidY ? 1 : -1;
    scrollEl.scrollBy({ top: direction * scrollEl.clientHeight * 0.85, behavior: "smooth" });
  };

  useEffect(() => {
    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current.dragging) return;
      const scrollEl = containerRef.current;
      if (!scrollEl) return;
      const y = getPointerY(e);
      const dy = y - draggingRef.current.startY;
      const trackHeight = scrollEl.clientHeight - 64;
      const thumbHeight = 32;
      const trackRange = trackHeight - thumbHeight;
      if (trackRange <= 0) return;
      const scrollRange = scrollEl.scrollHeight - scrollEl.clientHeight;
      scrollEl.scrollTop = draggingRef.current.startScroll + (dy / trackRange) * scrollRange;
      if (e.cancelable) e.preventDefault();
    };
    const handleDragEnd = () => {
      if (!draggingRef.current.dragging) return;
      draggingRef.current.dragging = false;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
    window.addEventListener("mousemove", handleDragMove, { passive: false });
    window.addEventListener("touchmove", handleDragMove, { passive: false });
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchend", handleDragEnd);
    window.addEventListener("touchcancel", handleDragEnd);
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
      window.removeEventListener("touchcancel", handleDragEnd);
    };
  }, []);

  useEffect(() => {
    if (active) {
      if (containerRef.current) containerRef.current.scrollTop = 0;
      handleScroll();
      const t = setTimeout(handleScroll, 100);
      window.addEventListener("resize", handleScroll);
      return () => { clearTimeout(t); window.removeEventListener("resize", handleScroll); };
    }
  }, [active, children]);

  return (
    <div className="flex-1 min-h-0 overflow-hidden relative">
      {/* Fade overlays */}
      <div
        className="phase-trail-fade-top absolute left-0 right-0 top-0 h-[38px] pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.85) 40%, transparent 100%)" }}
        aria-hidden="true"
      />
      <div
        className="phase-trail-fade-bot absolute left-0 right-0 bottom-0 h-[38px] pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.85) 40%, transparent 100%)" }}
        aria-hidden="true"
      />

      {/* Scrollable content */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="phase-trail h-full w-full overflow-y-auto lg:overscroll-contain py-8 pl-3 pr-7 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9e29] focus-visible:ring-offset-4"
        tabIndex={0}
      >
        {children}
      </div>

      {/* Custom scrollbar */}
      {showScrollbar && (
        <div
          onClick={handleTrackClick}
          className="phase-scrollbar absolute top-8 bottom-8 right-[6px] w-[14px] z-20 pointer-events-auto transition-opacity duration-200 cursor-pointer"
        >
          <div className="absolute left-1/2 -ml-[1px] top-0 bottom-0 w-[2px] bg-[#e8dfc9] rounded-full" />
          <div
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            style={{ transform: `translateY(${thumbTop}px)`, backgroundColor: theme.accent }}
            className="phase-scrollbar-thumb absolute left-1/2 -ml-[7px] w-[14px] h-8 rounded-full pointer-events-auto cursor-grab flex flex-col justify-center items-center gap-[2.5px] will-change-transform transition-colors duration-200"
          >
            <span className="block w-[7px] h-[1.2px] bg-white/90 rounded-[1px]" />
            <span className="block w-[7px] h-[1.2px] bg-white/90 rounded-[1px]" />
            <span className="block w-[7px] h-[1.2px] bg-white/90 rounded-[1px]" />
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Step Card ───────────────────────────────────────────────────────────── */
const StepCard = ({
  stepNum,
  title,
  copy,
  miniArt,
  miniTitle,
  miniSub,
  isLast,
  active,
  delayIdx,
}: {
  stepNum: string;
  title: string;
  copy: string;
  miniArt: React.ReactNode;
  miniTitle: string;
  miniSub: string;
  isLast: boolean;
  theme: typeof PHASE_THEMES[1];
  active: boolean;
  delayIdx: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasBeenActive, setHasBeenActive] = useState(false);

  useEffect(() => {
    if (!active) { setIsIntersecting(false); setHasBeenActive(false); return; }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsIntersecting(true); setHasBeenActive(true); }
        else setIsIntersecting(false);
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [active]);

  return (
    <article
      ref={ref}
      style={{ animationDelay: `${delayIdx * 90 + 80}ms` }}
      className={`step relative pl-12 md:pl-[52px] py-5 md:py-6 min-h-[144px] md:min-h-[168px] translate-y-2 opacity-0 step-enter-anim ${isLast ? "step-line-last" : "step-line-normal"
        } ${isIntersecting ? "is-active" : ""} ${hasBeenActive ? "has-been-active" : ""}`}
    >
      <span className="step-num" aria-hidden="true">{stepNum}</span>

      <h4 className="step-title text-[20px] font-bold leading-[1.3] text-[#0b3a36] mb-2 tracking-[-0.005em] transition-colors duration-300">
        {title}
      </h4>
      <p
        className="step-copy text-[15.5px] leading-[1.65] text-[#5a6e6a] mb-3.5 max-w-[46ch] [&_strong]:text-[#1a3530] [&_strong]:font-bold transition-colors duration-300"
        dangerouslySetInnerHTML={{ __html: copy }}
      />

      <div className="mt-1.5 p-3 md:py-3 md:px-4 bg-white border border-[#e8dfc9] rounded-xl inline-flex items-center gap-3.5 min-h-[64px] w-full max-w-[440px] relative overflow-hidden">
        <div className="flex-shrink-0 w-12 h-12 grid place-items-center select-none">
          {miniArt}
        </div>
        <div className="text-[12px] tracking-[0.02em] text-[#5a6e6a] leading-normal min-w-0">
          <b className="text-[13.5px] font-bold text-[#1a3530] block mb-0.5 tracking-normal">
            {miniTitle}
          </b>
          {miniSub}
        </div>
      </div>
    </article>
  );
};

/* ─── Phase Column Layout ─────────────────────────────────────────────────── */
interface PhaseColProps {
  svgContent: React.ReactNode;
  phaseLabel: string;
  phaseSubtitle: string;
  phaseNumeral: string;
  phaseHeadLabel: string;
  phaseHeadTitle: string;
  trailContent: React.ReactNode;
  isActive: boolean;
  theme: typeof PHASE_THEMES[1];
}

const PhaseColumns = ({
  svgContent,
  phaseLabel,
  phaseSubtitle,
  phaseNumeral,
  phaseHeadLabel,
  phaseHeadTitle,
  trailContent,
  isActive,
  theme,
}: PhaseColProps) => (
  <div className="grid lg:grid-cols-2 gap-14 items-stretch overflow-visible">
    {/* LEFT: stage illustration */}
    <div className="flex flex-col min-w-0 lg:h-[min(640px,calc(100vh-80px))] lg:min-h-[520px]">
      {/* Col header */}
      <div className="flex-none min-h-0 lg:min-h-[96px] flex flex-col justify-end pb-3 lg:pb-4">
        <span
          className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300"
          style={{ color: theme.accent }}
        >
          <span className="inline-block w-[18px] h-[1px] bg-current" />
          {phaseLabel}
        </span>
        <h3 className="font-bold text-xl md:text-[26px] leading-tight text-[#0b3a36] mt-2 max-w-[22ch] tracking-tight">
          {phaseSubtitle}
        </h3>
      </div>

      {/* Stage card */}
      <aside className="phase-stage flex-1 relative rounded-[20px] border border-[#e8dfc9] overflow-hidden isolate grid place-items-center p-[18px] min-h-0 lg:min-h-0 max-lg:h-[min(420px,65vh)] max-lg:min-h-[340px] max-sm:h-[min(360px,60vh)] max-sm:min-h-[300px] max-sm:rounded-2xl">
        <span
          className="absolute bottom-[-32px] right-[-10px] font-extrabold leading-[0.85] opacity-[0.07] pointer-events-none select-none z-0 tracking-[-0.04em]"
          style={{ fontSize: "clamp(180px, 24vw, 260px)", color: theme.accent }}
          aria-hidden="true"
        >
          {phaseNumeral}
        </span>
        <div className="relative z-10 w-full h-full grid place-items-center">
          {svgContent}
        </div>
      </aside>
    </div>

    {/* RIGHT: scrollable steps */}
    <div className="flex flex-col min-w-0 lg:h-[min(640px,calc(100vh-80px))] lg:min-h-[520px]">
      {/* Col header */}
      <div className="flex-none min-h-0 lg:min-h-[96px] flex flex-col justify-end pb-3 lg:pb-4">
        <div
          className="flex items-center gap-3.5 px-[18px] py-3.5 rounded-[14px] overflow-hidden"
          style={{ backgroundColor: theme.accentSoft }}
        >
          <span
            className="phase-head-num flex-shrink-0 text-[12px] font-bold tracking-[0.12em] bg-white px-2.5 py-1 rounded-[6px] whitespace-nowrap leading-[1.4]"
            style={{ color: theme.accent }}
          >
            {phaseHeadLabel}
          </span>
          <h3 className="phase-head-title min-w-0 font-bold text-[clamp(18px,2vw,22px)] text-[#0b3a36] m-0 leading-[1.2]">
            {phaseHeadTitle}
          </h3>
        </div>
      </div>

      <ScrollableTrail active={isActive} theme={theme}>
        {trailContent}
      </ScrollableTrail>
    </div>
  </div>
);

/* ─── Main Component ──────────────────────────────────────────────────────── */
export const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);
  const theme = PHASE_THEMES[activeTab];

  return (
    <section
      className="px-6 py-9 md:py-14 bg-white relative"
      aria-labelledby="hiw-title-text"
      id="how-it-works"
    >
      {/* Card wrapper */}
      <div className="max-w-[1200px] w-full mx-auto bg-white rounded-3xl shadow-[0_10px_32px_-8px_rgba(18,91,84,0.1),0_3px_10px_-3px_rgba(18,91,84,0.05)] px-5 md:px-10 py-10 md:py-14 relative">

        {/* Header */}
        <div className="text-center max-w-[760px] mx-auto mb-7">
          <p className="inline-flex items-center gap-3 text-xs md:text-sm font-semibold tracking-[0.22em] uppercase text-[#B35300] mb-6">
            <span className="w-8 h-[1.5px] bg-[#B35300] opacity-50 shrink-0" />
            Subscribe · Invest · Rebalance
            <span className="w-8 h-[1.5px] bg-[#B35300] opacity-50 shrink-0" />
          </p>
          <h2
            id="hiw-title-text"
            className="text-3xl md:text-5xl font-bold tracking-tight text-[#125b54] mb-4"
          >
            How it{" "}
            <span className="text-[#B35300] relative inline-block">
              works?
              <span className="absolute left-0 right-0 bottom-[-3px] h-[2px] bg-[#B35300] opacity-30 rounded" />
            </span>
          </h2>
          <p className="text-base md:text-[17px] text-[#5a6e6a] leading-relaxed">
            Pick a basket. Invest through your existing demat. Get rebalance alerts. That&apos;s it.
          </p>

          {/* Stepper pills */}
          <div
            className="hiw-pills relative flex items-start justify-between gap-4 w-full max-w-[620px] mx-auto mt-10 px-2 max-sm:gap-2 max-sm:px-1 max-sm:mt-[30px] max-sm:max-w-full"
            role="tablist"
            aria-label="Choose a phase"
          >
            {([1, 2, 3] as const).map((n) => (
              <button
                key={n}
                onClick={() => setActiveTab(n)}
                className="hiw-pill relative z-[1] appearance-none bg-transparent border-0 p-0 cursor-pointer flex flex-col items-center gap-3 font-[inherit] transition-transform duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] [-webkit-tap-highlight-color:transparent]"
                role="tab"
                aria-selected={activeTab === n}
                aria-controls={`phase-${n}`}
              >
                <span
                  className="hiw-pill-num grid place-items-center w-[52px] h-[52px] rounded-full bg-white border-2 border-[rgba(18,91,84,0.28)] text-[#125b54] text-[15px] font-bold leading-none max-sm:w-11 max-sm:h-11 max-sm:text-[14px]"
                  aria-hidden="true"
                >
                  {String(n).padStart(2, "0")}
                </span>
                <span className="hiw-pill-label text-[14px] font-semibold text-[#5a6e6a] leading-[1.3] max-w-[110px] text-center max-sm:text-[12.5px] max-sm:max-w-[90px]">
                  {n === 1 ? "Subscribe" : n === 2 ? "Invest via smallcase" : "Rebalance"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Storyline tabs container */}
        <div
          className="mt-12 relative storyline"
          data-active={activeTab}
          style={{
            ["--accent" as any]: theme.accent,
            ["--accent-soft" as any]: theme.accentSoft,
            ["--accent-glow" as any]: theme.accentGlow,
          }}
        >

          {/* ── PHASE 1: SUBSCRIBE ── */}
          <div
            className={`phase phase-is-active focus:outline-none ${activeTab === 1 ? "block" : "hidden"}`}
            id="phase-1"
            role="tabpanel"
          >
            <PhaseColumns
              isActive={activeTab === 1}
              theme={theme}
              phaseLabel="01 / 03 · Subscribe"
              phaseSubtitle="Subscribe to your basket"
              phaseNumeral="01"
              phaseHeadLabel="PHASE 01"
              phaseHeadTitle="How to Subscribe"
              svgContent={
                <svg
                  className="w-full h-full max-w-[480px] max-h-full drop-shadow-[0_18px_28px_rgba(18,91,84,0.12)] overflow-visible"
                  viewBox="0 0 480 480"
                >
                  <defs>
                    <linearGradient id="s1cardGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#0f4d47" />
                      <stop offset="100%" stopColor="#125b54" />
                    </linearGradient>
                    <linearGradient id="s1shineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="0.42" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                    <clipPath id="s1cardClip">
                      <rect x="60" y="100" width="360" height="230" rx="18" />
                    </clipPath>
                  </defs>
                  <g transform="rotate(-7 240 215)">
                    <rect x="52" y="114" width="360" height="230" rx="18" fill="#7fd28c" opacity="0.34" />
                  </g>
                  <g className="s1-card-group">
                    <g transform="rotate(-2 240 215)">
                      <rect x="60" y="100" width="360" height="230" rx="18" fill="url(#s1cardGrad)" />
                      <g clipPath="url(#s1cardClip)">
                        <rect className="s1-shine" x="-60" y="100" width="170" height="230" fill="url(#s1shineGrad)" />
                      </g>
                      <text x="86" y="152" fill="#f8f2e7" fontFamily="Open Sans, sans-serif" fontWeight="700" fontSize="17" letterSpacing="0.4">KamayaKya</text>
                      <rect x="86" y="162" width="68" height="2.5" fill="#ff9e29" rx="1" />
                      <text x="86" y="210" fill="#f8f2e7" fontFamily="Open Sans, sans-serif" fontWeight="700" fontSize="24">Value Buy</text>
                      <text x="86" y="232" fill="#7fd28c" fontFamily="Lato, sans-serif" fontWeight="400" fontSize="13" letterSpacing="0.8">Opportunities Basket</text>
                      <text x="86" y="272" fill="rgba(248,242,231,0.6)" fontFamily="Open Sans, sans-serif" fontWeight="500" fontSize="10" letterSpacing="1.2">ACTIVE · ANNUAL</text>
                      <rect x="86" y="284" width="288" height="4" fill="rgba(255,255,255,0.15)" rx="2" />
                      <rect x="86" y="284" width="230" height="4" fill="#ff9e29" rx="2" />
                      <rect x="346" y="138" width="32" height="24" rx="4" fill="#ff9e29" />
                      <line x1="350" y1="146" x2="374" y2="146" stroke="#0f4d47" strokeWidth="1.2" />
                      <line x1="350" y1="154" x2="374" y2="154" stroke="#0f4d47" strokeWidth="1.2" />
                    </g>
                  </g>
                  <g transform="translate(128, 388)">
                    <g className="s1-tick">
                      <rect width="96" height="36" rx="9" fill="#fff" stroke="#125b54" strokeWidth="1.5" />
                      <circle cx="16" cy="18" r="6" fill="#125b54" />
                      <path d="M12.5 18 L15 20.5 L19.5 16" stroke="#fff" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <text x="28" y="22" fill="#125b54" fontFamily="Open Sans, sans-serif" fontWeight="600" fontSize="11">Quarterly</text>
                    </g>
                    <g transform="translate(108, -5)">
                      <g className="s1-tick s1-tick--2">
                        <rect width="116" height="46" rx="11" fill="#125b54" />
                        <circle cx="20" cy="23" r="8" fill="#ff9e29" />
                        <path d="M16 23 L19 26 L25 19" stroke="#125b54" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        <text x="34" y="29" fill="#fff" fontFamily="Open Sans, sans-serif" fontWeight="700" fontSize="13">Annual</text>
                      </g>
                    </g>
                  </g>
                </svg>
              }
              trailContent={
                <>
                  <StepCard
                    stepNum="01" title="Pick your basket"
                    copy="Browse the five baskets on <strong>kamayakya.smallcase.com</strong>: Value Buy, Cyclical, Dividend, HNI Concentration, or India Growth Story MF. Each card shows the recommended investment, ideal holding period, and inception date upfront."
                    miniArt={<svg viewBox="0 0 48 48" aria-hidden="true" className="w-12 h-12"><rect className="mini-fade" x="10" y="11" width="28" height="5" rx="2" fill="#125b54" opacity="0.25" /><rect className="mini-fade" x="10" y="21" width="28" height="6" rx="2" fill="#ff9e29" /><rect className="mini-fade" x="10" y="32" width="28" height="5" rx="2" fill="#125b54" opacity="0.25" /></svg>}
                    miniTitle="5 baskets" miniSub="From ₹50K &amp; upwards"
                    isLast={false} theme={theme} active={activeTab === 1} delayIdx={0}
                  />
                  <StepCard
                    stepNum="02" title="Choose your plan duration"
                    copy="Pay quarterly or annual. The subscription fee is billed <strong>upfront</strong> for the period you pick, and the exact amount is always visible before you confirm. Annual plans give the lowest effective monthly cost. Renews automatically."
                    miniArt={<svg viewBox="0 0 48 48" aria-hidden="true" className="w-12 h-12"><circle cx="24" cy="24" r="18" fill="none" stroke="#e8dfc9" strokeWidth="3" /><g transform="rotate(-90 24 24)"><circle className="mini-pulse" cx="24" cy="24" r="18" fill="none" stroke="#ff9e29" strokeWidth="3" strokeDasharray="56 60" strokeLinecap="round" /></g><text x="24" y="28" textAnchor="middle" fill="#125b54" fontFamily="Open Sans, sans-serif" fontSize="10" fontWeight="700">12M</text></svg>}
                    miniTitle="Upfront billing" miniSub="Quarterly · Annual"
                    isLast={false} theme={theme} active={activeTab === 1} delayIdx={1}
                  />
                  <StepCard
                    stepNum="03" title="Pay &amp; unlock the basket"
                    copy="Pay once, see everything: the stocks, the weightages, every rebalance, and every research note for as long as you&apos;re subscribed."
                    miniArt={<svg viewBox="0 0 48 48" aria-hidden="true" className="w-12 h-12"><rect x="14" y="22" width="20" height="16" rx="3" fill="#125b54" /><path className="mini-fade" d="M18 22 V16 a6 6 0 0 1 12 0 V22" fill="none" stroke="#125b54" strokeWidth="2.5" strokeLinecap="round" /><circle cx="24" cy="30" r="2.5" fill="#ff9e29" /></svg>}
                    miniTitle="Instant access" miniSub="Stocks · weights · rebalances"
                    isLast={false} theme={theme} active={activeTab === 1} delayIdx={2}
                  />
                  <StepCard
                    stepNum="04" title="Get every update while active"
                    copy="Every alert that matters lands in three places: the <strong>smallcase app, your inbox, and our subscribers-only WhatsApp group</strong>. Renewal reminder shows up 7 days before expiry on mail and app."
                    miniArt={<svg viewBox="0 0 48 48" aria-hidden="true" className="w-12 h-12"><path d="M24 9 C18.5 9 14.5 13 14.5 18.5 V26 L11 31 H37 L33.5 26 V18.5 C33.5 13 29.5 9 24 9 Z" fill="#ff9e29" /><circle className="mini-pulse" cx="24" cy="36" r="3" fill="#125b54" /></svg>}
                    miniTitle="Always on" miniSub="App · email · WhatsApp community"
                    isLast={true} theme={theme} active={activeTab === 1} delayIdx={3}
                  />
                </>
              }
            />
          </div>

          {/* ── PHASE 2: INVEST VIA SMALLCASE ── */}
          <div
            className={`phase phase-is-active focus:outline-none ${activeTab === 2 ? "block" : "hidden"}`}
            id="phase-2"
            role="tabpanel"
          >
            <PhaseColumns
              isActive={activeTab === 2}
              theme={theme}
              phaseLabel="02 / 03 · Invest"
              phaseSubtitle="Invest via smallcase"
              phaseNumeral="02"
              phaseHeadLabel="PHASE 02"
              phaseHeadTitle="How to Invest via smallcase"
              svgContent={
                <svg
                  className="w-full h-full max-w-[480px] max-h-full drop-shadow-[0_18px_28px_rgba(18,91,84,0.12)] overflow-visible"
                  viewBox="0 0 480 480"
                >
                  <defs>
                    <linearGradient id="s2vaultGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.55" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="240" cy="408" rx="140" ry="14" fill="#142d51" opacity="0.1" />
                  <ellipse cx="240" cy="406" rx="124" ry="9" fill="#142d51" opacity="0.06" />
                  <g className="s2-vault">
                    <path d="M 350 200 L 390 178 L 390 358 L 350 380 Z" fill="#ff9e29" opacity="0.85" />
                    <path d="M 130 200 L 90 178 L 90 358 L 130 380 Z" fill="#ff9e29" opacity="0.9" />
                    <rect x="130" y="200" width="220" height="180" rx="6" fill="url(#s2vaultGrad)" stroke="#ff9e29" strokeWidth="1.5" />
                    <path d="M 130 200 L 90 178 L 310 178 L 350 200 Z" fill="#ffb454" />
                    <text x="240" y="220" textAnchor="middle" fill="#142d51" fontFamily="Open Sans, sans-serif" fontSize="9" fontWeight="600" letterSpacing="2">DEMAT · YOUR OWNERSHIP</text>
                    <g transform="translate(145, 240)">
                      <g className="s2-token s2-token--1"><rect width="58" height="38" rx="6" fill="#125b54" /><text x="29" y="18" textAnchor="middle" fill="#fff" fontFamily="Open Sans, sans-serif" fontSize="9" fontWeight="700">VBO</text><text x="29" y="30" textAnchor="middle" fill="#7fd28c" fontFamily="Lato, sans-serif" fontSize="8">+12.4%</text></g>
                      <g className="s2-token s2-token--2" transform="translate(66, 0)"><rect width="58" height="38" rx="6" fill="#142d51" /><text x="29" y="18" textAnchor="middle" fill="#fff" fontFamily="Open Sans, sans-serif" fontSize="9" fontWeight="700">CYC</text><text x="29" y="30" textAnchor="middle" fill="#7fd28c" fontFamily="Lato, sans-serif" fontSize="8">+8.2%</text></g>
                      <g className="s2-token s2-token--3" transform="translate(132, 0)"><rect width="58" height="38" rx="6" fill="#7fd28c" /><text x="29" y="18" textAnchor="middle" fill="#0b3a36" fontFamily="Open Sans, sans-serif" fontSize="9" fontWeight="700">DIV</text><text x="29" y="30" textAnchor="middle" fill="#0b3a36" fontFamily="Lato, sans-serif" fontSize="8">+5.1%</text></g>
                      <g className="s2-token s2-token--4" transform="translate(33, 56)"><rect width="58" height="38" rx="6" fill="#125b54" /><text x="29" y="18" textAnchor="middle" fill="#fff" fontFamily="Open Sans, sans-serif" fontSize="9" fontWeight="700">HNI</text><text x="29" y="30" textAnchor="middle" fill="#7fd28c" fontFamily="Lato, sans-serif" fontSize="8">+9.7%</text></g>
                      <g className="s2-incoming" transform="translate(99, 56)"><rect width="58" height="38" rx="6" fill="#ff9e29" /><text x="29" y="18" textAnchor="middle" fill="#fff" fontFamily="Open Sans, sans-serif" fontSize="9" fontWeight="700">MF</text><text x="29" y="30" textAnchor="middle" fill="#fff" fontFamily="Lato, sans-serif" fontSize="8">new</text></g>
                    </g>
                  </g>
                  <g>
                    <line className="s2-line" x1="76" y1="86" x2="130" y2="190" stroke="#142d51" strokeWidth="1.5" opacity="0.4" />
                    <g className="s2-broker s2-broker--1"><circle cx="60" cy="70" r="20" fill="#125b54" /><text x="60" y="75" textAnchor="middle" fill="#fff" fontFamily="Open Sans, sans-serif" fontSize="11" fontWeight="700">Z</text></g>
                    <line className="s2-line" x1="404" y1="86" x2="350" y2="190" stroke="#142d51" strokeWidth="1.5" opacity="0.4" />
                    <g className="s2-broker s2-broker--2"><circle cx="420" cy="70" r="20" fill="#142d51" /><text x="420" y="75" textAnchor="middle" fill="#fff" fontFamily="Open Sans, sans-serif" fontSize="11" fontWeight="700">G</text></g>
                    <line className="s2-line" x1="76" y1="394" x2="120" y2="370" stroke="#142d51" strokeWidth="1.5" opacity="0.4" />
                    <g className="s2-broker s2-broker--3"><circle cx="60" cy="410" r="20" fill="#ff9e29" /><text x="60" y="415" textAnchor="middle" fill="#fff" fontFamily="Open Sans, sans-serif" fontSize="11" fontWeight="700">A</text></g>
                    <line className="s2-line" x1="404" y1="394" x2="360" y2="370" stroke="#142d51" strokeWidth="1.5" opacity="0.4" />
                    <g className="s2-broker s2-broker--4"><circle cx="420" cy="410" r="20" fill="#7fd28c" /><text x="420" y="415" textAnchor="middle" fill="#0b3a36" fontFamily="Open Sans, sans-serif" fontSize="11" fontWeight="700">U</text></g>
                  </g>
                </svg>
              }
              trailContent={
                <>
                  <StepCard
                    stepNum="01" title="Use your existing demat account"
                    copy="<strong>No new account, no new demat.</strong> smallcase works directly with Zerodha, Groww, Angel One, Upstox, HDFC Securities, ICICI Direct, and more than a dozen other brokers. Pick whichever you already use."
                    miniArt={<svg viewBox="0 0 48 48" aria-hidden="true" className="w-12 h-12"><circle cx="14" cy="14" r="6" fill="#125b54" className="mini-fade" /><circle cx="34" cy="14" r="6" fill="#142d51" className="mini-fade" /><circle cx="14" cy="34" r="6" fill="#ff9e29" className="mini-fade" /><circle cx="34" cy="34" r="6" fill="#7fd28c" className="mini-fade" /><rect className="mini-pulse" x="20" y="20" width="8" height="8" rx="1.5" fill="#125b54" /></svg>}
                    miniTitle="20+ brokers" miniSub="Pick your existing one"
                    isLast={false} theme={theme} active={activeTab === 2} delayIdx={0}
                  />
                  <StepCard
                    stepNum="02" title="Open the basket and click Buy"
                    copy="Tap <strong>Buy</strong> on the basket. Choose <strong>lump-sum</strong> (invest it all today) or <strong>SIP</strong> (a fixed amount every month). Switch between the two whenever you want."
                    miniArt={<svg viewBox="0 0 48 48" aria-hidden="true" className="w-12 h-12"><rect x="8" y="14" width="32" height="20" rx="3" fill="#ff9e29" /><text x="24" y="28" textAnchor="middle" fill="#fff" fontFamily="Open Sans, sans-serif" fontSize="10" fontWeight="700">BUY</text><circle className="mini-pulse" cx="38" cy="14" r="3" fill="#125b54" /></svg>}
                    miniTitle="Lump-sum or SIP" miniSub="Switch anytime"
                    isLast={false} theme={theme} active={activeTab === 2} delayIdx={1}
                  />
                  <StepCard
                    stepNum="03" title="Connect broker &amp; confirm"
                    copy="Log in to your broker with one tap. See every stock, the exact weight of each, and the total order amount before you confirm. <strong>Standard broker brokerage and statutory charges apply</strong> on transactions."
                    miniArt={<svg viewBox="0 0 48 48" aria-hidden="true" className="w-12 h-12"><circle cx="14" cy="24" r="6" fill="#125b54" /><circle cx="34" cy="24" r="6" fill="#ff9e29" /><line x1="20" y1="24" x2="28" y2="24" stroke="#142d51" strokeWidth="2" strokeDasharray="2 2" className="mini-pulse" /></svg>}
                    miniTitle="One-tap login" miniSub="Review before confirm"
                    isLast={false} theme={theme} active={activeTab === 2} delayIdx={2}
                  />
                  <StepCard
                    stepNum="04" title="Stocks land in your demat"
                    copy="Each stock sits in your demat account. <strong>You&apos;re the direct owner</strong>. Unlike a mutual fund, there&apos;s no fund manager in between."
                    miniArt={<svg viewBox="0 0 48 48" aria-hidden="true" className="w-12 h-12"><rect x="8" y="16" width="32" height="22" rx="3" fill="#125b54" /><rect className="mini-bar" x="12" y="22" width="24" height="3" rx="1.5" fill="#7fd28c" /><rect className="mini-bar" x="12" y="28" width="18" height="3" rx="1.5" fill="#ff9e29" /><rect className="mini-bar" x="12" y="34" width="12" height="3" rx="1.5" fill="#7fd28c" opacity="0.6" /><path d="M16 16 V12 a4 4 0 0 1 8 0 V16" fill="none" stroke="#ff9e29" strokeWidth="2" /></svg>}
                    miniTitle="You own it" miniSub="Direct demat ownership"
                    isLast={false} theme={theme} active={activeTab === 2} delayIdx={3}
                  />
                  <StepCard
                    stepNum="05" title="Track, hold, or partial-exit anytime"
                    copy="View holdings in your broker app or the smallcase dashboard. Markets open? You can <strong>sell part or all</strong> whenever you like. No lock-in. Only standard broker costs apply on exits."
                    miniArt={<svg viewBox="0 0 48 48" aria-hidden="true" className="w-12 h-12"><polyline className="mini-bar" points="6,36 14,28 22,32 30,18 42,12" fill="none" stroke="#125b54" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="42" cy="12" r="3" fill="#ff9e29" className="mini-pulse" /></svg>}
                    miniTitle="No lock-in" miniSub="Track · partial-exit · re-enter"
                    isLast={true} theme={theme} active={activeTab === 2} delayIdx={4}
                  />
                </>
              }
            />
          </div>

          {/* ── PHASE 3: REBALANCING ── */}
          <div
            className={`phase phase-is-active focus:outline-none ${activeTab === 3 ? "block" : "hidden"}`}
            id="phase-3"
            role="tabpanel"
          >
            <PhaseColumns
              isActive={activeTab === 3}
              theme={theme}
              phaseLabel="03 / 03 · Rebalance"
              phaseSubtitle="How to Rebalance?"
              phaseNumeral="03"
              phaseHeadLabel="PHASE 03"
              phaseHeadTitle="How to Rebalance?"
              svgContent={
                <svg
                  className="w-full h-full max-w-[480px] max-h-full drop-shadow-[0_18px_28px_rgba(18,91,84,0.12)] overflow-visible"
                  viewBox="0 0 480 480"
                >
                  <defs>
                    <radialGradient id="s3dialBg" cx="0.5" cy="0.5" r="0.6">
                      <stop offset="0%" stopColor="#fff" />
                      <stop offset="100%" stopColor="#e8eef8" />
                    </radialGradient>
                  </defs>
                  <g className="s3-notif" transform="translate(30, 28)">
                    <rect width="170" height="58" rx="10" fill="#fff" stroke="#142d51" strokeWidth="1.5" />
                    <circle cx="22" cy="29" r="11" fill="#ff9e29" />
                    <path d="M17 29 L21 33 L28 24" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="42" y="25" fill="#142d51" fontFamily="Open Sans, sans-serif" fontSize="10.5" fontWeight="700">Rebalance ready</text>
                    <text x="42" y="41" fill="#5a6e6a" fontFamily="Lato, sans-serif" fontSize="9">Q3 · Apply in one tap</text>
                  </g>
                  <g className="s3-clock-tick">
                    <g transform="translate(250 270)">
                      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(r => (
                        <line key={r} x1="0" y1="-135" x2="0" y2="-122" stroke="#142d51" strokeWidth="2" transform={`rotate(${r})`} />
                      ))}
                    </g>
                  </g>
                  <text x="250" y="128" textAnchor="middle" fill="#142d51" fontFamily="Open Sans, sans-serif" fontSize="10" fontWeight="700" letterSpacing="2">Q1</text>
                  <text x="398" y="275" textAnchor="middle" fill="#142d51" fontFamily="Open Sans, sans-serif" fontSize="10" fontWeight="700" letterSpacing="2">Q2</text>
                  <text x="250" y="425" textAnchor="middle" fill="#142d51" fontFamily="Open Sans, sans-serif" fontSize="10" fontWeight="700" letterSpacing="2">Q3</text>
                  <text x="102" y="275" textAnchor="middle" fill="#142d51" fontFamily="Open Sans, sans-serif" fontSize="10" fontWeight="700" letterSpacing="2">Q4</text>
                  <g className="s3-dial">
                    <circle cx="250" cy="270" r="105" fill="url(#s3dialBg)" stroke="#142d51" strokeWidth="1.5" />
                    <path d="M 250 270 L 250 165 A 105 105 0 0 1 349.9 304.4 Z" fill="#125b54" opacity="0.9" />
                    <path d="M 250 270 L 349.9 304.4 A 105 105 0 0 1 211.7 371.7 Z" fill="#ff9e29" opacity="0.9" />
                    <path d="M 250 270 L 211.7 371.7 A 105 105 0 0 1 150.1 304.4 Z" fill="#7fd28c" opacity="0.9" />
                    <path className="s3-wedge--out" d="M 250 270 L 150.1 304.4 A 105 105 0 0 1 211.7 168.3 Z" fill="#142d51" opacity="0.9" />
                    <path className="s3-wedge--in" d="M 250 270 L 211.7 168.3 A 105 105 0 0 1 250 165 Z" fill="#ff9e29" opacity="0.9" />
                    <circle cx="250" cy="270" r="34" fill="#fff" stroke="#142d51" strokeWidth="1.5" />
                    <text x="250" y="266" textAnchor="middle" fill="#142d51" fontFamily="Open Sans, sans-serif" fontSize="9" fontWeight="700">RE-</text>
                    <text x="250" y="280" textAnchor="middle" fill="#142d51" fontFamily="Open Sans, sans-serif" fontSize="10" fontWeight="700">BALANCE</text>
                  </g>
                </svg>
              }
              trailContent={
                <>
                  <StepCard
                    stepNum="01" title="The trigger arrives"
                    copy="Quarterly earnings, a channel check, a plant visit, a news event, or a thesis change. When the data says <strong>act</strong>, we act, not on a rigid calendar, but when conviction shifts."
                    miniArt={<svg viewBox="0 0 48 48" aria-hidden="true" className="w-12 h-12"><circle cx="24" cy="24" r="16" fill="none" stroke="#142d51" strokeWidth="2" /><path className="mini-pulse" d="M24 14 L24 24 L30 28" stroke="#ff9e29" strokeWidth="3" fill="none" strokeLinecap="round" /></svg>}
                    miniTitle="Conviction-driven" miniSub="Not a calendar exercise"
                    isLast={false} theme={theme} active={activeTab === 3} delayIdx={0}
                  />
                  <StepCard
                    stepNum="02" title="Football-team logic: players change, team stays"
                    copy="Think football substitution. A stock that no longer fits the strategy comes out, a better one comes in. The <strong>theme</strong>: Value, Cyclical, Dividend or Concentration stays."
                    miniArt={<svg viewBox="0 0 48 48" aria-hidden="true" className="w-12 h-12"><rect x="7" y="14" width="14" height="20" rx="2" fill="#142d51" opacity="0.3" /><rect className="mini-fade" x="27" y="14" width="14" height="20" rx="2" fill="#ff9e29" /><path className="mini-pulse" d="M22 24 L26 24 M24 22 L26 24 L24 26" stroke="#125b54" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    miniTitle="Substitution" miniSub="One out · one in · theme stays"
                    isLast={false} theme={theme} active={activeTab === 3} delayIdx={1}
                  />
                  <StepCard
                    stepNum="03" title='You get the alert, with the "why"'
                    copy='An alert hits your <strong>smallcase app, email, and our WhatsApp group</strong>. Every one of them spells out the reason: what we changed and why.'
                    miniArt={<svg viewBox="0 0 48 48" aria-hidden="true" className="w-12 h-12"><rect x="8" y="12" width="32" height="24" rx="4" fill="#142d51" /><line className="mini-bar" x1="12" y1="20" x2="28" y2="20" stroke="#7fd28c" strokeWidth="2" strokeLinecap="round" /><line className="mini-bar" x1="12" y1="26" x2="34" y2="26" stroke="#ff9e29" strokeWidth="2" strokeLinecap="round" /><line className="mini-bar" x1="12" y1="32" x2="22" y2="32" stroke="#7fd28c" strokeWidth="2" strokeLinecap="round" opacity="0.6" /></svg>}
                    miniTitle="Reasoning included" miniSub="What · why · what next"
                    isLast={false} theme={theme} active={activeTab === 3} delayIdx={2}
                  />
                  <StepCard
                    stepNum="04" title="Apply in one click"
                    copy="Hit <strong>Apply rebalance</strong> in smallcase. Your broker executes the buy/sell trades automatically. Delivery-only, just like the original investment. Standard broker statutory charges apply."
                    miniArt={<svg viewBox="0 0 48 48" aria-hidden="true" className="w-12 h-12"><circle cx="24" cy="24" r="16" fill="#ff9e29" /><path className="mini-pulse" d="M16 24 L22 30 L32 18" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    miniTitle="One tap" miniSub="Broker executes the rest"
                    isLast={false} theme={theme} active={activeTab === 3} delayIdx={3}
                  />
                  <StepCard
                    stepNum="05" title="Stays on theme, refined for today"
                    copy="Your basket stays aligned with the strategy, with weightages backed by our latest research and ground level verification. Past performance never guarantees future returns, but <strong>disciplined rebalancing</strong> keeps you on course."
                    miniArt={<svg viewBox="0 0 48 48" aria-hidden="true" className="w-12 h-12"><circle cx="24" cy="24" r="16" fill="none" stroke="#142d51" strokeWidth="2" /><path className="mini-pulse" d="M24 24 L24 8 A16 16 0 0 1 38 32 Z" fill="#7fd28c" /><circle cx="24" cy="24" r="5" fill="#fff" stroke="#142d51" strokeWidth="1.5" /></svg>}
                    miniTitle="On strategy" miniSub="Research-backed weightages"
                    isLast={true} theme={theme} active={activeTab === 3} delayIdx={4}
                  />
                </>
              }
            />
          </div>

        </div>

        {/* Closer Banner */}
        <aside
          className="mt-16 p-6 md:p-8 bg-gradient-to-br from-[#125b54] to-[#0b3a36] rounded-[20px] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden select-none"
          role="complementary"
          aria-label="Talk to us"
        >
          <div
            className="absolute -right-[60px] -bottom-[60px] w-[220px] h-[220px] rounded-full opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(127,210,140,0.4) 0%, transparent 70%)" }}
          />
          <div className="relative z-10 max-w-[60ch]">
            <p className="font-semibold text-lg md:text-[19px] leading-snug mb-1">
              Still having doubts? Feel free to reach out to us.
            </p>
            <p className="text-xs md:text-sm text-white/70">
              We&apos;ll walk you through which basket fits your goals. No pressure, no obligation.
            </p>
          </div>
          <ContactModal
            trigger={
              <button
                className="shrink-0 relative z-10 bg-[#c05600] hover:bg-[#9e4700] text-white border-0 py-3.5 px-6 rounded-full font-bold text-sm md:text-[14.5px] tracking-wide cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#125b54]"
                type="button"
              >
                Request a call back
              </button>
            }
          />
        </aside>

      </div>
    </section>
  );
};

export default HowItWorks;
