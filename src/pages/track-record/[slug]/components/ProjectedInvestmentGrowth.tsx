import React from "react";

export default function ProjectedInvestmentGrowth({ upside_left, upside_left_time, action }) {
  
  
  const getGradient = (action)=>{
    switch(action){
      case 'BUY': return "bg-[linear-gradient(278.46deg,#0079EF_5.62%,rgba(0,121,239,0.19)_38.36%,#FFFFFF_54.14%)]";
      case 'SELL':return "bg-[linear-gradient(278.46deg,#FA86B4_5.62%,rgba(248,177,205,0.19)_38.36%,#FFFFFF_54.14%)]";
      case 'HOLD':return "bg-[linear-gradient(278.46deg,#FEC078_5.62%,rgba(254,240,107,0.19)_38.36%,#FFFFFF_54.14%)]";
    }
  }

  const getBgColor = (action)=>{
    switch(action){
      case 'BUY': return "bg-[#EFF7FF] [--text-color:#0079EF]";
      case 'SELL':return "bg-[#FFF5F9] [--text-color:#FD577B]";
      case 'HOLD':return "bg-[#FFFCF5]  [--text-color:#F79009]";
    }
  }

  let containerGradient = getGradient(action)
  let bgColor = getBgColor(action)
  return (
    <div className={`p-[1px] ${containerGradient}  rounded-md overflow-hidden`}>
      <div className={` ${bgColor}  p-4 text-center md:text-center text-[#344054] text-sm md:text-base  font-normal gap-1 rounded-[4.5px] rounded-l-md`}>
        <span className="text-[var(--text-color)] text-sm md:text-base lg:text-sm font-bold">₹1,00,000 </span>
        invested at current market price (CMP) can become{" "}
        <span className="text-[var(--text-color)] text-sm md:text-base lg:text-sm font-bold whitespace-nowrap">
          ₹{(100000 + 1000 * upside_left).toLocaleString("hi")} Lakh
        </span>{" "}
        likely within {upside_left_time}
      </div>
    </div>
  );
}
