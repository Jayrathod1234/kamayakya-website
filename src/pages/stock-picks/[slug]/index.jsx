import { useContext } from "react";
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
import AuthContext from "@/components/AuthContext";
import PageVisibility from "@/components/PageVisibility";
import Stockdetails from "@/components.v2/Stockdetails";

const StockDetails = () => {
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
          <div className="!bg-transparent navbar !text-black"><Navbar /></div>
          <div>
            <Stockdetails />
          </div>

          <div className="  ">
            <Footer />
          </div>
        </>
      )}
    </PageVisibility>
  );
};

export default StockDetails;
