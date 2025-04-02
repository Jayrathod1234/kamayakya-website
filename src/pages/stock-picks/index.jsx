import Layout from "../../layout/Layout";
import { useContext } from "react";
import SebiBoardTab from "@/pages/stock-picks/components/SebiBoardTab";
import HotStockSection from "@/pages/stock-picks/components/HotStockSection";
import LatestReleases from "@/pages/stock-picks/components/LatestReleases";
import StrategyCard from "@/pages/stock-picks/components/StrategyCard";
import AllBoardStockSection from "@/pages/stock-picks/components/AllBoardStockSection";
import AuthContext from "@/components/AuthContext";
import { StockPicksProvider, useStockPicks } from "@/contexts/StockPicksContext";
import { AllBoardStockProvider } from "@/contexts/AllBoardStockContext";
import { useQuery } from "@tanstack/react-query";
import { getHotStockListApi } from "@/api/stock-picks";
import { useMediaQuery } from "@mui/material";
import SearchPage from "../../components.v3/common/SearchPage";

const StockPicks = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { sebiBoardType, searchPageOpen } = useStockPicks();
  const isMobile = useMediaQuery("(max-width:600px)");
  // Use react-query to fetch
  const {
    data: { data: items = [], is_limited_view: isLimitedView = false } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hotStock", sebiBoardType, isLoggedIn],
    queryFn: () => getHotStockListApi({ isLoggedIn, type: sebiBoardType }),
  });

  return (
    <>
      {isMobile && searchPageOpen ? (
        <AllBoardStockProvider>
          <SearchPage />
        </AllBoardStockProvider>
      ) : (
        <>
          <Layout>
            <div
              className={`font-open_sans h-[805px] relative ${
                (isMobile && items.length <= 1) || (!isMobile && items.length <= 3) ? "mb-48" : "mb-44"
              }`}
            >
              {/* SebiBoardTab */}
              <SebiBoardTab />
              <HotStockSection items={items} isLimitedView={isLimitedView} isLoading={isLoading} error={error} />
            </div>
            {/* Latest Releases  */}
            <LatestReleases isLimitedView={isLimitedView} />
            {/* Discover by Strategy */}
            <StrategyCard />
            {/* All Mainboard Stocks */}
            <AllBoardStockProvider>
              <AllBoardStockSection />
            </AllBoardStockProvider>
          </Layout>
        </>
      )}

      {/* <Modal
        width="450px"
        blur
        open={showLoginModal}
        onClose={handleCloseLoginModal}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src="kmk-k.png" style={{ maxWidth: "260px" }} />
          <IconButton
            sx={{
              width: "40px",
              "&:hover": { background: "#fff" },
              // alignSelf: "end",
              right: "20px",
            }}
            onClick={() => handleCloseLoginModal()}
          >
            <CloseIcon sx={{ color: "#e81123" }} />
          </IconButton>
        </Box>

        <Modal.Body>
          <Login />
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default function StockPicksPage() {
  return (
    <StockPicksProvider>
      <StockPicks />
    </StockPicksProvider>
  );
}
