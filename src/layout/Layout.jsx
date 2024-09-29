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
      {/* <div
        className={`navbar  ${isMobile && pathname == "/stock-picks/[slug]" ? "" : "sticky top-0"
          }`}
      > */}
        <Navbar className={`${pathname === "/stock-picks/[slug]" ?"bg-[#f9fafb]":"[--sidenav-hamburger-color:#fff] [&.scrolled-nav]:[--sidenav-hamburger-color:#000]"}`} navigationLinkClassName={`  ${pathname === "/stock-picks/[slug]" ? "data-[state=open]:bg-[#EAFCFB] data-[state=open]:hover:bg-[#EAFCFB] hover:bg-[#EAFCFB]" : "text-white data-[state=open]:text-gray-900"} `} />
      {/* </div > */}
      <div className="">
        {children}
      </div>
      <div className="">
        <Footer />
      </div>
    </>
  );
};

export default StockPicks;
