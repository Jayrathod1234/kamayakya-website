import React, { useState, useRef, useEffect } from "react";
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
  useEffect(() => {
    document.addEventListener("scroll", handleClose);
  }, []);
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
              marginLeft:"-4px",
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
          borderRadius: "0.5rem",
          height: "46px",
          padding: "7px 12px",
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
            transform: "scale(000.95)", // Apply scale effect on hover
            transition: "transform 0.3s ease", // Smooth transition for the scale effect
          },
        }}
      >
        <div className="flex items-center space-x-1 font-open_sans text-xs">
          <span className="  text-sm font-medium">Strategy</span>
          {changablestrategyTags.length > 0 && (
            <span
              style={{
                ...commonStyles,
                backgroundColor: "#FFFFFF",
                color: "#108973",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "20px",
                height: "20px",
                fontWeight: 700,
                fontSize: "14px",
               
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
        style={{ zIndex: 111, width: 300 }}
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
                borderRadius: "0.5rem",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                maxHeight: "300px",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box
                  sx={{
                    padding: "0px 8px 8px 8px",
                    maxHeight: "250px", // Set a max height for the scrollable area
                    overflowY: "auto", // Enable vertical scrolling
                  }}
                >
                  <ListSubheader
                    disableSticky
                    sx={{
                      backgroundColor: "#00000",
                      padding: "8px 0px 2px 0px",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "open sans",
                      gap: "8px",
                      position: "sticky",
                      top: "0",
                      backgroundColor: "#ffff",
                      zIndex: "10",
                      borderBottom: "1px solid #F2F2F2", // Add a bottom border
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
                        paddingBottom: "6px",
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
                  {filteredTags.length ? (
                    filteredTags.map(([key, displayValue], index) => (
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
                          fontFamily: "Open Sans !important", // Set font to Open Sans
                          backgroundColor: strategyTag.includes(key)
                            ? "#E7F8F8"
                            : "transparent",
                          "&:hover": {
                            backgroundColor: strategyTag.includes(key)
                              ? "#cde6e6"
                              : "#E0F7FA",
                          },
                          "& .MuiTypography-root": {
                            fontSize: "14px !important",
                            fontFamily: '"Open Sans", sans-serif !important', // Target MUI typography
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
                            fontFamily: "Open Sans !important", // Set font to Open Sans
                          }}
                        />
                        <ListItemText
                          primary={displayValue}
                          sx={{
                            margin: 0,
                            fontFamily: '"Open Sans", sans-serif !important',
                            fontSize: "14px !important",
                          }}
                        />
                      </MenuItem>
                    ))
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontFamily: '"Open Sans", sans-serif',
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      No strategy tag found
                    </Typography>
                  )}

                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
