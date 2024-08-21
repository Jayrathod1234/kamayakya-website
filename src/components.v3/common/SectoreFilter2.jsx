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

const sectors = [
  "Agricultural",
  "Automobile & Ancillaries ",
  "Banking",
  "Consumer Durables",
  "Derived Materials",
  "Financial",
  "Agricultural", // Duplicated entry as per your image
];

const SectorFilter2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.name;
    setCheckedItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const filteredSectors = sectors.filter((sector) =>
    sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "16px" }}>
      <TextField
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for sectors"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon style={{ color: "#667085" }} />
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
      <List>
        {filteredSectors.map((sector, index) => (
          <ListItem
            key={index}
            sx={{ paddingY: "0px !important", paddingX: "6px !important" }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.includes(sector)}
                  onChange={handleCheckboxChange}
                  name={sector}
                  sx={{
                    color: 'default', // Default color
                    '&.Mui-checked': {
                      color: '#125B54', // Color when checked
                    },
                  }}
                />
              }
              label={sector}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SectorFilter2;
