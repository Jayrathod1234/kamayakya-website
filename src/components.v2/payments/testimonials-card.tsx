import { Avatar, AvatarVariant } from "@/components.v2/avatar";
import React from "react";

type TTestimonialsCard = {
  className?: string;
  title?: string;
  testimony: string;
  author: string;
  company?: string;
  imgSrc?: string;
};

const Quotes = () => (
  <svg width="33" height="22" viewBox="0 0 33 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M32.2148 0.179688L32.8594 1.125C32.3438 3.21615 31.6706 5.45052 30.8398 7.82812C30.0378 10.2057 29.1641 12.5833 28.2188 14.9609C27.2734 17.3385 26.3138 19.5872 25.3398 21.707H17.9492C18.5221 19.444 19.0951 17.0378 19.668 14.4883C20.2409 11.9388 20.7708 9.41797 21.2578 6.92578C21.7448 4.43359 22.1315 2.1849 22.418 0.179688H32.2148ZM14.2969 0.179688L14.8984 1.125C14.3828 3.21615 13.7096 5.45052 12.8789 7.82812C12.0768 10.2057 11.2031 12.5833 10.2578 14.9609C9.3125 17.3385 8.35286 19.5872 7.37891 21.707H0.117188C0.518229 20.0169 0.933594 18.2409 1.36328 16.3789C1.79297 14.4883 2.19401 12.5977 2.56641 10.707C2.96745 8.78776 3.32552 6.9401 3.64062 5.16406C3.98438 3.35938 4.25651 1.69792 4.45703 0.179688H14.2969Z"
      fill="#FEF0DF"
    />
  </svg>
);

export function TestimonialsCard({ className, testimony, title, author, company, imgSrc }: TTestimonialsCard) {
  return (
    <div
      className={
        className +
        " testimony  group/testimonial-card h-[408px] md:h-[426px] flex flex-col bg-white relative text-start px-7 py-3 md:px-[3.44rem] md:py-[3.31rem] shadow-sm hover:shadow-xl md:min-w-[450px] md:max-w-[650px] lg:w-[664px] min-w-[324px] border border-[#EFF0F6] rounded-[1.25rem] transition-all  hover:border-transparent"
      }
    >
      <div className=" absolute top-[-3%] right-[2.5rem]">
        <Quotes />
      </div>
      {title ? (
        <h4 className=" text-lg md:text-display-xs font-semibold mb-3 md:mb-8">{title}</h4>
      ) : (
        <div className=" mb-3 md:mb-8" />
      )}
      {/* line-clamp-[8] */}
      <p className="testimonial-card-para  overflow-y-scroll text-[13.5px] md:text-md text-gray-600 leading-[23.52px] md:leading-[1.68rem] mb-8 tracking-normal">
        {testimony}
      </p>
      {/* group-hover/testimonial-card:scale-110 */}
      <div className=" mt-auto transition-all origin-left flex gap-6 md:gap-4 items-center ">
        <div>
          <Avatar imgSrc={imgSrc} variant={AvatarVariant.lg} />
        </div>
        <div className=" flex flex-col items-start min-w-0">
          <p className=" transition-all md:text-xs md:font-semibold font-bold text-[#170F49]">{author}</p>
          <p className="transition-all md:text-xs text-gray-500 line-clamp-1 ">{company}</p>
        </div>
      </div>
    </div>
  );
}
