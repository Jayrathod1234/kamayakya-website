import React, { useContext, useEffect, useRef, useState } from "react";
import CustomSortMenu from "./RadioDrop";

import FilterMenuTags2 from "./FilterMenuTags2";
import DrawerFilter from "@/components.v3/common/DrawerFilter";
import AuthContext from "@/components/AuthContext";
import { useDebounce } from "../../utils/deBounceSearch";
import { initialFilterTime } from "@/utils/constants.js";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, styled } from "@mui/material";
import { Slider } from "@mui/material";

function ResponsiveFilter() {
  // sticky header
  const filterHeaderRef = useRef(null);
  const xyzRef = useRef(null);
  const [showFilterHeader, setShowFilterHeader] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (xyzRef.current) {
        const rect = xyzRef.current?.getBoundingClientRect();
        setShowFilterHeader(rect.top <= 110);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="sm:hidden block">
        <Box
          sx={{
            display: "flex",
            width: "375px",
            overflow: "hidden",
          }}
        >
          <Box className="w-[min(1280px,calc(100%-25px))] min-w-[328px] mx-auto  py-[10px] px-0 flex gap-1 items-center pt-4">
            {/* <CustomSortMenu /> */}

            {/* <div className="w-auto sm:block hidden"> */}

            {/* </div> */}
            <FilterMenuTags2
              isResponsive={true}
              ref={filterHeaderRef}
              role="banner"
              aria-hidden={!showFilterHeader}
            />
          </Box>

          {/* </div> */}
        </Box>
      </div>
    </>
  );
}

export default ResponsiveFilter;
