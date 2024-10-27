import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { IconButton, InputAdornment, OutlinedInput, styled, TextField } from "@mui/material";
import { ArrowLeft, Check, Mail } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Checkbox } from "@/components.v2/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components.v2/ui/dialog";
import OtpInput from "react-otp-input";
import { blockInvalidChar } from "@/components/LoginCard";
import AadhaVerifyModal from "./AadhaVerifyModal";
import ConfirmDetailsModal from "./ConfirmDetailsModal";
import { getAadharOtp, getSelectedPlanDates, getUserKycStatus, postCheckout } from "../../../api/payment/index";
import { useToast } from "@/components.v2/ui/use-toast";
import { IPaymentContext, usePaymentContext } from "@/contexts/PaymentContext";
import AuthContext from "@/components/AuthContext";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

// Custom styled OutlinedInput
export const CustomTextField = styled(TextField)({
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
      paddingLeft: "12px",
    },
    "& input::placeholder": {
      fontSize: "14px",
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 1,
    },
  },
});
interface IFormInput {
  aadhar: string;
  fullname: string;
  pan: string;
  address: string;
  email: string;
  phone: string;
  gstin: string;
}

export default function DetailSection({ setActiveTab }: { setActiveTab: any }) {
  const [gstChecked, setGstChecked] = useState(false);
  // const [aadhar, setAadhar] = useState("");
  const [aadharRequestId, setAadharRequestId] = useState("");
  const [displayModal, setDisplayModal] = useState("AADHAR");
  const [openDialog, setOpenDialog] = useState(false);
  const [aadharOtpLoading, setAadharOtpLoading] = useState(false);
  const { isAadharAlreadyVerified, userDetails, planDetails, currentPlan, isPanAlreadyVerified } =
    usePaymentContext() as IPaymentContext;
  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    defaultValues: {
      aadhar: "",
      fullname: "",
      pan: "",
      phone: "",
      email: "",
      gstin: "",
      address: "",
    },
  });
  const aadhar = getValues("aadhar")
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const handleAadharOtp: SubmitHandler<IFormInput> = async (data) => {
    try {
      setAadharOtpLoading(true);
      const res = await getAadharOtp({ aadhaar: data?.aadhar });
      setAadharRequestId(res?.result?.requestId);
      setOpenDialog(true);
      // setAadharRequestId(res?.)
    } catch (e: any) {
      toast({
        variant: "warn",
        title: "",
        description: e?.response?.data?.message,
      });
    } finally {
      setAadharOtpLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      const params = {
        base_amount: planDetails.basePrice,
        subscription: currentPlan.planId,
        final_amount: planDetails.totalPayable,
        tax_amount: planDetails.taxAmount,
        // "discount_code":"TEST2",
        // "discount_percentage":0,
        // "discount_amount":,
        address: userDetails.address,
        name: userDetails.name,
        user_email: userDetails.email,
        user_contact: userDetails.phone,
      };
      const res = await postCheckout(params);
      console.log(res);
    } catch (e) {}
  };
  useEffect(() => {
    if (errors.aadhar) {
      toast({
        variant: "warn",
        title: errors.aadhar.message,
      });
    }
  }, [errors]);

  return (
    <div className="mt-9">
      <div className="flex items-center mb-9">
        <button onClick={() => setActiveTab("review")}>
          <ArrowLeft size={18} />
        </button>
        <p className="ml-[5px] text-xs text-gray-600">Go Back to Previous Page</p>
      </div>
      <div className="grid grid-cols-2 gap-y-9 gap-x-[22px]">
        {!isAadharAlreadyVerified ? (
          <div className="col-span-2">
            <Dialog onOpenChange={setOpenDialog} open={openDialog}>
              <p className="text-xs text-gray-500">
                Aadhar Card Number<span className="text-error-500">*</span>
              </p>
              <Controller
                name="aadhar"
                control={control}
                rules={{
                  required: "Enter aadhar to continue",
                  pattern: {
                    value: /^\d{4}\d{4}\d{4}$/,
                    message: '"Enter a valid Aadhar number in the format XXXX XXXX XXXX"',
                  },
                }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    type="number"
                    id="aadhar-number"
                    // onChange={(e) => setAadhar(e.target.value)}
                    variant="outlined"
                    fullWidth
                    placeholder="Enter your Aadhar Card Number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment className="!pr-0" position="end">
                          <DialogTrigger>
                            <Button
                              loading={aadharOtpLoading}
                              onClick={handleSubmit(handleAadharOtp)}
                              className="min-w-fit !p-3 !py-[6px] !h-fit"
                              variant={ButtonVariant.primary}
                            >
                              <p className="text-sm font-semibold">Send OTP</p>
                            </Button>
                          </DialogTrigger>
                        </InputAdornment>
                      ),
                    }}
                    className="!mt-[6px] pl-3  !py-[9px] !pr-[0px] !rounded-[6.2px] !border-[#0000000F]"
                  />
                )}
              />

              {displayModal.includes("AADHAR") ? (
                <AadhaVerifyModal setDisplayModal={setDisplayModal} aadhar={aadhar} requestId={aadharRequestId} />
              ) : null}
              {displayModal.includes("CONFIRM") ? <ConfirmDetailsModal /> : null}
            </Dialog>
            <p className="text-3xs text-gray-500 mt-[6px]">
              Mandatory as per SEBI rules (OTP will be sent to the mobile no. linked to your Aadhar Card)
            </p>
          </div>
        ) : null}

        {userDetails?.name ? (
          <div className="col-span-2">
            <p className="text-xs text-gray-500">
              Full Name<span className="text-error-500">*</span>
            </p>
            <CustomTextField
              id="full-name"
              type="text"
              value={userDetails.name}
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
        ) : null}
        {(isAadharAlreadyVerified && !isPanAlreadyVerified) || userDetails.pan ? (
          <>
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
          </>
        ) : null}
        {userDetails?.address && (
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
        )}

        <div className="col-span-1">
          <p className="text-xs text-gray-500">
            Email<span className="text-error-500">*</span>
          </p>
          <div className="flex">
            <CustomTextField
              value={userDetails.email}
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
                value={userDetails.phone}
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
          <Checkbox checked={gstChecked} onCheckedChange={(checked) => setGstChecked(checked as boolean)} id="GSTIN" />
          <p className=" text-sm text-gray-950">Use GSTIN for this order</p>
        </div>

        {gstChecked && (
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
                      <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon" />
                    </InputAdornment>
                  ),
                }}
                className="!mt-[6px]  !pr-[6px] !rounded-[6.2px]"
              />
            </div>
          </div>
        )}

        <div className="col-span-2 ">
          <Button onClick={handleCheckout} className=" w-full" variant={ButtonVariant.primary}>
            <p className=" text-sm font-medium">Proceed to Checkout</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
