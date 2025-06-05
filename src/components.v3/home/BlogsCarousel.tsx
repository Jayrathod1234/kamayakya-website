import { BlogCardSm } from "@/components.v2/blogs";
import { ButtonnArrow } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { usePrevNextButtons } from "@/components.v2/carousel";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";
import { GET_BLOGS } from "@/pages/api/URLs";
import { TBlog } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function BlogsCarousel() {
  const [blogs, setBlogs] = useState([]);
  const [api, setApi] = React.useState<CarouselApi>()
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(api);

  const handlePrevNext = (cb: () => void) => {
    cb();
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${GET_BLOGS}?limit=10&offset=0`);
      const data = response.data;
      setBlogs(data.results);
    } catch (error) {
      console.log("Error fetching blogs:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (Array.isArray(blogs) && blogs.length == 0) return null;

  return (
    <div className=" py-[50px] bg-gray-100 open_sans relative ">
      <p className=" font-bold text-[#FF9E29] text-center max-md:text-sm">BLOGS</p>
      <h2 className=" text-display-xs md:text-2xl font-bold mb-0 md:mb-2 text-center text-gray-950">Deep dives into market trends and data</h2>
      <Carousel className=" w-full relative pt-6 md:pt-10 pb-[50px]" setApi={setApi}>
        <CarouselContent>
          {blogs.map((blog: TBlog) => (
            <CarouselItem className=" basis-auto">
              <BlogCardSm key={blog.id} blog={blog} />
            </CarouselItem>
          ))}
        </CarouselContent>
      
      </Carousel>
      <div className="h-full left-4 md:left-0  md:w-1/3 max-w-[261px] top-0 absolute md:bg-gradient-to-r from-gray-100 to-transparent z-20 flex flex-col justify-center items-center ">
          <div>
            <ButtonnArrow
              onClick={() => handlePrevNext(onPrevButtonClick)}
              variant={ButtonVariant.custom}
              className=" rounded-full md:h-[52px] md:w-[52px] h-6 w-6 min-w-0 md:!p-2 !px-4 !py-4 rotate-180 hover:bg-[#0b3a36]"
            ></ButtonnArrow>
          </div>
        </div>
        <div className=" right-4 md:right-0 h-full max-w-[261px] md:w-1/3  top-0 absolute md:bg-gradient-to-l from-gray-100 to-transparent z-20 flex flex-col justify-center items-center">
          <div>
            <ButtonnArrow
              onClick={() => handlePrevNext(onNextButtonClick)}
              variant={ButtonVariant.custom}
              className=" rounded-full h-6 w-6 md:h-[52px] md:w-[52px] min-w-0 md:!p-2 !px-4 !py-4 hover:bg-[#0b3a36]"
            ></ButtonnArrow>
          </div>
        </div>
    </div>
  );
}
