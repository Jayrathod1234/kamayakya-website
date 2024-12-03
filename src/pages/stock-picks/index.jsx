import Layout from "../../layout/Layout";
import { useCallback, useContext, useState, useEffect } from "react";
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
import SearchPage from "../../components.v3/common/SearchPage";
import { ACTIVE_PLAN_URL, GET_USER } from "../api/URLs";
import { getMixPanelClient } from "@/externals/mixpanel";

const StockPicks = () => {
  const { showLoginModal, handleCloseLoginModal, isLoggedIn } =
    useContext(AuthContext);

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

  const refreshToken = localStorage.getItem("refresh");
  const fetchUser = async () => {
    try {
      const response = await fetch(GET_USER, {
        method: "GET",
        headers: {
          Authorization: `Token ${refreshToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (e) {
      return null;
    }
  };
  const fetchActivePlan = async () => {
    try {
      const response = await axios.get(ACTIVE_PLAN_URL, {
        headers: {
          Authorization: `token ${refreshToken}`,
        },
      });
      if (response.data) {
        const days = response.data.current_active_subscription.days;
        const duration = days > 90 ? "1year" : days > 365 ? "3year" : days > 0 ? "3months" : "";
        return { ...response.data.current_active_subscription, duration };
      }
    } catch (e) {
      return null;
    }
  };

  const handlePageLoadEvent = async () => {
    const mp = getMixPanelClient();

    const user = await fetchUser();
    const activePlan = await fetchActivePlan();
    if (user && activePlan) {
      mp.track("stockpicks_loaded", {
        id: uuidv4(),
        Session_id: "",
        time: new Date().toUTCString(),
        source_page: "",
        current_url: pathname,
        account_created_at: user.created,
        customer_id: user?.id,
        Curr_Subscription_Type: activePlan.plan,
        Curr_Plan_Duration: activePlan.duration,
        Curr_Subscription_Start_date: activePlan.start_date,
        Curr_Subscription_End_date: activePlan.end_date,
        usertype: activePlan.plan ? (activePlan.plan.toLowerCase() === "free" ? "Free" : "Paid") : null,
        browser_version: "",
        browser_name: "",
        device_type: "",
        device_name: "",
        utm_campaign: "",
        utm_content: "",
        utm_source: "",
        utm_medium: "",
        utm_terms: "",
      });
    }
  };

  useEffect(() => {
    const mp = getMixPanelClient();

    if (isLoggedIn) {
      handlePageLoadEvent();
    } else if (!isLoggedIn && !refreshToken) {
      mp.track("stockpicks_loaded", {
        id: uuidv4(),
        Session_id: "",
        time: new Date().toUTCString(),
        source_page: "",
        current_url: pathname,
        account_created_at: null,
        customer_id: null,
        Curr_Subscription_Type: null,
        Curr_Plan_Duration: null,
        Curr_Subscription_Start_date: null,
        Curr_Subscription_End_date: null,
        usertype: null,
        browser_version: "",
        browser_name: "",
        device_type: "",
        device_name: "",
        utm_campaign: "",
        utm_content: "",
        utm_source: "",
        utm_medium: "",
        utm_terms: "",
      });
    }
  }, [isLoggedIn]);

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
                (isMobile && items.length <= 1) ||
                (!isMobile && items.length <= 3)
                  ? "mb-48"
                  : "mb-44"
              }`}
            >
              {/* SebiBoardTab */}
              <SebiBoardTab />
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
