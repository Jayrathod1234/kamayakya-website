import Image from "next/image";
import React from "react";
import { Button, ButtonSize, ButtonVariant } from "../button/button";
import { Tabs, TabsVariant } from "../tabs";
import { PlanCardDesktop } from "./plan-card-desktop";
import { PlansMobileTab } from "./plans-mobile-tab";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components.v2/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
export function Plans() {
  return (
    <div>
      <div className=" flex justify-center mb-12 pt-10 md:pb-20 pb-6">
        <Tabs variant={TabsVariant.md} />
      </div>
      <div>
        <div className=" md:hidden">
          <div className=" flex w-full min-h-[82px]">
            <PlansMobileTab plan="FREE TRIAL" />
            <PlansMobileTab plan="CORE" features={["SME Board"]} />
            <PlansMobileTab plan="ADVANCED" features={["Mainboard"]} />
            <PlansMobileTab plan="VIP" features={["SME Board", "Mainboard"]} selected popular />
          </div>
          <div
            className={` rounded-b-xl border-x border-x-gray-150 border-b border-b-gray-150 ${
              true && "shadow-[0px_0px_0px_3px_#75CDC5]"
            }`}
          >
            <div className=" px-4 py-5">
              <div>
                <p className=" text-md text-gray-400 line-through">₹116.66</p>
                <span className=" text-display-md font-semibold">₹1250</span>
                <span className=" text-gray-400 text-2xs"> / month</span>
                <p className=" text-sm font-medium text-gray-800">Pay ₹10,000 annually & save ₹333.33 </p>
                <p className="text-sm  text-gray-500">Inclusive of 18% GST</p>
              </div>
              {/* line */}
              <div className=" my-5">
                <div className=" h-[1px] w-full bg-[#EDF0F5]"></div>
              </div>
              <div>
                <p className=" text-sm text-gray-800">
                  A value plan for seasoned investor with sizeable diverse portfolio in mainboard and SME
                </p>
                <ul className=" mt-4 flex flex-col gap-4">
                  <li className=" flex gap-2 items-center">
                    <Image height={16} width={16} src={"/icons/check_discount.svg"} alt="check" />
                    <p className=" text-sm text-gray-500">30+ Mainboard stocks to buy (NSE + BSE)</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" p-4 pt-0">
              <Button customStyle=" w-full text-center" variant={ButtonVariant.primary} size={ButtonSize.lg}>
                Get Started
              </Button>
              <p className=" mt-3 text-center text-gray-400 text-sm">No subscription auto-renewal</p>
            </div>
          </div>
        </div>
        <div className="hidden md:grid md:grid-cols-2 md:grid-rows-2 md:gap-8 lg:flex lg:gap-0">
          <PlanCardDesktop
            className=" md:row-start-1 md:justify-self-end"
            subtext={""}
            plan="Free Trial"
            price="0"
            priceStrikeThrough="1500"
            showAnually={""}
            label=""
            gstLabel={false}
            featureHead="For semi-pro/pro retail investor interested in mainboard stocks with no minimum investment requirement"
            featureList={[
              { icon: "/icons/check_only.svg", feature: "3 Free Stocks to buy (NSE + BSE)" },
              { icon: "/icons/check_only.svg", feature: "Unlock Track Record" },
              { icon: "/icons/close_only.svg", feature: "No Whatsapp Notifications" },
              { icon: "/icons/close_only.svg", feature: "No Email Updates" },
              { icon: "/icons/close_only.svg", feature: "No AMA" },
            ]}
            btnText="Get Started"
            warnMessage="No credit card required.Start for free, pick a plan later."
            perMonth={false}
          />
          <PlanCardDesktop
            className=" md:row-start-1 md:col-start-2 md:justify-self-start"
            subtext={""}
            plan="CORE"
            price="833.33"
            priceStrikeThrough="116.66"
            showAnually="Pay ₹10,000 annually"
            label="MAINBOARD"
            gstLabel={true}
            featureHead="For semi-pro/pro retail investor interested in mainboard stocks with no minimum investment requirement"
            featureList={[
              { icon: "/icons/check_only.svg", feature: "30+ Mainboard Stocks to buy (NSE + BSE)" },
              { icon: "/icons/check_only.svg", feature: "2-4 new stock picks every month" },
              { icon: "/icons/close_only.svg", feature: "Whatsapp Notifications on Action Calls" },
              { icon: "/icons/close_only.svg", feature: "Email Updates" },
              { icon: "/icons/close_only.svg", feature: "No SME board stock picks" },
              { icon: "/icons/close_only.svg", feature: "No AMA" },
            ]}
            btnText="Get Started"
            warnMessage="No subscription auto-renewal"
            perMonth={true}
          />
          <PlanCardDesktop
            className=" md:row-start-2 md:justify-self-end md:pt-[59px] lg:pt-0"
            subtext={""}
            plan="ADVANCED"
            price="833.33"
            priceStrikeThrough=""
            showAnually="Pay ₹10,000 annually"
            label="SME BOARD"
            gstLabel={false}
            featureHead="For semi-pro/pro retail investor interested in mainboard stocks with no minimum investment requirement"
            featureList={[
              { icon: "/icons/check_only.svg", feature: "Up to 10 SME board Stocks to buy (NSE+BSE)" },
              { icon: "/icons/check_only.svg", feature: "2-4 new stock picks every month" },
              { icon: "/icons/close_only.svg", feature: "Whatsapp Notifications on Action Calls" },
              { icon: "/icons/close_only.svg", feature: "Email Updates" },
              { icon: "/icons/close_only.svg", feature: "No Mainboard board stock picks" },
              { icon: "/icons/close_only.svg", feature: "No AMA" },
            ]}
            btnText="Get Started"
            warnMessage="No subscription auto-renewal"
            perMonth={true}
          />
          <PlanCardDesktop
            className=" md:row-start-2 md:col-start-2 md:justify-self-start md:rounded-t-xl lg:rounded-none md:pt-[59px] lg:pt-0 "
            subtext={""}
            plan="VIP"
            price="833.33"
            priceStrikeThrough="116.66"
            showAnually="Pay ₹10,000 annually and save ₹3000"
            label="MAINBOARD + SME BOARD"
            gstLabel={true}
            featureHead="For semi-pro/pro retail investor interested in mainboard stocks with no minimum investment requirement"
            featureList={[
              { icon: "/icons/check_only.svg", feature: "30+ Mainboard Stocks to buy (NSE + BSE)" },
              { icon: "/icons/check_only.svg", feature: "Up to 10 SME board Stocks to buy (NSE+BSE)" },
              { icon: "/icons/check_only.svg", feature: "2-4 new stock picks every month" },
              { icon: "/icons/check_only.svg", feature: "Whatsapp Notifications on Action Calls" },
              { icon: "/icons/check_only.svg", feature: "Email Updates" },
              { icon: "/icons/check_only.svg", feature: "AMA" },
            ]}
            btnText="Get Started"
            warnMessage="No subscription auto-renewal"
            perMonth={true}
            popular={true}
            btnVariant={ButtonVariant.primary}
          />
        </div>
        <div className=" mt-6 md:mt-10 text-center flex items-center justify-center ">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <div className="px-16 py-[9px] bg-gray-50 w-fit rounded-full border border-gray-100">
                  <p className=" text-center text-brand-600 text-sm md:text-md md:border-b-[1px] md:border-dashed border-brand-600 w-fit">
                    Why do we recommend minimum annual membership
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className=" bg-black text-white border-0 p-3 max-w-[425px]">
                <p>
                  We understand that effective investing requires time and patience, which is why we exclusively offer
                  an annual plan. Our strategy reflects our ethos that long-term commitment is key to unlocking the true
                  potential of your investments.
                </p>
                <TooltipArrow className=" fill-black"/>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
