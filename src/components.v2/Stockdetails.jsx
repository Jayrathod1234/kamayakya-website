import { ProgressBar } from "@react-pdf-viewer/core";
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
                  <div className=" p-4 gap-4 rounded-[10px] bg-white shadow-sm ">
                    <div className="p-4  justify-center gap-5 rounded-[5px] border border-[#0079EF] bg-[#EFF7FF]">
                      <div className="gap-4 items-center flex rounded-xl ">
                        <div className="w-1/2 h-[95px] p-4  rounded-md bg-custom-gradient ">
                          <div className="flex justify-between">
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

                            <div className="justify-end">
                              <img
                                src="/assets/stock-details/streamline_target-solid (1).svg"
                                alt=""
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-[24px] text-white font-bold">
                            17.12%{" "}
                            <span className="text-[12px] text-[#FCFCFD] font-medium">
                              likely within a year
                            </span>
                          </div>
                        </div>
                        <div className="w-1/2 h-[95px] p-4  rounded-md bg-white ">
                          <div className="flex justify-between">
                            <div className="flex gap-[6px]">
                              <p className="font-open_sans text-sm font-semibold text-[#1D2939]">
                                Total Returns
                              </p>
                            </div>

                            <div className="justify-end">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_9019_370318)">
                                  <path
                                    d="M24.0003 15.331C23.9228 15.7198 23.8697 16.116 23.7628 16.4972C22.9672 19.3436 20.3041 21.2547 17.321 21.137C14.4385 21.0205 11.966 18.8703 11.406 15.9908C10.7041 12.3864 13.3128 8.88596 16.9716 8.52665C18.6044 8.35609 20.24 8.823 21.5377 9.83015C22.8354 10.8373 23.6951 12.307 23.9378 13.9332C23.9566 14.0584 23.9785 14.1774 24.0003 14.3V15.331ZM16.9222 18.2043C16.9222 18.4728 16.9191 18.7376 16.9222 19.0024C16.9285 19.4212 17.2241 19.731 17.6166 19.7354C18.0091 19.7398 18.3197 19.4268 18.3272 18.9955C18.3303 18.8077 18.3391 18.6199 18.3272 18.4321C18.3141 18.2687 18.3747 18.1943 18.5241 18.1229C18.8129 17.9883 19.0671 17.7893 19.2675 17.5413C19.4678 17.2933 19.609 17.0027 19.6802 16.6918C19.7514 16.3808 19.7508 16.0577 19.6783 15.747C19.6059 15.4363 19.4636 15.1463 19.2622 14.8991C18.8453 14.3839 18.2928 14.1317 17.6303 14.1129C17.4884 14.1159 17.349 14.0745 17.2316 13.9945C17.1142 13.9145 17.0247 13.7999 16.9753 13.6666C16.9202 13.5441 16.9043 13.4074 16.9298 13.2755C16.9553 13.1436 17.021 13.0228 17.1178 12.9298C17.2111 12.8218 17.3369 12.7471 17.4763 12.717C17.6156 12.687 17.761 12.7032 17.8903 12.7633C18.0668 12.8451 18.2314 12.9504 18.3797 13.0763C18.7128 13.3417 19.1228 13.3373 19.3903 13.0475C19.4576 12.9781 19.5095 12.8951 19.5424 12.8042C19.5752 12.7132 19.5885 12.6163 19.5811 12.5198C19.5738 12.4233 19.5461 12.3295 19.4998 12.2446C19.4536 12.1596 19.3898 12.0855 19.3128 12.0271C19.056 11.818 18.7503 11.6716 18.4722 11.4863C18.4027 11.4412 18.3539 11.3702 18.3366 11.2891C18.3191 11.0719 18.3335 10.8509 18.3297 10.6343C18.3222 10.203 18.0172 9.89003 17.6178 9.89567C17.2185 9.9013 16.9303 10.2087 16.9247 10.6293C16.921 10.8941 16.9247 11.1595 16.9247 11.4193C15.6778 11.8831 15.1753 13.2716 15.7503 14.3677C16.1391 15.1063 16.771 15.4825 17.6041 15.5176C17.9241 15.5313 18.1566 15.6747 18.276 15.9739C18.3297 16.097 18.3441 16.2337 18.3171 16.3653C18.2901 16.4969 18.2231 16.6169 18.1253 16.7088C17.9003 16.9417 17.6128 16.9955 17.3303 16.8559C17.1175 16.7443 16.9231 16.6005 16.7541 16.4296C16.411 16.0941 16.0041 16.0453 15.696 16.3332C15.3878 16.6212 15.401 17.0368 15.7235 17.3936C16.0499 17.759 16.4618 18.0375 16.9222 18.2043Z"
                                    fill="#0E4943"
                                  />
                                  <path
                                    d="M8.48452 23.9999V5.64055C8.39702 5.63617 8.32202 5.62991 8.24702 5.62991C7.63827 5.62991 7.0289 5.62991 6.41952 5.62991C6.0814 5.62991 5.83015 5.46215 5.72077 5.17858C5.60765 4.88249 5.68702 4.59517 5.95827 4.36481C7.56952 2.97848 9.18223 1.59486 10.7964 0.213949C11.1264 -0.067741 11.462 -0.0727488 11.7901 0.207689C13.4114 1.59194 15.0301 2.97869 16.6464 4.36794C16.9076 4.59267 16.982 4.87811 16.8758 5.16731C16.7695 5.45652 16.5164 5.62741 16.1608 5.62866C15.4895 5.62866 14.8183 5.62866 14.1095 5.62866V5.87905C14.1095 6.50503 14.1051 7.13101 14.1126 7.7526C14.1126 7.88969 14.0639 7.95542 13.9483 8.0224C11.2233 9.61364 9.79765 11.9867 9.91515 15.1435C10.0214 18.0061 11.4464 20.1445 13.9151 21.5823C14.0545 21.6631 14.117 21.7395 14.1114 21.9047C14.0983 22.2866 14.0883 22.6709 14.1114 23.0515C14.1389 23.4897 13.9958 23.8083 13.5908 23.9961L8.48452 23.9999Z"
                                    fill="#0E4943"
                                  />
                                  <path
                                    d="M4.26562 24.0017V10.7685C4.26562 10.1538 4.51563 9.89844 5.12813 9.89844H7.07812V24.0017H4.26562Z"
                                    fill="#0E4943"
                                  />
                                  <path
                                    d="M0 16.0313C0.1875 15.6263 0.506875 15.4923 0.943125 15.5092C1.55687 15.5336 2.17188 15.5155 2.8125 15.5155V23.9981H0.515625C0.289273 23.8912 0.107016 23.7089 0 23.4823L0 16.0313Z"
                                    fill="#0E4943"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_9019_370318">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-[20px] text-[#344054] font-bold">
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
                            <span className="text-[12px] text-[#667085] font-medium">
                              in 4 months
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-5 flex justify-center text-[#344054] text-sm font-normal gap-1">
                        <span className="text-[#0079EF] text-sm font-bold">
                          ₹1Lakh{" "}
                        </span>
                        invested at current market price (CMP) can become{" "}
                        <span className="text-[#0079EF] text-sm font-bold">
                          ₹“X” Lakh
                        </span>{" "}
                        likely within a year
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="px-[20px] pt-[20px] pb-4">
                        progress bar
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-[72px]">
                  <h2 className="text-[#0C111D] text-[20px] font-semibold font-open_sans">
                    Company Profile
                  </h2>
                  <p className="text-[#475467] text-justify text-[14px] font-normal font-open_sans">
                    Shree Pushkar Chemical & Fertiliser Ltd. is a holding
                    company, which engages in the provision of chemicals and
                    fertilizers. It offers dye, dye intermediates, fertilizers,
                    acids, and cattle feed supplements. The company was founded
                    by Punit Makharia on March 29, 1993 and is headquartered in
                    Mumbai, India.
                  </p>
                </div>
                <div className="pt-[72px]">
                  <h2 className="text-[#0C111D] text-[20px] font-semibold font-open_sans">
                    News
                  </h2>
                  <div className="pt-[12px]"></div>
                </div>
              </div>

              <div className="">fhg</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stockdetails;
