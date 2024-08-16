// import { ChevronRightIcon } from "lucide-react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React from "react";

function InvestmentSection() {
  return (
    <div className="bg-gray-100 py-6 px-4 rounded-lg   ">
      <h2 className="text-center text-xl font-semibold mb-4 ">Ready to Invest?</h2>
      <div className="flex justify-center gap-10">
        {[
          { src: "/assets/p1.png", alt: "Groww", name: "Groww" },
          { src: "/assets/p5.png", alt: "Zarodha", name: "Zarodha" },
          { src: "/assets/p6.png", alt: "AngelOne", name: "Angel One" },
          { src: "/assets/p2.png", alt: "Upstox", name: "Upstox" },
          { src: "/assets/p3.png", alt: "ICICIdirect", name: "ICICIdirect" },
          { src: "/assets/p4.png", alt: "Kotak", name: "Kotak Securities" },
        ].map((item, index) => (
          <a
            key={index}
            href="#"
            className="flex flex-col items-center text-center group "
          >
            <div className="bg-white p-2 rounded-full shadow-md">
              <img
                src={item.src}
                alt={item.alt}
                className="w-12 h-12 rounded-full group-hover:opacity-80 transition-opacity duration-300"
              />
            </div>
            <span className="text-xs mt-2 text-[#344054] group-hover:text-[#344054]">{item.name}</span>
          </a>
        ))}
        <a
          href="#"
          className="flex flex-col items-center text-center group"
        >
          <div className="bg-white p-2 rounded-full shadow-md">
            <div className="w-12 h-12 bg-brand-500 flex justify-center items-center rounded-full group-hover:bg-brand-600 transition-colors duration-300">
              <span className=" font-semibold text-gray-600"> 
                <ChevronRightIcon
                className="inline-block md:hidden w-10 h-10 text-white"
                fontSize="large"/></span>
            </div>
          </div>
          <span className="text-xs mt-2 text-[#344054] group-hover:text-[#344054]">+9 more</span>
        </a>
      </div>
    </div>
  );
}

export default InvestmentSection;
