import { getMixPanelClient } from "@/externals/mixpanel";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BlogSocial } from "./blogs/blog-social-list";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTelegram, FaTelegramPlane } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

function FooterLinks({ href, label, event, ...rest }: Record<string, string>) {
  const handleEvent = () => {
    if (!event) return;
    const mp = getMixPanelClient();
    mp.track(event, {
      page: "Pricing_Page",
      pagegroup: "footer",
    });
  };
  return (
    <Link onClick={handleEvent} {...rest} href={href} className=" text-inherit hover:scale-[.98] hover:text-orange-500 duration-200 transition-all">
      <p className=" m-0 font-medium text-2xs md:text-md">{label}</p>
    </Link>
  );
}

function Socials({ href, imgSrc, alt, event }: Record<string, string>) {
  const handleEvent = () => {
    const mp = getMixPanelClient();
    mp.track(event, {
      page: "Pricing_Page",
      pagegroup: "footer",
    });
  };
  return (
    <Link onClick={handleEvent} target="_blank" href={href}>
      <Image className="h-8 aspect-square md:h-9 inline-block" src={imgSrc} alt={alt} width={40} height={40} priority />
    </Link>
  );
}

export function Footer() {
  
  return (
    // sm:mt-0 mt-[12%]
    <div className="bg-gradient-to-b from-[15%] from-[transparent] md:from-20% via-[#182E35] via-5% to-[#182E35] to-90%">
      <div className="h-[calc(286px+10%)] overflow-hidden w-full z-10">
      {/* 491 */}
        <Image alt="footer-bg" src={"/footer.webp"} width={1440} height={300} className=" w-full h-full" />
      </div>
      <div className=" bg-[#182E35]">
        <div className=" text-white  w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto flex flex-col gap-y-16 max-md:gap-y-[21px] pb-5 mt-[58px]">
          <div className=" flex justify-between max-md:flex-col max-md:gap-y-7">
            <div className=" flex items-center gap-x-[14.77px]">
              <Image
                className=" block "
                src="/KKLogo_footer.png"
                alt="KamayaKya-logo"
                width={209}
                height={40}
                priority
              />
              <p className="hidden md:block text-sm mt-2">Made in Bharat with ❤️</p>
            </div>
            <div className=" flex gap-x-[10px]">
              <BlogSocial
                className="h-8 aspect-square"
                eventName="facebook_clicked"
                property={{
                  page: "Pricing_Page",
                  pagegroup: "footer",
                }}
                social="kamayakya-fb"
                size={20}
                url={`https://www.facebook.com/KamayaKya`}
                // icon={"/social_media/facebook.svg"}
                hoverBgColor="#425893"
                hoverIcon="/social_media/facebook_w.svg"
                hoverBorderColor="#CCDAFF"
                disableTooltip={true}
                icon={<FaFacebookF size={20} className="text-gray-950 group-hover:text-white" />}
              />
              <BlogSocial
                className="h-8 aspect-square"
                disableTooltip={true}
                eventName="instagram_clicked"
                property={{
                  page: "Pricing_Page",
                  pagegroup: "footer",
                }}
                social="kamayakya-instagram"
                size={20}
                url={`https://www.instagram.com/kamayakyaofficial?igshid=YmMyMTA2M2Y%3D`}
                // icon={"/social_media/Instagram.svg"}
                hoverBgColor="#C13584"
                hoverIcon="/social_media/instagram_w.svg"
                hoverBorderColor="#FFDEF1"
                icon={<FaInstagram size={20} className="text-gray-950 group-hover:text-white" />}
              />
              <BlogSocial
                className="h-8 aspect-square"
                disableTooltip={true}
                eventName="twitter_clicked"
                property={{
                  page: "Pricing_Page",
                  pagegroup: "footer",
                }}
                size={20}
                url={`https://x.com/KamayaKyaIndia?s=20&t=LGnZi-Xq9J6m993h9E7BCw`}
                // icon={"/social_media/x.svg"}
                hoverIcon="/social_media/x_w.svg"
                hoverBorderColor="#D6DBE5"
                hoverBgColor="#1D2939"
                social="X"
                icon={<BsTwitterX size={16} className="text-gray-950 group-hover:text-white" />}
              />
              <BlogSocial
                className="h-8 aspect-square"
                disableTooltip={true}
                eventName="linkedin_clicked"
                property={{
                  page: "Pricing_Page",
                  pagegroup: "footer",
                }}
                size={20}
                url={`https://www.linkedin.com/company/kamayakya/`}
                // icon={"/social_media/linkedIn.svg"}
                hoverIcon="/social_media/linkedIn_w.svg"
                hoverBorderColor="#D6EAFF"
                social="LinkedIn"
                hoverBgColor="#0A66C2"
                icon={<FaLinkedinIn size={20} className="text-gray-950 group-hover:text-white" />}
              />
              <BlogSocial
                className="h-8 aspect-square"
                disableTooltip={true}
                eventName="telegram_clicked"
                social="telegram"
                size={20}
                url={`https://t.me/+5ZpxedvOoothOWZl`}
                // icon={"/social_media/telegram.svg"}
                hoverBgColor="#00B0F2"
                hoverIcon="/social_media/telegram_w.svg"
                hoverBorderColor="#D1F2FF"
                icon={<FaTelegramPlane size={20} className="text-gray-950 group-hover:text-white" />}
              />
              {/* <Socials
                event="facebook_clicked"
                href="https://www.facebook.com/KamayaKya"
                imgSrc="icons/Facebook.svg"
                alt="kamayakya-fb"
              />
              <Socials
                event="instagram_clicked"
                href="https://www.instagram.com/kamayakyaofficial?igshid=YmMyMTA2M2Y%3D"
                imgSrc="/icons/Instagram.svg"
                alt="kamayakya-instagram"
              />
              <Socials
                event="twitter_clicked"
                href="https://x.com/KamayaKyaIndia?s=20&t=LGnZi-Xq9J6m993h9E7BCw"
                imgSrc="/icons/Twitter.svg"
                alt="kamayakya-twitter"
              /> */}
              {/* <Socials
                event="linkedin_clicked"
                href="https://www.linkedin.com/company/kamayakya/"
                imgSrc="/icons/Linkedin.svg"
                alt="kamayakya-linkedin"
              /> */}
              {/* <Socials
                event="telegram_clicked"
                href="https://t.me/+5ZpxedvOoothOWZl"
                imgSrc="/icons/Telegram.svg"
                alt="kamayakya-telegram"
              /> */}
            </div>
          </div>
          <div className=" flex justify-between flex-wrap max-md:flex-col max-md:gap-y-[21px]">
            <div className=" flex items-start gap-x-[10px]">
              <svg
                className=" mt-[5px] aspect-square flex-shrink-0"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00001 1C6.54184 1.00172 5.1439 1.58174 4.11282 2.61281C3.08174 3.64389 2.50173 5.04184 2.50001 6.5C2.49826 7.69161 2.8875 8.85089 3.60801 9.8C3.60801 9.8 3.75801 9.9975 3.78251 10.026L8.00001 15L12.2195 10.0235C12.2415 9.997 12.392 9.8 12.392 9.8L12.3925 9.7985C13.1127 8.84981 13.5017 7.69107 13.5 6.5C13.4983 5.04184 12.9183 3.64389 11.8872 2.61281C10.8561 1.58174 9.45817 1.00172 8.00001 1ZM8.00001 8.5C7.60444 8.5 7.21776 8.3827 6.88887 8.16294C6.55997 7.94318 6.30362 7.63082 6.15225 7.26537C6.00087 6.89991 5.96126 6.49778 6.03844 6.10982C6.11561 5.72186 6.30609 5.36549 6.58579 5.08579C6.8655 4.80608 7.22186 4.6156 7.60983 4.53843C7.99779 4.46126 8.39992 4.50087 8.76537 4.65224C9.13082 4.80362 9.44318 5.05996 9.66294 5.38886C9.88271 5.71776 10 6.10444 10 6.5C9.99934 7.03023 9.78842 7.53855 9.41349 7.91348C9.03856 8.28841 8.53024 8.49934 8.00001 8.5Z"
                  fill="white"
                />
              </svg>

              <p className="text-sm md:text-md  max-w-[392px]">
                Flat No 6, New Nirmal Apartments, Balkrishna Sakharam Dhole Patil Rd, near Akshay Complex Road, Pune,
                Maharashtra 411001
              </p>
            </div>
            <div className=" flex gap-x-10 gap-y-[7px] md:gap-y-0 flex-col items-start md:items-end ">
              <div className=" flex items-center gap-x-[10px] md:gap-x-1 py-[7px]">
                <Phone fill="white" size={20} stroke="1" />

                <p className=" text-sm md:text-md md:font-semibold">+91 9175939641</p>
              </div>
              <div className=" flex items-center  gap-x-[10px] md:gap-x-1 py-[7px]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.668 3.33398H3.33464C2.41797 3.33398 1.6763 4.08398 1.6763 5.00065L1.66797 15.0007C1.66797 15.9173 2.41797 16.6673 3.33464 16.6673H16.668C17.5846 16.6673 18.3346 15.9173 18.3346 15.0007V5.00065C18.3346 4.08398 17.5846 3.33398 16.668 3.33398ZM16.3346 6.87565L10.443 10.559C10.1763 10.7257 9.8263 10.7257 9.55964 10.559L3.66797 6.87565C3.58441 6.82874 3.51123 6.76537 3.45288 6.68936C3.39452 6.61336 3.35219 6.5263 3.32845 6.43346C3.30471 6.34062 3.30005 6.24393 3.31477 6.14924C3.32948 6.05455 3.36325 5.96383 3.41404 5.88257C3.46482 5.80131 3.53157 5.7312 3.61024 5.67648C3.68891 5.62176 3.77786 5.58358 3.87172 5.56423C3.96557 5.54489 4.06237 5.54479 4.15626 5.56394C4.25016 5.58309 4.33919 5.6211 4.41797 5.67565L10.0013 9.16732L15.5846 5.67565C15.6634 5.6211 15.7524 5.58309 15.8463 5.56394C15.9402 5.54479 16.037 5.54489 16.1309 5.56423C16.2247 5.58358 16.3137 5.62176 16.3924 5.67648C16.471 5.7312 16.5378 5.80131 16.5886 5.88257C16.6394 5.96383 16.6731 6.05455 16.6878 6.14924C16.7026 6.24393 16.6979 6.34062 16.6742 6.43346C16.6504 6.5263 16.6081 6.61336 16.5497 6.68936C16.4914 6.76537 16.4182 6.82874 16.3346 6.87565Z"
                    fill="white"
                  />
                </svg>

                <p className="text-sm md:text-md md:font-semibold">contact@kamayakya.com</p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col pt-10 md:pt-12 gap-y-10  md:gap-y-[60px] border-t border-t-[rgba(228,231,236,0.4)]">
            {/* <div className=" flex gap-[10px] flex-wrap content-center items-center justify-between max-md:justify-center"> */}
            <div className=" grid grid-cols-[repeat(auto-fit,_minmax(149px,0.5fr))] gap-[10px] justify-between place-content-center max-phone:place-content-center">
              <div className=" max-phone:place-self-center place-self-start">
                <Link href="/Kamayakya-SEBI-License.pdf#toolbar=0&fitH=1" target="_blank">
                  <Image
                    className=" inline-block max-md:hidden h-full w-full max-w-[252px] "
                    width={252}
                    height={50}
                    alt="sebi"
                    src={"/sebi.png"}
                  />
                  <Image className=" hidden max-md:inline-block" width={132} height={26} alt="sebi" src={"/sebi.png"} />
                </Link>
              </div>
              <div className=" max-phone:place-self-center place-self-center">
                <Link href="/KMK_MSME_Registration.pdf#toolbar=0&fitH=1" target="_blank">
                  <Image
                    className=" inline-block max-md:hidden h-full w-full max-w-[252px] "
                    width={280.29}
                    height={55}
                    alt="udyam"
                    src="/udyam.png"
                  />
                  <Image className=" hidden max-md:inline-block" width={149} height={29} alt="udyam" src="/udyam.png" />
                </Link>
              </div>
              <div className=" max-phone:place-self-center place-self-end max-phone:col-span-full">
                <Link href="/KMK_Startup_India_Registration.pdf#toolbar=0&fitH=1" target="_blank">
                  <Image
                    className=" inline-flex max-md:hidden h-full w-full max-w-[252px]"
                    width={265.48}
                    height={55}
                    alt="startupindia"
                    src={"/startupindia.png"}
                  />

                  <Image
                    className=" hidden max-md:inline-block"
                    width={131}
                    height={27}
                    alt="startupindia"
                    src={"/startupindia.png"}
                  />
                </Link>
              </div>
            </div>
            <p className=" text-sm text-center">
              Investment in securities market are subject to market risks. Read all the related documents carefully
              before investing. Registration granted by SEBI and certification from NISM in no way guarantee performance
              of the intermediary or provide any assurance of returns to investors.<br/>BSE Enlistment No : 5583 <br/>
            </p>
            <div className=" flex flex-col gap-y-5 md:gap-y-12">
              <div className=" text-white flex flex-wrap gap-x-5 items-center justify-center flex-shrink-0 content-center whitespace-nowrap max-md:text-2xs ">
                <FooterLinks event="tnc_clicked" href="terms-conditions" label="Terms & Conditions" />
                <FooterLinks href="disclaimer" label="Disclosures" />
                <FooterLinks href="investor-charter" label="Investor Charter" />
                <FooterLinks event="complaints_clicked" href="complaints" label="Complaints" />
                <FooterLinks href="privacy-policy" label="Privacy Policy" />
                <FooterLinks
                  event="smartodr_clicked"
                  target="_blank"
                  href="https://smartodr.in/login"
                  label="Smart ODR"
                />
              </div>
              <p className=" text-sm  max-md:text-4xs opacity-[62%] text-center">
                KamayaKya Wealth Management Pvt. Ltd. (CIN - U74999PN2021PTC205529). All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
