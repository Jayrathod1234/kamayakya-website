import React, { useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
  useMediaQuery,
  styled,
} from "@mui/material";
import { useAllBoardStock } from "@/contexts/AllBoardStockContext";
import { grey } from "@mui/material/colors";

export default function CustomSortMenu({ isLabel }) {
  const { setSortValue, setSortBy } = useAllBoardStock();
  let radioButtonValue = null;
  if (isLabel) {
    radioButtonValue = {
      upside_left_desc: "Upside Left : High to Low",
      upside_left_asc: "Upside Left : Low to High",
      recency_desc: "Recency : Newest to Oldest",
      recency_asc: "Recency : Oldest to Newest",
      time_left_desc: "Time Left : Longest to Shortest",
      time_left_asc: "Time Left : Shortest to Longest",
      returns_desc: "Returns : High to Low",
      returns_asc: "Returns : Low to High",
    };
  } else {
    radioButtonValue = {
      upside_left_desc: "Upside Left",
      upside_left_asc: "Upside Left",
      recency_desc: "Recency",
      recency_asc: "Recency",
      time_left_desc: "Time Left",
      time_left_asc: "Time Left",
      returns_desc: "Returns",
      returns_asc: "Returns",
    };
  }
  const isMobile = useMediaQuery("(max-width:600px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState("upside_left_desc");
  const handleClick = (event) => {
    // console.log(event.currentTarget);
    setAnchorEl(isMobile ? "bottom" : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    const [sortBy, sortValue] = value.split(/_(?=[^_]+$)/); // Split only at the last underscore
    setSortValue(sortValue);
    setSortBy(sortBy);

    handleClose();
  };
  useEffect(() => {
    document.addEventListener("scroll", handleClose);
  }, []);
  const Puller = styled("div")(({ theme }) => ({
    width: 45,
    height: 5,
    backgroundColor: grey[300],
    borderRadius: 3,
    position: "fixed",
    // top: 8,
    left: "calc(50% - 15px)",
    ...theme.applyStyles("dark", {
      backgroundColor: "gray",
    }),
  }));
  return (
    <Box position="relative" display="inline-block">
      {/* Sort by label */}
      {isLabel && !isMobile && (
        <Typography
          variant="subtitle1"
          style={{
            position: "absolute",
            top: -12,
            left: 18,
            zIndex: 1,
            fontFamily: "Open Sans",
            fontSize: "12px",
            color: "#667085",
            backgroundColor: "#FCFCFD",
            padding: "2px 4px",
            borderRadius: "17px",
            fontWeight: 500,
          }}
        >
          Sort by
        </Typography>
      )}

      {/* Sort button */}
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="outlined"
        onClick={handleClick}
        style={{
          backgroundColor: "#E3F6F5",
          borderRadius: "8px",
          textTransform: "none",
          height: "46px",
          color: "#0C111D",
          fontWeight: 500,
          padding: isMobile ? "10px 11px" : isLabel ? "10px 16px" : "8px 18px", // Conditional padding
          // padding: isLabel ? "11px 16px" : "11px 18px", // Conditional padding
          minWidth: isMobile ? "147px" : isLabel ? "280px" : "157px", // Conditional minWidth
          justifyContent: "space-between",
          display: "flex",
          // marginTop: "20px",
          border: "1px solid #B2DFDB",
          fontFamily: "Open Sans",
          letterSpacing: "0px !important",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
        >
          <path
            d="M3.7203 0.21975C3.86095 0.0791469 4.05168 0.000160217 4.25055 0.000160217C4.44942 0.000160217 4.64015 0.0791469 4.7808 0.21975L7.7808 3.21975C7.91742 3.3612 7.99301 3.55065 7.9913 3.7473C7.9896 3.94395 7.91072 4.13206 7.77166 4.27111C7.63261 4.41017 7.4445 4.48905 7.24785 4.49076C7.0512 4.49246 6.86175 4.41687 6.7203 4.28025L5.00055 2.5605V11.25C5.00055 11.4489 4.92153 11.6397 4.78088 11.7803C4.64023 11.921 4.44946 12 4.25055 12C4.05164 12 3.86087 11.921 3.72022 11.7803C3.57957 11.6397 3.50055 11.4489 3.50055 11.25V2.5605L1.7808 4.28025C1.63935 4.41687 1.4499 4.49246 1.25325 4.49076C1.0566 4.48905 0.868492 4.41017 0.729436 4.27111C0.59038 4.13206 0.511503 3.94395 0.509794 3.7473C0.508085 3.55065 0.583681 3.3612 0.720299 3.21975L3.7203 0.21975ZM11.0005 9.4395V0.75C11.0005 0.551088 11.0796 0.360322 11.2202 0.21967C11.3609 0.0790178 11.5516 0 11.7505 0C11.9495 0 12.1402 0.0790178 12.2809 0.21967C12.4215 0.360322 12.5005 0.551088 12.5005 0.75V9.4395L14.2203 7.71975C14.3617 7.58313 14.5512 7.50754 14.7478 7.50924C14.9445 7.51095 15.1326 7.58983 15.2717 7.72889C15.4107 7.86794 15.4896 8.05605 15.4913 8.2527C15.493 8.44935 15.4174 8.6388 15.2808 8.78025L12.2808 11.7803C12.1402 11.9209 11.9494 11.9998 11.7505 11.9998C11.5517 11.9998 11.3609 11.9209 11.2203 11.7803L8.2203 8.78025C8.08368 8.6388 8.00809 8.44935 8.00979 8.2527C8.0115 8.05605 8.09038 7.86794 8.22944 7.72889C8.36849 7.58983 8.5566 7.51095 8.75325 7.50924C8.9499 7.50754 9.13935 7.58313 9.2808 7.71975L11.0005 9.4395Z"
            fill="#0C111D"
          />
        </svg>
        <span className="tracking-normal text-[#0C111D] font-semibold text-[14px] "

        >
          {radioButtonValue[selectedValue]}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
        >
          <path
            d="M1.66699 1.66797L5.00087 4.7213L8.33366 1.66797"
            stroke="#0C111D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>

      {!isMobile ? (
        <>
          {/* Dropdown Menu */}
          <Menu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            disableScrollLock
            open={Boolean(anchorEl)}
            onClose={handleClose}
            // sx={{ display: isMobile ? "none" : "block" }}
            PaperProps={{
              style: {
                position: "absolute",
                // background: "red",
                borderRadius: "6px",
                width: "260px",
                top: 0,
                left: 0,
                overflow: "hidden",
                marginTop: "8px",
                border: "1px solid #F2F4F7",
                fontFamily: "Open Sans",
              },
            }}
          >
            <Box px={2} py={1}>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{
                  fontWeight: 500,
                  color: "#98A2B3",
                  fontSize: "14px",
                  fontFamily: "Open Sans",
                }}
              >
                Upside Left
              </Typography>
              <RadioGroup
                name="Upside Left"
                value={selectedValue}
                onChange={handleChange}
              >
                <MenuItem
                  sx={{
                    height: "36px",
                    marginBottom: "10px",
                  }}
                >
                  <FormControlLabel
                    value="upside_left_desc"
                    control={
                      <Radio
                        sx={{
                          color: "#E4E7EC",
                          "&.Mui-checked": {
                            color: "#108973",
                          },
                          position: "absolute",
                          left: "199px",
                          padding: "0px",
                        }}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center" sx={{}}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M5.83337 11.666L7.74421 9.75518C7.90048 9.59896 8.1124 9.51119 8.33337 9.51119C8.55434 9.51119 8.76627 9.59896 8.92254 9.75518L10.2442 11.0768C10.4005 11.2331 10.6124 11.3208 10.8334 11.3208C11.0543 11.3208 11.2663 11.2331 11.4225 11.0768L14.1667 8.33268M14.1667 8.33268V10.416M14.1667 8.33268H12.0834"
                            stroke={
                              selectedValue === "upside_left_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18 4.16667L16.0909 2.5M16.0909 2.5L14 4.16667M16.0909 2.5L16.0909 6.5"
                            stroke={
                              selectedValue === "upside_left_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.3334 8.74935V9.99935C18.3334 13.9277 18.3334 15.8918 17.1126 17.1118C15.8934 18.3327 13.9284 18.3327 10.0001 18.3327C6.07175 18.3327 4.10758 18.3327 2.88675 17.1118C1.66675 15.8927 1.66675 13.9277 1.66675 9.99935C1.66675 9.05935 1.66675 8.23102 1.68341 7.49935M11.2501 1.66602H10.0001C6.07175 1.66602 4.10758 1.66602 2.88675 2.88602C2.52008 3.25352 2.26258 3.68852 2.08341 4.22435"
                            stroke={
                              selectedValue === "upside_left_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          className={`ml-2 ${selectedValue === "upside_left_desc" ? "text-[#108973]" : "text-[#344054] "} !font-normal text-sm/5 font-open_sans`}
                        >
                          High to Low
                        </span>
                      </Box>
                    }
                  />
                </MenuItem>
                <MenuItem
                  sx={{
                    marginBottom: "10px",
                  }}
                >
                  <FormControlLabel
                    value="upside_left_asc"
                    control={
                      <Radio
                        sx={{
                          color: "#E4E7EC",
                          "&.Mui-checked": {
                            color: "#108973",
                          },
                          position: "absolute",
                          left: "199px",
                          padding: "0px",
                        }}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M5.83337 11.666L7.74421 9.75518C7.90048 9.59896 8.1124 9.51119 8.33337 9.51119C8.55434 9.51119 8.76627 9.59896 8.92254 9.75518L10.2442 11.0768C10.4005 11.2331 10.6124 11.3208 10.8334 11.3208C11.0543 11.3208 11.2663 11.2331 11.4225 11.0768L14.1667 8.33268M14.1667 8.33268V10.416M14.1667 8.33268H12.0834"
                            stroke={
                              selectedValue === "upside_left_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18 4.16667L16.0909 2.5M16.0909 2.5L14 4.16667M16.0909 2.5L16.0909 6.5"
                            stroke={
                              selectedValue === "upside_left_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.3334 8.74935V9.99935C18.3334 13.9277 18.3334 15.8918 17.1126 17.1118C15.8934 18.3327 13.9284 18.3327 10.0001 18.3327C6.07175 18.3327 4.10758 18.3327 2.88675 17.1118C1.66675 15.8927 1.66675 13.9277 1.66675 9.99935C1.66675 9.05935 1.66675 8.23102 1.68341 7.49935M11.2501 1.66602H10.0001C6.07175 1.66602 4.10758 1.66602 2.88675 2.88602C2.52008 3.25352 2.26258 3.68852 2.08341 4.22435"
                            stroke={
                              selectedValue === "upside_left_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          style={{
                            marginLeft: "8px",
                            color:
                              selectedValue === "upside_left_asc"
                                ? "#108973"
                                : "#344054",
                            fontWeight: 400,
                            fontSize: "14px",
                            fontFamily: "Open Sans",
                          }}
                        >
                          Low to High
                        </span>
                      </Box>
                    }
                  />
                </MenuItem>
              </RadioGroup>
            </Box>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="260"
              height="2"
              viewBox="0 0 260 2"
              fill="none"
            >
              <path d="M0 1H260" stroke="#EDF0F5" />
            </svg>

            <Box px={2} py={1}>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{
                  fontWeight: 500,
                  color: "#98A2B3",
                  fontSize: "14px",
                  fontFamily: "Open Sans",
                }}
              >
                Recency
              </Typography>
              <RadioGroup
                name="Recency"
                value={selectedValue}
                onChange={handleChange}
              >
                <MenuItem
                  sx={{
                    marginBottom: "10px",
                  }}
                >
                  <FormControlLabel
                    value="recency_desc"
                    control={
                      <Radio
                        sx={{
                          color: "#E4E7EC",
                          "&.Mui-checked": {
                            color: "#108973",
                          },
                          position: "absolute",
                          left: "199px",
                          padding: "0px",
                        }}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M13.3125 11.375L10.5 10.4375V6.51739M18 9.5C18 5.35786 14.6421 2 10.5 2C6.35786 2 3 5.35786 3 9.5C3 13.6421 6.35786 17 10.5 17C10.9807 17 11.4507 16.9548 11.9063 16.8684"
                            stroke={
                              selectedValue === "recency_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.5 14.5L15.875 17M15.875 17L13 14.5M15.875 17L15.875 11"
                            stroke={
                              selectedValue === "recency_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          style={{
                            marginLeft: "8px",
                            color:
                              selectedValue === "recency_desc"
                                ? "#108973"
                                : "#344054",
                            fontWeight: 400,
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                          }}
                        >
                          Newest to Oldest
                        </span>
                      </Box>
                    }
                  />
                </MenuItem>
                <MenuItem
                  sx={{
                    marginBottom: "10px",
                  }}
                >
                  <FormControlLabel
                    value="recency_asc"
                    control={
                      <Radio
                        sx={{
                          color: "#E4E7EC",
                          "&.Mui-checked": {
                            color: "#108973",
                          },
                          position: "absolute",
                          left: "199px",
                          padding: "0px",
                        }}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M13.3125 11.375L10.5 10.4375V6.51739M18 9.5C18 5.35786 14.6421 2 10.5 2C6.35786 2 3 5.35786 3 9.5C3 13.6421 6.35786 17 10.5 17C10.9807 17 11.4507 16.9548 11.9063 16.8684"
                            stroke={
                              selectedValue === "recency_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.5 14.5L15.875 12M15.875 12L13 14.5M15.875 12L15.875 18"
                            stroke={
                              selectedValue === "recency_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          style={{
                            marginLeft: "8px",
                            color:
                              selectedValue === "recency_asc"
                                ? "#108973"
                                : "#344054",
                            fontWeight: 400,
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                          }}
                        >
                          Oldest to Newest
                        </span>
                      </Box>
                    }
                  />
                </MenuItem>
              </RadioGroup>
            </Box>
            <Box px={2} py={1} borderTop="1px solid #E0E0E0">
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{
                  fontWeight: 500,
                  color: "#98A2B3",
                  fontSize: "14px",
                  fontFamily: "Open Sans",
                }}
              >
                Time Left
              </Typography>
              <RadioGroup
                name="Time Left"
                value={selectedValue}
                onChange={handleChange}
              >
                <MenuItem
                  sx={{
                    marginBottom: "10px",
                  }}
                >
                  <FormControlLabel
                    value="time_left_desc"
                    control={
                      <Radio
                        sx={{
                          color: "#E4E7EC",
                          "&.Mui-checked": {
                            color: "#108973",
                          },
                          position: "absolute",
                          left: "199px",
                          padding: "0px",
                        }}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M14.9956 16.6429C14.9956 17.1162 14.6146 17.5 14.1445 17.5H6.05944C5.58941 17.5 5.20837 17.1162 5.20837 16.6429V14.3531C5.20837 14.1701 5.26651 13.992 5.37428 13.8447L7.8151 10.5085C8.03632 10.2061 8.03632 9.79391 7.8151 9.49154L5.37428 6.15534C5.26651 6.00804 5.20837 5.82986 5.20837 5.64689V3.35714C5.20837 2.88376 5.58941 2.5 6.05944 2.5H14.3573C14.8273 2.5 15.2084 2.88376 15.2084 3.35714V5.64689C15.2084 5.82986 15.1502 6.00804 15.0425 6.15534L12.5882 9.50993C12.3735 9.8034 12.3666 10.2015 12.571 10.5024M8.1871 5.07143H12.2297"
                            stroke={
                              selectedValue === "time_left_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 12.8333L15.0909 14.5M15.0909 14.5L13 12.8333M15.0909 14.5L15.0909 10.5"
                            stroke={
                              selectedValue === "time_left_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          style={{
                            marginLeft: "8px",
                            color:
                              selectedValue === "time_left_desc"
                                ? "#108973"
                                : "#344054",
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                          }}
                        >
                          Longest to Shortest
                        </span>
                      </Box>
                    }
                  />
                </MenuItem>
                <MenuItem
                  sx={{
                    marginBottom: "10px",
                  }}
                >
                  <FormControlLabel
                    value="time_left_asc"
                    control={
                      <Radio
                        sx={{
                          color: "#E4E7EC",
                          "&.Mui-checked": {
                            color: "#108973",
                          },
                          position: "absolute",
                          left: "199px",
                          padding: "0px",
                        }}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M14.9956 16.6429C14.9956 17.1162 14.6146 17.5 14.1445 17.5H6.05944C5.58941 17.5 5.20837 17.1162 5.20837 16.6429V14.3531C5.20837 14.1701 5.26651 13.992 5.37428 13.8447L7.8151 10.5085C8.03632 10.2061 8.03632 9.79391 7.8151 9.49154L5.37428 6.15534C5.26651 6.00804 5.20837 5.82986 5.20837 5.64689V3.35714C5.20837 2.88376 5.58941 2.5 6.05944 2.5H14.3573C14.8273 2.5 15.2084 2.88376 15.2084 3.35714V5.64689C15.2084 5.82986 15.1502 6.00804 15.0425 6.15534L12.5882 9.50993C12.3735 9.8034 12.3666 10.2015 12.571 10.5024M8.1871 5.07143H12.2297"
                            stroke={
                              selectedValue === "time_left_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 12.8333L15.0909 14.5M15.0909 14.5L13 12.8333M15.0909 14.5L15.0909 10.5"
                            stroke={
                              selectedValue === "time_left_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          style={{
                            marginLeft: "8px",
                            color:
                              selectedValue === "time_left_asc"
                                ? "#108973"
                                : "#344054",
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                          }}
                        >
                          Shortest to Longest
                        </span>
                      </Box>
                    }
                  />
                </MenuItem>
              </RadioGroup>
            </Box>
            <Box px={2} py={1} borderTop="1px solid #E0E0E0">
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{
                  fontWeight: 500,
                  color: "#98A2B3",
                  fontSize: "14px",
                  fontFamily: "Open Sans",
                }}
              >
                Returns
              </Typography>
              <RadioGroup
                name="Returns"
                value={selectedValue}
                onChange={handleChange}
              >
                <MenuItem>
                  <FormControlLabel
                    value="returns_desc"
                    control={
                      <Radio
                        sx={{
                          color: "#E4E7EC",
                          "&.Mui-checked": {
                            color: "#108973",
                          },
                          position: "absolute",
                          left: "199px",
                          padding: "0px",
                        }}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M12 5H3H5.45455C6.32253 5 7.15496 5.33112 7.76871 5.92052C8.38247 6.50992 8.72727 7.30932 8.72727 8.14286C8.72727 8.97639 8.38247 9.77579 7.76871 10.3652C7.15496 10.9546 6.32253 11.2857 5.45455 11.2857H3L7.90909 16M3 8.14286H12"
                            stroke={
                              selectedValue === "returns_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18 12.5L15.375 10M15.375 10L12.5 12.5M15.375 10L15.375 16"
                            stroke={
                              selectedValue === "returns_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          style={{
                            marginLeft: "8px",
                            color:
                              selectedValue === "returns_desc"
                                ? "#108973"
                                : "#344054",
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                          }}
                        >
                          High to Low
                        </span>
                      </Box>
                    }
                  />
                </MenuItem>
                <MenuItem
                  sx={{
                    marginBottom: "10px",
                  }}
                >
                  <FormControlLabel
                    value="returns_asc"
                    control={
                      <Radio
                        sx={{
                          color: "#E4E7EC",
                          "&.Mui-checked": {
                            color: "#108973",
                          },
                          position: "absolute",
                          left: "199px",
                          padding: "0px",
                        }}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M12 5H3H5.45455C6.32253 5 7.15496 5.33112 7.76871 5.92052C8.38247 6.50992 8.72727 7.30932 8.72727 8.14286C8.72727 8.97639 8.38247 9.77579 7.76871 10.3652C7.15496 10.9546 6.32253 11.2857 5.45455 11.2857H3L7.90909 16M3 8.14286H12"
                            stroke={
                              selectedValue === "returns_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18 12.5L15.375 10M15.375 10L12.5 12.5M15.375 10L15.375 16"
                            stroke={
                              selectedValue === "returns_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          style={{
                            marginLeft: "8px",
                            color:
                              selectedValue === "returns_asc"
                                ? "#108973"
                                : "#344054",
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                          }}
                        >
                          Low to High
                        </span>
                      </Box>
                    }
                  />
                </MenuItem>
              </RadioGroup>
            </Box>
          </Menu>
        </>
      ) : (
        <>
          {/* Dropdown Menu */}
          <Menu
            id="customized-menu"
            className="set-radio-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              style: {
                borderRadius:  "12px 12px 0px 0px",
                width: isMobile ? "100%" : "260px",
                maxWidth: "100%",
                overflowY: "auto",
                marginTop: "8px",
                border: "1px solid #F2F4F7",
              },
            }}
            BackdropProps={{
              sx: {
                backdropFilter: "blur(2px) !important",
                backgroundColor: "rgba(0, 0, 0, 0.2)", // Adjust as needed
              },
            }}
          >
            <Puller sx={{ bgcolor: "#B1B1B1", }} />
            <Box px={2} py={1} sx={{ paddingTop: "16px",paddingInline:"18px" }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{
                  fontWeight: 500,
                  color: "#98A2B3",
                  fontFamily: "Open Sans",
                  fontSize: "12px",
                }}
              >
                Upside Left
              </Typography>
              <RadioGroup
              
                name="Upside Left"
                value={selectedValue}
                onChange={handleChange}
              >
                <MenuItem style={{display:'flex',justifyContent:'space-between',width:"100%",padding:0}}>
                  <FormControlLabel
                  style={{order:1,width:"100%",marginRight:0,marginLeft:0}}
                    value="upside_left_desc"
                    control={
                      <Radio
                        sx={{
                          paddingInline:0,
                          color: "#E4E7EC",
                          "&.Mui-checked": {
                            color: "#108973",
                          },
                          // position: "absolute",
                          // left: "291px",
                          display:'block',
                          marginLeft:'auto',
                          order:2
                        }}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M5.83337 11.666L7.74421 9.75518C7.90048 9.59896 8.1124 9.51119 8.33337 9.51119C8.55434 9.51119 8.76627 9.59896 8.92254 9.75518L10.2442 11.0768C10.4005 11.2331 10.6124 11.3208 10.8334 11.3208C11.0543 11.3208 11.2663 11.2331 11.4225 11.0768L14.1667 8.33268M14.1667 8.33268V10.416M14.1667 8.33268H12.0834"
                            stroke={
                              selectedValue === "upside_left_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18 4.16667L16.0909 2.5M16.0909 2.5L14 4.16667M16.0909 2.5L16.0909 6.5"
                            stroke={
                              selectedValue === "upside_left_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.3334 8.74935V9.99935C18.3334 13.9277 18.3334 15.8918 17.1126 17.1118C15.8934 18.3327 13.9284 18.3327 10.0001 18.3327C6.07175 18.3327 4.10758 18.3327 2.88675 17.1118C1.66675 15.8927 1.66675 13.9277 1.66675 9.99935C1.66675 9.05935 1.66675 8.23102 1.68341 7.49935M11.2501 1.66602H10.0001C6.07175 1.66602 4.10758 1.66602 2.88675 2.88602C2.52008 3.25352 2.26258 3.68852 2.08341 4.22435"
                            stroke={
                              selectedValue === "upside_left_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          style={{
                            marginLeft: "8px",
                            color:
                              selectedValue === "upside_left_desc"
                                ? "#108973"
                                : "#17172E",
                            fontWeight: 400,
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                          }}
                        >
                          High to Low
                        </span>
                      </Box>
                    }
                  />
                </MenuItem>
                <MenuItem style={{display:'flex',justifyContent:'space-between',width:"100%",padding:0}}>
                  <FormControlLabel
                  style={{order:1,width:"100%",marginRight:0,marginLeft:0}}
                    value="upside_left_asc"
                    control={
                      <Radio
                        sx={{
                          paddingInline:0,
                          color: "#E4E7EC",
                          "&.Mui-checked": {
                            color: "#108973",
                          },
                          // position: "absolute",
                          // left: "291px",
                          // top: "9%",
                          display:'block',
                          marginLeft:'auto',
                          order:2,
                        }}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M5.83337 11.666L7.74421 9.75518C7.90048 9.59896 8.1124 9.51119 8.33337 9.51119C8.55434 9.51119 8.76627 9.59896 8.92254 9.75518L10.2442 11.0768C10.4005 11.2331 10.6124 11.3208 10.8334 11.3208C11.0543 11.3208 11.2663 11.2331 11.4225 11.0768L14.1667 8.33268M14.1667 8.33268V10.416M14.1667 8.33268H12.0834"
                            stroke={
                              selectedValue === "upside_left_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18 4.16667L16.0909 2.5M16.0909 2.5L14 4.16667M16.0909 2.5L16.0909 6.5"
                            stroke={
                              selectedValue === "upside_left_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.3334 8.74935V9.99935C18.3334 13.9277 18.3334 15.8918 17.1126 17.1118C15.8934 18.3327 13.9284 18.3327 10.0001 18.3327C6.07175 18.3327 4.10758 18.3327 2.88675 17.1118C1.66675 15.8927 1.66675 13.9277 1.66675 9.99935C1.66675 9.05935 1.66675 8.23102 1.68341 7.49935M11.2501 1.66602H10.0001C6.07175 1.66602 4.10758 1.66602 2.88675 2.88602C2.52008 3.25352 2.26258 3.68852 2.08341 4.22435"
                            stroke={
                              selectedValue === "upside_left_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          style={{
                            marginLeft: "8px",
                            color:
                              selectedValue === "upside_left_asc"
                                ? "#108973"
                                : "#17172E",
                            fontWeight: 400,
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                          }}
                        >
                          Low to High
                        </span>
                      </Box>
                    }
                  />
                </MenuItem>
              </RadioGroup>
            </Box>

            <Box px={2} py={1}>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{
                  fontWeight: 500,
                  color: "#98A2B3",
                  fontFamily: "Open Sans",
                  fontSize: "12px",
                }}
              >
                Recency
              </Typography>
              <RadioGroup
                name="Recency"
                value={selectedValue}
                onChange={handleChange}
              >
                 <MenuItem style={{display:'flex',justifyContent:'space-between',width:"100%",padding:0}}>
                  <FormControlLabel
                  style={{order:1,width:"100%",marginRight:0,marginLeft:0}}
                    value="recency_desc"
                    control={
                      <Radio
                        sx={{
                          paddingInline:0,
                          color: "#E4E7EC",
                          "&.Mui-checked": {
                            color: "#108973",
                          },
                          order:2,
                          display:'block',
                          marginLeft:'auto',
                        }}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M13.3125 11.375L10.5 10.4375V6.51739M18 9.5C18 5.35786 14.6421 2 10.5 2C6.35786 2 3 5.35786 3 9.5C3 13.6421 6.35786 17 10.5 17C10.9807 17 11.4507 16.9548 11.9063 16.8684"
                            stroke={
                              selectedValue === "recency_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.5 14.5L15.875 17M15.875 17L13 14.5M15.875 17L15.875 11"
                            stroke={
                              selectedValue === "recency_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          style={{
                            marginLeft: "8px",
                            color:
                              selectedValue === "recency_desc"
                                ? "#108973"
                                : "#17172E",
                            fontWeight: 400,
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                          }}
                        >
                          Newest to Oldest
                        </span>
                      </Box>
                    }
                  />
                </MenuItem>
                <MenuItem style={{display:'flex',justifyContent:'space-between',width:"100%",padding:0}}>
                  <FormControlLabel
                  style={{order:1,width:"100%",marginRight:0,marginLeft:0}}
                    value="recency_asc"
                    control={
                      <Radio
                        sx={{
                          paddingInline:0,
                          color: "#E4E7EC",
                          "&.Mui-checked": {
                            color: "#108973",
                          },
                          display:'block',
                          marginLeft:'auto',
                          order:2
                        }}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M13.3125 11.375L10.5 10.4375V6.51739M18 9.5C18 5.35786 14.6421 2 10.5 2C6.35786 2 3 5.35786 3 9.5C3 13.6421 6.35786 17 10.5 17C10.9807 17 11.4507 16.9548 11.9063 16.8684"
                            stroke={
                              selectedValue === "recency_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.5 14.5L15.875 12M15.875 12L13 14.5M15.875 12L15.875 18"
                            stroke={
                              selectedValue === "recency_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          style={{
                            marginLeft: "8px",
                            color:
                              selectedValue === "recency_asc"
                                ? "#108973"
                                : "#17172E",
                            fontWeight: 400,
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                          }}
                        >
                          Oldest to Newest
                        </span>
                      </Box>
                    }
                  />
                </MenuItem>
              </RadioGroup>
            </Box>
            <Box px={2} py={1}>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{
                  fontWeight: 500,
                  color: "#98A2B3",
                  fontFamily: "Open Sans",
                  fontSize: "12px",
                }}
              >
                Time Left
              </Typography>
              <RadioGroup
                name="Time Left"
                value={selectedValue}
                onChange={handleChange}
              >
                 <MenuItem style={{display:'flex',justifyContent:'space-between',width:"100%",padding:0}}>
                  <FormControlLabel
                  style={{order:1,width:"100%",marginRight:0,marginLeft:0}}
                    value="time_left_desc"
                    control={
                      <Radio
                        sx={{
                          paddingInline:0,
                          color: "#E4E7EC",
                          "&.Mui-checked": {
                            color: "#108973",
                          },
                          display:'block',
                          order:2,
                          marginLeft:'auto'
                        }}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M14.9956 16.6429C14.9956 17.1162 14.6146 17.5 14.1445 17.5H6.05944C5.58941 17.5 5.20837 17.1162 5.20837 16.6429V14.3531C5.20837 14.1701 5.26651 13.992 5.37428 13.8447L7.8151 10.5085C8.03632 10.2061 8.03632 9.79391 7.8151 9.49154L5.37428 6.15534C5.26651 6.00804 5.20837 5.82986 5.20837 5.64689V3.35714C5.20837 2.88376 5.58941 2.5 6.05944 2.5H14.3573C14.8273 2.5 15.2084 2.88376 15.2084 3.35714V5.64689C15.2084 5.82986 15.1502 6.00804 15.0425 6.15534L12.5882 9.50993C12.3735 9.8034 12.3666 10.2015 12.571 10.5024M8.1871 5.07143H12.2297"
                            stroke={
                              selectedValue === "time_left_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 12.8333L15.0909 14.5M15.0909 14.5L13 12.8333M15.0909 14.5L15.0909 10.5"
                            stroke={
                              selectedValue === "time_left_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          style={{
                            marginLeft: "8px",
                            color:
                              selectedValue === "time_left_desc"
                                ? "#108973"
                                : "#17172E",
                            fontWeight: 400,
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                          }}
                        >
                          Longest to Shortest
                        </span>
                      </Box>
                    }
                  />
                </MenuItem>
                <MenuItem style={{display:'flex',justifyContent:'space-between',width:"100%",padding:0}}>
                  <FormControlLabel
                  style={{order:1,width:"100%",marginRight:0,marginLeft:0}}
                    value="time_left_asc"
                    control={
                      <Radio
                        sx={{
                          paddingInline:0,
                          color: "#E4E7EC",
                          "&.Mui-checked": {
                            color: "#108973",
                          },
                          display:'block',
                          order:2,
                          marginLeft:'auto'
                        }}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M14.9956 16.6429C14.9956 17.1162 14.6146 17.5 14.1445 17.5H6.05944C5.58941 17.5 5.20837 17.1162 5.20837 16.6429V14.3531C5.20837 14.1701 5.26651 13.992 5.37428 13.8447L7.8151 10.5085C8.03632 10.2061 8.03632 9.79391 7.8151 9.49154L5.37428 6.15534C5.26651 6.00804 5.20837 5.82986 5.20837 5.64689V3.35714C5.20837 2.88376 5.58941 2.5 6.05944 2.5H14.3573C14.8273 2.5 15.2084 2.88376 15.2084 3.35714V5.64689C15.2084 5.82986 15.1502 6.00804 15.0425 6.15534L12.5882 9.50993C12.3735 9.8034 12.3666 10.2015 12.571 10.5024M8.1871 5.07143H12.2297"
                            stroke={
                              selectedValue === "time_left_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 12.8333L15.0909 14.5M15.0909 14.5L13 12.8333M15.0909 14.5L15.0909 10.5"
                            stroke={
                              selectedValue === "time_left_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          style={{
                            marginLeft: "8px",
                            color:
                              selectedValue === "time_left_asc"
                                ? "#108973"
                                : "#17172E",
                            fontWeight: 400,
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                          }}
                        >
                          Shortest to Longest
                        </span>
                      </Box>
                    }
                  />
                </MenuItem>
              </RadioGroup>
            </Box>
            <Box px={2} py={1}>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{
                  fontWeight: 500,
                  color: "#98A2B3",
                  fontFamily: "Open Sans",
                  fontSize: "12px",
                }}
              >
                Returns
              </Typography>
              <RadioGroup
                name="Returns"
                value={selectedValue}
                onChange={handleChange}
              >
                 <MenuItem style={{display:'flex',justifyContent:'space-between',width:"100%",padding:0}}>
                  <FormControlLabel
                  style={{order:1,width:"100%",marginRight:0,marginLeft:0}}
                    value="returns_desc"
                    control={
                      <Radio
                        sx={{
                          paddingInline:0,
                          color: "#E4E7EC",
                          "&.Mui-checked": {
                            color: "#108973",
                          },
                          order:2,
                          display:"block",
                          marginLeft:'auto'
                        }}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M12 5H3H5.45455C6.32253 5 7.15496 5.33112 7.76871 5.92052C8.38247 6.50992 8.72727 7.30932 8.72727 8.14286C8.72727 8.97639 8.38247 9.77579 7.76871 10.3652C7.15496 10.9546 6.32253 11.2857 5.45455 11.2857H3L7.90909 16M3 8.14286H12"
                            stroke={
                              selectedValue === "returns_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18 12.5L15.375 10M15.375 10L12.5 12.5M15.375 10L15.375 16"
                            stroke={
                              selectedValue === "returns_desc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          style={{
                            marginLeft: "8px",
                            color:
                              selectedValue === "returns_desc"
                                ? "#108973"
                                : "#17172E",
                            fontWeight: 400,
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                          }}
                        >
                          High to Low
                        </span>
                      </Box>
                    }
                  />
                </MenuItem>
                <MenuItem style={{display:'flex',justifyContent:'space-between',width:"100%",padding:0}}>
                  <FormControlLabel
                  style={{order:1,width:"100%",marginRight:0,marginLeft:0}}
                    value="returns_asc"
                    control={
                      <Radio
                        sx={{
                          paddingInline:0,
                          color: "#E4E7EC",
                          "&.Mui-checked": {
                            color: "#108973",
                          },
                          display:"block",
                          marginLeft:'auto',
                          order:2
                        }}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M12 5H3H5.45455C6.32253 5 7.15496 5.33112 7.76871 5.92052C8.38247 6.50992 8.72727 7.30932 8.72727 8.14286C8.72727 8.97639 8.38247 9.77579 7.76871 10.3652C7.15496 10.9546 6.32253 11.2857 5.45455 11.2857H3L7.90909 16M3 8.14286H12"
                            stroke={
                              selectedValue === "returns_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18 12.5L15.375 10M15.375 10L12.5 12.5M15.375 10L15.375 16"
                            stroke={
                              selectedValue === "returns_asc"
                                ? "#108973"
                                : "#344054"
                            }
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          style={{
                            marginLeft: "8px",
                            color:
                              selectedValue === "returns_asc"
                                ? "#108973"
                                : "#17172E",
                            fontWeight: 400,
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                          }}
                        >
                          Low to High
                        </span>
                      </Box>
                    }
                  />
                </MenuItem>
              </RadioGroup>
            </Box>
          </Menu>
        </>
      )}
    </Box>
  );
}
