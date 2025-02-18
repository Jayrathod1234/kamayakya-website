import React, { useEffect, useState } from "react";
import { Navbar } from "@/components.v2/navbar";
import { getQuarterlyUpdates } from "../../api/vip-updates/index";
import { Button } from "@/components.v2/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];

export default function Page() {
  const [quarterlyUpdates, setQuarterlyUpdates] = useState([]);
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

      setQuarterlyUpdates(formattedData);
    } catch (e) {
      console.error("Error fetching quarterly updates:", e);
    }
  };

  useEffect(() => {
    fetchQuarterlyUpdates();
  }, []);

  return (
    <main className="open_sans bg-red-500">
      <Navbar />
      <section className="mt-8 sm:mt-[55px] main-container">
        <h2 className="text-display-xs sm:text-display-md font-bold text-center">
          Quarterly Updates
        </h2>

        <div className="mt-12 grid grid-cols-5 place-items-center bg-white rounded-[20px] border border-gray-200">
          {/* Empty cell for alignment */}
          <div className=" border-b border-b-gray-200"></div>

          {/* Year headers */}
          {years.map((year) => (
            <div key={year} className="text-center font-bold text-md py-5">
              FY{year}
            </div>
          ))}

          {/* Navigation buttons */}
          <div className="flex justify-end space-x-2 py-5">
            <Button size="icon">
              <ChevronLeft />
            </Button>
            <Button size="icon">
              <ChevronRight />
            </Button>
          </div>

          {/* Quarterly Data */}
          {QUARTERS.map((quarter) => (
            <React.Fragment key={quarter}>
              <div className="font-semibold">{quarter}</div>

              {years.map((year) => {
                const quarterYearData = quarterlyUpdates.find(
                  (item) => item[`${quarter}_${year}`]
                )?.[`${quarter}_${year}`];

                return (
                  <div key={year}>
                    {quarterYearData && quarterYearData.length > 0 ? (
                      quarterYearData.map((entry, index) => (
                        <a
                          key={index}
                          href={entry.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline block"
                        >
                          View PDF
                        </a>
                      ))
                    ) : (
                      <div className="text-gray-500">NA</div>
                    )}
                  </div>
                );
              })}
              <div></div>
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
  );
}
