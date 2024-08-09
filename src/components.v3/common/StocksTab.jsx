import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function StocksTab(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

StocksTab.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="radio-input h-[68px] w-[333px] relative flex items-center rounded-[61px] p-1.5 bg-white text-black overflow-hidden border-[6px] border-[#ffffff3a]">
        <label className="w-full p-[10px] cursor-pointer justify-center items-center z-[1] font-semibold text-sm">
          <input type="radio" id="value-1" name="value-radio" value="value-1" />
          <span className="text-md font-semibold font-open_sans">
            {" "}
            Main Board
          </span>
          <div>
            {" "}
            <span className="text-3xs font-bold text-[#D0D5DD]">12 Stocks</span>
          </div>
        </label>
        <label>
          <input type="radio" id="value-2" name="value-radio" value="value-2" />
          <span className="text-md font-semibold font-open_sans ">
            SME Board
          </span>
          <div>
            <span className="text-3xs font-bold text-[#667085]">14 Stocks</span>
          </div>
        </label>

        <span className="selection hidden absolute h-full w-[166px] left-0 top-0 px-10 py-2 rounded-[47px] "></span>
      </div>
    </>
  );
}
