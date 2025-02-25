import { axiosApi } from "../utils/axios";

export const getStockUpdates = async ({ page, limit, stock_id, type }) => {
  try {
    const URL = `/user/kamayaKyaUpdates?stock_id=${stock_id}&type=${type}`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.get(URL);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};
