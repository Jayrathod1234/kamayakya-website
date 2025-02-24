import { axiosApi } from "../../utils/axios";

export const getQuarterlyUpdates = async (pagination) => {
  try {
    const URL = `/user/quarterlyVipUpdates?limit=${pagination.pageSize}&page=${pagination.pageIndex}`;
    const response = await axiosApi.get(URL);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};
