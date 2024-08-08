import { axiosApi } from "../../utils/axios";

// Strategy Tags API
export const getStrategyTagListApi = async () => {
  const response = await axiosApi.get(`/user/strategyTags/`);
  return response.data.data;
};
