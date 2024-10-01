"use client";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Avatar, AvatarVariant } from "@/components.v2/avatar";
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
import {
    ArrowRight,
    CircleHelp,
    Headset,
    LogOut,
    Menu,
    MessageSquareText,
    User,
} from "lucide-react";
import { light } from "@mui/material/styles/createPalette";
import { NavbarDropdownCard, NavbarUserCard } from "@/components.v2/cards";
import AuthContext from "@/components/AuthContext";
import SideNav from "@/components.v2/sidenav";
import { Box, IconButton } from "@mui/material";
import { Modal } from "@nextui-org/react";

import Login from "@/components/Login";
import { LoginBtnNav } from "@/components.v2/login-btn-nav";
import { getMixPanelClient } from "@/externals/mixpanel";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";

export function Navbar() {
    const { isLoggedIn } = useContext(AuthContext);
    const router = useRouter();
    const pathname = router.pathname;
    const ref = useRef<HTMLDivElement | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleEvent = (event: string, properties: Record<string, string>) => {
        const mp = getMixPanelClient();
        mp.track(event, properties);
    };

    const handleLogin = () => {
        handleEvent("login_clicked", { page: "Pricing_Page" });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 0) {
                ref.current?.classList.add("scrolled-nav");
            } else {
                ref.current?.classList.remove("scrolled-nav");
            }
        });
    }, []);

    return (
        <div
            ref={ref}
            className="sticky left-0 right-0 top-0 z-50 transition-all duration-500 overflow-visible max-h-14"
        >
            <div className="flex py-2 justify-between items-center main-container overflow-visible">
                <div className=" flex flex-row items-center justify-center">
                    <div className=" mb-1 mr-3 lg:mr-10">
                        <Link
                            onClick={() =>
                                handleEvent("Kamayakya_logo_clicked", { page: "Pricing_Page" })
                            }
                            href={"/"}
                        >
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
                                    <NavigationMenuTrigger className=" ">
                                        {isLoggedIn ? "About Us" : "Home"}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className=" w-auto">
                                        {/* change to md:grid-cols-3 "grid-rows-3" for not logged in state */}
                                        <ul
                                            className={`nav__grid-container grid grid-cols-[repeat(auto-fit,minmax(170px,205px))] grid-flow-col max-h-[332px]  ${isLoggedIn ? "grid-rows-4" : "grid-rows-3"
                                                } gap-3 m-0 p-6  ${isLoggedIn
                                                    ? "lg:w-[700px]"
                                                    : "md:w-[620px] lg:w-[900px]"
                                                }  `}
                                        >
                                            {HOME_OPTIONS.filter((options) =>
                                                isLoggedIn
                                                    ? options.title !== "Sample Reports" &&
                                                    options.title !== "Performance" &&
                                                    options.title !== "Hot Stocks"
                                                    : true
                                            ).map((option) => (
                                                <ListItem
                                                    onClick={(e) => {
                                                        handleEvent(
                                                            option.mixpanel.event,
                                                            option.mixpanel.property
                                                        );
                                                        if (option.id) {
                                                            e.preventDefault();
                                                            let ele = document.querySelector(option.id);
                                                            ele?.scrollIntoView({ behavior: "smooth" });
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
                                                <Image
                                                    className=" object-cover h-full w-full rounded-xl"
                                                    src={"/pricing/home-hover.png"}
                                                    height={284}
                                                    width={284}
                                                    alt="nav-img"
                                                />
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                {NAVBAR_LINKS.map((navigationOption) => (
                                    <NavigationMenuItem
                                        className={` m-0 ${(navigationOption.title !== "Track Record" &&
                                            navigationOption.title !== "Stocks to Buy") ||
                                            !isLoggedIn
                                            ? navigationOption.title === "Stocks to Buy"
                                                ? "hidden"
                                                : "hidden lg:flex"
                                            : navigationOption.title === "Stocks to Buy"
                                                ? "lg:hidden rounded-[6px] border pricing hover:scale-95 transition-all duration-200 border-orange-500 !text-orange-500 !bg-[rgba(255,158,41,0.06)] hover:!bg-[rgba(255,158,41,0.06)] mr-4 uppercase"
                                                : ""
                                            } ${navigationOption.title === "About Us" ? "!hidden" : ""
                                            }`}
                                    >
                                        <Link
                                            className=" !text-inherit"
                                            onClick={() =>
                                                handleEvent(
                                                    navigationOption.mixpanel.event,
                                                    navigationOption.mixpanel.property
                                                )
                                            }
                                            href={navigationOption.link}
                                            legacyBehavior
                                            passHref
                                        >
                                            <NavigationMenuLink
                                                className={`${navigationMenuTriggerStyle()} text-inherit ${navigationOption.title === "Stocks to Buy"
                                                    ? "!text-orange-500 !bg-[rgba(255,158,41,0.06)] hover:!bg-[rgba(255,158,41,0.06)]"
                                                    : ""
                                                    }`}
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
                        <Button
                            variant={ButtonVariant.orange}
                            customStyle={`border pricing border-orange-500  ${isLoggedIn
                                ? "bg-orange-500 text-white  hover:bg-orange-600 mr-6 "
                                : " text-orange-500 bg-[rgba(255,158,41,0.06)] hover:bg-[rgba(255,158,41,0.06)] mr-4"
                                }  !px-4 !py-[10px] rounded-[6px]`}
                        >
                            <p className=" text-sm font-bold capitalize ">Stocks to Buy</p>
                        </Button>
                    </Link>
                    <div>
                        {isLoggedIn ? (
                            <NavbarDropdownCard
                                triggerElement={<Avatar variant={AvatarVariant.md} />}
                                userCard={true}
                            />
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
                                <span className=" invisible group-hover:visible">
                                    {endIcon || (
                                        <ArrowRight size={12} className=" text-gray-400" />
                                    )}
                                </span>
                            </div>
                            <p className="line-clamp-2 leading-snug text-gray-500 text-2xs">
                                {children}
                            </p>
                        </div>
                    </a>
                </NavigationMenuLink>
            </li>
        );
    }
);
ListItem.displayName = "ListItem";
