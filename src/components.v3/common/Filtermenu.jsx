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

  const [buttons, setButtons] = useState([
    { id: 1, label: 'Most Recent', icon:'/assets/watch.svg'},
    { id: 2, label: 'Value Pick', icon:'/assets/Pricing.svg' },
    { id: 3, label: 'Market Leadership', icon:'/assets/leader.svg'},
    { id: 4, label: 'Thematic Stories', icon:'/assets/bulb.svg'},
    { id: 5, label: 'Chemicals', icon:'/assets/chamical.svg'},
    { id: 6, label: 'Pharma', icon:'/assets/pharma.svg'}
  ]);


  const handleDelete = (id) => {
    setButtons(buttons.filter(button => button.id !== id));
  };
  return (
    <>
      <div className="bg-white sticky top-0 left-0 z-[8]">
        <div className="w-[min(1280px,calc(100%-25px))] min-w-[328px] mx-auto  py-[10px] px-0 flex gap-1 items-center justify-between pt-4">
          {/* <div className="w-auto">
            <p className="font-open_sans text-sm font-normal text-[#344054]">
              Quick Filters:
            </p>
          </div> */}
          {buttons.map((button) => (
            <div key={button.id} className="w-auto">
              <button
                className="group relative px-4 py-[10px] flex items-center justify-between w-full shadow-md border-[#E4E7EC] border rounded hover:bg-brand-100 hover:border-brand-200 transition-all duration-500 focus:bg-brand-500 focus:text-white text-[#1D2939] focus:w-[calc(100%+10px)]"
              >
                <img
                  src={button.icon} // Replace with your icon's path or URL
                  alt="Icon"
                  width="18"
                  height="18"
                  className="group-focus:brightness-0 group-focus:invert-[1]"
                />
                <p className="flex-grow  text-sm font-medium font-open_sans mx-2">
                  {button.label}
                </p>
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 invisible group-focus-within:visible"
                  onClick={() => handleDelete(button.id)}
                >
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
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </div>
          ))}
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
            <form className="search inline-flex items-center text-black px-1 py-[3px] rounded-md border border-[#E4E7EC] transition linear  ">
              <input
                type="text"
                placeholder="Search"
                className="search__input w-0  transition-width duration-300"
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
