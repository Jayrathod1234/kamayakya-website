import React, { useContext } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components.v2/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components.v2/ui/accordion";
import { Menu } from "lucide-react";
import Image from "next/image";
import { HOME_OPTIONS, NAVBAR_LINKS } from "@/constants/navbar";
import { NavbarDropdownCard, NavbarUserCard } from "./cards";
import AuthContext from "@/components/AuthContext";
import { Button } from "./button";
import { ButtonSize, ButtonVariant } from "./button/button";

export default function SideNav({handleLogin}) {
  const { isLoggedIn } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const handleClick = ()=>{
    setOpen(false)
    handleLogin()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger> 
        <Menu className="inline-block lg:hidden" />
      </SheetTrigger>
      <SheetContent className=" pricing flex flex-col p-0 overflow-y-scroll pr-0">
        {/* <SheetHeader> */}
        <div className="  p-4">
          <Image
            className="inline-block lg:hidden"
            src="/KKLogo.svg"
            alt="KamayaKya-logo"
            width={125.54}
            height={24}
            priority
          />
          <div className=" mt-7">
            <ul className=" m-0">
              <li className=" py-3 px-4 m-0">
                <Accordion className="" type="single" collapsible>
                  <AccordionItem className=" border-b-0" value="item-1">
                    <AccordionTrigger className=" text-md hover:no-underline py-0">Home</AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {HOME_OPTIONS.map((options) => (
                          <li className=" flex gap-x-[10px]  items-center">
                            <div>{options.icon}</div> <p className=" text-md font-medium">{options.title}</p>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
              {NAVBAR_LINKS.map((nav) => (
                <li className=" text-md font-medium py-3 px-4 m-0">{nav.title}</li>
              ))}
            </ul>
          </div>
        </div>
        {isLoggedIn ? (
          <div className=" pt-4 mt-auto">
            <div></div>
            <div className=" mb-2 mt-4  h-[1px] bg-gray-150 w-full"></div>
            <div className=" px-4 pb-4">
              <NavbarDropdownCard
                triggerElement={<NavbarUserCard arrow={true} className="py-2 pl-4 pr-3" />}
                userCard={false}
              />
            </div>
          </div>
        ) : (
          <div className=" p-4 mt-auto">
            <p className=" text-sm font-bold text-[rgba(16,24,40,1))]"> Sign up or log in</p>
            <p className=" text-sm text-gray-500 mb-5">Log in and unlock 3 HOT stocks for Free</p>
            <Button onClick={handleClick} variant={ButtonVariant.primary} size={ButtonSize.sm} customStyle=" w-full mb-2">Sign up</Button>
            <Button onClick={handleClick} variant={ButtonVariant.secondary} size={ButtonSize.sm} customStyle=" w-full">Login</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
