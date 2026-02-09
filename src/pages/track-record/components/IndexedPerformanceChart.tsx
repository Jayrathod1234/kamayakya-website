import React, { useState, useMemo } from "react";
import Tooltip from "@/components.v3/common/Tooltip";

import {
  Chart as ChartJS,
  LineElement,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  TimeSeriesScale,
  TooltipModel,
  ChartTypeRegistry,
  BubbleDataPoint,
  Point,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { format, parse, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getIndexedPerformanceChart } from "@/api/track-record";
import { Skeleton, useMediaQuery } from "@mui/material";
import { Tabs, TabsVariant } from "@/components.v2/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components.v2/ui/select";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components.v2/ui/drawer";
import { X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components.v2/ui/accordion";
import AuthContext from "@/components/AuthContext";

ChartJS.register({
  LineElement,
  ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  TimeSeriesScale,
});

type TimeRange = "1_month" | "6_months" | "1_year" | "2_year" | "maximum";
type Benchmark = "nifty50" | "smallcap250";

const BENCHMARK_OPTIONS = [
  {
    value: "nifty50",
    label: "NIFTY 50 (Large Caps)",
    description: "Compare with India's 50 largest listed companies as per market cap",
  },
  {
    value: "smallcap250",
    label: "NIFTY Smallcap 250",
    description: "Compare with a broad basket of small-cap companies (251st to 500th ranking as per market cap)",
  },
];

export default function IndexedPerformanceChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("maximum");
  const [benchmark, setBenchmark] = useState<Benchmark>("smallcap250");
  const isMobile = useMediaQuery("(max-width:600px)");
  const { isLoggedIn, handleLogin } = React.useContext(AuthContext);
  const {
    data: chartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["indexedPerformanceChart", timeRange, benchmark],
    queryFn: () => getIndexedPerformanceChart({ time_range: timeRange, benchmark: benchmark }),
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });

  const chartLabels = useMemo(() => {
    if (!chartData?.data?.chart_data) return [];
    return chartData.data.chart_data.map((item: any) => new Date(item.date).getTime());
  }, [chartData]);

  const portfolioData = useMemo(() => {
    if (!chartData?.data?.chart_data) return [];
    return chartData.data.chart_data.map((item: any) => item.portfolio_indexed_value);
  }, [chartData]);

  const benchmarkData = useMemo(() => {
    if (!chartData?.data?.chart_data) return [];
    return chartData.data.chart_data.map((item: any) => item.benchmark_indexed_value);
  }, [chartData]);

  const getOrCreateTooltip = (
    chart: ChartJS<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>,
  ) => {
    let tooltipEl = chart?.canvas?.parentNode?.querySelector("div");

    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.id = "chartjs-tooltip-indexed";
      tooltipEl.style.opacity = "1";
      tooltipEl.style.pointerEvents = "none";
      tooltipEl.style.position = "absolute";
      tooltipEl.style.zIndex = "1000";
      tooltipEl.style.transform = "translate(-50%, -100%)";
      tooltipEl.style.transition = "all .1s ease";
      chart?.canvas?.parentNode?.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  const externalTooltipHandler = (context: { chart: ChartJS; tooltip: TooltipModel<"line"> }) => {
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = "0";
      return;
    }

    // Set Text
    if (tooltip.body && tooltip.dataPoints.length > 0) {
      const title = tooltip.title[0];
      const parsedDate = parse(title, "MMM d, yyyy, h:mm:ss a", new Date());
      const formattedDate = format(parsedDate, "do MMM yyyy  HH:mm");

      // Get both data points (portfolio and benchmark)
      const portfolioPoint = tooltip.dataPoints.find((point) => point.datasetIndex === 0);
      const benchmarkPoint = tooltip.dataPoints.find((point) => point.datasetIndex === 1);

      const portfolioLabel = isMobile ? "Kamayakya" : "Kamayakya - Stocks";
      const benchmarkOption = BENCHMARK_OPTIONS.find((opt) => opt.value === benchmark);
      const benchmarkLabel = isMobile
        ? benchmarkOption?.label.split(" (")[0] || "NIFTY"
        : benchmarkOption?.label || "Equity smallcap";

      let innerHtml = `
        <div class="relative open_sans flex flex-col items-center h-full min-h-full">
          <div class="flex flex-col h-full w-full bg-white rounded-lg shadow-lg p-2 border border-[#E4E7EC] w-[177px]">
            <div class="text-gray-400 whitespace-nowrap text-4xs mb-2">${formattedDate}</div>
            <div class="flex flex-col gap-y-1">
              ${portfolioPoint
          ? `<div class="font-semibold text-xs text-[#108973] flex flex-row items-center">
                <span class="inline-block w-2 h-2 rounded-full mr-2" style="background-color: #108973;"></span>
                <span class="whitespace-nowrap truncate max-w-[50%] inline-block">${portfolioLabel}</span>: <span class="font-regular text-[#333]">₹${portfolioPoint.formattedValue}</span>
              </div>`
          : ""
        }
              ${benchmarkPoint
          ? `<div class="font-semibold text-xs text-[#F97316]  flex flex-row items-center">
                <span class="inline-block w-2 h-2 rounded-full mr-2" style="background-color: #F97316;"></span>
               <span class="whitespace-nowrap truncate max-w-[50%] inline-block"> ${benchmarkLabel}</span>: <span class="font-regular text-[#333]">₹${benchmarkPoint.formattedValue}</span>
              </div>`
          : ""
        }
            </div>
          </div>
          <svg class="absolute bottom-[-13px]" width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 0H0.5L7.08579 6.58579C7.86684 7.36684 9.13317 7.36684 9.91421 6.58579L16.5 0Z" fill="white"/>
          </svg>
        </div>
      `;

      // Remove old children
      while (tooltipEl.firstChild) {
        tooltipEl.firstChild.remove();
      }

      // Add new children
      tooltipEl.innerHTML = innerHtml;
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Get the chart container's dimensions for proper clamping (viewport coordinates)
    const chartContainer = chart.canvas.parentElement;
    const containerRect = chartContainer?.getBoundingClientRect();
    const containerLeft = containerRect?.left || 0;
    const containerRight = containerRect?.right || window.innerWidth;

    // Get canvas position in viewport coordinates for horizontal clamping
    const canvasRect = chart.canvas.getBoundingClientRect();
    const canvasLeft = canvasRect.left;
    const tooltipViewportX = canvasLeft + tooltip.caretX;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = "1";
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
    tooltipEl.style.top = positionY - 10 + tooltip.caretY + "px";
    const bodyFont = tooltip.options.bodyFont as any;
    if (bodyFont?.string) {
      tooltipEl.style.font = bodyFont.string;
    }
    tooltipEl.style.padding = tooltip.options.padding + "px " + tooltip.options.padding + "px";

    // Clamp tooltip position to prevent overflow
    const tooltipWidth = tooltipEl.offsetWidth || 100;
    const tooltipHeight = tooltipEl.offsetHeight || 50;
    const screenWidth = window.innerWidth;

    // Calculate boundaries (use container for desktop, window for mobile)
    const rightBoundary = isMobile ? screenWidth : containerRight;
    const leftBoundary = isMobile ? 0 : containerLeft;

    // Horizontal clamping in viewport coordinates, then convert back
    const parentRect = chartContainer?.getBoundingClientRect();
    const parentLeft = parentRect?.left || 0;
    let clampedViewportX = tooltipViewportX;

    if (tooltipViewportX - tooltipWidth / 2 < leftBoundary) {
      clampedViewportX = leftBoundary + tooltipWidth / 2 + 10;
      tooltipEl.style.left = (clampedViewportX - parentLeft) + "px";
    } else if (tooltipViewportX + tooltipWidth / 2 > rightBoundary) {
      clampedViewportX = rightBoundary - tooltipWidth / 2 - 10;
      tooltipEl.style.left = (clampedViewportX - parentLeft) + "px";
    }

    // Vertical clamping (original logic)
    let topPos = parseFloat(tooltipEl.style.top);
    if (topPos - tooltipHeight < 0) {
      tooltipEl.style.top = tooltipHeight + 10 + "px";
    }

    // Adjust arrow position to point to caret
    const intendedLeft = positionX + tooltip.caretX;
    const actualLeft = parseFloat(tooltipEl.style.left);
    const shift = actualLeft - intendedLeft;
    const svg = tooltipEl.querySelector("svg");
    if (svg) {
      svg.style.left = `calc(50% - ${shift}px)`;
    }
  };

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      spanGaps: true,
      interaction: {
        intersect: false,
        mode: "index" as const,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
          position: "nearest" as const,
          external: externalTooltipHandler,
        },
      },
      scales: {
        x: {
          type: "timeseries" as const,
          time: {
            unit: "day" as const,
            displayFormats: {
              day: "MMM d",
            },
          },
          ticks: {
            display: true,
            maxTicksLimit: isMobile ? 5 : 8,
            autoSkip: true,
            autoSkipPadding: isMobile ? 10 : 20,
            callback: function (tickValue: any, index: number, ticks: any[]) {
              const date = new Date(tickValue);
              if (timeRange === "1_month" || timeRange === "6_months") {
                return format(date, "dd MMM"); // e.g., 22 Jul
              } else {
                console.log(date)
                return format(date, "MMM ''yy"); // e.g., Nov '25
              }
            },
            font: {
              family: "Open Sans",
              size: 11,
            },
            color: "#667085",
          },
          grid: {
            display: false,
            color: "#E4E7EC",
          },
        },
        y: {
          beginAtZero: false,
          ticks: {
            display: true,
            callback: function (tickValue: any) {
              return `₹${tickValue.toFixed(0)}`;
            },
            font: {
              family: "Open Sans",
              size: 11,
            },
            color: "#667085",
          },
          grid: {
            display: true,
            color: "#F2F4F7",
            drawBorder: false,
          },
        },
      },
    }),
    [isMobile, timeRange],
  );

  const data = useMemo(
    () => ({
      labels: chartLabels,
      datasets: [
        {
          label: "Kamayakya - Stocks",
          data: portfolioData,
          borderColor: "#75CDC5", // Light blue
          backgroundColor: "rgba(96, 165, 250, 0.1)",
          pointStyle: false as const,
          tension: 0.4,
          borderWidth: 2,
          fill: false,
        },
        {
          label: BENCHMARK_OPTIONS.find((opt) => opt.value === benchmark)?.label || "Equity smallcap",
          data: benchmarkData,
          borderColor: "#F97316", // Orange
          backgroundColor: "rgba(249, 115, 22, 0.1)",
          pointStyle: false as const,
          tension: 0.4,
          borderWidth: 2,
          fill: false,
        },
      ],
    }),
    [chartLabels, portfolioData, benchmarkData, benchmark],
  );

  const TIME_RANGE_OPTIONS: { label: string; value: TimeRange }[] = [
    { label: "1M", value: "1_month" },
    { label: "6M", value: "6_months" },
    { label: "1Y", value: "1_year" },
    { label: "2Y", value: "2_year" },
    { label: "Max", value: "maximum" },
  ];

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-[20px] p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between md:mb-6">
          <Skeleton height={32} className=" w-1/3 rounded-[6px]  md:p-2" variant="rectangular" />
          <Skeleton height={32} className=" w-1/4 rounded-[6px]  md:p-2" variant="rectangular" />
        </div>
        <div className="flex items-center space-x-4 md:mb-6">
          <Skeleton height={32} className=" w-1/3 rounded-[6px]  md:p-2" variant="rectangular" />
          <Skeleton height={32} className=" w-1/6 rounded-[6px]  md:p-2" variant="rectangular" />
          <Skeleton height={32} className=" w-1/6 rounded-[6px]  md:p-2" variant="rectangular" />
        </div>
        <Skeleton height={180} className=" w-full rounded-[6px]  md:p-2" variant="rectangular" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white rounded-[20px] p-6 md:p-8 shadow-sm">
        <p className="text-red-500 text-center">Failed to load chart data</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F9FAFB]  md:bg-white  rounded-[20px] max-md:rounded-b-none p-2 px-4 shadow-sm relative z-10 font-open_sans">
      {/* Header with title and time range selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:mb-6 gap-4">
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <h3 className="text-sm md:text-lg font-semibold text-[#475467] flex flex-row items-center mb-0 ">
            <span>Live Performance vs </span>{" "}
            <Select value={benchmark} onValueChange={(value) => setBenchmark(value as Benchmark)}>
              <SelectTrigger className="ml-2 inline-flex h-auto w-auto p-0 border-0 bg-transparent text-sm  md:text-lg text-[#108973] font-semibold shadow-none focus:ring-0 focus:ring-offset-0 hover:bg-transparent data-[state=open]:bg-transparent [&_svg]:text-[#108973] [&_svg]:opacity-100 [&_svg]:stroke-[#108973]">
                <SelectValue className="text-[#108973] ">
                  {BENCHMARK_OPTIONS.find((opt) => opt.value === benchmark)?.label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="w-[250px] md:min-w-[350px] max-w-full overflow-auto">
                {BENCHMARK_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="cursor-pointer py-3">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-sm">{option.label}</span>
                      <span className="text-xs text-gray-500 leading-relaxed">{option.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </h3>
          <div className="bg-[linear-gradient(90deg,#125B54,#12ADB7)] flex flex-row items-center justify-center p-2 px-3 rounded-md gap-x-2">
            <Tooltip
              dialogHeader={""}
              tooltipTrigger={<img height={16} width={16} src="/assets/ph_info-duotone-white.svg" />}
              tooltipContent={
                <div className=" relative">
                  <div className="tooltip-content">
                    <h3 className="tooltip-title font-bold font-open_sans mb-2 text-[12px] text-gray-800">
                      Compound Annual Growth Rate
                    </h3>
                    <p className="tooltip-subtitle font-bold font-open_sans text-[12px]">
                      Our CAGR since start - 22 October 2022.
                    </p>
                    <p className="tooltip-subtitle font-bold text-blue-900 font-open_sans text-[12px]">Purpose:</p>
                    <p className="tooltip-text my-1 text-gray-800 text-[12px] font-open_sans">
                      Shows average yearly growth of an investment.
                    </p>
                    <p className="tooltip-quote italic mb-3 text-gray-600 text-[12px] font-open_sans">
                      Imagine a tree growing a bit more each year.
                      <br />
                      CAGR tells how fast it grows annually on average.
                    </p>
                    <div className="tooltip-formula flex flex-wrap bg-white p-3 rounded mb-4">
                      <p className="font-bold m-0 pt-5 me-5 text-[12px] font-open_sans">CAGR =</p>
                      <div className="formula flex items-center justify-center flex-wrap mt-2">
                        <span className="text-[30px] font-[50] font-open_sans">[</span>
                        <div className="flex items-center mx-2">
                          <div className="flex flex-col items-center">
                            <div className="fraction">
                              <span className="numerator text-[12px] font-open_sans">Ending Value</span>
                              <span className="denominator text-[12px] font-open_sans">Starting Value</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[30px] font-[50] font-open_sans">]</span>
                        <sup className="flex items-center text-[20px] font-[50]">
                          <span className="text-[20px] font-open_sans">[</span>
                          <div className="flex flex-col items-center mx-2">
                            <div className="fraction">
                              <span className="text-[12px] font-open_sans">1</span>
                              <hr className="w-full h-[1px] bg-black mt-2" />
                              <span className="denominator text-[12px] mt-2 font-open_sans">No. of Years</span>
                            </div>
                          </div>
                          <span className="text-[20px] font-open_sans">]</span>
                        </sup>
                        <span className="text-[12px] font-bold ml-2 font-open_sans">-1</span>
                      </div>
                    </div>

                    <div className="tooltip-example bg-gray-50 p-3 rounded mb-4">
                      <p className="example-title font-bold text-[#108973] mb-2 text-[12px] font-open_sans">
                        Example :
                      </p>
                      <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                        <strong>Start Value</strong> ₹100
                      </div>
                      <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                        <strong>End Value after 3 years</strong> ₹150
                      </div>
                      <div className="example-item flex justify-between py-1 border-b border-gray-300 text-[12px] font-open_sans">
                        <strong>Total Returns over 3 years</strong> 50%
                      </div>
                      <div className="example-item flex justify-between py-1 text-[12px] font-open_sans">
                        <strong>CAGR</strong> 14.47%
                      </div>
                    </div>
                    <p className="tooltip-footer mt-4 text-[12px] text-gray-500 font-open_sans">
                      This means, on average, the investment grew about 14.47% each year
                    </p>
                  </div>
                </div>
              }
            />

            <p className="text-white text-sm font-bold">Our CAGR since start: <span className={`${isLoggedIn ? " " : "blur-md"}`}>{isLoggedIn ? chartData?.data?.xirr_percentage : 0}%</span></p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-end max-md:hidden">
          <Tabs
            responsive={true}
            className="dark block"
            tabTriggerClassname={` `}
            variant={TabsVariant.md}
            options={[
              { label: "1M", value: "1_month" },
              { label: "6M", value: "6_months" },
              { label: "1Y", value: "1_year" },
              { label: "2Y", value: "2_year" },
              { label: "Max", value: "maximum" },
            ]}
            setSelectedOption={setTimeRange}
            activeValue={timeRange}
          // defaultOption={"maximum"}
          />
        </div>
      </div>
      <div className="md:flex  md:flex-rows flex-wrap items-center w-full gap-x-[50px] mb-6">
        {chartData?.data && (
          <>
            {isMobile ? (
              <div className="mb-3">
                <Accordion type="single" collapsible>
                  <AccordionItem value="chart-construction">
                    <AccordionTrigger className="text-sm" chevron>
                      How the chart is constructed
                    </AccordionTrigger>
                    <AccordionContent>
                      Our performance line is an equal-weight index (base 100) of all active Buy/Hold calls, updated
                      daily using close-to-close price returns (dividends not included) and removing a stock from the
                      next trading day after our Sell call.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ) : (
              <p className="text-sm text-[#667085] mb-3  flex md:flex-[0.8]">
                Our performance line is an equal-weight index (base 100) of all active Buy/Hold calls, updated daily
                using close-to-close price returns (dividends not included) and removing a stock from the next trading
                day after our Sell call.
              </p>
            )}
          </>
        )}
        <div className="flex-1 flex flex-row items-center sm:gap-x-[50px] overflow-hidden">
          <div className=" max-md:flex-1 max-md:w-full">
            <p className="text-sm text-[#108973] md:font-semibold whitespace-nowrap max-md:truncate max-md:w-1/2 truncate">
              <span className="w-[10px] h-[10px] bg-[#75CDC5] rounded-full inline-block mr-[10px]"></span>KamayaKya
              Stocks
            </p>
            <p className="text-sm text-[#667085] pl-[20px]">
              ₹{portfolioData.length > 0 ? portfolioData[portfolioData.length - 1].toFixed(2) : "0.00"}
            </p>
          </div>
          <div className=" max-md:flex-1 max-md:w-full">
            <p className="text-sm text-[#F97316] md:font-semibold whitespace-nowrap max-md:truncate max-md:w-1/2 truncate">
              <span className="w-[10px] h-[10px] bg-[#F97316] rounded-full inline-block mr-[10px]"></span>
              {BENCHMARK_OPTIONS.find((opt) => opt.value === benchmark)?.label || "Equity smallcap"}
            </p>
            <p className="text-sm text-[#667085] pl-[20px]">
              ₹{benchmarkData.length > 0 ? benchmarkData[benchmarkData.length - 1].toFixed(2) : "0.00"}
            </p>
          </div>
        </div>
      </div>
      {/* Chart Container */}
      <div className="w-full" style={{ height: isMobile ? "300px" : "217px" }}>
        <Line options={chartOptions} data={data} />
      </div>
      <div className="flex items-center justify-center my-2 md:hidden">
        <Tabs
          responsive={true}
          className="dark block"
          tabTriggerClassname=""
          variant={TabsVariant.md}
          options={TIME_RANGE_OPTIONS}
          setSelectedOption={(value) => {
            setTimeRange(value as TimeRange);
          }}
          activeValue={timeRange}
          defaultOption={timeRange}
        />
      </div>
      {/* Disclaimer */}
      <p className="text-xs text-[#667085] mt-4">
        Note: Live performance includes recommendation changes (adds/exits). This is a model index built from our
        published recommendations and is shown for information and transparency only. It is not an assurance or promise
        of returns and should not be treated as an offer, solicitation, or guarantee. Actual investor returns may differ
        due to execution timing, costs/taxes, liquidity, and position sizing.
      </p>

      {/* Lock Overlay for Non-logged in users */}
      {!isLoggedIn ? (
        <div
          onClick={handleLogin}
          className="h-[88%] w-full absolute flex items-center justify-center bottom-0 left-0 z-40 backdrop-blur-sm"
        >
          <div className="group/lock cursor-pointer shadow-[0px_0px_40px_-9px_rgba(19,135,137,0.46),0px_4px_40px_12px_rgba(118,237,223,0.05)] overflow-hidden flex items-center gap-x-[10px] transition-[width] duration-300 h-[56px] w-[56px] hover:w-[234px] bg-[rgba(255,255,255,1)] rounded-[10px] border border-brand-300">
            <img
              height={36}
              width={36}
              className="object-contain ml-[10px] h-9 w-9"
              src="/assets/noto_locked.png"
              alt="lock"
            />
            <p className="text-gray-950 font-semibold whitespace-nowrap opacity-0 group-hover/lock:opacity-100 transition-all duration-300">
              Unlock Now for Free
            </p>
          </div>
        </div>

      ) : null}
    </div>
  );
}
