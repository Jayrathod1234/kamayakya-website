import { ButtonVariant } from "@/components.v2/button/button";
import { TPlanResponse } from "../apiResponseData";

export type TPlanCardHead = {
  plan: string;
  label?: string;
};

export type TPriceStrikeThrough = {
  price: string;
};

export type TPrice = TPriceStrikeThrough & {
  perMonth: boolean;
};

export type TFeatures = {
  icon: string;
  feature: string;
};

export type TFeatureList = { featureList: Array<TFeatures> };

export type TPlantooltip = { price: string; strikePrice?: string; saveText?: string; gst: string; total?: string };

export type TTooltip = {
  "3months"?: TPlantooltip;
  "1year"?: TPlantooltip;
  "3year"?: TPlantooltip;
};

export type TGstLabel = {
  gstLabel: boolean;
  total: string;
  tooltip: TPlantooltip | undefined | null;
};

export type TPlanCardDesktop = {
  total: string;
  active?: boolean;
  plan: string;
  price: string;
  priceStrikeThrough: string;
  showAnually: string;
  label: string;
  subtext: string;
  gstLabel: boolean;
  featureHead: string;
  featureList: Array<TFeatures>;
  btnText: string;
  warnMessage: string;
  perMonth?: boolean;
  popular?: boolean;
  btnVariant?: ButtonVariant;
  className?: string;
  ctaDisabled?: boolean;
  handleClick: () => void;
  tooltip?: TPlantooltip | null;
};

export type TPlan = {
  [k: string]: Array<TPlanResponse>;
};

export type TContactOptionCard = {
  className?: string;
  label: string;
  value: string;
  icon: React.ReactNode;
};

export type TPlanDuration = "3months" | "1year" | "3year";

export type TActivePlan = { id: string; plan: string; start_date: string; end_date: string; amount_paid: number; is_active: boolean; }
