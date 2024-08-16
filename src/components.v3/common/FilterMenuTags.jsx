import React, { useState } from "react";

const FilterMenuTags = () => {
  const originalButtons = [
    { id: 1, label: "Most Recent", icon: "/assets/watch.svg" },
    { id: 2, label: "Value Pick", icon: "/assets/Pricing.svg" },
    { id: 3, label: "Market Leadership", icon: "/assets/leader.svg" },
    { id: 4, label: "Thematic Stories", icon: "/assets/bulb.svg" },
    { id: 5, label: "Chemicals", icon: "/assets/chamical.svg" },
    { id: 6, label: "Pharma", icon: "/assets/pharma.svg" },
  ];

  const [buttons, setButtons] = useState(originalButtons);
  const [clickedButtons, setClickedButtons] = useState([]);

  const handleButtonClick = (button) => {
    if (
      clickedButtons.some((clickedButton) => clickedButton.id === button.id)
    ) {
      return;
    }
    const newClickedButtons = [button, ...clickedButtons];
    setClickedButtons(newClickedButtons);
  };

  const handleCloseClick = (button) => {
    const newClickedButtons = clickedButtons.filter(
      (clickedButton) => clickedButton.id !== button.id
    );
    setClickedButtons(newClickedButtons);
  };

  return (
    <>
      {clickedButtons.map((button) => (
        <div key={button.id} className="w-auto ">
          <button
            className={`group relative px-5 py-[10px] flex items-center  justify-between w-full shadow-md border-[#E4E7EC]  border rounded transition-all duration-500 ${
              clickedButtons.length > 0
                ? "bg-brand-500 text-white"
                : "bg-white text-[#1D2939]"
            } focus:outline-none`}
          >
            <img
              src={button.icon}
              alt="Icon"
              width="18"
              height="18"
              className={`group-focus:brightness-0 group-focus:invert ${
                clickedButtons.includes(button) ? "brightness-0 invert" : ""
              }`}
            />
            <p className="flex-grow text-sm font-medium font-open_sans mx-2">
              {button.label}
            </p>
            <div
              className="absolute right-1 top-1/2 transform -translate-y-1/2 visible me-1"
              onClick={(e) => {
                e.stopPropagation();
                handleCloseClick(button);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="white"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      ))}

      {buttons
        .filter(
          (button) =>
            !clickedButtons.some(
              (clickedButton) => clickedButton.id === button.id
            )
        )
        .map((button) => (
          <div key={button.id} className="w-auto">
            <button
              className="group relative px-4 py-[10px] flex items-center justify-between w-full shadow-md border-[#E4E7EC] border rounded hover:bg-brand-100 hover:border-brand-200 transition-all duration-500 focus:outline-none pe-2"
              onClick={() => handleButtonClick(button)}
            >
              <img
                src={button.icon}
                alt="Icon"
                width="18"
                height="18"
                className={`group-focus:brightness-0 group-focus:invert ${
                  clickedButtons.includes(button) ? "brightness-0 invert" : ""
                }`}
              />
              <p className="flex-grow text-sm font-medium font-open_sans mx-2">
                {button.label}
              </p>
            </button>
          </div>
        ))}
    </>
  );
};

export default FilterMenuTags;
