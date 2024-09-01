import { useEffect, useRef, useState } from "react";

const targets = []

export const StockCardProgressBar = () => {
  const ref = useRef([]);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const currentProgress = 1;
  useEffect(() => {
    setMargins(() => ({
      marginLeft: ref.current[0].offsetWidth / 2,
      marginRight: ref.current[targets.length - 1].offsetWidth / 2,
    }));
    console.log(ref.current[0].offsetWidth, ref.current[targets.length - 1].offsetWidth);
  }, [ref.current]);

  return (
    <div className=" pt-5 pb-4">
      <div className="flex justify-between relative">
        {targets.map((target, index) => (
          <div ref={(el) => (ref.current[index] = el)} className=" flex flex-col items-center z-10">
            <h4 className=" text-[#344054] font-semibold text-sm">{target.price}</h4>
            <div className=" bg-white p-[2px] rounded-full h-4 w-4 flex items-center justify-center ">
              <div className=" my-[6px] h-3 w-3 rounded-full border-2 border-[#12B76A] flex items-center justify-center">
                <div className=" h-[4px] w-[4px] bg-[#12B76A] rounded-full"></div>
              </div>
            </div>
            <h4 className=" font-semibold text-xs text-[#667085]">{target.label}</h4>
            <p className=" text-[#98A2B3] text-4xs font-medium">{target.date}</p>
          </div>
        ))}
        <div
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
          className=" border-[1.5px] border-[#D0D5DD] h-[0px] w-full absolute border-dashed border-separate top-[40%]"
        >
          <div
            style={{ width: `${(currentProgress / (targets.length - 1)) * 100}%` }}
            className=" h-[1.5px] bg-[#32D583]"
          ></div>
        </div>
      </div>
    </div>
  );
};
