import { axiosApi } from "../../utils/axios";

export const getQuarterlyUpdates = async (pagination, isLoggedIn,plan) => {
  try {
    if (!isLoggedIn || plan!== "vip") {
      return {
        pagination:{
          hasNext:false,
          hasPrevious:false,
        },
        data: {
          2022: [
            {
              id: "8e0f2546-0f4c-44c6-82af-d8cdef744ece",
              year: 2022,
              quarter: "Q1",
              pdf: "test_pdf",
              video_link: "youtube.com1",
              created: "2025-02-07T08:59:50.909314Z",
            },
            {
              id: "f80ab73a-9c11-4516-8e9f-78b3ed90a0da",
              year: 2022,
              quarter: "Q2",
              pdf: "test_pdf",
              video_link: "youtube.com",
              created: "2025-02-07T09:01:01.607981Z",
            },
            {
              id: "d8ab92f2-bc4d-4ef8-8ab8-5081cd941695",
              year: 2022,
              quarter: "Q3",
              pdf: "test_pdf",
              video_link: "youtube.com",
              created: "2025-02-17T08:48:16.181955Z",
            },
          ],
          
        },
      };
    }
    const URL = `/user/quarterlyVipUpdates?limit=${pagination.pageSize}&page=${pagination.pageIndex}`;
    const response = await axiosApi.get(URL);
    return response.data;
  } catch (error) {
    // Handle errors if any
    console.error("Error fetching:", error);
    throw error;
  }
};
