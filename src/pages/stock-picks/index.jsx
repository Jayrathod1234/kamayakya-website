import Layout from "../../layout/Layout";
import { useCallback, useState } from "react";
// import dynamic from "next/dynamic";
import SebiBoardTab from "@/pages/stock-picks/components/SebiBoardTab";
import HotStockSection from "@/pages/stock-picks/components/HotStockSection";
import HotStockSectionBlur from "@/pages/stock-picks/components/HotStockSectionBlur";
import LatestReleases from "@/pages/stock-picks/components/LatestReleases";
import StrategyCard from "@/pages/stock-picks/components/StrategyCard";
import AllBoardStockSection from "@/pages/stock-picks/components/AllBoardStockSection";
import InvestmentSection from "./components/InvestmentSection";
import { useQuery } from "@tanstack/react-query";
import { getCommonDetailsApi } from "@/api/stock-picks";

const StockPicks = () => {
  // Use react-query to fetch
  const {
    data: items = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["commonDetails"],
    queryFn: getCommonDetailsApi,
  });
  const {
    min_upside_left,
    max_upside_left,
    total_mainboard_stocks,
    total_sme_stocks,
    stock_choices: { stock_sectors } = {},
  } = items;
  const [sebiBoardType, setSebiBoardType] = useState("mainboard");

  // useCallback to memoize the setSebiBoardType function
  const handleSebiBoardTypeChange = useCallback((type) => {
    setSebiBoardType(type);
  }, []);

  const stockSector = stock_sectors?.reduce((acc, { value, label }) => {
    acc[value] = label;
    return acc;
  }, {});

  return (
    <Layout>
      <div className=" font-open_sans h-[805px] relative">
        {/* SebiBoardTab */}
        <SebiBoardTab
          setSebiBoardType={handleSebiBoardTypeChange}
          total_mainboard_stocks={total_mainboard_stocks}
          total_sme_stocks={total_sme_stocks}
        />
        {/* Bannerhotstockscard */}
        <HotStockSection
          sebiBoardType={sebiBoardType}
          stockSector={stockSector}
        />
      </div>
      {/* Latest Releases  */}
      <LatestReleases sebiBoardType={sebiBoardType} stockSector={stockSector} />
      {/* Discover by Strategy */}
      <StrategyCard />
      {/* All Mainboard Stocks */}
      <AllBoardStockSection
        sebiBoardType={sebiBoardType}
        stockSector={stockSector}
        min_upside_left={min_upside_left}
        max_upside_left={max_upside_left}
      />
    </Layout>
  );
};

export default StockPicks;
