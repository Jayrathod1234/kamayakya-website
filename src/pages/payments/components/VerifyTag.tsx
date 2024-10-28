import React from "react";

export default function VerifyTag() {
  return (
    <div className="flex items-center gap-x-[3px] bg-[#D1FADF] px-2 py-[3px] rounded-full ">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.19234 0.435053L2.56817 4.89776L1.34109 3.58672C1.11505 3.37359 0.75984 3.36068 0.501507 3.54151C0.249632 3.7288 0.17859 4.05818 0.33359 4.32297L1.78671 6.68672C1.9288 6.9063 2.17421 7.04193 2.45192 7.04193C2.71671 7.04193 2.96859 6.9063 3.11067 6.68672C3.34317 6.38318 7.78005 1.0938 7.78005 1.0938C8.3613 0.499636 7.65734 -0.0234887 7.19234 0.428595V0.435053Z"
          fill="#12B76A"
        />
      </svg>
      <p className="text-[#12B76A] text-4xs">Verified</p>
    </div>
  );
}
