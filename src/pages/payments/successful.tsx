import React, { useState } from "react";
import Header from "./components/Header";
import { Button, ButtonVariant } from "@/components.v2/button/button";

const steps = [
  "30+ Main Board Stocks to Buy and Research Reports every year (NSE + BSE)",
  "10+ SME board stocks to buy every year",
  "3-5 new stock picks every month",
  "Regular Updates via WhatsApp",
  "Email Updates",
  "Live Quarterly Interaction with KamayaKya research team",
];

const List = ({ step }: { step: string }) => {
  return (
    <li className=" flex items-center gap-x-2">
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.6335 5.31832C17.5276 5.21746 17.4017 5.1374 17.263 5.08276C17.1243 5.02813 16.9755 5 16.8252 5C16.6749 5 16.5261 5.02813 16.3873 5.08276C16.2486 5.1374 16.1227 5.21746 16.0168 5.31832L7.53519 13.3464L3.97176 9.9673C3.86187 9.86697 3.73215 9.78807 3.59 9.73512C3.44786 9.68217 3.29607 9.6562 3.14331 9.6587C2.99055 9.6612 2.8398 9.69211 2.69968 9.74968C2.55956 9.80724 2.4328 9.89034 2.32665 9.99421C2.2205 10.0981 2.13704 10.2207 2.08102 10.3551C2.025 10.4894 1.99753 10.6329 2.00017 10.7773C2.00282 10.9217 2.03552 11.0642 2.09642 11.1966C2.15733 11.3291 2.24523 11.4489 2.35512 11.5492L6.72687 15.6817C6.83271 15.7825 6.95862 15.8626 7.09736 15.9172C7.23609 15.9719 7.3849 16 7.53519 16C7.68548 16 7.83429 15.9719 7.97302 15.9172C8.11176 15.8626 8.23767 15.7825 8.34351 15.6817L17.6335 6.90027C17.749 6.7995 17.8413 6.67719 17.9044 6.54106C17.9674 6.40492 18 6.25792 18 6.1093C18 5.96068 17.9674 5.81367 17.9044 5.67754C17.8413 5.5414 17.749 5.4191 17.6335 5.31832Z"
          fill="#75CDC5"
        />
      </svg>
      <p className=" text-sm text-[#667085]">{step}</p>
    </li>
  );
};

