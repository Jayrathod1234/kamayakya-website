import { LANDING_REPORTS_URL } from "@/pages/api/URLs";
import { axiosApi } from "../utils/axios";

export const getStockUpdates = async ({ page, limit, stock_id, type }) => {
  try {
    const URL = `/user/kamayaKyaUpdates?stock_id=${stock_id}&type=${type}&page=${page}&limit=${limit}`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.get(URL);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

export const getStockReports = async (params) => {
  try {
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.post(LANDING_REPORTS_URL,params);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

