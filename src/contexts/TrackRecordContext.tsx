import { useDebounce } from "@/utils/deBounceSearch";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import AuthContext from "@/components/AuthContext";
import { initialFilterTime } from "@/utils/constants";
import { getAllTrackRecordStockListApi } from "@/api/track-record";
import { useTrackRecordCommon } from "./TrackRecordCommonContext";

interface IRecency {
  zero_to_three: boolean;
  three_to_six: boolean;
  six_to_twelve: boolean;
  twelve_to_eighteen: boolean;
  eighteen_to_twentyFour: boolean;
  greater_than_twentyFour: boolean;
}

const TrackRecordContext = createContext<{
  searchStock: string;
  setSearchStock: Dispatch<SetStateAction<string>>;
  setSortBy: Dispatch<SetStateAction<string>>;
  setSortValue: Dispatch<SetStateAction<string>>;
  recency: IRecency;
  setRecency: Dispatch<
    SetStateAction<{
      zero_to_three: boolean;
      three_to_six: boolean;
      six_to_twelve: boolean;
      twelve_to_eighteen: boolean;
      eighteen_to_twentyFour: boolean;
      greater_than_twentyFour: boolean;
    }>
  >;
  timeLeft: {
    zero_to_three: boolean;
    three_to_six: boolean;
    six_to_twelve: boolean;
    twelve_to_eighteen: boolean;
    eighteen_to_twentyFour: boolean;
    greater_than_twentyFour: boolean;
  };
  setTimeLeft: Dispatch<
    SetStateAction<{
      zero_to_three: boolean;
      three_to_six: boolean;
      six_to_twelve: boolean;
      twelve_to_eighteen: boolean;
      eighteen_to_twentyFour: boolean;
      greater_than_twentyFour: boolean;
    }>
  >;
} | null>(null);

export const TrackRecordProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    setStrategyTag,
    isChangeFilter,
    setIsChangeFilter,
    strategyTag,
    min_upside_left,
    max_upside_left,
    min_returns,
    max_returns,
    changablestrategyTags,
    sebiBoardType,
  } = useTrackRecordCommon();
  const { isLoggedIn } = useContext(AuthContext);
  const [searchStock, setSearchStock] = useState("");
  const debouncedSearchStock = useDebounce(searchStock, 1000); // Apply debouncing
  const [sortBy, setSortBy] = useState("returns");
  const [sortValue, setSortValue] = useState("desc");
  const [recency, setRecency] = useState(initialFilterTime);
  const [timeLeft, setTimeLeft] = useState(initialFilterTime);
  const [sector, setSector] = useState([]);
  const [upsideLeft, setUpsideLeft] = useState([]);
  const [returns, setReturns] = useState([]);
  const [marketCapType, setMarketCapType] = useState([]);
  const [risk, setRisk] = useState([]);
  const [totalFilterCount, setTotalFilterCount] = useState(0);
  const [actionCall, setActionCall] = useState([]);
  const [openMembershipModal, setOpenMembershipModal] = useState(false);
  /** Total filter count logic */
  const getFilterCount = () =>
    (upsideLeft[0] === min_upside_left && upsideLeft[1] === max_upside_left ? 0 : 1) +
    (returns[0] === min_returns && returns[1] === max_returns ? 0 : 1) +
    Object.keys(recency).filter((key) => recency[key as keyof IRecency]).length +
    Object.keys(timeLeft).filter((key) => timeLeft[key]).length +
    sector.length +
    changablestrategyTags.length +
    marketCapType.length +
    risk.length +
    actionCall.length;

  useEffect(() => {
    if(!min_upside_left && !max_upside_left) return
    setUpsideLeft([min_upside_left, max_upside_left]);
  }, [min_upside_left, max_upside_left]);

  // Update upsideLeft whenever min_returns or max_returns change
  useEffect(() => {
    if(!min_returns && !max_returns) return
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

  const handleResetFilters = () => {
    setRecency(initialFilterTime);
    setTimeLeft(initialFilterTime);
    setUpsideLeft([min_upside_left, max_upside_left]);
    setReturns([min_returns, max_returns]);
    setMarketCapType([]);
    setRisk([]);
    setSector([]);
    setStrategyTag([]);
    setActionCall([]);
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
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: [
      "allBoardTrackRecordStock",
      {
        sebiBoardType,
        sortBy,
        sortValue,
        debouncedSearchStock,
        isLoggedIn,
        recency, // Add additional parameters here
        timeLeft,
        upsideLeft,
        returns,
        marketCapType,
        risk,
        sector,
        strategyTag,
        actionCall,
      },
    ],
    queryFn: ({ pageParam = 1 }) =>
      getAllTrackRecordStockListApi({
        params: {
          page: pageParam,
          limit: 6,
          isLoggedIn,
          type: sebiBoardType,
        },
        body: {
          search: debouncedSearchStock,
          action: actionCall,
          sort_by: sortBy,
          sort_value: sortValue,
          recency_time: Object.keys(recency).filter((key) => recency[key as keyof IRecency]),
          time_left_with_time: Object.keys(timeLeft).filter((key) => timeLeft[key]),
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
  console.log(
    sebiBoardType,
    sortBy,
    sortValue,
    debouncedSearchStock,
    isLoggedIn,
    recency, // Add additional parameters here
    timeLeft,
    upsideLeft,
    returns,
    marketCapType,
    risk,
    sector,
    strategyTag,
    actionCall
  );
  return (
    <TrackRecordContext.Provider
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
        actionCall,
        setActionCall,
        openMembershipModal,
        setOpenMembershipModal,
        isFetchingNextPage
      }}
    >
      {children}
    </TrackRecordContext.Provider>
  );
};

export const useTrackRecord = () => useContext(TrackRecordContext);
