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
} from "@mui/material";

const RadioSelectDropdown = ({
  selectedValue,
  handleChange,
  options,
  label,
}) => {
  return (
    <Box display="flex" alignItems="center" width="100%">
      <Box flexShrink={0} mr={2}>
        {/* Label on the left side */}
        {/* <div className="font-medium">{label}ds:</div> */}
      </Box>
      <FormControl fullWidth>
        <Select
          value={selectedValue}
          onChange={handleChange}
          displayEmpty
          className="w-full bg-brand-100 border border-[#ADDFDB] hover:border-[#ADDFDB] pr-2.5 pl-3.5 py-1.5 rounded-md leading-tight cursor-pointer h-12 shadow-3xs z-[8]"
          renderValue={(selected) => {
            const option = options.find((opt) => opt.value === selected);
            return option ? option.label : "Select an option";
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <FormControlLabel
                className="w-full"
                label={option.label}
                control={<Radio checked={selectedValue === option.value} />}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default RadioSelectDropdown;
