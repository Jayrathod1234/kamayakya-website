import React from "react";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function Discovercard({ id, name, description, image, color, slug }) {
  const {
    setStrategyTag,
    setIsChangeFilter,
    addPopularStrategies,
    allBoardStockRef,
  } = useStockPicks();

  return (
    <>
      <div className="md:w-1/4 sm:w-1/2 w-full discover_card_carousel">
        <a
          className="card group transition-all duration-500 education border border-gray-200 cursor-pointer"
          onClick={async () => {
            await setStrategyTag((prevTags) => {
              // Check if the id is already in the array to avoid duplicates
              if (!prevTags.includes(id)) {
                return [...prevTags, id]; // Append the new id to the existing array
              }
              return prevTags; // If id already exists, return the existing array
            });

            addPopularStrategies(id);
            setIsChangeFilter(true);

            if (allBoardStockRef.current) {
              allBoardStockRef.current.scrollIntoView({ behavior: "smooth" });
            }
          }}
          // Tooltip content
        >
          <div className="main-card w-full relative mx-auto">
            <div
              className={`overlay-1 w-[85px] h-[85px] rounded-full top-[2px] left-1/2 -translate-x-1/2 z-[1] absolute`}
              style={{
                background: `${color}`,
              }}
            ></div>
            <div
              className={`w-[86px] h-[86px] mx-auto rounded-full flex items-center justify-center relative z-[2] discover_circle group-hover:!outline-white group-hover:!bg-white outline outline-2 outline-offset-4`}
              style={{ backgroundColor: `${color}`, outlineColor: `${color}` }}
            >
              <img src={image} alt="" className="z-[1] w-[42px]" />
            </div>
            <p className="text font-open_sans mb-1">{name}</p>
          </div>

          <p
            className="title max-w-[176px] max-h-[75px] font-open_sans leading-4 line-clamp-2 text-ellipsis text-xs"
            data-tooltip-id={`tooltip-${id}`}
            data-tooltip-content={description}
          >
            {description}
          </p>
        </a>

        {/* Tooltip */}
        <Tooltip
          id={`tooltip-${id}`}
          place="bottom-start"
          style={{ zIndex: "99999", width: "200px" }}
        />
      </div>
    </>
  );
}

export default Discovercard;
