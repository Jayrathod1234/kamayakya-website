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
import { ACTIVE_PLAN_URL, GET_USER } from "../api/URLs";
import { getMixPanelClient } from "@/externals/mixpanel";
import ContactUsBtn from "@/components.v2/contact-us-btn";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import axios from "axios";
const StockPicks = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { sebiBoardType, searchPageOpen } = useStockPicks();
  const isMobile = useMediaQuery("(max-width:600px)");
  const pathname = usePathname();
  // Use react-query to fetch
  const {
    data: { data: items = [], is_limited_view: isLimitedView = false } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hotStock", sebiBoardType, isLoggedIn],
    queryFn: () => getHotStockListApi({ isLoggedIn, type: sebiBoardType }),
  });

  const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh") : null;
  
  const getUTMParams = () => {
    if (typeof window === "undefined")
      return { utm_campaign: "", utm_content: "", utm_source: "", utm_medium: "", utm_terms: "" };
    const params = new URLSearchParams(window.location.search);
    return {
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_terms: params.get("utm_terms") || "",
    };
  };

  const fetchUser = async () => {
    if (!refreshToken) return null;
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
    if (!refreshToken) return null;
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
    return null;
  };

  const handlePageLoadEvent = async () => {
    const mp = getMixPanelClient();
    const utmParams = getUTMParams();
    const sourcePage = typeof document !== "undefined" ? document.referrer : "";
    const currentUrl = typeof window !== "undefined" ? window.location.href : pathname || "";

    const user = await fetchUser();
    const activePlan = await fetchActivePlan();
    
    if (user && activePlan) {
      mp.track("stockpicks_loaded", {
        id: uuidv4(),
        Session_id: "",
        time: new Date().toUTCString(),
        Device_ID: "",
        source_page: sourcePage,
        current_url: currentUrl,
        IP: "",
        customer_id: user?.id,
        account_created_at: user.created,
        Curr_Subscription_Type: activePlan.plan,
        Curr_Plan_Duration: activePlan.duration,
        Curr_Subscription_Start_date: activePlan.start_date,
        Curr_Subscription_End_date: activePlan.end_date,
        usertype: activePlan.plan ? (activePlan.plan.toLowerCase() === "free" ? "Free" : "Paid") : null,
        browser_version: "",
        browser_name: "",
        device_type: "",
        device_name: "",
        "OS Version": "",
        ...utmParams,
      });
    } else {
      // Fire event even if user/plan fetch fails
      mp.track("stockpicks_loaded", {
        id: uuidv4(),
        Session_id: "",
        time: new Date().toUTCString(),
        Device_ID: "",
        source_page: sourcePage,
        current_url: currentUrl,
        IP: "",
        customer_id: user?.id || null,
        account_created_at: user?.created || null,
        Curr_Subscription_Type: activePlan?.plan || null,
        Curr_Plan_Duration: activePlan?.duration || null,
        Curr_Subscription_Start_date: activePlan?.start_date || null,
        Curr_Subscription_End_date: activePlan?.end_date || null,
        usertype: activePlan?.plan ? (activePlan.plan.toLowerCase() === "free" ? "Free" : "Paid") : null,
        browser_version: "",
        browser_name: "",
        device_type: "",
        device_name: "",
        "OS Version": "",
        ...utmParams,
      });
    }
  };

  useEffect(() => {
    const mp = getMixPanelClient();
    const utmParams = getUTMParams();
    const sourcePage = typeof document !== "undefined" ? document.referrer : "";
    const currentUrl = typeof window !== "undefined" ? window.location.href : pathname || "";

    // Always fire the event, but fetch user/plan data if logged in
    if (isLoggedIn && refreshToken) {
      handlePageLoadEvent();
    } else {
      // Fire event for non-logged-in users or when refreshToken is not available
      mp.track("stockpicks_loaded", {
        id: uuidv4(),
        Session_id: "",
        time: new Date().toUTCString(),
        Device_ID: "",
        source_page: sourcePage,
        current_url: currentUrl,
        IP: "",
        customer_id: null,
        account_created_at: null,
        Curr_Subscription_Type: null,
        Curr_Plan_Duration: null,
        Curr_Subscription_Start_date: null,
        Curr_Subscription_End_date: null,
        usertype: null,
        browser_version: "",
        browser_name: "",
        device_type: "",
        device_name: "",
        "OS Version": "",
        ...utmParams,
      });
    }
  }, [isLoggedIn, pathname, refreshToken]);

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
      <ContactUsBtn />
    </StockPicksProvider>
  );
}
