import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useResend } from "../../../../hooks/useResend";
import { getOtp } from "./EmailChangDialog";
import { toast } from "@/components.v2/ui/use-toast";
import { verifyUserProfileOtp } from "@/api/profile";
import { DialogContent } from "@/components.v2/ui/dialog";
import OTPInput from "react-otp-input";
import { blockInvalidChar } from "@/components/LoginCard";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";

interface IVerifyEmailOtpDialog {
  email: string;
  goBack: () => void;
  closeDialog: () => void;
}

export const VerifyEmailOtpDialog = ({ email, goBack, closeDialog }: IVerifyEmailOtpDialog) => {
  const [otp, setOtp] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const { resendOtp, reset, secondsRemaining } = useResend();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:600px)");
  const verySmallScreen = useMediaQuery("(max-width:400px)");

  async function handleResend() {
    try {
      const hasSentOtp = await getOtp({ email });
      reset();
      if (hasSentOtp) {
        toast({
          variant: "success",
          description: " OTP resent successfully!",
        });
      }
    } catch (e: any) {
      toast({
        variant: "warn",
        description: e?.response?.data?.message || e?.message || "Something went wrong.",
      });
    }
  }

  async function handleVerifyOtp() {
    try {
      setVerifyingOtp(true);
      const res = await verifyUserProfileOtp({
        type: "email",
        email,
        otp,
      });
      toast({
        variant: "success",
        description: res?.message,
      });
      closeDialog();
      router.reload();
    } catch (e: any) {
      toast({
        variant: "danger",
        description: e?.response?.data?.message || e?.message || "Something went wrong.",
      });
    } finally {
      setVerifyingOtp(false);
    }
  }

  return (
    <DialogContent closeClassName='-right-2 -top-[12px] opacity-100' className=" flex flex-col p-6 gap-y-6 !rounded-[20px] w-[calc(100%-32px)]  max-w-[624px] open_sans">
      <h4 className=" text-[20px] font-semibold text-gray-900 mb-0">Verify your email</h4>
      <p className=" text-sm text-gray-500">
        Please enter the OTP sent to {email}.{" "}
        <button onClick={goBack} className=" text-brand-500">
          Edit Email
        </button>
      </p>
      <div>
        <OTPInput
          inputType="number"
          value={otp}
          numInputs={6}
          containerStyle={{
            gap: isMobile ? "2px" : "10px",
          }}
          inputStyle={{
            height: verySmallScreen ? "38px" : "44px",
            width: verySmallScreen ? "38px" : "44px",

            border: "1px solid #B7BDC7",
            borderRadius: "6.2px",
            background: "#fff",
          }}
          renderInput={(props) => (
            <input {...props} type="number" onKeyDown={(e) => blockInvalidChar(e, props.onKeyDown)} />
          )}
          onChange={setOtp}
          renderSeparator={<span></span>}
          shouldAutoFocus={true}
          // disabled={isLoading}
        />
         <p className=" text-2xs mt-5">
        {" "}
        Haven’t received the OTP?{" "}
        {secondsRemaining === 0 ? (
          <button onClick={handleResend} className=" text-[#1D4040] text-2xs font-semibold">
            Resend
          </button>
        ) : (
          `${secondsRemaining} seconds`
        )}
      </p>
      </div>
     
      <div className=" mt-1 flex items-center justify-end gap-x-4">
        <Button onClick={closeDialog} className=" !py-3" variant={ButtonVariant.tertiary}>
          <p className=" text-sm">Cancel</p>
        </Button>
        <Button
          loading={verifyingOtp}
          onClick={handleVerifyOtp}
          disabled={otp.length < 6}
          className=" !p-3"
          variant={ButtonVariant.primary}
        >
          <p className=" text-sm">Confirm</p>
        </Button>
      </div>
    </DialogContent>
  );
};

export default VerifyEmailOtpDialog