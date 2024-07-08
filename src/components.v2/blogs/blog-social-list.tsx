import { TBlog } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { useToast } from "../ui/use-toast";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { getMixPanelClient } from "@/externals/mixpanel";

type TBlogSocial = {
  icon: string;
  url: string;
  url2?: string;
  size: number;
  social: string;
  eventName?: string;
};

export function BlogSocial({ icon, url, size, social, url2, eventName = "" }: TBlogSocial) {
  const [openTooltip, setOpenTooltip] = useState(false);
  const handleShare = () => {
    const mp = getMixPanelClient();
    mp.track(eventName, {
      page: "Blogs",
    });
    if (url2?.includes("whatsapp")) {
      window.open(url2);
    }
    window.open(url);
  };
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
        <TooltipTrigger
          onClick={(e) => {
            e.preventDefault();
            setOpenTooltip(true);
          }}
        >
          <button
            onClick={handleShare}
            className=" h-fit aspect-square border-[3px] border-transparent hover:border-gray-200 rounded-full"
          >
            <Image height={size} width={size} alt={social} src={icon} />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className=" bg-black text-white border-0 p-2 max-w-[425px]">
          <p className=" text-sm leading-6 md:w-full">{`Share on ${social} `}</p>
          <TooltipArrow className=" fill-black" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

type TCopyBlogLink = {
  url: string;
  size: number;
};

export function CopyBlogLink({ url, size }: TCopyBlogLink) {
  const [copied, setCopied] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const { toast } = useToast();

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
      <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
        <TooltipTrigger
          onClick={(e) => {
            e.preventDefault();
            setOpenTooltip(true);
          }}
        >
          <CopyToClipboard text={url} onCopy={handleCopy}>
            <div className=" border-transparent border-[3px] hover:border-gray-200 rounded-full">
              <button className={` ${height} aspect-square flex items-center justify-center bg-gray-150  rounded-full`}>
                <Link size={size} />
              </button>
            </div>
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

export function BlogSocialList({ blog, size = 36 }: { blog: TBlog; size?: number }) {
  const url = "https://legendary-madeleine-b03cd5.netlify.app/";

  return (
    <>
      <BlogSocial
        eventName="twittershare_clicked"
        size={size}
        url={`https://x.com/intent/post?text=${blog.title}+${url + blog.slug}`}
        icon={"/icons/X.svg"}
        social="X"
      />
      <BlogSocial
        eventName="Linkedinshare_clicked"
        size={size}
        url={`https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=${url + blog.slug}`}
        icon={"/blogs/linkedin.svg"}
        social="LinkedIn"
      />
      <BlogSocial
        eventName="facebookshare_clicked"
        social="Facebook"
        size={size}
        url={`https://www.facebook.com/share.php?u=${url + blog.slug}`}
        icon={"/blogs/fb.svg"}
      />
      <BlogSocial
        eventName="whatsappshare_clicked"
        social="Whatsapp"
        size={size}
        url2={`whatsapp://send?text=Look%20at%20this...%20%F0%9F%91%80%0A${url + blog.slug}`}
        url={`https://web.whatsapp.com/send?text=Look%20at%20this...%20%F0%9F%91%80%0A${url + blog.slug}`}
        icon={"/blogs/whatsapp.svg"}
      />
      <CopyBlogLink size={size === 36 ? 14 : 16} url={url + blog.slug} />
    </>
  );
}
