import { useCallback, useEffect, useRef, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { TTarget } from "@/types/shared";
// function debounce(func:()=>void,delay=500){
//   let timer:number;
//   return function(event){
//     if(timer) clearTimeout(timer);
//     timer = setTimeout(func,delay,event);
//   };
// }

export const useStockProgressBar = ({
  emblaApi,
  targets,
  cmpIndex,
  targetIndex,
}: {
  emblaApi?: EmblaCarouselType;
  targets?: TTarget[];
  cmpIndex: number;
  targetIndex: number;
}) => {
  const ref = useRef<Array<HTMLDivElement>>([]);
  const cmpRef = useRef<Array<HTMLDivElement>>([]);

  const targetRef = useRef<Array<HTMLDivElement>>([]);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const [cmpMarginRight, setCmpMarginRight] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(1);
  const [dottedLineWidth, setDottedLineWidth] = useState(0);
  // requestAnimationFrame(
  const calculateDistance = useCallback(() => {
    // console.log("CALCULATE DISTANCE CALLED");
    if (ref.current?.length == 0 && !ref.current[cmpIndex] && !ref.current[targetIndex]) return;
    // console.log("CONTROL REACHED");
    // console.log(cmpRef.current)
    const entryDiv = ref.current[0];
    const cmpDiv = ref.current[cmpIndex];
    const targetDiv = ref.current[targetIndex];
    // console.log(entryDiv,cmpDiv,targetDiv)
    if (!entryDiv || !cmpDiv || !targetDiv) return;
    // console.log("CONROL REACHED HERE")
    // Get the bounding rectangles of both divs
    const entryRect = entryDiv.getBoundingClientRect();
    const cmpRect = cmpDiv.getBoundingClientRect();
    const targetRect = targetDiv.getBoundingClientRect();
    // Calculate the distance between the centers of entry point and cmp
    const distanceX = cmpRect.left + cmpRect.width / 1.2 - (entryRect.left + entryRect.width / 2);
    const distanceY = cmpRect.top + cmpRect.height / 2 - (entryRect.top + entryRect.height / 2);

    // Calculate the Euclidean distance
    const DistanceBtwEntryCmp = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    // console.log("DISTANCEBetweenEntryCmpDISTANCEBetweenEntryCmp", DistanceBtwEntryCmp)
    setCurrentProgress(DistanceBtwEntryCmp);

    // Calculate the distance between the centers of entry point and cmp
    const distanceX2 = targetRect.left + targetRect.width / 1.2 - (entryRect.left + entryRect.width / 2);
    const distanceY2 = targetRect.top + targetRect.height / 2 - (entryRect.top + entryRect.height / 2);

    // Calculate the Euclidean distance
    const DistanceBtwEntryTarget = Math.sqrt(distanceX2 * distanceX2 + distanceY2 * distanceY2);
    // console.log("DISTANCEBetweenEntryCmpDISTANCEBetweenEntryCmp", DistanceBtwEntryTarget);
    setDottedLineWidth(DistanceBtwEntryTarget);
    setMargins(() => ({
      marginLeft: ref.current[0].offsetWidth / 0.25,
      marginRight: ref.current[targetIndex].offsetWidth / 0.18,
    }));
    setCmpMarginRight(ref.current[cmpIndex].offsetWidth);
  }, [cmpIndex, targetIndex]);

  useEffect(() => {
    const handleResize = () => {
      // console.log("RESIZE CALLED", cmpIndex, targetIndex);
      calculateDistance();
    };

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cmpIndex, targetIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    const handleEmblaInit = () => {
      // console.log("Embla initialized, calculating distance...",ref.current[targetIndex]);
      calculateDistance();
    };

    const handleResizeOrScroll = () => {
      // console.log("Embla resize/scroll detected, recalculating distance...");
      calculateDistance();
    };
    emblaApi.on("reInit", handleEmblaInit).on("resize", handleResizeOrScroll).on("scroll", handleResizeOrScroll);
    return () => {
      emblaApi.off("init", handleEmblaInit).off("resize", handleResizeOrScroll).off("scroll", handleResizeOrScroll);
    };
  }, [cmpIndex, targetIndex, emblaApi]);

  return {
    margins,
    currentProgress,
    dottedLineWidth,
    ref,
    targetRef,
    calculateDistance,
    cmpRef,
    cmpMarginRight,
    targetIndex,
  };
};

// const resizeObserver = new ResizeObserver((entries) => {
//   requestAnimationFrame(() => {
//     for (const entry of entries) {
//       handleResize();
//     }
//   });
// });

// const progress_containers = document.querySelectorAll(".progress_container");
// progress_containers.forEach((progress_container) => {
//   resizeObserver.observe(progress_container);
// });

// progress_containers.forEach((progress_container) => {
//   resizeObserver.unobserve(progress_container);
// });
