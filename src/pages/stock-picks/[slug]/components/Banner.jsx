import { useContext } from "react";
import Link from "next/link";
import AuthContext from "@/components/AuthContext";
import { useMediaQuery } from "@mui/material";
import { useActivePlanContext } from "@/components/PlanContext";
import { getMixPanelClient } from "@/externals/mixpanel";
import { usePathname } from "next/navigation";

const Banner = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const { isLoggedIn, user } = useContext(AuthContext);
  const activePlan = useActivePlanContext();
  const pathname = usePathname();
  // Determine if the user is a VIP user
  const isVipUser = activePlan.activePlan?.plan?.includes("vip");

  // Determine if the user has a core or advance subscription
  const hasCoreOrAdvance = activePlan?.activePlan?.plan === "core" || activePlan?.activePlan?.plan === "advanced";

  // Render nothing if the user is a VIP user
  if (isLoggedIn && isVipUser) {
    return null;
  }

  return (
    <>
      {isMobile ? (
        <>
          <div className="p-5 bg-gray-100 mt-5 rounded-md block sm:hidden sm:w-full w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto">
            <div className="flex relative">
              <div className="!w-[75%]">
                <p className="font-bold mb-2 font-open_sans text-xs text-[0.813rem]">
                  Don't miss out on potential gains!
                </p>
                <p className="mb-4 text-[#344054] font-open_sans text-[0.813rem]">
                  Upgrade now to get access to both SME and Mainboard stocks.
                </p>
              </div>
              <div className="!w-[25%]">
                <img src="/assets/Frame.svg" alt="sss" className="absolute top-0 right-0 h-[70px] w-[78px]" />
              </div>
            </div>
            <Link
              href={`/pricing`}
              onClick={() => {
                const mp = getMixPanelClient();
                if (isLoggedIn && hasCoreOrAdvance) {
                  mp.track("upgrade_clicked", {
                    page: pathname.includes("track-record") ? "StockPickTR_Page" : "StockPick_DetailedPage",
                    type: "upsell",
                  });
                } else {
                  mp.track("upgrade_now_clicked", {
                    page: pathname.includes("track-record") ? "StockPickTR_Page" : "StockPick_DetailedPage",
                    pagegroup: "Investment_Guidance",
                  });
                }
              }}
            >
              <button className="w-full hover:scale-[0.95] bg-[#125B54] hover:bg-[#0B3A36] text-white p-2 rounded-lg justify-center items-center flex">
                <span className="flex gap-2 font-open_sans text-sm font-medium">
                  <img src="/assets/white-icon.svg" alt="" />
                  {isLoggedIn && hasCoreOrAdvance ? "Upgrade to VIP" : "Upgrade Now"}
                </span>
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="p-4 bg-gray-100 mt-2 rounded-lg hidden sm:block">
            <div className="flex relative !mb-[24px]">
              <div className="!w-[75%]">
                <p className="font-bold mb-2 font-open_san text-xs">Don't miss out on potential gains!</p>
                <p className="text-[#344054] font-open_sans !text-xs">
                  Upgrade now to get access to both SME and Mainboard stocks.
                </p>
              </div>
              <div className="!w-[25%]">
                <img src="/assets/Frame.svg" alt="sss" className="absolute top-0 right-0 h-[71px] w-[78px]" />
              </div>
            </div>
            <Link
              onClick={() => {
                const mp = getMixPanelClient();
                if (isLoggedIn && hasCoreOrAdvance) {
                  mp.track("upgrade_clicked", {
                    page: pathname.includes("track-record") ? "StockPickTR_Page" : "StockPick_DetailedPage",
                    type: "upsell",
                  });
                } else {
                  mp.track("upgrade_now_clicked", {
                    page: pathname.includes("track-record") ? "StockPickTR_Page" : "StockPick_DetailedPage",
                    pagegroup: "Investment_Guidance",
                  });
                }
              }}
              href={`/pricing`}
            >
              <button className="w-full hover:scale-[0.95] bg-[#125B54] hover:bg-[#0B3A36] duration-300 text-white p-2 rounded-lg justify-center items-center hidden sm:flex">
                <span className="flex gap-2 font-open_sans text-sm font-medium">
                  <img src="/assets/white-icon.svg" alt="" />
                  {isLoggedIn && hasCoreOrAdvance ? "Upgrade to VIP" : "Upgrade Now"}
                </span>
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Banner;
