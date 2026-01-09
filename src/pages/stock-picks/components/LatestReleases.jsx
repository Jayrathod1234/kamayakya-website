import React, { useContext } from "react";
import { Slider } from "@/components.v3/common/Slider.jsx";
import StockCard from "@/components.v3/common/StockCard.jsx";
import { getLatestReleasesStockListApi } from "@/api/stock-picks";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "@/components/AuthContext";
import StockCardSkeleton from "./skeletons/StockCardSkeleton";
import { useMediaQuery } from "@mui/material";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { HotSlider } from "../../../components.v3/common/HotSlider";

// Mock data for testing - Set USE_MOCK_DATA to true to use mock data
const USE_MOCK_DATA = false; // Change to true to use mock data

const MOCK_LATEST_RELEASES = [
  {
    id: "mock-1",
    stock_name: "Tech Innovations Ltd.",
    market_cap: 2.5,
    new_stock: true,
    recommended_stock: false,
    is_blur: false,
    upside_left: 25.5,
    sector: "Technology",
    upside_left_time: "45 days",
    stock_tags: [
      {
        id: "tag-1",
        name: "Growth Story",
        image: "https://kamayakya.s3.amazonaws.com/strategy-tags/growth-story.png",
      },
    ],
    gain_loss: 15.2,
    return_time: "30 days",
    latest_youtube_video: null,
    stock_targets: [
      {
        id: "target-1",
        entry_price: 150,
        target_price: 190,
        target_date: "2024-12-31",
        gain_loss: 5.33,
        target_met: null,
        target_action: "BUY",
        created: "2024-11-15T10:00:00Z",
      },
    ],
    live_price: 175.5,
    entry_price: 150,
    created: "2024-11-15T10:00:00Z",
    start_date: "2024-11-15",
  },
  {
    id: "mock-2",
    stock_name: "Green Energy Corp.",
    market_cap: 1.8,
    new_stock: true,
    recommended_stock: true,
    is_blur: false,
    upside_left: 35.2,
    sector: "Energy",
    upside_left_time: "60 days",
    stock_tags: [
      {
        id: "tag-2",
        name: "Turnaround Story",
        image: "https://kamayakya.s3.amazonaws.com/strategy-tags/turnaround-story.png",
      },
    ],
    gain_loss: 22.5,
    return_time: "45 days",
    latest_youtube_video: null,
    stock_targets: [
      {
        id: "target-2",
        entry_price: 200,
        target_price: 270,
        target_date: "2025-01-15",
        gain_loss: 8.5,
        target_met: null,
        target_action: "BUY",
        created: "2024-11-10T10:00:00Z",
      },
    ],
    live_price: 245.0,
    entry_price: 200,
    created: "2024-11-10T10:00:00Z",
    start_date: "2024-11-10",
  },
  // {
  //   id: "mock-3",
  //   stock_name: "Pharma Solutions Inc.",
  //   market_cap: 3.2,
  //   new_stock: false,
  //   recommended_stock: true,
  //   is_blur: false,
  //   upside_left: 18.5,
  //   sector: "Pharmaceuticals",
  //   upside_left_time: "30 days",
  //   stock_tags: [
  //     {
  //       id: "tag-3",
  //       name: "Value Pick",
  //       image: "https://kamayakya.s3.amazonaws.com/strategy-tags/value-pick.png",
  //     },
  //   ],
  //   gain_loss: 12.3,
  //   return_time: "20 days",
  //   latest_youtube_video: null,
  //   stock_targets: [
  //     {
  //       id: "target-3",
  //       entry_price: 300,
  //       target_price: 355,
  //       target_date: "2024-12-20",
  //       gain_loss: 3.2,
  //       target_met: null,
  //       target_action: "BUY",
  //       created: "2024-11-05T10:00:00Z",
  //     },
  //   ],
  //   live_price: 336.5,
  //   entry_price: 300,
  //   created: "2024-11-05T10:00:00Z",
  //   start_date: "2024-11-05",
  // },
  // {
  //   id: "mock-4",
  //   stock_name: "Finance Hub Ltd.",
  //   market_cap: 4.5,
  //   new_stock: true,
  //   recommended_stock: false,
  //   is_blur: false,
  //   upside_left: 28.7,
  //   sector: "Finance",
  //   upside_left_time: "50 days",
  //   stock_tags: [
  //     {
  //       id: "tag-4",
  //       name: "Dividend Play",
  //       image: "https://kamayakya.s3.amazonaws.com/strategy-tags/dividend-play.png",
  //     },
  //   ],
  //   gain_loss: 18.9,
  //   return_time: "35 days",
  //   latest_youtube_video: null,
  //   stock_targets: [
  //     {
  //       id: "target-4",
  //       entry_price: 500,
  //       target_price: 645,
  //       target_date: "2025-01-10",
  //       gain_loss: 6.5,
  //       target_met: null,
  //       target_action: "BUY",
  //       created: "2024-11-20T10:00:00Z",
  //     },
  //   ],
  //   live_price: 595.0,
  //   entry_price: 500,
  //   created: "2024-11-20T10:00:00Z",
  //   start_date: "2024-11-20",
  // },
  // {
  //   id: "mock-5",
  //   stock_name: "Manufacturing Pro",
  //   market_cap: 1.5,
  //   new_stock: false,
  //   recommended_stock: true,
  //   is_blur: false,
  //   upside_left: 22.3,
  //   sector: "Manufacturing",
  //   upside_left_time: "40 days",
  //   stock_tags: [
  //     {
  //       id: "tag-5",
  //       name: "Growth Story",
  //       image: "https://kamayakya.s3.amazonaws.com/strategy-tags/growth-story.png",
  //     },
  //   ],
  //   gain_loss: 14.7,
  //   return_time: "25 days",
  //   latest_youtube_video: null,
  //   stock_targets: [
  //     {
  //       id: "target-5",
  //       entry_price: 100,
  //       target_price: 122,
  //       target_date: "2024-12-30",
  //       gain_loss: 4.2,
  //       target_met: null,
  //       target_action: "BUY",
  //       created: "2024-11-01T10:00:00Z",
  //     },
  //   ],
  //   live_price: 114.7,
  //   entry_price: 100,
  //   created: "2024-11-01T10:00:00Z",
  //   start_date: "2024-11-01",
  // },
  // {
  //   id: "mock-6",
  //   stock_name: "Retail Chain Corp.",
  //   market_cap: 2.8,
  //   new_stock: true,
  //   recommended_stock: true,
  //   is_blur: false,
  //   upside_left: 32.1,
  //   sector: "Retail",
  //   upside_left_time: "55 days",
  //   stock_tags: [
  //     {
  //       id: "tag-6",
  //       name: "Turnaround Story",
  //       image: "https://kamayakya.s3.amazonaws.com/strategy-tags/turnaround-story.png",
  //     },
  //   ],
  //   gain_loss: 20.5,
  //   return_time: "40 days",
  //   latest_youtube_video: null,
  //   stock_targets: [
  //     {
  //       id: "target-6",
  //       entry_price: 250,
  //       target_price: 330,
  //       target_date: "2025-01-05",
  //       gain_loss: 7.8,
  //       target_met: null,
  //       target_action: "BUY",
  //       created: "2024-11-12T10:00:00Z",
  //     },
  //   ],
  //   live_price: 301.25,
  //   entry_price: 250,
  //   created: "2024-11-12T10:00:00Z",
  //   start_date: "2024-11-12",
  // },
];

