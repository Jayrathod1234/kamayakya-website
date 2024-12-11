import { Button, ButtonnArrow } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Dialog, DialogContent } from "@/components.v2/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components.v2/ui/tabs";
import { blockInvalidChar } from "@/components/LoginCard";
import { useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { motion } from "framer-motion";
import Header from "./components/Header";
import { Controller, useForm } from "react-hook-form";
import { getEmailPhoneOtp, verifyEmailPhoneOtp } from "@/api/onboarding";
import AuthContext from "@/components/AuthContext";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import { toast } from "@/components.v2/ui/use-toast";
import { useRouter } from "next/navigation";
import { axiosApi } from "@/utils/axios";
import Lottie from "lottie-react";
import POPPER_JSON from "../../../public/assets/popper.json";
import SUCCESS_LOTTIE from "../../../public/assets/success_onboarding.json";
import CONFETTIE from "../../../public/assets/onboarding_confetti.json";
import { ContactModal } from "@/components.v2/payments/contact-modal";

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
                pattern: { value: /^[a-zA-Z]+( [a-zA-Z]+)*$/, message: "Please Enter valid name" },
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

const Step4 = ({
  fullname,
  setOnboardingCompleted,
  activeTab,
  setActiveTab,
  email: preExistinEmail,
  phone: preExistingPhone,
}) => {
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

  const verySmallScreen = useMediaQuery("(max-width:400px)");
  const handleEmailOtp = async (data: IFormEmailInput) => {
    try {
      let params = {
        type: loginMethod === "mobile" ? "email" : "mobile",

        user_id: user?.id ? user?.id : sessionStorage.getItem("user_id"),
      };
      if (loginMethod === "mobile") {
        sessionStorage.setItem("email", data.email);
        params = {
          ...params,
          email: data.email,
        };
      } else {
        sessionStorage.setItem("mobile", data.phone);
        params = {
          ...params,
          mobile: data.phone,
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
      let params = {
        type: loginMethod === "mobile" ? "email" : "mobile",
        otp,
        user_id: user?.id ? user?.id : sessionStorage.getItem("user_id"),
        full_name: fullname ? fullname : sessionStorage.getItem("fullname"),
      };
      if (loginMethod === "mobile") {
        params = { ...params, email: email };
      } else {
        params = { ...params, mobile: phone };
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
        setValue("email", savedEmailPhone);
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
            Please enter the OTP sent to {loginMethod === "mobile" ? email : phone}.{" "}
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
            ? user?.is_new ? "Just one last step! Add and verify your Email ID to get your 3 HOT stock picks for FREE.":"Just one last step! Verify your Email ID to regain access to your membership and continue your smart investing journey."
            : user?.is_new ? "Just one last step! Add and verify your Mobile number to get your 3 HOT stock picks for FREE.":"Just one last step! Verify your mobile number to regain access to your membership and continue your smart investing journey."}
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
  const router = useRouter();

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

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Smooth scrolling behavior
    });
  },[activeTab])

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
