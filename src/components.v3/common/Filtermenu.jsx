import React, { useEffect, useRef, useState } from "react";
import DrawerFilter from "@/components.v3/common/DrawerFilter";
import CustomSortMenu from "../common/RadioDrop.jsx";
import FilterMenuTags2 from "./FilterMenuTags2.jsx";

function Filtermenu({
  Filtermenu,
  FiltermenuSidebar,
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
}) {
  // Sidebar right side
  const [open, setOpen] = useState(false);
  // sticky header
  const xyzRef = useRef(null);
  const [showFilterHeader, setShowFilterHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (xyzRef.current) {
        const rect = xyzRef.current?.getBoundingClientRect();
        setShowFilterHeader(rect.top <= 0);
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  function debounce(func, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const formRef = useRef(null);

  // Function to handle click on the search button
  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // Focus the input when it expands
      setTimeout(() => inputRef.current.focus(), 300);
    }
  };

  return (
    <>
      {/* <FilterMenuTags /> */}
      <div className="sticky top-[50px] right-0 z-[88] bg-[#f2f4f7] ">
        <div className="w-[min(1280px,calc(100%-25px))] min-w-[328px] mx-auto  py-[10px] px-0 flex gap-1 items-center justify-between pt-4">
          {/* Import FilterMenuTag here */}

          {/* <FilterMenuTagsdummy /> */}
          <FilterMenuTags2 />

          <div className="flex gap-[10px] items-center">
            <form
              ref={formRef}
              className={`search inline-flex items-center text-black px-1 py-[3px] rounded-md border border-[#E4E7EC] transition linear bg-white focus:border-red-800 ${
                isExpanded ? "w-full" : "w-auto"
              }`}
            >
              <input
                type="text"
                placeholder="Search Stocks by Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                onBlur={() => {
                  if (!search) setIsExpanded(false);
                }}
                ref={inputRef}
                className={`search__input transition-width duration-300 ${
                  isExpanded ? "w-full px-2" : "w-0"
                }`}
              />
              <button
                type="button"
                onClick={handleSearchClick}
                className="search__button grid place-items-center w-[35px] h-[35px] cursor-pointer transition-colors duration-[0.25s] hover:text-[#e3e3e3] bg-[rgba(0, 0, 0, 0.1)] rounded-full "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                    stroke="#667085"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>
          <CustomSortMenu
            setSortValue={setSortValue}
            setSortBy={setSortBy}
            isLabel={false}
          />
          <div className="w-auto">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Filtermenu;
