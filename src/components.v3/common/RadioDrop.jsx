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
          top: 4,
          left: 18,
          zIndex: 1,
          fontSize: "12px",
          color: "#1E555C",
          backgroundColor: "#ffff",
          padding: "2px 4px",
          borderRadius: "4px 4px 0 0",
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
          padding: "8px 16px",
          minWidth: "180px",
          justifyContent: "space-between",
          display: "flex",
          marginTop: "20px",
          border: "1px solid #B2DFDB",
        }}
      >
        <span style={{ color: "#1E555C", fontWeight: 600 }}>
          {selectedValue}
        </span>
        <ArrowDropDown style={{ color: "#1E555C" }} />
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
            borderRadius: "8px",
            width: "250px",
            marginTop: "5px",
            border: "1px solid #B2DFDB",
          },
        }}
      >
        <Box px={2} py={1}>
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ fontWeight: "bold", color: "#1E555C" }}
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
                    <ArrowUpward style={{ color: "#3CB371" }} />
                    <span style={{ marginLeft: "8px", color: "#1E555C" }}>
                      High to Low
                    </span>
                  </Box>
                }
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                value="Upside Left : Low to High"
                control={<Radio color="error" />}
                label={
                  <Box display="flex" alignItems="center">
                    <ArrowDownward style={{ color: "#FF6347" }} />
                    <span style={{ marginLeft: "8px", color: "#1E555C" }}>
                      Low to High
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
            style={{ fontWeight: "bold", color: "#1E555C" }}
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
                control={<Radio />}
                label={
                  <Box display="flex" alignItems="center">
                    <AccessTimeFilled style={{ color: "#FF8C00" }} />
                    <span style={{ marginLeft: "8px", color: "#1E555C" }}>
                      Newest to Oldest
                    </span>
                  </Box>
                }
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                value="Recency : Oldest to Newest"
                control={<Radio />}
                label={
                  <Box display="flex" alignItems="center">
                    <AccessTime style={{ color: "#A9A9A9" }} />
                    <span style={{ marginLeft: "8px", color: "#1E555C" }}>
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
            style={{ fontWeight: "bold", color: "#1E555C" }}
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
                control={<Radio />}
                label={
                  <Box display="flex" alignItems="center">
                    <AccessTimeFilled style={{ color: "#1E555C" }} />
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
                control={<Radio />}
                label={
                  <Box display="flex" alignItems="center">
                    <AccessTime style={{ color: "#1E555C" }} />
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
            style={{ fontWeight: "bold", color: "#1E555C" }}
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
                control={<Radio />}
                label={
                  <Box display="flex" alignItems="center">
                    <span style={{ color: "#1E555C" }}>₹</span>
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
                control={<Radio />}
                label={
                  <Box display="flex" alignItems="center">
                    <span style={{ color: "#1E555C" }}>₹</span>
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
