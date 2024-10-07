"use client";
import { StockPicksProvider } from "@/contexts/StockPicksContext";
import React, { useEffect, useRef } from "react";
import { useNavBar } from "@/contexts/NavBarContext";
import Layout from "@/layout/Layout";
import { TrackRecordProvider, useTrackRecord } from "@/contexts/trackRecordContext";
import { onScrollPaginationFunction } from "@/utils/onScrollPaginationFunction";
import LegendSection from "./components/LegendSection";
import ElevateSection from "../stock-picks/components/ElevateSection";
import TrackRecordList from "./components/TrackRecordList";
import TrackRecordHero from "./components/TrackRecordHero";
import TrackRecordTabSection from "./components/TrackRecordTabSection";
import Filters from "./components/Filters";

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
      <TrackRecordProvider>
        <div className=" relative open_sans">
          <Layout>
            <TrackRecordHero />
            {/* Main Section  */}
            <main className=" mt-[110px] ">
              <TrackRecordTabSection />
            </main>
            <Filters />
            {/* Stock Lists */}
            <section className="  bg-[linear-gradient(180deg,#EDF0F5_0%,rgba(242,244,247,0.5)_100%)]">
              <div ref={showFilterRef} className="main-container relative">
                <LegendSection />
                <TrackRecordList />
                <MyObserver />
              </div>
            </section>
            {/* Stock Lists end */}
            <ElevateSection />
          </Layout>
        </div>
      </TrackRecordProvider>
    </StockPicksProvider>
  );
}
