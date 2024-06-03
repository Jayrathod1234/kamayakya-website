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

export type TGstLabel = {
  gstLabel: boolean;
};

export type TFeatures = {
  icon: string;
  feature: string;
};

export type TFeatureList = { featureList: Array<TFeatures> };

export type TPlanCardDesktop = {
  active?:boolean;
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
};

export type TPlan = {
  [k: string]: Array<TPlanResponse>;
};
