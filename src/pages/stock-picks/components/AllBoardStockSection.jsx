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

// import { Button } from "../../components.v2/button/button.js";

function AllBoardStockSection({ sebiBoardType }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [searchStock, setSearchStock] = useState("");
  const debouncedSearchStock = useDebounce(searchStock, 1000); // Apply debouncing

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
        isLoggedIn,
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
        },
      }),
    getNextPageParam: ({ total_pages, current_page }) => {
      // Function to determine the parameter for fetching the next page
      if (total_pages > current_page) return current_page + 1 ?? false; // Return the nextPage parameter if available, otherwise false
    },
    enabled: !!searchStock,
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
  const DrawerList = (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* topbar  */}
      <div className="py-4 px-6  sticky top-0 bg-white z-50  ">
        <div className="justify-between absolute flex items-center w-auto gap-2 ">
          <div className="text-[#191D23] text-ellipsis text-xl font-bold font-open_sans w-[290px]">
            Filters
          </div>
          <div
            className="text-[#125B54] text-sm font-semibold cursor-pointer"
            onClick={toggleDrawer(false)}
          >
            Clear All
          </div>
        </div>
        <div className="border-b-2 border-[#F2F4F7] mt-11"></div>
      </div>
      {/* upside left  */}
      <div className="pt-4 pr-6 pl-4 overflow-x-hidden">
        <Box display="flex" alignItems="center" mb={2} sx={{ width: 400 }}>
          <img src="/assets/solar_graph-down-new-broken.svg" />
          <div className="w-[318px] flex">
            <Typography
              variant="subtitle1"
              ml={1}
              mr={1}
              sx={{ color: "#1D2939", fontSize: "14px", fontWeight: "700" }}
            >
              Upside left
            </Typography>
            <IconButton size="small">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.5 6.27609 13.8152 4.62279 12.5962 3.40381C11.3772 2.18482 9.72391 1.5 8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112Z"
                  stroke="#D0D5DD"
                />
                <path
                  d="M9 11C9 11.1326 8.94732 11.2598 8.85355 11.3536C8.75979 11.4473 8.63261 11.5 8.5 11.5C8.23478 11.5 7.98043 11.3946 7.79289 11.2071C7.60536 11.0196 7.5 10.7652 7.5 10.5V8C7.36739 8 7.24021 7.94732 7.14645 7.85355C7.05268 7.75979 7 7.63261 7 7.5C7 7.36739 7.05268 7.24022 7.14645 7.14645C7.24021 7.05268 7.36739 7 7.5 7C7.76522 7 8.01957 7.10536 8.20711 7.29289C8.39464 7.48043 8.5 7.73478 8.5 8V10.5C8.63261 10.5 8.75979 10.5527 8.85355 10.6464C8.94732 10.7402 9 10.8674 9 11ZM7.75 6C7.89834 6 8.04334 5.95601 8.16668 5.8736C8.29001 5.79119 8.38614 5.67406 8.44291 5.53701C8.49967 5.39997 8.51453 5.24917 8.48559 5.10368C8.45665 4.9582 8.38522 4.82456 8.28033 4.71967C8.17544 4.61478 8.0418 4.54335 7.89632 4.51441C7.75083 4.48547 7.60003 4.50032 7.46299 4.55709C7.32594 4.61386 7.20881 4.70999 7.1264 4.83332C7.04399 4.95666 7 5.10166 7 5.25C7 5.44891 7.07902 5.63968 7.21967 5.78033C7.36032 5.92098 7.55109 6 7.75 6Z"
                  fill="#344054"
                />
              </svg>
            </IconButton>
          </div>

          <IconButton size="small">
            <ExpandMoreIcon fontSize="small" />
          </IconButton>
        </Box>

        <div className="pl-9">
          <CustomSlider
            value={value}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={25}
            max={115}
          />

          <Grid container spacing={2} alignItems="center" pt={2}>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                size="small"
                name="min"
                value={value[0]}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography align="center">to</Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                size="small"
                name="max"
                value={value[1]}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </div>

        <div className="border-b-2 border-[#F2F4F7] pt-4"></div>
      </div>

      {/*  Recency */}
      <div className="pt-4 pr-6 pl-4 overflow-x-hidden">
        <Accordion
          defaultExpanded
          sx={{ boxShadow: "none !important", margin: "0px !important" }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{ rotate: "180deg", padding: "0px !important" }}
              />
            }
            aria-controls="recency-content"
            id="recency-header"
          >
            <Box display="flex" alignItems="center">
              <AccessTimeIcon fontSize="small" />
              <Typography
                variant="subtitle1"
                ml={1}
                mr={1}
                sx={{ color: "#1D2939", fontSize: "14px", fontWeight: "700" }}
              >
                Recency
              </Typography>
              <div className="tooltip">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.5 6.27609 13.8152 4.62279 12.5962 3.40381C11.3772 2.18482 9.72391 1.5 8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112Z"
                    stroke="#D0D5DD"
                  />
                  <path
                    d="M9 11C9 11.1326 8.94732 11.2598 8.85355 11.3536C8.75979 11.4473 8.63261 11.5 8.5 11.5C8.23478 11.5 7.98043 11.3946 7.79289 11.2071C7.60536 11.0196 7.5 10.7652 7.5 10.5V8C7.36739 8 7.24021 7.94732 7.14645 7.85355C7.05268 7.75979 7 7.63261 7 7.5C7 7.36739 7.05268 7.24022 7.14645 7.14645C7.24021 7.05268 7.36739 7 7.5 7C7.76522 7 8.01957 7.10536 8.20711 7.29289C8.39464 7.48043 8.5 7.73478 8.5 8V10.5C8.63261 10.5 8.75979 10.5527 8.85355 10.6464C8.94732 10.7402 9 10.8674 9 11ZM7.75 6C7.89834 6 8.04334 5.95601 8.16668 5.8736C8.29001 5.79119 8.38614 5.67406 8.44291 5.53701C8.49967 5.39997 8.51453 5.24917 8.48559 5.10368C8.45665 4.9582 8.38522 4.82456 8.28033 4.71967C8.17544 4.61478 8.0418 4.54335 7.89632 4.51441C7.75083 4.48547 7.60003 4.50032 7.46299 4.55709C7.32594 4.61386 7.20881 4.70999 7.1264 4.83332C7.04399 4.95666 7 5.10166 7 5.25C7 5.44891 7.07902 5.63968 7.21967 5.78033C7.36032 5.92098 7.55109 6 7.75 6Z"
                    fill="#344054"
                  />
                </svg>
                <span class="tooltiptext tooltiptext2 relative ">
                  <img
                    src="/assets/div.png"
                    alt=""
                    className="absolute -top-2 left-[52px] w-4"
                  />
                  <div className="text-gray-800 text-2xs font-normal">
                    Recency tells you how new this stock recommendation is.
                  </div>
                  <div className="mt-2 p-2">
                    <span className="text-[#108973] text-2xs font-bold">
                      Example :
                    </span>
                    <p className="text-2xs text-gray-600 font-normal">
                      A stock recommended last week is more recent and
                      potentially more relevant than one recommended a month
                      ago.
                    </p>
                  </div>
                </span>
              </div>
            </Box>
          </AccordionSummary>
          <div className="pl-4">
            <AccordionDetails>
              <FormGroup>
                {[
                  "0-3 months",
                  "3-6 months",
                  "6-12 months",
                  "12-18 months",
                  "18-24 months",
                  "Greater than 24 months",
                ].map((label) => (
                  <FormControlLabel
                    key={label}
                    control={
                      <Checkbox
                        checked={state[label]}
                        onChange={handleChange2}
                        name={label}
                      />
                    }
                    label={label.replace(/-/g, " - ")}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </div>
        </Accordion>
        <div className="border-b-2 border-[#F2F4F7] "></div>
      </div>

      {/* Time Left  */}
      <div className="pt-4 pr-6 pl-4 overflow-x-hidden">
        <Accordion
          defaultExpanded
          sx={{ boxShadow: "none !important", margin: "0px !important" }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{ rotate: "180deg", padding: "0px !important" }}
              />
            }
            aria-controls="recency-content"
            id="recency-header"
          >
            <Box display="flex" alignItems="center">
              <img src="/assets/hourglass-02.svg" />
              <Typography
                variant="subtitle1"
                ml={1}
                mr={1}
                sx={{ color: "#1D2939", fontSize: "14px", fontWeight: "700" }}
              >
                Time Left
              </Typography>
              {/* <IconButton size="small">
            <InfoOutlinedIcon fontSize="small" />
          </IconButton> */}
            </Box>
          </AccordionSummary>
          <div className="pl-4">
            <AccordionDetails>
              <FormGroup>
                {[
                  "0-3 months",
                  "3-6 months",
                  "6-12 months",
                  "12-18 months",
                  "18-24 months",
                  "Greater than 24 months",
                ].map((label) => (
                  <FormControlLabel
                    key={label}
                    control={
                      <Checkbox
                        checked={state2[label]}
                        onChange={handleChange4}
                        name={label}
                      />
                    }
                    label={label.replace(/-/g, " - ")}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </div>
        </Accordion>
        <div className="border-b-2 border-[#F2F4F7] "></div>
      </div>
      {/* Total Returns  */}
      <div className="pt-4 pr-6 pl-4 overflow-x-hidden">
        <Box display="flex" alignItems="center" mb={2} sx={{ width: 400 }}>
          <img src="/assets/solar_graph-down-new-broken.svg" />
          <div className="w-[318px] flex">
            <Typography
              variant="subtitle1"
              ml={1}
              mr={1}
              sx={{ color: "#1D2939", fontSize: "14px", fontWeight: "700" }}
            >
              Total Returns
            </Typography>
            <IconButton size="small">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.5 6.27609 13.8152 4.62279 12.5962 3.40381C11.3772 2.18482 9.72391 1.5 8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112Z"
                  stroke="#D0D5DD"
                />
                <path
                  d="M9 11C9 11.1326 8.94732 11.2598 8.85355 11.3536C8.75979 11.4473 8.63261 11.5 8.5 11.5C8.23478 11.5 7.98043 11.3946 7.79289 11.2071C7.60536 11.0196 7.5 10.7652 7.5 10.5V8C7.36739 8 7.24021 7.94732 7.14645 7.85355C7.05268 7.75979 7 7.63261 7 7.5C7 7.36739 7.05268 7.24022 7.14645 7.14645C7.24021 7.05268 7.36739 7 7.5 7C7.76522 7 8.01957 7.10536 8.20711 7.29289C8.39464 7.48043 8.5 7.73478 8.5 8V10.5C8.63261 10.5 8.75979 10.5527 8.85355 10.6464C8.94732 10.7402 9 10.8674 9 11ZM7.75 6C7.89834 6 8.04334 5.95601 8.16668 5.8736C8.29001 5.79119 8.38614 5.67406 8.44291 5.53701C8.49967 5.39997 8.51453 5.24917 8.48559 5.10368C8.45665 4.9582 8.38522 4.82456 8.28033 4.71967C8.17544 4.61478 8.0418 4.54335 7.89632 4.51441C7.75083 4.48547 7.60003 4.50032 7.46299 4.55709C7.32594 4.61386 7.20881 4.70999 7.1264 4.83332C7.04399 4.95666 7 5.10166 7 5.25C7 5.44891 7.07902 5.63968 7.21967 5.78033C7.36032 5.92098 7.55109 6 7.75 6Z"
                  fill="#344054"
                />
              </svg>
            </IconButton>
          </div>

          <IconButton size="small">
            <ExpandMoreIcon fontSize="small" />
          </IconButton>
        </Box>

        <div className="pl-9">
          <CustomSlider2
            value={value2}
            onChange={handleSliderChange3}
            valueLabelDisplay="auto"
            min={25}
            max={115}
          />

          <Grid container spacing={2} alignItems="center" mt={2}>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                size="small"
                name="min"
                value={value2[0]}
                onChange={handleInputChange3}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography align="center">to</Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                size="small"
                name="max"
                value={value2[1]}
                onChange={handleInputChange3}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </div>

        <div className="border-b-2 border-[#F2F4F7] pt-4"></div>
      </div>

      {/* Market Cap */}
      <div className="pt-4 pr-6 pl-4 overflow-x-hidden">
        <Accordion
          defaultExpanded
          sx={{ boxShadow: "none !important", margin: "0px !important" }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{ rotate: "180deg", margin: "0px !important" }}
              />
            }
            aria-controls="recency-content"
            id="recency-header"
          >
            <Box display="flex" alignItems="center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5.99992 16.6654V4.66536C5.99992 4.31174 6.14039 3.9726 6.39044 3.72256C6.64049 3.47251 6.97963 3.33203 7.33325 3.33203H12.6666C13.0202 3.33203 13.3593 3.47251 13.6094 3.72256C13.8594 3.9726 13.9999 4.31174 13.9999 4.66536V16.6654M5.99992 16.6654H13.9999M5.99992 16.6654H4.66659C4.31296 16.6654 3.97382 16.5249 3.72378 16.2748C3.47373 16.0248 3.33325 15.6857 3.33325 15.332V11.332C3.33325 10.9784 3.47373 10.6393 3.72378 10.3892C3.97382 10.1392 4.31296 9.9987 4.66659 9.9987H5.99992M13.9999 16.6654H15.3333C15.6869 16.6654 16.026 16.5249 16.2761 16.2748C16.5261 16.0248 16.6666 15.6857 16.6666 15.332V9.33203C16.6666 8.97841 16.5261 8.63927 16.2761 8.38922C16.026 8.13917 15.6869 7.9987 15.3333 7.9987H13.9999M8.66659 5.9987H11.3333M8.66659 8.66536H11.3333M8.66659 11.332H11.3333M8.66659 13.9987H11.3333"
                  stroke="#1D2939"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <Typography
                variant="subtitle1"
                ml={1}
                mr={1}
                sx={{ color: "#1D2939", fontSize: "14px", fontWeight: "700" }}
              >
                Market Cap
              </Typography>
            </Box>
          </AccordionSummary>
          {/* <SizeSelector /> */}
          <div class="flex pl-7 gap-4 pb-4">
            <div class="flex flex-col items-center cursor-pointer w-2/5  p-4 rounded-[7px] border border-[#E4E7EC] bg-white hover:bg-[#F9FAFB]">
              <img src="/assets/Group 47357.svg" />

              <span class="pt-2 text-2xs  text-[#344054] font-normal">
                Small
              </span>
            </div>

            <div class="flex flex-col items-center cursor-pointer w-2/5  p-4 rounded-[7px] border border-[#E4E7EC] bg-white hover:bg-[#F9FAFB]">
              <img src="/assets/Component 5.svg" />

              <span class="pt-2 text-2xs  text-[#344054] font-normal">Mid</span>
            </div>

            <div class="flex flex-col items-center cursor-pointer w-2/5  p-4 rounded-[7px] border border-[#E4E7EC] bg-white hover:bg-[#F9FAFB]">
              <img src="/assets/Component 9.svg" />

              <span class="pt-2 text-2xs  text-[#344054] font-normal">
                Large
              </span>
            </div>
          </div>
        </Accordion>
        <div className="border-b-2 border-[#F2F4F7] "></div>
      </div>

      {/* Sectors  */}
      <div className="pt-4 pr-6 pl-4 overflow-x-hidden">
        <Accordion
          defaultExpanded
          sx={{ boxShadow: "none !important", marginBottom: "0px !important" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ rotate: "180deg" }} />}
            aria-controls="recency-content"
            id="recency-header"
          >
            <Box display="flex" alignItems="center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clip-path="url(#clip0_9195_356175)">
                  <path
                    d="M5.21512 4.22366C10.6575 5.03937 14.9612 9.34308 15.7769 14.7854C15.8613 15.3484 15.393 15.9173 14.6666 15.9173H5.33325C4.6429 15.9173 4.08325 15.3577 4.08325 14.6673V5.33398C4.08325 4.60755 4.65221 4.13928 5.21512 4.22366Z"
                    stroke="black"
                    stroke-width="1.5"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_9195_356175">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <Typography
                variant="subtitle1"
                ml={1}
                mr={1}
                sx={{ color: "#1D2939", fontSize: "14px", fontWeight: "700" }}
              >
                Sectors
              </Typography>
            </Box>
          </AccordionSummary>
          <SectorFilter2 />
        </Accordion>
        <div className="border-b-2 border-[#F2F4F7] "></div>
      </div>

      {/* Strategies   */}
      <div className="pt-4 pr-6 pl-4 overflow-x-hidden">
        <Accordion
          defaultExpanded
          sx={{ boxShadow: "none !important", margin: "0px !important" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ rotate: "180deg" }} />}
            aria-controls="recency-content"
            id="recency-header"
          >
            <Box display="flex" alignItems="center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M6.66667 13.334L5.46083 13.9373C5.32243 14.0065 5.20602 14.1128 5.12463 14.2444C5.04324 14.376 5.00008 14.5276 5 14.6823V16.6673H15V14.6823C14.9999 14.5276 14.9568 14.376 14.8754 14.2444C14.794 14.1128 14.6776 14.0065 14.5392 13.9373L13.3333 13.334M6.66667 13.334H13.3333M6.66667 13.334L7.5 5.83398H12.5L13.3333 13.334M5 3.33398L5.41667 5.83398H14.5833L15 3.33398M8.33333 3.33398V5.83398M11.6667 3.33398V5.83398"
                  stroke="#1D2939"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <Typography
                variant="subtitle1"
                ml={1}
                mr={1}
                sx={{ color: "#1D2939", fontSize: "14px", fontWeight: "700" }}
              >
                Strategies
              </Typography>
            </Box>
          </AccordionSummary>
          <SectorFilter />
        </Accordion>
        <div className="border-b-2 border-[#F2F4F7] "></div>
      </div>
      {/*Risk */}
      <div className="pt-4 pr-6 pl-4 pb-[61px] overflow-x-hidden">
        <Accordion
          defaultExpanded
          sx={{ boxShadow: "none !important", margin: "0px !important" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ rotate: "180deg" }} />}
            aria-controls="recency-content"
            id="recency-header"
          >
            <Box display="flex" alignItems="center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clip-path="url(#clip0_9195_356396)">
                  <path
                    d="M1.66675 9.99935C1.66675 6.07102 1.66675 4.10685 2.88675 2.88602C4.10841 1.66602 6.07175 1.66602 10.0001 1.66602C13.9284 1.66602 15.8926 1.66602 17.1126 2.88602C18.3334 4.10768 18.3334 6.07102 18.3334 9.99935C18.3334 13.9277 18.3334 15.8918 17.1126 17.1118C15.8934 18.3327 13.9284 18.3327 10.0001 18.3327C6.07175 18.3327 4.10758 18.3327 2.88675 17.1118C1.66675 15.8927 1.66675 13.9277 1.66675 9.99935Z"
                    stroke="#1D2939"
                    stroke-width="1.5"
                  />
                  <path
                    d="M5.8335 11.6654L7.74433 9.75453C7.9006 9.59831 8.11253 9.51054 8.3335 9.51054C8.55447 9.51054 8.76639 9.59831 8.92266 9.75453L10.2443 11.0762C10.4006 11.2324 10.6125 11.3202 10.8335 11.3202C11.0545 11.3202 11.2664 11.2324 11.4227 11.0762L14.1668 8.33203M14.1668 8.33203V10.4154M14.1668 8.33203H12.0835"
                    stroke="#1D2939"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_9195_356396">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <Typography
                variant="subtitle1"
                ml={1}
                mr={1}
                sx={{ color: "#1D2939", fontSize: "14px", fontWeight: "700" }}
              >
                Risk
              </Typography>
            </Box>
          </AccordionSummary>

          <div class="flex pl-7 gap-4 pb-4">
            <div class="flex flex-col items-center cursor-pointer w-2/5  p-4 rounded-[7px] border border-[#E4E7EC] bg-white hover:bg-[#F9FAFB]">
              <img src="/assets/low.svg" />
              <span class="pt-2 text-2xs  text-[#344054] font-normal">Low</span>
            </div>

            <div class="flex flex-col items-center cursor-pointer w-2/5  p-4 rounded-[7px] border border-[#E4E7EC] bg-white hover:bg-[#F9FAFB]">
              <img src="/assets/medium.svg" />
              <span class="pt-2 text-2xs  text-[#344054] font-normal">
                Medium
              </span>
            </div>

            <div class="flex flex-col items-center cursor-pointer w-2/5  p-4 rounded-[7px] border border-[#E4E7EC] bg-white hover:bg-[#F9FAFB]">
              <img src="/assets/High.svg" />
              <span class="pt-2 text-2xs  text-[#344054] font-normal">
                High
              </span>
            </div>
          </div>
        </Accordion>
      </div>

      {/* button  */}
      <div className="pt-[61px]">
        <div className="flex gap-3 py-3 px-6  border-t-2 border-[#F2F4F7] fixed bg-white bottom-0 ">
          <button
            class="  text-[#344054] font-semibold  py-2 px-4 border border-[#D0D5DD]  rounded-lg w-[170px]"
            onClick={toggleDrawer(false)}
          >
            Cancel
          </button>
          <button
            class=" font-semibold text-white py-2 px-4 bg-[#125B54] rounded-lg w-[170px] "
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </Box>
  );

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
              <CustomSortMenu />
              <div className="w-auto">
                <Button
                  variant="outlined"
                  onClick={toggleDrawer(true)}
                  className="relative bg-white border !border-[#E4E7EC] !py-[10px] !pl-5 !pr-5 rounded-md flex gap-2 items-center shadow-3xs !min-w-24"
                >
                  <img src="/assets/filter.svg" alt="" />
                  <p className="font-open_sans text-brand-500 font-medium">
                    Filter{" "}
                  </p>
                  <div class=" bg-[#135B54] text-white px-2 text-xs font-bold rounded-full w-6  h-6 justify-center items-center flex ">
                    1
                  </div>
                </Button>
                <Drawer open={open} anchor="right" onClose={() => {}}>
                  {DrawerList}
                </Drawer>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* filter menu code not delete -nehakikani */}
      {/* main filter  */}
      {!showFilterHeader ? (
        <>
          {/* <Filtermenu2 /> */}
          {/* <FilterMenuTags /> */}
        </>
      ) : (
        <>
          {/* <Filtermenu
            ref={filterHeaderRef}
            role="banner"
            aria-hidden={!showFilterHeader}
          /> */}
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
            ) : (
              items.length > 0 &&
              items.map((value, index) => (
                <StockCard
                  key={index} // Ensure each item has a unique key
                  {...value}
                />
              ))
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
