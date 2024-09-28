import React, { useContext, useEffect } from "react";
import BSection1 from "./BlogsPages/BSection1";
// import BSection2 from './BlogsPages/BSection2';
// import NavBar from "../components/Navbar";
// import NavBar2 from "../components/Navbar2";
import FaqsNew from "./screens/FaqsNew";
// import Footer from "./screens/Footer";
import AuthContext from "../components/AuthContext";
import BlogSection2 from "./BlogsPages/BlogSection2";
import { Footer, Navbar } from "../components.v2/index.components";
import { ACTIVE_PLAN_URL, GET_BLOGS, GET_USER } from "./api/URLs";
import { TBlog } from "@/types";
import { getMixPanelClient } from "@/externals/mixpanel";
import axios from "axios";
import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

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

  const handlePageLoadEvent = async () => {
    const mp = getMixPanelClient();

    const user = await fetchUser();
    const activePlan = await fetchActivePlan();
    if (user && activePlan) {
      mp.track("Blogs_loaded", {
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
      mp.track("Blogs_loaded", {
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
    <div className="relative bg-[#effffc] pricing  bg-[length:100vw] bg-no-repeat bg-[top_center]">
       <div className="relative  w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto max-h-[700px]  md:max-h-[950px]">
          <div className="  absolute right-1 lg:right-[40px] top-36 opacity-20 md:opacity-100">
            <Image alt="rupee_icon" width={81} height={93} src={"/pricing/rupee_hero_icon.svg"} />
          </div>
          <div className=" absolute lg:left-12 md:bottom-16 left-1 top-16 opacity-30 md:opacity-100">
            <Image alt="rupee_icon" width={52} height={61.28} src={"/pricing/rupee_hero_icon.svg"} />
          </div>
        </div>
      <Navbar className=" bg-transparent" />
      <main className="  main-container relative z-10">
        <BlogSection2  />
        {/* <FaqsNew /> */}
      </main>
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
