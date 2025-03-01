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
          2021: [
            {
              id: "55ada006-c9b4-415d-ba4a-f6f5f2bc2d76",
              year: 2021,
              quarter: "Q1",
              pdf: "test_pdf",
              video_link: "youtube.com",
              created: "2025-02-07T08:59:34.692213Z",
            },
            {
              id: "4e62fcb9-05ce-428b-878c-628302a64d09",
              year: 2021,
              quarter: "Q2",
              pdf: "test_pdf",
              video_link: "youtube.com",
              created: "2025-02-07T08:59:39.391308Z",
            },
            {
              id: "17173792-22f9-41eb-be30-bb478d992a47",
              year: 2021,
              quarter: "Q3",
              pdf: "test_pdf",
              video_link: "youtube.com",
              created: "2025-02-07T09:01:27.135739Z",
            },
            {
              id: "a28b42f3-d16e-481d-9914-fe0cdeae13ea",
              year: 2021,
              quarter: "Q4",
              pdf: "test_pdf",
              video_link: "youtube.com",
              created: "2025-02-07T09:01:31.013483Z",
            },
          ],
          2020: [
            {
              id: "c9e61953-5b84-486a-b8db-a4010c4ff01e",
              year: 2020,
              quarter: "Q2",
              pdf: "test_pdf",
              video_link: "youtube.com",
              created: "2025-02-07T05:25:14.540079Z",
            },
            {
              id: "19abac22-684a-40ae-a541-a8588658d23e",
              year: 2020,
              quarter: "Q3",
              pdf: "test_pdf",
              video_link: "youtube.com",
              created: "2025-02-07T05:39:43.856536Z",
            },
            {
              id: "78838b38-740b-46fb-99f3-0b923a046ddd",
              year: 2020,
              quarter: "Q4",
              pdf: "test_pdf",
              video_link: "google2.com",
              created: "2025-02-07T05:39:49.935108Z",
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
