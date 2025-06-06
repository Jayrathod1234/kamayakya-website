import { getMixPanelClient } from "@/externals/mixpanel";
import { ArrowLeft } from "lucide-react"; // assuming you use lucide-react

type TGoBackButton = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export default function GoBackButton({ setActiveTab }: TGoBackButton) {
  const mp = getMixPanelClient();

  const handleGoBack = () => {
    setActiveTab("review");
    mp.track("previouspage_clicked", {
      page: "InvoiceDetails_Page",
    });
  };

  return (
    <button onClick={handleGoBack} className="hidden sm:flex items-center mb-7 cursor-pointer">
      <ArrowLeft size={18} />
      <p className="group ml-[5px] text-xs text-gray-600 relative">
        Go Back to Previous Page
        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#475467] transition-all duration-300 group-hover:w-full"></div>
      </p>
    </button>
  );
}
