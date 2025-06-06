import Image from "next/image";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Button, ButtonSize, ButtonVariant } from "../button/button";
import { Tabs, TabsVariant } from "../tabs";
import { PlanCardDesktop, PriceStrikeThrough } from "./plan-card-desktop";
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
import { Modal } from "@nextui-org/react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Login from "@/components/Login";
import { useRouter } from "next/router";
import { formatPlans } from "@/lib/helper";
import { PlanCardMobile } from "./plan-card-mobile";
import { getMixPanelClient } from "@/externals/mixpanel";

// ${
//   currentPlanViewing === "vip" && "shadow-[0px_0px_0px_3px_#75CDC5]"
// }

export function PlansSection() {
  const { isLoggedIn,showLoginModal,setShowLoginModal } = useContext(AuthContext);
  const { activePlan } = useActivePlanContext();
  const [currentTab, setCurrentTab] = useState<"3months" | "1year" | "3year">("1year");
  const [currentPlanViewing, setCurrentPlanViewing] = useState("vip");
  const [plans, setPlans] = useState<TPlan | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const router = useRouter();
  const tabOptions = [
    { label: "3 Months", value: "3months" },
    { label: "1 Year", value: "1year" },
    // { label: "3 Years", value: "3year" },
  ];

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
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
    const mp = getMixPanelClient();
    if (!isLoggedIn) {
      if (planName.toLowerCase() === "free") {
        mp.track("getfreeaccess_clicked", {
          page: "Pricing_page",
        });
      } else {
        mp.track("getstarted_clicked", {
          page: "Pricing_page",
        });
      }

      handleLogin();
      return;
    }

    mp.track("planpurchase_buttonclicked", {
      duration: currentTab,
      action_type:
        activePlan.plan === "core" || activePlan.plan === "advanced" || activePlan.plan === "vip" ? "Upgrade" : "New",
      planname: planName,
      amount: planAmount,
    });
    sessionStorage.setItem("planId", planId);
    sessionStorage.setItem("planName", planName);
    sessionStorage.setItem("planDuration", currentTab);
    router.push({ pathname: "/payments", query: { planId, planName } }, "/payments");
  };

  const fetchPlans = async () => {
    try {
      let token;
      if (isLoggedIn) {
        token = localStorage.getItem("refresh");
      }
      const response = await axios.get(PLANS_URL);
      const formattedPlans = formatPlans(response.data);
      // console.log("FORMATTED PLANS",formattedPlans)
      setPlans(formattedPlans);
    } catch (e) {}
  };

  useEffect(() => {
    fetchPlans();
  }, [isLoggedIn]);

  return (
    <div>
      <div className=" relative flex justify-center mb-14 md:mb-0 pt-10 md:pb-14 pb-6">
        <div className="relative">
          
          {/* <Image
            className=" block -right-5 -top-8 absolute bg-blend-multiply"
            height={40.75}
            width={76}
            src={"/save_33.png"}
            alt="save-33%"
          /> */}
          <Tabs
            activeValue={currentTab}
            setSelectedOption={setCurrentTab as Dispatch<SetStateAction<string>>}
            defaultOption={currentTab}
            options={tabOptions}
            variant={TabsVariant.md}
          />
          {/* <Image className=" absolute left-[35%] top-10" height={28} width={94} src={"/save_25.png"} alt="save-25%" /> */}
        </div>
      </div>
      <div>
        <div className=" md:hidden max-w-[540px] mx-auto">
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
                    <PlanCardMobile
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
                  )
                );
              })}
            </>
          ) : null}
        </div>

        <div className="hidden md:grid md:grid-cols-2 md:grid-rows-2 md:gap-8 lg:flex lg:gap-y-8 lg:gap-x-0 flex-wrap justify-center">
          {plans && plans[currentTab] ? (
            <>
              {plans[currentTab].map((plan: TPlanResponse) => {
                const { btnText, ctaDisabled, planName, priceStrikeThrough } = handlePlanProps(plan);
                // if(currentTab === "3months" && planName === "advanced") return
                return (
                  <PlanCardDesktop
                    active={activePlan.plan === plan.name}
                    className={
                      PLAN[planName].className +
                      `${
                        " "
                        // currentTab === "3months" && plan.name === "vip"
                          // ? 
                          // " md:!col-start-1 md:col-span-full md:justify-self-center "
                          // : "" 
                      } ${plan.name.toLowerCase() === "free" ? "" : ""}${plan.name.toLowerCase() === "vip" ? " " : ""}`
                    }
                    subtext={""}
                    plan={plan.name}
                    price={new Intl.NumberFormat("en-IN").format(parseFloat(plan.perMonth.toFixed(2)))}
                    priceStrikeThrough={priceStrikeThrough}
                    showAnually={
                      planName !== "free"
                        ? plan.duration_in_days > 365
                          ? `Billed ₹${new Intl.NumberFormat("en-IN").format(
                              parseFloat(plan.amount.toFixed(2))
                            )} for 3 Years `
                          : plan.duration_in_days === 365
                          ? `Billed ₹${new Intl.NumberFormat("en-IN").format(plan.amount)} annually`
                          : `Billed ₹${new Intl.NumberFormat("en-IN").format(plan.amount)} for 3 Months`
                        : ""
                    }
                    label={PLAN[planName].label}
                    gstLabel={PLAN[planName].gstLabel}
                    featureHead={PLAN[planName].featureHead}
                    featureList={PLAN[planName].featureList}
                    btnText={btnText}
                    warnMessage={PLAN[planName].warnMessage}
                    perMonth={PLAN[planName].perMonth}
                    popular={PLAN[planName].popular}
                    ctaDisabled={ctaDisabled}
                    btnVariant={PLAN[planName].btnVariant ?? ButtonVariant.secondary}
                    handleClick={() => handlePlanClick(plan.id, plan.name, plan.amount)}
                    tooltip={planName !== "free" && PLAN[planName].tooltip ? PLAN[planName].tooltip[currentTab] : null}
                    total={"₹" + plan.amount}
                  />
                );
              })}
            </>
          ) : null}
        </div>
        <div className=" mt-6 md:mt-10 text-center flex items-center justify-center ">
          <TooltipProvider delayDuration={0}>
            <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
              <TooltipTrigger
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTooltip(true);
                }}
              >
                <div className=" px-7 md:px-16 py-[9px] bg-gray-50 rounded-full border border-brand-400">
                  <p className=" font-semibold text-center text-brand-600 text-sm md:text-md  w-fit">
                    Why do we recommend minimum annual membership ?
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className=" bg-black text-white border-0 p-3 max-w-[425px]">
                <p className=" leading-6 w-[350px] md:w-full]">
                  We understand that effective investing requires time and patience, which is why we suggest minimum
                  annual membership. Our strategy reflects our ethos that long-term commitment is key to unlocking the
                  true potential of your investments.
                </p>
                <TooltipArrow className=" fill-black" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {/* <Modal
        width="450px"
        blur
        open={showModal}
        onClose={handleCloseModal}
        css={{
          // marginLeft: "2.5vw",
          marginLeft: "0",
          "@media only screen and (max-width: 764px)": {
            width: "100vw",
            alignSelf: "center",
            // marginLeft: "2.5vw",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src="kmk-k.png" style={{ width: "50px" }} />
          <IconButton
            sx={{
              width: "40px",
              "&:hover": { background: "#fff" },
              // alignSelf: "end",
              right: "0px",
              paddingTop: "20px",
              paddingRight: "30px",
            }}
            onClick={() => handleCloseModal()}
          >
            <CloseIcon sx={{ color: "#e81123" }} />
          </IconButton>
        </Box>

        <Modal.Body>
          <Login />
        </Modal.Body>
      </Modal> */}
    </div>
  );
}
