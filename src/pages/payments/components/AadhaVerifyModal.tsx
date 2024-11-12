import { getAadharOtp, postAadharOtp } from "@/api/payment";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Checkbox } from "@/components.v2/ui/checkbox";
import { DialogClose, DialogContent } from "@/components.v2/ui/dialog";
import { useToast } from "@/components.v2/ui/use-toast";
import { blockInvalidChar } from "@/components/LoginCard";
import { IPaymentContext, usePaymentContext } from "@/contexts/PaymentContext";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";

export default function AadhaVerifyModal({
  aadhar,
  requestId,
  setAadharRequestId,
  setDisplayModal,
  setOpenDialog,
  openDialog,
  displayModal,
  setBillingSameAsAadhar
}: {
  setAadharRequestId: React.Dispatch<React.SetStateAction<string>>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  aadhar: string;
  requestId: string;
  setDisplayModal: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [otp, setOtp] = useState("");
  const [consetGranted, setConsetGranted] = useState(false);
  const { setUserDetails, setIsAadharAlreadyVerified, setIsPanAlreadyVerified } =
    usePaymentContext() as IPaymentContext;
  const { toast } = useToast();
  const [secondsRemaining, setSecondsRemaining] = useState(15);
  const [resendOtp, setResendOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchAadharFailed, setFetchAadharFailed] = useState(false);

  const handleVerifyAadharOtp = async () => {
    try {
      setLoading(true);
      const res = await postAadharOtp({ aadhar, request_id: requestId, otp });
      // let address = Object.values(res?.address || {}).filter(value=>value).join(", ");
      let address = res?.address;
      if (res?.is_aadhar_verified) {
        setOpenDialog(false);
        toast({
          variant: "warn",
          description: res?.message,
        });
        return;
      }
      setBillingSameAsAadhar(true)
      setUserDetails((prev) => ({ ...prev, pan: res?.pan_number, name: res?.name, address: address, aadhar: aadhar }));
      setDisplayModal("CONFIRM");
    } catch (e) {
      setFetchAadharFailed(true);
      // toast({
      //   variant: "warn",
      //   description: e?.response?.data?.message,
      // });
    } finally {
      setLoading(false);
    }
  };

  const handleAadharOtp = async () => {
    try {
      // setAadharOtpLoading(true);
      setResendOtp(true);
      const res = await getAadharOtp({ aadhaar: aadhar });
      // { result: { requestId: "dklsjfklsdlkfjdf" } };
      //
      setAadharRequestId(res?.result?.requestId);
      // setOpenDialog(true);
      // setAadharRequestId(res?.)
    } catch (e: any) {
      toast({
        variant: "warn",
        title: "",
        description: e?.response?.data?.message,
      });
    } finally {
      // setAadharOtpLoading(false);
    }
  };

  useEffect(() => {
    if (resendOtp) {
      setSecondsRemaining(30); // Start the countdown timer when the modal is shown
    }
  }, [resendOtp]);

  useEffect(() => {
    if (secondsRemaining > 0) {
      const timer = setTimeout(() => {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [secondsRemaining]);

  useEffect(() => {
    if (openDialog && displayModal === "AADHAR") {
      setSecondsRemaining(15);
    }
    if (!openDialog) {
      setOtp("");
      setFetchAadharFailed(false)
    }
  }, [openDialog]);



  if (fetchAadharFailed) {
    return (
      <DialogContent className=" !p-6 !rounded-[20px]  md:min-w-[400px] max-w-[400px] open_sans">
        <div>
          <img src="/assets/failed_aadhar_fetch.svg" alt="error-image" />
          <h2 className=" font-semibold text-xl mt-6">Unable to fetch aadhar details!</h2>
          <p className=" text-sm text-[#737373] mt-3">
            Oops! We couldn’t fetch your Aadhaar details. Ensure your Aadhaar number is correct, or try again later.
          </p>
          <div className=" flex  items-center gap-x-[10px] mt-6 ml-auto">
            <DialogClose asChild>
              <Button onClick={() => setFetchAadharFailed(false)} variant={ButtonVariant.tertiary}>
                Close
              </Button>
            </DialogClose>
            <Button onClick={() => setFetchAadharFailed(false)} variant={ButtonVariant.primary}>
              Try again
            </Button>
          </div>
        </div>
      </DialogContent>
    );
  }

 

  return (
    <DialogContent closeClassName=" -right-2 -top-[12px] opacity-100" className=" !p-6 !rounded-[20px]  w-[calc(100%-32px)] mx-auto md:min-w-[624px] max-w-[784px]">
      <div className=" flex flex-col md:flex-row gap-6">
        <div className="bg-[#FEB359] flex items-center justify-center px-[46px] h-[200px] sm:h-[380px] min-w-fit rounded-[20px]">
          <img width={192} height={192} src="/assets/verifyAadhar.gif" />
        </div>

        <div className=" flex flex-col gap-y-6">
          <p className=" text-xl text-[#101828] font-semibold">Verify Your Aadhar Card</p>
          <p className=" text-sm text-[#737373]">
            We have sent a One Time Password (OTP) to the mobile number linked to your aadhar card. Please enter it to
            complete verification
          </p>
          <div className=" md:mt-4">
            <div>
              <OTPInput
                inputType="number"
                value={otp}
                numInputs={6}
                containerStyle={{
                  gap: "10px",
                }}
                inputStyle={{
                  height: "44px",
                  width: "44px",
                  border: "1px solid #B7BDC7",
                  borderRadius: "6.2px",
                  background: "#fff",
                  "-moz-appearance": "textfield",
                }}
                renderInput={(props) => (
                  <input {...props} type="number" onKeyDown={(e) => blockInvalidChar(e, props.onKeyDown)} />
                )}
                onChange={setOtp}
                renderSeparator={<span></span>}
                shouldAutoFocus={true}
                // disabled={isLoading}
              />
            </div>
            <p className=" text-2xs mt-2">
              {" "}
              Haven’t received the OTP?{" "}
              {secondsRemaining === 0 ? (
                <button className=" text-[#1D4040] text-2xs font-semibold" onClick={handleAadharOtp}>
                  Resend
                </button>
              ) : (
                `${secondsRemaining} seconds`
              )}
            </p>
            <div className=" mt-7 p-3 bg-[#F8FFFE] border border-[#E7F8F8] rounded-lg flex gap-x-2 items-center">
              {/* <Checkbox onCheckedChange={(checked) => setConsetGranted(checked as boolean)} /> */}
              <p className=" text-[#101828] text-2xs">
                By verifying OTP, you consent to us retrieving your PAN as per SEBI guidelines.
              </p>
            </div>
          </div>
          <Button
            loading={loading}
            disabled={otp.length !== 6}
            onClick={handleVerifyAadharOtp}
            className=" ml-auto"
            variant={ButtonVariant.primary}
          >
            <p>Verify OTP</p>
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
