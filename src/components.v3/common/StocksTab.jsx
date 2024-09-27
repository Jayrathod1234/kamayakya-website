import React, { useState } from "react";
import { useStockPicks } from "@/contexts/StockPicksContext";

export default function StocksTab() {
  const {
    total_mainboard_stocks,
    total_sme_stocks,
    handleSebiBoardTypeChange,
  } = useStockPicks();
  const [value, setValue] = useState(0);

  const handleChange = (index) => {
    setValue(index);
    handleSebiBoardTypeChange(index === 0 ? "mainboard" : "sme");
  };

  return (
    <div className="flex justify-center items-center w-full">
      
    </div>
  );
}

// {/* <div className="relative bg-white text-[#475467] rounded-[61px] p-1.5 shadow-md flex space-x-2 ">
// {/* Background sliding element */}
// <div className="relative w-fit flex justify-center gap-[0.3rem]">
//   <div
//     className={`absolute top-0 bottom-0 left-0 w-1/2 rounded-[47px] bg-[#101115] transition-transform duration-300 ease-in-out ${
//       value === 0
//         ? "transform translate-x-0"
//         : "transform translate-x-full"
//     }`}
//   ></div>
//   <button
//     onClick={() => handleChange(0)}
//     className={`relative z-10 text-sm font-semibold font-open_sans rounded-[47px] py-2 px-10 min-h-[40px] min-w-[120px] w-[168px] flex items-center justify-center transition-all duration-300 ease-in-out ${
//       value === 0
//         ? "text-white bg-[#101115]"
//         : "text-[#475467] bg-transparent hover:text-[#101115] hover:bg-[#E4E7EB]"
//     }`}
//   >
//     <div className="flex flex-col items-center text-center">
//       <span className="font-[600] text-[16px] leading-[24px] text-nowrap">
//         Main Board
//       </span>
//       <span className="text-[11px] font-bold">
//         {total_mainboard_stocks || 0} Stocks
//       </span>
//     </div>
//   </button>
//   <button
//     onClick={() => handleChange(1)}
//     className={`relative z-10 text-sm font-semibold font-open_sans rounded-[47px] py-2 px-10 min-h-[40px] min-w-[120px] w-[168px] flex items-center justify-center transition-all duration-300 ease-in-out ${
//       value === 1
//         ? "text-white bg-[#101115]"
//         : "text-[#475467] bg-transparent hover:text-[#101115] hover:bg-[#E4E7EB]  "
//     }`}
//   >
//     <div className="flex flex-col items-center text-center">
//       <span className="font-[600] text-[16px] leading-[24px] text-nowrap">
//         SME Board
//       </span>
//       <span className="text-[11px] font-bold">
//         {total_sme_stocks || 0} Stocks
//       </span>
//     </div>
//   </button>
// </div>
// </div> */}