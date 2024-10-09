import React from 'react'

export default function AverageExitRetursTooltipContent() {
  return (
    <div className=" p-4 flex flex-col gap-y-3 max-w-[300px] open_sans">
    <h4 className=" font-bold  text-gray-800 text-2xs m-0">Average Exit Returns</h4>
    <p className=" text-gray-900 text-2xs m-0">It represents the average percentage gain or loss for all investments where positions have been closed (sold). It measures the actual return investors received from recommendations once the stock was sold.</p>
    <div className=" flex justify-between items-center text-gray-600">
      <h4 className=" font-bold text-2xs m-0">Average Exit Returns</h4>
      <p className=" font-bold text-2xs m-0">=</p>
      <div className=" flex flex-col gap-y-1">
        <p className=" text-2xs m-0 text-center">Total % Gain or Loss of all Current Investments</p>
        <hr/>
        <p className="text-2xs m-0 text-center">Number of Investments</p>
      </div>
    </div>
    <div className=" p-2">
      <h4 className=" text-brand-400 text-2xs m-0">Example:</h4>
      <p className=" mt-2 text-2xs m-0">
      If 3 investments were sold with returns of 10%, 20%, and -5%, the average exit return is (10 + 20 - 5) ÷ 3 = 8.33%.
      </p>
    </div>
  </div>
  )
}
