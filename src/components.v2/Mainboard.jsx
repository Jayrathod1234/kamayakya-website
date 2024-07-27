import React from "react";

function Mainboard() {
  return (
    <>
      <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto pb-[110px]">
        <p className=" text-display-xs text-[#0C111D] font-bold font-open_sans text-center pb-10">
          All Mainboard Stocks
        </p>
        <div className="flex gap-4 items-center">
          <div className="w-3/12">
            {/* <div className=" bg-[#E7F8F8] border border-[#ADDFDB] py-[10px] px-[14px] rounded-md flex gap-2 items-center shadow-[0px 2px 6px 0px rgba(0, 0, 0, 0.05)]">
              <img src="/assets/mi_sort.svg" alt="" />
              <p className="font-medium font-open_sans">
                Returns : High to Low
              </p>
              <img src="/assets/chevron-down.svg" alt="" />
            </div> */}
            <div>
              <button
                type="button"
                class="inline-flex justify-center w-full bg-[#E7F8F8] border border-[#ADDFDB] py-[10px] px-[14px] rounded-md  gap-2 items-center shadow-[0px 2px 6px 0px rgba(0, 0, 0, 0.05)] "
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                <img src="/assets/mi_sort.svg" alt="" />
                Returns : High to Low
                <svg
                  class="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* <div
              class="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div class="py-1" role="none">
                <label class="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                  <input
                    type="radio"
                    name="sort"
                    class="form-radio text-indigo-600"
                    checked
                  />
                  <span class="ml-2">High to Low</span>
                </label>
                <label class="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                  <input
                    type="radio"
                    name="sort"
                    class="form-radio text-indigo-600"
                  />
                  <span class="ml-2">Low to High</span>
                </label>

                <label class="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                  <input
                    type="radio"
                    name="sort"
                    class="form-radio text-indigo-600"
                  />
                  <span class="ml-2">Newest to Oldest</span>
                </label>
                <label class="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                  <input
                    type="radio"
                    name="sort"
                    class="form-radio text-indigo-600"
                  />
                  <span class="ml-2">Oldest to Newest</span>
                </label>

                <label class="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                  <input
                    type="radio"
                    name="sort"
                    class="form-radio text-indigo-600"
                  />
                  <span class="ml-2">Longest to Shortest</span>
                </label>
                <label class="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                  <input
                    type="radio"
                    name="sort"
                    class="form-radio text-indigo-600"
                  />
                  <span class="ml-2">Shortest to Longest</span>
                </label>

                <label class="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                  <input
                    type="radio"
                    name="sort"
                    class="form-radio text-indigo-600"
                  />
                  <span class="ml-2">High to Low</span>
                </label>
                <label class="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                  <input
                    type="radio"
                    name="sort"
                    class="form-radio text-indigo-600"
                  />
                  <span class="ml-2">Low to High</span>
                </label>
              </div>
            </div> */}
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
                  class="block w-full pr-[14px] pl-9 py-[12px] text-md text-gray-900 border border-[#E4E7EC] rounded-lg bg-white  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 "
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

        <div className="w-full py-[10px] px-5 flex gap-1 items-center justify-between pt-4">
          <div className="w-1/12">
            <p className="font-open_sans text-sm font-normal text-[#344054]">
              Quick Filters:
            </p>
          </div>
          <div className="w-auto">
            <div className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.44991 2.33977C6.02022 2.33977 3.23991 5.12008 3.23991 8.54977C3.23991 11.9795 6.02022 14.7598 9.44991 14.7598C9.84856 14.7598 10.238 14.7223 10.6149 14.6508C10.9079 14.5952 11.1905 14.7877 11.2461 15.0807C11.3017 15.3737 11.1092 15.6563 10.8162 15.7118C10.3732 15.7959 9.91644 15.8398 9.44991 15.8398C5.42376 15.8398 2.15991 12.5759 2.15991 8.54977C2.15991 4.52361 5.42376 1.25977 9.44991 1.25977C13.4761 1.25977 16.7399 4.52361 16.7399 8.54977C16.7399 8.848 16.4982 9.08977 16.1999 9.08977C15.9017 9.08977 15.6599 8.848 15.6599 8.54977C15.6599 5.12008 12.8796 2.33977 9.44991 2.33977ZM9.44991 5.32542C9.74815 5.32542 9.98991 5.56718 9.98991 5.86542V9.00431L12.1519 9.72498C12.4349 9.81929 12.5878 10.1251 12.4935 10.408C12.3991 10.691 12.0933 10.8439 11.8104 10.7496L9.27915 9.90581C9.05865 9.8323 8.90991 9.62595 8.90991 9.39352V5.86542C8.90991 5.56718 9.15168 5.32542 9.44991 5.32542Z"
                  fill="#475467"
                />
              </svg>
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Most Recent
              </p>
            </div>
          </div>
          <div className="w-auto">
            <div className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.44991 2.33977C6.02022 2.33977 3.23991 5.12008 3.23991 8.54977C3.23991 11.9795 6.02022 14.7598 9.44991 14.7598C9.84856 14.7598 10.238 14.7223 10.6149 14.6508C10.9079 14.5952 11.1905 14.7877 11.2461 15.0807C11.3017 15.3737 11.1092 15.6563 10.8162 15.7118C10.3732 15.7959 9.91644 15.8398 9.44991 15.8398C5.42376 15.8398 2.15991 12.5759 2.15991 8.54977C2.15991 4.52361 5.42376 1.25977 9.44991 1.25977C13.4761 1.25977 16.7399 4.52361 16.7399 8.54977C16.7399 8.848 16.4982 9.08977 16.1999 9.08977C15.9017 9.08977 15.6599 8.848 15.6599 8.54977C15.6599 5.12008 12.8796 2.33977 9.44991 2.33977ZM9.44991 5.32542C9.74815 5.32542 9.98991 5.56718 9.98991 5.86542V9.00431L12.1519 9.72498C12.4349 9.81929 12.5878 10.1251 12.4935 10.408C12.3991 10.691 12.0933 10.8439 11.8104 10.7496L9.27915 9.90581C9.05865 9.8323 8.90991 9.62595 8.90991 9.39352V5.86542C8.90991 5.56718 9.15168 5.32542 9.44991 5.32542Z"
                  fill="#475467"
                />
              </svg>
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Most Recent
              </p>
            </div>
          </div>
          <div className="w-auto">
            <div className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.44991 2.33977C6.02022 2.33977 3.23991 5.12008 3.23991 8.54977C3.23991 11.9795 6.02022 14.7598 9.44991 14.7598C9.84856 14.7598 10.238 14.7223 10.6149 14.6508C10.9079 14.5952 11.1905 14.7877 11.2461 15.0807C11.3017 15.3737 11.1092 15.6563 10.8162 15.7118C10.3732 15.7959 9.91644 15.8398 9.44991 15.8398C5.42376 15.8398 2.15991 12.5759 2.15991 8.54977C2.15991 4.52361 5.42376 1.25977 9.44991 1.25977C13.4761 1.25977 16.7399 4.52361 16.7399 8.54977C16.7399 8.848 16.4982 9.08977 16.1999 9.08977C15.9017 9.08977 15.6599 8.848 15.6599 8.54977C15.6599 5.12008 12.8796 2.33977 9.44991 2.33977ZM9.44991 5.32542C9.74815 5.32542 9.98991 5.56718 9.98991 5.86542V9.00431L12.1519 9.72498C12.4349 9.81929 12.5878 10.1251 12.4935 10.408C12.3991 10.691 12.0933 10.8439 11.8104 10.7496L9.27915 9.90581C9.05865 9.8323 8.90991 9.62595 8.90991 9.39352V5.86542C8.90991 5.56718 9.15168 5.32542 9.44991 5.32542Z"
                  fill="#475467"
                />
              </svg>
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Most Recent
              </p>
            </div>
          </div>
          <div className="w-auto">
            <div className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.44991 2.33977C6.02022 2.33977 3.23991 5.12008 3.23991 8.54977C3.23991 11.9795 6.02022 14.7598 9.44991 14.7598C9.84856 14.7598 10.238 14.7223 10.6149 14.6508C10.9079 14.5952 11.1905 14.7877 11.2461 15.0807C11.3017 15.3737 11.1092 15.6563 10.8162 15.7118C10.3732 15.7959 9.91644 15.8398 9.44991 15.8398C5.42376 15.8398 2.15991 12.5759 2.15991 8.54977C2.15991 4.52361 5.42376 1.25977 9.44991 1.25977C13.4761 1.25977 16.7399 4.52361 16.7399 8.54977C16.7399 8.848 16.4982 9.08977 16.1999 9.08977C15.9017 9.08977 15.6599 8.848 15.6599 8.54977C15.6599 5.12008 12.8796 2.33977 9.44991 2.33977ZM9.44991 5.32542C9.74815 5.32542 9.98991 5.56718 9.98991 5.86542V9.00431L12.1519 9.72498C12.4349 9.81929 12.5878 10.1251 12.4935 10.408C12.3991 10.691 12.0933 10.8439 11.8104 10.7496L9.27915 9.90581C9.05865 9.8323 8.90991 9.62595 8.90991 9.39352V5.86542C8.90991 5.56718 9.15168 5.32542 9.44991 5.32542Z"
                  fill="#475467"
                />
              </svg>
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Most Recent
              </p>
            </div>
          </div>
          <div className="w-auto">
            <div className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.44991 2.33977C6.02022 2.33977 3.23991 5.12008 3.23991 8.54977C3.23991 11.9795 6.02022 14.7598 9.44991 14.7598C9.84856 14.7598 10.238 14.7223 10.6149 14.6508C10.9079 14.5952 11.1905 14.7877 11.2461 15.0807C11.3017 15.3737 11.1092 15.6563 10.8162 15.7118C10.3732 15.7959 9.91644 15.8398 9.44991 15.8398C5.42376 15.8398 2.15991 12.5759 2.15991 8.54977C2.15991 4.52361 5.42376 1.25977 9.44991 1.25977C13.4761 1.25977 16.7399 4.52361 16.7399 8.54977C16.7399 8.848 16.4982 9.08977 16.1999 9.08977C15.9017 9.08977 15.6599 8.848 15.6599 8.54977C15.6599 5.12008 12.8796 2.33977 9.44991 2.33977ZM9.44991 5.32542C9.74815 5.32542 9.98991 5.56718 9.98991 5.86542V9.00431L12.1519 9.72498C12.4349 9.81929 12.5878 10.1251 12.4935 10.408C12.3991 10.691 12.0933 10.8439 11.8104 10.7496L9.27915 9.90581C9.05865 9.8323 8.90991 9.62595 8.90991 9.39352V5.86542C8.90991 5.56718 9.15168 5.32542 9.44991 5.32542Z"
                  fill="#475467"
                />
              </svg>
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Most Recent
              </p>
            </div>
          </div>
          <div className="w-auto">
            <div className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.44991 2.33977C6.02022 2.33977 3.23991 5.12008 3.23991 8.54977C3.23991 11.9795 6.02022 14.7598 9.44991 14.7598C9.84856 14.7598 10.238 14.7223 10.6149 14.6508C10.9079 14.5952 11.1905 14.7877 11.2461 15.0807C11.3017 15.3737 11.1092 15.6563 10.8162 15.7118C10.3732 15.7959 9.91644 15.8398 9.44991 15.8398C5.42376 15.8398 2.15991 12.5759 2.15991 8.54977C2.15991 4.52361 5.42376 1.25977 9.44991 1.25977C13.4761 1.25977 16.7399 4.52361 16.7399 8.54977C16.7399 8.848 16.4982 9.08977 16.1999 9.08977C15.9017 9.08977 15.6599 8.848 15.6599 8.54977C15.6599 5.12008 12.8796 2.33977 9.44991 2.33977ZM9.44991 5.32542C9.74815 5.32542 9.98991 5.56718 9.98991 5.86542V9.00431L12.1519 9.72498C12.4349 9.81929 12.5878 10.1251 12.4935 10.408C12.3991 10.691 12.0933 10.8439 11.8104 10.7496L9.27915 9.90581C9.05865 9.8323 8.90991 9.62595 8.90991 9.39352V5.86542C8.90991 5.56718 9.15168 5.32542 9.44991 5.32542Z"
                  fill="#475467"
                />
              </svg>
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Most Recent
              </p>
            </div>
          </div>
          <div className="w-auto">
            <div className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.44991 2.33977C6.02022 2.33977 3.23991 5.12008 3.23991 8.54977C3.23991 11.9795 6.02022 14.7598 9.44991 14.7598C9.84856 14.7598 10.238 14.7223 10.6149 14.6508C10.9079 14.5952 11.1905 14.7877 11.2461 15.0807C11.3017 15.3737 11.1092 15.6563 10.8162 15.7118C10.3732 15.7959 9.91644 15.8398 9.44991 15.8398C5.42376 15.8398 2.15991 12.5759 2.15991 8.54977C2.15991 4.52361 5.42376 1.25977 9.44991 1.25977C13.4761 1.25977 16.7399 4.52361 16.7399 8.54977C16.7399 8.848 16.4982 9.08977 16.1999 9.08977C15.9017 9.08977 15.6599 8.848 15.6599 8.54977C15.6599 5.12008 12.8796 2.33977 9.44991 2.33977ZM9.44991 5.32542C9.74815 5.32542 9.98991 5.56718 9.98991 5.86542V9.00431L12.1519 9.72498C12.4349 9.81929 12.5878 10.1251 12.4935 10.408C12.3991 10.691 12.0933 10.8439 11.8104 10.7496L9.27915 9.90581C9.05865 9.8323 8.90991 9.62595 8.90991 9.39352V5.86542C8.90991 5.56718 9.15168 5.32542 9.44991 5.32542Z"
                  fill="#475467"
                />
              </svg>
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Most Recent
              </p>
            </div>
          </div>
          <div className="w-auto">
            <div className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.44991 2.33977C6.02022 2.33977 3.23991 5.12008 3.23991 8.54977C3.23991 11.9795 6.02022 14.7598 9.44991 14.7598C9.84856 14.7598 10.238 14.7223 10.6149 14.6508C10.9079 14.5952 11.1905 14.7877 11.2461 15.0807C11.3017 15.3737 11.1092 15.6563 10.8162 15.7118C10.3732 15.7959 9.91644 15.8398 9.44991 15.8398C5.42376 15.8398 2.15991 12.5759 2.15991 8.54977C2.15991 4.52361 5.42376 1.25977 9.44991 1.25977C13.4761 1.25977 16.7399 4.52361 16.7399 8.54977C16.7399 8.848 16.4982 9.08977 16.1999 9.08977C15.9017 9.08977 15.6599 8.848 15.6599 8.54977C15.6599 5.12008 12.8796 2.33977 9.44991 2.33977ZM9.44991 5.32542C9.74815 5.32542 9.98991 5.56718 9.98991 5.86542V9.00431L12.1519 9.72498C12.4349 9.81929 12.5878 10.1251 12.4935 10.408C12.3991 10.691 12.0933 10.8439 11.8104 10.7496L9.27915 9.90581C9.05865 9.8323 8.90991 9.62595 8.90991 9.39352V5.86542C8.90991 5.56718 9.15168 5.32542 9.44991 5.32542Z"
                  fill="#475467"
                />
              </svg>
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Most Recent
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mainboard;
