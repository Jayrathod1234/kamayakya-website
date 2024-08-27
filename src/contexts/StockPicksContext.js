// src/contexts/StockPicksContext.js
import React, { createContext, useState, useCallback, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCommonDetailsApi } from "@/api/stock-picks";

// Create Context
const StockPicksContext = createContext();

export const StockPicksProvider = ({ children }) => {
  // State Management
  const [strategyTag, setStrategyTag] = useState([]);
  const [isChangeStrategyTag, setIsChangeStrategyTag] = useState(false);
  const [sebiBoardType, setSebiBoardType] = useState("mainboard");

  // Use react-query to fetch common details
  const {
    data: items = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["commonDetails"],
    queryFn: getCommonDetailsApi,
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

  const strategyTagList = strategy_tags?.reduce((acc, { id, name }) => {
    acc[id] = name;
    return acc;
  }, {});

  const marketCapTypeList = market_cap_types?.map((item) => item.value);
  const stockRiskList = stock_risks?.map((item) => item.value);

  // Function to handle SebiBoardType change
  const handleSebiBoardTypeChange = useCallback((type) => {
    setSebiBoardType(type);
  }, []);

  return (
    <StockPicksContext.Provider
      value={{
        strategyTag,
        setStrategyTag,
        isChangeStrategyTag,
        setIsChangeStrategyTag,
        sebiBoardType,
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
        isLoading,
        error,
      }}
    >
      {children}
    </StockPicksContext.Provider>
  );
};

export default StockPicksContext;

export const useStockPicks = () => useContext(StockPicksContext);
