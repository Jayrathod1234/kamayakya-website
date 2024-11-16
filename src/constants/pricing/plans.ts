import { ButtonVariant } from "@/components.v2/button/button";
import { TPlanCardDesktop } from "@/types";
import { TFeatures, TTooltip } from "@/types/components/payments";

type TPlan = {
  className: string;
  subtext: string;
  label: string;
  paymentPageLabel:string;
  priceStrikeThrough: string;
  gstLabel: boolean;
  featureHead: string;
  featureList: Array<TFeatures>;
  btnText: string;
  warnMessage: string;
  popular: boolean;
  btnVariant: ButtonVariant;
  tooltip: TTooltip;
  perMonth: boolean;
};

export const FREE_PLAN: TPlan = {
  className: " md:row-start-1 md:justify-self-end order-1  lg:rounded-l-xl",
  subtext: "",
  label: "",
  paymentPageLabel:"",
  priceStrikeThrough: "1,500",
  gstLabel: false,
  featureHead:
    "Experience the potential of KamayaKya with 3 free stock picks and our proven track record – start your investment journey now!",
  featureList: [
    { icon: "/icons/check_only.svg", feature: "3 Free Stocks to Buy and Research Reports (NSE + BSE)" },
    { icon: "/icons/check_only.svg", feature: "Unlock Track Record" },
    { icon: "/icons/close_only.svg", feature: "No WhatsApp Notifications" },
    { icon: "/icons/close_only.svg", feature: "No Email Updates" },
    { icon: "/icons/close_only.svg", feature: "No Live Quarterly Interaction with KamayaKya research team" },
  ],
  btnText: "Get Started",
  warnMessage: "No credit card required. Start for free, pick a plan later.",
  perMonth: false,
  popular: false,
  btnVariant: ButtonVariant.secondary,
  tooltip: {
    "3months": {
      price: "",
      gst: "",
    },
  },
};

export const CORE_PLAN: TPlan = {
  className: " md:row-start-1 md:col-start-2 md:justify-self-start order-2",
  subtext: "",
  priceStrikeThrough: "1,100",
  paymentPageLabel:"CORE -  Main Board",
  label: "MAIN BOARD",
  gstLabel: true,
  featureHead:
    "Ideal for semi-pro and professional retail investors focused on Main Board stocks with flexible investment amounts. ",
  featureList: [
    {
      icon: "/icons/check_only.svg",
      feature: "30+ Main Board Stocks to Buy and Research Reports every year (NSE + BSE)",
    },
    { icon: "/icons/check_only.svg", feature: "2-4 new stock picks every month" },
    { icon: "/icons/check_only.svg", feature: "Regular Updates via WhatsApp" },
    { icon: "/icons/check_only.svg", feature: "Email Updates" },
    { icon: "/icons/close_only.svg", feature: "No SME board stock picks" },
    { icon: "/icons/close_only.svg", feature: "No Live Quarterly Interaction with KamayaKya research team" },
  ],
  btnText: "Get Started",
  warnMessage: "You're in control – no auto-renewal!",
  perMonth: true,
  popular: false,
  btnVariant: ButtonVariant.secondary,
  tooltip: {
    "3months": {
      price: "₹2796.6",
      gst: "₹503.4",
    },
    "1year": {
      strikePrice: "₹13,200",
      price: "₹8,474.6",
      gst: "₹1,525.4",
      saveText: "You will save ₹3,200 on this plan ",
    },
    "3year": {
      strikePrice: "₹39,600",
      price: "₹22,457.6",
      gst: "₹4,042.4",
      saveText: "You will save ₹13,100 on this plan ",
    },
  },
};

export const ADVANCED_PLAN: TPlan = {
  className: "  md:row-start-2 md:justify-self-end md:pt-[59px] lg:pt-0 order-3",
  subtext: "",
  priceStrikeThrough: "1,000",
  label: "SME BOARD",
  paymentPageLabel:"ADVANCED -  SME Board",
  gstLabel: true,
  featureHead:
    "Designed for long-term, high-risk, high-reward investors targeting high volatility stocks with a minimum investment of ₹1L per stock.",
  featureList: [
    { icon: "/icons/check_only.svg", feature: "10+ SME board Stocks to Buy and Research Reports every year (NSE+BSE)" },
    { icon: "/icons/check_only.svg", feature: "1-2 new stock picks every month" },
    { icon: "/icons/check_only.svg", feature: "Regular Updates via WhatsApp" },
    { icon: "/icons/check_only.svg", feature: "Email Updates" },
    { icon: "/icons/close_only.svg", feature: "No Main Board stock picks" },
    { icon: "/icons/close_only.svg", feature: "No Live Quarterly Interaction with KamayaKya research team" },
  ],
  btnText: "Get Started",
  warnMessage: "You're in control – no auto-renewal!",
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

export const VIP_PLAN: TPlan = {
  className:
    "  md:row-start-2 md:col-start-2 md:justify-self-start md:rounded-t-xl lg:rounded-none lg:rounded-br-xl md:pt-[59px] lg:pt-0 order-4",
  subtext: "",
  priceStrikeThrough: "1,667",
  label: "MAIN Board + SME Board",
  paymentPageLabel:"VIP -  Main Board & SME Board",
  gstLabel: true,
  featureHead:
    "Perfect for seasoned investors looking to diversify their portfolio across Main Board and SME stocks with comprehensive support and updates.",
  featureList: [
    {
      icon: "/icons/check_only.svg",
      feature: "30+ Main Board Stocks to Buy and Research Reports every year (NSE + BSE)",
    },
    { icon: "/icons/check_only.svg", feature: "10+ SME board stocks to buy every year" },
    { icon: "/icons/check_only.svg", feature: "3-5 new stock picks every month" },
    { icon: "/icons/check_only.svg", feature: "Regular Updates via WhatsApp" },
    { icon: "/icons/check_only.svg", feature: "Email Updates" },

    { icon: "/icons/check_only.svg", feature: "Live Quarterly Interaction with KamayaKya research team" },
  ],
  btnText: "Get Started",
  warnMessage: "You're in control – no auto-renewal!",
  perMonth: true,
  btnVariant: ButtonVariant.primary,
  popular: true,
  tooltip: {
    "3months": {
      price: "₹4,237.3",
      gst: "₹762.7",
    },
    "1year": {
      strikePrice: "₹20,004",
      price: "₹12,711.9",
      gst: "₹2,288.1",
      saveText: "You will save ₹5,004 on this plan  ",
    },
    "3year": {
      strikePrice: "₹60,012",
      price: "₹33,898.3",
      gst: "₹6,101.7",
      saveText: "You will save ₹20,012 on this plan  ",
    },
  },
};

export const PLAN = {
  free: FREE_PLAN,
  core: CORE_PLAN,
  advanced: ADVANCED_PLAN,
  vip: VIP_PLAN,
};
