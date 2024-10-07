//Optimized format
import { TTarget } from "@/types/shared";
import { format, parse } from "date-fns";
import { useEffect, useMemo, useState, useCallback } from "react";

export const useFormattedTargets = ({
  stock_targets,
  entry_date,
  live_price,
  entry_price,
}: {
  stock_targets: any[];
  entry_date: string;
  live_price: number;
  entry_price: number;
}) => {
  const [targets, setTargets] = useState<TTarget[]>([]);
  const [targetIndex, setTargetIndex] = useState(0);
  const [cmpIndex, setCmpIndex] = useState(0);

  const formatDate = useCallback((date: Date | string) => format(new Date(date), "dd MMM yyyy"), []);
  
  const sortedStockTargets = useMemo(() => 
    [...stock_targets].map((item,index)=>({...item,label:`Target ${stock_targets.length - index}`})).sort((a, b) => a.target_price - b.target_price)
      .map((item, index) => {
        // console.log(new Date(), new Date(item.target_date),item.target_date)
        return {
        label: item.label,
        date: item.target_met ? formatDate(new Date(item.target_met)):formatDate(item.created),
        price: item.target_price,
        status: item.target_met ? "Completed" : new Date() < new Date(item.target_date) ? "Active": "Inactive",
      }}),
    [stock_targets, formatDate]
  );

  const additionalTargets = useMemo(() => [
    { label: "CMP", price: live_price, date: formatDate(new Date()), status: "Completed" },
    { label: "Entry Price", price: entry_price, date: formatDate(entry_date), status: "Completed" },
  ], [live_price, entry_price, entry_date, formatDate]);

  useEffect(() => {
    const updatedTargets = [...sortedStockTargets, ...additionalTargets].sort((a, b) => a.price - b.price);
    setTargets(updatedTargets);

    if (updatedTargets.length > 0) {
      const newCmpIndex = updatedTargets.findIndex((target) => target.label === "CMP");
      setCmpIndex(newCmpIndex);

      const targetObjects = updatedTargets.filter((item) => item.label.startsWith("Target"));
      //get last target index
      const lastTarget = targetObjects.sort((a, b) => {
        // const dateA = parse(a.date, "dd MMM yyyy", new Date());
        // const dateB = parse(b.date, "dd MMM yyyy", new Date());
        const priceDiff = a.price - b.price;
        // if (dateDiff === 0) {
        //   // If dates are the same, sort by target number (descending)
        //   return parseInt(b.label.split(' ')[1]) - parseInt(a.label.split(' ')[1]);
        // }
        return priceDiff;
      })[targetObjects.length-1];

      const latestTargetIndex = updatedTargets.findIndex((item) => item.label === lastTarget?.label);
      setTargetIndex(latestTargetIndex);
    }
  }, [sortedStockTargets, additionalTargets]);

  return { targets, cmpIndex, targetIndex };
};
