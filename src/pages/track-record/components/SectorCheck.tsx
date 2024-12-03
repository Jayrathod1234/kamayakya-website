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
  MenuList,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { useAllBoardStock } from "@/contexts/AllBoardStockContext";
import { useTrackRecord } from "@/contexts/TrackRecordContext";
import { useTrackRecordCommon } from "@/contexts/TrackRecordCommonContext";
import { getMixPanelClient } from "@/externals/mixpanel";

export default function SectorCheck() {
  const { stockSector, setIsChangeFilter } = useTrackRecordCommon();
  const { sector, setSector } = useTrackRecord();
  const sector_list_arr = Object.keys(stockSector || {});

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
    if (sector.length === sector_list_arr.length) {
      await setSector([]);
    } else {
      await setSector(sector_list_arr);
    }
    setIsChangeFilter(true);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const filteredTags = Object.entries(stockSector || {}).filter(
    ([_, value]) => {
      return value?.toLowerCase()?.includes(searchTerm?.toLowerCase());
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
              filter: sector.length > 0 ? "brightness(0) invert(1)" : "none",
            }}
          />
        }
        sx={{
          justifyContent: "space-between",
          textTransform: "none",
          color: sector.length > 0 ? "#FFFFFF" : "#1D2939",
          borderColor: sector.length > 0 ? "#108973" : "#E4E7EC",
          backgroundColor: sector.length > 0 ? "#125B54" : "#FFFFFF",
          borderRadius: "0.5rem",
          height: "46px",
          padding: "7px 12px",
          fontFamily: "Open Sans",
          fontWeight: 500,
          "&:hover": {
            backgroundColor:
              sector.length > 0 ? "#125B54" : "#e7f8f8 !important",
            borderColor: sector.length > 0 ? "#108973" : "#cbf3f0 !important",
            transform: "scale(000.95)", // Apply scale effect on hover
            transition: "transform 0.3s ease", // Smooth transition for the scale effect
          },
        }}
      >
        <div className="flex items-center space-x-2 font-open_sans text-xs">
          <span>Sector</span>
          {sector.length > 0 && (
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
                fontSize: "13px",
                fontWeight: 700,
                fontFamily: "Open Sans",
              }}
            >
              {sector.length}
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
                // overflow: "hidden",
                maxHeight: "300px", // Set a max height for the dropdown
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
                      gap: "8px",
                      position: "sticky",
                      backgroundColor: "#ffff",
                      zIndex: "10",
                      top: "0",
                      borderBottom: "1px solid #F2F2F2", // Add a bottom border
                    }}
                  >
                    <TextField
                      size="small"
                      // select
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
                        disableUnderline: true, // This disables the underline in the standard variant
                        sx: {
                          color: "#98A2B3",
                          borderRadius: "8px",
                          paddingRight: "8px",
                          fontSize: "14px",
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
                        fontSize: "14px",
                        fontWeight: 600,
                        fontFamily: "open sans",
                        paddingBottom: "6px",
                      }}
                    >
                      {sector.length === sector_list_arr.length
                        ? "Deselect"
                        : "Select"}{" "}
                      All
                    </Typography>
                  </ListSubheader>
                  {filteredTags.length
                    ? filteredTags.map(([key, displayValue], index) => (
                      <MenuItem
                        autoFocus={false}
                        key={index}
                        value={key}
                        onClick={async () => {
                          const currentIndex = sector.indexOf(key);
                          const newSector = [...sector];
                          if (currentIndex === -1) {
                            newSector.push(key);
                          } else {
                            newSector.splice(currentIndex, 1);
                          }
                          const mp = getMixPanelClient();
                          mp.track("filter_clicked",{
                            page:"TrackRecord_pagefilter_source:dropdown",
                            filterused:{"sector":displayValue}
                          })
                          await setSector(newSector);
                          setIsChangeFilter(true);
                        }}
                        sx={{
                          padding: "8px",
                          height: "36px",
                          fontFamily: "open Sans",
                          fontSize: "14px !important",
                          backgroundColor: sector.includes(key)
                            ? "#E7F8F8"
                            : "transparent",
                          "&:hover": {
                            backgroundColor: sector.includes(key)
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
                          checked={sector.indexOf(key) > -1}
                          sx={{
                            color: sector.includes(key)
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
                            fontFamily: "Open Sans !important",
                          }}
                        />
                      </MenuItem>
                    ))
                    : <Typography
                      sx={{
                        fontSize: "14px",
                        fontFamily: '"Open Sans", sans-serif',
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >No sector found
                    </Typography>
                  }
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
