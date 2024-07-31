import React from "react";

function Stockpicks() {
  return (
    <>
      {/* banner  */}
      <div className="bg-success-600 font-open_sans">
        <div className="relative">
          <div className="relative w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto max-h-[700px]  md:max-h-[950px]">
            <div class="min-w-[470px] z-50 text-center">
              <div class="pt-9 pb-[22px] flex justify-center">
                <a
                  class="py-[6px] pr-[10px] pl-[14px] text-white text-sm border border-[#75cdc5] rounded-3xl bg-[#108973]/[0.20]"
                  href="https://kamayakya.com/Kamayakya-SEBI-License.pdf#toolbar=0&fitH=1"
                >
                  SEBI Registered: INH000009843
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    class="inline-block"
                  >
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
              </div>
              <h1 class="text-3xl font-bold leading-[38px] text-black mb-8 flex justify-center">
                Discover hidden gems! 💎
              </h1>
              <div class="bg-white rounded-[61px] mx-auto max-w-[347px] py-[6px] z-50">
                <div class="flex flex-row flex-wrap justify-center">
                  <input
                    id="tab-one"
                    type="radio"
                    name="tabs"
                    class="peer/tab-one opacity-0 absolute"
                    checked
                  />
                  <label
                    for="tab-one"
                    class="bg-white peer-checked/tab-one:bg-black peer-checked/tab-one:text-white cursor-default px-10 py-2 rounded-[47px] block text-base font-semibold"
                  >
                    Main Board
                    <span class="block text-[11px] font-bold">12 Stocks</span>
                  </label>
                  <input
                    id="tab-two"
                    type="radio"
                    name="tabs"
                    class="peer/tab-two opacity-0 absolute"
                  />
                  <label
                    for="tab-two"
                    class="bg-white peer-checked/tab-two:bg-black peer-checked/tab-two:text-white cursor-default px-10 py-2 rounded-[47px] block text-base font-semibold"
                  >
                    SME Board
                    <span class="block text-[11px] font-bold">14 Stocks</span>
                  </label>
                  <div class="basis-full h-0 transition ease-out duration-700"></div>
                </div>
              </div>
            </div>
          </div>
          <video
            autoplay
            muted
            playsinline
            loop
            preload="none"
            class="video-bg"
          >
            <source src="https://s3-figma-videos-production-sig.figma.com/video/1340608807624536784/TEAM/11b1/7aa6/-7d58-4850-b149-dc7147331e8d?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ndpwmS0DlQmNx6Gs5weuaJ8NlvSCh-FFPccv4e-sRv5O6U~NcCE8utZC6tFY1iajg09egTMAi4ZM4I8Hya3DTPHeQyqPwVL3CbS~-cr6DO4gDK5qGdAL4RuqSAZEiEhzZxUrkAPq5AdbLOFOKQAkteni1Go13TIhyR0oegqo19MLQwGuYwxs8r54uutdi4TCZ3PiuuC997mm1up8BDRGUFcKO11R6N68stj57MUDnEvNwTT4n4kJY1zBWm7UJpu0FtkHXUq4Su-XuwFEaQAAmKJfajWQyP4EtFbAQFe-0yxkZDvG3i6mPJEnz7lqKth6uejwasOHvldmYs6MuwtoZw__" />
          </video>
          {/* <div class="absolute top-0 right-0 w-full z-10">
            <img src="/assets/bg-vector.svg" alt="" class="w-full h-full" />
          </div> */}
        </div>
      </div>
      {/* banner card  */}
      <div class="relative z-[555] mt-[-6%]">
        <div class="container mx-auto">
          <div className="bg-gray-150 p-[10px] rounded-[20px]">
            <div className="bg-[#F2F4F7] rounded-[20px] px-10 py-8 gap-10 text-center">
              <h2 className="text-display-xs font-bold leading-8 font-open_sans m-0">
                Hot Stocks (3)
              </h2>
              <p className="p-3 font-normal text-sm text-gray-500">
                Top stocks to invest in right NOW!
              </p>
              <div className="bg-white bg-[linear-gradient(to_top,rgba(255,255,255,0.4),rgba(255,255,255,0)),radial-gradient(126.67%_325.03%_at_-1.18%_22.73%,rgba(241,252,255,0.4)_0%,rgba(202,242,255,0.4)_19%,rgba(193,240,255,0.4)_39%,rgba(193,255,236,0.4)_57.07%,rgba(203,255,224,0.4)_69.37%,rgba(229,255,223,0.4)_79.3%,rgba(246,255,244,0.4)_100%)] bg-[length:auto_1200px] bg-no-repeat py-[91px] pl-[80px]">
                {/* <img src="/assets/Grid.png" alt="" srcset="" /> */}
                <div className="w-1/3">
                  <img
                    src="/assets/noto_locked.png"
                    alt=""
                    className="w-[46px]"
                  />
                  <p className="text-display-sm font-bold leading-[38px] text-left  pt-4">
                    Gain exclusive access to
                    <span className="text-[#108973]">
                      30+ potential multibagger picks
                    </span>
                    with KamayaKya membership.
                  </p>
                </div>
                <div className="w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stockpicks;
