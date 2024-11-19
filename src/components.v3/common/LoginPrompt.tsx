import { Dialog, DialogContent, DialogTrigger } from "@/components.v2/ui/dialog";
import React, { useContext, useEffect, useState } from "react";
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Line } from "@/components.v2/blogs/blog-card-sm";
import { Mail, Phone } from "lucide-react";
import OTPInput from "react-otp-input";
import { useMediaQuery } from "@mui/material";
import { blockInvalidChar } from "@/components/LoginCard";
import { getLoginOtp, verifyLoginOtp } from "../../api/onboarding/index";
import { useRouter } from "next/router";
import AuthContext from "@/components/AuthContext";

interface ILoginPrompt {
  triggerEle: React.ReactNode;
}

const NewUserList = ({ label }: { label: string }) => {
  return (
    <div className="flex max-sm:items-center items-start gap-x-[6px] sm:gap-x-[10px]">
      <img height={11} width={11} className=" object-cover" src="/assets/onboarding_tick.svg" alt="tick" />
      <p className=" text-[#00000085] text-2xs sm:text-sm">{label}</p>
    </div>
  );
};

interface IFormData {
  phone: string;
  email: string;
}

const SignUpContent = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      phone: "",
      email: "",
    },
  });

  const [loginMethod, setLoginMethod] = useState<"mobile" | "email">("mobile");
  const [secondsRemaining, setSecondsRemaining] = useState(15);
  const [resendOtp, setResendOtp] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [displayOtpModal, setDisplayOtpModal] = useState(false);
  const { setUser } = useContext(AuthContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const phone = watch("phone");
  const email = watch("email");
  const router = useRouter();

  const handleRequestOtp = async (data: IFormData) => {
    let params = {
      type: loginMethod,
    };
    if (loginMethod === "mobile") {
      params = {
        ...params,
        mobile: data.phone,
      };
    } else {
      params = {
        ...params,
        email: data.email,
      };
    }
    try {
      setOtpLoading(true);
      const res = await getLoginOtp(params);
      if (res?.status_code === 200) {
        setDisplayOtpModal(true);
      }
    } catch (e) {
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      let params = {
        type: loginMethod,
        otp,
      };
      if (loginMethod === "mobile") {
        params = {
          ...params,
          mobile: phone,
        };
      } else {
        params = {
          ...params,
          email: email,
        };
      }
      setVerifyingOtp(true);
      const res = await verifyLoginOtp(params);
      if (res?.status_code === 200) {
        setUser((prev) => ({ ...prev, id: res?.user_id, fullname: res?.full_name, email: res?.email }));
        if (!res?.is_onboard) {
          router.push("/onboarding");
        } else {
          
          localStorage.setItem("access", res.access);
          localStorage.setItem("refresh", res.refresh);
          router.reload()
        }
      }
    } catch (e) {
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleEditMobile = () => {
    setDisplayOtpModal(false);
    setValue("phone", "");
    setValue("email", "");
    setOtp("");
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

  // useEffect(() => {
  //   if (openDialog && displayModal === "AADHAR") {
  //     setSecondsRemaining(15);
  //   }
  //   if (!openDialog) {
  //     setOtp("");
  //     setFetchAadharFailed(false);
  //   }
  // }, [openDialog]);

  if (displayOtpModal) {
    return (
      <div className=" h-full p-5 sm:py-[60px] md:p-[60px] flex-1">
        <img className=" block sm:hidden mb-4" width={26} height={32} src="/KKLogoK.svg" alt="kklogo" />
        <h2 className=" text-gray-900 text-display-xs font-bold m-0">OTP Sent!</h2>
        <p className="  text-gray-900 m-0 mt-4 ">
          Please enter the OTP sent to {loginMethod === "mobile" ? phone : email}.{" "}
          <button onClick={handleEditMobile} className=" m-0 ">
            <p className=" font-medium text-brand-500 m-0 ">
              Edit {loginMethod === "mobile" ? "Mobile Number" : "Email"}
            </p>
          </button>
        </p>

        <div className=" mt-6 sm:mt-9">
          <div className="">
            <div>
              <OTPInput
                inputType="number"
                value={otp}
                numInputs={6}
                containerStyle={{
                  gap: isMobile ? "2px" : "10px",
                }}
                inputStyle={{
                  height: "44px",
                  width: "44px",
                  border: "1px solid #B7BDC7",
                  borderRadius: "6.2px",
                  background: "#fff",
                  // "-moz-appearance": "textfield",
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
                <button
                  onClick={() => {
                    setResendOtp(true);
                    handleRequestOtp({ email, phone: phone });
                  }}
                  className=" text-[#1D4040] text-2xs font-semibold"
                >
                  Resend
                </button>
              ) : (
                `${secondsRemaining} seconds`
              )}
            </p>
          </div>
        </div>
        <div className=" mt-8">
          <Button
            onClick={handleSubmit(handleVerifyOtp)}
            className=" my-[18px] min-w-full max-w-full"
            variant={ButtonVariant.primary}
          >
            <p className=" text-sm font-medium">Verify OTP</p>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className=" h-full p-5 sm:py-[60px] md:p-[60px] flex-1">
      <img className=" block sm:hidden mb-4" width={26} height={32} src="/KKLogoK.svg" alt="kklogo" />
      <h2 className=" text-gray-900 text-display-xs font-bold">Sign in to KamayaKya</h2>
      <div className=" mt-6 sm:mt-9">
        <p className=" font-medium mb-[6px] text-2xs">{loginMethod === "mobile" ? "Mobile Number" : "Email"}</p>
        <div className=" border border-[#0000000F] py-2 px-[10px] rounded-lg">
          {loginMethod === "mobile" ? (
            <Controller
              name="phone"
              control={control}
              rules={{
                required: loginMethod === "mobile" ? "Enter phone to continue" : false,
                validate: (value) => {
                  return isPossiblePhoneNumber(value) && value.slice(3).length === 10
                    ? true
                    : "Enter valid mobile number";
                },
              }}
              render={({ field: { value, onChange } }) => (
                <>
                  <PhoneInput
                    value={value}
                    onChange={onChange}
                    defaultCountry="IN"
                    placeholder="Enter phone number"
                    className=" border-green-400"
                  />
                </>
              )}
            />
          ) : (
            <input
              {...register("email", {
                required: loginMethod === "email" ? "Enter email to continue" : false,
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
              className=" text-sm bg-transparent inline-block flex-1"
              placeholder="Enter your Email"
              type="text"
            />
          )}
        </div>
      </div>
      <div className=" mt-8">
        <p className=" text-gray-400 text-2xs">
          By signing in you agree to all our <span className=" text-brand-500 underline">terms & conditions</span>
        </p>
        <Button
          disabled={loginMethod === "mobile" ? !isPossiblePhoneNumber(phone || "") : !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))}
          loading={otpLoading}
          onClick={handleSubmit(handleRequestOtp)}
          className=" my-[18px] min-w-full max-w-full"
          variant={ButtonVariant.primary}
        >
          <p className=" text-sm font-medium">Request OTP</p>
        </Button>
        <div className=" flex items-center mb-[18px]">
          <div className=" bg-gray-300 h-[1px] w-full"></div>
          <p className=" text-2xs text-gray-500 mx-3">Or</p>
          <div className=" bg-gray-300 h-[1px] w-full"></div>
        </div>
        <Button
          onClick={() => {
            if (loginMethod === "mobile") {
              setLoginMethod("email");
              localStorage.setItem("login_method", "email");
            } else {
              setLoginMethod("mobile");
              localStorage.setItem("login_method", "mobile");
            }
          }}
          className=" max-w-full min-w-full shadow-[0px_18px_30px_0px_#8377C61C]"
          variant={ButtonVariant.tertiary}
        >
          {loginMethod === "mobile" ? (
            <>
              <Mail height={24} width={24} />
              <p className=" ml-[10px] text-[#242424] text-sm font-medium">Sign in with Email</p>
            </>
          ) : (
            <>
              <Phone height={24} width={24} />
              <p className=" ml-[10px] text-[#242424] text-sm font-medium">Sign in with Mobile Number</p>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default function LoginPrompt({ triggerEle }: ILoginPrompt) {
  return (
    <Dialog>
      <DialogTrigger>{triggerEle}</DialogTrigger>
      <DialogContent
        closeClassName=" hidden"
        className=" flex flex-col sm:flex-row !p-0 overflow-hidden open_sans w-[calc(100%-32px)]  max-w-[840px] !rounded-[20px] gap-0"
      >
        <div className=" max-sm:px-6 py-4 sm:py-10 pb-4 bg-[#FFECDB] sm:max-w-[352px] block flex-1 order-2 ">
          <div className=" flex flex-col max-sm:items-start items-center min-w-0">
            <img className=" hidden sm:block" width={26} height={32} src="/KKLogoK.svg" alt="kklogo" />
            <div className=" sm:p-4  rounded-lg sm:border sm:border-[#FFFFFF] sm:bg-[#FFFFFF66] sm:mt-[14px] min-w-0 flex flex-col max-sm:items-start gap-y-3">
              <p className=" text-gray-700 font-semibold sm:font-bold text-sm md:text-md">New User?</p>
              <NewUserList label="Get 3 Hot Stocks for Free" />
              <NewUserList label="See Track Record" />
              <NewUserList label="Get WhatsApp & Email Notifications" />
            </div>
          </div>

          <img className=" hidden sm:block" src="/assets/onboarding_login.gif" alt="onboarding" />
        </div>
        <div className=" sm:order-3 flex-1">
          <SignUpContent />
        </div>
      </DialogContent>
    </Dialog>
  );
}
