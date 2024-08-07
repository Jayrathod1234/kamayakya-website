import React from "react";

function StocksTab() {
  return (
    <div>
      <div class="radio-input">
        <label>
          <input type="radio" id="value-1" name="value-radio" value="value-1" />
          <span className="text-md font-semibold font-open_sans">
            {" "}
            Main Board
          </span>
          <div>
            {" "}
            <span className="text-3xs font-bold text-[#D0D5DD]">12 Stocks</span>
          </div>
        </label>
        <label>
          <input type="radio" id="value-2" name="value-radio" value="value-2" />
          <span className="text-md font-semibold font-open_sans ">
            SME Board
          </span>
          <div>
            <span className="text-3xs font-bold text-[#667085]">14 Stocks</span>
          </div>
        </label>
        {/* <label>
          <input type="radio" id="value-3" name="value-radio" value="value-3" />
          <span>Option 3</span>
        </label> */}
        <span class="selection"></span>
      </div>
    </div>
  );
}

export default StocksTab;
