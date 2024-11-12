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
    /* ----------------------------------- API ---------------------------------- */
    // return {pan_number:'', address:'Maharashtra, 401203',name:'Sahil Padvi'}
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