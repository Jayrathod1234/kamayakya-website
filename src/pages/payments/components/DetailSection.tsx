import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { IconButton, InputAdornment, OutlinedInput, styled, TextField } from "@mui/material";
import { ArrowLeft, Check, Loader, Mail } from "lucide-react";
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Checkbox } from "@/components.v2/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components.v2/ui/dialog";
import OtpInput from "react-otp-input";
import { blockInvalidChar } from "@/components/LoginCard";
import AadhaVerifyModal from "./AadhaVerifyModal";
import ConfirmDetailsModal from "./ConfirmDetailsModal";
import { getAadharOtp, getSelectedPlanDates, getUserKycStatus, postCheckout } from "../../../api/payment/index";
import { useToast } from "@/components.v2/ui/use-toast";
import { IPaymentContext, usePaymentContext } from "@/contexts/PaymentContext";
import AuthContext from "@/components/AuthContext";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import VerifyTag from "./VerifyTag";
import axios from "axios";
import Tooltip from "@/components.v3/common/Tooltip";
import { useRouter } from "next/router";

// Custom styled OutlinedInput
export const CustomTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "error", // Prevents passing `error` to the DOM
})(({ error }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: error ? "#FDA29B" : "#0000000F",
      borderRadius: 6.2,
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00645A", // Focus color
      borderWidth: 2,
    },
    "& input:valid + fieldset": {
      borderColor: error ? "red" : "green",
      borderWidth: 1,
    },
    "& input": {
      padding: "9px !important",
      paddingRight: "10px !important",
      paddingLeft: "12px",
    },
    "& input::placeholder": {
      fontSize: "14px",
    },
    // "& input:focus": {
    //   backgroudColor:"transparent"
    // },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 1,
    },
  },
}));

interface IFormInput {
  aadhar: string;
  fullname: string;
  pan: string;
  address: string;
  email: string;
  phone: string;
  gstin: string;
}

