import Image from "next/image";
import React from "react";

type TPlansMobileTab = {
    plan: string;
    features?: Array<string>;
    popular?: boolean;
    selected?: boolean;
    onClick: () => void;
};

// popular && selected && "shadow-[0px_-3px_0px_3px_#75CDC5]"
// ${selected ? "shadow-[0px_-3px_0px_4px_#75CDC5]" : "shadow-[0px_-3px_0px_2.8px_#75CDC5]"}`

export function PlansMobileTab({plan, features, popular = false, selected = false, onClick}: TPlansMobileTab) {
    return (
        <div
            onClick={onClick}
            className={`  px-2 py-3 border border-gray-150 min-h-[107px] md:max-w-auto md:min-w-[83.5px]  w-full relative  ${
                popular ? " rounded-b-xl" : "rounded-xl"
            } ${
                selected &&
                "bg-[linear-gradient(272deg,_#125B54_18.54%,_#092E2B_107.09%)] shadow-[rgba(0,0,0,0.3)_0px_4px_13px_-3px] border-transparent text-white"
            }`}
        >
            {popular && (
                <div
                    className={` flex gap-x-[2px] flex-nowrap items-center justify-center  text-center py-[1px] md:py-[3px] px-[6px] shadow-[0px_0px_0px_1px] shadow-brand-300 whitespace-nowrap font-semibold bg-brand-300 text-white rounded-t-lg absolute -top-[1.1rem] left-0 z-30 w-full `}
                >
                    <svg
                        className=" inline-block"
                        width="10"
                        height="10"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.35519 4.98686L7.65867 6.50366L8.17554 8.77202C8.20406 8.89515 8.19672 9.02429 8.15444 9.1431C8.11216 9.26192 8.03684 9.36509 7.938 9.43958C7.83917 9.51406 7.72124 9.55653 7.59912 9.56161C7.477 9.56669 7.35616 9.53415 7.25188 9.46811L5.348 8.25405L3.443 9.46811C3.33873 9.53377 3.21804 9.566 3.09613 9.56073C2.97422 9.55547 2.85654 9.51294 2.75791 9.43852C2.65927 9.3641 2.5841 9.2611 2.54185 9.1425C2.49959 9.02389 2.49216 8.89499 2.52047 8.77202L3.03923 6.50366L1.3427 4.98686C1.25045 4.90425 1.18373 4.7953 1.15088 4.67364C1.11802 4.55197 1.12049 4.42297 1.15798 4.30275C1.19546 4.18252 1.2663 4.07641 1.36164 3.99765C1.45698 3.91889 1.57261 3.87098 1.69407 3.85991L3.9184 3.67397L4.77647 1.52241C4.82291 1.40515 4.90196 1.30485 5.00356 1.23426C5.10517 1.16367 5.22473 1.12598 5.34706 1.12598C5.46939 1.12598 5.58896 1.16367 5.69056 1.23426C5.79217 1.30485 5.87121 1.40515 5.91766 1.52241L6.77535 3.67397L8.99967 3.85991C9.12138 3.87057 9.23734 3.91821 9.33303 3.99686C9.42872 4.07551 9.49988 4.18167 9.5376 4.30204C9.57532 4.42241 9.57791 4.55163 9.54506 4.67352C9.51221 4.79541 9.44538 4.90454 9.35293 4.98725L9.35519 4.98686Z"
                            fill="white"
                        />
                    </svg>
                    <p className=" whitespace-nowrap text-4xs font-bold">Most Popular</p>
                </div>
            )}
            {/* {popular && <div className=" h-[6px] w-full bg-white absolute bottom-[-6px] left-0"></div>} */}
            <p className=" text-2xs font-bold">{plan}</p>
            {features &&
                features.length > 0 &&
                features.map((feature) => (
                    <p className={` text-4xs ${selected ? "text-white" : "text-gray-400"} `}>{feature}</p>
                ))}
            {selected && (
                <div
                    className=" w-fit rounded-full p-[0.5px] flex items-center justify-center absolute right-2 bottom-2">
                    <Image height={16} width={16} src={"/icons/check.svg"} alt="checked-plan"/>
                </div>
            )}
        </div>
    );
}
