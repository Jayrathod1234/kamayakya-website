import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import React, { useEffect, useState } from "react";
import CouponModal from "./CouponModal";
import { getBillingDetails, getSelectedPlanDates } from "@/api/payment";
import { format } from "date-fns";
import { IPaymentContext, usePaymentContext } from "@/contexts/PaymentContext";

export default function ReviewSection({ setActiveTab }) {
  const {currentPlan,planDates,planDetails} = usePaymentContext() as IPaymentContext
  
  return (
    <>
      {/* plan and summary */}
      <div className="  mt-9 border border-[#E4E7EC] rounded-lg bg-gray-50">
        <div className=" p-4 border-b border-b-[#E4E7EC]">
          <div className=" flex justify-between items-center open_sans">
            <p className=" text-xs text-gray-500">Plan</p>
            <button className=" text-xs text-primary-500 font-bold border-b border-b-brand-500 border-dashed">
              Edit Plan
            </button>
          </div>
          <p className=" text-gray-950 mt-[6px] text-sm font-semibold">{currentPlan.planName?.toUpperCase()}</p>
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
          <div className="bg-[url(/assets/zigzag.svg)] flex justify-center bg-cover bg-no-repeat gap-x-1 py-[8.5px] ">
            <img src="/assets/offer.svg" height={20} width={20} alt="offer" />
            <p className=" text-2xs font-medium ">
              You are saving <span className=" font-bold">₹20,012</span> on this plan{" "}
            </p>
          </div>
        </div>
      </div>

      {/* plan and summary end */}
      {/* Apply coupon section */}
      <div className=" mt-6">
        <p className=" text-2xs text-gray-600 font-semibold">Save Even More! Add a Coupon</p>
        <CouponModal />
        {/* <div className=" flex items-center rounded-lg mt-2 py-3 px-[11px] border border-success-500 bg-[#ECFDF3]">
          <img src="/assets/tick-circle.svg" alt="badge" height={40} width={40} />
          <div className=" text-left ml-[10px]">
            <p className="  text-gray-950 text-sm font-medium">GET10OFF</p>
            <p className=" text-xs text-gray-500">10% Discount (-₹1271.00) 🎉</p>
          </div>
          <button className=" ml-auto">
            <img height={24} width={24} src="/assets/X.svg" />
          </button>
        </div> */}
      </div>
      <div className=" h-[1px] bg-[linear-gradient(to_right,#EDF0F5_33%,rgba(255,255,255,0)_0%)] bg-[length:10px_1px] bg-repeat-x my-5"></div>
      <div className="flex flex-col gap-y-4">
        <div className=" flex justify-between items-baseline">
          <p className=" text-sm text-gray-950">Base Price</p>
          <p className=" text-sm text-gray-500 font-medium">₹{planDetails.basePrice}</p>
        </div>
        {planDetails.discount && <div className=" flex justify-between items-baseline">
          <p className=" text-sm text-gray-950">Discount on base price</p>
          <p className=" text-sm text-[#1BB991] font-medium">-₹{planDetails.discount}</p>
        </div>}
        
        <div className=" flex justify-between items-baseline">
          <p className=" text-sm text-gray-950">Taxable Amount</p>
          <p className=" text-sm text-gray-500 font-medium">₹{planDetails.taxableAmount}</p>
        </div>
        <div className=" flex justify-between items-baseline">
          <div>
            <p className=" text-sm text-gray-950">Tax (18%)</p>
            <p className=" text-2xs text-gray-400">You don’t pay extra for taxes. We got you!</p>
          </div>
          <p className=" text-sm text-gray-500 font-medium">₹{planDetails.taxAmount}</p>
        </div>
        <div className=" h-[1px] bg-[#E0E0E0]"></div>
      </div>
      <div className=" flex justify-between items-baseline py-[10px]">
        <p className=" text-sm text-gray-950">Total</p>

        <p className=" text-sm text-gray-500 font-bold">₹{planDetails.totalPayable} </p>
      </div>
      {/* Next button  */}
      <Button onClick={() => setActiveTab("details")} className=" mt-9 w-full" variant={ButtonVariant.primary}>
        Next
      </Button>
      {/* Next button end */}
    </>
  );
}
