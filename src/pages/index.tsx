import type { NextPage } from "next";
import React, { useRef, useState, useEffect, useContext } from "react";
import { Navbar, Footer, FeelingLost, Newsletter, Testimonials } from "@/components.v2/index.components";
import { SmallcasePopup } from "@/components.v3/common/SmallcasePopup";
import { useActivePlanContext } from "@/components/PlanContext";
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
import { useScroll, useTransform, motion, useMotionValue, animate } from "framer-motion";
import { TrackRecordSection } from "@/components.v3/home/TrackRecordSection";
import { StockPickSection } from "@/components.v3/home/StockPicksSection";
import Hero from "@/components.v3/home/Hero";
import Stat from "@/components.v3/home/Stat";
import { useMotionValueEvent } from "framer-motion";
import { useRouter } from "next/router";
import AuthContext from "../components/AuthContext";
import { getMixPanelClient } from "@/externals/mixpanel";
import { ACTIVE_PLAN_URL, GET_USER } from "./api/URLs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";
const Home: NextPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useContext(AuthContext);
  const { activePlan, loading } = useActivePlanContext();
  const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh") : null;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn && !loading) {
      const planName = activePlan?.plan?.toLowerCase() || "";
      const hasPaidPlan = planName !== "" && planName !== "free";

      if (!hasPaidPlan && sessionStorage.getItem("smallcase_popup_dismissed") !== "true") {
        setIsPopupOpen(true);
      } else {
        setIsPopupOpen(false);
      }
    } else {
      setIsPopupOpen(false);
    }
  }, [isLoggedIn, activePlan, loading]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    sessionStorage.setItem("smallcase_popup_dismissed", "true");
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(GET_USER, {
        method: "GET",
        headers: {
          Authorization: `Token ${refreshToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (e) {
      return null;
    }
  };

  const fetchActivePlan = async () => {
    try {
      const response = await axios.get(ACTIVE_PLAN_URL, {
        headers: {
          Authorization: `token ${refreshToken}`,
        },
      });
      if (response.data) {
        const days = response.data.current_active_subscription.days;
        const duration = days > 90 ? "1year" : days > 365 ? "3year" : days > 0 ? "3months" : "";
        return { ...response.data.current_active_subscription, duration };
      }
    } catch (e) {
      return null;
    }
  };

  const getUTMParams = () => {
    if (typeof window === "undefined")
      return { utm_campaign: "", utm_content: "", utm_source: "", utm_medium: "", utm_terms: "" };
    const params = new URLSearchParams(window.location.search);
    return {
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_terms: params.get("utm_terms") || "",
    };
  };

  const handlePageLoadEvent = async () => {
    const mp = getMixPanelClient();
    const utmParams = getUTMParams();
    const sourcePage = typeof document !== "undefined" ? document.referrer : "";
    const currentUrl = typeof window !== "undefined" ? window.location.href : pathname || "";

    const user = await fetchUser();
    const activePlan = await fetchActivePlan();

    const baseProps = {
      id: uuidv4(),
      Session_id: "",
      time: new Date().toUTCString(),
      source_page: sourcePage,
      current_url: currentUrl,
      browser_version: "",
      browser_name: "",
      device_type: "",
      device_name: "",
      ...utmParams,
    };

    if (user && activePlan) {
      mp.track("homepage_loaded", {
        ...baseProps,
        account_created_at: user.created,
        customer_id: user?.id,
        Curr_Subscription_Type: activePlan.plan,
        Curr_Plan_Duration: activePlan.duration,
        Curr_Subscription_Start_date: activePlan.start_date,
        Curr_Subscription_End_date: activePlan.end_date,
        usertype: activePlan.plan ? (activePlan.plan.toLowerCase() === "free" ? "Free" : "Paid") : null,
      });
    } else {
      mp.track("homepage_loaded", {
        ...baseProps,
        account_created_at: null,
        customer_id: null,
        Curr_Subscription_Type: null,
        Curr_Plan_Duration: null,
        Curr_Subscription_Start_date: null,
        Curr_Subscription_End_date: null,
        usertype: null,
      });
    }
  };

  useEffect(() => {
    handlePageLoadEvent();
  }, [isLoggedIn]);

  // Create refs for each section
  const sampleReportRef = useRef<HTMLDivElement>(null);
  const trackRecordRef = useRef<HTMLDivElement>(null);
  const trustUsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const howRef = useRef<HTMLDivElement>(null);
  const stockPickRef = useRef<HTMLDivElement>(null);

  // New: Store section heights
  const [sectionHeights, setSectionHeights] = React.useState({
    sample: 1,
    track: 1,
    trust: 1,
    team: 1,
    how: 1,
    stock: 1,
    total: 6,
  });

  React.useEffect(() => {
    function updateHeights() {
      const sample = sampleReportRef.current?.offsetHeight || 1;
      const track = trackRecordRef.current?.offsetHeight || 1;
      const trust = trustUsRef.current?.offsetHeight || 1;
      const team = teamRef.current?.offsetHeight || 1;
      const how = howRef.current?.offsetHeight || 1;
      const stock = stockPickRef.current?.offsetHeight || 1;
      const total = sample + track + trust + team + how + stock;
      setSectionHeights({ sample, track, trust, team, how, stock, total });
    }
    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, []);

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

  // Use a motion value for smooth path fill
  const rawPathLength = useTransform(
    [sampleReportProgress, trackRecordProgress, trustUsProgress, teamProgress, howProgress, stockPickProgress],
    ([sample, track, trust, team, how, stock]) => {
      let progress = 0;
      const wSample = 1 / 5;
      const wTrack = 1 / 5;
      const wTrust = 1 / 5;
      const wTeam = 1 / 5;
      const wHow = 1 / 5;
      const wStock = 1 / 5;
      if (typeof sample === "number" && sample > 0) progress += wSample * Math.min(sample, 1);
      if (typeof track === "number" && track > 0) progress += wTrack * Math.min(track, 1);
      if (typeof trust === "number" && trust > 0) progress += wTrust * Math.min(trust, 1);
      if (typeof team === "number" && team > 0) progress += wTeam * Math.min(team, 1);
      if (typeof how === "number" && how > 0) progress += wHow * Math.min(how, 1);
      if (typeof stock === "number" && stock > 0) progress += wStock * Math.min(stock, 1);
      return Math.min(progress, 1);
    }
  );
  const pathLength = useMotionValue(0);
  useEffect(() => {
    const unsubscribe = rawPathLength.onChange((v) => {
      animate(pathLength, v, { type: "spring", stiffness: 200, damping: 30 });
    });
    // Set initial value
    pathLength.set(rawPathLength.get());
    return () => unsubscribe && unsubscribe();
  }, [rawPathLength]);

  const pathRef = useRef<SVGPathElement>(null);
  const [circlePos, setCirclePos] = useState({ x: 0, y: 0 });
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  // Use useMotionValueEvent to sync circle position to the *actual* animated value of pathLength
  useMotionValueEvent(pathLength, "change", (v) => {
    if (!pathRef.current) return;
    const pathEl = pathRef.current;
    const totalLength = pathEl.getTotalLength();
    const currentLength = v * totalLength;
    const { x, y } = pathEl.getPointAtLength(currentLength);
    setCirclePos({ x, y });
    animate(motionX, x, { type: "spring", stiffness: 200, damping: 30 });
    animate(motionY, y, { type: "spring", stiffness: 200, damping: 30 });
  });

  return (
    <>
      <Head>
        {generateNextSeo({
          title: "Kamayakya - Small Cap Stocks to Buy | Best Stock Recommendations Today",
          description: "Kamayakya offers trusted stock advisory services in Pune with expert guidance on small cap stocks to buy, long-term stock picks, and under-valued stocks in India. Get reliable stock research today.",
          canonical: "https://www.kamayakya.com/",
          openGraph: {
            url: "https://www.kamayakya.com/",
            title: "Kamayakya - Small Cap Stocks to Buy | Best Stock Recommendations Today",
            description: "Kamayakya offers trusted stock advisory services in Pune with expert guidance on small cap stocks to buy, long-term stock picks, and under-valued stocks in India. Get reliable stock research today.",
          },
        })}
      </Head>
      <Floater />
      <Navbar className=" open_sans bg-[#F4FFFF]" />

      <div className=" bg-[#F4FFFF] bg-[url('/landing/hero_grid.png')] bg-cover bg-center">
        <Hero />
      </div>
      {/* <Stat /> */}
      {/* <Service /> */}
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
        height={containerRef.current ? containerRef.current.clientHeight : 3835}
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
        height={containerRef.current ? containerRef.current.clientHeight : 3835}
        viewBox="0 0 1380 3914"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          ref={pathRef}
          d="M661 0V43.0V43.0129C661 49.6403 655.627 55.0048 649 55.0129H13C6.37257 55.0129 1 60.3855 1 67.0048V3842.96C1 3849.59 6.37258 3854.96 13 3854.96H649C655.627 3854.96 661 3860.33 661 3866.96V3914"
          stroke="#12B76A"
          strokeWidth="2"
          strokeDasharray="5300"
          strokeDashoffset="0"
          style={{ pathLength }}
        />
        <motion.circle
          cx={motionX}
          cy={motionY}
          r={8}
          fill="#75CDC5"
          stroke="#12B76A"
        />
      </svg> */}

        {/* Add refs to each section */}
        <div id="sample-report" ref={sampleReportRef}>
          <SampleReport />
        </div>
        {/* <div id="track-record" ref={trackRecordRef}>
          <TrackRecordSection />
        </div> */}
        <div id="trust-us" ref={trustUsRef}>
          <TrustUs />
        </div>
        <div id="team" ref={teamRef}>
          <Team />
        </div>
        <div id="how" ref={howRef}>
          <How />
        </div>
      </div>
      {/* <div id="stock-picks" ref={stockPickRef}>
        <StockPickSection />
      </div> */}
      <div id="testimonials" className="pt-[60px] pb-[52px] md:py-[60px] bg-gray-100 relative ">
        <Testimonials />
      </div>
      <FeaturedNews />
      <BlogsCarousel />
      {/* <FAQS /> */}
      <div id="feeling-lost" className=" bg-gray-100">
        <FeelingLost />
      </div>
      <div className=" md:mt-[-15rem]  lg:mt-[-15rem]">
        <Newsletter />
      </div>
      <Footer />
      <SmallcasePopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </>
  );
};

const Floater = () => {
  const { isLoggedIn, setShowLoginModal } = useContext(AuthContext);
  if (isLoggedIn) {
    return null;
  }
  return (
    <motion.div
      onClick={() => setShowLoginModal(true)}
      className=" fixed right-[20px] bottom-[20px] z-[1000] cursor-pointer"
      animate={{ rotate: 360 }}
      transition={{
        duration: 10,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      <img
        className=" h-full w-full max-h-[56px] max-w-[56px] lg:max-h-[88px] lg:max-w-[88px]"
        height={88}
        width={88}
        src="/landing/float.png"
        alt="float"
      />
    </motion.div>
  );
};

export default Home;
