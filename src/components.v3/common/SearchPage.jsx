import React, { useContext, useEffect, useRef } from "react";
import { useAllBoardStock } from "@/contexts/AllBoardStockContext";
import { onScrollPaginationFunction } from "@/utils/onScrollPaginationFunction";
import { useStockPicks } from "@/contexts/StockPicksContext";
import AuthContext from "@/components/AuthContext";
import Link from "next/link";

function SearchPage() {
  const {
    searchStock,
    setSearchStock,
    response,
    isLoading,
    error,
    fetchNextPage,
  } = useAllBoardStock();

  const { setSearchPageOpen } = useStockPicks();
  const { stockSector } = useStockPicks();
  const { isLoggedIn, handleLogin } = useContext(AuthContext);

  const myObserver = useRef();

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
  const items = response?.pages?.flatMap((page) => page.data) ?? [];
  return (
    <>
      <div class=" bg-[#F2F4F7] h-screen overflow-hidden ">
        {/* <!-- Stock Search --> */}
        <div className="bg-[#F2F4F7] p-4 sticky top-0 right-0 left-0">
          <div class="flex items-center bg-white   rounded-[6px] shadow-2xs">
            {/* <!-- Left icon --> */}
            <span
              class="pl-[14px] text-green-800 "
              onClick={() => setSearchPageOpen(false)}
            >
              {/* <!-- Use any icon, like FontAwesome or HeroIcons (example: HeroIcons) --> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 6L9 12L15 18"
                  stroke="#125B54"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>

            {/* <!-- Input field --> */}
            <input
              type="search"
              placeholder="Search Stocks by Name..."
              class="w-full py-2.5 pl-2 text-gray-500 focus:outline-none rounded-r-lg bg-white"
              value={searchStock}
              onChange={(e) => setSearchStock(e.target.value)}
            />
            {/* close icon in serach bar  */}
            <div className="pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="#667085"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* <div class="flex items-center justify-center space-x-2 my-6"> */}
        {/* <!-- Left line --> */}
        {/* <div class="flex-grow border-t border-[#D0D5DD]"></div> */}

        {/* <!-- Text below the icon --> */}
        {/* <div class="text-center text-[#667085] text-2xs font-medium leading-4 font-open_sans">
            Your Recent Searches
          </div> */}
        {/* <!-- Right line --> */}
        {/* <div class="flex-grow border-t border-[#D0D5DD]"></div> */}
        {/* </div> */}

        {/* <!-- Stock Cards Container --> */}

        {isLoading || error ? (
          <></>
        ) : items.length > 0 ? (
          items.map((value, index) => {
            const href = !isLoggedIn
              ? "#"
              : value.is_blur
              ? `/pricing`
              : `/stock-picks/${value.id}`;
            const onClick = !isLoggedIn ? handleLogin : undefined;
            return (
              <Link key={index} href={href}>
                <div
                  class="grid grid-cols-1  pr-[15px] pl-[17px]"
                  onClick={onClick}
                >
                  <div className=" shadow  !rounded-lg">
                    <div class="bg-white    p-3  items-center space-x-4 border-b-2 border-[#F2F4F7]">
                      {stockSector && value.sector && (
                        <div className="py-[2px] pr-[16px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px]  flex-shrink-0 max-w-[105px]">
                          <img
                            src="/assets/streamline_hotel-air-conditioner-solid.svg"
                            alt=""
                            className="w-3"
                          />

                          <p className="text-[10px] font-semibold text-[#A3651A] text-nowrap font-open_sans truncate">
                            {stockSector[value.sector]}
                          </p>
                        </div>
                      )}

                      <div class=" items-center pt-2.5 !ml-0 flex">
                        <div className=" gap-[10px] items-center">
                          {value.stock_image ? (
                            <img
                              src={value.stock_image}
                              className="w-9 h-9 rounded-lg"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-lg bg-[#D9D9D9]"></div>
                          )}
                        </div>
                        <div className="ml-[10px]">
                          {value.is_blur ? (
                            <div className="h-5 bg-[#EDF0F5] rounded-[20px] min-w-[200px] sm:min-w-[206px] md:min-w-[200px] slg:min-w-[208px] lg:min-w-[271px]"></div>
                          ) : (
                            <h2 class="text-md font-medium text-[#0C111D] font-open_sans mb-0">
                              {" "}
                              {value.stock_name}
                            </h2>
                          )}

                          <div class="flex items-center space-x-4 text-2xs mt-[2px]">
                            <div class="text-[#98A2B3] font-medium font-open_sans flex gap-2 items-center">
                              Upside Left:
                              <span class="text-green-600 font-bold text-sm">
                                {value.upside_left || 0}%
                              </span>
                            </div>
                            <div class="text-[#98A2B3] font-medium font-open_sans flex gap-2 items-center">
                              Total Returns:
                              <span
                                class={`${
                                  value.gain_loss >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                } font-bold text-sm`}
                              >
                                {value.gain_loss == null ? (
                                  <>-</>
                                ) : (
                                  <>{value.gain_loss}%</>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <>
            {/* not Found  */}
            <div className="my-[230px] ">
              <div className="flex justify-center items-center ">
                <img src="/assets/not-found.svg" />
              </div>
              <div className="pt-2.5 text-center">
                <p className="font-open_sans text-sm font-normal text-[#667085]">
                  No Results Found!
                </p>
              </div>
            </div>
          </>
        )}

        <div ref={myObserver} className="h-1"></div>
      </div>
    </>
  );
}

export default SearchPage;
