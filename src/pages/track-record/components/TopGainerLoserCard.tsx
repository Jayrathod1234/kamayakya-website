import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
} from "chart.js";
import annotationPlugin, { AnnotationOptions, LabelAnnotationOptions } from "chartjs-plugin-annotation";
import React, { useContext, useMemo, useCallback } from "react";
import AuthContext from "@/components/AuthContext";
import { abbreviateTime } from "@/lib/date-formatter";
import { TargetChip } from "@/components.v3/common/TargetChip";
import { useRouter } from "next/router";
import { ArrowDown, ArrowUp } from "lucide-react";
import LoginPrompt from "./LoginPrompt";
import LineChart from "@/components.v3/common/LineChart";
import TopGainerLoserChart from "./TopGainerLoserChart";
import { IStockPrices } from "@/types";
import { useTrackRecord } from "@/contexts/TrackRecordContext";
import Tooltip from "@/components.v3/common/Tooltip";
ChartJS.register({
  LineElement,
  ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  annotationPlugin,
});

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomData() {
  const data = [];
  for (let i = 2000; i <= 2023; i++) {
    // Generate a random count value between 10 and 50
    const count = getRandomInt(20, 80);

    data.push({ year: i.toString(), count: count.toString() });
  }
  return data;
}

const data = generateRandomData();
// console.log(randomData);

const CHART_OPTION = {
  layout: {},
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
};

