import { useContext } from "react";

import { Footer, Navbar } from "@/components.v2/index.components";
import PageVisibility from "../components/PageVisibility";
import { NavBarProvider } from "@/contexts/NavBarContext.js";

const StockPicks = ({ children }) => {
  return (
    <PageVisibility>
      {(isPageVisible) => (
        <>
          <NavBarProvider>
            <div className=" navbar sticky top-0 z-[1111] ">
              <Navbar />
            </div>
            {children}
            <div className="">
              <Footer />
            </div>
          </NavBarProvider>
        </>
      )}
    </PageVisibility>
  );
};

export default StockPicks;
