import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Box, Chip, IconButton, useMediaQuery } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import StrategyCheck from "./StrategyCheck";
import SectorCheck from "./SectorCheck";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { useTrackRecord } from "@/contexts/trackRecordContext";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components.v2/ui/carousel";

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
  } = useStockPicks();
  const { sector } = useTrackRecord();

  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isLatopbig = useMediaQuery("(max-width:1440px)");
  const isLatop = useMediaQuery("(max-width:1024px)");
  const isTab = useMediaQuery("(max-width:768px)");

  const updateButtonVisibility = () => {
    const containerWidth = containerRef.current.offsetWidth - 100;
    // const contentWidth = carouselRef.current.scrollWidth;
    // const scrollLeft = carouselRef.current.scrollLeft;
    // const maxScrollLeft = contentWidth - containerWidth;

    // Show the left button if the scroll position is greater than 0
    // setShowLeftButton(scrollLeft > 0);

    // Show the right button if the scroll position is less than the max scroll
    // setShowRightButton(scrollLeft < maxScrollLeft);
  };

  useLayoutEffect(() => {
    updateButtonVisibility();
  }, [strategyTag, popularStrategies]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     updateButtonVisibility();
  //   };

  //   const carousel = carouselRef.current;
  //   carousel.addEventListener("scroll", handleScroll);

  //   return () => {
  //     carousel.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

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
    // Check if the strategy with chipId has is_default set to 0
    const strategyToRemove = popularStrategies.find(
      (strategy) => strategy.id === chipId
    );

    if (strategyToRemove && strategyToRemove.is_default === 0) {
      // Remove strategy from popularStrategies
      removePopularStrategies(chipId);
    }

    await setStrategyTag(
      (prevTags) => prevTags.filter((id) => id !== chipId) // Remove the chipId from the array
    );
    setIsChangeFilter(true);
  };

  // const scrollLeft = () => {
  //   carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
  // };

  // const scrollRight = () => {
  //   carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
  // };

  // Sort popularStrategies to show selected ones first
  const sortedStrategies = [...(popularStrategies || [])].sort((a, b) => {
    const aSelected = strategyTag.includes(a.id);
    const bSelected = strategyTag.includes(b.id);
    return aSelected === bSelected ? 0 : aSelected ? -1 : 1;
  });

  return (<div className="bg-white">
    <div className="sm:w-[min(1280px,calc(100%-25px))] w-0 min-w-[328px] mx-auto sm:block hidden">
      <Box sx={{ display: "flex", width: "100%", overflow: "hidden" }} ref={containerRef}>
        <Box 
          sx={{
            width: "100%",
            backgroundColor: "#F2F4F7",
            // display: "flex",
            // alignItems: "center",
            paddingLeft: "20px",
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
          
          {/* {showLeftButton && (
            <IconButton
              onClick={scrollLeft}
              sx={{
                width: "28px",
                height: "28px",
                backgroundColor: "black",
                color: "white",
                borderRadius: "50%",
                position: "absolute",
                // top: "15px",
                left: isTab
                  ? "15%"
                  : isLatop
                  ? "11.8%"
                  : isLatopbig
                  ? "3%"
                  : "14%",
                //  left: "14%",
                zIndex: "9",
                "&:hover": {
                  backgroundColor: "#333", // Darker black on hover
                },
                display: { xs: "none", sm: "block" },
              }}
            >
              <ArrowBackIosIcon
                sx={{
                  width: "18px",
                  position: "absolute",
                  left: "8px",
                  top: "3px",
                }}
              />
            </IconButton>
          )} */}
          {/* <Box
            ref={carouselRef}
            sx={{
              display: "flex",
              gap: 1,
              overflowX: "auto",
              flex: 1,
              padding: "10px 24px",
              whiteSpace: "nowrap",
              "::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          > */}
          <div>

          <Carousel className=" py-[10px] relative flex items-center">
          <div className="w-auto sm:block hidden mr-[14px]">
            <p className="font-open_sans text-sm font-medium text-[#344054] whitespace-nowrap">Quick Filters:</p>
          </div>
            <CarouselContent opts={{containScroll:"trimSnaps"}}  className="flex justify-between pl-1">
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
                      paddingLeft: "8px",
                      paddingRight: "8px",
                      borderRadius: ".5rem !important",
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
        {/* {showRightButton && (
            <IconButton
              onClick={scrollRight}
              sx={{
                width: "28px",
                height: "28px",
                backgroundColor: "black",
                color: "white",
                borderRadius: "50%",
                position: "absolute",
                // top: "15px",
                right: isTab
                  ? "1%"
                  : isLatop
                  ? "2%"
                  : isLatopbig
                  ? "3%"
                  : "14%",

                "&:hover": {
                  backgroundColor: "#333", // Darker black on hover
                },
              }}
            >
              <ArrowForwardIosIcon sx={{ width: "18px" }} />
            </IconButton> */}
        {/* )} */}
        {/* </Box> */}
      </Box>
    </div>
  </div>
   
  );
};

export default FilterCarousel;
