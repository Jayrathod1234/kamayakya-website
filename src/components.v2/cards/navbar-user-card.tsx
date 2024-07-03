import React, {useContext, useEffect} from "react";
import {Avatar, AvatarVariant} from "../avatar";
import AuthContext from "@/components/AuthContext";
import {PlanBadge} from "../badge";
import {useActivePlanContext} from "@/components/PlanContext";

export function NavbarUserCard({arrow = false, className}: { arrow?: boolean; className?: string }) {
    const {user} = useContext(AuthContext);
    const {activePlan} = useActivePlanContext();

    return (
        <div className={`p-4 flex gap-x-2 justify-between items-center  ${className}`}>
            <div className=" flex gap-x-3">
                <Avatar variant={AvatarVariant.lg}/>
                <div>
                    <p className=" text-[15px] font-semibold text-[rgba(26,27,45,1)]">{user?.username || user?.mobile}</p>
                    <p className=" text-2xs text-[rgba(83,87,99,1)]">
                        <PlanBadge plan={activePlan ? activePlan.plan : ""}/>
                    </p>
                </div>
            </div>
            {arrow && (
                <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18 8L22 12L18 16"
                            stroke="#667085"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path d="M2 12H22" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                </div>
            )}
        </div>
    );
}
