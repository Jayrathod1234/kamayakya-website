import React from "react";
import { Control, Controller, FieldErrors, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { CustomTextField, IFormInput } from "./DetailSection";
import { InputAdornment } from "@mui/material";
import Tooltip from "@/components.v3/common/Tooltip";
import VerifyTag from "./VerifyTag";
import { DialogTrigger } from "@/components.v2/ui/dialog";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";

interface AadharInputParams {
  isAadharAlreadyVerified: boolean;
  isAadharVintage: boolean;
  aadharVerified: boolean;
  control2: Control<
    {
      aadhar: string;
    },
    any,
    {
      aadhar: string;
    }
  >;
  errors2: FieldErrors<{
    aadhar: string;
  }>;
  aadharOtpLoading: boolean;
  handleSubmit2: UseFormHandleSubmit<
    {
      aadhar: string;
    },
    {
      aadhar: string;
    }
  >;
  handleAadharOtp: SubmitHandler<Pick<IFormInput, "aadhar">>;
}

export default function AadharInput({
  isAadharAlreadyVerified,
  isAadharVintage,
  aadharVerified,
  control2,
  errors2,
  handleSubmit2,
  handleAadharOtp,
  aadharOtpLoading,
}: AadharInputParams) {
  return null;
  if (isAadharAlreadyVerified || isAadharVintage) return null;
  return (
    <div className="col-span-2">
      <div className=" flex justify-between items-center">
        <p className="text-xs text-gray-500">
          Aadhar Card Number<span className="text-error-500">*</span>
        </p>
      </div>
      <Controller
        name="aadhar"
        control={control2}
        rules={{
          required: "Enter aadhar to continue",
          pattern: {
            value: aadharVerified ? /^XXXXXXXX\d{4}$/ : /^\d{4}\d{4}\d{4}$/,
            message: "Enter a valid Aadhar number in the format XXXX XXXX XXXX (excluding spaces).",
          },
        }}
        render={({ field }) => (
          <CustomTextField
            {...field}
            sendotp={(!aadharVerified && !isAadharAlreadyVerified) || !isAadharVintage}
            error={errors2.aadhar?.message && !aadharVerified && !isAadharAlreadyVerified ? true : false}
            type={aadharVerified ? "text" : "number"}
            id="aadhar-number"
            // onChange={(e) => setAadhar(e.target.value)}
            variant="outlined"
            fullWidth
            placeholder="Enter your Aadhar Card Number"
            InputProps={{
              readOnly: (aadharVerified || isAadharAlreadyVerified) && isAadharVintage,
              className: (aadharVerified || isAadharAlreadyVerified) && isAadharVintage ? "bg-[#F4F7FA99]" : "",
              endAdornment: (
                <InputAdornment className="!pr-0 flex items-center gap-x-[10px]" position="end">
                  {errors2.aadhar?.message && !aadharVerified && !isAadharAlreadyVerified && (
                    <Tooltip
                      tooltipContent={<p className=" text-2xs">{errors2.aadhar.message}</p>}
                      tooltipTrigger={
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8.00016 5.98334V8.65M8.00016 11.3167H8.00683M14.6668 8.65C14.6668 12.3319 11.6821 15.3167 8.00016 15.3167C4.31826 15.3167 1.3335 12.3319 1.3335 8.65C1.3335 4.96811 4.31826 1.98334 8.00016 1.98334C11.6821 1.98334 14.6668 4.96811 14.6668 8.65Z"
                            stroke="#F04438"
                            stroke-width="1.33333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      }
                    />
                  )}
                  {(aadharVerified || isAadharAlreadyVerified) && isAadharVintage ? (
                    <VerifyTag />
                  ) : (
                    <DialogTrigger disabled={field.value.length == 0}>
                      <Button
                        disabled={field.value.length == 0}
                        loading={aadharOtpLoading}
                        onClick={handleSubmit2(handleAadharOtp)}
                        className="min-w-fit !p-3 !py-[6px] !h-fit max-h-[32px]"
                        variant={ButtonVariant.primary}
                      >
                        <p className="text-sm font-semibold">Send OTP</p>
                      </Button>
                    </DialogTrigger>
                  )}
                </InputAdornment>
              ),
            }}
            className="!mt-[6px]"
          />
        )}
      />

      <p className="text-3xs text-gray-500 mt-[6px]">OTP will be sent to the mobile no. linked to your Aadhaar Card</p>
    </div>
  );
}

{
  /* {!isAadharAlreadyVerified || !isAadharVintage ? (
            
          ) : null} */
}
