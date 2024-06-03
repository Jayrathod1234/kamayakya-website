import { ButtonVariant } from "@/components.v2/button/button";

export const FREE_PLAN = {
  className: " md:row-start-1 md:justify-self-end order-1",
  subtext: "",
  label: "",
  gstLabel: false,
  featureHead: "For semi-pro/pro retail investor interested in mainboard stocks with no minimum investment requirement",
  featureList: [
    { icon: "/icons/check_only.svg", feature: "3 Free Stocks to buy (NSE + BSE)" },
    { icon: "/icons/check_only.svg", feature: "Unlock Track Record" },
    { icon: "/icons/close_only.svg", feature: "No Whatsapp Notifications" },
    { icon: "/icons/close_only.svg", feature: "No Email Updates" },
    { icon: "/icons/close_only.svg", feature: "No AMA" },
  ],
  btnText: "Get Started",
  warnMessage: "No credit card required.Start for free, pick a plan later.",
  perMonth: false,
  popular:false
};

export const CORE_PLAN = {
  className: " md:row-start-1 md:col-start-2 md:justify-self-start order-2",
  subtext: "",
  priceStrikeThrough: "",
  label: "MAINBOARD",
  gstLabel: true,
  featureHead: "For semi-pro/pro retail investor interested in mainboard stocks with no minimum investment requirement",
  featureList: [
    { icon: "/icons/check_only.svg", feature: "30+ Mainboard Stocks to buy (NSE + BSE)" },
    { icon: "/icons/check_only.svg", feature: "2-4 new stock picks every month" },
    { icon: "/icons/close_only.svg", feature: "Whatsapp Notifications on Action Calls" },
    { icon: "/icons/close_only.svg", feature: "Email Updates" },
    { icon: "/icons/close_only.svg", feature: "No SME board stock picks" },
    { icon: "/icons/close_only.svg", feature: "No AMA" },
  ],
  btnText: "Get Started",
  warnMessage: "No subscription auto-renewal",
  perMonth: true,
  popular:false
};


export const ADVANCED_PLAN = {
  className: "  md:row-start-2 md:justify-self-end md:pt-[59px] lg:pt-0 order-3",
  subtext: "",
  priceStrikeThrough: "",
  label: "SME BOARD",
  gstLabel: true,
  featureHead: "For semi-pro/pro retail investor interested in mainboard stocks with no minimum investment requirement",
  featureList: [
    { icon: "/icons/check_only.svg", feature: "30+ Mainboard Stocks to buy (NSE + BSE)" },
    { icon: "/icons/check_only.svg", feature: "2-4 new stock picks every month" },
    { icon: "/icons/close_only.svg", feature: "Whatsapp Notifications on Action Calls" },
    { icon: "/icons/close_only.svg", feature: "Email Updates" },
    { icon: "/icons/close_only.svg", feature: "No SME board stock picks" },
    { icon: "/icons/close_only.svg", feature: "No AMA" },
  ],
  btnText: "Get Started",
  warnMessage: "No subscription auto-renewal",
  perMonth: true,
  popular:false
};

export const VIP_PLAN = {
  className:
    "  md:row-start-2 md:col-start-2 md:justify-self-start md:rounded-t-xl lg:rounded-none md:pt-[59px] lg:pt-0 order-4",
  subtext: "",
  priceStrikeThrough: "",
  label: "Mainboard + SME Board",
  gstLabel: true,
  featureHead: "For semi-pro/pro retail investor interested in mainboard stocks with no minimum investment requirement",
  featureList: [
    { icon: "/icons/check_only.svg", feature: "30+ Mainboard Stocks to buy (NSE + BSE)" },
    { icon: "/icons/check_only.svg", feature: "2-4 new stock picks every month" },
    { icon: "/icons/close_only.svg", feature: "Whatsapp Notifications on Action Calls" },
    { icon: "/icons/close_only.svg", feature: "Email Updates" },
    { icon: "/icons/close_only.svg", feature: "No SME board stock picks" },
    { icon: "/icons/close_only.svg", feature: "No AMA" },
  ],
  btnText: "Get Started",
  warnMessage: "No subscription auto-renewal",
  perMonth: true,
  btnVariant:ButtonVariant.primary,
  popular:true
};

export const PLAN = {
  free: FREE_PLAN,
  core: CORE_PLAN,
  advanced: ADVANCED_PLAN,
  vip: VIP_PLAN,
};
