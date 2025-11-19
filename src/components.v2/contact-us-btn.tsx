"use client";

import React, { useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { ContactModal } from "./payments/contact-modal";

export default function ContactUsBtn() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-8 lg:right-8 right-4 z-50">
        <ContactModal
          trigger={
            <button
              // onClick={() => setIsOpen(!isOpen)}
              className="relative lg:w-16 lg:h-16 w-12 h-12 rounded-full bg-teal-500 hover:bg-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            >
              {/* Pulse rings */}
              {/* <div className="absolute inset-0 rounded-full bg-teal-500 animate-pulse opacity-75"></div>
        <div className="absolute inset-0 rounded-full border-2 border-teal-300 animate-ping opacity-50"></div> */}

              {/* Icon */}
              <Phone className="lg:w-7 lg:h-7 w-5 h-5 relative z-10" />
            </button>
          }
        />
        {/* <ContactModal
          trigger={
            <button
              // onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-2 px-6 pl-4 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                isOpen ? "bg-teal-600 text-white" : "bg-teal-500 hover:bg-teal-600 text-white"
              }`}
            >
              <div className=" rounded-full bg-white  p-2">
                <Phone className="w-5 h-5 relative z-10 text-teal-500" />
              </div>

              <span>Contact Us</span>
            </button>
          }
        /> */}
      </div>
    </>
  );
}
