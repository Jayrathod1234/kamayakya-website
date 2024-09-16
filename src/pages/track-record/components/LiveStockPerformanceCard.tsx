import React from "react";
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
ChartJS.register({
  // ChartTooltip,
  // Legend,
  // CategoryScale,
  // LinearScale,
  // PointElement,
  ArcElement,
});

let LEGENDS = [
  { label: "High (>15%)", value: "",iconColor:'bg-[rgba(18,183,106,1)]' },
  { label: "Medium (<15% to >-15%)", value: "",iconColor:'bg-[rgba(208,213,221,1)]' },
  { label: "Low (>-15%)", value: "",iconColor:'bg-[rgba(240,68,56,1)]' },
];

const Legends = ({ label, value,iconColor,isBlur=true }: { label: string; value: number;iconColor:string;isBlur:boolean }) => {
  return (
    <div className="flex items-baseline ">
      <div className=" flex items-baseline gap-x-1">
        <div className={` h-2 w-2 rounded-full  ${iconColor}`}></div>
        <p className=" text-2xs text-[rgba(102,112,133,1)] ">{label}</p>
      </div>
      {isBlur ? <div className=" w-[23px] h-[14px] bg-[rgba(241,241,241,1)] rounded-full ml-auto"></div> :<p className=" ml-auto text-sm font-bold text-[rgba(30,27,57,1)]">{value}</p>}
      
    </div>
  );
};

export function LiveStockPerformanceCard() {
  const data = {
    datasets: [
      {
        label: "# of Votes",
        data: [ 19,12, 3],
        borderWidth: 1,
        backgroundColor: ["rgba(18, 183, 106, 1)", "rgba(240, 68, 56, 1)", "rgba(208, 213, 221, 1)"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "65%",
  };

  return (
    <div className=" p-4 pt-3 bg-white rounded-xl w-full">
      <p className=" text-sm font-semibold">Live Stock Performance </p>
      <div className=" mt-4 flex items-center justify-between gap-x-3">
        <div className=" h-[110px] max-w-full">
          <Doughnut data={data} options={options} />
        </div>
        <div className=" h-full flex flex-col gap-y-3 w-full">
         {LEGENDS.map((legend,index)=><Legends label={legend.label} iconColor={legend.iconColor} value={data.datasets[0].data[index]}/>)}
        </div>
      </div>
    </div>
  );
}
