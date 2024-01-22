import type { NextPage } from "next";
import React, { useState, useEffect, useContext } from "react";
import NavBar from "@/components/Navbar";
// import AboutUs from "./screens/AboutUs";
import WhyUs from "./screens/WhyUs";
// import Solutions from "./screens/Solutions";
import SmallcaseCard from "./screens/smallcaseCard";
// import Blogs2 from "./screens/blogs2";
import Footer from "./screens/Footer";
// import Process from "./screens/Process";
import FaqsNew from "./screens/FaqsNew";
// import Process2 from "./screens/Process2";
import Testimonials from "./screens/Testimonials";
import SubscriptionNew from "../components/SubscriptionNew";
// import Script from "next/script";
import NavBar2 from "@/components/Navbar2";
import AuthProvider from "@/components/AuthContext";
import HomePage from "@/pages/screens/HomePage";
import PageVisibility from "@/components/PageVisibility";

const Home: NextPage = () => {
	const { isLoggedIn } = useContext(AuthProvider);

	return (
		// 	<PageVisibility>
		//   {(isPageVisible: any) => (
		<>
			{/* <script id="google-analytics" data-nscript="afterInteractive">
          window.dataLayer = window.dataLayer || [];
          function gtag(){typeof window !== 'undefined' && window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-PBMR9CBK3J');
        </script> */}
			{isLoggedIn ? <NavBar2 /> : <NavBar />}
			<HomePage />
			<SubscriptionNew />
			{/* <SmallcaseCard /> */}
			{/* <AboutUs /> */}
			{/* <Process /> */}
			{/* <Process2/> */}
			{/*<WhyUs />*/}
			{/* <Blogs2 /> */}
			{/* <Testimonials /> */}
			{/*<Solutions />*/}
			<FaqsNew />
			<Footer />
			{/* <Footer /> */}
		</>
		//   )}
		// 	</PageVisibility>
	);
};

export default Home;
