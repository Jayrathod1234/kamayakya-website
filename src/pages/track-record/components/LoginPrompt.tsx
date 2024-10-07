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

export default function LoginPrompt({ children }) {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, handleLogin } = useContext(AuthContext);
  const { stockSector } = useStockPicks();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        {React.cloneElement(children, { setOpen })}
      </DialogTrigger>
      <DialogContent className=" !rounded-3xl bg-[url(/assets/grid.png)] bg-cover">
        <div className=" p-[60px] flex flex-col">
          <div className=" flex flex-col items-center">
            <img src="/assets/noto_locked.png" width={56} height={56} alt="lock" />
            <h1 className=" font-bold text-display-sm text-center text-gray-950 mt-4 mb-5">
              Gain exclusive access to <span className=" text-brand-400">30+ potential multibagger stocks</span> and our
              entire track record with the KamayaKya membership.
            </h1>
            <ButtonnArrow className=" bg-brand-500 !h-fit" variant={ButtonVariant.primary}>
              <p className=" open_sans font-bold m-0">Explore Plans</p>
            </ButtonnArrow>
          </div>

          <div className="  max-w-[640px]">
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
