import {
  Chart as ChartJS,
  LineElement,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin, { AnnotationOptions } from "chartjs-plugin-annotation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components.v2/ui/tooltip";
import { useTrackRecord } from "@/contexts/trackRecordContext";
import { abbreviateTime } from "@/lib/date-formatter";
import { useContext } from "react";
import AuthContext from "@/components/AuthContext";

ChartJS.register({
  LineElement,
  ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  annotationPlugin,
});

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomData() {
  const data = [];
  for (let i = 1950; i <= 2023; i++) {
    // Generate a random count value between 10 and 50
    const count = getRandomInt(20, 80);

    data.push({ year: i.toString(), count: count.toString() });
  }
  return data;
}

const data = generateRandomData();

const getMascotImg = (action: string) => {
  switch (action) {
    case "BUY":
      return "/assets/buyActionCall.png";
    case "HOLD":
      return "/assets/hold_call.png";
    case "SELL":
      return "/assets/sell_call.png";
  }
};

export const TrackRecordStockCard = ({
  action,
  is_returns_positive,
  latest_target_price,
  latest_youtube_video,
  new_stock,
  recommended_stock,
  return_time,
  sector,
  stock_name,
  stock_tags,
  target_number,
  target_status,
  total_returns,
  upside_left,
  upside_left_time,
}) => {
  const { isLoggedIn, isSubscribed } = useContext(AuthContext);
  const img = new Image();
  img.src = "/assets/entry point.svg";
  const img2 = new Image();
  img2.src = "/assets/typcn_tick (1).svg";

  const markerAnnotation: AnnotationOptions = {
    type: "label",
    padding: 0,
    content: img,
    yValue: 20,
    xValue: 1,
    height: 14,
    width: 14,
    backgroundColor: "white",
  };

  const targetAnnotation: AnnotationOptions = {
    type: "line",
    borderColor: "#99D9D4",
    borderWidth: 1,
    borderDash: [6, 6],
    scaleID: "y",
    value: 20,
    label: {
      display: true,
      content: "Target ",
      backgroundColor: "transparent",
      color: "#12B76A",
      position: "end",
      xAdjust: 50,
      font: {
        size: 10,
      },
    },
  };

  const targetAnnotation2: AnnotationOptions = {
    type: "line",
    borderColor: "#99D9D4",
    borderWidth: 1,
    borderDash: [6, 6],
    scaleID: "y",
    value: 15,
    label: {
      display: true,
      content: "Target ",
      backgroundColor: "transparent",
      color: "#12B76A",
      position: "end",
      xAdjust: 50,
      font: {
        size: 10,
      },
    },
  };

  const targetIconAnnotation: AnnotationOptions = {
    type: "line",
    borderColor: "#99D9D4",
    borderWidth: 0,
    borderDash: [6, 6],
    scaleID: "y",
    value: 20,
    label: {
      display: true,
      content: img2,
      backgroundColor: "transparent",
      // color: "#12B76A",
      position: "end",
      xAdjust: 65,
      yAdjust: -2,
      height: 16,
      width: 16,
    },
  };

  return (
    <div className=" p-5 bg-white max-h-[451px] lg:max-w-[630px] rounded-lg overflow-hidden">
      {/* TOP SECTION */}
      <div className=" flex gap-x-2 items-center justify-between">
        <h4 className=" text-lg font-bold m-0 whitespace-nowrap truncate">{stock_name}</h4>
        <a className=" text-inherit" href={latest_youtube_video?.youtube_title} target="_blank">
          <div className=" group/watch-video flex items-center  gap-x-[6px] cursor-pointer duration-300 w-[28px] overflow-hidden hover:w-[128px] transition-all">
            <img height={28} width={28} className=" h-7 w-7" src="/assets/play.gif" />
            <p className="whitespace-nowrap">Watch Video</p>
          </div>
        </a>
      </div>

      <div className=" mt-3 border border-[#FEF0C7] px-[6px] py-[2px] rounded w-fit">
        <p className=" text-[#A3651A] font-semibold text-[10px]">Engineering</p>
      </div>
      {/* TOP SECTION  END*/}
      {/* CHART SECTION */}
      <div className=" relative h-[180px] w-full py-5">
        <Line
          className=""
          options={{
            layout: {
              padding: {
                right: 60,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              annotation: {
                clip: false,
                annotations: {
                  markerAnnotation,
                  targetAnnotation,
                  targetAnnotation2,
                  targetIconAnnotation,
                },
              },
            },
            scales: {
              x: {
                grid: {
                  color: "#f7f7f7",
                },
              },
              y: {
                grid: {
                  color: "#f7f7f7",
                },
              },
            },
          }}
          data={{
            labels: data.map((x) => x.year),
            datasets: [
              {
                label: "Dimensions",
                data: data.map((row) => row.count),
                borderColor: "#00645A",
                pointStyle: false,
                tension: 0,
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
      {/* CHART SECTION END */}
      {/* BOTTOM SECTION */}
      <div className="p-1 pr-4 rounded-[4px] flex gap-x-4 bg-[rgba(249,250,251,1)]">
        {/* Total Returns */}
        <div
          className={`  rounded-lg ${
            is_returns_positive
              ? "bg-[linear-gradient(314.25deg,#125B54_6.46%,#12ADB7_113.37%)]"
              : "bg-[linear-gradient(106.62deg,#FF7B7B_18.84%,#E53A3A_92.14%)]"
          } px-3 py-2`}
        >
          <p className=" text-4xs font-bold text-white">Total Returns</p>
          <div className={` flex gap-x-[2px] ${!isLoggedIn || (!isSubscribed && action === "BUY") ? "pt-[5px]":""}`}>
            <img
              width={15}
              height={11}
              src={is_returns_positive ? "/assets/Polygon2.svg" : "/assets/Polygon 3.svg"}
              alt=""
            />
            {!isLoggedIn || (!isSubscribed && action === "BUY") ? (
              <div className=" h-5 w-[93px] bg-[rgba(255,255,255,0.26)] rounded-full text-xl font-bold text-white m-0"></div>
            ) : (
              <p className=" text-xl font-bold text-white m-0">{total_returns}%</p>
            )}
          </div>
          <span className=" text-3xs font-semibold whitespace-nowrap text-white">in {abbreviateTime(return_time)}</span>
        </div>
        {/* Total Returns End*/}
        {/* Upside Left */}
        <div className=" flex flex-col justify-center">
          <div className=" flex items-center gap-x-1">
            <p className=" font-bold text-4xs text-[rgba(102,112,133,1)]">Upside Left</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className=" h-[14px]">
                  <img
                    className="!h-[14px] !w-[14px] object-contain"
                    height={14}
                    width={14}
                    src="/assets/blackinfo.svg"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to library</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className=" text-xl font-bold text-[rgba(16,24,40,1)]">{upside_left}%</p>
          <p className=" text-3xs font-semibold text-[rgba(110,110,110,1)]">expected in {upside_left_time}</p>
        </div>
        <div className=" ml-auto mt-auto">
          <img height={72} width={72} src={getMascotImg(action)} alt="action-mascot" />
        </div>
        {/* Upside Left End  */}
      </div>
      <div className=" pt-5">
        <button className="button-82-pushable group " role="button">
          <span className="button-82-shadow"></span>
          <span className="button-82-edge"></span>
          <span className="button-82-front button-82-front2 text flex items-center">
            <p className="text-[13px] font-bold text-[#125B54] font-open_sans">View Reports & Details</p>
            <div className="relative flex w-5">
              <img
                src="assets/chevron-right.png"
                alt=""
                className="w-4 img-1 transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src="assets/pajamas_long-arrow.svg"
                alt=""
                className="w-5 img-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute right-0"
              />
            </div>
          </span>
        </button>
      </div>
      {/* BOTTOM SECTION END */}
    </div>
  );
};
