import React from "react";
import { Slider } from "@/components.v3/common/Slider.jsx";
import StockCard from "@/components.v3/common/StockCard.jsx";

function LatestReleases() {
  const items = [
    <StockCard
      title="Vidhi Specialty Food Ingredients Ltd."
      market_cap="12.24"
      recommended_stock={false}
      is_blur={false}
      new_stock={true}
    />,
    <StockCard
      title="Reliance Industries Ltd."
      market_cap="20.24"
      recommended_stock={false}
      is_blur={true}
      new_stock={true}
    />,
    <StockCard
      title="Tata Consultancy Services Ltd."
      market_cap="20.24"
      recommended_stock={true}
      is_blur={true}
      new_stock={true}
    />,
    <StockCard
      title="Infosys Ltd."
      market_cap="20.24"
      recommended_stock={true}
      is_blur={true}
      new_stock={true}
    />,
    <StockCard
      title="HDFC Bank Ltd."
      market_cap="20.24"
      recommended_stock={false}
      is_blur={false}
      new_stock={true}
    />,
    <StockCard
      title="ICICI Bank Ltd."
      market_cap="20.24"
      recommended_stock={true}
      is_blur={false}
      new_stock={true}
    />,
    <StockCard
      title="Bharti Airtel Ltd."
      market_cap="20.24"
      recommended_stock={false}
      is_blur={true}
      new_stock={true}
    />,
    <StockCard
      title="Hindustan Unilever Ltd."
      market_cap="20.24"
      recommended_stock={true}
      is_blur={true}
      new_stock={true}
    />,
  ];
  return (
    <>
      <div className=" pt-[339px] pb-[100px] ">
        <div className=" before:content-[''] before:bg-[url(/testimonials_texture.png)] before:absolute before:w-full before:h-full before:opacity-25 relative flex flex-col items-center justify-center text-center bg-cover">
          <p className=" text-display-xs text-[#0C111D] font-bold font-open_sans">
            Latest Releases ({items.length})
          </p>
          <p className=" text-sm font-normal text-[#475467] w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto pt-3 font-open_sans">
            New Stocks released in the last 60 days
          </p>
          <div className=" mb-6 w-full">
            <Slider items={items} />
          </div>
        </div>
      </div>
    </>
  );
}

export default LatestReleases;
