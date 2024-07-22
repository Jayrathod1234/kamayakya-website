import { TBlog } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { useToast } from "../ui/use-toast";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link, LinkIcon, Twitter, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { getMixPanelClient } from "@/externals/mixpanel";
import { CustomCSSProperties } from "@/types/shared";
import { classNames } from "@react-pdf-viewer/core";
import { useMediaQuery } from "@mui/material";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaWhatsapp } from "react-icons/fa";

type TBlogSocial = {
  icon: React.ReactNode;
  url: string;
  url2?: string;
  size: number;
  social: string;
  eventName?: string;
  hoverBorderColor: string;
  hoverBgColor: string;
  hoverIcon: string;
  property?: Record<string, string>;
  disableTooltip?: boolean;
  className?: string;
  imgClassName?: string;
};

export function BlogSocial({
  icon,
  url,
  size,
  social,
  url2,
  hoverBorderColor,
  hoverBgColor,
  hoverIcon,
  disableTooltip = false,
  eventName = "",
  className,
  imgClassName,
  property = {
    page: "Blogs",
  },
}: TBlogSocial) {
  const [openTooltip, setOpenTooltip] = useState(false);
  const isMobile = useMediaQuery("(max-width:1280px)");
  const btnStyle: CustomCSSProperties = {
    "--hover-bg": hoverBgColor,
    "--hover-border": hoverBorderColor,
  };
  // const imgStyle: CustomCSSProperties = {
  //   "--bg-img": `url(${icon})`,
  //   "--bg-hover-img": `url(${hoverIcon})`,
  // };
  const handleShare = () => {
    const mp = getMixPanelClient();
    mp.track(eventName, property);
    if (url2 && url2?.includes("whatsapp") && isMobile) {
      window.open(url2);
    }
    console.log("TRYING WHATSAPP");
    window.open(url);
  };
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={disableTooltip ? false : openTooltip} onOpenChange={disableTooltip ? undefined : setOpenTooltip}>
        <TooltipTrigger
        // onClick={(e) => {
        //   e.preventDefault();
        //   // setOpenTooltip(true);
        // }}
        >
          <button
            onClick={handleShare}
            style={btnStyle}
            className={` group md:h-9 md:w-9 aspect-square flex items-center justify-center transition-all duration-200 ease-out hover:ring-[3px] hover:ring-[var(--hover-border)] bg-gray-150 rounded-full hover:bg-[var(--hover-bg)] ${className}`}
          >
            {/* <Image className=" fill-white" height={size} width={size} alt={social} src={icon} /> */}
            {/* <div
              style={imgStyle}
              className={` h-5 w-5 flex relative transition-all duration-200 ease-out before:content-[''] before:absolute before:h-full before:w-full before:top-0 before:left-0 before:z-[1]  before:bg-cover before:bg-[image:var(--bg-img)] group-hover:before:bg-[image:var(--bg-hover-img)] ${imgClassName}`}
            ></div> */}
            {/*  */}
            {/*  */}
            {/* */}
            {icon}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className=" bg-black text-white border-0 p-2 max-w-[425px]">
          <p className=" text-sm leading-6 md:w-full">{`Share on  ${social} `}</p>
          <TooltipArrow className=" fill-black" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

type TCopyBlogLink = {
  url: string;
  size: number;
  disableTooltip?:boolean;
};

export function CopyBlogLink({ url, size, disableTooltip }: TCopyBlogLink) {
  const [copied, setCopied] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const { toast } = useToast();
  const btnStyle: CustomCSSProperties = {
    "--hover-bg": "#125B54",
    "--hover-border": "#CBF3F0",
  };
  const imgStyle: CustomCSSProperties = {
    "--bg-img": `url(/social_media/link.svg)`,
    "--bg-hover-img": `url(/social_media/link_w.svg)`,
  };

  const handleCopy = async () => {
    try {
      await navigator.share({
        title: "hey check this out",
        url,
      });
    } catch (e) {
      console.error(e);
    }
    toast({
      description: `Blog link copied to clipboard.`,
    });
    setCopied(true);
    let timeout = setTimeout(() => {
      setCopied(false);
      clearTimeout(timeout);
    }, 1000);
  };

  const height = size === 14 ? "h-9" : " h-11";

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={disableTooltip ? false : openTooltip} onOpenChange={disableTooltip ? undefined : setOpenTooltip}>
        <TooltipTrigger
          onClick={(e) => {
            // e.preventDefault();
            // setOpenTooltip(true);
          }}
        >
          <CopyToClipboard text={url} onCopy={handleCopy}>
            <button
              style={btnStyle}
              className={`transition-all duration-200 ease-out group h-11 md:h-9 aspect-square flex items-center justify-center hover:ring-[3px] hover:ring-[var(--hover-border)] bg-gray-150 rounded-full hover:bg-[var(--hover-bg)]`}
            >
              {/* <Image className=" fill-white" height={size} width={size} alt={social} src={icon} /> */}
              {/* <div
                style={imgStyle}
                className="transition-all duration-200 ease-out h-5 w-5 flex relative before:content-[''] before:absolute before:h-full before:w-full before:top-0 before:left-0 before:z-[1]  before:bg-cover before:bg-[image:var(--bg-img)] group-hover:before:bg-[image:var(--bg-hover-img)]"
              ></div> */}
              <LinkIcon size={size} className="text-gray-950 group-hover:text-white" />
            </button>
          </CopyToClipboard>
        </TooltipTrigger>
        <TooltipContent side="right" className=" bg-black text-white border-0 p-2 max-w-[425px]">
          <p className=" text-sm leading-6 md:w-full">Copy blog link</p>
          <TooltipArrow className=" fill-black" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function BlogSocialList({ blog, size = 20, disabled }: { blog: TBlog; size?: number; disabled?: boolean }) {
  const url = process.env.NEXT_PUBLIC_CLIENT_URL;

  return (
    <>
      <BlogSocial
        disableTooltip={disabled}
        className=" h-11 w-11"
        eventName="twittershare_clicked"
        size={size}
        url={`https://x.com/intent/post?text=${blog.title}+${url + blog.slug}`}
        // icon={"/social_media/x.svg"}
        hoverIcon="/social_media/x_w.svg"
        hoverBorderColor="#D6DBE5"
        hoverBgColor="#1D2939"
        social="X"
        icon={<BsTwitterX size={16} className=" text-gray-950 group-hover:text-white" />}
      />
      <BlogSocial
        disableTooltip={disabled}
        className=" h-11 w-11"
        eventName="Linkedinshare_clicked"
        size={size}
        url={`https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=${url + blog.slug}`}
        // icon={"/social_media/linkedIn.svg"}
        hoverIcon="/social_media/linkedIn_w.svg"
        hoverBorderColor="#D6EAFF"
        social="LinkedIn"
        hoverBgColor="#0A66C2"
        icon={<FaLinkedinIn size={size} className=" text-gray-950 group-hover:text-white" />}
      />
      <BlogSocial
        disableTooltip={disabled}
        className=" h-11 w-11"
        eventName="facebookshare_clicked"
        social="Facebook"
        size={size}
        url={`https://www.facebook.com/share.php?u=${url + blog.slug}`}
        // icon={"/social_media/facebook.svg"}
        hoverBgColor="#425893"
        hoverIcon="/social_media/facebook_w.svg"
        hoverBorderColor="#CCDAFF"
        icon={<FaFacebookF size={size} className=" text-gray-950 group-hover:text-white" />}
      />
      <BlogSocial
        disableTooltip={disabled}
        className=" h-11 w-11"
        eventName="whatsappshare_clicked"
        social="Whatsapp"
        size={size}
        url2={`whatsapp://send?text=Look%20at%20this...%20%F0%9F%91%80%0A${url + blog.slug}`}
        url={`https://web.whatsapp.com/send?text=Look%20at%20this...%20%F0%9F%91%80%0A${url + blog.slug}`}
        // icon={"/social_media/whatsApp.svg"}
        hoverBgColor="#65D072"
        hoverIcon="/social_media/whatsApp_w.svg"
        hoverBorderColor="#D9F0DB"
        icon={<FaWhatsapp size={size} className=" text-gray-950 group-hover:text-white" />}
      />
      <CopyBlogLink disableTooltip={disabled} size={size === 36 ? 14 : 16} url={url + blog.slug} />
    </>
  );
}
