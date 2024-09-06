import { useContext } from "react";

import { Footer, Navbar } from "@/components.v2/index.components";

const StockPicks = ({ children }) => {
  return (
      <>
          <div className=" navbar sticky top-0 z-[1111] ">
            <Navbar />
          </div>
          {children}
          <div className="">
            <Footer />
          </div>
      </>
  );
};

export default StockPicks;
