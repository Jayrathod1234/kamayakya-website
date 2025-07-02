import { getHotStockListApi } from "@/api/stock-picks";
import AuthProvider from "@/components/AuthContext";
import { StockPicksProvider, useStockPicks } from "@/contexts/StockPicksContext";
import { HotStockSectionVertical } from "@/pages/stock-picks/components/HotStockSection";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";

const StockPicksChildren = () => {
  const { isLoggedIn } = useContext(AuthProvider);
  // Stock picks api
  const { sebiBoardType } = useStockPicks();
  const {
    data: { data: items = [], is_limited_view: isLimitedView = false } = {},
    isLoading: isLoading2,
    error: error2,
  } = useQuery({
    queryKey: ["hotStock", sebiBoardType, isLoggedIn],
    queryFn: () => getHotStockListApi({ isLoggedIn, type: sebiBoardType }),
  });

  return <HotStockSectionVertical items={items} isLimitedView={isLimitedView} isLoading={isLoading2} error={error2} />;
};

export const StockPickSection = () => {
  return (
    <div className=" md:pb-[50px] md:px-5">
      <div className=" md:p-20 rounded-[28px] md:bg-[#01272E] bg-[url(/landing/stock_bg.png)] bg-cover">
        <StockPicksProvider>
          <StockPicksChildren />
        </StockPicksProvider>
      </div>
    </div>
  );
};
