import NavBar from "@/components/Navbar";
import FaqsNew from "./screens/FaqsNew";
import Footer from "./screens/Footer";
import React, { useContext } from "react";
import AuthContext from "@/components/AuthContext";
import NavBar2 from "@/components/Navbar2";
import { Text } from "@nextui-org/react";
import { Box } from "@mui/material";
import Head from "next/head";

const Disclaimer = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div>
        <Head>
            <title>KamayaKya | Disclaimer</title>
            <meta
                name="description"
                content="Read KamayaKya's disclaimer, which clearly explains the risks and responsibilities. Commit to clarity as you navigate your financial journey with us."
            />
        </Head>
      {isLoggedIn ? <NavBar2 /> : <NavBar />}
      <Box
        sx={{
          // paddingTop: "30px",
          display: "flex",
          // flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          paddingLeft: "15px",
          paddingRight: "15px",
          background: "#fff",
          "@media only screen and (min-width: 672px)": {
            paddingTop: "2.5vh",
            paddingBottom: "10vh",
          },
          "@media only screen and (max-width: 672px)": {
            // maxHeight: "100vh",
            marginTop: "0px",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingLeft: "15px",
            paddingRight: "15px",
          },
        }}
      >
        <Text
          b
          size={60}
          css={{
            marginTop: "0px",
            width: "100%",
            maxWidth: "80rem" /* 1280px */,
            textAlign: "center",
            lineHeight: 1.2,
            paddingLeft: "15px",
            paddingRight: "15px",
            "@media only screen and (max-width: 764px)": {
              fontSize: 45,
              marginTop: "35px",
              maxWidth: "100%",
              textAlign: "left",
            },
          }}
        >
          Disclosures
        </Text>
        <Text
          size={20}
          css={{
            marginTop: "2.5vh",
            width: "100%",
            maxWidth: "80rem" /* 1280px */,
            textAlign: "center",
            lineHeight: 1.2,
            paddingLeft: "15px",
            paddingRight: "15px",
            "@media only screen and (max-width: 764px)": {
              fontSize: 15,
              marginTop: "35px",
              marginBottom: "35px",
              maxWidth: "100%",
              textAlign: "left",
            },
          }}
        >
          KamayaKya is a SEBI registered research analyst. All information
          present on KamayaKya.com is to help investors in their decision-
          making process and shall not be considered as a recommendation or
          solicitation of an investment or investment strategy. Investors are
          responsible for their investment decisions and are responsible to
          validate all the information used to make the investment decision.
          Investor should understand that his/her investment decision is based
          on personal investment needs and risk tolerance, and performance
          information available on kamayakya.com is one amongst many other
          things that should be considered while making an investment decision.
          Past performance does not guarantee future returns and performance
          stocks are subject to market risk. Investments in the securities
          market are subject to market risks and investors should read all the
          related documents carefully before investing.
        </Text>
      </Box>
      <FaqsNew />
      <Footer />
    </div>
  );
};

export default Disclaimer;
