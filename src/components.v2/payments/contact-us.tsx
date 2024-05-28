import React from "react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button as ShadBtn } from "../ui/button";
import { Input } from "../ui/input";
import { Button } from "../button";
import { ButtonSize, ButtonVariant } from "../button/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components.v2/ui/dialog";

const ContactOptionCard = ({ className }) => {
  return (
    <div
      className={` flex flex-row items-center p-4 gap-x-2 bg-white rounded-xl shadow-2xs border border-brand-300  ${className}`}
    >
      <div>
        <svg width="52" height="53" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="0.5" width="52" height="52" rx="8" fill="#E7F8F8" />
          <path
            d="M36.3716 24.5203C36.5194 23.5284 36.4699 22.517 36.2258 21.5442C35.8928 20.2149 35.2041 19.0013 34.2337 18.0337C33.2662 17.0631 32.0526 16.3742 30.7232 16.041C29.7504 15.7973 28.739 15.7479 27.7471 15.8958M31.9442 24.0519C32.0256 23.5105 31.9788 22.9575 31.8073 22.4375C31.6359 21.9175 31.3447 21.4451 30.9572 21.0583C30.5704 20.6707 30.0979 20.3795 29.5779 20.2081C29.0579 20.0366 28.5049 19.9898 27.9635 20.0713"
            stroke="#108973"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.386 17.6299C20.5941 17.63 20.7983 17.6858 20.9776 17.7914C21.1569 17.897 21.3047 18.0487 21.4056 18.2307L22.833 20.8009C22.9251 20.9667 22.9754 21.1526 22.9795 21.3422C22.9835 21.5319 22.9413 21.7197 22.8564 21.8894L21.4815 24.6386C21.4815 24.6386 21.8799 26.6873 23.547 28.3545C25.2148 30.0216 27.2565 30.4136 27.2565 30.4136L30.0051 29.0387C30.1749 28.9538 30.3628 28.9116 30.5526 28.9158C30.7424 28.9199 30.9283 28.9703 31.0942 29.0626L33.6725 30.4959C33.8542 30.597 34.0055 30.7449 34.1109 30.9242C34.2162 31.1035 34.2717 31.3076 34.2716 31.5155V34.4754C34.2716 35.9821 32.8716 37.0712 31.4436 36.5888C28.5106 35.5995 23.9583 33.7147 21.072 30.8295C18.1868 27.9438 16.3026 23.3909 15.3127 20.4579C14.8309 19.0299 15.9194 17.6299 17.4267 17.6299H20.386Z"
            fill="#108973"
          />
        </svg>
      </div>
      <div className="">
        <p className=" text-gray-950 leading-6">Mobile No</p>
        <p className=" text-gray-700 leading-6">+91 9175939641</p>
      </div>
    </div>
  );
};

