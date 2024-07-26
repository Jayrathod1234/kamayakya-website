import React from "react";

function Mainboard() {
  return (
    <>
      <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto pb-[110px]">
        <p className=" text-display-xs text-[#0C111D] font-bold font-open_sans text-center pb-10">
          All Mainboard Stocks
        </p>
        <div className="flex gap-4 items-center">
          <div className="w-1/5">
            <div className=" bg-[#E7F8F8] border border-[#ADDFDB] py-[10px] px-[14px] rounded-md flex gap-2 items-center shadow-[0px 2px 6px 0px rgba(0, 0, 0, 0.05)]">
              <img src="/assets/mi_sort.svg" alt="" />
              <p className="font-medium font-open_sans">
                Returns : High to Low
              </p>
              <img src="/assets/chevron-down.svg" alt="" />
            </div>
          </div>
          <div className=" w-10/12">
            {/* <div className=" bg-white border border-[#E4E7EC] py-[10px] px-[14px] rounded-md flex gap-2 items-center shadow-[0px 2px 6px 0px rgba(0, 0, 0, 0.05)]">
              <img src="/assets/search.svg" alt="" />
              <p className="text-[#667085] font-normal font-open_sans">
                Search Stocks...
              </p>
            </div> */}

            <form class="">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white ml-2"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none gap-2">
                  {/* <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg> */}
                  <img src="/assets/search.svg" alt="" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full pr-[14px] pl-9 py-[12px] text-md text-gray-900 border border-[#E4E7EC] rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 "
                  placeholder="Search Stocks..."
                  required
                />
              </div>
            </form>
          </div>
          <div className="w-1/12">
            <button className=" bg-white border border-[#E4E7EC] py-[10px] pl-4 pr-5 rounded-md flex gap-2 items-center shadow-[0px 2px 6px 0px rgba(0, 0, 0, 0.05)]">
              <img src="/assets/filter.svg" alt="" />
              <p className="font-open_sans">Filter</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mainboard;
