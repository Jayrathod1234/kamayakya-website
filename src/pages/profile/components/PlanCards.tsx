import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components.v2/ui/drawer";
import { PLAN } from "@/constants/pricing/plans";
import { convertDaysToPlanDuration } from "@/lib/date-formatter";
import ToPayTooltip from "@/pages/payments/components/ToPayTooltip";
import { format } from "date-fns";
import { ShoppingBag } from "lucide-react";
import React from "react";

const ADVANCED_ICON = (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="8" fill="#FFF0E1" />
    <path
      d="M29.0194 14.9128C28.9429 14.7749 28.8273 14.6627 28.6872 14.5905C28.5471 14.5182 28.3888 14.4889 28.2321 14.5065C28.0755 14.5221 27.9268 14.5828 27.804 14.6813C27.6813 14.7799 27.5898 14.9119 27.5407 15.0614C27.3144 15.71 26.9679 16.3101 26.5193 16.8302C26.4489 16.4289 26.3558 16.0056 26.2398 15.5603C25.7643 13.596 24.6772 11.8335 23.1353 10.5269C22.5533 9.98205 21.7963 9.66232 21 9.625C19.5855 9.625 19.375 11.3621 19.1565 13.2C18.9875 14.6064 18.764 16.4752 18.0385 16.8644C17.9272 16.5223 17.811 15.943 17.7338 15.5595C17.4462 14.1189 17.1967 12.875 16.125 12.875C15.7943 12.9199 15.4781 13.0393 15.2001 13.2241C14.9222 13.4089 14.6898 13.6543 14.5203 13.9418C13.3168 15.6948 12.4807 17.6733 12.0625 19.7582C11.6443 21.843 11.6526 23.9909 12.0869 26.0724C13.0148 29.7831 16.68 32.375 21 32.375C25.338 32.375 28.6416 29.1664 29.875 26.187C31.1872 23.0312 30.8118 18.0823 29.0194 14.9128Z"
      fill="url(#paint0_linear_16617_5570)"
    />
    <path
      d="M25.96 20.688C25.9093 20.5717 25.8122 20.4793 25.6901 20.431C25.63 20.4066 25.5655 20.3936 25.5001 20.3929H23.0009C22.8683 20.3929 22.7412 20.443 22.6474 20.5323C22.5537 20.6215 22.501 20.7426 22.501 20.8688C22.501 20.9951 22.5537 21.1161 22.6474 21.2054C22.7412 21.2947 22.8683 21.3448 23.0009 21.3448H24.2955L21.5013 24.0054L19.8568 22.4348C19.8103 22.3901 19.755 22.3547 19.6941 22.3306C19.6332 22.3064 19.5679 22.294 19.5019 22.294C19.4359 22.294 19.3706 22.3064 19.3097 22.3306C19.2487 22.3547 19.1935 22.3901 19.147 22.4348L16.1479 25.2905C16.101 25.3348 16.0638 25.3874 16.0384 25.4454C16.0131 25.5034 16 25.5656 16 25.6284C16 25.6913 16.0131 25.7535 16.0384 25.8115C16.0638 25.8695 16.101 25.9221 16.1479 25.9664C16.1943 26.011 16.2496 26.0464 16.3105 26.0706C16.3714 26.0947 16.4368 26.1072 16.5028 26.1072C16.5687 26.1072 16.6341 26.0947 16.695 26.0706C16.7559 26.0464 16.8112 26.011 16.8577 25.9664L19.5019 23.4438L21.1464 25.0145C21.1929 25.0591 21.2482 25.0945 21.3091 25.1186C21.37 25.1428 21.4353 25.1552 21.5013 25.1552C21.5673 25.1552 21.6326 25.1428 21.6935 25.1186C21.7544 25.0945 21.8097 25.0591 21.8562 25.0145L25.0003 22.0159V23.2486C25.0003 23.3749 25.053 23.4959 25.1467 23.5852C25.2404 23.6745 25.3676 23.7246 25.5001 23.7246C25.6327 23.7246 25.7599 23.6745 25.8536 23.5852C25.9473 23.4959 26 23.3749 26 23.2486V20.8688C25.9992 20.8066 25.9856 20.7452 25.96 20.688Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_16617_5570"
        x1="21.2059"
        y1="9.625"
        x2="21.2059"
        y2="32.375"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FF9F2A" />
        <stop offset="1" stop-color="#FF6D2A" />
      </linearGradient>
    </defs>
  </svg>
);

