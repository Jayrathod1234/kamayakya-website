import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Box, Chip, IconButton, useMediaQuery } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import StrategyCheck from "./StrategyCheck";
import SectorCheck from "./SectorCheck";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { useTrackRecord } from "@/contexts/TrackRecordContext";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components.v2/ui/carousel";
import { useTrackRecordCommon } from "@/contexts/TrackRecordCommonContext";
import { getMixPanelClient } from "@/externals/mixpanel";

const FilterCarousel = () => {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const {
    popularStrategies,
    setStrategyTag,
    strategyTag,
    setIsChangeFilter,
    changablestrategyTags,
    removePopularStrategies,
  } = useTrackRecordCommon();
  const { sector } = useTrackRecord();

  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isLatopbig = useMediaQuery("(max-width:1440px)");
  const isLatop = useMediaQuery("(max-width:1024px)");
  const isTab = useMediaQuery("(max-width:768px)");

  const updateButtonVisibility = () => {
    const containerWidth = containerRef.current.offsetWidth - 100;
  };

  useLayoutEffect(() => {
    updateButtonVisibility();
  }, [strategyTag, popularStrategies]);

  const handleChipClick = async (chipId: string, chip: { name: string }) => {
    await setStrategyTag((prevTags: Array<string>) => {
      // Check if the id is already in the array to avoid duplicates
      if (!prevTags.includes(chipId)) {
        return [...prevTags, chipId]; // Append the new id to the existing array
      }
      return prevTags; // If id already exists, return the existing array
    });

    const mp = getMixPanelClient();
    mp.track("filter_clicked", {
      page: "TrackRecord_pagefilter_source:quick_filter",
      filterused: chip?.name,
    });
    setIsChangeFilter(true);
  };

  const handleChipDelete = async (chipId: string) => {
    // Check if the strategy with chipId has is_default set to 0
    const strategyToRemove = popularStrategies.find((strategy: { id: string }) => strategy.id === chipId);

    if (strategyToRemove && strategyToRemove.is_default === 0) {
      // Remove strategy from popularStrategies
      removePopularStrategies(chipId);
    }

    await setStrategyTag(
      (prevTags: Array<string>) => prevTags.filter((id) => id !== chipId) // Remove the chipId from the array
    );
    setIsChangeFilter(true);
  };

  // Sort popularStrategies to show selected ones first
  const sortedStrategies = [...(popularStrategies || [])].sort((a, b) => {
    const aSelected = strategyTag.includes(a.id);
    const bSelected = strategyTag.includes(b.id);
    return aSelected === bSelected ? 0 : aSelected ? -1 : 1;
  });

  return (
    <div className="bg-white">
      <div className="sm:w-[min(1280px,calc(100%-25px))] w-0 min-w-[328px] mx-auto sm:block hidden">
        <Box sx={{ display: "flex", width: "100%", overflow: "hidden" }} ref={containerRef}>
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#F2F4F7",
              // display: "flex",
              // alignItems: "center",
              // paddingLeft: "20px",
              paddingRight: "20px",
              paddingLeft: isMobile ? "20px" : "16px",
              paddingTop: "0px",
              paddingBottom: "0px",
              position: "relative",
              marginTop: "16px",
              marginBottom: "16px",
              borderRadius: "6px",
            }}
          >
            <div>
              <Carousel className=" py-[10px] relative flex items-center">
                <div className="w-auto sm:block hidden mr-[14px]">
                  <p className="font-open_sans text-sm font-medium text-[#344054] whitespace-nowrap">Quick Filters:</p>
                </div>
                <CarouselContent opts={{ containScroll: "trimSnaps" }} className="flex justify-between pl-1">
                  {changablestrategyTags.length > 0 && (
                    <CarouselItem className="basis-auto pl-3 ">
                      <StrategyCheck />
                    </CarouselItem>
                  )}
                  {sector.length > 0 && (
                    <CarouselItem className="basis-auto pl-3 ">
                      <SectorCheck />
                    </CarouselItem>
                  )}
                  {sortedStrategies?.map((chip) => (
                    <CarouselItem className="basis-auto pl-3 ">
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
                                strategyTag.includes(chip.id) && chip.id == "most-recent" ? "brightness(100)" : "none",
                              gap: "1px",
                            }}
                          />
                        }
                        label={chip.name}
                        clickable
                        onClick={() => handleChipClick(chip.id, chip)}
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
                          paddingLeft: "8px",
                          paddingRight: "8px",
                          // borderRadius: ".5rem !important",
                          borderRadius: isMobile ? "6px" : "0.5rem",
                          maxWidth: "200px !important",
                          height: "46px !important",
                          // border: "1px solid #E4E7EC ",
                          borderColor: changablestrategyTags.length > 0 ? "#108973" : "#108973",
                          fontFamily: "Open Sans",
                          // borderColor: " #E4E7EC !important ",
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
                          textOverflow: "ellipsis", // Add ellipsis for truncated text
                          display: "inline-flex", // Allow the chip to grow based on content
                          fontSize: 14,
                          fontWeight: 500,
                        }}
                      />
                    </CarouselItem>
                  ))}
                  {changablestrategyTags.length <= 0 && (
                    <CarouselItem className="basis-auto pl-3">
                      <StrategyCheck />
                    </CarouselItem>
                  )}
                  {sector.length <= 0 && (
                    <CarouselItem className="basis-auto pl-3 ">
                      <SectorCheck />
                    </CarouselItem>
                  )}
                </CarouselContent>
                <CarouselPrevious className=" h-7 w-7 p-1 left-[6rem] top-[50%] disabled:hidden border-none focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-black  hover:text-white   bg-black text-white shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
                <CarouselNext className=" h-7 w-7 p-1 right-[0px] top-[50%] disabled:hidden border-none  focus-visible:ring-0 focus-visible:ring-offset-0  bg-black text-white hover:bg-black  hover:text-white shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
              </Carousel>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default FilterCarousel;
