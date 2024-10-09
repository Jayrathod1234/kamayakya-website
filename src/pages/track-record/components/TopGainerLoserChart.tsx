import { format, parse } from "date-fns";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import annotationPlugin, { AnnotationOptions } from "chartjs-plugin-annotation";
import {
  Chart as ChartJS,
  LineElement,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  TimeScale,
  TimeSeriesScale,
} from "chart.js";
ChartJS.register({
  LineElement,
  ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  annotationPlugin,
  TimeScale,
  TimeSeriesScale,
});

export default function TopGainerLoserChart({stock_live_prices, entry_price, start_date}) {
  const [markerAnnotation,setMarkerAnnotaion] = useState([])
  const entry_img = new Image();
  entry_img.height = 8;
  entry_img.width = 8;
  entry_img.src = "/assets/entry point.svg";

  const formatData = (item) => {
    const dateTimeString = `${item.date} ${item.time}`;

    // Parse the combined date-time string
    const parsedDate = parse(dateTimeString, "yyyy-MM-dd HH:mm:ss", new Date());

    // Format the parsed date (optional)
    const formattedDate = format(parsedDate, "yyyy-MM-dd HH:mm:ss");
    console.log(formattedDate)
    return formattedDate
  };
  console.log(stock_live_prices)

  // useEffect(() => {
  //   const arr = [];

  //   // Entry point annotation
  //   arr.push({
  //     type: "point",
  //     xValue: new Date(start_date).getTime(), // Convert to timestamp
  //     yValue: entry_price,
  //     backgroundColor: "transparent",
  //     borderColor: "transparent",
  //     pointStyle: entry_img,
  //     radius: 8,
  //     // enter: handleAnnotationTooltip,
  //     // leave: (context) => {
  //     //   const tooltipEl = document.getElementById("annotation-tooltip");
  //     //   if (tooltipEl) tooltipEl.style.opacity = "0";
  //     // },
  //   });
  //   arr.push({
  //     type: "line",
  //     borderColor:"#EDF0F5"
  //     borderWidth: 1,
  //     borderDash: [6, 6],
  //     scaleID: "y",
  //     value: entry_price,
  //   });

  //   setMarkerAnnotaion(arr);
  // }, [stock_live_prices]);

  return <Line
        className=""
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            // annotation: {
            //   clip: false,
            //   common: {
            //     drawTime: "afterDraw", // Important: Draw annotations after the chart
            //   },
            //   annotations: {
            //     ...markerAnnotation,
            //     // targetIconAnnotation,
            //   },
            // },
            tooltip: {
              enabled: false,
              // position: "nearest",
              // external: externalTooltipHandler,
            },
          },
          scales: {
            x: {
              type: "timeseries", // Use time scale

              // time: {
              //   unit: "hour",
              //   displayFormats: {
              //     day: "MMM d",
              //     hour: "HH:mm",
              //   },
              // },

              display:false
            },
            y: {
              display:false,
            },
          },
        }}
        data={{
          labels: stock_live_prices.filter((x) => x && x.date).map((x) => {
            const date = formatData(x)
            return new Date(date).getTime()
          }),
          datasets: [
            {
              fill: false,
              data: stock_live_prices.filter((row) => row && row.price).map((row) => row?.price),
              borderColor: "#00645A",
              pointStyle: false,
              tension: 0,
              borderWidth: 1,
            },
          ],
        }}
      />

}
