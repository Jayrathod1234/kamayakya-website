import { axiosApi } from "../../utils/axios";

export const getUserProfileOtp = async (params) => {
  try {
    const URL = `/user/userProfileOtpSend/`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(URL, params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

export const getUserProfilePaymentHistory = async (params) => {
  try {
    const URL = `/user/userProfilePaymentHistory/`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.get(URL);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};


export const verifyUserProfileOtp = async (params) => {
  try {
    const URL = `/user/userProfileOtpVerify/`;
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