import React from "react";
import InvestModal from "@/components.v3/common/InvestModal";
import { Link } from "react-scroll";

function InvestmentSection() {
  const items = [
    { src: "/assets/p1.png", alt: "Groww", name: "Groww" },
    { src: "/assets/p5.png", alt: "Zerodha", name: "Zerodha" },
    { src: "/assets/p6.png", alt: "AngelOne", name: "Angel One" },
    { src: "/assets/p2.png", alt: "Upstox", name: "Upstox" },
    { src: "/assets/p3.png", alt: "ICICIdirect", name: "ICICIdirect" },
    { src: "/assets/p4.png", alt: "Kotak", name: "Kotak Securities" },
  ];

  return (
    <div className="sm:pb-[100px] pb-[100px] pt-0 px-4 rounded-lg">
      <h2 className="text-center text-xl font-semibold mb-10">
        Ready to Invest?
      </h2>
      <div className="flex justify-center gap-4 sm:gap-10">
        {items.slice(0, 3).map((item, index) => (
          <a
            key={index}
            href="#"
            className="flex flex-col items-center text-center group"
          >
            <div className="bg-white p-4 rounded-full shadow-md group-hover:scale-[0.90] group-hover:duration-500">
              <img
                src={item.src}
                alt={item.alt}
                className="w-11 h-11 rounded-full group-hover:opacity-80 transition-opacity duration-300 "
              />
            </div>
            <span className="text-2xs mt-1.5 text-[#344054] group-hover:text-[#344054] font-open_sans ">
              {item.name}
            </span>
          </a>
        ))}

        <div className="hidden sm:flex sm:gap-10">
          {items.slice(3).map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex flex-col items-center text-center group"
            >
              <div className="bg-white p-4 rounded-full shadow-md group-hover:scale-[0.90] group-hover:duration-500">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-11 h-11 rounded-full group-hover:opacity-80 transition-opacity duration-300"
                />
              </div>
              <span className="text-2xs mt-1.5 text-[#344054] group-hover:text-[#344054] font-open_sans">
                {item.name}
              </span>
            </a>
          ))}
        </div>

        {/* Always show the +9 more button */}
        <Link
          to={<InvestModal />}
          className="flex flex-col items-center text-center group"
        >
          <div className="bg-white p-4 rounded-full shadow-md">
            <div className="w-11 h-11 bg-brand-500 flex justify-center items-center rounded-full group-hover:bg-brand-600 transition-colors duration-300">
              <span className="font-semibold text-gray-600">
                <span className="">
                  <InvestModal />
                </span>
              </span>
            </div>
          </div>
          <span className="text-xs mt-2 text-[#344054] group-hover:text-[#344054] font-open_sans">
            +17 more
          </span>
        </Link>

        {/* Show remaining items only on larger screens */}
      </div>
    </div>
  );
}

export default InvestmentSection;
