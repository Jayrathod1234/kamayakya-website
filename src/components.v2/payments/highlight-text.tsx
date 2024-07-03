import React from "react";

type THighlightText = {
    children: React.ReactNode;
};

export function HightlightText({children}: THighlightText) {
    return (
        <span className=" relative font-semibold">
      {children}
            <span className=" inline-block absolute h-[2px] w-full bg-brand-300  left-0 bottom-0 z-[-1]"></span>
    </span>
    );
}
