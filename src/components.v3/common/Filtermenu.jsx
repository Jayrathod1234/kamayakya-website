import React, { useEffect, useRef, useState } from "react";
import DrawerFilter from "@/components.v3/common/DrawerFilter";
import CustomSortMenu from "../common/RadioDrop.jsx";
import FilterMenuTags2 from "./FilterMenuTags2.jsx";
import ResponsiveFilter from "./ResponsiveFilter.jsx";
import { useMediaQuery } from "@mui/material";
import { useAllBoardStock } from "@/contexts/AllBoardStockContext";

function Filtermenu() {
  const { searchStock, setSearchStock } = useAllBoardStock();
  // sticky header
  const isMobile = useMediaQuery("(max-width:600px)");

  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);
  const formRef = useRef(null);

  // Function to handle click on the search button
  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // Focus the input when it expands
      setTimeout(() => inputRef.current.focus(), 300);
    }
  };

  useEffect(() => {
    if (searchStock) {
      setIsExpanded(true);
    }
  }, []);

  return (
    <>
      {/* <FilterMenuTags /> */}
      <div className="sticky top-[50px] right-0 z-[88] bg-[#f2f4f7] overflow-hidden items-center navbar-shadow">
        <div className="w-[min(1280px,calc(100%-25px))] min-w-[328px] mx-auto  py-[10px] px-0 flex gap-1 items-center pt-4">
          {/* Import FilterMenuTag here */}

          {/* <form
            ref={formRef}
            className={`search inline-flex items-center text-black px-1 py-[3px] rounded-md border border-[#E4E7EC] transition linear bg-white focus:border-red-800 ${
              isExpanded ? "w-full" : "w-auto"
            }`}
          >
            <input
              type="text"
              placeholder="Search Stocks by Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => {
                if (!search) setIsExpanded(false);
              }}
              ref={inputRef}
              className={`search__input transition-width duration-300 ${
                isExpanded ? "w-full px-2" : "w-0"
              }`}
            />
            <button
              type="button"
              onClick={handleSearchClick}
              className="search__button grid place-items-center w-[35px] h-[35px] cursor-pointer transition-colors duration-[0.25s] hover:text-[#e3e3e3] bg-[rgba(0, 0, 0, 0.1)] rounded-full "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                  stroke="#667085"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form> */}
          {/* <FilterMenuTagsdummy /> */}
          {/* <ResponsiveFilter/> */}
          <FilterMenuTags2 isResponsive={isMobile} />

          <div className="flex sm:gap-[10px] gap-2 items-center ">
            <div className=" items-center">
              <form
                ref={formRef}
                className={`search inline-flex items-center text-black px-1 py-[3px] rounded-md border border-[#E4E7EC] transition linear bg-white focus:border-red-800 ${
                  isExpanded ? "w-full" : "w-auto"
                }`}
              >
                <input
                  type="search"
                  placeholder="Search Stocks by Name"
                  value={searchStock}
                  onChange={(e) => setSearchStock(e.target.value)}
                  onFocus={() => setIsExpanded(true)}
                  onBlur={() => {
                    if (!searchStock) setIsExpanded(false);
                  }}
                  ref={inputRef}
                  className={`search__input transition-width duration-300 ${
                    isExpanded ? "w-full px-2" : "w-0"
                  }`}
                />
                <button
                  type="button"
                  onClick={handleSearchClick}
                  className="search__button grid place-items-center w-[35px] h-[35px] cursor-pointer transition-colors duration-[0.25s] hover:text-[#e3e3e3] bg-[rgba(0, 0, 0, 0.1)] rounded-full "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                      stroke="#667085"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
            {!isMobile && (
              <>
                <CustomSortMenu isLabel={false} />
                <div className="w-auto">
                  <DrawerFilter />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Filtermenu;
