import { Button, ButtonnArrow } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Dialog, DialogContent } from "@/components.v2/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components.v2/ui/tabs";
import { blockInvalidChar } from "@/components/LoginCard";
import { useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import OTPInput from "react-otp-input";
import { motion } from "framer-motion";
import Header from "./components/Header";
import { Controller, useForm } from "react-hook-form";
import { getEmailPhoneOtp, verifyEmailPhoneOtp } from "@/api/onboarding";
import AuthContext from "@/components/AuthContext";
import PhoneInput, { getCountryCallingCode, isPossiblePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "@/components.v2/ui/use-toast";
import { useRouter } from "next/navigation";
import { axiosApi } from "@/utils/axios";
import Lottie from "lottie-react";
import POPPER_JSON from "../../../public/assets/popper.json";
import SUCCESS_LOTTIE from "../../../public/assets/success_onboarding.json";
import CONFETTIE from "../../../public/assets/onboarding_confetti.json";
import { ContactModal } from "@/components.v2/payments/contact-modal";
import axios from "axios";

const Step1 = ({ setActiveTab, activeTab }) => {
  return (
    <div className="min-h-[70vh] flex flex-col">
      <div className=" px-5 sm:px-9 lg:flex lg:flex-row ">
        <div className=" rounded-[21px] h-[256px] lg:h-full w-full lg:max-w-[603px] bg-[#db9b4f] overflow-hidden flex items-center justify-center">
          <video
            height={256}
            width={448}
            className="object-contain max-h-full  w-full lg:h-[527px]"
            src="/KMK-V1.mp4"
            muted
            autoPlay
          />
        </div>
        <div className=" py-6 lg:px-9">
          <h3 className=" m-0 text-gray-950 text-xl font-bold">Welcome to KamayaKya: Investing Made Smarter</h3>
          <p className=" m-0 text-gray-600 text-md mt-4">
            At KamayaKya, we believe in uncovering hidden gems and empowering you to grow your wealth with confidence.
            Here’s how we do it:
          </p>
          <ul className=" m-0 flex flex-col mt-4 sm:mt-6 gap-y-4">
            <li className=" flex items-start gap-x-2 mb-0">
              <p className=" text-sm">💡</p>
              <div>
                <p className=" text-gray-800 text-sm font-medium">Monthly Stock Picks</p>
                <p className=" text-sm text-[#667085]">
                  Get 2-4 exclusive, long-term (1-3 years hold strategy) investment ideas every month, crafted for
                  members focusing on growth at reasonable valuations.
                </p>
              </div>
            </li>
            <li className=" flex items-start gap-x-2 mb-0">
              <p className=" text-sm">📩</p>
              <div>
                <p className=" text-gray-800 text-sm font-medium">Actionable Buy/Sell/Hold Alerts</p>
                <p className=" text-sm text-[#667085]">
                  Timely updates delivered via WhatsApp and email—no noise, no spam. Just clear guidance for your
                  investments.
                </p>
              </div>
            </li>
            <li className=" flex items-start gap-x-2 mb-0">
              <p className=" text-sm">🔍</p>
              <div>
                <p className=" text-gray-800 text-sm font-medium">Deep-Researched Reports</p>
                <p className=" text-sm text-[#667085]">
                  Ground-level insights backed by thorough research, presented in crisp, easy-to-digest formats with
                  infographics.
                </p>
              </div>
            </li>
            <li className=" flex items-start gap-x-2 mb-0">
              <p className=" text-sm">✨</p>
              <div>
                <p className=" text-gray-800 text-sm font-medium">Why KamayaKya?</p>
                <p className=" text-sm text-[#667085]">
                  We’re not just about stocks—we’re about simplifying value investing while keeping it insightful,
                  actionable, and exciting.
                </p>
              </div>
            </li>
          </ul>
          <p className=" text-brand-400 !italic mt-6 max-sm:pb-20">
            Join us and make smarter investment decisions, one pick at a time. 🚀
          </p>
        </div>
      </div>
      <div className=" bg-gray-50 border border-gray-150 p-4 fixed bottom-0 w-full left-0 sm:relative mt-auto">
        <ButtonnArrow onClick={() => setActiveTab("step2")} className=" ml-auto" variant={ButtonVariant.primary}>
          <p>Next</p>
        </ButtonnArrow>
      </div>
    </div>
  );
};
const Step2 = ({ setActiveTab, activeTab }) => {
  return (
    <div className="min-h-[70vh] flex flex-col">
      <div className=" px-5 lg:px-9 lg:flex lg:flex-row">
        <div className=" rounded-[21px] h-[256px] lg:h-full w-full lg:max-w-[603px] bg-[#FFEEDF] overflow-hidden flex ">
          <img
            height={231}
            width={231}
            className="object-contain w-full max-h-[491px] relative"
            src="/assets/ActionCall.webp"
          />
        </div>
        <div className=" py-6 lg:px-9">
          <h3 className=" m-0 text-gray-950 text-xl font-bold">What We Don’t Do (Yet!)</h3>
          <ul className=" m-0 flex flex-col mt-4 gap-y-4">
            <li className=" flex items-start gap-x-2 mb-0">
              <p className=" text-sm">🚫</p>
              <div>
                <p className=" text-gray-800 text-sm font-medium">Not for Short-Term Gains</p>
                <p className=" text-sm text-[#667085]">
                  We focus on long-term wealth creation by identifying businesses with growth potential. Our minimum
                  horizon? At least 1 year.
                </p>
              </div>
            </li>

            <li className=" flex items-start gap-x-2 mb-0">
              <p className=" text-sm">🚫</p>
              <div>
                <p className=" text-gray-800 text-sm font-medium">No Portfolio Management (For Now)</p>
                <p className=" text-sm text-[#667085]">
                  While we currently don’t manage portfolios, we’re gearing up to introduce allocation strategies and
                  PMS services soon!
                  <br />
                  <br />
                  For now, we provide you with everything you need: stock names, buy prices, sell prices, and holding
                  durations. However, the decision on how much to invest in each stock is entirely up to you.
                </p>
              </div>
            </li>
          </ul>
          <p className=" text-md text-brand-400 italic mt-6 max-sm:pb-20">
            At KamayaKya, we empower you to take charge of your investments with confidence and clarity. 🚀
          </p>
        </div>
      </div>
      <div className=" bg-gray-50 border border-gray-150 p-4 flex justify-between mt-auto fixed sm:relative bottom-0 w-full left-0">
        <ButtonnArrow
          onClick={() => setActiveTab("step1")}
          arrowPosition="start"
          arrowStyle=" rotate-180 "
          strokeStyle="stroke-brand-400"
          className="bg-transparent "
          variant={ButtonVariant.secondary}
        >
          <p>Previous</p>
        </ButtonnArrow>
        <ButtonnArrow onClick={() => setActiveTab("step3")} variant={ButtonVariant.primary}>
          <p>Next</p>
        </ButtonnArrow>
      </div>
    </div>
  );
};

interface IFormInput {
  fullname: string;
}

const Step3 = ({ setFullname, activeTab, setActiveTab, fullname }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    setError,
    formState: { errors },
  } = useForm<IFormInput>();
  const { user } = useContext(AuthContext);
  const name = watch("fullname");
  const handleName = async (data: IFormInput) => {
    try {
      sessionStorage.setItem("fullname", data?.fullname);
      setFullname(data?.fullname);
      setActiveTab("step4");
    } catch (e) {}
  };

  useEffect(() => {
    const savedFullname = sessionStorage.getItem("fullname");
    if (fullname) {
      setValue("fullname", fullname);
      return;
    }
    if (savedFullname !== "null") {
      setValue("fullname", savedFullname);
      return;
    }

    setValue("fullname", user?.fullname);
  }, [user, sessionStorage.getItem("fullname"), fullname]);

  return (
    <div className=" min-h-[70vh] flex flex-col">
      <div className=" px-5 sm:px-9">
        <div className=" rounded-[21px] h-[256px] w-full bg-orange-400 overflow-hidden">
          <video
            height={256}
            width={448}
            className="object-cover h-full w-full"
            src="/kmk-starsTeam.mp4"
            muted
            autoPlay
          />
        </div>
        <div className=" py-6">
          <h3 className=" m-0 text-gray-950 text-xl font-bold">What’s your full name ?</h3>
          <p className=" text-sm text-[#667085]">
            We’re all about personal connections, and it’s great to know who we’re speaking with.
          </p>
          <div className="flex flex-col mt-7 pb-[54px]">
            <p className="text-2xs  font-medium mb-1">
              Full Name <span className=" text-[#F04438]">*</span>
            </p>
            <input
              value={name ?? fullname}
              {...register("fullname", {
                pattern: { value: /^[a-zA-Z]+( [a-zA-Z]+)*\s*$/, message: "Please Enter valid name" },
                maxLength: { value: 50, message: "Max Character limit of 50 reached." },
                required: "Enter Full Name to continue",
                minLength: { value: 3, message: "Enter Full Name to continue (minimum 3 characters)" },
              })}
              className={` text-sm py-2 px-[10px] border ${
                errors.fullname?.message ? "border-[#FDA29B]" : "border-[#0000000F]"
              }  rounded-lg bg-transparent`}
              placeholder="Enter your Full Name"
              type="text"
            />
            <p className=" m-0 mt-[6px] text-sm text-[#F04438]">{errors.fullname?.message}</p>
          </div>
        </div>
      </div>
      <div className=" bg-gray-50 border border-gray-150 p-4 flex justify-between mt-auto sm:relative fixed bottom-0 w-full left-0">
        <ButtonnArrow
          onClick={() => setActiveTab("step2")}
          arrowPosition="start"
          arrowStyle=" rotate-180 "
          strokeStyle="stroke-brand-400"
          className="bg-transparent "
          variant={ButtonVariant.secondary}
        >
          <p>Previous</p>
        </ButtonnArrow>
        <ButtonnArrow onClick={handleSubmit(handleName)} variant={ButtonVariant.primary}>
          <p>Next</p>
        </ButtonnArrow>
      </div>
    </div>
  );
};

interface IFormEmailInput {
  email: string;
  phone: string;
}

interface IVerifyOtpParams{
  type:string;
  otp:string;
  user_id:string;
  full_name:string;
  email?:string;
  mobile?:string;
  country_code?:string;
}

interface IStep4{
  fullname:string;
  setOnboardingCompleted:React.Dispatch<React.SetStateAction<boolean>>;
  activeTab:string;
  setActiveTab:React.Dispatch<React.SetStateAction<string>>;
  email:string;
  phone:string;
}

const Step4 = ({
  fullname,
  setOnboardingCompleted,
  activeTab,
  setActiveTab,
  email: preExistinEmail,
  phone: preExistingPhone,
}:IStep4) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormEmailInput>();
  const [secondsRemaining, setSecondsRemaining] = useState(15);
  const [resendOtp, setResendOtp] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [loginMethod, setLoginMethod] = useState("mobile");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [displayOtpModal, setDisplayOtpModal] = useState(false);
  const { user } = useContext(AuthContext);
  const email = getValues("email");
  const phone = getValues("phone");
  const [countryCode, setCountryCode] = useState("91");
  const [country, setCountry] = useState("IN");

  const verySmallScreen = useMediaQuery("(max-width:400px)");
  const handleEmailOtp = async (data: IFormEmailInput) => {
    try {
      let params = {
        type: loginMethod === "mobile" ? "email" : "mobile",

        user_id: user?.id ? user?.id : sessionStorage.getItem("user_id") as string,
      };
      if (loginMethod === "mobile") {
        sessionStorage.setItem("email", data.email);
        params = {
          ...params,
          email: data.email?.toLowerCase(),
        };
      } else {
        sessionStorage.setItem("mobile", data.phone);
        params = {
          ...params,
          mobile: data.phone,
          country_code: `+${countryCode}`,
        };
      }
      setSendingOtp(true);
      const res = await getEmailPhoneOtp(params);
      if (res?.status_code === 200) {
        setDisplayOtpModal(true);
      }
    } catch (e) {
      toast({
        variant: "warn",
        description: e?.response?.data?.message || "Something went wrong.",
        // action:<ContactModal trigger={<button className=" text-sm">Contact Us</button>} />
      });
    } finally {
      setSendingOtp(false);
    }
  };
  const handleVerifyOtp = async () => {
    try {
      let params: IVerifyOtpParams = {
        type: loginMethod === "mobile" ? "email" : "mobile",
        otp,
        user_id: user?.id ? user?.id : sessionStorage.getItem("user_id") as string,
        full_name: fullname ? fullname : sessionStorage.getItem("fullname") as string,
      };
      if (loginMethod === "mobile") {
        params = { ...params, email: email?.toLowerCase() };
      } else {
        params = { ...params, mobile: phone, country_code: `+${countryCode}` };
      }
      setVerifyingOtp(true);

      const res = await verifyEmailPhoneOtp(params);
      if (res?.status_code === 200) {
        if (res?.is_onboard) {
          setOnboardingCompleted(true);
        }
        localStorage.setItem("access", res.access);
        localStorage.setItem("refresh", res.refresh);
        axiosApi.defaults.headers.common["Authorization"] = `token ${res?.access}`;
        // setUser(prev=>({...prev,id:res?.user_id,fullname:res?.full_name,email:res?.email}))
        // if(!res?.is_onboard){
        //   router.push("/onboarding")
        // }
      }
    } catch (e) {
      toast({
        variant: "warn",
        description: e?.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleEditEmail = () => {
    setDisplayOtpModal(false);
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

  useEffect(() => {
    const savedEmailPhone = sessionStorage.getItem(loginMethod === "mobile" ? "email" : "mobile");
    
    if (loginMethod === "mobile") {
      if (preExistinEmail) {
        setValue("email", preExistinEmail);
        return;
      }
      if (savedEmailPhone !== "null") {
        setValue("email", savedEmailPhone as string);
        return;
      }

      setValue("email", user?.email);
    } else if (loginMethod === "email") {
      if (preExistingPhone) {
        setValue("phone", preExistingPhone);
        return;
      }
      if (savedEmailPhone !== "null") {
        setValue("phone", `${savedEmailPhone}`);
        return;
      }

      setValue("phone", `${user?.mobile}`);
    }
  }, [
    user,
    sessionStorage.getItem("email"),
    preExistinEmail,
    sessionStorage.getItem("mobile"),
    user?.mobile,
    loginMethod,
  ]);

  useLayoutEffect(() => {
    const loginMethod = sessionStorage.getItem("login_method");
    setLoginMethod(loginMethod as string);
  }, [sessionStorage.getItem("login_method")]);

  // VERIFY OTP CONTENT
  if (displayOtpModal) {
    return (
      <div className="  mt-7 sm:mt-10 min-h-[67.5vh] flex flex-col">
        <div className=" px-5 sm:px-9">
          <h3 className=" m-0  text-xl font-bold text-gray-950">
            Verify your {loginMethod === "mobile" ? "email" : "Mobile number"}
          </h3>
          <p className=" mt-1 text-sm text-gray-500">
            Please enter the OTP sent to   {loginMethod !== "mobile" && countryCode !== "91" ? (
            <span className="inline-flex items-center">
              {" "}
              your{" "}
              <svg className=" mx-1 " width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          )} {loginMethod === "mobile" ? email : phone}.{" "}
            <button
              onClick={handleEditEmail}
              aria-label="button"
              className=" text-[#0E6C63] underline decoration-dashed underline-offset-2 cursor-pointer"
            >
              Edit {loginMethod === "mobile" ? "Email" : "Mobile number"}
            </button>{" "}
          </p>
        </div>
        <div className="flex flex-col mt-8 pb-[54px] px-5 sm:px-9">
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
            <p className=" text-2xs mt-5">
              {" "}
              Haven’t received the OTP?{" "}
              {secondsRemaining === 0 ? (
                <button
                  onClick={() => {
                    setResendOtp(true);
                    handleEmailOtp({ email: email, phone: phone });
                  }}
                  className=" text-[#1D4040] text-2xs font-semibold"
                >
                  Resend
                </button>
              ) : (
                <span className=" text-2xs font-semibold">{secondsRemaining} seconds</span>
              )}
            </p>
          </div>
        </div>
        <div className=" bg-gray-50 border border-gray-150 p-4 flex justify-between mt-auto sm:relative fixed bottom-0 w-full left-0">
          <ButtonnArrow
            onClick={() => setActiveTab("step3")}
            arrowPosition="start"
            arrowStyle=" rotate-180 "
            strokeStyle="stroke-brand-400"
            className="bg-transparent "
            variant={ButtonVariant.secondary}
          >
            <p>Previous</p>
          </ButtonnArrow>
          <ButtonnArrow
            loading={verifyingOtp}
            onClick={handleVerifyOtp}
            disabled={otp.length === 0}
            variant={ButtonVariant.primary}
          >
            <p>Verify</p>
          </ButtonnArrow>
        </div>
      </div>
    );
  }

  // console.log("PHONE=-==>", phone);
  return (
    <div className=" mt-7 sm:mt-10 min-h-[70vh] flex flex-col">
      <div className=" px-5 sm:px-9">
        <h3 className=" m-0  text-xl font-bold text-gray-950">Almost there! </h3>
        <p className=" mt-1 text-sm text-gray-500">
          {loginMethod === "mobile"
            ? user?.is_new
              ? "Just one last step! Add and verify your Email ID to get your 3 HOT stock picks for FREE."
              : "Just one last step! Verify your Email ID to regain access to your membership and continue your smart investing journey."
            : user?.is_new
            ? "Just one last step! Add and verify your Mobile number to get your 3 HOT stock picks for FREE."
            : "Just one last step! Verify your mobile number to regain access to your membership and continue your smart investing journey."}
        </p>
      </div>
      <div className="flex flex-col mt-8 pb-[54px] px-5 sm:px-9">
        <p className="text-2xs  font-medium mb-1">
          {loginMethod === "mobile" ? "Email" : "Mobile no."} <span className=" text-[#F04438]">*</span>
        </p>
        <div
          className={`py-[9px] pl-[12px] pr-[6px] max-h-[44px] border ${
            (loginMethod === "mobile" ? errors.email?.message : errors.phone?.message)
              ? "border-[#FDA29B]"
              : "border-[#0000000F]"
          }   rounded-lg bg-transparent flex items-center `}
        >
          {loginMethod === "mobile" ? (
            <input
              {...register("email", {
                required: loginMethod === "mobile" ? "Enter email to continue" : false,
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
              className=" text-sm bg-transparent inline-block w-full"
              placeholder="Enter your Email"
              type="text"
            />
          ) : (
            <Controller
              name="phone"
              control={control}
              rules={{
                required: loginMethod === "email" ? "Enter phone to continue" : false,
                validate: (value) => {
                  return isValidPhoneNumber(value)
                    ? true
                    : "Enter valid mobile number";
                },
              }}
              render={({ field: { value, onChange } }) => (
                <>
                  <PhoneInput
                    value={value}
                    onChange={onChange}
                    defaultCountry={country}
                    placeholder="Enter phone number"
                    className=" border-green-400"
                    onCountryChange={(countryCode) => {
                      if (countryCode) {
                        const currentCode = getCountryCallingCode(countryCode);
                        setCountryCode(currentCode);
                        setCountry(countryCode);
                      }
                    }}
                  />
                </>
              )}
            />
          )}

          <Button
            loading={sendingOtp}
            onClick={handleSubmit(handleEmailOtp)}
            className=" !p-3 max-h-[32px]"
            variant={ButtonVariant.primary}
          >
            <p className=" text-sm font-semibold">Send OTP</p>
          </Button>
        </div>
        <p className=" m-0 mt-[6px] text-sm text-[#F04438]">
          {loginMethod === "mobile" ? errors.email?.message : errors.phone?.message}
        </p>
      </div>
      <div className=" bg-gray-50 border border-gray-150 p-4 flex justify-between mt-auto sm:relative fixed bottom-0 w-full left-0 ">
        <ButtonnArrow
          onClick={() => setActiveTab("step3")}
          arrowPosition="start"
          arrowStyle=" rotate-180 "
          strokeStyle="stroke-brand-400"
          className="bg-transparent "
          variant={ButtonVariant.secondary}
        >
          <p>Previous</p>
        </ButtonnArrow>
        <ButtonnArrow disabled variant={ButtonVariant.primary}>
          <p>Verify</p>
        </ButtonnArrow>
      </div>
    </div>
  );
};

const MainContent = ({ onboardingCompleted, setOnboardingCompleted, activeTab, setActiveTab }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const { user } = useContext(AuthContext);
  const [secondsRemaining, setSecondsRemaining] = useState(15);

  // Track if API call has been made to prevent duplicate calls
  const apiCallMadeRef = useRef(false);
  const onboardingCompletedRef = useRef(onboardingCompleted);
  const activeTabRef = useRef(activeTab);
  const router = useRouter();


    // Function to call API for incomplete onboarding
  const callIncompleteOnboardingAPI = async () => {
    if (apiCallMadeRef.current) return; // Prevent duplicate calls
    const params = {
      type: sessionStorage.getItem("login_method") === "mobile" ? "mobile" : "email",
        value:  sessionStorage.getItem("login_method") === "mobile" ? user.mobile : user.email,
        full_name: fullname ? fullname : sessionStorage.getItem("fullname") as string,
    }
    try {
      apiCallMadeRef.current = true;
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASEPATH}/user/incompleteOnboardNotifications`,params
      );
      console.log('Incomplete onboarding API called');
    } catch (error) {
      console.error('Error calling incomplete onboarding API:', error);
      apiCallMadeRef.current = false; // Reset on error to allow retry
    }
  };

  // Check if onboarding is incomplete
  const isOnboardingIncomplete = () => {
    return !onboardingCompletedRef.current;
  };

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event) => {
      if (isOnboardingIncomplete()) {
        callIncompleteOnboardingAPI();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Handle page unload (refresh, close tab, navigate away)
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isOnboardingIncomplete()) {
        // Use sendBeacon for reliable API calls during page unload
        const data = new URLSearchParams();
        data.append('type', 'incomplete_payment');
        
        navigator.sendBeacon(
          `${process.env.NEXT_PUBLIC_BASEPATH}/user/userActionNotifications`,
          data
        );
      }
    };

    const handleUnload = () => {
      if (isOnboardingIncomplete()) {
        // Fallback for browsers that don't support sendBeacon
        callIncompleteOnboardingAPI();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  // // Handle Next.js route changes
  // useEffect(() => {
  //   const handleRouteChangeStart = (url) => {
  //     // Only call API if navigating away from onboarding and it's incomplete
  //     if (url !== router.asPath && isOnboardingIncomplete()) {
  //       callIncompleteOnboardingAPI();
  //     }
  //   };

  //   router.events.on('routeChangeStart', handleRouteChangeStart);
    
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChangeStart);
  //   };
  // }, [router]);

  // Cleanup effect - calls API when component unmounts if onboarding incomplete
  useEffect(() => {
    return () => {
      if (isOnboardingIncomplete()) {
        callIncompleteOnboardingAPI();
      }
    };
  }, []);
    // Update refs when state changes
  useEffect(() => {
    onboardingCompletedRef.current = onboardingCompleted;
  }, [onboardingCompleted]);

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);



  useEffect(() => {
    let timeout;
    if (onboardingCompleted) {
      timeout = setTimeout(() => {
        router.replace("/stock-picks");
      }, 1000 * 15);
    }
    return () => clearTimeout(timeout);
  }, [onboardingCompleted]);

  useEffect(() => {
    let timeout;
    if (secondsRemaining) {
      timeout = setTimeout(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [secondsRemaining]);

  useEffect(() => {
    if (onboardingCompleted) {
      setSecondsRemaining(15);
    }
  }, [onboardingCompleted]);

  return onboardingCompleted ? (
    <div className=" z-30 hidden sm:block max-sm:h-screen h-[690px] open_sans">
      <motion.div
        style={{ background: "#00C37C" }}
        initial={{ opacity: 1, height: "100%" }}
        animate={{ opacity: 1, height: "60%" }}
        transition={{
          duration: 0.8,
          delay: 2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className=" flex flex-col items-center justify-center h-full">
          <Lottie autoPlay loop={false} animationData={SUCCESS_LOTTIE} />
          {/* <img height={166} width={166} className=" block" src="/assets/onboard.gif" /> */}
          <div className=" mt-5 ">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              className=" m-0 text-display-sm font-bold text-center text-white"
            >
              {user?.is_new ? "Welcome Onboard! 🎉" : "Welcome Aboard! 🎉"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              className=" text-white text-md font-medium text-center max-w-[440px]"
            >
              {user?.is_new
                ? "Congrats on unlocking 3 HOT stocks. 🚀 Get ready to explore the 'Stocks to Buy' section!"
                : "You’re back on track and ready to explore the hidden gems. Dive into our services and make the most of your investing journey!"}
            </motion.p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ marginTop: 300 }}
        animate={{ marginTop: -30 }}
        transition={{
          duration: 0.8,
          delay: 2.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className=" flex flex-col px-11 gap-y-4 "
      >
        <div
          onClick={() => router.replace("/stock-picks")}
          className="h-[100px]  cursor-pointer p-[2px] bg-[linear-gradient(93.19deg,#5AFBD3_2.64%,#35957D_107.97%)] rounded-xl"
        >
          <div className=" h-full flex items-center justify-between py-4 px-[26px] bg-[#F1FFFB] rounded-[10px]">
            <div>
              <p className=" text-brand-400 font-bold text-md">Stocks to Buy</p>
              <p className=" text-sm text-[#667085]">
                {user?.is_new ? "View your 3 Hot stocks here 🎉" : "View your HOT stocks here 🎉"}
              </p>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 18L15 12L9 6"
                stroke="#3EC9AE"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div
          onClick={() => router.replace("/track-record")}
          className="min-h-[100px] flex items-center justify-between cursor-pointer py-4 px-[26px] border border-gray-200 bg-gray-25 rounded-xl"
        >
          <div>
            <p className=" text-gray-700 font-bold text-md">Track Record</p>
            <p className=" text-sm text-[#667085]">
              {user?.is_new
                ? "Our wins, our lessons—out in the open for you. Your trust is our ultimate reward."
                : "Our wins, our lessons—out in the open for you. Your trust is our ultimate reward."}{" "}
            </p>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 18L15 12L9 6"
              stroke="#667085"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </motion.div>
      <div className=" flex pt-[54px]  items-center justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className=" text-sm text-gray-500 flex items-center justify-center mt-auto"
        >
          You will be redirected to Stocks to Buy in{" "}
          <span className="font-bold ml-[4px]"> {secondsRemaining} seconds</span>
        </motion.p>
      </div>
    </div>
  ) : (
    <Tabs
      onValueChange={(value) => setActiveTab(value)}
      defaultValue={activeTab}
      value={activeTab}
      className=" relative w-full open_sans"
    >
      <div className=" px-5 sm:px-9 -mt-5 sm:mt-0">
        <TabsList className=" flex justify-between bg-transparent relative z-10 space-x-4 h-fit p-0 pt-5 sm:pt-10">
          <TabsTrigger
            disabled
            className={` !p-0  h-[4px] w-full rounded-full disabled:opacity-100 ${
              ["step2", "step3", "step4"].includes(activeTab) ? "bg-[#0E6C63]" : "bg-[#E9EBEA]"
            }  shadow-none data-[state=active]:bg-[#75CDC5] data-[state=active]:shadow-none`}
            value="step1"
          ></TabsTrigger>
          <TabsTrigger
            disabled
            className={`!p-0  h-[4px] w-full rounded-full disabled:opacity-100 ${
              ["step3", "step4"].includes(activeTab) ? "bg-[#0E6C63]" : "bg-[#E9EBEA]"
            }  data-[state=active]:bg-[#75CDC5] data-[state=active]:shadow-none`}
            value="step2"
          ></TabsTrigger>
          <TabsTrigger
            disabled
            value="step3"
            className={` !p-0  h-[4px] w-full rounded-full disabled:opacity-100 ${
              ["step4"].includes(activeTab) ? "bg-[#0E6C63]" : "bg-[#E9EBEA]"
            } disabled:opacity-100 data-[state=active]:bg-[#75CDC5] data-[state=active]:shadow-none`}
          ></TabsTrigger>
          <TabsTrigger
            disabled
            value="step4"
            className=" !p-0  h-[4px] w-full rounded-full disabled:opacity-100 bg-[#E9EBEA]  data-[state=active]:bg-[#75CDC5] data-[state=active]:shadow-none"
          ></TabsTrigger>
        </TabsList>
        <p className=" text-3xs text-gray-800 mt-[14px] mb-4">{activeTab.slice(activeTab.length - 1)} of 4</p>
      </div>
      <TabsContent className="min-h-screen sm:min-h-[60vh]" value="step1">
        <Step1 setActiveTab={setActiveTab} activeTab={activeTab} />
      </TabsContent>
      <TabsContent className="min-h-screen  sm:min-h-[60vh] w-full" value="step2">
        <Step2 setActiveTab={setActiveTab} activeTab={activeTab} />
      </TabsContent>
      <TabsContent className=" min-h-screen  sm:min-h-[60vh]" value="step3">
        <Step3 fullname={fullname} setFullname={setFullname} setActiveTab={setActiveTab} activeTab={activeTab} />
      </TabsContent>
      <TabsContent className=" min-h-screen  sm:min-h-[60vh]" value="step4">
        <Step4
          fullname={fullname}
          email={email}
          setEmail={setEmail}
          setOnboardingCompleted={setOnboardingCompleted}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      </TabsContent>
    </Tabs>
  );
};

export default function Onboarding() {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState("step1");
  const isMobile = useMediaQuery("(max-width:640px)");
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [secondsRemaining, setSecondsRemaining] = useState(15);


  useEffect(() => {
    let timeout;
    if (onboardingCompleted) {
      timeout = setTimeout(() => {
        router.replace("/stock-picks");
      }, 1000 * 15);
    }
    return () => clearTimeout(timeout);
  }, [onboardingCompleted]);

  useEffect(() => {
    let timeout;
    if (secondsRemaining) {
      timeout = setTimeout(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [secondsRemaining]);

  useEffect(() => {
    if (onboardingCompleted) {
      setSecondsRemaining(15);
    }
  }, [onboardingCompleted]);

  useEffect(() => {
    let timeout;
    if (onboardingCompleted) {
      timeout = setTimeout(() => {
        router.replace("/stock-picks");
      }, 1000 * 15);
    }
    return () => clearTimeout(timeout);
  }, [onboardingCompleted]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Smooth scrolling behavior
    });
  }, [activeTab]);

  useLayoutEffect(() => {
    if (user?.is_onboard) {
      router.replace("/");
    }
  }, [user]);


  if (onboardingCompleted && isMobile) {
    return (
      <div className=" max-sm:h-screen h-[690px] open_sans relative">
        <motion.div
          style={{ background: "#00C37C" }}
          initial={{ opacity: 1, height: "100%" }}
          animate={{ opacity: 1, height: "60%" }}
          transition={{
            duration: 0.8,
            delay: 2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <div className=" flex flex-col items-center justify-center h-full">
            <Lottie height={166} width={166} autoPlay loop={false} animationData={SUCCESS_LOTTIE} />
            {/* <img height={166} width={166} className=" block" src="/assets/onboard.gif" /> */}
            <div className=" mt-5 ">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                className=" m-0 text-display-sm font-bold text-center text-white"
              >
                {user?.is_new ? "Welcome Onboard! 🎉" : "Welcome Aboard! 🎉"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                className=" text-white text-md font-medium text-center main-container"
              >
                {user?.is_new
                  ? "Congrats on unlocking 3 HOT stocks. 🚀 Get ready to explore the 'Stocks to Buy' section!"
                  : "You’re back on track and ready to explore the hidden gems. Dive into our services and make the most of your investing journey!"}
                {secondsRemaining} seconds
              </motion.p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ marginTop: 300 }}
          animate={{ marginTop: -40 }}
          transition={{
            duration: 0.8,
            delay: 2.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className=" flex flex-col px-11 gap-y-4 "
        >
          <div className="h-[100px] p-[2px] bg-[linear-gradient(93.19deg,#5AFBD3_2.64%,#35957D_107.97%)] rounded-xl">
            <div className=" h-full flex justify-between items-center py-4 px-[26px] bg-[#F1FFFB] rounded-[10px]">
              <div>
                <p className=" text-brand-400 font-bold text-md">Stocks to Buy</p>
                <p className=" text-sm text-[#667085]">
                  {user?.is_new ? "View your 3 Hot stocks here 🎉" : "View your HOT stocks here 🎉"}
                </p>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#3EC9AE"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="min-h-[100px] flex items-center justify-between py-4 px-[26px] border border-gray-200 bg-gray-25 rounded-xl">
            <div>
              <p className=" text-gray-700 font-bold text-md">Track Record</p>
              <p className=" text-sm text-[#667085]">
                {user?.is_new
                  ? "Our wins, our lessons—out in the open for you. Your trust is our ultimate reward."
                  : "Our wins, our lessons—out in the open for you. Your trust is our ultimate reward."}{" "}
              </p>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 18L15 12L9 6"
                stroke="#667085"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </motion.div>
        <div className=" flex absolute bottom-[1rem] w-full  items-center justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className=" text-sm text-gray-500 flex items-center justify-center mt-auto"
          >
            You will be redirected to Stocks to Buy in{" "}
            <span className="font-bold ml-[4px]"> {secondsRemaining} seconds</span>
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className=" relative bg-[url(/assets/onboarding_bg.webp),linear-gradient(180deg,#F5FFFF_0%,#E9F3F2_100%)] bg-cover min-h-screen">
      {onboardingCompleted ? (
        <div className=" h-screen overflow-hidden absolute w-full">
          <Lottie loop={false} className=" opacity-40 z-10 absolute left-60 " animationData={CONFETTIE} autoplay />
          <Lottie
            loop={false}
            animationData={CONFETTIE}
            autoplay
            className=" opacity-40  z-10 absolute left-0 top-1/2"
            // src="/assets/onboarding_popper.gif"
            alt="popper-gif"
          />
          <Lottie
            loop={false}
            animationData={CONFETTIE}
            autoplay
            className="  opacity-40  z-10 absolute right-0"
            alt="popper-gif"
          />
          <Lottie
            loop={false}
            animationData={CONFETTIE}
            autoplay
            className=" opacity-40  z-10 absolute right-60 top-1/2"
            alt="popper-gif"
          />
        </div>
      ) : // <Lottie className=" absolute left-0  pointer-events-none" autoPlay loop={false} animationData={POPPER_JSON} />
      null}
      <Header className=" h-auto max-sm:[&>div]:pb-3 bg-transparent" />
      {/* <Dialog open={isMobile ? false:true}> */}
      <div className=" z-30 flex items-center justify-center">
        <div
          className={` transition-all duration-300 hidden p-0 z-30  !rounded-[20px] bg-white overflow-hidden sm:flex flex-col w-[calc(100%-32px)] ${
            (activeTab === "step1" || activeTab === "step2") && !onboardingCompleted
              ? " max-w-[1278px]"
              : "  max-w-[520px]"
          }`}
          overlayClassName="bg-transparent open_sans"
          closeClassName="hidden"
        >
          <MainContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onboardingCompleted={onboardingCompleted}
            setOnboardingCompleted={setOnboardingCompleted}
          />
        </div>
      </div>
      {/* </Dialog> */}
      <div className=" z-30 bg-white w-[calc(100%-32px)] mx-auto sm:hidden rounded-t-[20px]">
        <MainContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onboardingCompleted={onboardingCompleted}
          setOnboardingCompleted={setOnboardingCompleted}
        />
      </div>
    </div>
  );
}
