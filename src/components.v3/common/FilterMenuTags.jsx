import React, { useState, useRef, useLayoutEffect } from "react";
import { Box, Chip, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import StrategyCheck from "./StrategyCheck";
import SectorSelect from "./SectorCheck";

const FilterCarousel = () => {
  const [selectedChips, setSelectedChips] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  // const isMobile = useMediaQuery("(max-width:600px)");
  const [chips, setChips] = useState([
    {
      label: "Most Recent",
      id: 1,
      originalIndex: 0,
      icon: "/assets/watch.svg",
    },
    {
      label: "Value Pick",
      id: 2,
      originalIndex: 1,
      icon: "/assets/Pricing.svg",
    },
    {
      label: "Market Leadership",
      id: 3,
      originalIndex: 2,
      icon: "/assets/leader.svg",
    },
    {
      label: "Thematic Stories",
      id: 4,
      originalIndex: 3,
      icon: "/assets/bulb.svg",
    },
    {
      label: "Chemicals",
      id: 5,
      originalIndex: 4,
      icon: "/assets/chamical.svg",
    },
    { label: "Pharma", id: 6, originalIndex: 5, icon: "/assets/pharma.svg" },
    { label: "Strategy", id: 7, originalIndex: 6 },
    // { label: "Sector", id: 8 ,originalIndex: 7,},
  ]);

  const carouselRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = carouselRef.current.scrollWidth;
    setShowButtons(contentWidth > containerWidth);
  }, [selectedChips, chips]);

  const handleChipClick = (chipId) => {
    const clickedChip = chips.find((chip) => chip.id === chipId);
    const isSelected = selectedChips.includes(chipId);

    if (isSelected) {
      handleChipDelete(chipId);
    } else {
      setSelectedChips([...selectedChips, chipId]);
      const remainingChips = chips.filter((chip) => chip.id !== chipId);
      setChips([clickedChip, ...remainingChips]);
    }
  };

  const handleChipDelete = (chipId) => {
    setSelectedChips(selectedChips.filter((id) => id !== chipId));
    const clickedChip = chips.find((chip) => chip.id === chipId);
    const remainingChips = chips.filter((chip) => chip.id !== chipId);

    // Insert the chip back at its original position
    const newChips = [...remainingChips];
    newChips.splice(clickedChip.originalIndex, 0, clickedChip);
    setChips(newChips);
  };

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

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
              backgroundColor: "#F0F0F0",
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
                  left: "10%",
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
              {chips.map((chip) => (
                <Chip
                  key={chip.id}
                  avatar={
                    <img
                      src={chip.icon}
                      alt={chip.label}
                      style={{
                        width: 14,
                        height: 14,
                        filter: selectedChips.includes(chip.id)
                          ? "invert(1)"
                          : "none",
                      }}
                    />
                  }
                  label={chip.label}
                  clickable
                  onClick={() => handleChipClick(chip.id)}
                  onDelete={
                    selectedChips.includes(chip.id)
                      ? () => handleChipDelete(chip.id)
                      : undefined
                  }
                  deleteIcon={
                    <CloseIcon
                      sx={{
                        color: selectedChips.includes(chip.id)
                          ? "white !important"
                          : "inherit",
                      }}
                    />
                  }
                  sx={{
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    borderRadius: "4px",
                    maxWidth: "179px !important",
                    height: "42px !important",
                    backgroundColor: selectedChips.includes(chip.id)
                      ? "#125b54"
                      : "white",
                    color: selectedChips.includes(chip.id)
                      ? "white"
                      : "inherit",
                    "&:hover": {
                      backgroundColor: selectedChips.includes(chip.id)
                        ? "#125b54"
                        : "#e7f8f8",
                    },
                    minWidth: "auto", // Ensure text is not truncated
                    whiteSpace: "nowrap", // Prevent text wrapping
                    overflow: "visible", // Ensure full visibility of text
                    display: "inline-flex", // Allow the chip to grow based on content
                  }}
                />
              ))}

              <StrategyCheck />
              <SectorSelect />
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
                  right: "10%",
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
