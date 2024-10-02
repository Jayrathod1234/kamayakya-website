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
  for (let i = 1; i <= 15; i++) {
    // Generate a random count value between 10 and 50
    const count = getRandomInt(20, 80);

    data.push({ year: i.toString(), count: count.toString() });
  }
  return data;
}

const data = generateRandomData();

export default function LineChart({containerClassName,stock_id}) {
  const {sebiBoardType} = useTrackRecord();

  const { stockSector } = useStockPicks();
  const { status, data, error, isFetching } = useQuery({
    queryKey: ['bseLivePrice',sebiBoardType],
    queryFn: ()=>getBseLivePrice(sebiBoardType),
    // Refetch the data every second
    refetchInterval: 1000 * 10,
  })
  const [liveData,setLiveData] = useState([])
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

  useEffect(()=>{
    // if(!stock_live_prices) return
    if(!data)return
    // console.log("DATA@",data)
    setLiveData((data.flatMap(prev=> prev.stock_id === stock_id ? prev.stock_live_data : null).filter(prev=>prev!=null)))
  },[data])


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
          labels: liveData.map((x) => x.time),
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
