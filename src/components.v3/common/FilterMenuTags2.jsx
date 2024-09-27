import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Box, Chip, IconButton, useMediaQuery } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import StrategyCheck from "./StrategyCheck";
import SectorCheck from "./SectorCheck";
import CustomSortMenu from "./RadioDrop";
import DrawerFilter from "@/components.v3/common/DrawerFilter";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { useAllBoardStock } from "@/contexts/AllBoardStockContext";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components.v2/ui/carousel";

const FilterMenuTags2 = ({ isResponsive, isExpanded }) => {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const {
    popularStrategies,
    setStrategyTag,
    strategyTag,
    setIsChangeFilter,
    changablestrategyTags,
    removePopularStrategies,
  } = useStockPicks();

  const { sector } = useAllBoardStock();

  const carouselRef = useRef(null);
  const containerRef = useRef(null);

  const updateButtonVisibility = () => {
    if (!containerRef.current || !carouselRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = carouselRef.current.scrollWidth;
    const scrollLeft = carouselRef.current.scrollLeft;
    const maxScrollLeft = contentWidth - containerWidth;

    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < maxScrollLeft);
  };

  useLayoutEffect(() => {
    updateButtonVisibility();
  }, [strategyTag, popularStrategies]);

  useEffect(() => {
    const handleScroll = () => {
      updateButtonVisibility();
    };

    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.addEventListener("scroll", handleScroll);

    return () => {
      carousel.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  // Sort popularStrategies to show selected ones first
  const sortedStrategies = [...(popularStrategies || [])].sort((a, b) => {
    const aSelected = strategyTag.includes(a.id);
    const bSelected = strategyTag.includes(b.id);
    return aSelected === bSelected ? 0 : aSelected ? -1 : 1;
  });

  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className={`mr-auto sm:order-first order-2 transition-all duration-500 ease-linear overflow-x-scroll   ${
        isExpanded ? "lg:w-[58%]" : "lg:w-[74%]"
      }`}
    >
      <div className="sm:w-[min(1280px,calc(100%-32px))] w-full  min-w-[328px] lg:w-[100%]">
        <Box
          sx={{
            // display: "flex",
            width: isMobile ? "100%" : "100%",
            overflow: { sm: "hidden", xs: "auto" },
          }}
          ref={containerRef}
        >
          <Box
            sx={{
              width: "100%",
              backgroundColor: isMobile ? "transparent" : "#f2f4f7",
              // display: "flex",
              // alignItems: "center",
            }}
          >
          <Carousel className="">
          <CarouselContent opts={{containScroll:"trimSnaps"}}  className="flex justify-between  pl-2">
            {/* left side arrow  */}
            {/* {showLeftButton && (
              <div className="sm:bg-transparent bg-custom-gradient-arrow-left sm:w-10 sm:h-12 w-0 h-0 justify-center flex items-center relative mt-1 right-[-11px] z-[1]">
                <IconButton
                  onClick={scrollLeft}
                  sx={{
                    width: "28px",
                    height: "28px",
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "50%",
                    top: "-2px",
                    right: "12px",
                    "&:hover": {
                      backgroundColor: "#333", // Darker black on hover
                    },
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  <ArrowBackIosIcon
                    sx={{
                      width: "12px",
                      position: "absolute",
                      left: "10px",
                      top: "1.5px",
                    }}
                  />
                </IconButton>
              </div>
            )}
            <Box
              ref={carouselRef}
              sx={{
                display: "flex",
                gap: 1,
                overflowX: "auto",
                flex: 1,
                padding: "0px",
                whiteSpace: "nowrap",
                "::-webkit-scrollbar": { display: "none" },
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            > */}
              
              {isResponsive && (
                <>
                <CarouselItem className="basis-auto pl-2 "> <CustomSortMenu
                    sx={{
                      padding: isMobile ? "6px 11px" : "10px 11px",
                    }}
                  />
                  </CarouselItem>
                  {/* <ResCustomSort
                    sx={{
                      padding: isMobile ? "6px 11px" : "10px 11px",
                      display: isMobile ? "none" : "block",
                    }}
                  /> */}
                  <CarouselItem className="basis-auto pl-2">
                  <DrawerFilter />
                  </CarouselItem>
                </>
              )}
              {changablestrategyTags.length > 0 && <CarouselItem className="basis-auto pl-2"><StrategyCheck /></CarouselItem>}
              {sector.length > 0 && <CarouselItem className="basis-auto pl-2"><SectorCheck /></CarouselItem>}
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
                          strategyTag.includes(chip.id) &&
                          chip.id == "most-recent"
                            ? "brightness(100)"
                            : "none",
                      }}
                    />
                  }
                  label={chip.name}
                  clickable
                  onClick={() => handleChipClick(chip.id)}
                  onDelete={
                    strategyTag.includes(chip.id)
                      ? () => handleChipDelete(chip.id)
                      : undefined
                  }
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
                    backgroundColor: strategyTag.includes(chip.id)
                      ? "#125b54"
                      : "white",
                    color: strategyTag.includes(chip.id) ? "white" : "inherit",
                    "&:hover": {
                      backgroundColor: strategyTag.includes(chip.id)
                        ? "#125b54"
                        : "#e7f8f8",
                      transform: "scale(000.95)", // Adjust the scale value as needed
                      transition: "transform 0.3s ease", // Optional: Add transition for smooth scaling
                    },
                    minWidth: "auto", // Ensure text is not truncated
                    whiteSpace: "nowrap", // Prevent text wrapping
                    overflow: "visible", // Ensure full visibility of text
                    display: "inline-flex", // Allow the chip to grow based on content
                    fontSize:"14px",
                    fontWeight:500
                  }}
                />
                </CarouselItem>
              ))}
              {changablestrategyTags.length <= 0 &&<CarouselItem className="basis-auto pl-2"><StrategyCheck /></CarouselItem> }
              {sector.length <= 0 &&<CarouselItem className="basis-auto pl-2"> <SectorCheck /></CarouselItem>}
            {/* </Box> */}

            {/* {!isMobile ? (
              <>
                {showRightButton && (
                  <div className="sm:bg-transparent bg-custom-gradient-arrow-right sm:w-10 sm:h-12 w-0 h-0  justify-center flex items-center relative right-[2%] mt-1">
                    <IconButton
                      onClick={scrollRight}
                      sx={{
                        width: "28px",
                        height: "28px",
                        backgroundColor: "black",
                        color: "white",
                        right: "-14%",
                        top: "-2px",
                        borderRadius: "50%",

                        "&:hover": {
                          backgroundColor: "#333", // Darker black on hover
                        },
                      }}
                    >
                      <ArrowForwardIosIcon
                        sx={{ width: "12px", position: "absolute" }}
                      />
                    </IconButton>
                  </div>
                )}
              </>
            ) : (
              <></>
            )} */}
            </CarouselContent>
            <CarouselPrevious className=" h-7 w-7 p-1 left-[0px] top-[50%] disabled:hidden border-none focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-black  hover:text-white   bg-black text-white shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
            <CarouselNext className=" h-7 w-7 p-1 right-[24px] top-[50%] disabled:hidden border-none  focus-visible:ring-0 focus-visible:ring-offset-0  bg-black text-white hover:bg-black  hover:text-white shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
            </Carousel>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default FilterMenuTags2;
