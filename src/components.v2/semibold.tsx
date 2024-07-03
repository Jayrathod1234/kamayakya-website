import {TChildren} from "@/types";
import React from "react";

export function Semibold({children}: TChildren) {
    return <span className=" font-semibold text-inherit">{children}</span>;
}
