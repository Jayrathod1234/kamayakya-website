import {Progress} from "@/components.v2/ui/progress";
import Image from "next/image";
import React from "react";

type TUserTypeProgress = {
    progress: number;
    displayPauseIcon: boolean;
};

export function UserTypProgress({progress, displayPauseIcon}: TUserTypeProgress) {
    return (
        <div className=" w-full flex relative overflow-visible">
            <div className="  bg-white mt-auto w-full">
                <Progress className=" h-[4px] bg-white" value={progress}/>
            </div>
            {displayPauseIcon && (
                <div
                    style={{transform: `translateX(-${100 - (progress || 0)}%)`}}
                    className=" flex justify-end absolute w-full -top-[16px] -right-[16px] z-40"
                >
                    <Image height={40} width={40} alt="pause-icon" src={"/icons/pause-icon.svg"}/>
                </div>
            )}
        </div>
    );
}
