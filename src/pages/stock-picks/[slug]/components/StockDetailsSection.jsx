import React, { use, useCallback, useEffect, useRef, useState } from "react";
import StockDetailsNews from "./StockDetailsNews";
import StockDetailsTimeline from "./StockDetailsTimeline";
import StockDetailsProgressBar from "./StockDetailsProgressBar";
import InvestModal from "@/components.v3/common/InvestModal";
import InvestmentSection from "../../components/InvestmentSection";
import ElevateSection from "../../components/ElevateSection";
import { useStockDetails } from "@/contexts/StockDetailsContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { ButtonBase, Tooltip } from "@mui/material";
import { Modal } from "@nextui-org/react";
import StockDetailProgressBar from "./StockDetailProgressBar";

function StockDetailsSection() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const { items, isLoading, error } = useStockDetails();
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
    upside_left,
    action_text,
    risk,
    action,
    stock_tags,
    upside_left_time,
    stock_targets,
    gain_loss,
    return_time,
    company_details,
    market_cap_type,
    timeline,
    cagr_of_stock,
    stock_image,
    created,
  } = items || {};

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  if (error) {
    router.push("/stock-picks");
    return;
  }
  const watch_video = timeline?.find((value) => value.type == "youtube");
  const hasVideo = watch_video && watch_video.youtube_link;
  const [modalState, setModalState] = useState({
    isMainModalOpen: false,
    isChildModalOpen: false,
  });

  const handleMainModalOpen = () =>
    setModalState({ isMainModalOpen: true, isChildModalOpen: false });
  const handleMainModalClose = () =>
    setModalState({ isMainModalOpen: false, isChildModalOpen: false });
  const handleChildModalOpen = () =>
    setModalState({ isMainModalOpen: false, isChildModalOpen: true });
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
  }, [
    modalState.isMainModalOpen,
    modalState.isChildModalOpen,
    handleCloseAllModals,
  ]);

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
  useEffect(() => { }, [isModalOpen]);
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
  const tabs = ["Summary", "Upside Left", "Reports", "News"];
  const newsRef = useRef(null);
  const summaryRef = useRef(null);
  const UpsideLeftRef = useRef(null);
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
      case "Upside Left":
        element = UpsideLeftRef.current;
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
      const elementTop =
        element.getBoundingClientRect().top + window.pageYOffset;
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
      const UpsideLeftTop = UpsideLeftRef.current?.offsetTop || 0;
      const ReportsTop = ReportsRef.current?.offsetTop || 0;
      const newsTop = newsRef.current?.offsetTop || 0;

      // Logic to determine which tab to activate based on scroll position
      if (newsRef.current && scrollPosition >= newsTop) {
        setActiveTab("News");
      } else if (ReportsRef.current && scrollPosition >= ReportsTop) {
        setActiveTab("Reports");
      } else if (UpsideLeftRef.current && scrollPosition >= UpsideLeftTop) {
        setActiveTab("Upside Left");
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

  return (
    <>
      {Object.keys(items).length === 0 || isLoading ? (
        <></>
      ) : (
        <div className="pt-0 sm:pt-4 bg-gray-200 sm:bg-[#F9FAFB] font-open_sans ">
          <div className="relative w-full sm:w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto ">
            <div className="items-center gap-[13px]  p-[7px] sm:w-full w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto hidden sm:flex">
              <div
                className="flex items-center cursor-pointer group"
                onClick={() => {
                  router.push("/stock-picks");
                }}
              >
                <img
                  src="/assets/stock-details/arrow-left.svg"
                  alt="Go Back"
                  className="mr-2"
                />
                <div className="text-[13px] text-[#475467] font-normal font-open_sans relative text-nowrap me-1 max-w-[83px]">
                  Stocks To Buy
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#475467] transition-all duration-300 group-hover:w-full"></div>
                </div>
              </div>
              <img src="/assets/stock-details/chevron-right.svg" alt="" />
              <div className="text-[13px] text-[#475467] font-semibold max-[138px] truncate">
                {stock_name}
              </div>
            </div>

            {/* small screen banner of top navbar-tabs  */}
            <div className="w-full  mx-auto bg-white flex items-center  p-2 sm:hidden shadow-lg sticky top-0  z-50 ">
              {/* Back Button */}
              <div className="" onClick={() => router.push("/stock-picks")}>
                <img
                  src="/assets/stock-details/arrow-left.svg"
                  alt="Go Back"
                  className="pl-[16px] pt-2 pr-3"
                />
              </div>
              {/* Tab Items */}
              <div className="flex  ">
                {tabs.map((tab) => (
                  <a
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`pb-2 ${activeTab === tab
                      ? "text-[#125B54] text-sm px-[10px] py-[16px] font-semibold border-b-2 border-[#125B54]"
                      : "text-gray-500 px-[10px] py-[18px] text-sm"
                      }`}
                  >
                    {tab}
                  </a>
                ))}
              </div>
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
                      <div className="px-4 pt-4 pb-3 gap-2 w-full">
                        {!!stock_targets.length && (
                          <div className="flex pb-3.5 items-center justify-center sm:justify-start md:justify-start h-[1.5rem]">
                            <div className="flex h-[1.5rem] py-1 px-2.5 items-center gap-1 rounded-full bg-[#FFF6EE]">
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

                              <p className="text-[#667085] text-xs font-semibold font-open_sans">
                                Target {stock_targets.length} at ₹
                                {stock_targets[0].target_price} |{" "}
                                <span className="text-[#F79009] font-bold font-open_sans">
                                  Active
                                </span>
                              </p>
                            </div>
                          </div>
                        )}
                        {/* <!-- Continue your other components similarly --> */}
                        <div className=" flex flex-col md:flex-row gap-4 items-center md:items-center">
                          {/* Image container */}
                          <div className="flex-shrink-0 w-[120px] h-[120px] hidden  sm:block px-[12px] py-3 rounded-md  border-2 border-[#F2F4F7] justify-center items-center">
                            <Image
                              src={
                                stock_image
                                  ? stock_image
                                  : "/assets/image 3.png"
                              }
                              alt="Company Logo"
                              width={92} // or use 92px for width
                              height={92} // or use 92px for height
                              className="object-cover w-[90px]  h-[88px]"
                            />
                          </div>

                          {/* Text content */}
                          <div className="w-full">
                            <div className="flex flex-col md:flex-row  items-center md:items-center gap-2">
                              <div className="flex gap-1 items-center max-w-[480px] ">
                                <Image
                                  src={
                                    stock_image
                                      ? stock_image
                                      : "/assets/image 3.png"
                                  }
                                  alt="Company Logo"
                                  width={40} // 10 * 4 (assuming 1rem = 4px)
                                  height={40} // 10 * 4
                                  className="object-cover  block sm:hidden"
                                />
                                <p className="text-[#0C111D] text-xl md:text-xl font-bold font-open_sans truncate leading-[30px] sm:max-w-[420px]  max-w-[311px]">
                                  {stock_name}
                                </p>
                              </div>
                              <div className="flex justify-center items-center gap-[6px] pl-1/2 sm:pl-0 mx-auto sm:mx-0 whitespace-nowrap">
                                {/* <div className="w-1 h-1 sm:block hidden rounded-full bg-[#98A2B3]"></div> */}
                                <p className="text-2xs md:text-2xs text-[#475467] font-medium font-open_sans leading-[18px]">
                                {stock_exchange == "BSE" ||
                                  stock_exchange == "SME-BSE"
                                    ? `BSE: ${stock_scrip_code}`
                                    : `NSE: ${stock_symbol}`}
                                </p>
                              </div>
                            </div>

                            <div className="pt-1.5 flex gap-0 sm:gap-1.5 flex-wrap">
                              <div className="flex gap-4 w-full justify-center sm:justify-start md:justify-start">
                                <div className="flex flex-wrap gap-[8px] sm:gap-[8px] items-center justify-center ">
                                  {/* Show all chips in tablet size and larger, and only 2 chips in mobile size */}
                                  {stock_tags
                                    .slice(
                                      0,
                                      showAll || !isMobile
                                        ? stock_tags.length
                                        : 2
                                    )
                                    .map((value, index) => (
                                      <div
                                        key={index}
                                        className="flex rounded-[20px] text-nowrap border border-[#F2F4F7] py-1.5 pr-2 pl-2 gap-[2px] items-center"
                                      >
                                        <img
                                          src={value.image}
                                          alt={value.name}
                                          className="w-3 h-3 md:w-4 md:h-4"
                                        />
                                        <p className="text-2xs md:text-2xs font-normal text-[#344054] font-open_sans">
                                          {value.name}
                                        </p>
                                      </div>
                                    ))}

                                  {/* Show "2+" button only on mobile size and if there are more than 2 stock tags */}
                                  {!showAll &&
                                    stock_tags.length > 2 &&
                                    isMobile && (
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
                              <div className="w-full  flex justify-center bg-[#F6FEF9] my-4 !line-clamp-1 truncate">
                                <p className="sm:hidden text-sm items-center font-open_sans py-1 flex  gap-1 text-[#039855]  ">
                                  {/* Conditionally show either text or image */}
                                  {action_text ? (
                                    <>
                                      <img
                                        src="/assets/Polygon2.svg"
                                        alt=""
                                        className="w-4 h-4 items-center"
                                      />
                                      {action_text}
                                    </>
                                  ) : null}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr
                      className="opacity-95"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                    />

                    <div className="rounded-lg bg-white flex flex-col sm:flex-row px-4 sm:px-4 items-start sm:items-center justify-between">
                      <div className="w-full sm:w-auto h-auto sm:h-[52px] py-1 px-0 items-center gap-2 rounded-md flex">
                        <div className="flex p-1 justify-center items-center rounded-md bg-[#F9FAFB]">
                          <img
                            src="/assets/stock-details/Sector icon.svg"
                            alt=""
                            className="w-6 h-6 sm:w-auto sm:h-auto"
                          />
                        </div>
                        <div className="flex flex-row sm:flex-row items-center sm:items-start justify-between gap-[6.5rem] sm:gap-1 w-full">
                          <div className="w-full flex justify-between items-center">
                            <p className="text-[#475467] text-2xs sm:text-sm font-semibold font-open_sans capitalize">
                              {sector}
                            </p>
                            <span className="text-[#667085] text-ellipsis text-2xs font-normal font-open_sans">
                              {stock_industry}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full sm:w-auto h-auto sm:h-[52px] py-1 px-0 items-center gap-2 rounded-md flex">
                        <div className="flex p-1 justify-center items-center rounded-md bg-[#F9FAFB]">
                          <img
                            src="/assets/stock-details/Sector icon.svg"
                            alt=""
                            className="w-6 h-6 sm:w-auto sm:h-auto"
                          />
                        </div>
                        <div className="flex flex-row sm:flex-row items-center sm:items-start gap-[5rem] sm:gap-1 w-full">
                          <div className="flex w-full justify-between items-center">
                            <p className="text-[#475467] text-2xs sm:text-sm font-semibold font-open_sans">
                              {market_cap_type} Cap
                            </p>
                            <span className="text-[#667085] text-ellipsis text-2xs font-normal font-open_sans">
                              {market_cap} Cr. as of{" "}
                              {new Date().toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full sm:w-auto h-auto sm:h-[52px] py-1 px-0 items-center gap-2 rounded-md flex justify-items-end">
                        <div className="flex p-1 items-center rounded-md bg-[#F9FAFB]">
                          <img
                            src="/assets/stock-details/Sector icon.svg"
                            alt=""
                            className="w-6 h-6 sm:w-auto sm:h-auto"
                          />
                        </div>
                        <div className="flex flex-row sm:flex-row items-center sm:items-start justify-between gap-10 sm:gap-1 w-full">
                          <div className="w-full flex justify-between items-center">
                            <p className="text-[#475467] text-2xs sm:text-sm font-semibold font-open_sans ">
                              {risk} Risk
                            </p>
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
                            onClick={() =>
                              window.open(watch_video.youtube_link, "_blank")
                            }
                          >
                            <img
                              src="/assets/play-btn.svg"
                              alt="Play icon"
                              className="w-5 h-5 transition duration-300 "
                            />
                            <span className="text-nowrap text-[16px]">
                              Watch Video
                            </span>
                          </button>
                        </div>
                      ) : (
                        <div className="relative group">
                          <button className="w-full text-nowrap  bg-gray-50 rounded-lg p-2 flex items-center justify-center gap-2 hover:bg-gray-100 cursor-not-allowed py-[10px] px-2">
                            <img
                              src="/assets/circle-play.svg"
                              alt="Play icon"
                              className="w-5 h-5"
                            />
                            <span className="font-medium text-[16px] text-gray-400 text-nowrap">
                              Watch Video
                            </span>
                          </button>

                          {/* Tooltip */}
                          <div className="absolute top-full left-[90%] transform -translate-x-1/2 mt-2 hidden group-hover:block w-max max-w-xs bg-white shadow-3xl rounded-lg border border-gray-200 p-4 text-center z-10">
                            <img
                              src="/assets/frame123.png" // Change this to the appropriate image source
                              alt="Video thumbnail"
                              className="w-[128px] mb-2 mx-auto"
                            />
                            <p className="font-bold text-lg text-[#0C111D]">
                              Video Not Available!
                            </p>
                            <p className="text-sm text-[#475467]">
                              Well, this video took a permanent vacation! 😅 But
                              don’t worry, fresh content is always on the
                              horizon. Stay tuned! 🌟
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
                          {action === "BUY"
                            ? "Invest Now"
                            : action === "HOLD"
                              ? "Go to Broker"
                              : "Sell Now"}
                        </span>
                      </button>
                    </div>
                  </div>
                  {/* When Small Screen Button Is Hide  */}
                  {/* Small screen show to company profile  */}
                  <div className="pt-[20px] p-4 block sm:hidden bg-white  mb-5">
                  <div className="pl-1 w-[min(1280px,calc(100%-32px))] min-w-[328px]  ">
                    <h2 className="text-[#0C111D] text-[14px]  font-bold font-open_sans ">
                      Company Profile
                    </h2>

                    <p
                      dangerouslySetInnerHTML={{ __html: truncatedText }}
                      className="text-[#475467] text-justify !text-[14px] font-normal !font-open_sans  sm:line-clamp-none"
                    ></p>

                    {text?.length > textCount ? (
                      <button onClick={() => setIsReadMore(!isReadMore)}>
                        {isReadMore ? (
                          <button class="flex items-center justify-center w-[14px] h-[2px] rounded-full bg-white group border border-gray-200 shadow-sm py-[9px] px-4">
                            <span class="text-gray-700 group-hover:text-green-700">
                              •••
                            </span>
                          </button>
                        ) : (
                          <>
                            <button class="flex items-center justify-center w-[14px] h-[2px] rounded-full bg-white border group border-gray-200 shadow-sm  px-6 py-3">
                              <div class="">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="w-4 h-4 transition-colors duration-300 group-hover:stroke-green-700"
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
                  <div className="hidden md:block col-span-2 order-3 sm:order-2">
                    <div className="p-4 md:p-6 lg:p-4 gap-4 lg:gap-6 rounded-[10px] bg-white shadow-sm mt-7">
                      <div className=" relative p-4 md:p-6 lg:p-4 gap-4 lg:gap-6 rounded-lg bg-[#EFF7FF] border border-transparent">
                        {/* Gradient Border */}
                        <div className="absolute inset-0 border-2 border-transparent rounded-[5px] z-[-1] bg-gradient-border"></div>

                        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
                          <div className="flex flex-col md:flex-row gap-4 md:gap-4 lg:gap-4 w-full">
                            {/* Upside Left Section */}
                            <div
                              className={`w-full ${cagr_of_stock ? "md:w-1/3" : "md:w-1/2"
                                } h-[95px] p-4 rounded-md bg-custom-gradient`}
                            >
                              <div className="flex flex-col md:flex-row justify-between">
                                <div className="flex gap-1 items-center">
                                  <p className="font-open_sans text-sm font-semibold text-[#FCFCFD]">
                                    Upside Left
                                  </p>
                                  <div className="relative group">
                                    <img
                                      src="/assets/ph_info-duotone.svg"
                                      alt="Info"
                                      className="h-[17px] md:h-[20px] lg:h-[24px] cursor-pointer"
                                    />
                                    <div className="absolute z-[999] top-6   shadow-3xl left-[50px] transform -translate-x-1/2 mt-2 hidden group-hover:block bg-white  text-sm rounded-lg py-2 px-4 w-[300px]">
                                      <div className="w-full grid gap-1 relative">
                                        <img
                                          src="/assets/div.png"
                                          alt=""
                                          className="h-8 w-5 absolute -top-4 left-[32%]"
                                        />
                                        <p className="text-[12px]">
                                          Upside Left means how much the stock
                                          price could rise from its current
                                          level.
                                        </p>
                                        <div className="p-2 bg-[#F9FAFB] rounded-md">
                                          <h4 className="text-[#108973] text-[12px] font-extrabold">
                                            Example :
                                          </h4>
                                          <p className="text-[12px]">
                                            {" "}
                                            If a stock's price is ₹100 and the
                                            Upside Left is 20%, it might go up
                                            to ₹120.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="hidden md:flex justify-end">
                                  <img
                                    src="/assets/stock-details/streamline_target-solid (1).svg"
                                    alt="Target"
                                  />
                                </div>
                              </div>
                              <div className="flex pt-2 flex-col md:flex-row items-start md:items-center gap-1 text-[16px] md:text-[20px] lg:text-[24px] text-white font-bold">
                                {upside_left}%
                                <span className="text-[12px] mt-2  line-clamp-2  text-white font-medium">
                                  likely within {upside_left_time}
                                </span>
                              </div>
                            </div>

                            {/* Total Returns Section */}
                            <div
                              className={`w-full ${cagr_of_stock ? "md:w-1/3" : "md:w-1/2"
                                } h-[95px] p-4 rounded-md bg-white`}
                            >
                              <div className="flex flex-col md:flex-row justify-between">
                                <div className="flex gap-[6px] items-center">
                                  <p className="font-open_sans text-sm font-semibold text-[#1D2939]">
                                    Total Returns
                                  </p>
                                </div>
                                <div className="hidden md:flex justify-end">
                                  <img
                                    src="/assets/Layer_1.svg"
                                    alt="Returns Icon"
                                  />
                                </div>
                              </div>
                              <div className="flex pt-2 flex-col md:flex-row items-start md:items-center gap-1 text-[16px] md:text-[20px] lg:text-[24px] text-[#344054] font-bold">
                                {gain_loss >= 0 ? (
                                  <>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="15"
                                      height="11"
                                      viewBox="0 0 15 11"
                                      fill="none"
                                    >
                                      <path
                                        d="M7.03446 0.649754C7.43652 0.0861183 8.27587 0.091733 8.67036 0.660698L14.4116 8.94137C14.8714 9.60454 14.3968 10.5111 13.5898 10.5111H1.94168C1.1286 10.5111 0.655406 9.59235 1.12758 8.93042L7.03446 0.649754Z"
                                        fill="#00FF02"
                                      />
                                    </svg>
                                  </>
                                ) : (
                                  <>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="15"
                                      height="11"
                                      viewBox="0 0 15 11"
                                      fill="none"
                                      style={{ transform: "rotate(180deg)" }} // Rotate the SVG 180 degrees
                                    >
                                      <path
                                        d="M7.03446 0.649754C7.43652 0.0861183 8.27587 0.091733 8.67036 0.660698L14.4116 8.94137C14.8714 9.60454 14.3968 10.5111 13.5898 10.5111H1.94168C1.1286 10.5111 0.655406 9.59235 1.12758 8.93042L7.03446 0.649754Z"
                                        fill="#FF0000" // Change color to red
                                      />
                                    </svg>
                                  </>
                                )}
                                {Math.abs(gain_loss)}%
                                <span className="text-[12px]  mt-2  text-[#667085] font-medium line-clamp-2">
                                  in {return_time}
                                </span>
                              </div>
                            </div>

                            {/* Total CAGR Section */}
                            {cagr_of_stock && (
                              <div className="w-full md:w-1/3 h-[95px] p-4 rounded-md bg-white">
                                <div className="flex flex-col md:flex-row justify-between">
                                  <div className="flex gap-1 items-center">
                                    <p className="font-open_sans text-sm font-semibold text-[#1D2939]">
                                      Total CAGR
                                    </p>
                                    <div className="relative group">
                                      <img
                                        src="/assets/blackinfo.svg"
                                        alt="Info"
                                        className="h-[17px] md:h-[20px] lg:h-[24px] cursor-pointer"
                                      />
                                      <div className="absolute top-8 z-[10000] left-[10%] transform -translate-x-[60%] mb-2 hidden group-hover:block text-white text-sm rounded py-1 px-2">
                                        <div className="tooltip w-[300px] md:w-[350px] p-4 bg-white  rounded-lg shadow-3xl text-gray-800 relative">
                                          <img
                                            src="/assets/div.png"
                                            alt=""
                                            className="h-8 w-5 absolute -top-[11px] shadow-3xl left-[60%]"
                                          />
                                          <div className="tooltip-content">
                                            <h3 className="tooltip-title font-bold font-open_sans mb-2 text-[12px] text-gray-800">
                                              Compound Annual Growth Rate
                                            </h3>
                                            <p className="tooltip-subtitle font-bold text-blue-900 font-open_sans text-[12px]">
                                              Purpose:
                                            </p>
                                            <p className="tooltip-text my-1 text-gray-800 text-[12px] font-open_sans">
                                              Shows average yearly growth of an
                                              investment.
                                            </p>
                                            <p className="tooltip-quote italic mb-3 text-gray-600 text-[12px] font-open_sans">
                                              Imagine a tree growing a bit more
                                              each year.
                                              <br />
                                              CAGR tells how fast it grows
                                              annually on average.
                                            </p>
                                            <div className="tooltip-formula flex flex-wrap bg-white p-3 rounded mb-4">
                                              <p className="font-bold m-0 pt-5 me-5 text-[12px] font-open_sans">
                                                CAGR =
                                              </p>
                                              <div className="formula flex items-center justify-center flex-wrap mt-2">
                                                <span className="text-[30px] font-[50] font-open_sans">
                                                  [
                                                </span>
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
                                                <span className="text-[30px] font-[50] font-open_sans">
                                                  ]
                                                </span>
                                                <sup className="flex items-center text-[20px] font-[50]">
                                                  <span className="text-[20px] font-open_sans">
                                                    [
                                                  </span>
                                                  <div className="flex flex-col items-center mx-2">
                                                    <div className="fraction">
                                                      <span className="text-[12px] font-open_sans">
                                                        1
                                                      </span>
                                                      <hr className="w-full h-[1px] bg-black mt-2" />
                                                      <span className="denominator text-[12px] mt-2 font-open_sans">
                                                        No. of Years
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <span className="text-[20px] font-open_sans">
                                                    ]
                                                  </span>
                                                </sup>
                                                <span className="text-[12px] font-bold ml-2 font-open_sans">
                                                  -1
                                                </span>
                                              </div>
                                            </div>

                                            <div className="tooltip-example bg-gray-50 p-3 rounded mb-4">
                                              <p className="example-title font-bold text-[#108973] mb-2 text-[12px] font-open_sans">
                                                Example :
                                              </p>
                                              <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                                <strong>Start Value</strong>{" "}
                                                ₹100
                                              </div>
                                              <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                                <strong>
                                                  End Value after 3 years
                                                </strong>{" "}
                                                ₹150
                                              </div>
                                              <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                                <strong>
                                                  Total Returns over 3 years
                                                </strong>{" "}
                                                50%
                                              </div>
                                              <div className="example-item flex justify-between py-1 text-[12px] font-open_sans">
                                                <strong>CAGR</strong> 14.47%
                                              </div>
                                            </div>
                                            <p className="tooltip-footer mt-4 text-[12px] text-gray-500 font-open_sans">
                                              This means, on average, the
                                              investment grew about 14.47% each
                                              year
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="hidden md:flex justify-end">
                                    <img src="/assets/upper.svg" alt="Target" />
                                  </div>
                                </div>
                                <div className="flex pt-2 flex-col md:flex-row items-start md:items-center gap-1 text-[16px] md:text-[20px] lg:text-[24px] text-[#344054] font-bold">
                                  {cagr_of_stock.cagr_value >= 0 ? (
                                    <>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="11"
                                        viewBox="0 0 15 11"
                                        fill="none"
                                      >
                                        <path
                                          d="M7.03446 0.649754C7.43652 0.0861183 8.27587 0.091733 8.67036 0.660698L14.4116 8.94137C14.8714 9.60454 14.3968 10.5111 13.5898 10.5111H1.94168C1.1286 10.5111 0.655406 9.59235 1.12758 8.93042L7.03446 0.649754Z"
                                          fill="#00FF02"
                                        />
                                      </svg>
                                    </>
                                  ) : (
                                    <>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="11"
                                        viewBox="0 0 15 11"
                                        fill="none"
                                        style={{ transform: "rotate(180deg)" }} // Rotate the SVG 180 degrees
                                      >
                                        <path
                                          d="M7.03446 0.649754C7.43652 0.0861183 8.27587 0.091733 8.67036 0.660698L14.4116 8.94137C14.8714 9.60454 14.3968 10.5111 13.5898 10.5111H1.94168C1.1286 10.5111 0.655406 9.59235 1.12758 8.93042L7.03446 0.649754Z"
                                          fill="#FF0000" // Change color to red
                                        />
                                      </svg>
                                    </>
                                  )}
                                  {Math.abs(cagr_of_stock.cagr_value)}%
                                  <span className="text-[10px]  mt-2  text-[#667085] font-medium  line-clamp-2">
                                    in {cagr_of_stock.cagr_time}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="pt-5 text-center md:text-center text-[#344054] text-sm md:text-base  font-normal gap-1">
                          <span className="text-[#0079EF] text-sm md:text-base lg:text-sm font-bold">
                            ₹1Lakh{" "}
                          </span>
                          invested at current market price (CMP) can become{" "}
                          <span className="text-[#0079EF] text-sm md:text-base lg:text-sm font-bold">
                            ₹{100000 + 1000 * gain_loss} Lakh
                          </span>{" "}
                          likely within {upside_left_time}
                        </div>
                      </div>

                      <div className="pt-4 bg-white">
                        {/* md:px-[20px] lg:px-[30px] */}
                        <div className="  pt-4 pb-4">
                          {/* <StockDetailsProgressBar /> */}
                          <StockDetailProgressBar live_price={live_price} entry_date={created} entry_price={entry_price} stock_targets={stock_targets} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Small Responsive size View Open the box  */}
                  <div
                    className="block rounded-lg md:hidden bg-gray-150 p-4  shadow-md max-w-full mx-auto mt-5"
                    ref={UpsideLeftRef}
                    id="upside-left-section"
                  >
                    <div className="  rounded-lg">
                      <div className="bg-white rounded-t-lg p-4">
                        <div className="bg-custom-gradient text-white rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <h2 className="text-sm font-open_sans font-semibold flex items-center gap-1">
                              Upside Left
                              {/* Tooltip for large screens and Modal Trigger for small screens */}
                              <div className="relative group hidden sm:block">
                                {/* Tooltip (Visible on large screens) */}
                                <img
                                  src="/assets/ph_info-duotone.svg"
                                  alt="Info"
                                  className="h-[17px] md:h-[20px] lg:h-[24px] cursor-pointer"
                                />
                                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 z-10 shadow-3xl hidden group-hover:block bg-white text-black text-sm rounded-lg py-2 px-4 w-[300px]">
                                  <div className="w-full grid gap-1 relative">
                                    <img
                                      src="/assets/div.png"
                                      alt=""
                                      className="h-8 w-5 absolute -top-4 left-[46%]"
                                    />
                                    <p className="text-[12px] font-open_sans">
                                      Upside Left means how much the stock price
                                      could rise from its current level.
                                    </p>
                                    <div className="p-2 bg-[#F9FAFB] rounded-md">
                                      <h4 className="text-[#108973] text-[12px] font-extrabold font-open_sans">
                                        Example :
                                      </h4>
                                      <p className="text-[12px] font-open_sans">
                                        If a stock's price is ₹100 and the
                                        Upside Left is 20%, it might go up to
                                        ₹120.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Modal Trigger for small screens */}
                              <div className="sm:hidden">
                                <img
                                  src="/assets/ph_info-duotone.svg"
                                  alt="Info"
                                  className="h-[17px] md:h-[20px] lg:h-[24px] cursor-pointer"
                                  onClick={openModal}
                                />
                              </div>
                            </h2>

                            <img
                              src="/assets/stock-details/streamline_target-solid (1).svg"
                              alt=""
                            />
                          </div>

                          {/* Modal for small screens */}

                          <Modal
                            blur
                            width="450px"
                            open={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            className="flex justify-center p-6 bg-white rounded-[12px] shadow-[0_20px_24px_-4px_rgba(16,24,40,0.08),0_8px_8px_-4px_rgba(16,24,40,0.03)] w-[350px] max-w-full mx-auto"
                          >
                            {/* Modal Header */}
                            <div className="w-full flex justify-between items-center gap-1">
                              <h3 className="text-xl font-bold leading-[30px] text-[#101828] m-0 font-open_sans">
                                Upside Left
                              </h3>
                              <button
                                className="text-[30px] text-gray-500 hover:text-gray-700"
                                onClick={closeModal}
                              >
                                &times;
                              </button>
                            </div>

                            {/* Modal Body */}
                            <div className="mt-2 text-gray-800 text-sm font-open_sans">
                              Upside Left means how much the stock price could
                              rise from its current level.
                            </div>
                            <div className="mt-4 p-4 bg-[#F6F7F9] rounded-lg w-full">
                              <span className="text-[#108973] text-sm font-bold font-open_sans">
                                Example :
                              </span>
                              <p className="text-sm text-gray-600 mt-1 font-open_sans">
                                If a stock's price is ₹100 and the Upside Left
                                is 20%, it might go up to ₹120.
                              </p>
                            </div>
                          </Modal>

                          <div className="flex items-center gap-2">
                            <p className="text-display-xs font-bold  font-open_sans">
                              {upside_left}%
                            </p>
                            <p className="text-sm font-open_sans mt-1">
                              in {upside_left_time}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white px-5 pb-2 rounded-b-lg">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <img src="/assets/hj1.svg" alt="" />
                            <p className="ml-2 text-3xs text-gray-800 font-open_sans">
                              Total Returns
                            </p>
                          </div>
                          <div className="flex items-center">
                            {gain_loss >= 0 ? (
                              // green up arrow
                              <img
                                src="/assets/Polygon2.svg"
                                alt="Up Arrow"
                                className="w-2"
                              />
                            ) : (
                              // red down arrow
                              <img
                                src="/assets/Polygon 3.svg"
                                alt="Down Arrow"
                                className="w-2"
                              />
                            )}
                            <p className="text-black ml-1 text-2xs font-open_sans font-[700]">
                              {gain_loss}% {""}
                              <span className="text-gray-500 text-2xs font-open_sans">
                                likely in {return_time}
                              </span>
                            </p>
                          </div>
                        </div>
                        {cagr_of_stock && (
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center">
                              <img src="/assets/hj2.svg" alt="" />
                              <p className="ml-2 text-3xs text-gray-800 font-open_sans">
                                CAGR
                              </p>
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
                                      Shows average yearly growth of an
                                      investment.
                                    </p>
                                    <p className="tooltip-quote italic mb-3 text-gray-600 text-[12px] font-open_sans">
                                      Imagine a tree growing a bit more
                                      each year.
                                      <br />
                                      CAGR tells how fast it grows
                                      annually on average.
                                    </p>
                                    <div className="tooltip-formula flex flex-wrap bg-white p-3 rounded mb-4">
                                      <p className="font-bold m-0 pt-5 me-5 text-[12px] font-open_sans">
                                        CAGR =
                                      </p>
                                      <div className="formula flex items-center justify-center flex-wrap mt-2">
                                        <span className="text-[30px] font-[50] font-open_sans">
                                          [
                                        </span>
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
                                        <span className="text-[30px] font-[50] font-open_sans">
                                          ]
                                        </span>
                                        <sup className="flex items-center text-[20px] font-[50]">
                                          <span className="text-[20px] font-open_sans">
                                            [
                                          </span>
                                          <div className="flex flex-col items-center mx-2">
                                            <div className="fraction">
                                              <span className="text-[12px] font-open_sans">
                                                1
                                              </span>
                                              <hr className="w-full h-[1px] bg-black mt-2" />
                                              <span className="denominator text-[12px] mt-2 font-open_sans">
                                                No. of Years
                                              </span>
                                            </div>
                                          </div>
                                          <span className="text-[20px] font-open_sans">
                                            ]
                                          </span>
                                        </sup>
                                        <span className="text-[12px] font-bold ml-2 font-open_sans">
                                          -1
                                        </span>
                                      </div>
                                    </div>

                                    <div className="tooltip-example bg-gray-50 p-3 rounded mb-4">
                                      <p className="example-title font-bold text-[#108973] mb-2 text-[12px] font-open_sans">
                                        Example :
                                      </p>
                                      <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                        <strong>Start Value</strong>{" "}
                                        ₹100
                                      </div>
                                      <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                        <strong>
                                          End Value after 3 years
                                        </strong>{" "}
                                        ₹150
                                      </div>
                                      <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                        <strong>
                                          Total Returns over 3 years
                                        </strong>{" "}
                                        50%
                                      </div>
                                      <div className="example-item flex justify-between py-1 text-[12px] font-open_sans">
                                        <strong>CAGR</strong> 14.47%
                                      </div>
                                    </div>
                                    <p className="tooltip-footer mt-4 text-[12px] text-gray-500 font-open_sans">
                                      This means, on average, the
                                      investment grew about 14.47% each
                                      year
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
                                <p className="modal-subtitle font-bold text-blue-900 font-open_sans text-[12px]">
                                  Purpose:
                                </p>
                                <p className="modal-text my-1 text-gray-800 text-[12px] font-open_sans">
                                  Shows average yearly growth of an investment.
                                </p>
                                <p className="modal-quote italic mb-3 text-gray-600 text-[12px] font-open_sans">
                                  Imagine a tree growing a bit more each year.
                                  <br />
                                  CAGR tells how fast it grows annually on
                                  average.
                                </p>
                                <div className="modal-formula flex flex-wrap bg-white p-3 rounded mb-4">
                                  <p className="font-bold m-0 pt-5 me-5 text-[12px] font-open_sans">
                                    CAGR =
                                  </p>
                                  <div className="formula flex items-center justify-center flex-wrap mt-2">
                                    <span className="text-[30px] font-[50] font-open_sans">
                                      [
                                    </span>
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
                                    <span className="text-[30px] font-[50] font-open_sans">
                                      ]
                                    </span>
                                    <sup className="flex items-center text-[20px] font-[50]">
                                      <span className="text-[20px] font-open_sans">
                                        [
                                      </span>
                                      <div className="flex flex-col items-center mx-2">
                                        <div className="fraction">
                                          <span className="text-[12px] font-open_sans">
                                            1
                                          </span>
                                          <hr className="w-full h-[1px] bg-black mt-2" />
                                          <span className="denominator text-[12px] mt-2 font-open_sans">
                                            No. of Years
                                          </span>
                                        </div>
                                      </div>
                                      <span className="text-[20px] font-open_sans">
                                        ]
                                      </span>
                                    </sup>
                                    <span className="text-[12px] font-bold ml-2 font-open_sans">
                                      -1
                                    </span>
                                  </div>
                                </div>

                                <div className="modal-example bg-gray-50 p-3 rounded mb-4">
                                  <p className="example-title font-bold text-[#108973] mb-2 text-[12px] font-open_sans">
                                    Example:
                                  </p>
                                  <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                    <strong>Start Value</strong> ₹100
                                  </div>
                                  <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                    <strong>End Value after 3 years</strong>{" "}
                                    ₹150
                                  </div>
                                  <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                                    <strong>Total Returns over 3 years</strong>{" "}
                                    50%
                                  </div>
                                  <div className="example-item flex justify-between py-1 text-[12px] font-open_sans">
                                    <strong>CAGR</strong> 14.47%
                                  </div>
                                </div>
                                <p className="modal-footer mt-4 text-[12px] text-gray-500 font-open_sans">
                                  This means, on average, the investment grew
                                  about 14.47% each year
                                </p>
                              </Modal>
                            </div>
                            <div className="flex items-center">
                              {cagr_of_stock.cagr_value >= 0 ? (
                                // green up arrow
                                <img
                                  src="/assets/Polygon2.svg"
                                  alt="Up Arrow"
                                  className="w-2"
                                />
                              ) : (
                                // red down arrow
                                <img
                                  src="/assets/Polygon 3.svg"
                                  alt="Down Arrow"
                                  className="w-2"
                                />
                              )}
                              <p className="text-black ml-1 text-2xs font-open_sans font-[700] ">
                                {cagr_of_stock.cagr_value}%{" "}
                                <span className="text-gray-500 text-2xs font-open_sans">
                                  in {cagr_of_stock.cagr_time}
                                </span>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-5 text-center md:text-left text-[#344054] text-sm md:text-base leading-6 font-normal  gap-1 font-open_sans">
                      <span className="text-[#0079EF] font-open_sans text-sm md:text-base font-bold">
                        ₹1Lakh{" "}
                      </span>
                      invested at current market price (CMP) can become{" "}
                      <span className="text-[#0079EF] font-open_sans text-sm md:text-base font-bold">
                        ₹{100000 + 1000 * gain_loss} Lakh
                      </span>{" "}
                      likely within {upside_left_time}
                    </div>
                    <div className="pt-4 hidden sm:block bg-white">
                      <div className="">
                        <StockDetailProgressBar live_price={live_price} entry_date={created} entry_price={entry_price} stock_targets={stock_targets} />
                        {/* <StockDetailsProgressBar /> */}
                      </div>
                    </div>
                  </div>
                  <div className=" block sm:hidden">
                    <div className="px-4 md:px-[20px] pt-4 pb-4 bg-white">
                      <StockDetailProgressBar live_price={live_price} entry_date={created} entry_price={entry_price} stock_targets={stock_targets} />
                    </div>
                  </div>
                  {/* Upside Left Box End  */}

                  {/* Company Profile Section start */}
                  <div className="pt-[72px]  px-[4px] hidden sm:block">
                    <h2 className="text-[#0C111D] text-[20px] font-semibold font-open_sans ">
                      Company Profile
                    </h2>
                    <p
                      dangerouslySetInnerHTML={{ __html: truncatedText }}
                      className="text-[#475467] text-justify text-[14px] font-normal font-open_sans line-clamp-3 sm:line-clamp-none"
                    ></p>

                    {text?.length > textCount ? (
                      <button onClick={() => setIsReadMore(!isReadMore)}>
                        {isReadMore ? (
                          <button class="flex items-center justify-center w-[14px] h-[2px] rounded-full bg-white group border border-gray-200 shadow-sm py-[9px] px-4">
                            <span class="text-gray-700 group-hover:text-green-700">
                              •••
                            </span>
                          </button>
                        ) : (
                          <>
                            <button class="flex items-center justify-center w-[14px] h-[2px] rounded-full bg-white border group border-gray-200 shadow-sm  px-6 py-3">
                              <div class="">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="w-4 h-4 transition-colors duration-300 group-hover:stroke-green-700"
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

                  <div className="p-5 bg-gray-100 mt-5 rounded-md  block sm:hidden sm:w-full w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto">
                    <div className="flex relative">
                      <div className=" !w-[75%]">
                        <p className="font-bold mb-2 font-open_sans text-xs text-[0.813rem]">
                          Don't miss out on potential gains!
                        </p>
                        <p className="mb-4 text-[#344054] font-open_sans text-[0.813rem]">
                          Upgrade now to get access to both SME and Mainboard
                          stocks.
                        </p>
                      </div>
                      <div className=" !w-[25%]">
                        <img
                          src="/assets/Frame.svg"
                          alt="sss"
                          className="absolute top-0 right-0 h-[70px] w-[78px]"
                        />
                      </div>
                    </div>
                    <Link href={`/pricing`}>
                      <button className="w-full hover:scale-[0.95]  bg-[#125B54] hover:bg-[#0B3A36] text-white p-2 rounded-lg  justify-center items-center flex">
                        <span className="flex gap-2 font-open_sans text-sm font-medium">
                          <img src="/assets/white-icon.svg" alt="" />
                          Upgrade Now
                        </span>
                      </button>
                    </Link>
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
                        className={`transform w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                          }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
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
                  <div
                    className=" sm:pt-[72px] pt-0  sm:w-full w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto "
                    ref={newsRef}
                    id="news-section"
                  >
                    <h2 className="text-[#0C111D] sm:text-xl text-[14px] font-semibold font-open_sans px-1 mb-0">
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
                      <div className="gap-2 mb-4 hidden sm:flex">
                        {/* Video Button logic  */}
                        <div className="flex-1">
                          {hasVideo ? (
                            <div className="flex-1 group">
                              <button
                                className="flex-1 text-nowrap w-full group-hover:bg-[#CBF3F0] group-hover:scale-[0.95] duration-300 border border-gray-300 rounded-lg p-2 flex items-center justify-center gap-2"
                                onClick={() =>
                                  window.open(
                                    watch_video.youtube_link,
                                    "_blank"
                                  )
                                }
                              >
                                <img
                                  src="/assets/play-btn.svg"
                                  alt="Play icon"
                                  className="w-5 h-5 transition duration-300 "
                                />
                                <span className="text-nowrap text-[16px]">
                                  Watch Video
                                </span>
                              </button>
                            </div>
                          ) : (
                            <div className="relative group">
                              <button className="w-full bg-gray-50 rounded-lg p-[9px] flex items-center justify-center gap-2 hover:bg-gray-100 cursor-not-allowed">
                                <img
                                  src="/assets/circle-play.svg"
                                  alt="Play icon"
                                  className="w-5 h-5"
                                />
                                <span className="text-nowrap text-[16px] font-medium text-gray-400">
                                  Watch Video
                                </span>
                              </button>

                              {/* Tooltip */}
                              <div className="absolute top-full left-[90%] transform -translate-x-1/2 mt-2 hidden group-hover:block w-max max-w-xs bg-white shadow-3xl rounded-lg border border-gray-200 p-4 text-center z-10">
                                <img
                                  src="/assets/frame123.png" // Change this to the appropriate image source
                                  alt="Video thumbnail"
                                  className="w-[128px] mb-2 mx-auto"
                                />
                                <p className="font-bold text-lg text-[#0C111D]">
                                  Video Not Available!
                                </p>
                                <p className="text-sm text-[#475467]">
                                  Well, this video took a permanent vacation! 😅
                                  But don’t worry, fresh content is always on
                                  the horizon. Stay tuned! 🌟
                                </p>
                                {/* Tooltip Arrow */}
                                <div className="absolute  -top-2 left-[10%] transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l border-t border-gray-200"></div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Share Button */}
                        <div className="flex-1 group">
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
                              {action === "BUY"
                                ? "Invest Now"
                                : action === "HOLD"
                                  ? "Go to Broker"
                                  : "Sell Now"}
                            </span>
                          </button>

                          <InvestModal
                            handleMainModalOpen={handleMainModalOpen}
                            handleMainModalClose={handleMainModalClose}
                            handleChildModalOpen={handleChildModalOpen}
                            handleCloseAllModals={handleCloseAllModals}
                            modalState={modalState}
                          />
                        </div>
                      </div>

                      <div className=" justify-between items-center relative pt-5 hidden sm:flex ">
                        <p className="w-2/3 font-open_sans">{action_text}</p>
                        <img
                          src="/assets/BuyBubbleBlue12.webp"
                          alt=""
                          className="absolute -top-1 right-6 w-12 h-12 rotate-[-28deg]"
                        />

                        {/* SELL Image   */}

                        {/* <img
                        src="/assets/sellbbl.png"
                        alt=""
                        className="absolute -top-3 right-6 w-16 h-16"
                      /> */}

                        {/* Hold Images  */}

                        {/* <img
                        src="/assets/sellbblyellow.png"
                        alt=""
                        className="absolute -top-1 right-8 w-10 h-8 rotate-[-28deg]"
                      /> */}

                        <img
                          src="/assets/images3.svg"
                          alt=""
                          className="absolute -bottom-1 right-2 "
                        />
                        <div className="w-1/3 flex justify-end">
                          <img
                            src="/assets/images12.webp"
                            alt=""
                            className=" w-[52px] "
                          />
                        </div>
                      </div>
                      <hr className="my-3 hidden  sm:block" />
                      <div className="p-4 bg-gray-100 mt-2 rounded-lg hidden sm:block">
                        <div className="flex relative !mb-[24px]">
                          <div className=" !w-[75%]">
                            <p className="font-bold mb-2 font-open_san text-xs">
                              Don't miss out on potential gains!
                            </p>
                            <p className=" text-[#344054] font-open_sans !text-xs">
                              Upgrade now to get access to both SME and
                              Mainboard stocks.
                            </p>
                          </div>
                          <div className=" !w-[25%]">
                            <img
                              src="/assets/Frame.svg"
                              alt="sss"
                              className="absolute top-0 right-0 h-[71px] w-[78px]"
                            />
                          </div>
                        </div>
                        <Link href={`/pricing`}>
                          <button className="w-full hover:scale-[0.95]  bg-[#125B54] hover:bg-[#0B3A36] duration-300 text-white p-2 rounded-lg  justify-center items-center hidden sm:flex">
                            <span className="flex gap-2 font-open_sans  text-sm font-medium">
                              <img src="/assets/white-icon.svg" alt="" />
                              Upgrade Now
                            </span>
                          </button>
                        </Link>
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
                            className={`transform w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                              }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="mt-2">
                            {/* Timeline Content Goes Here */}
                            <div className="p-4  rounded-lg">
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
            handleMainModalOpen={handleMainModalOpen}
            handleMainModalClose={handleMainModalClose}
            handleChildModalOpen={handleChildModalOpen}
            handleCloseAllModals={handleCloseAllModals}
            modalState={modalState}
          />
        </div>
      )}
    </>
  );
}

export default StockDetailsSection;
