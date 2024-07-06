import { ChevronRight, icons } from "lucide-react";
import React from "react";
import { format } from "date-fns";
import { Button } from "../button";
import { ButtonVariant } from "../button/button";
import Image from "next/image";
import { useRouter } from "next/router";
import { TBlog } from "@/types";

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
  const router = useRouter();

  const handleReadMore = () => router.push(`${blog.slug}`);

  return (
    <div
      onClick={handleReadMore}
      className={` cursor-pointer relative group bg-white min-w-[320px] max-w-[405.33px] max-h-[496px] border border-gray-150 rounded-[10px] overflow-hidden shadow-6xs hover:shadow-lg transition-shadow ${className}`}
    >
      <div
        // onClick={handleReadMore}
        className=" z-0 transition-all absolute group-hover:h-[496px] h-[300px] w-full cursor-pointer"
      >
        <Image className=" object-cover h-full w-full" width={406} height={300} alt="blog-image" src={blog.image1} />
      </div>
      <div className=" relative p-6 pt-[324px] z-10 group-hover:hover:bg-[linear-gradient(180deg,_rgba(255,255,255,0.10)_0%,rgba(255,255,255,.90)_45%,rgba(255,255,255)_100%)]">
        <div className=" translate-y-3 group-hover:-translate-y-9 transition-all ">
          <div className="flex items-center gap-x-3">
            <Meta icon={"Calendar"} label={format(new Date(blog?.created), "dd MMM, yyyy")} />
            <Line />
            <Meta icon={"Clock"} label={blog.read_time + " min read"} />
          </div>
          <div className=" mt-4 ">
            <h2
              // onClick={handleReadMore}
              className=" font-bold text-gray-950 text-lg w-full line-clamp-2 cursor-pointer mb-0 group-hover:text-brand-500"
            >
              {blog.title}
            </h2>
            <p
              dangerouslySetInnerHTML={{ __html: blog.description }}
              className=" mt-2 line-clamp-2 text-gray-950 opacity-60"
            ></p>
          </div>
          <Button
            customStyle="mt-6 !p-0 h-fit border-0 bg-transparent hover:bg-transparent"
            // onClick={handleReadMore}
            endIcon={
              <div className=" h-4 aspect-square">
                <ChevronRight size={16} />
              </div>
            }
            variant={ButtonVariant.secondary}
          >
            <p className=" font-medium">Read More</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
