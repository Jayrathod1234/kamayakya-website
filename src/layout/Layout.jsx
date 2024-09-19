import { useContext } from "react";

import { Footer, Navbar } from "@/components.v2/index.components";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
const StockPicks = ({ children }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const router = useRouter();
  const pathname = router.pathname;
  return (
    <>
      <div
        className={`navbar  z-[1111] ${isMobile && (pathname == "/stock-picks/[slug]" || pathname == "/track-record/[slug]") ? "" : "sticky top-0"
          }`}
      >
        <Navbar />
      </div >
      <div className="z-[20000] open_sans">
        {children}
      </div>
      <div className="">
        <Footer />
      </div>
    </>
  );
};

export default StockPicks;
