import React, { useState } from 'react'

export default function TeamCard() {
  const [display, setDisplay] = useState(false);

  return (
    <div className="group/team">
    <div
      style={{ display: display ? "none" : "flex" }}
      className="   w-[300px] h-[400px] bg-[rgba(243,255,253,1)] overflow-hidden before:absolute before:h-full before:w-full before:top-0 before:z-10 before:bg-[linear-gradient(to_top,black,transparent)]  rounded-xl relative pt-4 pb-6  flex flex-col justify-between"
    >
      <button
        onClick={() => setDisplay((prev) => !prev)}
        className={` pointer-events-auto transition-all duration-300  ${display ? "h-[50px] w-[50px] top-[9px] right-[9px]":"h-10 w-10 top-[14px] right-[14px]"} rounded-xl absolute bg-white  z-30 group-hover/team:scale-110`}
      >
        +
      </button>
      <img src="/dhiren_shah.png" alt="dhiren-shah" className=" absolute left-0 bottom-0 z-[1] " />
      <div className=" flex items-center z-10 pl-4 gap-x-4 opacity-0 group-hover/team:opacity-100 transition-all duration-300 ">
        <button>
          <img src="/Twitter.png" alt="twitter" />
        </button>
        <button>
          <img src="/Twitter.png" alt="twitter" />
        </button>
      </div>
      <div className=" relative z-30 px-6 text-white open_sans">
        <h3 className=" mb-0 font-bold text-display-xs">Dhiren Shah</h3>
        <p className=" mt-[17px] font-semibold">Director & co founder</p>
      </div>
    </div>
    <div
      style={{ display: display ? "flex" : "none" }}
      className="  w-[300px] h-[400px] bg-transparent rounded-xl   relative    flex flex-col justify-between"
    >
      <button
        onClick={() => setDisplay((prev) => !prev)}
        className=" transition-all duration-300 h-[50px] w-[50px] rounded-xl absolute bg-white top-[9px] right-[9px] z-10"
      >
        +
      </button>

      <div className="relative bg-[#ECECEC] pt-4 pb-[9px] rounded-t-xl w-[78%] after:absolute after:bottom-[-1px] after:w-5 after:h-5 after:bg-transparent after:rounded-full after:z-0 after:right-[-20px]  after:shadow-[-6px_8px_0px_rgba(236,236,236,1)] ">
        <div className=" flex items-center z-10 pl-4 gap-x-4 opacity-100 transition-all duration-300">
          <button>
            <img src="/Twitter.png" alt="twitter" />
          </button>
          <button>
            <img src="/Twitter.png" alt="twitter" />
          </button>
        </div>
      </div>
      <div className=" pt-5 relative z-30 px-5 bg-[#ECECEC] h-full rounded-b-xl rounded-tr-xl open_sans">
        <p className=" text-sm">
          He possesses a strong academic background, holding a B.E. in Electronics & Telecommunication and an M.B.A.
          in Finance. With over 2.5 years of equity research experience, he deeply understands diverse sectors,
          including automobiles & ancillaries, capital goods, chemicals, FMCG & engineering. This expertise enhances
          the value of our extensive research process at Kamayakya.r
        </p>
      </div>
    </div>
  </div>
  )
}
