import { useState } from "react";
import { Tooltip } from "@mui/material";
const DeepValue = ({ stock_tags }) => {
  const [isOpen, setIsOpen] = useState(false);
  const stock_tags_count = stock_tags?.length;
  return (
    <div className="relative inline-block min-w-0">
      <div
        onClick={() => {
          stock_tags_count > 1 ? setIsOpen(!isOpen) : "";
        }}
        className={`py-[2px] sm:pr-[8px] pr-1 sm:pl-[6px] pl-1 rounded-2xl border border-[#EDF0F5] flex sm:gap-1 gap-1 items-center ${stock_tags_count > 1 ? "cursor-pointer":"cursor-default"}  `}
      >
        <img src={stock_tags?.[0]?.image} alt="" className="w-4 h-4 object-contain" />
        <Tooltip title={stock_tags?.[0]?.name ?? ""}>
        <p className="text-[12px] font-semibold text-[#344054] font-open_sans truncate">
          {/* {stock_tags?.[0]?.name?.length > 4
            ? `${stock_tags[0].name.slice(0, 4)}...`
            : stock_tags?.[0]?.name} */}
          {stock_tags?.[0]?.name}
        </p>
        </Tooltip>
        {stock_tags_count > 1 && (
          <p className="text-[#108973] font-bold flex text-[12px]">
            <span>+</span> {stock_tags_count - 1}
          </p>
        )}
        {stock_tags_count > 1 && (
          <img src="/assets/chevron-down.svg" alt="" className="w-4" />
        )}
      </div>
      {stock_tags_count > 1 && isOpen && (
        <>
          <div className="absolute top-5 left-8 z-[1] shadow">
            <img
              src="/assets/stock-details/div.png"
              alt=""
              srcset=""
              className="w-4"
            />
          </div>
          <ul className="absolute p-3 w-[175px] gap-3 bg-white border border-[#EDF0F5] rounded-lg shadow m-0 mt-1 z-[2] right-[-18%]">
            {stock_tags.map((value, index) => {
              return (
                <li
                  className={`flex items-center gap-2 text-2xs text-[#1D2939] font-medium font-open_sans m-0 cursor-pointer ${
                    stock_tags_count - 1 != index ? `pb-3` : ``
                  }`}
                >
                  <img src={value.image} className="h-4 w-4" alt="" />
                  {value.name}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default DeepValue;
