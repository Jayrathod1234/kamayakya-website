import { axiosApi } from "../../utils/axios";

export const getTrackRecordDashboard = async () => {
  try {
    const URL = '/user/trackRecordDashboard/';
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.get(URL);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

export const getAllTrackRecordStockListApi = async ({ params, body }) => {
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
    action,
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
    const URL = `/user/trackRecord/allStocks`
    // isLoggedIn ? `/user/allStocks` : `/user/allStocks/guest`;
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
        action
      }
    );
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};


export const getTrackDetailApi = async ({ stockId }) => {
  try {
    const URL = `/user/detailedView/${stockId}`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.get(URL);
    return response.data.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};

export const getBseLivePrice = async(sebiBoardType)=>{
  try {
    const URL = `/user/bseStocksLivePrice?type=${sebiBoardType}`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.get(URL);
    // console.log(response)
    return response.data.bse_stocks_live_price_data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
}

export const getNseLivePrice = async(sebiBoardType)=>{
  try {
    const URL = `/user/nseStocksLivePrice?type=${sebiBoardType}`;
    /* ----------------------------------- API ---------------------------------- */
    const response = await axiosApi.get(URL);
    // console.log(response)
    return response.data.nse_stocks_live_price_data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
}