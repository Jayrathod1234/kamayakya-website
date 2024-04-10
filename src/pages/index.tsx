import type { NextPage } from "next";
import React, { useContext } from "react";
import NavBar from "@/components/Navbar";
// import AboutUs from "./screens/AboutUs";
// import WhyUs from "./screens/WhyUs";
// import Solutions from "./screens/Solutions";
// import SmallcaseCard from "./screens/smallcaseCard";
// import Blogs2 from "./screens/blogs2";
import Footer from "./screens/Footer";
// import Process from "./screens/Process";
import FaqsNew from "./screens/FaqsNew";
// import Process2 from "./screens/Process2";
import Testimonials from "./screens/Testimonials";
// import TestimonialsNew from './screens/TestimonialsNew';
import SubscriptionNew from "../components/SubscriptionNew";
import NavBar2 from "@/components/Navbar2";
import AuthProvider from "@/components/AuthContext";
import HomePage from "@/pages/screens/HomePage";
import Section1 from "./AboutPages/Section1";
import Section3 from "./AboutPages/Section3";
import Section2 from "./AboutPages/Section2";
import HeaderCards from "./AboutPages/HeaderCards";
import Section4 from "./AboutPages/Section4";
import HeaderFuture from "./AboutPages/HeaderFuture";
import Section5 from "./AboutPages/Section5";
import Section6 from "./AboutPages/Section6";
import Section7 from "./AboutPages/Section7";
// import PageVisibility from "@/components/PageVisibility";

const Home: NextPage = () => {
	const { isLoggedIn } = useContext(AuthProvider);

	return (
		// 	<PageVisibility>
		//   {(isPageVisible: any) => (
		<>
			{isLoggedIn ? <NavBar2 /> : <NavBar />}
			<HomePage />
			<Section1 />
			<Section3 />

			<HeaderCards />
			<Section4 />
			<Section2 />
			<HeaderFuture />
			<Section5 />
			<Section6 />
			<Section7 />
			<Testimonials />
			<SubscriptionNew />
			{/* <SmallcaseCard /> */}
			{/* <AboutUs /> */}
			{/* <Process /> */}
			{/* <Process2/> */}
			{/* <WhyUs /> */}
			{/* <Blogs2 /> */}
			{/* <TestimonialsNew /> */}
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
