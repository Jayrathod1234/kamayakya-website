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

function Filtermenu() {
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
    </Box>
  );

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [buttons, setButtons] = useState([
    { id: 1, label: 'Most Recent', icon:'/assets/watch.svg'},
    { id: 2, label: 'Value Pick', icon:'/assets/Pricing.svg' },
    { id: 3, label: 'Market Leadership', icon:'/assets/leader.svg'},
    { id: 4, label: 'Thematic Stories', icon:'/assets/bulb.svg'},
    { id: 5, label: 'Chemicals', icon:'/assets/chamical.svg'},
    { id: 6, label: 'Pharma', icon:'/assets/pharma.svg'}
  ]);


  const handleDelete = (id) => {
    setButtons(buttons.filter(button => button.id !== id));
  };
  return (
    <>
      {/* <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto ">
    
      </div> */}
      <div className="bg-white sticky top-0 left-0 z-[8]">
        <div className="w-[min(1280px,calc(100%-25px))] min-w-[328px] mx-auto  py-[10px] px-0 flex gap-1 items-center justify-between pt-4">
          {/* <div className="w-auto">
            <p className="font-open_sans text-sm font-normal text-[#344054]">
              Quick Filters:
            </p>
          </div> */}
          {buttons.map((button) => (
            <div key={button.id} className="w-auto">
              <button
                className="group relative px-4 py-[10px] flex items-center justify-between w-full shadow-md border-[#E4E7EC] border rounded hover:bg-brand-100 hover:border-brand-200 transition-all duration-500 focus:bg-brand-500 focus:text-white text-[#1D2939] focus:w-[calc(100%+10px)]"
              >
                <img
                  src={button.icon} // Replace with your icon's path or URL
                  alt="Icon"
                  width="18"
                  height="18"
                  className="group-focus:brightness-0 group-focus:invert-[1]"
                />
                <p className="flex-grow  text-sm font-medium font-open_sans mx-2">
                  {button.label}
                </p>
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 invisible group-focus-within:visible"
                  onClick={() => handleDelete(button.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M12 4L4 12M4 4L12 12"
                      stroke="white"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </div>
          ))}
          <div className="w-auto">
            <div className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center">
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Strategy
              </p>
              <img src="/assets/chevron-down.svg" alt="" />
            </div>
          </div>
          <div className="w-auto">
            <div className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center">
              <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                Sector
              </p>
              <img src="/assets/chevron-down.svg" alt="" />
            </div>

            {/* <SelectDrop options={options} onSelect={handleSelect} /> */}
            {/* <details class="custom-select">
                <summary class="radios">
                  <input
                    type="radio"
                    name="item"
                    id="default"
                    title="Strategy"
                    checked
                  />
                  <input type="radio" name="item" id="item1" title="Item 1" />
                  <input type="radio" name="item" id="item2" title="Item 2" />
                  <input type="radio" name="item" id="item3" title="Item 3" />
                  <input type="radio" name="item" id="item4" title="Item 4" />
                  <input type="radio" name="item" id="item5" title="Item 5" />
                  <img src="/assets/chevron-down.svg" alt="" />
                </summary>
                <div className="navlist">
                  <ul class="list">
                    <li>
                      <label for="item1">
                        Agricultural<span></span>
                      </label>
                    </li>
                    <li>
                      <label for="item2">Chemicals</label>
                    </li>
                    <li>
                      <label for="item3">Apparel & Accessories</label>
                    </li>
                    <li>
                      <label for="item4">Banking </label>
                    </li>
                  
                  </ul>
                </div>
              </details> */}
            {/* <div className="px-4 py-[10px] gap-1 flex shadow-md border-[#E4E7EC] border rounded items-center">
                <p className="text-[#1D2939] text-sm font-medium font-open_sans">
                  Sector
                </p>
                <img src="/assets/chevron-down.svg" alt="" />
              </div> */}
          </div>
          <div className="flex gap-[10] items-center">
            <form className="search inline-flex items-center text-black px-1 py-[3px] rounded-md border border-[#E4E7EC] transition linear  ">
              <input
                type="text"
                placeholder="Search"
                className="search__input w-0  transition-width duration-300"
              />
              <button
                type="button"
                className="search__button grid place-items-center w-[35px] h-[35px] cursor-pointer transition-colors duration-[0.25s] hover:text-[#e3e3e3] bg-[rgba(0, 0, 0, 0.1)] rounded-full "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="#0000"
                >
                  <path
                    d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                    stroke="#667085"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="w-auto">
            <Button
              variant="outlined"
              onClick={toggleDrawer(true)}
              className="relative bg-white border !border-[#E4E7EC] !py-[8px] pl-4 pr-5 rounded-md flex gap-2 items-center shadow-3xs !min-w-24"
            >
              <img src="/assets/filter.svg" alt="" />
              <p className="font-open_sans text-brand-500">Filter </p>
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
          {/* <RadioSelectDropdown /> */}
        </div>
      </div>
    </>
  );
}

export default Filtermenu;
