import React, { useContext, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components.v2/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components.v2/ui/accordion";
import { Menu } from "lucide-react";
import Image from "next/image";
import { HOME_OPTIONS, NAVBAR_LINKS } from "@/constants/navbar";
import { NavbarDropdownCard, NavbarUserCard } from "./cards";
import AuthContext from "@/components/AuthContext";
import { Button } from "./button";
import { ButtonSize, ButtonVariant } from "./button/button";
import { MissOutBanner } from "./cards/miss-out-banner";
import { NewStockbadge } from "./badge/new-stock-badge";
import axios from "axios";
import { RECOMMENDATION_COUNTS } from "@/pages/api/URLs";
import { useActivePlanContext } from "@/components/PlanContext";
import Link from "next/link";

type TSideNav = {
  handleLogin: () => void;
};

export default function SideNav({ handleLogin }: TSideNav) {
  const { isLoggedIn } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [stockRecommendation, setStockRecommendation] = React.useState({
    "Track Record": "",
    "Stocks to buy": "",
  });
  const {activePlan:{plan} } = useActivePlanContext();
  const refreshToken = localStorage.getItem("refresh");

  const handleClick = () => {
    setOpen(false);
    handleLogin();
  };

  useEffect(() => {
    (async () => {
      try {
        if (isLoggedIn) {
          const response = await axios(RECOMMENDATION_COUNTS, {
            headers: { Authorization: "token " + refreshToken },
          });
          if (response.data) {
            setStockRecommendation({
              "Track Record": response.data?.recentSoldRecommendedCount + " New Exits",
              "Stocks to buy": response.data?.recentBuyRecommendedCount + " New Stocks",
            });
          }
        }
      } catch (e) {}
    })();
  }, [isLoggedIn]);

  console.log(plan)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu className="inline-block lg:hidden" />
      </SheetTrigger>
      <SheetContent className=" pricing flex flex-col p-0 overflow-y-scroll pr-0">
        {/* <SheetHeader> */}
        <div className="  p-4">
          <Image
            className="inline-block lg:hidden"
            src="/KKLogo.svg"
            alt="KamayaKya-logo"
            width={125.54}
            height={24}
            priority
          />
          <div className=" mt-7">
            <ul className=" m-0">
              <li className=" py-3 px-4 m-0">
                <Accordion className="" type="single" collapsible>
                  <AccordionItem className=" border-b-0" value="item-1">
                    <AccordionTrigger className=" text-md hover:no-underline py-0">
                      {isLoggedIn ? "About us" : "Home"}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className=" flex flex-col gap-y-[8px]">
                        {HOME_OPTIONS.filter((options) =>
                          isLoggedIn
                            ? options.title !== "Sample Reports" &&
                              options.title !== "Performance" &&
                              options.title !== "Hot Stocks"
                            : true
                        ).map((options) => (
                          <li key={options.title} className="flex gap-x-[10px] items-center mb-0 p-3 pl-2">
                            <div>{options.icon}</div>
                            <p className="text-md font-medium">{options.title}</p>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
              {NAVBAR_LINKS.map((nav) => (
                <Link key={nav.title} className=" text-inherit" href={"/"}>
                  <li
                    key={nav.title}
                    className={` text-md flex justify-between items-center font-medium py-3 px-4 m-0 ${
                      isLoggedIn && nav.title === "About us" ? "!hidden" : ""
                    }`}
                  >
                    <p className=" text-inherit">{nav.title}</p>
                    {stockRecommendation[nav.title as "Stocks to buy" | "Track Record"] ? (
                      <NewStockbadge label={stockRecommendation[nav.title as "Stocks to buy" | "Track Record"]} />
                    ) : null}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        {isLoggedIn ? (
          <div className=" pt-4 mt-auto">
            {plan && (plan.toLowerCase() === "free" ||
            plan.toLowerCase() === "advanced" ||
            plan.toLowerCase() === "core") ? (
              <div className=" px-4">
                <MissOutBanner />
              </div>
            ) : null}

            <div className=" mb-2 mt-4  h-[1px] bg-gray-150 w-full"></div>
            <div className=" px-4 pb-4">
              <NavbarDropdownCard
                triggerElement={<NavbarUserCard arrow={true} className="py-2 pl-4 pr-3" />}
                userCard={false}
              />
            </div>
          </div>
        ) : (
          <div className=" p-4 mt-auto">
            <p className=" text-sm font-bold text-[rgba(16,24,40,1))]"> Log in</p>
            <p className=" text-sm text-gray-500 mb-5">Log in and unlock 3 HOT stocks for Free</p>
            {/* <Button onClick={handleClick} variant={ButtonVariant.primary} size={ButtonSize.sm} customStyle=" w-full mb-2">Sign up</Button> */}
            <Button onClick={handleClick} variant={ButtonVariant.secondary} size={ButtonSize.sm} customStyle=" w-full">
              Login
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
