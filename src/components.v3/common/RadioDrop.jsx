import { useState } from "react";

const RadioDrop = ({ options, onSelect }) => {
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
        className="flex items-center gap-2 w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight cursor-pointer"
      >
        return
        <span>{selectedOption ? selectedOption.label : "Sector"}</span>
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

export default RadioDrop;
