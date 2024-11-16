// src/contexts/StockPicksContext.js
import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { getCommonDetailsApi } from "@/api/stock-picks";
import { getTrackRecordCommonDetailsApi } from "@/api/track-record";

// Create Context
const TrackRecordCommonContext = createContext();

export const TrackRecordCommonProvider = ({ children }) => {
  // State Management
  const [strategyTag, setStrategyTag] = useState([]);
  const [isChangeFilter, setIsChangeFilter] = useState(false);
  const [sebiBoardType, setSebiBoardType] = useState("");
  const [popularStrategies, setPopularStrategies] = useState([]);
  const allBoardStockRef = useRef(null);
  const [searchPageOpen, setSearchPageOpen] = useState(false);

  // Use react-query to fetch common details
  const {
    data: items = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trackRecordCommonDetails", sebiBoardType],
    queryFn: () => getTrackRecordCommonDetailsApi({ type: sebiBoardType }),
  });

  const {
    min_upside_left,
    max_upside_left,
    min_returns,
    total_mainboard_stocks,
    total_sme_stocks,
    max_returns,
    stock_choices: {
      stock_risks,
      market_cap_types,
      stock_sectors,
      strategy_tags,
    } = {},
  } = items;

  const stockSector = stock_sectors?.reduce((acc, { value, label }) => {
    acc[value] = label;
    
    return acc;
  }, {});
  console.log("STOCK SECTORS",stockSector)
  const strategyTagList = strategy_tags?.reduce((acc, { id, name }) => {
    acc[id] = name;
    return acc;
  }, {});

  useEffect(() => {
    const initialStrategies = (strategy_tags || [])
      .slice(0, 5)
      .map((strategy) => ({
        ...strategy,
        is_default: 1,
      }));

    const mostRecentStrategy = {
      id: "most-recent",
      name: "Most Recent",
      slug: "most-recent",
      image: "/assets/watch.svg",
      is_default: 1,
    };

    setPopularStrategies((prevStrategies) => {
      // Ensure the most recent strategy is added only if it's not already present
      return [mostRecentStrategy, ...initialStrategies];
    });
  }, [strategy_tags]); // Recalculate when strategyTag changes

  const addPopularStrategies = (id) => {
    const strategyExists = popularStrategies.some(
      (strategy) => strategy.id === id
    );
    if (!strategyExists) {
      setPopularStrategies((prevStrategies) => {
        if (!prevStrategies.some((strategy) => strategy.id === id)) {
          const newStrategy = strategy_tags.find(
            (strategy) => strategy.id === id
          );
          newStrategy.is_default = 0;
          return [...prevStrategies, newStrategy]; // Create a new array with the added strategy
        }
        return prevStrategies; // If already exists, return the current state
      });
    }
  };

  const removePopularStrategies = (strategyId) => {
    // Check if the strategy with chipId has is_default set to 0
    const strategyToRemove = popularStrategies.find(
      (strategy) => strategy.id === strategyId
    );

    if (strategyToRemove && strategyToRemove.is_default === 0) {
      setPopularStrategies((prevStrategies) =>
        prevStrategies.filter((strategy) => strategy.id !== strategyId)
      );
    }
  };

  const marketCapTypeList = market_cap_types?.map((item) => item.value);
  const stockRiskList = stock_risks?.map((item) => item.value);

  const changablestrategyTags = [...strategyTag];
  /** if most-recent chip clickable */
  if (changablestrategyTags.includes("most-recent")) {
    const index = changablestrategyTags.indexOf("most-recent");

    if (index > -1) {
      changablestrategyTags.splice(index, 1); // Modify the copy, not the original array
    }
  }

  // Function to handle SebiBoardType change
  const handleSebiBoardTypeChange = useCallback((type) => {
    setSebiBoardType(type);
  }, []);


  console.log("TRACK RECORD COMMON==>", strategyTag, isChangeFilter,sebiBoardType,popularStrategies)

  return (
    <TrackRecordCommonContext.Provider
      value={{
        addPopularStrategies,
        removePopularStrategies,
        popularStrategies,
        strategyTag,
        changablestrategyTags,
        setStrategyTag,
        isChangeFilter,
        setIsChangeFilter,
        sebiBoardType,
        setSebiBoardType,
        total_mainboard_stocks,
        total_sme_stocks,
        handleSebiBoardTypeChange,
        stockSector,
        strategyTagList,
        marketCapTypeList,
        stockRiskList,
        min_upside_left,
        max_upside_left,
        min_returns,
        max_returns,
        allBoardStockRef,
        searchPageOpen,
        setSearchPageOpen,
        isLoading,
        error,
      }}
    >
      {children}
    </TrackRecordCommonContext.Provider>
  );
};

export default TrackRecordCommonContext;

export const useTrackRecordCommon = () => useContext(TrackRecordCommonContext);
