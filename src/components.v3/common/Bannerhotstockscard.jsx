import React from "react";
import { Button } from "../../components.v2/button/button";
import {
  ButtonSize,
  ButtonVariant,
} from "../../components.v2/button/button.tsx";
import { MoveRight } from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";

const Bannerhotstockscard = () => {
  return (
    <div>
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
                    {/* <Button
                      endIcon={<MoveRight className=" text-inherit" />}
                      onClick={handleContactButton}
                      variant={ButtonVariant.primary}
                      size={ButtonSize.lg}
                    >
                      Explore Plans
                    </Button> */}
                  </div>
                </div>

                <div className="sm:w-7/12 w-1/2">
                  <div className="flex">
                    {/* left-side-card */}
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
                            <p className="min-w-[215px] flex justify-center rounded-2xl bg-[#EDF0F5] gap-1 h-full w-full mr-4"></p>

                            <div class="relative flex  items-center group">
                              <img src="/assets/play.gif" alt="" className="" />
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
                                <img src="/assets/ph_info-duotone.svg" alt="" />
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
                          <button className="button-82-pushable" role="button">
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
                                className="w-4 "
                              />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* center card */}
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
                              <img src="/assets/play.gif" alt="" className="" />
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
                                <img src="/assets/ph_info-duotone.svg" alt="" />
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
                          <button className="button-82-pushable" role="button">
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
                    {/* right-side card */}
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
                              <img src="/assets/play.gif" alt="" className="" />
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
                                <img src="/assets/ph_info-duotone.svg" alt="" />
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
                          <button className="button-82-pushable" role="button">
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
  );
};

export default Bannerhotstockscard;
