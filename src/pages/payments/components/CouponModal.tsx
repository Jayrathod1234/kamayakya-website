import { verifyCoupon } from "@/api/payment";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { AnimatedShinyText } from "@/components.v2/ui/animated-shiny-text";
import { Checkbox } from "@/components.v2/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components.v2/ui/dialog";
import { RainbowButton } from "@/components.v2/ui/rainbow-button";
import { ShimmerButton } from "@/components.v2/ui/shimmer-button";
import { toast } from "@/components.v2/ui/use-toast";
import Tooltip from "@/components.v3/common/Tooltip";
import { IPaymentContext, usePaymentContext } from "@/contexts/PaymentContext";
import { getMixPanelClient } from "@/externals/mixpanel";
import React, { useEffect, useState } from "react";

const CouponListItem = ({
  discountCode,
  discountAmt,
  onClick,
  active,
}: {
  discountCode: string;
  discountAmt: string;
  onClick: () => void;
  active: boolean;
}) => {
  const error = false;
  return (
    <div className="items-top flex space-x-[10px] p-4 bg-gray-50 rounded-[10px]">
      <Checkbox checked={active} onCheckedChange={onClick} id="terms1" className=" rounded-[4px] h-5 w-5" />
      <div className="grid gap-3 leading-none">
        <label
          htmlFor="terms1"
          // className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          <Button
            onClick={onClick}
            className=" bg-transparent !px-[10px] !py-2 border border-dashed border-brand-500"
            variant={ButtonVariant.secondary}
          >
            <p className=" font-semibold text-brand-500 text-xs">{discountCode}</p>
          </Button>
        </label>
        <p className="text-xs font-semibold text-gray-950">
          Save ₹{discountAmt}
          {error && <p className=" text-error-500 text-xs">SAVE20 couldn’t be combined with IULPXIWKASA </p>}
        </p>
      </div>
    </div>
  );
};

