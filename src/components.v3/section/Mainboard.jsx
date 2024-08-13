import React, { useState } from "react";
import MainBoardArea from "../common/MainBoardArea.jsx";
import SelectDrop from "../common/SelectDrop.jsx";
import RadioDrop from "../common/RadioDrop.jsx";
import StockCard from "../common/StockCard.jsx";
import Nonlogincard from "../common/Nonlogincard.jsx";
import RadioSelectDropdown from "../common/RadioDrop.jsx";
import Button from "@mui/material/Button";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { InboxIcon, MailIcon, MailsIcon } from "lucide-react";
import Filtermenu from "../common/Filtermenu.jsx";

// import { Button } from "../../components.v2/button/button.js";

function Mainboard() {
  const stockList = [
    {
      title: "Vidhi Specialty Food Ingredients Ltd.",
      market_cap: "5678",
      recommended_stock: true,
      is_blur: false,
      new_stock: true,
    },
    {
      title: "Reliance Industries Ltd.",
      market_cap: "9876",
      recommended_stock: false,
      is_blur: true,
      new_stock: false,
    },
    {
      title: "Tata Consultancy Services Ltd.",
      market_cap: "2345",
      recommended_stock: true,
      is_blur: false,
      new_stock: false,
    },
    {
      title: "Infosys Ltd.",
      market_cap: "8765",
      recommended_stock: false,
      is_blur: true,
      new_stock: true,
    },
    {
      title: "HDFC Bank Ltd.",
      market_cap: "3456",
      recommended_stock: true,
      is_blur: false,
      new_stock: false,
    },
    {
      title: "ICICI Bank Ltd.",
      market_cap: "6543",
      recommended_stock: false,
      is_blur: true,
      new_stock: true,
    },
    {
      title: "Bharti Airtel Ltd.",
      market_cap: "4321",
      recommended_stock: true,
      is_blur: false,
      new_stock: false,
    },
    {
      title: "Hindustan Unilever Ltd.",
      market_cap: "7890",
      recommended_stock: false,
      is_blur: true,
      new_stock: true,
    },
    {
      title: "Kotak Mahindra Bank Ltd.",
      market_cap: "8901",
      recommended_stock: true,
      is_blur: false,
      new_stock: true,
    },
    {
      title: "Larsen & Toubro Ltd.",
      market_cap: "5432",
      recommended_stock: false,
      is_blur: true,
      new_stock: false,
    },
    {
      title: "State Bank of India",
      market_cap: "6789",
      recommended_stock: true,
      is_blur: false,
      new_stock: true,
    },
  ];
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      {/* <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailsIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      <div>dhtidfjth</div>
    </Box>
  );

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const options = [
    {
      icon: "/assets/graph-down-new-broken.svg",
      value: "High to Low",
      label: "High to Low",
    },
    { value: "Low to High", label: "Low to High" },
    { value: "Newest to Oldest", label: "Newest to Oldest" },
  ];

  return (
    <>
      <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto ">
        <p className=" text-display-xs text-[#0C111D] font-bold font-open_sans text-center pb-10">
          All Mainboard Stocks
        </p>

        {/* all mainboard nav  */}

        <div className="flex gap-4 items-center justify-between">
          <div className=" w-full">
            <form class="">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white ml-2 shadow-3xs "
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none gap-2">
                  <img src="/assets/search.svg" alt="" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full pr-[14px] pl-9 py-[12px] text-md text-gray-900 border border-[#E4E7EC] rounded-lg bg-white  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 shadow-3xs "
                  placeholder="Search Stocks..."
                  required
                />
              </div>
            </form>
          </div>
          <div className="w-auto">
            <div className="relative">
              <div className="absolute z-[9] top-[-10px] left-4 bg-white px-1 justify-center items-center gap-2 rounded-2xl">
                <p className="text-gray-500 text-2xs font-medium text-center font-open_sans">
                  Sort by
                </p>
              </div>
              {/* <RadioSelectDropdown option={option} onSelect={handleSelect} /> */}
              {/* <div className="relative inline-block w-64">
                <div className="flex items-center justify-between gap-2 w-full bg-brand-100 border border-[#ADDFDB] hover:border-[#ADDFDB] pr-2.5 pl-3.5 py-1.5 rounded-md  leading-tight cursor-pointer  h-12 shadow-3xs ">
                  <div className="flex items-center gap-1">
                    <img src="/assets/mi_sort.svg" alt="" srcset="" />
                    <span className="text-md font-medium text-gray-950 font-open_sans">
                      Upside Left:
                    </span>
                    <p className="text-md font-medium text-gray-950 font-open_sans"></p>
                  </div> */}
              <RadioSelectDropdown
                selectedValue={selectedValue}
                handleChange={handleChange}
                options={options}
              />
              {/* <img src="/assets/down-arrow1.svg" alt="" className="w-4 h-4" /> */}
              {/* </div>
              </div> */}
            </div>

            {/* <button
                type="button"
                class="inline-flex justify-center w-full bg-[#E7F8F8] border border-[#ADDFDB] py-[10px] px-[14px] rounded-md  gap-2 items-center shadow-[0px 2px 6px 0px rgba(0, 0, 0, 0.05)] "
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                <img src="/assets/mi_sort.svg" alt="" />
                Returns : High to Low
                <svg
                  class="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button> */}
          </div>

          <div className="w-auto">
            <Button
              variant="outlined"
              onClick={toggleDrawer(true)}
              className="relative bg-white border !border-[#E4E7EC] !py-[8px] pl-4 pr-5 rounded-md flex gap-2 items-center shadow-3xs !min-w-24"
            >
              <img src="/assets/filter.svg" alt="" />
              <p className="font-open_sans text-brand-500">Filter</p>
              <span class="absolute bg-[#FDB022] text-white px-1 text-xs font-bold rounded-full top-[-7px] right-[-9px] w-6 h-6 justify-center items-center flex">
                1
              </span>
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
        </div>
      </div>
      <Filtermenu />
      {/* blur card  */}
      <div className="mt-4 bg-[#F2F4F7] py-10 px-20 relative">
        <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto">
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-7 ">
            <Nonlogincard />
            <MainBoardArea />
            {stockList.map(
              ({
                title,
                market_cap,
                recommended_stock,
                is_blur,
                new_stock,
              }) => (
                <StockCard
                  title={title}
                  market_cap={market_cap}
                  recommended_stock={recommended_stock}
                  is_blur={is_blur}
                  new_stock={new_stock}
                />
              )
            )}
            {/* <MainBoardArea /> */}
          </div>
          {/* Elevate Your section  */}
          <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto ">
            <div className="p-[56px] rounded-[20px] bg-custom-gradient-3 flex items-center justify-between relative overflow-hidden z-[555] top-[102px]">
              <div className="absolute bottom-[2px] left-[41%]">
                <img
                  src="/assets/Group.png"
                  alt=""
                  className="w-[376px] rotate-[-9.288deg]"
                />
              </div>
              <div>
                <p className="text-display-xs font-semibold text-[#F8F8F8] font-open_sans">
                  Elevate Your Investments with KamayaKya 
                </p>
                <p className="text-lg font-normal text-white opacity-35 font-open_sans">
                  Access Exclusive Insights with 30+ Premium SME Stock
                  Recommendations
                </p>
              </div>
              <div className="relative group">
                <div
                  className="relative w-48 h-12 opacity-90 border-[1px] border-transparent duration-300 overflow-hidden rounded-xl bg-black z-10 group-hover:bg-transparent group-hover:border-[#03D6DA]
                  group-hover:border-[1px] group-hover:px-4  group-hover:w-52 group-hover:-me-5 group-hover:h-10 group-hover:ms-5  group-hover:shadow-6xs" 
                >
                  <div
                    className="absolute z-10 -translate-x-44 group-hover:translate-x-[30rem] ease-in transition-all duration-700 h-full w-44 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12 group-hover:hidden"
                  ></div>

                  <div
                    className="absolute flex items-center text-center justify-center text-white z-[1] opacity-90 rounded-2xl inset-0.5 bg-black  group-hover:bg-transparent"
                  >
                    <button
                      name="text"
                      className="input font-medium text-sm h-full opacity-90 w-full   rounded-xl bg-black group-hover:bg-transparent"
                    >
                      Become a Member
                    </button>
                  </div>
                  <div
                    className="absolute transition-all duration-2000  animate-spin w-full h-[100px] bg-gradient-to-r from-white to-black blur-[30px] group-hover:hidden"
                  ></div>
                </div>
              </div>
              <div className="absolute right-[-31px] bottom-[-95px] z-0">
                <img src="/assets/Group 1.png" alt="" className="w-[620px]" />
              </div>
            </div>
          </div>
        </div>
        {/* Blur Rectangle  */}
        <div className="absolute bottom-[163px] z-[1] max-h-[400px] w-full">
          <img
            src="/assets/Rectangle.png"
            alt=""
            className="max-h-[400px] w-full"
          />
        </div>
      </div>
    </>
  );
}
export default Mainboard;
