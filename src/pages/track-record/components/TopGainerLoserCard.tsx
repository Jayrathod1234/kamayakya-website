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
import { useContext } from "react";
import AuthContext from "@/components/AuthContext";
import { abbreviateTime } from "@/lib/date-formatter";
import { TargetChip } from "@/components.v3/common/TargetChip";
import { useRouter } from "next/router";
import { ArrowDown, ArrowUp } from "lucide-react";
import LoginPrompt from "./LoginPrompt";
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
  setOpen
}: {
  action?: string;
  type: string;
  isBest: boolean;
  stockStat: any;
}) => {
  const { isLoggedIn, isSubscribed } = useContext(AuthContext);
  const isBlur = !isLoggedIn || (stockStat.action === "BUY" && isLoggedIn && !isSubscribed);
  let label = type === "LIVE" ? (isBest ? "Top Gainer" : "Top Loser") : "";
  label = type === "EXIT" ? (isBest ? "Best Exit" : "Worst Exit") : label;
  let actionImgSrc = stockStat
    ? stockStat.action === "BUY"
      ? "./assets/Buy.png"
      : stockStat.action === "SELL"
      ? "./assets/Sell.png"
      : stockStat.action === "HOLD"
      ? "./assets/Hold.png"
      : null
    : null;
  const router = useRouter();

  return (
    // <LoginPrompt>
    <div
      onClick={() => stockStat?.id ? router.push(`/track-record/${stockStat.id}`) : stockStat.action === "BUY" ? setOpen(true):null}
      className="group/gainer-loser transition-[shadow] duration-150 hover:shadow-[0px_8.2px_8.2px_-4.1px_rgba(16,24,40,0.04),0px_20.49px_24.59px_-4.1px_rgba(16,24,40,0.1)]
 flex flex-col bg-white rounded-[9px] p-4 h-fit sm:h-[176px] flex-1 relative cursor-pointer min-w-0 "
    >
      {actionImgSrc && (
        <img
          width={39}
          height={29}
          className=" absolute right-0 top-[-0.5rem]"
          src={actionImgSrc}
          alt={stockStat.action}
        />
      )}

      <div className=" flex flex-col justify-center sm:flex-row sm:justify-between items-center gap-x-[3.81px] flex-wrap">
        <div className=" flex items-center">
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
          <Line
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
          />
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
          {isBlur ? (
            <span className=" inline-block  h-6 w-[103px] bg-[rgba(237,240,245,1)] rounded-full"></span>
          ) : (
            <p
              className={` text-display-xs font-bold  whitespace-nowrap ${
                stockStat.is_gain_loss_positive ? "text-[rgba(18,183,106,1)]" : "text-[rgba(240,68,56,1)]"
              } `}
            >
              {stockStat.gain_loss && stockStat.gain_loss}%{" "}
              <span className=" text-3xs font-semibold text-[rgba(73,70,70,1)] hidden sm:inline-block  ">
                {stockStat.return_time && `in ${abbreviateTime(stockStat.return_time)}`}
              </span>
            </p>
          )}
        </div>
        <div
          className={`flex items-center gap-y-[10px] ${
            isBlur ? "flex-wrap sm:flex-nowrap flex-col sm:flex-row" : "flex-wrap "
          }  gap-x-[8px]  justify-center sm:justify-between`}
        >
          {isBlur ? (
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
              {stockStat.stock_name}
            </p>
          )}
          {stockStat?.target_status === "active" ? (
            <TargetChip active target_number={stockStat.target_number} />
          ) : (
            <TargetChip active={false} />
          )}
        </div>
      </div>
    </div>
    // </LoginPrompt>
  );
};

export default TopGainerLoserCard;