export function ContactUs() {
  return (
    <div className=" text-white bg-[url('/Isolation_Mode.png'),linear-gradient(314deg,_#125B54_6.46%,_#12ADB7_113.37%)] bg-blend-color-burn bg-cover min-h-screen">
      <div className=" overflow-hidden relative w-[calc(100vw+24rem)] ml-[-10%] h-[500px] flex items-center justify-center max-lg:h-[400px] max-md:h-[200px]">
        <svg
          className=" absolute left-0 top-1 w-[95%] h-[100%] mt-[-8%]"
          viewBox="0 0 1730 331"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M408.604 272.328C262.849 226.673 196.644 195.068 143.782 254.306L107.726 297.796C102.68 303.882 92.8995 301.982 90.4993 294.449L1.15351 14.0358C-0.901677 7.58562 3.91181 1 10.6815 1H368.573H1701.54C1705.77 1 1709.55 3.62405 1710.88 7.63918C1725.95 53.2116 1743.75 141.901 1708.6 254.306C1662.41 401.985 1148.95 302.45 1033.71 254.306C758.109 139.167 590.798 329.397 408.604 272.328Z"
            fill="#F9F9FB"
            stroke="#F9FAFB"
          />
        </svg>
      </div>
      <div className="py-[60px] mt-[60px] min-h-screen">
        <div className=" grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 place-content-center place-items-center w-[min(1200px,calc(100%-32px))] min-w-[328px] mx-auto">
          <div className=" md:col-start-2 md:row-start-1">
            <Image className=" md:hidden" height={85} width={131} src={"/ship.svg"} alt="ship" />
            <Image className="hidden md:inline-block" height={115} width={177} src={"/ship.svg"} alt="ship" />
          </div>
          <div className="md:col-start-1 md:row-start-1 py-[60px] text-center md:text-left ">
            <h2 className=" text-display-sm md:text-display-xl font-bold mb-4">Feeling Lost at Sea?</h2>
            <p className=" md:text-xl">Let Us Be Your Onboarding Lighthouse!</p>
            <div className=" mt-[60px] md:mt-14 mb-10">
              <p className=" font-semibold">{"Share your number, we'll reach out!"}</p>
              {/* CONTACT INPUT */}
              <div className=" flex items-center md:items-start bg-white p-[6px] rounded-[6px] gap-[10px] mt-3 w-full">
                <Select>
                  <SelectTrigger className="w-fit text-gray-900 outline-none border-0 focus:outline-none focus:border-0 focus:ring-0 bg-transparent ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent className=" w-4 overflow-hidden">
                    <SelectItem value="light">KR</SelectItem>
                    <SelectItem value="dark">LA</SelectItem>
                    <SelectItem value="system">IN</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Enter your mobile number"
                  className=" text-md outline-none border-0 focus:outline-none focus:border-0 focus:ring-0 bg-transparent ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                />
                <ShadBtn variant={"default"} size={"icon"} className=" bg-brand-400 p-[12px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8.88897 3.33301L13.3334 7.99967M13.3334 7.99967L8.88897 12.6663M13.3334 7.99967L2.66675 7.99967"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </ShadBtn>
              </div>
            </div>
            <div className=" flex flex-col items-center justify-center gap-4 md:items-start">
              <p className=" font-medium">Or ask them directly,</p>
              <Dialog>
                <DialogTrigger asChild>
                  <ShadBtn className=" bg-brand-100 text-brand-500" variant="default">
                    Contact Us
                  </ShadBtn>
                </DialogTrigger>
                <DialogContent className=" p-6 pb-[21px] max-w-[1200px] max-h-[749px] max-md:max-h-screen overflow-y-hidden ">
                  {/* <div className=" h-full p-0"> */}
                  <div className="grid grid-cols-2 max-md:grid-cols-1 grid-rows-[auto_auto] max-md:grid-rows-[auto] gap-6 h-full max-w-[1152px] max-h-[704px] max-md:max-h-screen max-md:overflow-y-scroll">
                    <div className=" col-start-1 row-span-2 p-5 rounded-xl shadow-2xs  max-md:row-start-2 max-md:row-span-full">
                      <p className=" text-sm font-medium text-orange-600 uppercase"> Get in touch</p>
                      <h2 className=" mt-1 mb-3 text-display-sm">Ask the team</h2>
                      <p>
                        Have questions? We're here to help! Send us a message, and we'll get back to you within 24 hours
                      </p>
                      <div className=" h-[1px] my-6 w-full bg-gray-100"></div>
                      <div className=" flex flex-col gap-y-6 max-h-[420px] overflow-y-scroll max-md:hidden">
                        <div className="">
                          <label className=" text-sm font-medium mb-[6px]" htmlFor="name">
                            Name*
                          </label>
                          <Input className=" border border-[#D0D5DD] focus:outline-none  focus:ring-0  ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
                        </div>
                        <div className="p-0">
                          <label className=" text-sm font-medium mb-[6px]" htmlFor="name">
                            Phone number*
                          </label>
                          <div className=" border pl-[14px]  border-[#D0D5DD] flex items-center md:items-start bg-white rounded-[6px] gap-[10px] w-full">
                            <Select>
                              <SelectTrigger className="w-fit p-0 text-gray-900 outline-none border-0 focus:outline-none focus:border-0 focus:ring-0 bg-transparent ring-0 focus:ring-offset-0">
                                <SelectValue placeholder="IN" />
                              </SelectTrigger>
                              <SelectContent className=" w-4 overflow-hidden">
                                <SelectItem value="light">KR</SelectItem>
                                <SelectItem value="dark">LA</SelectItem>
                                <SelectItem value="system">IN</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              placeholder="Enter your mobile number"
                              className=" pl-0 py-0 placeholder:text-gray-400 placeholder:font-normal text-md outline-none border-0 bg-transparent focus:border-0 focus:outline-none  focus:ring-0  ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                            />
                          </div>
                        </div>
                        <div className="">
                          <label className=" text-sm font-medium mb-[6px]" htmlFor="name">
                            Email*
                          </label>
                          <div className=" border border-[#D0D5DD] px-[14px]  py-[10px] flex items-center bg-white rounded-[6px] gap-[8px] w-full max-w-[350px] md:max-w-[566px] mx-auto">
                            {/* <div className=" ml-[6px]"> */}
                            <Image src={"/icons/mail.svg"} alt="mail" height={20} width={20} />
                            {/* </div> */}
                            <Input
                              placeholder="Enter your mobile number"
                              className=" h-0 placeholder:text-gray-400 placeholder:font-normal px-0 text-md outline-none border-0 focus:outline-none focus:border-0 focus:ring-0 bg-transparent ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                            />
                          </div>
                        </div>
                        <div className="">
                          <label className=" text-sm font-medium mb-[6px]" htmlFor="name">
                            What's your query?*
                          </label>
                          <div className=" flex items-center bg-white rounded-[6px] gap-[8px] w-full max-w-[350px] md:max-w-[566px] mx-auto">
                            <Select>
                              <SelectTrigger className="focus:outline-none  focus:ring-0  ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                                <SelectValue placeholder="Theme" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        {/* <div className="">
                            <div className=" flex items-center bg-white rounded-[6px] gap-[8px] w-full max-w-[350px] md:max-w-[566px] mx-auto">
                              <Input />
                            </div>
                          </div> */}
                        <div className=" flex flex-row">
                          <Button variant={ButtonVariant.primary} size={ButtonSize.md} customStyle=" px-4 !py-2">
                            Send Message
                          </Button>
                          <Button
                            variant={ButtonVariant.tertiary}
                            size={ButtonSize.md}
                            customStyle=" px-4 !py-2 border-0"
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className=" col-start-2 row-start-1  max-md:col-start-1">
                      <Image
                        className=" h-full w-full"
                        height={390}
                        width={528}
                        src={"/pricing/modal-desktop.png"}
                        alt="kamayakya-mascot"
                      />
                    </div>
                    <div className=" col-start-2 row-start-2 bg-white h-full p-5 rounded-xl max-md:row-start-3 max-md:col-start-1">
                      <div className=" hidden max-md:block text-center mb-5">
                        <p className=" text-sm max-md:text-2xs font-medium text-orange-600 uppercase"> Get in touch</p>
                        <h2 className=" mt-1 mb-3 text-display-sm max-md:text-display-xs">Ask the team</h2>
                        <p className=" max-md:text-2xs">
                          Have questions? We're here to help! Send us a message, and we'll get back to you within 24
                          hours
                        </p>
                      </div>
                      <div className=" shadow-2xs grid grid-cols-2 grow-row-[auto_auto_auto] gap-4 max-md:grid-cols-1">
                        <ContactOptionCard className={" col-start-1 row-start-1 "} />
                        <ContactOptionCard
                          className={" col-start-2 row-start-1 max-md:col-start-1 max-md:row-start-2"}
                        />
                        <ContactOptionCard
                          className={
                            " col-span-2 row-start-2 max-md:col-start-1 max-md:row-start-3 max-md:col-span-full"
                          }
                        />
                        <p className=" row-start-3 col-span-2 text-gray-700 text-sm max-md:row-start-4 max-md:col-span-1 max-md:text-center">
                          Call us during business hours, Monday to Friday, between 9am and 5pm EST, for assistance.
                        </p>
                      </div>
                    </div>
                    <div className=" hidden max-md:grid max-md:col-start-1 max-md:row-start-5 max-md:row-span-2 h-fit p-5">
                      <div className=" flex flex-col gap-y-6 ">
                        <div className="">
                          <label className=" text-sm font-medium mb-[6px]" htmlFor="name">
                            Name*
                          </label>
                          <Input className=" border border-[#D0D5DD] focus:outline-none  focus:ring-0  ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
                        </div>
                        <div className="p-0">
                          <label className=" text-sm font-medium mb-[6px]" htmlFor="name">
                            Phone number*
                          </label>
                          <div className=" border pl-[14px]  border-[#D0D5DD] flex items-center md:items-start bg-white rounded-[6px] gap-[10px] w-full">
                            <Select>
                              <SelectTrigger className="w-fit p-0 text-gray-900 outline-none border-0 focus:outline-none focus:border-0 focus:ring-0 bg-transparent ring-0 focus:ring-offset-0">
                                <SelectValue placeholder="IN" />
                              </SelectTrigger>
                              <SelectContent className=" w-4 overflow-hidden">
                                <SelectItem value="light">KR</SelectItem>
                                <SelectItem value="dark">LA</SelectItem>
                                <SelectItem value="system">IN</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              placeholder="Enter your mobile number"
                              className=" pl-0 py-0 placeholder:text-gray-400 placeholder:font-normal text-md outline-none border-0 bg-transparent focus:border-0 focus:outline-none  focus:ring-0  ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                            />
                          </div>
                        </div>
                        <div className="">
                          <label className=" text-sm font-medium mb-[6px]" htmlFor="name">
                            Email*
                          </label>
                          <div className=" border border-[#D0D5DD] px-[14px]  py-[10px] flex items-center bg-white rounded-[6px] gap-[8px] w-full">
                            {/* <div className=" ml-[6px]"> */}
                            <Image src={"/icons/mail.svg"} alt="mail" height={20} width={20} />
                            {/* </div> */}
                            <Input
                              placeholder="Enter your mobile number"
                              className=" h-0 placeholder:text-gray-400 placeholder:font-normal px-0 text-md outline-none border-0 focus:outline-none focus:border-0 focus:ring-0 bg-transparent ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                            />
                          </div>
                        </div>
                        <div className="">
                          <label className=" text-sm font-medium mb-[6px]" htmlFor="name">
                            What's your query?*
                          </label>
                          <div className=" flex items-center bg-white rounded-[6px] gap-[8px] w-full mx-auto">
                            <Select>
                              <SelectTrigger className="focus:outline-none  focus:ring-0  ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                                <SelectValue placeholder="Theme" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        {/* <div className="">
                            <div className=" flex items-center bg-white rounded-[6px] gap-[8px] w-full max-w-[350px] md:max-w-[566px] mx-auto">
                              <Input />
                            </div>
                          </div> */}
                        <div className=" flex flex-row max-md:flex-col pb-8">
                          <Button variant={ButtonVariant.primary} size={ButtonSize.md} customStyle=" px-4 !py-2">
                            Send Message
                          </Button>
                          <Button
                            variant={ButtonVariant.tertiary}
                            size={ButtonSize.md}
                            customStyle=" px-4 !py-2 border-0"
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
