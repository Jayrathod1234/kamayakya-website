import Layout from "../../layout/Layout";
import { useCallback, useContext, useState } from "react";
// import dynamic from "next/dynamic";
import SebiBoardTab from "@/pages/stock-picks/components/SebiBoardTab";
import HotStockSection from "@/pages/stock-picks/components/HotStockSection";
import LatestReleases from "@/pages/stock-picks/components/LatestReleases";
import StrategyCard from "@/pages/stock-picks/components/StrategyCard";
import AllBoardStockSection from "@/pages/stock-picks/components/AllBoardStockSection";
import { Modal } from "@nextui-org/react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Login from "@/components/Login.jsx";
import AuthContext from "@/components/AuthContext";
import {
  StockPicksProvider,
  useStockPicks,
} from "@/contexts/StockPicksContext";
import { AllBoardStockProvider } from "@/contexts/AllBoardStockContext";
import { useQuery } from "@tanstack/react-query";
import { getHotStockListApi } from "@/api/stock-picks";
import { useMediaQuery } from "@mui/material";

const StockPicks = () => {
  const { showLoginModal, handleCloseLoginModal, isLoggedIn } =
    useContext(AuthContext);

  const { sebiBoardType } = useStockPicks();
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
    <Layout>
      <div
        className={`font-open_sans h-[805px] relative ${
          (isMobile && items.length <= 1) || (!isMobile && items.length <= 3)
            ? "mb-48"
            : "mb-60"
        }`}
      >
        {/* SebiBoardTab */}
        <SebiBoardTab />
        {/* Bannerhotstockscard */}
        <HotStockSection
          items={items}
          isLimitedView={isLimitedView}
          isLoading={isLoading}
          error={error}
        />
      </div>
      {/* Latest Releases  */}
      <LatestReleases isLimitedView={isLimitedView} />
      {/* Discover by Strategy */}
      <StrategyCard />
      {/* All Mainboard Stocks */}
      <AllBoardStockProvider>
        <AllBoardStockSection />
      </AllBoardStockProvider>
      <Modal
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
      </Modal>
    </Layout>
  );
};

export default function StockPicksPage() {
  return (
    <StockPicksProvider>
      <StockPicks />
    </StockPicksProvider>
  );
}
