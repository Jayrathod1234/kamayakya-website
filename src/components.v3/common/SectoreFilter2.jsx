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
import { useAllBoardStock } from "@/contexts/AllBoardStockContext";

const SectorFilter2 = ({ sector, setSector, tempSector, setTempSector }) => {
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

  const filteredSectors = Object.keys(stockSector || {}).filter((key) =>
    stockSector[key].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sm:p-4 p-0">
      <TextField
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for sectors"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" paddingLeft="0px">
              <IconButton>
                <SearchIcon style={{ color: "#667085", paddingLeft: "0px" }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#F2F4F7", // Default border color
              padding: "0px !important",
            },
            // "&:hover fieldset": {
            //   borderColor: "#1565c0", // Border color when hovered
            // },
            "&.Mui-focused fieldset": {
              borderColor: "#125B54", // Border color when focused
            },
          },
        }}
      />
      <div style={{ maxHeight: "350px", overflowY: "auto", zIndex: "100" }}>
        <List>
          {filteredSectors.map((key, index) => (
            <ListItem
              key={index}
              sx={{ paddingY: "0px !important", paddingX: "6px !important" }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={tempSector.includes(key)}
                    onChange={handleCheckboxChange}
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
                  <span style={{ fontFamily: "Open Sans, sans-serif" }}>
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
