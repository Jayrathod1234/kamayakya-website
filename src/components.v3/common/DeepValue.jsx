import { useState } from "react";

const DeepValue = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-[6px] py-[2px] rounded-2xl border border-[#EDF0F5]  flex gap-[4px] items-center cursor-pointer"
      >
        <img src="/assets/ic_round-diamond.svg" alt="" className="w-3.5" />
        <p className="text-[10px] font-semibold text-[#344054] flex gap-[3px]">
          {selectedOption ? selectedOption.label : "Deep Value"}
          <span className="text-[#108973] font-bold">+3</span>
        </p>
        <img src="/assets/chevron-down.svg" alt="" className="w-4" />
      </div>
      {isOpen && (
        <>
          <div className="absolute top-5 left-16 z-[1] shadow">
            <img
              src="/assets/stock-details/div.png"
              alt=""
              srcset=""
              className="w-4"
            />
          </div>
          <ul className="absolute p-3 w-[147px] gap-3 bg-white border border-[#EDF0F5] rounded-lg shadow m-0 mt-2 z-[2]">
            <li className="flex items-center gap-2 pb-3 text-2xs text-[#1D2939] font-medium font-open_sans m-0 cursor-pointer">
              <img src="/assets/stock-details/Pricing.svg" alt="" />
              Deep Value
            </li>
            <li className="flex items-center gap-2 pb-3 text-2xs text-[#1D2939] font-medium font-open_sans m-0 cursor-pointer">
              <img src="/assets/stock-details/Pricing (1).svg" alt="" />
              Special Situation
            </li>
            <li className="flex items-center gap-2 pb-3 text-2xs text-[#1D2939] font-medium font-open_sans m-0 cursor-pointer">
              <img src="/assets/stock-details/Pricing (2).svg" alt="" />
              Market Leader
            </li>
            <li className="flex items-center gap-2 text-2xs text-[#1D2939] font-medium font-open_sans m-0 cursor-pointer">
              <img src="/assets/stock-details/Pricing (3).svg" alt="" />
              Deep Value
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default DeepValue;
