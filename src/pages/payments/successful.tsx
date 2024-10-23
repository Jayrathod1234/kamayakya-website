import React from "react";
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
  return (
    <div className=" bg-white open_sans">
      <Header />
      <div className=" md:-mt-[10%] flex flex-col gap-y-4 md:flex-row main-container ">
        <div className=" p-10 bg-white max-md:rounded-3xl md:rounded-tl-3xl md:rounded-bl-3xl border border-[#E3F1F1] border-r-[#D1F9EF99] flex flex-col  w-full">
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
          <div className=" flex mt-12 gap-x-3">
            <Button variant={ButtonVariant.primary}>
              <p className=" text-sm font-semibold">Go to Stocks to Buy</p>
            </Button>
            <Button variant={ButtonVariant.secondary} className=" border-[#0000001A]">
              <p className=" text-sm font-semibold">Go to Track Record</p>
            </Button>
          </div>
        </div>
        <div className="p-11 min-w-0 bg-[#D1F9EF99] w-full max-md:rounded-3xl rounded-tr-3xl rounded-br-3xl border border-[#E3F1F1] border-l-0">
            <div className=" pt-12 px-9 pb-8 rounded-xl flex flex-col gap-y-6">
              <p className=" text-sm text-[#474747]">Total Payment</p>
            </div>
        </div>
      </div>
    </div>
  );
}
