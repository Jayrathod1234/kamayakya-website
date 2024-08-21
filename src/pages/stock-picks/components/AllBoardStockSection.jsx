import React, { useContext, useEffect, useRef, useState } from "react";
import MainBoardArea from "@/components.v3/common/MainBoardArea.jsx";
import SelectDrop from "@/components.v3/common/SelectDrop.jsx";
import RadioDrop from "@/components.v3/common/RadioDrop.jsx";
import StockCard from "@/components.v3/common/StockCard.jsx";
import Nonlogincard from "@/components.v3/common/Nonlogincard.jsx";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RadioSelectDropdown from "@/components.v3/common/RadioDrop.jsx";
import Button from "@mui/material/Button";
import InvestmentSection from "@/pages/stock-picks/components/InvestmentSection";
import FilterMenuTags from "@/components.v3/common/FilterMenuTags.jsx";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slider,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { InboxIcon, MailIcon, MailsIcon } from "lucide-react";
import Filtermenu from "@/components.v3/common/Filtermenu.jsx";
import CustomSortMenu from "../../../components.v3/common/RadioDrop";
import Filtermenu2 from "../../../components.v3/common/Filtermenu2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SectorFilter from "../../../components.v3/common/SizeSelector";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import AuthContext from "@/components/AuthContext";
import { getAllBoardStockStockListApi } from "@/api/stock-picks";
import StockCardSkeleton from "./skeletons/StockCardSkeleton";
import { onScrollPaginationFunction } from "@/utils/onScrollPaginationFunction";
import { useDebounce } from "../../../utils/deBounceSearch";
import SectorFilter2 from "../../../components.v3/common/SectoreFilter2";
import DrawerFilter from "@/components.v3/common/DrawerFilter";
import { initialFilterTime } from "@/utils/constants.js";
// import { Button } from "../../components.v2/button/button.js";

