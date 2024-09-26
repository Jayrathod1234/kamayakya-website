"use client";
import { ButtonnArrow } from "@/components.v2/button";
import { ButtonSize, ButtonVariant } from "@/components.v2/button/button";
import { Tabs, TabsVariant } from "@/components.v2/tabs";
import CustomSortMenu from "./components/RadioDrop";
// import StockCardSkeleton from "/skeletons/StockCardSkeleton";
// import { onScrollPaginationFunction } from "@/utils/onScrollPaginationFunction";
import DrawerFilter from "./components/DrawerFilter";
import ResponsiveFilter from "./components/ResponsiveFilter";
import FilterMenuTags from "./components/FilterMenuTags";
import Filtermenu from "./components/FilterMenu";
import { AllBoardStockProvider } from "../../contexts/AllBoardStockContext";
import { StockPicksProvider } from "@/contexts/StockPicksContext";
import React, { useEffect, useRef, useState } from "react";

import { HeroCardSection } from "./components/HeroCardSection";
import { TrackRecordStockCard } from "./components/TrackRecordStockCard";
import { useNavBar } from "@/contexts/NavBarContext";
import Layout from "@/layout/Layout";
import { TrackRecordProvider, useTrackRecord } from "@/contexts/trackRecordContext";
import { onScrollPaginationFunction } from "@/utils/onScrollPaginationFunction";
import LegendSection from "./components/LegendSection";
import SebiBoardTab from '../stock-picks/components/SebiBoardTab'
import { getMixPanelClient } from "@/externals/mixpanel";


const Filters = () => {
  const { searchStock, setSearchStock } = useTrackRecord();
  const filterHeaderRef = useRef<null>(null);
  const { showFilterHeader } = useNavBar();
  return (
    <>
      <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto mt-5">
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
          <FilterMenuTags ref={filterHeaderRef} />
        </>
      ) : (
        <>
          {/* ref={filterHeaderRef} */}
          <Filtermenu ref={filterHeaderRef} role="banner" aria-hidden={!showFilterHeader} />
        </>
      )}
    </>
  );
};


const TrackRecordList = () => {
  const { response } = useTrackRecord();
  const items = response?.pages?.flatMap((page) => page.data) ?? [];
  console.log(items);
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
      {items.map((item) => (
        <TrackRecordStockCard key={item.id} {...item} />
      ))}
    </div>
  );
};

const TrackRecordTabSection = () => {
  const { sebiBoardType, setSebiBoardType } = useTrackRecord();
  console.log(sebiBoardType);
  return (
    <div className=" flex justify-center">
      <Tabs
        responsive={true}
        className=" dark block"
        tabTriggerClassname={` `}
        variant={TabsVariant.lg}
        defaultOption="all"
        options={[
          { label: "All Boards", value: "" },
          { label: "Main Board", value: "mainboard" },
          { label: "SME Board", value: "sme" },
        ]}
        setSelectedOption={setSebiBoardType}
        activeValue={sebiBoardType}
      />
    </div>
  );
};

const MyObserver = () => {
  const { fetchNextPage } = useTrackRecord();
  const myObserver = useRef();
  useEffect(() => {
    // Start observing the element referenced by observerElem.current
    if (myObserver.current) {
      onScrollPaginationFunction(fetchNextPage).observe(myObserver.current);
    }
    // Clean up function to stop observing when component unmounts
    return () => {
      if (myObserver.current) {
        onScrollPaginationFunction(fetchNextPage).unobserve(myObserver.current);
      }
    };
  }, [fetchNextPage]);
  return <div className=" h-1 w-full " ref={myObserver}></div>;
};

export default function TrackRecord() {
  // const [currentTabSelected, setCurrentTabSelected] = useState("all");
  const showFilterRef = useRef(null);
  const { setShowFilterHeader } = useNavBar();
  const handleContactButton = () => {
    const mp = getMixPanelClient();
    mp.track("sebi_registered_clicked", {
      page: "TrackRecord_Page",
    });
    window.open(
      "Kamayakya-SEBI-License.pdf#toolbar=0&fitH=1",
      "_blank",
      "fullscreen=yes"
    );
  };


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

  // Scroll Function

  // console.log(response);

  return (
    <StockPicksProvider>
      <TrackRecordProvider>
        <div className=" relative open_sans">
          <Layout>
            {/* navbar would come here */}
            <div className=" relative h-full bg-[length:100vw_616px]">
              <div className=" bg-[url(/assets/track-record-hero.png)] bg-black absolute w-screen h-[650px] z-[1] mt-[-4rem]"></div>
              {/* hero text section */}
              <div className=" py-9 flex flex-col items-center justify-center relative z-10">
                {/* Sebi chip */}
            
                <div className="pt-5 pb-3 md:pt-9 md:pb-[16px] flex justify-center">
            <ButtonnArrow
              onClick={handleContactButton}
              variant={ButtonVariant.sebi}
              size={ButtonSize.lg}
            >
              SEBI Registered: INH000009843
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
              <HeroCardSection />
              {/* hero chart section end  */}
            </div>
            {/* Main Section  */}
            <main className=" mt-[110px] ">
              <TrackRecordTabSection />
            </main>
            <Filters />
            {/* <div className=" mt-5">
             
            </div> */}
            {/* Stock Lists */}
            <section className="  bg-[linear-gradient(180deg,#EDF0F5_0%,rgba(242,244,247,0.5)_100%)]">
              <div ref={showFilterRef} className="main-container relative">
                <LegendSection/>
                <TrackRecordList />
                <MyObserver/>
              </div>
            </section>
            {/* Stock Lists end */}
          </Layout>
        </div>
      </TrackRecordProvider>
    </StockPicksProvider>
  );
}
