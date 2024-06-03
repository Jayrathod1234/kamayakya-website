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
            Kamayakya Wealth Management Pvt. Ltd makes no warranties or representations, express or implied, on products and services offered through the platform. It accepts no liability for any damages or losses, however, caused in connection with the use of, or on the reliance of its research and recommendation services. Past performance is not indicative of future returns. Please consider your specific investment requirements, risk tolerance, goal, time frame, risk and reward balance and the cost associated with the investment before choosing an investment option, or designing an investment strategy that suits your needs. Performance and returns of any investment strategy can neither be predicted nor guaranteed.
            Investment in securities market are subject to market risks. Read all the related documents carefully before investing. Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors
        </Text>
      </Box>
      <FaqsNew />
      <Footer />
    </div>
  );
};

export default Disclaimer;
