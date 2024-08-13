import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
const CustomTabs = styled(Tabs)({
  backgroundColor: "#ffffff",
  color: "#000",
  borderRadius: "61px",
  fontWeight: "bold",
  padding: "6px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  "& .MuiTabs-indicator": {
    display: "none",
  },
});
const CustomTab = styled(Tab)(({ theme, selected }) => ({
  textTransform: "none",
  fontWeight: "bold",
  borderRadius: "47px",
  padding: "8px 40px",
  minHeight: "40px",
  minWidth: "120px",
  color: selected ? "#ffffff !important" : theme?.palette?.text?.primary,
  backgroundColor: selected ? "#101115" : "transparent",
  transition: "0.3s",
  "& .MuiTab-labelIcon": {
    alignItems: "center",
  },
  // "&:hover": {
  //   backgroundColor: selected ? "#101115" : "#f0f0f0",
  // },
}));
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `custom-tab-${index}`,
    "aria-controls": `custom-tabpanel-${index}`,
  };
}
export default function StocksTab() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomTabs
        value={value}
        onChange={handleChange}
        aria-label="rounded tabs example"
      >
        <CustomTab
          label={
            <>
              <Typography>Main Board</Typography>
              <Typography variant="caption">12 Stocks</Typography>
            </>
          }
          selected={value === 0}
          {...a11yProps(0)}
        />
        <CustomTab
          label={
            <>
              <Typography>SME Board</Typography>
              <Typography variant="caption">14 Stocks</Typography>
            </>
          }
          selected={value === 1}
          {...a11yProps(1)}
        />
      </CustomTabs>
      {/* <CustomTabPanel value={value} index={0}>
        Main Board Content
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        SME Board Content
      </CustomTabPanel> */}
    </Box>
  );
}