const CORE_ICON = (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="8" fill="#E4FAFF" />
    <rect x="11" y="11" width="20" height="20" rx="6" fill="url(#paint0_linear_16617_5675)" />
    <path
      d="M26.9521 17.7725C26.8912 17.6258 26.7746 17.5093 26.628 17.4484C26.5558 17.4176 26.4784 17.4013 26.3999 17.4004H23.3993C23.2402 17.4004 23.0875 17.4636 22.975 17.5762C22.8624 17.6887 22.7992 17.8414 22.7992 18.0005C22.7992 18.1597 22.8624 18.3123 22.975 18.4249C23.0875 18.5374 23.2402 18.6006 23.3993 18.6006H24.9536L21.599 21.9553L19.6246 19.9749C19.5688 19.9187 19.5024 19.874 19.4293 19.8436C19.3561 19.8131 19.2777 19.7974 19.1985 19.7974C19.1193 19.7974 19.0408 19.8131 18.9677 19.8436C18.8946 19.874 18.8282 19.9187 18.7724 19.9749L15.1717 23.5756C15.1154 23.6314 15.0708 23.6978 15.0403 23.7709C15.0098 23.8441 14.9941 23.9225 14.9941 24.0017C14.9941 24.081 15.0098 24.1594 15.0403 24.2325C15.0708 24.3057 15.1154 24.372 15.1717 24.4278C15.2274 24.4841 15.2938 24.5287 15.3669 24.5592C15.4401 24.5896 15.5185 24.6053 15.5977 24.6053C15.677 24.6053 15.7554 24.5896 15.8285 24.5592C15.9017 24.5287 15.968 24.4841 16.0238 24.4278L19.1985 21.2472L21.1729 23.2276C21.2287 23.2838 21.295 23.3285 21.3682 23.3589C21.4413 23.3894 21.5197 23.4051 21.599 23.4051C21.6782 23.4051 21.7566 23.3894 21.8298 23.3589C21.9029 23.3285 21.9693 23.2838 22.025 23.2276L25.7998 19.4468V21.0011C25.7998 21.1603 25.863 21.3129 25.9756 21.4255C26.0881 21.538 26.2408 21.6012 26.3999 21.6012C26.5591 21.6012 26.7117 21.538 26.8243 21.4255C26.9368 21.3129 27.0001 21.1603 27.0001 21.0011V18.0005C26.9991 17.9221 26.9828 17.8446 26.9521 17.7725Z"
      fill="white"
    />
    <defs>
      <linearGradient id="paint0_linear_16617_5675" x1="21" y1="11" x2="21" y2="31" gradientUnits="userSpaceOnUse">
        <stop stop-color="#16D4FF" />
        <stop offset="1" stop-color="#0094CA" />
      </linearGradient>
    </defs>
  </svg>
);

