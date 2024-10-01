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
import { getMixPanelClient } from "@/externals/mixpanel";

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
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleEvent = (event: string, properties: Record<string, string>) => {
    console.log("CLICKED", event);
    const mp = getMixPanelClient();
    mp.track(event, properties);
  };

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
    handleEvent("logout_clicked", { page: "Pricing_Page" });
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    router.replace("/");
  };
  // console.log(open)
  return (
    <DropdownMenu modal={true} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        onClick={(e) => {
          e.preventDefault();
          // setOpen(true)
          handleEvent("profileicon_clicked", { page: "Pricing_Page" });
        }}
        className=" w-full z-10"
      >
        {triggerElement}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" max-w-[319px] md:w-auto rounded-[6px] border border-gray-150 shadow-[0px_4px_6px_rgba(0,0,0,0.09)]"
        side={side}
        sideOffset={sideOffset}
      >
        {userCard && (
          <DropdownMenuLabel className=" p-0 bg-gray-50">
            <NavbarUserCard />
          </DropdownMenuLabel>
        )}

        {/* <DropdownMenuLabel className=" p-2">
          <DropDownItemContent icon={<User size={16} />} option="My Account" />
        </DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <div className=" px-2 my-2">
        <DropdownMenuItem className="p-0">
          <DropDownItemContent
            onClick={() => {
              handleEvent("myaccount_clicked", { page: "Pricing_Page" });
              handleRouting("/user-profile");
            }}
            icon={<User size={16} />}
            option="My Account"
          />

        </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator className="!my-0" />
        <div className=" p-2 flex flex-col">
          <DropdownMenuItem className=" p-0">
            <DropDownItemContent
              onClick={() => {
                handleEvent("blogs_clicked", { page: "Pricing_Page", pagegroup: "My Profile" });
                handleRouting("/blogs-page");
              }}
              icon={<MessageSquareText size={16} />}
              option="Blogs"
            />
          </DropdownMenuItem>
          <DropdownMenuItem className=" p-0">
            <DropDownItemContent
              onClick={() => {
                handleEvent("faq_clicked", { page: "Pricing_Page", pagegroup: "My Profile" });
                handleRouting("/#FAQs");
              }}
              icon={<CircleHelp size={16} />}
              option="FAQs"
            />
          </DropdownMenuItem>
          <ContactModal
            trigger={
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  // setOpen(false)
                  handleEvent("contactscroll_clicked", { page: "Pricing_Page", pagegroup: "My Profile" });

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
              </DropdownMenuItem>
            }
          />
        </div>
        <DropdownMenuSeparator className="!my-0" />
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
