import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components.v2/ui/tooltip";
import { abbreviateTime } from "@/lib/date-formatter";
import { useContext } from "react";
import AuthContext from "@/components/AuthContext";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { sectorIcons } from "@/utils/constants.js";
import DeepValue from "../../../components.v3/common/DeepValue";
import { Tooltip as MuiTooltip } from "@mui/material";
import { TargetChip } from "@/components.v3/common/TargetChip";
import Link from "next/link";
import LineChart from "@/components.v3/common/LineChart";
import { useTrackRecordCommon } from "@/contexts/TrackRecordCommonContext";
import Tooltip from "@/components.v3/common/Tooltip";

const WatchVideo = ({ isBlur = false }: { isBlur?: boolean }) => {
  const { isLoggedIn, isSubscribed } = useContext(AuthContext);
  return (
    <div
      className={` group/watch-video flex items-center  gap-x-[6px] cursor-pointer duration-300 w-[28px] overflow-hidden  transition-all ${
        !isLoggedIn || isBlur ? " blur-[2px]" : "hover:w-[128px]"
      }`}
    >
      <img height={28} width={28} className=" h-7 w-7" src="/assets/play.gif" />
      <p className="whitespace-nowrap">Watch Video</p>
    </div>
  );
};

const getMascotImg = (action: string) => {
  switch (action) {
    case "BUY":
      return "/assets/buyActionCall.png";
    case "HOLD":
      return "/assets/hold_call.png";
    case "SELL":
      return "/assets/sell_call.png";
  }
};