const VIP_ICON = (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="8" fill="#EBFBF0" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M30.8382 20.1263L30.609 22.5616C30.2313 26.5742 30.0425 28.5805 28.8599 29.7902C27.6773 31 25.9048 31 22.3599 31H19.6401C16.0952 31 14.3227 31 13.1401 29.7902C11.9575 28.5805 11.7686 26.5742 11.391 22.5616L11.1618 20.1263C10.9818 18.2137 10.8918 17.2574 11.219 16.8621C11.396 16.6482 11.6367 16.5172 11.894 16.4946C12.3697 16.4528 12.9671 17.1329 14.1619 18.4931C14.7798 19.1965 15.0887 19.5482 15.4334 19.6027C15.6243 19.6328 15.8189 19.6018 15.9953 19.5131C16.3135 19.3529 16.5257 18.9181 16.9501 18.0485L19.1869 13.4649C19.9888 11.8216 20.3898 11 21 11C21.6102 11 22.0112 11.8216 22.8131 13.4648L25.0499 18.0485C25.4743 18.9181 25.6865 19.3529 26.0047 19.5131C26.1811 19.6018 26.3757 19.6328 26.5666 19.6027C26.9113 19.5482 27.2202 19.1965 27.8381 18.4931C29.0329 17.1329 29.6303 16.4528 30.106 16.4946C30.3633 16.5172 30.604 16.6482 30.781 16.8621C31.1082 17.2574 31.0182 18.2137 30.8382 20.1263ZM21.9524 21.699L21.8541 21.5227C21.4741 20.841 21.2841 20.5002 21 20.5002C20.7159 20.5002 20.5259 20.841 20.1459 21.5227L20.0476 21.699C19.9397 21.8927 19.8857 21.9896 19.8015 22.0535C19.7173 22.1174 19.6125 22.1411 19.4028 22.1886L19.2119 22.2318C18.474 22.3987 18.105 22.4822 18.0172 22.7645C17.9294 23.0468 18.181 23.3409 18.684 23.9291L18.8142 24.0813C18.9571 24.2485 19.0286 24.3321 19.0608 24.4355C19.0929 24.5389 19.0821 24.6504 19.0605 24.8734L19.0408 25.0765C18.9648 25.8613 18.9267 26.2538 19.1565 26.4282C19.3864 26.6027 19.7318 26.4436 20.4227 26.1255L20.6014 26.0432C20.7978 25.9528 20.8959 25.9076 21 25.9076C21.1041 25.9076 21.2022 25.9528 21.3986 26.0432L21.5773 26.1255C22.2682 26.4436 22.6136 26.6027 22.8435 26.4282C23.0733 26.2538 23.0352 25.8613 22.9592 25.0765L22.9395 24.8734C22.9179 24.6504 22.9071 24.5389 22.9392 24.4355C22.9714 24.3321 23.0429 24.2485 23.1858 24.0813L23.316 23.9291C23.819 23.3409 24.0706 23.0468 23.9828 22.7645C23.895 22.4822 23.526 22.3987 22.7881 22.2318L22.5972 22.1886C22.3875 22.1411 22.2827 22.1174 22.1985 22.0535C22.1143 21.9896 22.0603 21.8927 21.9524 21.699Z"
      fill="url(#paint0_linear_16617_5641)"
    />
    <defs>
      <linearGradient id="paint0_linear_16617_5641" x1="21" y1="11" x2="21" y2="31" gradientUnits="userSpaceOnUse">
        <stop stop-color="#4ED364" />
        <stop offset="1" stop-color="#0F928B" />
      </linearGradient>
    </defs>
  </svg>
);

