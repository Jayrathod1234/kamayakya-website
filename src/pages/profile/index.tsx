import { Navbar } from "@/components.v2/navbar";
import React, { useContext, useEffect } from "react";
import PersonalInfo from "./components/PersonalInfo";
import YourPlan from "./components/YourPlan";
import { Footer } from "@/components.v2/footer";
import { SideBar } from "./components/SideBarList";
import BillingHistory from "./components/BillingHistory";
import { getMixPanelClient } from "@/externals/mixpanel";
import { ACTIVE_PLAN_URL, GET_USER } from "../api/URLs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import AuthContext from "@/components/AuthContext";

export default function Profile() {
  const pathname = usePathname();
  const { isLoggedIn } = useContext(AuthContext);
  const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh") : null;

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

  const handlePageLoadEvent = async () => {
    const mp = getMixPanelClient();
    const utmParams = getUTMParams();
    const sourcePage = typeof document !== "undefined" ? document.referrer : "";
    const currentUrl = typeof window !== "undefined" ? window.location.href : pathname || "";

    const user = await fetchUser();
    const activePlan = await fetchActivePlan();

    const baseProps = {
      id: uuidv4(),
      Session_id: "",
      time: new Date().toUTCString(),
      source_page: sourcePage,
      current_url: currentUrl,
      browser_version: "",
      browser_name: "",
      device_type: "",
      device_name: "",
      ...utmParams,
    };

    if (user && activePlan) {
      mp.track("profile_page_loaded", {
        ...baseProps,
        account_created_at: user.created,
        customer_id: user?.id,
        Curr_Subscription_Type: activePlan.plan,
        Curr_Plan_Duration: activePlan.duration,
        Curr_Subscription_Start_date: activePlan.start_date,
        Curr_Subscription_End_date: activePlan.end_date,
        usertype: activePlan.plan ? (activePlan.plan.toLowerCase() === "free" ? "Free" : "Paid") : null,
      });
    } else {
      mp.track("profile_page_loaded", {
        ...baseProps,
        account_created_at: null,
        customer_id: null,
        Curr_Subscription_Type: null,
        Curr_Plan_Duration: null,
        Curr_Subscription_Start_date: null,
        Curr_Subscription_End_date: null,
        usertype: null,
      });
    }
  };

  useEffect(() => {
    handlePageLoadEvent();
  }, [isLoggedIn]);

  return (
    <div className="bg-gray-100 ">
      <Navbar className=" bg-white" />
      <div className=" main-container overflow-visible relative top-[41px]">
        <main className=" relative min-h-screen open_sans flex gap-x-6 lg:gap-x-11">
          <SideBar />
          <div className=" w-full">
            <h2 className=" text-gray-900 font-bold text-[32px]">Your Account</h2>
            <div className=" flex flex-col gap-y-[60px] mt-10">
              <PersonalInfo />
              <YourPlan />
              <BillingHistory />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
