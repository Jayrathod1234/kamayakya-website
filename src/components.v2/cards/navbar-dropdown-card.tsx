import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarVariant } from "../avatar";
import { NavbarUserCard } from "./navbar-user-card";
import { CircleHelp, Headset, LogOut, MessageSquareText, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ContactModal } from "../payments/contact-modal";

export function NavbarDropdownCard({
  triggerElement,
  userCard,
  sideOffset = 8,
  side = undefined,
}: {
  triggerElement: React.ReactNode;
  userCard?: boolean;
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left" | undefined;
}) {
  const [open,setOpen] = useState(false)
  const router = useRouter();

  //scroll to not working properly because of dropdown state change
  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRouting = (href: string) => {
    router.push(href);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    router.replace("/");
  };
  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className=" w-full">{triggerElement}</DropdownMenuTrigger>
      <DropdownMenuContent
        className=" w-[319px] md:w-auto rounded-[6px] border border-gray-150 shadow-[0px_4px_6px_rgba(0,0,0,0.09)]"
        side={side}
        sideOffset={sideOffset}
      >
        {userCard && (
          <DropdownMenuLabel className=" p-0">
            <NavbarUserCard />
          </DropdownMenuLabel>
        )}

        {/* <DropdownMenuLabel className=" p-2">
          <DropDownItemContent icon={<User size={16} />} option="My Account" />
        </DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem className=" p-2">
          <DropDownItemContent
            onClick={() => handleRouting("/user-profile")}
            icon={<User size={16} />}
            option="My Account"
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className=" p-2 flex flex-col gap-y-2">
          {/* <DropdownMenuItem className=" p-0">
            <DropDownItemContent
              onClick={() => handleRouting("/blogs")}
              icon={<MessageSquareText size={16} />}
              option="Blogs"
            />
          </DropdownMenuItem> */}
          <DropdownMenuItem className=" p-0">
            <DropDownItemContent
              onClick={() => handleRouting("/#FAQs")}
              icon={<CircleHelp size={16} />}
              option="FAQs"
            />
          </DropdownMenuItem>
          <ContactModal trigger={<DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              // scrollTo("#feeling-lost")
              // setOpen(false)
            }}
            className=" p-0"
          >
            <DropDownItemContent
              // onClick={() =>handleRouting("/pricing#feeling-lost") }
              icon={<Headset size={16} />}
              option="Contact us"
            />
          </DropdownMenuItem>}/>
          
        </div>
        <DropdownMenuSeparator />
        <div className=" p-2">
          <DropdownMenuItem className=" p-0">
            <DropDownItemContent
              icon={<LogOut size={16} color="#D92D20" />}
              fontColor="text-error-500"
              option="Log out"
              onClick={handleLogoutClick}
            />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const DropDownItemContent = ({
  icon,
  option,
  fontColor,
  onClick,
}: {
  icon: React.ReactNode;
  option: string;
  fontColor?: string;
  onClick?: () => void;
}) => {
  return (
    <div onClick={onClick} className=" flex gap-x-2 px-2 py-[6px] items-center">
      {icon}
      <p className={`text-sm font-medium text-gray-700 ${fontColor}`}>{option}</p>
    </div>
  );
};
