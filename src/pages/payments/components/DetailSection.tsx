import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { IconButton, InputAdornment, OutlinedInput, styled, TextField, TextFieldProps } from "@mui/material";
import { ArrowLeft, Check, Loader, Mail } from "lucide-react";
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Checkbox } from "@/components.v2/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components.v2/ui/dialog";
import OtpInput from "react-otp-input";
import { blockInvalidChar } from "@/components/LoginCard";
import AadhaVerifyModal from "./AadhaVerifyModal";
import ConfirmDetailsModal from "./ConfirmDetailsModal";
import { pdf } from "@react-pdf/renderer";

import {
  getAadharOtp,
  getAddress,
  getAddressFromPincode,
  getDigioIdandSendPdf,
  getSelectedPlanDates,
  getUserDetailsForPdf,
  getUserKycStatus,
  postAadharOtp,
  postCheckout,
  postVerifyPan,
} from "../../../api/payment/index";
import { toast } from "@/components.v2/ui/use-toast";
import { IPaymentContext, usePaymentContext } from "@/contexts/PaymentContext";
import AuthContext from "@/components/AuthContext";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import VerifyTag from "./VerifyTag";
import axios from "axios";
import Tooltip from "@/components.v3/common/Tooltip";
import { useRouter } from "next/router";
import { PLAN_FREQUENCY_MAP } from "@/constants/pricing/plans";
import { KamayakyaPDFDocument } from "./AgreementPdf";
import KycPrivacyNotice from "./KycPrivacyNotice";
import GoBackButton from "./GoBackButton";
import AadharInput from "./AadharInput";
import PanInput from "./PanInput";
import { useSearchParams } from "next/navigation";

type CustomTextFieldProps = TextFieldProps & {
  confirmAddress?: boolean;
  sendotp?: boolean;
};

type ParamsType = {
  base_amount: string;
  subscription: string;
  final_amount: string | number;
  discount_code: string;
  discount_amount: string;
  address: string;
  name: string;
  user_email: string;
  user_contact: string;
  gst_number?: string; // Optional property
};

