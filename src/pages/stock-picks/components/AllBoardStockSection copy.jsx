import React, { useState } from "react";
import MainBoardArea from "@/components.v3/common/MainBoardArea.jsx";
import SelectDrop from "@/components.v3/common/SelectDrop.jsx";
import RadioDrop from "@/components.v3/common/RadioDrop.jsx";
import StockCard from "@/components.v3/common/StockCard.jsx";
import Nonlogincard from "@/components.v3/common/Nonlogincard.jsx";
import RadioSelectDropdown from "@/components.v3/common/RadioDrop.jsx";
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
import Filtermenu from "@/components.v3/common/Filtermenu.jsx";

// import { Button } from "../../components.v2/button/button.js";

function AllBoardStockSection() {
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

  const [filteropen, filtersideopen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
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
      </List>
      {/* <div>dhtidfjth</div> */}
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
      {/* <Filtermenu Filtermenu={filteropen} FiltermenuSidebar={filtersideopen} /> */}
      {/* blur card  */}
      <div className="mt-4 bg-[#F2F4F7] py-10 px-20 relative">
        <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto">
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-7  md:grid-cols-2">
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
                <p className="text-display-xs font-bold text-[#F8F8F8] font-open_sans pb-3">
                  Elevate Your Investments with KamayaKya
                </p>
                <p className="text-base sm:text-md font-normal text-white/[0.64] font-open_sans leading-7 tracking-normal">
                  Access exclusive insights with
                  <span className="text-white/[0.80] font-semibold leading-7">
                    30+ Main Board and 10+ SME Premium stock
                  </span>
                  picks every year
                </p>
              </div>
              <div className="relative group">
                <div
                  className="relative w-48 h-12 opacity-90 border-[1px] border-transparent duration-300 overflow-hidden rounded-xl bg-black z-10 group-hover:bg-transparent group-hover:border-[#03D6DA]
                  group-hover:border-[1px] group-hover:px-4  group-hover:w-52 group-hover:-me-5 group-hover:h-10 group-hover:ms-5  group-hover:shadow-6xs"
                >
                  <div className="absolute z-10 -translate-x-44 group-hover:translate-x-[30rem] ease-in transition-all duration-700 h-full w-44 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12 group-hover:hidden"></div>

                  <div className="absolute flex items-center text-center justify-center text-white z-[1] opacity-90 rounded-2xl inset-0.5 bg-black  group-hover:bg-transparent">
                    <button
                      name="text"
                      className="input font-medium text-sm h-full opacity-90 w-full   rounded-xl bg-black group-hover:bg-transparent"
                    >
                      Become a Member
                    </button>
                  </div>
                  <div className="absolute transition-all duration-2000  animate-spin w-full h-[100px] bg-gradient-to-r from-white to-black blur-[30px] group-hover:hidden"></div>
                </div>
              </div>
              <div className="absolute right-[-31px] bottom-[-95px] z-0">
                <img src="/assets/Group 1.png" alt="" className="w-[620px]" />
              </div>
            </div>
          </div>
        </div>
        {/* Blur Rectangle  */}
        {/* <div className="absolute bottom-[163px] z-[1] max-h-[400px] w-[min(1280px,calc(100%-32px))]">
          <img
            src="/assets/Rectangle.png"
            alt=""
            className="max-h-[400px] w-full"
          />
        </div> */}
      </div>
    </>
  );
}
export default AllBoardStockSection;
