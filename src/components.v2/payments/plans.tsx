import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Button, ButtonSize, ButtonVariant } from "../button/button";
import { Tabs, TabsVariant } from "../tabs";
import { PlanCardDesktop } from "./plan-card-desktop";
import { PlansMobileTab } from "./plans-mobile-tab";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components.v2/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import axios from "axios";
import { PLANS_URL } from "@/pages/api/URLs";
import AuthContext from "@/components/AuthContext";
import { PLAN } from "@/constants/pricing/plans";
import { TPlan, TPlanName, TPlanResponse } from "@/types";
import { useActivePlanContext } from "@/components/PlanContext";
import { PlanActiveLabel } from "./plan-active-label";
export function Plans() {
  const { isLoggedIn } = useContext(AuthContext);
  const { activePlan } = useActivePlanContext();
  const [currentTab, setCurrentTab] = useState("1year");
  const [currentPlanViewing, setCurrentPlanViewing] = useState("vip");
  const [plans, setPlans] = useState<TPlan | null>(null);
  const tabOptions = [
    { label: "3 months", value: "3months" },
    { label: "1 years", value: "1year" },
    { label: "3 years", value: "3year" },
  ];

  const formatPlans = (data: Array<TPlanResponse>) => {
    let plans = data.reduce(
      (accPlan: TPlan, currPlan) => {
        if (currPlan.duration_in_days === 90) {
          currPlan = { ...currPlan, perMonth: currPlan.amount / 3 };
          return { ...accPlan, "3months": [...accPlan["3months"], currPlan] };
        }
        if (currPlan.duration_in_days === 365) {
          currPlan = { ...currPlan, perMonth: currPlan.amount / 12 };
          return { ...accPlan, "1year": [...accPlan["1year"], currPlan] };
        }
        if (currPlan.duration_in_days === 1095) {
          currPlan = { ...currPlan, perMonth: currPlan.amount / 36 };
          return { ...accPlan, "3year": [...accPlan["3year"], currPlan] };
        }
        if (!currPlan.duration_in_days) {
          currPlan = { ...currPlan, perMonth: 0 };
          return {
            ...accPlan,
            "3months": [...accPlan["3months"], currPlan],
            "1year": [...accPlan["1year"], currPlan],
            "3year": [...accPlan["3year"], currPlan],
          };
        }
        return accPlan;
      },
      { "3months": [], "1year": [], "3year": [] }
    );

    return plans;
  };

  const handlePlanSelect = (plan: string) => setCurrentPlanViewing(plan);

  const fetchPlans = async () => {
    try {
      if (isLoggedIn) {
        const token = localStorage.getItem("refresh");
        const response = await axios.get(PLANS_URL, {
          headers: {
            Authorization: "token " + token,
          },
        });
        const formattedPlans = formatPlans(response.data);
        setPlans(formattedPlans);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchPlans();
  }, [isLoggedIn]);

  return (
    <div>
      <div className=" relative flex justify-center mb-12 pt-10 md:pb-20 pb-6">
      <Image className=" block lg:hidden absolute -rotate-12  right-[20%] md:right-[25%] lg:right-[30%] top-[4%] bg-blend-multiply" height={58} width={98} src={"/tab_save_33.svg"} alt="save-33%"/>
        <Image className=" hidden lg:block absolute right-[-10%] lg:right-[30%] top-[5%] bg-blend-multiply" height={59} width={129} src={"/tab_save_33.svg"} alt="save-33%"/>
        <Tabs setSelectedOption={setCurrentTab} defaultOption="1year" options={tabOptions} variant={TabsVariant.md} />
        <Image className=" absolute bottom-[-20%] right-[33.5%]  sm:right-[41.5%] md:right-[43.5%] lg:right-[45%] md:bottom-[20%] bg-blend-multiply" height={51} width={88} src={"/tab_save_25.svg"} alt="save-25%"/>
      </div>
      <div>
        <div className=" md:hidden">
          <div className=" flex w-full min-h-[82px]">
            <PlansMobileTab
              onClick={() => handlePlanSelect("free")}
              plan="FREE TRIAL"
              selected={currentPlanViewing === "free"}
            />
            <PlansMobileTab
              onClick={() => handlePlanSelect("core")}
              plan="CORE"
              features={["SME Board"]}
              selected={currentPlanViewing === "core"}
            />
            {currentTab !== "3months" && (
              <PlansMobileTab
                onClick={() => handlePlanSelect("advanced")}
                plan="ADVANCED"
                features={["Mainboard"]}
                selected={currentPlanViewing === "advanced"}
              />
            )}
            <PlansMobileTab
              onClick={() => handlePlanSelect("vip")}
              plan="VIP"
              features={["SME Board", "Mainboard"]}
              selected={currentPlanViewing === "vip"}
              popular
            />
          </div>
          {plans && plans[currentTab] ? (
            <>
              {plans[currentTab].map((plan: TPlanResponse) => {
                const planName = plan.name.toLowerCase() as TPlanName;
                let btnText = "";
                let ctaDisabled = false;
                if (isLoggedIn) {
                  if (activePlan.plan.toLowerCase() === "free") {
                    btnText = `Upgrade to ${plan.name.toUpperCase()}`;
                  }
                  if (activePlan.plan.toLowerCase() === "core") {
                    if (plan.name.toLowerCase() === "core") {
                      btnText = `Renew Membership`;
                    } else if (plan.name.toLowerCase() === "advanced") {
                      btnText = `Change Plan`;
                    } else if (plan.name.toLowerCase() === "vip") {
                      btnText = `Upgrade to VIP`;
                    }
                  }
                  if (activePlan.plan.toLowerCase() === "advanced") {
                    if (plan.name.toLowerCase() === "core") {
                      btnText = `Change Plan`;
                    } else if (plan.name.toLowerCase() === "advanced") {
                      btnText = `Renew Membership`;
                    } else if (plan.name.toLowerCase() === "vip") {
                      btnText = `Upgrade to VIP`;
                    }
                  }
                  if (activePlan.plan.toLowerCase() === "vip") {
                    if (plan.name.toLowerCase() === "advanced" || plan.name.toLowerCase() === "core") {
                      btnText = `Change Plan`;
                    } else if (plan.name.toLowerCase() === "vip") {
                      btnText = `Renew Membership`;
                    }
                  }
                  if (activePlan.is_active) {
                    if (plan.name.toLowerCase() === "free") {
                      btnText = "Get Free Access";
                      ctaDisabled = true;
                    }
                  }
                }
                return (
                  plan.name.toLowerCase() === currentPlanViewing && (
                    <div
                      className={` rounded-b-xl border-x border-x-gray-150 border-b border-b-gray-150 ${
                        currentPlanViewing === "vip" && "shadow-[0px_0px_0px_3px_#75CDC5]"
                      }`}
                    >
                      <div className=" px-4 py-5">
                        <div>
                          <p className=" text-md text-gray-400 line-through"></p>
                          <span className=" text-display-md font-semibold">₹{plan.perMonth.toFixed(2)}</span>
                          <span className=" text-gray-400 text-2xs"> / month</span>
                          <p className=" text-sm font-medium text-gray-800">
                            {plan.duration_in_days > 365
                              ? `Pay ₹${(plan.amount / 12).toFixed(2)} annually`
                              : plan.duration_in_days === 365
                              ? `Pay ₹${plan.amount} annually`
                              : ""}{" "}
                          </p>
                          <p className="text-sm  text-gray-500">Inclusive of 18% GST</p>
                        </div>
                        {/* line */}
                        <div className=" my-5">
                          <div className=" relative flex items-center justify-center">
                          {activePlan.plan.toLowerCase() === currentPlanViewing.toLowerCase() && (
                              // <div className=" flex items-center justify-center bg-white">
                                <PlanActiveLabel />
                              // </div>
                            )}
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
                          customStyle=" w-full text-center"
                          variant={ButtonVariant.primary}
                          size={ButtonSize.lg}
                        >
                          {btnText}
                        </Button>
                        <p className=" mt-3 text-center text-gray-400 text-sm">No subscription auto-renewal</p>
                      </div>
                    </div>
                    // <PlanCardDesktop
                    //   className={PLAN[planName].className}
                    //   subtext={""}
                    //   plan={plan.name}
                    //   price={plan.perMonth.toFixed(2)}
                    //   priceStrikeThrough=""
                    //   showAnually={
                    //     plan.duration_in_days > 365
                    //       ? `Pay ₹${(plan.amount / 12).toFixed(2)} annually`
                    //       : plan.duration_in_days === 365
                    //       ? `Pay ₹${plan.amount} annually`
                    //       : ""
                    //   }
                    //   label={PLAN[planName].label}
                    //   gstLabel={PLAN[planName].gstLabel}
                    //   featureHead={PLAN[planName].featureHead}
                    //   featureList={PLAN[planName].featureList}
                    //   btnText={btnText}
                    //   warnMessage="No credit card required.Start for free, pick a plan later."
                    //   perMonth={PLAN[planName].perMonth}
                    //   popular={PLAN[planName].popular}
                    //   ctaDisabled={ctaDisabled}
                    // />
                  )
                );
              })}
            </>
          ) : null}
        </div>

        <div className="hidden md:grid md:grid-cols-2 md:grid-rows-2 md:gap-8 lg:flex lg:gap-0 justify-center">
          {plans && plans[currentTab] ? (
            <>
              {plans[currentTab].map((plan: TPlanResponse) => {
                const planName = plan.name.toLowerCase() as TPlanName;
                let btnText = "";
                let ctaDisabled = false;
                if (isLoggedIn) {
                  if (activePlan.plan.toLowerCase() === "free") {
                    btnText = `Upgrade to ${plan.name.toUpperCase()}`;
                  }
                  if (activePlan.plan.toLowerCase() === "core") {
                    if (plan.name.toLowerCase() === "core") {
                      btnText = `Renew Membership`;
                    } else if (plan.name.toLowerCase() === "advanced") {
                      btnText = `Change Plan`;
                    } else if (plan.name.toLowerCase() === "vip") {
                      btnText = `Upgrade to VIP`;
                    }
                  }
                  if (activePlan.plan.toLowerCase() === "advanced") {
                    if (plan.name.toLowerCase() === "core") {
                      btnText = `Change Plan`;
                    } else if (plan.name.toLowerCase() === "advanced") {
                      btnText = `Renew Membership`;
                    } else if (plan.name.toLowerCase() === "vip") {
                      btnText = `Upgrade to VIP`;
                    }
                  }
                  if (activePlan.plan.toLowerCase() === "vip") {
                    if (plan.name.toLowerCase() === "advanced" || plan.name.toLowerCase() === "core") {
                      btnText = `Change Plan`;
                    } else if (plan.name.toLowerCase() === "vip") {
                      btnText = `Renew Membership`;
                    }
                  }
                  if (activePlan.is_active) {
                    if (plan.name.toLowerCase() === "free") {
                      btnText = "Get Free Access";
                      ctaDisabled = true;
                    }
                  }
                }
                return (
                  <PlanCardDesktop
                    active={activePlan.plan === plan.name}
                    className={PLAN[planName].className + `${currentTab === "3months" && plan.name === "vip" ? " md:!col-start-1 md:col-span-full md:justify-self-center":""}`}
                    subtext={""}
                    plan={plan.name}
                    price={plan.perMonth.toFixed(2)}
                    priceStrikeThrough=""
                    showAnually={
                      plan.duration_in_days > 365
                        ? `Pay ₹${(plan.amount / 12).toFixed(2)} annually`
                        : plan.duration_in_days === 365
                        ? `Pay ₹${plan.amount} annually`
                        : ""
                    }
                    label={PLAN[planName].label}
                    gstLabel={PLAN[planName].gstLabel}
                    featureHead={PLAN[planName].featureHead}
                    featureList={PLAN[planName].featureList}
                    btnText={btnText}
                    warnMessage="No credit card required.Start for free, pick a plan later."
                    perMonth={PLAN[planName].perMonth}
                    popular={PLAN[planName].popular}
                    ctaDisabled={ctaDisabled}
                    btnVariant={PLAN[planName].btnVariant ?? ButtonVariant.secondary}
                  />
                );
              })}
            </>
          ) : null}
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
                <TooltipArrow className=" fill-black" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
