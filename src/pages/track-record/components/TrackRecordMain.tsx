"use client";
import { useTrackRecordCommon } from "@/contexts/TrackRecordCommonContext";
import React, { useEffect, useRef, useState } from "react";
import { useNavBar } from "@/contexts/NavBarContext";
import Layout from "@/layout/Layout";
import { useTrackRecord } from "@/contexts/TrackRecordContext";
import { onScrollPaginationFunction } from "@/utils/onScrollPaginationFunction";
import LegendSection from "./LegendSection";
import ElevateSection from "../../stock-picks/components/ElevateSection";
import TrackRecordList from "./TrackRecordList";
import TrackRecordHero from "./TrackRecordHero";
import TrackRecordTabSection from "./TrackRecordTabSection";
import Filters from "./Filters";
import { useMediaQuery } from "@mui/material";
import { Modal } from "@nextui-org/react";
import { X, Play } from "lucide-react";

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
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  console.log("PARENT RERENDER");
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
      <div className=" border shadow-md p-2 md:p-1 rounded-2xl mt-8 md:px-4 md:flex md:flex-row items-center justify-between main-container">
        <div className="flex flex-row items-center flex-1">
          <img
            width={100}
            height={100}
            src="/Play_Prototype.png"
            alt="track-record-hero-card"
            className="w-full h-full max-w-[50px] max-h-[50px] md:max-w-[100px] md:max-h-[100px] object-cover"
          />
          <div className=" ml-4">
            <h2 className="text-xl md:text-[24px] font-bold text-[#0C111D] mb-0">How to read Track Record?</h2>
            <p className="text-sm md:text-[16px] text-[#667085] text-medium">
              Understand returns, methodology, and what each metric means in 10 mins.
            </p>
          </div>
        </div>
        <div className="max-md:mt-2 md:ml-4 max-md:w-full">
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="w-full bg-gradient-to-r from-[#75CDC5] to-[#108973] text-white px-6 py-3 rounded-lg max-md:text-[14px] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Play size={14} fill="white" className="ml-1" />
            Watch Now
          </button>
        </div>
      </div>
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

      {/* Video Modal */}
      <Modal
        open={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        width="900px"
        className="bg-transparent"
        css={{
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button onClick={() => setIsVideoModalOpen(false)} className=" hover:text-gray-300 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Video Player */}
          <div className="px-4 pb-4">
            <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <video controls className="w-full h-full" style={{ objectFit: "contain" }}>
                <source src="https://kamayakya-mumbai-public.s3.ap-south-1.amazonaws.com/video_assets/Track+Record+.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Title and Description */}
          <div className="px-4 pb-6 font-open_sans text-left">
            <h3 className="text-xl font-bold  mb-2">Welcome To Kamayakya: Your Guide To Track Records</h3>
            <p className="text-sm text-gray-400">
             {`Quick tour: Track Record page features\n
Everything you need to interpret this page - returns, methodology, and metrics - in 10 mins`}
            </p>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}
