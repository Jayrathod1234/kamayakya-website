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
  TimeScale,
  TimeSeriesScale
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin, { AnnotationOptions } from "chartjs-plugin-annotation";
import { cn } from "@/lib/utils";
import { useTrackRecord } from "@/contexts/trackRecordContext";
import AuthContext from "@/components/AuthContext";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { useQuery } from "@tanstack/react-query";
import { getBseLivePrice, getNseLivePrice } from "@/api/track-record";
import "chartjs-adapter-date-fns";
import { format, parse } from "date-fns";
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
  TimeSeriesScale
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

export default function LineChart({
  containerClassName,
  stock_id,
  entry_price,
  created,
  stock_exchange,
  stock_live_prices,
  stock_targets,
}) {
  const { sebiBoardType } = useTrackRecord();

  const { stockSector } = useStockPicks();
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["bseLivePrice", sebiBoardType],
    queryFn: () => (stock_exchange.includes("NSE") ? getNseLivePrice(sebiBoardType) : getBseLivePrice(sebiBoardType)),
    // Refetch the data every second
    refetchInterval: 1000 * 10,
  });
  const [markerAnnotation, setMarkerAnnotaion] = useState([]);

  const [liveData, setLiveData] = useState([]);
  const entry_img = new Image();
  entry_img.height = 8;
  entry_img.width = 8;
  entry_img.src = "/assets/entry point.svg";
  const target_met_img = new Image();
  target_met_img.height = 8;
  target_met_img.width = 8;
  target_met_img.src = "/assets/target-met.svg";
  const target_active_img = new Image();
  target_active_img.width = 8;
  target_active_img.height = 8;
  target_active_img.src = "/assets/active-target.svg";
  const cmp_img = new Image();
  cmp_img.height = 8;
  cmp_img.width = 8;
  cmp_img.src = "/assets/cmp-pulse.svg";

  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector("div");

    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.id = "chartjs-tooltip";
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = "none";
      tooltipEl.style.position = "absolute";
      tooltipEl.style.transform = "translate(-50%, -100%)";
      tooltipEl.style.transition = "all .1s ease";

      // const table = document.createElement("div");
      // table.id = "chartjs-child-wrapper";
      // table.style.margin = "0px";

      // tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  const externalTooltipHandler = (context) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const title = tooltip.title[0];
      const price = tooltip.dataPoints[0].formattedValue;
      const innerHtml = `
             <div class="relative  open_sans flex flex-col items-center h-full min-h-full  ">
        <div class="flex flex-col h-full w-full">
            <div class="text-gray-400 whitespace-nowrap text-4xs ">${title}</div>
            <div class="font-bold text-xs text-gray-950 whitespace-nowrap mt-auto" >₹${price}</div>
           </div>
            <svg class="absolute bottom-[-13px]" width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 0H0.5L7.08579 6.58579C7.86684 7.36684 9.13317 7.36684 9.91421 6.58579L16.5 0Z" fill="white"/>
</svg>

            </div>
    
        `;
      // const tableRoot = tooltipEl.querySelector("#chartjs-child-wrapper");
      // const tableRoot = tooltipEl.querySelector('table');
      // tableRoot.innerHTML = innerHtml;

      // Remove old children
      while (tooltipEl.firstChild) {
        tooltipEl.firstChild.remove();
      }

      // Add new children
      tooltipEl.innerHTML = innerHtml;
      // tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
    tooltipEl.style.top = positionY - 10 + tooltip.caretY + "px";
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + "px " + tooltip.options.padding + "px";
  };

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
  };

  // const targetIconAnnotation: AnnotationOptions = {
  //   type: "line",
  //   borderColor: "#99D9D4",
  //   borderWidth: 0,
  //   borderDash: [6, 6],
  //   scaleID: "y",
  //   value: 20,
  //   label: {
  //     display: true,
  //     content: img2,
  //     backgroundColor: "transparent",
  //     // color: "#12B76A",
  //     position: "end",
  //     xAdjust: 65,
  //     yAdjust: -2,
  //     height: 16,
  //     width: 16,
  //   },
  // };

  const handleAnnotationTooltip = (context) => {
    // Create the custom tooltip element
    let tooltipEl = document.getElementById("annotation-tooltip");
    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.id = "annotation-tooltip";
      document.body.appendChild(tooltipEl);
    }
    const lineTooltipEle = document.getElementById("chartjs-tooltip");
    if (lineTooltipEle) {
      // console.log("LINE TOOLTIP", lineTooltipEle)
      lineTooltipEle.style.opacity = "0";
    }

    // Set the content for the tooltip
    const title = context.element.options.xValue; // Example title
    const price = context.element.options.yValue; // Example price
    if (price === 9.06) return;
    // Get the annotation position relative to the chart canvas
    const chartPosition = context.chart.canvas.getBoundingClientRect();
    const annotationElement = context.element; // The annotation element
    const annotationX = chartPosition.left + window.pageXOffset + annotationElement.x;
    const annotationY = chartPosition.top + window.pageYOffset + annotationElement.y;

    // Position the tooltip relative to the annotation element
    tooltipEl.style.opacity = "1";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.left = annotationX - 50 + "px"; // X position relative to the annotation
    tooltipEl.style.top = annotationY - 78 + "px"; // Y position relative to the annotation
    tooltipEl.style.pointerEvents = "none";
    let targetIndex = stock_targets?.findIndex((item) => item.target_price === price);
    targetIndex =
      targetIndex >= 0 ? `Target ${stock_targets?.length - targetIndex}` : entry_price === price ? "Entry Price" : null;
    const targetItem = stock_targets && stock_targets.find((item) => item.target_price === price);

    const isTargetNotMet = targetItem && targetItem.target_met === null;

    const innerHtml = `
        <div class="relative flex flex-col items-center open_sans">
        <div class="w-full ">
            <div class="text-gray-400 whitespace-nowrap text-4xs ">${format(title, "do MMM")}</div>
            <div class="font-bold text-xs text-gray-950 whitespace-nowrap mt-2">₹${price}</div>
            <div class="text-gray-500 font-medium whitespace-nowrap text-4xs">${targetIndex} ${
      targetIndex && targetIndex.includes("Target")
        ? `<span class=${` ${isTargetNotMet ? "text-[#F98800]" : "text-success-500"}`}>${
            isTargetNotMet ? "Active" : "Met"
          }</span>`
        : ""
    }</div>
           </div>
            <svg class="absolute bottom-[-10px]" width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 0H0.5L7.08579 6.58579C7.86684 7.36684 9.13317 7.36684 9.91421 6.58579L16.5 0Z" fill="white"/>
</svg>

            </div>
    `;
    tooltipEl.innerHTML = innerHtml;
  };

  useEffect(() => {
    if (liveData && liveData.length > 0 && stock_targets && stock_targets.length > 0) {
      const arr = [];

      // Entry point annotation
      arr.push({
        type: "point",
        xValue: new Date(created).getTime(), // Convert to timestamp
        yValue: entry_price,
        backgroundColor: "transparent",
        borderColor: "transparent",
        pointStyle: entry_img,
        radius: 8,
        label: {
          display: false,
          enabled: false,
          content: "Entry",
          position: "top",
        },
        enter: handleAnnotationTooltip,
        leave: (context) => {
          const tooltipEl = document.getElementById("annotation-tooltip");
          if (tooltipEl) tooltipEl.style.opacity = "0";
        },
      });

      // Target annotations
      stock_targets.forEach((target, i) => {
        arr.push({
          type: "line",
          borderColor: target.target_met ? "#99D9D4" : "#FFD19A",
          borderWidth: 1,
          borderDash: [6, 6],
          scaleID: "y",
          value: target.target_price,
          label: {
            display: true,
            content: `Target ${stock_targets.length - i}`,
            backgroundColor: "transparent",
            color: target.target_met ? "#99D9D4" : "#FFD19A",
            position: "end",
            xAdjust: 64,
          },
        });

        // Target marker
        arr.push({
          type: "point",
          // scaleId:'y',
          xValue: new Date(target.created).getTime(), // Convert to timestamp
          yValue: target.target_price,
          backgroundColor: "transparent",
          borderColor: "transparent",
          pointStyle: target.target_met ? target_met_img : target_active_img,
          radius: 8,
          enter: handleAnnotationTooltip,
          leave: (context) => {
            const tooltipEl = document.getElementById("annotation-tooltip");
            if (tooltipEl) tooltipEl.style.opacity = "0";
          },
        });
      });

      // Current price marker
      const lastPoint = liveData[liveData.length - 1];
      arr.push({
        type: "point",
        xValue: new Date(lastPoint.date).getTime(), // Convert to timestamp
        yValue: lastPoint.price,
        backgroundColor: "transparent",
        borderColor: "transparent",
        pointStyle: cmp_img,
        radius: 8,
        enter: handleAnnotationTooltip,
        leave: (context) => {
          const tooltipEl = document.getElementById("annotation-tooltip");
          if (tooltipEl) tooltipEl.style.opacity = "0";
        },
      });

      setMarkerAnnotaion(arr);
    }
  }, [liveData]);

  useEffect(() => {
    if (!stock_live_prices) return;
    // if (!data) return;
    // console.log("DATA@",data)
    setLiveData(() => {
      let currentData = stock_live_prices ? stock_live_prices : [];
      if (data && data.length > 0) {
        currentData.concat(
          data
            .flatMap((prev) => {
              // console.log(prev.stock_live_data)
              return prev.stock_id === stock_id ? prev.stock_live_data : null;
            })
            .filter((prev) => prev != null)
        );
      }
      currentData = currentData
        .map((item) => {
          if (!item) return;
          const dateTimeString = `${item.date} ${item.time}`;

          // Parse the combined date-time string
          const parsedDate = parse(dateTimeString, "yyyy-MM-dd HH:mm:ss", new Date());

          // Format the parsed date (optional)
          const formattedDate = format(parsedDate, "yyyy-MM-dd HH:mm:ss");
          return { ...item, date: formattedDate };
        })
        .filter((prev) => prev != null);
      return currentData;
    });
  }, [data]);
  console.log(liveData);

  return (
    <div className={cn(" relative w-full", containerClassName)}>
      <Line
        className=""
        options={{
          spanGaps: true,
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
              common: {
                drawTime: "afterDraw", // Important: Draw annotations after the chart
              },
              annotations: {
                ...markerAnnotation,
                // targetIconAnnotation,
              },
            },
            tooltip: {
              enabled: false,
              position: "nearest",
              external: externalTooltipHandler,
            },
          },
          scales: {
            x: {
              type: "timeseries", // Use time scale

              time: {
                unit: "hour",
                displayFormats: {
                  day: "MMM d",
                  hour: "HH:mm",
                },
              },

              ticks: {
                stepSize: 6,
                align: "start",
                source: "auto",
                autoSkip: false,
                callback(tickValue, index, ticks) {
                  let annotationXValues = Object.keys(markerAnnotation).map((key) => markerAnnotation[key].xValue);
                  annotationXValues = annotationXValues
                    .filter((value) => value)
                    .map((value) => {
                      const formattedDate = format(new Date(value), "yyyy-MM-dd hh:mm:ss a");

                      return formattedDate;
                    });

                  const label = this.getLabelForValue(tickValue);
                  const parsedDate = parse(label, "MMM d, yyyy, h:mm:ss a", new Date());
                  // console.log(stock_name,label,annotationXValues)
                  if (!parsedDate) {
                    return "";
                  }

                  // Format the parsed date
                  const formattedDate = format(parsedDate, "do MMM");
                  return index % 3 == 0 ? formattedDate : "";
                },
                maxRotation: 0,
                // stepSize:9000
              },
              grid: {
                offset: true,
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
          labels: liveData.filter((x) => x && x.date).map((x) => new Date(x.date).getTime()),
          datasets: [
            {
              fill: false,
              data: liveData.filter((row) => row && row.price).map((row) => row?.price),
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
