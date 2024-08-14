import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const sectors = [
  "Agricultural",
  "Automobile & Ancillaries",
  "Banking",
  "Consumer Durables",
  "Derived Materials",
  "Financial",
];

const CheckboxList = () => {
  return (
    <div>
      {sectors.map((sector) => (
        <FormControlLabel
          key={sector}
          control={<Checkbox name={sector} />}
          label={sector}
        />
      ))}
    </div>
  );
};

export default CheckboxList;
