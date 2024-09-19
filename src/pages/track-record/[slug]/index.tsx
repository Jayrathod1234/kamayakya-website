import React from "react";
import Layout from "../../../layout/Layout";
import { Breadcrumb } from "@/components.v3/common/Breadcrumb";
import { TargetChip } from "@/components.v3/common/TargetChip";
import { cn } from "@/lib/utils";
import { abbreviateTime } from "@/lib/date-formatter";

const PerformanceMetricCard = ({
  className,
  iconContainerClass,
  iconSrc,
  is_gain_loss_positive = true,
  isBlur,
  gain_loss = "24.53",
  return_time = "1 year",
}) => {
  return (
    <div className={cn(" p-4 rounded-md border border-[#F2F4F7] flex flex-col min-h-[100px] flex-1", className)}>
      <div className=" flex justify-between items-center">
        <p className=" text-sm font-semibold">Total Returns</p>
        <div className={cn(" rounded-md p-2 max-h-10 max-w-10 bg-[#F9FAFB]", iconContainerClass)}>
          <img src={iconSrc} alt="" />
        </div>
      </div>
      <div className=" flex items-center gap-x-[2px] max-sm:justify-center mt-auto">
        <img
          width={15}
          height={11}
          className=" !w-[15px] !h-[11px]"
          src={is_gain_loss_positive ?? true ? "/assets/Polygon2.svg" : "/assets/Polygon 3.svg"}
          alt=""
        />
        {isBlur ? (
          <span className=" inline-block  h-6 w-[103px] bg-[rgba(237,240,245,1)] rounded-full"></span>
        ) : (
          <p
            className={` text-xl font-bold  whitespace-nowrap ${
              is_gain_loss_positive ? "text-[rgba(18,183,106,1)]" : "text-[rgba(240,68,56,1)]"
            } `}
          >
            {gain_loss && gain_loss}%{" "}
            <span className=" text-2xs font-semibold text-[rgba(73,70,70,1)] hidden sm:inline-block  ">
              {return_time && `in ${abbreviateTime(return_time)}`}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <div>
      {/* <Layout> */}
        <div className=" bg-[#F9FAFB]">
          <div className=" main-container mt-4 mb-3 ">
            <Breadcrumb
              data={{ previousPath: [{ path: "Track Record", link: "/track-record" }], activePath: "Stock" }}
            />
          </div>
          <div className=" grid grid-cols-2 main-container h-[150vh] relative">
            <div className=" flex-1  bg-red-300">
              <div className=" bg-white rounded-[10px]">
                <div className=" p-4 pb-3 border-b border-b-[#F2F4F7]">
                  <TargetChip target_number="Target 1" active activeIcon />
                  <div className=" flex mt-[14px] gap-x-4">
                    <div className=" h-[100px] w-[100px] rounded-md border border-[#F2F4F7] flex items-center justify-center">
                      <img width={70} height={66} src="/assets/image 3.png" alt="company-image" />
                    </div>
                    <div>
                      <h3 className=" text-lg font-bold flex items-baseline">
                        Shree Pushkar Chemicals & Fertilizers Ltd.{"  "}
                        <span className=" ml-2 font-medium text-2xs text-[#475467] flex items-center">
                          <span>NSE: IONEXCHANG</span>
                          <svg
                            className=" mx-[6px]"
                            width="4"
                            height="4"
                            viewBox="0 0 4 4"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="2" cy="2" r="2" fill="#98A2B3" />
                          </svg>
                          <span>BSE: 500214</span>
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className=" flex  justify-between px-4">
                  <div className="w-full sm:w-auto h-auto sm:h-[52px] py-1 px-0 items-center gap-2 rounded-md flex">
                    <div className="flex p-1 justify-center items-center rounded-md bg-[#F9FAFB]">
                      <img src={`/sector_images_green/Chemicals.vg}`} alt="" className="sm:w-8 sm:h-8 w-4 h-4" />
                    </div>
                    <div className="flex flex-row sm:flex-row items-center sm:items-start justify-between gap-[6.5rem] sm:gap-1 w-full">
                      <div className="w-full flex justify-between items-center">
                        <p className="text-[#475467] text-2xs sm:text-sm font-semibold sm:font-medium font-open_sans capitalize">
                          Chemical
                        </p>
                        <span className="text-[#667085] text-ellipsis text-2xs font-normal font-open_sans">
                          Chemical
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto h-auto sm:h-[52px] py-1 px-0 items-center gap-2 rounded-md flex">
                    <div className="flex p-1 justify-center items-center rounded-md bg-[#F9FAFB]">
                      <img src="/assets/line.svg" alt="" className="sm:w-8 sm:h-8 w-auto h-auto" />
                    </div>
                    <div className="flex flex-row sm:flex-row items-center sm:items-start gap-[5rem] sm:gap-1 w-full">
                      <div className="flex w-full justify-between items-center">
                        <p className="text-[#475467] text-2xs sm:text-sm font-semibold sm:font-medium font-open_sans">
                          Cap
                        </p>
                        <span className="text-[#667085] text-ellipsis text-2xs font-normal font-open_sans">
                          Cr. as of{" "}
                          {new Date().toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto h-auto sm:h-[52px] py-1 px-0 items-center gap-2 rounded-md flex ">
                    <div className="flex p-1 items-center rounded-md bg-[#F9FAFB]">
                      <img src="/assets/ant-design_stock-outlined.svg" alt="" className="sm:w-8 sm:h-8 w-auto h-auto" />
                    </div>
                    <div className="flex flex-row sm:flex-row items-center sm:items-start justify-between gap-10 sm:gap-1 w-full">
                      <div className="w-full flex justify-between items-center">
                        <p className="text-[#475467] text-2xs sm:text-sm font-semibold sm:font-medium font-open_sans ">
                          Risk
                        </p>
                        <span className="text-[#667085] text-ellipsis block sm:hidden text-2xs font-normal font-open_sans">
                          ~
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" p-4 bg-white rounded-[10px]">
                <div className=" flex justify-between gap-x-4">
                  <PerformanceMetricCard />
                  <PerformanceMetricCard />
                  <PerformanceMetricCard />
                </div>
              </div>
            </div>
            <div className=" bg-red-500 relative overflow-y-auto">
                  <div className=" bg-green-300 sticky h-4 top-0">INVESTMENT</div>
            </div>
          </div>
        </div>
      {/* </Layout> */}
    </div>
  );
}
