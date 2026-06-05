import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SmallcasePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmallcasePopup: React.FC<SmallcasePopupProps> = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      document.body.classList.add("popup-open");
      return () => {
        document.body.classList.remove("popup-open");
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className="fixed inset-0 bg-[#0f201e]/55 backdrop-blur-[2px] flex items-center justify-center p-6 z-[99999] popup-backdrop-fade"
      data-closing={isClosing ? "true" : undefined}
      role="presentation"
    >
      <div
        className="relative w-full max-w-[660px] max-h-[calc(100vh-48px)] bg-white rounded-[20px] shadow-[0_28px_70px_-18px_rgba(11,58,54,0.30)] overflow-hidden grid grid-cols-1 md:grid-cols-[260fr_400fr] popup-scale-fade"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        aria-describedby="popup-desc"
        tabIndex={-1}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute top-3 right-3 w-8 h-8 rounded-full border border-[#125b54]/18 bg-white/90 text-[#125b54] hover:bg-[#125b54] hover:border-[#125b54] hover:text-white flex items-center justify-center z-10 transition-all duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#eb8500] focus-visible:outline-offset-2 max-md:top-2 max-md:right-2 max-md:w-9 max-md:h-9"
          onClick={handleClose}
          aria-label="Close this message"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
            <path
              d="M3 3 L13 13 M13 3 L3 13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* LEFT ASIDE */}
        <aside className="relative popup-aside-bg popup-aside-bubble p-8 sm:p-6 pb-7 sm:pb-7 flex flex-col items-center justify-between gap-4 overflow-hidden border-r border-[#e8dfc9]/70 max-md:flex-row max-md:justify-start max-md:p-[22px_20px_18px] max-md:border-r-0 max-md:border-b" aria-hidden="true">
          <Image
            src="/KKLogo.svg"
            alt="KamayaKya-logo"
            width={188}
            height={42}
            priority
          />

          {/* Donut Art */}
          <div className="relative z-10 w-full max-w-[184px] aspect-square max-h-[184px] popup-aside-art-vector max-md:hidden" aria-hidden="true">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <g transform="rotate(-90 100 100)">
                <circle
                  cx={100}
                  cy={100}
                  r={64}
                  fill="none"
                  stroke="rgba(18,91,84,0.07)"
                  strokeWidth={22}
                />
                <circle
                  className="donut-seg donut-seg--1"
                  cx={100}
                  cy={100}
                  r={64}
                  fill="none"
                  stroke="#125b54"
                  strokeWidth={22}
                  strokeLinecap="butt"
                  strokeDasharray="0 402.124"
                  strokeDashoffset={0}
                />
                <circle
                  className="donut-seg donut-seg--2"
                  cx={100}
                  cy={100}
                  r={64}
                  fill="none"
                  stroke="#ff9e29"
                  strokeWidth={22}
                  strokeLinecap="butt"
                  strokeDasharray="0 402.124"
                  strokeDashoffset="-120.64"
                />
                <circle
                  className="donut-seg donut-seg--3"
                  cx={100}
                  cy={100}
                  r={64}
                  fill="none"
                  stroke="#142d51"
                  strokeWidth={22}
                  strokeLinecap="butt"
                  strokeDasharray="0 402.124"
                  strokeDashoffset="-241.27"
                />
                <circle
                  className="donut-seg donut-seg--4"
                  cx={100}
                  cy={100}
                  r={64}
                  fill="none"
                  stroke="#7fd28c"
                  strokeWidth={22}
                  strokeLinecap="butt"
                  strokeDasharray="0 402.124"
                  strokeDashoffset="-341.80"
                />
              </g>

              <g className="orbit-wrap">
                <circle
                  className="orbit-dot"
                  cx={100}
                  cy={22}
                  r="3.5"
                  fill="#ff9e29"
                />
              </g>

              <circle
                className="donut-core"
                cx={100}
                cy={100}
                r={6}
                fill="#125b54"
              />
            </svg>
          </div>

          <p className="relative z-10 font-sans font-semibold text-[12.5px] tracking-[0.18em] uppercase text-[#125b54] m-0 text-center leading-[1.4] max-md:hidden">
            Smart Investment <span className="text-[#ff9e29]">Solutions</span>
          </p>
        </aside>

        {/* RIGHT CONTENT */}
        <section className="relative p-[38px_36px_34px] flex flex-col justify-center gap-3.5 min-w-0 max-md:p-[26px_22px_24px] max-sm:p-[22px_18px_20px]">
          <p className="font-sans font-bold text-[11px] tracking-[0.22em] uppercase text-[#ff9e29] m-0 inline-flex items-center gap-2 before:content-[''] before:inline-block before:w-[18px] before:h-[1.5px] before:bg-[#ff9e29]/60">
            Important Update
          </p>

          <h2 id="popup-title" className="font-sans font-bold text-[22px] sm:text-[26px] leading-[1.2] tracking-[-0.01em] text-[#125b54] m-0 max-md:text-[20px]">
            Hi there!
          </h2>

          <p id="popup-desc" className="font-sans text-[14.5px] leading-[1.6] text-[#5a6e6a] m-0 max-md:text-[14px]">
            We&rsquo;ve stopped taking new registrations on the website.
            Our subscriptions are now on <strong className="text-[#1a3530] font-bold">smallcase</strong>, with
            the same research, same updates, and stock baskets with
            weightages you&rsquo;d expect from us.
          </p>

          <p className="font-sans text-[14.5px] leading-[1.6] text-[#5a6e6a] m-0 max-md:text-[14px]">
            Head over to our services page to see what we offer and
            how it works.
          </p>

          <div className="mt-1.5 w-full flex sm:flex-row flex-col gap-2">
            <button
              onClick={() => {
                window.open("https://kamayakya.smallcase.com/", "_blank");
                sessionStorage.removeItem("smallcase_popup_dismissed");
                sessionStorage.removeItem("new_user");
              }}
              className="inline-flex sm:w-[50%] w-full items-center justify-center gap-2.5 py-3.5 px-auto bg-[#eb8500] hover:bg-[#d27500] text-white font-sans font-semibold text-[15px] rounded-[10px] cursor-pointer transition-all duration-200 shadow-[0_4px_12px_-4px_rgba(235,133,0,0.45)] hover:shadow-[0_6px_16px_-4px_rgba(235,133,0,0.6)] hover:-translate-y-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#eb8500] focus-visible:outline-offset-[3px] self-start max-md:w-full max-md:self-stretch text-center"
            >
              Explore Our Services
            </button>
            <button
              onClick={() => {
                router.push("/services")
                sessionStorage.removeItem("smallcase_popup_dismissed");
                sessionStorage.removeItem("new_user");
              }}
              className="inline-flex sm:w-[50%] w-full items-center justify-center gap-2.5 py-3.5 px-auto bg-[#eb8500] hover:bg-[#d27500] text-white font-sans font-semibold text-[15px] rounded-[10px] cursor-pointer transition-all duration-200 shadow-[0_4px_12px_-4px_rgba(235,133,0,0.45)] hover:shadow-[0_6px_16px_-4px_rgba(235,133,0,0.6)] hover:-translate-y-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#eb8500] focus-visible:outline-offset-[3px] self-start max-md:w-full max-md:self-stretch text-center"
            >
              How It Works?
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
