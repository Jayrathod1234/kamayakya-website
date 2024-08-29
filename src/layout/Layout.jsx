import { useContext } from "react";

import { Footer, Navbar } from "@/components.v2/index.components";
import PageVisibility from "../components/PageVisibility";

const StockPicks = ({ children }) => {
  return (
    <PageVisibility>
      {(isPageVisible) => (
        <>
            <div className=" navbar sticky top-0 z-[1111] ">
              <Navbar />
            </div>
            {children}
            <div className="">
              <Footer />
            </div>
        </>
      )}
    </PageVisibility>
  );
};

export default StockPicks;
