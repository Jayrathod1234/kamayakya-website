import Image from "next/image";
import React from "react";
import { Button } from "../button";
import { ButtonSize, ButtonVariant } from "../button/button";
import {
  TChildren,
  TFeatureList,
  TGstLabel,
  TPlanCardDesktop,
  TPlanCardHead,
  TPrice,
  TPriceStrikeThrough,
} from "@/types";

const PlanCardHead = ({ plan, label }: TPlanCardHead) => {
  return (
    <div className=" flex justify-between">
      <p className=" uppercase text-lg font-semibold">{plan}</p>
      {label && (
        <div className=" px-3 py-[3px] border border-brand-300 bg-brand-100 text-3xs text-center text-brand-400 font-semibold uppercase rounded-3xl flex items-center justify-center">
          {label}
        </div>
      )}
    </div>
  );
};

const PriceStrikeThrough = ({ price }: TPriceStrikeThrough) => {
  return (
    <h3 className=" text-lg font-semibold text-gray-400 m-0">
      <span className=" inline-block text-2xs float-start mt-[2.5px]">{price ? "₹" : null}&zwj;</span>
      <span className="inline-block line-through font-medium">{price}</span>
    </h3>
  );
};
const Price = ({ price, perMonth = false }: TPrice) => {
  return (
    <div className=" flex items-baseline">
      <h3 className=" text-display-md font-semibold text-gray-800 m-0">
        <span className=" inline-block text-lg float-start mt-[2.5px]">₹</span>
        <span className="inline-block ">{price}</span>
      </h3>
      {perMonth && <p className=" ml-2 text-sm text-gray-400"> / month</p>}
    </div>
  );
};

const SubText = ({ children }: TChildren) => {
  return <p className={` text-gray-700 text-sm font-semibold`}>{children}&zwj;</p>;
};

const GstLabel = ({ gstLabel }: TGstLabel) => {
  return (
    <p className=" text-sm text-gray-400 flex items-center gap-2">
      {gstLabel ? (
        <>
          Inclusive of 18% GST{" "}
          <span>
            <Image width={16} height={16} alt="info-icon" src="/icons/info-icon.svg" />
          </span>
        </>
      ) : null}
      &zwj;
    </p>
  );
};

const FeatureList = ({ featureList }: TFeatureList) => {
  return (
    <ul className=" m-0">
      {featureList.map((feature) => (
        <li key={feature.feature} className=" flex items-start gap-2 ">
          <Image height={20} width={20} alt="check" src={feature.icon} />
          <p className=" text-sm text-gray-500">{feature.feature}</p>
        </li>
      ))}
    </ul>
  );
};

const Warn = ({ children }: TChildren) => {
  return <p className=" text-sm text-gray-400 text-center h-10">{children}</p>;
};

export function PlanCardDesktop({
  plan,
  price,
  priceStrikeThrough,
  showAnually,
  label,
  subtext,
  gstLabel,
  featureHead,
  featureList,
  btnText,
  warnMessage,
  perMonth = false,
  popular = false,
  btnVariant = ButtonVariant.secondary,
  className,
}: TPlanCardDesktop) {
  return (
    <div
      className={`${
        popular
          ? "before:pointer-events-auto shadow-[inset_0px_0px_0px_3px] shadow-brand-300 before:content-[''] before:h-full before:w-full before:absolute before:bg-transparent before:z-[-1] before:shadow-sm"
          : "border border-gray-150"
      } z-20 max-w-[315px] grid grid-col-1 grid-rows-[279px_1fr_.2fr] max-h-[785px] relative ${className}`}
    >
      {popular && (
        <div className=" flex flex-row items-center justify-center px-2 py-[7px] rounded-t-lg bg-brand-300 text-white font-semibold absolute w-full lg:-top-8 max-md:top-0 ">
          <p className=" text-2xs">Most popular</p>
        </div>
      )}

      <div className=" p-7 row-start-1 flex flex-col  gap-y-8 h-[279px]">
        <PlanCardHead plan={plan} label={label} />

        <div className=" flex flex-col max-h-full justify-center flex-1 ">
          <div className=" mb-1">
            <PriceStrikeThrough price={priceStrikeThrough} />
            <div>
              <Price price={price} perMonth={perMonth} />
            </div>
          </div>
          <SubText>{showAnually} &zwj;</SubText>
          <div className=" mt-2">
            <GstLabel gstLabel={gstLabel} />
          </div>
        </div>
        <div className=" h-[1px] w-full bg-gray-100 mt-auto"></div>
      </div>
      <div className=" flex flex-col gap-y-7 px-7  pb-14 row-start-2">
        <p className=" m-0 text-sm text-gray-700">{featureHead}</p>
        <FeatureList featureList={featureList} />
      </div>
      <div className=" px-7 pb-[18px] flex flex-col justify-start gap-3 row-start-3">
        <Button
        
          variant={btnVariant}
          size={ButtonSize.lg}
          customStyle={`border border-brand-300 ${
            btnVariant === ButtonVariant.primary ? "border-2 " : ""
          }  `}
        >
          <span className=" font-medium"> {btnText} </span>
        </Button>
        <Warn>{warnMessage}</Warn>
      </div>
    </div>
  );
}
