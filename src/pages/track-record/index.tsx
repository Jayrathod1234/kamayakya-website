"use client";
import { ButtonnArrow } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Tabs, TabsVariant } from "@/components.v2/tabs";
import CustomSortMenu from "../../components.v3/common/RadioDrop";
// import StockCardSkeleton from "/skeletons/StockCardSkeleton";
// import { onScrollPaginationFunction } from "@/utils/onScrollPaginationFunction";
import DrawerFilter from "@/components.v3/common/DrawerFilter";
import ResponsiveFilter from "../../components.v3/common/ResponsiveFilter";
import FilterMenuTags from "@/components.v3/common/FilterMenuTags.jsx";
import Filtermenu from "@/components.v3/common/Filtermenu.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components.v2/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components.v2/ui/tooltip";
import { AllBoardStockProvider } from "../../contexts/AllBoardStockContext";
import { StockPicksProvider } from "@/contexts/StockPicksContext";
import React, { useRef, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register({
  LineElement,
  ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  annotationPlugin,
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomData() {
  const data = [];
  for (let i = 1950; i <= 2023; i++) {
    // Generate a random count value between 10 and 50
    const count = getRandomInt(20, 80);

    data.push({ year: i.toString(), count: count.toString() });
  }
  return data;
}

const data = generateRandomData();
// console.log(randomData);

const ChipItem = ({ label }) => {
  return (
    <DropdownMenuItem className="!p-0 rounded-[4px]  hover:!bg-[rgba(244,255,255,1)]">
      {/* image container */}
      <div className=" p-2 w-fit">
        <div className=" h-6 w-6 bg-red-400"></div>
      </div>
      {/* image container end */}

      <ButtonnArrow
        arrowStyle=" !scale-[.8]"
        strokeStyle=" stroke-gray-400 group-hover/chip:stroke-brand-400"
        variant={ButtonVariant.custom}
        className=" group/chip  min-w-0 w-full justify-between !items-center hover:scale-100 bg-transparent hover:bg-transparent !p-0 !py-0 !pr-3"
      >
        <p className="!text-2xs  text-gray-700 font-normal group-hover/chip:text-brand-400 group-hover/chip:font-semibold truncate">
          {label}
        </p>
      </ButtonnArrow>
    </DropdownMenuItem>
  );
};

const Chips = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className=" whitespace-nowrap text-[rgba(0,87,255,1)] px-2 py-[2px] rounded-full bg-[rgba(235,242,255,1)] hover:bg-[rgba(206,223,255,1)] text-3xs inline-block mb-0">
          3 New Recommendations
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-lg py-[6px] px-1">
        <ChipItem label={"Ion Exchange (India) Ltd."} />
        <ChipItem label={"Tata Motors Ltd."} />
        <ChipItem label={"Shree Pushkar Chemicals & Fertilisers ltd"} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AverageCard = () => {
  return (
    <TooltipProvider>
      <div className=" bg-[linear-gradient(314.25deg,#125B54_6.46%,#12ADB7_113.37%)] p-4 rounded-xl h-[176px] flex flex-row sm:flex-col sm:justify-between">
        <div className=" p-2 rounded-[6px] border border-[rgba(203,243,240,0.13)] bg-[rgba(134,207,198,0.27)] w-fit">
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_10903_284019)">
              <path
                d="M24.0378 15.331C23.9602 15.7198 23.907 16.116 23.7999 16.4972C23.0031 19.3436 20.3358 21.2547 17.348 21.137C14.461 21.0205 11.9846 18.8703 11.4237 15.9908C10.7207 12.3864 13.3336 8.88596 16.998 8.52665C18.6334 8.35609 20.2716 8.823 21.5713 9.83015C22.871 10.8373 23.7321 12.307 23.9752 13.9332C23.994 14.0584 24.0159 14.1774 24.0378 14.3V15.331ZM16.9486 18.2043C16.9486 18.4728 16.9455 18.7376 16.9486 19.0024C16.9549 19.4212 17.2509 19.731 17.6441 19.7354C18.0372 19.7398 18.3483 19.4268 18.3558 18.9955C18.3589 18.8077 18.3677 18.6199 18.3558 18.4321C18.3426 18.2687 18.4034 18.1943 18.553 18.1229C18.8422 17.9883 19.0969 17.7893 19.2975 17.5413C19.4982 17.2933 19.6396 17.0027 19.7109 16.6918C19.7822 16.3808 19.7816 16.0577 19.709 15.747C19.6365 15.4363 19.4939 15.1463 19.2923 14.8991C18.8747 14.3839 18.3214 14.1317 17.6578 14.1129C17.5157 14.1159 17.3761 14.0745 17.2585 13.9945C17.1409 13.9145 17.0512 13.7999 17.0018 13.6666C16.9466 13.5441 16.9306 13.4074 16.9562 13.2755C16.9817 13.1436 17.0475 13.0228 17.1445 12.9298C17.2379 12.8218 17.3639 12.7471 17.5035 12.717C17.6431 12.687 17.7887 12.7032 17.9182 12.7633C18.0949 12.8451 18.2598 12.9504 18.4084 13.0763C18.742 13.3417 19.1527 13.3373 19.4206 13.0475C19.488 12.9781 19.5399 12.8951 19.5728 12.8042C19.6058 12.7132 19.619 12.6163 19.6117 12.5198C19.6044 12.4233 19.5766 12.3295 19.5303 12.2446C19.4839 12.1596 19.4201 12.0855 19.343 12.0271C19.0857 11.818 18.7796 11.6716 18.501 11.4863C18.4314 11.4412 18.3825 11.3702 18.3652 11.2891C18.3477 11.0719 18.3621 10.8509 18.3583 10.6343C18.3508 10.203 18.0453 9.89003 17.6453 9.89567C17.2453 9.9013 16.9567 10.2087 16.9511 10.6293C16.9473 10.8941 16.9511 11.1595 16.9511 11.4193C15.7023 11.8831 15.199 13.2716 15.7749 14.3677C16.1642 15.1063 16.7971 15.4825 17.6315 15.5176C17.952 15.5313 18.1849 15.6747 18.3045 15.9739C18.3583 16.097 18.3727 16.2337 18.3457 16.3653C18.3187 16.4969 18.2516 16.6169 18.1536 16.7088C17.9283 16.9417 17.6403 16.9955 17.3574 16.8559C17.1442 16.7443 16.9495 16.6005 16.7802 16.4296C16.4365 16.0941 16.029 16.0453 15.7204 16.3332C15.4118 16.6212 15.425 17.0368 15.748 17.3936C16.075 17.759 16.4875 18.0375 16.9486 18.2043Z"
                fill="#CBF3F0"
              />
              <path
                d="M8.49766 23.9999V5.64055C8.41002 5.63617 8.3349 5.62991 8.25978 5.62991C7.65008 5.62991 7.03975 5.62991 6.42942 5.62991C6.09077 5.62991 5.83913 5.46215 5.72958 5.17858C5.61628 4.88249 5.69578 4.59517 5.96745 4.36481C7.58122 2.97848 9.19646 1.59486 10.8131 0.213949C11.1437 -0.067741 11.4798 -0.0727488 11.8085 0.207689C13.4322 1.59194 15.0535 2.97869 16.6723 4.36794C16.934 4.59267 17.0085 4.87811 16.902 5.16731C16.7956 5.45652 16.5421 5.62741 16.1859 5.62866C15.5136 5.62866 14.8413 5.62866 14.1315 5.62866V5.87905C14.1315 6.50503 14.1271 7.13101 14.1346 7.7526C14.1346 7.88969 14.0858 7.95542 13.97 8.0224C11.2407 9.61364 9.81284 11.9867 9.93052 15.1435C10.0369 18.0061 11.4642 20.1445 13.9368 21.5823C14.0764 21.6631 14.139 21.7395 14.1333 21.9047C14.1202 22.2866 14.1102 22.6709 14.1333 23.0515C14.1609 23.4897 14.0175 23.8083 13.6119 23.9961L8.49766 23.9999Z"
                fill="#CBF3F0"
              />
              <path
                d="M4.27231 23.9998V10.7666C4.27231 10.1519 4.5227 9.89648 5.13616 9.89648H7.08921V23.9998H4.27231Z"
                fill="#CBF3F0"
              />
              <path
                d="M0 16.0332C0.187793 15.6282 0.507668 15.4943 0.944601 15.5112C1.55931 15.5356 2.17527 15.5174 2.8169 15.5174V24.0001H0.516432C0.289726 23.8931 0.107183 23.7108 0 23.4842L0 16.0332Z"
                fill="#CBF3F0"
              />
            </g>
            <defs>
              <clipPath id="clip0_10903_284019">
                <rect width="24.0376" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className=" flex flex-col">
        <div className="mt-[10px] flex items-center justify-center gap-x-[5px]">
          <p className="  text-sm font-semibold text-brand-200 whitespace-nowrap truncate">Average Live Returns </p>
          <Tooltip>
            <TooltipTrigger className=" h-4">
              <span className=" inline-block !h-4 !w-4">
                <img className="!h-4 !w-4 object-contain" height={16} width={16} src="/assets/ph_info-duotone.svg" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className=" mt-auto flex gap-x-[10px]">
          <img width={15} height={11} src="/assets/Polygon2.svg" alt="" />
          <p className=" text-display-xs font-bold text-white">118.34%</p>
        </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

const LiveStock = () => {
  return (
    <div className=" p-4 pt-3 bg-white rounded-xl w-full">
      <p className=" text-sm font-semibold">Live Stock Performance </p>
      <div className=" mt-4 flex items-center justify-between gap-x-3">
        <div className=" h-[110px] max-w-full">
          <Doughnut
            // options={...}
            data={{
              // labels: [
              //   'Medium',
              //   'High',
              //   'Low'
              // ],
              datasets: [
                {
                  label: "# of Votes",
                  data: [12, 19, 3],
                  borderWidth: 1,
                  backgroundColor: ["rgba(18, 183, 106, 1)", "rgba(240, 68, 56, 1)", "rgba(208, 213, 221, 1)"],
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              cutout: "65%",
              // plugins:{
              //   legend:{
              //     position:'right',
              //     align:'end',
              //     labels:{
              //       boxWidth:8,
              //       boxHeight:8,

              //     },
              //     legendDistance: {
              //       padding: 130 // dictates the space
              //   }
              //   }
              // }
            }}
            // plugins={[
            //   {
            //     id: 'legendDistance',
            //     beforeInit(chart, args, opts) {
            //         // Get reference to the original fit function
            //         const originalFit = chart.legend.fit;
            //         // Override the fit function
            //         chart.legend.fit = function fit() {
            //             // Call original function and bind scope in order to use `this` correctly inside it
            //             originalFit.bind(chart.legend)();
            //             // Specify what you want to change, whether the height or width
            //             this.width += opts.padding || 0;
            //         }
            //     }
            // }
            // ]}

            // {...props}
          />
        </div>
        <div className=" h-full flex flex-col gap-y-3 w-full">
          <div className="flex items-baseline ">
            <div className=" flex items-baseline gap-x-1">
              <div className=" h-2 w-2 rounded-full bg-[rgba(18,183,106,1)]"></div>
              <p className=" text-2xs text-[rgba(102,112,133,1)] ">High (&gt;15%)</p>
            </div>
            <p className=" ml-auto text-sm font-bold text-[rgba(30,27,57,1)]">16</p>
          </div>
          <div className="flex items-baseline">
            <div className="flex items-baseline gap-x-1">
              <div className=" h-2 w-2 rounded-full bg-[rgba(208,213,221,1)]"></div>
              <p className=" text-2xs text-[rgba(102,112,133,1)]">Medium (&lt;15% to &gt;-15%)</p>
            </div>
            <p className=" ml-auto text-sm font-bold text-[rgba(30,27,57,1)]">8</p>
          </div>
          <div className="flex items-baseline">
            <div className="flex items-baseline gap-x-1">
              <div className=" h-2 w-2 rounded-full bg-[rgba(240,68,56,1)]"></div>
              <p className=" text-2xs text-[rgba(102,112,133,1)]">Low (&gt;-15%)</p>
            </div>{" "}
            <p className=" ml-auto text-sm font-bold text-[rgba(30,27,57,1)]">2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TopGainerLoserCard = () => {
  return (
    <div
      className="group/gainer-loser transition-[shadow] duration-150 hover:shadow-[0px_8.2px_8.2px_-4.1px_rgba(16,24,40,0.04),0px_20.49px_24.59px_-4.1px_rgba(16,24,40,0.1)]
 flex flex-col bg-white rounded-[9px] p-4 h-[176px] w-full relative cursor-pointer "
    >
      <img width={39} height={29} className=" absolute right-0 top-[-0.5rem]" src="/assets/sellbblyellow.png" alt="" />
      <div className=" flex flex-col justify-center sm:flex-row sm:justify-between items-center gap-x-[3.81px]">
        <div className=" flex items-center">
          <p className=" font-semibold text-sm text-[rgba(29,41,57,1)] group-hover/gainer-loser:text-brand-400 whitespace-nowrap ">
            Top Gainer
          </p>
          <svg
            className=" opacity-0 group-hover/gainer-loser:opacity-100   translate-x-[-2px] group-hover/gainer-loser:translate-x-[0px] transition-transform duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)]"
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.66608 2.65625L11.0807 6.24162L7.66608 9.82698"
              stroke="#108973"
              stroke-width="1.53659"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M11.0808 6.24219L2.88564 6.24219" stroke="#108973" stroke-width="1.53659" stroke-linecap="round" />
          </svg>
        </div>
        <div className="  h-10 w-[98px] max-w-full">
          <Line
            className=""
            options={{
              layout: {},
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  display: false,
                },
                y: {
                  display: false,
                },
              },
            }}
            data={{
              labels: data.map((x) => x.year),
              datasets: [
                {
                  label: "Dimensions",
                  data: data.map((row) => row.count),
                  borderColor: "#00645A",
                  pointStyle: false,
                  tension: 0.3,
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </div>
      <div className=" mt-auto">
        <div className=" flex gap-x-[2px] max-sm:justify-center ">
          <img width={15} height={11} src="/assets/Polygon2.svg" alt="" />
          <p className=" text-display-xs font-bold text-[rgba(18,183,106,1)]">
            118.34%{" "}
            <span className=" text-3xs font-semibold text-[rgba(73,70,70,1)] whitespace-nowrap hidden sm:inline-block">
              in 9m, 10d
            </span>
          </p>
        </div>
        <div className="flex items-center gap-y-[10px] gap-x-3 flex-wrap  justify-center sm:justify-between">
          <p className="sm:flex-1 text-sm font-normal text-[rgba(52,64,84,1)] truncate">Ion Exchange (India) Ltd.</p>

          <div className="py-[2px] px-2.5 rounded-full bg-[#FFF6EE] w-fit">
            <p className="text-[#667085] text-4xs font-semibold whitespace-nowrap">
              Target | <span className="text-[#F79009] font-bold">Active</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardHero = () => {
  return (
    <div className=" p-4 bg-gray-50 rounded-[10px] w-full  z-10">
      {/* top section */}
      <div className=" flex justify-between">
        <div className=" flex items-center">
          <div className=" p-1 ml-1">
            <img height={16} width={16} src="/assets/entry_marker.svg" alt="" />
          </div>
          <p className=" text-md font-bold mr-2">56 Live Recommendations </p>
          <img height={20} width={20} src="/assets/pulse.gif" alt="" />
        </div>
        <Chips />
      </div>
      {/* top section end */}
      {/* Middle Section */}
      <div className=" flex flex-col md:flex-row mt-4 gap-3">
        <AverageCard />
        <LiveStock />
      </div>
      {/* Middle Section end */}
      {/* Lower Section */}
      <div className=" flex mt-4 gap-3">
        <TopGainerLoserCard />
        <TopGainerLoserCard />
      </div>
      {/* Lower Section end */}
    </div>
  );
};

const Filters = () => {
  const [searchStock, setSearchStock] = useState("");
  const filterHeaderRef = useRef(null);
  const showFilterRef = useRef(null);
  return (
    <>
      <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:gap-4 gap-0 items-center justify-between ">
          <div className="w-full">
            <div>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white ml-2 shadow-3xs"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none gap-2">
                  <img src="/assets/search.svg" alt="" />
                </div>
                <input
                  type="search"
                  name="search-stock"
                  id="default-search"
                  className="block w-full pr-[14px] pl-9 py-[11px] text-md text-gray-900 border border-[#E4E7EC] rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 shadow-3xs"
                  placeholder="Search Stocks by Name..."
                  value={searchStock}
                  onChange={(e) => setSearchStock(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex sm:gap-4 gap-0 sm:h-[46px] h-0 ">
            <div className="w-auto sm:block hidden">
              <div className="relative flex gap-4">
                <CustomSortMenu isLabel={true} />
              </div>
            </div>
          </div>
          <div className="w-auto sm:block hidden bg-white h-[46px]">
            <DrawerFilter />
          </div>
        </div>
      </div>
      {/* filter menu code not delete -nehakikani */}
      {/* main filter  */}
      {!false ? (
        <>
          {/* <Filtermenu2 /> */}
          <ResponsiveFilter />
          <FilterMenuTags />
        </>
      ) : (
        <>
          <Filtermenu ref={filterHeaderRef} role="banner" aria-hidden={!false} />
        </>
      )}
    </>
  );
};

const TrackRecordStockCard = () => {
  const img = new Image();
  img.src = "/assets/entry point.svg";
  const img2 = new Image();
  img2.src = "/assets/typcn_tick (1).svg";

  const markerAnnotation = {
    type: "label",
    padding: 0,
    content: img,
    yValue: 20,
    xValue: 1,
    height: 14,
    width: 14,
    backgroundColor: "white",
  };

  const targetAnnotation = {
    type: "line",
    borderColor: "#99D9D4",
    borderWidth: 1,
    borderDash: [6, 6],
    scaleID: "y",
    value: 20,
    label: {
      display: true,
      content: "Target ",
      backgroundColor: "transparent",
      color: "#12B76A",
      position: "end",
      xAdjust: 50,
      font: {
        size: 10,
      },
    },
  };

  const targetAnnotation2 = {
    type: "line",
    borderColor: "#99D9D4",
    borderWidth: 1,
    borderDash: [6, 6],
    scaleID: "y",
    value: 15,
    label: {
      display: true,
      content: "Target ",
      backgroundColor: "transparent",
      color: "#12B76A",
      position: "end",
      xAdjust: 50,
      font: {
        size: 10,
      },
    },
  };

  const targetIconAnnotation = {
    type: "line",
    borderColor: "#99D9D4",
    borderWidth: 0,
    borderDash: [6, 6],
    scaleID: "y",
    value: 20,
    label: {
      display: true,
      content: img2,
      backgroundColor: "transparent",
      // color: "#12B76A",
      position: "end",
      xAdjust: 65,
      yAdjust: -2,
      height: 16,
      width: 16,
    },
  };

  return (
    <div className=" p-5 bg-white max-h-[451px] lg:max-w-[630px] rounded-lg overflow-hidden">
      {/* TOP SECTION */}
      <div className=" flex gap-x-2 items-center justify-between">
        <h4 className=" text-lg font-bold m-0">Ion Exchange (India) Ltd.</h4>
        <div className=" flex items-center justify-center">
          <img height={28} width={28} className=" h-7 w-7" src="/assets/play.gif" />
        </div>
      </div>

      <div className=" mt-3 border border-[#FEF0C7] px-[6px] py-[2px] rounded w-fit">
        <p className=" text-[#A3651A] font-semibold text-[10px]">Engineering</p>
      </div>
      {/* TOP SECTION  END*/}
      {/* CHART SECTION */}
      <div className=" relative h-[180px] w-full py-5">
        <Line
          className=""
          options={{
            layout: {
              padding: {
                right: 60,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              annotation: {
                clip: false,
                annotations: {
                  markerAnnotation,
                  targetAnnotation,
                  targetAnnotation2,
                  targetIconAnnotation,
                },
              },
            },
            scales: {
              x: {
                grid: {
                  color: "#f7f7f7",
                },
              },
              y: {
                grid: {
                  color: "#f7f7f7",
                },
              },
            },
          }}
          data={{
            labels: data.map((x) => x.year),
            datasets: [
              {
                label: "Dimensions",
                data: data.map((row) => row.count),
                borderColor: "#00645A",
                pointStyle: false,
                tension: 0,
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
      {/* CHART SECTION END */}
      {/* BOTTOM SECTION */}
      <div className="p-1 pr-4 rounded-[4px] flex gap-x-4">
        {/* Total Returns */}
        <div className="  rounded-lg bg-[linear-gradient(314.25deg,#125B54_6.46%,#12ADB7_113.37%)] px-3 py-2">
          <p className=" text-4xs font-bold text-white">Total Returns</p>
          <div className=" flex gap-x-[2px]">
            <img width={15} height={11} src="/assets/Polygon2.svg" alt="" />
            <p className=" text-xl font-bold text-white m-0">118.34%</p>
          </div>
          <span className=" text-3xs font-semibold whitespace-nowrap text-white">in 9m, 10d</span>
        </div>
        {/* Total Returns End*/}
        {/* Upside Left */}
        <div className=" flex flex-col justify-center">
          <div className=" flex items-center gap-x-1">
            <p className=" font-bold text-4xs text-[rgba(102,112,133,1)]">Upside Left</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className=" h-[14px]">
                  <img
                    className="!h-[14px] !w-[14px] object-contain"
                    height={14}
                    width={14}
                    src="/assets/blackinfo.svg"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to library</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className=" text-xl font-bold text-[rgba(16,24,40,1)]">34.16%</p>
          <p className=" text-3xs font-semibold text-[rgba(110,110,110,1)]">expected in 4 months</p>
        </div>
        <div className=" ml-auto">
          <img src="/assets/hold_call.png" alt="" />
        </div>
        {/* Upside Left End  */}
      </div>
      <div className=" pt-5">
        <button className="button-82-pushable group " role="button">
          <span className="button-82-shadow"></span>
          <span className="button-82-edge"></span>
          <span className="button-82-front button-82-front2 text flex items-center">
            <p className="text-[13px] font-bold text-[#125B54] font-open_sans">View Reports & Details</p>
            <div className="relative flex w-5">
              <img
                src="assets/chevron-right.png"
                alt=""
                className="w-4 img-1 transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src="assets/pajamas_long-arrow.svg"
                alt=""
                className="w-5 img-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute right-0"
              />
            </div>
          </span>
        </button>
      </div>
      {/* BOTTOM SECTION END */}
    </div>
  );
};

export default function TrackRecord() {
  return (
    <StockPicksProvider>
      <AllBoardStockProvider>
        <div>
          {/* navbar would come here */}
          <div className=" relative h-full bg-[length:100vw_616px]">
            <div className=" bg-[url(/assets/track-record-hero.png)] bg-black absolute w-screen h-[616px] z-[1]"></div>
            {/* hero text section */}
            <div className=" py-9 flex flex-col items-center justify-center relative z-10">
              {/* Sebi chip */}
              <div className=" border max-w-fit rounded-full border-lime-400 z-10">
                <ButtonnArrow
                  className=" !py-[6px] !px-4 bg-[rgba(16,137,115,0.2)] hover:scale-100 hover:bg-[rgba(16,137,115,0.2)]  rounded-full"
                  variant={ButtonVariant.custom}
                >
                  <p className=" font-semibold text-sm text-white">SEBI Registered: INH000009843</p>
                </ButtonnArrow>
              </div>
              {/* Sebi chip end */}
              {/* heading and subtext */}
              <h1 className=" text-display-lg font-bold text-white mt-4 mb-3 z-10 text-center">
                Unveiling Our Track Record
              </h1>
              <p className=" text-md text-[rgba(208,213,221,1)] z-10 text-center">
                Our victories, our misses - all in the open. Your trust is earned, not assumed
              </p>
              {/* heading and subtext end  */}
            </div>
            {/* hero text section end */}
            {/* hero chart section */}
            <div className=" sm:p-[10px] bg-gray-150 rounded-[20px] flex flex-col gap-y-[10px] lg:flex-row gap-[10px] sm:main-container relative z-20">
              <CardHero />
              <CardHero />
            </div>
            {/* hero chart section end  */}
          </div>
          {/* Main Section  */}
          <main className=" mt-[110px]">
            <div className=" flex justify-center">
              <Tabs
                variant={TabsVariant.lg}
                defaultOption="all"
                options={[
                  { label: "All Boards", value: "all" },
                  { label: "Main Board", value: "Main Board" },
                  { label: "SME Board", value: "SME Board" },
                ]}
              />
            </div>
          </main>
          <div className=" mt-5">
            <Filters />
          </div>
          {/* Stock Lists */}
          <section className="  bg-[linear-gradient(180deg,#EDF0F5_0%,rgba(242,244,247,0.5)_100%)]">
            <div className="main-container">
              <div> entry point past targets</div>
              <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
                <TrackRecordStockCard /> <TrackRecordStockCard /> <TrackRecordStockCard /> <TrackRecordStockCard />
              </div>
            </div>
          </section>
          {/* Stock Lists end */}
        </div>
      </AllBoardStockProvider>
    </StockPicksProvider>
  );
}
