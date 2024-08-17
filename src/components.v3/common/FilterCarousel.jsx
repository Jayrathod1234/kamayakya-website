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
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const chips = [
    { label: "Most Recent", id: 1 },
    { label: "Value Pick", id: 2 },
    { label: "Market Leadership", id: 3 },
    { label: "Thematic Stories", id: 4 },
    { label: "Chemicals", id: 5 },
    { label: "Pharma", id: 6 },
  ];
  useLayoutEffect(() => {
    // Check if the total width of the chips exceeds the container width
    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = carouselRef.current.scrollWidth;
    if (contentWidth > containerWidth) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [selectedChips, chips]);
  const handleChipClick = (chipId) => {
    if (selectedChips.includes(chipId)) {
      setSelectedChips(selectedChips.filter((id) => id !== chipId));
    } else {
      setSelectedChips([...selectedChips, chipId]);
    }
  };
  const handleChipDelete = (chipId) => {
    setSelectedChips(selectedChips.filter((id) => id !== chipId));
  };
  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };
  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };
  return (
    <div className="bg-white ">
      <div className="w-[min(1280px,calc(100%-25px))] min-w-[328px] mx-auto">
        <Box
          sx={{ display: "flex", width: "1280px", overflow: "hidden" }}
          ref={containerRef}
        >
          {/* Background Box */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#F0F0F0", // Adjust the color as needed
              display: "flex",
              alignItems: "center",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
              marginTop: "16px",
              marginBottom: "16px",
              borderRadius: "6px",
            }}
          >
            <div className="w-auto items-center flex">
              <p className="font-open_sans text-sm font-normal text-[#344054]">
                Quick Filters:
              </p>
            </div>
            {/* Carousel Slider */}
            {showButtons && (
              <IconButton onClick={scrollLeft}>
                <ArrowBackIosIcon />
              </IconButton>
            )}
            <Box
              ref={carouselRef}
              sx={{
                display: "flex",
                gap: 1,
                overflowX: "auto",
                flex: 1,
                padding: "10px 0",
                whiteSpace: "nowrap", // Ensure chips stay on one line
                "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
                msOverflowStyle: "none", // Hide scrollbar in IE and Edge
                scrollbarWidth: "none", // Hide scrollbar in Firefox
              }}
            >
              {chips.map((chip) => (
                <Chip
                  key={chip.id}
                  label={chip.label}
                  clickable
                  onClick={() => handleChipClick(chip.id)}
                  onDelete={
                    selectedChips.includes(chip.id)
                      ? () => handleChipDelete(chip.id)
                      : undefined
                  }
                  deleteIcon={<CloseIcon />}
                  color={
                    selectedChips.includes(chip.id) ? "primary" : "default"
                  }
                  sx={{
                    borderRadius: 0,
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    borderRadius: "4px",
                    height: "42px !important",
                  }}
                />
              ))}
              <StrategyCheck />
              <SectorSelect />
            </Box>
            {showButtons && (
              <IconButton onClick={scrollRight}>
                <ArrowForwardIosIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
};
export default FilterCarousel;
