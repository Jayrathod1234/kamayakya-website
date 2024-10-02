import React, { useEffect, useRef, useState } from "react";
import DrawerFilter from "./DrawerFilter";
import CustomSortMenu from "./RadioDrop";
import FilterMenuTags2 from "./FilterMenuTags2";
import ResponsiveFilter from "./ResponsiveFilter.jsx";
import { Box, useMediaQuery, Chip } from "@mui/material";
import { useAllBoardStock } from "@/contexts/AllBoardStockContext";
import SearchPage from "../../../components.v3/common/SearchPage";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { useTrackRecord } from "@/contexts/trackRecordContext";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components.v2/ui/carousel";
import CloseIcon from "@mui/icons-material/Close";
import StrategyCheck from "./StrategyCheck";
import SectorCheck from "./SectorCheck";

function Filtermenu() {
  const { searchStock, setSearchStock, sector } = useTrackRecord();
  const {
    setSearchPageOpen,
    changablestrategyTags,
    popularStrategies,
    strategyTag,
    setStrategyTag,

    setIsChangeFilter,

    removePopularStrategies,
  } = useStockPicks();

  // sticky header
  const isMobile = useMediaQuery("(max-width:600px)");

  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  // Sort popularStrategies to show selected ones first
  const sortedStrategies = [...(popularStrategies || [])].sort((a, b) => {
    const aSelected = strategyTag.includes(a.id);
    const bSelected = strategyTag.includes(b.id);
    return aSelected === bSelected ? 0 : aSelected ? -1 : 1;
  });
  // Function to handle click on the search button
  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);

    if (!isExpanded) {
      // Focus the input when it expands
      setTimeout(() => inputRef.current.focus(), 300);
    }
  };

  const handleChipClick = async (chipId) => {
    await setStrategyTag((prevTags) => {
      // Check if the id is already in the array to avoid duplicates
      if (!prevTags.includes(chipId)) {
        return [...prevTags, chipId]; // Append the new id to the existing array
      }
      return prevTags; // If id already exists, return the existing array
    });
    setIsChangeFilter(true);
  };

  const handleChipDelete = async (chipId) => {
    // Remove strategy from popularStrategies
    removePopularStrategies(chipId);

    await setStrategyTag(
      (prevTags) => prevTags.filter((id) => id !== chipId) // Remove the chipId from the array
    );
    setIsChangeFilter(true);
  };

  useEffect(() => {
    if (searchStock) {
      setIsExpanded(true);
    }
  }, []);

  return (
    <>
      {/* <FilterMenuTags /> */}
      <div className="sticky top-[54px] right-0 z-[51] bg-[#f2f4f7] overflow-hidden items-center navbar-shadow">
        <div className="w-[min(1280px,calc(100%-25px))] min-w-[328px] mx-auto  py-[10px] px-0 flex gap-1 items-center pt-4">
          {/* <ResponsiveFilter/> */}
          {/* <FilterMenuTags2 isResponsive={isMobile} isExpanded={isExpanded} /> */}
          {/* ${
              isExpanded ? "lg:w-[58%]" : "lg:w-[74%]"
            } */}
          <div
            // style={{ scrollbarWidth: "none" }}
            className={`transition-all duration-500 ease-linear overflow-hidden  sm:order-1 order-2  `}
          >
            <div className=" max-w-[98%]">
              <Box
                sx={{
                  // display: "flex",
                  width: isMobile ? "100%" : "100%",
                  overflow: { sm: "hidden", xs: "auto" },
                }}
                // ref={containerRef}
              >
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: isMobile ? "transparent" : "#f2f4f7",
                  }}
                >
                  <Carousel className=" flex sticky_filter-carousel">
                    <CarouselContent opts={{ containScroll: "trimSnaps" }} className="flex justify-between  pl-2">
                      {isMobile && (
                        <>
                          <CarouselItem className="basis-auto pl-2 ">
                            {" "}
                            <CustomSortMenu
                              sx={{
                                padding: isMobile ? "6px 11px" : "10px 11px",
                              }}
                            />
                          </CarouselItem>
                          <CarouselItem className="basis-auto pl-2">
                            <DrawerFilter />
                          </CarouselItem>
                        </>
                      )}
                      {changablestrategyTags.length > 0 && (
                        <CarouselItem className="basis-auto pl-2">
                          <StrategyCheck />
                        </CarouselItem>
                      )}
                      {sector.length > 0 && (
                        <CarouselItem className="basis-auto pl-2">
                          <SectorCheck />
                        </CarouselItem>
                      )}
                      {sortedStrategies?.map((chip) => (
                        <CarouselItem className="basis-auto pl-2">
                          <Chip
                            key={chip.id}
                            avatar={
                              <img
                                src={chip.image}
                                alt={chip.name}
                                style={{
                                  width: 14,
                                  height: 14,
                                  filter:
                                    strategyTag.includes(chip.id) && chip.id == "most-recent"
                                      ? "brightness(100)"
                                      : "none",
                                }}
                              />
                            }
                            label={chip.name}
                            clickable
                            onClick={() => handleChipClick(chip.id)}
                            onDelete={strategyTag.includes(chip.id) ? () => handleChipDelete(chip.id) : undefined}
                            deleteIcon={
                              <CloseIcon
                                sx={{
                                  color: strategyTag.includes(chip.id) ? "white !important" : "inherit",
                                  backgroundColor: "rgba(15, 15, 15, 0.47)", // Set background color
                                  borderRadius: "50%", // Make it rounded
                                  padding: "4px", // Add padding for spacing
                                }}
                              />
                            }
                            sx={{
                              paddingLeft: "16px",
                              paddingRight: "16px",
                              // borderRadius: "4px",
                              borderRadius: isMobile ? "6px" : "0.5rem",
                              // maxWidth: "179px !important",
                              height: "46px !important",
                              border: "1px solid #E4E7EC ",
                              fontFamily: "Open Sans",
                              backgroundColor: strategyTag.includes(chip.id) ? "#125b54" : "white",
                              color: strategyTag.includes(chip.id) ? "white" : "inherit",
                              "&:hover": {
                                backgroundColor: strategyTag.includes(chip.id) ? "#125b54" : "#e7f8f8",
                                transform: "scale(000.95)", // Adjust the scale value as needed
                                transition: "transform 0.3s ease", // Optional: Add transition for smooth scaling
                              },
                              minWidth: "auto", // Ensure text is not truncated
                              whiteSpace: "nowrap", // Prevent text wrapping
                              overflow: "visible", // Ensure full visibility of text
                              display: "inline-flex", // Allow the chip to grow based on content
                              fontSize: "14px",
                              fontWeight: 500,
                            }}
                          />
                        </CarouselItem>
                      ))}
                      {changablestrategyTags.length <= 0 && (
                        <CarouselItem className="basis-auto pl-2">
                          <StrategyCheck />
                        </CarouselItem>
                      )}
                      {sector.length <= 0 && (
                        <CarouselItem className="basis-auto pl-2">
                          {" "}
                          <SectorCheck />
                        </CarouselItem>
                      )}
                    </CarouselContent>

                    <CarouselPrevious className=" z-50 h-7 w-7 p-1 left-[0px] top-[50%] disabled:hidden border-none focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-black  hover:text-white   bg-black text-white shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
                    <CarouselNext
                      className={` z-50 h-7 w-7 p-1 right-0  top-[50%] disabled:hidden border-none  focus-visible:ring-0 focus-visible:ring-offset-0  bg-black text-white hover:bg-black  hover:text-white shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]`}
                    />
                  </Carousel>
                </Box>
              </Box>
            </div>
          </div>
          <div className="  flex sm:gap-[10px] gap-2 items-center sm:order-2 order-1 ">
            <div className=" items-center">
              {!isMobile ? (
                <>
                  <div
                    onClick={handleSearchClick}
                    className={`search inline-flex items-center text-black px-1 py-[3px] rounded-lg border border-[#E4E7EC]  bg-white h-[46px]`}
                    style={{ width: isExpanded ? "236px" : "auto" }} // This ensures that width expands correctly
                  >
                    <input
                      onClick={(e) => e.stopPropagation()}
                      type="search"
                      placeholder="Search Stocks by Name"
                      value={searchStock}
                      onChange={(e) => setSearchStock(e.target.value)}
                      onFocus={() => setIsExpanded(true)}
                      ref={inputRef}
                      className={`transition-all duration-500 ease-linear bg-white`}
                      style={{
                        display: isExpanded ? "block" : "none",
                        width: isExpanded ? "100%" : "0px",
                      }} // Set input width to full when expanded
                    />
                    <button
                      type="button"
                      className="search__button grid place-items-center transition-all duration-500 ease-linear w-[35px] h-[35px] cursor-pointer hover:text-[#e3e3e3] bg-[rgba(0, 0, 0, 0.1)] rounded-full ml-auto"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                          stroke="#667085"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`search inline-flex items-center text-black px-1 py-[3px] rounded-lg border border-[#E4E7EC]  bg-white h-[46px]`}
                    onClick={() => setSearchPageOpen(true)}
                    style={{}} // This ensures that width expands correctly
                  >
                    <button
                      type="button"
                      className="search__button grid place-items-center transition-all duration-500 ease-linear w-[35px] h-[35px] cursor-pointer hover:text-[#e3e3e3] bg-[rgba(0, 0, 0, 0.1)] rounded-full ml-auto"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                          stroke="#667085"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>
            {!isMobile && (
              <>
                <CustomSortMenu isLabel={false} />
                <div className="w-auto h-[46px]">
                  <DrawerFilter />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Filtermenu;
