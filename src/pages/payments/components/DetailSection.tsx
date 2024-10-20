import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import React from "react";

export default function DetailSection() {
  return (
    <div className=" mt-9">
      <div className="flex items-center mb-9">
        <ArrowLeft size={18} />
        <p className=" ml-[5px] text-xs text-gray-600">Go Back to Previous Page</p>
      </div>
      <div className=" grid grid-cols-2 gap-y-9">
        <div className=" col-span-2">
          <p className=" text-xs text-gray-500">
            Aadhar Card Number<span className=" text-error-500">*</span>
          </p>
          <OutlinedInput
            id="outlined-adornment-password"
            type={ 'password'}
            endAdornment={
              <Button className=" min-w-fit" variant={ButtonVariant.primary}>
              <p className=" text-sm font-semibold">Send OTP</p>
            </Button>
            }
            className="!mt-[6px] !pl-3 !py-[9px] !pr-[6px] !rounded-[6.2px] !border-[#0000000F]"
            label="Password"
          />
          <p className=" text-3xs text-gray-500 mt-[6px]">
            Mandatory as per SEBI rules (OTP will be sent to the mobile no. linked to your Aadhar Card)
          </p>
        </div>
        <div className=" col-span-1">
          <p className=" text-xs text-gray-500">
            Email<span className=" text-error-500">*</span>
          </p>
          <div className="flex  ">
          <OutlinedInput
            id="outlined-adornment-password"
            type={ 'password'}
            endAdornment={
              <Button className=" min-w-fit" variant={ButtonVariant.primary}>
              <p className=" text-sm font-semibold">Send OTP</p>
            </Button>
            }
            className="!mt-[6px] !pl-3 !py-[9px] !pr-[6px] !rounded-[6.2px]"
            label="Password"
          />
            {/* <Button className=" min-w-fit" variant={ButtonVariant.primary}>
              <p className=" text-sm font-semibold">Send OTP</p>
            </Button> */}
          </div>
          <p className=" text-3xs text-gray-500 mt-[6px]">
            Mandatory as per SEBI rules (OTP will be sent to the mobile no. linked to your Aadhar Card)
          </p>
        </div>
      </div>
    </div>
  );
}
