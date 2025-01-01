import { Avatar } from "@/components.v2/avatar";
import { PlanBadge } from "@/components.v2/badge";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import React from "react";
import SectionHead from "./SectionHead";

interface IContactInfo {
  contactField: string;
  contactValue: string;
  handleEdit: () => void;
}

const ContactInfo = ({ contactField, contactValue, handleEdit }: IContactInfo) => {
  return (
    <>
      <div>
        <p className=" text-sm font-medium text-gray-500">{contactField}</p>
        <p className=" text-md text-gray-900">{contactValue}</p>
      </div>
      <Button onClick={handleEdit} className=" !px-[18px] !py-2" variant={ButtonVariant.tertiary}>
        <p className=" text-sm font-medium">Edit</p>
      </Button>
    </>
  );
};

export default function PersonalInfo() {
  const handleEdit = () => {};
  return (
    <div>
      <SectionHead sectionHead="Personal Info"/>
      <div className="bg-white pt-6 mt-3 rounded-xl">
        <div className=" px-6 ">
          <div className=" bg-gray-50 rounded-2xl">
            <div className=" flex justify-between p-6 ">
              <div className=" flex items-center gap-x-3 ">
                <Avatar variant={"custom"} customImgSize={80} />
                <h3 className="p-[10px] font-bold text-display-xs">Juan Juan</h3>
              </div>
              <PlanBadge plan={"VIP"} />
            </div>
          </div>
        </div>
        <div className=" p-6 flex items-center justify-between">
          <ContactInfo contactField={"Email ID"} contactValue={"Juan@gmail.com"} handleEdit={handleEdit} />
        </div>
        <div className=" px-6 py-4 flex items-center justify-between border-t border-t-[#F0F1F2]">
          <ContactInfo contactField={"Mobile Number"} contactValue={"+917507139592"} handleEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
}
