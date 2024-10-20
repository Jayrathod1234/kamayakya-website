import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Checkbox } from "@/components.v2/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components.v2/ui/dialog";
import React from "react";

const CouponListItem = ()=>{
  const error = false
  return <div className="items-top flex space-x-[10px] p-4 bg-gray-50 rounded-[10px]">
  <Checkbox id="terms1" className=" rounded-[4px] h-5 w-5" />
  <div className="grid gap-3 leading-none">
    <label
      htmlFor="terms1"
      // className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      <Button className=" bg-transparent !px-[10px] !py-2 border border-dashed border-brand-500" variant={ButtonVariant.secondary}><p className=" font-semibold text-brand-500 text-xs">SAVE20</p></Button>
    </label>
    <p className="text-xs font-semibold text-gray-950">
      Save ₹15,000
     {error && <p className=" text-error-500 text-xs">SAVE20 couldn’t be combined with IULPXIWKASA </p>} 
    </p>
    
  </div>
</div>
}

export default function CouponModal() {
  const error = true
  return (
    <Dialog>
      <DialogTrigger className=" w-full">
        <div className=" flex items-center rounded-lg mt-2 py-3 px-[11px] border border-[#0000000F]">
          <img src="/assets/badge-percent.svg" alt="badge" height={22} width={22} />
          <p className=" ml-[10px] text-gray-950 text-sm font-medium">Apply Coupon</p>
        </div>
      </DialogTrigger>
      <DialogContent className="open_sans max-h-[80dvh] min-h-[500px] !rounded-[20px] max-w-[358px] p-6">
        <DialogHeader>
          <DialogTitle className=" text-xl font-semibold ">Apply Coupon</DialogTitle>
          <div className=" flex flex-col h-full">
            {/* INPUT SECTION */}
            <div className={` py-3 px-[11px] border ${error ? " border-error-500":"border-[#0000000F]"} rounded-lg flex`}>
            <input className=" bg-transparent text-sm w-full font-medium" placeholder="Enter coupon code" type="text"/>
            <button className=" text-2xs text-brand-500 border-b border-dotted border-brand-500 ml-auto">Check</button>
            </div>
            {error && <p className=" text-error-500 text-2xs mt-[10px]">Coupon not valid</p>}
            {/* INPUT SECTION END*/}
            <div className=" mt-3 mb-[30px] max-h-[20%]  flex flex-col space-y-3">
              <CouponListItem/>
              {/* <CouponListItem/> */}
              {/* <CouponListItem/> */}
              {/* <CouponListItem/> */}
              {/* <CouponListItem/> */}
              {/* <CouponListItem/> */}
              {/* <CouponListItem/> */}
              {/* <CouponListItem/> */}
            </div>
            <div className=" mt-auto flex justify-between pt-4 border-t border-gray-150">
              <div className="">
                <p className=" text-sm text-gray-400">Maximum Savings</p>
                <p className=" text-gray-950 text-xs font-semibold">₹15,000</p>
              </div>
              <Button className=" px-5 py-[10px]" variant={ButtonVariant.primary}> 
                <p className=" text-md font-medium">Apply</p>
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
