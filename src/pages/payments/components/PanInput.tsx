import React from "react";
import { Control, Controller, UseFormHandleSubmit } from "react-hook-form";
import { CustomTextField } from "./DetailSection";
import { InputAdornment } from "@mui/material";
import VerifyTag from "./VerifyTag";
import { Loader } from "lucide-react";
import { IUserDetails } from "@/contexts/PaymentContext";

interface PanInputParams {
  control2: Control<
    {
      pan: string;
    },
    any,
    {
      pan: string;
    }
  >;
  userDetails: IUserDetails;
  isPanAlreadyVerified: boolean;
  handleVerifyPan: (data: any) => Promise<void>;
  loading: boolean;
  handleSubmit2: UseFormHandleSubmit<
    {
      pan: string;
    },
    {
      pan: string;
    }
  >;
}

export default function PanInput({
  control2,
  userDetails,
  isPanAlreadyVerified,
  handleVerifyPan,
  loading,
  handleSubmit2,
}: PanInputParams) {
  if ( isPanAlreadyVerified) return null;
  return (
    <div className="col-span-2">
      <p className="text-xs text-gray-500">
        PAN Number<span className="text-error-500">*</span>
      </p>
      <Controller
        name="pan"
        control={control2}
        rules={{
          required: "Enter PAN to continue",
          pattern: {
            value: userDetails.maskedPan ? /^XXXXXX[0-9]{3}[A-Z]{1}$/ : /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
            message: "Enter a valid Pan number in the format XXXXX0000X",
          },
        }}
        render={({ field }) => (
          <CustomTextField
            {...field}
            id="pan-number"
            type="text"
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: userDetails.pan ? true:false,
              className: (userDetails.pan ? true : false) || isPanAlreadyVerified ? "bg-[#F4F7FA99]" : "",
              endAdornment: (
                <InputAdornment position="end">
                  {isPanAlreadyVerified || userDetails.pan ? (
                    <VerifyTag />
                  ) : (
                    <button className=" " onClick={handleSubmit2(handleVerifyPan)}>
                      {loading ? (
                        <span className=" inline-flex items-center justify-center gap-x-1">
                          <Loader color="#12B76A" fontSize={12} height={12} width={12} />
                          <p className=" text-2xs text-[#12B76A]">Verifying</p>
                        </span>
                      ) : (
                        <p className=" text-2xs text-brand-500 border-b border-dashed border-b-brand-500">Verify PAN</p>
                      )}
                    </button>
                  )}
                </InputAdornment>
              ),
            }}
            className="!mt-[6px] "
          />
        )}
      />
    </div>
  );
}

// {(isAadharAlreadyVerified && isAadharVintage && !isPanAlreadyVerified) ||
//   userDetails.pan ||
//   (userDetails.aadhar && !userDetails.pan) ? (
//     <>

//     </>
//   ) : null}
