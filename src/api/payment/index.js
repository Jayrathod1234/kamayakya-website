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

export const getBillingDetails = async (params) => {
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
};

export const getAadharOtp = async (params) => {
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
};

export const postAadharOtp = async (params) => {
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
};

export const postVerifyPan = async (params) => {
  try {
    //     return {
    //     "message": "Pancard verified successfully",
    //     "status_code": 200,
    //     "address": "some address",
    //     "name": "ANURAG ",
    //     "mobile": "+911234567890",
    //     "email": "anurag.micra@gmail.com",
    //     "pan_number": "ABCD1234F",
    //     "masked_pan_number": "XXXXXX234F",
    //     "masked_aadhar": "XXXXXXXX2411",
    //     "is_user_kyc": true
    // }
    const URL = `/user/userPanKyc/`;
    const response = await axiosApi.post(URL, params);

    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

export const getUserKycStatus = async () => {
  try {
    // https://test-server.kamayakya.in/user/userKycStatusVerify/
    // const URL = `/user/checkUserKycStatus`;
    const URL = `/user/userKycStatusVerify/`;
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
};

export const postCheckout = async (params) => {
  try {
    const URL = `/user/createOrder?type=razorpay`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(URL, params);

    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

export const verifyCoupon = async (params) => {
  try {
    const URL = `/user/verifyDiscountCode`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(URL, params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

export const getPaymentReceipt = async (params) => {
  try {
    const URL = `/user/generateReceipt`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(URL, params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

// export const getAddress = async(params)=>{
//   try {
//     const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${params}&key=${process.env.NEXT_PUBLIC_GEOCODING_KEY}`;
//     /* ----------------------------------- API ---------------------------------- */
//     const response = await axios.get(URL);
//     return response.data;
//   } catch (error) {
//     // Handle errors if any
//     console.error("Error fetching:", error);
//     throw error;
//   }
// }

export const getAddressFromPincode = async (pincode) => {
  try {
    const URL = `https://api.postalpincode.in/pincode/${pincode}`;
    const response = await axios.get(URL);
    const data = response.data;
    if (data?.error) {
      return { verified: false, address: null };
    }
    if (Array.isArray(data) && data[0]?.Status === "Success") {
      const postOffices = data[0]?.PostOffice;
      if (Array.isArray(postOffices) && postOffices.length > 0) {
        // You can pick the first one or return all addresses if needed
        // const address = data?.data;
        const address = postOffices[0];
        const formatted = `${address.Name}, ${address.Block}, ${address.District}, ${address.State}, ${address.Country} - ${address.Pincode}`;
        // const formatted = `${address.taluk}, ${address.district_name}, ${address.state_name} - ${address.pincode}`;
        return {
          verified: true,
          address: formatted,
        };
      }
    }

    // return { verified: false, address: null };
  } catch (error) {
    console.error("Error fetching address:", error);
    return { verified: false, address: null };
  }
};

export const getTrackRecordStats = async (params) => {
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
};

export const getUserDetailsForPdf = async (orderId, params) => {
  try {
    const URL = `/user/userDetailsForESignAgreement?order_id=${orderId}`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(URL, params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

export const getDigioIdandSendPdf = async (params) => {
  try {
    const URL = `/user/digioRequestSignApi`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.postForm(URL, params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

export const getRazorpayPayload = async (params) => {
  try {
    const URL = `/user/userDetails/`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.get(URL + params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};
