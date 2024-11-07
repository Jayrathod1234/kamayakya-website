"use client";
import React, { use, useCallback, useEffect, useRef, useState } from "react";
import StockDetailsNews from "../../stock-picks/[slug]/components/StockDetailsNews";
import StockDetailsTimeline from "../../stock-picks/[slug]/components/StockDetailsTimeline";
import InvestModal from "@/components.v3/common/InvestModal";
import InvestmentSection from "../../stock-picks/components/InvestmentSection";
import ElevateSection from "../../stock-picks/components/ElevateSection";
import { useStockDetails } from "@/contexts/StockDetailsContext";
import { useRouter } from "next/router";
// import Image from "next/image";
import { Modal } from "@nextui-org/react";
import { sectorIcons } from "@/utils/constants.js";
import Banner from "../../stock-picks/[slug]/components/Banner";
import { Breadcrumb } from "@/components.v3/common/Breadcrumb";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components.v2/ui/tooltip";
import { Arrow } from "@radix-ui/react-tooltip";
import { useQuery } from "@tanstack/react-query";
import { getTrackDetailApi } from "@/api/track-record";
import StockPerformanceCard from "./components/StockPerformanceCard";
import LegendSection from "../components/LegendSection";
import ProjectedInvestmentGrowth from "./components/ProjectedInvestmentGrowth";
import Layout from "../../../layout/Layout";
import LineChart from "@/components.v3/common/LineChart";
import { TrackRecordProvider } from "@/contexts/TrackRecordContext";
import { TrackRecordCommonProvider } from "@/contexts/TrackRecordCommonContext";
import { Carousel, CarouselItem, CarouselContent } from "@/components.v2/ui/carousel";

