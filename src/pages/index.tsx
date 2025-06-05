import type { NextPage } from "next";
import React, { useRef } from "react";
import { Navbar, Footer, FeelingLost, Newsletter, Testimonials } from "@/components.v2/index.components";
import "chartjs-adapter-date-fns";
import ExpandableCardGroup from "@/components.v3/home/ExpandableCardGroup";
import OnGroundVerification from "@/components.v3/home/OnGroundVerification";
import SampleReport from "@/components.v3/home/SampleReport";
import TrustUs from "@/components.v3/home/TrustUs";
import FAQS from "@/components.v3/home/FAQS";
import BlogsCarousel from "@/components.v3/home/BlogsCarousel";
import FeaturedNews from "@/components.v3/home/FeaturedNews";
import How from "@/components.v3/home/How";
import Service from "@/components.v3/home/Service";
import Team from "@/components.v3/home/Team";
import { useScroll, useTransform, motion } from "framer-motion";
import { TrackRecordSection } from "@/components.v3/home/TrackRecordSection";
import { StockPickSection } from "@/components.v3/home/StockPicksSection";

const Home: NextPage = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]); // 0 to full path

  return (
    <>
      <Navbar className=" bg-white open_sans" />
      <Service />
      <div>
        <ExpandableCardGroup />
      </div>
      <div>
        <OnGroundVerification />
      </div>
      <div ref={containerRef} className=" relative">
        <svg
          className=" absolute left-[0%] w-full"
          width="1380"
          height="3835"
          viewBox="0 0 1380 3914"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M661 0V43.0048C661 49.6323 655.627 55.0048 649 55.0048H13C6.37257 55.0048 1 60.3774 1 67.0048V3842.96C1 3849.59 6.37258 3854.96 13 3854.96H649C655.627 3854.96 661 3860.33 661 3866.96V3914"
            stroke="#EDF0F5"
            stroke-width="2"
          />
        </svg>
        <svg
          className=" absolute left-[0%] w-full"
          width="1380"
          height="3835"
          viewBox="0 0 1380 3914"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* <svg width="662" height="870" viewBox="0 0 662 870" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M661 0V43.0129C661 49.6403 655.627 55.0129 649 55.0129H13C6.37257 55.0129 1 60.3855 1 67.0129V870" stroke="#12B76A" stroke-width="2"/>
        </svg> */}

          <motion.path
            d="M661 0V43.0V43.0129C661 49.6403 655.627 55.0048 649 55.0129H13C6.37257 55.0129 1 60.3855 1 67.0048V3842.96C1 3849.59 6.37258 3854.96 13 3854.96H649C655.627 3854.96 661 3860.33 661 3866.96V3914"
            stroke="#12B76A"
            stroke-width="2"
            strokeDasharray="5300"
            strokeDashoffset="0"
            style={{
              pathLength,
              // strokeDashoffset: useTransform(pathLength, (v) => 8000 - v * 8000),
            }}
          />
        </svg>
        <SampleReport />
        <TrackRecordSection />
        <TrustUs />
        <Team />
        <How />
        <StockPickSection />
      </div>
      <div id="testimonials" className="pt-[60px] pb-[52px] md:py-[60px] bg-gray-100 relative ">
        <Testimonials />
      </div>
      <FeaturedNews />
      <BlogsCarousel />
      <FAQS />
      <div id="feeling-lost" className=" bg-gray-100">
        <FeelingLost />
      </div>
      <div className=" md:mt-[-15rem]  lg:mt-[-15rem]">
        <Newsletter />
      </div>
      <Footer />
    </>
  );
};

export default Home;
