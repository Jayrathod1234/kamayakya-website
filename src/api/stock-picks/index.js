import { axiosApi } from "../../utils/axios";
import {
  getLatestReleasesStockResponse,
  getStrategyTagResponse,
  getHotStockResponse,
  getAllBoardStockStockResponse,
} from "./static-response";

// Latest Releases Stock List API
export const getHotStockListApi = async ({ isLoggedIn, type }) => {
  try {
    if (process.env.NEXT_PUBLIC_DEBUG) {
      const URL = isLoggedIn ? `/user/hotStock` : `/user/hotStock/guest`;
      /* ----------------------------------- API ---------------------------------- */
      const response = await axiosApi.get(URL, {
        params: {
          type,
        },
      });
      return response.data;
    } else {
      /* ----------------------------- Static Data ---------------------------- */
      return getHotStockResponse;
    }
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

// Latest Releases Stock List API
export const getLatestReleasesStockListApi = async ({ isLoggedIn, type }) => {
  try {
    if (process.env.NEXT_PUBLIC_DEBUG) {
      const URL = isLoggedIn
        ? `/user/latestRelease`
        : `/user/latestRelease/guest`;
      /* ----------------------------------- API ---------------------------------- */
      const response = await axiosApi.get(URL, {
        params: {
          type,
        },
      });
      return response.data.data;
    } else {
      /* ----------------------------- Static Data ---------------------------- */
      return getLatestReleasesStockResponse;
    }
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

// Strategy Tags API
export const getStrategyTagListApi = async () => {
  try {
    if (process.env.NEXT_PUBLIC_DEBUG) {
      /* ----------------------------------- API ---------------------------------- */
      const response = await axiosApi.get(`/user/strategyTags/`);
      return response.data.data;
    } else {
      /* ----------------------------- Static Data ---------------------------- */
      return getStrategyTagResponse;
    }
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

// All Board Stock Stock List API
export const getAllBoardStockStockListApi = async ({ params, body }) => {
  const { isLoggedIn, type, page, limit } = params;
  const { search } = body;
  try {
    if (process.env.NEXT_PUBLIC_DEBUG) {
      const URL = isLoggedIn ? `/user/allStocks` : `/user/allStocks/guest`;
      /* ----------------------------------- API ---------------------------------- */
      const response = await axiosApi.post(
        `${URL}?type=${type}&page=${page}&limit=${limit}`,
        { search }
      );
      return response.data;
    } else {
      //   /* ----------------------------- Static Data ---------------------------- */
      return getAllBoardStockStockResponse;
    }
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};