export const TrackRecordStockCard = ({
  id,
  action,
  is_returns_positive,
  latest_target_price,
  latest_youtube_video,
  new_stock,
  recommended_stock,
  return_time,
  sector,
  stock_name,
  stock_tags,
  target_number,
  target_status,
  total_returns,
  upside_left,
  upside_left_time,
  stock_live_prices,
  entry_price,
  stock_targets,
  created,
  stock_exchange,
}: // market_cap,
any) => {
  const { isLoggedIn, isSubscribed, handleLogin } = useContext(AuthContext);
  const isBlur = !isLoggedIn;
  const { stockSector } = useTrackRecordCommon();
  let tabImage = null;
  let bgColor = "bg-[white]";
  let newIconClass = "-5px";

  if (new_stock & recommended_stock) {
    tabImage = "hot-newtab";

    bgColor = "bg-gradient-to-r from-[#FDB022] to-[#75CDC5]";
  } else if (new_stock) {
    tabImage = "newtab";
    bgColor = "bg-brand-300";
    newIconClass = "-6px";
  } else if (recommended_stock) {
    tabImage = "hottab";
    bgColor = "bg-warning-300";
  }

  return (
    <div className={`p-[1px] ${bgColor} rounded-lg relative flex justify-center lg:max-w-[630px]`}>
      {tabImage && (
        <img src={`/assets/${tabImage}.webp`} alt="" className="w-[210px] h-5 object-contain absolute -top-[6px]" />
      )}
      <div className=" p-5 bg-white max-h-[451px] w-full lg:max-w-[630px] rounded-lg overflow-hidden">
        {/* TOP SECTION */}
        <div className=" flex gap-x-2 items-center justify-between">
          {isBlur || !stock_name ? (
            <div className="flex items-center w-full">
              {" "}
              <img height={28} width={28} src="/assets/noto_locked.png" alt="" />
              <div className=" h-5 w-1/2 rounded-full bg-[#EDF0F5]"></div>
            </div>
          ) : (
            <h4 className=" text-lg font-bold m-0 whitespace-nowrap truncate">{stock_name}</h4>
          )}
          {(isLoggedIn && stock_name? ( latest_youtube_video?.youtube_title ?
            (<a
              className={` text-inherit ${!isLoggedIn || !stock_name ? "pointer-events-none" : ""}`}
              href={latest_youtube_video?.youtube_title}
              target="_blank"
            >
              <WatchVideo />
            </a>):null
          ) : (
            <Tooltip
              enableModal={false}
              tooltipTrigger={<WatchVideo isBlur={true} />}
              tooltipContent={
                <p className=" text-2xs text-gray-800 max-w-[150px]">
                  {isLoggedIn ? "Please become a member to watch this video. " : "Please login to watch video "}
                </p>
              }
            />
          ))}
        </div>

        <div className="pt-[12px]">
          <div className=" flex items-center gap-[8px] ">
            {stockSector && sector && (
              <div className="py-[2px] pr-[16px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px] whitespace-nowrap">
                <img src={`/sector_images_mustard/${sectorIcons[sector]}`} alt="" className="w-3 " />
                {stock_tags?.length > 0 ? (
                  <MuiTooltip title={stockSector[sector] ?? sector}>
                    <p className="text-[10px] font-semibold text-orange-700 font-open_sans normal-case">
                      {stockSector[sector]?.length > 10
                        ? `${stockSector[sector].substring(0, 10)}...`
                        : stockSector[sector]}
                      {/* {sector} */}
                    </p>
                  </MuiTooltip>
                ) : (
                  <p className="text-[10px] font-semibold text-orange-700 font-open_sans">{stockSector[sector]}</p>
                )}
              </div>
            )}
            <TargetChip
              containerClass={`py-[3px] px-2 h-6 items-center border ${
                target_status === "active" ? "border-[#FEF0DF]" : ""
              }`}
              activeIconClass=" h-[10px] w-[10px]"
              activeIcon
              target_number={`${target_number} at ${latest_target_price ? `₹${latest_target_price}` : ""}`}
              active={target_status === "active" ? true : false}
            />
            {/* <div className="py-[2px] pr-[16px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px] whitespace-nowrap">
            <img src="/assets/Component 8.svg" alt="" className="w-3" />
            <p className="text-[10px] font-semibold text-[#667085] flex !items-center whitespace-nowrap font-open_sans">
              MCap:
              {is_blur ? (
                <div className="  w-[47px] h-[12px] bg-[#FFEED9] rounded-full "></div>
              ) : (
                <span className="">₹ {market_cap}</span>
              )}
            </p>
          </div> */}
            {stock_tags?.length > 0 && <DeepValue stock_tags={stock_tags} />}
          </div>
        </div>
        {/* TOP SECTION  END*/}
        {/* CHART SECTION */}

        <LineChart
          // fetchIndividual={false}
          stock_targets={stock_targets}
          entry_price={entry_price}
          created={created}
          stock_live_prices={stock_live_prices}
          stock_exchange={stock_exchange}
          stock_id={id}
          stock_action={action}
          containerClassName={"relative h-[180px] w-full py-5"}
        />

        {/* CHART SECTION END */}
        {/* BOTTOM SECTION */}
        <div className="p-1 sm:pr-4 rounded-[4px] flex gap-x-4 bg-[rgba(249,250,251,1)] ">
          {/* Total Returns */}
          <div className=" flex items-center">
            <div
              className={`  rounded-lg ${
                is_returns_positive
                  ? "bg-[linear-gradient(314.25deg,#125B54_6.46%,#12ADB7_113.37%)]"
                  : "bg-[linear-gradient(106.62deg,#FF7B7B_18.84%,#E53A3A_92.14%)]"
              } px-3 py-2 sm:min-w-[120px]`}
            >
              <p className=" text-4xs font-bold text-white truncate">
                {action === "SELL" && target_status !== "active" && isLoggedIn && isSubscribed
                  ? is_returns_positive
                    ? "Profit Booked"
                    : "Loss Booked"
                  : "Total Returns"}
              </p>
              <div
                className={` flex items-center gap-x-[4px] ${
                  !isLoggedIn || (!isSubscribed && !stock_name) ? "pt-[10px]" : ""
                }`}
              >
                <div className=" h-[14px] w-[14px] flex items-center justify-center">
                  <img
                    width={11}
                    height={8}
                    src={is_returns_positive ? "/assets/Polygon2.svg" : "/assets/Polygon2-dark.svg"}
                    alt=""
                  />
                </div>
                {!isLoggedIn || !total_returns ? (
                  <div className=" h-5 w-[80%] bg-[rgba(255,255,255,0.26)] rounded-full text-xl font-bold text-white m-0"></div>
                ) : (
                  <p className=" text-xl font-bold text-white !m-0">{total_returns}%</p>
                )}
              </div>
              <p className=" !m-0 text-3xs font-semibold whitespace-nowrap text-white">
                in {abbreviateTime(return_time)}
              </p>
            </div>
            {action === "SELL" && target_status !== "active" && isLoggedIn && isSubscribed ? (
              <div className=" -ml-[14px] relative flex items-center before:-left-1 before:rounded-l-[4px] before:absolute before:content-[''] before:z-10 before:h-[26px] before:w-[18px]  before:bg-[#F9FAFB]">
                <img
                  className=" relative z-20"
                  src={`/assets/${
                    is_returns_positive && action === "SELL" ? "profit_booked_arrow" : "loss_booked_arrow"
                  }.svg`}
                />
              </div>
            ) : null}
          </div>
          {/* Total Returns End*/}
          {/* Upside Left */}
          {action === "SELL" && target_status !== "active" ? null: <div className=" min-w-0 flex flex-col justify-center">
            <div className=" flex items-center gap-x-1 min-w-0">
              <p className=" font-bold whitespace-nowrap text-4xs text-[rgba(102,112,133,1)]">Upside Left</p>
              <Tooltip
                tooltipTrigger={
                  <img
                    className="!h-[14px] !w-[14px] object-contain"
                    height={14}
                    width={14}
                    src="/assets/blackinfo.svg"
                  />
                }
                tooltipContent={
                  <div className="gap-[7px] items-center flex flex-col justify-center">
                    <div className="text-gray-800 text-2xs font-normal">
                      Upside Left means how much the stock price could rise from its current level.
                    </div>
                    <div className="mt-2 p-2 bg-[#F6F7F9] gap-1 rounded-lg">
                      <span className="text-[#108973] text-2xs font-bold">Example :</span>
                      <p className="text-2xs text-gray-600 font-normal">
                        If a stock's price is ₹100 and the Upside Left is 20%, it might go up to ₹120.
                      </p>
                    </div>

                    {/* Modal Trigger (Visible on small screens only) */}
                  </div>
                }
              />
            </div>
            <p className=" text-xl font-bold whitespace-nowrap text-[rgba(16,24,40,1)]">{upside_left}%</p>
            <p className=" text-3xs font-semibold  truncate text-[rgba(110,110,110,1)]">expected in {upside_left_time}</p>
          </div>}
         
          <div className=" ml-auto mt-auto">
            <img className=" object-contain min-h-[72px] min-w-[72px]" height={72} width={72} src={getMascotImg(action)} alt="action-mascot" />
          </div>
          {/* Upside Left End  */}
        </div>
        <div className=" pt-5">
          {!isLoggedIn ? (
            <>
              {/* btn  */}
              <button className="button-82-pushable group  " role="button" onClick={handleLogin}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front button-82-front2 text flex items-center">
                  <img src="/assets/noto_locked.png" alt="" className="w-4" />
                  <p className="text-[13px] font-bold text-[#125B54] font-open_sans">Log In to Get 3 Hot Stocks</p>
                  <div className="relative w-5">
                    <img
                      src="assets/chevron-right.png"
                      alt=""
                      className="w-4 img-1 transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <img
                      src="assets/pajamas_long-arrow.svg"
                      alt=""
                      className="w-5 img-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute right-0 top-0"
                    />
                  </div>
                </span>
              </button>
            </>
          ) : !stock_name ? (
            <>
              <Link href={`/pricing`}>
                {/* btn  */}
                <button className="button-82-pushable group " role="button">
                  <span className="button-82-shadow"></span>
                  <span className="button-82-edge"></span>
                  <span className="button-82-front button-82-front2 text flex items-center">
                    <img src="/assets/noto_locked.png" alt="" className="w-4" />
                    <p className="text-[13px] font-bold text-[#125B54] font-open_sans">Become a Member</p>
                    <div className="relative w-5">
                      <img
                        src="assets/chevron-right.png"
                        alt=""
                        className="w-4 img-1 transition-opacity duration-300 group-hover:opacity-0"
                      />
                      <img
                        src="assets/pajamas_long-arrow.svg"
                        alt=""
                        className="w-5 img-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute right-0 top-0"
                      />
                    </div>
                  </span>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href={`/track-record/${id}`}>
                <button className="button-82-pushable group relative" role="button">
                  <span className="button-82-shadow"></span>
                  <span className="button-82-edge"></span>
                  <span className="button-82-front button-82-front2 text flex items-center">
                    <p className="text-[13px] font-bold text-[#125B54] font-open_sans">View Reports & Details</p>
                    <div className="relative w-5">
                      <img
                        src="assets/chevron-right.png"
                        alt=""
                        className="w-4 img-1 transition-opacity duration-700 group-hover:opacity-0"
                      />
                      <img
                        src="assets/pajamas_long-arrow.svg"
                        alt=""
                        className="w-5 img-2 transition-opacity duration-700 opacity-0 group-hover:opacity-100 absolute right-0 top-0"
                      />
                    </div>
                  </span>
                </button>
              </Link>
            </>
          )}
        </div>
        {/* BOTTOM SECTION END */}
      </div>
    </div>
  );
};

export default TrackRecordStockCard;
