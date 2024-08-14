import React, { useContext, useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components.v2/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components.v2/ui/accordion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { HOME_OPTIONS, NAVBAR_LINKS } from "@/constants/navbar";
import { NavbarDropdownCard, NavbarUserCard } from "./cards";
import AuthContext from "@/components/AuthContext";
import { Button } from "./button";
import { ButtonSize, ButtonVariant } from "./button/button";
import { MissOutBanner } from "./cards/miss-out-banner";
import { NewStockbadge } from "./badge/new-stock-badge";
import axios from "axios";
import { ACTIVE_PLAN_URL, RECOMMENDATION_COUNTS } from "@/pages/api/URLs";
import { useActivePlanContext } from "@/components/PlanContext";
import Link from "next/link";
import { getMixPanelClient } from "@/externals/mixpanel";
import { usePathname, useRouter } from "next/navigation";

type TSideNav = {
  handleLogin: () => void;
};

export default function SideNav({ handleLogin }: TSideNav) {
  const { isLoggedIn } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [stockRecommendation, setStockRecommendation] = React.useState({
    "Track Record": "",
    "Stocks to Buy": "",
  });
  // const [activePlan, setActivePlan] = useState({
  //   id: "",
  //   plan: "",
  //   start_date: "",
  //   end_date: "",
  //   amount_paid: 0,
  //   is_active: false,
  //   duration: "",
  // });
  const [id, setId] = useState("");
  const {
    activePlan: { plan },
  } = useActivePlanContext();
  const router = useRouter()
  // const {plan} = activePlan
  const refreshToken = localStorage.getItem("refresh");
  const pathname = usePathname()
  const handleEvent = (event: string, properties: Record<string, string>) => {
    const mp = getMixPanelClient();
    mp.track(event, properties);
  };

  const handleClick = () => {
    handleEvent("login_clicked", { page: "Pricing_Page" });
    setOpen(false);
    handleLogin();
  };

  const fetchRecommendation = async () => {
    try {
      const response = await axios(RECOMMENDATION_COUNTS, {
        headers: { Authorization: "token " + refreshToken },
      });
      if (response.data) {
        setStockRecommendation({
          "Track Record": response.data?.recentSoldRecommendedCount + " New Exits",
          "Stocks to Buy": response.data?.recentBuyRecommendedCount + " New Stocks",
        });
      }
    } catch (e) {}
  };

  const fetchActivePlan = async () => {
    try {
      const response = await axios.get(ACTIVE_PLAN_URL, {
        headers: {
          Authorization: `token ${refreshToken}`,
        },
      });
      if (response.data) {
        const startDate = new Date(response.data.current_active_subscription.start_date);
        const endDate = new Date(response.data.current_active_subscription.end_date);
        const durationMs = endDate.valueOf() - startDate.valueOf();
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const durationDays = durationMs / millisecondsPerDay;
        const duration = durationDays > 90 ? "1year" : durationDays > 365 ? "3year" : "3months";
        // setActivePlan({ ...response.data.current_active_subscription, duration });
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchRecommendation();
      // fetchActivePlan();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    let timeoutid: ReturnType<typeof setTimeout>;
    if (id && !open) {
      timeoutid = setTimeout(() => {
        let ele = document.querySelector(id);
        ele?.scrollIntoView({ behavior: "smooth" });
        setId("");
      }, 500);
    }
    return () => {
      clearTimeout(timeoutid);
    };
  }, [id, open]);

  return (
    <Sheet modal={true} open={open} onOpenChange={setOpen}>
      <SheetTrigger onClick={() => setOpen(true)}>
        <Menu className="inline-block lg:hidden" />
      </SheetTrigger>
      <SheetContent className=" z-50 pricing gap-0 flex flex-col p-0 pr-0">
        <SheetHeader>
          {" "}
          <div className=" p-4 flex items-center justify-between">
            <Image
              className="inline-block lg:hidden"
              src="/KKLogo.svg"
              alt="KamayaKya-logo"
              width={125.54}
              height={24}
              priority
            />
            <SheetClose>
              <X className="h-4 w-4" />
            </SheetClose>
          </div>
        </SheetHeader>
        <div className=" overflow-y-scroll">
          <div className="">
            <ul className=" m-0 px-4 text-[#475467]  ">
              <li className=" py-3 px-4 m-0">
                <Accordion className="" type="single" collapsible>
                  <AccordionItem className=" border-b-0" value="item-1">
                    <AccordionTrigger className=" text-md font-medium hover:no-underline py-0">
                      About Us
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className=" flex flex-col text-[#475467]  m-0">
                        {HOME_OPTIONS.filter((options) =>
                          isLoggedIn
                            ? options.title !== "Sample Reports" &&
                              options.title !== "Performance" &&
                              options.title !== "Hot Stocks"
                            : true
                        ).map((options) => (
                          <Link
                            className=" text-inherit"
                            href={options.link}
                            onClick={(e) => {
                              handleEvent(options.mixpanel.event, options.mixpanel.property);
                              // if (options.id) {
                              //   e.preventDefault();
                              //   setOpen(false);
                              //   setId(options.id);
                              // }
                              if (options.id) {
                                setOpen(false);
                                setId(options.id);
                                e.preventDefault();
                                // if (pathname.includes("pricing") && options.id.includes("testimonials")) {
                                //   let ele = document.querySelector(options.id);
                                //   ele?.scrollIntoView({ behavior: "smooth" });
                                // } else 
                                if (pathname == "/") {
                                  let ele = document.querySelector(options.id);
                                  ele?.scrollIntoView({ behavior: "smooth" });
                                } else {
                                  router.push(options.link);
                                }
                              }
                            }}
                          >
                            <li key={options.title} className={`flex gap-x-[10px] items-center mb-0 p-3 pl-0 hover:text-black `}>
                              <div>{options.icon}</div>
                              <p className={`text-md font-medium `}>{options.title}</p>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
              {NAVBAR_LINKS.map((nav) => (
                <Link
                  onClick={() => handleEvent(nav.mixpanel.event, nav.mixpanel.property)}
                  key={nav.title}
                  className=" text-inherit"
                  href={nav.link}
                >
                  <li
                    key={nav.title}
                    className={` text-md flex justify-between items-center font-medium py-3 px-4 m-0 hover:text-black ${
                      nav.title === "About Us" ? "!hidden" : ""
                    }`}
                  >
                    <p className={` text-[#475467] ${pathname.includes(nav.link)?"text-black":""}`}>{nav.title}</p>
                    {stockRecommendation[nav.title as "Stocks to Buy" | "Track Record"] ? (
                      <NewStockbadge label={stockRecommendation[nav.title as "Stocks to Buy" | "Track Record"]} />
                    ) : null}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        {isLoggedIn ? (
          <div className=" pt-4 mt-auto">
            {plan &&
            (plan.toLowerCase() === "free" || plan.toLowerCase() === "advanced" || plan.toLowerCase() === "core") ? (
              <div onClick={() => setOpen(false)} className=" px-4">
                <MissOutBanner />
              </div>
            ) : null}

            <div className=" mb-2 mt-4  h-[1px] bg-gray-150 w-full"></div>
            <div className=" px-4 pb-4 z-50">
              <NavbarDropdownCard
                triggerElement={<NavbarUserCard arrow={true} className="py-2 pl-4 pr-3" />}
                userCard={false}
              />
            </div>
          </div>
        ) : (
          <div className=" p-4 mt-auto">
            <p className=" text-sm font-bold text-[rgba(16,24,40,1))]"> Log in</p>
            <p className=" text-sm text-gray-500 mb-5">Log in to unlock 3 HOT stocks and our Track Record for free.</p>
            {/* <Button onClick={handleClick} variant={ButtonVariant.primary} size={ButtonSize.sm} className=" w-full mb-2">Sign up</Button> */}
            <Button onClick={handleClick} variant={ButtonVariant.secondary} size={ButtonSize.sm} className=" w-full">
              Login
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
