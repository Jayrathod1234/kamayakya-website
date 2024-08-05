import React from "react";

const ProgressIndicator = () => {
  const targets = [
    { label: "Target 2", value: "₹3725", date: "in 2024", achieved: true },
    { label: "Target 3", value: "₹4470", date: "30 Jan 2024", achieved: true },
    { label: "CMP", value: "₹3740", date: "11 Apr 2023", current: true },
    { label: "Target 4", value: "₹5364", date: "", active: true },
  ];

  return (
    <div className="flex items-center space-x-4">
      {targets.map((target, index) => (
        <div key={index} className="relative flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              target.achieved
                ? "bg-green-500"
                : target.current
                ? "bg-blue-500"
                : "bg-orange-500"
            }`}
          >
            {target.label.includes("Target") && (
              <span className="text-white text-xs">
                {target.label.split(" ")[1]}
              </span>
            )}
          </div>
          <div className="text-center mt-2">
            <div className="text-lg">{target.value}</div>
            <div className="text-sm">{target.date}</div>
          </div>
          {index < targets.length - 1 && (
            <div className="absolute top-5 left-10 w-16 h-1 bg-gray-300"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
