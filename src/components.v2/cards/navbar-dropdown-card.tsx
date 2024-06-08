import React from "react";
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
  const handleLogoutClick = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // router.push("/");
  };
  return (
    <DropdownMenu>
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

        <DropdownMenuLabel className=" p-2">
          <DropDownItemContent icon={<User size={16} />} option="My Account" />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className=" p-2 flex flex-col gap-y-2">
          <DropdownMenuItem className=" p-0">
            <DropDownItemContent icon={<MessageSquareText size={16} />} option="Blogs" />
          </DropdownMenuItem>
          <DropdownMenuItem className=" p-0">
            <DropDownItemContent icon={<CircleHelp size={16} />} option="FAQs" />
          </DropdownMenuItem>
          <DropdownMenuItem className=" p-0">
            <DropDownItemContent icon={<Headset size={16} />} option="Contact us" />
          </DropdownMenuItem>
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
