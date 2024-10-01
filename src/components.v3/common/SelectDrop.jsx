import { useState } from "react";

const SelectDrop = ({ options, onSelect }) => {
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
        className="flex items-center gap-2 w-full bg-white border border-gray-200 hover: py-2.5 pr-3 pl-4 rounded shadow-3xs leading-tight cursor-pointer"
      >
        <span className="font-open_sans text-sm text-gray-800 font-medium bg-black">
          {selectedOption ? selectedOption.label : "Sector"}
        </span>
        <img src="/assets/down-arrow1.svg" alt="" className="w-4 h-4" />
      </div>
      {isOpen && (
        <ul className="absolute z-[999] w-64 bg-white border border-gray-300 rounded shadow mt-1">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDrop;
