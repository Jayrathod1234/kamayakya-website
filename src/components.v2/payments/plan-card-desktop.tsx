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
import { PlanActiveLabel } from "./plan-active-label";
import { PlanTooltip } from "./plan-tooltip";
import { Star } from "lucide-react";

export const PlanCardHead = ({ plan, label }: TPlanCardHead) => {
  return (
    <div className=" flex justify-between flex-wrap">
      <p className=" uppercase text-lg font-semibold">{plan}</p>
      {label && (
        <div className=" px-3 py-[3px] border border-brand-300 bg-brand-100 text-3xs text-center text-brand-400 font-semibold uppercase rounded-3xl flex items-center justify-center">
          {label}
        </div>
      )}
    </div>
  );
};

export const PriceStrikeThrough = ({ price }: TPriceStrikeThrough) => {
  return (
    <h3 className=" text-md font-semibold text-gray-400 m-0">
      <span className=" inline-block text-2xs float-start mt-[2.5px]">{price ? "₹" : null}&zwj;</span>
      <span className="inline-block line-through font-medium">{price}</span>
    </h3>
  );
};
export const Price = ({ price, perMonth = false }: TPrice) => {
  return (
    <div className=" flex items-baseline">
      <h3 className="  text-display-sm font-semibold text-gray-800 m-0">
        <span className=" inline-block text-lg float-start mt-[2.5px]">₹</span>
        <span className="inline-block ">{price}</span>
      </h3>
      {perMonth && <p className=" ml-2 text-sm text-gray-400"> / month</p>}
    </div>
  );
};

export const SubText = ({ children }: TChildren) => {
  return <p className={` text-gray-700 text-sm font-semibold`}>{children}&zwj;</p>;
};

export const GstLabel = ({ gstLabel, tooltip, total, showAnually }: TGstLabel) => {
  return (
    <p className=" text-sm text-gray-400 flex items-center gap-2">
      {gstLabel ? (
        <span className=" flex items-center gap-x-2">
          <SubText>{showAnually} &zwj;</SubText>
          {/* <span className=" inline-block">Inclusive of 18% GST </span> */}
          {tooltip ? (
            <PlanTooltip
              price={tooltip?.price}
              saveText={tooltip?.saveText}
              strikePrice={tooltip?.strikePrice}
              gst={tooltip?.gst}
              total={total}
            >
              <div className=" flex justify-center items-center">
                <Image width={16} height={16} alt="info-icon" src="/icons/info-icon.svg" />
              </div>
            </PlanTooltip>
          ) : null}
        </span>
      ) : null}
      &zwj;
    </p>
  );
};

export const FeatureList = ({ featureList }: TFeatureList) => {
  return (
    <ul className=" m-0 flex flex-col gap-4">
      {featureList.map((feature) => (
        <li key={feature.feature} className=" flex items-start gap-2 m-0 ">
          <Image height={20} width={20} alt="check" src={feature.icon} />
          <p className=" text-sm text-gray-500">{feature.feature}</p>
        </li>
      ))}
    </ul>
  );
};

export const Warn = ({ children }: TChildren) => {
  return <p className=" text-sm text-gray-400 text-center h-10">{children}</p>;
};

