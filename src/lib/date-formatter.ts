import { format } from "date-fns";

export const getBlogDateFormat = (date: string) => format(new Date(date), "dd MMM, yyyy");

export function abbreviateTime(text:string) {
  return text
  .replace(/\s*years?\s*/g, 'yr')   // Replace 'year' or 'years' with 'y', removing surrounding spaces
  .replace(/\s*months?\s*/g, 'mo')  // Replace 'month' or 'months' with 'm', removing surrounding spaces
  .replace(/\s*days?\s*/g, 'd');   // Replace 'day' or 'days' with 'd', removing surrounding spaces
}

export function abbreviateTimeForPlan(text:string) {
  return text
  .replace(/\s*year?\s*/g, ' yr')   // Replace 'year' or 'years' with 'y', removing surrounding spaces
  .replace(/\s*months?\s*/g, ' mo')  // Replace 'month' or 'months' with 'm', removing surrounding spaces
  .replace(/\s*days?\s*/g, ' d');   // Replace 'day' or 'days' with 'd', removing surrounding spaces
}