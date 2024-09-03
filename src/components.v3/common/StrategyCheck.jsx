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
  Typography,
  InputAdornment,
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

  const commonStyles = {
    fontFamily: "Open Sans",
    fontSize: "14px !important",
  };

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
          ...commonStyles,
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "20px",
                height: "20px",
                fontWeight: 200,
                ...commonStyles,
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
                maxHeight: "300px",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box
                  sx={{
                    padding: "8px",
                    maxHeight: "250px",
                    overflowY: "auto",
                  }}
                >
                  <ListSubheader
                    disableSticky
                    sx={{
                      backgroundColor: "transparent",
                      padding: "0",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "open sans",
                      gap: "8px",
                      borderBottom: "1px solid #F2F2F2",
                    }}
                  >
                    <TextField
                      size="small"
                      type="search"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearch}
                      variant="standard"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon
                              fontSize="small"
                              sx={{ color: "#667085" }}
                            />
                          </InputAdornment>
                        ),
                        disableUnderline: true,
                        sx: {
                          color: "#667085",
                          paddingLeft: "4px",
                          width: "100%",
                          ...commonStyles,
                        },
                      }}
                      sx={{
                        flex: 1,
                        backgroundColor: "transparent",
                        border: "none",
                        boxShadow: "none",
                      }}
                    />
                    <Typography
                      onClick={handleSelectAllClick}
                      sx={{
                        cursor: "pointer",
                        color: "#125B54",
                        fontWeight: 600,
                        ...commonStyles,
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
                        backgroundColor: strategyTag.includes(key)
                          ? "#E7F8F8"
                          : "transparent",
                        "&:hover": {
                          backgroundColor: strategyTag.includes(key)
                            ? "#cde6e6"
                            : "#E0F7FA",
                        },
                        ...commonStyles,
                      }}
                    >
                      <Checkbox
                        checked={strategyTag.indexOf(key) > -1}
                        sx={{
                          color: strategyTag.includes(key)
                            ? "#108973 !important"
                            : "#E4E7EC",
                          padding: "0 8px 0 0",
                          fontFamily: "Open Sans !important", // Set font to Open Sans
                        }}
                      />
                      <ListItemText
                        primary={displayValue}
                        sx={{
                          margin: 0,
                          ...commonStyles,
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
