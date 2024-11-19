import { Button, ButtonnArrow } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Dialog, DialogContent } from "@/components.v2/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components.v2/ui/tabs";
import { blockInvalidChar } from "@/components/LoginCard";
import { useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { motion } from "framer-motion";
import Header from "../payments/components/Header";
import { Controller, useForm } from "react-hook-form";
import { getEmailPhoneOtp, verifyEmailPhoneOtp } from "@/api/onboarding";
import AuthContext from "@/components/AuthContext";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import { useToast } from "@/components.v2/ui/use-toast";
import { useRouter } from "next/navigation";

const Step1 = ({ setActiveTab, activeTab }) => {
  return (
    <div className="min-h-[70vh] flex flex-col">
      <div className=" px-5 sm:px-9 ">
        <div className=" rounded-[21px] h-[256px] w-full bg-orange-400"></div>
        <div className=" py-6">
          <h3 className=" m-0 text-gray-950 text-xl font-bold">Value Investing with KamayaKya</h3>
          <ul className=" m-0 flex flex-col mt-4 gap-y-4">
            <li className=" flex items-start gap-x-2">
              <img src="/assets/tick.svg" height={20} width={20} alt="tick" />
              <div>
                <p className=" text-gray-800 text-sm font-medium">Monthly stock picks (Member only)</p>
                <p className=" text-sm text-[#667085]">
                  3-6 monthly picks. Long-Term Focus. 1+ year Hold. Invest in growth.
                </p>
              </div>
            </li>
            <li className=" flex items-start gap-x-2">
              <img src="/assets/tick.svg" height={20} width={20} alt="tick" />
              <div>
                <p className=" text-gray-800 text-sm font-medium">Buy/Sell/Hold actions on WhatsApp & Email</p>
                <p className=" text-sm text-[#667085]">No spam. Members only group.</p>
              </div>
            </li>
            <li className=" flex items-start gap-x-2">
              <img src="/assets/tick.svg" height={20} width={20} alt="tick" />
              <div>
                <p className=" text-gray-800 text-sm font-medium">Deep researched reports</p>
                <p className=" text-sm text-[#667085]">Crisp. Infographic.</p>
              </div>
            </li>
          </ul>
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
      <div className=" px-5 sm:px-9">
        <div className=" rounded-[21px] h-[256px] w-full bg-orange-400"></div>
        <div className=" py-6">
          <h3 className=" m-0 text-gray-950 text-xl font-bold">What We don’t do...</h3>
          <ul className=" m-0 flex flex-col mt-4 gap-y-4">
            <li className=" flex items-start gap-x-2">
              <img src="/assets/cross2.svg" height={20} width={20} alt="cross" />
              <div>
                <p className=" text-gray-800 text-sm font-medium">Not for short-term gains</p>
                <p className=" text-sm text-[#667085]">
                  Our philosophy lies in long-term investing in wealth-creation businesses for a minimum 1 year horizon
                </p>
              </div>
            </li>

            <li className=" flex items-start gap-x-2">
              <img src="/assets/cross2.svg" height={20} width={20} alt="cross" />
              <div>
                <p className=" text-gray-800 text-sm font-medium">No portfolio management</p>
                <p className=" text-sm text-[#667085]">
                  As SEBI-licensed research analysts, we do not provide portfolio management services. We expect you to
                  do your research and decide how much money to invest in any particular stock.
                </p>
              </div>
            </li>
          </ul>
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

const Step3 = ({ setFullname, activeTab, setActiveTab }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();
  const { user } = useContext(AuthContext);
  const handleName = async (data: IFormInput) => {
    try {
      setFullname(data?.fullname);
      setActiveTab("step4");
    } catch (e) {}
  };

  useEffect(() => {
    setValue("fullname", user?.fullname);
  }, [user]);

  return (
    <div className=" min-h-[70vh] flex flex-col">
      <div className=" px-5 sm:px-9">
        <div className=" rounded-[21px] h-[256px] w-full bg-orange-400"></div>
        <div className=" py-6">
          <h3 className=" m-0 text-gray-950 text-xl font-bold">What’s your name ?</h3>
          <p className=" text-sm text-[#667085]">
            We need to make sure you’re you. Please let us know what number to send a code to
          </p>
          <div className="flex flex-col mt-7 pb-[54px]">
            <p className="text-2xs  font-medium mb-1">
              Full Name <span className=" text-[#F04438]">*</span>
            </p>
            <input
              {...register("fullname", {
                required: "Enter Full Name to continue",
                minLength: { value: 3, message: "Enter Full Name to continue" },
              })}
              className={` text-sm py-2 px-[10px] border ${
                errors.fullname?.message ? "border-[#FDA29B]" : "border-[#0000000F]"
              }  rounded-lg bg-transparent`}
              placeholder="Enter your Name"
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

const Step4 = ({ fullname, setOnboardingCompleted, activeTab, setActiveTab }) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
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
  const { toast } = useToast();
  const email = getValues("email");
  const phone = getValues("phone");
  const handleEmailOtp = async (data: IFormEmailInput) => {
    try {
      let params = {
        type: loginMethod === "mobile" ? "email" : "mobile",

        user_id: user?.id,
      };
      if (loginMethod === "mobile") {
        params = {
          ...params,
          email: data.email,
        };
      } else {
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
        user_id: user?.id,
        full_name: fullname,
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
    if (secondsRemaining > 0) {
      const timer = setTimeout(() => {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [secondsRemaining]);

  useLayoutEffect(() => {
    const loginMethod = sessionStorage.getItem("login_method");
    setLoginMethod(loginMethod as string);
  }, [sessionStorage.getItem("login_method")]);

  // VERIFY OTP CONTENT
  if (displayOtpModal) {
    return (
      <div className=" mt-10 min-h-[67.5vh] flex flex-col">
        <div className=" px-5 sm:px-9">
          <h3 className=" m-0  text-xl font-bold text-gray-950">Verify your {loginMethod === "mobile" ? "email" : "Mobile number"}</h3>
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
        <div className="flex flex-col mt-8 pb-[54px] px-9">
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
          <ButtonnArrow loading={verifyingOtp} onClick={handleVerifyOtp} disabled={otp.length === 0} variant={ButtonVariant.primary}>
            <p>Verify</p>
          </ButtonnArrow>
        </div>
      </div>
    );
  }
  return (
    <div className=" mt-10 min-h-[70vh] flex flex-col">
      <div className=" px-9">
        <h3 className=" m-0  text-xl font-bold text-gray-950">Almost there! </h3>
        <p className=" mt-1 text-sm text-gray-500">
          {loginMethod === "mobile"
            ? "Add and verify your email to get your free stocks picks."
            : "Add and verify your Mobile number to get your free stocks picks."}
        </p>
      </div>
      <div className="flex flex-col mt-8 pb-[54px] px-9">
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
              className=" text-sm bg-transparent inline-block flex-1"
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

const MainContent = ({ onboardingCompleted, setOnboardingCompleted }) => {
  const [fullname, setFullname] = useState("");
  const [activeTab, setActiveTab] = useState("step1");

  const router =useRouter()

  return onboardingCompleted ? (
    <div className=" hidden sm:block max-sm:h-screen h-[690px] open_sans">
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
          <img height={166} width={166} className=" block" src="/assets/onboard.gif" />
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
              Welcome Onboard!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              className=" text-white text-md font-medium text-center"
            >
              Congrats! You have unlocked 3 free HOT stocks... You will be redirected to Stocks to Buy in 15 seconds
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
        <div onClick={()=>router.push("/stock-picks")} className="h-[100px]  cursor-pointer p-[2px] bg-[linear-gradient(93.19deg,#5AFBD3_2.64%,#35957D_107.97%)] rounded-xl">
          <div className=" h-full flex items-center justify-between py-4 px-[26px] bg-[#F1FFFB] rounded-[10px]">
            <div>
              <p className=" text-brand-400 font-bold text-md">Stocks to Buy</p>
              <p className=" text-sm text-[#667085]">View your 3 Hot stocks here 🎉</p>
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
        <div  onClick={()=>router.push("/track-record")} className="h-[100px] flex items-center justify-between cursor-pointer py-4 px-[26px] border border-gray-200 bg-gray-25 rounded-xl">
          <div>
            <p className=" text-gray-700 font-bold text-md">Track Record</p>
            <p className=" text-sm text-[#667085]">3-6 monthly picks. Long-Term Focus. 1+ year Hold. Invest in </p>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 18L15 12L9 6" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </div>
      </motion.div>
    </div>
  ) : (
    <Tabs
      onValueChange={(value) => setActiveTab(value)}
      defaultValue={activeTab}
      value={activeTab}
      className=" relative w-full open_sans"
    >
      <div className=" px-5 sm:px-9 -mt-5 sm:mt-0">
        <TabsList className=" flex justify-between bg-transparent relative z-10 space-x-4 h-fit p-0 pt-10">
          <TabsTrigger
            className={` !p-0  h-[4px] w-full ${
              ["step2", "step3", "step4"].includes(activeTab) ? "bg-[#0E6C63]" : "bg-[#E9EBEA]"
            }  shadow-none data-[state=active]:bg-[#75CDC5] data-[state=active]:shadow-none`}
            value="step1"
          ></TabsTrigger>
          <TabsTrigger
            className={`!p-0  h-[4px] w-full ${
              ["step3", "step4"].includes(activeTab) ? "bg-[#0E6C63]" : "bg-[#E9EBEA]"
            }  data-[state=active]:bg-[#75CDC5] data-[state=active]:shadow-none`}
            value="step2"
          ></TabsTrigger>
          <TabsTrigger
            value="step3"
            className={` !p-0  h-[4px] w-full ${
              ["step4"].includes(activeTab) ? "bg-[#0E6C63]" : "bg-[#E9EBEA]"
            } disabled:opacity-100 data-[state=active]:bg-[#75CDC5] data-[state=active]:shadow-none`}
          ></TabsTrigger>
          <TabsTrigger
            value="step4"
            className=" !p-0  h-[4px] w-full bg-[#E9EBEA] disabled:opacity-100 data-[state=active]:bg-[#75CDC5] data-[state=active]:shadow-none"
          ></TabsTrigger>
        </TabsList>
        <p className=" text-3xs text-gray-800 mt-[14px] mb-4">{activeTab.slice(activeTab.length - 1)} of 4</p>
      </div>
      <TabsContent className="min-h-screen sm:min-h-[60vh]" value="step1">
        <Step1 setActiveTab={setActiveTab} activeTab={activeTab} />
      </TabsContent>
      <TabsContent className="min-h-screen w-full" value="step2">
        <Step2 setActiveTab={setActiveTab} activeTab={activeTab} />
      </TabsContent>
      <TabsContent className=" min-h-screen" value="step3">
        <Step3 setFullname={setFullname} setActiveTab={setActiveTab} activeTab={activeTab} />
      </TabsContent>
      <TabsContent className=" min-h-screen" value="step4">
        <Step4
          fullname={fullname}
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
  const isMobile = useMediaQuery("(max-width:640px)");
  if (onboardingCompleted && isMobile) {
    return (
      <div className=" max-sm:h-screen h-[690px] open_sans">
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
            <img height={166} width={166} className=" block" src="/assets/onboard.gif" />
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
                Welcome Onboard!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                className=" text-white text-md font-medium text-center"
              >
                Congrats! You have unlocked 3 free HOT stocks... You will be redirected to Stocks to Buy in 15 seconds
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
            <div className=" h-full flex items-center py-4 px-[26px] bg-[#F1FFFB] rounded-[10px]">
              <div>
                <p className=" text-brand-400 font-bold text-md">Stocks to Buy</p>
                <p className=" text-sm text-[#667085]">View your 3 Hot stocks here 🎉</p>
              </div>
            </div>
          </div>
          <div className="h-[100px] py-4 px-[26px] border border-gray-200 bg-gray-25 rounded-xl">
            <div>
              <p className=" text-gray-700 font-bold text-md">Track Record</p>
              <p className=" text-sm text-[#667085]">3-6 monthly picks. Long-Term Focus. 1+ year Hold. Invest in </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
  return (
    <div className=" bg-[url(/assets/onboarding_bg.png),linear-gradient(180deg,#F5FFFF_0%,#E9F3F2_100%)] bg-cover min-h-screen">
      <Header className=" h-auto max-sm:[&>div]:pb-3 bg-transparent" />
      {/* <Dialog open={isMobile ? false:true}> */}
      <div className=" flex items-center justify-center">
        <div
          className=" hidden p-0  !rounded-[20px] bg-white overflow-hidden sm:flex flex-col w-[calc(100%-32px)] max-w-[520px]"
          overlayClassName="bg-transparent open_sans"
          closeClassName="hidden"
        >
          <MainContent onboardingCompleted={onboardingCompleted} setOnboardingCompleted={setOnboardingCompleted} />
        </div>
      </div>
      {/* </Dialog> */}
      <div className=" bg-white w-[calc(100%-32px)] mx-auto sm:hidden rounded-t-[20px]">
        <MainContent onboardingCompleted={onboardingCompleted} setOnboardingCompleted={setOnboardingCompleted} />
      </div>
    </div>
  );
}
