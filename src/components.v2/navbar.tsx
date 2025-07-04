"use client";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Avatar, AvatarVariant } from "./avatar";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components.v2/ui/navigation-menu";

import AuthContext from "@/components/AuthContext";
import { HOME_OPTIONS, NAVBAR_LINKS } from "@/constants/index.constants";

import { light } from "@mui/material/styles/createPalette";
import { Box, IconButton } from "@mui/material";
import { Modal, useModal } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { NavbarDropdownCard } from "./cards";
import SideNav from "./sidenav";
import { useNavBar } from "@/contexts/NavBarContext.js";
import Login from "@/components/Login";
import { getMixPanelClient } from "@/externals/mixpanel";
import { Button } from "./button";
import { ButtonVariant } from "./button/button";
import { LoginBtnNav } from "./login-btn-nav";
import { ScrollProgress } from "./scroll-progress";
import SampleReportsModal from "./sample-reports-modal";
import { cn } from "@/lib/utils";
import LoginPrompt from "@/components.v3/common/LoginPrompt";
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });import VIP_LOTTIE from "../../public/assets/New.json";

/*
For pages with white background give className=bg-white to get the green hover effect
eg: <Navbar className="bg-white"/>
To change the hover effects, look for navigationMenuTriggerStyle in navigation-menu.tsx
*/

