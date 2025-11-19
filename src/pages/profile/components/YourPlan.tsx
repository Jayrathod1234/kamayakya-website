import { ChevronRight } from "lucide-react";
import React, { act, useContext, useEffect, useState } from "react";
import SectionHead from "./SectionHead";
import AuthContext from "@/components/AuthContext";
import { format, formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { useActivePlanContext } from "@/components/PlanContext";
import { PLAN } from "@/constants/pricing/plans";
import { abbreviateTimeForPlan } from "@/lib/date-formatter";
import Link from "next/link";
import { getUserProfilePaymentHistory } from "@/api/profile";
import { getMixPanelClient } from "@/externals/mixpanel";

interface IDateSection {
  dateLabel: string;
  date: string;
}

const DateSection = ({ dateLabel, date }: IDateSection) => {
  return (
    <div className="flex justify-between items-center p-4 sm:p-6 flex-wrap bg-gray-50 ">
      <p className="m-0 text-gray-600 font-medium text-2xs sm:text-sm">{dateLabel}</p>
      <p className="m-0 text-gray-900 font-medium max-sm:mt-2 text-sm sm:text-md">{date}</p>
    </div>
  );
};

export default function YourPlan() {
  const { user } = useContext(AuthContext);
  const { activePlan } = useActivePlanContext();
  const [hasPrepaid, setHasPrepaid] = useState(false);

  const memberSince = user?.created ? format(new Date(user?.created || ""), "MMM yyyy") : "NA";
  const startDate = activePlan?.start_date ? format(new Date(activePlan?.start_date || ""), "dd MMM yyyy") : "NA";
  const endDate = activePlan?.end_date ? format(new Date(activePlan.end_date), "dd MMM yyyy") : "NA";
  const dateDistance = activePlan?.end_date ? formatDistanceToNowStrict(new Date(activePlan?.end_date)) : null;

  useEffect(() => {
    const checkPrepaidStatus = async () => {
      try {
        const res = await getUserProfilePaymentHistory();
        const paymentHistory = res?.data || [];

        if (activePlan?.end_date && Array.isArray(paymentHistory) && paymentHistory.length > 0) {
          // Sort payment history by payment_time (most recent first) and get the latest payment
          const sortedPayments = [...paymentHistory].sort((a: any, b: any) => {
            const dateA = a?.payment_time ? new Date(a.payment_time).getTime() : 0;
            const dateB = b?.payment_time ? new Date(b.payment_time).getTime() : 0;
            return dateB - dateA;
          });

          const latestPayment = sortedPayments[0];
          const latestPaymentEndDate = latestPayment?.end_date ? new Date(latestPayment.end_date).getTime() : null;
          const activePlanEndDate = new Date(activePlan.end_date).getTime();

          // If latest payment's end date is greater than current active plan's end date,
          // it means there's a prepaid/future payment, so don't show expiration text
          // Otherwise, show expiration text (current plan is the active one)
          if (latestPaymentEndDate && latestPaymentEndDate > activePlanEndDate) {
            setHasPrepaid(true); // Has prepaid payment, don't show expiration
          } else {
            setHasPrepaid(false); // No prepaid payment, show expiration
          }
        } else {
          // If no payment history, default to showing expiration text
          setHasPrepaid(false);
        }
      } catch (e) {
        // If error, default to showing expiration text
        setHasPrepaid(false);
      }
    };

    if (activePlan?.plan && activePlan.plan !== "Free") {
      checkPrepaidStatus();
    }
  }, [activePlan]);

  return (
    <div id="your-plan">
      <SectionHead sectionHead="Your Plan" />

      <div className=" mt-3 bg-white rounded-xl overflow-hidden">
        <div>
          <div className=" bg-[linear-gradient(89.92deg,rgba(255,205,143,0.2)_-28.84%,rgba(255,225,190,0.2)_107.35%)] p-[6px] flex items-center justify-center">
            <p className="m-0 text-orange-700 font-medium text-2xs sm:text-sm">Member since {memberSince}</p>
          </div>
          <div className=" p-4 sm:p-6">
            <h4 className=" font-semibold sm:font-bold text-md sm:text-lg m-0">
              {activePlan?.plan?.toLowerCase()?.includes("free") ? (
                <>Free</>
              ) : (
                <>
                  {" "}
                  {PLAN[(activePlan.plan || "free") as keyof typeof PLAN]?.paymentPageLabel} (
                  {abbreviateTimeForPlan(activePlan?.duration)})
                </>
              )}
            </h4>
            <p className="m-0 text-[#667085] max-sm:text-sm">
              {PLAN[(activePlan.plan || "free") as keyof typeof PLAN]?.featureHead}
            </p>
            <div className=" mt-6">
              <div className=" grid grid-cols-2 rounded-lg border border-[#F0F1F2]">
                <div className="col-span-1 border-r border-r-[#F0F1F2]">
                  <DateSection dateLabel={"Start Date"} date={startDate} />
                </div>
                <div className=" col-start-2 ">
                  <DateSection dateLabel={"End Date"} date={endDate} />
                </div>
                <div className=" col-span-full row-start-2 max-sm:px-2 py-3 sm:py-5 border-t border-t-[#F0F1F2]">
                  <p className=" text-center text-gray-700 text-2xs sm:text-xs">No auto-deduction</p>
                  <p className=" text-center text-gray-500 text-3xs sm:text-xs">
                    We do not auto renew your subscription after expiry. You can choose the same or different plan to
                    renew with
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 sm:p-6 flex items-center justify-between gap-x-2 sm:bg-[#FFFBFA]">
          <div>
            <p className=" font-medium text-md text-black m-0 max-sm:hidden">Renew / Upgrade Plan</p>
            {["days", "day", "month", "hours", "hour", "minutes", "minute", "seconds", "second"].includes(
              dateDistance?.split(" ")[1] || ""
            ) &&
              !hasPrepaid && (
                <div className="flex items-center gap-x-2 -mt-4 sm:mt-[6px] max-sm:px-4 max-sm:py-3 max-sm:rounded-lg max-sm:bg-[#FFFBFA] max-sm:border max-sm:border-[#FECDCA]">
                  <svg
                    className=" h-6 w-6 sm:h-5 sm:w-5 shrink-0"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.1566 2.93878L12.1565 2.93852C11.9422 2.55534 11.6296 2.23625 11.2509 2.01413C10.8722 1.79202 10.4411 1.67493 10.0021 1.67493C9.56307 1.67493 9.13199 1.79202 8.7533 2.01413C8.37461 2.23625 8.06201 2.55534 7.84773 2.93852L7.84769 2.9386L1.3139 14.626C1.31389 14.626 1.31389 14.626 1.31388 14.626C1.10394 15.0015 0.995795 15.4254 1.00016 15.8556C1.00452 16.2858 1.12125 16.7074 1.33877 17.0786C1.55629 17.4497 1.86704 17.7576 2.24023 17.9717C2.61341 18.1857 3.03606 18.2985 3.46628 18.2989H3.46692H16.5318H16.5318C16.9622 18.2989 17.3851 18.1863 17.7586 17.9724C18.132 17.7585 18.443 17.4506 18.6608 17.0794C18.8786 16.7082 18.9955 16.2864 18.9999 15.8561C19.0044 15.4258 18.8962 15.0018 18.6863 14.6262C18.6862 14.6261 18.6862 14.6261 18.6862 14.626L12.1566 2.93878Z"
                      fill="#F04438"
                      stroke="#FECDCA"
                      stroke-width="1.5"
                    />
                    <path
                      d="M11.0318 13.7686C11.0318 14.042 10.9231 14.3043 10.7298 14.4976C10.5364 14.691 10.2742 14.7996 10.0008 14.7996C9.72732 14.7996 9.46508 14.691 9.27173 14.4976C9.07838 14.3043 8.96976 14.042 8.96976 13.7686C8.96976 13.4951 9.07838 13.2329 9.27173 13.0396C9.46508 12.8462 9.72732 12.7376 10.0008 12.7376C10.2742 12.7376 10.5364 12.8462 10.7298 13.0396C10.9231 13.2329 11.0318 13.4951 11.0318 13.7686ZM9.31342 10.6756V7.23891C9.31342 7.05662 9.38584 6.88179 9.51474 6.75289C9.64364 6.62399 9.81847 6.55157 10.0008 6.55157C10.1831 6.55157 10.3579 6.62399 10.4868 6.75289C10.6157 6.88179 10.6881 7.05662 10.6881 7.23891V10.6756C10.6881 10.8579 10.6157 11.0327 10.4868 11.1616C10.3579 11.2905 10.1831 11.3629 10.0008 11.3629C9.81847 11.3629 9.64364 11.2905 9.51474 11.1616C9.38584 11.0327 9.31342 10.8579 9.31342 10.6756Z"
                      fill="white"
                    />
                  </svg>
                  <p className=" text-error-500 text-xs sm:text-sm ">
                    {activePlan.plan !== "Free" && !hasPrepaid ? (
                      <>
                        Your subscription will expire in <span className="font-semibold">{dateDistance}</span>.{" "}
                      </>
                    ) : null}
                    Please renew or upgrade your plan to continue enjoying our services.
                  </p>
                </div>
              )}
          </div>
          <Link
            className=" text-inherit max-sm:hidden"
            href={"/pricing#plan-section"}
            onClick={() => {
              const mp = getMixPanelClient();
              mp.track("renew_clicked", {
                page: "profile_page",
              });
            }}
          >
            <ChevronRight />
          </Link>
        </div>
        <div className=" sm:hidden flex items-center justify-between mt-4 p-4 border-t border-t-[#00000014]">
          <p className=" font-medium text-sm">Renew / Upgrade Plan</p>
          <Link
            className=" text-inherit"
            href={"/pricing#plan-section"}
            onClick={() => {
              const mp = getMixPanelClient();
              mp.track("renew_clicked", {
                page: "profile_page",
              });
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.74976 16.5L14.249 12.0007L9.74976 7.50146"
                stroke="#8F9CB2"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className=" mt-[10px] gap-x-2 !rounded-[20px] flex  items-center bg-[#EFF7FF] border border-[#A6D3FF] p-4">
        <img className=" pt-[0px]" height={24} width={24} alt="info-icon" src="/info-fill.svg" />
        <div>
          <p className=" text-xs">
            To cancel your membership, please email us{" "}
            <Link href={"mailto:contact@kamayakya.com"} className=" text-inherit font-medium">
              contact@kamayakya.com
            </Link>{" "}
            We're here to help!
          </p>
        </div>
      </div>
    </div>
  );
}
