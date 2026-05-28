import React, { useState, useEffect, useRef } from "react";

const BASKETS = [
  {
    scid: "KAKYMO_0001",
    shortName: "Value Buy Opportunities",
    tagline: "Great companies. Fair prices. Patient money.",
    forYouIf:
      "You're willing to buy quality companies at fair prices and wait till the markets reward you.",
  },
  {
    scid: "KAKYFMM_0002",
    shortName: "Dividend Yield and Growth",
    tagline: "Steady dividends today, capital growth tomorrow.",
    forYouIf:
      "You want your money working for you: steady dividends today, and meaningful capital growth over time.",
  },
  {
    scid: "KAKYNM_0001",
    shortName: "Cyclical & Fundamental Opportunities",
    tagline: "Buy fear. Sell greed.",
    forYouIf:
      "You're brave enough to buy when everyone else is panic-selling and wait for the cycle to turn.",
  },
  {
    scid: "KAKYFMM_0001",
    shortName: "Concentration & Conviction HNI",
    tagline: "Best ideas only, deep conviction.",
    forYouIf:
      "You want concentrated bets on a few high-quality stocks, sized to actually move your portfolio.",
  },
];

const ROTATION_MS = 10000;

export const SmallcaseCarousel = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [pausedByHover, setPausedByHover] = useState(false);
  const [pausedByFocus, setPausedByFocus] = useState(false);
  const [pausedByVisibility, setPausedByVisibility] = useState(false);

  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Resize handler to determine three-card vs single-card layout
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Page visibility handler to pause when tab is inactive
  useEffect(() => {
    const handleVisibility = () => {
      setPausedByVisibility(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Helper to calculate circular index offset
  const getOffset = (idx: number) => {
    const len = BASKETS.length;
    let d = idx - activeIdx;
    if (d > len / 2) d -= len;
    if (d < -Math.floor(len / 2)) d += len;
    return d;
  };

  const isPaused = pausedByHover || pausedByFocus || pausedByVisibility;

  // Auto-rotation loop
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = null;
      }
      // Save progress so it pauses nicely
      elapsedRef.current += performance.now() - startTimeRef.current;
      return;
    }

    startTimeRef.current = performance.now();

    const tick = () => {
      const now = performance.now();
      const elapsed = elapsedRef.current + (now - startTimeRef.current);
      const pct = Math.min(100, (elapsed / ROTATION_MS) * 100);
      setProgress(pct);

      if (elapsed >= ROTATION_MS) {
        setActiveIdx((prev) => (prev + 1) % BASKETS.length);
        setProgress(0);
        elapsedRef.current = 0;
        startTimeRef.current = performance.now();
      } else {
        timerRef.current = requestAnimationFrame(tick);
      }
    };

    timerRef.current = requestAnimationFrame(tick);

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [isPaused, activeIdx]);

  const selectBasket = (idx: number) => {
    setActiveIdx(idx);
    setProgress(0);
    elapsedRef.current = 0;
    startTimeRef.current = performance.now();
  };

  const handlePrev = () => {
    selectBasket((activeIdx - 1 + BASKETS.length) % BASKETS.length);
  };

  const handleNext = () => {
    selectBasket((activeIdx + 1) % BASKETS.length);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "Home") {
      e.preventDefault();
      selectBasket(0);
    } else if (e.key === "End") {
      e.preventDefault();
      selectBasket(BASKETS.length - 1);
    }
  };

  // Touch swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartRef.current = null;
  };

  return (
    <section className="pt-16 px-6 bg-white overflow-hidden" aria-label="Smallcases Section">
      <div className="max-w-[1200px] mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-10">
          <p className="inline-flex items-center gap-3 text-xs md:text-sm font-bold tracking-[0.18em] uppercase text-[#ff9e29] mb-4">
            <span className="w-6 h-[1px] bg-[#ff9e29] opacity-50 shrink-0"></span>
            Hand-picked basket of stocks • You own them directly
            <span className="w-6 h-[1px] bg-[#ff9e29] opacity-50 shrink-0"></span>
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#125b54] mb-4">
            Our{" "}
            <span className="text-[#ff9e29] relative inline-block">
              Smallcases
              <span className="absolute left-0 right-0 bottom-[-3px] h-[2px] bg-[#ff9e29] opacity-30 rounded"></span>
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#5a6e6a] leading-relaxed">
            Pick the strategy that fits your goals. The stocks land directly in your demat.
          </p>
        </div>

        {/* Carousel Frame */}
        <div className="relative" ref={containerRef}>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#125b54] border border-[#0b3a36]/55 text-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-[#0a3d38] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9e29] focus-visible:ring-offset-2"
            aria-label="Previous basket"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#125b54] border border-[#0b3a36]/55 text-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-[#0a3d38] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9e29] focus-visible:ring-offset-2"
            aria-label="Next basket"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 fill-none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          {/* Cards Area */}
          <div
            className="relative h-[400px] md:h-[340px] overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#ff9e29] focus-visible:ring-offset-4"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onFocus={() => setPausedByFocus(true)}
            onBlur={() => setPausedByFocus(false)}
          >
            {BASKETS.map((b, idx) => {
              const offset = getOffset(idx);
              const abs = Math.abs(offset);
              const isActive = abs === 0;

              // Compute transforms / styles based on responsive layout
              let style: React.CSSProperties = {};
              if (!isDesktop) {
                style = {
                  transform: `translate(-50%, 0) translateX(${offset * 110}%)`,
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 30 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                };
              } else {
                let tx = 0;
                let scale = 1;
                let opacity = 1;
                let z = 30;
                let blur = 0;
                let pe: "auto" | "none" = "auto";

                if (abs === 0) {
                  tx = 0; scale = 1; opacity = 1; z = 30; blur = 0; pe = "auto";
                } else if (abs === 1) {
                  tx = offset * 460; scale = 0.68; opacity = 0.32; z = 20; blur = 1.5; pe = "auto";
                } else {
                  tx = offset * 720; scale = 0.5; opacity = 0; z = 10; blur = 3; pe = "none";
                }

                style = {
                  transform: `translate(-50%, 0) translateX(${tx}px) scale(${scale})`,
                  opacity,
                  zIndex: z,
                  filter: blur > 0 ? `blur(${blur}px)` : "none",
                  pointerEvents: pe,
                };
              }

              return (
                <div
                  key={b.scid}
                  style={style}
                  className="absolute top-0 left-1/2 w-[300px] md:w-[500px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0.24,1)] will-change-[transform,opacity]"
                  onMouseEnter={() => { if (isActive) setPausedByHover(true); }}
                  onMouseLeave={() => { if (isActive) setPausedByHover(false); }}
                >

                  {/* Timer border (svg overlay) */}
                  {isActive && (
                    <div className="absolute inset-0 pointer-events-none z-20">
                      <svg className="w-full h-full overflow-visible" aria-hidden="true" preserveAspectRatio="none">
                        <rect
                          x="1.5"
                          y="1.5"
                          width="100%"
                          height="100%"
                          fill="none"
                          stroke="rgba(18,91,84,0.06)"
                          strokeWidth="1.5"
                          className="rounded-lg"
                        />
                        <rect
                          x="1.5"
                          y="1.5"
                          width="100%"
                          height="100%"
                          fill="none"
                          stroke="#ff9e29"
                          strokeWidth="2.5"
                          pathLength="100"
                          strokeDasharray="100"
                          strokeDashoffset={100 - progress}
                          className="rounded-lg transition-[stroke-dashoffset] duration-75 linear"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Embed content */}
                  <div className="rounded-lg overflow-hidden bg-white shadow-sm border border-gray-100 h-[378px] md:h-[300px] flex items-center justify-center">

                    {/* Desktop widget iframe */}
                    <iframe
                      className="hidden md:block w-full h-[300px] border-0"
                      src={`https://www.smallcase.com/embed/smallcase?scid=${b.scid}&cardsize=big&primaryCta=view&viewOnCreatorPlatform=true`}
                      title={b.shortName}
                    ></iframe>

                    {/* Mobile widget iframe */}
                    <iframe
                      className="block md:hidden w-[300px] h-[378px] border-0"
                      src={`https://www.smallcase.com/embed/smallcase?scid=${b.scid}&cardsize=small&primaryCta=view&viewOnCreatorPlatform=true`}
                      title={b.shortName}
                    ></iframe>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center items-center gap-2 mt-6" role="tablist" aria-label="Select a basket">
          {BASKETS.map((b, idx) => (
            <button
              key={b.scid}
              role="tab"
              onClick={() => selectBasket(idx)}
              aria-selected={idx === activeIdx}
              className={`h-2 rounded-full transition-all duration-300 ${idx === activeIdx ? "bg-[#125b54] w-6" : "bg-[#e8dfc9] w-2 hover:bg-[#8aa39e]"
                }`}
              aria-label={`Show ${b.shortName}`}
            ></button>
          ))}
        </div>

        {/* For-You Section */}
        <div className="text-center max-w-[620px] mx-auto mt-9 px-3">
          <div className="max-w-[560px] mx-auto p-4 md:p-5 bg-[#f8f2e7] border border-[#e8dfc9] rounded-2xl transition-all duration-300">
            <p className="text-lg md:text-xl font-bold text-[#125b54] mb-3 tracking-wide">
              FOR <span className="text-[#ff9e29]">YOU</span> IF
            </p>
            <p className="text-sm md:text-base text-[#5a6e6a] leading-relaxed transition-opacity duration-300">
              {BASKETS[activeIdx].forYouIf}
            </p>
          </div>
        </div>

        {/* Explore All CTA */}
        <div className="text-center mt-8">
          <a
            href="https://kamayakya.smallcase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#eb8500] hover:bg-[#d27500] text-white font-semibold text-sm md:text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            Explore all smallcases
            <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-none stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};