function AllBoardStockSection({
  sebiBoardType,
  stockSector,
  min_upside_left,
  max_upside_left,
}) {
  const { isLoggedIn } = useContext(AuthContext);
  const [searchStock, setSearchStock] = useState("");
  const debouncedSearchStock = useDebounce(searchStock, 1000); // Apply debouncing
  const [sortBy, setSortBy] = useState("upside_left");
  const [sortValue, setSortValue] = useState("desc");
  const [recency, setRecency] = useState(initialFilterTime);
  const [timeLeft, setTimeLeft] = useState(initialFilterTime);
  const [upsideLeft, setUpsideLeft] = useState([
    min_upside_left,
    max_upside_left,
  ]);

  const handleApplyFilters = () => {
    refetch(); // Refetch data with the new applied filters
  };

  const handleResetFilters = () => {
    refetch(); // Optionally refetch data with reset filters (if appliedFilters reset)
  };

  const LIMIT = 6;
  const myObserver = useRef();
  // Use react infinite query to fetch the list
  const {
    data: response = [],
    isLoading,
    error,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [
      "allBoardStockStock",
      {
        LIMIT,
        sebiBoardType,
        sortBy,
        sortValue,
        debouncedSearchStock,
      },
    ],
    queryFn: ({ pageParam = 1 }) =>
      getAllBoardStockStockListApi({
        params: {
          page: pageParam,
          limit: LIMIT,
          isLoggedIn,
          type: sebiBoardType,
        },
        body: {
          search: debouncedSearchStock,
          sort_by: sortBy,
          sort_value: sortValue,
          recency_time: Object.keys(recency).filter((key) => recency[key]),
          time_left_with_time: Object.keys(timeLeft).filter(
            (key) => timeLeft[key]
          ),
        },
      }),
    getNextPageParam: ({ total_pages, current_page }) => {
      // Function to determine the parameter for fetching the next page
      if (total_pages > current_page) return current_page + 1 ?? false; // Return the nextPage parameter if available, otherwise false
    },
    // enabled: !!searchStock,
  });

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

  // Handle search input change
  const handleSearchStock = (e) => {
    setSearchStock(e.target.value);
  };

  // Sidebar right side
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleApply = () => {
    setOpen(false);
  };
  // sticky header

  const filterHeaderRef = useRef(null);
  const xyzRef = useRef(null);
  const [showFilterHeader, setShowFilterHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (xyzRef.current) {
        const rect = xyzRef.current.getBoundingClientRect();
        setShowFilterHeader(rect.top <= 110);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function debounce(func, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // upside left
  const [value, setValue] = React.useState([25, 115]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  const CustomSlider = styled(Slider)({
    color: "#004d40", // Main color for the rail and thumb border
    height: 4, // Thickness of the slider rail
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:hover": {
        boxShadow: "0 0 0 8px rgba(0, 77, 64, 0.16)", // Light shadow on hover
      },
      "&:focus, &:active": {
        boxShadow: "0 0 0 14px rgba(0, 77, 64, 0.16)", // Larger shadow on active or focus
      },
    },
    "& .MuiSlider-rail": {
      color: "#004d40",
      opacity: 1,
    },
    "& .MuiSlider-track": {
      border: "none",
    },
  });

  const handleInputChange = (event) => {
    const index = event.target.name === "min" ? 0 : 1;
    const newValue = [...value];
    newValue[index] =
      event.target.value === "" ? "" : Number(event.target.value);
    setValue(newValue);
  };
  // Total Returns
  const [value2, setValue2] = React.useState([-25, 115]);

  const handleSliderChange3 = (event, newValue) => {
    setValue2(newValue);
  };

  const handleInputChange3 = (event) => {
    const index2 = event.target.name === "min" ? 0 : 1;
    const newValue2 = [...value2];
    newValue2[index2] =
      event.target.value === "" ? "" : Number(event.target.value2);
    setValue2(newValue2);
  };
  // Recency
  const [state, setState] = React.useState({
    "0-3 months": false,
    "3-6 months": false,
    "6-12 months": false,
    "12-18 months": false,
    "18-24 months": false,
    "Greater than 24 months": false,
  });

  const handleChange2 = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  // Time Left
  const [state2, setState2] = React.useState({
    "0-3 months": false,
    "3-6 months": false,
    "6-12 months": false,
    "12-18 months": false,
    "18-24 months": false,
    "Greater than 24 months": false,
  });
  const CustomSlider2 = styled(Slider)({
    color: "#004d40", // Main color for the rail and thumb border
    height: 4, // Thickness of the slider rail
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:hover": {
        boxShadow: "0 0 0 8px rgba(0, 77, 64, 0.16)", // Light shadow on hover
      },
      "&:focus, &:active": {
        boxShadow: "0 0 0 14px rgba(0, 77, 64, 0.16)", // Larger shadow on active or focus
      },
    },
    "& .MuiSlider-rail": {
      color: "#004d40",
      opacity: 1,
    },
    "& .MuiSlider-track": {
      border: "none",
    },
  });
  const handleChange4 = (event) => {
    setState2({ ...state, [event.target.name]: event.target.checked });
  };
  // sectore
  const options = [
    {
      value: "Agricultural",
      label: "Agricultural",
    },
  ];

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto">
        <p className="text-display-xs text-[#0C111D] font-bold font-open_sans text-center sm:pb-10 pb-4">
          All Mainboard Stocks
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
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
                  className="block w-full pr-[14px] pl-9 py-[12px] text-md text-gray-900 border border-[#E4E7EC] rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 shadow-3xs"
                  placeholder="Search Stocks..."
                  value={searchStock}
                  onChange={handleSearchStock}
                />
              </div>
            </form>
          </div>
          <div className="w-auto">
            <div className="relative flex gap-4">
              <CustomSortMenu
                setSortValue={setSortValue}
                setSortBy={setSortBy}
                isLabel={true}
              />
            </div>
          </div>
          <div className="w-auto">
            <DrawerFilter
              open={open}
              setOpen={setOpen}
              recency={recency}
              setRecency={setRecency}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              handleApplyFilters={handleApplyFilters}
              handleResetFilters={handleResetFilters}
              min_upside_left={min_upside_left}
              max_upside_left={max_upside_left}
              upsideLeft={upsideLeft}
              setUpsideLeft={setUpsideLeft}
            />
          </div>
        </div>
      </div>
      {/* filter menu code not delete -nehakikani */}
      {/* main filter  */}
      {!showFilterHeader ? (
        <>
          {/* <Filtermenu2 /> */}
          <FilterMenuTags />
        </>
      ) : (
        <>
          <Filtermenu
            setSortValue={setSortValue}
            setSortBy={setSortBy}
            ref={filterHeaderRef}
            recency={recency}
            setRecency={setRecency}
            handleApplyFilters={handleApplyFilters}
            handleResetFilters={handleResetFilters}
            min_upside_left={min_upside_left}
            max_upside_left={max_upside_left}
            // className={`fixed top-0 left-0 w-full p-10 bg-orange-600 transition-transform duration-500 ${
            //   showFilterHeader ? "translate-y-0" : "-translate-y-full"
            // }`}
            role="banner"
            aria-hidden={!showFilterHeader}
            upsideLeft={upsideLeft}
            setUpsideLeft={setUpsideLeft}
          />
        </>
      )}
      {/* <FilterCarousel /> */}
      {/* <Filtermenu2 /> */}
      {/* sticky filtermenu */}

      {/* blur card  */}
      <div className=" bg-[#F2F4F7] py-10 sm:px-20 px-0 relative " ref={xyzRef}>
        <div className="w-[min(1280px,calc(100%-32px))]  mx-auto">
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-7">
            {/* <Nonlogincard /> */}
            {/* <MainBoardArea /> */}

            {isLoading || error ? (
              <StockCardSkeleton length={9} />
            ) : items.length > 0 ? (
              items.map((value, index) => (
                <StockCard
                  key={index} // Ensure each item has a unique key
                  {...value}
                  stockSector={stockSector}
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
          <div className="mt-11">
            <InvestmentSection />
          </div>
          {/* Elevate Your section  */}
          <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto mt-8 sm:mt-16">
            <div className="p-[24px] sm:p-[56px] rounded-[20px] bg-custom-gradient-3 flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden z-[555] top-[102px]">
              <div className="absolute bottom-[2px] left-[20%] sm:left-[41%]">
                <img
                  src="/assets/Group.png"
                  alt=""
                  className="w-[200px] sm:w-[376px] rotate-[-9.288deg]"
                />
              </div>
              <div>
                <p className="text-display-xs font-semibold text-[#F8F8F8] font-open_sans">
                  Elevate Your Investments with KamayaKya!
                </p>
                <p className="text-base sm:text-lg font-normal text-white opacity-35 font-open_sans">
                  Access Exclusive Insights with 30+ Premium SME Stock
                  Recommendations
                </p>
              </div>
              <div className="relative group mt-4 sm:mt-0 sm:ms-auto">
                <div className="relative w-44 sm:w-48 h-12 opacity-90 border-[1px] border-transparent duration-300 overflow-hidden rounded-xl bg-black z-10 group-hover:bg-transparent group-hover:border-[#03D6DA] group-hover:border-[1px] group-hover:px-4 group-hover:w-52 group-hover:-me-5 group-hover:h-10 group-hover:ms-5 group-hover:shadow-6xs">
                  <div className="absolute z-10 -translate-x-44 group-hover:translate-x-[30rem] ease-in transition-all duration-700 h-full w-44 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12 group-hover:hidden"></div>

                  <div className="absolute flex items-center text-center justify-center text-white z-[1] opacity-90 rounded-2xl inset-0.5 bg-black group-hover:bg-transparent">
                    <button
                      name="text"
                      className="input font-medium text-sm h-full opacity-90 w-full rounded-xl bg-black group-hover:bg-transparent"
                    >
                      Become a Member
                    </button>
                  </div>
                  <div className="absolute transition-all duration-2000 animate-spin w-full h-[100px] bg-gradient-to-r from-white to-black blur-[30px] group-hover:hidden"></div>
                </div>
              </div>
              <div className="absolute right-[-10px] sm:right-[-31px] bottom-[-95px] z-0">
                <img
                  src="/assets/Group 1.png"
                  alt=""
                  className="w-[400px] sm:w-[620px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllBoardStockSection;
