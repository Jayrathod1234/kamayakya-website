import React from "react";

function StocksTab() {
  return (
    <div>
      <div className="radio-input h-[68px] w-[333px] relative flex items-center rounded-[61px] p-1.5 bg-white text-black overflow-hidden border-[6px] border-[#ffffff3a]">
        <label className="w-full p-[10px] cursor-pointer justify-center items-center z-[1] font-semibold text-sm">
          <input type="radio" id="value-1" name="value-radio" value="value-1" />
          <span className="text-md font-semibold font-open_sans">
            {" "}
            Main Board
          </span>
          <div>
            {" "}
            <span className="text-3xs font-bold">12 Stocks</span>
          </div>
        </label>
        <label>
          <input type="radio" id="value-2" name="value-radio" value="value-2" />
          <span className="text-md font-semibold font-open_sans ">
            SME Board
          </span>
          <div>
            <span className="text-3xs font-bold ">14 Stocks</span>
          </div>
        </label>
        {/* <label>
          <input type="radio" id="value-3" name="value-radio" value="value-3" />
          <span>Option 3</span>
        </label> */}
        <span className="selection hidden absolute h-full w-[166px] left-0 top-0 px-10 py-2 rounded-[47px] "></span>
      </div>
    </div>
  );
}

export default StocksTab;