export function Navbar({
  className,
  navigationLinkClassName,
}: {
  className?: string;
  navigationLinkClassName?: string;
}) {
  const { isLoggedIn,setShowLoginModal, showLoginModal } = useContext(AuthContext);
  const { showFilterHeader } = useNavBar();
  const router = useRouter();
  const pathname = router.pathname;
  const ref = useRef<HTMLDivElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { setVisible, bindings } = useModal();
  const [isSticky, setIsSticky] = useState(pathname == "/stock-picks");
  const [isLoading,setIsLoading] = useState(true);
  const handleEvent = (event: string, properties: Record<string, string>) => {
    const mp = getMixPanelClient();
    mp.track(event, properties);
  };

  const handleLogin = (e) => {
    handleEvent("login_clicked", { page: "Pricing_Page" });
    // setShowModal(true);
    setShowLoginModal(true)
  };

  const handleNavigation = (
    option: (typeof HOME_OPTIONS)[number],
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    handleEvent(option.mixpanel.event, option.mixpanel.property);
    if (option.id) {
      e.preventDefault();
      // if (pathname.includes("pricing") && option.id.includes("testimonials")) {
      //   let ele = document.querySelector(option.id);
      //   ele?.scrollIntoView({ behavior: "smooth" });
      // } else
      if (pathname == "/") {
        let ele = document.querySelector(option.id);
        ele?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(option.link);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSampleReports = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setVisible(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        // if (pathname == '/stock-picks') {
        //   setIsSticky(false)
        // }
        ref.current?.classList.add("scrolled-nav");
        // ref.current?.classList.add("navbar-shadow");
      } else {
        // if (pathname == '/stock-picks') {
        //   setIsSticky(true)
        // }

        ref.current?.classList.remove("scrolled-nav");
        // ref.current?.classList.remove("navbar-shadow");
      }
      console.log("SHOW FILTER HEADER", showFilterHeader);
      // if (showFilterHeader) {
      //   ref.current?.classList.remove("navbar-shadow");
      // }else{
      //   ref.current?.classList.add("navbar-shadow");
      // }
    };
    // if (pathname == '/stock-picks') {
    window.addEventListener("scroll", handleScroll);
    // } else {
    //   ref.current?.classList.add("other-page-nav");
    // }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(()=>{
    setIsLoading(false)
  },[isLoggedIn])

  if(isLoading) return null

  return (
    <div
      ref={ref}
      className={cn(
        ` group/nav sticky left-0 right-0 top-0 hover:z-[52] z-[50] hover:shadow-none overflow-visible pricing`,
        className
      )}
    >
      <ScrollProgress />
      <div className="flex py-2 justify-between items-center main-container overflow-visible">
        <div className=" flex flex-row items-center justify-center">
          <div className=" mb-1 mr-3 lg:mr-10">
            <Link onClick={() => handleEvent("Kamayakya_logo_clicked", { page: "Pricing_Page" })} href={"/"}>
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
            <NavigationMenu delayDuration={0} className="z-[30000] ">
              <NavigationMenuList className=" m-0 ">
                <NavigationMenuItem className=" m-0 hidden lg:flex">
                  <NavigationMenuTrigger
                    onClick={(e) => {
                      e.preventDefault();
                      if (pathname !== "/") {
                        router.push("/");
                      }
                    }}
                    className={cn(" text-gray-950 font-semibold", navigationLinkClassName)}
                  >
                    About Us
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className=" w-auto">
                    {/* change to md:grid-cols-3 "grid-rows-3" for not logged in state */}
                    <ul
                      className={`nav__grid-container grid grid-cols-[repeat(auto-fit,minmax(170px,205px))] grid-flow-col max-h-[332px]  ${
                        isLoggedIn ? "grid-rows-4" : "grid-rows-3"
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
                          onClick={(e) =>
                            option.title === "Sample Reports" ? handleSampleReports(e) : handleNavigation(option, e)
                          }
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
                      <li className={`hidden lg:block  row-span-full row-start-1`}>
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
                    onClick={() => {
                      if (navigationOption.title?.includes("SME")) {
                        sessionStorage.setItem("sebiBoardType", "sme");
                      } else {
                        sessionStorage.setItem("sebiBoardType", "mainboard");
                      }
                    }}
                    className={` m-0 ${
                      (navigationOption.title !== "Track Record" && navigationOption.title !== "Stocks to Buy") ||
                      !isLoggedIn
                        ? navigationOption.title === "Stocks to Buy"
                          ? "hidden"
                          : "hidden lg:flex"
                        : navigationOption.title === "Stocks to Buy"
                        ? "lg:hidden rounded-[6px] border pricing hover:scale-95 transition-all duration-200 border-[rgba(246,135,0,1)] hover:bg-[#E26103] !text-[rgba(246,135,0,1)] hover:text-[#E26103] !bg-[rgba(255,158,41,0.06)] hover:!bg-[rgba(255,158,41,0.06)] mr-4"
                        : ""
                    } ${navigationOption.title === "About Us" ? "!hidden" : ""}`}
                  >
                    <Link
                      className=" !text-inherit"
                      onClick={() => {
                        console.log(navigationOption);
                        if (navigationOption.title?.includes("SME")) {
                          sessionStorage.setItem("sebiBoardType", "sme");
                        } else {
                          sessionStorage.setItem("sebiBoardType", "mainboard");
                        }
                        handleEvent(navigationOption.mixpanel.event, navigationOption.mixpanel.property);
                      }}
                      href={navigationOption.link}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={cn(
                          `${navigationMenuTriggerStyle()} font-semibold text-inherit ${
                            navigationOption.title === "Stocks to Buy"
                              ? "!text-[rgba(246,135,0,1)] !bg-[rgba(255,158,41,0.06)] hover:!bg-[rgba(255,158,41,0.06)] data-[active]:border-none"
                              : ""
                          }`,
                          navigationLinkClassName
                        )}
                        active={
                          !pathname.includes("stock-picks")
                            ? pathname === navigationOption.link
                            : sessionStorage.getItem("sebiBoardType") === "sme" && pathname === navigationOption.link
                            ? true
                            : false
                        }
                      >
                        {navigationOption.title}{navigationOption.title?.includes("VIP") ? <span className=" ml-1">
                          
                          <Lottie className=" h-7 w-7 block object-contain" autoPlay loop={false} animationData={VIP_LOTTIE} />
                        </span>:null}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className={`flex items-center justify-center gap-x-4 lg:hidden `}>
          {!isLoggedIn && <LoginBtnNav handleLogin={handleLogin}/>}
          <SideNav handleLogin={handleLogin} />
        </div>
        <div className="hidden px-2 lg:flex items-center">
          <Link
            onClick={() => {
              sessionStorage.setItem("sebiBoardType", "mainboard");
            }}
            href={"/stock-picks"}
          >
            <Button
              variant={ButtonVariant.custom}
              className={`!text-sm  border pricing border-[rgba(246,135,0,1)]  ${
                isLoggedIn
                  ? "bg-[rgba(246,135,0,1)] text-white  hover:bg-[rgba(247,117,4,1)] mr-6 "
                  : " text-[rgba(246,135,0,1)] hover:text-[rgba(247,117,4,1)] hover:border-[rgba(247,117,4,1)] bg-[rgba(255,158,41,0.06)] hover:bg-[rgba(255,158,41,0.06)] mr-4"
              }  !px-4 !py-[10px] rounded-[6px]`}
            >
              Stocks to Buy
            </Button>
          </Link>

          {isLoggedIn ? (
            <NavbarDropdownCard
              triggerElement={
                <Avatar
                  className=" transition-all border-[1.38px] border-[#EDF0F5] hover:border-[4px] hover:scale-[1.05]"
                  variant={AvatarVariant.md}
                />
              }
              userCard={true}
            />
          ) : (
            <LoginBtnNav handleLogin={handleLogin} arrow />
          )}
        </div>
        {/* <Modal
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
        </Modal> */}
        <SampleReportsModal setVisible={setVisible} bindings={bindings} />
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
      <li className="relative m-0 group/list ">
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
                <span className=" whitespace-nowrap font-semibold">{title}</span>
                <span className=" invisible group-hover/list:visible">
                  {endIcon || <ArrowRight size={12} className=" text-gray-400" />}
                </span>
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
