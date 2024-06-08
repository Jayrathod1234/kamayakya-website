import { ButtonVariant } from "@/components.v2/button/button";

export const FREE_PLAN = {
  className: " md:row-start-1 md:justify-self-end order-1  lg:rounded-l-xl",
  subtext: "",
  label: "",
  priceStrikeThrough: "1500",
  gstLabel: false,
  featureHead:
    "Experience the potential of KamayaKya with 3 free stock recommendations and access to our track record – jumpstart your investment journey today!",
  featureList: [
    { icon: "/icons/check_only.svg", feature: "3 Free Stocks to buy (NSE + BSE)" },
    { icon: "/icons/check_only.svg", feature: "Unlock Track Record" },
    { icon: "/icons/close_only.svg", feature: "No Whatsapp Notifications" },
    { icon: "/icons/close_only.svg", feature: "No Email Updates" },
    { icon: "/icons/close_only.svg", feature: "No Ask me anything (AMA)" },
  ],
  btnText: "Get Started",
  warnMessage: "No credit card required.Start for free, pick a plan later.",
  perMonth: false,
  popular: false,
  btnVariant: ButtonVariant.secondary,
  tooltip: null,
};

export const CORE_PLAN = {
  className: " md:row-start-1 md:col-start-2 md:justify-self-start order-2",
  subtext: "",
  priceStrikeThrough: "₹1166.66",
  label: "MAINBOARD",
  gstLabel: true,
  featureHead:
    "Ideal for semi-pro and professional retail investors focused on mainboard stocks with flexible investment amounts. ",
  featureList: [
    { icon: "/icons/check_only.svg", feature: "30+ Mainboard Stocks to buy (NSE + BSE)" },
    { icon: "/icons/check_only.svg", feature: "2-4 new stock picks every month" },
    { icon: "/icons/close_only.svg", feature: "Whatsapp Notifications on Action Calls" },
    { icon: "/icons/close_only.svg", feature: "Email Updates" },
    { icon: "/icons/close_only.svg", feature: "No SME board stock picks" },
    { icon: "/icons/close_only.svg", feature: "No Ask me anything (AMA)" },
  ],
  btnText: "Get Started",
  warnMessage: "No subscription auto-renewal",
  perMonth: true,
  popular: false,
  btnVariant: ButtonVariant.secondary,
  tooltip: {
    "3months": {
      price: "₹2796.6",
      gst: "₹503.4",
    },
    "1year": {
      strikePrice: "₹13,999.92",
      price: "₹8,474.6",
      gst: "₹1,525.4",
      saveText: "You will save ₹3,999.92 on this plan ",
    },
    "3year": {
      strikePrice: "₹41,999.76",
      price: "₹22,457.6",
      gst: "₹4,042.4",
      saveText: "You will save ₹15,499.76 on this plan ",
    },
  },
};

export const ADVANCED_PLAN = {
  className: "  md:row-start-2 md:justify-self-end md:pt-[59px] lg:pt-0 order-3",
  subtext: "",
  priceStrikeThrough: "",
  label: "SME BOARD",
  gstLabel: true,
  featureHead:
    "Designed for long-term, high-risk, high-reward investors targeting high volatility stocks with a minimum investment of ₹1L per stock.",
  featureList: [
    { icon: "/icons/check_only.svg", feature: "Up to 10 SME board Stocks to buy (NSE+BSE)" },
    { icon: "/icons/check_only.svg", feature: "2-4 new stock picks every month" },
    { icon: "/icons/check_only.svg", feature: "Whatsapp Notifications on Action Calls" },
    { icon: "/icons/check_only.svg", feature: "Email Updates" },
    { icon: "/icons/close_only.svg", feature: "No Mainboard stock picks" },
    { icon: "/icons/close_only.svg", feature: "No Ask me anything (AMA)" },
  ],
  btnText: "Get Started",
  warnMessage: "No subscription auto-renewal",
  perMonth: true,
  popular: false,
  btnVariant: ButtonVariant.secondary,
  tooltip: {
    "1year": {
      price: "₹10,169.5",
      gst: "₹2,288.5",
    },
    "3year": {
      price: "₹27,118.6",
      gst: "₹4,881.4",
    },
  },
};

export const VIP_PLAN = {
  className:
    "  md:row-start-2 md:col-start-2 md:justify-self-start md:rounded-t-xl lg:rounded-none lg:rounded-br-xl md:pt-[59px] lg:pt-0 order-4",
  subtext: "",
  priceStrikeThrough: "1500",
  label: "Mainboard + SME Board",
  gstLabel: true,
  featureHead:
    "Perfect for seasoned investors looking to diversify their portfolio across mainboard and SME stocks with comprehensive support and updates.",
  featureList: [
    { icon: "/icons/check_only.svg", feature: "30+ Mainboard Stocks to buy (NSE + BSE)" },
    { icon: "/icons/check_only.svg", feature: "Up to 10 SME board stocks to buy" },
    { icon: "/icons/check_only.svg", feature: "2-4 new stock picks every month" },
    { icon: "/icons/check_only.svg", feature: "Whatsapp Notifications on Action Calls" },
    { icon: "/icons/check_only.svg", feature: "Email Updates" },

    { icon: "/icons/check_only.svg", feature: "Ask me anything (AMA)" },
  ],
  btnText: "Get Started",
  warnMessage: "No subscription auto-renewal",
  perMonth: true,
  btnVariant: ButtonVariant.primary,
  popular: true,
  tooltip: {
    "3months": {
      price: "₹4,237.3",
      gst: "₹762.7",
    },
    "1year": {
      strikePrice: "₹18,000",
      price: "₹12,711.9",
      gst: "₹2,288.1",
      saveText: "You will save ₹3000 on this plan  ",
    },
    "3year": {
      strikePrice: "₹54,000",
      price: "₹33,898.3",
      gst: "₹6,101.7",
      saveText: "You will save ₹14,000 on this plan  ",
    },
  },
};

export const PLAN = {
  free: FREE_PLAN,
  core: CORE_PLAN,
  advanced: ADVANCED_PLAN,
  vip: VIP_PLAN,
};
