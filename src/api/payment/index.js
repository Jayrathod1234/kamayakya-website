import { axiosApi } from "../../utils/axios";
import axios from "axios";

// Latest Releases Stock List API
export const getSelectedPlanDates = async (params) => {
  try {
    const URL = `/user/fetchPlanDuration`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(URL, params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

export const getBillingDetails = async (params)=>{
  try {
    const URL = `/user/plan_price/`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(URL, params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
}

export const getAadharOtp = async (params)=>{
  try {
    const URL = `/user/sendOtpForAadhar`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(URL, params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
}

export const postAadharOtp = async (params)=>{
  try {
    const URL = `/user/verifyOtpForAadhar`;
  //   return {
  //     "message": "Aadhar verified successfully",
  //     "status_code": 200,
  //     "address": "Surat City, Surat, Gujarat, India, 395006",
  //     "name": "Dobariya Anurag",
  //     "mobile": "",
  //     "email": "",
  //     // "pan_number": "",
  //     // "masked_pan_number": "",
  //     "masked_aadhar": "XXXXXXXX1111",
  //     "encrypted_aadhar": "47PoY+AlUvhwO3W2uxr3Fw==",
  //     "aadhar_mobile": "9313645441",
  //     "aadhar_email": null,
  //     "is_aadhar_verified": true,
  //     "is_pan_verified": false,
  //     "is_aadhar_vintage": true,
  //     "errors": {}
  // }
    const response = await axiosApi.post(URL, params);
 
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
}

export const getUserKycStatus = async()=>{
  try {
    const URL = `/user/checkUserKycStatus`;
  //   return {
  //     "message": "User KYC is pending.",
  //     "status_code": 200,
  //     "name": "Sahil Krishna Padvi",
  //     "email": "sahilanime06@gmail.com",
  //     "mobile": "+918007152481",
  //     "is_aadhar_verified": true,
  //     "is_aadhar_vintage": false,
  //     "is_pan_verified": false
  // }
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.get(URL);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
}

export const postCheckout = async(params)=>{
  try {
    const URL = `/user/createOrder?type=razorpay`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(URL,params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
}

export const verifyCoupon = async(params)=>{
  try {
    const URL = `/user/verifyDiscountCode`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(URL,params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
}

export const getPaymentReceipt = async(params)=>{
  try {
    const URL = `/user/generateReceipt`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(URL,params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
}

export const getAddress = async(params)=>{
  try {
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${params}&key=${process.env.NEXT_PUBLIC_GEOCODING_KEY}`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
}

export const getTrackRecordStats =  async(params)=>{
  try {
    const URL = `/user/stockDataInPayment/`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.get(URL);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
}

export const getUserDetailsForPdf =  async(orderId,params)=>{
  try {
    const URL = `/user/userDetailsForESignAgreement?order_id=${orderId}`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(URL,params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
}


export const getDigioIdandSendPdf = async (params)=>{
  try {
    const URL = `/user/digioRequestSignApi`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.postForm(URL,params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
}