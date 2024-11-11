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
  TimeSeriesScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin, { AnnotationOptions } from "chartjs-plugin-annotation";
import { cn } from "@/lib/utils";
import { useTrackRecord } from "@/contexts/TrackRecordContext";
import AuthContext from "@/components/AuthContext";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { useQuery } from "@tanstack/react-query";
import { getBseLivePrice, getNseLivePrice } from "@/api/track-record";
import "chartjs-adapter-date-fns";
import { format, parse, parseISO, setHours, setMilliseconds, setMinutes, setSeconds } from "date-fns";
import { useTrackRecordCommon } from "@/contexts/TrackRecordCommonContext";
import { useMediaQuery } from "@mui/material";
import withComponentInView from "./isInView";
import { useInView } from "react-intersection-observer";
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

function formatTargetMetDate(dateString) {
  const date = parseISO(dateString); // Parse the date string into a Date object

  // Set the desired time: 3:30 PM
  const updatedDate = setMilliseconds(
      setSeconds(setMinutes(setHours(date, 15), 30), 0),
      0
  );

  // Format the date in the desired ISO format with timezone (hardcoding +05:30)
  const formattedDate = format(updatedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

  return formattedDate.replace("+00:00", "+05:30"); // Adjust for desired timezone offset
}

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

function LineChartMain({
  fetchIndividual = true,
  containerClassName,
  stock_id,
  entry_price,
  created,
  stock_exchange,
  stock_live_prices,
  stock_targets,
  stock_action,
  annotationSize = 8,
}: {
  fetchIndividual?: boolean;
  containerClassName: string;
  stock_id: string;
  entry_price: number;
  created: string;
  stock_exchange: string;
  stock_live_prices: any[];
  stock_targets: any[];
  stock_action: string;
  annotationSize?: number;
}) {
  const { sebiBoardType } = useTrackRecordCommon();
  const isMobile = useMediaQuery("(max-width:600px)");
  const { stockSector } = useTrackRecordCommon();
  // const { status, data, error, isFetching } = useQuery({
  //   queryKey: ["bseLivePrice", sebiBoardType, stock_id],
  //   queryFn: () =>
  //     stock_exchange.includes("NSE")
  //       ? getNseLivePrice(sebiBoardType, fetchIndividual ? stock_id : null)
  //       : getBseLivePrice(sebiBoardType, fetchIndividual ? stock_id : null),
  //   // Refetch the data every second
  //   refetchInterval: stock_exchange.includes("NSE") ? 1000 * 60 * 5 : 1000 * 60 * 1,
  // });
  const [markerAnnotation, setMarkerAnnotaion] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const [liveData, setLiveData] = useState([]);
  const entry_img = new Image();
  entry_img.height = annotationSize;
  entry_img.width = annotationSize;
  entry_img.src = "/assets/entry point.svg";
  const target_met_img = new Image();
  target_met_img.height = annotationSize;
  target_met_img.width = annotationSize;
  target_met_img.src = "/assets/target-met.svg";
  const target_active_img = new Image();
  target_active_img.width = 10;
  target_active_img.height = 10;
  target_active_img.src = "/assets/active-target.svg";
  const cmp_img = new Image();
  cmp_img.height = annotationSize;
  cmp_img.width = annotationSize;
  cmp_img.src = "/assets/cmp-pulse.svg";
  const check_mark = new Image();
  check_mark.src = "/assets/typcn_tick (1).svg";
  const cross_mark = new Image();
  cross_mark.src = "/assets/cross.svg";
  const exit_mark = new Image();
  exit_mark.src = "/assets/exit_icon.svg";
  exit_mark.height = annotationSize;
  exit_mark.width = annotationSize;
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
    const annotationTooltip = document.getElementById("annotation-tooltip");
    // Hide if no tooltip
    if (tooltip.opacity === 0 || annotationTooltip?.style.opacity === "1") {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const title = tooltip.title[0];
      const price = tooltip.dataPoints[0].formattedValue;
      const parsedDate = parse(title, "MMM d, yyyy, h:mm:ss a", new Date());

      // Format it to "12th July 2023 11:32"
      const formattedDate = format(parsedDate, "do MMM yyyy  HH:mm");

      let innerHtml = `
             <div class="relative  open_sans flex flex-col items-center h-full min-h-full  ">
        <div class="flex flex-col h-full w-full">
            <div class="text-gray-400 whitespace-nowrap text-4xs ">${formattedDate}</div>
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
      if (!isLoggedIn) {
        innerHtml = `
         <div class="relative  open_sans flex flex-col items-center h-full min-h-full  ">
        <div class="flex flex-col h-full w-full">
<div class="text-brand-400 whitespace-nowrap italic text-4xs flex items-center gap-x-1 "><img height=12 width=12 src="/assets/noto_locked.png"/>Login to view</div>
            <div class="font-bold text-xs text-gray-950 whitespace-nowrap mt-auto  h-[18px] bg-gray-150 w-[46px] rounded-full" ></div>
            
            
          
             
           </div>
            <svg class="absolute bottom-[-13px]" width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 0H0.5L7.08579 6.58579C7.86684 7.36684 9.13317 7.36684 9.91421 6.58579L16.5 0Z" fill="white"/>
</svg>

            </div>
         
      `;
      }
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
    if (lineTooltipEle && tooltipEl.style.opacity === "1") {
      // console.log("LINE TOOLTIP", lineTooltipEle)
      lineTooltipEle.style.opacity = "0";
      lineTooltipEle.style.pointerEvents = "none"; // Disable pointer events to hide interaction
    }

    // Set the content for the tooltip
    const title = context.element.options.xValue; // Example title
    const price = context.element.options.yValue; // Example price
    // const parsedDate = parse(title, "MMM d, yyyy, h:mm:ss a", new Date());
    // console.log(title);
    // Format it to "12th July 2023 11:32"
    // const formattedDate = format(parsedDate, "do MMM yyyy  HH:mm");
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
    let targetLabel =
      // targetIndex === 0 && stock_action === "SELL" && stock_targets[targetIndex].target_met
      //   ? "Exit Price"
      //   :
         targetIndex >= 0
        ? `Target ${stock_targets?.length - targetIndex}`
        : entry_price === price
        ? "Entry Price"
        : price === liveData[liveData.length - 1].price && stock_action === "SELL"
        ? "Exit Price"
        : "CMP";
    const targetItem = stock_targets && stock_targets.find((item) => item.target_price === price);

    const isTargetNotMet = targetItem && targetItem.target_met === null;
    // if(isTargetNotMet) return null
    let innerHtml = `
        <div class="relative flex flex-col items-center open_sans">
        <div class="w-full ">
            <div class="text-gray-400 whitespace-nowrap text-4xs ">${format(new Date(title), "do MMM yyyy HH:mm")}</div>
            <div class="font-bold text-xs text-gray-950 whitespace-nowrap mt-2">₹${price}</div>
            <div class="text-gray-500 font-medium whitespace-nowrap text-4xs">${targetLabel} ${
      targetLabel && targetLabel.includes("Target")
        ? `<span class=${` ${isTargetNotMet ? "text-[#F98800]" : "text-success-500"}`}>${
            isTargetNotMet
              ? new Date(stock_targets[targetIndex].target_date) < Date.now()
                ? "Inactive"
                : "Active"
              : "Met"
          }</span>`
        : ""
    }</div>
           </div>
            <svg class="absolute bottom-[-10px]" width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 0H0.5L7.08579 6.58579C7.86684 7.36684 9.13317 7.36684 9.91421 6.58579L16.5 0Z" fill="white"/>
</svg>

            </div>
    `;
    if (!isLoggedIn) {
      innerHtml = `
        <div class="relative flex flex-col items-center open_sans">
        <div class="w-full ">
            <div class="text-brand-400 whitespace-nowrap italic text-4xs flex items-center gap-x-1 "><img height=12 width=12 src="/assets/noto_locked.png"/>Login to view</div>
            <div class="font-bold text-xs text-gray-950 whitespace-nowrap mt-2 h-[18px] bg-gray-150 w-[46px] rounded-full"></div>
            <div class="text-gray-500 font-medium whitespace-nowrap text-4xs">${targetLabel} ${
        targetLabel && targetLabel.includes("Target")
          ? `<span class=${` ${isTargetNotMet ? "text-[#F98800]" : "text-success-500"}`}>${
              isTargetNotMet
                ? targetIndex!==0
                  ? "Inactive"
                  : "Active"
                : "Met"
            }</span>`
          : ""
      }</div>
           </div>
            <svg class="absolute bottom-[-10px]" width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 0H0.5L7.08579 6.58579C7.86684 7.36684 9.13317 7.36684 9.91421 6.58579L16.5 0Z" fill="white"/>
</svg>

            </div>
    `;
    }
    tooltipEl.innerHTML = innerHtml;
  };

  useEffect(() => {
    if (liveData && liveData.length > 0 && stock_targets && stock_targets.length > 0) {
      const arr = [];

      // Entry point annotation
      arr.push({
        type: "point",
        xValue: new Date(liveData[0].date).getTime(), // Convert to timestamp
        yValue: liveData[0].price,
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
        const target_not_met = !target.target_met && i !==0;
        // Target marker
        {
          target.target_met &&
            arr.push({
              type: "point",
              // scaleId:'y',
              xValue: new Date(formatTargetMetDate(target.target_met)).getTime(), // Convert to timestamp
              yValue: target.target_price,
              backgroundColor: "transparent",
              borderColor: "transparent",
              pointStyle: target.target_met
                ? target_met_img
                : target_active_img,
              radius: 8,
              enter: handleAnnotationTooltip,
              leave: (context) => {
                const tooltipEl = document.getElementById("annotation-tooltip");
                if (tooltipEl) tooltipEl.style.opacity = "0";
              },
            });
        }

        // if (i === 0 && !target_not_met && stock_action === "SELL") return;
        arr.push({
          type: "label",
          // xValue:new Date(target.created).getTime(),
          // xScaleId:"x",
          yValue: target.target_price,
          font: {
            family: "Open Sans",
            size: 10,
            weight: 400,
          },

          content: isMobile ? `T${stock_targets.length - i}` : `Target ${stock_targets.length - i}`,
          backgroundColor: "transparent",
          color: target.target_met || target_not_met || stock_action === "SELL" ? "#12B76A" : "#FF7F09",
          xAdjust: (ctx) => {
            // Get chart width and calculate xAdjust dynamically
            const chartWidth = ctx.chart.chartArea.width;
            // console.log(chartWidth);
            return isMobile ? chartWidth / 2 + 15 : chartWidth / 2 + 25; // adjust this to position it properly
          },
        });
        
        arr.push({
          type: "label",
          yValue: target.target_price,
          content: target.target_met ? check_mark : target_not_met ? cross_mark : stock_action!=="SELL"? target_active_img:cross_mark,
          backgroundColor: "transparent",
          color: target.target_met || target_not_met ? "#12B76A" : "#FF7F09",
          //   position: "end",
          xAdjust: (ctx) => {
            // Get chart width and calculate xAdjust dynamically
            const chartWidth = ctx.chart.chartArea.width;
            return isMobile ? chartWidth / 2 + 26 : chartWidth / 2 + 50; // adjust this to position it properly
          },
          // },
        });
        arr.push({
          type: "line",
          borderColor: target.target_met ? "#99D9D4" : target_not_met || stock_action === "SELL" ? "#EDF0F5" : "#FFD19A",
          borderWidth: 1,
          borderDash: [6, 6],
          scaleID: "y",
          value: target.target_price,
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
        pointStyle: stock_action === "SELL"? exit_mark: cmp_img,
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
      // if (data && data.length > 0) {
      // console.log("ENTER HERE");
      // currentData = currentData.concat(
      //   data.flatMap((prev) => {
      //     // console.log(prev.stock_live_data)
      //     return prev.stock_id === stock_id ? prev.stock_live_data : null;
      //   })
      // );
      // console.log(currentData);
      // }

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
      if (Array.isArray(stock_targets) && stock_targets.length > 0) {
        const newStockTargets = stock_targets
          .filter((item) => item.target_price && item.target_met) // Ensure valid data
          .map((item) => ({
            date: format(item.target_met ? formatTargetMetDate(item.target_met) : item.created, "yyyy-MM-dd HH:mm:ss"),
            price: item.target_price,
            stock_id: stock_id,
          }));
        currentData = currentData.concat(newStockTargets);
        // console.log("AFTER ADDING STOCK TARGETS", stock_id, newStockTargets, currentData);
      }
      return currentData.sort((a, b) => new Date(a.date) - new Date(b.date));
    });
  }, [data]);
  // console.log("DATA LENGTH",stock_id, liveData?.length)
  return (
    <Line
      className=""
      options={{
        spanGaps: true,
        layout: {
          padding: {
            right: isLoggedIn ? (isMobile ? 30 : 60) : 0,
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
              display: isLoggedIn ? true : false,
              // stepSize: 6,
              align: "start",
              source: "auto",
              autoSkip: true, // Automatically skip labels
              autoSkipPadding: isMobile ? 5 : 20, // Add padding between labels based on screen size
              maxTicksLimit: isMobile ? 5 : 8, //
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
                const formattedDate = format(parsedDate, "dd MMM");
                return (isMobile ? index % 4 === 0 : index % 2 === 0) ? formattedDate : "";
                // : "";
              },
              maxRotation: 0,
              // stepSize:9000
            },
            grid: {
              display: false,
              offset: true,
              color: "#f7f7f7",
            },
          },
          y: {
            ticks: {
              display: isLoggedIn ? true : false,
            },
            grid: {
              display: false,
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
            tension: 0.4,
            borderWidth: 1,
          },
        ],
      }}
    />
  );
}

function LineChart(props: {
  fetchIndividual?: boolean;
  containerClassName: string;
  stock_id: string;
  entry_price: number;
  created: string;
  stock_exchange: string;
  stock_live_prices: any[];
  stock_targets: any[];
  stock_action: string;
  annotationSize?: number;
}) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <div ref={ref} className={cn(" relative w-full", props.containerClassName)}>
      {inView ? <LineChartMain {...props} /> : null}
    </div>
  );
}

export default LineChart;