function StockDetailsSection() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const { slug } = router.query;
  const [openTooltip, setOpenTooltip] = useState(false);
  const {
    data: items,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trackDetail", slug],
    queryFn: () => getTrackDetailApi({ stockId: slug }),
    enabled: !!slug, // Only run the query if slug is present
  });
  const {
    stock_name,
    stock_exchange,
    stock_symbol,
    stock_scrip_code,
    sector,
    stock_industry,
    market_cap,
    live_price,
    entry_price,
    target_price,
    action_text,
    risk,
    action,
    stock_tags,
    upside_left_time,
    stock_targets,
    gain_loss,
    return_time,
    company_details,
    upside_left,
    market_cap_type,
    timeline,
    cagr_of_stock,
    stock_image,
    created,
    stock_live_prices,
  } = items || {};

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  if (error) {
    router.push("/track-record");
    return;
  }
  const watch_video = timeline?.find((value) => value.type == "youtube");
  const hasVideo = watch_video && watch_video.youtube_link;
  const [modalState, setModalState] = useState({
    isMainModalOpen: false,
    isChildModalOpen: false,
  });
  const handleMainModalOpen = () => setModalState({ isMainModalOpen: true, isChildModalOpen: false });
  const handleMainModalClose = () => setModalState({ isMainModalOpen: false, isChildModalOpen: false });
  const handleChildModalOpen = () => setModalState({ isMainModalOpen: false, isChildModalOpen: true });

  const handleCloseAllModals = useCallback(
    () => setModalState({ isMainModalOpen: false, isChildModalOpen: false }),
    []
  );

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleCloseAllModals(); // Close all modals on Esc key press
      }
    };

    if (modalState.isMainModalOpen || modalState.isChildModalOpen) {
      document.body.style.overflow = "hidden"; // Disable background scroll
      window.addEventListener("keydown", handleEsc); // Add event listener for Esc key
    } else {
      document.body.style.overflow = ""; // Re-enable scroll when modals are closed
    }

    return () => {
      document.body.style.overflow = ""; // Clean up scroll settings
      window.removeEventListener("keydown", handleEsc); // Remove event listener on cleanup
    };
  }, [modalState.isMainModalOpen, modalState.isChildModalOpen, handleCloseAllModals]);

  const text = company_details;
  const [isReadMore, setIsReadMore] = useState(true);
  const [truncatedText, setTruncatedText] = useState(text);
  const textCount = 300;

  useEffect(() => {
    if (isReadMore && text) {
      setTruncatedText(text.slice(0, textCount));
    } else {
      setTruncatedText(text);
    }
  }, [isReadMore, text]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCagr, setIsModalOpenCagr] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const openModalCagr = () => {
    setIsModalOpenCagr(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModalCagr = () => {
    setIsModalOpenCagr(false);
  };

  // Prevent background scrolling when the modal is open
  useEffect(() => {}, [isModalOpen]);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle resizing to check if it's mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle button click to toggle visibility of all tags
  const handleShowAll = () => {
    setShowAll(!showAll);
  };
  const [activeTab, setActiveTab] = useState("Summary");
  const [isManualScroll, setIsManualScroll] = useState(false); // Flag to prevent scroll effect temporarily
  const tabs = ["Summary", "Returns", "Reports", "News"];
  const [api, setApi] = useState();
  const newsRef = useRef(null);
  const summaryRef = useRef(null);
  const returnsRef = useRef(null);
  const ReportsRef = useRef(null);
  const handleTabClick = (tab) => {
    setIsManualScroll(true); // Disable scroll handling
    setActiveTab(tab);
    let element = null;
    switch (tab) {
      case "News":
        element = newsRef.current;
        break;
      case "Summary":
        element = summaryRef.current;
        break;
      case "Returns":
        element = returnsRef.current;
        break;
      case "Reports":
        element = ReportsRef.current;
        break;
      default:
        console.warn("Unknown tab:", tab);
        break;
    }
    const offset = 80; // Change this value as needed
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementTop - offset,
        behavior: "smooth",
      });
    }

    // Re-enable scroll handling after the smooth scroll completes
    setTimeout(() => {
      setIsManualScroll(false);
    }, 500); // Adjust the delay if needed
  };

  // Scroll listener to detect section in view
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScroll) return; // Skip handling scroll if a tab click is in progress
      const scrollPosition = window.pageYOffset + 80; // Add offset for when to consider a section visible
      const summaryTop = summaryRef.current?.offsetTop || 0;
      const UpsideLeftTop = returnsRef.current?.offsetTop || 0;
      const ReportsTop = ReportsRef.current?.offsetTop || 0;
      const newsTop = newsRef.current?.offsetTop || 0;

      // Logic to determine which tab to activate based on scroll position
      if (newsRef.current && scrollPosition >= newsTop) {
        setActiveTab("News");
      } else if (ReportsRef.current && scrollPosition >= ReportsTop) {
        setActiveTab("Reports");
      } else if (returnsRef.current && scrollPosition >= UpsideLeftTop) {
        setActiveTab("Returns");
      } else if (summaryRef.current && scrollPosition >= summaryTop) {
        setActiveTab("Summary");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isManualScroll]);

  useEffect(() => {
    if (!api) return;
    if (activeTab === "Summary") api.scrollTo(0);
    if (activeTab === "Returns") api.scrollTo(1);
    if (activeTab === "Reports") api.scrollTo(2);
    if (activeTab === "News") api.scrollTo(3);
  }, [api, activeTab]);

  if (!items) return;

  return (
    <TrackRecordCommonProvider>
      <TrackRecordProvider>
        <Layout>
          {Object.keys(items).length === 0 || isLoading ? (
            <></>
          ) : (
            <div className="pt-0 sm:pt-4 bg-gray-200 sm:bg-[#F9FAFB] font-open_sans ">
              <div className="relative w-full sm:w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto ">
                <div className="items-center gap-[13px]  py-[7px] sm:w-full w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto hidden sm:flex">
                  <Breadcrumb
                    data={{ previousPath: [{ link: "/track-record", path: "Track Record" }], activePath: stock_name }}
                  />
                </div>

                {/* small screen banner of top navbar-tabs  */}
                <div className="w-full  mx-auto bg-white flex items-center sm:hidden shadow-lg sticky top-0  z-50 ">
                  {/* Back Button */}

                  {/* Tab Items */}
                  {/* Add carousel ele */}
                  <Carousel setApi={setApi} className=" flex py-[18px] items-center w-full">
                    <div className="pl-[16px]" onClick={() => router.push("/track-record")}>
                      <svg
                        className=" pt-1"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="arrow-left">
                          <path
                            id="Icon (Stroke)"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.51724 3.2069C8.81719 3.49256 8.82877 3.96729 8.5431 4.26724L4.75 8.25L15 8.25C15.4142 8.25 15.75 8.58579 15.75 9C15.75 9.41421 15.4142 9.75 15 9.75L4.75 9.75L8.5431 13.7328C8.82877 14.0327 8.81719 14.5074 8.51724 14.7931C8.21729 15.0788 7.74256 15.0672 7.4569 14.7672L2.4569 9.51724C2.18103 9.22759 2.18103 8.77242 2.4569 8.48276L7.4569 3.23276C7.74256 2.93281 8.21729 2.92123 8.51724 3.2069Z"
                            fill="#475467"
                          />
                        </g>
                      </svg>
                    </div>
                    <CarouselContent className="">
                      {tabs.map((tab) => (
                        <CarouselItem className="  basis-auto ">
                          <a
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={`pb-2 ${
                              activeTab === tab
                                ? "text-[#125B54] text-sm px-[10px] py-[16px] font-semibold border-b-2 border-[#125B54]"
                                : "text-gray-500 px-[10px] py-[18px] text-sm"
                            }`}
                          >
                            {tab}
                          </a>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                  {/* <div className="flex  ">
                    {tabs.map((tab) => (
                      <a
                        key={tab}
                        onClick={() => handleTabClick(tab)}
                        className={`pb-2 ${
                          activeTab === tab
                            ? "text-[#125B54] text-sm px-[10px] py-[16px] font-semibold border-b-2 border-[#125B54]"
                            : "text-gray-500 px-[10px] py-[18px] text-sm"
                        }`}
                      >
                        {tab}
                      </a>
                    ))}
                  </div> */}
                </div>
                {/* details  */}
                <div className="pt-[19px] mb-[80px]  ">
                  {/* Main Content  */}
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="   col-span-2">
                      {/* First Content Start */}
                      <div
                        className="sm:w-full w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto bg-white rounded-lg shadow-sm"
                        ref={summaryRef}
                        id="summary-section"
                      >
                        <div className="flex  order-1 sm:order-1 relative ">
                          {/* Buy Images  */}
                          <img
                            src="/assets/BuyBubbleBlue.webp"
                            alt=""
                            className="block sm:hidden absolute -top-5 right-2 w-[58px] h-[60px]"
                          />
                          {/* Sell Images */}
                          {/* <img
                      src="/assets/SellBubbleRed.png"
                      alt=""
                      className="block sm:hidden absolute -top-3 right-6 w-[58px] h-[50px]"
                    /> */}
                          {/* hold Images  */}
                          {/* <img
                      src="/assets/sellbblyellow.png"
                      alt=""
                      className="block sm:hidden absolute -top-3 right-6 w-[58px] h-[50px]"
                    /> */}
                          <div className="sm:px-4 pt-4 sm:pb-3 gap-2 w-full">
                            {!!stock_targets.length && (
                              <div className="flex pb-[13px] sm:pb-3.5 items-center justify-center md:justify-start">
                                <div className="flex py-[2px] px-2.5 items-center gap-1 rounded-full bg-[#FFF6EE]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    aria-label="Target Status"
                                  >
                                    <path
                                      d="M9.49739 4.75172H8.73939C8.61629 2.87982 7.12009 1.38332 5.24799 1.26022V0.502219C5.24668 0.436952 5.21984 0.374799 5.17322 0.329103C5.1266 0.283408 5.06392 0.257813 4.99864 0.257812C4.93336 0.257813 4.87068 0.283408 4.82406 0.329103C4.77744 0.374799 4.7506 0.436952 4.74929 0.502219V1.26022C2.87709 1.38332 1.38099 2.87972 1.25789 4.75172H0.499888C0.433743 4.75172 0.370307 4.778 0.323536 4.82477C0.276764 4.87154 0.250488 4.93497 0.250488 5.00112C0.250488 5.06726 0.276764 5.1307 0.323536 5.17747C0.370307 5.22424 0.433743 5.25052 0.499888 5.25052H1.25779C1.38069 7.12272 2.87689 8.61892 4.74929 8.74192V9.49992C4.7506 9.56519 4.77744 9.62734 4.82406 9.67303C4.87068 9.71873 4.93336 9.74433 4.99864 9.74433C5.06392 9.74433 5.1266 9.71873 5.17322 9.67303C5.21984 9.62734 5.24668 9.56519 5.24799 9.49992V8.74192C7.12029 8.61892 8.61649 7.12262 8.73949 5.25052H9.49739C9.56353 5.25052 9.62697 5.22424 9.67374 5.17747C9.72051 5.1307 9.74679 5.06726 9.74679 5.00112C9.74679 4.93497 9.72051 4.87154 9.67374 4.82477C9.62697 4.778 9.56353 4.75172 9.49739 4.75172ZM4.74919 7.74542C3.42799 7.62632 2.37329 6.57152 2.25429 5.25052H2.75329C2.86849 6.29892 3.70079 7.13122 4.74919 7.24642V7.74542ZM4.74919 2.75582C3.70079 2.87102 2.86849 3.70332 2.75329 4.75172H2.25429C2.37349 3.43092 3.42809 2.37602 4.74909 2.25682L4.74919 2.75582ZM5.24799 2.25692C6.56899 2.37602 7.62359 3.43092 7.74279 4.75172H7.24389C7.12869 3.70322 6.29639 2.87092 5.24799 2.75582V2.25692ZM5.24799 7.74542V7.24652C6.29639 7.13132 7.12869 6.29902 7.24389 5.25062H7.74279C7.62379 6.57152 6.56909 7.62622 5.24799 7.74542Z"
                                      fill="#667085"
                                    />
                                  </svg>

                                  <p className="text-[#667085] text-4xs font-semibold font-open_sans">
                                    Target {stock_targets.length} at ₹{stock_targets[0].target_price} |{" "}
                                    <span className="text-[#F79009] font-bold font-open_sans">Active</span>
                                  </p>
                                </div>
                              </div>
                            )}
                            {/* <!-- Continue your other components similarly --> */}
                            <div className=" flex flex-col md:flex-row gap-4 items-center md:items-center">
                              {/* Image container */}
                              <div className="hidden !w-[100px] !h-[100px] min-w-[100px]  sm:flex  rounded-md  border border-[#F2F4F7] justify-center items-center">
                                <img
                                  src={stock_image ? stock_image : "/assets/image 3.png"}
                                  alt="Company Logo"
                                  width={70} // or use 92px for width
                                  height={66} // or use 92px for height
                                  className="w-[70px]  h-[66px] object-contain"
                                />
                              </div>

                              {/* Text content */}
                              <div className="w-full flex flex-col justify-between min-w-0 max-md:items-center max-md:text-center ">
                                <div className="flex flex-col md:flex-row  items-baseline gap-2 min-w-0 w-full">
                                  <div className="flex gap-1  items-center px-4 sm:px-0 min-w-0 w-full max-md:mx-auto">
                                    <div className=" flex items-center sm:items-baseline max-md:justify-center min-w-0 w-full gap-x-2">
                                      <div className=" sm:hidden">
                                        <div className=" h-7 w-7 rounded-md border border-[#F2F4F7] flex  items-center justify-center">
                                          <img
                                            src={stock_image ? stock_image : "/assets/image 3.png"}
                                            alt="Company Logo"
                                            width={20} // 10 * 4 (assuming 1rem = 4px)
                                            height={20} // 10 * 4
                                            className="object-contain h-[20px] w-[20px]  block sm:hidden"
                                          />
                                        </div>
                                      </div>
                                      <p className="text-center md:text-start  text-[#0C111D] text-xl md:text-xl font-bold font-open_sans whitespace-nowrap truncate leading-[30px] min-w-0 ">
                                        {stock_name}
                                      </p>
                                      <p className="hidden md:inline-block text-2xs md:text-2xs text-[#475467] font-medium font-open_sans whitespace-nowrap leading-[18px]">
                                        {stock_exchange == "BSE" || stock_exchange == "SME-BSE"
                                          ? `BSE: ${stock_scrip_code}`
                                          : `NSE: ${stock_symbol}`}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex  justify-center  gap-[6px] pl-1/2 sm:pl-0 max-md:mx-auto whitespace-nowrap">
                                    {/* <div className="w-1 h-1 sm:block hidden rounded-full bg-[#98A2B3]"></div> */}
                                    <p className="text-2xs md:hidden text-[#475467] font-medium font-open_sans leading-[18px]">
                                      {stock_exchange == "BSE" || stock_exchange == "SME-BSE"
                                        ? `BSE: ${stock_scrip_code}`
                                        : `NSE: ${stock_symbol}`}
                                    </p>
                                  </div>
                                </div>

                                <div className="pt-1.5 flex gap-0 sm:gap-1.5 flex-wrap w-full">
                                  <div className="flex gap-4 w-full justify-center  md:justify-start">
                                    <div className="flex flex-wrap gap-[8px] sm:gap-[8px] items-center max-sm:justify-center ">
                                      {/* Show all chips in tablet size and larger, and only 2 chips in mobile size */}
                                      {stock_tags
                                        .slice(0, showAll || !isMobile ? stock_tags.length : 2)
                                        .map((value, index) => (
                                          <div
                                            key={index}
                                            className="flex rounded-[20px] text-nowrap border border-[#F2F4F7] py-1.5 pr-2 pl-2 gap-[2px] items-center"
                                          >
                                            <img src={value.image} alt={value.name} className="w-3 h-3 md:w-4 md:h-4" />
                                            <p className="text-2xs md:text-2xs font-normal text-[#344054] font-open_sans">
                                              {value.name}
                                            </p>
                                          </div>
                                        ))}

                                      {/* Show "2+" button only on mobile size and if there are more than 2 stock tags */}
                                      {!showAll && stock_tags.length > 2 && isMobile && (
                                        <button
                                          onClick={handleShowAll}
                                          className="rounded-[15px] bg-[#E7F8F8] py-1.5 pr-2 pl-2.5 gap-1 items-center flex sm:hidden"
                                        >
                                          <p className="text-2xs md:text-2xs font-normal text-[#344054] font-open_sans">
                                            +{stock_tags.length - 2}
                                          </p>
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                  {action_text ? (
                                    <div className=" sm:hidden  bg-[#F6FEF9] my-4 w-full px-1 ">
                                      <div className="sm:hidden text-xs !italic items-center  py-1  text-[#039855] line-clamp-2  ">
                                        {/* Conditionally show either text or image */}
                                        {/* <> */}

                                        <span className=" max-w-fit text-center">
                                          <img
                                            src="/assets/Polygon2.svg"
                                            alt=""
                                            className="w-4 h-4 inline-block mt-[-2px] mr-1 !font-open_sans_italic "
                                          />
                                          {action_text}
                                        </span>
                                        {/* </> */}
                                      </div>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="opacity-95" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }} />

                        <div className="rounded-lg bg-white flex flex-col sm:flex-row py-[0.5rem] px-4 sm:px-4 items-start sm:items-center justify-between flex-wrap gap-x-4">
                          <div className="w-full sm:w-auto h-auto sm:h-[52px] py-1 px-0 items-center gap-2 rounded-md flex">
                            <div className="flex h-7 w-7 p-[6px] min-w-7 justify-center items-center rounded-md bg-[#F9FAFB]">
                              <img
                                height={16}
                                width={16}
                                src={`/sector_images_green/${sectorIcons[sector]}`}
                                alt=""
                                className="!w-4 !h-4 !object-cover"
                              />
                            </div>
                            <div className="flex flex-row sm:flex-row items-center sm:items-start justify-between gap-[6.5rem] sm:gap-1 w-full">
                              <div className="w-full flex justify-between items-baseline gap-x-1">
                                <p className="text-[#475467] text-2xs sm:text-sm font-semibold sm:font-medium font-open_sans capitalize">
                                  {sector}
                                </p>
                                <span className="text-[#667085] inline-block text-ellipsis text-2xs font-normal font-open_sans">
                                  {stock_industry}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="w-full sm:w-auto h-auto sm:h-[52px] py-1 px-0 items-center gap-2 rounded-md flex">
                            <div className="flex h-7 w-7 p-[6px] min-w-7 justify-center items-center rounded-md bg-[#F9FAFB]">
                              <img
                                src={`/assets/${
                                  stock_exchange.includes("SME") ? "sme" : market_cap_type || "line"
                                }.svg`}
                                alt=""
                                className=" !h-4 !w-4 !object-cover"
                              />
                            </div>
                            <div className="flex flex-row sm:flex-row items-center sm:items-start gap-[5rem] sm:gap-1 w-full">
                              <div className="flex w-full justify-between items-baseline gap-x-1">
                                <p className="text-[#475467] text-2xs sm:text-sm font-semibold sm:font-medium font-open_sans">
                                  {stock_exchange.includes("SME") ? "SME" : `${market_cap_type || ""} Cap`}
                                </p>
                                <span className="text-[#667085] inline-block text-ellipsis text-2xs font-normal font-open_sans">
                                  ₹{Math.round(market_cap)?.toLocaleString('hi')} Cr. as of{" "}
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
                            <div className="flex p-[6px] h-7 w-7 min-w-7 justify-center items-center rounded-md bg-[#F9FAFB]">
                              <img
                                src="/assets/ant-design_stock-outlined.svg"
                                alt=""
                                className="!w-4 !h-4 !object-cover"
                              />
                            </div>
                            <div className="flex flex-row sm:flex-row items-center sm:items-start justify-between gap-10 sm:gap-1 w-full">
                              <div className="w-full flex justify-between items-center">
                                <p className="text-[#475467] text-2xs sm:text-sm font-semibold sm:font-medium font-open_sans ">
                                  {risk} Risk
                                </p>
                                <span className="text-[#667085] text-ellipsis block sm:hidden text-2xs font-normal font-open_sans">
                                  ~
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* First Content End  */}
                      {/* When Small screen Button is Show  */}
                      <div className="sm:w-full w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto flex sm:hidden gap-3 mt-5 mb-5 ">
                        <div className="flex-1">
                          {hasVideo ? (
                            <div className="flex-1 group">
                              <button
                                className="flex-1 text-nowrap w-full bg-white group-hover:bg-[#CBF3F0] group-hover:scale-[0.95] duration-300 border border-gray-300 rounded-lg py-[10px] px-2 flex items-center justify-center gap-2"
                                onClick={() => window.open(watch_video.youtube_link, "_blank")}
                              >
                                <img
                                  src="/assets/play-btn.svg"
                                  alt="Play icon"
                                  className="w-5 h-5 transition duration-300 "
                                />
                                <span className="text-nowrap text-[16px]">Watch Video</span>
                              </button>
                            </div>
                          ) : (
                            <div className="relative group">
                              <button className="w-full text-nowrap  bg-gray-50 rounded-lg p-2 flex items-center justify-center gap-2 hover:bg-gray-100 cursor-not-allowed py-[10px] px-2">
                                <img src="/assets/circle-play.svg" alt="Play icon" className="w-5 h-5" />
                                <span className="font-medium text-[16px] text-gray-400 text-nowrap">Watch Video</span>
                              </button>

                              {/* Tooltip */}
                              <div className="absolute top-full left-[90%] transform -translate-x-1/2 mt-2 hidden group-hover:block w-max max-w-xs bg-white shadow-3xl rounded-lg border border-gray-200 p-4 text-center z-10">
                                <img
                                  src="/assets/no video.webp" // Change this to the appropriate image source
                                  alt="Video thumbnail"
                                  className="w-[128px] mb-2 mx-auto"
                                />
                                <p className="font-bold text-lg text-[#0C111D]">Video Not Available!</p>
                                <p className="text-sm text-[#475467]">
                                  Well, this video took a permanent vacation! 😅 But don’t worry, fresh content is
                                  always on the horizon. Stay tuned! 🌟
                                </p>
                                {/* Tooltip Arrow */}
                                <div className="absolute  -top-2 left-[10%] transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l border-t border-gray-200"></div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 group ">
                          <button
                            className="w-full border group-hover:bg-[#CBF3F0] text-nowrap group-hover:scale-[0.95] duration-300 bg-white  border-gray-300 rounded-lg py-[10px] px-2 flex items-center justify-center gap-2"
                            onClick={handleMainModalOpen} // Add the onClick event to open the modal
                          >
                            <img
                              src="/assets/share2.svg"
                              alt="Share icon"
                              className="w-5 h-5 transition duration-300 "
                            />
                            <span className="text-nowrap text-[16px]">
                              {action === "BUY" ? "Invest Now" : action === "HOLD" ? "Go to Broker" : "Sell Now"}
                            </span>
                          </button>
                        </div>
                      </div>
                      {/* When Small Screen Button Is Hide  */}
                      {/* Small screen show to company profile  */}
                      <div className="pt-[20px] p-4 block sm:hidden bg-white  mb-5">
                        <div className="pl-1 w-[min(1280px,calc(100%-32px))] min-w-[328px]  ">
                          <h2 className="text-[#0C111D] text-[14px]  font-bold font-open_sans uppercase">
                            Company Profile
                          </h2>

                          <p
                            dangerouslySetInnerHTML={{ __html: truncatedText }}
                            className="text-[#475467] text-justify !text-[14px] font-bold !font-open_sans  sm:line-clamp-none capitalize"
                          ></p>

                          {text?.length > textCount ? (
                            <button onClick={() => setIsReadMore(!isReadMore)}>
                              {isReadMore ? (
                                <button className="flex items-center justify-center w-[14px] h-[2px] rounded-full bg-white group border border-gray-200 shadow-sm py-[9px] px-4">
                                  <span className="text-gray-700 group-hover:text-green-700">•••</span>
                                </button>
                              ) : (
                                <>
                                  <button className="flex items-center justify-center w-[14px] h-[2px] rounded-full bg-white border group border-gray-200 shadow-sm  px-6 py-3">
                                    <div className="">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 transition-colors duration-300 group-hover:stroke-green-700"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      >
                                        <polyline points="6 15 12 9 18 15"></polyline>
                                        <polyline points="6 9 12 3 18 9"></polyline>
                                      </svg>
                                    </div>
                                  </button>
                                </>
                              )}
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      {/* Upside Left Box start */}
                      <div className="hidden sm:block col-span-2 order-3 sm:order-2">
                        <div className="p-4 gap-4 lg:gap-6 rounded-[10px] bg-white shadow-sm mt-7">
                          <div className=" relative gap-4 lg:gap-6 rounded-lg bg-[white] border border-transparent">
                            {/* Gradient Border */}
                            <div className="absolute inset-0 border-2 border-transparent rounded-[5px] z-[-1] bg-gradient-border"></div>

                            <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
                              <div
                                className={`grid ${
                                  cagr_of_stock ? "grid-cols-3 lg:grid-cols-3" : "grid-cols-2 lg:grid-cols-2"
                                } md:grid-cols-2 gap-4 md:gap-4 lg:gap-4 w-full`}
                              >
                                {/* Total Returns Section */}
                                <StockPerformanceCard
                                  className={
                                    gain_loss > 0
                                      ? "bg-custom-gradient"
                                      : "bg-[linear-gradient(108.17deg,#FF9E9E_-3.69%,#E53A3A_92.32%)]"
                                  }
                                  label={
                                    action === "SELL" &&
                                    Array.isArray(stock_targets) &&
                                    stock_targets[0].target_met !== null
                                      ? gain_loss > 0
                                        ? "Profit Booked"
                                        : "Loss Booked"
                                      : "Total Returns"
                                  }
                                  icon={<img src="/assets/Layer_1_white.svg" alt="Returns Icon" className=" h-6 w-6" />}
                                  value={gain_loss}
                                  time={return_time}
                                  valueClassname={" text-white"}
                                  timeClassname={"text-white"}
                                  cagr_of_stock={cagr_of_stock}
                                />
                                {/* Total CAGR Section */}
                                {cagr_of_stock && (
                                  <StockPerformanceCard
                                    className={" border border-[#F2F4F7]"}
                                    iconContainerClassName=" bg-[#F9FAFB] rounded-[6px]"
                                    icon={<img src="/assets/upper.svg" alt="CAGR" height={21} width={21} />}
                                    labelClassname={" text-[#1D2939]"}
                                    tooltip={true}
                                    valueClassname=" sm:text-[20px]"
                                    tooltipTrigger={
                                      <img
                                        height={16}
                                        width={16}
                                        src="/assets/blackinfo.svg"
                                        alt="Info"
                                        className="h-[16px] cursor-pointer"
                                      />
                                    }
                                    tooltipContent={
                                      <div className=" relative">
                                        {/* <img
                                          src="/assets/div.png"
                                          alt=""
                                          className="h-8 w-5 absolute -top-[11px] shadow-3xl left-[60%]"
                                        /> */}
                                        <div className="tooltip-content">
                                          <h3 className="tooltip-title font-bold font-open_sans mb-2 text-[12px] text-gray-800">
                                            Compound Annual Growth Rate
                                          </h3>
                                          <p className="tooltip-subtitle font-bold text-blue-900 font-open_sans text-[12px]">
                                            Purpose:
                                          </p>
                                          <p className="tooltip-text my-1 text-gray-800 text-[12px] font-open_sans">
                                            Shows average yearly growth of an investment.
                                          </p>
                                          <p className="tooltip-quote italic mb-3 text-gray-600 text-[12px] font-open_sans">
                                            Imagine a tree growing a bit more each year.
                                            <br />
                                            CAGR tells how fast it grows annually on average.
                                          </p>
                                          <div className="tooltip-formula flex flex-wrap bg-white p-3 rounded mb-4">
                                            <p className="font-bold m-0 pt-5 me-5 text-[12px] font-open_sans">CAGR =</p>
                                            <div className="formula flex items-center justify-center flex-wrap mt-2">
                                              <span className="text-[30px] font-[50] font-open_sans">[</span>
                                              <div className="flex items-center mx-2">
                                                <div className="flex flex-col items-center">
                                                  <div className="fraction">
                                                    <span className="numerator text-[12px] font-open_sans">
                                                      Ending Value
                                                    </span>
                                                    <span className="denominator text-[12px] font-open_sans">
                                                      Starting Value
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                              <span className="text-[30px] font-[50] font-open_sans">]</span>
                                              <sup className="flex items-center text-[20px] font-[50]">
                                                <span className="text-[20px] font-open_sans">[</span>
                                                <div className="flex flex-col items-center mx-2">
                                                  <div className="fraction">
                                                    <span className="text-[12px] font-open_sans">1</span>
                                                    <hr className="w-full h-[1px] bg-black mt-2" />
                                                    <span className="denominator text-[12px] mt-2 font-open_sans">
                                                      No. of Years
                                                    </span>
                                                  </div>
                                                </div>
                                                <span className="text-[20px] font-open_sans">]</span>
                                              </sup>
                                              <span className="text-[12px] font-bold ml-2 font-open_sans">-1</span>
                                            </div>
                                          </div>

                                          <div className="tooltip-example bg-gray-50 p-3 rounded mb-4">
                                            <p className="example-title font-bold text-[#108973] mb-2 text-[12px] font-open_sans">
                                              Example :
                                            </p>
                                            <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                              <strong>Start Value</strong> ₹100
                                            </div>
                                            <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                              <strong>End Value after 3 years</strong> ₹150
                                            </div>
                                            <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                              <strong>Total Returns over 3 years</strong> 50%
                                            </div>
                                            <div className="example-item flex justify-between py-1 text-[12px] font-open_sans">
                                              <strong>CAGR</strong> 14.47%
                                            </div>
                                          </div>
                                          <p className="tooltip-footer mt-4 text-[12px] text-gray-500 font-open_sans">
                                            This means, on average, the investment grew about 14.47% each year
                                          </p>
                                        </div>
                                      </div>
                                    }
                                    label={"Total CAGR"}
                                    value={cagr_of_stock.cagr_value}
                                    time={cagr_of_stock.cagr_time}
                                  />
                                )}
                                {/* Upside Left Section */}
                                {/* &&
                                Array.isArray(stock_targets) &&
                                stock_targets[0].target_met !== null */}
                                {action === "SELL" ? null : (
                                  <StockPerformanceCard
                                    className={" border border-[#F2F4F7]"}
                                    iconContainerClassName=" bg-[#F9FAFB] rounded-[6px]"
                                    labelClassname={" text-[#1D2939]"}
                                    label={"Upside Left"}
                                    icon={
                                      <img
                                        src="/assets/streamline_target-solid-green.svg"
                                        alt="Target"
                                        height={21}
                                        width={21}
                                      />
                                    }
                                    tooltipTrigger={
                                      <img
                                        src="/assets/ph_info-duotone.svg"
                                        alt="Info"
                                        className="h-[17px] md:h-[20px] lg:h-[24px] cursor-pointer"
                                      />
                                    }
                                    tooltipContent={
                                      <div className="w-full grid gap-1 relative">
                                        <img
                                          src="/assets/div.png"
                                          alt=""
                                          className="h-8 w-5 absolute -top-4 left-[32%]"
                                        />
                                        <p className="text-[12px]">
                                          Upside Left means how much the stock price could rise from its current level.
                                        </p>
                                        <div className="p-2 bg-[#F9FAFB] rounded-md">
                                          <h4 className="text-[#108973] text-[12px] font-extrabold">Example :</h4>
                                          <p className="text-[12px]">
                                            {" "}
                                            If a stock's price is ₹100 and the Upside Left is 20%, it might go up to
                                            ₹120.
                                          </p>
                                        </div>
                                      </div>
                                    }
                                    tooltip={false}
                                    value={upside_left}
                                    time={upside_left_time}
                                  />
                                )}
                              </div>
                            </div>
                            <div className=" mt-6">
                              <ProjectedInvestmentGrowth
                                action={action}
                                upside_left={upside_left}
                                upside_left_time={upside_left_time}
                              />
                            </div>
                            <LegendSection
                              iconSize={14}
                              className=" sm:justify-center sm:gap-x-0 lg:gap-x-8 pt-6 pb-0"
                            />
                          </div>

                          <div className="pt-[13px] bg-white">
                            {/* CHART SECTION */}
                            <div className=" relative">
                              <LineChart
                                annotationSize={14}
                                stock_action={action}
                                stock_exchange={stock_exchange}
                                stock_targets={stock_targets}
                                stock_live_prices={stock_live_prices}
                                entry_price={entry_price}
                                created={created}
                                stock_id={slug}
                                containerClassName={" h-[383px]"}
                              />
                            </div>
                            {/* CHART SECTION END */}
                          </div>
                        </div>
                      </div>

                      {/* Small Responsive size View Open the box  */}
                      <div
                        className="block rounded-lg sm:hidden bg-white p-4  shadow-md max-w-full mx-auto mt-5"
                        ref={returnsRef}
                        id="upside-left-section"
                      >
                        <div className="  rounded-2xl border border-[#F2F4F7] bg-[#F9FAFB]">
                          <div className="bg-[F9FAFB] rounded-t-2xl p-2">
                            <StockPerformanceCard
                              className={`${
                                gain_loss > 0
                                  ? "bg-custom-gradient rounded-[10px]"
                                  : "bg-[linear-gradient(108.17deg,#FF9E9E_-3.69%,#E53A3A_92.32%)] rounded-[10px]"
                              } `}
                              label={
                                action === "SELL" &&
                                Array.isArray(stock_targets) &&
                                stock_targets[0].target_met !== null
                                  ? gain_loss > 0
                                    ? "Profit Booked"
                                    : "Loss Booked"
                                  : "Total Returns"
                              }
                              icon={<img src="/assets/Layer_1_white.svg" alt="Returns Icon" className=" h-6 w-6" />}
                              value={gain_loss}
                              time={return_time}
                              valueClassname={" text-white"}
                              timeClassname={"text-white"}
                            />
                          </div>
                          {/* Array.isArray(stock_targets) &&
                                stock_targets[0].target_met !== null */}
                                 <div className="bg-[F9FAFB] px-4 pb-2 rounded-b-2xl">
                                 {cagr_of_stock && (
                                <div className="flex justify-between items-center mt-2">
                                  <div className="flex items-center">
                                    <img src="/assets/hj2.svg" alt="" />
                                    <p className="ml-2 text-3xs text-gray-800 font-open_sans">Total CAGR</p>
                                    <div className="relative group hidden sm:block">
                                      {/* Tooltip (Visible on large screens) */}
                                      <img
                                        src="/assets/blackinfo.svg"
                                        alt="Info"
                                        className="h-[17px] md:h-[20px] lg:h-[24px] cursor-pointer"
                                      />
                                      <div className="absolute left-1/2 transform -translate-x-1/3 mt-2 z-10 shadow-3xl hidden group-hover:block bg-white text-black text-sm rounded-lg py-2 px-4 w-[300px]">
                                        <div className="tooltip-content">
                                          <h3 className="tooltip-title font-bold font-open_sans mb-2 text-[12px] text-gray-800">
                                            Compound Annual Growth Rate
                                          </h3>
                                          <p className="tooltip-subtitle font-bold text-blue-900 font-open_sans text-[12px]">
                                            Purpose:
                                          </p>
                                          <p className="tooltip-text my-1 text-gray-800 text-[12px] font-open_sans">
                                            Shows average yearly growth of an investment.
                                          </p>
                                          <p className="tooltip-quote italic mb-3 text-gray-600 text-[12px] font-open_sans">
                                            Imagine a tree growing a bit more each year.
                                            <br />
                                            CAGR tells how fast it grows annually on average.
                                          </p>
                                          <div className="tooltip-formula flex flex-wrap bg-white p-3 rounded mb-4">
                                            <p className="font-bold m-0 pt-5 me-5 text-[12px] font-open_sans">CAGR =</p>
                                            <div className="formula flex items-center justify-center flex-wrap mt-2">
                                              <span className="text-[30px] font-[50] font-open_sans">[</span>
                                              <div className="flex items-center mx-2">
                                                <div className="flex flex-col items-center">
                                                  <div className="fraction">
                                                    <span className="numerator text-[12px] font-open_sans">
                                                      Ending Value
                                                    </span>
                                                    <span className="denominator text-[12px] font-open_sans">
                                                      Starting Value
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                              <span className="text-[30px] font-[50] font-open_sans">]</span>
                                              <sup className="flex items-center text-[20px] font-[50]">
                                                <span className="text-[20px] font-open_sans">[</span>
                                                <div className="flex flex-col items-center mx-2">
                                                  <div className="fraction">
                                                    <span className="text-[12px] font-open_sans">1</span>
                                                    <hr className="w-full h-[1px] bg-black mt-2" />
                                                    <span className="denominator text-[12px] mt-2 font-open_sans">
                                                      No. of Years
                                                    </span>
                                                  </div>
                                                </div>
                                                <span className="text-[20px] font-open_sans">]</span>
                                              </sup>
                                              <span className="text-[12px] font-bold ml-2 font-open_sans">-1</span>
                                            </div>
                                          </div>

                                          <div className="tooltip-example bg-gray-50 p-3 rounded mb-4">
                                            <p className="example-title font-bold text-[#108973] mb-2 text-[12px] font-open_sans">
                                              Example :
                                            </p>
                                            <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                              <strong>Start Value</strong> ₹100
                                            </div>
                                            <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                              <strong>End Value after 3 years</strong> ₹150
                                            </div>
                                            <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                              <strong>Total Returns over 3 years</strong> 50%
                                            </div>
                                            <div className="example-item flex justify-between py-1 text-[12px] font-open_sans">
                                              <strong>CAGR</strong> 14.47%
                                            </div>
                                          </div>
                                          <p className="tooltip-footer mt-4 text-[12px] text-gray-500 font-open_sans">
                                            This means, on average, the investment grew about 14.47% each year
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="sm:hidden">
                                      <img
                                        src="/assets/blackinfo.svg"
                                        alt="Info"
                                        className="h-[17px] md:h-[20px] lg:h-[24px] cursor-pointer"
                                        onClick={openModalCagr}
                                      />
                                    </div>

                                    <Modal
                                      blur
                                      width="450px"
                                      open={isModalOpenCagr}
                                      onClose={() => setIsModalOpenCagr(false)}
                                      className="relative flex justify-center p-6 bg-white rounded-[12px] shadow-[0_20px_24px_-4px_rgba(16,24,40,0.08),0_8px_8px_-4px_rgba(16,24,40,0.03)] w-[350px] max-w-full mx-auto"
                                    >
                                      {/* Close Icon Button */}
                                      <button
                                        onClick={() => setIsModalOpenCagr(false)}
                                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                                        aria-label="Close modal"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-6 w-6"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                          />
                                        </svg>
                                      </button>

                                      {/* Modal Content */}
                                      {/* Modal Header */}
                                      <h3 className="modal-title font-bold font-open_sans mb-2 text-[12px] text-gray-800">
                                        Compound Annual Growth Rate
                                      </h3>
                                      <p className="modal-subtitle text-left font-bold text-blue-900 font-open_sans text-[12px]">
                                        Purpose:
                                      </p>
                                      <p className="modal-text my-1 text-left text-gray-800 text-[12px] font-open_sans">
                                        Shows average yearly growth of an investment.
                                      </p>
                                      <p className="modal-quote italic text-left mb-3 text-gray-600 text-[12px] font-open_sans">
                                        Imagine a tree growing a bit more each year.
                                        <br />
                                        CAGR tells how fast it grows annually on average.
                                      </p>
                                      <div className="modal-formula flex flex-wrap bg-white p-3 rounded mb-4">
                                        <p className="font-bold m-0 pt-5 me-5 text-[12px] font-open_sans">CAGR =</p>
                                        <div className="formula flex items-center justify-center flex-wrap mt-2">
                                          <span className="text-[30px] font-[50] font-open_sans">[</span>
                                          <div className="flex items-center mx-2">
                                            <div className="flex flex-col items-center">
                                              <div className="fraction">
                                                <span className="numerator text-[12px] font-open_sans">
                                                  Ending Value
                                                </span>
                                                <span className="denominator text-[12px] font-open_sans">
                                                  Starting Value
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <span className="text-[30px] font-[50] font-open_sans">]</span>
                                          <sup className="flex items-center text-[20px] font-[50]">
                                            <span className="text-[20px] font-open_sans">[</span>
                                            <div className="flex flex-col items-center mx-2">
                                              <div className="fraction">
                                                <span className="text-[12px] font-open_sans">1</span>
                                                <hr className="w-full h-[1px] bg-black mt-2" />
                                                <span className="denominator text-[12px] mt-2 font-open_sans">
                                                  No. of Years
                                                </span>
                                              </div>
                                            </div>
                                            <span className="text-[20px] font-open_sans">]</span>
                                          </sup>
                                          <span className="text-[12px] font-bold ml-2 font-open_sans">-1</span>
                                        </div>
                                      </div>

                                      <div className="modal-example bg-gray-50 p-3 text-left rounded mb-4">
                                        <p className="example-title font-bold text-[#108973] mb-2 text-[12px] font-open_sans">
                                          Example:
                                        </p>
                                        <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                          <strong>Start Value</strong> ₹100
                                        </div>
                                        <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                          <strong>End Value after 3 years</strong> ₹150
                                        </div>
                                        <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                          <strong>Total Returns over 3 years</strong> 50%
                                        </div>
                                        <div className="example-item flex justify-between py-1 text-[12px] font-open_sans">
                                          <strong>CAGR</strong> 14.47%
                                        </div>
                                      </div>
                                      <p className="modal-footer mt-4 text-[12px] text-gray-500 font-open_sans">
                                        This means, on average, the investment grew about 14.47% each year
                                      </p>
                                    </Modal>
                                  </div>
                                  <div className="flex items-center">
                                    {cagr_of_stock.cagr_value >= 0 ? (
                                      // green up arrow
                                      <img src="/assets/Polygon2.svg" alt="Up Arrow" className="w-2" />
                                    ) : (
                                      // red down arrow
                                      <img src="/assets/Polygon 3.svg" alt="Down Arrow" className="w-2" />
                                    )}
                                    <p className="text-black ml-1 text-2xs font-open_sans font-[700] ">
                                      {cagr_of_stock.cagr_value}%{" "}
                                      <span className="text-gray-500 text-4xs font-open_sans font-semibold">
                                        in {cagr_of_stock.cagr_time}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              )}
                          {action === "SELL" ? null : (
                           
                              <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center">
                                  <img
                                    height={14}
                                    width={14}
                                    className=" object-contain"
                                    src="/assets/streamline_target-solid-green.svg"
                                    alt=""
                                  />
                                  <p className="ml-[10px] text-3xs text-gray-800 font-open_sans">Upside Left</p>
                                </div>
                                <div className="flex items-center">
                                  {upside_left >= 0 ? (
                                    // green up arrow
                                    <img src="/assets/Polygon2.svg" alt="Up Arrow" className="w-2 h-[6px]" />
                                  ) : (
                                    // red down arrow
                                    <img src="/assets/Polygon 3.svg" alt="Down Arrow" className="w-2 h-[6px]" />
                                  )}
                                  <p className="text-[#1D2939] ml-1 text-2xs font-open_sans font-[700]">
                                    {Math.abs(upside_left)}% {""}
                                    <span className="text-gray-500 text-4xs font-open_sans font-semibold">
                                      in {upside_left_time}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            
                            
                          )}
                          </div>
                        </div>

                        <div className="pt-6">
                          <ProjectedInvestmentGrowth
                            upside_left={upside_left}
                            upside_left_time={upside_left_time}
                            action={action}
                          />
                        </div>
                        <div className="pt-6 block sm:hidden bg-white">
                          <LegendSection className=" py-0" />
                          <div className="">
                            <div className="pt-6">
                              <LineChart
                                stock_action={action}
                                stock_exchange={stock_exchange}
                                stock_targets={stock_targets}
                                stock_live_prices={stock_live_prices}
                                created={created}
                                entry_price={entry_price}
                                stock_id={slug}
                                containerClassName={"h-[250px]"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=" block sm:hidden"></div>
                      {/* Upside Left Box End  */}

                      {/* Company Profile Section start */}
                      <div className="pt-[70px] hidden sm:block">
                        <h2 className="text-[#0C111D] text-[20px] font-semibold font-open_sans ">Company Profile</h2>
                        <p
                          dangerouslySetInnerHTML={{ __html: truncatedText }}
                          className="text-[#475467] text-justify text-[14px] font-normal font-open_sans line-clamp-3 sm:line-clamp-none"
                        ></p>

                        {text?.length > textCount ? (
                          <button onClick={() => setIsReadMore(!isReadMore)}>
                            {isReadMore ? (
                              <button className="flex items-center justify-center w-[14px] h-[2px] rounded-full bg-white group border border-gray-200 shadow-sm py-[9px] px-4">
                                <span className="text-gray-700 group-hover:text-green-700">•••</span>
                              </button>
                            ) : (
                              <>
                                <button className="flex items-center justify-center w-[14px] h-[2px] rounded-full bg-white border group border-gray-200 shadow-sm  px-6 py-3">
                                  <div className="">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-4 h-4 transition-colors duration-300 group-hover:stroke-green-700"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    >
                                      <polyline points="6 15 12 9 18 15"></polyline>
                                      <polyline points="6 9 12 3 18 9"></polyline>
                                    </svg>
                                  </div>
                                </button>
                              </>
                            )}
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                      {/* Company Profile Section End  */}

                      <div className="sm:hidden block">
                        <Banner />
                      </div>

                      {/* When small Screen Time-line & Report Section show  */}
                      <div
                        className="mt-5 block  rounded-lg py-[24px] px-[16px] sm:hidden md:hidden mb-5 bg-white"
                        ref={ReportsRef}
                        id="reports-section"
                      >
                        <button
                          className="w-full    p-0 rounded-lg flex justify-between items-center"
                          onClick={toggleDropdown}
                        >
                          <span className="font-open_sans text-sm font-bold">
                            TIMELINE & REPORTS ({timeline.length || 0})
                          </span>
                          <svg
                            className={`transform w-5 h-5 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="mt-2">
                            {/* Timeline Content Goes Here */}
                            <div className="">
                              <StockDetailsTimeline timeline={timeline} />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* News Section Start */}
                      <div className=" sm:pt-[72px] pt-0  sm:w-full  mx-auto sm:mx-0 " ref={newsRef} id="news-section">
                        <h2 className="text-[#0C111D] sm:text-xl text-[14px] font-bold max-sm:uppercase sm:font-semibold font-open_sans mb-0 px-4 sm:px-0">
                          News
                        </h2>
                        <StockDetailsNews stock_name={stock_name} />
                      </div>
                      {/* News Section End  */}
                    </div>
                    {/* <!-- Continue with the rest of your content --> */}

                    {/* Second Container Start */}
                    <div className="relative hidden   sm:block ">
                      <div className="bg-[#EDF0F5] sticky top-16 p-2 rounded-lg">
                        <div className="p-5 border rounded-lg  bg-white">
                          <h2 className="font-bold font-open_sans text-sm mb-[22px]  hidden sm:flex">
                            INVESTMENT GUIDANCE
                          </h2>
                          <div className="gap-2 mb-4 hidden sm:flex flex-wrap">
                            {/* Video Button logic  */}
                            <div className="flex-1 min-w-fit">
                              {hasVideo ? (
                                <div className="flex-1 group">
                                  <button
                                    className="flex-1 text-nowrap w-full group-hover:bg-[#CBF3F0] group-hover:scale-[0.95] duration-300 border border-gray-300 rounded-lg p-2 flex items-center justify-center gap-2"
                                    onClick={() => window.open(watch_video.youtube_link, "_blank")}
                                  >
                                    <img
                                      src="/assets/play-btn.svg"
                                      alt="Play icon"
                                      className="w-5 h-5 transition duration-300 "
                                    />
                                    <span className="text-nowrap text-[16px]">Watch Video</span>
                                  </button>
                                </div>
                              ) : (
                                <div className="relative group w-full">
                                  <TooltipProvider delayDuration={0}>
                                    <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
                                      <TooltipTrigger
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setOpenTooltip(true);
                                        }}
                                        className=" w-full"
                                      >
                                        <button className="w-full bg-gray-50 rounded-lg p-[9px] flex items-center justify-center gap-2 hover:bg-gray-100 cursor-not-allowed">
                                          <img src="/assets/circle-play.svg" alt="Play icon" className="w-5 h-5" />
                                          <span className="text-nowrap text-[16px] font-medium text-gray-400">
                                            Watch Video
                                          </span>
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-white shadow-3xl rounded-lg border border-gray-200 p-4 text-center">
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

                                        {/* Tooltip */}
                                        <div className=" w-max max-w-xs">
                                          <img
                                            src="/assets/no video.webp" // Change this to the appropriate image source
                                            alt="Video thumbnail"
                                            className="w-[128px] mb-2 mx-auto"
                                          />
                                          <p className="font-bold text-lg text-[#0C111D]">Video Not Available!</p>
                                          <p className="text-sm text-[#475467]">
                                            Well, this video took a permanent vacation! 😅 But don’t worry, fresh
                                            content is always on the horizon. Stay tuned! 🌟
                                          </p>
                                          {/* Tooltip Arrow */}
                                          {/* <div className="absolute  -top-2 left-[10%] transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l border-t border-gray-200"></div> */}
                                        </div>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              )}
                            </div>

                            {/* Share Button */}
                            <div className="flex-1 group min-w-fit">
                              <button
                                className="w-full border group-hover:bg-[#CBF3F0] group-hover:scale-[0.95] duration-300 border-gray-300 rounded-lg p-2 flex items-center justify-center gap-2"
                                onClick={handleMainModalOpen}
                              >
                                <img
                                  src="/assets/share2.svg"
                                  alt="Share icon"
                                  className="w-5 h-5 transition duration-300"
                                />
                                <span className="text-nowrap text-[16px]">
                                  {action === "BUY" ? "Invest Now" : action === "HOLD" ? "Go to Broker" : "Sell Now"}
                                </span>
                              </button>

                              <InvestModal
                                action={action}
                                handleMainModalOpen={handleMainModalOpen}
                                handleMainModalClose={handleMainModalClose}
                                handleChildModalOpen={handleChildModalOpen}
                                handleCloseAllModals={handleCloseAllModals}
                                modalState={modalState}
                              />
                            </div>
                          </div>

                          <div className=" justify-between items-center gap-x-5 relative pt-2 hidden sm:flex flex-wrap  w-full">
                            <p className=" font-open_sans whitespace-normal text-sm flex-1">{action_text} </p>
                            <img
                              src={
                                action === "BUY"
                                  ? "/assets/Action=Buy, Mascot=Yes, Full body=Yes.webp"
                                  : action === "HOLD"
                                  ? "/assets/Action=Hold, Mascot=Yes, Full body=Yes.webp"
                                  : "/assets/Action=Sell, Mascot=Yes, Full body=Yes.webp"
                              }
                              alt=""
                              className=" object-contain right-6 w-[81px] h-[120px] flex-[0.5] "
                            />
                          </div>
                          <hr className="my-3 hidden  sm:block" />
                          <div>
                            <Banner />
                          </div>
                          <div className="mt-5 hidden sm:block">
                            <button
                              className="w-full   p-0 rounded-lg flex justify-between items-center"
                              onClick={toggleDropdown}
                            >
                              <span className="font-open_sans text-sm font-bold">
                                TIMELINE & REPORTS ({timeline.length || 0})
                              </span>
                              <svg
                                className={`transform w-5 h-5 transition-transform duration-200 ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {isOpen && (
                              <div className="">
                                {/* Timeline Content Goes Here */}
                                <div className="  rounded-lg">
                                  <StockDetailsTimeline timeline={timeline} />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Second Container End */}
                  </div>
                </div>
                {/* <div className="mt-11"> */}
                <div className="mb-10">
                  <InvestmentSection />
                </div>
                {/* </div> */}
                <ElevateSection />
              </div>
              <InvestModal
                action={action}
                handleMainModalOpen={handleMainModalOpen}
                handleMainModalClose={handleMainModalClose}
                handleChildModalOpen={handleChildModalOpen}
                handleCloseAllModals={handleCloseAllModals}
                modalState={modalState}
              />
            </div>
          )}
        </Layout>
      </TrackRecordProvider>
    </TrackRecordCommonProvider>
  );
}

export default StockDetailsSection;
