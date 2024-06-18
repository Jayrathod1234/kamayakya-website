import { ACTIVE_PLAN_URL } from "@/pages/api/URLs";
import { TChildren } from "@/types";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const initialValue = {
  id: "",
  plan: "",
  start_date: "",
  end_date: "",
  amount_paid: 0,
  is_active: false,
  duration:""
};

const PlanContext = createContext({ activePlan: initialValue });

export const PlanProvider = ({ children }: TChildren) => {
  const [activePlan, setActivePlan] = useState(initialValue);

  const fetchActivePlan = async () => {
    try {
      const token = localStorage.getItem("refresh");
      const response = await axios.get(ACTIVE_PLAN_URL, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (response.data) {
        const startDate = new Date(response.data.current_active_subscription.start_date);
        const endDate = new Date(response.data.current_active_subscription.end_date);
        const durationMs = endDate - startDate;
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const durationDays = durationMs / millisecondsPerDay;
        const duration = durationDays > 90 ? "1year" : durationDays > 365 ? "3year" : "3months";
        setActivePlan({ ...response.data.current_active_subscription, duration });
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchActivePlan();
  }, [localStorage.getItem("access"), localStorage.getItem("refresh")]);

  return <PlanContext.Provider value={{ activePlan }}>{children}</PlanContext.Provider>;
};

export const useActivePlanContext = () => useContext(PlanContext);
