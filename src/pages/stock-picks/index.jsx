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

// const SebiBoardTab = dynamic(() =>
//   import("@/pages/stock-picks/components/SebiBoardTab")
// );
// const HotStockSection = dynamic(() =>
//   import("@/pages/stock-picks/components/HotStockSection")
// );
// const LatestReleases = dynamic(() =>
//   import("@/pages/stock-picks/components/LatestReleases")
// );
// const StrategyCard = dynamic(() =>
//   import("@/pages/stock-picks/components/StrategyCard")
// );
// const AllBoardStockSection = dynamic(() =>
//   import("@/pages/stock-picks/components/AllBoardStockSection")
// );

const StockPicks = () => {
  const [sebiBoardType, setSebiBoardType] = useState("mainboard");

  // useCallback to memoize the setSebiBoardType function
  const handleSebiBoardTypeChange = useCallback((type) => {
    setSebiBoardType(type);
  }, []);

  return (
    <Layout>
      <div className=" font-open_sans h-[805px] relative">
        {/* SebiBoardTab */}
        <SebiBoardTab setSebiBoardType={handleSebiBoardTypeChange} />
        {/* Bannerhotstockscard */}
        <HotStockSection sebiBoardType={sebiBoardType} />
      </div>
      {/* Latest Releases  */}
      <LatestReleases sebiBoardType={sebiBoardType} />
      {/* Discover by Strategy */}
      <StrategyCard />
      {/* All Mainboard Stocks */}
      <AllBoardStockSection />
    </Layout>
  );
};

export default StockPicks;
