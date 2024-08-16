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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";

const sectors = [
  "Deep Value",
  "Market Leader ",
  "Special Situation",
  "Banking",
];

export default function StrategyCheck() {
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value.includes("all")) {
      if (selectedSectors.length === sectors.length) {
        setSelectedSectors([]);
      } else {
        setSelectedSectors(sectors);
      }
    } else {
      setSelectedSectors(value);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleSelectAllClick = () => {
    if (selectedSectors.length === sectors.length) {
      setSelectedSectors([]);
    } else {
      setSelectedSectors(sectors);
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const filteredSectors = sectors.filter((sector) =>
    sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{}}>
      <Button
        ref={anchorRef}
        variant="outlined"
        onClick={handleClick}
        endIcon={<img src="/assets/chevron-down.svg" alt="" />}
        sx={{
          justifyContent: "space-between",
          textTransform: "none",
          color: "#1D2939",
          borderColor: "#E4E7EC",
          borderRadius: "4px",
          padding: "7px 16px",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "#e7f8f8 !important",
            borderColor: "#cbf3f0 !important",
          },
        }}
      >
        Strategy {selectedSectors.length > 0 && `(${selectedSectors.length})`}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement="bottom-start" // Ensures the dropdown opens directly below the button
        style={{
          zIndex: 9,
          width: 300,
        }}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 4], // Adjust the offset as needed (4px gap below the button)
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper
              sx={{
                borderRadius: "8px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  disablePadding
                  sx={{
                    padding: "8px",
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
                      type="Search  "
                      placeholder="Search..."
                      onChange={handleSearch}
                      variant="outlined"
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
                          color: "#98A2B3",
                          borderRadius: "8px",
                          paddingRight: "8px",
                          fontSize: "14px",
                          width: "100%",
                        },
                      }}
                      sx={{
                        flex: 1,
                      }}
                    />
                    <Typography
                      onClick={handleSelectAllClick}
                      sx={{
                        cursor: "pointer",
                        color:
                          selectedSectors.length === sectors.length
                            ? "#125B54"
                            : "#1D2939",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      Select All
                    </Typography>
                  </ListSubheader>
                  {filteredSectors.map((sector, index) => (
                    <MenuItem
                      key={`${sector}-${index}`}
                      value={sector}
                      onClick={() => {
                        const currentIndex = selectedSectors.indexOf(sector);
                        const newSelectedSectors = [...selectedSectors];
                        if (currentIndex === -1) {
                          newSelectedSectors.push(sector);
                        } else {
                          newSelectedSectors.splice(currentIndex, 1);
                        }
                        setSelectedSectors(newSelectedSectors);
                      }}
                      sx={{
                        padding: "8px",
                        backgroundColor: selectedSectors.includes(sector)
                          ? "#E7F8F8"
                          : "transparent",
                        "&:hover": {
                          backgroundColor: "#F0F0F0",
                        },
                      }}
                    >
                      <Checkbox
                        checked={selectedSectors.indexOf(sector) > -1}
                        sx={{
                          color: selectedSectors.includes(sector)
                            ? "#108973 !important"
                            : "#E4E7EC",
                          padding: "0 8px 0 0",
                        }}
                      />
                      <ListItemText
                        primary={sector}
                        sx={{
                          margin: 0,
                          fontSize: "14px",
                        }}
                      />
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
