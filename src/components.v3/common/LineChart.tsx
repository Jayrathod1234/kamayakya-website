import React, { useContext, useEffect, useState } from "react";
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
import { cn } from "@/lib/utils";
import { useTrackRecord } from "@/contexts/trackRecordContext";
import AuthContext from "@/components/AuthContext";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { useQuery } from "@tanstack/react-query";
import { getBseLivePrice, getNseLivePrice } from "@/api/track-record";

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
  for (let i = 1; i <= 15; i++) {
    // Generate a random count value between 10 and 50
    const count = getRandomInt(20, 80);

    data.push({ year: i.toString(), count: count.toString() });
  }
  return data;
}

const data = generateRandomData();

export default function LineChart({containerClassName,stock_id, entry_price, created,stock_exchange,stock_live_prices, stock_targets}) {
  const {sebiBoardType} = useTrackRecord();

  const { stockSector } = useStockPicks();
  const { status, data, error, isFetching } = useQuery({
    queryKey: ['bseLivePrice',sebiBoardType],
    queryFn: ()=>stock_exchange.includes("NSE") ?  getNseLivePrice(sebiBoardType):getBseLivePrice(sebiBoardType),
    // Refetch the data every second
    refetchInterval: 1000 * 10,
  })
  const [markerAnnotation,setMarkerAnnotaion] = useState([])
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
    console.log(created)
    arr.push({...markerAnnotationOption,yValue:entry_price, xValue:created})
    for(let i =0;i< stock_targets.length;i++){
      arr.push({...targetAnnotationOption,value:stock_targets[i].target_price,borderColor:stock_targets[i].target_met ? '#99D9D4':'#FFD19A',label:{...targetAnnotationOption.label, content:`Target ${stock_targets.length - i }`}})
      arr.push({...markerAnnotationOption,content:stock_targets[i].target_met ?  target_met_img:target_active_img, yValue:stock_targets[i].target_price,xValue:stock_targets[i].target_met || stock_targets[i].created })
    }
    setMarkerAnnotaion(arr)
  },[])


  

  useEffect(()=>{
    // if(!stock_live_prices) return
    console.log("DATA@",data)
    if(!data && !stock_live_prices)return
  
    setLiveData(stock_live_prices.concat(data?.flatMap(prev=> prev.stock_id === stock_id ? prev.stock_live_data : null).filter(prev=>prev!=null) || []))
  },[data])
  console.log(liveData)

  return (
    <div className={cn(" relative w-full",containerClassName )}>
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
                ...markerAnnotation,
                // markerAnnotation,
                // targetAnnotation,
                // targetAnnotation2,
                // targetIconAnnotation,
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
          labels: liveData.map((x) => x.date),
          datasets: [
            {
              label: "Dimensions",
              data: liveData.map((row) => row.price),
              borderColor: "#00645A",
              pointStyle: false,
              tension: 0,
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
}
