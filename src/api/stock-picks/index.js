import { axiosApi } from "../../utils/axios";
import axios from "axios";

import {
  getLatestReleasesStockResponse,
  getStrategyTagResponse,
  getHotStockResponse,
  getAllBoardStockStockResponse,
  getCommonDetailsResponse,
  getStockDetailResponse,
  getStockNewsResponse,
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
export const getStrategyTagListApi = async ({ type }) => {
  try {
    if (process.env.NEXT_PUBLIC_DEBUG) {
      /* ----------------------------------- API ---------------------------------- */
      const response = await axiosApi.get(`/user/strategyTags`, {
        params: {
          type,
        },
      });
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
  let {
    search,
    sort_by,
    sort_value,
    recency_time,
    time_left_with_time,
    upside_left_range,
    total_returns_with_range,
    market_cap_type,
    risk,
    sector,
    strategy_tags,
  } = body;

  const changablestrategyTags = [...strategy_tags];

  /** if most-recent chip clickable */
  if (changablestrategyTags.includes("most-recent")) {
    const index = changablestrategyTags.indexOf("most-recent");

    if (index > -1) {
      changablestrategyTags.splice(index, 1); // Modify the copy, not the original array
    }

    /** set recency desc */
    sort_by = "recency";
    sort_value = "desc";
  }
  try {
    if (process.env.NEXT_PUBLIC_DEBUG) {
      const URL = isLoggedIn ? `/user/allStocks` : `/user/allStocks/guest`;
      /* ----------------------------------- API ---------------------------------- */
      const response = await axiosApi.post(
        `${URL}?type=${type}&page=${page}&limit=${limit}`,
        {
          search,
          sort_by,
          sort_value,
          recency_time,
          time_left_with_time,
          upside_left_range,
          total_returns_with_range,
          market_cap_type,
          risk,
          sector,
          strategy_tags: changablestrategyTags,
        }
      );
      console.log(response.data)
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

export const getCommonDetailsApi = async () => {
  try {
    if (process.env.NEXT_PUBLIC_DEBUG) {
      const URL = `/user/commonDetails/`;
      /* ----------------------------------- API ---------------------------------- */
      const response = await axiosApi.get(URL);
      return response.data.data;
    } else {
      //   /* ----------------------------- Static Data ---------------------------- */
      return getCommonDetailsResponse;
    }
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

export const getStockDetailApi = async ({ stockId }) => {
  try {
    if (process.env.NEXT_PUBLIC_DEBUG) {
      const URL = `/user/stockDetail/${stockId}`;
      /* ----------------------------------- API ---------------------------------- */
      const response = await axiosApi.get(URL);
      return response.data.data;
    } else {
      //   /* ----------------------------- Static Data ---------------------------- */
      return getStockDetailResponse;
    }
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

export const getNewsListApi = async ({ stock_name, limit, cursor,page }) => {
  try {
    // const response = await axios.get(
    //   `https://google-news-api1.p.rapidapi.com/search?language=EN&q=${stock_name}&limit=${limit}`,
    //   {
    //     headers: {
    //       "x-rapidapi-key":
    //         "433c182a9amsh51c623dae1a6153p12b3e4jsn0c44e96f58e7",
    //       "x-rapidapi-host": "google-news-api1.p.rapidapi.com",
    //     },

    //   }
    // );
    // console.log(response.data.news);
    // return response.data.news;
    const response = await axios.get(`https://api.marketaux.com/v1/news/all?search="${stock_name}"&language=en&page=${page}&api_token=${process.env.NEXT_MARKET_AUX_TOKEN}`)
    console.log(response);

    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};