function LatestReleases({ isLimitedView }) {
  const { sebiBoardType } = useStockPicks();
  const { isLoggedIn } = useContext(AuthContext);

  // Use react-query to fetch
  const {
    data: items = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latestReleasesStock", sebiBoardType, isLoggedIn],
    queryFn: () => getLatestReleasesStockListApi({ isLoggedIn, type: sebiBoardType }),
    enabled: !USE_MOCK_DATA, // Disable query when using mock data
  });

  // Use mock data if flag is set
  const displayItems = USE_MOCK_DATA ? MOCK_LATEST_RELEASES : items;
  const displayIsLoading = USE_MOCK_DATA ? false : isLoading;
  const displayError = USE_MOCK_DATA ? null : error;

  const isMobile = useMediaQuery("(max-width:600px)");
  const islaptop = useMediaQuery("(max-width:1440px)");
  const isminlaptop = useMediaQuery("(max-width:1024px)");
  const istablet = useMediaQuery("(max-width:768px)");

  // Determine the number of cards to show based on screen size
  let cardsToShow = 5; // Default for larger screens
  if (isMobile) {
    cardsToShow = 1;
  } else if (istablet) {
    cardsToShow = 3;
  } else if (isminlaptop) {
    cardsToShow = 3;
  } else if (islaptop) {
    cardsToShow = 4;
  }

  return (
    <>
      <div
        className={`sm:pb-[100px] pb-[58px] sm:pt-[68px] pt-[26px]  ${isLimitedView ? "sm:pt-[200px] pt-[0px]" : ""}`}
      >
        {displayItems.length === 0 ? (
          <div className="pt-5 w-full flex flex-col items-center justify-center text-center">
            <p className="text-display-xs text-gray-950 font-bold">Latest Releases ({displayItems.length})</p>
            <p className="text-md font-normal text-gray-600 text-center pt-3 font-open_sans">
              New Stocks released in the last 60 days
            </p>
            <div>
              <img src="/assets/Frame 7.svg" alt="ss " className="mx-auto" />
            </div>
            <div>
              <p className="text-[#98A2B3] text-[14px] font-open_sans font-normal leading-5 text-center">
                No Latest Stock Releases!
              </p>
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col items-center justify-center text-center bg-cover before:content-[''] before:bg-[url(/testimonials_texture.png)] before:absolute before:w-full before:h-full before:opacity-25">
            <p className="text-display-xs text-gray-950 font-bold">Latest Releases ({displayItems.length})</p>
            <p
              className={`text-md font-normal text-gray-600 text-center pt-3 font-open_sans ${
                (isMobile && displayItems.length <= 1) || (!isMobile && displayItems.length <= 5) ? "mb-6" : ""
              }`}
            >
              New Stocks released in the last 60 days
            </p>

            {displayItems.length <= cardsToShow ? (
              <div className="flex justify-center gap-5">
                {displayIsLoading || displayError ? (
                  <StockCardSkeleton className="sm:w-[404px] w-[358px]" length={cardsToShow} />
                ) : (
                  displayItems.map((value) => <StockCard key={value.id} {...value} />)
                )}
              </div>
            ) : (
              <div className="w-full">
                {displayIsLoading || displayError ? (
                  <div className="flex pb-12 !pt-[40px] carousel__container justify-center gap-5">
                    <StockCardSkeleton className="sm:w-[404px] w-[358px]" length={cardsToShow} />
                  </div>
                ) : (
                  displayItems.length > 0 && (
                    <div className=" w-full max-w-[1260px]  mx-auto">
                      <Slider>
                        {displayItems.map((value) => (
                          <StockCard
                            // className="w-[330px]"
                            key={value.id}
                            {...value}
                            isCarousal={true}
                          />
                        ))}
                      </Slider>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default LatestReleases;
