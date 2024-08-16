import React, { useContext } from "react";
import { HotSlider } from "@/components.v3/common/HotSlider.jsx";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "@/components/AuthContext";
import StockCard from "@/components.v3/common/StockCard.jsx";
import { getHotStockListApi } from "@/api/stock-picks";
import HotStockSectionBlur from "./HotStockSectionBlur";
import HotStockSectionSlider from "./HotStockSectionSlider";
import StockCardSkeleton from "./skeletons/StockCardSkeleton";
const HotStockSection = ({ sebiBoardType }) => {
  const { isLoggedIn } = useContext(AuthContext);
  // Use react-query to fetch the strategy tag list
  const {
    data: { data: items = [], is_limited_view: isLimitedView = false } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hotStock", sebiBoardType, isLoggedIn],
    queryFn: () => getHotStockListApi({ isLoggedIn, type: sebiBoardType }),
  });

  return (
    <>
      {isLoading || error ? (
        <div className="flex pb-12 pt-[60px] carousel__container gap-5">
          <StockCardSkeleton length={5} />
        </div>
      ) : isLimitedView ? (
        <>
          <HotStockSectionBlur items={items} />
        </>
      ) : (
        <>
          <HotStockSectionSlider items={items} />
        </>
      )}
    </>
  );
};

export default HotStockSection;
