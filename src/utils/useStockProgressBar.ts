import { useCallback, useEffect, useRef, useState } from "react";
import {EmblaCarouselType} from 'embla-carousel'
// function debounce(func:()=>void,delay=500){
//   let timer:number;
//   return function(event){
//     if(timer) clearTimeout(timer);
//     timer = setTimeout(func,delay,event);
//   };
// }

export const useStockProgressBar = (emblaApi?:EmblaCarouselType) => {
  const ref = useRef<Array<HTMLDivElement>>([]);
  const cmpRef = useRef<Array<HTMLDivElement>>([]);
  const targetRef = useRef<Array<HTMLDivElement>>([]);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const [currentProgress, setCurrentProgress] = useState(1);
  const [dottedLineWidth, setDottedLineWidth] = useState(0);

  const calculateDistance = useCallback(() => {
    if (ref.current?.length <= 0 && targetRef.current?.length <= 0 && cmpRef.current?.length <= 0) return;
    console.log(cmpRef.current)
    const entryDiv = ref.current[0];
    const cmpDiv = cmpRef.current[0];
    const targetDiv = targetRef.current[0];
    console.log(cmpDiv)
    if (!entryDiv || !cmpDiv || !targetDiv) return;
    // Get the bounding rectangles of both divs
    const entryRect = entryDiv.getBoundingClientRect();
    const cmpRect = cmpDiv.getBoundingClientRect();
    const targetRect = targetDiv.getBoundingClientRect();
    // Calculate the distance between the centers of entry point and cmp
    const distanceX = cmpRect.left + cmpRect.width / 1.2 - (entryRect.left + entryRect.width / 2);
    const distanceY = cmpRect.top + cmpRect.height / 2 - (entryRect.top + entryRect.height / 2);

    // Calculate the Euclidean distance
    const DistanceBtwEntryCmp = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    setCurrentProgress(DistanceBtwEntryCmp);

    // Calculate the distance between the centers of entry point and cmp
    const distanceX2 = targetRect.left + targetRect.width / 1.2 - (entryRect.left + entryRect.width / 2);
    const distanceY2 = targetRect.top + targetRect.height / 2 - (entryRect.top + entryRect.height / 2);

    // Calculate the Euclidean distance
    const DistanceBtwEntryTarget = Math.sqrt(distanceX2 * distanceX2 + distanceY2 * distanceY2);
    // console.log("DISTANCEBetweenEntryCmpDISTANCEBetweenEntryCmp",DISTANCEBetweenEntryCmp)
    setDottedLineWidth(DistanceBtwEntryTarget);
    setMargins(() => ({
      marginLeft: 0,
      marginRight: targetRef.current[0].offsetWidth / 2,
    }));
  }, []);

  useEffect(() => {
    // const debouncedCalculateDistance = () => , 2000);
    const handleResize = () => {
      calculateDistance();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
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
    console.log("EMBLA API", emblaApi);
    if (!emblaApi) return;
    emblaApi.on("reInit", handleResize).on("resize", handleResize).on("scroll", handleResize);

   
    return () => {
      // progress_containers.forEach((progress_container) => {
      //   resizeObserver.unobserve(progress_container);
      // });
      window.removeEventListener("resize", handleResize);
    };
  }, [ref.current?.length, targetRef.current?.length,cmpRef.current?.length, emblaApi]);

  return { margins, currentProgress, dottedLineWidth, ref, targetRef, calculateDistance,cmpRef };
};
