import { TPlan, TPlanResponse } from "@/types";

export const formatPlans = (data: Array<TPlanResponse>) => {
  let plans = data.reduce(
    (accPlan: TPlan, currPlan) => {
      if (currPlan.duration_in_days === 90) {
        currPlan = { ...currPlan, perMonth: currPlan.amount / 3 };
        return { ...accPlan, "3months": [...accPlan["3months"], currPlan] };
      }
      if (currPlan.duration_in_days === 365) {
        currPlan = { ...currPlan, perMonth: currPlan.amount / 12 };
        return { ...accPlan, "1year": [...accPlan["1year"], currPlan] };
      }
      if (currPlan.duration_in_days === 1095) {
        currPlan = { ...currPlan, perMonth: currPlan.amount / 36 };
        return { ...accPlan, "3year": [...accPlan["3year"], currPlan] };
      }
      if (!currPlan.duration_in_days) {
        currPlan = { ...currPlan, perMonth: 0 };
        return {
          ...accPlan,
          "3months": [...accPlan["3months"], currPlan],
          "1year": [...accPlan["1year"], currPlan],
          "3year": [...accPlan["3year"], currPlan],
        };
      }
      return accPlan;
    },
    { "3months": [], "1year": [], "3year": [] }
  );

  return plans;
};
