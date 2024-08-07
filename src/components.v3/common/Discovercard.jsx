import React from "react";

function Discovercard({ name, description, image, color }) {
  return (
    <>
      <div className="w-1/4 discover_card_carousel">
        <a
          href="#"
          class="card group transition-all duration-500 education border border-gray-200"
        >
          <div className="main-card">
            <div class={`overlay-1 bg-strategy-${color}`}></div>
            <div
              class={`circle after:bg-strategy-${color} border-2 border-${color} group-hover:bg-strategy-${color}`}
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
