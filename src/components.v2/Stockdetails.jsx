import React, { useState } from "react";
import StockDetailsNews from "../pages/stock-picks/[slug]/components/StockDetailsNews";
import StockDetailsTimeline from "../pages/stock-picks/[slug]/components/StockDetailsTimeline";
import StockDetailsProgressBar from "../pages/stock-picks/[slug]/components/StockDetailsProgressBar";

function Stockdetails() {

  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <div className="pt-4 ">
        <div className="relative w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto max-h-[700px]  md:max-h-[950px]">
          <div className="items-center gap-[13px] flex p-[7px]">
            <img src="/assets/stock-details/arrow-left.svg" alt="" />
            <div className="text-[13px] text-[#475467] font-normal font-open_sans">
              Track Record
            </div>
            <img src="/assets/stock-details/chevron-right.svg" alt="" />
            <div className="text-[13px] text-[#475467] font-semibold">
              Ion Exchange (India) Ltd.
            </div>
          </div>
          {/* details  */}
          <div className="pt-3">
            {/* Main Content  */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                {/* First Content Start */}
                <div className="bg-white shadow-sm flex rounded-lg order-1 sm:order-1 relative">
                  <img src="/assets/SellBubbleRed 1.png" alt="" className="block sm:hidden absolute -top-3 right-6 w-[58px] h-[40px]" />
                  <div className="px-4 pt-4 pb-3 gap-2">
                    <div className="flex pb-2.5 items-center justify-center sm:justify-start md:justify-start">
                      <div className="flex h-4 py-1 px-2.5 items-center gap-1 rounded-full bg-[#FFF6EE]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          aria-label="Target Status"
                        >
                          <path
                            d="M9.49739 4.75172H8.73939C8.61629 2.87982 7.12009 1.38332 5.24799 1.26022V0.502219C5.24668 0.436952 5.21984 0.374799 5.17322 0.329103C5.1266 0.283408 5.06392 0.257813 4.99864 0.257812C4.93336 0.257813 4.87068 0.283408 4.82406 0.329103C4.77744 0.374799 4.7506 0.436952 4.74929 0.502219V1.26022C2.87709 1.38332 1.38099 2.87972 1.25789 4.75172H0.499888C0.433743 4.75172 0.370307 4.778 0.323536 4.82477C0.276764 4.87154 0.250488 4.93497 0.250488 5.00112C0.250488 5.06726 0.276764 5.1307 0.323536 5.17747C0.370307 5.22424 0.433743 5.25052 0.499888 5.25052H1.25779C1.38069 7.12272 2.87689 8.61892 4.74929 8.74192V9.49992C4.7506 9.56519 4.77744 9.62734 4.82406 9.67303C4.87068 9.71873 4.93336 9.74433 4.99864 9.74433C5.06392 9.74433 5.1266 9.71873 5.17322 9.67303C5.21984 9.62734 5.24668 9.56519 5.24799 9.49992V8.74192C7.12029 8.61892 8.61649 7.12262 8.73949 5.25052H9.49739C9.56353 5.25052 9.62697 5.22424 9.67374 5.17747C9.72051 5.1307 9.74679 5.06726 9.74679 5.00112C9.74679 4.93497 9.72051 4.87154 9.67374 4.82477C9.62697 4.778 9.56353 4.75172 9.49739 4.75172ZM4.74919 7.74542C3.42799 7.62632 2.37329 6.57152 2.25429 5.25052H2.75329C2.86849 6.29892 3.70079 7.13122 4.74919 7.24642V7.74542ZM4.74919 2.75582C3.70079 2.87102 2.86849 3.70332 2.75329 4.75172H2.25429C2.37349 3.43092 3.42809 2.37602 4.74909 2.25682L4.74919 2.75582ZM5.24799 2.25692C6.56899 2.37602 7.62359 3.43092 7.74279 4.75172H7.24389C7.12869 3.70322 6.29639 2.87092 5.24799 2.75582V2.25692ZM5.24799 7.74542V7.24652C6.29639 7.13132 7.12869 6.29902 7.24389 5.25062H7.74279C7.62379 6.57152 6.56909 7.62622 5.24799 7.74542Z"
                            fill="#667085"
                          />
                        </svg>
                        <p className="text-[#667085] text-xs font-semibold">
                          Target 1 at ₹342 |{" "}
                          <span className="text-[#F79009] font-bold">
                            Active
                          </span>
                        </p>
                      </div>
                    </div>
                    {/* <!-- Continue your other components similarly --> */}
                    <div className=" flex flex-col md:flex-row gap-4 items-start md:items-center">

                      {/* Image container */}
                      <div className="flex-shrink-0 w-[80px] h-[80px] md:w-[120px] md:h-[120px] hidden  sm:block">
                        <img src="/assets/image 3.png" alt="Company Logo" className="w-full h-full object-cover rounded-full" />
                      </div>

                      {/* Text content */}
                      <div className="w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                          <div className="flex gap-1 items-center  ">

                            <img src="/assets/image 3.png" alt="Company Logo" className="w-10 h-10 object-cover rounded-full block sm:hidden" />
                            <p className="text-[#0C111D] text-lg md:text-xl font-bold font-open_sans line-clamp-1  ">
                              Shree Pushkar Chemicals & Fertilizers Ltd.
                            </p>
                          </div>
                          <div className="flex justify-center items-center gap-[6px] pl-1/2 sm:pl-0  mx-auto sm:mx-0">
                            <p className="text-xs md:text-2xs text-[#475467] font-medium">
                              NSE: IONEXCHANG
                            </p>
                            <div className="w-1 h-1 rounded-full bg-[#98A2B3]"></div>
                            <p className="text-xs md:text-2xs text-[#475467] font-medium">
                              BSE: 500214
                            </p>
                          </div>
                        </div>
                        <div className="pt-1.5 flex gap- sm:gap-1.5 flex-wrap">
                          <div className="flex gap-4 w-full justify-center sm:justify-start ">
                            <div className="flex rounded-[20px] text-nowrap border border-gray-300 py-1.5 pr-3 pl-2.5 gap-1 items-center">
                              <img
                                src="/assets/stock-details/basil_diamond-outline.svg"
                                alt="Tag"
                                className="w-3 h-3 md:w-4 md:h-4"
                              />
                              <p className="text-xs md:text-2xs font-normal text-[#344054] font-open_sans">
                                Deep Value
                              </p>
                            </div>
                            <div className="flex rounded-[20px] border border-gray-300 py-1.5 pr-3 pl-2.5 gap-1 items-center">
                              <img
                                src="/assets/stock-details/basil_diamond-outline.svg"
                                alt="Tag"
                                className="w-3 h-3 md:w-4 md:h-4"
                              />
                              <p className="text-xs md:text-2xs font-normal text-[#344054] font-open_sans">
                                Special Situation
                              </p>
                            </div>
                            <div className="flex rounded-[20px] border border-gray-300 py-1.5 pr-3 pl-2.5 gap-1 items-center hidden sm:flex">
                              <img
                                src="/assets/stock-details/basil_diamond-outline.svg"
                                alt="Tag"
                                className="w-3 h-3 md:w-4 md:h-4"
                              />
                              <p className="text-xs md:text-2xs font-normal text-[#344054] font-open_sans">
                                Market Leader
                              </p>
                            </div>
                            <div className="rounded-[15px] bg-[#E7F8F8] py-1.5 pr-3 pl-2.5 gap-1 items-center flex sm:hidden">
                              <p className="text-xs md:text-2xs font-normal text-[#344054] font-open_sans">
                                +2
                              </p>
                            </div>
                          </div>
                          <p className="block sm:hidden text-sm items-center flex mt-5 gap-1 text-[#039855] my-2 mx-auto">
                            <img src="/assets/Polygon2.svg" alt="" className="w-4 h-4 items-center" /> Consider Buying. Our analysis suggests potential growth.
                          </p>
                        </div>

                      </div>
                    </div>


                    <div className="flex flex-col sm:flex-row px-2 sm:px-4 py-2 items-start sm:items-center justify-between">
                      <div className="w-full sm:w-auto h-auto sm:h-[52px] py-1 px-0 items-center gap-2 rounded-md flex">
                        <div className="flex p-1 justify-center items-center rounded-md bg-[#F9FAFB]">
                          <img
                            src="/assets/stock-details/Sector icon.svg"
                            alt=""
                            className="w-6 h-6 sm:w-auto sm:h-auto"
                          />
                        </div>
                        <div className="flex flex-row sm:flex-row items-center sm:items-start justify-between gap-[6.5rem] sm:gap-1 w-full">
                          <div className="w-full flex justify-between">
                            <p className="text-[#475467] text-xs sm:text-sm font-medium font-open_sans">
                              Engineering
                            </p>
                            <span className="text-[#667085] text-ellipsis text-2xs font-normal font-open_sans">
                              Industrial Equipments
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full sm:w-auto h-auto sm:h-[52px] py-1 px-0 items-center gap-2 rounded-md flex">
                        <div className="flex p-1 justify-center items-center rounded-md bg-[#F9FAFB]">
                          <img
                            src="/assets/stock-details/Sector icon.svg"
                            alt=""
                            className="w-6 h-6 sm:w-auto sm:h-auto"
                          />
                        </div>
                        <div className="flex flex-row sm:flex-row items-center sm:items-start  gap-[5rem] sm:gap-1 w-full">
                          <div className="flex w-full justify-between">
                            <p className="text-[#475467] text-xs sm:text-sm font-medium font-open_sans">
                              Mid Cap
                            </p>
                            <span className="text-[#667085] text-ellipsis text-2xs font-normal font-open_sans">
                              ₹10,000 Cr. as of 16 Feb, 2024
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full sm:w-auto h-auto sm:h-[52px] py-1 px-0 items-center gap-2 rounded-md flex justify-items-end">
                        <div className="flex p-1 items-center rounded-md bg-[#F9FAFB]">
                          <img
                            src="/assets/stock-details/Sector icon.svg"
                            alt=""
                            className="w-6 h-6 sm:w-auto sm:h-auto"
                          />
                        </div>
                        <div className="flex flex-row sm:flex-row items-center sm:items-start justify-between gap-10 sm:gap-1 w-full">
                          <div className="w-full flex justify-between">
                            <p className="text-[#475467] text-xs sm:text-sm font-medium font-open_sans ">
                              High Risk
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* First Content End  */}
                {/* When Small screen Button is Show  */}
                <div className="flex sm:hidden gap-2 mt-5 mb-3 bg-white">
                  <button className="flex-1 border border-gray-300 rounded-lg p-2 flex items-center justify-center gap-2">
                    <img src="/assets/play1.png" alt="Play icon" className="w-5 h-5" />
                    <span>Watch Video</span>
                  </button>
                  <button className="flex-1 border border-gray-300 rounded-lg p-2 flex items-center justify-center gap-2">
                    <img src="/assets/share2.svg" alt="Play icon" className="w-5 h-5 " />
                    <span>Invest Now</span>
                  </button>
                </div>
                {/* When Small Screen Button Is Hide  */}
                {/* Small screen show to company profile  */}
                <div className="pt-[20px] p-3 block sm:hidden bg-white shadow mb-5">
                  <h2 className="text-[#0C111D] text-[14px] leading-3 font-semibold font-open_sans ">
                    Company Profile
                  </h2>
                  <p className="text-[#475467]  text-[14px] font-normal font-open_sans line-clamp-3 sm:line-clamp-none">
                    Shree Pushkar Chemical & Fertiliser Ltd. is a holding
                    company, which engages in the provision of chemicals and
                    fertilizers. It offers dye, dye intermediates, fertilizers,
                    acids, and cattle feed supplements. The company was founded
                    by Punit Makharia on March 29, 1993 and is headquartered in
                    Mumbai, India.
                  </p>
                  <button
                    class="flex mt-2 items-center gap-2 px-4 py-2  text-[#344054] font-medium border border-[#D0D5DD] rounded-full hover:bg-[#F9FAFB] hover:border-[#D0D5DD] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <circle cx="6" cy="12" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="18" cy="12" r="2" />
                    </svg>
                  </button>
                </div>
                {/* Upside Left Box start */}
                <div className=" hidden md:block col-span-2 order-3 sm:order-2">
                  <div className="p-4 gap-4 rounded-[10px] bg-white shadow-sm">
                    <div className="relative p-4 gap-4 rounded-[5px] bg-[#EFF7FF] border border-transparent">
                      {/* Gradient Border */}
                      <div className="absolute inset-0 border-2 border-transparent rounded-[5px] z-[-1] bg-gradient-border"></div>

                      <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-start md:items-center">
                        <div className="w-full md:w-1/2 h-[95px] p-4 rounded-md bg-custom-gradient">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div className="flex gap-1 items-center">
                              <p className="font-open_sans text-sm md:text-base text-nowrap font-semibold text-[#FCFCFD]">
                                Upside Left
                              </p>
                              <img src="/assets/ph_info-duotone.svg" alt="" className="h-[17px] md:h-[20px]" />
                            </div>
                            <div className="hidden md:flex justify-end">
                              <img
                                src="/assets/stock-details/streamline_target-solid (1).svg"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-1 text-[16px] md:text-[24px] text-white font-bold">
                            17.12%{" "}
                            <span className="text-[10px] md:text-[12px] text-[#FCFCFD] font-medium">
                              likely within a year
                            </span>
                          </div>
                        </div>
                        <div className="w-full md:w-1/2 h-[95px] p-4 rounded-md bg-white">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div className="flex gap-[6px] items-center">
                              <p className="font-open_sans text-sm md:text-base font-semibold text-[#1D2939]">
                                Total Returns
                              </p>
                            </div>
                            <div className="hidden md:flex justify-end">
                              <img src="/assets/Layer_1.svg" alt="" />
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-1 text-[16px] md:text-[20px] text-[#344054] font-bold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="11"
                              viewBox="0 0 15 11"
                              fill="none"
                            >
                              <path
                                d="M7.03446 0.649754C7.43652 0.0861183 8.27587 0.091733 8.67036 0.660698L14.4116 8.94137C14.8714 9.60454 14.3968 10.5111 13.5898 10.5111H1.94168C1.1286 10.5111 0.655406 9.59235 1.12758 8.93042L7.03446 0.649754Z"
                                fill="#00FF02"
                              />
                            </svg>
                            34.36%{" "}
                            <span className="text-[10px] md:text-[12px] text-[#667085] font-medium">
                              in 4 months
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-5 text-center md:text-left text-[#344054] text-sm md:text-base font-normal gap-1">
                        <span className="text-[#0079EF] text-sm md:text-base font-bold">
                          ₹1Lakh{" "}
                        </span>
                        invested at current market price (CMP) can become{" "}
                        <span className="text-[#0079EF] text-sm md:text-base font-bold">
                          ₹“X” Lakh
                        </span>{" "}
                        likely within a year
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="px-4 md:px-[20px] pt-4 pb-4">
                        <StockDetailsProgressBar />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Small Responsive size View Open the box  */}
                <div className="block md:hidden bg-gray-150 p-4 rounded-lg shadow-md max-w-full mx-auto ">
                  <div className="border border-blue-600 rounded-lg">
                    <div className="bg-custom-gradient text-white rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold flex items-center">
                          Upside Left
                          <img src="/assets/ph_info-duotone.svg" alt="Info Icon" className="ml-2 h-[17px] md:h-[20px]" />
                        </h2>
                        <img
                          src="/assets/stock-details/streamline_target-solid (1).svg"
                          alt=""
                        />
                      </div>
                      <p className="text-4xl font-bold mt-2">157.12%</p>
                      <p className="text-sm">in 1yr 4m</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <img src="/assets/hj1.svg" alt="" />
                          <p className="ml-2 text-sm text-gray-800">Total Returns</p>
                        </div>
                        <div className="flex items-center">
                          <img src="/assets/Polygon2.svg" alt="Indicator Icon" className="w-3 h-3" />
                          <p className="text-black ml-1 text-sm">64.08% <span className="text-gray-500 text-xs">likely in 4m</span></p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <img src="/assets/hj2.svg" alt="" />
                          <p className="ml-2 text-sm text-gray-800">CAGR</p>
                        </div>
                        <div className="flex items-center">
                          <img src="/assets/Polygon2.svg" alt="Indicator Icon" className="w-3 h-3" />
                          <p className="text-black ml-1 text-sm">64.08% <span className="text-gray-500 text-xs">in 1yr 4m</span></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 text-center md:text-left text-[#344054] text-sm md:text-base font-normal gap-1">
                    <span className="text-[#0079EF] text-sm md:text-base font-bold">
                      ₹1Lakh{" "}
                    </span>
                    invested at current market price (CMP) can become{" "}
                    <span className="text-[#0079EF] text-sm md:text-base font-bold">
                      ₹“X” Lakh
                    </span>{" "}
                    likely within a year
                  </div>
                  <div className="pt-4 hidden sm:block">
                    <div className="px-2">
                      <StockDetailsProgressBar />
                    </div>
                  </div>
                </div>
                <div className="pt-4 block sm:hidden">
                    <div className="px-4 md:px-[20px] pt-4 pb-4">
                      <StockDetailsProgressBar />
                    </div>
                  </div>
                {/* Upside Left Box End  */}

                {/* Company Profile Section start */}
                <div className="pt-[50px] p-3 hidden sm:block">
                  <h2 className="text-[#0C111D] text-[20px] font-semibold font-open_sans ">
                    Company Profile
                  </h2>
                  <p className="text-[#475467] text-justify text-[14px] font-normal font-open_sans line-clamp-3 sm:line-clamp-none">
                    Shree Pushkar Chemical & Fertiliser Ltd. is a holding
                    company, which engages in the provision of chemicals and
                    fertilizers. It offers dye, dye intermediates, fertilizers,
                    acids, and cattle feed supplements. The company was founded
                    by Punit Makharia on March 29, 1993 and is headquartered in
                    Mumbai, India.
                  </p>
                </div>
                {/* Company Profile Section End  */}

                <div className="p-5 bg-gray-100 mt-2 rounded-md  block sm:hidden">
                    <div className="flex relative">
                      <div className=" !w-[75%]">
                        <p className="font-semibold mb-2">
                          Don't miss out on potential gains!
                        </p>
                        <p className="mb-4 text-[#344054]">
                          Upgrade now to get access to both SME and Mainboard stocks.
                        </p>
                      </div>
                      <div className=" !w-[25%]">
                        <img src="/assets/Frame.svg" alt="sss" className="absolute top-0 right-0 h-[88px] w-[78px]" />
                      </div>
                    </div>
                    <button className="w-full bg-[#125B54] text-white p-2 rounded-lg  justify-center items-center flex">
                      <span className="flex gap-2"><img src="/assets/white-icon.svg" alt="" />Upgrade Now</span>
                    </button>
                  </div>

                {/* When small Screen Time-line & Report Section show  */}
                <div className="mt-5 block sm:hidden md:hidden mb-5">
                  <button
                    className="w-full   p-2 rounded-lg flex justify-between items-center"
                    onClick={toggleDropdown}
                  >
                    <span>TIMELINE & REPORTS (3)</span>
                    <svg
                      className={`transform w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="mt-2">
                      {/* Timeline Content Goes Here */}
                      <div className="p-4 border rounded-lg">
                        <StockDetailsTimeline />
                      </div>
                    </div>
                  )}
                </div>

                

                {/* News Section Start */}
                <div className="pt-[35px] shadow w-full">
                  <h2 className="text-[#0C111D] text-[20px] font-semibold font-open_sans p-3">
                    News
                  </h2>
                  <StockDetailsNews />
                </div>
                {/* News Section End  */}
              </div>
              {/* <!-- Continue with the rest of your content --> */}

              {/* Second Container Start */}
              <div className="relative hidden  sm:block">
                <div className="p-4 border rounded-lg sticky top-0 ">

                  <h2 className="font-semibold text-lg mb-4  hidden sm:flex">INVESTMENT GUIDANCE</h2>
                  <div className=" gap-2 mb-4 hidden sm:flex">
                    <button className="flex-1 border border-gray-300 rounded-lg p-2 flex items-center justify-center gap-2">
                      <img src="/assets/play1.png" alt="Play icon" className="w-5 h-5" />
                      <span>Watch Video</span>
                    </button>
                    <button className="flex-1 border border-gray-300 rounded-lg p-2 flex items-center justify-center gap-2">
                      <img src="/assets/share2.svg" alt="Play icon" className="w-5 h-5 " />
                      <span>Invest Now</span>
                    </button>
                  </div>

                  <div className=" justify-between items-center relative pt-5 hidden sm:flex " >
                    <p className="w-2/3">
                      Consider <span className="text-blue-600 font-semibold">Buying</span>. Our analysis suggests potential growth.
                    </p>
                    <img src="/assets/images2.png" alt="" className="absolute -top-3 right-6 w-16 h-16" />
                    <img src="/assets/images3.svg" alt="" className="absolute -bottom-1 right-2 " />
                    <div className="w-1/3 flex justify-end">
                      <img src="/assets/images1.png" alt="" className=" w-[52px] h-[100px]" />
                    </div>
                  </div>
                  <hr className="mt-3 hidden  sm:block" />
                  <div className="p-5 bg-gray-100 mt-2 rounded-md hidden sm:block">
                    <div className="flex relative">
                      <div className=" !w-[75%]">
                        <p className="font-semibold mb-2">
                          Don't miss out on potential gains!
                        </p>
                        <p className="mb-4 text-[#344054]">
                          Upgrade now to get access to both SME and Mainboard stocks.
                        </p>
                      </div>
                      <div className=" !w-[25%]">
                        <img src="/assets/Frame.svg" alt="sss" className="absolute top-0 right-0 h-[88px] w-[78px]" />
                      </div>
                    </div>
                    <button className="w-full bg-[#125B54] text-white p-2 rounded-lg  justify-center items-center hidden sm:flex">
                      <span className="flex gap-2"><img src="/assets/white-icon.svg" alt="" />Upgrade Now</span>
                    </button>
                  </div>
                  <div className="mt-5 hidden sm:block">
                    <button
                      className="w-full   p-2 rounded-lg flex justify-between items-center"
                      onClick={toggleDropdown}
                    >
                      <span>TIMELINE & REPORTS (3)</span>
                      <svg
                        className={`transform w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                          }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="mt-2">
                        {/* Timeline Content Goes Here */}
                        <div className="p-4 border rounded-lg">
                          <StockDetailsTimeline />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Second Container End */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stockdetails;
