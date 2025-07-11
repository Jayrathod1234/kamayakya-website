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
import Hero from "@/components.v3/home/Hero";
import Stat from "@/components.v3/home/Stat";

const Home: NextPage = () => {
  const containerRef = useRef(null);

  // Create refs for each section
  const sampleReportRef = useRef(null);
  const trackRecordRef = useRef(null);
  const trustUsRef = useRef(null);
  const teamRef = useRef(null);
  const howRef = useRef(null);
  const stockPickRef = useRef(null);

  // Get scroll progress for the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"],
  });

  // Create individual scroll progress for each section
  const { scrollYProgress: sampleReportProgress } = useScroll({
    target: sampleReportRef,
    offset: ["start center", "end center"],
  });

  const { scrollYProgress: trackRecordProgress } = useScroll({
    target: trackRecordRef,
    offset: ["start center", "end center"],
  });

  const { scrollYProgress: trustUsProgress } = useScroll({
    target: trustUsRef,
    offset: ["start center", "end center"],
  });

  const { scrollYProgress: teamProgress } = useScroll({
    target: teamRef,
    offset: ["start center", "end center"],
  });

  const { scrollYProgress: howProgress } = useScroll({
    target: howRef,
    offset: ["start center", "end center"],
  });

  const { scrollYProgress: stockPickProgress } = useScroll({
    target: stockPickRef,
    offset: ["start center", "end center"],
  });

  // Calculate cumulative progress based on which sections are in view
  const pathLength = useTransform(
    [sampleReportProgress, trackRecordProgress, trustUsProgress, teamProgress, howProgress, stockPickProgress],
    ([sample, track, trust, team, how, stock]) => {
      let progress = 0;
      const sectionWeight = 1 / 6; // Each section represents 1/6 of the total path

      // Add progress for each section that's in view
      if (sample > 0) progress += sectionWeight * Math.min(sample, 1);
      if (track > 0) progress += sectionWeight * Math.min(track, 1);
      if (trust > 0) progress += sectionWeight * Math.min(trust, 1);
      if (team > 0) progress += sectionWeight * Math.min(team, 1);
      if (how > 0) progress += sectionWeight * Math.min(how, 1);
      if (stock > 0) progress += sectionWeight * Math.min(stock, 1);

      return Math.min(progress, 1);
    }
  );

  return (
    <>
      <motion.div
        
        className=" fixed right-[20px] bottom-[20px] z-[1000]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <img className=" h-full w-full max-h-[56px] max-w-[56px] lg:max-h-[88px] lg:max-w-[88px]" height={88} width={88} src="/landing/float.png" alt="float"  />
      </motion.div>
      <div className=" bg-[#F4FFFF]">
        <Navbar className=" open_sans" />
        <Hero />
      </div>
      <Stat />
      <Service />
      <div>
        <ExpandableCardGroup />
      </div>
      <div>
        <OnGroundVerification />
      </div>
      <div ref={containerRef} className="relative">
        {/* <svg
        className="absolute left-[0%] w-full pointer-events-none"
        width="1380"
        height="3835"
        viewBox="0 0 1380 3914"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M661 0V43.0048C661 49.6323 655.627 55.0048 649 55.0048H13C6.37257 55.0048 1 60.3774 1 67.0048V3842.96C1 3849.59 6.37258 3854.96 13 3854.96H649C655.627 3854.96 661 3860.33 661 3866.96V3914"
          stroke="#EDF0F5"
          strokeWidth="2"
        />
      </svg>
      <svg
        className="absolute left-[0%] w-full pointer-events-none"
        width="1380"
        height="3835"
        viewBox="0 0 1380 3914"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M661 0V43.0V43.0129C661 49.6403 655.627 55.0048 649 55.0129H13C6.37257 55.0129 1 60.3855 1 67.0048V3842.96C1 3849.59 6.37258 3854.96 13 3854.96H649C655.627 3854.96 661 3860.33 661 3866.96V3914"
          stroke="#12B76A"
          strokeWidth="2"
          strokeDasharray="5300"
          strokeDashoffset="0"
          style={{
            pathLength,
          }}
        />
      </svg> */}

        {/* Add refs to each section */}
        <div ref={sampleReportRef}>
          <SampleReport />
        </div>
        <div ref={trackRecordRef}>
          <TrackRecordSection />
        </div>
        <div ref={trustUsRef}>
          <TrustUs />
        </div>
        <div ref={teamRef}>
          <Team />
        </div>
        <div ref={howRef}>
          <How />
        </div>
        <div ref={stockPickRef}>
          <StockPickSection />
        </div>
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
