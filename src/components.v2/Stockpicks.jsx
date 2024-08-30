// import { url } from "inspector";
import React from "react";
import { Button } from "../components.v2/button/button.tsx";
import { ButtonSize, ButtonVariant } from "../components.v2/button/button.tsx";
import { MoveRight } from "lucide-react";
// import LatestReleases from "../components.v3/section/LatestReleases";
import Discover from "../components.v3/section/Discover.jsx";
import { Carousel } from "../components.v2/carousel";
// import Mainboard from "../components.v3/section/Mainboard.jsx";
import ProgressBar from "../components.v3/common/ProgressBar.jsx";
import Bannerhotstockscard from "../components.v3/common/Bannerhotstockscard.jsx";
import { Navbar } from "@nextui-org/react";
import StocksTab from "../components.v3/common/StocksTab.jsx";
import { ButtonnArrow } from "./button/btn-arrow-icon.tsx";
import { border } from "@chakra-ui/react";
import { BorderColor } from "@mui/icons-material";

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
    <>
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
          <div className="absolute top-0 left-0 h-full w-full opacity-40">
            <img
              src="/assets/bg-vector.svg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="relative w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto max-h-[700px]  md:max-h-[950px]">
          <div className="min-w-[470px] z-5 text-center relative">
            <div className="pt-9 pb-[22px] flex justify-center bg-white">
              <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 h-36 w-full">
                <ButtonnArrow
                  onClick={handleContactButton}
                  variant={ButtonVariant.sebi}
                  size={ButtonSize.lg}
                >
                  SEBI Registered: INH000009843
                </ButtonnArrow>
              </div>
            </div>
            <h1 className="text-3xl font-bold leading-[38px] text-white mb-8 flex justify-center">
              Discover hidden gems! 💎
            </h1>
            {/* Banner tab  */}
            <div className="flex justify-center">
              <StocksTab />
            </div>
          </div>
        </div>
        {/* Hot Stocks card  */}
        <Bannerhotstockscard />
      </div>

      {/* Latest Releases (10)  */}
      {/* <LatestReleases /> */}
      {/* Discover by Strategy */}
      {/* <Discover /> */}
      {/* All Mainboard Stocks */}
      {/* <Mainboard /> */}
    </>
  );
}

export default Stockpicks;
