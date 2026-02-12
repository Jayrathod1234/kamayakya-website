import React, { useContext, useEffect } from "react";
import BSection1 from "./BlogsPages/BSection1";
// import BSection2 from './BlogsPages/BSection2';
// import NavBar from "../components/Navbar";
// import NavBar2 from "../components/Navbar2";
import FaqsNew from "./screens/FaqsNew";
// import Footer from "./screens/Footer";
import AuthContext from "../components/AuthContext";
import BlogSection2 from "./BlogsPages/BlogSection2";
import { Footer, Navbar, Newsletter } from "../components.v2/index.components";
import { ACTIVE_PLAN_URL, GET_BLOGS, GET_USER } from "./api/URLs";
import { TBlog } from "@/types";
import { getMixPanelClient } from "@/externals/mixpanel";
import axios from "axios";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";

const BlogsPage = ({ blogs, next, prev }: { blogs: Array<TBlog>; next: string | null; prev: string | null }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const pathname = usePathname();

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
    if (user && activePlan) {
      mp.track("Blogs_loaded", {
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
    }
  };

  useEffect(() => {
    const mp = getMixPanelClient();
    const utmParams = getUTMParams();
    const sourcePage = typeof document !== "undefined" ? document.referrer : "";
    const currentUrl = typeof window !== "undefined" ? window.location.href : pathname || "";

    if (isLoggedIn) {
      handlePageLoadEvent();
    } else if (!isLoggedIn && !refreshToken) {
      mp.track("Blogs_loaded", {
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
  }, [isLoggedIn]);

  return (
    <div className="relative bg-[#effffc] pricing  bg-[length:100vw] bg-no-repeat bg-[top_center]">
      <Head>
        {generateNextSeo({
          title: "Kamayakya Blog - Insights on Small Cap Stocks & Investing Tips",
          description: "Read expert articles on small cap stocks to buy, long-term investing, and market insights. Stay updated with research-backed guidance to grow your wealth confidently.",
          canonical: "https://www.kamayakya.com/blogs-page",
          openGraph: {
            url: "https://www.kamayakya.com/blogs-page",
            title: "Kamayakya Blog - Insights on Small Cap Stocks & Investing Tips",
            description: "Read expert articles on small cap stocks to buy, long-term investing, and market insights. Stay updated with research-backed guidance to grow your wealth confidently.",
          },
        })}
      </Head>
      <div className="relative  w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto max-h-[700px]  md:max-h-[950px]">
        <div className="  absolute right-1 lg:right-[40px] top-36 opacity-20 md:opacity-100">
          <Image alt="rupee_icon" width={81} height={93} src={"/pricing/rupee_hero_icon.svg"} />
        </div>
        <div className=" absolute lg:left-12 md:bottom-16 left-1 top-16 opacity-30 md:opacity-100">
          <Image alt="rupee_icon" width={52} height={61.28} src={"/pricing/rupee_hero_icon.svg"} />
        </div>
      </div>
      <Navbar />
      <main className="  main-container pb-10 relative z-10">
        <BlogSection2 />
        {/* <FaqsNew /> */}
      </main>
      <Newsletter page="Blogs" />
      <Footer />
    </div>
  );
};

// export async function getStaticProps() {
//   const response = await fetch(`${GET_BLOGS}?limit=10&offset=0`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     next:{revalidate:500}
//   });
//   const data = await response.json();
//   // console.log(data);
//   return {
//     props: {
//       next: data?.next,
//       prev: data?.previous,
//       blogs: data.results,
//     },
//     revalidate: 500,
//   };
// }

export default BlogsPage;
