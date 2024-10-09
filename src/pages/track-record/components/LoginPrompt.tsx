import { ButtonnArrow } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components.v2/ui/dialog";
import AuthContext from "@/components/AuthContext";
import { useStockPicks } from "@/contexts/StockPicksContext";
import React, { useContext, useState } from "react";
import StockCard from '../../../components.v3/common/StockCard'
import Link from "next/link";
export default function LoginPrompt({ children }) {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, handleLogin } = useContext(AuthContext);
  // const { stockSector } = useStockPicks();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        {React.cloneElement(children, { setOpen })}
      </DialogTrigger>
      <DialogContent className=" !rounded-3xl bg-[url(/assets/grid.png)] bg-cover w-[calc(100%-32px)] max-w-[780px] max-h-fit sm:max-h-[90dvh] !p-0">
        <div className=" p-[40px] flex flex-col items-center min-w-0">
          <div className=" flex flex-col items-center min-w-0">
            <img src="/assets/noto_locked.png" width={56} height={56} alt="lock" />
            <h1 className=" font-bold text-display-xs md:text-display-sm text-center text-gray-950 mt-4 mb-5">
              Gain exclusive access to <span className=" text-brand-400">30+ potential multibagger stocks</span> and our
              entire track record with the KamayaKya membership.
            </h1>
            <Link href={"/pricing"} >
            <ButtonnArrow className=" bg-brand-500 !h-fit" variant={ButtonVariant.primary}>
              <p className=" open_sans font-bold m-0">Explore Plans</p>
            </ButtonnArrow>
            </Link>
          </div>

          <div className=" hidden sm:flex justify-center items-center max-w-full max-h-fit  overflow-hidden mx-auto relative min-w-0 scale-[.85] -mt-8 md:scale-[.80] md:-mt-6">
            <StockCard className=" relative left-[25%] md:left-[15%] scale-[.60] md:scale-75 -top-16 max-h-[265px] w-full max-w-[227px]" recommended_stock={true} is_blur={true}/>
            <StockCard className=" scale-90 md:scale-100 max-h-fit  max-w-[345px] z-20" recommended_stock={true} is_blur={true}/>
            <StockCard className=" relative right-[25%] md:right-[15%] scale-[.60] md:scale-75 -top-16   max-h-[265px] max-w-[227px]" recommended_stock={true} is_blur={true}/>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
