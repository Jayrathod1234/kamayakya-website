import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { getMixPanelClient } from "@/externals/mixpanel";
import axios from "axios";
import { NEWSLETTER_SUBSCRIBE_URL } from "@/pages/api/URLs";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../button";
import { ButtonSize, ButtonVariant } from "../button/button";
import { LinkedinBtn } from "./linkedin-btn";
import { LoaderCircle } from "lucide-react";

export function Newsletter({page="Pricing_Page"}) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleNewsLetterEmailSubmit = async () => {
    try {
      setLoading(true);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isEmail) {
        setEmailError(true);
        return;
      }
      const response = await axios.post(
        NEWSLETTER_SUBSCRIBE_URL,
        { email },
        // {
        //   headers: {
        //     Authorization: "token " + localStorage.getItem("refresh"),
        //   },
        // }
      );
      console.log(response.data);
      if (response.data) {
        
        toast({
          description: "Subscribed to newsletter successfully",
        });

        const mp = getMixPanelClient();
        mp.track("newsletter_subscribed", {
          page:page,
          pagegroup: "newsletter_subscribed",
          email: email,
        });
      }
    } catch (e: any) {
      console.log(e);
      toast({
        startIcon: (
          <div className=" h-full w-full">
            <Image src={"/warn_icon.svg"} alt="warn" height={16} width={16} />
          </div>
        ),
        description: e?.response?.data?.email[0] || e?.message || "Something went wrong",
      });
    } finally {
      setEmail("")
      setLoading(false);
    }
  };

  return (
    <div className=" relative flex flex-col justify-center items-center py-[60px] text-white before:content-[' '] before:absolute before:top-0 before:left-0 before:-z-[10] before:h-full before:w-full before:bg-[url('/news_letter_bg.png')] before:opacity-80 bg-gray-950 text-center  md:w-[min(1280px,calc(100%-32px))] md:min-w-[328px] md:max-h-[639px] md:mx-auto  md:rounded-[40px] relative z-30 ">
      <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto md:w-[720px] md:mt-[109px] md:mb-[126px]">
        <h3 className=" text-xl font-bold md:text-display-md m-0">
          Guess who doesn’t like to <br/> “Spam” ? <span className=" text-[#32D583]">Us.</span>
        </h3>
        <div className="block h-[2px] w-16 bg-brand-400 mx-auto mt-[26px] md:hidden"></div>
        <div className=" md:py-11 md:px-20 md:border rounded-[30px] md:border-[rgba(255,255,255,.25)] mt-[26px] md:mt-12 md:bg-[rgba(12,17,29,0.70)]">
        <p className=" text-center font-semibold text-lg mb-5 md:mb-9">Subscribe to our Newsletter</p>
        <div>
          {/* EMAIL INPUT */}
          <div
            className={` flex items-center bg-white p-2 pl-3 rounded-[6px] gap-[8px] mt-3 w-full max-h-[52px] max-w-[350px] md:max-w-[566px] mx-auto ${
              emailError ? " border-[2px] border-[crimson_red] " : ""
            }`}
          >
            {/* <div className=" ml-[6px]"> */}
            <Image src={"/icons/mail.svg"} alt="mail" height={20} width={20} />
            {/* </div> */}
            <Input
              value={email}
              onChange={(e) => {
                if (emailError) setEmailError(false);
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
              className="  px-0 py-0 text-md outline-none border-0 focus:outline-none focus:border-0 focus:ring-0 bg-transparent ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
            />
            <Button
              loading={loading}
              customStyle=" gap-[6px] !py-2 md:py-[auto]"
              onClick={handleNewsLetterEmailSubmit}
              variant={ButtonVariant.primary}
              // size={ButtonSize.lg}
            >
              <p className=" text-sm font-medium">Subscribe</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8.88897 3.33301L13.3334 7.99967M13.3334 7.99967L8.88897 12.6663M13.3334 7.99967L2.66675 7.99967"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </div>
          {emailError ? (
            <p className=" text-sm text-[rgba(240,68,56,1)] mt-[6px] text-left max-w-[350px] md:max-w-[566px] mx-auto">Enter valid email</p>
          ) : null}
          <p className=" text-sm text-gray-200 mt-5 md:mt-[30px]">We do not share your details with third parties.</p>
        </div>
        </div>
        <div className=" mt-[46px] md:mt-9 flex flex-col items-center gap-3 md:flex-row md:gap-x-3 md:justify-center">
          <p className=" text-2xs md:text-md whitespace-nowrap">Or,get monthly dose of market gyaan on :</p>
          <LinkedinBtn page={page} />
        </div>
        {/* <p className=" p-2 my-3 md:my-8 text-gray-600">OR</p> */}
      
      </div>
    </div>
  );
}
