import React, { useState, useRef, useLayoutEffect } from "react";
import { Box, Chip, IconButton, useMediaQuery } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import StrategyCheck from "./StrategyCheck";
import SectorCheck from "./SectorCheck";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { useAllBoardStock } from "@/contexts/AllBoardStockContext";

const FilterCarousel = () => {
  const [showButtons, setShowButtons] = useState(false);
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
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTab = useMediaQuery("(max-width:768px)");

  useLayoutEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = carouselRef.current.scrollWidth;
    setShowButtons(contentWidth > containerWidth);
  }, [strategyTag, popularStrategies]);

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
    <div className="bg-white">
      <div className="w-[min(1280px,calc(100%-25px))] min-w-[328px] mx-auto sm:block hidden">
        <Box
          sx={{ display: "flex", width: "100%", overflow: "hidden" }}
          ref={containerRef}
        >
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#F2F4F7",
              display: "flex",
              alignItems: "center",
              paddingLeft: "20px",
              paddingRight: "20px",
              // paddingLeft: isMobile ? "20px" : "16px",
              paddingTop: "10px",
              paddingBottom: "10px",
              marginTop: "16px",
              marginBottom: "16px",
              borderRadius: "6px",
            }}
          >
            <div className="w-auto sm:block hidden">
              <p className="font-open_sans text-sm font-normal text-[#344054]">
                Quick Filters:
              </p>
            </div>
            {showButtons && (
              <IconButton
                onClick={scrollLeft}
                sx={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "50%",
                  position: "absolute",
                  left: "14%",
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
            )}
            <Box
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
            >
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
                    borderRadius: ".5rem !important",
                    borderRadius: isMobile ? "6px" : "4px",
                    maxWidth: "179px !important",
                    height: "38px !important",
                    border: "1px solid #E4E7EC ",
                    fontFamily: "Open Sans",
                    // borderColor: " #E4E7EC !important ",
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
            {showButtons && (
              <IconButton
                onClick={scrollRight}
                sx={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "50%",
                  position: "absolute",
                  right: "14%",

                  "&:hover": {
                    backgroundColor: "#333", // Darker black on hover
                  },
                }}
              >
                <ArrowForwardIosIcon sx={{ width: "18px" }} />
              </IconButton>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default FilterCarousel;
