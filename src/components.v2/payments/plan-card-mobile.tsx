import { PLAN } from "@/constants/pricing/plans";
import { PlanActiveLabel } from "./plan-active-label";
import Image from "next/image";
import { Button } from "../button";
import { ButtonSize, ButtonVariant } from "../button/button";
import { FeatureList, GstLabel } from "./plan-card-desktop";
import { TPlanName, TPlanResponse } from "@/types";
import { TActivePlan, TPlanDuration } from "@/types/components/payments";
import { cn } from "@/lib/utils";

type TPlanCardMobile = {
  planName: TPlanName;
  plan: TPlanResponse;
  currentPlanViewing: string;
  activePlan: TActivePlan;
  ctaDisabled: boolean;
  btnText: string;
  currentTab: TPlanDuration;
  priceStrikeThrough: string;
  handleClick: () => void;
  hideButton?: boolean;
  className?: string;
};

export function PlanCardMobile({
  planName,
  plan,
  currentPlanViewing,
  activePlan,
  ctaDisabled,
  btnText,
  currentTab,
  priceStrikeThrough,
  handleClick,
  hideButton = false,
  className,
}: TPlanCardMobile) {

  if (currentTab == "3months" && currentPlanViewing === "advanced") {
    return (
      <p className=" text-center py-4 bg-red-400">
        Our Advanced Plan is crafted for those who think long-term and is only available in 1-Year and 3-Year options.
        Explore the benefits and choose the term that fits your goals!
      </p>
    );
  }
  return (
    <div
      className={cn(
        "rounded-b-xl border-x bg-white border-x-gray-150 border-none border-b-gray-150 bg-[rgba(252,252,253,1)]",
        className
      )}
    >
      <div className=" px-4 py-5">
        <div>
          <p className=" text-md text-gray-400 line-through">{priceStrikeThrough ? "₹" + priceStrikeThrough : null}</p>
          <span className=" text-display-md font-semibold">
            ₹{new Intl.NumberFormat("en-IN").format(parseFloat(plan.perMonth.toFixed(2)))}
          </span>
          <span className=" text-gray-400 text-2xs"> / month</span>

          {PLAN[planName].gstLabel && (
            <div className=" mt-[6px]">
              <GstLabel
                showAnually={
                  planName !== "free"
                    ? plan.duration_in_days > 365
                      ? `Billed ₹${new Intl.NumberFormat("en-IN").format(
                          parseFloat(plan.amount.toFixed(2))
                        )} for 3 years `
                      : plan.duration_in_days === 365
                      ? `Billed ₹${new Intl.NumberFormat("en-IN").format(plan.amount)} annually`
                      : `Billed ₹${new Intl.NumberFormat("en-IN").format(plan.amount)} for 3 months`
                    : ""
                }
                gstLabel={PLAN[planName].gstLabel}
                tooltip={PLAN[planName].tooltip ? PLAN[planName].tooltip[currentTab] : null}
                total={"₹" + plan.amount}
              />
            </div>
          )}
        </div>
        {/* line */}
        <div className=" my-5">
          <div className=" relative flex items-center justify-center">
            {activePlan.plan.toLowerCase() === currentPlanViewing.toLowerCase() && <PlanActiveLabel />}
            <div
              className={` h-[1px] w-full bg-[#EDF0F5] absolute z-[0] ${
                activePlan.plan.toLowerCase() === currentPlanViewing.toLowerCase() &&
                "bg-[radial-gradient(50%_50%_at_50%_50%,_#F98800_66.5%,_#FFEFDC_100%)]"
              }`}
            ></div>
          </div>
        </div>
        <div>
          <p className=" text-sm text-gray-800">{PLAN[planName].featureHead}</p>
          <div className=" mt-4">
            {" "}
            <FeatureList featureList={PLAN[planName].featureList} />{" "}
          </div>
        </div>
      </div>
      {hideButton ? null : (
        <div className=" p-4 pt-0">
          <Button
            onClick={handleClick}
            disabled={ctaDisabled}
            className=" w-full text-center"
            variant={PLAN[planName].btnVariant ?? ButtonVariant.secondary}
            size={ButtonSize.lg}
          >
            {btnText}
          </Button>
          <p className=" mt-3 text-center text-gray-400 text-sm">{PLAN[planName].warnMessage}</p>
        </div>
      )}
    </div>
  );
}

{
  /* <div className="rounded-b-xl border-x border-x-gray-150 border-none border-b-gray-150 bg-[rgba(252,252,253,1)]">
  <div className=" px-4 py-5">
    <div>
      <p className=" text-md text-gray-400 line-through">{PLAN[planName].priceStrikeThrough}</p>
      <span className=" text-display-md font-semibold">₹{plan.perMonth.toFixed(2)}</span>
      <span className=" text-gray-400 text-2xs"> / month</span>
      <p className=" text-sm font-medium text-gray-800">
        {planName !== "free"
          ? plan.duration_in_days > 365
            ? `Billed ₹${plan.amount.toFixed(2)} for 3 years `
            : plan.duration_in_days === 365
            ? `Billed ₹${plan.amount} annually`
            : `Billed ₹${plan.amount} for 3 months`
          : ""}
      </p>
      <p className="text-sm  text-gray-500">Inclusive of 18% GST</p>
    </div>
  
    <div className=" my-5">
      <div className=" relative flex items-center justify-center">
        {activePlan.plan.toLowerCase() === currentPlanViewing.toLowerCase() && <PlanActiveLabel />}
        <div
          className={` h-[1px] w-full bg-[#EDF0F5] absolute z-[0] ${
            activePlan.plan.toLowerCase() === currentPlanViewing.toLowerCase() &&
            "bg-[radial-gradient(50%_50%_at_50%_50%,_#F98800_66.5%,_#FFEFDC_100%)]"
          }`}
        ></div>
      </div>
    </div>
    <div>
      <p className=" text-sm text-gray-800">{PLAN[planName].featureHead}</p>
      <ul className=" mt-4 flex flex-col gap-4">
        {PLAN[planName].featureList.map((feature) => (
          <li className=" flex gap-2 items-center">
            <Image height={16} width={16} src={feature.icon} alt="check" />
            <p className=" text-sm text-gray-500">{feature.feature}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
  <div className=" p-4 pt-0">
    <Button
      disabled={ctaDisabled}
      className=" w-full text-center"
      variant={ButtonVariant.primary}
      size={ButtonSize.lg}
    >
      {btnText}
    </Button>
    <p className=" mt-3 text-center text-gray-400 text-sm">{PLAN[planName].warnMessage}</p>
  </div>
  </div> */
}
