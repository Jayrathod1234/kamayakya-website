import React, { useState, useRef } from "react";
import {
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
  ListSubheader,
  Button,
  Box,
  Paper,
  Popper,
  ClickAwayListener,
  Grow,
  MenuList,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useStockPicks } from "@/contexts/StockPicksContext";

export default function StrategyCheck() {
  const {
    strategyTagList,
    setStrategyTag,
    removePopularStrategies,
    addPopularStrategies,
    strategyTag,
    setIsChangeFilter,
    changablestrategyTags,
  } = useStockPicks();
  const strategy_tag_list_arr = Object.keys(strategyTagList || {});

  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleSelectAllClick = async () => {
    if (changablestrategyTags.length === strategy_tag_list_arr.length) {
      strategy_tag_list_arr.forEach(async (element) => {
        await removePopularStrategies(element);
      });
      await setStrategyTag([]);
    } else {
      strategy_tag_list_arr.forEach(async (element) => {
        await addPopularStrategies(element);
      });
      await setStrategyTag(strategy_tag_list_arr);
    }
    setIsChangeFilter(true);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const filteredTags = Object.entries(strategyTagList || {}).filter(
    ([_, value]) => {
      return value.toLowerCase().includes(searchTerm.toLowerCase());
    }
  );

  return (
    <Box sx={{ maxWidth: "148px" }}>
      <Button
        ref={anchorRef}
        variant="outlined"
        onClick={handleClick}
        endIcon={
          <KeyboardArrowDownIcon
            style={{
              filter:
                changablestrategyTags.length > 0
                  ? "brightness(0) invert(1)"
                  : "none",
            }}
          />
        }
        sx={{
          justifyContent: "space-between",
          textTransform: "none",
          color: changablestrategyTags.length > 0 ? "#FFFFFF" : "#1D2939",
          borderColor: changablestrategyTags.length > 0 ? "#108973" : "#E4E7EC",
          backgroundColor:
            changablestrategyTags.length > 0 ? "#125B54" : "#FFFFFF",
          borderRadius: "4px",
          padding: "7px 16px",
          fontWeight: 500,
          "&:hover": {
            backgroundColor:
              changablestrategyTags.length > 0
                ? "#125B54"
                : "#e7f8f8 !important",
            borderColor:
              changablestrategyTags.length > 0
                ? "#108973"
                : "#cbf3f0 !important",
          },
        }}
      >
        <div className="flex items-center space-x-2">
          <span>Strategy</span>
          {changablestrategyTags.length > 0 && (
            <span
              style={{
                backgroundColor: "#FFFFFF",
                color: "#108973",
                borderRadius: "50%",
                display: "flex", // Use flex to center the content
                justifyContent: "center",
                alignItems: "center",
                width: "20px", // Equal width and height for a perfect circle
                height: "20px",
                fontSize: "14px",
                fontWeight: 200,
              }}
            >
              {changablestrategyTags.length}
            </span>
          )}
        </div>
      </Button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement="bottom-start"
        style={{ zIndex: 9, width: 300 }}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 4],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                maxHeight: "300px", // Set a max height for the dropdown
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box
                  sx={{
                    padding: "8px",
                    maxHeight: "250px", // Set a max height for the scrollable area
                    overflowY: "auto", // Enable vertical scrolling
                  }}
                >
                  <ListSubheader
                    disableSticky
                    sx={{
                      backgroundColor: "#00000",
                      padding: "0",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <TextField
                      size="small"
                      // select
                      type="searchhhhh"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearch}
                      // variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon
                              fontSize="small"
                              sx={{ color: "#667085" }}
                            />
                          </InputAdornment>
                        ),

                        sx: {
                          color: "#667085", // Adjust the text color
                          border: "none", // Remove the border
                          outline: "none",
                          paddingLeft: "4px", // Adjust padding to match the image
                          fontSize: "14px", // Increase font size for the text
                          width: "100%",
                        },
                      }}
                      sx={{
                        flex: 1,
                        backgroundColor: "transparent ", // Make the background transparent
                        border: "none", // Ensure no border is shown
                        boxShadow: "none", // Remove any shadow
                      }}
                    />
                    <Typography
                      onClick={handleSelectAllClick}
                      sx={{
                        cursor: "pointer",
                        color: "#125B54",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {changablestrategyTags.length ===
                      strategy_tag_list_arr.length
                        ? "Deselect"
                        : "Select"}{" "}
                      All
                    </Typography>
                  </ListSubheader>
                  {filteredTags.map(([key, displayValue], index) => (
                    <MenuItem
                      autoFocus={false}
                      key={index}
                      value={key}
                      onClick={async () => {
                        const currentIndex = strategyTag.indexOf(key);
                        const newStrategyTag = [...strategyTag];
                        if (currentIndex === -1) {
                          addPopularStrategies(key);
                          newStrategyTag.push(key);
                        } else {
                          newStrategyTag.splice(currentIndex, 1);
                        }
                        await setStrategyTag(newStrategyTag);
                        setIsChangeFilter(true);
                      }}
                      sx={{
                        padding: "8px",
                        height: "36px",
                        fontFamily: "open Sans",
                        backgroundColor: strategyTag.includes(key)
                          ? "#E7F8F8"
                          : "transparent",
                        "&:hover": {
                          backgroundColor: strategyTag.includes(key)
                            ? "#cde6e6"
                            : "#E0F7FA",
                        },
                      }}
                    >
                      <Checkbox
                        checked={strategyTag.indexOf(key) > -1}
                        sx={{
                          color: strategyTag.includes(key)
                            ? "#108973 !important"
                            : "#E4E7EC",
                          padding: "0 8px 0 0",
                        }}
                      />
                      <ListItemText
                        primary={displayValue}
                        sx={{
                          margin: 0,
                          fontSize: "14px !important",
                        }}
                      />
                    </MenuItem>
                  ))}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
