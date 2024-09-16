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
import { AllBoardStockProvider } from "../../contexts/AllBoardStockContext";
import { StockPicksProvider } from "@/contexts/StockPicksContext";
import React, { useEffect, useRef, useState } from "react";
import { TrackRecordHeroCard } from "./components/TrackRecordHeroCard";
import { TrackRecordStockCard } from "./components/TrackRecordStockCard";
import { useNavBar } from "@/contexts/NavBarContext";
import Layout from "@/layout/Layout";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components.v2/ui/tooltip";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import AdjustIcon from "@mui/icons-material/Adjust";
import Circle from "@mui/icons-material/Circle";
import { Arrow } from "@radix-ui/react-tooltip";
const Filters = () => {
  const [searchStock, setSearchStock] = useState("");
  const filterHeaderRef = useRef<null>(null);
  const { showFilterHeader } = useNavBar();
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
      {!showFilterHeader ? (
        <>
          {/* <Filtermenu2 /> */}
          <ResponsiveFilter />
          <FilterMenuTags />
        </>
      ) : (
        <>
          {/* ref={filterHeaderRef} */}
          <Filtermenu />
        </>
      )}
    </>
  );
};

const Marker = ({
  label,
  icon,
  tooltipContent,
}: {
  label: string;
  icon: string | React.ReactNode;
  tooltipContent?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className=" flex items-center gap-x-1">
      {typeof icon === "string" ? (
        <span className="inline-block bg-white rounded-full border border-white">
          <img
            className=" object-cover h-full w-full max-h-[10px] max-w-[10px]"
            height={10}
            width={10}
            src="/assets/entry_marker.svg"
            alt="marker-icons"
          />
        </span>
      ) : (
        icon
      )}
      <p className=" text-2xs text-[rgba(102,112,133,1)] whitespace-nowrap">{label}</p>
      {tooltipContent && (
        <TooltipProvider delayDuration={0}>
          <Tooltip open={open} onOpenChange={setOpen}>
            <TooltipTrigger
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
            >
              <img height={16} width={16} src="/assets/ph_info-duotone-white.svg" />
            </TooltipTrigger>
            <TooltipContent className=" rounded-lg shadow-lg px-0 py-0" side="bottom">
              <Arrow asChild color="white" stroke="1" strokeWidth={1}>
                <svg
                  className=" rotate-180 -my-[9.5px]  pt-[10px]"
                  width="17"
                  height="26"
                  viewBox="0 0 17 17"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.5 8L16.5 8L9.91421 1.41421C9.13317 0.633164 7.86684 0.633164 7.08579 1.41421L0.5 8Z"
                    fill="white"
                  />
                  <path
                    d="M16.5 8L9.91421 1.41421C9.13317 0.633164 7.86684 0.633164 7.08579 1.41421L0.5 8"
                    stroke="#EDF0F5"
                  />
                </svg>
              </Arrow>
              {tooltipContent}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

const MarkerSection = () => {
  return;
};

export default function TrackRecord() {
  const [currentTabSelected, setCurrentTabSelected] = useState("all");
  const showFilterRef = useRef(null);
  const { setShowFilterHeader } = useNavBar();
  useEffect(() => {
    const handleScroll = () => {
      if (showFilterRef.current) {
        const rect = showFilterRef.current?.getBoundingClientRect();
        setShowFilterHeader(rect.top <= 110);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StockPicksProvider>
      <AllBoardStockProvider>
        <div className=" relative">
          <Layout>
            {/* navbar would come here */}
            <div className=" relative h-full bg-[length:100vw_616px]">
              <div className=" bg-[url(/assets/track-record-hero.png)] bg-black absolute w-screen h-[650px] z-[1] mt-[-4rem]"></div>
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
                <TrackRecordHeroCard />
                <TrackRecordHeroCard />
              </div>
              {/* hero chart section end  */}
            </div>
            {/* Main Section  */}
            <main className=" mt-[110px]">
              <div className=" flex justify-center">
                <Tabs
                  responsive={true}
                  className=" dark block"
                  tabTriggerClassname={` `}
                  variant={TabsVariant.lg}
                  defaultOption="all"
                  options={[
                    { label: "All Boards", value: "all" },
                    { label: "Main Board", value: "Main Board" },
                    { label: "SME Board", value: "SME Board" },
                  ]}
                  setSelectedOption={setCurrentTabSelected}
                  activeValue={currentTabSelected}
                />
                {/* <Tabs
                  className=" dark block sm:hidden"
                  tabTriggerClassname={` `}
                  variant={TabsVariant.md}
                  defaultOption="all"
                  options={[
                    { label: "All Boards", value: "all" },
                    { label: "Main Board", value: "Main Board" },
                    { label: "SME Board", value: "SME Board" },
                  ]}
                  setSelectedOption={setCurrentTabSelected}
                  activeValue={currentTabSelected}
                /> */}
              </div>
            </main>
            <div className=" mt-5">
              <Filters />
            </div>
            {/* Stock Lists */}
            <section className="  bg-[linear-gradient(180deg,#EDF0F5_0%,rgba(242,244,247,0.5)_100%)]">
              <div ref={showFilterRef} className="main-container">
                <div className=" flex items-center justify-between sm:justify-normal sm:gap-x-10 py-5">
                  <Marker
                    label="Entry Point"
                    icon="/assets/entry_marker.svg"
                    tooltipContent={
                      <p className=" p-4 text-2xs max-w-[300px] whitespace-normal">
                        The price at which the stock recommendation was given by KamayaKya. You can buy the stock as
                        long as the action is 'Buy'.
                      </p>
                    }
                  />
                  <Marker
                    label="Past Targets"
                    icon={
                      <AdjustIcon
                        fontSize={"small"}
                        className=" text-[#1ACE1B] QontoStepIcon-completedIcon !h-[10px] !w-[10px] border border-white bg-white rounded-full"
                      />
                    }
                  />
                  <Marker
                    label="Active Targets"
                    icon={
                      <GpsFixedIcon
                        fontSize={"small"}
                        className="QontoStepIcon-lastStepIcon text-[#FF7F09] !h-[10px] !w-[10px] border border-white rounded-full bg-white"
                      />
                    }
                  />
                  <Marker
                    label="CMP"
                    icon={
                      <Circle
                        className=" text-[#1D9387] !h-[10px] !w-[10px] border border-white rounded-full relative"
                        fontSize="small"
                      />
                    }
                    tooltipContent={
                      <div className=" p-4 max-w-[300px]">
                        <h3 className=" text-2xs font-bold">Current Market Price</h3>
                        <p className=" text-2xs">
                          The current or live price at which the stock is trading on the NSE or BSE exchange.
                        </p>
                      </div>
                    }
                  />
                </div>
                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <TrackRecordStockCard /> <TrackRecordStockCard /> <TrackRecordStockCard /> <TrackRecordStockCard />
                  <TrackRecordStockCard /> <TrackRecordStockCard />
                </div>
              </div>
            </section>
            {/* Stock Lists end */}
          </Layout>
        </div>
      </AllBoardStockProvider>
    </StockPicksProvider>
  );
}
