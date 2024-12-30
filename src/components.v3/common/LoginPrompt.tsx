import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components.v2/ui/dialog";
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
import { toast } from "@/components.v2/ui/use-toast";
import Link from "next/link";
import { axiosApi } from "@/utils/axios";
import Lottie from "lottie-react";
import ONBOARDING_LOTTIE from "../../../public/assets/onboarding_signup.json";

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

const SignUpContent = ({ displayExistingUserModal, setDisplayExistingUserModal }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
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

  const { setUser, setShowLoginModal } = useContext(AuthContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const verySmallScreen = useMediaQuery("(max-width:400px)");
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
      toast({
        variant: "warn",
        description: e?.response?.data?.message || "Something went wrong.",
      });
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
        setUser((prev) => ({
          ...prev,
          id: res?.user_id,
          fullname: res?.full_name,
          email: res?.email,
          mobile: res?.mobile,
          is_onboard: res?.is_onboard,
          is_new: res?.is_new_user,
        }));
        if (!res?.is_onboard) {
          setShowLoginModal(false);
          sessionStorage.setItem("user_id", res?.user_id);
          sessionStorage.setItem("email", res?.email);
          sessionStorage.setItem("mobile", res?.mobile);
          sessionStorage.setItem("fullname", res?.full_name);
          if (!res?.is_new_user) {
            setDisplayExistingUserModal(true);
            return;
          }

          router.push("/onboarding");
        } else {
          localStorage.setItem("access", res.access);
          localStorage.setItem("refresh", res.refresh);
          axiosApi.defaults.headers.common["Authorization"] = `token ${res?.access}`;

          router.reload();
          setShowLoginModal(false);
        }
      }
    } catch (e) {
      toast({
        variant: "warn",
        description: e?.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setVerifyingOtp(false);
      // setShowLoginModal(false)
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
    let timer;
    if (secondsRemaining > 0) {
      timer = setTimeout(() => {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      setResendOtp(false);
    }
    return () => clearTimeout(timer);
  }, [secondsRemaining]);

  useEffect(() => {
    if (displayOtpModal) {
      setSecondsRemaining(15);
    }
  }, [displayOtpModal]);

  // useEffect(() => {
  //   if (openDialog && displayModal === "AADHAR") {
  //     setSecondsRemaining(15);
  //   }
  //   if (!openDialog) {
  //     setOtp("");
  //     setFetchAadharFailed(false);
  //   }
  // }, [openDialog]);

  useEffect(() => {
    sessionStorage.setItem("login_method", loginMethod);
  }, [loginMethod]);

  if (displayOtpModal) {
    return (
      <div className=" h-full p-5 sm:py-[60px] md:p-[60px] flex-1">
        <img className=" block sm:hidden mb-4" width={26} height={32} src="/KKLogoK.svg" alt="kklogo" />
        <h2 className=" text-gray-900 text-display-xs font-bold m-0">OTP Sent!</h2>
        <p className="  text-gray-900 m-0 mt-4 ">
          Please enter the OTP sent to {loginMethod === "mobile" ? phone : email}.{" "}
          <button onClick={handleEditMobile} className=" m-0 ">
            <p className=" font-medium text-brand-500 m-0 decoration-dashed underline underline-offset-4 ">
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
                  height: verySmallScreen ? "38px" : "44px",
                  width: verySmallScreen ? "38px" : "44px",

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
            disabled={otp.length < 6}
            loading={verifyingOtp}
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
                    className=" border-green-400 "
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
              className=" text-sm bg-transparent inline-block flex-1 w-full"
              placeholder="Enter your Email"
              type="text"
            />
          )}
        </div>
      </div>
      <div className=" mt-8">
        <p className=" text-gray-400 text-2xs">
          By signing in you agree to all our{" "}
          <span className=" text-brand-500 underline decoration-dashed underline-offset-2">
            <Link onClick={() => setShowLoginModal(false)} href={"/terms-conditions"} className=" text-inherit">
              {" "}
              terms & conditions
            </Link>
          </span>
        </p>
        <Button
          disabled={
            loginMethod === "mobile"
              ? !isPossiblePhoneNumber(phone || "") || phone.slice(3).length !== 10
              : !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
          }
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
              // sessionStorage.setItem("login_method", "email");
            } else {
              setLoginMethod("mobile");
              // sessionStorage.setItem("login_method", "mobile");
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

const ExistingUserModal = () => {
  const router = useRouter();
  const handleOnboarding = () => {
    router.push("/onboarding");
  };
  return (
    <DialogContent
      closeClassName=" hidden"
      className=" flex flex-col !p-0 overflow-hidden open_sans w-[calc(100%-32px)]  max-w-[465px] !rounded-[20px] gap-0"
    >
      <div className=" h-full p-6">
        <div className=" rounded-[12px] bg-[#FFF5EC] py-7 flex flex-col items-center justify-center">
          <img width={164} height={30} src="/KKLogo.svg" alt="kmk-logo" />
          <img
            width={218}
            height={174}
            className=" mt-5"
            src="/assets/existing_user_illustration.svg"
            alt="stock-illustration"
          />
        </div>
        <h3 className=" text-gray-900 text-display-xs font-bold m-0 mt-4">Update Alert! 🚀</h3>
        <p className=" max-sm:text-sm m-0 mt-3 text-gray-600">
          We're upgrading our systems behind the scenes to keep everything running smoothly and to ensure SEBI
          compliance! We need just a little extra info from you. Quick and easy - promise!
        </p>
        <p className=" max-sm:text-sm m-0 mt-3 text-gray-600">Thanks for helping us make things better! 💪</p>
        <DialogClose asChild>
          <Button onClick={handleOnboarding} className=" mt-9 w-full" variant={ButtonVariant.primary}>
            <p className=" text-sm font-medium">Let’s Get Started!</p>
          </Button>
        </DialogClose>
        <p className=" text-gray-500 text-xs text-center mt-1">Takes less than 2 minutes</p>
      </div>
    </DialogContent>
  );
};

export default function LoginPrompt({ triggerEle }: ILoginPrompt) {
  const [displayExistingUserModal, setDisplayExistingUserModal] = useState(false);
  const { showLoginModal, handleLogin, setShowLoginModal } = useContext(AuthContext);
  // useEffect(()=>{
  //   if(!showLoginModal){

  //   }
  // },[showLoginModal])
  if (displayExistingUserModal) {
    return (
      <Dialog open={displayExistingUserModal} onOpenChange={setDisplayExistingUserModal}>
        <ExistingUserModal />
      </Dialog>
    );
  }
  return (
    <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
      {/* <DialogTrigger
        onClick={(e) => {
          e.preventDefault();
          setShowLoginModal(true);
        }}
      >
        {triggerEle}
      </DialogTrigger> */}

      <DialogContent
        closeClassName=" hidden"
        className="  !p-0 overflow-hidden !rounded-[20px] open_sans w-[calc(100%-32px)] border-transparent shadow-none bg-transparent  max-w-[840px]  gap-0"
      >
        <div className="flex flex-col sm:flex-row !rounded-[20px] overflow-hidden bg-white">
          <div className=" max-sm:px-6 py-4 sm:py-10 pb-4 bg-[#FFECDB] sm:max-w-[352px] block flex-1 order-2 ">
            <div className=" flex flex-col max-sm:items-start items-center min-w-0">
              <img className=" hidden sm:block" width={26} height={32} src="/KKLogoK.svg" alt="kklogo" />
              <div className=" sm:p-4  rounded-lg sm:border sm:border-[#FFFFFF] sm:bg-[#FFFFFF66] sm:mt-[14px] min-w-0 flex flex-col max-sm:items-start gap-y-3">
                <p className=" text-gray-700 font-semibold sm:font-bold text-sm md:text-md">New User?</p>
                <NewUserList label="Get 3 Hot Stocks for Free" />
                <NewUserList label="Unlock KamayaKya’s Track Record" />
                <NewUserList label="Get WhatsApp & Email Notifications" />
              </div>
            </div>
            <Lottie className=" hidden sm:block" autoPlay loop={false} animationData={ONBOARDING_LOTTIE} />
          </div>
          <div className=" sm:order-3 flex-1">
            <SignUpContent
              displayExistingUserModal={displayExistingUserModal}
              setDisplayExistingUserModal={setDisplayExistingUserModal}
            />
          </div>
        </div>
        <div className=" mt-[10px] gap-x-4 !rounded-[20px] flex  items-start bg-[#EFF7FF] border border-[#A6D3FF] p-4">
          <img className=" pt-[3px]" height={32} width={32} alt="info-icon" src="/info-fill.svg" />
          <div>
            <p className=" text-xs">
              Currently, SMS verification is only available for Indian phone numbers. For international users, please
              call or whatsapp us at <span className=" font-medium"> +91 9175939641</span> or email us at  <span className=" font-medium">contact@kamayakya.com</span> for assistance.<span className=" block mt-3"></span> We apologize
              for the inconvenience and appreciate your understanding!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
