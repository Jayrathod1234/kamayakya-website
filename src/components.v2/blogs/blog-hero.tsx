import { TBlog } from "@/types";
import { CustomCSSProperties } from "@/types/shared";
import React, { useMemo } from "react";
import { Avatar } from "../avatar";
import { Line, Meta } from "./blog-card-sm";
import { getBlogDateFormat } from "@/lib/date-formatter";

export function BlogHero({ blog }: { blog: TBlog }) {
  const customCss: CustomCSSProperties = {
    "--image-url": `url(${blog?.image1})`,
  };
  const date = useMemo(() => getBlogDateFormat(blog?.created), [blog?.created]);

  return (
    <div
      style={customCss}
      className=' mb-8 p-[3vw] bg-[rgba(0,0,0,.80)] py-[10vw] relative before:absolute before:content-[""] before:h-full before:w-full before:top-0 before:left-0 before:opacity-70 before:z-[1]  before:bg-cover before:bg-[image:var(--image-url)]'
    >
      <h1 className=" relative z-10 text-center font-bold text-display-xs md:text-display-lg text-white">
        {blog.title}
      </h1>
      <div className=" relative z-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        <span className={` flex items-center gap-x-2 w-full md:w-fit justify-center`}>
          <Avatar variant={" h-6 w-6"} customImgSize={24} />
          <p className={` text-gray-200 font-medium text-xs md:text-lg`}>By {blog.author}</p>
        </span>
        <Line className=" hidden md:block !bg-gray-150" />
        <Meta icon={"Calendar"} label={date} variant="lg" fontColor={"!text-gray-200"} iconColor={"#E4E7EC"} />
        <Line className=" !bg-gray-150" />
        <Meta
          icon={"Clock"}
          label={blog.read_time + " min read"}
          variant="lg"
          fontColor={"!text-gray-200"}
          iconColor={"#E4E7EC"}
        />
      </div>
    </div>
  );
}
