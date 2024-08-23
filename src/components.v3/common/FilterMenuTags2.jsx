import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Box, Chip, IconButton, useMediaQuery } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import StrategyCheck from "./StrategyCheck";
import SectorSelect from "./SectorCheck";
import CustomSortMenu from "./RadioDrop";
import DrawerFilter from "@/components.v3/common/DrawerFilter";
import ResCustomSort from "./ResCustomSort";
const FilterMenuTags2 = ({
  min_upside_left,
  max_upside_left,
  setSortValue,
  setSortBy,
  recency,
  setRecency,
  timeLeft,
  setTimeLeft,
  handleApplyFilters,
  handleResetFilters,
  upsideLeft,
  setUpsideLeft,
  min_returns,
  max_returns,
  returns,
  setReturns,
  marketCapTypeList,
  marketCapType,
  setMarketCapType,
  stockRiskList,
  risk,
  setRisk,
  stockSector,
  sector,
  setSector,
  strategyTagList,
  strategyTag,
  setStrategyTag,
  totalFilterCount,
  isResponsive,
}) => {
  const [selectedChips, setSelectedChips] = useState([]);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState(false);

  const [chips, setChips] = useState([
    {
      label: "Most Recenttttttt",
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
  }, [selectedChips, chips]);

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
    <div className="mr-auto sm:order-first order-2">
      <div className="w-[min(1280px,calc(100%-25px))] min-w-[328px]">
        <Box
          sx={{
            display: "flex",
            width: "757px",
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
              <IconButton
                onClick={scrollLeft}
                sx={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "50%",
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

                  <DrawerFilter
                    open={open}
                    setOpen={setOpen}
                    recency={recency}
                    setRecency={setRecency}
                    timeLeft={timeLeft}
                    setTimeLeft={setTimeLeft}
                    handleApplyFilters={handleApplyFilters}
                    handleResetFilters={handleResetFilters}
                    min_upside_left={min_upside_left}
                    max_upside_left={max_upside_left}
                    upsideLeft={upsideLeft}
                    setUpsideLeft={setUpsideLeft}
                    min_returns={min_returns}
                    max_returns={max_returns}
                    returns={returns}
                    setReturns={setReturns}
                    marketCapTypeList={marketCapTypeList}
                    marketCapType={marketCapType}
                    setMarketCapType={setMarketCapType}
                    stockRiskList={stockRiskList}
                    risk={risk}
                    setRisk={setRisk}
                    stockSector={stockSector}
                    sector={sector}
                    setSector={setSector}
                    strategyTagList={strategyTagList}
                    strategyTag={strategyTag}
                    setStrategyTag={setStrategyTag}
                    totalFilterCount={totalFilterCount}
                  />
                </>
              )}

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
                    // borderRadius: "4px",
                    borderRadius: isMobile ? "6px" : "4px",
                    maxWidth: "179px !important",
                    height: "42px !important",
                    border: "1px solid #E4E7EC ",
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
            {showRightButton && (
              <IconButton
                onClick={scrollRight}
                sx={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "black",
                  color: "white",
                  right: "2%",
                  borderRadius: "50%",
                  "&:hover": {
                    backgroundColor: "#333", // Darker black on hover
                  },
                }}
              >
                <ArrowForwardIosIcon
                  sx={{ width: "18px", position: "absolute" }}
                />
              </IconButton>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default FilterMenuTags2;
