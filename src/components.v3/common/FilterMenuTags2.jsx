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
      <div className="sm:w-[min(1280px,calc(100%-25px))] w-full  min-w-[328px] lg:w-[100%]">
        <Box
          sx={{
            display: "flex",
            width: isMobile ? "100%" : "100%",
            // width: "757px",
            overflow: { sm: "hidden", xs: "auto" },
          }}
          ref={containerRef}
        >
          <Box
            sx={{
              width: "100%",
              // backgroundColor: "#f2f4f7",
              backgroundColor: isMobile ? "transparent" : "#f2f4f7",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* left side arrow  */}
            {showLeftButton && (
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
            >
              {isResponsive && (
                <>
                  <CustomSortMenu
                    sx={{
                      padding: isMobile ? "6px 11px" : "10px 11px",
                    }}
                  />
                  {/* <ResCustomSort
                    sx={{
                      padding: isMobile ? "6px 11px" : "10px 11px",
                      display: isMobile ? "none" : "block",
                    }}
                  /> */}

                  <DrawerFilter />
                </>
              )}
              {changablestrategyTags.length > 0 && <StrategyCheck />}
              {sector.length > 0 && <SectorCheck />}
              {sortedStrategies?.map((chip) => (
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
                        color: strategyTag.includes(chip.id)
                          ? "white !important"
                          : "inherit",
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
                  }}
                />
              ))}
              {changablestrategyTags.length <= 0 && <StrategyCheck />}
              {sector.length <= 0 && <SectorCheck />}
            </Box>

            {!isMobile ? (
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
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default FilterMenuTags2;
