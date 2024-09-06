import React, { useState } from "react";
import InvestModal from "@/components.v3/common/InvestModal";
import { Link } from "react-scroll";
import { Button } from "react-scroll"; // Adjust this import as needed
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function InvestmentSection() {
  const [modalState, setModalState] = useState({
    isMainModalOpen: false,
    isChildModalOpen: false,
  });

  const handleMainModalOpen = () =>
    setModalState({ isMainModalOpen: true, isChildModalOpen: false });
  const handleMainModalClose = () =>
    setModalState({ isMainModalOpen: false, isChildModalOpen: false });
  const handleChildModalOpen = () =>
    setModalState({ isMainModalOpen: false, isChildModalOpen: true });
  const handleCloseAllModals = () =>
    setModalState({ isMainModalOpen: false, isChildModalOpen: false });

  const items = [
    {
      src: "/assets/groww-logo-light.png",
      alt: "Groww",
      name: "Groww",
      url: "https://groww.in",
    },
    {
      src: "/assets/p5.png",
      alt: "Zerodha",
      name: "Zerodha",
      url: "https://zerodha.com",
    },
    {
      src: "/assets/angelone 1.webp",
      alt: "Angel One",
      name: "Angel One",
      url: "https://www.angelone.in",
    },
    {
      src: "/assets/Upstocks.webp",
      alt: "Upstox",
      name: "Upstox",
      url: "https://upstox.com",
    },
    {
      src: "/assets/ICICIdirect.png",
      alt: "ICICIdirect",
      name: "ICICIdirect",
      url: "https://www.icicidirect.com",
    },
    {
      src: "/assets/Kotak securities.webp",
      alt: "Kotak",
      name: "Kotak Securities",
      url: "https://www.kotaksecurities.com",
    },
  ];

  return (
    <div className="pb-[100px] pt-0 px-2 rounded-lg sm:pb-[100px]">
      <h2 className="text-center text-sm font-bold sm:mb-10 mb-5 font-open_sans">
        Ready to Invest?
      </h2>
      <div className="flex justify-center gap-4 sm:gap-10">
        {items.slice(0, 3).map((item, index) => (
          <Link
            key={index}
            onClick={() => {
              window.open(item.url, "_blank"); // Redirect to the specified URL
            }}
            className="flex flex-col items-center text-center group"
          >
            <div className="bg-white p-[0.75rem] rounded-full shadow-md group-hover:scale-[0.90] group-hover:duration-500">
              <img
                src={item.src}
                alt={item.alt}
                className="w-11 h-11 rounded-full group-hover:opacity-80 transition-opacity duration-300"
              />
            </div>
            <span className="text-2xs mt-1.5 text-[#344054] group-hover:text-[#344054] font-open_sans">
              {item.name}
            </span>
          </Link>
        ))}

        <div className="hidden slg:flex slg:gap-10 lg:flex lg:gap-10">
          {items.slice(3).map((item, index) => (
            <Link
              key={index}
              onClick={() => {
                window.open(item.url, "_blank"); // Redirect to the specified URL
              }}
              className="flex flex-col items-center text-center group"
            >
              <div className="bg-white p-[0.75rem] rounded-full shadow-md group-hover:scale-[0.90] group-hover:duration-500">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-11 h-11 rounded-full group-hover:opacity-80 transition-opacity duration-300"
                />
              </div>
              <span className="text-2xs mt-1.5 text-[#344054] group-hover:text-[#344054] font-open_sans">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Always show the +9 more button */}
        <Link className="flex flex-col items-center text-center group">
          <Button onClick={handleMainModalOpen}>
            <div className="bg-white p-[0.75rem] rounded-full shadow-md group-hover:scale-[0.90] group-hover:duration-500">
              <div className="w-11 h-11 bg-brand-500 flex justify-center items-center rounded-full group-hover:bg-brand-600 transition-colors duration-300">
                <span className="font-semibold text-gray-600">
                  <ChevronRightIcon className="w-10 h-10 text-white" />
                </span>
              </div>
            </div>
            <span className="text-2xs mt-1.5 text-[#344054] group-hover:text-[#344054] font-open_sans">
              +17 more
            </span> 
          </Button>
          <InvestModal
            handleMainModalOpen={handleMainModalOpen}
            handleMainModalClose={handleMainModalClose}
            handleChildModalOpen={handleChildModalOpen}
            handleCloseAllModals={handleCloseAllModals}
            modalState={modalState}
          />
        </Link>
      </div>
    </div>
  );
}

export default InvestmentSection;