export default function DetailSection({ activeTab, setActiveTab }: { setActiveTab: any }) {
  const [gstChecked, setGstChecked] = useState(false);
  // const [aadhar, setAadhar] = useState("");
  const [billingSameAsAadhar, setBillingSameAsAadhar] = useState(false);
  const [aadharRequestId, setAadharRequestId] = useState("");
  const [displayModal, setDisplayModal] = useState("AADHAR");
  const [openDialog, setOpenDialog] = useState(false);
  const [aadharOtpLoading, setAadharOtpLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const {
    isAadharAlreadyVerified,
    userDetails,
    setUserDetails,
    planDetails,
    currentPlan,
    isPanAlreadyVerified,
    aadharVerified,
    setAadharVerified,
    setPlanDetails,
  } = usePaymentContext() as IPaymentContext;
  const { toast } = useToast();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      aadhar: "",
      fullname: "",
      pan: "",
      phone: "",
      email: "",
      gstin: "",
      address: "",
    },
  });
  const {
    control: control2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2, isValid },
    setError: setError2,
    getValues: getValues2,
    setValue: setValue2,
  } = useForm({
    defaultValues: {
      aadhar: "",
    },
  });
  const aadhar = getValues2("aadhar");
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  // const handleAadharEditClick = () => {
  //   setAadharVerified(false);
  //   setUserDetails((prev) => ({ ...prev, name: "", address: "", pan: "" }));
  //   setDisplayModal("AADHAR");
  // };

  const handleAadharOtp: SubmitHandler<Pick<IFormInput, "aadhar">> = async (data) => {
    try {
      setAadharOtpLoading(true);
      const res = await getAadharOtp({ aadhaar: data?.aadhar });
      // { result: { requestId: "dklsjfklsdlkfjdf" } };
      //  await getAadharOtp({ aadhaar: data?.aadhar });
      // { result: { requestId: "dklsjfklsdlkfjdf" } };
      //
      setAadharRequestId(res?.result?.requestId);
      setOpenDialog(true);
      // setAadharRequestId(res?.)
    } catch (e: any) {
      toast({
        variant: "warn",
        title: "",
        description: e?.response?.data?.message,
      });
    } finally {
      setAadharOtpLoading(false);
    }
  };

  // const loadScript = (src: string) => {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");

  //     script.src = src;

  //     script.onload = () => {
  //       resolve(true);
  //     };
  //     script.onerror = () => {
  //       resolve(false);
  //     };

  //     document.body.appendChild(script);
  //   });
  // };

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handleRazorpayScreen = async (amount: string, options: any) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/magic-checkout.js");

    if (!res) {
      alert("Some error at razorpay screen loading");
      return;
    }

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response: any) {
      alert(response.error.description);
    });
    paymentObject.open();
  };

  const handleCheckout: SubmitHandler<IFormInput> = async (data) => {
    if (!aadharVerified && !isAadharAlreadyVerified) {
      setError2("aadhar", { message: "Verify Aadhar to continue" });
      return;
    }
    setCheckoutLoading(true);
    try {
      let params = {
        base_amount: planDetails.totalPayable,
        subscription: currentPlan.planId,
        final_amount: planDetails.discount
          ? Number(planDetails.totalPayable) - Number(planDetails.discount)
          : planDetails.totalPayable,
        // tax_amount: planDetails.taxAmount,
        discount_code: planDetails.discountCode,
        // "discount_percentage":0,
        discount_amount: planDetails.discount,
        address: data.address,
        name: data.fullname,
        user_email: data.email,
        user_contact: data.phone.slice(3),
      };
      if (data?.gstin) {
        params = { ...params, gst_number: data.gstin };
      }
      const res = await postCheckout(params);
      const options = {
        key: "rzp_test_YteVuBPrLvOKSg", // Enter the Key ID generated from the Dashboard
        amount: 10,
        // res.data.final_amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "KamayaKya", //your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: res.data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        // callback_url: "https://legendary-madeleine-b03cd5.netlify.app/payments/successful",
        //  redirect:true,
        handler: function (response) {
          router.push("/payments/successful");
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
        },
        // https://legendary-madeleine-b03cd5.netlify.app
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: userDetails.name, //your customer's name
          email: userDetails.email,
          contact: userDetails.phone?.slice(3), //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#0b3a36",
          // backdrop_color: "#D2F5ED",
          // hide_topbar: true,
        },
        modal: {
          confirm_close: true,
        },
      };
      setPlanDetails((prev) => ({ ...prev, orderId: res.data.order_id }));
      sessionStorage.setItem("orderId", res.data.order_id);
      handleRazorpayScreen("", options);
    } catch (e) {
      console.error(e);
    } finally {
      setCheckoutLoading(false);
    }
  };
  useEffect(() => {
    setValue("fullname", userDetails.name);
    setValue("phone", userDetails.phone);
    setValue("address", userDetails.address);
    setValue("pan", userDetails.pan);
    setValue("email", userDetails.email);
    setValue2("aadhar", userDetails.aadhar);
  }, [userDetails, activeTab]);

  useEffect(() => {
    if (isAadharAlreadyVerified) {
      setValue2("aadhar", userDetails?.aadhar);
    }
  }, [isAadharAlreadyVerified]);

  useEffect(() => {
    if (errors.email || errors.address || errors.fullname || errors.phone || errors.pan) {
      if (!aadhar || !isValid) {
        setError2("aadhar", { message: "Enter Aadhar to continue" });
      } else {
        setError2("aadhar", { message: "" });
      }
    }
  }, [errors]);

  return (
    <div className="mt-9">
      <Dialog onOpenChange={setOpenDialog} open={openDialog}>
        <div className=" hidden sm:flex items-center mb-9">
          <button onClick={() => setActiveTab("review")}>
            <ArrowLeft size={18} />
          </button>
          <p className="ml-[5px] text-xs text-gray-600">Go Back to Previous Page</p>
        </div>
        <div className="grid grid-cols-2 gap-y-6 sm:gap-y-9 gap-x-[22px]">
          {!isAadharAlreadyVerified ? (
            <div className="col-span-2">
              <div className=" flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  Aadhar Card Number<span className="text-error-500">*</span>
                </p>
                {/* {aadharVerified && (
                  <button
                    onClick={handleAadharEditClick}
                    className=" text-xs text-brand-500 font-bold border-b border-b-brand-500 border-dashed"
                  >
                    Edit Aadhar
                  </button>
                )} */}
              </div>
              <Controller
                name="aadhar"
                control={control2}
                rules={{
                  required: "Enter aadhar to continue",
                  pattern: {
                    value: /^\d{4}\d{4}\d{4}$/,
                    message: "Enter a valid Aadhar number in the format XXXX XXXX XXXX (excluding spaces).",
                  },
                }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    error={errors2.aadhar?.message ? true : false}
                    type="number"
                    id="aadhar-number"
                    // onChange={(e) => setAadhar(e.target.value)}
                    variant="outlined"
                    fullWidth
                    placeholder="Enter your Aadhar Card Number"
                    InputProps={{
                      readOnly: aadharVerified || isAadharAlreadyVerified,
                      className: aadharVerified || isAadharAlreadyVerified ? "bg-[#F4F7FA99]" : "",
                      endAdornment: (
                        <InputAdornment className="!pr-0 flex items-center gap-x-[10px]" position="end">
                          {errors2.aadhar?.message && (
                            <Tooltip
                              tooltipContent={<p className=" text-2xs">{errors2.aadhar.message}</p>}
                              tooltipTrigger={
                                <svg
                                  width="16"
                                  height="17"
                                  viewBox="0 0 16 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.00016 5.98334V8.65M8.00016 11.3167H8.00683M14.6668 8.65C14.6668 12.3319 11.6821 15.3167 8.00016 15.3167C4.31826 15.3167 1.3335 12.3319 1.3335 8.65C1.3335 4.96811 4.31826 1.98334 8.00016 1.98334C11.6821 1.98334 14.6668 4.96811 14.6668 8.65Z"
                                    stroke="#F04438"
                                    stroke-width="1.33333"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              }
                            />
                          )}
                          {aadharVerified || isAadharAlreadyVerified ? (
                            <VerifyTag />
                          ) : (
                            <DialogTrigger disabled={field.value.length == 0}>
                              <Button
                                disabled={field.value.length == 0}
                                loading={aadharOtpLoading}
                                onClick={handleSubmit2(handleAadharOtp)}
                                className="min-w-fit !p-3 !py-[6px] !h-fit"
                                variant={ButtonVariant.primary}
                              >
                                <p className="text-sm font-semibold">Send OTP</p>
                              </Button>
                            </DialogTrigger>
                          )}
                        </InputAdornment>
                      ),
                    }}
                    className="!mt-[6px] pl-3  !py-[9px] !pr-[0px]"
                  />
                )}
              />

              <p className="text-3xs text-gray-500 mt-[6px]">
                Mandatory as per SEBI rules (OTP will be sent to the mobile no. linked to your Aadhar Card)
              </p>
            </div>
          ) : null}

          {userDetails?.name ? (
            <div className="col-span-2">
              <p className="text-xs text-gray-500">
                Full Name<span className="text-error-500">*</span>
              </p>
              <Controller
                name="fullname"
                control={control}
                rules={{
                  required: "Enter Name to continue",
                  // pattern: {
                  //   value: /^\d{4}\d{4}\d{4}$/,
                  //   message: '"Enter a valid Aadhar number in the format XXXX XXXX XXXX"',
                  // },
                }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    error={errors.fullname?.message ? true : false}
                    id="full-name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      readOnly: aadharVerified || isAadharAlreadyVerified,
                      className: aadharVerified || isAadharAlreadyVerified ? "bg-[#F4F7FA99]" : "",
                      endAdornment: (
                        <InputAdornment position="end">
                          {errors.fullname?.message && (
                            <Tooltip
                              tooltipContent={<p className=" text-2xs">{errors.fullname.message}</p>}
                              tooltipTrigger={
                                <svg
                                  width="16"
                                  height="17"
                                  viewBox="0 0 16 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.00016 5.98334V8.65M8.00016 11.3167H8.00683M14.6668 8.65C14.6668 12.3319 11.6821 15.3167 8.00016 15.3167C4.31826 15.3167 1.3335 12.3319 1.3335 8.65C1.3335 4.96811 4.31826 1.98334 8.00016 1.98334C11.6821 1.98334 14.6668 4.96811 14.6668 8.65Z"
                                    stroke="#F04438"
                                    stroke-width="1.33333"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              }
                            />
                          )}
                          {/* <Button className="min-w-fit !p-3 !py-[6px] !h-fit" variant={ButtonVariant.primary}>
                    <p className="text-sm font-semibold">Send OTP</p>
                  </Button> */}
                        </InputAdornment>
                      ),
                    }}
                    className="!mt-[6px]  !py-[9px] !pr-[6px] !rounded-[6.2px] !border-[#0000000F]"
                  />
                )}
              />
              {/* <p className="text-3xs text-gray-500 mt-[6px]">
            Mandatory as per SEBI rules (OTP will be sent to the mobile no. linked to your Aadhar Card)
          </p> */}
            </div>
          ) : null}
          {(isAadharAlreadyVerified && !isPanAlreadyVerified) ||
          userDetails.pan ||
          (userDetails.aadhar && !userDetails.pan) ? (
            <>
              <div className="col-span-2">
                <p className="text-xs text-gray-500">
                  PAN Number<span className="text-error-500">*</span>
                </p>
                <Controller
                  name="pan"
                  control={control}
                  rules={{
                    required: "Enter PAN to continue",
                    pattern: {
                      value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                      message: "Enter a valid Pan number in the format XXXXX0000X",
                    },
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      id="pan-number"
                      type="text"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                        className: (userDetails.pan ? true : false) || isPanAlreadyVerified ? "bg-[#F4F7FA99]" : "",
                        endAdornment: (
                          <InputAdornment position="end">
                            {isPanAlreadyVerified || userDetails.pan ? (
                              <VerifyTag />
                            ) : (
                              <button
                                className=" "
                                onClick={() => {
                                  // setOpenDialog(true);
                                  handleAadharOtp({ aadhar: userDetails?.aadhar });
                                }}
                              >
                                {aadharOtpLoading ? <span className=" inline-flex items-center justify-center gap-x-1"><Loader color="#12B76A" fontSize={12} height={12} width={12}/><p className=" text-2xs text-[#12B76A]">Verifying</p></span>:<p className=" text-2xs text-brand-500 border-b border-dashed border-b-brand-500">Verify Pan</p>}
                               
                              </button>
                            )}
                            {/* <Button className="min-w-fit !p-3 !py-[6px] !h-fit" variant={ButtonVariant.primary}>
                    <p className="text-sm font-semibold">Send OTP</p>
                  </Button> */}
                          </InputAdornment>
                        ),
                      }}
                      className="!mt-[6px]  !py-[9px] !pr-[6px] !rounded-[6.2px] !border-[#0000000F]"
                    />
                  )}
                />
              </div>
            </>
          ) : null}
          {/* || isAadharAlreadyVerified */}
          {/* || userDetails.address */}
          {aadharVerified  && (
            <div className="col-span-2">
              <p className="text-xs text-gray-500">
                Billing Address<span className="text-error-500">*</span>
              </p>
              <Controller
                name="address"
                control={control}
                rules={{
                  required: "Enter address to continue",
                  // pattern: {
                  //   value: /^\d{4}\d{4}\d{4}$/,
                  //   message: '"Enter a valid Aadhar number in the format XXXX XXXX XXXX"',
                  // },
                }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    id="address"
                    type="text"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      readOnly: true ,
                      // billingSameAsAadhar ? true : false,
                      className: (userDetails.address ? true : false) ? "bg-[#F4F7FA99]" : "",
                      endAdornment: (
                        <InputAdornment position="end">
                          {/* {billingSameAsAadhar? null : (
                            <Button className="min-w-fit !p-3 !py-[6px] !h-fit" variant={ButtonVariant.primary}>
                              <p className="text-sm font-semibold">Check</p>
                            </Button>
                          )} */}
                        </InputAdornment>
                      ),
                    }}
                    className="!mt-[6px]  !py-[9px] !pr-[6px] !rounded-[6.2px] !border-[#0000000F]"
                  />
                )}
              />
             {/* {!isAadharAlreadyVerified ? ( <div className=" flex items-center gap-x-2">
                <Checkbox
                  checked={billingSameAsAadhar}
                  onCheckedChange={(checked) => {
                    if (!checked) {
                      setUserDetails((prev) => ({ ...prev, address: "" }));
                     
                    }
                    setBillingSameAsAadhar(checked as boolean);
                  }}
                  id="billingAadharAddress"
                />
                
                  <p className=" text-sm text-[#475467]">Billing address is the same as Aadhar address</p>
                 
              </div>): null} */}
            </div>
          )}

          <div className=" col-span-full sm:col-span-1">
            <p className="text-xs text-gray-500">
              Email ID<span className="text-error-500">*</span>
            </p>
            <div className="flex">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Enter email to continue",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter a valid email",
                  },
                }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    error={
                      errors.email?.message || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(field.value) ? true : false
                    }
                    id="email"
                    type="text"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail size={15} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          {errors.email?.message || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(field.value) ? (
                            <Tooltip
                              tooltipContent={
                                <p className=" text-2xs">{errors.email?.message ?? "Enter valid email"}</p>
                              }
                              tooltipTrigger={
                                <svg
                                  width="16"
                                  height="17"
                                  viewBox="0 0 16 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.00016 5.98334V8.65M8.00016 11.3167H8.00683M14.6668 8.65C14.6668 12.3319 11.6821 15.3167 8.00016 15.3167C4.31826 15.3167 1.3335 12.3319 1.3335 8.65C1.3335 4.96811 4.31826 1.98334 8.00016 1.98334C11.6821 1.98334 14.6668 4.96811 14.6668 8.65Z"
                                    stroke="#F04438"
                                    stroke-width="1.33333"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              }
                            />
                          ) : field.value ? (
                            <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon" />
                          ) : null}

                          {/* <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon" /> */}
                        </InputAdornment>
                      ),
                    }}
                    className="!mt-[6px]  !pr-[6px] !rounded-[6.2px]"
                  />
                )}
              />
            </div>
            <p className="text-3xs text-gray-500 mt-[6px]">You will get your invoice on email</p>
          </div>
          <div className="col-span-full sm:col-span-1">
            <p className="text-xs text-gray-500">
              Mobile Number<span className="text-error-500">*</span>
            </p>
            <div className="flex">
              <div
                // className="  !py-[9px] !pr-[6px] !rounded-[6.2px] !border-[#0000000F]"
                className={`  w-full !mt-[6px] flex items-center border ${
                  errors.phone?.message ? "border-[#FDA29B]" : "border-[#0000000F]"
                }  rounded-[6.2px] py-[9px] px-[14px] flex items-center"
                `}
              >
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
                    // pattern: {
                    //   value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    //   message: '"Enter a valid email"',
                    // },
                  }}
                  render={({ field: { value, onChange } }) => (
                    <>
                      {" "}
                      <PhoneInput
                        value={value}
                        onChange={onChange}
                        defaultCountry="IN"
                        placeholder="Enter phone number"
                        className=" border-green-400"
                      />
                      <InputAdornment position="end">
                        {errors.phone?.message || !isPossiblePhoneNumber(value) || value.slice(3).length != 10 ? (
                          <Tooltip
                            tooltipContent={
                              <p className=" text-2xs">{errors.phone?.message || "Enter valid phone number."}</p>
                            }
                            tooltipTrigger={
                              <svg
                                width="16"
                                height="17"
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.00016 5.98334V8.65M8.00016 11.3167H8.00683M14.6668 8.65C14.6668 12.3319 11.6821 15.3167 8.00016 15.3167C4.31826 15.3167 1.3335 12.3319 1.3335 8.65C1.3335 4.96811 4.31826 1.98334 8.00016 1.98334C11.6821 1.98334 14.6668 4.96811 14.6668 8.65Z"
                                  stroke="#F04438"
                                  stroke-width="1.33333"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            }
                          />
                        ) : isPossiblePhoneNumber(value) ? (
                          <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon" />
                        ) : null}
                        {/* <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon" /> */}
                      </InputAdornment>
                    </>
                  )}
                />
              </div>

              {/* <CustomTextField
              id="phone"
              type="text"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment:(
                  <InputAdornment position="start">
                  <Mail size={15}/>
                </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon"/>
                  </InputAdornment>
                ),
              }}
              className="!mt-[6px]  !pr-[6px] !rounded-[6.2px]"
            /> */}
            </div>
            <p className="text-3xs text-gray-500 mt-[6px]">You will get stock action calls on WhatsApp</p>
          </div>
          {/* <div className="col-span-2 flex space-x-2 items-center">
            <Checkbox
              checked={gstChecked}
              onCheckedChange={(checked) => setGstChecked(checked as boolean)}
              id="GSTIN"
            />
            <p className=" text-sm text-gray-950">Use GSTIN for this order</p>
          </div>

          {gstChecked && (
            <div className="col-span-2 p-4 border rounded-xl border-gray-150">
              <p className="text-xs text-gray-500">
                GST Details<span className="text-error-500">*</span>
              </p>
              <div className="flex">
                <Controller
                  name="gstin"
                  control={control}
                  rules={{
                    required: { value: gstChecked ? true : false, message: "Enter Gst Details to continue." },
                    pattern: {
                      value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                      message: "Enter valid gst",
                    },
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      id="gst"
                      error={errors.gstin?.message ? true : false}
                      type="text"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {errors.gstin?.message ? (
                              <Tooltip
                                tooltipContent={<p className=" text-2xs">{errors.gstin.message}</p>}
                                tooltipTrigger={
                                  <svg
                                    width="16"
                                    height="17"
                                    viewBox="0 0 16 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.00016 5.98334V8.65M8.00016 11.3167H8.00683M14.6668 8.65C14.6668 12.3319 11.6821 15.3167 8.00016 15.3167C4.31826 15.3167 1.3335 12.3319 1.3335 8.65C1.3335 4.96811 4.31826 1.98334 8.00016 1.98334C11.6821 1.98334 14.6668 4.96811 14.6668 8.65Z"
                                      stroke="#F04438"
                                      stroke-width="1.33333"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                }
                              />
                            ) : field.value ? (
                              <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon" />
                            ) : null}
                          </InputAdornment>
                        ),
                      }}
                      className="!mt-[6px]  !pr-[6px] !rounded-[6.2px]"
                    />
                  )}
                />
              </div>
            </div>
          )} */}

          <div className="col-span-2 ">
            <Button
              loading={checkoutLoading}
              onClick={handleSubmit(handleCheckout)}
              className=" w-full"
              variant={ButtonVariant.primary}
            >
              <p className=" text-sm font-medium">Proceed to Checkout</p>
            </Button>
          </div>
        </div>
        {displayModal.includes("AADHAR") ? (
          <AadhaVerifyModal
            setAadharRequestId={setAadharRequestId}
            setOpenDialog={setOpenDialog}
            setDisplayModal={setDisplayModal}
            displayModal={displayModal}
            openDialog={openDialog}
            aadhar={aadhar}
            requestId={aadharRequestId}
            setBillingSameAsAadhar={setBillingSameAsAadhar}
          />
        ) : null}
        {displayModal.includes("CONFIRM") ? (
          <ConfirmDetailsModal
            setDisplayModal={setDisplayModal}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        ) : null}
      </Dialog>
    </div>
  );
}
