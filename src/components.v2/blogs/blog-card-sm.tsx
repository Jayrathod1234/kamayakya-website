import { ChevronRight, icons } from "lucide-react";
import React from "react";
import { format } from "date-fns";
import { Button, ButtonnArrow } from "../button";
import { ButtonVariant } from "../button/button";
import Image from "next/image";
import { useRouter } from "next/router";
import { TBlog } from "@/types";
import { useMediaQuery } from "@mui/material";

type TMeta = {
  icon: keyof typeof icons;
  label: string;
  variant?: string;
  fontColor?: string;
  iconColor?: string;
};

export const Meta = ({ icon, label, variant = "sm", fontColor, iconColor }: TMeta) => {
  const LucideIcon = icons[icon];
  let fontStyle = variant === "lg" ? " text-xs md:text-lg" : "text-sm";
  let gap = variant === "lg" ? " gap-x-[8px]" : "gap-x-[6px]";
  let iconSize = variant === "lg" ? 14 : 12;

  return (
    <span className={` flex items-center ${gap}`}>
      <LucideIcon color={iconColor || "#344054"} size={iconSize} />
      <p className={` text-gray-500 font-medium ${fontStyle} ${fontColor}`}>{label}</p>
    </span>
  );
};

export const Line = ({ className }: { className?: string }) => {
  return <div className={` h-[14px] w-[0.5px] bg-gray-400 ${className}`}></div>;
};

export function BlogCardSm({ blog, className }: { blog: TBlog; className?: string }) {
  const isMobile = useMediaQuery("(max-width:1280px)");
  const router = useRouter();

  const handleReadMore = () => router.push(`${blog.slug}`);

  return (
    <div
      onClick={handleReadMore}
      className={` cursor-pointer relative ${
        isMobile
          ? 'before:content-[""] before:absolute before:h-full before:w-full before:bg-[rgba(0,0,0,0.25)] before:invisible active:before:visible before:z-20 active:scale-[.98]'
          : "hover:scale-[.98] "
      }   group/card bg-white w-full min-w-[320px] max-w-[405.33px] max-h-[496px] border border-white rounded-[10px] overflow-hidden shadow-6xs hover:shadow-lg transition-all scale-100 ease-[cubic-bezier(0.175,0.0885,0,0.1)]  duration-300 ${className}`}
    >
      <div
        // onClick={handleReadMore}
        //group-hover/card:opacity-30 group-hover/card:h-[496px]
        // absolute
        className={` relative transition-all duration-300 ease-[cubic-bezier(0.175,0.0885,0,0.1)] ${
          isMobile ? "" : " "
        }    h-[300px] w-full cursor-pointer before:content-[""] before:absolute before:h-full before:w-full before:transition-colors  before:bg-transparent group-hover/card:before:bg-[rgba(0,0,0,.5)] before:z-10`}
      >
        <Image className=" object-cover h-full w-full" width={406} height={300} alt="blog-image" src={blog.image1} />
      </div>
      {/* group-hover/card:bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.60)_45.04%,#FFF_100%)] */}
      {/* pt-[324px] */}
      <div
        className={` relative p-6  z-10  translate-y-3 bg-white ${
            isMobile ? "" : "group-hover/card:-translate-y-9"
          } transition-all duration-300 ease-[cubic-bezier(0.175,0.0885,0,0.1)] `}
      >
        {/* className={` translate-y-3 ${
            isMobile ? "" : "group-hover/card:-translate-y-9"
          } transition-all duration-300 ease-[cubic-bezier(0.175,0.0885,0,0.1)] `} */}
        <div
          
        >
          <div className="flex items-center gap-x-3">
            <Meta icon={"Calendar"} label={format(new Date(blog?.created), "dd MMM, yyyy")} />
            <Line />
            <Meta icon={"Clock"} label={blog.read_time + " min read"} />
          </div>
          <div className=" mt-4 ">
            <h2
              // onClick={handleReadMore}
              className={` font-bold text-gray-950 text-lg w-full line-clamp-1 cursor-pointer mb-0 ${isMobile ? "":"group-hover/card:text-brand-500"} `}
            >
              {blog.title}
            </h2>
            <div

              className=" mt-2 line-clamp-2 text-gray-950 opacity-60 h-[52px]"
            >
              <p>{blog.subtext}</p>
            </div>
          </div>
          <div className=" mt-6">
          <ButtonnArrow
            className="border-0 bg-transparent hover:bg-transparent !px-0"
            variant={ButtonVariant.secondary}
            arrowStyle=" mt-[2px]"
            strokeStyle=" stroke-brand-400"
          >
            <p className=" font-semibold">Read More</p>
          </ButtonnArrow>
          </div>
          
        </div>
      </div>
    </div>
  );
}
