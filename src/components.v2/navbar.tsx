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
          <NavigationMenu className=" ">
            <NavigationMenuList className=" m-0 ">
              <NavigationMenuItem className=" m-0 hidden lg:flex">
                <NavigationMenuTrigger>{isLoggedIn ? "About us" : "Home"}</NavigationMenuTrigger>
                <NavigationMenuContent className=" z-20 w-auto">
                  <ul
                    className={`nav__grid-container grid md:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(fit-content,1fr))_minmax(auto,284px)] grid-flow-col  max-h-[332px]  ${
                      isLoggedIn ? "grid-rows-3" : "grid-rows-4"
                    } gap-3 m-0 p-6 md:w-[550px] lg:w-[800px] xl:w-[957px] `}
                  >
                    {HOME_OPTIONS.filter((options) =>
                      isLoggedIn
                        ? options.title !== "Sample Reports" &&
                          options.title !== "Performance" &&
                          options.title !== "Hot Stocks"
                        : true
                    ).map((option) => (
                      <ListItem
                      key={option.title}
                        className=" hover:bg-gray-50 relative "
                        href={option.link}
                        icon={option.icon}
                        title={option.title}
                        endIcon={option.endIcon}
                      >
                        {option.subtitle}
                      </ListItem>
                    ))}
                    <li
                      className={`hidden lg:block ${isLoggedIn ? " row-span-3" : "row-span-4"} col-start-4 row-start-1`}
                    >
                      <Image className=" object-contain" src={"/pricing/home-hover.png"} height={284} width={284} alt="nav-img" />
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {NAVBAR_LINKS.map((navigationOption) => (
                <NavigationMenuItem
                  className={` m-0 ${
                    (navigationOption.title !== "Track Record" && navigationOption.title !== "Stocks to buy") ||
                    !isLoggedIn
                      ? navigationOption.title === "Stocks to buy"
                        ? "hidden"
                        : "hidden lg:flex"
                      : navigationOption.title === "Stocks to buy"
                      ? "lg:hidden"
                      : ""
                  } ${isLoggedIn && navigationOption.title === "About us" ? "!hidden" : ""}`}
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
      <li className="relative m-0 ">
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
                <span>{endIcon}</span>
              </div>
              <p className="line-clamp-2 text-sm leading-snug text-gray-500">{children}</p>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
