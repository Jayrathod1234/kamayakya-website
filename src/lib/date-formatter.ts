import { format } from "date-fns";

export const getBlogDateFormat = (date: string) => format(new Date(date), "dd MMM, yyyy");
