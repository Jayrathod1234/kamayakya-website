import React from "react";

function Stockdetails() {
  return (
    <>
      <div className="pt-4">
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
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="bg-white shadow-sm flex rounded-[10px]">
                  <div className="px-4 pt-4 pb-3 gap-2 ">
                    <div className=" ">
                      <div className="flex pb-2.5 items-center ">
                        <div className="flex h-[18px] py-[2px] px-2.5 items-center gap-1 rounded-[26px] bg-[#FFF6EE]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_9838_45941)">
                              <path
                                d="M9.49739 4.75172H8.73939C8.61629 2.87982 7.12009 1.38332 5.24799 1.26022V0.502219C5.24668 0.436952 5.21984 0.374799 5.17322 0.329103C5.1266 0.283408 5.06392 0.257813 4.99864 0.257812C4.93336 0.257813 4.87068 0.283408 4.82406 0.329103C4.77744 0.374799 4.7506 0.436952 4.74929 0.502219V1.26022C2.87709 1.38332 1.38099 2.87972 1.25789 4.75172H0.499888C0.433743 4.75172 0.370307 4.778 0.323536 4.82477C0.276764 4.87154 0.250488 4.93497 0.250488 5.00112C0.250488 5.06726 0.276764 5.1307 0.323536 5.17747C0.370307 5.22424 0.433743 5.25052 0.499888 5.25052H1.25779C1.38069 7.12272 2.87689 8.61892 4.74929 8.74192V9.49992C4.7506 9.56519 4.77744 9.62734 4.82406 9.67303C4.87068 9.71873 4.93336 9.74433 4.99864 9.74433C5.06392 9.74433 5.1266 9.71873 5.17322 9.67303C5.21984 9.62734 5.24668 9.56519 5.24799 9.49992V8.74192C7.12029 8.61892 8.61649 7.12262 8.73949 5.25052H9.49739C9.56353 5.25052 9.62697 5.22424 9.67374 5.17747C9.72051 5.1307 9.74679 5.06726 9.74679 5.00112C9.74679 4.93497 9.72051 4.87154 9.67374 4.82477C9.62697 4.778 9.56353 4.75172 9.49739 4.75172ZM4.74919 7.74542C3.42799 7.62632 2.37329 6.57152 2.25429 5.25052H2.75329C2.86849 6.29892 3.70079 7.13122 4.74919 7.24642V7.74542ZM4.74919 2.75582C3.70079 2.87102 2.86849 3.70332 2.75329 4.75172H2.25429C2.37349 3.43092 3.42809 2.37602 4.74909 2.25682L4.74919 2.75582ZM5.24799 2.25692C6.56899 2.37602 7.62359 3.43092 7.74279 4.75172H7.24389C7.12869 3.70322 6.29639 2.87092 5.24799 2.75582V2.25692ZM5.24799 7.74542V7.24652C6.29639 7.13132 7.12869 6.29902 7.24389 5.25062H7.74279C7.62379 6.57152 6.56909 7.62622 5.24799 7.74542Z"
                                fill="#667085"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_9838_45941">
                                <rect
                                  width="10"
                                  height="10"
                                  rx="5"
                                  fill="white"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <p className="text-[#667085] text-[10px] font-semibold font-open_sans">
                            Target 1 at ₹342 |{" "}
                            <span className="text-[#F79009] text-[10px] font-bold font-open_sans">
                              Active
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="items-center flex gap-4">
                        <div className="flex w-[100px] h-[100px] px-[15px] py-4 justify-center items-center rounded-md border border-[#F2F4F7]">
                          <img src="/assets/stock-details/image 3.jpg" alt="" />
                        </div>
                        <div className=" ">
                          <div className="flex justify-end items-center gap-2">
                            <p className="text-[#0C111D] text-ellipsis text-xl font-bold font-open_sans">
                              Shree Pushkar Chemicals & Fertilizers Ltd.
                            </p>
                            <div className="flex justify-center items-center gap-[6px]">
                              <p className="text-2xs text-[#475467] font-medium">
                                NSE: IONEXCHANG
                              </p>
                              <div className="w-1 h-1 rounded-full bg-[#98A2B3]"></div>
                              <p className="text-2xs text-[#475467] font-medium">
                                BSE: 500214
                              </p>
                            </div>
                          </div>
                          <div className="pt-1.5 flex gap-2">
                            <div className="flex rounded-[20px] border border-gray-300 py-1.5 pr-3 pl-2.5 gap-1">
                              <img
                                src="/assets/stock-details/basil_diamond-outline.svg"
                                alt=""
                              />
                              <p className="text-2xs font-normal text-[#344054] font-open_sans">
                                Deep Value{" "}
                              </p>
                            </div>
                            <div className="flex rounded-[20px] border border-gray-300 py-1.5 pr-3 pl-2.5 gap-1">
                              <img
                                src="/assets/stock-details/basil_diamond-outline.svg"
                                alt=""
                              />
                              <p className="text-2xs font-normal text-[#344054] font-open_sans">
                                Special Situation{" "}
                              </p>
                            </div>
                            <div className="flex rounded-[20px] border border-gray-300 py-1.5 pr-3 pl-2.5 gap-1">
                              <img
                                src="/assets/stock-details/basil_diamond-outline.svg"
                                alt=""
                              />
                              <p className="text-2xs font-normal text-[#344054] font-open_sans">
                                Market Leader{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex px-4 py-0 items-center gap-5">
                      <div className="w-[300px] h-[52px] py-1 px-0 items-center gap-2 rounded-md flex">
                        <div className="flex p-1.5 justify-center items-center rounded-md bg-[#F9FAFB]">
                          <img
                            src="/assets/stock-details/Sector icon.svg"
                            alt=""
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="text-[#475467] text-sm font-medium font-open_sans">
                            Engineering
                          </p>
                          <span className="text-[#667085] text-ellipsis text-2xs font-normal font-open_sans">
                            Industrial Equipments
                          </span>
                        </div>
                      </div>
                      <div className="w-[235px] h-[52px] py-1 px-0 items-center gap-2 rounded-md flex">
                        <div className="flex p-1.5 justify-center items-center rounded-md bg-[#F9FAFB]">
                          <img
                            src="/assets/stock-details/Sector icon.svg"
                            alt=""
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="text-[#475467] text-sm font-medium font-open_sans">
                            Engineering
                          </p>
                          <span className="text-[#667085] text-ellipsis text-2xs font-normal font-open_sans">
                            Industrial Equipments
                          </span>
                        </div>
                      </div>
                      <div className="w-[208px] h-[52px] py-1 px-0 items-center gap-2 rounded-md flex justify-end">
                        <div className="flex p-1.5  items-center rounded-md bg-[#F9FAFB]">
                          <img
                            src="/assets/stock-details/Sector icon.svg"
                            alt=""
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="text-[#475467] text-sm font-medium font-open_sans">
                            High Risk
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-7">
                  <div className="flex p-4 gap-4 rounded-[10px] bg-white shadow-sm">
                    <div className="p-4 flex justify-center gap-5 rounded-[5px] border border-[#0079EF] bg-[#EFF7FF]">
                      <div className="gap-4 items-center flex rounded-xl shadow">
                        <div className=" h-[95px] p-4  rounded-md bg-custom-gradient ">
                          <div className="flex gap-[6px]">
                            <p className="font-open_sans text-sm font-semibold text-[#FCFCFD]">
                              Upside Left
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.5 6.27609 13.8152 4.62279 12.5962 3.40381C11.3772 2.18482 9.72391 1.5 8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112Z"
                                stroke="#E4E7EC"
                              />
                              <path
                                d="M9 11C9 11.1326 8.94732 11.2598 8.85355 11.3536C8.75979 11.4473 8.63261 11.5 8.5 11.5C8.23478 11.5 7.98043 11.3946 7.79289 11.2071C7.60536 11.0196 7.5 10.7652 7.5 10.5V8C7.36739 8 7.24021 7.94732 7.14645 7.85355C7.05268 7.75979 7 7.63261 7 7.5C7 7.36739 7.05268 7.24022 7.14645 7.14645C7.24021 7.05268 7.36739 7 7.5 7C7.76522 7 8.01957 7.10536 8.20711 7.29289C8.39464 7.48043 8.5 7.73478 8.5 8V10.5C8.63261 10.5 8.75979 10.5527 8.85355 10.6464C8.94732 10.7402 9 10.8674 9 11ZM7.75 6C7.89834 6 8.04334 5.95601 8.16668 5.8736C8.29001 5.79119 8.38614 5.67406 8.44291 5.53701C8.49967 5.39997 8.51453 5.24917 8.48559 5.10368C8.45665 4.9582 8.38522 4.82456 8.28033 4.71967C8.17544 4.61478 8.0418 4.54335 7.89632 4.51441C7.75083 4.48547 7.60003 4.50032 7.46299 4.55709C7.32594 4.61386 7.20881 4.70999 7.1264 4.83332C7.04399 4.95666 7 5.10166 7 5.25C7 5.44891 7.07902 5.63968 7.21967 5.78033C7.36032 5.92098 7.55109 6 7.75 6Z"
                                fill="#E4E7EC"
                              />
                            </svg>
                          </div>
                          <div className="flex items-center gap-1 text-[24px] text-white font-bold">
                            17.12%{" "}
                            <span className="text-[12px] text-[#FCFCFD] font-medium">
                              likely within a year
                            </span>
                          </div>
                        </div>
                        <div className="h-[95px] p-4 justify-between items-start rounded-md flex">
                          sdd
                        </div>
                      </div>
                    </div>
                    <div className="">
                      ₹1Lakh invested at current market price (CMP) can become
                      ₹“X” Lakh likely within a year
                    </div>
                  </div>
                </div>
              </div>
              <div className="">fhbnfc</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stockdetails;
