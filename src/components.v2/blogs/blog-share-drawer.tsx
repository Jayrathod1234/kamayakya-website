import React from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { Share2, X } from "lucide-react";
import { BlogSocialList } from "./blog-social-list";
import { TBlog } from "@/types";

export function BlogShareDrawer({ blog }: { blog: TBlog }) {
  return (
    <Drawer>
      <DrawerTrigger>
        <div className=" border-0 flex justify-center items-center gap-x-[10px] py-[10px] lg:hidden fixed  bottom-0 z-40 bg-[#0E4944] w-full left-0 ">
          <button className="">
            <Share2 size={16} color="white" />
          </button>
          <p className=" text-sm font-bold text-white">Share the blog</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className=" border-0 rounded-t-[20px]">
        <div className=" py-7 px-3 flex justify-center items-center gap-x-4">
          <BlogSocialList blog={blog} size={20} disabled />
        </div>

        <div className="">
          <DrawerClose className="  flex justify-center items-center gap-x-[10px] py-[10px] lg:hidden z-40 bg-[#0E4944] w-full left-0">
            <button className="">
              <X size={16} color="white" />
            </button>
            <p className=" text-sm font-bold text-white">Close</p>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
