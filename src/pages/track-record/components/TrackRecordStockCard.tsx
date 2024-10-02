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
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/components/AuthContext";
import { useRouter } from "next/router";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { sectorIcons } from "@/utils/constants.js";
import DeepValue from "../../../components.v3/common/DeepValue";
import { Tooltip as MuiTooltip } from "@mui/material";
import { TargetChip } from "@/components.v3/common/TargetChip";
import { useQuery } from "@tanstack/react-query";
import { getBseLivePrice } from "@/api/track-record";

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
  id,
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
  stock_live_prices,
  entry_price,
  stock_targets,
  created
  // market_cap,
}) => {
  const [markerAnnotation,setMarkerAnnotaion] = useState([])
  const {sebiBoardType} = useTrackRecord();
  const { isLoggedIn, isSubscribed } = useContext(AuthContext);
  const isBlur = !isLoggedIn;
  const { stockSector } = useStockPicks();
  const { status, data, error, isFetching } = useQuery({
    queryKey: ['bseLivePrice',sebiBoardType],
    queryFn: ()=>getBseLivePrice(sebiBoardType),
    // Refetch the data every second
    refetchInterval: 1000 * 10,
  })
  const [liveData,setLiveData] = useState([])
  const entry_img = new Image();
  entry_img.src = "/assets/entry point.svg";
  const target_met_img = new Image();
  target_met_img.src = "/assets/target-met.svg"
  const target_active_img = new Image();
  target_active_img.src = '/assets/active-target.svg'
  const img2 = new Image();
  img2.src = "/assets/typcn_tick (1).svg";
  const targetAnnotationOption = {
    type: "line",
    borderColor: "#99D9D4",
    borderWidth: 1,
    borderDash: [6, 6],
    scaleID: "y",
    // value: 20,
    label: {
      display: true,
      content: "Target ",
      backgroundColor: "transparent",
      color: "#12B76A",
      position: "end",
      xAdjust: 60,
      // yAdjust:0,
      font: {
        size: 10,
      },
    },
  }
  

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

  const router = useRouter();

  let tabImage = null;
  let bgColor = "bg-[white]";
  let cardClass = "";
  let innerClass = "relative rounded-lg bg-white shadow-6xs ";
  let newIconClass = "-5px";
  if (new_stock & recommended_stock) {
    tabImage = "hot-newtab";

    bgColor = "bg-gradient-to-r from-[#FDB022] to-[#75CDC5]";
  } else if (new_stock) {
    tabImage = "newtab";
    bgColor = "bg-brand-300";
    newIconClass = "-6px";
  } else if (recommended_stock) {
    tabImage = "hottab";
    bgColor = "bg-warning-300";
  }

  // if (status === 'pending') return <h1>Loading...</h1>
  // if (status === 'error') return <span>Error: {error.message}</span>
  
  useEffect(()=>{
    const markerAnnotationOption: AnnotationOptions = {
      type: "label",
      padding: 0,
      content: entry_img,
      // yValue: entry_price,
      // xValue: 1,
      height: 8,
      width: 8,
      backgroundColor: "white",
    };
    let arr = []
    arr.push({...markerAnnotationOption,yValue:entry_price, xValue:created})
    for(let i =0;i< stock_targets.length;i++){
      arr.push({...targetAnnotationOption,value:stock_targets[i].target_price,borderColor:stock_targets[i].target_met ? '#99D9D4':'#FFD19A',label:{...targetAnnotationOption.label, content:`Target ${stock_targets.length - i }`}})
      arr.push({...markerAnnotationOption,content:stock_targets[i].target_met ? target_active_img: target_met_img, yValue:stock_targets[i].target_price,xValue:stock_targets[i].target_met || stock_targets[i].created })
    }
    setMarkerAnnotaion(arr)
  },[])


  useEffect(()=>{
    if(!stock_live_prices) return
    if(!data)return
    // console.log("DATA@",data)
    setLiveData(stock_live_prices
      // .concat(data.flatMap(prev=> prev.stock_id === id ? prev.stock_live_data : null).filter(prev=>prev!=null))
    )
  },[data])
  console.log(stock_name,markerAnnotation)
  return (
    <div className={`p-[1px] ${bgColor} rounded-lg relative flex justify-center lg:max-w-[630px]`}>
      {tabImage && <img src={`/assets/${tabImage}.webp`} alt="" className="w-[210px] h-5 object-contain absolute -top-[6px]" />}
      <div className=" p-5 bg-white max-h-[451px] w-full lg:max-w-[630px] rounded-lg overflow-hidden">
        {/* TOP SECTION */}
        <div className=" flex gap-x-2 items-center justify-between">
          {isBlur || !stock_name ? (
            <div className="flex items-center w-full">
              {" "}
              <img height={28} width={28} src="/assets/noto_locked.png" alt="" />
              <div className=" h-5 w-1/2 rounded-full bg-[#EDF0F5]"></div>
            </div>
          ) : (
            <h4 className=" text-lg font-bold m-0 whitespace-nowrap truncate">{stock_name}</h4>
          )}

          <a className=" text-inherit" href={latest_youtube_video?.youtube_title} target="_blank">
            <div className=" group/watch-video flex items-center  gap-x-[6px] cursor-pointer duration-300 w-[28px] overflow-hidden hover:w-[128px] transition-all">
              <img height={28} width={28} className=" h-7 w-7" src="/assets/play.gif" />
              <p className="whitespace-nowrap">Watch Video</p>
            </div>
          </a>
        </div>

        <div className="pt-[12px]">
          <div className=" flex items-center gap-[8px] ">
            {stockSector && sector && (
              <div className="py-[2px] pr-[16px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px] whitespace-nowrap">
                <img src={`/sector_images_mustard/${sectorIcons[sector]}`} alt="" className="w-3 " />
                {stock_tags?.length > 0 ? (
                  <MuiTooltip title={stockSector[sector] ?? ""}>
                    <p className="text-[10px] font-semibold text-orange-700 font-open_sans">
                      {stockSector[sector]?.length > 10
                        ? `${stockSector[sector].substring(0, 10)}...`
                        : stockSector[sector]}
                    </p>
                  </MuiTooltip>
                ) : (
                  <p className="text-[10px] font-semibold text-orange-700 font-open_sans">{stockSector[sector]}</p>
                )}
              </div>
            )}
            <TargetChip
              containerClass="py-[3px] px-2 h-6 items-center border border-[#FEF0DF]"
              activeIconClass=" h-[10px] w-[10px]"
              activeIcon
              target_number={`${target_number} at ${latest_target_price ? `₹${latest_target_price}` : ""}`}
              active={target_status === "active" ? true : false}
            />
            {/* <div className="py-[2px] pr-[16px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px] whitespace-nowrap">
            <img src="/assets/Component 8.svg" alt="" className="w-3" />
            <p className="text-[10px] font-semibold text-[#667085] flex !items-center whitespace-nowrap font-open_sans">
              MCap:
              {is_blur ? (
                <div className="  w-[47px] h-[12px] bg-[#FFEED9] rounded-full "></div>
              ) : (
                <span className="">₹ {market_cap}</span>
              )}
            </p>
          </div> */}
            {stock_tags?.length > 0 && <DeepValue stock_tags={stock_tags} />}
          </div>
        </div>
        {/* TOP SECTION  END*/}
        {/* CHART SECTION */}
        <div className=" relative h-[180px] w-full py-5">
          {liveData && liveData.length > 0 ? <Line
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
                    ...markerAnnotation,
                    // targetIconAnnotation,
                  },
                },
              },
              scales: {
                x: {
                  ticks:{
                    // stepSize:4
                    // callback:function(value,index,ticks){
                    //   console.log("TICKS", ticks[index-1].value)
                    //   return value
                    // }
                  },
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
              labels: liveData.map((x) => x?.time || x?.date),
              datasets: [
                {
                  label: "Dimensions",
                  data: liveData.map((row) => row?.price),
                  borderColor: "#00645A",
                  pointStyle: false,
                  tension: 0,
                  borderWidth: 1,
                },
              ],
            }}
          />:null}
         
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
            } px-3 py-2 min-w-[140px]`}
          >
            <p className=" text-4xs font-bold text-white">Total Returns</p>
            <div
              className={` flex gap-x-[2px] ${!isLoggedIn || (!isSubscribed && action === "BUY") ? "pt-[5px]" : ""}`}
            >
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
            <span className=" text-3xs font-semibold whitespace-nowrap text-white">
              in {abbreviateTime(return_time)}
            </span>
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
          <button
            onClick={() => router.push(`/track-record/${id}`)}
            className="button-82-pushable group "
            role="button"
          >
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
    </div>
  );
};

export default TrackRecordStockCard;
