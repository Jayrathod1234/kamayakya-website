import * as Progress from "@radix-ui/react-progress";
import React, { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  function scrollPercent() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    setProgress(scrolled);
  }

  useEffect(() => {
    let id = window.addEventListener("scroll", scrollPercent);
    return ()=>removeEventListener("scroll",scrollPercent)
  }, []);
  return (
    <Progress.Root
      className="relative h-[4px] w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 transition-all"
      value={progress}
    >
      <Progress.Indicator
        className="h-full w-full flex-1 transition-all bg-[linear-gradient(90deg,_#95DBD4_4.91%,_#5DC7BC_21.6%,_#4CC4B4_40.82%,_#31AC9F_60.04%,_#4DCCC1_80.27%,_#5FBCB3_96.97%)]"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
}
