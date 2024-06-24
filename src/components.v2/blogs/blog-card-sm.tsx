import { ChevronRight, icons } from "lucide-react";
import React from "react";
import { format } from "date-fns";
import { Button } from "../button";
import { ButtonVariant } from "../button/button";
import Image from "next/image";
import { useRouter } from "next/router";
import { TBlog } from "@/types";

type TMeta = {
  icon:keyof typeof icons;
  label:string;
  variant?:string;
  fontColor?:string;
  iconColor?:string;
}

export const Meta = ({ icon, label,variant = "sm",fontColor,iconColor }:TMeta) => {
  const LucideIcon = icons[icon];
  let fontStyle = variant === "lg" ? " text-xs md:text-lg" :"text-sm" 
  let gap = variant === "lg" ? " gap-x-[8px]" : "gap-x-[6px]"
  let iconSize = variant === "lg" ? 14 : 12

  return (
    <span className={` flex items-center ${gap}`}>
      <LucideIcon color={iconColor || "#344054"} size={iconSize} />
      <p className={` text-gray-500 font-medium ${fontStyle} ${fontColor}`}>{label}</p>
    </span>
  );
};

export const Line= ()=>{
  return <div className=" h-[14px] w-[0.5px] bg-gray-400"></div>
}

export function BlogCardSm({ blog }:{blog:TBlog}) {
  const router = useRouter()
  
  const handleReadMore = ()=> router.push(`${blog.slug}`)

  return (
    <div className=" min-w-[358px] max-w-[405.33px] border border-gray-150 rounded-[10px] overflow-hidden shadow-6xs">
      <div className=" h-[300px]">
        <Image className=" object-cover h-full w-full" width={406} height={300} alt="blog-image" src={blog.image1}/>
      </div>
      <div className=" p-6">
        <div className="flex items-center gap-x-3">
          <Meta icon={"Calendar"} label={format(new Date(blog?.created), "dd MMM, yyyy")} />
          <Line/>     
          <Meta icon={"Clock"} label={blog.read_time + " min read"} />
        </div>
        <div className=" mt-4 mb-6">
          <h2 className=" font-bold text-gray-950 text-display-xs w-full line-clamp-2">{blog.title}</h2>
        <p dangerouslySetInnerHTML={{__html:blog.description}} className=" mt-2 line-clamp-2 text-gray-950 opacity-60"></p>
        </div>
        <Button onClick={handleReadMore} endIcon={<div className=" h-4 aspect-square"><ChevronRight size={16}/></div>} variant={ButtonVariant.secondary}><p>Read More</p></Button>
      </div>
    </div>
  );
}
