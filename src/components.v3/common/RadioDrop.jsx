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
    <div className="relative inline-block w-64">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 w-full bg-brand-100 border border-[#ADDFDB] hover:border-[#ADDFDB] pr-2.5 pl-3.5 py-1.5 rounded-md  leading-tight cursor-pointer  h-12 shadow-3xs "
      >
        <div className="flex items-center gap-1">
          <img src="/assets/mi_sort.svg" alt="" srcset="" />
          <span className="text-md font-medium text-gray-950 font-open_sans">
            Upside Left:
          </span>
          <p className="text-md font-medium text-gray-950 font-open_sans">
            {selectedOption ? selectedOption.label : "High to Low"}
          </p>
        </div>
        <img src="/assets/down-arrow1.svg" alt="" className="w-4 h-4" />
      </div>
      {isOpen && (
        <ul className="absolute z-[999] w-[276px] bg-white border border-gray-100 rounded-md shadow mt-1 p-2 m-0 " >
          <p className="py-1 pl-2.5 text-[#98A2B3]">Upside Left</p>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-2.5 py-2 hover:bg-gray-200 cursor-pointer flex items-center justify-between gap-2"
            >
              <img src={option.icon} alt="" srcset="" />
              <span className="w-[180px] text-left">{option.label}</span>
              <label htmlFor="">
                <input type="radio" className="radiobtn text-right" />
              </label>
            </li>
          ))}
        </ul>

      )}
    </div>
  );
};

export default RadioDrop;
