import { Avatar } from "@/components.v2/avatar";
import { PlanBadge } from "@/components.v2/badge";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Navbar } from "@/components.v2/navbar";
import { ChevronRight, PencilLine } from "lucide-react";
import React from "react";
import PersonalInfo from "./PersonalInfo";
import YourPlan from "./YourPlan";
import { Footer } from "@/components.v2/footer";

export default function Profile() {
  return (
    <div className="bg-gray-100 ">
      <Navbar className=" bg-white" />
      <div className=" main-container overflow-visible relative top-[41px]">
      <main className=" relative min-h-screen open_sans flex gap-x-11">
        <div className="  sticky top-[94px] left-0 z-10 h-fit">
          <ul >
            <li className=" flex items-center py-2 px-4 gap-x-2 bg-white relative border-l-[4px] border-l-brand-400 rounded-r-lg rounded-l-[4px]">
              <PencilLine/>
              <p>Personal Info</p>
            </li>
            <li className=" flex items-center py-2 px-4 gap-x-2 relative  rounded-r-lg rounded-l-[4px]">
              <PencilLine/>
              <p>Your Plan</p>
            </li>
           
            <li className=" flex items-center py-2 px-4 gap-x-2 relative  rounded-r-lg rounded-l-[4px]">
              <PencilLine/>
              <p>Billing History</p>
            </li>          
          </ul>
        </div>
        <div>
          <h2 className=" text-gray-900 font-bold text-[32px]">Your Account</h2>
          <div className=" flex flex-col gap-y-[60px] mt-10">
            <PersonalInfo />
            <YourPlan />
            <PersonalInfo />
            <YourPlan />
            <PersonalInfo />
            <YourPlan />
          </div>
        </div>
      </main>
      </div>
      <Footer/>
    </div>
  );
}
