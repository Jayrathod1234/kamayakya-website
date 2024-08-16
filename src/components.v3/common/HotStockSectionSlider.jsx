import React, { useContext } from "react";
import { HotSlider } from "./HotSlider";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../components/AuthContext";
import StockCard from "@/components.v3/common/StockCard.jsx";

const HotStockSectionSlider = ({ sebiBoardType }) => {
  const { isLoggedIn } = useContext(AuthContext);
  // Use react-query to fetch the strategy tag list
  const { data: items = [] } = useQuery({
    queryKey: ["latestReleasesStock", sebiBoardType, isLoggedIn],
    queryFn: () =>
      getLatestReleasesStockListApi({ isLoggedIn, type: sebiBoardType }),
  });
  return (
    <>
      {items.length > 0 && (
        <div className=" mb-6 w-full">
          <HotSlider>
            {items.map((value) => (
              <StockCard
                key={value.id} // Ensure each item has a unique key
                {...value}
              />
            ))}
          </HotSlider>
        </div>
      )}
    </>
  );
};

export default HotStockSectionSlider;
