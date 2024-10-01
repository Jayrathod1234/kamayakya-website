import type { NextPage } from "next";
import React, { useContext } from "react";
import { Navbar,Footer } from "@/components.v2/index.components";
import FaqsNew from "@/pages/screens/FaqsNew";
import Testimonials from "@/pages/screens/Testimonials";
import AuthProvider from "@/components/AuthContext";
import HomePage from "@/pages/screens/HomePage";
import Section1 from "@/pages/AboutPages/Section1";
import Section3 from "@/pages/AboutPages/Section3";
import Section2 from "@/pages/AboutPages/Section2";
import HeaderCards from "@/pages/AboutPages/HeaderCards";
import Section4 from "@/pages/AboutPages/Section4";
import HeaderFuture from "@/pages/AboutPages/HeaderFuture";
import Section5 from "@/pages/AboutPages/Section5";
import Section6 from "@/pages/AboutPages/Section6";
import Section7 from "@/pages/AboutPages/Section7";
import HotStocks from "@/pages/screens/HotStocks";

const Home: NextPage = () => {
  const { isLoggedIn, isSubscribed } = useContext(AuthProvider);

	return (
		<>
			<Navbar className=" bg-white"/>
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
			{isLoggedIn && isSubscribed ? "" : <HotStocks />}
			<Testimonials />
			<FaqsNew />
			<Footer />
		</>
	);
};

export default Home;
