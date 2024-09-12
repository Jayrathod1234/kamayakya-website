import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getNewsListApi } from "@/api/stock-picks";
import { formatDistanceToNow } from "date-fns";
const StockDetailsNews = ({ stock_name }) => {
  const {
    data: response,
    isLoading,
    error,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["newsList"],
    queryFn: ({ pageParam = 1 }) =>
      getNewsListApi({
        page: pageParam,
        limit: 10,
        stock_name,
      }),
    getNextPageParam: (data) => {
      // console.log("===getNextPageParam====", data);
      const { meta } = data;
      // Function to determine the parameter for fetching the next page
      if (meta.found / meta.limit > meta.page) return meta.page + 1 ?? false; // Return the nextPage parameter if available, otherwise false
    },
  });
  // const [news,setNews] = useState()
  // const items = response?.pages?.flatMap((page) => page) ?? [];
  const items = response?.pages?.flatMap((page) => page.data);
  // console.log(items,response)
  const newsItems = [
    {
      id: 1,
      image: "/assets/image1.png",
      title: "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
      source: "The Hindu Businessline",
      time: "4 hours ago",
      link: "/news/vidhi-specialty-food-approval",
    },
    {
      id: 2,
      image: "/assets/image1.png",
      title: "Another News Item Title",
      source: "The Times of India",
      time: "2 hours ago",
      link: "/news/another-news-item",
    },
    {
      id: 3,
      image: "/assets/image1.png",
      title: "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
      source: "The Hindu Businessline",
      time: "4 hours ago",
      link: "/news/vidhi-specialty-food-approval",
    },
    {
      id: 4,
      image: "/assets/image1.png",
      title: "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
      source: "The Hindu Businessline",
      time: "4 hours ago",
      link: "/news/vidhi-specialty-food-approval",
    },
    {
      id: 5,
      image: "/assets/image1.png",
      title: "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
      source: "The Hindu Businessline",
      time: "4 hours ago",
      link: "/news/vidhi-specialty-food-approval",
    },
    {
      id: 6,
      image: "/assets/image1.png",
      title: "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
      source: "The Hindu Businessline",
      time: "4 hours ago",
      link: "/news/vidhi-specialty-food-approval",
    },
  ];

  if (!items || items?.length === 0) {
    return (
      <div className=" pt-3 ">
        <div className=" py-6 md:py-[72px] flex flex-col items-center justify-center bg-white rounded-[10px]">
          <img width={102} height={90} className=" w-full h-full max-w-[102px] max-h-[90px]" src="/assets/no_news.svg"/>
          <p className=" text-2xs text-gray-600 text-center max-w-[188px]">Recent news are not available for this stock.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:pt-[12px] pt-[0px]  ">
        {items?.map((item, index) => (
          <a key={index} target="_blank" href={item?.url} className="block  group">
            <div className="flex flex-row md:flex-row items-start md:items-center gap-4 py-4 px-1 rounded-md  cursor-pointer group-hover:bg-white transition">
              {/* <!-- Image Section --> */}
              <div className="flex-shrink-0">
                <img
                  src={item?.image_url}
                  alt={item.title}
                  className="w-[80px] h-[60px] md:w-[80px] md:h-[60px] object-cover rounded-md"
                />
              </div>

              {/* <!-- Content Section --> */}
              <div className="flex-1 font-open_sans">
                <div className="flex flex-col gap-1">
                  {/* <!-- Title --> */}
                  <p className="text-2xs sm:text-sm font-medium text-gray-800 line-clamp-2 font-open_sans">
                    {item.title}
                  </p>
                  {/* <!-- Meta Info --> */}
                  <div className="flex items-center gap-2 text-2xs sm:text-2xs md:text-2xs text-gray-500 text-nowrap">
                    <span>{item.source}</span>
                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    <span>
                      {formatDistanceToNow(new Date(item.published_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* <!-- Arrow/Action Icon --> */}
              <div className="flex items-center justify-end md:flex group pt-5 sm:pt-0">
                <img src="/assets/share1.svg" alt="" className="block group-hover:hidden" />
                <img src="/assets/share3.svg" alt="" className="hidden group-hover:block" />
              </div>
            </div>
          </a>
        ))}
      </div>
      <div
        onClick={fetchNextPage}
        className="flex text-lg flex-row md:flex-row items-start md:items-center justify-center gap-4 px-4 py-3 border  bg-white  cursor-pointer hover:bg-gray-50 transition text-[#125B54] "
      >
        <p className="font-open_sans text-sm font-semibold">Load more</p>
      </div>
    </div>
  );
};

export default StockDetailsNews;
