import { useContext } from "react";

import { Footer, Navbar } from "@/components.v2/index.components";
import Image from "next/image";
import { Open_Sans } from "next/font/google";
import AuthContext from "../components/AuthContext";
import PageVisibility from "../components/PageVisibility";

const StockPicks = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <PageVisibility>
      {(isPageVisible) => (
        <>
          <div className="!bg-transparent navbar ">
            <Navbar />
          </div>
          <div>{children}</div>
          <div className="">
            <Footer />
          </div>
        </>
      )}
    </PageVisibility>
  );
};

export default StockPicks;
