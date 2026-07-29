import { ButtonSize, ButtonVariant } from "@/components.v2/button/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components.v2/ui/select";
import { Input } from "@/components.v2/ui/input";
import { Button as ShadBtn } from "@/components.v2/ui/button";

import {
  Button,
  EnterpriseCard,
  FeelingLost,
  Footer,
  Navbar,
  Newsletter,
  PlansSection,
  Semibold,
  SmallCaseCard,
  Tabs,
  Testimonials,
  UserTypeCard,
  UserTypeDesktopCard,
} from "@/components.v2/index.components";
import Image from "next/image";
import { Open_Sans } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import { getMixPanelClient } from "@/externals/mixpanel";
import { usePathname } from "next/navigation";
import axios from "axios";
import { ACTIVE_PLAN_URL, GET_USER, NEWSLETTER_SUBSCRIBE_URL } from "./api/URLs";
import Link from "next/link";
import { toast } from "@/components.v2/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";
import { useActivePlanContext } from "@/components/PlanContext";
import { Mail, Phone } from "lucide-react";
import AuthContext from "@/components/AuthContext";
import { MainSmeBoardModal } from "@/components.v2/payments/main-sme-board-modal";
import ContactUsBtn from "@/components.v2/contact-us-btn";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";
import { SmallcaseCarousel } from "@/components.v2/payments/smallcase-carousel";
import HowItWorks from "@/components.v2/payments/how-it-works";
import { ResearchSection } from "@/components.v2/payments";

const open_sans = Open_Sans({ subsets: ["latin"] });

export default function Page() {
  const pathname = usePathname();
  // const { activePlan } = useActivePlanContext();
  const { isLoggedIn } = useContext(AuthContext);
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
      mp.track("Pricing_page_loaded", {
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
      mp.track("Pricing_page_loaded", {
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

  useEffect(() => {
    const handleScrollToHash = () => {
      if (typeof window !== "undefined" && window.location.hash === "#how-it-works") {
        setTimeout(() => {
          const element = document.getElementById("how-it-works");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            window.history.replaceState(
              null,
              "",
              window.location.pathname + window.location.search
            );
          }
        }, 500);
      }
    };

    handleScrollToHash();

    window.addEventListener("hashchange", handleScrollToHash);
    return () => {
      window.removeEventListener("hashchange", handleScrollToHash);
    };
  }, []);

  return (
    <div
      className={`relative pricing pricing-body tracking-wide bg-white `}
    >
      <Head>
        {generateNextSeo({
          title: "Kamayakya Pricing - Plans for Model Portfolios & Stock Baskets",
          description: "Explore pricing for Kamayakya's best model portfolios and stock baskets in India. Choose a plan that fits your investment style and start building wealth confidently.",
          canonical: "https://www.kamayakya.com/pricing-new",
          openGraph: {
            url: "https://www.kamayakya.com/pricing-new",
            title: "Kamayakya Pricing - Plans for Model Portfolios & Stock Baskets",
            description: "Explore pricing for Kamayakya's best model portfolios and stock baskets in India. Choose a plan that fits your investment style and start building wealth confidently.",
          },
        })}
      </Head>
      <Navbar />

      <main id="main-content">
        <SmallcaseCarousel />
        <HowItWorks />
        <ResearchSection />


        {/* Testimonials */}
        <div id="testimonials" className="py-[60px] bg-gray-100 relative">
          <div className="absolute w-screen">
            <svg className="w-full h-full" viewBox="0 0 1440 236" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_5060_262281)">
                <path
                  d="M-72.6057 7.86867C708.139 106.745 1675.87 7.86867 1675.87 7.86867C1675.87 7.86867 2312.13 952.554 1675.87 814.365C1039.62 676.177 410.655 854.869 -72.6057 814.365C-555.866 773.862 -853.35 -91.0076 -72.6057 7.86867Z"
                  fill="#F2F4F7"
                />
              </g>
              <defs>
                <clipPath id="clip0_5060_262281">
                  <rect width="1440" height="236" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <Testimonials />
        </div>

        {/* Bottom sections */}
        <div id="feeling-lost" className="bg-gray-100">
          <FeelingLost />
        </div>
        <div className="md:mt-[-15rem] lg:mt-[-15rem]">
          <Newsletter />
        </div>
      </main>

      <div className="mt-[-10%]">
        <Footer />
      </div>
      {/* <ContactUsBtn /> */}
    </div>
  );
}
