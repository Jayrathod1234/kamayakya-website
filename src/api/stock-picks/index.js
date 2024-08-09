import { axiosApi } from "../../utils/axios";

// Strategy Tags API
export const getStrategyTagListApi = async () => {
  /* ----------------------------------- API ---------------------------------- */
  // const response = await axiosApi.get(`/user/strategyTags/`);
  // return response.data.data;

  /* ----------------------------- Static Data ---------------------------- */
  return [
    {
      name: "Value Pick",
      slug: "value-pick",
      image: "/assets/discover-by-strategy/value-pick.svg",
      description: "Discover undervalued gems with strong fundamentals.",
    },
    {
      name: "Turnaround Story",
      slug: "turnaround-story",
      image: "/assets/discover-by-strategy/turnaround-story.svg",
      description: "Invest in companies poised for a comeback.",
    },
    {
      name: "Special Situation",
      slug: "special-situation",
      image: "/assets/discover-by-strategy/special-situation.svg",
      description:
        "Unique opportunities arising from corporate events or restructuring.",
    },
    {
      name: "Management Change",
      slug: "management-change",
      image: "/assets/discover-by-strategy/management-change.svg",
      description: "Benefit from new leadership and strategic direction.",
    },
    {
      name: "Market Leadership",
      slug: "market-leadership",
      image: "/assets/discover-by-strategy/market-leadership.svg",
      description: "Invest in industry leaders with a strong market position.",
    },
    {
      name: "Industry Tailwind",
      slug: "industry-tailwind",
      image: "/assets/discover-by-strategy/industry-tailwind.svg",
      description: "Sectors with favorable economic conditions driving growth.",
    },
    {
      name: "Cyclicals",
      slug: "moated",
      image: "/assets/discover-by-strategy/cyclicals.svg",
      description: "Invest in industries that benefit from economic cycles.",
    },
    {
      name: "Moated",
      slug: "cyclicals",
      image: "/assets/discover-by-strategy/moated.svg",
      description:
        "Firms with strong competitive advantages that protect their market position.",
    },

    {
      name: "Thematic Stories",
      slug: "thematic-stories",
      image: "/assets/discover-by-strategy/thematic-stories.svg",
      description: "Align investments with emerging trends and themes.",
    },
    {
      name: "Future Focused",
      slug: "future-focused",
      image: "/assets/discover-by-strategy/future-focused.svg",
      description: "Companies with a strong vision for long-term growth.",
    },
    {
      name: "ESG",
      slug: "esg",
      image: "/assets/discover-by-strategy/esg.svg",
      description:
        "Invest in companies with strong Environmental, Social, and Governance practices.",
    },
    {
      name: "High Dividends",
      slug: "high-dividends",
      image: "/assets/discover-by-strategy/high-dividends.svg",
      description:
        "Companies offering attractive and consistent dividend yields.",
    },
  ];
};
