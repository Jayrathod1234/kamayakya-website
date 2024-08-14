import Layout from "../../layout/Layout";
import SebiBoardTab from "@/pages/stock-test/components/SebiBoardTab";
import HotStockSection from "@/pages/stock-test/components/HotStockSection";
import LatestReleases from "@/pages/stock-test/components/LatestReleases";
import StrategyCard from "@/pages/stock-test/components/StrategyCard";
import AllBoardStockSection from "@/pages/stock-test/components/AllBoardStockSection";

const StockPicks = () => {
  return (
    <Layout>
      <div className=" font-open_sans h-[805px] relative">
        {/* SebiBoardTab */}
        <SebiBoardTab />
        {/* Bannerhotstockscard */}
        <HotStockSection />
      </div>
      {/* Latest Releases (10)  */}
      <LatestReleases />
      {/* Discover by Strategy */}
      <StrategyCard />
      {/* All Mainboard Stocks */}
      <AllBoardStockSection />
    </Layout>
  );
};

export default StockPicks;
