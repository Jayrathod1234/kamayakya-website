import { verifyCoupon } from "@/api/payment";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
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
import { useToast } from "@/components.v2/ui/use-toast";
import Tooltip from "@/components.v3/common/Tooltip";
import { IPaymentContext, usePaymentContext } from "@/contexts/PaymentContext";
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
  const [loading,setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const { toast } = useToast();
  const checkCoupon = async () => {
    
    if (discountCode?.trim().length === 0) {
      setError(true);
      return;
    }
    setLoading(true);
    try {
      let params = {
        discount_code: discountCode,
        subscription: currentPlan.planId,
      };
      const res = await verifyCoupon(params);
      if(res?.discount_type==="percentage"){
        res.discount_value = (res.discount_value * Number(planDetails.totalPayable))/100
      }
      setDiscountList((prev) =>
        prev.some((item) => item?.discountCode === discountCode)
          ? prev
          : [...prev, { discountCode, discountAmt: res?.discount_value }]
      );
      
    } catch (e: any) {
      if (e?.response?.data?.message?.includes("Invalid")) {
        setError(true);
        // toast({
        //   variant: "warn",
        //   description: e?.response?.data?.message,
        // });
      }
    }finally{
      setLoading(false);
      setDiscountCode("")
    }
  };
  const discountAmt = discountList.find((item) => item?.discountCode === currentDiscountSelected)?.discountAmt;

  const handleApply = () => {
    setPlanDetails((prev) => ({ ...prev, discount: discountAmt as string, discountCode: currentDiscountSelected }));
    setOpen(false);
  };

  useEffect(()=>{
    if(!open){
      setDiscountCode("")
      setError(false)
      setCurrentDiscountSelected("")
    }
  },[open])

  useEffect(()=>{
    setDiscountList([])
  },[currentPlan.planDuration,currentPlan.planName])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className=" w-full">
        <div className=" flex items-center rounded-lg mt-2 py-3 px-[11px] border border-[#0000000F]">
          <img src="/assets/badge-percent.svg" alt="badge" height={22} width={22} />
          <p className=" ml-[10px] text-gray-950 text-sm font-medium">Apply Coupon</p>
        </div>
      </DialogTrigger>
      <DialogContent
        closeClassName=" opacity-100 right-[-0.8rem] top-[-1rem] !bg-white"
        className="open_sans gap-0 max-h-[80dvh] min-h-[500px] !rounded-[20px] max-w-[358px] p-6 flex flex-col"
      >
        <DialogHeader className=" mb-0">
          <DialogTitle className=" text-xl font-semibold m-0 ">Apply Coupon</DialogTitle>
          {/* INPUT SECTION */}
          <div
            className={` py-3 px-[11px] border ${error ? " border-error-500" : "border-[#0000000F]"} rounded-lg flex`}
          >
            <input
              disabled={loading}
              value={discountCode}
              onChange={(e) => {
                if (error) setError(false);
                setDiscountCode(e.target.value);
              }}
              className=" bg-transparent text-sm w-full font-medium"
              placeholder="Enter coupon code"
              type="text"
            />
            <button
              disabled={loading}
              onClick={checkCoupon}
              className=" text-2xs text-brand-500 border-b border-dotted border-brand-500 ml-auto"
            >
              {loading ? "Verifying":"Check"}
              
            </button>
          </div>
          {error && <p className=" text-error-500 text-2xs mt-[10px]">Coupon not valid</p>}
          {/* INPUT SECTION END*/}
        </DialogHeader>

        
          {discountList && discountList.length > 0? discountList.map((discount) => (
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
          )) :<div className=" flex flex-col h-full items-center justify-center my-auto">
              <img height={90} width={90} src="/assets/no-offer.svg" alt="no-coupon" />
              <p className=" text-center text-gray-400 text-2xs max-w-[150px]">Looks like you don’t have any coupons.</p>
            </div>}
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
            <Tooltip disableTooltip={currentDiscountSelected?.length >0? true:false}  tooltipContent={"Select Coupon in order to apply"} tooltipTrigger={ <Button disabled={currentDiscountSelected?.length ==0} onClick={handleApply} className=" px-5 py-[10px]" variant={ButtonVariant.primary}>
              <p className=" text-md font-medium">Apply</p>
            </Button>}/>
           
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
