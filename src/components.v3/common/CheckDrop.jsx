// components/RadioSelectDropdown.js
import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  Box,
  Checkbox,
} from "@mui/material";

const CheckDropdown = ({ selectedValue, handleChange, options, label }) => {
  return (
    <Box display="flex" alignItems="center" width="100%">
      <Box flexShrink={0}>
        {/* Label on the left side */}
        {/* <div className="font-medium">{label}ds:</div> */}
      </Box>
      <FormControl fullWidth>
        <Select
          value={selectedValue}
          onChange={handleChange}
          displayEmpty
          className="w-full  gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center"
          renderValue={(selected) => {
            const option = options.find((opt) => opt.value === selected);
            return option ? option.label : "Sector";
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <FormControlLabel
                className="w-full"
                label={option.label}
                control={<Checkbox checked={selectedValue === option.value} />}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CheckDropdown;
