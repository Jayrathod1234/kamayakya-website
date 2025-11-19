import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useResend } from "../../../../hooks/useResend";
import { getOtp } from "./PhoneChangeDialog";
import { toast } from "@/components.v2/ui/use-toast";
import { verifyUserProfileOtp } from "@/api/profile";
import { DialogContent } from "@/components.v2/ui/dialog";
import OTPInput from "react-otp-input";
import { blockInvalidChar } from "@/components/LoginCard";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { getMixPanelClient } from "@/externals/mixpanel";

interface IVerifyPhoneOtpDialog {
  phone: string;
  countryCode: string;
  goBack: () => void;
  closeDialog: () => void;
}

export const VerifyPhoneDialog = ({ phone, countryCode, goBack, closeDialog }: IVerifyPhoneOtpDialog) => {
  const [otp, setOtp] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const { resendOtp, reset, secondsRemaining } = useResend();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:600px)");
  const verySmallScreen = useMediaQuery("(max-width:400px)");

  async function handleResend() {
    try {
      const hasSentOtp = await getOtp({ phone, countryCode });
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
      const mp = getMixPanelClient();
      mp.track("verifyotp_confirmed", {
        page: "profile_page",
      });
      const res = await verifyUserProfileOtp({
        type: "mobile",
        mobile: phone,
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
    <DialogContent
      closeClassName="-right-2 -top-[12px] opacity-100"
      className=" flex flex-col p-6 gap-y-6 !rounded-[20px] w-[calc(100%-32px)]  max-w-[624px] open_sans"
    >
      <h4 className=" text-[20px] font-semibold text-gray-900 mb-0">Verify your Mobile Number</h4>
      <p className=" text-sm text-gray-500">
        Please enter the OTP sent to{" "}
        {countryCode !== "91" ? (
          <span className="inline-flex items-center">
            your{" "}
            <svg
              className=" mx-1 "
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.02832 18.5862L3.15082 14.4883C2.45832 13.2891 2.09415 11.9283 2.09457 10.5345C2.09665 6.17409 5.64499 2.62659 10.0058 2.62659C12.1221 2.62742 14.1079 3.45117 15.6017 4.94575C17.095 6.44075 17.9175 8.42742 17.9167 10.5408C17.915 14.9012 14.3658 18.4491 10.0058 18.4491H10.0025C8.67874 18.4487 7.37749 18.1166 6.22207 17.4862L2.02832 18.5862Z"
                fill="white"
              />
              <path
                d="M2.02822 18.7945C1.97322 18.7945 1.91989 18.7728 1.8803 18.7328C1.82822 18.6799 1.8078 18.6028 1.82739 18.5315L2.92697 14.5165C2.2453 13.3057 1.88572 11.9307 1.88655 10.5349C1.88822 6.05905 5.5303 2.41821 10.0057 2.41821C12.1766 2.41905 14.2161 3.26446 15.7491 4.79863C17.282 6.33321 18.1257 8.37238 18.1249 10.5407C18.1232 15.0161 14.4807 18.6574 10.0057 18.6574C8.67697 18.657 7.36239 18.329 6.19572 17.7086L2.08114 18.7874C2.06364 18.7924 2.04614 18.7945 2.02822 18.7945Z"
                fill="white"
              />
              <path
                d="M10.0059 2.62651C12.1222 2.62734 14.108 3.45109 15.6017 4.94567C17.0951 6.44067 17.9176 8.42734 17.9167 10.5407C17.9151 14.9011 14.3659 18.449 10.0059 18.449H10.0026C8.67883 18.4486 7.37758 18.1165 6.22216 17.4861L2.02841 18.5861L3.15091 14.4882C2.45841 13.289 2.09424 11.9282 2.09466 10.5344C2.09674 6.174 5.64508 2.62651 10.0059 2.62651ZM10.0059 2.20984C5.41591 2.20984 1.68008 5.944 1.67799 10.5344C1.67758 11.9373 2.03174 13.3198 2.70341 14.5436L1.62633 18.4765C1.58716 18.6203 1.62716 18.7736 1.73216 18.8794C1.81133 18.9594 1.91841 19.0032 2.02841 19.0032C2.06383 19.0032 2.09924 18.9986 2.13424 18.9894L6.17049 17.9311C7.34883 18.5428 8.66966 18.8657 10.0026 18.8661C14.5959 18.8661 18.3317 15.1315 18.3338 10.5411C18.3347 8.3165 17.4692 6.22484 15.8972 4.6515C14.3242 3.07776 12.2322 2.21067 10.0059 2.20984Z"
                fill="#CFD8DC"
              />
              <path
                d="M14.6566 5.8899C13.4149 4.6474 11.7645 3.96282 10.0078 3.9624C6.38118 3.9624 3.4316 6.91073 3.42993 10.5349C3.42952 11.777 3.77702 12.9861 4.43535 14.0332L4.59201 14.282L3.92743 16.7074L6.41618 16.0549L6.6566 16.1974C7.66576 16.7966 8.82326 17.1132 10.0033 17.1137H10.0058C13.6299 17.1137 16.5795 14.1649 16.5808 10.5403C16.5812 8.78407 15.8983 7.1324 14.6566 5.8899Z"
                fill="#40C351"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.02827 7.22858C7.88035 6.89942 7.72452 6.89275 7.58327 6.88692C7.46785 6.88192 7.33619 6.88233 7.20452 6.88233C7.07285 6.88233 6.85868 6.93192 6.67743 7.12983C6.49618 7.32775 5.98535 7.80567 5.98535 8.77817C5.98535 9.75067 6.69369 10.6907 6.79244 10.8223C6.89119 10.954 8.15994 13.0136 10.1691 13.8061C11.8387 14.4644 12.1787 14.3336 12.5412 14.3007C12.9037 14.2677 13.7108 13.8227 13.8754 13.3611C14.0399 12.8994 14.0399 12.504 13.9908 12.4215C13.9412 12.339 13.8095 12.2898 13.612 12.1907C13.4145 12.0915 12.4424 11.6136 12.2612 11.5477C12.0799 11.4819 11.9483 11.449 11.8162 11.6469C11.6845 11.8444 11.3058 12.2898 11.1904 12.4215C11.0749 12.5536 10.9595 12.5702 10.762 12.4711C10.5645 12.3719 9.92785 12.1636 9.17244 11.4902C8.58494 10.9665 8.18827 10.3194 8.07285 10.1215C7.95744 9.924 8.06035 9.81692 8.15952 9.71817C8.24827 9.62942 8.35702 9.48733 8.45619 9.37192C8.55494 9.2565 8.58785 9.174 8.65368 9.04233C8.71952 8.91025 8.6866 8.79483 8.63702 8.69608C8.58827 8.59692 8.2041 7.61942 8.02827 7.22858Z"
                fill="white"
              />
            </svg>
            WhatsApp number
          </span>
        ) : null}{" "}
        {phone}.{" "}
        <button onClick={goBack} className=" text-brand-500">
          Edit Mobile Number
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
        <Button
          onClick={() => {
            const mp = getMixPanelClient();
            mp.track("verifyotp_cancelled", {
              page: "profile_page",
            });
            closeDialog();
          }}
          className=" !py-3"
          variant={ButtonVariant.tertiary}
        >
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

export default VerifyPhoneDialog;
