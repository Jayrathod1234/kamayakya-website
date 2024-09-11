import React, { useContext, useState } from "react";
import ProgressBarDemo from "./ProgressBarDemo";
import ProgressBar2 from "./ProgressBar2";
import DeepValue from "./DeepValue";
import AuthContext from "@/components/AuthContext";
import Link from "next/link";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { Modal } from "@nextui-org/react";
import StockCardProgressBarSection from "./StockCardProgressBarSection";
import StockCardProgressBarBlurSection from "./StockCardProgressBarBlurSection";
import StockCardProgressBarSection2 from "./StockCardProgressBar2";

function StockCard({
  id,
  stock_name,
  market_cap,
  new_stock,
  recommended_stock,
  is_blur,
  upside_left,
  sector,
  upside_left_time,
  stock_tags,
  gain_loss,
  return_time,
  latest_youtube_video,
  stock_targets,
  live_price,
  entry_price,
  created,
  className = "",
  style,
  isCarousal = false,
  emblaApi,
}) {
  const { stockSector } = useStockPicks();
  let tabImage = null;
  let cardClass = "";
  let innerClass = "relative rounded-lg bg-white shadow-6xs ";
  let newIconClass = "-5px";
  if (new_stock & recommended_stock) {
    tabImage = "hot-newtab";
    cardClass =
      "p-[1px] rounded-lg bg-gradient-to-r from-[#FDB022] to-[#75CDC5]";
  } else if (new_stock) {
    tabImage = "newtab";
    innerClass += "border border-brand-300";
    newIconClass = "-6px";
  } else if (recommended_stock) {
    tabImage = "hottab";
    innerClass += "border border-warning-300";
  }
  const { isLoggedIn, handleLogin } = useContext(AuthContext);
  const [hovered, setHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    // document.body.classList.add("overflow-hidden");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    document.body.classList.remove("overflow-hidden");
    setIsModalOpen(false);
  };

  return (
    <>
      {/* new stock card  */}
      <div
        className={`relative   
        ${className}  main_card_carousel ${
          isCarousal
            ? "min-w-[360px] sm:max-w-[404px] max-w-[360px]  sm:min-w-[404px]"
            : "min-w-[330px]"
        }`}
      >
        <div
          className={`absolute top-[${newIconClass}] left-1/2 -translate-x-1/2 z-[1]`}
        >
          {tabImage && (
            <img src={`/assets/${tabImage}.png`} alt="" className="w-[210px]" />
          )}
        </div>
        <div className={cardClass}>
          <div className={innerClass}>
            {is_blur ? (
              <div className="pt-[20px] px-[20px] flex gap-[36px] items-center justify-between">
                <div className="p-1 gap-2 flex items-center">
                  <img
                    src="/assets/noto_locked.png"
                    alt=""
                    className="w-[19px]"
                  />

                  <div className="h-5 bg-[#EDF0F5] rounded-[20px] min-w-[200px] sm:min-w-[206px] md:min-w-[200px] slg:min-w-[208px] lg:min-w-[271px]"></div>
                </div>

                <div className="tooltip">
                  <img
                    src="/assets/play.gif"
                    alt=""
                    className="w-[24px] blur-[2px]"
                  />
                  <span className="tooltiptext -left-5 relative shadow-sm z-[200000]">
                    <img
                      src="/assets/div.png"
                      alt=""
                      className="absolute -top-2 left-[89px] w-4"
                    />
                    {isLoggedIn
                      ? "Please become a member to watch this video."
                      : "Please login  to watch this video."}
                  </span>

                  {/* <span className="tooltiptext -left-5 relative shadow-sm z-[200000]">
                    <img
                      src="/assets/div.png"
                      alt=""
                      className="absolute -top-2 left-[89px] w-4"
                    />
                    Please login to watch this video.
                  </span> */}
                </div>
              </div>
            ) : (
              <div className="pt-[20px] px-[20px] flex items-center justify-between overflow-hidden">
                <Link href={`/stock-picks/${id}`}>
                  <p
                    className={`text-gray-950 text-md font-bold leading-7  font-open_sans line-clamp-1  text-left hover:text-[#1e555c] transition-all duration-500 ease-in-out ${
                      latest_youtube_video?.youtube_link ? hovered ? "max-w-[210px] sm:max-w-[225px]" : "max-w-80" : "max-w-full"
                    }`}
                  >
                    {stock_name}
                  </p>
                </Link>
                {latest_youtube_video?.youtube_link && (
                  <div
                    className="relative flex items-center gap-[16px]"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    {/* GIF Image */}
                    <div
                      className={`absolute right-0 transition-transform duration-500 ease-in-out ${
                        hovered ? "translate-x-[-65px]" : "translate-x-[5px]"
                      } ${hovered ? "me-7" : "me-3"}`}
                    >
                      <div
                        className="w-full cursor-pointer"
                        onClick={() =>
                          window.open(
                            latest_youtube_video?.youtube_link,
                            "_blank"
                          )
                        }
                      >
                        <img
                          src="/assets/play.gif"
                          alt="Play"
                          className={`w-[24px] transition-transform duration-500 ease-in-out ${
                            hovered
                              ? "filter brightness-0 sepia opacity-100"
                              : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Text container */}
                    <div
                      className={`transition-transform duration-500 ease-in-out ${
                        hovered
                          ? "-translate-x-1 opacity-100"
                          : "translate-x-[80px] opacity-0"
                      }`}
                    >
                      <a
                        href={latest_youtube_video?.youtube_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-default"
                      >
                        <p className="text-[14px] w-full cursor-pointer text-nowrap leading-[20px] text-[#125B54]">
                          Watch Video
                        </p>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="pt-[12px] px-[20px] pb-[20px]">
              <div className=" flex items-center gap-[8px] ">
                {stockSector && sector && (
                  <div className="py-[2px] pr-[16px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px] whitespace-nowrap">
                    <img
                      src="/assets/streamline_hotel-air-conditioner-solid.svg"
                      alt=""
                      className="w-3"
                    />
                    <p className="text-[10px]  font-semibold text-orange-700 font-open_sans">
                      {stockSector[sector]}
                    </p>
                  </div>
                )}
                <div className="py-[2px] pr-[16px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px] whitespace-nowrap">
                  <img src="/assets/Component 8.svg" alt="" className="w-3" />
                  <p className="text-[10px] font-semibold text-[#667085] flex !items-center whitespace-nowrap font-open_sans">
                    MCap:
                    {is_blur ? (
                      <div className="  w-[47px] h-[12px] bg-[#FFEED9] rounded-full "></div>
                    ) : (
                      <span className="">₹ {market_cap}</span>
                    )}
                  </p>
                </div>
                {stock_tags?.length > 0 && (
                  <DeepValue stock_tags={stock_tags} />
                )}
              </div>
            </div>
            <div className="sm:px-5 px-4 pb-3">
              <div className="p-[8px] rounded-xl bg-[#f7f8fa]">
                <div className="rounded-[7px] bg-custom-gradient text-center text-white ">
                  <div className="flex justify-end px-[11px] pt-[11px]">
                    <img
                      src="/assets/streamline_target-solid.svg"
                      alt=""
                      className="sm:w-[18px] w-[18px]"
                    />
                  </div>

                  <div className="px-[16px] pb-[24px] grid gap-[6px]">
                    <div className="gap-[7px] items-center flex justify-center">
                      <p className="text-md font-semibold leading-[18px] text-white font-open_sans">
                        Upside left
                      </p>

                      {/* Tooltip (Visible on large screens only) */}
                      <div className="tooltip relative hidden sm:block">
                        <img
                          src="/assets/ph_info-duotone.svg"
                          alt="info icon"
                          className="cursor-pointer hidden sm:block"
                        />
                        <span className="tooltiptext tooltiptext2 !-left-5 relative shadow-3xl">
                          <img
                            src="/assets/div.png"
                            alt=""
                            className="absolute -top-2 left-[57%] w-4"
                          />
                          <div className="text-gray-800 text-2xs font-normal">
                            Upside Left means how much the stock price could
                            rise from its current level.
                          </div>
                          <div className="mt-2 p-2 bg-[#F6F7F9] gap-1 rounded-lg">
                            <span className="text-[#108973] text-2xs font-bold">
                              Example :
                            </span>
                            <p className="text-2xs text-gray-600 font-normal">
                              If a stock's price is ₹100 and the Upside Left is
                              20%, it might go up to ₹120.
                            </p>
                          </div>
                        </span>
                      </div>

                      {/* Modal Trigger (Visible on small screens only) */}
                      <div className="sm:hidden block ">
                        <img
                          src="/assets/ph_info-duotone.svg"
                          alt="info icon"
                          className="cursor-pointer"
                          onClick={openModal}
                        />
                      </div>
                    </div>

                    <h3 className="text-[36px] font-bold leading-[33px] m-0 font-open_sans">
                      {upside_left || 0}%
                    </h3>
                    <p className="text-2xs font-normal text-[#E4E7EC] font-open_sans">
                      likely within {upside_left_time}
                    </p>

                    {/* Modal (only opens on small screens) */}
                    <Modal
                      blur
                      width="450px"
                      open={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      className="flex justify-center p-6 bg-white rounded-[12px] shadow-[0_20px_24px_-4px_rgba(16,24,40,0.08),0_8px_8px_-4px_rgba(16,24,40,0.03)] w-[350px] max-w-full mx-auto"
                    >
                      {/* Modal Header */}
                      <div className="w-full flex justify-between items-center">
                        <h3 className="text-xl font-bold leading-[30px] text-[#101828] m-0 font-open_sans">
                          Upside Left
                        </h3>
                        <button
                          className="text-[30px] text-gray-500 hover:text-gray-700 align-top font-open_sans"
                          onClick={() => setIsModalOpen(false)}
                        >
                          &times;
                        </button>
                      </div>

                      {/* Modal Body */}
                      <div className="mt-2 text-gray-800 text-sm text-left font-open_sans">
                        Upside Left means how much the stock price could rise
                        from its current level.
                      </div>
                      <div className="mt-4 p-4 bg-[#F6F7F9] rounded-lg w-full text-left ">
                        <span className="text-[#108973] text-sm font-bold text-left font-open_sans">
                          Example :
                        </span>
                        <p className="text-sm text-gray-600 mt-1 text-left font-open_sans">
                          If a stock's price is ₹100 and the Upside Left is 20%,
                          it might go up to ₹120.
                        </p>
                      </div>
                    </Modal>
                  </div>
                </div>
                <div className="flex justify-between pt-[8px] px-[9px] ">
                  <div className="flex gap-[3px] items-center">
                    <img src="/assets/Layer_1.svg" alt="" className="w-3.5" />
                    <p className="text-[11px] font-semibold text-gray-700 font-open_sans">
                      Total Returns
                    </p>
                  </div>
                  <div className="flex gap-[3px] items-center font-open_sans sm:max-w-[167px] max-w-[164px] whitespace-nowrap">
                    {/* green up arrow  */}
                    {gain_loss >= 0 ? (
                      // green up arrow
                      <img
                        src="/assets/Polygon2.svg"
                        alt="Up Arrow"
                        className="w-2"
                      />
                    ) : (
                      // red down arrow
                      <img
                        src="/assets/Polygon 3.svg"
                        alt="Down Arrow"
                        className="w-2"
                      />
                    )}
                    {/* <img src="/assets/Polygon2.svg" alt="" className="w-2" /> */}
                    {/* red down arrow  */}
                    {/* <img src="/assets/Polygon 3.svg" alt="" className="w-2" /> */}
                    {gain_loss == null ? (
                      <p className="text-2xs font-bold text-gray-800 font-open_sans  w-[26px] h-3 bg-[#E4E7EC] rounded-full "></p>
                    ) : (
                      <p className="text-2xs font-bold text-gray-800 font-open_sans">
                        {Math.abs(gain_loss)}%
                      </p>
                    )}
                    <span className="text-[10px] font-semibold text-[#6E6E6E] line-clamp-1">
                      in less than {return_time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-5 pb-[10px]">
              {is_blur ? (
                <>
                  {/* <ProgressBar2 /> */}
                  <StockCardProgressBarBlurSection emblaApi={emblaApi} />
                </>
              ) : (
                <>
                  {/* <ProgressBarDemo/> */}
                  <StockCardProgressBarSection
                    live_price={live_price}
                    entry_price={entry_price}
                    entry_date={created}
                    stock_targets={stock_targets}
                    emblaApi={emblaApi}
                  />
                </>
              )}
            </div>

            {!isLoggedIn ? (
              <>
                <div className="p-5 text-center">
                  {/* btn  */}
                  <button
                    className="button-82-pushable group  "
                    role="button"
                    onClick={handleLogin}
                  >
                    <span className="button-82-shadow"></span>
                    <span className="button-82-edge"></span>
                    <span className="button-82-front button-82-front2 text flex items-center">
                      <img
                        src="/assets/noto_locked.png"
                        alt=""
                        className="w-4"
                      />
                      <p className="text-[13px] font-bold text-[#125B54] font-open_sans">
                        Log In to Get 3 Hot Stocks
                      </p>
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
                </div>
              </>
            ) : is_blur ? (
              <>
                <div className="p-5 text-center">
                  <Link href={`/pricing`}>
                    {/* btn  */}
                    <button className="button-82-pushable group " role="button">
                      <span className="button-82-shadow"></span>
                      <span className="button-82-edge"></span>
                      <span className="button-82-front button-82-front2 text flex items-center">
                        <img
                          src="/assets/noto_locked.png"
                          alt=""
                          className="w-4"
                        />
                        <p className="text-[13px] font-bold text-[#125B54] font-open_sans">
                          Become a Member
                        </p>
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
                </div>
              </>
            ) : (
              <>
                <div className="p-5 text-center">
                  <Link href={`/stock-picks/${id}`}>
                    <button
                      className="button-82-pushable group relative"
                      role="button"
                    >
                      <span className="button-82-shadow"></span>
                      <span className="button-82-edge"></span>
                      <span className="button-82-front button-82-front2 text flex items-center">
                        <p className="text-[13px] font-bold text-[#125B54] font-open_sans">
                          View Reports & Details
                        </p>
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
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default StockCard;
