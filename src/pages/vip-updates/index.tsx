import React, { useEffect, useState } from "react";
import { Navbar } from "@/components.v2/navbar";
import { getQuarterlyUpdates } from "../../api/vip-updates/index";
import { Button } from "@/components.v2/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PDF_ICON from '../../../public/assets/pdf.svg'
import VIDEO_ICON from '../../../public/assets/play.svg'
import { Footer } from "@/components.v2/footer";
import { useQuery } from "@tanstack/react-query";
const QUARTERS = ["Q4", "Q3", "Q2", "Q1"];

export default function Page() {
  const {
    data: quarterlyUpdates = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quarterlyUpdates"],
    queryFn: getQuarterlyUpdates,
    select:(responseData)=>{
      const data = responseData?.data || {};

      const yearsArray = Object.keys(data);
      setYears(yearsArray.reverse());

      const formattedData = QUARTERS.flatMap((quarter) =>
        yearsArray.map((year) => ({
          [`${quarter}_${year}`]: Object.values(data[year] || []).filter(
            (item) => item?.quarter === quarter
          ),
        }))
      );
      return formattedData
    }
  });
  // const [quarterlyUpdates, setQuarterlyUpdates] = useState([]);
  const [years, setYears] = useState([]);

  const fetchQuarterlyUpdates = async () => {
    try {
      const res = await getQuarterlyUpdates();
      const data = res?.data || {};

      const yearsArray = Object.keys(data);
      setYears(yearsArray);

      const formattedData = QUARTERS.flatMap((quarter) =>
        yearsArray.map((year) => ({
          [`${quarter}_${year}`]: Object.values(data[year] || []).filter(
            (item) => item?.quarter === quarter
          ),
        }))
      );

      // setQuarterlyUpdates(formattedData);
    } catch (e) {
      console.error("Error fetching quarterly updates:", e);
    }
  };

  useEffect(() => {
    // fetchQuarterlyUpdates();
  }, []);

  return (
    <main className="open_sans bg-gray-50">
      <Navbar />
      <section className="mt-8 sm:mt-[55px] main-container">
        <h2 className="text-display-xs sm:text-display-md font-bold text-center">
          Quarterly Updates
        </h2>

        <div className="mt-12 grid grid-cols-5 items-center place-content-center bg-white rounded-[20px] border border-gray-200">
          {/* Empty cell for alignment */}
          <div className="py-3 border-b border-b-gray-200 w-full text-md">&nbsp;</div>

          {/* Year headers */}
          {years.map((year) => (
            <div key={year} className="text-center font-bold text-md py-3  border-b border-b-gray-200 w-full">
              FY{year}
            </div>
          ))}

          {/* Navigation buttons */}
          <div className="flex items-center justify-center space-x-5 h-full border-b border-b-gray-200 w-full">
            <Button className=" h-7 w-7 bg-[#0C111D] rounded-full" size="icon">
              <ChevronLeft size={18} />
            </Button>
            <Button className=" h-7 w-7 bg-[#0C111D] rounded-full" size="icon">
              <ChevronRight size={18} />
            </Button>
          </div>

          {/* Quarterly Data */}
          {QUARTERS.map((quarter) => (
            <React.Fragment key={quarter}>
              <div className={`font-semibold py-9 ${quarter !== "Q1" ? " border-b border-b-gray-200 ": " "} w-full h-full text-center flex items-center justify-center`}>{quarter}</div>

              {years.map((year) => {
                const quarterYearData = quarterlyUpdates.find(
                  (item) => item[`${quarter}_${year}`]
                )?.[`${quarter}_${year}`];

                return (
                  <div className={` py-9 ${quarter !== "Q1" ? " border-b border-b-gray-200 ": " "} w-full h-full flex items-center justify-center flex-wrap gap-4`} key={year}>
                    {quarterYearData && quarterYearData.length > 0 ? (
                      quarterYearData.map((entry, index) => (
                        <>
                        <a
                          key={index}
                          href={entry.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-[10px] pl-[10px] pr-[6px] bg-white border border-gray-200 rounded-lg shadow-md flex items-center gap-x-2 text-inherit text-md text-gray-950"
                        >
                          <img height={20} width={20} src={'/assets/pdf.svg'} className=" object-cover"/>
                          <span>Presentation</span>
                          <ChevronRight color="#D0D5DD" size={16}/>
                        </a>
                        <a
                        key={index}
                        href={entry.video_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-[10px] pl-[10px] pr-[6px] bg-white border border-gray-200 rounded-lg shadow-md flex items-center gap-x-2 text-inherit text-md text-gray-950"
                      >
                        <img height={20} width={20} src={'/assets/play.svg'} className=" object-cover"/>
                        <span>Video</span>
                        <ChevronRight color="#D0D5DD" size={16}/>
                      </a>
                      </>
                      ))
                    ) : (
                      <div className="text-gray-500">NA</div>
                    )}
                  </div>
                );
              })}
              <div className={`py-9 ${quarter !== "Q1" ? " border-b border-b-gray-200 ": " "} w-full  h-full`}>&nbsp;</div>
            </React.Fragment>
          ))}
        </div>
      </section>
      <Footer/>
    </main>
  );
}
