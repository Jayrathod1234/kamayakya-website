// src/contexts/StockPicksContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useDebounce } from "@/utils/deBounceSearch";
import { initialFilterTime } from "@/utils/constants.js";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllBoardStockStockListApi } from "@/api/stock-picks";
import AuthContext from "@/components/AuthContext";

// Create Context
const AllBoardStockContext = createContext();

export const AllBoardStockProvider = ({ children }) => {
  const {
    setStrategyTag,
    isChangeFilter,
    setIsChangeFilter,
    strategyTag,
    min_upside_left,
    max_upside_left,
    sebiBoardType,
    min_returns,
    max_returns,
    changablestrategyTags,
  } = useStockPicks();

  const { isLoggedIn } = useContext(AuthContext);

  // State Management
  const [searchStock, setSearchStock] = useState("");
  const debouncedSearchStock = useDebounce(searchStock, 1000); // Apply debouncing
  const [sortBy, setSortBy] = useState("upside_left");
  const [sortValue, setSortValue] = useState("desc");
  const [recency, setRecency] = useState(initialFilterTime);
  const [timeLeft, setTimeLeft] = useState(initialFilterTime);
  const [sector, setSector] = useState([]);
  const [upsideLeft, setUpsideLeft] = useState([]);
  const [returns, setReturns] = useState([]);
  const [marketCapType, setMarketCapType] = useState([]);
  const [risk, setRisk] = useState([]);
  const [totalFilterCount, setTotalFilterCount] = useState(0);
  // Sidebar right side
  const [open, setOpen] = useState(false);

  /** Total filter count logic */
  const getFilterCount = () =>
    (upsideLeft[0] === min_upside_left && upsideLeft[1] === max_upside_left
      ? 0
      : 1) +
    (returns[0] === min_returns && returns[1] === max_returns ? 0 : 1) +
    Object.keys(recency).filter((key) => recency[key]).length +
    Object.keys(timeLeft).filter((key) => timeLeft[key]).length +
    sector.length +
    changablestrategyTags.length +
    marketCapType.length +
    risk.length;

  useEffect(() => {
    setUpsideLeft([min_upside_left, max_upside_left]);
  }, [min_upside_left, max_upside_left]);

  // Update upsideLeft whenever min_returns or max_returns change
  useEffect(() => {
    setReturns([min_returns, max_returns]);
  }, [min_returns, max_returns]);

  const handleApplyFilters = () => {
    setIsChangeFilter(true);
    refetch(); // Refetch data with the new applied filters
  };

  useEffect(() => {
    if (isChangeFilter) {
      // Call the API
      refetch(); // Assuming `refetch` is your API call function
      setTotalFilterCount(getFilterCount());
      setIsChangeFilter(false);
    }
  }, [changablestrategyTags, isChangeFilter]); // Include `source` in the dependency array

  const handleResetFilters = async () => {
    await setRecency(initialFilterTime);
    await setTimeLeft(initialFilterTime);
    await setUpsideLeft([min_upside_left, max_upside_left]);
    await setReturns([min_returns, max_returns]);
    await setMarketCapType("");
    await setRisk([]);
    await setSector([]);
    await setStrategyTag([]);
    // setOpen(false);
    setTotalFilterCount(0);
    refetch(); // Optionally refetch data with reset filters (if appliedFilters reset)
  };

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
        isLoggedIn,
      },
    ],
    queryFn: ({ pageParam = 1 }) =>
      getAllBoardStockStockListApi({
        params: {
          page: pageParam,
          limit: 9,
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
  return (
    <AllBoardStockContext.Provider
      value={{
        searchStock,
        setSearchStock,
        setSortBy,
        setSortValue,
        recency,
        setRecency,
        timeLeft,
        setTimeLeft,
        sector,
        setSector,
        upsideLeft,
        setUpsideLeft,
        returns,
        setReturns,
        marketCapType,
        setMarketCapType,
        risk,
        setRisk,
        totalFilterCount,
        handleResetFilters,
        handleApplyFilters,
        response,
        isLoading,
        error,
        fetchNextPage,
        refetch,
      }}
    >
      {children}
    </AllBoardStockContext.Provider>
  );
};

export default AllBoardStockContext;

export const useAllBoardStock = () => useContext(AllBoardStockContext);
