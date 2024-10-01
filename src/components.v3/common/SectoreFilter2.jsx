import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useStockPicks } from "@/contexts/StockPicksContext";

const SectorFilter2 = ({ tempSector, setTempSector, isMobile }) => {
  const { stockSector } = useStockPicks();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.name;
    setTempSector((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const stock_sector_list = Object.keys(stockSector || {});
  const filteredSectors = stock_sector_list.filter((key) =>
    stockSector[key]?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const handleSelectAllClick = async () => {
    if (tempSector.length === stock_sector_list.length) {
      await setTempSector([]);
    } else {
      await setTempSector(stock_sector_list);
    }
  };

  return (
    <div className="sm:pl-7 pl-0">
      <TextField
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for sectors"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ marginLeft: 1 }}>
              <IconButton sx={{ padding: 0 }}>
                <SearchIcon style={{ color: "#667085" }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: "36px", // Adjust the height as needed
            padding: "0px", // Remove padding
            "& fieldset": {
              borderColor: "#F2F4F7", // Default border color
              padding: "0px !important", // Remove padding inside the fieldset
            },
            "&.Mui-focused fieldset": {
              borderColor: "#125B54", // Border color when focused
            },
          },
          "& .MuiInputBase-input": {
            padding: "8px", // Adjust padding inside the input
            fontSize: "14px", // Adjust font size as needed
          },
        }}
      />

      <div style={{ maxHeight: "350px", overflowY: "auto", zIndex: "100" }}>
        <List>
          {isMobile && !searchTerm && (
            <ListItem
              sx={{ paddingY: "11px !important", paddingX: "0px !important",marginBottom:'4px !important' }}
            >
              <FormControlLabel
                className="!flex !items-start "
                control={
                  <Checkbox
                    checked={tempSector.length === stock_sector_list.length}
                    onChange={handleSelectAllClick}
                    sx={{
                      padding:"1px 9px 9px",
                      color: "default", // Default color
                      "&.Mui-checked": {
                        color: "#125B54", // Color when checked
                      },
                      '& .MuiSvgIcon-root': { fontSize: 16 }
                    }}
                  />
                }
                label={
                  <span className="flex items-start text-sm" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {tempSector.length === stock_sector_list.length
                      ? "Deselect"
                      : "Select"}{" "}
                    All
                  </span>
                }
              />
            </ListItem>
          )}

          {filteredSectors.map((key, index) => (
            <ListItem
              key={index}
              sx={{ paddingY: "11px !important", paddingX: "0px !important",marginBottom:"4px !important" }}
            >
              <FormControlLabel
                className="!flex !items-start "
                control={
                  <Checkbox
                    checked={tempSector.includes(key)}
                    onChange={handleCheckboxChange}
                    name={key}
                    sx={{
                      padding: "1px 9px 0px ",
                      color: "default", // Default color
                      "&.Mui-checked": {
                        color: "#125B54", // Color when checked
                      },
                      '& .MuiSvgIcon-root': { fontSize: 16 }
                    }}
                  />
                }
                label={
                  <span className="flex items-start text-sm" style={{ fontFamily: "Open Sans, sans-serif" }}>
                    {stockSector[key]}
                  </span>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default SectorFilter2;
