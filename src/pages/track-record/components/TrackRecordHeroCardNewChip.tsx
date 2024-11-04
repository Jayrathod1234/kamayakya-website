import { ButtonnArrow } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components.v2/ui/drawer";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components.v2/ui/hover-card";
import AuthContext from "@/components/AuthContext";
import { useMediaQuery } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import LoginPrompt from "./LoginPrompt";

const ChipItem = ({ label, img, id, setOpen }: { label: string; img: string | null; id: string }) => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const handleRouting = () => (id ? router.push(`/track-record/${id}`) : isLoggedIn ? setOpen(true) : null);

  return (
    <div onClick={handleRouting} className="!p-0 rounded-[4px]  hover:!bg-[rgba(244,255,255,1)] flex items-center">
      {/* image container */}
      <div className=" p-2 w-fit">
        {label ? (
          <object className=" object-contain h-[30px] w-[30px]" data={img as string} type="image/jpeg">
            <img className="" src={"/stock_palceholder.svg"} height={30} width={30} alt="stock-image" />
          </object>
        ) : (
          <div className=" h-6 w-6 bg-[#FFF1CE] rounded-full flex items-center justify-center">
            <img height={15} width={15} src="/assets/noto_locked.png" alt="" />
          </div>
        )}
      </div>
      {/* image container end */}
      <ButtonnArrow
        arrowStyle=" !scale-[.8]" //svg container element,not the svg itself.
        strokeStyle=" stroke-gray-400 group-hover/chip:stroke-brand-400" //affects the svg stroke itself
        variant={ButtonVariant.custom}
        className=" group/chip  min-w-0 w-full justify-between !items-center hover:scale-100 bg-transparent hover:bg-transparent !p-0 !py-0 !pr-3"
      >
        {label ? (
          <p className="!text-2xs  text-gray-700 font-normal group-hover/chip:text-brand-400 group-hover/chip:font-semibold truncate">
            {label}
          </p>
        ) : (
          <span className=" bg-[#EDF0F5] rounded-full h-[15px] w-1/2"></span>
        )}
      </ButtonnArrow>
    </div>
  );
};

const BottomSheetItem = ({ label, img, id, setOpen }) => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <li
      onClick={() => (id ? router.push(`/track-record/${id}`) : isLoggedIn ? setOpen(true) : null)}
      className=" px-4 py-[10px] flex gap-x-2 items-center"
    >
      {label ? (
        <>
          <object className=" h-7 w-7" data={img} type="image/jpeg">
            <img height={28} width={28} src={"/stock_palceholder.svg"} alt="stock-image" />
          </object>
          <p className=" text-sm text-gray-700">{label}</p>
        </>
      ) : (
        <>
          <span className=" flex items-center justify-center bg-[#FFF1CE] rounded-full">
            <img height={15} width={15} src="/assets/noto_locked.png" alt="" />
          </span>
          <span className=" bg-[#EDF0F5] rounded-full h-[15px] w-1/2"></span>
        </>
      )}
      <ArrowRight color="#475467" className=" ml-auto" height={16} width={16} />
    </li>
  );
};

const Chip = () => {
  return (
    <button className=" whitespace-nowrap text-[rgba(0,87,255,1)] px-2 py-[2px] rounded-full bg-[rgba(235,242,255,1)] hover:bg-[rgba(206,223,255,1)] text-3xs inline-block mb-0">
      3 New <span className="hidden sm:inline-block">Recommendations</span>
    </button>
  );
};

