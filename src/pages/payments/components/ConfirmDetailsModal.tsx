import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { DialogContent } from "@/components.v2/ui/dialog";
import React, { useEffect, useState } from "react";
import { CustomTextField } from "./DetailSection";
import { InputAdornment } from "@mui/material";
import { IPaymentContext, usePaymentContext } from "@/contexts/PaymentContext";

export default function ConfirmDetailsModal({
  setOpenDialog,
  openDialog,
}: {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openDialog:boolean;
}) {
  const { setUserDetails, userDetails, setAadharVerified } = usePaymentContext() as IPaymentContext;
  const [address, setAddress] = useState("");
  const [editable, setEditable] = useState(false);

  const handleEditClick = () => {
    setEditable((prev) => !prev);
  };

  const handleConfirm = () => {
    if (address) {
      setUserDetails((prev) => ({ ...prev, address }));
    }
    setAadharVerified(true);
    setOpenDialog(false);
  };

  useEffect(() => {
    setAddress(`${userDetails.address}`);
  }, [userDetails?.address]);

  useEffect(()=>{
    if(!openDialog){
      handleConfirm()
    }
  },[openDialog])

  return (
    <DialogContent className=" !p-6 !rounded-[20px] min-w-fit md:min-w-[624px] max-w-[784px] open_sans">
      <div className=" flex flex-col md:flex-row gap-6">
        <div className="bg-[#FEB359] flex items-center justify-center px-[54px] h-[380px] min-w-fit rounded-[20px]">
        <img  width={178} height={178} src="/assets/confirmDetails.gif"/>
        </div>
        <div className=" flex flex-col gap-y-6 w-full">
          <p className=" text-xl text-[#101828] font-semibold">Confirm Your Details</p>
          <div className=" grid grid-cols-2 border  rounded-lg border-[#EDEDED] bg-[#EDF0F538] w-full">
            <div className=" col-span-1 p-4 border-r border-r-[#EDEDED]">
              <p className=" text-2xs text-[#707070]">Name</p>
              <p className=" text-sm text-[#121212] mt-[6px]">{userDetails?.name}</p>
            </div>
            <div className=" col-span-1 p-4">
              <p className=" text-2xs text-[#707070]">PAN No.</p>
              <p className=" text-sm text-[#121212] mt-[6px]">{userDetails?.pan}</p>
            </div>
            <div className=" col-span-2 p-4 border-t border-t-[#EDEDED]">
              <p className=" text-2xs text-[#707070]">Address</p>
              <textarea
                
                contentEditable={editable}
                onChange={(e) => {
                  if (!editable) return;
                  setAddress(e.target.value);
                }}
                value={address}
                className={` ${editable ? "bg-white":"bg-transparent"} resize-none text-sm text-[#121212]  block w-full mt-[6px]`}
              />
              <button onClick={handleEditClick} className=" text-sm font-semibold text-[#0E6C63] ">
                { editable ?"Save": "Edit Address"}
              </button>
            </div>
          </div>
          <Button onClick={handleConfirm} className=" ml-auto" variant={ButtonVariant.primary}>
            <p>Confirm</p>
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
