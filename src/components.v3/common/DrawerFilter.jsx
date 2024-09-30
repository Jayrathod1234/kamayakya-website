import React, { useEffect, useState } from "react";

import {
  Box,
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
  Drawer,
  styled,
  Slider,
  Button,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from "@mui/material/Badge";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PropTypes from "prop-types";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SectorFilter2 from "@/components.v3/common/SectoreFilter2";
import { filterTimeLabel } from "@/utils/constants.js";
import { BorderLeftRounded } from "@mui/icons-material";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { useAllBoardStock } from "@/contexts/AllBoardStockContext";
import { background } from "@chakra-ui/react";

// fixed drawer
const CustomTabPanel = styled(Box)(({ theme }) => ({
  height: "100%",
  overflowY: "auto", // Enable vertical scrolling
  paddingRight: theme.spacing(1.5), // Add padding to the right
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#108973 !important", // Match scrollbar color
    borderRadius: "0px 6px 6px 0px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#108973 !important",
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <CustomTabPanel
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>
        <Typography style={{ color: "#2A837B" }}>{children}</Typography>{" "}
        {/* Match text color */}
      </Box>
    </CustomTabPanel>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function DrawerFilter() {
  const {
    setStrategyTag,
    strategyTag,
    min_upside_left,
    max_upside_left,
    min_returns,
    max_returns,
    marketCapTypeList,
    strategyTagList,
    stockRiskList,
    sebiBoardType,
    addPopularStrategies,
    removePopularStrategies,
    changablestrategyTags,
  } = useStockPicks();

  const {
    recency,
    setRecency,
    timeLeft,
    setTimeLeft,
    upsideLeft,
    setUpsideLeft,
    returns,
    setReturns,
    totalFilterCount,
    risk,
    setRisk,
    handleResetFilters,
    handleApplyFilters,
    marketCapType,
    setMarketCapType,
    sector,
    setSector,
  } = useAllBoardStock();
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  // Temporary state to hold the strategy tag changes
  const drawerBleeding = 56;
  const [tempStrategyTag, setTempStrategyTag] = useState(strategyTag);
  const [tempUpsideLeft, setTempUpsideLeft] = useState(upsideLeft);
  const [tempRecency, setTempRecency] = useState(recency);
  const [tempTimeLeft, setTempTimeLeft] = useState(timeLeft);
  const [tempReturns, setTempReturns] = useState(timeLeft);
  const [tempMarketCapType, setTempMarketCapType] = useState(marketCapType);
  const [tempRisk, setTempRisk] = useState(risk);
  const [tempSector, setTempSector] = useState(sector);

  useEffect(() => {
    if (open) {
      clearValues();
    }
  }, [open]);

  const clearValues = () => {
    setTempStrategyTag(strategyTag);
    setTempUpsideLeft(upsideLeft);
    setTempMarketCapType(marketCapType);
    setTempReturns(returns);
    setTempRecency(recency);
    setTempTimeLeft(timeLeft);
    setTempRisk(risk);
    setTempSector(sector);
  };
  ////
  const handleApply = () => {
    setStrategyTag(tempStrategyTag);
    setUpsideLeft(tempUpsideLeft);
    setMarketCapType(tempMarketCapType);
    setRecency(tempRecency);
    setTimeLeft(tempTimeLeft);
    setReturns(tempReturns);
    setRisk(tempRisk);
    setSector(tempSector);
    setOpen(false);
    handleApplyFilters(true);
  };

  const handleSelectAllStrategies = () => {
    const strategy_tag_list_arr = Object.keys(strategyTagList || {});

    if (tempStrategyTag.length === strategy_tag_list_arr.length) {
      strategy_tag_list_arr.forEach(async (element) => {
        await removePopularStrategies(element);
      });
      setTempStrategyTag([]);
    } else {
      strategy_tag_list_arr.forEach(async (element) => {
        await addPopularStrategies(element);
      });
      setTempStrategyTag(strategy_tag_list_arr);
    }
  };
  const handleReset = () => {
    setOpen(false);
    handleResetFilters();
  };

  const handleCancel = () => {
    clearValues();
    setOpen(false);
  };

  const toggleDrawer = (anchorVal, openVal) => () => {
    setOpen(openVal);
    setAnchor(anchorVal);
  };

  /**
   * Stock price slider filter
   * Onchange event
   */
  const handleUpsideLeftSliderChange = (event, newValue) => {
    setTempUpsideLeft(newValue);
  };

  const handleUpsideLeftInputChange = (event, type) => {
    let inputValue = event?.target?.value;
    if (type == "min") {
      setTempUpsideLeft([inputValue, tempUpsideLeft[1]]);
    } else {
      setTempUpsideLeft([tempUpsideLeft[0], inputValue]);
    }
  };

  // // returns
  const handleReturnsSliderChange = (event, newValue) => {
    setTempReturns(newValue);
  };

  const handleReturnsInputChange = (event, type) => {
    let inputValue = event?.target?.value;
    if (type == "min") {
      setTempReturns([inputValue, tempUpsideLeft[1]]);
    } else {
      setTempReturns([tempUpsideLeft[0], inputValue]);
    }
  };

  const handleChangeRecency = (event) => {
    setTempRecency({
      ...tempRecency,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeTimeLeft = (event) => {
    setTempTimeLeft({
      ...tempTimeLeft,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangestrategyTag = (event) => {
    const { name, checked } = event.target;
    checked ? addPopularStrategies(name) : removePopularStrategies(name);
    setTempStrategyTag((prev) =>
      checked ? [...prev, name] : prev.filter((tag) => tag !== name)
    );
  };

  const handleMarketCap = (value)=>{
    setTempMarketCapType(prev=>{
      console.log(prev.includes(value),[...prev.filter(val=>val!=value)],[...prev,value])
      return (prev.includes(value) ? [...prev.filter(val=>val !=value)]:[...prev,value])})
  }

  const CustomSlider = styled(Slider)({
    color: "#125B54", // Main color for the rail and thumb border
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
      zIndex:2,
    },
    "& .MuiSlider-rail": {
      color: "#E4E7EC",
      opacity: 1,
    },
    "& .MuiSlider-track": {
      border: "none",
      color:"#125B54",
      zIndex:1
    },
    "& .MuiSlider-mark": {
      width: "9px",
      height: "9px",
      borderRadius: "50%",
      backgroundColor: "#E4E7EC", // Dot color when not active
      zIndex:0
    },
    '& .MuiSlider-valueLabel': {
        zIndex:1000,
      '&.MuiSlider-valueLabelOpen': {
       
      zIndex:1000
    },
    }
  });
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const generateMarks = (min, max, numberOfMarks) => {
    const stepSize = (max - min) / (numberOfMarks - 1);
    const marksArray = [];

    for (let i = 0; i < numberOfMarks; i++) {
      const value = min + i * stepSize;
      marksArray.push({ value });
    }

    return marksArray;
  };

  const upside_left_marks = generateMarks(min_upside_left, max_upside_left, 5);

  const returns_marks = generateMarks(min_returns, max_returns, 5);

  return (
    <>
      {!isMobile ? (
        <>
          <Button
            variant="outlined"
            onClick={toggleDrawer("right", true)}
            sx={{ display: isMobile ? "none" : "block" }}
            className="!flex h-full relative !bg-white border !border-[#E4E7EC] sm:!py-[8px] py-0 !pl-5 !pr-5 !rounded-[.5rem]  gap-2 items-center shadow-3xs !min-w-24"
          >
            <img src="/assets/filter.svg" alt="" />
            <p className="font-open_sans text-brand-500 font-medium normal-case">
              Filter{" "}
            </p>
            {totalFilterCount > 0 && (
              <div className=" bg-[#135B54] text-white px-2 text-xs font-bold rounded-full w-6  h-6 justify-center items-center flex font-open_sans">
                {totalFilterCount}
              </div>
            )}
          </Button>
          <Drawer
            open={open}
            anchor={anchor}
            onClose={() => {
              setOpen(false);
            }}
            ModalProps={{
              keepMounted: true, // Keeps mounted so you can style it
              sx: {
                backdropFilter: "blur(2px)", // Apply blur effect when drawer is open
              },
            }}
          >
            <Box
              sx={{ width: 400 }}
              role="presentation"
              onClick={(e) => e.stopPropagation()}
            >
              {/* topbar  */}
              <div className="pt-4 pb-2 px-6  sticky top-0 bg-white z-50  ">
                <div className="justify-between absolute flex items-center w-auto gap-2 ">
                  <div className="text-[#191D23] text-ellipsis text-xl font-bold font-open_sans w-[290px]">
                    Filters
                  </div>
                  <div
                    className="text-[#125B54] text-sm font-open_sans font-semibold cursor-pointer"
                    onClick={handleReset}
                  >
                    Clear All
                  </div>
                </div>
                <div className="border-b-2 border-[#F2F4F7] mt-11"></div>
              </div>
              {/* upside left  */}
              <div className="pt-0 pr-6 pl-2 ">
                <Accordion defaultExpanded sx={{ boxShadow: "none" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ paddingRight: 0 }}
                  >
                    <Box display="flex" alignItems="center">
                      <img
                        src="/assets/solar_graph-down-new-broken.svg"
                        alt="Upside Left"
                      />
                      <div className=" flex">
                        <Typography
                          variant="subtitle1"
                          ml={1}
                          mr={1}
                          sx={{
                            color: "#1D2939",
                            fontSize: "14px",
                            fontWeight: "700",
                            fontFamily: "open sans",
                          }}
                        >
                          Upside Left
                        </Typography>
                        <IconButton size="small">
                          <div className="tooltip ">
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
                            <span className="tooltiptext tooltiptext2 shadow-3xl relative z-[200000] ">
                              <img
                                src="/assets/div.png"
                                alt=""
                                className="absolute -top-2 left-[52px] w-4"
                              />
                              <div className="text-gray-800 text-2xs font-normal font-open_sans">
                                Upside Left means how much the stock price could
                                rise from its current level.
                              </div>
                              <div className="mt-2 p-2 bg-[#F6F7F9] rounded-[0.5rem] gap-1">
                                <span className="text-[#108973] text-2xs font-bold font-open_sans">
                                  Example :
                                </span>
                                <p className="text-2xs text-gray-600 font-normal font-open_sans">
                                  If a stock's price is ₹100 and the Upside Left
                                  is 20%, it might go up to ₹120.
                                </p>
                              </div>
                            </span>
                          </div>
                        </IconButton>
                      </div>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="pl-11">
                      <CustomSlider
                        
                        value={tempUpsideLeft}
                        onChange={handleUpsideLeftSliderChange}
                        // valueLabelDisplay="auto"
                        min={min_upside_left}
                        max={max_upside_left}
                        valueLabelDisplay="auto"
                        aria-label="custom slider"
                        defaultValue={50}
                        marks={upside_left_marks}
                        step={null}
                        // min={0}
                        // max={100}
                      />
                      <Grid container spacing={2} alignItems="center" pt={2}>
                        <Grid item xs={5}>
                          <TextField
                            variant="outlined"
                            size="small"
                            type="number"
                            value={tempUpsideLeft ? tempUpsideLeft[0] : 0}
                            onChange={(e) =>
                              handleUpsideLeftInputChange(e, "min")
                            }
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": { borderColor: "#125B54" },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#125B54",
                                },
                              },
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
                            type="number"
                            value={tempUpsideLeft ? tempUpsideLeft[1] : 0}
                            onChange={(e) =>
                              handleUpsideLeftInputChange(e, "max")
                            }
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": { borderColor: "#125B54" },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#125B54",
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <div className="border-b-2 border-[#F2F4F7] "></div>
              </div>

              {/*  Recency */}
              <div className="pt-4 pr-6 pl-2 ">
                <Accordion
                  defaultExpanded
                  sx={{
                    boxShadow: "none !important",
                    margin: "0px !important",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="recency-content"
                    id="recency-header"
                    sx={{ paddingRight: 0 }}
                  >
                    <Box display="flex" alignItems="center">
                      <AccessTimeIcon fontSize="small" />
                      <Typography
                        variant="subtitle1"
                        ml={1}
                        mr={1}
                        sx={{
                          color: "#1D2939",
                          fontSize: "14px",
                          fontWeight: "700",
                          fontFamily: "open sans",
                        }}
                      >
                        Recency
                      </Typography>
                      <div className="tooltip ">
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
                        <span className="tooltiptext tooltiptext2 relative z-[200000] shadow-3xl ">
                          <img
                            src="/assets/div.png"
                            alt=""
                            className="absolute -top-2 left-[52px] w-4"
                          />
                          <div className="text-gray-800 text-2xs font-normal font-open_sans">
                            Recency tells you how new this stock recommendation
                            is.
                          </div>
                          <div className="mt-2 p-2 bg-[#F6F7F9] rounded-[0.5rem]  gap-1">
                            <span className="text-[#108973] text-2xs font-bold font-open_sans">
                              Example :
                            </span>
                            <p className="text-2xs text-gray-600 font-normal font-open_sans">
                              A stock recommended last week is more recent and
                              potentially more relevant than one recommended a
                              month ago.
                            </p>
                          </div>
                        </span>
                      </div>
                    </Box>
                  </AccordionSummary>
                  <div className="pl-7">
                    <AccordionDetails>
                      <FormGroup>
                        {Object.keys(tempRecency || {}).map((key) => (
                          <FormControlLabel
                            key={key}
                            sx={{
                              fontFamily: "Open Sans, sans-serif !important", // Apply font to label text
                            }}
                            control={
                              <Checkbox
                                checked={tempRecency[key]}
                                onChange={handleChangeRecency}
                                name={key}
                                sx={{
                                  fontFamily:
                                    "Open Sans, sans-serif !important", // Apply font to checkbox text
                                  color: "default", // Default color
                                  "&.Mui-checked": {
                                    color: "#125B54", // Color when checked
                                  },
                                }}
                              />
                            }
                            label={
                              <span
                                style={{ fontFamily: "Open Sans, sans-serif" }}
                              >
                                {filterTimeLabel[key]}
                              </span>
                            } // Ensure label text uses the correct font
                          />
                        ))}
                      </FormGroup>
                    </AccordionDetails>
                  </div>
                </Accordion>
                <div className="border-b-2 border-[#F2F4F7] "></div>
              </div>

              {/* Time Left  */}
              <div className="pt-4 pr-6 pl-2 overflow-x-hidden">
                <Accordion
                  defaultExpanded
                  sx={{
                    boxShadow: "none !important",
                    margin: "0px !important",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="recency-content"
                    id="recency-header"
                    sx={{ paddingRight: 0 }}
                  >
                    <Box display="flex" alignItems="center">
                      <img src="/assets/hourglass-02.svg" />
                      <Typography
                        variant="subtitle1"
                        ml={1}
                        mr={1}
                        sx={{
                          color: "#1D2939",
                          fontSize: "14px",
                          fontWeight: "700",
                          fontFamily: "open sans",
                        }}
                      >
                        Time Left
                      </Typography>
                      {/* <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton> */}
                    </Box>
                  </AccordionSummary>
                  <div className="pl-7 ">
                    <AccordionDetails>
                      <FormGroup className="">
                        {Object.keys(tempTimeLeft || {}).map((key) => (
                          <FormControlLabel
                            key={key}
                            control={
                              <Checkbox
                                checked={tempTimeLeft[key]}
                                onChange={handleChangeTimeLeft}
                                name={key}
                                sx={{
                                  color: "default", // Default color
                                  "&.Mui-checked": {
                                    color: "#125B54", // Color when checked
                                  },
                                }}
                              />
                            }
                            label={
                              <span
                                style={{ fontFamily: "Open Sans, sans-serif" }}
                              >
                                {filterTimeLabel[key]}
                              </span>
                            }
                            sx={{
                              height: "42px",
                            }}
                          />
                        ))}
                      </FormGroup>
                    </AccordionDetails>
                  </div>
                </Accordion>
                <div className="border-b-2 border-[#F2F4F7] "></div>
              </div>
              {/* Total Returns  */}
              <div className="pt-4 pr-6 pl-2  overflow-x-hidden">
                <Accordion
                  defaultExpanded
                  sx={{
                    boxShadow: "none !important",
                    margin: "0px !important",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ paddingRight: 0 }}
                  >
                    <Box display="flex" alignItems="center">
                      <img
                        src="/assets/solar_graph-down-new-broken.svg"
                        alt="Total Returns"
                      />
                      <div className=" flex">
                        <Typography
                          variant="subtitle1"
                          ml={1}
                          mr={1}
                          sx={{
                            color: "#1D2939",
                            fontSize: "14px",
                            fontWeight: "700",
                            fontFamily: "open sans",
                          }}
                        >
                          Total Returns
                        </Typography>
                      </div>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="pl-11">
                      <CustomSlider
                        value={tempReturns}
                        onChange={handleReturnsSliderChange}
                        valueLabelDisplay="auto"
                        min={min_returns}
                        max={max_returns}
                        marks={returns_marks}
                      />

                      <Grid container spacing={2} alignItems="center" pt={2}>
                        <Grid item xs={5}>
                          <TextField
                            variant="outlined"
                            size="small"
                            type="number"
                            value={tempReturns ? tempReturns[0] : 0}
                            onChange={(e) => handleReturnsInputChange(e, "min")}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": { borderColor: "#125B54" },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#125B54",
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <Typography
                            align="center"
                            fontFamily="Open Sans, sans-serif"
                          >
                            to
                          </Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            variant="outlined"
                            size="small"
                            type="number"
                            value={tempReturns ? tempReturns[1] : 0}
                            onChange={(e) => handleReturnsInputChange(e, "max")}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": { borderColor: "#125B54" },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#125B54",
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <div className="border-b-2 border-[#F2F4F7] "></div>
              </div>

              {/* Market Cap */}
              {sebiBoardType == "mainboard" && (
                <div className="pt-4 pr-6 pl-2 overflow-x-hidden">
                  <Accordion
                    defaultExpanded
                    sx={{
                      boxShadow: "none !important",
                      margin: "0px !important",
                    }}
                  >
                    <AccordionSummary
                      sx={{ paddingRight: 0 }}
                      expandIcon={<ExpandMoreIcon />}
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
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <Typography
                          variant="subtitle1"
                          ml={1}
                          mr={1}
                          sx={{
                            color: "#1D2939",
                            fontSize: "14px",
                            fontWeight: "700",
                            fontFamily: "open sans",
                          }}
                        >
                          Market Cap
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    {/* <SizeSelector /> */}
                    <div className="flex pl-11 gap-4 pb-4">
                      {marketCapTypeList?.map((value, index) => (
                        <div
                          className={`flex flex-col items-center cursor-pointer w-2/5  p-4 rounded-[7px] border hover:bg-[#F9FAFB]  ${
                            tempMarketCapType.includes(value)
                              ? "bg-[#E7F8F8] border-[#108973]"
                              : "bg-white border-[#E4E7EC]"
                          }`}
                          key={index}
                          onClick={()=>handleMarketCap(value)}
                        >
                          <img src={`/assets/${value}.svg`} alt={value} />

                          <span className="pt-2 text-2xs font-open_sans text-[#344054] font-normal">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Accordion>
                  <div className="border-b-2 border-[#F2F4F7] "></div>
                </div>
              )}

              {/* Sectors  */}
              <div className="pt-4 pr-6 pl-2 overflow-x-hidden">
                <Accordion
                  defaultExpanded
                  sx={{
                    boxShadow: "none !important",
                    marginBottom: "0px !important",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="recency-content"
                    id="recency-header"
                    sx={{ paddingRight: 0 }}
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
                            strokeWidth="1.5"
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
                        sx={{
                          color: "#1D2939",
                          fontSize: "14px",
                          fontWeight: "700",
                          fontFamily: "open sans",
                        }}
                      >
                        Sectors
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <SectorFilter2
                    tempSector={tempSector}
                    setTempSector={setTempSector}
                    isMobile={isMobile}
                  />
                </Accordion>
                <div className="border-b-2 border-[#F2F4F7] "></div>
              </div>

              {/* Strategies   */}
              <div className="pt-4 pr-6 pl-2 overflow-x-hidden">
                <Accordion
                  defaultExpanded
                  sx={{
                    boxShadow: "none !important",
                    margin: "0px !important",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="recency-content"
                    id="recency-header"
                    sx={{ paddingRight: 0 }}
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
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <Typography
                        variant="subtitle1"
                        ml={1}
                        mr={1}
                        sx={{
                          color: "#1D2939",
                          fontSize: "14px",
                          fontWeight: "700",
                          fontFamily: "open sans",
                        }}
                      >
                        Strategies
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <div className="pl-7">
                    <AccordionDetails>
                      <FormGroup>
                        {Object.keys(strategyTagList || {}).map((key) => (
                          <FormControlLabel
                            key={key}
                            control={
                              <Checkbox
                                checked={tempStrategyTag.includes(key)}
                                onChange={handleChangestrategyTag}
                                name={key}
                                sx={{
                                  color: "default", // Default color
                                  "&.Mui-checked": {
                                    color: "#125B54", // Color when checked
                                  },
                                }}
                              />
                            }
                            label={
                              <span
                                style={{ fontFamily: "Open Sans, sans-serif" }}
                              >
                                {strategyTagList[key]}
                              </span>
                            }
                          />
                        ))}
                      </FormGroup>
                    </AccordionDetails>
                  </div>
                </Accordion>
                <div className="border-b-2 border-[#F2F4F7] "></div>
              </div>

              {/*Risk */}
              <div className="pt-4 pr-6 pl-2 pb-[61px] overflow-x-hidden">
                <Accordion
                  defaultExpanded
                  sx={{
                    boxShadow: "none !important",
                    margin: "0px !important",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="recency-content"
                    id="recency-header"
                    sx={{ paddingRight: 0 }}
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
                            strokeWidth="1.5"
                          />
                          <path
                            d="M5.8335 11.6654L7.74433 9.75453C7.9006 9.59831 8.11253 9.51054 8.3335 9.51054C8.55447 9.51054 8.76639 9.59831 8.92266 9.75453L10.2443 11.0762C10.4006 11.2324 10.6125 11.3202 10.8335 11.3202C11.0545 11.3202 11.2664 11.2324 11.4227 11.0762L14.1668 8.33203M14.1668 8.33203V10.4154M14.1668 8.33203H12.0835"
                            stroke="#1D2939"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
                        sx={{
                          color: "#1D2939",
                          fontSize: "14px",
                          fontWeight: "700",
                          fontFamily: "open sans",
                        }}
                      >
                        Risk
                      </Typography>
                    </Box>
                  </AccordionSummary>

                  <div className="flex pl-11 gap-4 pb-4">
                    {stockRiskList?.map((value, index) => (
                      <div
                        className={`flex flex-col items-center cursor-pointer w-2/5  p-4 rounded-[7px] border hover:bg-[#F9FAFB]  ${
                          tempRisk == value
                            ? "bg-[#E7F8F8] border-[#108973]"
                            : "bg-white border-[#E4E7EC]"
                        }`}
                        key={index}
                        onClick={() => setTempRisk(value)}
                      >
                        <img src={`/assets/${value}.svg`} alt={value} />

                        <span className="pt-2 text-2xs  font-open_sans text-[#344054] font-normal">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </Accordion>
              </div>

              {/* button  */}
              <div className="pt-[61px]">
                <div className="flex gap-3 py-3 px-6  border-t-2 border-[#F2F4F7] z-40 fixed bg-white bottom-0 ">
                  <button
                    className="  text-[#344054] font-semibold font-open_sans  py-2 px-4 border border-[#D0D5DD]  rounded-lg w-[170px] hover:scale-[000.95] duration-500 "
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className=" font-semibold text-white py-2 font-open_sans px-4 bg-[#125B54] rounded-lg w-[170px] hover:scale-[000.95] duration-500 "
                    onClick={handleApply}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </Box>
          </Drawer>
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            onClick={toggleDrawer("bottom", true)}
            sx={{ display: isMobile ? "block" : "none", paddingInline:"10px",minWidth:"fit-content" }}
            className="!flex h-full relative !bg-white border !border-[#E4E7EC] sm:!py-[10px] py-0   !rounded-[6px]  gap-2 items-center shadow-3xs  hover:bg-error-500"
          >
            <img height={16} width={16} src="/assets/filter.svg" alt="" />
            <p className="font-open_sans text-brand-500 font-medium normal-case text-sm">
              Filter
            </p>
            {totalFilterCount > 0 && (
              <div className=" bg-[#135B54] font-open_sans text-white px-2 text-sm font-bold rounded-full w-6  h-6 justify-center items-center flex ">
                {totalFilterCount}
              </div>
            )}
          </Button>
          <Drawer
            className="mobile__filter"
            styled={{ BorderLeftRounded: "12px !important" }}
            open={open}
            anchor={anchor}
            onClose={() => {
              setOpen(false);
            }}
            ModalProps={{
              keepMounted: true, // Keeps mounted so you can style it
              sx: {
                backdropFilter: "blur(2px)", // Apply blur effect when drawer is open
               
              },
              
            }}
            styles={{
              ".MuiDrawer-root > .MuiPaper-root": {
                height: `calc(50% - ${drawerBleeding}px)`,
                overflow: "visible",
              }
            }}
         
          >
            <Box
            className=" !rounded-xl"
              sx={{ height: 597, bgcolor: "white" }}
              role="presentation"
              onClick={(e) => e.stopPropagation()}
            >
              {/* topbar  */}
              <div className="pt-4   sticky top-0 bg-white z-50 rounded-t-2xl ">
                <div className=" px-6 justify-between absolute flex items-center w-full gap-x-2 ">
                  <div className=" flex items-center gap-x-3">
                  <svg
                    onClick={() => setOpen(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <path
                      d="M21 7L7 21M7 7L21 21"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="text-[#191D23] text-ellipsis text-xl font-bold font-open_sans w-[225px]">
                    Filters
                  </div>
                  </div>
                  <div
                    className="text-[#125B54] font-open_sans text-sm font-semibold cursor-pointer whitespace-nowrap"
                    onClick={handleReset}
                  >
                    Clear All
                  </div>
                </div>
                <div className="border-b-2 border-[#F2F4F7] mt-11"></div>
              </div>
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: "background.paper",
                  display: "flex",
                  position: "fixed",
                  alignItems: "start !important",
                  justifyContent: "start !important",
                  // width: "144px !important",
                  height: "100%", // Set a fixed height to make sure scrolling works
                  width:"100%",
                  zIndex:60,
                }}
              >
                <Tabs
                  centered={false}
                  orientation="vertical"
                  className="mobile-filter-tab"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{
                    borderRight: 1,
                    // width: "62% !important",
                    // borderColor: "divider",
                    alignItems: "start !important",
                    justifyContent: "start",
                    bgcolor: "#FAFAFA",
                    width: 149,
                    borderRightColor: "#fff",
                    height: "100% !important",
                    // padding: "14px 8px 14px 16px",
                    color: "#5F6368", // Match text color for tabs
                  }}
                >
                  <Tab
                    sx={{
                      display: "flex",
                      alignItems: "start !important",
                      color: "#5F6368",
                      gap: "12px",
                      minHeight: "0px",
                      width: "100%",
                    }}
                    label={
                      <Box className="items-start !important font-open_sans capitalize flex">
                        Upside Left
                        {!(
                          upsideLeft[0] === min_upside_left &&
                          upsideLeft[1] === max_upside_left
                        ) && (
                          <>
                            <div className=" bg-[#135B54] text-white px-1 text-xs font-bold rounded-full w-6  h-6 justify-center items-center flex ml-1 font-open_sans">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 12 12"
                                fill="none"
                              >
                                <path
                                  d="M2.0625 6.5625L4.6875 9.1875L9.9375 3.5625"
                                  stroke="white"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                          </>
                        )}
                      </Box>
                    }
                    {...a11yProps(0)}
                  />

                  <Tab
                    sx={{
                      display: "flex",
                      alignItems: "start !important",
                      color: "#5F6368",
                      gap: "12px",
                      fontFamily: "Open Sans, sans-serif !important",
                      textTransform: "capitalize",
                      minHeight: "0px",
                      width: "100%",
                    }}
                    label={
                      <>
                        <Box className="items-start !important font-open_sans capitalize flex">
                          Recency
                          {!!Object.keys(recency).filter((key) => recency[key])
                            .length && (
                            <div className=" bg-[#135B54] text-white px-2 text-xs font-bold rounded-full w-6  h-6 justify-center items-center flex ml-1 font-open_sans">
                              {
                                Object.keys(recency).filter(
                                  (key) => recency[key]
                                ).length
                              }
                            </div>
                          )}
                        </Box>
                      </>
                    }
                    {...a11yProps(1)}
                  />
                  <Tab
                    sx={{
                      display: "flex",
                      alignItems: "start !important",
                      color: "#5F6368",
                      gap: "12px",
                      fontFamily: "Open Sans, sans-serif !important",
                      textTransform: "capitalize",
                      minHeight: "0px",
                      width: "100%",
                    }}
                    label={
                      <>
                        <Box className="items-start !important font-open_sans capitalize flex">
                          Time Left
                          {!!Object.keys(timeLeft).filter(
                            (key) => timeLeft[key]
                          ).length && (
                            <div className=" bg-[#135B54] text-white px-2 text-xs font-bold rounded-full w-6  h-6 justify-center items-center flex ml-1 font-open_sans">
                              {
                                Object.keys(timeLeft).filter(
                                  (key) => timeLeft[key]
                                ).length
                              }
                            </div>
                          )}
                        </Box>
                      </>
                    }
                    {...a11yProps(2)}
                  />
                  <Tab
                    sx={{
                      display: "flex",
                      alignItems: "start !important",
                      color: "#5F6368",
                      gap: "12px",
                      lineClamp: "1",
                      fontFamily: "Open Sans, sans-serif !important",
                      textTransform: "capitalize",
                      minHeight: "0px",
                      width: "100%",
                    }}
                    // Total Returns
                    label={
                      <Box className="items-start !important font-open_sans capitalize flex">
                        Total Return
                        {!(
                          returns[0] === min_returns &&
                          returns[1] === max_returns
                        ) && (
                          <>
                            <div className=" bg-[#135B54] text-white px-1 text-xs font-bold rounded-full w-6  h-6 justify-center items-center flex ml-1 font-open_sans">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 12 12"
                                fill="none"
                              >
                                <path
                                  d="M2.0625 6.5625L4.6875 9.1875L9.9375 3.5625"
                                  stroke="white"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                          </>
                        )}
                      </Box>
                    }
                    {...a11yProps(3)}
                  />
                  {sebiBoardType == "mainboard" && (
                    <Tab
                      sx={{
                        display: "flex",
                        alignItems: "start !important",
                        color: "#5F6368",
                        gap: "12px",
                        fontFamily: "Open Sans, sans-serif !important",
                        textTransform: "capitalize",
                        minHeight: "0px",
                        width: "100%",
                      }}
                      label={
                        <Box className="items-start !important font-open_sans capitalize flex">
                          Market Cap
                          {!!marketCapType && (
                            <>
                              <div className=" bg-[#135B54] text-white px-1 text-xs font-bold rounded-full w-6  h-6 justify-center items-center flex ml-1 font-open_sans">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                >
                                  <path
                                    d="M2.0625 6.5625L4.6875 9.1875L9.9375 3.5625"
                                    stroke="white"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </div>
                            </>
                          )}
                        </Box>
                      }
                      {...a11yProps(4)}
                    />
                  )}
                  <Tab
                    sx={{
                      display: "flex",
                      alignItems: "start !important",
                      color: "#5F6368",
                      gap: "12px",
                      fontFamily: "Open Sans, sans-serif !important",
                      textTransform: "capitalize",
                      minHeight: "0px",
                      width: "100%",
                    }}
                    label={
                      <>
                        <Box className="items-start !important font-open_sans capitalize flex">
                          Sectors
                          {!!sector.length && (
                            <div className=" bg-[#135B54] text-white px-2 text-xs font-bold rounded-full w-6  h-6 justify-center items-center flex ml-1 font-open_sans">
                              {sector.length}
                            </div>
                          )}
                        </Box>
                      </>
                    }
                    {...a11yProps(5)}
                  />
                  <Tab
                    sx={{
                      display: "flex",
                      alignItems: "start !important",
                      color: "#5F6368",
                      gap: "12px",
                      fontFamily: "Open Sans, sans-serif !important",
                      textTransform: "capitalize",
                      minHeight: "0px",
                      width: "100%",
                    }}
                    label={
                      <>
                        <Box className="items-start !important font-open_sans capitalize flex">
                          Strategies
                          {!!changablestrategyTags.length && (
                            <div className=" bg-[#135B54] text-white px-2 text-xs font-bold rounded-full w-6  h-6 justify-center items-center flex ml-1 font-open_sans">
                              {changablestrategyTags.length}
                            </div>
                          )}
                        </Box>
                      </>
                    }
                    {...a11yProps(6)}
                  />
                  <Tab
                    sx={{
                      display: "flex",
                      alignItems: "start !important",
                      color: "#5F6368",
                      gap: "12px",
                      fontFamily: "Open Sans, sans-serif !important",
                      textTransform: "capitalize",
                      minHeight: "0px",
                      width: "100%",
                    }}
                    label={
                      <Box className="items-start !important font-open_sans capitalize flex">
                        Risk
                        {!!risk && (
                          <>
                            <div className=" bg-[#135B54] text-white px-1 text-xs font-bold rounded-full w-6  h-6 justify-center items-center flex ml-1 font-open_sans">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 12 12"
                                fill="none"
                              >
                                <path
                                  d="M2.0625 6.5625L4.6875 9.1875L9.9375 3.5625"
                                  stroke="white"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>
                          </>
                        )}
                      </Box>
                    }
                    {...a11yProps(7)}
                  />
                </Tabs>
                <Box
                  sx={{
                    flexGrow: 1,
                    bgcolor: "white",
                    width: "246px !important",
                  }}
                >
                  <TabPanel value={value} index={0} className="scrolllab z-[60] !overflow-visible">
                    {/* upside left  */}
                    <div className="">
                      <CustomSlider
                        value={tempUpsideLeft}
                        onChange={handleUpsideLeftSliderChange}
                        // valueLabelDisplay="auto"
                        min={min_upside_left}
                        max={max_upside_left}
                        valueLabelDisplay="auto"
                        aria-label="custom slider"
                        defaultValue={50}
                        marks={upside_left_marks}
                        step={null}
                        // min={0}
                        // max={100}
                      />

                      <Grid alignItems="center" overflowX="hidden">
                        <Grid item>
                          <TextField
                            className=" w-full"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={tempUpsideLeft ? tempUpsideLeft[0] : 0}
                            onChange={(e) =>
                              handleUpsideLeftInputChange(e, "min")
                            }
                            InputProps={{
                              className:"!border-[#F2F4F7] !rounded-lg !w-full",
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                  borderColor: "#125B54", // Color of the outline on hover
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#125B54", // Color of the outline when focused
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid className=" !my-2" item xs={2}>
                          <Typography
                            className=" !text-xs text-[#98A2B3]"
                            align="center"
                            fontFamily="Open Sans, sans-serif !important"
                          >
                            to
                          </Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            className="w-full"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={tempUpsideLeft ? tempUpsideLeft[1] : 0}
                            onChange={(e) =>
                              handleUpsideLeftInputChange(e, "max")
                            }
                            InputProps={{
                              className:"!border-[#F2F4F7] !rounded-lg !w-full",
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                  borderColor: "#125B54", // Color of the outline on hover
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#125B54", // Color of the outline when focused
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    {/* <CustomSlider/> */}
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    {/*  Recency */}
                    <div className="overflow-x-hidden">
                      <Accordion
                        defaultExpanded
                        sx={{
                          boxShadow: "none !important",
                          margin: "0px !important",
                        }}
                      >
                        <div className="pl-0">
                          <AccordionDetails sx={{ padding: "0px" }}>
                            <FormGroup>
                              <FormControlLabel
                                className="!flex !items-start pb-[11px] !m-0 !mb-1 !border-b !border-b-[#F2F4F7]"
                                control={
                                  <Checkbox
                                    checked={
                                      Object.keys(tempRecency).length ===
                                      Object.keys(tempRecency).filter(
                                        (key) => tempRecency[key]
                                      ).length
                                    }
                                    onClick={() => {
                                      if (
                                        Object.keys(tempRecency).length ===
                                        Object.keys(tempRecency).filter(
                                          (key) => tempRecency[key]
                                        ).length
                                      ) {
                                        const updatedRecency = Object.keys(
                                          tempRecency
                                        ).reduce((acc, key) => {
                                          acc[key] = false;
                                          return acc;
                                        }, {});
                                        setTempRecency(updatedRecency);
                                      } else {
                                        const updatedRecency = Object.keys(
                                          tempRecency
                                        ).reduce((acc, key) => {
                                          acc[key] = true;
                                          return acc;
                                        }, {});
                                        setTempRecency(updatedRecency);
                                      }
                                    }}
                                    sx={{
                                      padding: "1px 9px 0px 0px",

                                      color: "default", // Default color
                                      "&.Mui-checked": {
                                        color: "#125B54", // Color when checked
                                      },
                                      '& .MuiSvgIcon-root': { fontSize: 16 }
                                    }}
                                  />
                                }
                                label={
                                  <span
                                    className="flex items-start !text-sm"
                                    style={{
                                      fontFamily: "Open Sans, sans-serif",
                                    }}
                                  >
                                    {Object.keys(tempRecency).length ===
                                    Object.keys(tempRecency).filter(
                                      (key) => tempRecency[key]
                                    ).length
                                      ? "Deselect"
                                      : "Select"}{" "}
                                    All
                                  </span>
                                }
                              />
                              {Object.keys(tempRecency || {}).map((key) => (
                                <FormControlLabel
                                  className="!flex !items-start py-[11px] !m-0 !mb-1"
                                  key={key}
                                  control={
                                    <Checkbox
                                      checked={tempRecency[key]}
                                      onChange={handleChangeRecency}
                                      name={key}
                                      sx={{
                                        padding: "1px 9px 0px 0px",
                                        color: "default", // Default color
                                        "&.Mui-checked": {
                                          color: "#125B54", // Color when checked
                                        },
                                        '& .MuiSvgIcon-root': { fontSize: 16 }
                                      }}
                                    />
                                  }
                                  label={
                                    <span
                                      className="flex items-start text-sm"
                                      style={{
                                        fontFamily: "Open Sans, sans-serif",
                                      }}
                                    >
                                      {filterTimeLabel[key]}
                                    </span>
                                  }
                                />
                              ))}
                            </FormGroup>
                          </AccordionDetails>
                        </div>
                      </Accordion>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    {/* time  left  */}
                    <div className=" overflow-x-hidden">
                      <Accordion
                        defaultExpanded
                        sx={{
                          boxShadow: "none !important",
                          margin: "0px !important",
                        }}
                      >
                        <div className="pl-0">
                          <AccordionDetails sx={{ padding: "0px" }}>
                            <FormGroup>
                              <FormControlLabel
                                className="!flex !items-start !pb-[11px] !m-0 !mb-1 !border-b !border-b-[#F2F4F7]"
                                control={
                                  <Checkbox
                                    checked={
                                      Object.keys(tempTimeLeft).length ===
                                      Object.keys(tempTimeLeft).filter(
                                        (key) => tempTimeLeft[key]
                                      ).length
                                    }
                                    onClick={() => {
                                      if (
                                        Object.keys(tempTimeLeft).length ===
                                        Object.keys(tempTimeLeft).filter(
                                          (key) => tempTimeLeft[key]
                                        ).length
                                      ) {
                                        const updatedTempTimeLeft = Object.keys(
                                          tempTimeLeft
                                        ).reduce((acc, key) => {
                                          acc[key] = false;
                                          return acc;
                                        }, {});
                                        setTempTimeLeft(updatedTempTimeLeft);
                                      } else {
                                        const updatedTempTimeLeft = Object.keys(
                                          tempTimeLeft
                                        ).reduce((acc, key) => {
                                          acc[key] = true;
                                          return acc;
                                        }, {});
                                        setTempTimeLeft(updatedTempTimeLeft);
                                      }
                                    }}
                                    sx={{
                                      padding: "1px 9px 0px 0px",
                                      color: "default", // Default color
                                      "&.Mui-checked": {
                                        color: "#125B54", // Color when checked
                                      },
                                      '& .MuiSvgIcon-root': { fontSize: 16 }
                                    }}
                                  />
                                }
                                label={
                                  <span
                                    className="flex items-start !text-sm"
                                    style={{
                                      fontFamily: "Open Sans, sans-serif",
                                    }}
                                  >
                                    {Object.keys(tempTimeLeft).length ===
                                    Object.keys(tempTimeLeft).filter(
                                      (key) => tempTimeLeft[key]
                                    ).length
                                      ? "Deselect"
                                      : "Select"}{" "}
                                    All
                                  </span>
                                }
                              />

                              {Object.keys(tempTimeLeft || {}).map((key) => (
                                <FormControlLabel
                                  className="!flex !items-start !py-[11px] !m-0 !mb-1"
                                  key={key}
                                  control={
                                    <Checkbox
                                      className=" !border-green-400 "
                                      checked={tempTimeLeft[key]}
                                      onChange={handleChangeTimeLeft}
                                      name={key}
                                      sx={{
                                        padding: "1px 9px 0px 0px",
                                        color: "default", // Default color
                                        "&.Mui-checked": {
                                          color: "#125B54", // Color when checked
                                        },
                                        '& .MuiSvgIcon-root': { fontSize: 16 }
                                      }}
                                    />
                                  }
                                  label={
                                    <span
                                      className="flex !text-sm !items-start"
                                      style={{
                                        fontFamily: "Open Sans, sans-serif",
                                      }}
                                    >
                                      {filterTimeLabel[key]}
                                    </span>
                                  }
                                />
                              ))}
                            </FormGroup>
                          </AccordionDetails>
                        </div>
                      </Accordion>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={3} className="scrolllab z-[60] !overflow-visible">
                    {/* total return  */}
                    <div className="  ">
                      <CustomSlider
                        value={tempReturns}
                        onChange={handleReturnsSliderChange}
                        valueLabelDisplay="auto"
                        min={min_returns}
                        max={max_returns}
                        marks={returns_marks}
                        aria-label="custom slider"
                      />

                      <Grid alignItems="center">
                        <Grid item>
                          <TextField
                          className=" w-full"
                            variant="outlined"
                            size="small"
                            type="number"
                            name="min"
                            value={tempReturns ? tempReturns[0] : 0}
                            onChange={(e) => handleReturnsInputChange(e, "min")}
                            InputProps={{
                              className:"!border-[#F2F4F7] !rounded-lg !w-full",
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                  borderColor: "#125B54",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#125B54",
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <Typography className=" !my-2 text-xs text-[#98A2B3]" align="center" fontFamily="open sans">
                            to
                          </Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            className="w-full"
                            variant="outlined"
                            size="small"
                            type="number"
                            name="max"
                            value={tempReturns ? tempReturns[1] : 0}
                            onChange={(e) => handleReturnsInputChange(e, "max")}
                            InputProps={{
                              className:"!border-[#F2F4F7] !rounded-lg !w-full",
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                  borderColor: "#125B54",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#125B54",
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </TabPanel>
                  {sebiBoardType == "mainboard" && (
                    <TabPanel value={value} index={4}>
                      {/* market cap  */}
                      <div className=" overflow-x-hidden">
                        <Accordion
                          defaultExpanded
                          sx={{
                            boxShadow: "none !important",
                            margin: "0px !important",
                          }}
                        >
                          {/* <SizeSelector /> */}
                          <div className="sm:flex grid   gap-4 pb-4 ">
                            {marketCapTypeList?.map((value, index) => (
                              <div
                                className={`flex flex-col items-center cursor-pointer sm:w-2/5 w-full p-4 rounded-[7px] border hover:bg-[#F9FAFB]  ${
                                  tempMarketCapType.includes(value)
                                    ? "bg-[#E7F8F8] border-[#108973]"
                                    : "bg-white border-[#E4E7EC]"
                                }`}
                                key={index}
                                onClick={() => handleMarketCap(value)}
                              >
                                <img src={`/assets/${value}.svg`} alt={value} />

                                <span className="pt-2 text-2xs font-open_sans  text-[#344054] font-normal">
                                  {value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </Accordion>
                      </div>
                    </TabPanel>
                  )}
                  <TabPanel value={value} index={5}>
                    {/* Sectors  */}
                    <div className=" overflow-x-hidden p-0">
                      <Accordion
                        defaultExpanded
                        sx={{
                          boxShadow: "none !important",
                          marginBottom: "0px !important",
                          padding: "0px !important",
                        }}
                      >
                        <div className="pl-0">
                          <SectorFilter2
                            tempSector={tempSector}
                            setTempSector={setTempSector}
                            isMobile={isMobile}
                          />
                        </div>
                      </Accordion>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={6}>
                    {/* Strategies   */}
                    <div className="p-0 overflow-x-hidden">
                      <Accordion
                        defaultExpanded
                        sx={{
                          boxShadow: "none !important",
                          margin: "0px !important",
                          padding: "0px !important",
                        }}
                      >
                        <div className="">
                          <AccordionDetails sx={{ padding: "0px !important" }}>
                            <FormGroup sx={{ padding: "0px !important" }}>
                              <div
                                // className=" !scroll-m-0"
                                style={{
                                  maxHeight: "350px",
                                  overflowY: "auto",
                                }}
                              >
                                <FormControlLabel
                                  className="!flex !items-start !pb-[11px] !m-0 !mb-1 !border-b !border-b-[#F2F4F7]"
                                  control={
                                    <Checkbox
                                      checked={
                                        tempStrategyTag.length ===
                                        Object.keys(strategyTagList || {})
                                          .length
                                      }
                                      onClick={handleSelectAllStrategies}
                                      sx={{
                                        padding: "1px 9px 0px 0px",
                                        color: "default", // Default color
                                        "&.Mui-checked": {
                                          color: "#125B54", // Color when checked
                                        },
                                        '& .MuiSvgIcon-root': { fontSize: 16 }
                                      }}
                                    />
                                  }
                                  label={
                                    <span
                                      className="flex items-start text-sm "
                                      style={{
                                        fontFamily: "Open Sans, sans-serif",
                                      }}
                                    >
                                      {tempStrategyTag.length ===
                                      Object.keys(strategyTagList || {}).length
                                        ? "Deselect"
                                        : "Select"}{" "}
                                      All
                                    </span>
                                  }
                                />
                                {Object.keys(strategyTagList || {}).map(
                                  (key) => (
                                    <FormControlLabel
                                      className="!flex !items-start !py-[11px] !m-0 !mb-1"
                                      key={key}
                                      control={
                                        <Checkbox
                                          checked={tempStrategyTag.includes(
                                            key
                                          )}
                                          sx={{
                                            padding: "1px 9px 0px 0px",
                                            color: "default", // Default color
                                            "&.Mui-checked": {
                                              color: "#125B54", // Color when checked
                                            },
                                            '& .MuiSvgIcon-root': { fontSize: 16 }
                                          }}
                                          onChange={handleChangestrategyTag}
                                          name={key}
                                        />
                                      }
                                      label={
                                        <span
                                        className=" flex items-start !text-sm"
                                          style={{
                                            fontFamily: "Open Sans, sans-serif",
                                          }}
                                        >
                                          {strategyTagList[key]}
                                        </span>
                                      }
                                    />
                                  )
                                )}
                              </div>
                            </FormGroup>
                          </AccordionDetails>
                        </div>
                      </Accordion>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={7}>
                    {/*Risk */}
                    <div className=" overflow-x-hidden">
                      <Accordion
                        defaultExpanded
                        sx={{
                          boxShadow: "none !important",
                          margin: "0px !important",
                        }}
                      >
                        <div className="sm:flex grid gap-4 pb-4">
                          {stockRiskList?.map((value, index) => (
                            <div
                              className={`flex flex-col items-center cursor-pointer sm:w-2/5 w-full p-4 rounded-[7px] border hover:bg-[#F9FAFB]  ${
                                tempRisk == value
                                  ? "bg-[#E7F8F8] border-[#108973]"
                                  : "bg-white border-[#E4E7EC]"
                              }`}
                              key={index}
                              onClick={() => setTempRisk(value)}
                            >
                              <img src={`/assets/${value}.svg`} alt={value} />

                              <span className="pt-2 text-2xs font-open_sans text-[#344054] font-normal">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </Accordion>
                    </div>
                  </TabPanel>
                </Box>
              </Box>
              {/* button  */}
              <div className=" fixed bottom-0 w-full z-[60]">
                <div className="flex gap-x-3 py-3 px-3  border-t-2 border-[#F2F4F7]  bg-white  justify-between  ">
                  <button
                    className="  text-[#344054] font-semibold font-open_sans py-2 px-4 border border-[#D0D5DD]  rounded-lg w-full flex-1"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className=" font-semibold text-white font-open_sans py-2 px-4 bg-[#125B54] rounded-lg w-full flex-1 "
                    onClick={handleApply}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </Box>
          </Drawer>
        </>
      )}
    </>
  );
}

export default DrawerFilter;
