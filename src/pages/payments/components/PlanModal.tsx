import { ButtonSize, ButtonVariant, Button } from "@/components.v2/button/button";
import { PlanCardMobile } from "@/components.v2/payments/plan-card-mobile";
import { PlansMobileTab } from "@/components.v2/payments/plans-mobile-tab";
import { Tabs, TabsVariant } from "@/components.v2/tabs";
import { DialogContent } from "@/components.v2/ui/dialog";
import AuthContext from "@/components/AuthContext";
import { useActivePlanContext } from "@/components/PlanContext";
import { PLAN } from "@/constants/pricing/plans";
import { IPaymentContext, usePaymentContext } from "@/contexts/PaymentContext";
import { formatPlans } from "@/lib/helper";
import { PLANS_URL } from "@/pages/api/URLs";
import { TPlan, TPlanName, TPlanResponse } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

export default function PlanModal({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { isLoggedIn } = useContext(AuthContext);
  const { activePlan } = useActivePlanContext();
  const [currentTab, setCurrentTab] = useState<"3months" | "1year" | "3year">("1year");
  const [currentPlanViewing, setCurrentPlanViewing] = useState("vip");
  const [plans, setPlans] = useState<TPlan | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const router = useRouter();
  const { setCurrentPlan } = usePaymentContext() as IPaymentContext;

  const tabOptions = [
    { label: "3 Months", value: "3months" },
    { label: "1 Year", value: "1year" },
    { label: "3 Years", value: "3year" },
  ];

  const handleLogin = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePlanProps = (plan: TPlanResponse) => {
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
    } else {
      if (planName === "free") {
        btnText = "Get Free Access";
      } else {
        btnText = "Get Started";
      }
    }
    const isNotThreeMonths = currentTab !== "3months";
    const isNotOneYear = currentTab !== "1year";
    const isAdvancedPlan = planName === "advanced";
    let priceStrikeThrough =
      isNotThreeMonths && (isAdvancedPlan ? isNotOneYear : true) ? PLAN[planName].priceStrikeThrough : "";

    return { ctaDisabled, btnText, planName, priceStrikeThrough };
  };

  const handlePlanSelect = (plan: string) => setCurrentPlanViewing(plan);

  let handlePlanClick = (planId: string, planName: string, planAmount: number) => {
    if (!isLoggedIn) {
      handleLogin();
      return;
    }
    setCurrentPlan((prev) => ({
      ...prev,
      planId: planId as string,
      planName: planName as string,
      planDuration:currentTab
    }));
    setOpen(false);
  };

  const fetchPlans = async () => {
    try {
      let token;
      if (isLoggedIn) {
        token = localStorage.getItem("refresh");
      }
      const response = await axios.get(PLANS_URL);
      const formattedPlans = formatPlans(response.data);
      console.log("foramttedPlans",formattedPlans)
      setPlans(formattedPlans);
    } catch (e) {}
  };

  useEffect(() => {
    fetchPlans();
  }, [isLoggedIn]);

  return (
    <DialogContent className=" open_sans flex flex-col !rounded-[20px] overflow-hidden">
      <div className="  max-w-[540px] mx-auto">
        <p className=" text-xl text-[#101828] font-semibold">Choose Your Plan</p>
        <div className=" max-h-[520px] overflow-y-scroll">
          <div className=" relative flex justify-center mb-14 md:mb-0 pt-10 md:pb-14 pb-6">
            <div className="relative">
              {/* <Image
            className=" block md:hidden absolute -rotate-2 md:rotate-0 -right-12  md:-right-16 -top-12  bg-blend-multiply"
            height={58}
            width={98}
            src={"/save_33.png"}
            alt="save-33%"
          /> */}
              <img
                className=" block -right-5 -top-8 absolute bg-blend-multiply"
                height={40.75}
                width={76}
                src={"/save_33.png"}
                alt="save-33%"
              />
              <Tabs
                activeValue={currentTab}
                setSelectedOption={setCurrentTab as Dispatch<SetStateAction<string>>}
                defaultOption={currentTab}
                options={tabOptions}
                variant={TabsVariant.md}
              />
              <img className=" absolute left-[35%] top-10" height={28} width={94} src={"/save_25.png"} alt="save-25%" />
            </div>
          </div>
          <div className=" flex w-full min-h-[82px] gap-x-2 ">
            <PlansMobileTab
              onClick={() => handlePlanSelect("free")}
              plan="FREE TRIAL"
              selected={currentPlanViewing === "free"}
            />
            <PlansMobileTab
              onClick={() => handlePlanSelect("core")}
              plan="CORE"
              features={["Main Board"]}
              selected={currentPlanViewing === "core"}
            />
            {/* {currentTab !== "3months" && ( */}
              <PlansMobileTab
                onClick={() => handlePlanSelect("advanced")}
                plan="ADVANCED"
                features={["SME Board"]}
                selected={currentPlanViewing === "advanced"}
              />
            {/* )} */}
            <PlansMobileTab
              onClick={() => handlePlanSelect("vip")}
              plan="VIP"
              features={["Main Board", "SME Board"]}
              selected={currentPlanViewing === "vip"}
              popular
            />
          </div>
          {plans && plans[currentTab] ? (
            <>
              {plans[currentTab].map((plan: TPlanResponse) => {
                const { planName, btnText, ctaDisabled, priceStrikeThrough } = handlePlanProps(plan);
                return (
                  plan.name.toLowerCase() === currentPlanViewing && (
                    <>
                      <PlanCardMobile
                        className=" pb-16"
                        hideButton
                        planName={planName}
                        plan={plan}
                        currentPlanViewing={currentPlanViewing}
                        activePlan={activePlan}
                        ctaDisabled={ctaDisabled}
                        btnText={btnText}
                        currentTab={currentTab}
                        priceStrikeThrough={priceStrikeThrough}
                        handleClick={() => handlePlanClick(plan.id, plan.name, plan.amount)}
                      />
                      <div className=" p-4 pt-0 fixed bottom-0 w-full left-0 bg-white">
                        <Button
                          onClick={() => handlePlanClick(plan.id, plan.name, plan.amount)}
                          disabled={ctaDisabled}
                          className=" w-full text-center"
                          variant={PLAN[planName].btnVariant ?? ButtonVariant.secondary}
                          size={ButtonSize.lg}
                        >
                          {btnText}
                        </Button>
                        <p className=" mt-3 text-center text-gray-400 text-sm">{PLAN[planName].warnMessage}</p>
                      </div>
                    </>
                  )
                );
              })}
            </>
          ) : null}
        </div>
      </div>
    </DialogContent>
  );
}
