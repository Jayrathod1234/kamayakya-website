import React, { useState } from "react";

interface TeamCardParams {
  name: string;
  designation: string;
  description: React.JSX.Element;
  social1: string;
  social2: string;
  img: string;
}

export default function TeamCard({ name, designation, description, social1, social2, img }: TeamCardParams) {
  const [display, setDisplay] = useState(false);
  return (
    <div className={`group/team relative w-[300px] h-[400px]`}>
      {!display ? (
        <div className="w-[300px] h-[400px] bg-[rgba(243,255,253,1)] overflow-hidden before:absolute before:h-full before:w-full before:top-0 before:z-10 before:bg-[linear-gradient(to_top,black,transparent)] rounded-xl relative pt-4 pb-6 flex flex-col justify-between ">
          <button
            onClick={() => setDisplay((prev) => !prev)}
            className="pointer-events-auto border border-brand-300 transition-transform delay-75 duration-300 flex items-center justify-center h-10 w-10 top-[14px] right-[14px] rounded-xl absolute bg-white z-30 group-hover/team:scale-110"
          >
            <svg className=" " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.8571 9.14286H9.14286V14.8571C9.14286 15.1602 9.02245 15.4509 8.80812 15.6653C8.59379 15.8796 8.30311 16 8 16C7.6969 16 7.40621 15.8796 7.19188 15.6653C6.97755 15.4509 6.85714 15.1602 6.85714 14.8571V9.14286H1.14286C0.839753 9.14286 0.549063 9.02245 0.334735 8.80812C0.120408 8.59379 0 8.30311 0 8C0 7.6969 0.120408 7.40621 0.334735 7.19188C0.549063 6.97755 0.839753 6.85714 1.14286 6.85714H6.85714V1.14286C6.85714 0.839753 6.97755 0.549062 7.19188 0.334735C7.40621 0.120407 7.6969 0 8 0C8.30311 0 8.59379 0.120407 8.80812 0.334735C9.02245 0.549062 9.14286 0.839753 9.14286 1.14286V6.85714H14.8571C15.1602 6.85714 15.4509 6.97755 15.6653 7.19188C15.8796 7.40621 16 7.6969 16 8C16 8.30311 15.8796 8.59379 15.6653 8.80812C15.4509 9.02245 15.1602 9.14286 14.8571 9.14286Z"
                fill="url(#paint0_linear_18061_93362)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_18061_93362"
                  x1="15.623"
                  y1="14.2928"
                  x2="-1.70252"
                  y2="-2.58729"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#125B54" />
                  <stop offset="1" stop-color="#12ADB7" />
                </linearGradient>
              </defs>
            </svg>
          </button>
          <img src={img} alt={name} className="absolute left-0 bottom-0 z-[1]" />
          <div className="flex items-center z-10 pl-4 gap-x-[10px] opacity-0 group-hover/team:opacity-100 transition-opacity duration-300">
            {social1 && <a href={social1} target="_blank">
              <img src="/landing/Twitter.png" alt="twitter" />
            </a>}
            {social2 && <a href={social2} target="_blank">
              <img src="/landing/Linkedin.png" alt="linkedin" />
            </a>}
          </div>
          <div className="relative z-30 px-6 text-white open_sans text-left">
            <h3 className="mb-0 font-bold text-display-xs">{name}</h3>
            <p className="mt-[17px] font-semibold">{designation}</p>
          </div>
        </div>
      ) : (
        <div className="w-[300px] h-[400px] bg-transparent rounded-xl relative   flex flex-col justify-between">
          <button
            onClick={() => setDisplay((prev) => !prev)}
            className="rotate-0  flex items-center justify-center transition-transform duration-300  h-[50px] w-[50px] rounded-xl absolute bg-white top-[9px] right-[9px] z-10 shadow"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.0609 17.4851L9 11.4242L2.93908 17.4851C2.61759 17.8066 2.18156 17.9872 1.7269 17.9872C1.27224 17.9872 0.83621 17.8066 0.514719 17.4851C0.193228 17.1636 0.0126156 16.7276 0.0126156 16.273C0.0126149 15.8183 0.193227 15.3823 0.514718 15.0608L6.57563 8.99986L0.514718 2.93894C0.193227 2.61745 0.0126155 2.18142 0.0126157 1.72676C0.0126159 1.2721 0.193227 0.83607 0.514718 0.514579C0.836209 0.193088 1.27224 0.0124766 1.7269 0.0124764C2.18156 0.0124762 2.61759 0.193088 2.93908 0.514579L9 6.57549L15.0609 0.514578C15.3824 0.193087 15.8184 0.0124756 16.2731 0.0124752C16.7278 0.0124754 17.1638 0.193087 17.4853 0.514578C17.8068 0.836069 17.9874 1.2721 17.9874 1.72676C17.9874 2.18142 17.8068 2.61745 17.4853 2.93894L11.4244 8.99986L17.4853 15.0608C17.8068 15.3823 17.9874 15.8183 17.9874 16.273C17.9874 16.7276 17.8068 17.1637 17.4853 17.4851C17.1638 17.8066 16.7278 17.9872 16.2731 17.9872C15.8184 17.9872 15.3824 17.8066 15.0609 17.4851Z"
                fill="url(#paint0_linear_18061_93552)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_18061_93552"
                  x1="10.4109"
                  y1="23.7599"
                  x2="9.93844"
                  y2="-12.5207"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#125B54" />
                  <stop offset="1" stop-color="#12ADB7" />
                </linearGradient>
              </defs>
            </svg>
          </button>

          <div className="relative bg-[#fff] pt-2 pb-[10px] rounded-t-xl w-[78%] after:absolute after:bottom-[-1px] after:w-5 after:h-5 after:bg-transparent after:rounded-full after:z-0 after:right-[-20px] after:shadow-[-6px_8px_0px_rgba(255,255,255,1)]">
            <div className="flex items-center z-10 pl-[14px] gap-x-[10px] transition-opacity duration-300">
              {social1 && <a href={social1} target="_blank">
                <img className="object-contain" height={52} width={52} src="/landing/Twitter-dark.png" alt="twitter" />
              </a>}
              {social2 && <a href={social2} target="_blank">
                <img className="object-contain" height={52} width={52} src="/landing/Linkedin-dark.png" alt="twitter" />
              </a>}
            </div>
          </div>
          <div className="relative z-30 px-[10px] bg-[#fff] h-full rounded-b-xl rounded-tr-xl open_sans text-left">
            {description}
          </div>
        </div>
      )}
    </div>
  );
}
