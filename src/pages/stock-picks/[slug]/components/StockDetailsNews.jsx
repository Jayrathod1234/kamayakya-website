import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getNewsListApi } from "@/api/stock-picks";
const StockDetailsNews = ({ stock_name }) => {
  // const {
  //   data: response,
  //   isLoading,
  //   error,
  //   fetchNextPage,
  //   refetch,
  // } = useInfiniteQuery({
  //   queryKey: ["newsList"],
  //   queryFn: ({ pageParam = 1 }) =>
  //     getNewsListApi({
  //       page: pageParam,
  //       limit: 10,
  //       stock_name,
  //     }),
  //   getNextPageParam: (data) => {
  //     console.log("===getNextPageParam====", data);
  //     // Function to determine the parameter for fetching the next page
  //     //   if (total_pages > current_page) return current_page + 1 ?? false; // Return the nextPage parameter if available, otherwise false
  //   },
  // });

  // console.log("================response================", response);

  const newsItems = [
    {
      id: 1,
      image: "/assets/image1.png",
      title:
        "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
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
      title:
        "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
      source: "The Hindu Businessline",
      time: "4 hours ago",
      link: "/news/vidhi-specialty-food-approval",
    },
    {
      id: 4,
      image: "/assets/image1.png",
      title:
        "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
      source: "The Hindu Businessline",
      time: "4 hours ago",
      link: "/news/vidhi-specialty-food-approval",
    },
    {
      id: 5,
      image: "/assets/image1.png",
      title:
        "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
      source: "The Hindu Businessline",
      time: "4 hours ago",
      link: "/news/vidhi-specialty-food-approval",
    },
    {
      id: 6,
      image: "/assets/image1.png",
      title:
        "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
      source: "The Hindu Businessline",
      time: "4 hours ago",
      link: "/news/vidhi-specialty-food-approval",
    },
  ];

  return (
    <div>
      <div className="pt-[5px]  ">
        {newsItems.map((item) => (
          <a key={item.id} href={item.link} className="block mb-4 group">
            <div className="flex flex-row md:flex-row items-start md:items-center gap-4 p-4  rounded-md  cursor-pointer group-hover:bg-white transition">
              {/* <!-- Image Section --> */}
              <div className="flex-shrink-0">
                <img
                  src={item.image}
                  alt="News Image"
                  className="w-[50px] h-[50px] md:w-[75px] md:h-[75px] object-cover rounded-md"
                />
              </div>

              {/* <!-- Content Section --> */}
              <div className="flex-1">
                <div className="flex flex-col gap-1">
                  {/* <!-- Title --> */}
                  <p className="text-sm md:text-base font-bold text-gray-800 line-clamp-2">
                    {item.title}
                  </p>
                  {/* <!-- Meta Info --> */}
                  <div className="flex items-center gap-2 text-4xs sm:text-xs md:text-xs text-gray-500 text-nowrap">
                    <span>{item.source}</span>
                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>

              {/* <!-- Arrow/Action Icon --> */}
              <div className="flex items-center justify-end md:flex group pt-5 sm:pt-0">
                <img
                  src="/assets/share1.svg"
                  alt=""
                  className="group-hover:filter group-hover:brightness-100 group-hover:invert group-hover:sepia group-hover:saturate-200 group-hover:hue-rotate-[90deg] group-hover:contrast-125 transition duration-300"
                />
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="flex text-lg flex-row md:flex-row items-start md:items-center justify-center gap-4 p-4 border  bg-white  cursor-pointer hover:bg-gray-50 transition text-[#125B54] ">
        <p>Load more</p>
      </div>
    </div>
  );
};

export default StockDetailsNews;