export default function PlanCards({ plan }) {
  const paymentTime = plan?.payment_time ? format(new Date(plan?.payment_time), "dd MMM, yyyy") : "NA";
  const startDate = plan?.start_date ? format(new Date(plan?.start_date), "dd MMM, yyyy") : "NA";
  const endDate = plan?.end_date ? format(new Date(plan?.end_date), "dd MMM, yyyy ") : "NA";
  const amount = plan?.paid_amount + plan?.discount_amount;
  const basePrice = Number(amount / 1.18);
  const gst = amount - basePrice;
  const grandTotal = plan.paid_amount?.toLocaleString("en-IN");
  const discountAmount = plan?.discount_amount;
  const discountPercent = ((discountAmount / amount) * 100).toFixed(2);
  const planName = plan.subscription_name;
  const duration = convertDaysToPlanDuration(plan.subscription_days);
  const subtext = PLAN[planName as keyof typeof PLAN].label;

  function getIcon() {
    switch (planName) {
      case "vip":
        return VIP_ICON;
      case "core":
        return CORE_ICON;
      case "advanced":
        return ADVANCED_ICON;
    }
  }

  return (
    <Drawer>
      <div className=" p-4  bg-white rounded-xl">
        <div className=" flex items-center  gap-x-[10px] justify-between">
          <div className=" col-start-1">{getIcon()}</div>
          <div className=" ">
            <div className="flex items-center gap-x-[6px]">
              <p className=" text-gray-950 font-semibold uppercase">{planName}</p>
              <svg width="3" height="4" viewBox="0 0 3 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="1.5" cy="2" r="1.5" fill="#D9D9D9" />
              </svg>
              <p className=" text-xs font-medium text-gray-600">{duration}</p>
            </div>
            <p className=" text-2xs text-gray-500">{subtext}</p>
          </div>
          <div className=" col-start-3 ml-auto">
            <p className=" font-bold text-brand-400">₹{plan?.paid_amount?.toLocaleString("en-IN")}</p>
          </div>
        </div>
        <div className=" mt-5">
          <p className=" text-xs font-medium text-gray-800">
            Membership Validity : {startDate} - {endDate}
          </p>
          <div className=" flex items-center gap-x-[6px]">
            <ShoppingBag color="#98A2B3" size={12} />
            <p className=" text-2xs text-gray-400">Purchased on {paymentTime}</p>
          </div>
        </div>
        <DrawerTrigger className=" min-w-0 w-full">
          <Button className=" mt-6 w-full" variant={ButtonVariant.tertiary}>
            <p className=" text-sm font-medium">See Details</p>
          </Button>
        </DrawerTrigger>
      </div>
      <DrawerContent>
        <div className=" h-1 w-10 mx-auto mt-2 rounded-full bg-[#B1B1B1]"></div>
        <div className=" open_sans pt-8 pb-4 px-5 flex flex-col items-center [&>*]:w-full gap-y-6 bg-white rounded-xl relative overflow-visible z-50">
          <div>
            <p className=" text-sm text-[#474747] text-center">Total Payment</p>
            <h3 className=" text-[28px] font-semibold text-[#121212] text-center m-0 mt-[6px]">₹{grandTotal}</h3>
            <div
              className={` my-4 ${true ? "hidden" : "block"} md:hidden px-3 rounded-full bg-[#DFFAEC] mx-auto w-fit`}
            >
              {/* <p className=" text-2xs text-[#128454]"> {PLAN[paymentDetails?.subscription_name]?.paymentPageLabel}</p> */}
            </div>
            <div className={` w-full border border-dashed ${true ? "hidden" : "block"} md:hidden`}></div>
          </div>

          <div className={`grid md:grid grid-cols-2 gap-3`}>
            <div className=" col-span-2 grid grid-cols-2 border border-[#EDEDED] rounded-md">
              <div className=" col-span-2 p-3 border-b border-b-[#EDEDED]">
                <p className=" text-[#707070] text-2xs truncate">Plan</p>
                <p className=" text-[#121212] text-xs mt-1 font-medium truncate">
                  {PLAN[planName as keyof typeof PLAN]?.paymentPageLabel}
                </p>
              </div>
              <div className=" col-span-1  p-3 border-r border-r-[#EDEDED]">
                <p className=" text-[#707070] text-2xs truncate">Start Date</p>
                <p className=" text-[#121212] text-xs mt-1 font-medium truncate">
                  {format(new Date(plan.start_date), "dd MMM yyyy, hh:mm")}
                </p>
              </div>
              <div className=" col-span-1  p-3">
                <p className=" text-[#707070] text-2xs truncate">End Date</p>
                <p className=" text-[#121212] text-xs mt-1 font-medium truncate">
                  {format(new Date(plan.end_date), "dd MMM yyyy, hh:mm")}
                </p>
              </div>
            </div>
            <div className=" col-span-1 p-3 border border-[#EDEDED] rounded-md">
              <p className=" text-[#707070] text-2xs truncate">Order Number</p>
              <p className=" text-[#121212] text-xs mt-1 font-medium truncate">{plan.order_number}</p>
            </div>
            <div className=" col-span-1 p-3 border border-[#EDEDED] rounded-md">
              <p className=" text-[#707070] text-2xs truncate">Payment Time</p>
              <p className=" text-[#121212] text-xs mt-1 font-medium truncate">
                {format(new Date(plan.payment_time), "dd MMM yyyy, hh:mm")}
              </p>
            </div>
            <div className=" col-span-1 p-3 border border-[#EDEDED] rounded-md">
              <p className=" text-[#707070] text-2xs truncate">Payment Method</p>
              <p className=" text-[#121212] text-xs mt-1 font-medium truncate">{plan.payment_method}</p>
            </div>
            <div className=" col-span-1 p-3 border border-[#EDEDED] rounded-md">
              <p className=" text-[#707070] text-2xs truncate">Sender Name</p>
              <p className=" text-[#121212] text-xs mt-1 font-medium truncate">{plan.sender_name}</p>
            </div>
          </div>
          <div className="h-[1px] bg-[#E8EAED]"></div>
          <div className={`  flex md:flex flex-col gap-y-3`}>
            <div className="flex flex-col gap-y-4">
              <div className=" flex justify-between items-center">
                <p className=" text-sm text-[#101828]">Base Price</p>
                <p className=" text-sm text-[#667085]">₹{Number(basePrice.toFixed(2)).toLocaleString("hi")}</p>
              </div>
              <div className=" flex justify-between items-center">
                <div>
                  <p className=" text-sm text-[#101828]">Tax (18%)</p>
                </div>
                <p className=" text-sm text-[#667085]">₹{Number(gst.toFixed(2)).toLocaleString("hi")}</p>
              </div>
            </div>

            <div className=" pt-1 border-t border-dashed border-t-[#667085]"></div>
            <div className=" flex flex-col gap-y-[10px]">
              <div className=" mt-[-1px] flex justify-between items-center">
                <p className="font-medium text-[#101828]">Total Amount</p>
                <p className=" text-[#010101] font-medium">₹{Number(amount).toLocaleString("hi")}</p>
              </div>
              {plan.discount_amount ? (
                <>
                  {" "}
                  <div className=" mt-[-1px] flex justify-between items-center">
                    <p className=" text-sm text-[#1BB991]">
                      Discount ({plan.discount_code} - {discountPercent}% off)
                    </p>
                    <p className=" text-sm text-[#1BB991] font-medium">
                      - ₹{Number(plan.discount_amount).toLocaleString("hi")}
                    </p>
                  </div>
                  <div className=" mt-[-1px] flex justify-between items-center">
                    <div className=" flex items-center gap-x-1">
                      <p className=" font-bold text-[#101828]">Grand Total</p>
                      <ToPayTooltip
                        price={`₹${Number((Number(plan.paid_amount) / 1.18).toFixed(2)).toLocaleString("hi")}`}
                        saveText={""}
                        strikePrice={""}
                        gst={`₹${Number(
                          (Number(plan.paid_amount) - Number(plan.paid_amount) / 1.18).toFixed(2)
                        ).toLocaleString("hi")}`}
                        total={`₹${Number(plan.paid_amount).toLocaleString("hi")}`}
                      >
                        <div className=" flex justify-center items-center">
                          <img width={16} height={16} alt="info-icon" src="/icons/info-icon.svg" />
                        </div>
                      </ToPayTooltip>
                    </div>

                    <p className="  text-[#010101] font-bold">₹{Number(plan.paid_amount)?.toLocaleString("hi")}</p>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <Button
            onClick={() => window.open(plan.invoice, "_blank")}
            className=" border-[#0000001A] gap-x-[6px] mx-auto !w-fit"
            variant={ButtonVariant.primary}
          >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.50016 7.92902V11.929M6.50016 11.929L7.8335 10.5957M6.50016 11.929L5.16683 10.5957M15.1668 7.26235V10.5957C15.1668 13.929 13.8335 15.2623 10.5002 15.2623H6.50016C3.16683 15.2623 1.8335 13.929 1.8335 10.5957V6.59568C1.8335 3.26235 3.16683 1.92902 6.50016 1.92902H9.8335M15.1668 7.26235H12.5002C10.5002 7.26235 9.8335 6.59568 9.8335 4.59568V1.92902M15.1668 7.26235L9.8335 1.92902"
                stroke="white"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p className=" text-sm ">Download Invoice</p>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
