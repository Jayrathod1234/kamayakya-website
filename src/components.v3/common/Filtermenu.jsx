import React, { useState } from "react";
import MainBoardArea from "../common/MainBoardArea.jsx";
import SelectDrop from "../common/SelectDrop.jsx";
import RadioDrop from "../common/RadioDrop.jsx";
import StockCard from "../common/StockCard.jsx";
import Nonlogincard from "../common/Nonlogincard.jsx";
import RadioSelectDropdown from "../common/RadioDrop.jsx";
import Button from "@mui/material/Button";

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

function Filtermenu() {
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
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // upside left
  const [value, setValue] = React.useState([25, 115]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const handleChange4 = (event) => {
    setState2({ ...state, [event.target.name]: event.target.checked });
  };

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation" onClick={toggleDrawer(false)}>
      {/* topbar  */}
      <div className="py-4 px-6  sticky top-0 bg-white z-50">
        <div className="justify-between absolute flex items-center w-auto gap-2 ">
          <div className="text-[#191D23] text-ellipsis text-xl font-bold font-open_sans w-[290px]">
            Filters
          </div>
          <div className="text-[#125B54] text-sm font-semibold cursor-pointer">
            Clear All
          </div>
        </div>
        <Divider sx={{ marginTop: "44px" }} />
      </div>
      {/* upside left  */}
      <div className="pt-6 pr-6 pl-4 overflow-x-hidden">
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

        <Slider
          value={value}
          onChange={handleSliderChange}
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
              value={value[0]}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
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
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: "16px" }} />
      </div>

      {/*  Recency */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ rotate: "180deg" }} />}
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
                    A stock recommended last week is more recent and potentially
                    more relevant than one recommended a month ago.
                  </p>
                </div>
              </span>
            </div>
          </Box>
        </AccordionSummary>
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
      </Accordion>

      {/* Time Left  */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ rotate: "180deg" }} />}
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
      </Accordion>

      {/* Total Returns  */}
      <div className="pt-6 pr-6 pl-4 overflow-x-hidden">
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

        <Slider
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
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
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
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: "16px" }} />
      </div>

      {/* Market Cap */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ rotate: "180deg" }} />}
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
              Market Cap
            </Typography>
          </Box>
        </AccordionSummary>
        {/* <SizeSelector /> */}
        <div class="flex px-7 gap-4">
          <div class="flex flex-col items-center cursor-pointer w-1/3  p-4 rounded-[7px] border border-[#E4E7EC] bg-white hover:bg-[#F9FAFB]">
            {/* <div class=""> */}
            <img src="/assets/Group 47357.svg" />
            {/* </div> */}
            <span class="pt-2 text-2xs  text-[#344054] font-normal">Small</span>
          </div>

          <div class="flex flex-col items-center cursor-pointer w-1/3  p-4 rounded-[7px] border border-[#E4E7EC] bg-white hover:bg-[#F9FAFB]">
            {/* <div class=""> */}
            <img src="/assets/Component 5.svg" />
            {/* </div> */}
            <span class="pt-2 text-2xs  text-[#344054] font-normal">Mid</span>
          </div>

          <div class="flex flex-col items-center cursor-pointer w-1/3  p-4 rounded-[7px] border border-[#E4E7EC] bg-white hover:bg-[#F9FAFB]">
            {/* <div class=""> */}
            <img src="/assets/Component 9.svg" />
            {/* </div> */}
            <span class="pt-2 text-2xs  text-[#344054] font-normal">Large</span>
          </div>
        </div>
      </Accordion>

      {/* Sectors  */}
      {/* <Accordion defaultExpanded>
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
        <div>
          <TextField
            label="Search for sectors"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Agricultural" />
            <FormControlLabel
              control={<Checkbox />}
              label="Automobile & Ancillaries"
            />
            <FormControlLabel control={<Checkbox />} label="Banking" />
            <FormControlLabel
              control={<Checkbox />}
              label="Consumer Durables"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Derived Materials"
            />
            <FormControlLabel control={<Checkbox />} label="Financial" />
            <FormControlLabel control={<Checkbox />} label="Agricultural" />
          </FormGroup>
        </div>
      </Accordion> */}
    </Box>
  );

  // step

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const options = [
    {
      icon: "/assets/graph-down-new-broken.svg",
      value: "High to Low",
      label: "High to Low",
    },
    { value: "Low to High", label: "Low to High" },
    { value: "Newest to Oldest", label: "Newest to Oldest" },
  ];
  return (
    <>
      <div className="bg-white sticky top-0 left-0 z-[8]">
        <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto  py-[10px] px-0 flex gap-1 items-center justify-between pt-4">
          {/* <div className="w-auto">
            <p className="font-open_sans text-sm font-normal text-[#344054]">
              Quick Filters:
            </p>
          </div> */}
          <div className="w-auto">
            <button className="group group/item px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center hover:bg-brand-100 hover:border-brand-200 hover:scale-[0.960] transition-all duration-500 hover:transition-all hover:duration-500 focus:bg-brand-500 focus:text-white text-[#1D2939]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="group-focus:stroke-white"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.44991 2.33977C6.02022 2.33977 3.23991 5.12008 3.23991 8.54977C3.23991 11.9795 6.02022 14.7598 9.44991 14.7598C9.84856 14.7598 10.238 14.7223 10.6149 14.6508C10.9079 14.5952 11.1905 14.7877 11.2461 15.0807C11.3017 15.3737 11.1092 15.6563 10.8162 15.7118C10.3732 15.7959 9.91644 15.8398 9.44991 15.8398C5.42376 15.8398 2.15991 12.5759 2.15991 8.54977C2.15991 4.52361 5.42376 1.25977 9.44991 1.25977C13.4761 1.25977 16.7399 4.52361 16.7399 8.54977C16.7399 8.848 16.4982 9.08977 16.1999 9.08977C15.9017 9.08977 15.6599 8.848 15.6599 8.54977C15.6599 5.12008 12.8796 2.33977 9.44991 2.33977ZM9.44991 5.32542C9.74815 5.32542 9.98991 5.56718 9.98991 5.86542V9.00431L12.1519 9.72498C12.4349 9.81929 12.5878 10.1251 12.4935 10.408C12.3991 10.691 12.0933 10.8439 11.8104 10.7496L9.27915 9.90581C9.05865 9.8323 8.90991 9.62595 8.90991 9.39352V5.86542C8.90991 5.56718 9.15168 5.32542 9.44991 5.32542Z"
                  fill="#475467"
                />
              </svg>
              <p className=" text-sm font-medium font-open_sans">Most Recent</p>
              <div className="group-focus/item:visible invisible">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="white"
                    stroke-width="1.3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
          <div className="w-auto">
            <button className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center hover:bg-brand-100 hover:border-brand-200 hover:scale-[0.960] transition-all duration-500 hover:transition-all hover:duration-500">
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
            </button>
          </div>
          <div className="w-auto">
            <button className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center hover:bg-brand-100 hover:border-brand-200 hover:scale-[0.960] transition-all duration-500 hover:transition-all hover:duration-500">
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
            </button>
          </div>
          <div className="w-auto">
            <button className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center hover:bg-brand-100 hover:border-brand-200 hover:scale-[0.960] transition-all duration-500 hover:transition-all hover:duration-500">
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
            </button>
          </div>
          <div className="w-auto">
            <button className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center hover:bg-brand-100 hover:border-brand-200 hover:scale-[0.960] transition-all duration-500 hover:transition-all hover:duration-500">
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
            </button>
          </div>
          <div className="w-auto">
            <button className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center hover:bg-brand-100 hover:border-brand-200 hover:scale-[0.960] transition-all duration-500 hover:transition-all hover:duration-500">
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
            </button>
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
                Strategy
              </p>
              <img src="/assets/chevron-down.svg" alt="" />
            </div>

            {/* <SelectDrop options={options} onSelect={handleSelect} /> */}
            {/* <details class="custom-select">
                <summary class="radios">
                  <input
                    type="radio"
                    name="item"
                    id="default"
                    title="Strategy"
                    checked
                  />
                  <input type="radio" name="item" id="item1" title="Item 1" />
                  <input type="radio" name="item" id="item2" title="Item 2" />
                  <input type="radio" name="item" id="item3" title="Item 3" />
                  <input type="radio" name="item" id="item4" title="Item 4" />
                  <input type="radio" name="item" id="item5" title="Item 5" />
                  <img src="/assets/chevron-down.svg" alt="" />
                </summary>
                <div className="navlist">
                  <ul class="list">
                    <li>
                      <label for="item1">
                        Agricultural<span></span>
                      </label>
                    </li>
                    <li>
                      <label for="item2">Chemicals</label>
                    </li>
                    <li>
                      <label for="item3">Apparel & Accessories</label>
                    </li>
                    <li>
                      <label for="item4">Banking </label>
                    </li>
                  
                  </ul>
                </div>
              </details> */}
            {/* <div className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center">
                <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                  Sector
                </p>
                <img src="/assets/chevron-down.svg" alt="" />
              </div> */}
          </div>
          <div className="flex gap-[10] items-center">
            <form className="search inline-flex items-center text-white px-1 py-[3px] rounded-md border border-[#E4E7EC] transition linear  ">
              <input
                type="text"
                placeholder="Search"
                className="search__input w-0 transition-width duration-[0.5s]"
              />
              <button
                type="button"
                className="search__button grid place-items-center w-[35px] h-[35px] cursor-pointer transition-colors duration-[0.25s] hover:text-[#e3e3e3] bg-[rgba(0, 0, 0, 0.1)] rounded-full "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="#0000"
                >
                  <path
                    d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                    stroke="#667085"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="w-auto">
            <Button
              variant="outlined"
              onClick={toggleDrawer(true)}
              className="relative bg-white border !border-[#E4E7EC] !py-[8px] pl-4 pr-5 rounded-md flex gap-2 items-center shadow-3xs !min-w-24"
            >
              <img src="/assets/filter.svg" alt="" />
              <p className="font-open_sans text-brand-500">Filter </p>
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
          {/* <RadioSelectDropdown /> */}
        </div>
      </div>
    </>
  );
}

export default Filtermenu;
