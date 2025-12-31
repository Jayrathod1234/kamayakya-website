import React, { useState, useMemo } from "react";
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
import { useMediaQuery } from "@mui/material";
import { Tabs, TabsVariant } from "@/components.v2/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components.v2/ui/select";

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

const TIME_RANGE_OPTIONS: { label: string; value: TimeRange }[] = [
  { label: "1M", value: "1_month" },
  { label: "6M", value: "6_months" },
  { label: "1Y", value: "1_year" },
  { label: "2Y", value: "2_year" },
  { label: "Max", value: "maximum" },
];

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
  const [timeRange, setTimeRange] = useState<TimeRange>("6_months");
  const [benchmark, setBenchmark] = useState<Benchmark>("smallcap250");
  const isMobile = useMediaQuery("(max-width:600px)");

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
    chart: ChartJS<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>
  ) => {
    let tooltipEl = chart?.canvas?.parentNode?.querySelector("div");

    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.id = "chartjs-tooltip-indexed";
      tooltipEl.style.opacity = "1";
      tooltipEl.style.pointerEvents = "none";
      tooltipEl.style.position = "absolute";
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

      let innerHtml = `
        <div class="relative open_sans flex flex-col items-center h-full min-h-full">
          <div class="flex flex-col h-full w-full bg-white rounded-lg shadow-lg p-3 border border-[#E4E7EC]">
            <div class="text-gray-400 whitespace-nowrap text-4xs mb-2">${formattedDate}</div>
            <div class="flex flex-col gap-y-1">
              ${
                portfolioPoint
                  ? `<div class="font-bold text-xs text-gray-950 whitespace-nowrap">
                <span class="inline-block w-2 h-2 rounded-full mr-2" style="background-color: #75CDC5;"></span>
                Kamayakya - Value bucket: ₹${portfolioPoint.formattedValue}
              </div>`
                  : ""
              }
              ${
                benchmarkPoint
                  ? `<div class="font-bold text-xs text-gray-950 whitespace-nowrap">
                <span class="inline-block w-2 h-2 rounded-full mr-2" style="background-color: #FEB359;"></span>
                ${BENCHMARK_OPTIONS.find((opt) => opt.value === benchmark)?.label || "Equity smallcap"}: ₹${
                      benchmarkPoint.formattedValue
                    }
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

    // Display, position, and set styles for font
    tooltipEl.style.opacity = "1";
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
    tooltipEl.style.top = positionY - 10 + tooltip.caretY + "px";
    const bodyFont = tooltip.options.bodyFont as any;
    if (bodyFont?.string) {
      tooltipEl.style.font = bodyFont.string;
    }
    tooltipEl.style.padding = tooltip.options.padding + "px " + tooltip.options.padding + "px";
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
              return format(date, "MMM d");
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
    [isMobile]
  );

  const data = useMemo(
    () => ({
      labels: chartLabels,
      datasets: [
        {
          label: "Kamayakya - Value bucket",
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
    [chartLabels, portfolioData, benchmarkData, benchmark]
  );

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-[20px] p-6 md:p-8 shadow-sm">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
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
    <div className="w-full bg-white rounded-[20px] p-6 md:p-8 shadow-sm relative z-10 font-open_sans">
      {/* Header with title and time range selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex flex-row items-center gap-x-2">
          <h3 className="text-lg font-semibold text-[#475467] flex flex-row items-center ">
            <span>Live Performance vs </span>{" "}
            <Select value={benchmark} onValueChange={(value) => setBenchmark(value as Benchmark)}>
              <SelectTrigger className="inline-flex h-auto w-auto p-0 border-0 bg-transparent  text-lg text-[#108973] font-semibold shadow-none focus:ring-0 focus:ring-offset-0 hover:bg-transparent data-[state=open]:bg-transparent [&_svg]:text-[#108973] [&_svg]:opacity-100 [&_svg]:stroke-[#108973]">
                <SelectValue className="text-[#108973] ">
                  {BENCHMARK_OPTIONS.find((opt) => opt.value === benchmark)?.label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="min-w-[350px]">
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
          <div className="bg-[linear-gradient(90deg,#125B54,#12ADB7)] flex flex-row items-center justify-center p-2 rounded-md">
            <p className="text-white text-sm font-bold">CAGR: {chartData?.data?.xirr_percentage}%</p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-end">
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
          />
        </div>
      </div>
      <div className="flex flex-rows flex-wrap items-center w-full gap-x-[50px]">
        {chartData?.data && (
          <p className="text-sm text-[#667085] md:flex-[0.8]">
            If you had invested an equal amount in all our recommended stocks since{" "}
            {format(parseISO(chartData.data.start_date), "dd MMM yyyy")} (indexed to 100), that basket would be:
          </p>
        )}
        <div className="flex-1 flex flex-row items-center gap-x-[50px]">
          <div>
            <p className="text-sm text-[#108973] md:font-semibold whitespace-nowrap">
              <span className="w-[10px] h-[10px] bg-[#75CDC5] rounded-full inline-block mr-[10px]"></span>KamayaKya -
              Value bucket
            </p>
            <p className="text-sm text-[#667085] pl-[20px]">
              ₹{portfolioData.length > 0 ? portfolioData[portfolioData.length - 1].toFixed(2) : "0.00"}
            </p>
          </div>
          <div>
            <p className="text-sm text-[#FEB359] md:font-semibold whitespace-nowrap truncate">
              <span className="w-[10px] h-[10px] bg-[#FEB359] rounded-full inline-block mr-[10px]"></span>
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

      {/* Disclaimer */}
      <p className="text-xs text-[#667085] mt-4">
        Note: Live performance includes rebalances. It is a tool to communicate factual & verifiable returns on behalf
        of the smallcase creator. It should not be considered as an advertisement, promotion or claim.
      </p>
    </div>
  );
}
