import React, { useEffect, useState } from "react";
import { Button } from "react-scroll"; // Adjust this import as needed
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ArrowLeftIcon } from "lucide-react";

const brokerItems = [
  { src: "/assets/groww-logo-light.png", alt: "Groww", name: "Groww", url: "https://groww.in" },
  { src: "/assets/p5.png", alt: "Zerodha", name: "Zerodha", url: "https://zerodha.com" },
  { src: "/assets/angelone 1.webp", alt: "Angel One", name: "Angel One", url: "https://www.angelone.in" },
  { src: "/assets/Upstocks.webp", alt: "Upstox", name: "Upstox", url: "https://upstox.com" },
  { src: "/assets/ICICIdirect.png", alt: "ICICIdirect", name: "ICICIdirect", url: "https://www.icicidirect.com" },
  { src: "/assets/Kotak securities.webp", alt: "Kotak", name: "Kotak Securities", url: "https://www.kotaksecurities.com" },
  { src: "/assets/HDfc Securities.webp", alt: "HDFC Securities", name: "HDFC Securities", url: "https://www.hdfcsec.com" },
  { src: "/assets/Motilal Oswal.webp", alt: "Motilal Oswal", name: "Motilal Oswal", url: "https://www.motilaloswal.com" },
  { src: "/assets/p9.png", alt: "+9 more", name: "+9 more", url: "#" }, // This can open the child modal
];

const brokerItems2 = [
  { src: "/assets/Paytm Money.webp", alt: "Paytm Money", name: "Paytm Money", url: "https://www.paytmmoney.com" },
  { src: "/assets/Sharekhan.webp", alt: "Sharekhan", name: "Sharekhan", url: "https://www.sharekhan.com" },
  { src: "/assets/Dhan.webp", alt: "Dhan", name: "Dhan", url: "https://dhan.co" },
  { src: "/assets/5paisa.webp", alt: "5paisa", name: "5paisa", url: "https://www.5paisa.com" },
  { src: "/assets/IIFL Securities.webp", alt: "IIFL Securities", name: "IIFL Securities", url: "https://www.indiainfoline.com" },
  { src: "/assets/AxisDirect.webp", alt: "AxisDirect", name: "AxisDirect", url: "https://www.axisdirect.in" },
  { src: "/assets/Geojit.webp", alt: "Geojit", name: "Geojit", url: "https://www.geojit.com" },
  { src: "/assets/Fyers.webp", alt: "Fyers", name: "Fyers", url: "https://www.fyers.in" },
  { src: "https://s3-alpha-sig.figma.com/img/fdda/de25/9d78e1e3d0583fe1ddbdac0a25fd0a26?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ovB4ydW~XHKYxvw3-v71E4IjSaDKfPnlLv1-sbKkvan9J31IBPUqZwE7d0SV3-9FScPQXtXqQQ~vv9q2Xd4I-vcQY5MFlqeqw6qC6bIP2juaawLajzusqCflLN0eGWtPVqEvpXemJovPSZKE5pwC9jj0AC-81Fq3qdhDQd7yPhIempI0YbUAAjuDzI1s0svl3J7G6EBxV7QB8CNwNL7~1VGbXoXAbZyR9RS2VaiK80vhDkhF3nL6qSh-H1a3gdsST~~eLUaCFMIC8y4a-JvQhWSwlWSkB7EOfKZ9qxCv1Ki8C1EmXUZBTX4s5qqbT8NGf4O4pLu40X8G4jH105fdmg", alt: "Choice Broking", name: "Choice Broking", url: "https://www.choicebroking.in" },
];

const Modal = ({ open, handleClose, children }) => {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[50000]  flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg shadow-lg p-6 relative w-[350px] max-w-[352px]">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

const ChildModal = ({ open, handleBack, handleCloseAll }) => (
  <Modal open={open} handleClose={handleCloseAll}>
    <div className="flex justify-between mb-5">
      <button
        onClick={handleBack}
        className="absolute top-3 left-3 text-gray-600 hover:text-gray-900 "
      >
        <ArrowLeftIcon className="w-6 h-6" />
      </button>
    </div>

    <div className="bg-[url('/assets/Frame-modal.png')] bg-cover bg-center  flex items-center justify-center">
      <div className="grid grid-cols-3 gap-2">
        {brokerItems2.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              window.open(item.url, '_blank'); // Redirect to the specified URL
            }}
            className="flex flex-col items-center text-center gap-2  rounded-full p-2 cursor-pointer transition-all transform hover:scale-[0.90]  duration-200"
          >
            <div className="!bg-gray-100  w-16 h-16 rounded-full  flex items-center justify-center ">
              <img
                src={item.src}
                alt={item.name}
                className="w-11 h-11  object-contain  rounded-full"
              />
            </div>
            <span className="text-gray-800 text-[12px] text-nowrap font-normal">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  </Modal>
);

export default function NestedModal() {
  const [modalState, setModalState] = useState({
    isMainModalOpen: false,
    isChildModalOpen: false,
  });

  useEffect(() => {
    if (modalState.isMainModalOpen || modalState.isChildModalOpen) {
      disableBodyScroll();
    }
    else {
      enableBodyScroll();
    }
    return () => enableBodyScroll(); // Cleanup on unmount
  }, [modalState]);

  const handleMainModalOpen = () =>
    setModalState({ isMainModalOpen: true, isChildModalOpen: false });
  const handleMainModalClose = () =>
    setModalState({ isMainModalOpen: false, isChildModalOpen: false });
  const handleChildModalOpen = () =>
    setModalState({ isMainModalOpen: false, isChildModalOpen: true });
  const handleCloseAllModals = () =>
    setModalState({ isMainModalOpen: false, isChildModalOpen: false });

  return (
    <div>
       <Button onClick={handleMainModalOpen}>
        <ChevronRightIcon className="w-10 h-10 text-white" />
      </Button>

      <Modal open={modalState.isMainModalOpen} handleClose={handleMainModalClose}>
        <div className="bg-[url('/assets/Frame-modal.png')] bg-cover bg-center  flex items-center justify-center">
          <div className="grid grid-cols-3 gap-2">
            {brokerItems.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  if (index === brokerItems.length - 1) {
                    handleChildModalOpen(); // Open the child modal if it's the last index
                  } else {
                    window.open(item.url, '_blank'); // Redirect to the specified URL
                  }
                }}
                className="flex flex-col items-center text-center gap-2  rounded-full p-2 cursor-pointer transition-all transform hover:scale-[0.90]  duration-200"
              >
                <div className="!bg-gray-100  w-16 h-16 rounded-full  flex items-center justify-center ">
                  <img
                    src={item.src}
                    alt={item.name}
                      className={`w-11 h-11 object-contain rounded-full ${index === brokerItems.length - 1 ? 'bg-[#125B54] p-1' : ''}`}
                  />
                </div>
                <span className="text-gray-800 text-[12px] text-nowrap font-normal">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <ChildModal
        open={modalState.isChildModalOpen}
        handleBack={handleMainModalOpen}
        handleCloseAll={handleCloseAllModals}
      />
    </div>
  );
}

const disableBodyScroll = () => {
  document.body.style.overflow = 'hidden';
};

const enableBodyScroll = () => {
  document.body.style.overflow = 'auto';
};
