import { getUserProfileOtp } from "@/api/profile";
import { Button, ButtonVariant } from "@/components.v2/button/button";
import { DialogContent } from "@/components.v2/ui/dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/components.v2/ui/use-toast";
import { VerifyEmailOtpDialog } from "./VerifyEmailOtpDialog";

interface IEmailModal {
  email: string;
 
}

interface IGetOtp{
  email?:string;
  phone?:string;
}

interface IEmailChangeDialog {
  closeDialog: () => void;
  dialogStatus:boolean;
}

export async function getOtp(data: IGetOtp) {
  try {
    const params = {
      type: "email",
      email: data.email?.trim(),
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

export const EmailChangeDialog = ({ closeDialog, dialogStatus }: IEmailChangeDialog) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const [displayVerifyDialog, setDisplayVerifyDialog] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const email = watch("email");
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}\s*$/;
  const validEmail = email.length > 1 && !errors.email?.message && emailRegex.test(email);

  async function handleGetOtp(data: IEmailModal) {
    try {
      setSendingOtp(true);
      const hasSentOtp = await getOtp(data);
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
    //if user closes verify dialog, reset dialog to show email input section , if dialog is opened again
    if(!dialogStatus){
      setDisplayVerifyDialog(false)
    }
  },[dialogStatus])

  return displayVerifyDialog ? (
    <VerifyEmailOtpDialog
      email={email}
      goBack={() => {
        setDisplayVerifyDialog(false);
      }}
      closeDialog={closeDialog}
    />
  ) : (
    <DialogContent closeClassName='-right-2 -top-[12px] opacity-100' className=" flex flex-col p-6 gap-0 !rounded-[20px] w-[calc(100%-32px)]  max-w-[624px] open_sans">
      <h4 className=" text-[20px] font-semibold text-gray-900">Edit Email</h4>
      <p className=" text-xs text-gray-500 mb-1">
        Email <span className=" text-error-500">*</span>
      </p>
      <div
        className={` flex items-center gap-x-[6.2px] py-2 px-[10px] rounded-md border ${
          errors.email?.message ? "border-error-500" : "border-[#0000000F]"
        } `}
      >
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.0583 4.12499C15.0583 3.41457 14.477 2.83332 13.7666 2.83332H3.43327C2.72285 2.83332 2.1416 3.41457 2.1416 4.12499M15.0583 4.12499V11.875C15.0583 12.5854 14.477 13.1667 13.7666 13.1667H3.43327C2.72285 13.1667 2.1416 12.5854 2.1416 11.875V4.12499M15.0583 4.12499L8.59994 8.64582L2.1416 4.12499"
            stroke="#667085"
            stroke-width="1.29167"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <input
          {...register("email", {
            required: "Enter email to continue",
            pattern: {
              value: emailRegex,
              message: "Enter a valid email",
            },
          })}
          className=" text-sm bg-transparent inline-block flex-1 w-full"
          placeholder="Enter your Email"
          type="text"
        />
      </div>
      <p className=" text-xs text-error-500 mt-1">{errors?.email?.message || <span> &nbsp;</span>}</p>
      <div className=" mt-1 flex items-center justify-end gap-x-4">
        <Button onClick={closeDialog} className=" !py-3" variant={ButtonVariant.tertiary}>
          <p className=" text-sm">Cancel</p>
        </Button>
        <Button
          loading={sendingOtp}
          onClick={handleSubmit(handleGetOtp)}
          disabled={!validEmail}
          className=" !p-3"
          variant={ButtonVariant.primary}
        >
          <p className=" text-sm">Get OTP</p>
        </Button>
      </div>
    </DialogContent>
  );
};

export default EmailChangeDialog