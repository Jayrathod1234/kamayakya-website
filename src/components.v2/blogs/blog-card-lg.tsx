import { ChevronRight, icons } from "lucide-react";
import React from "react";
import { format } from "date-fns";
import { Button, ButtonnArrow } from "../button";
import { ButtonVariant } from "../button/button";
import Image from "next/image";
import { TBlog } from "@/types";
import { useRouter } from "next/router";

const Meta = ({ icon, label }: { icon: string; label: string }) => {
  const LucideIcon = icons[icon as keyof typeof icons];
  return (
    <span className=" flex gap-x-[6px] items-center ">
      <LucideIcon color="#344054" size={12} />
      <p className=" text-gray-500 font-medium text-sm">{label}</p>
    </span>
  );
};

export function BlogCardLg({ blog }: { blog: TBlog }) {
  const router = useRouter();

  const handleReadMore = () => router.push(`${blog.slug}`);

  return (
    <div className="bg-white hidden md:flex col-span-full h-[500px] min-w-full border-[10px]  border-white rounded-[20px] overflow-hidden shadow-6xs max-md:hover:shadow-lg transition-shadow ">
      <div onClick={handleReadMore} className=" cursor-pointer ">
        <Image className=" object-cover h-full w-full" width={406} height={300} alt="blog-image" src={blog.image1} />
      </div>
      <div className=" py-12 px-14 flex flex-col max-w-[400px] lg:max-w-[491px]">
        <div className="flex items-center gap-x-3">
          <Meta icon={"Calendar"} label={format(new Date(blog?.created), "dd MMM, yyyy")} />
          <div className=" h-[14px] w-[0.5px] bg-gray-400"></div>
          <Meta icon={"Clock"} label={blog.read_time + " min read"} />
        </div>
        <div className=" mt-6">
          <h2
            onClick={handleReadMore}
            className=" cursor-pointer font-bold text-md text-gray-950 md:text-display-md w-full line-clamp-2"
          >
            {blog.title}
          </h2>
          <div
            
            className=" mt-2 line-clamp-2 md:line-clamp-[6] text-gray-950 opacity-60"
          ><div dangerouslySetInnerHTML={{ __html: blog.description }}></div></div>
        </div>
        <div className=" mt-auto">
          <ButtonnArrow
            onClick={handleReadMore}
            strokeStyle=" stroke-brand-400"
            variant={ButtonVariant.secondary}
          >
            Read More
          </ButtonnArrow>
        </div>
      </div>
    </div>
  );
}
