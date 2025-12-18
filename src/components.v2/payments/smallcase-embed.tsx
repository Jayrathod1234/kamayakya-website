import React, { useEffect } from "react";

export const SmallcaseEmbed = () => {
  // useEffect(() => {
  //   // Create script element
  //   const script = document.createElement('script');
  //   script.src = "https://www.smallcase.com/embed/assets/embed.js";
  //   script.async = true;

  //   // Append script to body
  //   document.body.appendChild(script);

  //   // Clean up by removing the script when the component unmounts
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  const width = "500px";
  // pb-[80%] sm:pb-[60%] md:pb-[58%] slg:pb-[58%]

  return (
    <div
      className={`relative w-full h-[378px] z-10 flex justify-center items-center`}
      // max-[${width}]:pt-[120%]
      // className="sc-embed"
      // data-smallcase="true"
      // data-cta="view"
      // data-cardsize="small"
      // data-viewoncreatorplatform="true"
      // data-scid="KAKYMO_0001"
      // style={{ maxWidth: '100%', minHeight: '300px', display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}
    >
      <iframe
        className={` rounded-lg block phone:hidden sm:hidden md:block lg:hidden w-[300px] max-w-[300px] max-h-[378px] h-[378px]`}
        src="https://www.smallcase.com/embed/smallcase?scid=KAKYMO_0001&cardsize=small&primaryCta=view&viewOnCreatorPlatform=true"
      ></iframe>
      <iframe
        className={` rounded-lg hidden phone:block md:hidden lg:block w-full max-w-[500px] max-h-[300px] h-[300px]`}
        src="https://www.smallcase.com/embed/smallcase?scid=KAKYMO_0001&cardsize=big&primaryCta=view&viewOnCreatorPlatform=true"
      ></iframe>
    </div>
  );
};

export const SmallcaseEmbed2 = () => {
  // useEffect(() => {
  //   // Create script element
  //   const script = document.createElement('script');
  //   script.src = "https://www.smallcase.com/embed/assets/embed.js";
  //   script.async = true;

  //   // Append script to body
  //   document.body.appendChild(script);

  //   // Clean up by removing the script when the component unmounts
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  const width = "500px";
  // pb-[80%] sm:pb-[60%] md:pb-[58%] slg:pb-[58%]

  return (
    <div
      className={`relative w-full h-[378px] z-10 flex justify-center items-center`}
      // max-[${width}]:pt-[120%]
      // className="sc-embed"
      // data-smallcase="true"
      // data-cta="view"
      // data-cardsize="small"
      // data-viewoncreatorplatform="true"
      // data-scid="KAKYMO_0001"
      // style={{ maxWidth: '100%', minHeight: '300px', display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}
    >
      <iframe
        className={` rounded-lg block phone:hidden sm:hidden md:block lg:hidden w-[300px] max-w-[300px] max-h-[378px] h-[378px]`}
        src="https://www.smallcase.com/embed/smallcase?scid=KAKYFMM_0001&cardsize=small&primaryCta=view"
      ></iframe>
      <iframe
        className={` rounded-lg hidden phone:block md:hidden lg:block w-full max-w-[500px] max-h-[300px] h-[300px]`}
        src="https://www.smallcase.com/embed/smallcase?scid=KAKYFMM_0001&cardsize=big&primaryCta=view"
      ></iframe>
    </div>
  );
};

export const SmallcaseEmbed3 = () => {
  // useEffect(() => {
  //   // Create script element
  //   const script = document.createElement('script');
  //   script.src = "https://www.smallcase.com/embed/assets/embed.js";
  //   script.async = true;

  //   // Append script to body
  //   document.body.appendChild(script);

  //   // Clean up by removing the script when the component unmounts
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  const width = "500px";
  // pb-[80%] sm:pb-[60%] md:pb-[58%] slg:pb-[58%]

  return (
    <div
      className={`relative w-full h-[378px] z-10 flex justify-center items-center`}
      // max-[${width}]:pt-[120%]
      // className="sc-embed"
      // data-smallcase="true"
      // data-cta="view"
      // data-cardsize="small"
      // data-viewoncreatorplatform="true"
      // data-scid="KAKYMO_0001"
      // style={{ maxWidth: '100%', minHeight: '300px', display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}
    >
      <iframe
        className={` rounded-lg block phone:hidden sm:hidden md:block lg:hidden w-[300px] max-w-[300px] max-h-[378px] h-[378px]`}
        src="https://www.smallcase.com/embed/smallcase?scid=KAKYNM_0001_0001&cardsize=small&primaryCta=view"
      ></iframe>
      <iframe
        className={` rounded-lg hidden phone:block md:hidden lg:block w-full max-w-[500px] max-h-[300px] h-[300px]`}
        src="https://www.smallcase.com/embed/smallcase?scid=KAKYNM_0001&cardsize=big&primaryCta=view"
      ></iframe>
    </div>
  );
};

export default SmallcaseEmbed;
