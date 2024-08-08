import React from "react";

function Discovercard({ name, description, image, color }) {
  return (
    <>
      <div className="w-1/4 discover_card_carousel">
        <a
          href="#"
          class="card group transition-all duration-500 education border border-gray-200"
        >
          <div className="main-card w-full relative mx-auto">
            <div
              class={`overlay-1 w-[85px] h-[85px] rounded-full top-[2px] left-1/2 -translate-x-1/2 z-[1] absolute`}
              style={{
                background: `${color}`,
              }}
            ></div>
            <div
              class={` w-[86px] h-[86px]  mx-auto rounded-full flex items-center justify-center  relative z-[2]  discover_circle group-hover:!outline-white group-hover:!bg-white outline outline-2  outline-offset-4 `}
              style={{ backgroundColor: `${color}`, outlineColor: `${color}` }}
            >
              <img src={image} alt="" className="z-[1]" />
            </div>
            <p className="text font-open_sans">{name}</p>
          </div>

          <p className="title max-w-[159px] font-open_sans">{description}</p>
        </a>
      </div>
    </>
  );
}

export default Discovercard;
