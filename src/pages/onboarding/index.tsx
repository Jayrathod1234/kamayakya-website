import { Button, ButtonnArrow } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Dialog, DialogContent } from "@/components.v2/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components.v2/ui/tabs";
import { blockInvalidChar } from "@/components/LoginCard";
import { useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { motion } from "framer-motion";

const Step1 = () => {
  return (
    <div className="min-h-[70vh] flex flex-col">
      <div className=" px-9 mt-auto">
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
      <div className=" bg-gray-50 border border-gray-150 p-4 relative mt-auto">
        <ButtonnArrow className=" ml-auto" variant={ButtonVariant.primary}>
          <p>Next</p>
        </ButtonnArrow>
      </div>
    </div>
  );
};
const Step2 = () => {
  return (
    <div className="min-h-[70vh] flex flex-col">
      <div className=" px-9">
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
      <div className=" bg-gray-50 border border-gray-150 p-4 flex justify-between mt-auto">
        <ButtonnArrow
          arrowPosition="start"
          arrowStyle=" rotate-180 "
          strokeStyle="stroke-brand-400"
          className="bg-transparent "
          variant={ButtonVariant.secondary}
        >
          <p>Previous</p>
        </ButtonnArrow>
        <ButtonnArrow variant={ButtonVariant.primary}>
          <p>Next</p>
        </ButtonnArrow>
      </div>
    </div>
  );
};

const Step3 = () => {
  return (
    <div className=" min-h-[70vh] flex flex-col">
      <div className=" px-9">
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
              className=" text-sm py-2 px-[10px] border border-[#0000000F] rounded-lg bg-transparent"
              placeholder="Enter your Name"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className=" bg-gray-50 border border-gray-150 p-4 flex justify-between mt-auto">
        <ButtonnArrow
          arrowPosition="start"
          arrowStyle=" rotate-180 "
          strokeStyle="stroke-brand-400"
          className="bg-transparent "
          variant={ButtonVariant.secondary}
        >
          <p>Previous</p>
        </ButtonnArrow>
        <ButtonnArrow variant={ButtonVariant.primary}>
          <p>Next</p>
        </ButtonnArrow>
      </div>
    </div>
  );
};

const Step4 = () => {
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  //   getValues,
  //   setValue,
  // } = useForm({
  //   defaultValues: {
  //     phone: "",
  //   },
  // });
  const [secondsRemaining, setSecondsRemaining] = useState(15);
  const [resendOtp, setResendOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  // const handleRequestOtp = async (data: IFormData) => {
  //   const { phone = "" } = data;
  // };

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

  // VERIFY OTP CONTENT
  if (false) {
    return (
      <div className=" mt-10 min-h-[67.5vh] flex flex-col">
        <div className=" px-9">
          <h3 className=" m-0  text-xl font-bold text-gray-950">Verify your email</h3>
          <p className=" mt-1 text-sm text-gray-500">
            Please enter the OTP sent to 20johndoe@gmail.com.{" "}
            <span aria-label="button" className=" text-[#0E6C63] underline cursor-pointer">
              Edit Email
            </span>{" "}
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
                <button className=" text-[#1D4040] text-2xs font-semibold">Resend</button>
              ) : (
                <span className=" text-2xs font-semibold">{secondsRemaining} seconds</span>
              )}
            </p>
          </div>
        </div>
        <div className=" bg-gray-50 border border-gray-150 p-4 flex justify-between mt-auto">
          <ButtonnArrow
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
  }
  return (
    <div className=" mt-10 min-h-[70vh] flex flex-col">
      <div className=" px-9">
        <h3 className=" m-0  text-xl font-bold text-gray-950">Almost there! </h3>
        <p className=" mt-1 text-sm text-gray-500">Add and verify your email to get your free stocks picks.</p>
      </div>
      <div className="flex flex-col mt-8 pb-[54px] px-9">
        <p className="text-2xs  font-medium mb-1">
          Email <span className=" text-[#F04438]">*</span>
        </p>
        <div className="py-2 px-[10px] border border-[#0000000F] rounded-lg bg-transparent flex  ">
          <input className=" text-sm bg-transparent inline-block flex-1" placeholder="Enter your Name" type="text" />
          <Button className=" !p-3" variant={ButtonVariant.primary}>
            <p className=" text-sm font-semibold">Send OTP</p>
          </Button>
        </div>
      </div>
      <div className=" bg-gray-50 border border-gray-150 p-4 flex justify-between mt-auto">
        <ButtonnArrow
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

const MainContent = ()=>{
  return  false ? (
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
              Congrats! You have unlocked 3 free HOT stocks... You will be redirected to Stocks to Buy in 15
              seconds
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
            <p className=" text-sm text-[#667085]">
              3-6 monthly picks. Long-Term Focus. 1+ year Hold. Invest in{" "}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  ) : (
    <Tabs
      
      // onValueChange={(value) => setActiveTab(value)}
      defaultValue={"step1"}
      // value={activeTab}
      className=" relative w-full open_sans"
    >
      <div className=" px-9">
        <TabsList className=" flex justify-between bg-transparent relative z-10 space-x-4 h-fit p-0 pt-10">
          <TabsTrigger
            className=" !p-0  h-[4px] w-full bg-[#E9EBEA] shadow-none data-[state=active]:bg-[#75CDC5] data-[state=active]:shadow-none"
            value="step1"
          ></TabsTrigger>
          <TabsTrigger
            className="!p-0  h-[4px] w-full bg-[#E9EBEA]  data-[state=active]:bg-[#75CDC5] data-[state=active]:shadow-none"
            value="step2"
          ></TabsTrigger>
          <TabsTrigger
            value="step3"
            className=" !p-0  h-[4px] w-full bg-[#E9EBEA] disabled:opacity-100 data-[state=active]:bg-[#75CDC5] data-[state=active]:shadow-none"
          ></TabsTrigger>
          <TabsTrigger
            value="step4"
            className=" !p-0  h-[4px] w-full bg-[#E9EBEA] disabled:opacity-100 data-[state=active]:bg-[#75CDC5] data-[state=active]:shadow-none"
          ></TabsTrigger>
        </TabsList>
        <p className=" text-3xs text-gray-800 mt-[14px] mb-4">1 of 4</p>
      </div>
      <TabsContent className=" min-h-[60vh]" value="step1">
        <Step1 />
      </TabsContent>
      <TabsContent className=" w-full" value="step2">
        <Step2 />
      </TabsContent>
      <TabsContent value="step3">
        <Step3 />
      </TabsContent>
      <TabsContent value="step4">
        <Step4 />
      </TabsContent>
    </Tabs>
  )
}

export default function Onboarding() {
  return (
    <div className=" bg-[url(/assets/onboarding_bg.png)] bg-cover h-screen">
      <Dialog open={true}>
        <DialogContent
          className="p-0  !rounded-[20px] overflow-hidden flex flex-col w-[calc(100%-32px)] max-w-[520px]"
          overlayClassName="bg-transparent open_sans"
          closeClassName="hidden"
        >
          <MainContent/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