export default function Successful() {
  const [showDetail,setShowDetail] = useState(false);
  return (
    <div className=" bg-gray-200 md:bg-white open_sans min-h-full relative">
      <Header />
      <div className=" md:-mt-[10%] flex flex-col gap-y-4 md:flex-row main-container overflow-visible relative z-[50]">
          <div className={`   !h-[56px] !w-[56px] flex md:hidden items-center justify-center bg-white rounded-full absolute left-1/2 translate-x-[-50%] ${showDetail ? "top-[-2%]":"top-[-3%] "} md:top-[-4%] shadow-[0px_6px_16px_0px_#7A7A7A1F] z-50 `}>
          <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.5003 2.66675C9.15366 2.66675 3.16699 8.65341 3.16699 16.0001C3.16699 23.3467 9.15366 29.3334 16.5003 29.3334C23.847 29.3334 29.8337 23.3467 29.8337 16.0001C29.8337 8.65341 23.847 2.66675 16.5003 2.66675ZM22.8737 12.9334L15.3137 20.4934C15.127 20.6801 14.8737 20.7867 14.607 20.7867C14.3403 20.7867 14.087 20.6801 13.9003 20.4934L10.127 16.7201C9.74032 16.3334 9.74032 15.6934 10.127 15.3067C10.5137 14.9201 11.1537 14.9201 11.5403 15.3067L14.607 18.3734L21.4603 11.5201C21.847 11.1334 22.487 11.1334 22.8737 11.5201C23.2603 11.9067 23.2603 12.5334 22.8737 12.9334Z"
              fill="#23A26D"
            />
          </svg>
        </div>
        <div className=" min-w-0 p-10 bg-white max-md:rounded-3xl md:rounded-tl-3xl md:rounded-bl-3xl border border-[#E3F1F1] border-r-[#D1F9EF99] hidden md:flex flex-col  w-full">
          <h3 className=" m-0 text-display-xs font-bold text-[#101828] mb-10">Well done! Time for the fun part.</h3>
          <p className=" text-gray-900 text-md font-semibold">What You Get?</p>
          <ul className=" !p-0 m-0 mt-4 flex flex-col gap-y-4">
            {steps.map((step) => (
              <List step={step} key={step} />
            ))}
          </ul>
          <p className=" text-gray-900 text-md font-semibold mt-12">What's Next?</p>
          <p className=" mt-4 text-[#667085]">
            Hooray! Time to start some investing. Go to our "Stocks to buy" or "Track record" page and discover the
            hidden gems that interest you. Read reports, analyse, and stay tuned to our Email and WhatsApp updates on
            how to make the most of the platform and what's coming next.{" "}
          </p>
          <p className=" mt-4 text-[#667085]">See ya on the other side, </p>
          <p className="text-[#667085]">Team KamayaKya</p>
          <div className=" flex mt-12 gap-3 flex-wrap">
            <Button variant={ButtonVariant.primary}>
              <p className=" text-sm font-semibold">Go to Stocks to Buy</p>
            </Button>
            <Button variant={ButtonVariant.secondary} className=" border-[#0000001A]">
              <p className=" text-sm font-semibold">Go to Track Record</p>
            </Button>
          </div>
        </div>

        <div className="relative md:p-11 md:px-9 lg:px-11  md:bg-[#D1F9EF99] w-full max-md:rounded-3xl rounded-tr-3xl rounded-br-3xl md:border border-[#E3F1F1] border-l-0 overflow-visible z-20">
          <div className="min-w-[320px]  max-w-[400px] mx-auto  pt-12 px-9  flex flex-col items-center [&>*]:w-full gap-y-6 bg-white rounded-xl relative overflow-visible z-50">
            <div className=" !h-[56px] !w-[56px] hidden md:flex items-center justify-center bg-white rounded-full absolute top-[-10%] md:top-[-4%] shadow-[0px_6px_16px_0px_#7A7A7A1F] z-50">
              <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.5003 2.66675C9.15366 2.66675 3.16699 8.65341 3.16699 16.0001C3.16699 23.3467 9.15366 29.3334 16.5003 29.3334C23.847 29.3334 29.8337 23.3467 29.8337 16.0001C29.8337 8.65341 23.847 2.66675 16.5003 2.66675ZM22.8737 12.9334L15.3137 20.4934C15.127 20.6801 14.8737 20.7867 14.607 20.7867C14.3403 20.7867 14.087 20.6801 13.9003 20.4934L10.127 16.7201C9.74032 16.3334 9.74032 15.6934 10.127 15.3067C10.5137 14.9201 11.1537 14.9201 11.5403 15.3067L14.607 18.3734L21.4603 11.5201C21.847 11.1334 22.487 11.1334 22.8737 11.5201C23.2603 11.9067 23.2603 12.5334 22.8737 12.9334Z"
                  fill="#23A26D"
                />
              </svg>
            </div>
            <div>
              <p className=" text-sm text-[#474747] text-center">Total Payment</p>
              <h3 className=" text-[28px] font-semibold text-[#121212] text-center m-0 mt-[6px]">₹15000</h3>
            </div>
            <div className={`${showDetail ? "grid":" hidden"} md:grid grid-cols-2 gap-3`}>
              <div className=" col-span-2 grid grid-cols-2 border border-[#EDEDED] rounded-md">
                <div className=" col-span-2 p-4 border-b border-b-[#EDEDED]">
                  <p className=" text-[#707070] text-2xs truncate">Plan</p>
                  <p className=" text-[#121212] text-xs mt-1 font-medium truncate">
                    VIP - Main board & SME board (3yrs)
                  </p>
                </div>
                <div className=" col-span-1  p-4 border-r border-r-[#EDEDED]">
                  <p className=" text-[#707070] text-2xs truncate">Start Date</p>
                  <p className=" text-[#121212] text-xs mt-1 font-medium truncate">25 Feb 2023, 13:22</p>
                </div>
                <div className=" col-span-1  p-4">
                  <p className=" text-[#707070] text-2xs truncate">End Date</p>
                  <p className=" text-[#121212] text-xs mt-1 font-medium truncate">25 Feb 2026, 13:22</p>
                </div>
              </div>
              <div className=" col-span-1 p-4 border border-[#EDEDED] rounded-md">
                <p className=" text-[#707070] text-2xs truncate">Order Number</p>
                <p className=" text-[#121212] text-xs mt-1 font-medium truncate">000085752257</p>
              </div>
              <div className=" col-span-1 p-4 border border-[#EDEDED] rounded-md">
                <p className=" text-[#707070] text-2xs truncate">Payment Time</p>
                <p className=" text-[#121212] text-xs mt-1 font-medium truncate">25 Feb 2023, 13:22</p>
              </div>
              <div className=" col-span-1 p-4 border border-[#EDEDED] rounded-md">
                <p className=" text-[#707070] text-2xs truncate">Payment Method</p>
                <p className=" text-[#121212] text-xs mt-1 font-medium truncate">Bank Transfer</p>
              </div>
              <div className=" col-span-1 p-4 border border-[#EDEDED] rounded-md">
                <p className=" text-[#707070] text-2xs truncate">Sender Name</p>
                <p className=" text-[#121212] text-xs mt-1 font-medium truncate">Antonio Roberto</p>
              </div>
            </div>
            <div className=" h-[1px] bg-[#E8EAED]"></div>
            <div className={` ${showDetail ? "flex":" hidden"} md:flex flex-col gap-y-3`}>
              <div className=" flex justify-between items-center">
                <p className=" text-sm text-[#101828]">Base Price</p>
                <p className=" text-sm text-[#667085]">₹12,711.86</p>
              </div>
              <div className=" flex justify-between items-center">
                <p className=" text-sm text-[#101828]">Base Price</p>
                <p className=" text-sm text-[#667085]">₹12,711.86</p>
              </div>
              <div className=" flex justify-between items-center">
                <p className=" text-sm text-[#101828]">Base Price</p>
                <p className=" text-sm text-[#667085]">₹12,711.86</p>
              </div>
              <div className=" pt-1 border-t border-dashed border-t-[#667085]"></div>
              <div className=" mt-[-1px] flex justify-between items-center">
                <p className=" text-sm text-[#101828]">Total</p>
                <p className=" text-sm text-[#010101] font-bold">₹15,000</p>
              </div>
            </div>
            <div className=" relative z-10 flex flex-wrap gap-3 items-center">
              <Button className=" border-[#0000001A] gap-x-2 mx-auto" variant={ButtonVariant.secondary}>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.32031 12.0339L11.8803 14.5939L14.4403 12.0339"
                    stroke="#02425B"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.8799 4.354V14.524"
                    stroke="#02425B"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20 12.5339C20 16.9539 17 20.5339 12 20.5339C7 20.5339 4 16.9539 4 12.5339"
                    stroke="#02425B"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <p className=" text-2xs md:text-sm text-[#02425B]">Get PDF Receipt</p>
              </Button>
              <Button onClick={()=>setShowDetail(true)} className=" md:hidden border-[#0000001A] gap-x-2 mx-auto" variant={ButtonVariant.secondary}>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.32031 12.0339L11.8803 14.5939L14.4403 12.0339"
                    stroke="#02425B"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.8799 4.354V14.524"
                    stroke="#02425B"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20 12.5339C20 16.9539 17 20.5339 12 20.5339C7 20.5339 4 16.9539 4 12.5339"
                    stroke="#02425B"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <p className=" text-2xs md:text-sm text-[#02425B]">View Details</p>
              </Button>
            </div>
            <div className=" absolute w-full h-[30px] -bottom-4 z-[1] ">
              <img height={30} className=" w-full" src="/receipt.svg" alt="" />
            </div>
          </div>
          <div className=" hidden md:block absolute bottom-0 right-0 z-10">
            <img src="/receipt_mascot.png" alt="" />
          </div>
        </div>
        <div className="block md:hidden">
          <div className=" flex justify-between items-center">
            <h3 className=" text-lg font-bold text-brand-700">Well done! Time for the fun part.</h3>
            <img className=" -mb-3 relative z-10" width={88} height={116} src="/receipt_mascot.png" alt="mascot-img" />
          </div>
          <div className=" px-6 py-7 bg-white rounded-xl relative z-20">
            <p className=" text-md text-gray-900">What You Get?</p>
            <ul className=" !p-0 m-0 mt-4 flex flex-col gap-y-4">
              {steps.map((step) => (
                <List step={step} key={step} />
              ))}
            </ul>
          </div>
        </div>
        <div
          className=" left-0  fixed flex md:hidden bottom-0 gap-x-3 z-30 w-full p-4 bg-white shadow-[0px_5px_28.4px_0px_#00000040]
"
        >
          <Button className=" flex-1" variant={ButtonVariant.primary}>
            <p className=" text-2xs sm:text-sm font-semibold">Go to Stocks to Buy</p>
          </Button>
          <Button variant={ButtonVariant.secondary} className=" border-[#0000001A] flex-1">
            <p className=" text-2xs  sm:text-sm font-semibold">Go to Track Record</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
