import { useContext } from "react";
import NavBar2 from "../components/Navbar2";
import NavBar from "../components/Navbar";
import StockCard from "../components/StockCard";
import FaqsNew from "./screens/FaqsNew";

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
import AuthContext from "../components/AuthContext";
import PageVisibility from "../components/PageVisibility";
import Stockpicks from "../components.v2/Stockpicks";

const StockPicks = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <PageVisibility>
      {(isPageVisible) => (
        <>
          {/* {isLoggedIn ?  : ""} */}
          {/* <div
            style={{
              background: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          > */}

          {/* <StockCardBlur /> */}
          {/* <FaqsNew /> */}
          {/* <Footer /> */}
          {/* </div> */}
          <div className="bg-white">
            <Navbar />
          </div>
          {/* <StockCard /> */}
          {/* <StockPicks /> */}
          <div>
            <Stockpicks />
          </div>

          <div className="   mt-[-10%]">
            <Footer />
          </div>
        </>
      )}
    </PageVisibility>
  );
};

export default StockPicks;