export function PlanCardDesktop({
  active = false,
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
  ctaDisabled = false,
  className,
  handleClick,
  tooltip,
  total,
}: TPlanCardDesktop) {
  // max-h-[785px]
  return (
    <div
      className={`${
        popular
          ? " popular__card before:pointer-events-auto shadow-[inset_0px_-2px_0px_3px] shadow-brand-300 before:content-[''] before:h-full before:w-full before:absolute before:bg-transparent before:z-[-1] before:shadow-sm"
          : "border border-gray-150"
      }  max-w-[315px] grid grid-col-1 grid-rows-[240px_1fr_.2fr]  relative rounded-xl lg:rounded-none bg-white ${className}`}
    >
      {popular && (
        <div className=" flex flex-row items-center justify-center gap-x-[4px] px-2 py-[7px] rounded-t-[10px] bg-brand-300 text-white font-semibold absolute w-full lg:-top-[2.3rem] max-md:top-0 ">
          <Star size={16} fill="white" />
          {/* <svg
            className=" inline-block"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.35519 4.98686L7.65867 6.50366L8.17554 8.77202C8.20406 8.89515 8.19672 9.02429 8.15444 9.1431C8.11216 9.26192 8.03684 9.36509 7.938 9.43958C7.83917 9.51406 7.72124 9.55653 7.59912 9.56161C7.477 9.56669 7.35616 9.53415 7.25188 9.46811L5.348 8.25405L3.443 9.46811C3.33873 9.53377 3.21804 9.566 3.09613 9.56073C2.97422 9.55547 2.85654 9.51294 2.75791 9.43852C2.65927 9.3641 2.5841 9.2611 2.54185 9.1425C2.49959 9.02389 2.49216 8.89499 2.52047 8.77202L3.03923 6.50366L1.3427 4.98686C1.25045 4.90425 1.18373 4.7953 1.15088 4.67364C1.11802 4.55197 1.12049 4.42297 1.15798 4.30275C1.19546 4.18252 1.2663 4.07641 1.36164 3.99765C1.45698 3.91889 1.57261 3.87098 1.69407 3.85991L3.9184 3.67397L4.77647 1.52241C4.82291 1.40515 4.90196 1.30485 5.00356 1.23426C5.10517 1.16367 5.22473 1.12598 5.34706 1.12598C5.46939 1.12598 5.58896 1.16367 5.69056 1.23426C5.79217 1.30485 5.87121 1.40515 5.91766 1.52241L6.77535 3.67397L8.99967 3.85991C9.12138 3.87057 9.23734 3.91821 9.33303 3.99686C9.42872 4.07551 9.49988 4.18167 9.5376 4.30204C9.57532 4.42241 9.57791 4.55163 9.54506 4.67352C9.51221 4.79541 9.44538 4.90454 9.35293 4.98725L9.35519 4.98686Z"
              fill="white"
            />
          </svg> */}
          <p className=" text-md font-bold">Most Popular</p>
        </div>
      )}
      {/* {popular &&  <div className=" h-1 w-[calc(99%)] border-l-[1px] border-r-[1px] left-0 border-red-500 absolute bg-white"></div>} */}

      <div className=" p-7 row-start-1 flex flex-col  gap-y-[24px] h-[279px]">
        <PlanCardHead plan={plan} label={label} />

        <div className=" flex flex-col max-h-full justify-center mb-[2px] ">
          <div className=" mb-1">
            <PriceStrikeThrough price={priceStrikeThrough} />
            <div>
              <Price price={price} perMonth={perMonth} />
            </div>
          </div>

          <div className=" mb-[0.6rem]">
            <GstLabel showAnually={showAnually} gstLabel={gstLabel} tooltip={tooltip} total={total} />
          </div>
        </div>
        <div className=" flex items-center justify-center w-full relative">
          <div
            className={` h-[1px] w-full bg-gray-100 ${
              active && "bg-[radial-gradient(50%_50%_at_50%_50%,_#F98800_66.5%,_#FFEFDC_100%)]"
            } mt-auto relative`}
          >
            {active && (
              <div className=" flex items-center justify-center absolute -top-3 left-[28.5%] bg-white">
                <PlanActiveLabel />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-y-6 px-7 pb-10 row-start-2">
        <p className=" m-0 text-sm text-gray-700 ">{featureHead}</p>
        <FeatureList featureList={featureList} />
      </div>
      <div className=" px-7 pb-[18px] flex flex-col justify-start gap-3 row-start-3">
        <Button
          onClick={handleClick}
          disabled={ctaDisabled}
          variant={btnVariant}
          size={ButtonSize.lg}
          customStyle={`border disabled:bg-gray-100 disabled:border-gray-100 disabled:text-gray-300 disabled:opacity-1  ${
            btnVariant === ButtonVariant.primary ? "border-2 " : " border-brand-300"
          }  `}
        >
          <span className=" font-medium"> {btnText} </span>
        </Button>
        <Warn>{warnMessage}</Warn>
      </div>
    </div>
  );
}
