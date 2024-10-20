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
import { IStockPerformace } from "./TrackRecordHeroCard";
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
  { label: "Medium (<15% to >-15%)", value: "", iconColor: "bg-[rgba(208,213,221,1)]" },
  { label: "Low (>-15%)", value: "", iconColor: "bg-[rgba(240,68,56,1)]" },
];

const getIconColor = (label: string) => {
  switch (label) {
    case "high":
      return "bg-[rgba(18,183,106,1)]";
    case "medium":
      return "bg-[rgba(208,213,221,1)]";
    case "low":
      return "bg-[rgba(240,68,56,1)]";
    default:
      return "bg-transparent";
  }
};

const Legends = ({ label, value, iconColor, type }: { label: string; value: number; iconColor: string;type:string; }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const isBlur = !isLoggedIn;
  let legend = label === "high" && type === "LIVE" ? "High (>15%)" : label === "medium" && type === "LIVE" ? "Medium (<15% to >-15%)" :label === "low" && type === "LIVE" ? "Low (>-15%)" : label === "high" && type === "EXIT" ? "Profit Exits (>15%)" : label === "low" && type === "EXIT" ? "Loss Exits (>-15%)":""
  
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

export function LiveStockPerformanceCard({ type, performance }: { type: string; performance: IStockPerformace }) {
  const { isLoggedIn } = useContext(AuthContext);
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "65%",
  };

  const label = type === "LIVE" ? "Live Stock Performance" : "Exited Stock Performance ";
  const chartData = isLoggedIn ? Object.entries(performance || {}) : Object.entries({ high: 19, medium: 8, low: 2 });
  const data = {
    datasets: [
      {
        label: "# of Votes",
        data: chartData.map((item) => item[1]),
        borderWidth: 1,
        backgroundColor: ["rgba(18, 183, 106, 1)", "rgba(208, 213, 221, 1)", "rgba(240, 68, 56, 1)"],
      },
    ],
  };

  return (
    <div className=" p-4 pt-3 bg-white rounded-xl w-full">
      <p className=" text-sm font-semibold">{label}</p>
      <div className=" mt-4 flex items-center justify-between gap-x-3">
        <div className=" h-[110px] max-w-full">
          <Doughnut data={data} options={options} />
        </div>
        <div className=" h-full flex flex-col gap-y-3 w-full">
          {chartData.map((legend, index) => (
            <Legends type={type} label={legend[0]} iconColor={getIconColor(legend[0])} value={legend[1]} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LiveStockPerformanceCard;
