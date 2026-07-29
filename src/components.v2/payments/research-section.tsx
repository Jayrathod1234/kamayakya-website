import React from "react";
import { ContactModal } from "@/components.v2/payments/contact-modal";

export const ResearchSection = () => {
  return (
    <section className="pt-8 pb-12 px-4 md:pt-12 md:pb-[72px] md:px-6 bg-transparent" id="services" aria-labelledby="svc-title">
      <div className="max-w-[1200px] mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-12 md:mb-8">
          <p className="font-sans text-[15px] max-md:text-[14px] font-semibold tracking-[0.28em] uppercase text-[#B35300] mb-[18px] flex items-center justify-center gap-[14px] max-md:gap-[10px] before:content-[''] before:inline-block before:w-[28px] max-md:before:w-[20px] before:h-[1.5px] before:bg-[#B35300] before:opacity-50 after:content-[''] after:inline-block after:w-[28px] max-md:after:w-[20px] after:h-[1.5px] after:bg-[#B35300] after:opacity-50">
            Beyond the baskets
          </p>
          <h2 className="font-sans font-bold text-[clamp(32px,4.4vw,52px)] text-[#125b54] leading-[1.06] tracking-[-0.015em] mb-[18px]" id="svc-title">
            Research, Built For <em className="not-italic text-[#B35300] border-b-[3px] border-[#B35300] pb-[2px]">You</em>
          </h2>
          <p className="font-sans text-[clamp(15px,1.5vw,17px)] leading-[1.6] text-[#5a6e6a] max-w-[680px] mx-auto">
            Standard reports won&apos;t answer your question? We&apos;ll build a custom one: field visits, deep models, and answers specific to what you&apos;re investing in.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px] lg:gap-[28px] items-stretch">

          {/* Card 1: SME & Microcap Research */}
          <article className="bg-white rounded-[22px] overflow-hidden flex flex-col shadow-[0_12px_36px_-10px_rgba(18,91,84,0.14),0_4px_12px_-4px_rgba(18,91,84,0.06)] hover:-translate-y-[3px] hover:shadow-[0_20px_44px_-12px_rgba(18,91,84,0.20),0_6px_16px_-6px_rgba(18,91,84,0.10)] transition-all duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-md:transition-none max-md:hover:translate-y-0">
            <div className="relative bg-gradient-to-br from-[#f8f2e7] to-[#fbf6ec] border-b border-[rgba(18,91,84,0.08)] p-[18px] pb-0 aspect-[400/220]" aria-hidden="true">
              <svg className="w-full h-full block" viewBox="0 0 400 220" role="img" aria-label="Animated illustration of a research report being assembled with charts and verified stamp">
                {/* Soft background patches for depth */}
                <circle cx="60" cy="60" r="50" fill="#7fd28c" opacity="0.18" />
                <circle cx="340" cy="170" r="44" fill="#ff9e29" opacity="0.14" />

                {/* Back document (for stack depth) */}
                <g transform="rotate(-4 200 110)">
                  <rect x="120" y="34" width="180" height="160" rx="10" fill="#7fd28c" opacity="0.32" />
                </g>

                {/* Front document — main report */}
                <g className="sme-doc">
                  <rect x="110" y="28" width="180" height="164" rx="10" fill="#ffffff" stroke="#125b54" strokeWidth="1.2" strokeOpacity="0.18" />

                  {/* Report title bar (green) */}
                  <rect x="126" y="46" width="110" height="10" rx="2" fill="#125b54" />
                  <rect x="126" y="60" width="48" height="3" rx="1.5" fill="#ff9e29" />

                  {/* Body lines (animated, stagger appearance) */}
                  <rect className="sme-line sme-line--1" x="126" y="78" width="148" height="3.5" rx="1.5" fill="#125b54" opacity="0.28" />
                  <rect className="sme-line sme-line--2" x="126" y="88" width="120" height="3.5" rx="1.5" fill="#125b54" opacity="0.28" />
                  <rect className="sme-line sme-line--3" x="126" y="98" width="140" height="3.5" rx="1.5" fill="#125b54" opacity="0.28" />

                  {/* Mini bar chart (animated, bars grow) */}
                  <g transform="translate(126, 116)">
                    <line x1="0" y1="44" x2="148" y2="44" stroke="#125b54" strokeOpacity="0.18" strokeWidth="1" />
                    <rect className="sme-bar sme-bar--1" x="6" y="20" width="14" height="24" rx="1.5" fill="#125b54" />
                    <rect className="sme-bar sme-bar--2" x="28" y="12" width="14" height="32" rx="1.5" fill="#ff9e29" />
                    <rect className="sme-bar sme-bar--3" x="50" y="26" width="14" height="18" rx="1.5" fill="#125b54" opacity="0.6" />
                    <rect className="sme-bar sme-bar--4" x="72" y="6" width="14" height="38" rx="1.5" fill="#125b54" />
                    <rect className="sme-bar sme-bar--5" x="94" y="18" width="14" height="26" rx="1.5" fill="#ff9e29" opacity="0.7" />
                    <rect className="sme-bar sme-bar--6" x="116" y="2" width="14" height="42" rx="1.5" fill="#125b54" />
                  </g>

                  {/* VERIFIED stamp top-right of doc */}
                  <g transform="translate(232, 30)">
                    <g className="sme-stamp">
                      <rect x="0" y="0" width="56" height="20" rx="3" fill="none" stroke="#ff9e29" strokeWidth="1.6" />
                      <text x="28" y="13.5" textAnchor="middle" fill="#ff9e29" fontFamily="Open Sans, sans-serif" fontWeight="700" fontSize="8" letterSpacing="1.5">VERIFIED</text>
                    </g>
                  </g>
                </g>

                {/* Floating magnifying glass — orbits the doc */}
                <g className="sme-lens">
                  <circle cx="62" cy="142" r="14" fill="#ffffff" stroke="#125b54" strokeWidth="2" />
                  <line x1="72" y1="152" x2="82" y2="162" stroke="#125b54" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="62" cy="142" r="14" fill="#7fd28c" opacity="0.18" />
                </g>

                {/* Floating pen — bobs gently */}
                <g transform="translate(320, 56)">
                  <g className="sme-pen">
                    <rect x="0" y="0" width="6" height="36" rx="1.5" fill="#ff9e29" transform="rotate(30 3 18)" />
                    <polygon points="3,-3 6,4 0,4" fill="#125b54" transform="rotate(30 3 18)" />
                  </g>
                </g>
              </svg>
            </div>

            <div className="p-[28px] px-[26px] max-md:p-[22px] max-md:px-[20px] flex-1 flex flex-col">
              <p className="font-sans text-[14px] font-bold tracking-[0.22em] uppercase text-[#B35300] mb-3">
                Custom research
              </p>
              <h3 className="font-sans font-bold text-[clamp(22px,2.4vw,26px)] text-[#125b54] leading-[1.2] mb-3 tracking-[-0.005em] max-md:text-[21px]">
                SME &amp; Microcap Research
              </h3>
              <p className="font-sans text-[15px] leading-[1.6] text-[#5a6e6a] mb-[22px]">
                In-depth research on listed SME and microcap stocks built for institutions, family offices, and serious investors who can&apos;t get this level of detail anywhere else.
              </p>

              <ul className="list-none p-0 m-0 mb-[26px] grid gap-[10px] max-md:text-[14px]">
                <li className="flex items-start gap-[11px] font-sans text-[14.5px] max-md:text-[14px] leading-[1.55] text-[#2c4945]">
                  <span className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-[rgba(127,210,140,0.22)] text-[#125b54] grid place-items-center mt-0.5" aria-hidden="true">
                    <svg className="w-[13px] h-[13px]" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span>Coverage of SME exchange names and microcaps mainstream brokers skip</span>
                </li>
                <li className="flex items-start gap-2.5 text-[14.5px] leading-[1.55] text-[#2c4945]">
                  <span className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-[rgba(127,210,140,0.22)] text-[#125b54] grid place-items-center mt-0.5" aria-hidden="true">
                    <svg className="w-[13px] h-[13px]" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span>Management interactions and &quot;walk-the-talk&quot; verification</span>
                </li>
                <li className="flex items-start gap-[11px] font-sans text-[14.5px] max-md:text-[14px] leading-[1.55] text-[#2c4945]">
                  <span className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-[rgba(127,210,140,0.22)] text-[#125b54] grid place-items-center mt-0.5" aria-hidden="true">
                    <svg className="w-[13px] h-[13px]" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span>Plant visits and on-ground reality checks</span>
                </li>
                <li className="flex items-start gap-[11px] font-sans text-[14.5px] max-md:text-[14px] leading-[1.55] text-[#2c4945]">
                  <span className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-[rgba(127,210,140,0.22)] text-[#125b54] grid place-items-center mt-0.5" aria-hidden="true">
                    <svg className="w-[13px] h-[13px]" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span>Forensic accounting: cash flow conversion, working capital, related parties</span>
                </li>
              </ul>

              <div className="mt-auto self-center">
                <ContactModal
                  trigger={
                    <button type="button" className="inline-flex items-center gap-[8px] self-center mt-auto py-[11px] px-[22px] border-0 rounded-full bg-[#c05600] hover:bg-[#9e4700] text-white font-sans font-bold text-[14px] tracking-[0.01em] cursor-pointer shadow-[0_8px_18px_-8px_rgba(235,133,0,0.45)] hover:shadow-[0_12px_22px_-8px_rgba(235,133,0,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#125b54] focus-visible:ring-offset-3 [-webkit-tap-highlight-color:transparent] max-md:transition-none max-md:hover:translate-y-0">
                      <span>Enquire Now</span>
                    </button>
                  }
                />
              </div>
            </div>
          </article>

          {/* Card 2: Plant Visit Notes */}
          <article className="bg-white rounded-[22px] overflow-hidden flex flex-col shadow-[0_12px_36px_-10px_rgba(18,91,84,0.14),0_4px_12px_-4px_rgba(18,91,84,0.06)] hover:-translate-y-[3px] hover:shadow-[0_20px_44px_-12px_rgba(18,91,84,0.20),0_6px_16px_-6px_rgba(18,91,84,0.10)] transition-all duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-md:transition-none max-md:hover:translate-y-0">
            <div className="relative bg-gradient-to-br from-[#f2efe5] to-[#f6f0e1] border-b border-[rgba(18,91,84,0.08)] p-[18px] pb-0 aspect-[400/220]" aria-hidden="true">
              <svg className="w-full h-full block" viewBox="0 0 400 220" role="img" aria-label="Animated illustration of a factory with smokestacks, a visiting researcher, and field notes appearing">
                {/* Soft background patches */}
                <circle cx="60" cy="180" r="50" fill="#7fd28c" opacity="0.18" />
                <circle cx="340" cy="50" r="44" fill="#ff9e29" opacity="0.12" />

                {/* Ground line */}
                <line x1="20" y1="182" x2="380" y2="182" stroke="#125b54" strokeWidth="1.5" strokeOpacity="0.18" />

                {/* Sky line (slight) */}
                <line x1="20" y1="48" x2="380" y2="48" stroke="#125b54" strokeWidth="1" strokeOpacity="0.08" strokeDasharray="3 5" />

                {/* Factory complex — center */}
                <g className="plant-factory">
                  {/* Main building */}
                  <rect x="130" y="110" width="140" height="72" fill="#125b54" />
                  {/* Roof angle accent */}
                  <polygon points="130,110 200,86 270,110" fill="#0f4d47" />

                  {/* Windows (2x3 grid) */}
                  <rect x="142" y="124" width="14" height="14" rx="1" fill="#ff9e29" opacity="0.85" />
                  <rect x="164" y="124" width="14" height="14" rx="1" fill="#7fd28c" opacity="0.7" />
                  <rect x="186" y="124" width="14" height="14" rx="1" fill="#ff9e29" opacity="0.85" />
                  <rect x="208" y="124" width="14" height="14" rx="1" fill="#7fd28c" opacity="0.7" />
                  <rect x="230" y="124" width="14" height="14" rx="1" fill="#ff9e29" opacity="0.85" />
                  <rect x="252" y="124" width="14" height="14" rx="1" fill="#7fd28c" opacity="0.7" />

                  <rect x="142" y="146" width="14" height="14" rx="1" fill="#7fd28c" opacity="0.7" />
                  <rect x="164" y="146" width="14" height="14" rx="1" fill="#ff9e29" opacity="0.85" />
                  <rect x="186" y="146" width="14" height="14" rx="1" fill="#7fd28c" opacity="0.7" />
                  <rect x="208" y="146" width="14" height="14" rx="1" fill="#ff9e29" opacity="0.85" />
                  <rect x="230" y="146" width="14" height="14" rx="1" fill="#7fd28c" opacity="0.7" />
                  <rect x="252" y="146" width="14" height="14" rx="1" fill="#ff9e29" opacity="0.85" />

                  {/* Door */}
                  <rect x="194" y="162" width="12" height="20" fill="#0f4d47" />

                  {/* Smokestacks (two) */}
                  <rect x="148" y="60" width="14" height="50" fill="#0f4d47" />
                  <rect x="232" y="68" width="12" height="42" fill="#0f4d47" />
                  {/* Smokestack tops */}
                  <rect x="145" y="58" width="20" height="6" fill="#125b54" />
                  <rect x="229" y="66" width="18" height="5" fill="#125b54" />
                </g>

                {/* Animated smoke puffs from each stack */}
                <g className="plant-smoke">
                  <circle className="plant-puff plant-puff--a" cx="155" cy="50" r="6" fill="#125b54" opacity="0.22" />
                  <circle className="plant-puff plant-puff--b" cx="159" cy="38" r="8" fill="#125b54" opacity="0.16" />
                  <circle className="plant-puff plant-puff--c" cx="238" cy="58" r="5" fill="#125b54" opacity="0.22" />
                  <circle className="plant-puff plant-puff--d" cx="242" cy="46" r="7" fill="#125b54" opacity="0.16" />
                </g>

                {/* Walking person — moves left to right then resets */}
                <g className="plant-walker">
                  {/* Head */}
                  <circle cx="0" cy="162" r="5" fill="#125b54" />
                  {/* Body */}
                  <rect x="-4" y="167" width="8" height="12" rx="1.5" fill="#142d51" />
                  {/* Legs (two short rects) */}
                  <rect x="-3.5" y="178" width="3" height="6" fill="#125b54" />
                  <rect x="0.5" y="178" width="3" height="6" fill="#125b54" />
                  {/* Clipboard in hand */}
                  <rect x="4" y="170" width="6" height="8" rx="0.6" fill="#ff9e29" />
                </g>

                {/* Floating note bubbles — pop in & out, alternating. */}
                <g transform="translate(54, 90)">
                  <g className="plant-note plant-note--1">
                    <rect x="0" y="0" width="76" height="32" rx="6" fill="#ffffff" stroke="#125b54" strokeWidth="1.2" />
                    <text x="8" y="13" fill="#125b54" fontFamily="Open Sans, sans-serif" fontWeight="700" fontSize="7" letterSpacing="0.8">CAPACITY UTIL</text>
                    <text x="8" y="25" fill="#ff9e29" fontFamily="Open Sans, sans-serif" fontWeight="700" fontSize="10">78%</text>
                    <polygon points="20,32 26,32 22,38" fill="#ffffff" stroke="#125b54" strokeWidth="1.2" />
                  </g>
                </g>
                <g transform="translate(280, 96)">
                  <g className="plant-note plant-note--2">
                    <rect x="0" y="0" width="86" height="32" rx="6" fill="#ffffff" stroke="#125b54" strokeWidth="1.2" />
                    <text x="8" y="13" fill="#125b54" fontFamily="Open Sans, sans-serif" fontWeight="700" fontSize="7" letterSpacing="0.8">CHANNEL CHECK</text>
                    <text x="8" y="25" fill="#7fd28c" fontFamily="Open Sans, sans-serif" fontWeight="700" fontSize="10">stable demand</text>
                    <polygon points="60,32 66,32 62,38" fill="#ffffff" stroke="#125b54" strokeWidth="1.2" />
                  </g>
                </g>
              </svg>
            </div>

            <div className="p-[28px] px-[26px] max-md:p-[22px] max-md:px-[20px] flex-1 flex flex-col">
              <p className="font-sans text-[14px] font-bold uppercase text-[#B35300] mb-3" style={{ letterSpacing: "0.35rem !important" }}>
                On-ground intelligence
              </p>
              <h3 className="font-sans font-bold text-[clamp(22px,2.4vw,26px)] text-[#125b54] leading-[1.2] mb-3 tracking-[-0.005em] max-md:text-[21px]">
                Plant Visit Notes
              </h3>
              <p className="font-sans text-[15px] leading-[1.6] text-[#5a6e6a] mb-[22px]">
                We don&apos;t just read annual reports. We visit factories, count products, talk to workers, and tell you what&apos;s really going on.
              </p>

              <div className="mb-[26px] bg-[#f8f2e7] border border-[#e8dfc9] rounded-[14px] pt-[18px] pb-[18px] pl-[20px] pr-[20px] max-md:py-[14px] max-md:px-[16px]">
                <div>
                  <p className="font-sans text-[13.5px] font-bold tracking-[0.22em] uppercase text-[#125b54] mb-1.5">
                    On-demand
                  </p>
                  <p className="font-sans text-[13.5px] leading-[1.6] text-[#2c4945] m-0 max-md:text-[13px]">
                    Pick any name on your watchlist; we deploy and deliver a structured report on capacity, sourcing, labour, and management honesty.
                  </p>
                </div>

                <div className="h-[1px] bg-[rgba(18,91,84,0.12)] my-[14px]" aria-hidden="true" />

                <div>
                  <p className="font-sans text-[13.5px] font-bold tracking-[0.22em] uppercase text-[#125b54] mb-1.5">
                    Our coverage
                  </p>
                  <p className="font-sans text-[13.5px] leading-[1.6] text-[#2c4945] m-0 max-md:text-[13px]">
                    We regularly visit factories of stocks we cover. You can get the field notes: what we saw, what changed, and whether it shifts our view.
                  </p>
                </div>
              </div>

              <div className="mt-auto self-center">
                <ContactModal
                  trigger={
                    <button type="button" className="inline-flex items-center gap-[8px] self-center mt-auto py-[11px] px-[22px] border-0 rounded-full bg-[#c05600] hover:bg-[#9e4700] text-white font-sans font-bold text-[14px] tracking-[0.01em] cursor-pointer shadow-[0_8px_18px_-8px_rgba(235,133,0,0.45)] hover:shadow-[0_12px_22px_-8px_rgba(235,133,0,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#125b54] focus-visible:ring-offset-3 [-webkit-tap-highlight-color:transparent] max-md:transition-none max-md:hover:translate-y-0">
                      <span>Enquire Now</span>
                    </button>
                  }
                />
              </div>
            </div>
          </article>

        </div>

      </div>
    </section>
  );
};
