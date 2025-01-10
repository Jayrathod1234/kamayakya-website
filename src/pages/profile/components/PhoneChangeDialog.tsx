import { getUserProfileOtp } from "@/api/profile";
import { Button, ButtonVariant } from "@/components.v2/button/button";
import { DialogContent } from "@/components.v2/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "@/components.v2/ui/use-toast";
import { VerifyEmailOtpDialog } from "./VerifyEmailOtpDialog";
import PhoneInput, { isPossiblePhoneNumber, getCountryCallingCode, isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useForm, Controller } from "react-hook-form";
import { VerifyPhoneDialog } from "./VerifyPhoneDialog";

interface IPhoneModal {
  phone: string;
}

interface IGetOtp{
  phone:string;
  countryCode:string
}

interface IPhoneChangeDialog {
  closeDialog: () => void;
  dialogStatus:boolean;
}

export async function getOtp(data: IGetOtp) {
  try {
    const params = {
      type: "mobile",
      mobile: data.phone?.trim(),
      country_code:`+${data.countryCode}`
    };
    const res = await getUserProfileOtp(params);
    if (res?.status_code) {
      return true;
    }
    return false;
  } catch (e) {
    throw e;
  }
}

export const PhoneChangeDialog = ({ closeDialog, dialogStatus }: IPhoneChangeDialog) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      phone: "",
    },
  });
  const [displayVerifyDialog, setDisplayVerifyDialog] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [countryCode, setCountryCode] = useState("91");
  const [country, setCountry] = useState("IN");
  const phone = watch("phone");
  const notValidPhone = !isValidPhoneNumber(phone || "");

  async function handleGetOtp(data: IPhoneModal) {
    try {
      setSendingOtp(true);
      const hasSentOtp = await getOtp({...data,countryCode});
      if (hasSentOtp) {
        setDisplayVerifyDialog(true);
      }
    } catch (e: any) {
      toast({
        variant: "warn",
        description: e?.response?.data?.message || e?.message || "Something went wrong.",
      });
    } finally {
      setSendingOtp(false);
    }
  }

  useEffect(()=>{
      //if user closes verify dialog, reset dialog to show phone input section , if dialog is opened again
      if(!dialogStatus){
        setDisplayVerifyDialog(false)
      }
    },[dialogStatus])

  return displayVerifyDialog ? (
    <VerifyPhoneDialog
      phone={phone}
      countryCode={countryCode}
      goBack={() => {
        setDisplayVerifyDialog(false);
      }}
      closeDialog={closeDialog}
    />
  ) : (
    <DialogContent closeClassName='-right-2 -top-[12px] opacity-100' className=" flex flex-col p-6 gap-0 !rounded-[20px] w-[calc(100%-32px)]  max-w-[624px] open_sans">
      <h4 className=" text-[20px] font-semibold text-gray-900">Edit Mobile Number</h4>
      <p className=" text-xs text-gray-500 mb-1">
        Mobile Number <span className=" text-error-500">*</span>
      </p>
      <div
        className={` flex items-center gap-x-[6.2px] py-2 px-[10px] rounded-md border ${
          errors.phone?.message ? "border-error-500" : "border-[#0000000F]"
        } `}
      >
        <Controller
          name="phone"
          control={control}
          rules={{
            required: "Enter phone to continue",
            validate: (value) => {
              return isPossiblePhoneNumber(value) ? true : "Enter valid mobile number";
            },
          }}
          render={({ field: { value, onChange } }) => (
            <>
              <PhoneInput
                // value={value}
                onChange={onChange}
                onCountryChange={(countryCode) => {
                  if (countryCode) {
                    const currentCode = getCountryCallingCode(countryCode);
                    setCountry(countryCode);
                    setCountryCode(currentCode);
                  }
                }}
                //@ts-ignore
                defaultCountry={country}
                placeholder="Enter phone number"
                className=" border-green-400 "
              />
            </>
          )}
        />
      </div>
      <p className=" text-xs text-error-500 mt-1">{errors?.phone?.message || <span> &nbsp;</span>}</p>
      <div className=" mt-1 flex items-center justify-end gap-x-4">
        <Button onClick={closeDialog} className=" !py-3" variant={ButtonVariant.tertiary}>
          <p className=" text-sm">Cancel</p>
        </Button>
        <Button
          loading={sendingOtp}
          onClick={handleSubmit(handleGetOtp)}
          disabled={notValidPhone}
          className=" !p-3"
          variant={ButtonVariant.primary}
        >
          <p className=" text-sm">Get OTP</p>
        </Button>
      </div>
    </DialogContent>
  );
};

export default PhoneChangeDialog