import React, { useContext, useEffect, useRef, useState } from "react";
import CustomSortMenu from './RadioDrop'

import FilterMenuTags2 from './FilterMenuTags2'
import DrawerFilter from "@/components.v3/common/DrawerFilter";
import AuthContext from "@/components/AuthContext";
import { useDebounce } from "../../utils/deBounceSearch";
import { initialFilterTime } from "@/utils/constants.js";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, styled } from "@mui/material";
import { Slider} from "@mui/material";

function ResponsiveFilter({
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
}) {const { isLoggedIn } = useContext(AuthContext);
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
  // enabled: !!searchStock,
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
      <div className="sm:hidden block">
        <Box
          sx={{
            display: "flex",
            width: "375px",
            overflow: "hidden",
            bgcolor: "red",
          }}
        >
          <Box className="w-[min(1280px,calc(100%-25px))] min-w-[328px] mx-auto  py-[10px] px-0 flex gap-1 items-center pt-4">
            <CustomSortMenu />

            {/* <div className="w-auto sm:block hidden"> */}
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
            {/* </div> */}

            <FilterMenuTags2 />
          </Box>
          {/* </div> */}
        </Box>
      </div>
    </>
  );
}

export default ResponsiveFilter