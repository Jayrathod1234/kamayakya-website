import React from "react";
import MainBoardCard from "../common/MainBoardCard.jsx";

function Mainboard() {
  return (
    <>
      <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto ">
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

            {/* Hot and New */}
            {/* New */}
            {/* Hot */}

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
            <form class="">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white ml-2"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none gap-2">
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
            <button className="relative bg-white border border-[#E4E7EC] py-[10px] pl-4 pr-5 rounded-md flex gap-2 items-center shadow-[0px 2px 6px 0px rgba(0, 0, 0, 0.05)]">
              <img src="/assets/filter.svg" alt="" />
              <p className="font-open_sans">Filter</p>
              <span class="absolute bg-[#FDB022] text-white px-1 text-xs font-bold rounded-full -top-1 -right-1 w-6 h-6 justify-center items-center flex">
                1
              </span>
            </button>
          </div>
        </div>

        <div className="w-full py-[10px] px-5 flex gap-1 items-center justify-between pt-4">
          <div className="w-auto">
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
                  d="M8.23868 1.68762H4.5C4.31193 1.68762 4.1363 1.78162 4.03197 1.9381L1.03197 6.4381C0.898284 6.63864 0.907203 6.90205 1.05415 7.09309L8.55415 16.8431C8.66063 16.9815 8.82536 17.0626 9 17.0626C9.17464 17.0626 9.33937 16.9815 9.44585 16.8431L16.9458 7.09309C17.0928 6.90205 17.1017 6.63864 16.968 6.4381L13.968 1.9381C13.8637 1.78162 13.6881 1.68762 13.5 1.68762H9.76131C9.75349 1.68746 9.74566 1.68746 9.73781 1.68762H8.26219C8.25434 1.68746 8.2465 1.68746 8.23868 1.68762ZM9.40235 2.81262H8.59764L6.91014 6.18762H11.0899L9.40235 2.81262ZM10.6601 2.81262L12.3476 6.18762H15.449L13.199 2.81262H10.6601ZM15.3576 7.31262H12.4154L10.454 13.6874L15.3576 7.31262ZM9 14.5874L11.2384 7.31262H6.7616L9 14.5874ZM5.65236 6.18762L7.33986 2.81262H4.80104L2.55104 6.18762H5.65236ZM2.64236 7.31262H5.58455L7.54601 13.6874L2.64236 7.31262Z"
                  fill="black"
                />
              </svg>
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Value Pick
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
                <g clip-path="url(#clip0_7907_368712)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.9375 1.5C3.9375 1.18934 4.18934 0.9375 4.5 0.9375H13.5C13.8107 0.9375 14.0625 1.18934 14.0625 1.5V2.4375H14.625C15.2715 2.4375 15.8914 2.69431 16.3486 3.15143C16.8057 3.60855 17.0625 4.22853 17.0625 4.875C17.0625 5.52146 16.8057 6.14145 16.3486 6.59857C15.8914 7.05569 15.2715 7.3125 14.625 7.3125H14.0312C13.9042 8.4482 13.3956 9.51386 12.5797 10.3297C12.1378 10.7717 11.6225 11.1235 11.0625 11.3733V12.75C11.0625 12.7865 11.0763 12.8435 11.1458 12.9226C11.2177 13.0045 11.3298 13.0854 11.4626 13.1465L11.2275 13.6575L11.4616 13.146C12.4544 13.6003 13.122 14.6905 13.2776 15.9375H15C15.3107 15.9375 15.5625 16.1893 15.5625 16.5C15.5625 16.8107 15.3107 17.0625 15 17.0625H3C2.68934 17.0625 2.4375 16.8107 2.4375 16.5C2.4375 16.1893 2.68934 15.9375 3 15.9375H4.72236C4.87798 14.6907 5.54537 13.6008 6.53784 13.1463C6.67042 13.0852 6.78232 13.0045 6.85419 12.9226C6.92368 12.8435 6.9375 12.7865 6.9375 12.75V11.3733C6.3775 11.1235 5.86223 10.7717 5.42027 10.3297C4.60441 9.51386 4.09577 8.4482 3.96883 7.3125H3.375C2.72853 7.3125 2.10855 7.05569 1.65143 6.59857C1.19431 6.14145 0.9375 5.52146 0.9375 4.875C0.9375 4.22853 1.19431 3.60855 1.65143 3.15143C2.10855 2.69431 2.72853 2.4375 3.375 2.4375H3.9375V1.5ZM3.9375 3.5625H3.375C3.0269 3.5625 2.69306 3.70078 2.44692 3.94692C2.20078 4.19306 2.0625 4.5269 2.0625 4.875C2.0625 5.2231 2.20078 5.55693 2.44692 5.80308C2.69306 6.04922 3.0269 6.1875 3.375 6.1875H3.9375V3.5625ZM5.0625 2.0625H12.9375V6.75C12.9375 7.79429 12.5227 8.79581 11.7842 9.53423C11.0458 10.2727 10.0443 10.6875 9 10.6875C7.95571 10.6875 6.95419 10.2727 6.21577 9.53423C5.47734 8.79581 5.0625 7.79429 5.0625 6.75V2.0625ZM14.0625 3.5625V6.1875H14.625C14.9731 6.1875 15.3069 6.04922 15.5531 5.80308C15.7992 5.55693 15.9375 5.2231 15.9375 4.875C15.9375 4.5269 15.7992 4.19306 15.5531 3.94692C15.3069 3.70078 14.9731 3.5625 14.625 3.5625H14.0625ZM8.0625 11.725V12.75C8.0625 13.5001 7.4463 13.9667 7.00757 14.1685L7.00657 14.169C6.48227 14.4089 6.00395 15.0551 5.85794 15.9375H12.1421C11.996 15.0551 11.5177 14.4089 10.9934 14.169L10.9924 14.1685C10.5537 13.9667 9.9375 13.5001 9.9375 12.75V11.725C9.63054 11.7828 9.3168 11.8125 9 11.8125C8.6832 11.8125 8.36946 11.7828 8.0625 11.725Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7907_368712">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Market Leadership
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
                  d="M5.42027 2.42027C6.36967 1.47087 7.65734 0.9375 9 0.9375C10.3427 0.9375 11.6303 1.47087 12.5797 2.42027C13.5291 3.36967 14.0625 4.65734 14.0625 6C14.0625 7.10917 13.6379 8.23855 12.7629 9.03263C12.2065 9.5906 11.9199 10.0186 11.8016 10.6103C11.7407 10.9149 11.4443 11.1125 11.1397 11.0516C10.8351 10.9906 10.6375 10.6943 10.6984 10.3897C10.8794 9.48492 11.3401 8.86444 11.9773 8.22725C11.9842 8.22028 11.9914 8.21349 11.9987 8.20689C12.6158 7.6515 12.9375 6.83594 12.9375 6C12.9375 4.95571 12.5227 3.95419 11.7842 3.21577C11.0458 2.47734 10.0443 2.0625 9 2.0625C7.95571 2.0625 6.95419 2.47734 6.21577 3.21577C5.47734 3.95419 5.0625 4.95571 5.0625 6C5.0625 6.63989 5.17798 7.38248 6.02275 8.22725C6.57938 8.78388 7.11967 9.48015 7.30158 10.3897C7.3625 10.6943 7.16494 10.9906 6.86032 11.0516C6.55569 11.1125 6.25935 10.9149 6.19842 10.6103C6.08033 10.0198 5.72062 9.51611 5.22725 9.02275C4.12202 7.91751 3.9375 6.86011 3.9375 6C3.9375 4.65734 4.47087 3.36967 5.42027 2.42027ZM6.1875 13.5C6.1875 13.1893 6.43934 12.9375 6.75 12.9375H11.25C11.5607 12.9375 11.8125 13.1893 11.8125 13.5C11.8125 13.8107 11.5607 14.0625 11.25 14.0625H6.75C6.43934 14.0625 6.1875 13.8107 6.1875 13.5ZM6.9375 16.5C6.9375 16.1893 7.18934 15.9375 7.5 15.9375H10.5C10.8107 15.9375 11.0625 16.1893 11.0625 16.5C11.0625 16.8107 10.8107 17.0625 10.5 17.0625H7.5C7.18934 17.0625 6.9375 16.8107 6.9375 16.5Z"
                  fill="black"
                />
              </svg>
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Thematic Stories
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
                  d="M7.49995 1.5V7.14525C7.50017 7.37851 7.44599 7.6086 7.3417 7.81725L3.53995 15.4125C3.48213 15.5272 3.45476 15.6549 3.46045 15.7833C3.46615 15.9116 3.50473 16.0364 3.57249 16.1455C3.64025 16.2547 3.73491 16.3446 3.84741 16.4067C3.95991 16.4688 4.08647 16.5009 4.21495 16.5H13.785C13.9134 16.5009 14.04 16.4688 14.1525 16.4067C14.265 16.3446 14.3597 16.2547 14.4274 16.1455C14.4952 16.0364 14.5338 15.9116 14.5395 15.7833C14.5452 15.6549 14.5178 15.5272 14.46 15.4125L10.6582 7.81725C10.5539 7.6086 10.4997 7.37851 10.5 7.14525V1.5M6.37495 1.5H11.625M5.24995 12H12.75"
                  stroke="#1D2939"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Chemicals
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
                <g clip-path="url(#clip0_9387_66026)">
                  <path
                    d="M6.375 6.37574L11.625 11.6257M7.875 15.3757L15.375 7.87574C15.7255 7.53229 16.0044 7.12278 16.1956 6.67088C16.3868 6.21897 16.4865 5.73365 16.489 5.24297C16.4915 4.75229 16.3966 4.26598 16.21 3.81217C16.0234 3.35836 15.7486 2.94605 15.4017 2.59908C15.0547 2.25212 14.6424 1.97737 14.1886 1.79074C13.7348 1.60411 13.2485 1.50929 12.7578 1.51177C12.2671 1.51424 11.7818 1.61397 11.3299 1.80518C10.878 1.99638 10.4684 2.27528 10.125 2.62574L2.625 10.1257C2.27455 10.4692 1.99565 10.8787 1.80445 11.3306C1.61324 11.7825 1.51351 12.2678 1.51103 12.7585C1.50856 13.2492 1.60337 13.7355 1.79001 14.1893C1.97664 14.6431 2.25138 15.0554 2.59835 15.4024C2.94532 15.7494 3.35763 16.0241 3.81144 16.2107C4.26525 16.3974 4.75156 16.4922 5.24224 16.4897C5.73292 16.4872 6.21824 16.3875 6.67014 16.1963C7.12204 16.0051 7.53156 15.7262 7.875 15.3757Z"
                    stroke="#101828"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_9387_66026">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Pharma
              </p>
            </div>
          </div>
          <div className="w-auto">
            <div className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center">
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Strategy
              </p>
              <img src="/assets/chevron-down.svg" alt="" />
            </div>
          </div>
          <div className="w-auto">
            <div className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center">
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Sector
              </p>
              <img src="/assets/chevron-down.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-[#F2F4F7] py-10 px-20 relative">
        <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto">
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-7 ">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
              <MainBoardCard />
            ))}
          </div>
          {/* Elevate Your   */}
          <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto ">
            <div className="p-[56px] rounded-[20px] bg-custom-gradient-3 flex items-center justify-between relative overflow-hidden z-[555] top-[102px]">
              <div className="absolute bottom-[2px] left-[41%]">
                <img
                  src="/assets/Group.png"
                  alt=""
                  className="w-[376px] rotate-[-9.288deg]"
                />
              </div>
              <div>
                <p className="text-display-xs font-semibold text-[#F8F8F8] font-open_sans">
                  Elevate Your Investments with KamayaKya Pro!
                </p>
                <p className="text-lg font-normal text-white opacity-35 font-open_sans">
                  Access Exclusive Insights with 30+ Premium SME Stock
                  Recommendations
                </p>
              </div>
              <div className="rounded-[6px] bg-white border border-white gap-[8px]">
                <div className="gap-[8px] flex items-center justify-center px-[36px] py-[18px]">
                  <img src="/assets/icon.svg" alt="" />
                  <p className="font-medium text-sm text-[#125B54]">
                    Become a Member
                  </p>
                </div>
              </div>
              <div className="absolute right-[-31px] bottom-[-95px]">
                <img src="/assets/Group 1.png" alt="" className="w-[620px]" />
              </div>
            </div>
          </div>
        </div>
        {/* blur Rectangle  */}
        <div className="absolute bottom-[163px] z-[1] max-h-[400px] w-full">
          <img
            src="/assets/Rectangle.png"
            alt=""
            className="max-h-[400px] w-full"
          />
        </div>
      </div>
    </>
  );
}

export default Mainboard;
