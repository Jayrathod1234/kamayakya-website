import Layout from "../../layout/Layout";
import SebiBoardTab from "@/pages/stock-picks/components/SebiBoardTab";
import HotStockSection from "@/pages/stock-picks/components/HotStockSection";
import LatestReleases from "@/pages/stock-picks/components/LatestReleases";
import StrategyCard from "@/pages/stock-picks/components/StrategyCard";
import AllBoardStockSection from "@/pages/stock-picks/components/AllBoardStockSection";

const StockPicks = () => {
  return (
    <Layout>
      <div className=" font-open_sans h-[805px] relative">
        {/* SebiBoardTab */}
        {/* <SebiBoardTab /> */}
        {/* Bannerhotstockscard */}
        {/* <HotStockSection /> */}
      </div>
      {/* Latest Releases  */}
      {/* <LatestReleases /> */}
      {/* Discover by Strategy */}
      {/* <StrategyCard /> */}
      {/* All Mainboard Stocks */}
      {/* <AllBoardStockSection /> */}
    </Layout>
  );
};

export default StockPicks;
