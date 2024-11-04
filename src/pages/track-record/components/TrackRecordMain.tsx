"use client";
import { useTrackRecordCommon } from "@/contexts/TrackRecordCommonContext";
import React, {  useEffect, useRef } from "react";
import { useNavBar } from "@/contexts/NavBarContext";
import Layout from "@/layout/Layout";
import {  useTrackRecord } from "@/contexts/TrackRecordContext";
import { onScrollPaginationFunction } from "@/utils/onScrollPaginationFunction";
import LegendSection from "./LegendSection";
import ElevateSection from "../../stock-picks/components/ElevateSection";
import TrackRecordList from "./TrackRecordList";
import TrackRecordHero from "./TrackRecordHero";
import TrackRecordTabSection from "./TrackRecordTabSection";
import Filters from "./Filters";
import {  useMediaQuery } from "@mui/material";

import { AllBoardStockProvider } from "@/contexts/AllBoardStockContext";
import SearchPage from "./SearchPage";

// const MyObserver = () => {
//   const { fetchNextPage } = useTrackRecord();
//   const myObserver = useRef();
//   useEffect(() => {
//     // Start observing the element referenced by observerElem.current
//     if (myObserver.current) {
//       onScrollPaginationFunction(fetchNextPage).observe(myObserver.current);
//     }
//     // Clean up function to stop observing when component unmounts
//     return () => {
//       if (myObserver.current) {
//         onScrollPaginationFunction(fetchNextPage).unobserve(myObserver.current);
//       }
//     };
//   }, [fetchNextPage]);
//   return <div className=" h-1 w-full " ref={myObserver}></div>;
// };

export default function TrackRecordMain() {
  const { searchPageOpen } = useTrackRecordCommon();
  const isMobile = useMediaQuery("(max-width:600px)");
  const showFilterRef = useRef(null);
  const { setShowFilterHeader } = useNavBar();
 
  console.log("PARENT RERENDER")
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

  return isMobile && searchPageOpen ? (
    <AllBoardStockProvider>
      <SearchPage />
    </AllBoardStockProvider>
  ) : (
    <Layout>
      <TrackRecordHero />
      {/* Main Section  */}
      <main className=" mt-[110px] ">
        <TrackRecordTabSection />
      </main>
      <Filters />
      {/* Stock Lists */}
      <section className=" pb-[80px]  bg-[linear-gradient(180deg,#EDF0F5_0%,rgba(242,244,247,0.5)_100%)]">
        <div ref={showFilterRef} className="main-container relative">
          <LegendSection />
          <TrackRecordList />
          {/* <MyObserver /> */}
        </div>
      </section>
      {/* Stock Lists end */}
      <ElevateSection />
    </Layout>
  );
}
