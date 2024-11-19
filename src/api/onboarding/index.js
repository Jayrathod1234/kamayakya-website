import { axiosApi } from "../../utils/axios";
import axios from "axios";

export const getLoginOtp = async (params) => {
  try {
    const URL = `/master/userOtpSend/`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(URL, params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};


export const verifyLoginOtp = async (params) => {
  try {
    const URL = `/master/userOtpVerify/`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(URL, params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

export const getEmailPhoneOtp = async (params) => {
  try {
    const URL = `/master/userOnboardOtpSend/`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(URL, params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};


export const verifyEmailPhoneOtp = async (params) => {
  try {
    const URL = `/master/userOnboardOtpVerify/`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(URL, params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};