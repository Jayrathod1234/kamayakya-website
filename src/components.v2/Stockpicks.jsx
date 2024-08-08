// import { url } from "inspector";
import React from "react";
import { Button } from "../components.v2/button/button.tsx";
import { ButtonSize, ButtonVariant } from "../components.v2/button/button.tsx";
import { MoveRight } from "lucide-react";
import LatestReleases from "../components.v3/section/LatestReleases";
import Discover from "../components.v3/section/Discover.jsx";
import { Carousel } from "../components.v2/carousel";
import Mainboard from "../components.v3/section/Mainboard.jsx";
import ProgressBar from "../components.v3/common/ProgressBar.jsx";
import Bannerhotstockscard from "../components.v3/common/Bannerhotstockscard.jsx";
import { Navbar } from "@nextui-org/react";
import StocksTab from "../components.v3/common/StocksTab.jsx";
import { ButtonnArrow } from "./button/btn-arrow-icon.tsx";


function Stockpicks() {
  const handleContactButton = () => {
    const mp = getMixPanelClient();
    mp.track("contactus_clicked", {
      page: "Pricing_Page",
      pagegroup: "enterprise_solution",
    });
    mp.track("asktheteam_loaded", {
      page: "Pricing_Page",
      pagegroup: "enterprise_solution",
    });
  };
  return (
    <React.Fragment>
      {/* <Navbar /> */}
      {/* stocks-picks Banner */}

      <div className=" font-open_sans h-[805px] relative">
        <div className="absolute top-[-56px] left-0 h-full w-full">
          <video
            autoPlay
            muted
            playsInline
            loop
            className="h-full w-full object-cover"
          >
            <source
              src="/assets/-7d58-4850-b149-dc7147331e8d.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute top-0 left-0 h-full w-full">
            <img
              src="/assets/bg-vector.svg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="relative w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto max-h-[700px]  md:max-h-[950px]">
          <div className="min-w-[470px] z-5 text-center relative">
            <div className="pt-9 pb-[22px] flex justify-center">
              {/* <a
                className="py-[6px] pr-[10px] pl-[14px] text-white text-sm border border-[#75cdc5] rounded-3xl bg-[#108973]/[0.20]"
                href="https://kamayakya.com/Kamayakya-SEBI-License.pdf#toolbar=0&fitH=1"
              >
                SEBI Registered: INH000009843
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="inline-block"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a> */}
              <ButtonnArrow
                // endIcon={<MoveRight className=" text-inherit" />}
                onClick={handleContactButton}
                variant={ButtonVariant.sebi}
                size={ButtonSize.lg}
                // strokeStyle=" stroke-brand-400"
                // arrowStyle="rotate-90 stroke-white"
              >
                SEBI Registered: INH000009843
              </ButtonnArrow>
            </div>
            <h1 className="text-3xl font-bold leading-[38px] text-white mb-8 flex justify-center">
              Discover hidden gems! 💎
            </h1>
            {/* Banner tab  */}
            <div className="flex justify-center">
              <StocksTab />
            </div>

            {/* <div className="bg-white rounded-[61px] mx-auto max-w-[347px] py-[6px] z-50">
              <div className="flex flex-row flex-wrap justify-center">
                <input
                  id="tab-one"
                  type="radio"
                  name="tabs"
                  className="peer/tab-one opacity-0 absolute"
                  checked
                />
                <label
                  for="tab-one"
                  className="bg-white peer-checked/tab-one:bg-black peer-checked/tab-one:text-white px-10 py-2 rounded-[47px] block text-base font-semibold cursor-pointer transition duration-500 ease-in"
                >
                  Main Board
                  <span className="block text-[11px] font-bold">12 Stocks</span>
                </label>
                <input
                  id="tab-two"
                  type="radio"
                  name="tabs"
                  className="peer/tab-two opacity-0 absolute"
                />
                <label
                  for="tab-two"
                  className="bg-white peer-checked/tab-two:bg-black peer-checked/tab-two:text-white cursor-pointer px-10 py-2 rounded-[47px] block text-base font-semibold transition duration-500 ease-in"
                >
                  SME Board
                  <span className="block text-[11px] font-bold">14 Stocks</span>
                </label>
                <div className="basis-full h-0 transition ease duration-500"></div>
              </div>
            </div> */}
          </div>
        </div>
        {/* Hot Stocks card  */}
        <Bannerhotstockscard />
      </div>

      {/* Latest Releases (10)  */}
      <LatestReleases />
      {/* Discover by Strategy */}
      <Discover />
      {/* All Mainboard Stocks */}
      <Mainboard />
    </React.Fragment>
  );
}

export default Stockpicks;
