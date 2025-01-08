import { Navbar } from "@/components.v2/navbar";
import React from "react";
import PersonalInfo from "./components/PersonalInfo";
import YourPlan from "./components/YourPlan";
import { Footer } from "@/components.v2/footer";
import { SideBar } from "./components/SideBarList";
import BillingHistory from "./components/BillingHistory";

export default function Profile() {
 
  return (
    <div className="bg-gray-100 ">
      <Navbar className=" bg-white" />
      <div className=" main-container overflow-visible relative top-[41px]">
        <main className=" relative min-h-screen open_sans flex gap-x-6 lg:gap-x-11">
          <SideBar />
          <div>
            <h2 className=" text-gray-900 font-bold text-[32px]">Your Account</h2>
            <div className=" flex flex-col gap-y-[60px] mt-10">
              <PersonalInfo />
              <YourPlan />
              <BillingHistory />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
