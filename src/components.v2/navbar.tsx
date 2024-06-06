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
import { CircleHelp, Headset, LogOut, Menu, MessageSquareText, User } from "lucide-react";
import { light } from "@mui/material/styles/createPalette";
import { NavbarDropdownCard, NavbarUserCard } from "./cards";
import AuthContext from "@/components/AuthContext";
import SideNav from "./sidenav";
import { Box, IconButton } from "@mui/material";
import { Modal } from "@nextui-org/react";

import Login from "@/components/Login";

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
        <div className=" mb-1 mr-10">
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
        </div>
        <div className="relative z-[1000]">
          <NavigationMenu>
            <NavigationMenuList className=" m-0">
              <NavigationMenuItem className=" m-0 hidden lg:flex">
                <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                <NavigationMenuContent className=" rounded-xl ">
                  <ul className="grid md:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_minmax(284px,auto)] grid-rows-4 grid-flow-col gap-3 m-0 p-6 md:w-[500px] lg:w-[957px]">
                    {HOME_OPTIONS.map((option) => (
                      <ListItem href={option.link} icon={option.icon} title={option.title}>
                        {option.subtitle}
                      </ListItem>
                    ))}
                    <li className="hidden lg:block row-span-4 col-start-4 row-start-1">
                      <Image className=" h-full w-full" src={"/nav_img.png"} height={284} width={284} alt="nav-img" />
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {NAVBAR_LINKS.map((navigationOption) => (
                <NavigationMenuItem
                  className={` m-0 ${navigationOption.title !== "Track Record" ? "hidden lg:flex" : ""}`}
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
      <SideNav handleLogin={handleLogin} />
      <div className="hidden px-2 lg:flex">
        <Link href={"/stock-picks"}>
          <button
            className={` border pricing border-orange-500 ${
              isLoggedIn ? "bg-orange-500 text-white mr-6 " : " bg-transparent text-orange-500 mr-4"
            }  px-4 py-[10px] rounded-[6px]`}
          >
            <p className=" text-sm font-bold">Stock to Buy</p>
          </button>
        </Link>
        <div>
          {isLoggedIn ? (
            <NavbarDropdownCard triggerElement={<Avatar variant={AvatarVariant.md} />} userCard={true} />
          ) : (
            <button
              onClick={handleLogin}
              className={` border border-brand-500 pricing bg-brand-500 text-white  px-4 py-[10px] rounded-[6px] flex items-center justify-center gap-x-2`}
            >
              <Avatar variant={AvatarVariant.xs} />
              <p className=" text-sm font-medium">Login</p>
              <div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 5.33398L14.6667 8.00065L12 10.6673"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1.33325 8H14.6666"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </button>
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
  title?: string;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, CustomProps>(
  ({ className, icon, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "flex select-none gap-x-2 rounded-md p-3 pl-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div>{icon}</div>
            <div>
              <div className="text-sm font-medium leading-none text-gray-950 mb-1">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-gray-500">{children}</p>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
