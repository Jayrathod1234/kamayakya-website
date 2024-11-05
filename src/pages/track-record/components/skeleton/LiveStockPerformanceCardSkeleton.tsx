import React from 'react'
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
} from "chart.js";
import { Skeleton } from '@mui/material';

ChartJS.register({
  ArcElement,
});

let LEGENDS = [
  { label: "High (>15%)", value: "", iconColor: "bg-[rgba(18,183,106,1)]" },
  { label: "Medium (<15% to >-15%)", value: "", iconColor: "bg-[rgba(208,213,221,1)]" },
  { label: "Low (>-15%)", value: "", iconColor: "bg-[rgba(240,68,56,1)]" },
];

export default function LiveStockPerformanceCardSkeleton() {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "65%",
  };

  
  const data = {
    datasets: [
      {
        label: "",
        data: [25,40,30],
        borderWidth: 1,
        backgroundColor: ["rgba(18, 183, 106, 1)", "rgba(208, 213, 221, 1)", "rgba(240, 68, 56, 1)",],
      },
    ],
  };
  // console.log(chartLabel,chartValue,Object.entries(performance))
  const Legends = ({ label, iconColor }: { label: string;  iconColor: string }) => {
    
    return (
      <div className="flex items-center ">
        <div className=" flex items-center gap-x-1">
          <div className={` h-2 w-2 rounded-full  ${iconColor}`}></div>
          <Skeleton height={12} className=' w-9'/>
          {/* <p className=" text-2xs text-[rgba(102,112,133,1)] ">{label}</p> */}
        </div>
       
          <Skeleton height={14} className=" w-[23px] rounded-full ml-auto"/>
       
      </div>
    );
  };

  return (
    <div className=" p-4 pt-3 bg-white rounded-xl w-full">
      
      <Skeleton height={14} className=' w-10' />
      <div className=" mt-4 flex items-center justify-between gap-x-3">
        <div className=" h-[110px] max-w-full">
          <Doughnut data={data} options={options} />
        </div>
        <div className=" h-full flex flex-col gap-y-3 w-full">
          {LEGENDS.map((legend, index) => (
            <Legends key={legend.label} label={legend.label} iconColor={legend.iconColor}  />
          ))}
        </div>
      </div>
    </div>
  );
}
