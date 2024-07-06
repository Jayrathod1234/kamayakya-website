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
          <BlogSocialList blog={blog} size={44} />
          {/* <button
                  onClick={() => {
                    window.open(`https://x.com/intent/post?text=${blog.title}+${url + blog.slug}`);
                  }}
                  className=" h-fit border border-gray-100 rounded-full"
                >
                  <Image height={44} width={44} alt="X" src={"/icons/X.svg"} />
                </button>
                <button
                  onClick={() => {
                    window.open(
                      `https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=${url + blog.slug}`,
                      "targetWindow",
                      "toolbar=no,height=100"
                    );
                  }}
                  className=" h-fit border border-gray-100 rounded-full"
                >
                  <Image height={44} width={44} alt="linkedin" src={"/blogs/linkedin.svg"} />
                </button>
                <button
                  onClick={() => {
                    window.open(`https://www.facebook.com/share.php?u=${url + blog.slug}`);
                  }}
                  className=" h-fit border border-gray-100 rounded-full"
                >
                  <Image height={44} width={44} alt="linkedin" src={"/blogs/fb.svg"} />
                </button>
                <button
                  onClick={() => {
                    window.open(
                      `https://web.whatsapp.com/send?text=Look%20at%20this...%20%F0%9F%91%80%0A${url + blog.slug}`
                    );
                  }}
                  className=" h-fit border border-gray-100 rounded-full"
                >
                  <Image height={44} width={44} alt="linkedin" src={"/blogs/whatsapp.svg"} />
                </button>
                <button className=" h-fit border border-gray-100 rounded-full p-3">
                  <CopyToClipboard text={`${url + blog.slug}`} onCopy={handleCopy}>
                    <Link size={16} />
                  </CopyToClipboard>
                </button> */}
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
