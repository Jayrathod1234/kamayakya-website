import { useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const ContactOptionCard = ({ className, label, value, icon }) => {
  const ref = useRef();
  const handleCopy = () => {};
  return (
    <div
      className={` flex flex-row items-center p-4 gap-x-2 bg-white rounded-xl shadow-2xs border border-brand-300  ${className}`}
    >
      <div>{icon}</div>
      <div className=" whitespace-nowrap">
        <p className=" text-gray-950 leading-6">{label}</p>
        <div className=" flex items-center gap-[6px]">
          <p ref={ref} className=" text-gray-700 leading-6">
            {value}
          </p>
          <CopyToClipboard text={value} onCopy={handleCopy}>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="1" width="23" height="23" rx="3.5" stroke="#EDF0F5" />
              <path
                d="M7.33337 13.1562L7.33337 9.58333C7.33338 8.29467 8.37804 7.25 9.66671 7.25L13.2396 7.25M10.8334 17.75L14.7709 17.75C15.4957 17.75 16.0834 17.1624 16.0834 16.4375L16.0834 10.75C16.0834 10.0251 15.4957 9.4375 14.7709 9.4375L10.8334 9.4375C10.1085 9.4375 9.52087 10.0251 9.52087 10.75L9.52087 16.4375C9.52087 17.1624 10.1085 17.75 10.8334 17.75Z"
                stroke="#108973"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};
