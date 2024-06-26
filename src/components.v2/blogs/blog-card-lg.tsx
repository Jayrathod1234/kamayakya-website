import { ChevronRight, icons } from "lucide-react";
import React from "react";
import { format } from "date-fns";
import { Button } from "../button";
import { ButtonVariant } from "../button/button";
import Image from "next/image";
import { TBlog } from "@/types";

const Meta = ({ icon, label }:{icon:string;label:string}) => {
  const LucideIcon = icons[icon as keyof typeof icons];
  return (
    <span className=" flex gap-x-[6px] items-center ">
      <LucideIcon color="#344054" size={12} />
      <p className=" text-gray-500 font-medium text-sm">{label}</p>
    </span>
  );
};

export function BlogCardLg({
  blog = {
    author: "KMK",
    created: "2024-06-05T18:57:29.075079+05:30",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nihil alias accusantium a dignissimos odit voluptates, et voluptatum natus ullam dolorem aliquam non dolore consectetur impedit amet officiis. Officia obcaecati maxime aliquam ad culpa! Odio recusandae fuga voluptatum minus voluptatibus inventore nemo quam asperiores, consequatur odit, culpa, sint quibusdam amet!",
    id: "3a13796d-de38-4e09-a645-ba76d68fdad4",
    image1:
      "https://kamayakya.s3.amazonaws.com/test-folder/Election_results.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240622%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240622T091530Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=bd88e318fd9a8840f3fe7c6c7a155c2f97dacc5f1242133dd774c51489b2f0d1",
    image2: null,
    image3: null,
    is_archived: false,
    is_drafted: false,
    read_time: 2,
    slug: "the-rise-of-the-tourism-sector",
    title: "THE RISE OF THE TOURISM SECTOR",
    updated_at: "2024-06-05T18:57:29.062002+05:30",
  },
}: {blog?:TBlog}) {
  return (
    <div className=" col-span-full h-[500px] min-w-full border-[10px] flex border-gray-150 rounded-[20px] overflow-hidden shadow-6xs">
      <div>
        <Image className=" object-cover h-full w-full" width={406} height={300} alt="blog-image" src={"https://plus.unsplash.com/premium_photo-1681881669915-bd5d2608f535?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFsbGluZ3xlbnwwfHwwfHx8MA%3D%3D"} />
      </div>
      <div className=" py-12 px-14 flex flex-col max-w-[491px]">
        <div className="flex items-center gap-x-3">
          <Meta icon={"Calendar"} label={format(new Date(blog?.created), "dd MMM, yyyy")} />
          <div className=" h-[14px] w-[0.5px] bg-gray-400"></div>
          <Meta icon={"Clock"} label={blog.read_time + " min read"} />
        </div>
        <div className=" mt-6">
          <h2 className=" font-bold text-md text-gray-950 md:text-display-md w-full line-clamp-2">{blog.title}</h2>
          <p
            dangerouslySetInnerHTML={{ __html: blog.description }}
            className=" mt-2 line-clamp-2 md:line-clamp-[6] text-gray-950 opacity-60"
          ></p>
        </div>
        <div className=" mt-auto">
          <Button
            endIcon={
              <div className=" h-4 aspect-square">
                <ChevronRight size={16} />
              </div>
            }
            variant={ButtonVariant.secondary}
          >
            <p>Read More</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
