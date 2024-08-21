import React, { useEffect, useRef, useState } from "react";
import MainBoardArea from "../common/MainBoardArea.jsx";
import SelectDrop from "../common/SelectDrop.jsx";
import RadioDrop from "../common/RadioDrop.jsx";
import StockCard from "../common/StockCard.jsx";
import Nonlogincard from "../common/Nonlogincard.jsx";
import RadioSelectDropdown from "../common/RadioDrop.jsx";
import Button from "@mui/material/Button";
import FilterMenuTagsdummy from "./FilterMenuTagsdummy";
import DrawerFilter from "@/components.v3/common/DrawerFilter";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slider,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { InboxIcon, MailIcon, MailsIcon } from "lucide-react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SizeSelector from "./SizeSelector.jsx";
import FilterMenuTags from "./FilterMenuTags.jsx";
import styled from "@emotion/styled";
import SectorFilter from "./SizeSelector.jsx";
import StrategyCheck from "./StrategyCheck.jsx";
import SectorSelect from "./SectorCheck.jsx";
import CustomSortMenu from "../common/RadioDrop.jsx";
import FilterCarousel2 from "./FilterMenuTags2.jsx";
import FilterMenuTags2 from "./FilterMenuTags2.jsx";
import SectorFilter2 from "./SectoreFilter2.jsx";

function Filtermenu({
  Filtermenu,
  FiltermenuSidebar,
  min_upside_left,
  max_upside_left,
  setSortValue,
  setSortBy,
  recency,
  setRecency,
  timeLeft,
  setTimeLeft,
  handleApplyFilters,
  handleResetFilters,
  upsideLeft,
  setUpsideLeft,
}) {
  const stockList = [
    {
      title: "Vidhi Specialty Food Ingredients Ltd.",
      market_cap: "5678",
      recommended_stock: true,
      is_blur: false,
      new_stock: true,
    },
    {
      title: "Reliance Industries Ltd.",
      market_cap: "9876",
      recommended_stock: false,
      is_blur: true,
      new_stock: false,
    },
    {
      title: "Tata Consultancy Services Ltd.",
      market_cap: "2345",
      recommended_stock: true,
      is_blur: false,
      new_stock: false,
    },
    {
      title: "Infosys Ltd.",
      market_cap: "8765",
      recommended_stock: false,
      is_blur: true,
      new_stock: true,
    },
    {
      title: "HDFC Bank Ltd.",
      market_cap: "3456",
      recommended_stock: true,
      is_blur: false,
      new_stock: false,
    },
    {
      title: "ICICI Bank Ltd.",
      market_cap: "6543",
      recommended_stock: false,
      is_blur: true,
      new_stock: true,
    },
    {
      title: "Bharti Airtel Ltd.",
      market_cap: "4321",
      recommended_stock: true,
      is_blur: false,
      new_stock: false,
    },
    {
      title: "Hindustan Unilever Ltd.",
      market_cap: "7890",
      recommended_stock: false,
      is_blur: true,
      new_stock: true,
    },
    {
      title: "Kotak Mahindra Bank Ltd.",
      market_cap: "8901",
      recommended_stock: true,
      is_blur: false,
      new_stock: true,
    },
    {
      title: "Larsen & Toubro Ltd.",
      market_cap: "5432",
      recommended_stock: false,
      is_blur: true,
      new_stock: false,
    },
    {
      title: "State Bank of India",
      market_cap: "6789",
      recommended_stock: true,
      is_blur: false,
      new_stock: true,
    },
  ];
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
        setShowFilterHeader(rect.top <= 0);
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
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

  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState("");
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

  return (
    <>
      {/* <FilterMenuTags /> */}
      <div className="sticky top-[50px] right-0 z-[88] bg-[#f2f4f7] overflow-hidden ">
        <div className="w-[min(1280px,calc(100%-25px))] min-w-[328px] mx-auto  py-[10px] px-0 flex gap-1 items-center pt-4">
          {/* Import FilterMenuTag here */}

          {/* <FilterMenuTagsdummy /> */}
          <FilterMenuTags2 />

          <div className="flex sm:gap-[10px] gap-2 items-center ">
            <div className=" items-center">
              <form
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
              </form>
            </div>
            <CustomSortMenu
              setSortValue={setSortValue}
              setSortBy={setSortBy}
              isLabel={false}
            />
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
              {/* <Drawer open={open} anchor="right" onClose={() => {}}>
              <DrawerList />
            </Drawer> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filtermenu;
