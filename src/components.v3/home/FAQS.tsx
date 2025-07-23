import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components.v2/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components.v2/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components.v2/ui/tabs";
import React from "react";

interface IFaqDropDownTrigger {
  value: string;
  label: string;
}

function FaqDropDown() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className=" hover:bg-brand-100 [&[data-state=open]]:rounded-b-none rounded-xl p-5 hover:no-underline  bg-white border border-white text-md md:text-xl text-gray-950 font-semibold">
          How to start with KamayaKya?
        </AccordionTrigger>
        <AccordionContent className=" max-md:text-sm p-5 pt-2  bg-white content rounded-b-xl">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function FaqDropDownTrigger({ value, label }: IFaqDropDownTrigger) {
  return (
    <CarouselItem className=" basis-auto">
      <TabsTrigger
        className=" data-[state=active]:bg-brand-700 bg-[#FFFFFF99] border border-[#0000001A] data-[state=active]:text-white text-gray-800 font-normal text-md data-[state=active]:font-semibold pl-3 pr-[14px] py-2 rounded-lg"
        value={value}
      >
        {label}
      </TabsTrigger>
    </CarouselItem>
  );
}

export default function FAQS() {
  return (
    <div className="  open_sans bg-[#F2F4F7] pt-[50px] pb-[100px]">
      <p className=" font-bold text-[#FF9E29] text-center max-md:text-sm">FAQS</p>
      <h2 className=" max-md:text-display-xs text-2xl font-bold mb-2 text-center text-gray-950">
        Everything you need to know about the <span className=" open_sans_italic">product and billing</span>!
      </h2>
      <Tabs defaultValue="getting_started" className="mt-10 main-container">
        <TabsList className="flex justify-center mb-6">
          <Carousel className=" w-full">
            <CarouselContent className=" justify-center">
              <FaqDropDownTrigger value="getting_started" label="Getting Started" />
              <FaqDropDownTrigger value="investment_approach" label="Our Investment Approach" />
              <FaqDropDownTrigger value="services_features" label="Services & Features" />
              <FaqDropDownTrigger value="billing_pricing" label="Billing & Pricing" />
              <FaqDropDownTrigger value="notifications_alerts" label="Notifications & Alerts" />
              
            </CarouselContent>
            <CarouselPrevious className=" [&>svg]:stroke-white hover:bg-gray-950 h-7 w-7 p-1 left-0 top-[40%] disabled:hidden bg-gray-950 border border-gray-900 shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
            <CarouselNext className="[&>svg]:stroke-white hover:bg-gray-950  h-7 w-7 p-1 right-[0] top-[40%] disabled:hidden bg-gray-950 border border-gray-900 shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
          </Carousel>
        </TabsList>
        <TabsContent value="getting_started">
          <FaqDropDown />
        </TabsContent>
        <TabsContent value="investment_approach">
          <FaqDropDown />
        </TabsContent>
        <TabsContent value="services_features">
          <FaqDropDown />
        </TabsContent>
        <TabsContent value="billing_pricing">
          <FaqDropDown />
        </TabsContent>
        <TabsContent value="services_features">
          <FaqDropDown />
        </TabsContent>
        <TabsContent value="notifications_alerts">
          <FaqDropDown />
        </TabsContent>
      </Tabs>
    </div>
  );
}
