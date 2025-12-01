import React, { useState, useRef, useLayoutEffect, useCallback, useMemo } from "react";
import { Box, Chip, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import StrategyCheck from "./StrategyCheck";
import SectorSelect from "./SectorCheck";

// Move static data outside component to prevent recreation on every render
const chips = [
  { label: "Most Recent", id: 1 },
  { label: "Value Pick", id: 2 },
  { label: "Market Leadership", id: 3 },
  { label: "Thematic Stories", id: 4 },
  { label: "Chemicals", id: 5 },
  { label: "Pharma", id: 6 },
];

// Extract static styles to prevent object recreation
const containerBoxSx = {
  display: "flex",
  width: "1280px",
  overflow: "hidden",
};

const backgroundBoxSx = {
  width: "100%",
  backgroundColor: "#F0F0F0",
  display: "flex",
  alignItems: "center",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "10px",
  paddingBottom: "10px",
  marginTop: "16px",
  marginBottom: "16px",
  borderRadius: "6px",
};

const carouselBoxSx = {
  display: "flex",
  gap: 1,
  overflowX: "auto",
  flex: 1,
  padding: "10px 0",
  whiteSpace: "nowrap",
  "::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
};

const chipSx = {
  borderRadius: "4px",
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: "16px",
  paddingRight: "16px",
  height: "42px !important",
};

const FilterCarousel = () => {
  const [selectedChips, setSelectedChips] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  // Memoize handlers to prevent recreation on every render
  const handleChipClick = useCallback((chipId) => {
    setSelectedChips((prev) => {
      if (prev.includes(chipId)) {
        return prev.filter((id) => id !== chipId);
      } else {
        return [...prev, chipId];
      }
    });
  }, []);

  const handleChipDelete = useCallback((chipId) => {
    setSelectedChips((prev) => prev.filter((id) => id !== chipId));
  }, []);

  const scrollLeft = useCallback(() => {
    carouselRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  }, []);

  const scrollRight = useCallback(() => {
    carouselRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  }, []);

  useLayoutEffect(() => {
    // Check if the total width of the chips exceeds the container width
    const containerWidth = containerRef.current?.offsetWidth;
    const contentWidth = carouselRef.current?.scrollWidth;
    if (contentWidth > containerWidth) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [selectedChips]); // Removed 'chips' from dependencies since it's now static
  // Memoize chip elements to prevent unnecessary re-renders
  const chipElements = useMemo(
    () =>
      chips.map((chip) => (
        <Chip
          key={chip.id}
          label={chip.label}
          clickable
          onClick={() => handleChipClick(chip.id)}
          onDelete={selectedChips.includes(chip.id) ? () => handleChipDelete(chip.id) : undefined}
          deleteIcon={<CloseIcon />}
          color={selectedChips.includes(chip.id) ? "primary" : "default"}
          sx={chipSx}
        />
      )),
    [selectedChips, handleChipClick, handleChipDelete]
  );

  return (
    <div className="bg-white ">
      <div className="w-[min(1280px,calc(100%-25px))] min-w-[328px] mx-auto">
        <Box sx={containerBoxSx} ref={containerRef}>
          {/* Background Box */}
          <Box sx={backgroundBoxSx}>
            <div className="w-auto items-center flex">
              <p className="font-open_sans text-sm font-normal text-[#344054]">Quick Filters:</p>
            </div>
            {/* Carousel Slider */}
            {showButtons && (
              <IconButton onClick={scrollLeft}>
                <ArrowBackIosIcon />
              </IconButton>
            )}
            <Box ref={carouselRef} sx={carouselBoxSx}>
              {chipElements}
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

// Wrap in React.memo to prevent unnecessary re-renders
export default React.memo(FilterCarousel);
