import React, { useState } from "react";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
  ListSubheader,
  InputLabel,
  FormControl,
  Button,
  Box,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const sectors = [
  "Agricultural",
  "Agricultural",
  "Agricultural",
  "Chemicals",
  "Apparel & Accessories",
  "Banking",
];
export default function SectorSelect() {
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    const value = event.target.value;
    if (value.includes("Select All")) {
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
    setOpen(!open);
  };
  const filteredSectors = sectors.filter((sector) =>
    sector.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Box sx={{ width: 300 }}>
      <Button
        variant="outlined"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{
          justifyContent: "space-between",
          textTransform: "none",
          fontSize: "16px",
          color: "#007BFF",
          borderColor: "#007BFF",
        }}
      >
        Sector {selectedSectors.length > 0 && `(${selectedSectors.length})`}
      </Button>
      <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
        <InputLabel>Sector</InputLabel>
        <Select
          multiple
          value={selectedSectors}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
          open={open}
          onClose={() => setOpen(false)}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 224,
                width: 250,
              },
            },
          }}
        >
          <ListSubheader>
            <TextField
              size="small"
              placeholder="Search..."
              fullWidth
              onChange={handleSearch}
            />
          </ListSubheader>
          <MenuItem
            value="Select All"
            onClick={() => {
              if (selectedSectors.length === sectors.length) {
                setSelectedSectors([]);
              } else {
                setSelectedSectors(sectors);
              }
            }}
          >
            <Checkbox checked={selectedSectors.length === sectors.length} />
            <ListItemText primary="Select All" />
          </MenuItem>
          {filteredSectors.map((sector) => (
            <MenuItem
              key={sector}
              value={sector}
              sx={{
                fontFamily: "Open Sans, sans-serif", // Set font to Open Sans
              }}
            >
              <Checkbox
                checked={selectedSectors.indexOf(sector) > -1}
                sx={{
                  fontFamily: "Open Sans, sans-serif", // Set font to Open Sans
                }}
              />
              <ListItemText
                primary={sector}
                sx={{
                  fontFamily: "Open Sans, sans-serif", // Set font to Open Sans
                }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