export const TopGainerLoserCard = ({
  type,
  isBest,
  stockStat,
  // setOpen,
  stock_live_prices,
  entry_price,
  start_date,
}: // entry_price,
// start_date,
{
  entry_price: string;
  start_date: string;
  action?: string;
  type: string;
  isBest: boolean;
  stockStat: any;
  stock_live_prices: IStockPrices[];
  // setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isLoggedIn, isSubscribed } = useContext(AuthContext);
  const router = useRouter();
  const { setOpenMembershipModal } = useTrackRecord();

  // Memoize computed values to prevent recalculation on every render
  const isBlur = useMemo(
    () =>
      !isLoggedIn
        ? stockStat?.action === "BUY"
        : stockStat?.action === "BUY" && isLoggedIn && (!isSubscribed || !stockStat?.stock_name),
    [isLoggedIn, stockStat?.action, isSubscribed, stockStat?.stock_name]
  );

  const label = useMemo(() => {
    if (type === "LIVE") return isBest ? "Top Gainer" : "Top Loser";
    if (type === "EXIT") return isBest ? "Best Exit" : "Worst Exit";
    return "";
  }, [type, isBest]);

  const actionImgSrc = useMemo(() => {
    if (!stockStat) return null;
    switch (stockStat?.action) {
      case "BUY":
        return "./assets/BuyBubbleBluev2.webp";
      case "SELL":
        return "./assets/SellBubbleRedv2.png";
      case "HOLD":
        return "./assets/HoldBubbleYellow.png";
      default:
        return null;
    }
  }, [stockStat?.action]);

  // Memoize click handler to prevent recreation on every render
  const handleClick = useCallback(() => {
    if (stockStat?.id && stockStat?.stock_name) {
      router.push(`/track-record/${stockStat?.id}`);
    } else if (isLoggedIn) {
      setOpenMembershipModal(true);
    }
  }, [stockStat?.id, stockStat?.stock_name, isLoggedIn, router, setOpenMembershipModal]);

  // Memoize hasChart check
  const hasChartData = useMemo(
    () => Array.isArray(stock_live_prices) && stock_live_prices.length > 0,
    [stock_live_prices]
  );

  // Memoize conditional class names
  const gainLossColorClass = useMemo(
    () => (stockStat?.is_gain_loss_positive ? "text-[rgba(18,183,106,1)]" : "text-[rgba(240,68,56,1)]"),
    [stockStat?.is_gain_loss_positive]
  );

  const containerFlexClass = useMemo(
    () => (stockStat && !stockStat?.stock_name ? "flex-wrap sm:flex-nowrap flex-col sm:flex-row" : "flex-wrap"),
    [stockStat?.stock_name]
  );

  return (
    // <LoginPrompt>
    <div
      onClick={handleClick}
      className="group/gainer-loser transition-shadow duration-300 hover:shadow-[0px_8.2px_8.2px_-4.1px_rgba(16,24,40,0.04),0px_20.49px_24.59px_-4.1px_rgba(16,24,40,0.1)]
 flex flex-col bg-white rounded-[9px] p-4 h-fit sm:h-[176px] flex-1 relative cursor-pointer min-w-0 "
    >
      {actionImgSrc && (
        <img
          width={39}
          height={29}
          className=" absolute right-0 top-[-0.5rem]"
          src={actionImgSrc}
          alt={stockStat?.action}
        />
      )}

      <div className=" flex flex-col justify-center sm:flex-row sm:justify-between items-center gap-x-[3.81px] flex-wrap">
        <div className=" flex items-center gap-x-[2px]">
          <div className=" flex items-center">
            {isBest ? <ArrowUp color="#344054" size={16} /> : <ArrowDown color="#344054" size={16} />}
            <p className=" font-semibold text-sm text-[rgba(29,41,57,1)] group-hover/gainer-loser:text-brand-400 whitespace-nowrap ">
              {label}
            </p>
          </div>
          <svg
            className=" opacity-0 group-hover/gainer-loser:opacity-100   translate-x-[-2px] group-hover/gainer-loser:translate-x-[0px] transition-transform duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)]"
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.66608 2.65625L11.0807 6.24162L7.66608 9.82698"
              stroke="#108973"
              stroke-width="1.53659"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M11.0808 6.24219L2.88564 6.24219" stroke="#108973" stroke-width="1.53659" stroke-linecap="round" />
          </svg>
        </div>
        <div className=" my-5 sm:my-0  h-10 w-[98px]">
          {hasChartData ? (
            <TopGainerLoserChart
              entry_price={entry_price}
              start_date={start_date}
              stock_live_prices={stock_live_prices}
            />
          ) : null}

          {/* <Line
            className=""
            options={CHART_OPTION}
            data={{
              labels: data.map((x) => x.year),
              datasets: [
                {
                  label: "Dimensions",
                  data: data.map((row) => row.count),
                  borderColor: "#00645A",
                  pointStyle: false,
                  tension: 0.3,
                  borderWidth: 1,
                },
              ],
            }}
          /> */}
        </div>
      </div>
      <div className=" mt-auto">
        <div className=" flex items-center gap-x-[2px] max-sm:justify-center ">
          <img
            width={15}
            height={11}
            className=" !w-[15px] !h-[11px]"
            src={stockStat?.is_gain_loss_positive ?? true ? "/assets/Polygon2.svg" : "/assets/Polygon 3.svg"}
            alt=""
          />
          {stockStat && (stockStat?.gain_loss === null || stockStat?.gain_loss === undefined) ? (
            <span className=" inline-block  h-6 w-[103px] bg-[rgba(237,240,245,1)] rounded-full"></span>
          ) : (
            <p className={`flex items-baseline text-display-xs font-bold whitespace-nowrap ${gainLossColorClass}`}>
              {stockStat?.gain_loss && stockStat?.gain_loss}%{" "}
              <div className="  items-center ml-[6px] hidden sm:flex">
                {/* {stockStat?.return_time && `in ${abbreviateTime(stockStat?.return_time)}`} */}
                {/* <p className=" !m-0 flex items-center gap-x-1 text-3xs font-semibold whitespace-nowrap text-white"> */}
                <p className=" text-3xs font-semibold text-[rgba(73,70,70,1)]   ">
                  in{" "}
                  {stockStat?.return_time?.includes(",")
                    ? abbreviateTime(stockStat?.return_time)
                    : stockStat?.return_time}{" "}
                </p>
                {stockStat?.return_time?.includes(",") && (
                  <Tooltip
                    tooltipTrigger={
                      <img
                        className="!h-[14px] !w-[14px] object-contain bg-[rgba(255,255,255,0.6)] rounded-full"
                        height={14}
                        width={14}
                        src="/assets/blackinfo.svg"
                      />
                    }
                    tooltipContent={<p className="text-2xs text-gray-600 font-normal">{stockStat?.return_time}</p>}
                  />
                )}

                {/* </p> */}
              </div>
            </p>
          )}
        </div>
        <div
          className={`flex items-center gap-y-[10px] ${containerFlexClass} gap-x-[8px] justify-center sm:justify-between`}
        >
          {stockStat && !stockStat?.stock_name ? (
            <div className=" min-w-0 w-full max-w-[120px] h-[18px] flex items-center justify-center sm:m-0">
              <img
                className=" object-contain inline-block h-[18px] w-[18px]"
                height={18}
                width={18}
                src="/assets/noto_locked.png"
                alt="lock"
              />
              <div className=" w-full h-[14px] bg-[rgba(248,248,248,1)] rounded-full mt-[6px]"></div>
            </div>
          ) : (
            <p className="sm:flex-1 text-sm font-normal text-[rgba(52,64,84,1)] truncate w-full text-center sm:text-left">
              {stockStat?.stock_name}
            </p>
          )}
          {stockStat?.target_status === "active" && stockStat?.action !== "SELL" ? (
            <TargetChip active target_number={stockStat?.target_number} />
          ) : (
            <TargetChip active={false} />
          )}
        </div>
      </div>
    </div>
    // </LoginPrompt>
  );
};

// Wrap in React.memo to prevent unnecessary re-renders when props haven't changed
export default React.memo(TopGainerLoserCard);
