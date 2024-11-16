import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import React, { useEffect, useState } from "react";
import CouponModal from "./CouponModal";
import { getBillingDetails, getSelectedPlanDates } from "@/api/payment";
import { format } from "date-fns";
import { IPaymentContext, usePaymentContext } from "@/contexts/PaymentContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components.v2/ui/dialog";
import PlanModal from "./PlanModal";
import { PlanTooltip } from "@/components.v2/payments";
import ToPayTooltip from "./ToPayTooltip";
import { PLAN } from "@/constants/pricing/plans";
import { abbreviateTimeForPlan } from "@/lib/date-formatter";
import Lottie from "lottie-react";
import POPPER_JSON from '../../../../public/assets/popper.json';
export default function ReviewSection({
  setActiveTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { currentPlan, planDates, planDetails, setPlanDetails } = usePaymentContext() as IPaymentContext;
  const [open, setOpen] = useState(false);
  
  const removeDiscount = () => {
    setPlanDetails((prev) => ({ ...prev, discount: "", discountCode: "" }));
  };
  let saveText = PLAN[currentPlan.planName?.toLowerCase()]?.tooltip[currentPlan?.planDuration]?.saveText
  let rupeePartOfSave = ''
  if(saveText){
    saveText = saveText.split(" ")
    rupeePartOfSave = saveText[3]

  }


  return (
    <>
      {/* plan and summary */}
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="  mt-9 border border-[#E4E7EC] rounded-lg bg-gray-50">
          {planDetails.discountCode ? <Lottie className=" absolute  pointer-events-none" autoPlay loop={false}  animationData={POPPER_JSON} /> :null}
          <div className=" p-4 border-b border-b-[#E4E7EC]">
            <div className=" flex justify-between items-center open_sans">
              <p className=" text-xs text-gray-500">Plan</p>
              <DialogTrigger className=" !text-2xs text-brand-500 font-medium border-b border-b-brand-500 border-dashed">
                Edit Plan
              </DialogTrigger>
            </div>
            <p className=" text-gray-950 mt-[6px] text-sm font-semibold">
              {PLAN[currentPlan.planName?.toLowerCase()]?.paymentPageLabel} (
              {abbreviateTimeForPlan(currentPlan?.planDuration)})
            </p>
          </div>
          <div className=" flex">
            <div className=" p-4 flex-1 border-r border-r-gray-200">
              <p className=" text-gray-500 text-xs">Start Date</p>
              <p className=" mt-[6px] text-sm font-semibold text-gray-950">{planDates.start}</p>
            </div>
            <div className=" p-4 flex-1">
              <p className=" text-gray-500 text-xs">Start Date</p>
              <p className=" mt-[6px] text-sm font-semibold text-gray-950">{planDates.end}</p>
            </div>
          </div>
          <div>
            {rupeePartOfSave ? (
              <div className="bg-[url(/assets/zigzag.svg)] flex justify-center bg-cover bg-no-repeat gap-x-1 py-[8.5px] ">
                <img src="/assets/offer.svg" height={20} width={20} alt="offer" />

                <p className=" text-2xs font-medium ">
                  {saveText.slice(0,3).join(" ")}{" "}<span className=" font-bold">{rupeePartOfSave}</span>{" "}{saveText.slice(4).join(" ")}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* plan and summary end */}
        {/* Apply coupon section */}
        <div className=" mt-6">
          <p className=" text-2xs text-gray-600 font-semibold">Save Even More! Add a Coupon</p>

          {planDetails.discountCode ? (
            <div className=" flex items-center rounded-lg mt-2 py-3 px-[11px] border border-success-500 bg-[#ECFDF3]">
              <img src="/assets/tick-circle.svg" alt="badge" height={40} width={40} />
              <div className=" text-left ml-[10px]">
                <p className="  text-gray-950 text-sm font-bold">{planDetails.discountCode}</p>
                <p className=" text-xs text-gray-500">
                  {((Number(planDetails.discount) / Number(planDetails.totalPayable)) * 100).toFixed(2)}% Discount (₹
                  {planDetails.discount}) 🎉
                </p>
              </div>
              <button onClick={removeDiscount} className=" ml-auto">
                <img height={24} width={24} src="/assets/X.svg" />
              </button>
            </div>
          ) : (
            <CouponModal />
          )}
        </div>
        <div className=" h-[1px] bg-[linear-gradient(to_right,#EDF0F5_33%,rgba(255,255,255,0)_0%)] bg-[length:10px_1px] bg-repeat-x my-5"></div>
        <div className="flex flex-col gap-y-4">
          <div className=" flex justify-between items-baseline">
            <p className=" text-sm text-gray-950">Base Price</p>
            <p className=" text-sm text-gray-500 font-medium">₹{Number(planDetails.basePrice).toLocaleString("hi")}</p>
          </div>

          {/* <div className=" flex justify-between items-baseline">
          <p className=" text-sm text-gray-950">Taxable Amount</p>
          <p className=" text-sm text-gray-500 font-medium">₹{planDetails.taxableAmount}</p>
        </div> */}
          <div className=" flex justify-between items-baseline">
            <div>
              <p className=" text-sm text-gray-950">Tax (18%)</p>
              <p className=" text-2xs text-gray-400">You don’t pay extra for taxes. We got you!</p>
            </div>
            <p className=" text-sm text-gray-500 font-medium">₹{Number(planDetails.taxAmount).toLocaleString("hi")}</p>
          </div>
          <div className=" h-[1px] bg-[#E0E0E0]"></div>
        </div>
        <div className=" flex justify-between items-baseline py-[10px]">
          <p className=" text-md font-bold text-gray-950">Total Amount</p>

          <p className=" text-md text-gray-950 font-bold">₹{Number(planDetails.totalPayable).toLocaleString("hi")} </p>
        </div>
        {planDetails.discount && (
          <div className=" flex justify-between items-baseline">
            <p className=" text-sm text-[#1BB991]">
              Discount ({planDetails.discountCode} -{" "}
              {((Number(planDetails.discount) / Number(planDetails.totalPayable)) * 100).toFixed(2)}% off)
            </p>
            <p className=" text-sm text-[#1BB991] font-medium">-₹{planDetails.discount}</p>
          </div>
        )}
        {planDetails.discount ? (
          <div className=" flex justify-between items-baseline py-[10px]">
            <div className=" flex items-center gap-x-1">
              <p className=" text-md font-bold text-gray-950">To Pay</p>
              <ToPayTooltip
                price={`₹${Number(((Number(planDetails.totalPayable) - Number(planDetails.discount)) / 1.18).toFixed(2)).toLocaleString("hi")}`}
                saveText={""}
                strikePrice={""}
                gst={`₹${Number((
                  Number(planDetails.totalPayable) -
                  Number(planDetails.discount) -
                  (Number(planDetails.totalPayable) - Number(planDetails.discount)) / 1.18
                ).toFixed(2)).toLocaleString("hi")}`}
                total={`₹${(Number(planDetails.totalPayable) - Number(planDetails.discount)).toLocaleString("hi")}`}
              >
                <div className=" flex justify-center items-center">
                  <img width={16} height={16} alt="info-icon" src="/icons/info-icon.svg" />
                </div>
              </ToPayTooltip>
            </div>

            <p className=" text-md text-gray-950 font-bold">
              ₹{(Number(planDetails.totalPayable) - Number(planDetails.discount)).toLocaleString("hi")}{" "}
            </p>
          </div>
        ) : null}
        {/* Next button  */}
        <Button onClick={() => {if(planDetails?.totalPayable) setActiveTab("details")}} className=" mt-9 w-full" variant={ButtonVariant.primary}>
          Next
        </Button>
        {/* Next button end */}
        <PlanModal setOpen={setOpen} />
      </Dialog>
    </>
  );
}
