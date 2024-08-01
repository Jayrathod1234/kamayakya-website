// import { url } from "inspector";
import React from "react";
import { Button } from "../components.v2/button/button.tsx";
import { ButtonSize, ButtonVariant } from "../components.v2/button/button.tsx";
import { MoveRight } from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";
import LatestReleases from "../components.v3/section/LatestReleases";
import Discover from "../components.v3/section/Discover.jsx";
import { Carousel } from "../components.v2/carousel";
import Mainboard from "./Mainboard.jsx";

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
      {/* banner  */}

      <div className=" font-open_sans h-[756px] relative">
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
              <a
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
              </a>
            </div>
            <h1 className="text-3xl font-bold leading-[38px] text-white mb-8 flex justify-center">
              Discover hidden gems! 💎
            </h1>
            <div className="bg-white rounded-[61px] mx-auto max-w-[347px] py-[6px] z-50">
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
                  className="bg-white peer-checked/tab-one:bg-black peer-checked/tab-one:text-white px-10 py-2 rounded-[47px] block text-base font-semibold cursor-pointer"
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
                  className="bg-white peer-checked/tab-two:bg-black peer-checked/tab-two:text-white cursor-pointer px-10 py-2 rounded-[47px] block text-base font-semibold"
                >
                  SME Board
                  <span className="block text-[11px] font-bold">14 Stocks</span>
                </label>
                <div className="basis-full h-0 transition ease-out duration-700"></div>
              </div>
            </div>
          </div>
        </div>
        {/* card  */}
        <div className="relative z-[2] pb-[110px] mt-[20px]">
          <div className="container mx-auto">
            <div className="bg-gray-150 p-[10px] rounded-[20px]">
              <div className="bg-[#fff] rounded-[20px] px-10 py-8 gap-10 text-center">
                <h2 className="text-display-xs font-bold leading-8 font-open_sans m-0">
                  Hot Stocks (3)
                </h2>
                <p className="pt-3 font-normal text-sm text-gray-500 pb-10">
                  Top stocks to invest in right NOW!
                </p>
                <div className="bg-white bg-[url('/assets/grid.png')] bg-cover py-[74px] px-[80px] flex items-center  rounded-[10px]">
                  <div className="sm:w-1/3 w-1/2">
                    <img
                      src="/assets/noto_locked.png"
                      alt=""
                      className="w-[46px]"
                    />
                    <p className="text-display-sm font-bold leading-[38px] text-left font-open_sans pt-4 max-w-[324px] tracking-normal">
                      Gain exclusive access to
                      <span className="text-[#108973]">
                        30+ potential multibagger picks
                      </span>
                      <br></br>with KamayaKya membership.
                    </p>
                    <div className=" !mt-6">
                      <Button
                        endIcon={<MoveRight className=" text-inherit" />}
                        onClick={handleContactButton}
                        variant={ButtonVariant.primary}
                        size={ButtonSize.lg}
                      >
                        Explore Plans
                      </Button>
                    </div>
                  </div>

                  <div className="sm:w-7/12 w-1/2">
                    <div className="flex">
                      {/* 1 */}
                      <div className="flex relative">
                        <div className="absolute top-[17px] z-[11] left-[126px] ">
                          <img
                            src="/assets/hottab.png"
                            alt=""
                            className="w-[159px]"
                          />
                        </div>
                        <div className="relative rounded-lg bg-white border border-[#FEC84B] p-[15px] max-w-[308px] z-[5] scale-y-90 left-[65px]">
                          <div className="gap-2 flex">
                            <div className="flex gap-[6px]">
                              <img
                                src="/assets/noto_locked.png"
                                alt=""
                                className="w-[16px] "
                              />
                              <div className="min-w-[215px] flex justify-center rounded-2xl bg-[#EDF0F5] gap-1 h-full w-full mr-4"></div>
                              <img
                                src="/assets/noto_locked.png"
                                alt=""
                                className="w-[16px] "
                              />
                              {/* <div class="relative flex  items-center group">
                                <img
                                  src="/assets/play.gif"
                                  alt=""
                                  className=""
                                />
                                <div class="absolute bottom-0 flex flex-col items-center hidden mb-4 group-hover:flex gap-[6px]">
                                  <span class="relative z-10 p-2 text-xs leading-none text-black whitespace-no-wrap bg-white shadow-lg">
                                    Watch Video
                                    <img src="/assets/image/Icon.svg" alt="" />
                                  </span>
                                  <div class="w-3 h-3 -mt-2 rotate-45 bg-white"></div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                          <div className="pt-[9px] flex items-center gap-[6px] pb-[15px]">
                            <div className="py-[3px] pr-[6px] pl-1 rounded-2xl border border-[#FEF0C7] bg-white flex gap-[3px]">
                              <img
                                src="/assets/streamline_hotel-air-conditioner-solid.svg"
                                alt=""
                              />
                              <p className="text-[7px] font-semibold text-[#A3651A]">
                                Air Conditioners
                              </p>
                            </div>
                            <div className="py-[3px] pr-[6px] pl-1 rounded-2xl border border-[#FEF0C7] bg-white flex gap-[3px]">
                              <img src="/assets/Component 8.svg" alt="" />
                              <p className="text-[7px] font-semibold text-[#667085]">
                                MCap:
                                <span className="blur-sm">₹2843 Cr</span>
                              </p>
                            </div>
                            <div className="px-1 py-[1px] rounded-2xl border border-[#EDF0F5] bg-white flex gap-[3px] items-center">
                              <img src="/assets/ic_round-diamond.svg" alt="" />
                              <p className="text-[7px] font-semibold text-[#344054] flex gap-[3px]">
                                Deep Value
                                <span className="text-[#108973] font-bold">
                                  +3
                                </span>
                              </p>
                              <img src="/assets/chevron-down.svg" alt="" />
                            </div>
                          </div>

                          <div className="p-[6px] rounded-xl bg-[#f7f8fa]">
                            <div className="rounded-[7px] bg-custom-gradient text-center text-white ">
                              <div className="flex justify-end p-2">
                                <img
                                  src="/assets/streamline_target-solid.svg"
                                  alt=""
                                />
                              </div>

                              <div className="px-[21px] pb-[18px]">
                                <div className="gap-[7px] items-center flex justify-center ">
                                  <p className="text-2xs font-semibold leading-[18px] text-white font-open_sans  ">
                                    Upside left
                                  </p>
                                  <img
                                    src="/assets/ph_info-duotone.svg"
                                    alt=""
                                  />
                                </div>
                                <h3 className="text-[27px] font-bold leading-[33px] m-0">
                                  12.24%
                                </h3>
                                <p className="text-[9px] font-normal text-[#E4E7EC]">
                                  likely within a year
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between pt-[6px] px-[9px] ">
                              <div className="flex gap-[3px] items-center">
                                <img src="/assets/Layer_1.svg" alt="" />
                                <p className="text-[8px] font-semibold text-[#344054] font-open_sans">
                                  Total Returns
                                </p>
                              </div>
                              <div className="flex gap-[2px] items-center font-open_sans">
                                <img src="/assets/Polygon 2.svg" alt="" />
                                <p className="text-[9px] font-bold text-[#1D2939]">
                                  64.08%
                                </p>
                                <span className="text-[7px] font-semibold text-[#6E6E6E]">
                                  in less than a month
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-[15px] pb-[7px]">
                            <ProgressBar />
                          </div>

                          {/* btn  */}
                          <div className="py-[15px]">
                            <button
                              className="button-82-pushable"
                              role="button"
                            >
                              <span className="button-82-shadow"></span>
                              <span className="button-82-edge"></span>

                              <span className="button-82-front text flex items-center">
                                <img
                                  src="/assets/noto_locked.png"
                                  alt=""
                                  srcSet=""
                                  className="w-4"
                                />
                                <p className="text-[13px] font-bold text-[#125B54]">
                                  Become a Member
                                </p>
                                <img
                                  src="assets/chevron-right.png"
                                  alt=""
                                  className="w-4"
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* 2 */}
                      <div className="flex relative">
                        <div className="absolute top-[-15px] z-[111] left-[58px] ">
                          <img
                            src="/assets/hottab.png"
                            alt=""
                            className="w-[159px]"
                          />
                        </div>
                        <div className="relative rounded-lg bg-white border border-[#FEC84B] p-[15px] max-w-[308px] z-50 scale-105">
                          <div className="gap-2 flex">
                            <div className="flex gap-[6px]">
                              <img
                                src="/assets/noto_locked.png"
                                alt=""
                                className="w-[16px] "
                              />
                              <div className="min-w-[215px] flex justify-center rounded-2xl bg-[#EDF0F5] gap-1 h-full w-full mr-4"></div>
                              <div class="relative flex  items-center group">
                                <img
                                  src="/assets/play.gif"
                                  alt=""
                                  className=""
                                />
                                <div class="absolute bottom-0 flex flex-col items-center hidden mb-4 group-hover:flex gap-[6px]">
                                  <span class="relative z-10 p-2 text-xs leading-none text-black whitespace-no-wrap bg-white shadow-lg">
                                    Watch Video
                                    <img src="/assets/image/Icon.svg" alt="" />
                                  </span>
                                  <div class="w-3 h-3 -mt-2 rotate-45 bg-white"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="pt-[9px] flex items-center gap-[6px] pb-[15px]">
                            <div className="py-[3px] pr-[6px] pl-1 rounded-2xl border border-[#FEF0C7] bg-white flex gap-[3px]">
                              <img
                                src="/assets/streamline_hotel-air-conditioner-solid.svg"
                                alt=""
                              />
                              <p className="text-[7px] font-semibold text-[#A3651A]">
                                Air Conditioners
                              </p>
                            </div>
                            <div className="py-[3px] pr-[6px] pl-1 rounded-2xl border border-[#FEF0C7] bg-white flex gap-[3px]">
                              <img src="/assets/Component 8.svg" alt="" />
                              <p className="text-[7px] font-semibold text-[#667085]">
                                MCap:
                                <span className="blur-sm">₹2843 Cr</span>
                              </p>
                            </div>
                            <div className="px-1 py-[1px] rounded-2xl border border-[#EDF0F5] bg-white flex gap-[3px] items-center">
                              <img src="/assets/ic_round-diamond.svg" alt="" />
                              <p className="text-[7px] font-semibold text-[#344054] flex gap-[3px]">
                                Deep Value
                                <span className="text-[#108973] font-bold">
                                  +3
                                </span>
                              </p>
                              <img src="/assets/chevron-down.svg" alt="" />
                            </div>
                          </div>

                          <div className="p-[6px] rounded-xl bg-[#f7f8fa]">
                            <div className="rounded-[7px] bg-custom-gradient text-center text-white ">
                              <div className="flex justify-end p-2">
                                <img
                                  src="/assets/streamline_target-solid.svg"
                                  alt=""
                                />
                              </div>

                              <div className="px-[21px] pb-[18px]">
                                <div className="gap-[7px] items-center flex justify-center ">
                                  <p className="text-2xs font-semibold leading-[18px] text-white font-open_sans  ">
                                    Upside left
                                  </p>
                                  <img
                                    src="/assets/ph_info-duotone.svg"
                                    alt=""
                                  />
                                </div>
                                <h3 className="text-[27px] font-bold leading-[33px] m-0">
                                  12.24%
                                </h3>
                                <p className="text-[9px] font-normal text-[#E4E7EC]">
                                  likely within a year
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between pt-[6px] px-[9px] ">
                              <div className="flex gap-[3px] items-center">
                                <img src="/assets/Layer_1.svg" alt="" />
                                <p className="text-[8px] font-semibold text-[#344054] font-open_sans">
                                  Total Returns
                                </p>
                              </div>
                              <div className="flex gap-[2px] items-center font-open_sans">
                                <img src="/assets/Polygon 2.svg" alt="" />
                                <p className="text-[9px] font-bold text-[#1D2939]">
                                  64.08%
                                </p>
                                <span className="text-[7px] font-semibold text-[#6E6E6E]">
                                  in less than a month
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-[15px] pb-[7px]">
                            <ProgressBar />
                          </div>

                          {/* btn  */}
                          <div className="py-[15px]">
                            <button
                              className="button-82-pushable"
                              role="button"
                            >
                              <span className="button-82-shadow"></span>
                              <span className="button-82-edge"></span>

                              <span className="button-82-front text flex items-center">
                                <img
                                  src="/assets/noto_locked.png"
                                  alt=""
                                  srcSet=""
                                  className="w-4"
                                />
                                <p className="text-[13px] font-bold text-[#125B54]">
                                  Become a Member
                                </p>
                                <img
                                  src="assets/chevron-right.png"
                                  alt=""
                                  className="w-4"
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* 3 */}
                      <div className="flex relative">
                        <div className="absolute top-[16px] z-[11] left-[1px] ">
                          <img
                            src="/assets/hottab.png"
                            alt=""
                            className="w-[159px]"
                          />
                        </div>
                        <div className="relative rounded-lg bg-white border border-[#FEC84B] p-[15px] max-w-[308px] scale-y-90 right-[65px] ">
                          <div className="gap-2 flex">
                            <div className="flex gap-[6px]">
                              <img
                                src="/assets/noto_locked.png"
                                alt=""
                                className="w-[16px] "
                              />
                              <div className="min-w-[215px] flex justify-center rounded-2xl bg-[#EDF0F5] gap-1 h-full w-full mr-4"></div>
                              <div class="relative flex  items-center group">
                                <img
                                  src="/assets/play.gif"
                                  alt=""
                                  className=""
                                />
                                <div class="absolute bottom-0 flex flex-col items-center hidden mb-4 group-hover:flex gap-[6px]">
                                  <span class="relative z-10 p-2 text-xs leading-none text-black whitespace-no-wrap bg-white shadow-lg">
                                    Watch Video
                                    <img src="/assets/image/Icon.svg" alt="" />
                                  </span>
                                  <div class="w-3 h-3 -mt-2 rotate-45 bg-white"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="pt-[9px] flex items-center gap-[6px] pb-[15px]">
                            <div className="py-[3px] pr-[6px] pl-1 rounded-2xl border border-[#FEF0C7] bg-white flex gap-[3px]">
                              <img
                                src="/assets/streamline_hotel-air-conditioner-solid.svg"
                                alt=""
                              />
                              <p className="text-[7px] font-semibold text-[#A3651A]">
                                Air Conditioners
                              </p>
                            </div>
                            <div className="py-[3px] pr-[6px] pl-1 rounded-2xl border border-[#FEF0C7] bg-white flex gap-[3px]">
                              <img src="/assets/Component 8.svg" alt="" />
                              <p className="text-[7px] font-semibold text-[#667085]">
                                MCap:
                                <span className="blur-sm">₹2843 Cr</span>
                              </p>
                            </div>
                            <div className="px-1 py-[1px] rounded-2xl border border-[#EDF0F5] bg-white flex gap-[3px] items-center">
                              <img src="/assets/ic_round-diamond.svg" alt="" />
                              <p className="text-[7px] font-semibold text-[#344054] flex gap-[3px]">
                                Deep Value
                                <span className="text-[#108973] font-bold">
                                  +3
                                </span>
                              </p>
                              <img src="/assets/chevron-down.svg" alt="" />
                            </div>
                          </div>

                          <div className="p-[6px] rounded-xl bg-[#f7f8fa]">
                            <div className="rounded-[7px] bg-custom-gradient text-center text-white ">
                              <div className="flex justify-end p-2">
                                <img
                                  src="/assets/streamline_target-solid.svg"
                                  alt=""
                                />
                              </div>

                              <div className="px-[21px] pb-[18px]">
                                <div className="gap-[7px] items-center flex justify-center ">
                                  <p className="text-2xs font-semibold leading-[18px] text-white font-open_sans  ">
                                    Upside left
                                  </p>
                                  <img
                                    src="/assets/ph_info-duotone.svg"
                                    alt=""
                                  />
                                </div>
                                <h3 className="text-[27px] font-bold leading-[33px] m-0">
                                  12.24%
                                </h3>
                                <p className="text-[9px] font-normal text-[#E4E7EC]">
                                  likely within a year
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between pt-[6px] px-[9px] ">
                              <div className="flex gap-[3px] items-center">
                                <img src="/assets/Layer_1.svg" alt="" />
                                <p className="text-[8px] font-semibold text-[#344054] font-open_sans">
                                  Total Returns
                                </p>
                              </div>
                              <div className="flex gap-[2px] items-center font-open_sans">
                                <img src="/assets/Polygon 2.svg" alt="" />
                                <p className="text-[9px] font-bold text-[#1D2939]">
                                  64.08%
                                </p>
                                <span className="text-[7px] font-semibold text-[#6E6E6E]">
                                  in less than a month
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-[15px] pb-[7px]">
                            <ProgressBar />
                          </div>

                          {/* btn  */}
                          <div className="py-[15px]">
                            <button
                              className="button-82-pushable"
                              role="button"
                            >
                              <span className="button-82-shadow"></span>
                              <span className="button-82-edge"></span>

                              <span className="button-82-front text flex items-center">
                                <img
                                  src="/assets/noto_locked.png"
                                  alt=""
                                  srcSet=""
                                  className="w-4"
                                />
                                <p className="text-[13px] font-bold text-[#125B54]">
                                  Become a Member
                                </p>
                                <img
                                  src="assets/chevron-right.png"
                                  alt=""
                                  className="w-4"
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* banner card  */}

      <LatestReleases />
      <Discover />
      <Mainboard />
    </React.Fragment>
  );
}

export default Stockpicks;
