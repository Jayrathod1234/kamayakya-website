import React from "react";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { IconButton, InputAdornment, OutlinedInput, styled, TextField } from "@mui/material";
import { ArrowLeft, Check, Mail } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Checkbox } from "@/components.v2/ui/checkbox";

// Custom styled OutlinedInput
const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#0000000F",

      borderRadius: 6.2,
      // paddingVertical:"9px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00645A", // Focus color
      borderWidth: 2,
    },
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 1,
    },
    "& input": {
      padding: "9px !important",
      paddingRight: "10px !important",
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 1,
    },
  },
});

export default function DetailSection() {
  return (
    <div className="mt-9">
      <div className="flex items-center mb-9">
        <ArrowLeft size={18} />
        <p className="ml-[5px] text-xs text-gray-600">Go Back to Previous Page</p>
      </div>
      <div className="grid grid-cols-2 gap-y-9 gap-x-[22px]">
        <div className="col-span-2">
          <p className="text-xs text-gray-500">
            Aadhar Card Number<span className="text-error-500">*</span>
          </p>
          <CustomTextField
            id="aadhar-number"
            type="text"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment className="!pr-0" position="end">
                  <Button className="min-w-fit !p-3 !py-[6px] !h-fit" variant={ButtonVariant.primary}>
                    <p className="text-sm font-semibold">Send OTP</p>
                  </Button>
                </InputAdornment>
              ),
            }}
            className="!mt-[6px]  !py-[9px] !pr-[0px] !rounded-[6.2px] !border-[#0000000F]"
          />
          <p className="text-3xs text-gray-500 mt-[6px]">
            Mandatory as per SEBI rules (OTP will be sent to the mobile no. linked to your Aadhar Card)
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-xs text-gray-500">
            Full Name<span className="text-error-500">*</span>
          </p>
          <CustomTextField
            id="full-name"
            type="text"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* <Button className="min-w-fit !p-3 !py-[6px] !h-fit" variant={ButtonVariant.primary}>
                    <p className="text-sm font-semibold">Send OTP</p>
                  </Button> */}
                </InputAdornment>
              ),
            }}
            className="!mt-[6px]  !py-[9px] !pr-[6px] !rounded-[6.2px] !border-[#0000000F]"
          />
          {/* <p className="text-3xs text-gray-500 mt-[6px]">
            Mandatory as per SEBI rules (OTP will be sent to the mobile no. linked to your Aadhar Card)
          </p> */}
        </div>
        <div className="col-span-2">
          <p className="text-xs text-gray-500">
            PAN Number<span className="text-error-500">*</span>
          </p>
          <CustomTextField
            id="pan-number"
            type="text"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* <Button className="min-w-fit !p-3 !py-[6px] !h-fit" variant={ButtonVariant.primary}>
                    <p className="text-sm font-semibold">Send OTP</p>
                  </Button> */}
                </InputAdornment>
              ),
            }}
            className="!mt-[6px]  !py-[9px] !pr-[6px] !rounded-[6.2px] !border-[#0000000F]"
          />
        </div>
        <div className="col-span-2">
          <p className="text-xs text-gray-500">
            Address<span className="text-error-500">*</span>
          </p>
          <CustomTextField
            id="address"
            type="text"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* <Button className="min-w-fit !p-3 !py-[6px] !h-fit" variant={ButtonVariant.primary}>
                    <p className="text-sm font-semibold">Send OTP</p>
                  </Button> */}
                </InputAdornment>
              ),
            }}
            className="!mt-[6px]  !py-[9px] !pr-[6px] !rounded-[6.2px] !border-[#0000000F]"
          />
        </div>
        <div className="col-span-1">
          <p className="text-xs text-gray-500">
            Email<span className="text-error-500">*</span>
          </p>
          <div className="flex">
            <CustomTextField
              id="email"
              type="text"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={15} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon" />
                  </InputAdornment>
                ),
              }}
              className="!mt-[6px]  !pr-[6px] !rounded-[6.2px]"
            />
          </div>
          <p className="text-3xs text-gray-500 mt-[6px]">You will get your invoice on email</p>
        </div>
        <div className="col-span-1">
          <p className="text-xs text-gray-500">
            Phone<span className="text-error-500">*</span>
          </p>
          <div className="flex">
            <div
              // className="  !py-[9px] !pr-[6px] !rounded-[6.2px] !border-[#0000000F]"
              className="!mt-[6px] border border-[#0000000F] rounded-[6.2px] py-[9px] px-[14px] flex items-center"
            >
              <PhoneInput
                className=" "
                defaultCountry="IN"
                placeholder="Enter phone number"
                value={"7507139592"}
                onChange={(value) => {
                  // handleInputs(value!, setPhone);
                  // if (error.phoneError) {
                  //   setError((prev) => ({ ...prev, phoneError: false }));
                  // }
                }}
              />{" "}
              <InputAdornment position="end">
                <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon" />
              </InputAdornment>
            </div>

            {/* <CustomTextField
              id="phone"
              type="text"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment:(
                  <InputAdornment position="start">
                  <Mail size={15}/>
                </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon"/>
                  </InputAdornment>
                ),
              }}
              className="!mt-[6px]  !pr-[6px] !rounded-[6.2px]"
            /> */}
          </div>
          <p className="text-3xs text-gray-500 mt-[6px]">You will get stock action calls on WhatsApp</p>
        </div>
        <div className="col-span-2 flex space-x-2 items-center">
            <Checkbox id="GSTIN"/>
            <p className=" text-sm text-gray-950">Use GSTIN for this order</p>
        </div>
        <div className="col-span-2 p-4 border rounded-xl border-gray-150">
          <p className="text-xs text-gray-500">
            GST Details<span className="text-error-500">*</span>
          </p>
          <div className="flex">
            <CustomTextField
              id="phone"
              type="text"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon"/>
                  </InputAdornment>
                ),
              }}
              className="!mt-[6px]  !pr-[6px] !rounded-[6.2px]"
            />
          </div>
        </div>
        <div className="col-span-2 ">
          <Button className=" w-full" variant={ButtonVariant.primary}><p className=" text-sm font-medium">Proceed to Checkout</p></Button>
        </div>
      </div>
    </div>
  );
}
