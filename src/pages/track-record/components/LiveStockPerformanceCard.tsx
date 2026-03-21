import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  // Tooltip as ChartTooltip,
  // Legend,
  // CategoryScale,
  // LinearScale,
  // PointElement,
  ArcElement,
} from "chart.js";
import AuthContext from "@/components/AuthContext";
import { INewRecommendation, IStockPerformace } from "./TrackRecordHeroCard";
import TrackRecordHeroCardNewChip from "./TrackRecordHeroCardNewChip";
ChartJS.register({
  // ChartTooltip,
  // Legend,
  // CategoryScale,
  // LinearScale,
  // PointElement,
  ArcElement,
});

let LEGENDS = [
  { label: "High (>15%)", value: "", iconColor: "bg-[rgba(18,183,106,1)]" },
  { label: "Medium (<15% to <-15%)", value: "", iconColor: "bg-[rgba(208,213,221,1)]" },
  { label: "Low (<-15%)", value: "", iconColor: "bg-[rgba(240,68,56,1)]" },
];

const getIconColor = (label: string, type: string) => {
  switch (label) {
    case "high":
      return "bg-[rgba(18,183,106,1)]";
    case "medium":
      return type === "EXIT" ? "bg-[rgba(240,68,56,1)]" : "bg-[rgba(208,213,221,1)]";
    case "low":
      return "bg-[rgba(240,68,56,1)]";
    default:
      return "bg-transparent";
  }
};

const Legends = ({
  label,
  value,
  iconColor,
  type,
}: {
  label: string;
  value: number;
  iconColor: string;
  type: string;
}) => {
  const { isLoggedIn } = useContext(AuthContext);
  const isBlur = !isLoggedIn;
  let legend =
    label === "high" && type === "LIVE"
      ? "High (>15%)"
      : label === "medium" && type === "LIVE"
        ? "Medium (15% to -15%)"
        : label === "low" && type === "LIVE"
          ? "Low (<-15%)"
          : label === "high" && type === "EXIT"
            ? "Profit Exits"
            : label === "low" && type === "EXIT"
              ? "Loss Exits"
              : "";

  return (
    <div className="flex items-baseline ">
      <div className=" flex items-baseline gap-x-1 min-w-0">
        <div className={` h-2 w-2 rounded-full  ${iconColor}`}></div>
        <p className=" text-2xs text-[rgba(102,112,133,1)] line-clamp-1  ">{legend}</p>
      </div>
      {isBlur ? (
        <div className=" w-[23px] h-[14px] bg-[rgba(241,241,241,1)] rounded-full ml-auto"></div>
      ) : (
        <p className=" ml-auto text-sm font-bold text-[rgba(30,27,57,1)]">{value}</p>
      )}
    </div>
  );
};