export default function CouponModal() {
  const { currentPlan, setPlanDetails, planDetails } = usePaymentContext() as IPaymentContext;
  const [discountCode, setDiscountCode] = useState("");
  const [discountList, setDiscountList] = useState<Array<{ discountCode: string; discountAmt: string } | null>>([]);
  const [currentDiscountSelected, setCurrentDiscountSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [invalidDiscountCode, setInvalidDiscountCode] = useState(false);
  const mp = getMixPanelClient();

  // const { toast } = useToast();
  const checkCoupon = async () => {
    if (discountCode?.trim().length === 0) {
      setError(true);
      return;
    }
    setLoading(true);
    try {
      mp.track("couponcheck_clicked", {
        couponvalue: discountCode || "",
      });
      let params = {
        discount_code: discountCode,
        subscription: currentPlan.planId,
      };
      const res = await verifyCoupon(params);
      if (res?.discount_type === "percentage") {
        res.discount_value = (res.discount_value * Number(planDetails.totalPayable)) / 100;
      }
      setDiscountList((prev) =>
        prev.some((item) => item?.discountCode === discountCode)
          ? prev
          : [...prev, { discountCode, discountAmt: res?.discount_value }]
      );
    } catch (e: any) {
      if (e?.response?.data?.message?.includes("Invalid")) {
        setError(true);
        setInvalidDiscountCode(true);
        mp.track("couponcode_invalid");
        // toast({
        //   variant: "warn",
        //   description: e?.response?.data?.message,
        // });
      } else {
        toast({
          variant: "warn",
          description: e?.response?.data?.message || "Something went wrong.",
        });
      }
    } finally {
      setLoading(false);
      setDiscountCode("");
    }
  };

  const discountAmt = discountList.find((item) => item?.discountCode === currentDiscountSelected)?.discountAmt;

  const handleApply = () => {
    mp.track("couponapply_clicked", {
      couponvalue: currentDiscountSelected,
    });
    setPlanDetails((prev) => ({ ...prev, discount: discountAmt as string, discountCode: currentDiscountSelected }));
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setDiscountCode("");
      setError(false);
      setInvalidDiscountCode(false);
      setCurrentDiscountSelected("");
    } else {
      mp.track("couponwindow_loaded");
    }
  }, [open]);

  useEffect(() => {
    setDiscountList([]);
  }, [currentPlan.planDuration, currentPlan.planName]);

  return (
    <Dialog
      open={open}
      onOpenChange={(openChange) => {
        if (!openChange) {
          mp.track("couponwindow_closed");
        }
        setOpen(openChange);
      }}
    >
      <DialogTrigger asChild className=" w-full">
        {/* <div className=" relative w-full space-y-10"> */}
        {/* <ShimmerButton shimmerSize="  0.08em"  shimmerColor="#17756c" background="#FFF" className="w-full rounded-lg mt-2 py-3 px-[11px] border border-[#0000000F] !bg-white" >
        <div className=" flex items-center">
          <img src="/assets/badge-percent.svg" alt="badge" height={22} width={22} />
          <p className=" ml-[10px] text-gray-950 text-sm font-medium">Apply Coupon</p>
        </div>
        </ShimmerButton>
        <RainbowButton variant={"outline"}  className="w-full rounded-lg mt-2 py-3 px-[11px] border border-[#0000000F] !bg-white" >
        <div className=" flex items-center">
          <img src="/assets/badge-percent.svg" alt="badge" height={22} width={22} />
          <p className=" ml-[10px] text-gray-950 text-sm font-medium">Apply Coupon</p>
        </div>
        </RainbowButton>
        <div className=" flex items-center !mt-10 rounded-lg py-3 px-[11px] border border-[#0000000F]">
          <img src="/assets/badge-percent.svg" alt="badge" height={22} width={22} />
          <AnimatedShinyText  className=" ml-[10px] text-sm font-medium">Apply Coupon</AnimatedShinyText>
        </div> */}
        <div className=" mt-2 flex items-center rounded-lg py-3 px-[11px] bg-[#cbf3f0] border border-[#0000000F]">
          <img src="/assets/badge-percent.svg" alt="badge" height={22} width={22} />
          <p className=" ml-[10px] text-sm font-medium">Apply Coupon</p>
        </div>
        {/* </div> */}
      </DialogTrigger>
      <DialogContent
        closeClassName=" -right-2 -top-[12px] opacity-100"
        className="open_sans gap-0 max-h-[80dvh] min-h-[500px] !rounded-[20px] w-[calc(100%-24px)] max-w-[358px] p-6 flex flex-col"
      >
        <DialogHeader className=" mb-0">
          <DialogTitle className=" text-xl font-semibold m-0 !text-left mb-5 ">Apply Coupon</DialogTitle>
          {/* INPUT SECTION */}
          <div
            className={` py-2 px-[11px] border text-left !mt-0 ${
              error ? " border-error-500" : "border-[#0000000F]"
            } rounded-lg flex`}
          >
            <input
              disabled={loading}
              value={discountCode}
              onChange={(e) => {
                if (error) setError(false);
                if (invalidDiscountCode) setInvalidDiscountCode(false);
                setDiscountCode(e.target.value);
              }}
              className=" bg-transparent text-sm w-full font-medium"
              placeholder="Enter coupon code"
              type="text"
            />
            <Button
              variant={ButtonVariant.primary}
              disabled={loading}
              onClick={checkCoupon}
              className=" text-2xs ml-auto !py-0 max-h-[32px]"
            >
              <p className=" text-2xs font-semibold">{loading ? "Verifying" : "Check"}</p>
            </Button>
          </div>
          {error ? (
            !invalidDiscountCode ? (
              <p className=" text-left text-error-500 text-2xs mt-[10px]">Enter code & click 'Check' to validate</p>
            ) : (
              <p className="text-left text-error-500 text-2xs mt-[10px]">Coupon not valid</p>
            )
          ) : null}
          {/* INPUT SECTION END*/}
        </DialogHeader>

        {discountList && discountList.length > 0 ? (
          discountList.map((discount) => (
            <div className=" mt-3 mb-[30px]  flex flex-col space-y-3 overflow-y-scroll">
              <CouponListItem
                active={discount?.discountCode === currentDiscountSelected}
                onClick={() =>
                  setCurrentDiscountSelected((prev) =>
                    prev === discount?.discountCode ? "" : (discount?.discountCode as string)
                  )
                }
                discountCode={discount?.discountCode as string}
                discountAmt={discount?.discountAmt as string}
              />
            </div>
          ))
        ) : (
          <div className=" flex flex-col h-full items-center justify-center my-auto">
            <img height={90} width={90} src="/assets/no-offer.svg" alt="no-coupon" />
            <p className=" text-center text-gray-400 text-2xs max-w-[150px]">Looks like you don’t have any coupons.</p>
          </div>
        )}
        {/*
          <CouponListItem />
          <CouponListItem />
          <CouponListItem />
          <CouponListItem /> */}
        {/* <CouponListItem/> */}
        {/* <CouponListItem/> */}
        {/* <CouponListItem/> */}

        <DialogFooter className=" w-full mt-auto">
          <div className=" mt-auto flex justify-between pt-4 border-t border-gray-150 w-full">
            <div className="">
              <p className=" text-sm text-gray-400">Maximum Savings</p>
              <p className=" text-gray-950 text-xs font-semibold">₹{discountAmt ?? 0}</p>
            </div>
            <Tooltip
              disableTooltip={currentDiscountSelected?.length > 0 ? true : false}
              tooltipContent={
                <ol className=" m-0 px-2">
                  <li className=" text-sm">Enter code & click 'Check' to validate.</li>{" "}
                  <li className=" text-sm"> Select the approved code. </li>
                  <li className=" text-sm">Click 'Apply' to use it.</li>
                </ol>
              }
              tooltipTrigger={
                <Button
                  disabled={currentDiscountSelected?.length == 0}
                  onClick={handleApply}
                  className=" px-5 py-[10px]"
                  variant={ButtonVariant.primary}
                >
                  <p className=" text-md font-medium">Apply</p>
                </Button>
              }
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
