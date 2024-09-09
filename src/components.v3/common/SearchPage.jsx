import React from "react";

function SearchPage() {
  return (
    <>
      <div class="">
        {/* <!-- Stock Search --> */}
        <div class="flex items-center bg-white shadow-md rounded-lg">
          {/* <!-- Left icon --> */}
          <span class="pl-[14px] text-green-800">
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
            type="text"
            placeholder="Search Stocks by Name..."
            class="w-full py-2.5 pl-2 text-gray-500 focus:outline-none rounded-r-lg bg-white"
          />
          {/* close icon in serach bar  */}
          {/* <div className="pr-3">
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
          </div> */}
        </div>
        <div class="flex items-center justify-center space-x-2 my-6">
          {/* <!-- Left line --> */}
          <div class="flex-grow border-t border-[#D0D5DD]"></div>

          {/* <!-- Text below the icon --> */}
          <div class="text-center text-[#667085] text-2xs font-medium leading-4 font-open_sans">
            Your Recent Searches
          </div>
          {/* <!-- Right line --> */}
          <div class="flex-grow border-t border-[#D0D5DD]"></div>
        </div>

        {/* <!-- Stock Cards Container --> */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* <!-- Stock Card 1 --> */}
          <div class="bg-white shadow rounded-lg p-3  items-center space-x-4">
            <div className="py-[2px] pr-[16px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px]  flex-shrink-0 max-w-[114px] w-full">
              <img
                src="/assets/streamline_hotel-air-conditioner-solid.svg"
                alt=""
                className="w-3"
              />
              <p className="text-[10px] font-semibold text-[#A3651A]">
                Air Conditioners
              </p>
            </div>

            {/* <!-- Company Info --> */}
            <div class=" items-center pt-2.5 !ml-0 flex">
              <div className=" gap-[10px] items-center">
                <div className="w-9 h-9 rounded-lg bg-[#D9D9D9]"></div>
              </div>
              <div className="ml-[10px]">
                <h2 class="text-md font-medium text-[#0C111D] font-open_sans mb-0">
                  Vidhi Specialty Food Ingredients Ltd.
                </h2>
                <div class="flex items-center space-x-4 text-2xs mt-[2px]">
                  <div class="text-[#98A2B3] font-medium font-open_sans flex gap-2 items-center">
                    Upside Left:
                    <span class="text-green-600 font-bold text-sm">4.24%</span>
                  </div>
                  <div class="text-[#98A2B3] font-medium font-open_sans flex gap-2 items-center">
                    Total Returns:
                    <span class="text-green-600 font-bold text-sm">12.24%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2  */}
        {/* <!-- Stock Cards Container --> */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-1">
          {/* <!-- Stock Card 1 --> */}
          <div class="bg-white shadow rounded-lg p-3  items-center space-x-4">
            <div className="py-[2px] pr-[16px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px]  flex-shrink-0 max-w-[114px] w-full">
              <img
                src="/assets/streamline_hotel-air-conditioner-solid.svg"
                alt=""
                className="w-3"
              />
              <p className="text-[10px] font-semibold text-[#A3651A]">
                Air Conditioners
              </p>
            </div>

            {/* <!-- Company Info --> */}
            <div class=" items-center pt-2.5 !ml-0 flex">
              <div className=" gap-[10px] items-center">
                <div className="w-9 h-9 rounded-lg bg-[#D9D9D9]"></div>
              </div>
              <div className="ml-[10px]">
                <h2 class="text-md font-medium text-[#0C111D] font-open_sans mb-0">
                  Vidhi Specialty Food Ingredients Ltd.
                </h2>
                <div class="flex items-center space-x-4 text-2xs mt-[2px]">
                  <div class="text-[#98A2B3] font-medium font-open_sans flex gap-2 items-center">
                    Upside Left:
                    <span class="text-green-600 font-bold text-sm">4.24%</span>
                  </div>
                  <div class="text-[#98A2B3] font-medium font-open_sans flex gap-2 items-center">
                    Total Returns:
                    <span class="text-green-600 font-bold text-sm">12.24%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* not Found  */}
        {/* <div className="flex justify-center items-center">
          <img src="/assets/not-found.svg" />
        </div>
        <div className="pt-2.5 text-center">
          <p className="font-open_sans text-sm font-normal text-[#667085]">
            No Results Found!
          </p>
        </div> */}
      </div>
    </>
  );
}

export default SearchPage;