export function LiveStockPerformanceCard({ type, performance, newRecommendation, recommendationLabel, className, hideDonut,disableExternalLabel }: { type: string; performance: IStockPerformace; newRecommendation?: INewRecommendation[]; recommendationLabel?: string; className?: string; hideDonut?: boolean; disableExternalLabel?: boolean}) {
  const { isLoggedIn } = useContext(AuthContext);
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "65%",
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  const label = type === "LIVE" ? "Live Stock Performance" : "Exited Stock Performance ";
  const chartData = isLoggedIn ? Object.entries(performance || {}) : Object.entries({ high: 30, medium: 0, low: 2 });
  // type === "EXIT"
  // ? chartData.map((item) => {
  //     if (item[0] === "high") {
  //       item[1] = item[1] + chartData[0][1];
  //     }
  //     if (item[0] === "medium") {
  //       item[1] = 0;
  //     }
  //     return item[1];
  //   })
  // :
  const data = {
    datasets: [
      {
        label: "# of Votes",
        data:
          chartData.map((item) => item[1]),
        borderWidth: 1,
        backgroundColor: [
          "rgba(18, 183, 106, 1)",
          type === "EXIT" && isLoggedIn ? "rgba(240, 68, 56, 1)" : "rgba(208, 213, 221, 1)",
          "rgba(240, 68, 56, 1)",
        ],
      },
    ],
  };

  return (
    <div className={` p-4 pt-3 bg-white rounded-xl w-full ${className}`}>
      <div className="flex items-center">
        <div className={` p-1  ${disableExternalLabel ? "block": "ml-1 hidden md:block"} shrink-0`}>
          {type === "LIVE" ? (
            <img height={16} width={16} src="/assets/entry point.svg" alt="entry-marker" />
          ) : (
            <img height={16} width={16} src="/assets/exit_icon.svg" alt="exit-marker" />
          )}
        </div>
        <p className={` text-sm font-semibold text-left whitespace-nowrap  w-full flex items-center ${disableExternalLabel ? "max-w-[100%]": "max-w-[55%]"}`}>{label}{"  "} <span className={`text-brand-500 ${disableExternalLabel ? "inline-block": "hidden md:inline-block"} whitespace-nowrap truncate ml-1`}>{" "}({recommendationLabel})</span></p>
        <div className="ml-auto max-md:hidden">
          {/* <TrackRecordHeroCardNewChip type={type} newRecommendation={newRecommendation} /> */}
        </div>
      </div>
      <div className=" mt-4 flex items-center justify-between gap-x-3">
        <div className=" h-[110px] max-w-full">
          {!hideDonut ? <Doughnut data={data} options={options} /> : null}
        </div>
        <div className=" h-full flex flex-col gap-y-3 w-full">
          {chartData
            .filter((legend) => (type === "EXIT" && legend[0] !== "medium" ? true : type === "LIVE"))
            .map((legend, index) => (
              <Legends
                key={legend[0]}
                type={type}
                label={legend[0]}
                iconColor={getIconColor(legend[0], type)}
                value={legend[1]}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export function LiveStockPerformanceCardLanding({ type, performance, hideDonut, className }: { type: string; performance: IStockPerformace; hideDonut?: boolean; className?: string }) {
  const { isLoggedIn } = useContext(AuthContext);
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "65%",
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  const label = type === "LIVE" ? "Live Stock Performance" : "Exited Stock Performance ";
  const chartData = isLoggedIn ? Object.entries(performance || {}) : Object.entries({ high: 30, medium: 0, low: 2 });
  // type === "EXIT"
  // ? chartData.map((item) => {
  //     if (item[0] === "high") {
  //       item[1] = item[1] + chartData[0][1];
  //     }
  //     if (item[0] === "medium") {
  //       item[1] = 0;
  //     }
  //     return item[1];
  //   })
  // :
  const data = {
    datasets: [
      {
        label: "# of Votes",
        data:
          chartData.map((item) => item[1]),
        borderWidth: 1,
        backgroundColor: [
          "rgba(18, 183, 106, 1)",
          type === "EXIT" && isLoggedIn ? "rgba(240, 68, 56, 1)" : "rgba(208, 213, 221, 1)",
          "rgba(240, 68, 56, 1)",
        ],
      },
    ],
  };

  return (
    <div className={` p-4 pt-3 bg-white rounded-xl w-full ${className}`}>
      <p className=" text-sm font-semibold">{label}</p>
      <div className=" mt-4 flex items-center justify-between gap-x-3">
        <div className=" h-[110px] max-w-full">
          {!hideDonut ? <Doughnut data={data} options={options} /> : null}
        </div>
        <div className=" h-full flex flex-col gap-y-3 w-full">
          {chartData
            .filter((legend) => (type === "EXIT" && legend[0] !== "medium" ? true : type === "LIVE"))
            .map((legend, index) => (
              <Legends
                key={legend[0]}
                type={type}
                label={legend[0]}
                iconColor={getIconColor(legend[0], type)}
                value={legend[1]}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default LiveStockPerformanceCard;
