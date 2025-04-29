import { getAadharOtp, postAadharOtp } from "@/api/payment";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Checkbox } from "@/components.v2/ui/checkbox";
import { DialogClose, DialogContent } from "@/components.v2/ui/dialog";
import { toast } from "@/components.v2/ui/use-toast";
import { blockInvalidChar } from "@/components/LoginCard";
import { IPaymentContext, usePaymentContext } from "@/contexts/PaymentContext";
import { useMediaQuery } from "@mui/material";
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
  setBillingSameAsAadhar,
  setDisplayFailedAddharModal,
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
  const [secondsRemaining, setSecondsRemaining] = useState(15);
  const [resendOtp, setResendOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchAadharFailed, setFetchAadharFailed] = useState(false);
  const isMobile = useMediaQuery("(max-width:640px)");
  const verySmallScreen = useMediaQuery("(max-width:400px)");
  const handleVerifyAadharOtp = async () => {
    try {
      setLoading(true);

      let res = await postAadharOtp({ aadhar, request_id: requestId, otp });

      let address = res?.address;
     
      if (res?.is_aadhar_verified && res?.is_aadhar_vintage) {
        // setOpenDialog(false);
        // toast({
        //   variant: "warn",
        //   description: res?.message,
        // });
        // return;
        setUserDetails((prev) => ({
          ...prev,
          pan: res?.pan_number,
          name: res?.name,
          address: address,
          aadhar: res?.masked_aadhar,
          maskedPan: res?.masked_pan_number,
        }));
        setDisplayModal("CONFIRM");
      }else{
        setFetchAadharFailed(true);
      }

      // setUserDetails((prev) => ({
      //   ...prev,
      //   pan: res?.pan_number,
      //   name: res?.name,
      //   address: address,
      //   aadhar: res?.masked_aadhar,
      //   maskedPan: res?.masked_pan_number,
      // }));
      // setDisplayModal("CONFIRM");
    } catch (e) {
      if (e?.response?.data?.message === "Source down") {
        setFetchAadharFailed(true);
        return;
      } else {
        toast({
          variant: "warn",
          description: e?.response?.data?.message,
        });
      }
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
      if (typeof e?.response?.data?.message === "string") {
        if (e?.response?.data?.message?.includes("Invalid Aadhaar")) {
          toast({
            variant: "warn",
            title: "",
            description: "Invalid Aadhaar Number. Please check and re-enter a valid Aadhaar Number.",
          });
          return;
        }
        if (e?.response?.data?.message == "Source down") {
          setDisplayFailedAddharModal(true);
          setOpenDialog(true);
          return;
        }
      }

      if (e?.response?.data?.detail?.includes("Token ")) {
        toast({
          variant: "warn",
          title: "",
          description: "Session Expired! Please relogin and try again. ",
        });
      }

      toast({
        variant: "warn",
        title: "",
        description: e?.response?.data?.message || e?.response?.data?.detail || "Something went wrong.",
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
      setFetchAadharFailed(false);
    }
  }, [openDialog]);

  if (fetchAadharFailed) {
    return (
      <DialogContent
        closeClassName=" -right-2 -top-[12px] opacity-100"
        className=" !p-6 !rounded-[20px] w-[calc(100%-32px)]  md:min-w-[400px] max-w-[400px] open_sans"
      >
        <div>
          <img src="/assets/failed_aadhar_fetch.svg" alt="error-image" />
          <h2 className=" font-bold text-xl mt-6">We’re having trouble fetching your Aadhaar details!</h2>
          <p className=" text-sm text-[#737373] mt-3">
            Oops! 🚧
            <br />
            Our system’s having a coffee break while fetching Aadhaar details, or there might be a connection issue on
            your end. Please try again a few times, or check back in 15-20 minutes. Thanks for understanding and for
            being awesome!
          </p>
          <div className=" flex  items-center gap-x-[10px] mt-6 ml-auto w-fit">
            <DialogClose asChild>
              <Button onClick={() => setFetchAadharFailed(false)} variant={ButtonVariant.tertiary}>
                Close
              </Button>
            </DialogClose>
            <Button
              onClick={() => {
                handleAadharOtp();
                setOtp("");
                setFetchAadharFailed(false);
              }}
              variant={ButtonVariant.primary}
            >
              Try again
            </Button>
          </div>
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent
      closeClassName=" -right-2 -top-[12px] opacity-100"
      className=" !p-6 !rounded-[20px]  w-[calc(100%-32px)] mx-auto md:min-w-[624px] max-w-[784px]"
    >
      <div className=" flex flex-col md:flex-row gap-6 min-w-0">
        <div className="bg-[#FEB359] flex items-center justify-center px-[46px] h-[200px] min-w-fit sm:h-[358px] rounded-[20px]">
          <img className=" max-sm:w-[120px] max-sm:h-[120px]" width={192} height={192} src="/assets/verifyAadhar.gif" />
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
                  gap: isMobile ? "2px" : "10px",
                }}
                inputStyle={{
                  height: verySmallScreen ? "38px" : "44px",
                  width: verySmallScreen ? "38px" : "44px",
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
