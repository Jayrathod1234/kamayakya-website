import { Dialog, DialogContent, DialogTrigger } from "@/components.v2/ui/dialog";
import React from "react";
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Line } from "@/components.v2/blogs/blog-card-sm";
import { Mail } from "lucide-react";

interface ILoginPrompt {
  triggerEle: React.ReactNode;
}

const NewUserList = ({ label }: { label: string }) => {
  return (
    <div className="flex items-start gap-x-[10px]">
      <img src="/assets/onboarding_tick.svg" alt="tick" />
      <p className=" text-[#00000085] text-sm">{label}</p>
    </div>
  );
};

interface IFormData {
  phone: string;
}

const SignUpContent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      phone: "",
    },
  });

  const handleRequestOtp = async (data: IFormData) => {
    const { phone = "" } = data;
  };
  if (true) {
    return (
      <div className=" p-5 sm:py-[60px] md:p-[60px] flex-1">
        <h2 className=" text-gray-900 text-display-xs font-bold m-0">OTP Sent!</h2>
        <p className="  text-gray-900 m-0 mt-4 ">Please enter the OTP sent to +91 9990002401. </p>
        <button className=" m-0 ">
          <p className=" font-medium text-brand-500 m-0 ">Edit Mobile Number</p>
        </button>
        <div className=" mt-9">
          <p className=" font-medium mb-[6px] text-2xs">Mobile Number</p>
          <div className=" border border-[#0000000F] py-2 px-[10px] rounded-lg">
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Enter phone to continue",
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
          </div>
        </div>
        <div className=" mt-8">
          <p className=" text-gray-400 text-2xs">
            By signing in you agree to all our <span className=" text-brand-500 underline">terms & conditions</span>
          </p>
          <Button
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
          <Button className=" max-w-full min-w-full" variant={ButtonVariant.tertiary}>
            <Mail height={24} width={24} />
            <p className=" ml-[10px] text-[#242424] text-sm font-medium">Sign in with Email</p>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className=" p-5 sm:py-[60px] md:p-[60px] flex-1">
      <h2 className=" text-gray-900 text-display-xs font-bold">Sign in to KamayaKya</h2>
      <div className=" mt-9">
        <p className=" font-medium mb-[6px] text-2xs">Mobile Number</p>
        <div className=" border border-[#0000000F] py-2 px-[10px] rounded-lg">
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Enter phone to continue",
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
        </div>
      </div>
      <div className=" mt-8">
        <p className=" text-gray-400 text-2xs">
          By signing in you agree to all our <span className=" text-brand-500 underline">terms & conditions</span>
        </p>
        <Button
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
        <Button className=" max-w-full min-w-full" variant={ButtonVariant.tertiary}>
          <Mail height={24} width={24} />
          <p className=" ml-[10px] text-[#242424] text-sm font-medium">Sign in with Email</p>
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
        className=" flex !p-0 overflow-hidden open_sans w-[calc(100%-32px)]  max-w-[840px]"
      >
        <div className=" py-10 pb-4 bg-[#FFECDB] max-w-[352px] hidden sm:block flex-1 ">
          <div className=" flex flex-col items-center min-w-0">
            <img width={26} height={32} src="/KKLogoK.svg" alt="kklogo" />
            <div className=" p-4  rounded-lg border border-[#FFFFFF] bg-[#FFFFFF66] mt-[14px] min-w-0 flex flex-col gap-y-3">
              <p className=" text-gray-700 font-bold text-md">New User?</p>
              <NewUserList label="Get 3 Hot Stocks for Free" />
              <NewUserList label="See Track Record" />
              <NewUserList label="Get WhatsApp & Email Notifications" />
            </div>
          </div>

          <img src="/assets/onboarding_login.gif" alt="onboarding" />
        </div>
        <SignUpContent />
      </DialogContent>
    </Dialog>
  );
}
