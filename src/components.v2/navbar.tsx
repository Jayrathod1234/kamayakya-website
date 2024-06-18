"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { Avatar, AvatarVariant } from "./avatar";
import Link from "next/link";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components.v2/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components.v2/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { Item } from "@radix-ui/react-select";
import { HOME_OPTIONS, NAVBAR_LINKS } from "@/constants/index.constants";
import { ArrowRight, CircleHelp, Headset, LogOut, Menu, MessageSquareText, User } from "lucide-react";
import { light } from "@mui/material/styles/createPalette";
import { NavbarDropdownCard, NavbarUserCard } from "./cards";
import AuthContext from "@/components/AuthContext";
import SideNav from "./sidenav";
import { Box, IconButton } from "@mui/material";
import { Modal } from "@nextui-org/react";

import Login from "@/components/Login";
import { LoginBtnNav } from "./login-btn-nav";

export function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const pathname = router.pathname;

  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className=" flex py-2 md:py-4 justify-between items-center">
      <div className=" flex flex-row items-center justify-center">
        <div className=" mb-1 mr-3 lg:mr-10">
          <Link href={'/'}>
          <Image
            className=" inline-block md:hidden h-full w-full"
            src="/KKLogoK.svg"
            alt="KamayaKya-logo"
            width={20}
            height={25}
            priority
          />
          <Image
            className=" hidden md:inline-block"
            src="/KKLogo.svg"
            alt="KamayaKya-logo"
            width={125.54}
            height={24}
            priority
          />
          </Link>
        </div>
        <div className="relative">
          <NavigationMenu delayDuration={0} className=" ">
            <NavigationMenuList className=" m-0 ">
              <NavigationMenuItem className=" m-0 hidden lg:flex">
                <NavigationMenuTrigger>{isLoggedIn ? "About Us" : "Home"}</NavigationMenuTrigger>
                <NavigationMenuContent className=" z-20 w-auto">
                {/* change to md:grid-cols-3 "grid-rows-3" for not logged in state */}
                  <ul
                    className={`nav__grid-container grid grid-cols-[repeat(auto-fit,minmax(170px,205px))] grid-flow-col max-h-[332px]  ${
                      isLoggedIn ? "grid-rows-3" : "grid-rows-3"
                    } gap-3 m-0 p-6  ${isLoggedIn ? "lg:w-[700px]" : "md:w-[620px] lg:w-[900px]"}  `}
                  >
                    {HOME_OPTIONS.filter((options) =>
                      isLoggedIn
                        ? options.title !== "Sample Reports" &&
                          options.title !== "Performance" &&
                          options.title !== "Hot Stocks" 
                        : true
                    ).map((option) => (
                      <ListItem
                        onClick={(e)=>{
                          
                          if(option.id){
                            e.preventDefault();
                            let ele = document.querySelector(option.id)
                            ele?.scrollIntoView({behavior:'smooth'})
                          }
                        }}
                      key={option.title}
                        className=" hover:bg-gray-50 relative "
                        href={option.link}
                        icon={option.icon}
                        title={option.title}
                        id={option?.id}
                        // endIcon={option?.endIcon}
                      >
                        {option.subtitle}
                      </ListItem>
                    ))}
                    <li
                      className={`hidden lg:block  row-span-full row-start-1`}
                    >
                      <Image className=" object-cover h-full w-full rounded-xl" src={"/pricing/home-hover.png"} height={284} width={284} alt="nav-img" />
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {NAVBAR_LINKS.map((navigationOption) => (
                <NavigationMenuItem
                  className={` m-0 ${
                    (navigationOption.title !== "Track Record" && navigationOption.title !== "Stocks to Buy") ||
                    !isLoggedIn
                      ? navigationOption.title === "Stocks to Buy" 
                        ? "hidden"
                        : "hidden lg:flex"
                      : navigationOption.title === "Stocks to Buy"
                      ? "lg:hidden"
                      : ""
                  } ${navigationOption.title === "About Us" ? "!hidden" : ""}`}
                >
                  <Link href={navigationOption.link} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      active={pathname === navigationOption.link}
                    >
                      {navigationOption.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className=" flex items-center justify-center gap-x-4 lg:hidden">
        {!isLoggedIn && <LoginBtnNav handleLogin={handleLogin} />}
        <SideNav handleLogin={handleLogin} />
      </div>
      <div className="hidden px-2 lg:flex">
        <Link href={"/stock-picks"}>
          <button
            className={` border pricing border-orange-500  ${
              isLoggedIn ? "bg-orange-500 text-white hover:bg-orange-600 mr-6 " : " bg-transparent text-orange-500 hover:bg-orange-500 hover:text-white mr-4"
            }  px-4 py-[10px] rounded-[6px]`}
          >
            <p className=" text-sm font-bold">Stocks to Buy</p>
          </button>
        </Link>
        <div>
          {isLoggedIn ? (
            <NavbarDropdownCard triggerElement={<Avatar variant={AvatarVariant.md} />} userCard={true} />
          ) : (
            <LoginBtnNav handleLogin={handleLogin} arrow />
          )}
        </div>
      </div>
      <Modal
        width="450px"
        blur
        open={showModal}
        onClose={handleCloseModal}
        css={{
          // marginLeft: "2.5vw",
          marginLeft: "0",
          "@media only screen and (max-width: 764px)": {
            width: "100vw",
            alignSelf: "center",
            // marginLeft: "2.5vw",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src="kmk-k.png" style={{ width: "50px" }} />
          <IconButton
            sx={{
              width: "40px",
              "&:hover": { background: "#fff" },
              // alignSelf: "end",
              right: "0px",
              paddingTop: "20px",
              paddingRight: "30px",
            }}
            onClick={() => handleCloseModal()}
          >
            <CloseIcon sx={{ color: "#e81123" }} />
          </IconButton>
        </Box>

        <Modal.Body>
          <Login />
        </Modal.Body>
      </Modal>
    </div>
  );
}

interface CustomProps extends React.ComponentPropsWithoutRef<"a"> {
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  title?: string;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, CustomProps>(
  ({ className, icon, endIcon, title, children, ...props }, ref) => {
    return (
      <li className="relative m-0 group ">
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "flex select-none gap-x-2 rounded-md p-3 pl-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground relative  ",
              className
            )}
            {...props}
          >
            <div>{icon}</div>
            <div>
              <div className="text-sm font-medium leading-none text-gray-950 mb-1 flex gap-x-2 items-center">
                <span className=" whitespace-nowrap">{title}</span>
                <span className=" invisible group-hover:visible">{endIcon || <ArrowRight size={12} className=" text-gray-400" />}</span>
              </div>
              <p className="line-clamp-2 leading-snug text-gray-500 text-2xs">{children}</p>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
