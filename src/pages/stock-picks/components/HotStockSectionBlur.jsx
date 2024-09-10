import React, { useContext } from "react";
import { ButtonSize, ButtonVariant } from "@/components.v2/button/button.tsx";
import ProgressBar2 from "@/components.v3/common/ProgressBar2.jsx";
import { ButtonnArrow } from "@/components.v2/button/btn-arrow-icon.tsx";
import DeepValue from "@/components.v3/common/DeepValue.jsx";
import AuthContext from "@/components/AuthContext";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import { HotSlider } from "@/components.v3/common/HotSlider.jsx";
import StockCard from "@/components.v3/common/StockCard.jsx";
// import { Slider } from "@/components.v3/common/Slider.jsx";
import { getMixPanelClient } from "@/externals/mixpanel";
import { useStockPicks } from "@/contexts/StockPicksContext";
const HotStockSection = ({ items }) => {
  const { stockSector } = useStockPicks();

  const handleContactButton = () => {
    const mp = getMixPanelClient();
    mp.track("explore_plans_clicked", {
      page: "StockPicks_Page",
    });
  };
  const { isLoggedIn, handleLogin } = useContext(AuthContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isLatop = useMediaQuery("(max-width:1024px)");

  return (
    <div>
      <div className="relative z-[2] sm:pb-[110px] pb-[60px] mt-[24px]">
        <div className="container sm:mx-auto p-0">
          {!isLatop ? (
            <div className="bg-gray-150 p-[10px] rounded-[20px] sm:block none max-w-[1280px] mx-auto">
              <div className="bg-[#fff] rounded-[20px] sm:px-10 px-4 sm:pt-10 pb-8 py-5 gap-10 text-center">
                <h2 className="text-display-xs font-bold leading-8 font-open_sans m-0 sm:block hidden text-gray-950">
                  Hot Stocks ({items?.length})
                </h2>
                <p className="pt-3 font-normal text-md text-gray-500 pb-10 sm:block hidden font-open_sans">
                  Top stocks to invest in right NOW!
                </p>
                <div className="bg-white bg-[url('/assets/grid.png')] bg-cover sm:py-[74px] sm:pl-[41px] pr-20  sm: sm:flex  items-center  rounded-[10px]">
                  <div className="sm:w-1/3 w-full sm:pt-0 pt-5">
                    <img
                      src="/assets/noto_locked.png"
                      alt=""
                      className="sm:w-[46px] w-[56px] lg:m-0 m-auto"
                    />

                    {isLoggedIn ? (
                      <>
                        <p className="sm:text-display-sm text-lg font-bold sm:leading-[38px] leading-7 sm:text-left text-center font-open_sans pt-4 max-w-[324px] tracking-normal text-[#0C111D]">
                          Gain exclusive access to
                          <span className="text-[#108973] pl-1 pr-1">
                            30+ potential multibagger picks
                          </span>
                          <br className="sm:block hidden"></br>with KamayaKya
                          membership.
                        </p>

                        <div className="  !mt-6 sm:m-0 m-auto sm:block inline-block">
                          <Link href={`/pricing`}>
                            <ButtonnArrow
                              onClick={handleContactButton}
                              variant={ButtonVariant.primary}
                              size={ButtonSize.lg}
                            >
                              Explore Plans
                            </ButtonnArrow>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* non log in user 3 stock add   */}

                        <p className="sm:text-display-sm text-lg font-bold sm:leading-[38px] leading-7 sm:text-left text-center font-open_sans pt-4 max-w-[324px] tracking-normal text-[#0C111D]">
                          Log in and unlock{" "}
                          <br className="sm:block hidden"></br>3
                          <span className="text-[#108973] pl-1 pr-1">HOT</span>
                          stocks for <br className="sm:block hidden"></br>Free
                        </p>
                        <div className="    sm:!mt-6 !mt-3 lg:m-0 m-auto lg:block inline-block lg:pb-0 pb-7">
                          <ButtonnArrow
                            onClick={handleLogin}
                            variant={ButtonVariant.primary}
                            size={ButtonSize.lg}
                          >
                            Get Free Stocks
                          </ButtonnArrow>
                        </div>
                      </>
                    )}
                  </div>

                  <>
                    <div className="sm:w-7/12 w-full">
                      <div className="flex">
                        {items.length > 0 &&
                          items.map(
                            (
                              {
                                upside_left,
                                stock_tags,
                                sector,
                                stock_target_count,
                                new_stock,
                                recommended_stock,
                                is_blur,
                                upside_left_time,
                                return_time,
                                gain_loss,
                              },
                              index
                            ) => {
                              let tabImage = null;
                              let cardClass = "";
                              let innerClass =
                                "relative rounded-lg bg-white shadow-6xs min-w-[408px] ";

                              if (new_stock & recommended_stock) {
                                tabImage = "hot-newtab";
                                cardClass =
                                  "p-[1px] rounded-lg bg-gradient-to-r from-[#FDB022] to-[#75CDC5]";
                              } else if (new_stock) {
                                tabImage = "newtab";
                                innerClass += "border border-brand-300";
                              } else if (recommended_stock) {
                                tabImage = "hottab";
                                innerClass += "border border-warning-300";
                              }
                              return (
                                <div
                                  className={`flex relative ${
                                    index == 0
                                      ? `scale-75 left-[-10%]`
                                      : index == 1
                                      ? `scale-x-90 left-[-38%] z-10`
                                      : `scale-75 left-[-70%]`
                                  }`}
                                >
                                  <div className="absolute z-10 left-[7.5rem] -top-1">
                                    {tabImage && (
                                      <img
                                        src={`/assets/${tabImage}.png`}
                                        alt=""
                                        className="w-[160px]"
                                      />
                                    )}
                                  </div>
                                  <div className={cardClass}>
                                    <div className={innerClass}>
                                      <div className="pt-[20px] px-[20px] flex gap-[36px] items-center justify-between">
                                        <div className="p-1 gap-2 flex items-center">
                                          <img
                                            src="/assets/noto_locked.png"
                                            alt=""
                                            className="w-[19px]"
                                          />

                                          <div className="h-5 bg-gray-150 rounded-[20px] min-w-[281px]"></div>
                                        </div>

                                        <div className="tooltip">
                                          <img
                                            src="/assets/play.gif"
                                            alt=""
                                            className="w-[24px] blur-[2px]"
                                          />
                                          <span className="tooltiptext relative shadow-3xl">
                                            <img
                                              src="/assets/div.png"
                                              alt=""
                                              className="absolute -top-2 left-[52px] w-4"
                                            />
                                            {isLoggedIn
                                              ? "Please become a member to watch this video."
                                              : "Please login  to watch this video."}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="pt-[12px] px-[20px] pb-[20px]">
                                        <div className=" flex items-center gap-[8px] ">
                                          {stockSector && sector && (
                                            <div className="py-[2px] pr-[16px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px] whitespace-nowrap">
                                              <img
                                                src="/assets/streamline_hotel-air-conditioner-solid.svg"
                                                alt=""
                                                className="w-3"
                                              />
                                              <p className="text-[7px] font-bold text-[#A3651A] font-open_sans">
                                                {stockSector[sector]}
                                              </p>
                                            </div>
                                          )}
                                          <div className="py-[2px] pr-[16px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px] whitespace-nowrap">
                                            <img
                                              src="/assets/Component 8.svg"
                                              alt=""
                                              className="w-3"
                                            />
                                            <p className="text-[10px] font-semibold text-[#667085] flex items-center whitespace-nowrap font-open_sans">
                                              MCap:
                                              {is_blur ? (
                                                <div className=" ms-1 -me-1 w-[47px] h-[12px] bg-[#FFEED9] rounded-full "></div>
                                              ) : (
                                                <span className="">
                                                  ₹ {market_cap}
                                                </span>
                                              )}
                                            </p>
                                          </div>
                                          {stock_tags?.length > 0 && (
                                            <DeepValue
                                              stock_tags={stock_tags}
                                            />
                                          )}
                                        </div>
                                      </div>
                                      <div className="px-5 pb-3">
                                        <div className="p-[8px] rounded-xl bg-[#f7f8fa]">
                                          <div className="rounded-[7px] bg-custom-gradient text-center text-white ">
                                            <div className="flex justify-end px-[11px] pt-[11px]">
                                              <img
                                                src="/assets/streamline_target-solid.svg"
                                                alt=""
                                                className="w-[18px]"
                                              />
                                            </div>

                                            <div className="px-[16px] pb-[24px] grid gap-[6px]">
                                              <div className="gap-[7px] items-center flex justify-center ">
                                                <p className="text-md font-semibold leading-[18px] text-white font-open_sans  ">
                                                  Upside left
                                                </p>
                                                <div className="tooltip">
                                                  <img
                                                    src="/assets/ph_info-duotone.svg"
                                                    alt=""
                                                  />
                                                  <span className="tooltiptext tooltiptext2 relative shadow-3xl ">
                                                    <img
                                                      src="/assets/div.png"
                                                      alt=""
                                                      className="absolute -top-2 left-[52px] w-4"
                                                    />
                                                    <div className="text-gray-800 text-2xs font-normal ">
                                                      Upside Left means how much
                                                      the stock price could rise
                                                      from its current level.
                                                    </div>
                                                    <div className="mt-2 p-2 bg-[#F6F7F9] gap-1 grid rounded-lg">
                                                      <span className="text-[#108973] text-2xs font-bold">
                                                        Example :
                                                      </span>
                                                      <p className="text-2xs text-gray-600 font-normal">
                                                        If a stock's price is
                                                        ₹100 and the Upside Left
                                                        is 20%, it might go up
                                                        to ₹120.
                                                      </p>
                                                    </div>
                                                  </span>
                                                </div>
                                              </div>
                                              <h3 className="text-[36px] font-bold leading-[33px] m-0 font-open_sans">
                                                {upside_left || 0}%
                                              </h3>
                                              <p className="text-2xs font-normal text-[#E4E7EC] font-open_sans">
                                                likely within a{" "}
                                                {upside_left_time}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex justify-between pt-[8px] px-[9px] ">
                                            <div className="flex gap-[3px] items-center">
                                              <img
                                                src="/assets/Layer_1.svg"
                                                alt=""
                                                className="w-3.5"
                                              />
                                              <p className="text-[11px] font-semibold text-[#344054] font-open_sans">
                                                Total Returns
                                              </p>
                                            </div>
                                            <div className="flex gap-[3px] items-center font-open_sans sm:max-w-[150px] max-w-[164px] whitespace-nowrap">
                                              <img
                                                src="/assets/Polygon 2.svg"
                                                alt=""
                                                className="w-2"
                                              />
                                              {!gain_loss ? (
                                                <p className="text-2xs font-bold text-gray-800 font-open_sans blur-sm">
                                                  0%
                                                </p>
                                              ) : (
                                                <p className="text-2xs font-bold text-gray-800 font-open_sans">
                                                  {gain_loss}%
                                                </p>
                                              )}
                                              <span className="text-[10px] font-semibold text-[#6E6E6E]">
                                                in less than a {return_time}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="pt-5 pb-[10px] pr-5">
                                        <ProgressBar2 />
                                      </div>
                                      {!isLoggedIn ? (
                                        <>
                                          <div className="p-5">
                                            {/* btn  */}
                                            <button
                                              className="button-82-pushable group"
                                              role="button"
                                              onClick={handleLogin}
                                            >
                                              <span className="button-82-shadow"></span>
                                              <span className="button-82-edge"></span>
                                              <span className="button-82-front button-82-front2 text flex items-center">
                                                <img
                                                  src="/assets/noto_locked.png"
                                                  alt=""
                                                  className="w-4"
                                                />
                                                <p className="text-[13px] font-bold text-[#125B54] font-open_sans">
                                                  Log In to Get 3 Hot Stocks
                                                </p>
                                                <div className="relative w-5">
                                                  <img
                                                    src="assets/chevron-right.png"
                                                    alt=""
                                                    className="w-4 img-1 transition-opacity duration-300 group-hover:opacity-0"
                                                  />
                                                  <img
                                                    src="assets/pajamas_long-arrow.svg"
                                                    alt=""
                                                    className="w-5 img-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute right-0 top-0"
                                                  />
                                                </div>
                                              </span>
                                            </button>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div className="p-5">
                                            {/* btn  */}
                                            <Link href={`/pricing`}>
                                              <button
                                                className="button-82-pushable group "
                                                role="button"
                                              >
                                                <span className="button-82-shadow"></span>
                                                <span className="button-82-edge"></span>
                                                <span className="button-82-front button-82-front2 text flex items-center">
                                                  <img
                                                    src="/assets/noto_locked.png"
                                                    alt=""
                                                    className="w-4"
                                                  />
                                                  <p className="text-[13px] font-bold text-[#125B54] font-open_sans">
                                                    Become a Member
                                                  </p>
                                                  <div className="relative w-5">
                                                    <img
                                                      src="assets/chevron-right.png"
                                                      alt=""
                                                      className="w-4 img-1 transition-opacity duration-300 group-hover:opacity-0"
                                                    />
                                                    <img
                                                      src="assets/pajamas_long-arrow.svg"
                                                      alt=""
                                                      className="w-5 img-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute right-0 top-0"
                                                    />
                                                  </div>
                                                </span>
                                              </button>
                                            </Link>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-white bg-[url('/assets/grid.png')] bg-cover pt-5  pb-2  text-center sm:rounded-[20px] rounded-[20px] ">
                <img
                  src="/assets/noto_locked.png"
                  alt=""
                  className="sm:w-[46px] w-[56px] lg:m-0 m-auto"
                />
                <p className="sm:text-display-sm lg:text-display-xs md:text-[26px] text-lg font-bold sm:leading-[38px] leading-7 lg:text-center text-center font-open_sans pt-4 lg:max-w-[745px]   tracking-normal">
                  Gain exclusive access to
                  <span className="text-[#108973] pl-1 pr-1">
                    30+ potential multibagger picks
                  </span>
                  <br className="sm:block hidden"></br>with KamayaKya
                  membership.
                </p>
                <div className="  sm:!mt-6 !mt-3 lg:m-0 m-auto lg:block inline-block lg:pb-0 pb-7">
                  <Link href={`/pricing`}>
                    <ButtonnArrow
                      onClick={handleContactButton}
                      variant={ButtonVariant.primary}
                      size={ButtonSize.lg}
                    >
                      Explore Plans
                    </ButtonnArrow>
                  </Link>
                </div>

                <div>
                  {items.length > 0 && (
                    <HotSlider>
                      {items.map((value) => (
                        <StockCard
                          key={value.id} // Ensure each item has a unique key
                          {...value}
                        />
                      ))}
                    </HotSlider>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default HotStockSection;
