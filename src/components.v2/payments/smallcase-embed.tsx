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

  return (
    <div
      className={`relative overflow-hidden width-full max-[${width}]:pt-[120%] pt-[60%]`}
      // className="sc-embed"
      // data-smallcase="true"
      // data-cta="view"
      // data-cardsize="small"
      // data-viewoncreatorplatform="true"
      // data-scid="KAKYMO_0001"
      // style={{ maxWidth: '100%', minHeight: '300px', display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}
    >
      <iframe
        className={`absolute top-0 left-0 right-0 bottom-0 w-full h-full max-[${width}]:block hidden`}
        src="https://www.smallcase.com/embed/smallcase?scid=KAKYMO_0001&cardsize=small&primaryCta=view&viewOnCreatorPlatform=true"
      ></iframe>

      <iframe
        className={`absolute top-0 left-0 right-0 bottom-0 w-full h-full hidden min-[${width}]:block`}
        src="https://www.smallcase.com/embed/smallcase?scid=KAKYMO_0001&cardsize=big&primaryCta=view&viewOnCreatorPlatform=true"
      ></iframe>
    </div>
  );
};

export default SmallcaseEmbed;
