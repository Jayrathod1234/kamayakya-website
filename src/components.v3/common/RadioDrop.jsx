import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";
import {
  ArrowDropDown,
  ArrowUpward,
  ArrowDownward,
  AccessTime,
  AccessTimeFilled,
} from "@mui/icons-material";
export default function CustomSortMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState(
    "Upside Left : High to Low"
  );
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    handleClose();
  };
  return (
    <Box position="relative" display="inline-block">
      {/* Sort by label */}
      <Typography
        variant="subtitle1"
        style={{
          position: "absolute",
          top: -12,
          left: 18,
          zIndex: 1,
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
          color: "#1E555C",
          fontWeight: 500,
          padding: "11px 16px",
          minWidth: "280px",
          justifyContent: "space-between",
          display: "flex",
          // marginTop: "20px",
          border: "1px solid #B2DFDB",
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
        <span style={{ color: "#1E555C", fontWeight: 600 }}>
          {selectedValue}
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>
      {/* Dropdown Menu */}
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: "6px",
            width: "260px",
            marginTop: "8px",
            border: "1px solid #F2F4F7",
          },
        }}
      >
        <Box px={2} py={1}>
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ fontWeight: 500, color: "#98A2B3" }}
          >
            Upside Left
          </Typography>
          <RadioGroup
            name="Upside Left"
            value={selectedValue}
            onChange={handleChange}
          >
            <MenuItem>
              <FormControlLabel
                value="Upside Left : High to Low"
                control={<Radio color="success" />}
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
                        stroke="#344054"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18 4.16667L16.0909 2.5M16.0909 2.5L14 4.16667M16.0909 2.5L16.0909 6.5"
                        stroke="#344054"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.3334 8.74935V9.99935C18.3334 13.9277 18.3334 15.8918 17.1126 17.1118C15.8934 18.3327 13.9284 18.3327 10.0001 18.3327C6.07175 18.3327 4.10758 18.3327 2.88675 17.1118C1.66675 15.8927 1.66675 13.9277 1.66675 9.99935C1.66675 9.05935 1.66675 8.23102 1.68341 7.49935M11.2501 1.66602H10.0001C6.07175 1.66602 4.10758 1.66602 2.88675 2.88602C2.52008 3.25352 2.26258 3.68852 2.08341 4.22435"
                        stroke="#344054"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span
                      style={{
                        marginLeft: "8px",
                        color: "#344054",
                        fontWeight: 400,
                      }}
                    >
                      High to Low
                    </span>
                  </Box>
                }
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                value="Upside Left : Low to High"
                control={<Radio color="success" />}
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
                        stroke="#344054"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18 4.16667L16.0909 2.5M16.0909 2.5L14 4.16667M16.0909 2.5L16.0909 6.5"
                        stroke="#344054"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.3334 8.74935V9.99935C18.3334 13.9277 18.3334 15.8918 17.1126 17.1118C15.8934 18.3327 13.9284 18.3327 10.0001 18.3327C6.07175 18.3327 4.10758 18.3327 2.88675 17.1118C1.66675 15.8927 1.66675 13.9277 1.66675 9.99935C1.66675 9.05935 1.66675 8.23102 1.68341 7.49935M11.2501 1.66602H10.0001C6.07175 1.66602 4.10758 1.66602 2.88675 2.88602C2.52008 3.25352 2.26258 3.68852 2.08341 4.22435"
                        stroke="#344054"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span
                      style={{
                        marginLeft: "8px",
                        color: "#344054",
                        fontWeight: 400,
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
            style={{ fontWeight: 500, color: "#98A2B3" }}
          >
            Recency
          </Typography>
          <RadioGroup
            name="Recency"
            value={selectedValue}
            onChange={handleChange}
          >
            <MenuItem>
              <FormControlLabel
                value="Recency : Newest to Oldest"
                control={<Radio color="success" />}
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
                        stroke="#475467"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.5 14.5L15.875 17M15.875 17L13 14.5M15.875 17L15.875 11"
                        stroke="#475467"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span
                      style={{
                        marginLeft: "8px",
                        color: "#475467",
                        fontWeight: 400,
                      }}
                    >
                      Newest to Oldest
                    </span>
                  </Box>
                }
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                value="Recency : Oldest to Newest"
                control={<Radio color="success" />}
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
                        stroke="#475467"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.5 14.5L15.875 12M15.875 12L13 14.5M15.875 12L15.875 18"
                        stroke="#475467"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span
                      style={{
                        marginLeft: "8px",
                        color: "#475467",
                        fontWeight: 400,
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
            style={{ fontWeight: 500, color: "#98A2B3" }}
          >
            Time Left
          </Typography>
          <RadioGroup
            name="Time Left"
            value={selectedValue}
            onChange={handleChange}
          >
            <MenuItem>
              <FormControlLabel
                value="Time Left : Longest to Shortest"
                control={<Radio color="success" />}
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
                        stroke="#475467"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17 12.8333L15.0909 14.5M15.0909 14.5L13 12.8333M15.0909 14.5L15.0909 10.5"
                        stroke="#475467"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span style={{ marginLeft: "8px", color: "#1E555C" }}>
                      Longest to Shortest
                    </span>
                  </Box>
                }
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                value="Time Left : Shortest to Longest"
                control={<Radio color="success" />}
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
                        stroke="#475467"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17 12.8333L15.0909 14.5M15.0909 14.5L13 12.8333M15.0909 14.5L15.0909 10.5"
                        stroke="#475467"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span style={{ marginLeft: "8px", color: "#1E555C" }}>
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
            style={{ fontWeight: 500, color: "#98A2B3" }}
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
                value="Returns : High to Low"
                control={<Radio color="success" />}
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
                        stroke="#475467"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18 12.5L15.375 10M15.375 10L12.5 12.5M15.375 10L15.375 16"
                        stroke="#475467"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span style={{ marginLeft: "8px", color: "#1E555C" }}>
                      High to Low
                    </span>
                  </Box>
                }
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                value="Returns : Low to High"
                control={<Radio color="success" />}
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
                        stroke="#475467"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18 12.5L15.375 10M15.375 10L12.5 12.5M15.375 10L15.375 16"
                        stroke="#475467"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span style={{ marginLeft: "8px", color: "#1E555C" }}>
                      Low to High
                    </span>
                  </Box>
                }
              />
            </MenuItem>
          </RadioGroup>
        </Box>
      </Menu>
    </Box>
  );
}
