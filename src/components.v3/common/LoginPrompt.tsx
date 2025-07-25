"use client";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components.v2/ui/dialog";
import React, { useContext, useEffect, useState } from "react";
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber, getCountryCallingCode } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Line } from "@/components.v2/blogs/blog-card-sm";
import { Mail, Phone, X } from "lucide-react";
import OTPInput from "react-otp-input";
import { useMediaQuery } from "@mui/material";
import { blockInvalidChar } from "@/components/LoginCard";
import { getLoginOtp, verifyLoginOtp } from "../../api/onboarding/index";
import { useRouter } from "next/router";
import AuthContext from "@/components/AuthContext";
import { toast } from "@/components.v2/ui/use-toast";
import Link from "next/link";
import { axiosApi } from "@/utils/axios";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
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
  const [countryCode, setCountryCode] = useState("91");
  const [country, setCountry] = useState("IN");
  const { setUser, setShowLoginModal } = useContext(AuthContext);
  const isMobile = useMediaQuery("(max-width:600px)");
  const verySmallScreen = useMediaQuery("(max-width:400px)");
  const phone = watch("phone");
  const email = watch("email");
  const router = useRouter();

  console.log(errors);

  const handleRequestOtp = async (data: IFormData) => {
    let params = {
      type: loginMethod,
    };
    if (loginMethod === "mobile") {
      params = {
        ...params,
        mobile: data.phone,
        country_code: `+${countryCode}`,
      };
    } else {
      params = {
        ...params,
        email: data.email?.toLowerCase(),
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
          country_code: `+${countryCode}`,
        };
      } else {
        params = {
          ...params,
          email: email?.toLowerCase(),
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

  console.log(typeof countryCode, countryCode, countryCode !== "91");

  if (displayOtpModal) {
    return (
      <div className=" h-full p-5 sm:py-[60px] md:p-[60px] flex-1">
        <img className=" block sm:hidden mb-4" width={26} height={32} src="/KKLogoK.svg" alt="kklogo" />
        <h2 className=" text-gray-900 text-display-xs font-bold m-0">OTP Sent!</h2>
        <p className="  text-gray-900 m-0 mt-4 ">
          Please enter the OTP sent to{" "}
          {loginMethod === "mobile" && countryCode !== "91" ? (
            <span className="inline-flex items-center">
              {" "}
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
          ) : (
            ""
          )}{" "}
          {loginMethod === "mobile" ? phone : email}.{" "}
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
                  return isPossiblePhoneNumber(value) ? true : "Enter valid mobile number";
                },
              }}
              render={({ field: { value, onChange } }) => (
                <>
                  <PhoneInput
                    value={value}
                    onChange={onChange}
                    onCountryChange={(countryCode) => {
                      if (countryCode) {
                        const currentCode = getCountryCallingCode(countryCode);
                        setCountry(countryCode);
                        setCountryCode(currentCode);
                      }
                    }}
                    defaultCountry={country}
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
              ? !isValidPhoneNumber(phone || "")
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
        className=" login__modal  !p-0 max-sm:flex max-sm:flex-col h-full w-[calc(100%-32px)] max-w-[840px] flex items-center justify-center overflow-hidden !rounded-[20px] open_sans  border-transparent shadow-none bg-transparent gap-0"
      >
        <div className=" mx-auto">
          <div className="flex flex-col sm:flex-row !rounded-[20px] overflow-hidden bg-white">
            <div className="new__user-container max-sm:px-6 py-4 sm:py-10 pb-4 bg-[#FFECDB] sm:max-w-[352px] block flex-1 order-2 ">
              <div className=" flex flex-col max-sm:items-start items-center min-w-0">
                <img className=" hidden sm:block" width={26} height={32} src="/KKLogoK.svg" alt="kklogo" />
                <div className="  sm:p-4  rounded-lg sm:border sm:border-[#FFFFFF] sm:bg-[#FFFFFF66] sm:mt-[14px] min-w-0 flex flex-col max-sm:items-start gap-y-3">
                  <p className=" text-gray-700 font-semibold sm:font-bold text-sm md:text-md">New User?</p>
                  <NewUserList label="Get 3 Hot Stocks for Free" />
                  <NewUserList label="Unlock KamayaKya’s Track Record" />
                  <NewUserList label="Get WhatsApp & Email Notifications" />
                </div>
              </div>
              <Lottie className=" hidden sm:block" autoPlay loop={false} animationData={ONBOARDING_LOTTIE} />
            </div>
            <div className=" sm:order-3 flex-1 relative">
              <Button
                variant={ButtonVariant.secondary}
                className={
                  "absolute right-2 top-2 !p-[8px] rounded-full opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-slate-950 focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-0 dark:focus:ring-0 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400 bg-white border border-[#E4E7EC]"
                }
                onClick={() => setShowLoginModal(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
              <SignUpContent
                displayExistingUserModal={displayExistingUserModal}
                setDisplayExistingUserModal={setDisplayExistingUserModal}
              />
            </div>
          </div>
          {/* <div className=" mt-[10px] gap-x-4 !rounded-[20px] flex  items-start bg-[#EFF7FF] border border-[#A6D3FF] p-4">
            <img className=" pt-[3px]" height={32} width={32} alt="info-icon" src="/info-fill.svg" />
            <div>
              <p className=" text-xs">
                Currently, SMS verification is only available for Indian phone numbers. For international users, please
                call or whatsapp us at <span className=" font-medium whitespace-nowrap"> +91 9175939641</span> or email
                us at <span className=" font-medium">contact@kamayakya.com</span> for assistance.
                <span className=" block mt-3"></span> We apologize for the inconvenience and appreciate your
                understanding!
              </p>
            </div>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
