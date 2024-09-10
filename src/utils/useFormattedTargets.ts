import { TTarget } from "@/types/shared";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";

export const useFormattedTargets = ({
  stock_targets,
  entry_date,
  live_price,
  entry_price,
}: {
  stock_targets: any;
  entry_date: string;
  live_price: number;
  entry_price: number;
}) => {
  const [targets, setTargets] = useState<TTarget[]>([]);
  const [targetIndex, setTargetIndex] = useState(0);
  const [cmpIndex, setCmpIndex] = useState(0);
  useEffect(() => {
    // Sort and map the stock targets
    let updatedTargets = [...stock_targets]
      .sort((a, b) => a.target_price - b.target_price)
      .map((item: any, index: any) => ({
        label: `Target ${index + 1}`,
        date: format(new Date(item.created), "dd MMM yyyy"),
        price: item.target_price,
        status: item.target_met ? "Completed" : "Active",
      }));

    // Add CMP and Entry Price targets
    updatedTargets.push(
      { label: "CMP", price: live_price, date: format(new Date(), "dd MMM yyyy"), status: "Completed" },
      {
        label: "Entry Price",
        price: entry_price,
        date: format(new Date(entry_date), "dd MMM yyyy"),
        status: "Completed",
      }
    );

    // Set the sorted targets
    updatedTargets = updatedTargets.sort((a, b) => a.price - b.price);
    setTargets(updatedTargets);

    if (updatedTargets.length > 0) {
      // Find the index of CMP
      const cmpIndex = updatedTargets.findIndex((target) => target.label === "CMP");
      setCmpIndex(cmpIndex);

      // Filter and sort to get the latest target
      const targetObjects = updatedTargets.filter((item) => item.label.startsWith("Target"));
      const latestTarget = targetObjects.sort((a, b) => {
        const dateA = parse(a.date, "dd MMM yyyy", new Date());
        const dateB = parse(b.date, "dd MMM yyyy", new Date());
        return dateB.getTime() - dateA.getTime() === 0 ? -1 : dateB.getTime() - dateA.getTime();
      })[0];

      // Find the index of the latest target and set it
      const latestTargetIndex = updatedTargets.findIndex((item) => item.label === latestTarget.label);
      setTargetIndex(latestTargetIndex);

      // console.log("TARGETS UPDATED", updatedTargets[latestTargetIndex], updatedTargets);
    }
  }, [stock_targets, live_price, entry_price, entry_date]);

  return { targets, cmpIndex, targetIndex };
};