// Custom styled OutlinedInput
export const CustomTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "error" && prop !== "confirmAddress" && prop !== "sendotp", // Prevents passing `error` to the DOM
})<CustomTextFieldProps>(({ error, confirmAddress, sendotp }) => ({
  "& .MuiOutlinedInput-root": {
    paddingRight: sendotp ? "6px" : "11px",
    "& fieldset": {
      borderColor: error ? "#FDA29B" : "#0000000F",
      borderRadius: confirmAddress ? "8px 8px 0 0" : "6.2px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00645A", // Focus color
      borderWidth: 1,
    },
    "& input:valid + fieldset": {
      borderColor: error ? "red" : "green",
      borderWidth: 1,
    },
    "& input": {
      fontSize: "14px",
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

export interface IFormInput {
  aadhar: string;
  fullname: string;
  pan: string;
  address: string;
  email: string;
  phone: string;
  gstin: string;
}

export default function DetailSection({ activeTab, setActiveTab }: { setActiveTab: any; activeTab: string }) {
  const [gstChecked, setGstChecked] = useState(false);
  // const [aadhar, setAadhar] = useState("");
  const [billingSameAsAadhar, setBillingSameAsAadhar] = useState(true);
  const [aadharRequestId, setAadharRequestId] = useState("");
  const [displayModal, setDisplayModal] = useState("AADHAR");
  const [openDialog, setOpenDialog] = useState(false);
  const [aadharOtpLoading, setAadharOtpLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkingPincode, setCheckingPincode] = useState(false);
  const [pincodeVerified, setPincodeVerified] = useState(false);
  const [pincodeBasedAddress, setPincodeBasedAddress] = useState("");
  const {
    isAadharAlreadyVerified,
    userDetails,
    setUserDetails,
    planDetails,
    currentPlan,
    isPanAlreadyVerified,
    isAadharVintage,
    aadharVerified,
    setAadharVerified,
    setPlanDetails,
    panVerified,
    setPanVerified,
  } = usePaymentContext() as IPaymentContext;
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    setValue,
    watch,
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
      // aadhar: "",
      pan: "",
    },
  });
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [displayFailedAddharModal, setDisplayFailedAddharModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchAadharFailed, setFetchAadharFailed] = useState(false);
  const [testFile, setTestFile] = useState("");
  const { planDates } = usePaymentContext() as IPaymentContext;
  // const aadhar = getValues2("aadhar");
  const preExistingAddress = getValues("address");
  const email = watch("email");
  const mobile = watch("phone");
  const address = watch("address");
  const pan = getValues2("pan");
  const params = useSearchParams();
  // const handleAadharOtp: SubmitHandler<Pick<IFormInput, "aadhar">> = async (data) => {
  //   try {
  //     setAadharOtpLoading(true);

  //     const res = await getAadharOtp({ aadhaar: data?.aadhar });
  //     // { result: { requestId: "dklsjfklsdlkfjdf" } };
  //     //  await getAadharOtp({ aadhaar: data?.aadhar });
  //     // { result: { requestId: "dklsjfklsdlkfjdf" } };
  //     //
  //     setAadharRequestId(res?.result?.requestId);
  //     setOpenDialog(true);
  //     if (displayFailedAddharModal) {
  //       setDisplayFailedAddharModal(false);
  //     }
  //     // setAadharRequestId(res?.)
  //   } catch (e: any) {
  //     if (e?.response?.data?.message?.includes("Invalid Aadhaar")) {
  //       toast({
  //         variant: "warn",
  //         title: "",
  //         description: "Invalid Aadhaar Number. Please check and re-enter a valid Aadhaar Number.",
  //       });
  //       return;
  //     }
  //     if (e?.response?.data?.message?.includes("Source down")) {
  //       setDisplayFailedAddharModal(true);
  //       setOpenDialog(true);
  //       return;
  //     }

  //     if (e?.response?.data?.detail?.includes("Token ")) {
  //       toast({
  //         variant: "warn",
  //         title: "",
  //         description: "Session Expired! Please relogin and try again. ",
  //       });
  //     }

  //     toast({
  //       variant: "warn",
  //       title: "",
  //       description: e?.response?.data?.message || e?.response?.data?.detail || "Something went wrong.",
  //     });
  //   } finally {
  //     setAadharOtpLoading(false);
  //   }
  // };

  // const handleVerifyAadharOtp = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await postAadharOtp({ aadhar, is_encrypted: true });
  //     let address = res?.address;
  //     if (displayFailedAddharModal) {
  //       setDisplayFailedAddharModal(false);
  //     }
  //     // if (res?.is_aadhar_verified) {
  //     //   setOpenDialog(false);
  //     //   toast({
  //     //     variant: "warn",
  //     //     description: res?.message,
  //     //   });
  //     //   return;
  //     // }
  //     // setUserDetails((prev) => ({
  //     //   ...prev,
  //     //   pan: res?.pan_number,
  //     //   name: res?.name,
  //     //   address: address,
  //     //   // aadhar: res?.masked_aadhar,
  //     //   maskedPan: res?.masked_pan_number,
  //     // }));

  //     // setDisplayModal("CONFIRM");

  //     if (res?.is_aadhar_verified && res?.is_aadhar_vintage) {
  //       // setOpenDialog(false);
  //       // toast({
  //       //   variant: "warn",
  //       //   description: res?.message,
  //       // });
  //       // return;
  //       setUserDetails((prev) => ({
  //         ...prev,
  //         pan: res?.pan_number,
  //         name: res?.name,
  //         address: address,
  //         aadhar: res?.masked_aadhar,
  //         maskedPan: res?.masked_pan_number,
  //       }));
  //       setDisplayModal("CONFIRM");
  //     } else {
  //       setDisplayFailedAddharModal(true);
  //     }
  //   } catch (e: any) {
  //     console.log(e);
  //     if (e?.response?.data?.message?.includes("Source down")) {
  //       setDisplayFailedAddharModal(true);
  //       setOpenDialog(true);
  //       return;
  //     }

  //     if (e?.response?.data?.detail?.includes("Token ")) {
  //       toast({
  //         variant: "warn",
  //         title: "",
  //         description: "Session Expired! Please relogin and try again. ",
  //       });
  //     }

  //     toast({
  //       variant: "warn",
  //       title: "",
  //       description: e?.response?.data?.message || e?.response?.data?.detail || "Something went wrong.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleVerifyPan = async (data) => {
    try {
      console.log("ENTER VERFIY PAN");
      setLoading(true);
      const res = await postVerifyPan({ pan_number: data.pan });
      console.log("VERIFY PAN", res);
      let address = res?.address;
      // if (displayFailedAddharModal) {
      //   setDisplayFailedAddharModal(false);
      // }
      if (!address) {
        setBillingSameAsAadhar(false);
      }
      if (res?.is_user_kyc) {
        setPanVerified(true);
        setUserDetails((prev) => ({
          ...prev,
          pan: res?.pan_number,
          name: res?.name,
          address: address,
          aadhar: res?.masked_aadhar,
          maskedPan: res?.masked_pan_number,
        }));
        setDisplayModal("CONFIRM");
      } else {
        setDisplayFailedAddharModal(true);
        setOpenDialog(true);
      }
    } catch (e: any) {
      console.log(e);
      if (e?.response?.data?.message?.includes("Source down")) {
        setDisplayFailedAddharModal(true);
        setOpenDialog(true);
        return;
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
      setLoading(false);
    }
  };

  const handleRazorpayScreen = (options: any) => {
    console.log("OPETIOS", options);
    let paymentFailed = false;
    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response: any) {
      if (!paymentFailed) {
        paymentFailed = true;
        alert(response.error.description);
        // Optionally, reset the flag after a certain time if needed
        setTimeout(() => {
          paymentFailed = false;
        }, 5000);
      }
    });
    paymentObject.open();
  };

  // const convertBlobToBase64 = (blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result.split(',')[1]); // Extract only the Base64 string
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsDataURL(blob);
  //   });
  // };
  const generatePdf = async (userDetailsForPdf) => {
    const blob = await pdf(<KamayakyaPDFDocument clientData={userDetailsForPdf} />).toBlob();
    const url = URL.createObjectURL(blob);

    // Open the URL in a new tab
    // window.open(url, "_blank");
    return blob;
  };

  const makePayment = () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: orderDetails.data.final_amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "KamayaKya", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderDetails.data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response: unknown) {
        router.push("/payments/successful");
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: userDetails.name, //your customer's name
        email: userDetails.email,
        contact: userDetails.phone?.slice(3), //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address:
          "Flat No 6, New Nirmal Apartments, Balkrishna Sakharam Dhole Patil Rd, near Akshay Complex Road, Pune, Maharashtra 411001",
      },
      theme: {
        color: "#0b3a36",
        backdrop_color: "#ea3546",
      },
    };
    handleRazorpayScreen(options);
  };

  useEffect(() => {
    const status = params.get("status");
  }, [params]);

  const handleDigio = async (orderId, userDetailsForPdf, orderDetails) => {
    try {
      const pdf = await generatePdf(userDetailsForPdf);
      const res = await getDigioIdandSendPdf({ order_id: orderId, user_agreement_pdf: pdf });
      // console.log("ORDER ID", orderId, orderDetails.data.order_id)
      sessionStorage.setItem(
        "razorpayData",
        JSON.stringify({
          name: userDetails.name,
          email: userDetails.email,
          phone: userDetails.phone,
          order_id: orderId,
          amount: orderDetails.data.final_amount,
        })
      );

      var options = {
        environment: process.env.NEXT_PUBLIC_DIGIO_ENVIRONMENT,
        is_iframe: false,
        redirect_url: `${window.location.origin}/payments/process`,
        is_redirection_approach: true,
        callback: function (response) {
          if (response.hasOwnProperty("error_code")) {
            return console.log("error occurred in process", response);
          }
          // downloadAndSendPDF();

          console.log("Signing;completed;successfully:", response);
        },
        logo: "https://i.ibb.co/ch7BwD5Z/kmk-logo-1.png",
        theme: {
          primaryColor: "#0b3a36",
          secondaryColor: "#000000",
        },
      };
      var digio = new window.Digio(options);
      digio.init();
      digio.submit(res?.id, res?.user_mobile, res?.access_token?.id);
      if (checkoutLoading) {
        setCheckoutLoading(false);
      }
    } catch (e) {
      console.log("ERORRO", e);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleCheckout: SubmitHandler<IFormInput> = async (data) => {
    // if (!aadharVerified && !isAadharAlreadyVerified && !isAadharVintage) {
    //   setError2("aadhar", { message: "Verify Aadhar to continue" });
    //   return;
    // }
    if (!userDetails.maskedPan && !isPanAlreadyVerified) {
      setError2("pan", { message: "Verify PAN to continue" });
      return;
    }
    if (!Number.isNaN(Number(data.address)) && !pincodeBasedAddress) {
      setError("address", { message: "Verify pincode to continue" });
      return;
    }
    setCheckoutLoading(true);
    try {
      let params: ParamsType = {
        base_amount: planDetails.totalPayable,
        subscription: currentPlan.planId,
        final_amount: planDetails.discount
          ? Number(planDetails.totalPayable) - Number(planDetails.discount)
          : planDetails.totalPayable,
        // tax_amount: planDetails.taxAmount,
        discount_code: planDetails.discountCode,
        // "discount_percentage":0,
        discount_amount: planDetails.discount,
        address: !pincodeBasedAddress && Number.isNaN(Number(data.address)) ? data.address : pincodeBasedAddress,
        name: data.fullname,
        user_email: data.email,
        user_contact: data.phone.slice(3),
      };
      if(pincodeBasedAddress){
        const [city, state, countryPincode] = pincodeBasedAddress.split(", ") //PINCODE ADDRESS FORMAT -> City, State, Country - Pincode 
        const [country,pincode] = countryPincode.split(" - ")
        params = {...params, 
        pincode,
        city,
        state,
        country
        }
      }
      if (data?.gstin) {
        params = { ...params, gst_number: data.gstin };
      }
      const res = await postCheckout(params);
      
      setPlanDetails((prev) => ({ ...prev, orderId: res.data.order_id }));
      sessionStorage.setItem("orderId", res.data.order_id);
      const userDetailsForPdf = await getUserDetailsForPdf(res.data.order_id, {
        start_date: planDates.start,
        end_date: planDates.end,
      });
      console.log("USER DETAILS", userDetailsForPdf);
      handleDigio(res.data.order_id, userDetailsForPdf, res);
      // handleRazorpayScreen(options);
    } catch (e) {
      setCheckoutLoading(false);
      console.error(e);
    } finally {
      // setCheckoutLoading(false);
    }
  };

  const handlePincode = async (pincode: string) => {
    try {
      setError("address", { message: "" });
      setCheckingPincode(true);
      const res = await getAddressFromPincode(pincode);
      if (res.verified) {
        setPincodeVerified(true);
        setPincodeBasedAddress(res.address as string);
      } else {
        toast({
          variant: "warn",
          description: "Invalid Pin Code. Please check and re-enter a valid Pin Code.",
        });
        // setPincodeVerified(false);
        // setPincodeBasedAddress(null);
      }
      // if (res?.results && res?.status === "OK") {
      //   if (Array.isArray(res?.results)) {
      //     setPincodeVerified(true);
      //     setPincodeBasedAddress(res?.results[0].formatted_address);
      //   }
      // } else {
      //   toast({
      //     variant: "warn",
      //     description: "Invalid Pin Code. Please check and re-enter a valid Pin Code.",
      //   });
      // }
    } catch (e) {
      console.error(e);
    } finally {
      setCheckingPincode(false);
    }
  };

  useEffect(() => {
    setValue("fullname", userDetails.name);
    setValue("phone", userDetails.phone);
    setValue("address", userDetails.address);
    setValue("pan", userDetails.maskedPan);
    setValue("email", userDetails.email);
    // setValue2("aadhar", userDetails.aadhar);
  }, [userDetails, activeTab]);

  // useEffect(() => {
  //   if (isAadharAlreadyVerified) {
  //     setValue2("aadhar", userDetails?.aadhar);
  //   }
  // }, [isAadharAlreadyVerified]);

  useEffect(() => {
    // if (errors.email || errors.address || errors.fullname || errors.phone || errors.pan) {
    //   if (!aadhar || !isValid) {
    //     setError2("aadhar", { message: "Enter Aadhar to continue" });
    //   } else {
    //     setError2("aadhar", { message: "" });
    //   }
    // }
    if (errors.email || errors.address || errors.fullname || errors.phone || errors.pan) {
      if (!pan || !isValid) {
        setError2("pan", { message: "Enter PAN to continue" });
      } else {
        setError2("pan", { message: "" });
      }
    }
  }, [errors]);

  useEffect(() => {
    // if (isAadharAlreadyVerified) {
    //   setBillingSameAsAadhar(false);
    // }
    if (isPanAlreadyVerified) {
      setBillingSameAsAadhar(false);
    }
  }, [isAadharAlreadyVerified, isPanAlreadyVerified]);

  useEffect(() => {
    if (!openDialog && displayFailedAddharModal) {
      setDisplayFailedAddharModal(false);
    }
  }, [openDialog]);



  return (
    <div className="mt-9">
      <Dialog onOpenChange={setOpenDialog} open={openDialog}>
        <GoBackButton setActiveTab={setActiveTab} />
        {/* {isAadharAlreadyVerified && isAadharVintage ? null : <KycPrivacyNotice />} */}
        {isPanAlreadyVerified ? null : <KycPrivacyNotice />}

        <div className="grid grid-cols-2 gap-y-4 sm:gap-y-7 gap-x-[22px]">
          {/* <AadharInput
            isAadharAlreadyVerified={isAadharAlreadyVerified}
            isAadharVintage={isAadharVintage}
            aadharOtpLoading={aadharOtpLoading}
            aadharVerified={aadharVerified}
            control2={control2}
            errors2={errors2}
            handleAadharOtp={handleAadharOtp}
            handleSubmit2={handleSubmit2}
          /> */}

          {
            // userDetails?.name && isAadharVintage
            userDetails?.name || isPanAlreadyVerified ? (
              <div className="col-span-2">
                <p className="text-xs text-gray-500">
                  Full Name<span className="text-error-500">*</span>
                </p>
                <Controller
                  name="fullname"
                  control={control}
                  rules={{
                    required: "Enter Name to continue",
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
                        // readOnly: (aadharVerified || isAadharAlreadyVerified) && isAadharVintage,
                        // className: (aadharVerified || isAadharAlreadyVerified) && isAadharVintage ? "bg-[#F4F7FA99]" : "",
                        readOnly: isPanAlreadyVerified || panVerified,
                        className: isPanAlreadyVerified || panVerified ? "bg-[#F4F7FA99]" : "",

                        endAdornment: (
                          <InputAdornment position="end">
                            {/* {userDetails.name && (isAadharAlreadyVerified || aadharVerified) ? <VerifyTag /> : null} */}
                            {userDetails.name && isPanAlreadyVerified ? <VerifyTag /> : null}
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
                      className="!mt-[6px] "
                    />
                  )}
                />
                {/* <p className="text-3xs text-gray-500 mt-[6px]">
            Mandatory as per SEBI rules (OTP will be sent to the mobile no. linked to your Aadhar Card)
          </p> */}
              </div>
            ) : null
          }
          <PanInput
            userDetails={userDetails}
            isPanAlreadyVerified={isPanAlreadyVerified}
            control2={control2}
            handleSubmit2={handleSubmit2}
            handleVerifyPan={handleVerifyPan}
            loading={loading}
          />

          {
            // (aadharVerified || userDetails.address)
            (panVerified || userDetails.address || (isPanAlreadyVerified && !userDetails.address)) && (
              <div className="col-span-2">
                <div>
                  <p className="text-xs text-gray-500">
                    Billing Address<span className="text-error-500">*</span>
                  </p>
                  <Controller
                    name="address"
                    control={control}
                    rules={{
                      required: "Enter address to continue",
                      minLength: {
                        value: 3,
                        message: "Enter valid address",
                      },
                      pattern: {
                        value:
                          // (billingSameAsAadhar && !isAadharAlreadyVerified) ||
                          (billingSameAsAadhar && !isPanAlreadyVerified) ||
                          (isPanAlreadyVerified && preExistingAddress === userDetails.address)
                            ? // (isAadharAlreadyVerified && preExistingAddress === userDetails.address)
                              /^[\s\S]*$/
                            : /^\d{6}$/,
                        message: "Enter a valid pincode.",
                      },
                    }}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        id="address"
                        error={errors.address?.message ? true : false}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace") {
                            if (Number.isNaN(Number(field.value))) {
                              setValue("address", "");
                              setBillingSameAsAadhar(false);
                            }
                            setPincodeVerified(false);
                            setPincodeBasedAddress("");
                          }
                        }}
                        placeholder="Enter Pincode"
                        confirmAddress={pincodeBasedAddress ? true : false}
                        type={
                          // (billingSameAsAadhar && !isAadharAlreadyVerified) ||
                          (billingSameAsAadhar && !isPanAlreadyVerified) ||
                          (isPanAlreadyVerified && field.value === userDetails.address)
                            ? // (isAadharAlreadyVerified && field.value === userDetails.address)
                              "text"
                            : "number"
                        }
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          // readOnly: billingSameAsAadhar && !isAadharAlreadyVerified ? true : false,
                          // className: (billingSameAsAadhar && !isAadharAlreadyVerified ? true : false)
                          //   ? "bg-[#F4F7FA99]"
                          //   : "",
                          readOnly: billingSameAsAadhar && !isPanAlreadyVerified ? true : false,
                          className: (billingSameAsAadhar && !isPanAlreadyVerified ? true : false)
                            ? "bg-[#F4F7FA99]"
                            : "",
                          endAdornment: (
                            <InputAdornment position="end">
                              {
                                // (billingSameAsAadhar && !isAadharAlreadyVerified) ||
                                // (isAadharAlreadyVerified && field.value === userDetails.address)
                                (billingSameAsAadhar && !isPanAlreadyVerified) ||
                                (isPanAlreadyVerified && field.value === userDetails.address) ? null : (
                                  <>
                                    {errors.address?.message && (
                                      <Tooltip
                                        tooltipContent={<p className=" text-2xs">{errors.address?.message}</p>}
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
                                    <button
                                      disabled={checkingPincode || (pincodeBasedAddress ? true : false)}
                                      className=" ml-[10px] "
                                      onClick={() => {
                                        if (!/^\d{6}$/.test(field.value)) {
                                          setError("address", { message: "Enter valid pincode to continue." });
                                          return;
                                        }
                                        handlePincode(field.value);
                                        // setOpenDialog(true);
                                      }}
                                    >
                                      {pincodeBasedAddress && !errors.address?.message ? (
                                        <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon" />
                                      ) : checkingPincode ? (
                                        <span className=" inline-flex items-center justify-center gap-x-1">
                                          <Loader color="#12B76A" fontSize={12} height={12} width={12} />
                                          <p className=" text-2xs text-[#12B76A]">Checking</p>
                                        </span>
                                      ) : (
                                        <p className=" text-2xs text-brand-500 border-b border-dashed border-b-brand-500">
                                          Check
                                        </p>
                                      )}
                                    </button>
                                  </>
                                )
                              }
                            </InputAdornment>
                          ),
                        }}
                        className={`!mt-[6px]  ${
                          pincodeBasedAddress ? " [&>.fieldset]:!rounded-t-lg pb-0" : " !rounded-[6.2px]"
                        }    !border-[#0000000F]`}
                      />
                    )}
                  />
                  {pincodeBasedAddress && !billingSameAsAadhar && (
                    <div
                      id="pincode-address"
                      className="  text-sm py-[9px] px-[11px] rounded-b-lg border border-[#0000000F] bg-[#F9FAFC]"
                    >
                      {pincodeBasedAddress}
                    </div>
                  )}

                  {
                    // !isAadharAlreadyVerified
                    panVerified && userDetails.address ? (
                      <div className=" flex items-center gap-x-2 mt-3">
                        <Checkbox
                          checked={billingSameAsAadhar}
                          onCheckedChange={(checked) => {
                            if (!checked) {
                              setValue("address", "");
                            } else {
                              setError("address", { message: "" });
                              setPincodeVerified(false);
                              setPincodeBasedAddress("");
                            }
                            setValue("address", userDetails?.address);

                            setBillingSameAsAadhar(checked as boolean);
                          }}
                          id="billingAadharAddress"
                        />

                        <p className=" text-sm text-[#475467]">Billing address is the same as PAN address</p>
                      </div>
                    ) : null
                  }
                </div>
              </div>
            )
          }

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
                        </InputAdornment>
                      ),
                    }}
                    className="!mt-[6px]"
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
                className={`  w-full !mt-[6px] flex items-center border hover:border-black ${
                  phoneFocused ? " border-[1px] hover:border-[#00645A] border-[#00645A] border-collapse" : ""
                }  ${
                  errors.phone?.message ? "border-[#FDA29B]" : "border-[#0000000F]"
                }  rounded-[6.2px] py-[9px] px-[14px] pr-[11px] flex items-center "
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
                  }}
                  render={({ field: { value, onChange } }) => (
                    <>
                      {" "}
                      <PhoneInput
                        onFocus={() => setPhoneFocused(true)}
                        onBlur={() => setPhoneFocused(false)}
                        value={value}
                        onChange={onChange}
                        defaultCountry="IN"
                        placeholder="Enter phone number"
                        className=" border-green-400 text-sm"
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

          <div className="col-span-2 mt-5 ">
            {/* <p className=" text-display-sm text-red-500 flex-1">{(!aadharVerified && !isAadharAlreadyVerified) || email?.length === 0 || mobile?.length === 0 || (!Number.isNaN(Number(address)) && !pincodeBasedAddress) ? "true": "false"}</p> */}
            <Button
              disabled={
                // (!aadharVerified && !isAadharAlreadyVerified && !isAadharVintage) ||
                // email?.length === 0 ||
                // mobile?.length === 0 ||
                // (!Number.isNaN(Number(address)) && !pincodeBasedAddress) ||
                // (!isPanAlreadyVerified && !userDetails.maskedPan)
                email?.length === 0 ||
                mobile?.length === 0 ||
                (!Number.isNaN(Number(address)) && !pincodeBasedAddress) ||
                (!isPanAlreadyVerified && !userDetails.maskedPan) ||
                (isPanAlreadyVerified && !userDetails.address && !pincodeBasedAddress)
              }
              loading={checkoutLoading}
              onClick={handleSubmit(handleCheckout)}
              className=" w-full"
              variant={ButtonVariant.primary}
            >
              <p className=" text-sm font-medium">Sign Agreement & Checkout</p>
            </Button>
          </div>
        </div>
        {/* {displayModal.includes("AADHAR") && !displayFailedAddharModal ? (
          <AadhaVerifyModal
            setAadharRequestId={setAadharRequestId}
            setOpenDialog={setOpenDialog}
            setDisplayModal={setDisplayModal}
            displayModal={displayModal}
            openDialog={openDialog}
            aadhar={aadhar}
            requestId={aadharRequestId}
            setBillingSameAsAadhar={setBillingSameAsAadhar}
            setDisplayFailedAddharModal={setDisplayFailedAddharModal}
          />
        ) : null}
        {displayModal.includes("CONFIRM") && !displayFailedAddharModal ? (
          <ConfirmDetailsModal
            setDisplayModal={setDisplayModal}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        ) : null} */}
        {displayFailedAddharModal ? (
          <DialogContent
            closeClassName=" -right-2 -top-[12px] opacity-100"
            className=" !p-6 !rounded-[20px] w-[calc(100%-32px)]  md:min-w-[400px] max-w-[400px] open_sans"
          >
            <div>
              <img src="/assets/failed_aadhar_fetch.svg" alt="error-image" />
              <h2 className=" font-bold text-xl mt-6">We’re having trouble fetching your PAN details!</h2>
              <p className=" text-sm text-[#737373] mt-3">
                Oops! 🚧
                <br />
                Our system’s having a coffee break while fetching PAN details. Please try again a few times or check
                back in 15-20 minutes. Thanks for understanding and for being awesome!
              </p>
              <div className=" flex  items-center gap-x-[10px] mt-6 ml-auto w-fit">
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      setDisplayFailedAddharModal(false);
                    }}
                    variant={ButtonVariant.tertiary}
                  >
                    Close
                  </Button>
                </DialogClose>
                <Button
                  loading={loading}
                  onClick={async () => {
                    handleVerifyPan({ pan });
                    // if (isAadharAlreadyVerified || aadharVerified) {
                    //   handleVerifyAadharOtp();
                    // } else {
                    //   await handleAadharOtp({ aadhar });
                    // }
                    // setDisplayFailedAddharModal(false);
                    // handleAadharOtp({ aadhar });
                  }}
                  variant={ButtonVariant.primary}
                >
                  Try again
                </Button>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
}

{
  /* || isAadharAlreadyVerified */
}
{
  /* || userDetails.address */
}
{
  /* {(aadharVerified || userDetails.address) && (
            <div className="col-span-2">
              <p className="text-xs text-gray-500">
                Billing Address<span className="text-error-500">*</span>
              </p>
              <Controller
                name="address"
                control={control}
                rules={{
                  required: "Enter address to continue",
                }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    id="address"
                    type="text"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      className: (userDetails.address ? true : false) ? "bg-[#F4F7FA99]" : "",
                      endAdornment: <InputAdornment position="end"></InputAdornment>,
                    }}
                    className="!mt-[6px]  !py-[9px] !pr-[6px] !rounded-[6.2px] !border-[#0000000F]"
                  />
                )}
              />
            </div>
          )} */
}

//GSTIN

{
  /* <div className="col-span-2 flex space-x-2 items-center">
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
          )} */
}
