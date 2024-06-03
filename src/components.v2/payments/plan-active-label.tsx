import React from "react";

export function PlanActiveLabel() {
  return (
    <div className="relative z-10 bg-white border border-[#F98800] flex flex-row items-center justify-center w-fit py-[3px] px-3 rounded-[6px] gap-1">
      {/* <div> */}
        <svg
          className=" inline-block m-0"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_4501_135092)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 6C0 4.4087 0.632141 2.88258 1.75736 1.75736C2.88258 0.632141 4.4087 0 6 0C7.5913 0 9.11742 0.632141 10.2426 1.75736C11.3679 2.88258 12 4.4087 12 6C12 7.5913 11.3679 9.11742 10.2426 10.2426C9.11742 11.3679 7.5913 12 6 12C4.4087 12 2.88258 11.3679 1.75736 10.2426C0.632141 9.11742 0 7.5913 0 6ZM5.6576 8.568L9.112 4.2496L8.488 3.7504L5.5424 7.4312L3.456 5.6928L2.944 6.3072L5.6576 8.568Z"
              fill="#F98800"
            />
          </g>
          <defs>
            <clipPath id="clip0_4501_135092">
              <rect width="12" height="12" fill="white" />
            </clipPath>
          </defs>
        </svg>
      {/* </div> */}
      <p className="text-3xs text-[#F98800] whitespace-nowrap uppercase">Active plan</p>
    </div>
  );
}
