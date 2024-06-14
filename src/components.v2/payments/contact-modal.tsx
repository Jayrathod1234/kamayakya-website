import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components.v2/ui/dialog";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Image from "next/image";
import { Button } from "../button";
import { ButtonSize, ButtonVariant } from "../button/button";
import { getMixPanelClient } from "@/externals/mixpanel";
import { ContactOptionCard } from "./contact-modal-cards";
import { Send } from "lucide-react";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { CONTACT_URL } from "@/pages/api/URLs";
import { ContactForm } from "./contact-form";
import { ContactModalHead } from "./contact-modal-head";
import { TChildren } from "@/types";

export function ContactModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        asChild
      >
        {trigger}
      </DialogTrigger>
      <DialogContent className=" contact__modal p-5 md:p-6 pb-[21px]  max-w-[1200px]  h-[100dvh] md:max-h-[773px] overflow-y-scroll pricing">
        {/* <div className=" h-full p-0"> */}
        <div className=" grid grid-cols-2 max-md:grid-cols-1 grid-rows-[auto_auto] max-md:grid-rows-[auto] md:gap-6 max-w-[1152px]  ">
          <div className="contact__modal-left hidden md:block md:col-start-1 md:row-span-2 rounded-xl shadow-2xs p-4 overflow-y-scroll  md:pb-8 ">
            <ContactModalHead />
            <div className=" h-[1px] my-6 w-full bg-gray-100"></div>
            <div className=" flex flex-col gap-y-6 max-md:hidden">
              <ContactForm closeModal={closeModal} />
            </div>
          </div>
          <div className="mascot__container col-start-2 row-start-1  max-md:col-start-1 rounded-xl">
            <Image
              priority={true}
              className=" h-full w-full object-cover"
              height={390}
              width={528}
              src={"/pricing/modal-mascot.webp"}
              alt="kamayakya-mascot"
            />
          </div>
          <div className="contacts__container col-start-2 row-start-2 md:overflow-hidden bg-white md:shadow-2xs h-full max-md:py-5 rounded-xl max-md:row-start-3 max-md:col-start-1">
            <div className=" hidden max-md:block text-center mb-5">
              <ContactModalHead />
            </div>
            <div className=" mt-[22px] md:p-4 max-md:shadow-none  grid lg:grid-cols-2 grid-row-[auto_auto_auto] gap-4 md:grid-cols-1">
              <ContactOptionCard
                value={"+91 9175939641"}
                label={"Mobile No"}
                icon={
                  <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="44" height="44" rx="8" fill="#E7F8F8" />
                    <path
                      d="M32.3716 20.5203C32.5194 19.5284 32.4699 18.517 32.2258 17.5442C31.8928 16.2149 31.2041 15.0013 30.2337 14.0337C29.2662 13.0631 28.0526 12.3742 26.7232 12.041C25.7504 11.7973 24.739 11.7479 23.7471 11.8958M27.9442 20.0519C28.0256 19.5105 27.9788 18.9575 27.8073 18.4375C27.6359 17.9175 27.3447 17.4451 26.9572 17.0583C26.5704 16.6707 26.0979 16.3795 25.5779 16.2081C25.0579 16.0366 24.5049 15.9898 23.9635 16.0713"
                      stroke="#108973"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.386 13.6299C16.5941 13.63 16.7983 13.6858 16.9776 13.7914C17.1569 13.897 17.3047 14.0487 17.4056 14.2307L18.833 16.8009C18.9251 16.9667 18.9754 17.1526 18.9795 17.3422C18.9835 17.5319 18.9413 17.7197 18.8564 17.8894L17.4815 20.6386C17.4815 20.6386 17.8799 22.6873 19.547 24.3545C21.2148 26.0216 23.2565 26.4136 23.2565 26.4136L26.0051 25.0387C26.1749 24.9538 26.3628 24.9116 26.5526 24.9158C26.7424 24.9199 26.9283 24.9703 27.0942 25.0626L29.6725 26.4959C29.8542 26.597 30.0055 26.7449 30.1109 26.9242C30.2162 27.1035 30.2717 27.3076 30.2716 27.5155V30.4754C30.2716 31.9821 28.8716 33.0712 27.4436 32.5888C24.5106 31.5995 19.9583 29.7147 17.072 26.8295C14.1868 23.9438 12.3026 19.3909 11.3127 16.4579C10.8309 15.0299 11.9194 13.6299 13.4267 13.6299H16.386Z"
                      fill="#108973"
                    />
                  </svg>
                }
                className={" col-start-1 row-start-1 "}
              />
              <ContactOptionCard
                label={"WhatsApp"}
                value={"+91 9175939641"}
                icon={
                  <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="44" height="44" rx="8" fill="#E7F8F8" />
                    <g clip-path="url(#clip0_4999_498511)">
                      <path
                        d="M8.60091 22.3327C8.60025 24.6852 9.2196 26.9823 10.3973 29.007L8.48828 35.9247L15.6212 34.0685C17.5941 35.1344 19.8046 35.693 22.0508 35.6931H22.0567C29.4721 35.6931 35.5084 29.7043 35.5116 22.3432C35.513 18.7762 34.1147 15.4221 31.5741 12.8986C29.034 10.3754 25.6557 8.98503 22.0562 8.9834C14.6399 8.9834 8.60408 14.9719 8.60102 22.3327"
                        fill="url(#paint0_linear_4999_498511)"
                      />
                      <path
                        d="M8.12103 22.3281C8.12026 24.7653 8.7618 27.1445 9.98146 29.2417L8.00403 36.4074L15.3927 34.4846C17.4286 35.5863 19.7207 36.1671 22.0531 36.168H22.0591C29.7405 36.168 35.9936 29.9637 35.9969 22.3392C35.9982 18.644 34.5496 15.1693 31.9183 12.5554C29.2866 9.94189 25.7875 8.50152 22.0591 8.5C14.3763 8.5 8.12409 14.7034 8.12103 22.3281ZM12.5213 28.8805L12.2454 28.4459C11.0857 26.6157 10.4735 24.5007 10.4744 22.329C10.4768 15.9915 15.6734 10.8355 22.0635 10.8355C25.158 10.8368 28.0662 12.0341 30.2536 14.2064C32.4408 16.3789 33.6444 19.2668 33.6437 22.3383C33.6408 28.6757 28.4441 33.8324 22.0591 33.8324H22.0545C19.9755 33.8313 17.9365 33.2772 16.1583 32.23L15.7351 31.9809L11.3505 33.1219L12.5213 28.8805Z"
                        fill="url(#paint1_linear_4999_498511)"
                      />
                      <path
                        d="M18.5751 16.5467C18.3142 15.9712 18.0396 15.9595 17.7915 15.9494C17.5883 15.9408 17.3561 15.9414 17.124 15.9414C16.8918 15.9414 16.5144 16.0281 16.1954 16.3738C15.8761 16.7198 14.9764 17.5559 14.9764 19.2564C14.9764 20.957 16.2244 22.6004 16.3984 22.8313C16.5726 23.0617 18.8076 26.663 22.3474 28.0485C25.2893 29.1998 25.888 28.9709 26.5265 28.9131C27.165 28.8556 28.587 28.0772 28.8771 27.2701C29.1674 26.4631 29.1674 25.7714 29.0804 25.6268C28.9933 25.4828 28.7611 25.3963 28.4128 25.2235C28.0644 25.0506 26.3523 24.2144 26.0331 24.0991C25.7138 23.9838 25.4816 23.9263 25.2494 24.2724C25.0171 24.6179 24.3502 25.3963 24.147 25.6268C23.9439 25.8579 23.7406 25.8866 23.3925 25.7137C23.044 25.5403 21.9224 25.1758 20.5917 23.9984C19.5564 23.0822 18.8575 21.9508 18.6543 21.6047C18.4512 21.2591 18.6326 21.0718 18.8072 20.8996C18.9637 20.7447 19.1556 20.496 19.3299 20.2942C19.5035 20.0924 19.5615 19.9483 19.6776 19.7178C19.7938 19.4871 19.7357 19.2852 19.6487 19.1124C19.5615 18.9395 18.8847 17.2301 18.5751 16.5467Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_4999_498511"
                        x1="1359.65"
                        y1="2703.12"
                        x2="1359.65"
                        y2="8.9834"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#1FAF38" />
                        <stop offset="1" stop-color="#60D669" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_4999_498511"
                        x1="1407.65"
                        y1="2799.24"
                        x2="1407.65"
                        y2="8.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F9F9F9" />
                        <stop offset="1" stop-color="white" />
                      </linearGradient>
                      <clipPath id="clip0_4999_498511">
                        <rect width="28" height="28" fill="white" transform="translate(8 8.5)" />
                      </clipPath>
                    </defs>
                  </svg>
                }
                className={" lg:col-start-2 lg:row-start-1 md:col-start-1 md:row-start-2"}
              />
              <ContactOptionCard
                value={"contact@kamayakya.com"}
                label={"Email"}
                icon={
                  <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="44" height="44" rx="8" fill="#E7F8F8" />
                    <path
                      d="M12.6667 13.167H31.3334C32.6167 13.167 33.6667 14.217 33.6667 15.5003V29.5003C33.6667 30.7837 32.6167 31.8337 31.3334 31.8337H12.6667C11.3834 31.8337 10.3334 30.7837 10.3334 29.5003V15.5003C10.3334 14.217 11.3834 13.167 12.6667 13.167Z"
                      fill="#108973"
                    />
                    <path d="M33.6667 15.5003L22 23.667L10.3334 15.5003" fill="#108973" />
                    <path
                      d="M33.6667 15.5003C33.6667 14.217 32.6167 13.167 31.3334 13.167H12.6667C11.3834 13.167 10.3334 14.217 10.3334 15.5003M33.6667 15.5003V29.5003C33.6667 30.7837 32.6167 31.8337 31.3334 31.8337H12.6667C11.3834 31.8337 10.3334 30.7837 10.3334 29.5003V15.5003M33.6667 15.5003L22 23.667L10.3334 15.5003"
                      stroke="#E7F8F8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                }
                className={" lg:col-span-2 lg:row-start-2 md:col-start-1 md:row-start-3 md:col-span-full"}
              />
              <p className=" lg:row-start-3 lg:col-span-2 text-gray-700 text-sm md:row-start-4 md:col-span-1 text-center">
                Call us during business hours, Monday to Friday, between 10am and 7pm IST, for assistance.
              </p>
            </div>
          </div>
          <div className=" border-t-[1px] border-t-gray-150 md:border-0 hidden py-5 max-md:grid max-md:col-start-1 max-md:row-start-5 max-md:row-span-2 h-fit md:p-5">
            <div className=" flex flex-col gap-y-6 ">
              <ContactForm closeModal={closeModal} />
            </div>
          </div>
        </div>
        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
}
