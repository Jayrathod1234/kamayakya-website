import { useNavBar } from "@/contexts/NavBarContext";
import { useTrackRecord } from "@/contexts/trackRecordContext";
import React, { useRef } from "react";
import CustomSortMenu from "./RadioDrop";
import DrawerFilter from "./DrawerFilter";
import ResponsiveFilter from "./ResponsiveFilter";
import FilterMenuTags from './FilterMenuTags'
import Filtermenu from "./FilterMenu";

export default function Filters() {
  const { searchStock, setSearchStock } = useTrackRecord();
  const filterHeaderRef = useRef<null>(null);
  const { showFilterHeader } = useNavBar();
  return (
    <>
      <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto mt-5">
        <div className="flex flex-col sm:flex-row sm:gap-4 gap-0 items-center justify-between ">
          <div className="w-full">
            <div>
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
            </div>
          </div>
          <div className="flex sm:gap-4 gap-0 sm:h-[46px] h-0 ">
            <div className="w-auto sm:block hidden">
              <div className="relative flex gap-4">
                <CustomSortMenu isLabel={true} />
              </div>
            </div>
          </div>
          <div className="w-auto sm:block hidden bg-white h-[46px]">
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
          <FilterMenuTags ref={filterHeaderRef} />
        </>
      ) : (
        <>
          {/* ref={filterHeaderRef} */}
          <Filtermenu ref={filterHeaderRef} role="banner" aria-hidden={!showFilterHeader} />
        </>
      )}
    </>
  );
}
