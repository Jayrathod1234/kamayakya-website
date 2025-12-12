import { format, parse } from "date-fns";
import React, { useEffect, useState, useMemo, useCallback } from "react";
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
import { IStockPrices } from "@/types";
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

// Move formatData outside component to prevent recreation
const formatData = (item: any) => {
  const dateTimeString = `${item.date} ${item.time}`;
  const parsedDate = parse(dateTimeString, "yyyy-MM-dd HH:mm:ss", new Date());
  const formattedDate = format(parsedDate, "yyyy-MM-dd HH:mm:ss");
  return formattedDate;
};

// Static chart options to prevent recreation on every render
const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      type: "timeseries" as const,
      display: false,
    },
    y: {
      display: false,
    },
  },
};

function TopGainerLoserChart({
  stock_live_prices,
  entry_price,
  start_date,
}: {
  stock_live_prices: IStockPrices[];
  entry_price?: string;
  start_date?: string;
}) {
  // Memoize annotation to prevent recreation unless entry_price changes
  const markerAnnotation = useMemo(() => {
    if (!entry_price) return {};

    return {
      entryLine: {
        type: "line" as const,
        borderColor: "#EDF0F5",
        borderWidth: 1,
        borderDash: [2, 2],
        scaleID: "y",
        value: entry_price,
      },
    };
  }, [entry_price]);

  // Memoize chart options with annotations
  const chartOptions = useMemo(
    () => ({
      ...CHART_OPTIONS,
      plugins: {
        ...CHART_OPTIONS.plugins,
        annotation: {
          clip: false,
          common: {
            drawTime: "afterDraw" as const,
          },
          annotations: markerAnnotation,
        },
      },
    }),
    [markerAnnotation]
  );

  // Memoize labels calculation (expensive date parsing)
  const chartLabels = useMemo(
    () =>
      stock_live_prices
        .filter((x) => x && x.date)
        .map((x) => {
          const date = formatData(x);
          return new Date(date).getTime();
        }),
    [stock_live_prices]
  );

  // Memoize dataset calculation
  const chartData = useMemo(
    () => stock_live_prices.filter((row) => row && row.price).map((row) => row?.price),
    [stock_live_prices]
  );

  // Memoize complete chart data object
  const data = useMemo(
    () => ({
      labels: chartLabels,
      datasets: [
        {
          fill: false,
          data: chartData,
          borderColor: "#00645A",
          pointStyle: false as const,
          tension: 0,
          borderWidth: 1,
        },
      ],
    }),
    [chartLabels, chartData]
  );

  return <Line className="" options={chartOptions} data={data} />;
}

// Wrap in React.memo with custom comparison for better performance
export default React.memo(TopGainerLoserChart, (prevProps, nextProps) => {
  // Only re-render if these specific props change
  return (
    prevProps.entry_price === nextProps.entry_price &&
    prevProps.start_date === nextProps.start_date &&
    prevProps.stock_live_prices === nextProps.stock_live_prices
  );
});
