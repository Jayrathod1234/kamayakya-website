import React, { useContext } from "react";
import Section1 from "./AboutPages/Section1";
import Section2 from "./AboutPages/Section2";
import NavBar from "../components/Navbar";
import Section3 from "./AboutPages/Section3";
import Section4 from "./AboutPages/Section4";
import Section5 from "./AboutPages/Section5";
import Section6 from "./AboutPages/Section6";
import Section7 from "./AboutPages/Section7";
import FaqsNew from "./screens/FaqsNew";
import Footer from "./screens/Footer";
import NavBar2 from "@/components/Navbar2";
import AuthContext from "@/components/AuthContext";
import HeaderFuture from "@/pages/AboutPages/HeaderFuture";
import HeaderCards from "@/pages/AboutPages/HeaderCards";
import Head from "next/head";

const AboutCompany = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <section id="aboutUs">
      <Head>
        <title>KamayaKya | SEBI Registered Stock Market Advisory Company</title>
        <meta
          name="description"
          content="Kamayakya, your trusted SEBI Registered Stock Market Advisory Company. Join us on your financial journey for expert guidance, compliance assurance and excellent returns."
        />
      </Head>
      {isLoggedIn ? <NavBar2 /> : <NavBar />}
      <Section1 />
      <Section3 />
      <Section2 />
      <HeaderCards />
      <Section4 />
      <HeaderFuture />
      <Section5 />
      <Section6 />
      <Section7 />
      <FaqsNew />
      <Footer />
    </section>
  );
};

export default AboutCompany;
