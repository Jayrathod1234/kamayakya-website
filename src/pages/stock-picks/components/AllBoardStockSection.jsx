import React, { useContext, useEffect, useRef, useState } from "react";
import StockCard from "@/components.v3/common/StockCard.jsx";
import InvestmentSection from "@/pages/stock-picks/components/InvestmentSection";
import ElevateSection from "@/pages/stock-picks/components/ElevateSection";
import FilterMenuTags from "@/components.v3/common/FilterMenuTags.jsx";
import Filtermenu from "@/components.v3/common/Filtermenu.jsx";
import CustomSortMenu from "../../../components.v3/common/RadioDrop";
import StockCardSkeleton from "./skeletons/StockCardSkeleton";
import { onScrollPaginationFunction } from "@/utils/onScrollPaginationFunction";
import DrawerFilter from "@/components.v3/common/DrawerFilter";
import ResponsiveFilter from "../../../components.v3/common/ResponsiveFilter";
import { useAllBoardStock } from "@/contexts/AllBoardStockContext";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { useNavBar } from "@/contexts/NavBarContext.js";
function AllBoardStockSection() {
  const {
    searchStock,
    setSearchStock,
    response,
    isLoading,
    error,
    fetchNextPage,
  } = useAllBoardStock();

  const { sebiBoardType } = useStockPicks();

  const { showFilterHeader, setShowFilterHeader } = useNavBar();

  const myObserver = useRef();
  // Use react infinite query to fetch the list

  const items = response?.pages?.flatMap((page) => page.data) ?? [];

  // Scroll Function
  useEffect(() => {
    // Start observing the element referenced by observerElem.current
    if (myObserver.current) {
      onScrollPaginationFunction(fetchNextPage).observe(myObserver.current);
    }
    // Clean up function to stop observing when component unmounts
    return () => {
      if (myObserver.current) {
        onScrollPaginationFunction(fetchNextPage).unobserve(myObserver.current);
      }
    };
  }, [fetchNextPage]);

  // sticky header

  const filterHeaderRef = useRef(null);
  const showFilterRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (showFilterRef.current) {
        const rect = showFilterRef.current?.getBoundingClientRect();
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
      <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto z-[20000]">
        <p className="text-display-xs text-gray-950 font-bold font-open_sans text-center sm:pb-10 pb-4">
          All {sebiBoardType == "mainboard" ? "Mainboard" : "SME"} Stocks
        </p>
      </div>
      <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:gap-4 gap-0 items-center justify-between ">
          <div className="w-full">
            <form>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white ml-2 shadow-3xs"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none gap-2">
                  <img src="/assets/search.svg" alt="" />
                </div>
                <input
                  type="search"
                  name="search-stock"
                  id="default-search"
                  className="block w-full pr-[14px] pl-9 py-[11px] text-md text-gray-900 border border-[#E4E7EC] rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 shadow-3xs"
                  placeholder="Search Stocks by Name..."
                  value={searchStock}
                  onChange={(e) => setSearchStock(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="flex sm:gap-4 gap-0 sm:h-12 h-0 ">
            <div className="w-auto sm:block hidden">
              <div className="relative flex gap-4">
                <CustomSortMenu isLabel={true} />
              </div>
            </div>
          </div>
          <div className="w-auto sm:block hidden bg-white h-12">
            <DrawerFilter />
          </div>
        </div>
      </div>
      {/* filter menu code not delete -nehakikani */}
      {/* main filter  */}
      {!showFilterHeader ? (
        <>
          {/* <Filtermenu2 /> */}
          <ResponsiveFilter />
          <FilterMenuTags />
        </>
      ) : (
        <>
          <Filtermenu
            ref={filterHeaderRef}
            role="banner"
            aria-hidden={!showFilterHeader}
          />
        </>
      )}
      {/* <FilterCarousel /> */}
      {/* <Filtermenu2 /> */}
      {/* sticky filtermenu */}

      {/* blur card  */}
      <div
        className=" bg-[#F2F4F7] py-10 sm:px-20 px-0 relative sm:overflow-visible overflow-hidden "
        ref={showFilterRef}
      >
        <div className="w-[min(1280px,calc(100%-32px))]  mx-auto">
          <div className="grid sm:grid-cols-1 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {isLoading || error ? (
              <StockCardSkeleton length={9} />
            ) : items.length > 0 ? (
              items.map((value, index) => (
                <StockCard
                  key={index} // Ensure each item has a unique key
                  {...value}
                />
              ))
            ) : (
              <>
                <div></div>
                <div className="text-center">No stock found</div>
              </>
            )}
          </div>
          <div ref={myObserver} className="h-1"></div>
          {/* Blur Rectangle  */}
          {/* <div className="absolute bottom-[440px] z-[1] max-h-[400px] w-full">
            <img
              src="/assets/Rectangle.png"
              alt=""
              className="max-h-[400px] w-full"
            />
          </div> */}
          <div className="sm:pt-[100px] pt-[60px] ">
            <InvestmentSection />
          </div>
          <ElevateSection />
        </div>
      </div>
    </>
  );
}

export default AllBoardStockSection;
