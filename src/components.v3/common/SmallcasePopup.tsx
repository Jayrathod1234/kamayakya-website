import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface SmallcasePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmallcasePopup: React.FC<SmallcasePopupProps> = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  // Close on backdrop click (only directly on backdrop)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault();
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#0f201e]/55 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-6 z-[99999]"
          onClick={handleBackdropClick}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-full max-w-[660px] max-h-[calc(100vh-48px)] bg-white rounded-[20px] shadow-[0_28px_70px_-18px_rgba(11,58,54,0.30)] overflow-hidden grid grid-cols-1 md:grid-cols-[260fr_400fr] will-change-transform"
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            aria-describedby="popup-desc"
            tabIndex={-1}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full border border-[#125b54]/20 bg-white/90 text-[#125b54] hover:bg-[#125b54] hover:border-[#125b54] hover:text-white flex items-center justify-center z-[5] transition-all duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff9e29] focus-visible:outline-offset-2 max-md:top-2 max-md:right-2 max-md:w-9 max-md:h-9"
              aria-label="Close this message"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 3 L13 13 M13 3 L3 13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Left aside (cream panel) */}
            <aside
              className="relative border-r border-[#e8dfc9]/70 p-8 sm:p-6 pb-7 sm:pb-7 flex flex-col items-center justify-between gap-4 overflow-hidden max-md:flex-row max-md:justify-start max-md:p-[22px_20px_18px] max-md:border-r-0 max-md:border-b"
              aria-hidden="true"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(18, 91, 84, 0.10) 1px, transparent 1.6px), radial-gradient(130% 80% at 20% 0%, #f8f2e7 0%, #f0e7d4 70%, #f0e7d4 100%)`,
                backgroundSize: "14px 14px, 100% 100%",
              }}
            >
              {/* Orange background decoration bubble */}
              <div className="absolute w-[220px] h-[220px] -left-[90px] -bottom-[90px] bg-[radial-gradient(circle_at_center,rgba(255,158,41,0.22)_0%,rgba(255,158,41,0)_70%)] pointer-events-none z-0" />

              {/* K logo mark */}
              <Image
                className=" inline-block md:hidden h-full w-full"
                src="/KKLogoK.svg"
                alt="KamayaKya-logo"
                width={20}
                height={25}
                priority
              />

              {/* SVG Donut Illustration */}
              <div className="relative z-10 w-full max-w-[184px] aspect-square max-h-[184px] max-md:hidden" aria-hidden="true">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  {/* Background Ring */}
                  <circle
                    cx="100"
                    cy="100"
                    r="64"
                    fill="none"
                    stroke="rgba(18,91,84,0.07)"
                    strokeWidth="22"
                  />

                  <g transform="rotate(-90 100 100)">
                    {/* Segment 1: deep green, 30% */}
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="64"
                      fill="none"
                      stroke="#125b54"
                      strokeWidth="22"
                      initial={{ strokeDasharray: "0 402.124" }}
                      animate={{ strokeDasharray: "120.64 402.124" }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                      strokeDashoffset="0"
                    />

                    {/* Segment 2: orange, 30% */}
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="64"
                      fill="none"
                      stroke="#ff9e29"
                      strokeWidth="22"
                      initial={{ strokeDasharray: "0 402.124" }}
                      animate={{ strokeDasharray: "120.64 402.124" }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
                      strokeDashoffset="-120.64"
                    />

                    {/* Segment 3: deep blue, 25% */}
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="64"
                      fill="none"
                      stroke="#142d51"
                      strokeWidth="22"
                      initial={{ strokeDasharray: "0 402.124" }}
                      animate={{ strokeDasharray: "100.53 402.124" }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.36 }}
                      strokeDashoffset="-241.27"
                    />

                    {/* Segment 4: light green, 15% */}
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="64"
                      fill="none"
                      stroke="#7fd28c"
                      strokeWidth="22"
                      initial={{ strokeDasharray: "0 402.124" }}
                      animate={{ strokeDasharray: "60.32 402.124" }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.48 }}
                      strokeDashoffset="-341.80"
                    />
                  </g>

                  {/* Orbit Dot */}
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "100px 100px" }}
                  >
                    <circle cx="100" cy="22" r="3.5" fill="#ff9e29" />
                  </motion.g>

                  {/* Center Core */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="6"
                    fill="#125b54"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.75, 1] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "100px 100px" }}
                  />
                </svg>
              </div>

              {/* Tagline */}
              <p className="relative z-10 font-sans font-semibold text-[12.5px] tracking-[0.18em] uppercase text-[#125b54] m-0 text-center leading-[1.4] max-md:hidden">
                Smart Investment <span className="text-[#ff9e29]">Solutions</span>
              </p>
            </aside>

            {/* Right Content Panel */}
            <section className="relative p-[38px_36px_34px] flex flex-col justify-center gap-3.5 min-w-0 max-md:p-[26px_22px_24px]">
              <p className="font-sans font-bold text-[11px] tracking-[0.22em] uppercase text-[#ff9e29] m-0 inline-flex items-center gap-2 before:content-[''] before:inline-block before:w-[18px] before:h-[1.5px] before:bg-[#ff9e29]/60">
                Important Update
              </p>

              <h2 id="popup-title" className="font-sans font-bold text-[22px] sm:text-[26px] leading-[1.2] tracking-[-0.01em] text-[#125b54] m-0">
                Hi there!
              </h2>

              <p id="popup-desc" className="font-sans text-[14.5px] leading-[1.6] text-[#5a6e6a] m-0">
                We&rsquo;ve stopped taking new registrations on the website. Our subscriptions are now on{" "}
                <strong className="text-[#1a3530] font-bold">smallcase</strong>, with the same research, same updates,
                and stock baskets with weightages you&rsquo;d expect from us.
              </p>

              <p className="font-sans text-[14.5px] leading-[1.6] text-[#5a6e6a] m-0">
                Head over to our services page to see what we offer and how it works.
              </p>

              <div className="mt-1.5 max-md:w-full">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2.5 p-[14px_28px] bg-[#eb8500] hover:bg-[#d27500] text-white font-sans font-semibold text-[15px] rounded-[10px] cursor-pointer transition-all duration-200 shadow-[0_4px_12px_-4px_rgba(235,133,0,0.45)] hover:shadow-[0_6px_16px_-4px_rgba(235,133,0,0.6)] hover:-translate-y-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#eb8500] focus-visible:outline-offset-[3px] self-start max-md:w-full max-md:justify-center max-md:self-stretch text-center"
                >
                  Explore Our Services
                </Link>
              </div>
            </section>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
