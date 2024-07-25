// import { url } from "inspector";
import React from "react";
import { Button } from "../components.v2/button/button.tsx";
import { ButtonSize, ButtonVariant } from "../components.v2/button/button.tsx";
import { MoveRight } from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";
import Latest from "./Latest.jsx";
import Discover from "./Discover.jsx";

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
      {/* banner  */}
      <div>
        <div
          className="bg-[#124b4c] font-open_sans"
          // style={{ backgroundImage: `url(require("/assets/video-img.png"))` }}
        >
          {/* <img src="/assets/video-img.png" alt="" className="w-full" /> */}
          <div className="relative">
            <div className="relative w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto max-h-[700px]  md:max-h-[950px]">
              <div class="min-w-[470px] z-50 text-center">
                <div class="pt-9 pb-[22px] flex justify-center">
                  <a
                    class="py-[6px] pr-[10px] pl-[14px] text-white text-sm border border-[#75cdc5] rounded-3xl bg-[#108973]/[0.20]"
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
                <h1 class="text-3xl font-bold leading-[38px] text-black mb-8 flex justify-center">
                  Discover hidden gems! 💎
                </h1>
                <div class="bg-white rounded-[61px] mx-auto max-w-[347px] py-[6px] z-50">
                  <div class="flex flex-row flex-wrap justify-center">
                    <input
                      id="tab-one"
                      type="radio"
                      name="tabs"
                      class="peer/tab-one opacity-0 absolute"
                      checked
                    />
                    <label
                      for="tab-one"
                      class="bg-white peer-checked/tab-one:bg-black peer-checked/tab-one:text-white cursor-default px-10 py-2 rounded-[47px] block text-base font-semibold"
                    >
                      Main Board
                      <span class="block text-[11px] font-bold">12 Stocks</span>
                    </label>
                    <input
                      id="tab-two"
                      type="radio"
                      name="tabs"
                      class="peer/tab-two opacity-0 absolute"
                    />
                    <label
                      for="tab-two"
                      class="bg-white peer-checked/tab-two:bg-black peer-checked/tab-two:text-white cursor-default px-10 py-2 rounded-[47px] block text-base font-semibold"
                    >
                      SME Board
                      <span class="block text-[11px] font-bold">14 Stocks</span>
                    </label>
                    <div class="basis-full h-0 transition ease-out duration-700"></div>
                  </div>
                </div>
              </div>
            </div>
            <video
              autoplay
              muted
              playsInline
              loop
              preload="none"
              class="video-bg"
            >
              <source src="https://s3-figma-videos-production-sig.figma.com/video/1340608807624536784/TEAM/11b1/7aa6/-7d58-4850-b149-dc7147331e8d?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ndpwmS0DlQmNx6Gs5weuaJ8NlvSCh-FFPccv4e-sRv5O6U~NcCE8utZC6tFY1iajg09egTMAi4ZM4I8Hya3DTPHeQyqPwVL3CbS~-cr6DO4gDK5qGdAL4RuqSAZEiEhzZxUrkAPq5AdbLOFOKQAkteni1Go13TIhyR0oegqo19MLQwGuYwxs8r54uutdi4TCZ3PiuuC997mm1up8BDRGUFcKO11R6N68stj57MUDnEvNwTT4n4kJY1zBWm7UJpu0FtkHXUq4Su-XuwFEaQAAmKJfajWQyP4EtFbAQFe-0yxkZDvG3i6mPJEnz7lqKth6uejwasOHvldmYs6MuwtoZw__" />
            </video>
            {/* <div class="absolute top-0 right-0 w-full z-10">
            <img src="/assets/bg-vector.svg" alt="" class="w-full h-full" />
          </div> */}
          </div>
        </div>
      </div>
      {/* banner card  */}
      <div class="relative z-[555] mt-[-6%] pb-[110px]">
        <div class="container mx-auto">
          <div className="bg-gray-150 p-[10px] rounded-[20px]">
            <div className="bg-[#F2F4F7] rounded-[20px] px-10 py-8 gap-10 text-center">
              <h2 className="text-display-xs font-bold leading-8 font-open_sans m-0">
                Hot Stocks (3)
              </h2>
              <p className="p-3 font-normal text-sm text-gray-500">
                Top stocks to invest in right NOW!
              </p>
              <div className="bg-white bg-[linear-gradient(to_top,rgba(255,255,255,0.4),rgba(255,255,255,0)),radial-gradient(126.67%_325.03%_at_-1.18%_22.73%,rgba(241,252,255,0.4)_0%,rgba(202,242,255,0.4)_19%,rgba(193,240,255,0.4)_39%,rgba(193,255,236,0.4)_57.07%,rgba(203,255,224,0.4)_69.37%,rgba(229,255,223,0.4)_79.3%,rgba(246,255,244,0.4)_100%)] bg-[length:auto_1200px] bg-no-repeat py-[40px] px-[80px] flex items-center  rounded-[10px]">
                {/* <img src="/assets/Grid.png" alt="" srcSet="" /> */}
                <div className="w-1/3">
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

                <div className="w-7/12">
                  <div className="flex">
                    {/* 1 */}
                    <div className="flex relative pt-[41px] pb-[41px]">
                      {/* <div className="absolute top-[36px] left-[73px]">
                        <img src="/assets/Vector 21502.svg" alt="" srcSet="" />
                      </div>
                      <div className="absolute z-[11] left-[75px] top-[36px]">
                        <img
                          src="/assets/Vector 21500.png"
                          alt=""
                          className="w-[153px]"
                        />
                      </div>
                      <div className="absolute top-[36px] right-[75px]">
                        <img src="/assets/Vector 21502.svg" alt="" srcSet="" />
                      </div> */}
                      <div className=" rounded-lg bg-white border border-[#FEC84B] p-[15px] max-w-[308px] relative left-24">
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
                          <div className="rounded-[7px] bg-[linear-gradient(314deg, bg-[#125B54] 6.46%, 113.37%] text-center text-white ">
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
                          {/* <ProgressBar /> */}
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
                              <p className="text-[9px] font-bold text-[#125B54]">
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
                      <div className="absolute top-[-5px] left-[73px]">
                        <img src="/assets/Vector 21502.svg" alt="" srcSet="" />
                      </div>
                      <div className="absolute z-[111] left-[62px] top-[-5px]">
                        <img
                          src="/assets/Vector 21500.png"
                          alt=""
                          className="w-[153px]"
                        />
                      </div>
                      <div className="absolute top-[-5px] right-[75px]">
                        <img src="/assets/Vector 21502.svg" alt="" srcSet="" />
                      </div>
                      <div className=" rounded-lg bg-white border border-[#FEC84B] p-[15px] max-w-[308px] z-50">
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
                          <div className="rounded-[7px] bg-[linear-gradient(314deg, bg-[#125B54] 6.46%, 113.37%] text-center text-white ">
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
                          {/* <ProgressBar /> */}
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
                              <p className="text-[9px] font-bold text-[#125B54]">
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
                    <div className="flex relative pt-[41px] pb-[41px]">
                      {/* <div className="absolute top-[36px] left-[73px]">
                        <img src="/assets/Vector 21502.svg" alt="" srcSet="" />
                      </div>
                      <div className="absolute z-[11] left-[75px] top-[36px]">
                        <img
                          src="/assets/Vector 21500.png"
                          alt=""
                          className="w-[153px]"
                        />
                      </div>
                      <div className="absolute top-[36px] right-[75px]">
                        <img src="/assets/Vector 21502.svg" alt="" srcSet="" />
                      </div> */}
                      <div className=" rounded-lg bg-white border border-[#FEC84B] p-[15px] max-w-[308px] relative right-24">
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
                          <div className="rounded-[7px] bg-[linear-gradient(314deg, bg-[#125B54] 6.46%, 113.37%] text-center text-white ">
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
                          {/* <ProgressBar /> */}
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
                              <p className="text-[9px] font-bold text-[#125B54]">
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
      <Latest />
      <Discover/>
    </>
  );
}

export default Stockpicks;
