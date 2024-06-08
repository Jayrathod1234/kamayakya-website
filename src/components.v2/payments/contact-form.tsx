import React, { useState } from "react";
import { Button } from "../button";
import { ButtonSize, ButtonVariant } from "../button/button";
import { Input } from "../ui/input";
import { getMixPanelClient } from "@/externals/mixpanel";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { Send } from "lucide-react";
import { CONTACT_URL } from "@/pages/api/URLs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { DialogClose } from "../ui/dialog";

export function ContactForm() {
  const [querySelected, setQuerySelected] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    emailError: false,
    nameError: false,
    phoneError: false,
    queryError: false,
  });
  const [otherQuery, setOtherQuery] = useState("");

  const handleClose = (event: string) => {
    const mp = getMixPanelClient();
    mp.track(event, {
      page: "Pricing_Page",
    });
  };

  const handleSendMessage = async () => {
    const mp = getMixPanelClient();
    if (name.trim().length == 0) {
      setError((prev) => ({ ...prev, nameError: true }));
    } else {
      const isValidName = /^[A-Za-z\s]*$/.test(name);
      if (!isValidName) {
        setError((prev) => ({ ...prev, nameError: true }));
      }
    }
    if (phone.trim().length == 0) {
      setError((prev) => ({ ...prev, phoneError: true }));
    } else {
      if (phone.slice(2).length < 10) {
        console.log(false);
        setError((prev) => ({ ...prev, phoneError: true }));
      }
    }
    if (email.trim().length == 0) {
      setError((prev) => ({ ...prev, emailError: true }));
    } else {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isEmail) {
        setError((prev) => ({ ...prev, emailError: true }));
      }
    }
    if (querySelected.trim().length == 0) {
      setError((prev) => ({ ...prev, queryError: true }));
    }
    const errorFlag = error.nameError || error.emailError || error.phoneError || error.queryError;
    if (errorFlag) return;

    try {
      const response = await axios.postForm(
        CONTACT_URL,
        {
          name,
          email,
          mobile_number: phone,
          query_type: querySelected,
          message: otherQuery,
        },
        {
          headers: {
            Authorization: "token " + localStorage.getItem("refresh"),
          },
        }
      );
      if (response.data) {
        mp.track("sendmessage_clicked", {
          page: "Pricing_Page",
          name: name,
          email: email,
          phone: phone,
          message: otherQuery,
        });
      }
    } catch (e) {}
  };

  const handleInputs = (value: string, cb: React.Dispatch<React.SetStateAction<string>>) => {
    cb(value);
  };

  return (
    <>
      <div style={{ fontFamily: "Open Sans !important" }} className=" placeholder:text-gray-400 placeholer:text-md ">
        <label className=" text-sm font-medium mb-[6px]" htmlFor="name">
          Name*
        </label>
        <Input
          placeholder="Name"
          onChange={(e) => {
            handleInputs(e.target.value, setName);
            if (error.nameError) setError((prev) => ({ ...prev, nameError: false }));
          }}
          className={` placeholder:text-gray-400 placeholer:text-md py-[10px] px-[14px] max-h-11 lg:h-11  border border-[#D0D5DD] focus:outline-none  focus:ring-0  ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0  ${
            error.nameError ? " border  border-[rgba(253,162,155,1)]  " : ""
          }`}
        />
        {error.nameError ? <p className=" text-sm text-[rgba(240,68,56,1)] mt-[6px] text-left">Enter name</p> : null}
      </div>
      <div className="p-0">
        <label className=" text-sm font-medium mb-[6px]" htmlFor="name">
          Phone number*
        </label>
        <div className={` border border-[#D0D5DD] max-md:pl-0  px-[14px]  py-[10px] lg:h-11 max-h-11 flex items-center bg-white rounded-[6px] gap-[8px] w-full max-w-full md:max-w-[566px] mx-auto ${
            error.emailError ? " border  border-[rgba(253,162,155,1)]  " : ""
          }`}>
          <PhoneInput
            countryCodeEditable={false}
            onChange={(value) => {
              handleInputs(value, setPhone);
              if (error.phoneError) {
                setError((prev) => ({ ...prev, phoneError: false }));
              }
            }}
            inputStyle={{
              fontSize: "14px !important",
            }}
            inputClass={` font-w-normal !flex font-normal border pl-[14px] !border-[#D0D5DD] max-h-11 lg:h-11 flex items-center md:items-start bg-white rounded-important-6px gap-[10px] !w-full !text-sm ${
              error.phoneError ? " border  !border-[rgba(253,162,155,1)]  " : ""
            }`}
            country={"in"}
          />
        </div>
        {error.phoneError ? (
          <p className=" text-sm text-[rgba(240,68,56,1)] mt-[6px] text-left">Enter valid phone</p>
        ) : null}
      </div>
      <div className="">
        <label className=" text-sm font-medium mb-[6px]" htmlFor="name">
          Email*
        </label>
        <div
          className={` border border-[#D0D5DD]  px-[14px]  py-[10px] lg:h-11 max-h-11 flex items-center bg-white rounded-[6px] gap-[8px] w-full max-w-full md:max-w-[566px] mx-auto ${
            error.emailError ? " border  border-[rgba(253,162,155,1)]  " : ""
          }`}
        >
          {/* <div className=" ml-[6px]"> */}
          <Image src={"/icons/mail.svg"} alt="mail" height={20} width={20} />
          {/* </div> */}
          <Input
            onChange={(e) => {
              handleInputs(e.target.value, setEmail);
              if (error.emailError) setError((prev) => ({ ...prev, emailError: false }));
            }}
            placeholder="Email"
            className={` h-0 placeholder:text-gray-400 placeholder:font-normal px-0 text-md outline-none border-0 focus:outline-none focus:border-0 focus:ring-0 bg-transparent ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black`}
          />
        </div>
        {error.emailError ? (
          <p className=" text-sm text-[rgba(240,68,56,1)] mt-[6px] text-left">Enter valid email</p>
        ) : null}
      </div>
      <div className="">
        <label className=" text-sm font-medium mb-[6px]" htmlFor="name">
          What's your query?*
        </label>
        <div
          className={` flex items-center  bg-white rounded-[6px] gap-[8px] w-full max-w-full md:max-w-[566px] mx-auto ${
            error.queryError ? " border  border-[rgba(253,162,155,1)]  " : ""
          }`}
        >
          <Select
            onValueChange={(value) => {
              handleInputs(value, setQuerySelected);
              if (error.queryError) setError((prev) => ({ ...prev, queryError: false }));
            }}
          >
            <SelectTrigger className="px-[14px] py-[10px] max-h-11 lg:h-11 text-md placeholder:text-gray-400 placeholder:text-md focus:outline-none  focus:ring-0  ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Select your query" />
            </SelectTrigger>
            <SelectContent className=" text-sm font-medium">
              <SelectItem className="" value="Product Information">
                Product Information
              </SelectItem>
              <SelectItem value="Pricing">Pricing</SelectItem>
              <SelectItem value="Billing & Payment">Billing & Payment</SelectItem>
              <SelectItem value="Technical support">Technical support</SelectItem>
              <SelectItem value="Parterships">Parterships</SelectItem>
              <SelectItem value="Media/Press">Media/Press</SelectItem>
              <SelectItem value="Feedback">Feedback</SelectItem>
              <SelectItem value="Schedule a consultation">Schedule a consultation</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {error.queryError ? (
          <p className=" text-sm text-[rgba(240,68,56,1)] mt-[6px] text-left">Select a query</p>
        ) : null}
      </div>
      {querySelected === "Other" && (
        <div className="">
          <div className=" flex items-center bg-white rounded-[6px] gap-[8px] w-full mx-auto">
            <Textarea
              maxLength={256}
              placeholder="Tell us about your query"
              onChange={(e) => handleInputs(e.target.value, setOtherQuery)}
              className=" text-md placeholder:text-gray-400 placeholer:text-md py-[10px] px-[14px]  border border-[#D0D5DD] focus:outline-none  focus:ring-0  ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
      )}

      <div className=" flex flex-row max-md:flex-col max-mdpb-8">
        <Button
          onClick={handleSendMessage}
          variant={ButtonVariant.primary}
          size={ButtonSize.md}
          customStyle=" px-4 !py-2"
          startIcon={<Send height={16} width={16} />}
        >
          Send Message
        </Button>
        <DialogClose asChild>
          <Button
            onClick={() => handleClose("cancel_clicked")}
            variant={ButtonVariant.tertiary}
            size={ButtonSize.md}
            customStyle=" px-4 !py-2 border-0"
          >
            Close
          </Button>
        </DialogClose>
      </div>
    </>
  );
}