export function TrackRecordHeroCardNewChip({ newRecommendation, type }) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const { isLoggedIn, handleLogin } = useContext(AuthContext);
  const isMobile = useMediaQuery("(max-width:640px)");
  const onTriggerEleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setOpenDropDown(true);
  };
  const router = useRouter();

  if (isMobile) {
    return (
      <Drawer open={openDropDown} onOpenChange={setOpenDropDown}>
        <DrawerTrigger asChild>
          <button className=" whitespace-nowrap text-[rgba(0,87,255,1)] px-2 py-[2px] rounded-full bg-[rgba(235,242,255,1)] hover:bg-[rgba(206,223,255,1)] text-3xs inline-block mb-0">
            3 New <span className={`${type === "LIVE" ? "hidden" : ""} sm:inline-block`}>{type==="LIVE" ?"Recommendations":"Exits"}</span>
          </button>
        </DrawerTrigger>
        <DrawerContent className=" rounded-t-[20px] bg-transparent border-none outline-none">
          <button
            onClick={() => setOpenDropDown(false)}
            className=" h-9 w-9 rounded-full bg-white flex items-center justify-center mx-auto mb-5"
          >
            <img src="/assets/x-close.svg" />
          </button>
          <div className="mx-auto w-full px-4 py-2 open_sans bg-white rounded-t-[20px] ">
            <div className=" w-12 h-1 bg-[#98A2B3] rounded-full mx-auto"></div>
            <DrawerHeader className=" px-0 gap-3 pt-2">
              <div className=" h-[160px] w-full bg-[linear-gradient(180deg,#FDC451_0%,#F8AB2B_100%)] rounded-[6px] flex justify-center items-end">
                <img src="/assets/buyActionCall.png" height={151} width={151} alt="buy-action-call" />
              </div>
              <p className=" text-left font-bold px-4  text-lg text-[rgba(12,17,29,1)]">New Stock Picks</p>
            </DrawerHeader>
            <div className=" ">
              {isLoggedIn ? (
                <ul className=" !m-0">
                  {newRecommendation?.map((recommendation) => (
                    <LoginPrompt>
                      <BottomSheetItem
                        label={recommendation.stock_name}
                        img={recommendation.stock_image}
                        id={recommendation.id}
                      />
                    </LoginPrompt>
                  ))}
                </ul>
              ) : (
                <div className=" pt-[23px] pb-[59px] flex flex-col items-center justify-center">
                  <div
                    className=" bg-[#FFF1CE] h-14 w-14 flex items-center
                   justify-center rounded-full"
                  >
                    <img height={36} width={36} src="/assets/noto_locked.png" alt="lock" />
                  </div>
                  <p className=" text-2xs text-[#667085]  mt-[10px]">
                    Please{" "}
                    <span className=" font-bold text-brand-500" onClick={handleLogin}>
                      login
                    </span>{" "}
                    to view
                  </p>
                </div>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <HoverCard open={openDropDown} openDelay={0} onOpenChange={setOpenDropDown}>
      <HoverCardTrigger onClick={onTriggerEleClick} asChild>
        <button className=" whitespace-nowrap text-[rgba(0,87,255,1)] px-2 py-[2px] rounded-full bg-[rgba(235,242,255,1)] hover:bg-[rgba(206,223,255,1)] text-3xs inline-block mb-0">
          3 New <span className={`${type === "LIVE" ? "hidden":""} sm:inline-block`}>{type==="LIVE"?"Recommendations":"Exits"}</span>
        </button>
      </HoverCardTrigger>
      {isLoggedIn ? (
        <HoverCardContent className="w-56 rounded-lg py-[6px] px-1">
          {newRecommendation?.map((recommendation) => (
            <LoginPrompt>
              <ChipItem id={recommendation.id} label={recommendation.stock_name} img={recommendation.stock_image} />
            </LoginPrompt>
          ))}
        </HoverCardContent>
      ) : (
        <HoverCardContent className="w-[208px] rounded-lg py-7 px-1 flex flex-col items-center">
          <div className=" p-[10px] bg-[#FFF1CE] rounded-full">
            <img height={36} width={36} src="/assets/noto_locked.png" />
          </div>
          <p className=" mt-[10px] text-2xs text-[#667085] text-center">
            Please{" "}
            <span onClick={handleLogin} className=" text-brand-500 font-bold underline cursor-pointer">
              login
            </span>{" "}
            to view
          </p>
        </HoverCardContent>
      )}
    </HoverCard>
  );
}

export default TrackRecordHeroCardNewChip;
