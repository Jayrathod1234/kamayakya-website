import React from "react";

function SearchPage() {
  return (
    <>
      <div class="p-4">
        {/* <!-- Stock Search --> */}
        <input
          type="text"
          placeholder="Search Stocks by Name..."
          class="w-full p-2 border rounded-md mb-4 text-sm"
        />

        {/* <!-- Stock Cards Container --> */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* <!-- Stock Card 1 --> */}
          <div class="border rounded-lg p-4 shadow-md min-w-[320px]">
            <div class="flex items-center gap-2 mb-2">
              {/* <!-- Stock Icon --> */}
              <img src="/path/to/icon.png" alt="Icon" class="w-8 h-8 rounded" />
              {/* <!-- Stock Category --> */}
              <span class="text-xs bg-orange-100 text-orange-600 py-1 px-2 rounded-lg">
                Chemicals
              </span>
            </div>
            {/* <!-- Stock Name --> */}
            <h2 class="text-base font-semibold text-blue-700 truncate">
              Vidhi Specialty Food Ingredients Ltd.
            </h2>
            {/* <!-- Stock Details --> */}
            <div class="text-sm text-gray-500">
              <p>
                Upside Left: <span class="text-green-600 font-bold">4.24%</span>
              </p>
              <p>
                Total Returns:{" "}
                <span class="text-green-600 font-bold">12.24%</span>
              </p>
            </div>
          </div>

          {/* <!-- Stock Card 2 --> */}
          <div class="border rounded-lg p-4 shadow-md min-w-[320px]">
            <div class="flex items-center gap-2 mb-2">
              {/* <!-- Stock Icon --> */}
              <img src="/path/to/icon.png" alt="Icon" class="w-8 h-8 rounded" />
              {/* <!-- Stock Category --> */}
              <span class="text-xs bg-orange-100 text-orange-600 py-1 px-2 rounded-lg">
                Chemicals
              </span>
            </div>
            {/* <!-- Stock Name --> */}
            <h2 class="text-base font-semibold text-blue-700 truncate">
              Tata Motors
            </h2>
            {/* <!-- Stock Details --> */}
            <div class="text-sm text-gray-500">
              <p>
                Upside Left: <span class="text-green-600 font-bold">4.24%</span>
              </p>
              <p>
                Total Returns:{" "}
                <span class="text-green-600 font-bold">12.24%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
