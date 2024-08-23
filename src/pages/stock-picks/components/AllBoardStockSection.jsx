import React, { useContext, useEffect, useRef, useState } from "react";
import StockCard from "@/components.v3/common/StockCard.jsx";
import InvestmentSection from "@/pages/stock-picks/components/InvestmentSection";
import ElevateSection from "@/pages/stock-picks/components/ElevateSection";
import FilterMenuTags from "@/components.v3/common/FilterMenuTags.jsx";
import { Slider, styled } from "@mui/material";
import Filtermenu from "@/components.v3/common/Filtermenu.jsx";
import CustomSortMenu from "../../../components.v3/common/RadioDrop";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import AuthContext from "@/components/AuthContext";
import { getAllBoardStockStockListApi } from "@/api/stock-picks";
import StockCardSkeleton from "./skeletons/StockCardSkeleton";
import { onScrollPaginationFunction } from "@/utils/onScrollPaginationFunction";
import { useDebounce } from "../../../utils/deBounceSearch";
import DrawerFilter from "@/components.v3/common/DrawerFilter";
import { initialFilterTime } from "@/utils/constants.js";
import ResponsiveFilter from "../../../components.v3/common/ResponsiveFilter";

function AllBoardStockSection({
  sebiBoardType,
  stockSector,
  min_upside_left,
  max_upside_left,
  min_returns,
  max_returns,
  marketCapTypeList,
  strategyTagList,
  stockRiskList,
  strategyTag,
  setStrategyTag,
  isChangeStrategyTag,
  setIsChangeStrategyTag,
}) {
  const { isLoggedIn } = useContext(AuthContext);
  const [searchStock, setSearchStock] = useState("");
  const debouncedSearchStock = useDebounce(searchStock, 1000); // Apply debouncing
  const [sortBy, setSortBy] = useState("upside_left");
  const [sortValue, setSortValue] = useState("desc");
  const [recency, setRecency] = useState(initialFilterTime);
  const [timeLeft, setTimeLeft] = useState(initialFilterTime);
  const [sector, setSector] = useState([]);
  const [upsideLeft, setUpsideLeft] = useState([
    min_upside_left,
    max_upside_left,
  ]);
  const [returns, setReturns] = useState([min_returns, max_returns]);
  const [marketCapType, setMarketCapType] = useState("");
  const [risk, setRisk] = useState("");
  const [totalFilterCount, setTotalFilterCount] = useState(0);

  // Update upsideLeft whenever min_upside_left or max_upside_left change
  useEffect(() => {
    setUpsideLeft([min_upside_left, max_upside_left]);
  }, [min_upside_left, max_upside_left]);

  // Update upsideLeft whenever min_returns or max_returns change
  useEffect(() => {
    setReturns([min_returns, max_returns]);
  }, [min_returns, max_returns]);

  const handleApplyFilters = () => {
    setTotalFilterCount(getFilterCount());
    refetch(); // Refetch data with the new applied filters
  };

  /** Total filter count logic */
  const getFilterCount = () =>
    (upsideLeft[0] === min_upside_left && upsideLeft[1] === max_upside_left
      ? 0
      : 1) +
    (returns[0] === min_returns && returns[1] === max_returns ? 0 : 1) +
    Object.keys(recency).filter((key) => recency[key]).length +
    Object.keys(timeLeft).filter((key) => timeLeft[key]).length +
    sector.length +
    strategyTag.length +
    (marketCapType ? 1 : 0) +
    (risk ? 1 : 0);

  useEffect(() => {
    if (isChangeStrategyTag) {
      // Call the API
      refetch(); // Assuming `refetch` is your API call function
      setTotalFilterCount(getFilterCount());
      setIsChangeStrategyTag(false);
    }
  }, [strategyTag, isChangeStrategyTag]); // Include `source` in the dependency array

  const handleResetFilters = async () => {
    await setRecency(initialFilterTime);
    await setTimeLeft(initialFilterTime);
    await setUpsideLeft([min_upside_left, max_upside_left]);
    await setReturns([min_returns, max_returns]);
    await setMarketCapType("");
    await setRisk("");
    await setSector([]);
    await setStrategyTag([]);
    setOpen(false);
    setTotalFilterCount(getFilterCount());
    refetch(); // Optionally refetch data with reset filters (if appliedFilters reset)
  };

  const myObserver = useRef();
  // Use react infinite query to fetch the list
  const {
    data: response = [],
    isLoading,
    error,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [
      "allBoardStockStock",
      {
        sebiBoardType,
        sortBy,
        sortValue,
        debouncedSearchStock,
      },
    ],
    queryFn: ({ pageParam = 1 }) =>
      getAllBoardStockStockListApi({
        params: {
          page: pageParam,
          limit: 6,
          isLoggedIn,
          type: sebiBoardType,
        },
        body: {
          search: debouncedSearchStock,
          sort_by: sortBy,
          sort_value: sortValue,
          recency_time: Object.keys(recency).filter((key) => recency[key]),
          time_left_with_time: Object.keys(timeLeft).filter(
            (key) => timeLeft[key]
          ),
          upside_left_range: {
            min: upsideLeft[0],
            max: upsideLeft[1],
          },
          total_returns_with_range: {
            min: returns[0],
            max: returns[1],
          },
          market_cap_type: marketCapType,
          risk,
          sector,
          strategy_tags: strategyTag,
        },
      }),
    getNextPageParam: ({ total_pages, current_page }) => {
      // Function to determine the parameter for fetching the next page
      if (total_pages > current_page) return current_page + 1 ?? false; // Return the nextPage parameter if available, otherwise false
    },
  });

  const items = response?.pages?.flatMap((page) => page.data) ?? [];

  // Scroll Function
  useEffect(() => {
    // Start observing the element referenced by observerElem.current
    if (myObserver.current) {
      onScrollPaginationFunction(fetchNextPage).observe(myObserver.current);
    }
    // Clean up function to stop observing when component unmounts
    return () => {
      if (myObserver.current) {
        onScrollPaginationFunction(fetchNextPage).unobserve(myObserver.current);
      }
    };
  }, [fetchNextPage]);

  // Handle search input change
  const handleSearchStock = (e) => {
    setSearchStock(e.target.value);
  };

  // Sidebar right side
  const [open, setOpen] = useState(false);
  // sticky header

  const filterHeaderRef = useRef(null);
  const xyzRef = useRef(null);
  const [showFilterHeader, setShowFilterHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (xyzRef.current) {
        const rect = xyzRef.current?.getBoundingClientRect();
        setShowFilterHeader(rect.top <= 110);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // upside left
  const [value, setValue] = React.useState([25, 115]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  const CustomSlider = styled(Slider)({
    color: "#004d40", // Main color for the rail and thumb border
    height: 4, // Thickness of the slider rail
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:hover": {
        boxShadow: "0 0 0 8px rgba(0, 77, 64, 0.16)", // Light shadow on hover
      },
      "&:focus, &:active": {
        boxShadow: "0 0 0 14px rgba(0, 77, 64, 0.16)", // Larger shadow on active or focus
      },
    },
    "& .MuiSlider-rail": {
      color: "#004d40",
      opacity: 1,
    },
    "& .MuiSlider-track": {
      border: "none",
    },
  });
  return (
    <>
      <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto">
        <p className="text-display-xs text-gray-950 font-bold font-open_sans text-center sm:pb-10 pb-4">
          All Mainboard Stocks
        </p>
      </div>
      <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full">
            <form>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white ml-2 shadow-3xs"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none gap-2">
                  <img src="/assets/search.svg" alt="" />
                </div>
                <input
                  type="search"
                  name="search-stock"
                  id="default-search"
                  className="block w-full pr-[14px] pl-9 py-[12px] text-md text-gray-900 border border-[#E4E7EC] rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 shadow-3xs"
                  placeholder="Search Stocks..."
                  value={searchStock}
                  onChange={handleSearchStock}
                />
              </div>
            </form>
          </div>
          <div className="flex gap-4 ">
            <div className="w-auto sm:block hidden">
              <div className="relative flex gap-4">
                <CustomSortMenu
                  setSortValue={setSortValue}
                  setSortBy={setSortBy}
                  isLabel={true}
                />
              </div>
            </div>
          </div>
          <div className="w-auto sm:block hidden bg-white ">
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
      {/* filter menu code not delete -nehakikani */}
      {/* main filter  */}
      {!showFilterHeader ? (
        <>
          {/* <Filtermenu2 /> */}
          <ResponsiveFilter
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
          <FilterMenuTags />
        </>
      ) : (
        <>
          <Filtermenu
            setSortValue={setSortValue}
            setSortBy={setSortBy}
            ref={filterHeaderRef}
            recency={recency}
            setRecency={setRecency}
            handleApplyFilters={handleApplyFilters}
            handleResetFilters={handleResetFilters}
            min_upside_left={min_upside_left}
            max_upside_left={max_upside_left}
            role="banner"
            aria-hidden={!showFilterHeader}
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
      {/* <FilterCarousel /> */}
      {/* <Filtermenu2 /> */}
      {/* sticky filtermenu */}

      {/* blur card  */}
      <div
        className=" bg-[#F2F4F7] py-10 sm:px-20 px-0 relative sm:overflow-visible overflow-hidden "
        ref={xyzRef}
      >
        <div className="w-[min(1280px,calc(100%-32px))]  mx-auto">
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-7">
            {isLoading || error ? (
              <StockCardSkeleton length={9} />
            ) : items.length > 0 ? (
              items.map((value, index) => (
                <StockCard
                  key={index} // Ensure each item has a unique key
                  {...value}
                  stockSector={stockSector}
                />
              ))
            ) : (
              <>
                <div></div>
                <div className="text-center">No stock found</div>
              </>
            )}
          </div>
          <div ref={myObserver} className="h-1"></div>
          {/* Blur Rectangle  */}
          {/* <div className="absolute bottom-[440px] z-[1] max-h-[400px] w-full">
            <img
              src="/assets/Rectangle.png"
              alt=""
              className="max-h-[400px] w-full"
            />
          </div> */}
          <div className="mt-11 mb-16">
            <InvestmentSection />
          </div>
          <ElevateSection />
        </div>
      </div>
    </>
  );
}

export default AllBoardStockSection;
