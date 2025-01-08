import { PencilLine } from "lucide-react";
import { useEffect, useState } from "react";

interface ISideBarList {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  elementId?: string;
  onClick?: () => void;
}

const PERSONAL_INFO_ID = "personal-info";
const YOUR_PLAN_ID = "your-plan";
const BILLING_HISTORY_ID = "billing-history";

export function SideBarList({ icon, label, active, onClick }: ISideBarList) {
  const activeClass = active ? "bg-white relative border-l-[4px] border-l-brand-400 rounded-r-lg rounded-l-[4px]" : "";
  const activeLabelClass = active ? "text-brand-500" : "text-gray-500";

  return (
    <li
      onClick={onClick}
      aria-label="button"
      className={`flex items-center py-2 px-4 gap-x-2 cursor-pointer ${activeClass}`}
    >
      {icon}
      <p className={` text-sm whitespace-nowrap ${activeLabelClass}`}>{label}</p>
    </li>
  );
}

export function SideBar() {
  const [activeLink, setActiveLink] = useState(PERSONAL_INFO_ID);

  function onClick(elementId: string) {
    const element_id = elementId;
    const element = document.getElementById(element_id);
    setActiveLink(elementId);
    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  useEffect(() => {
    const personalInfo = document.querySelector(`#${PERSONAL_INFO_ID}`);
    const yourPlan = document.querySelector(`#${YOUR_PLAN_ID}`);
    const billingHistory = document.querySelector(`#${BILLING_HISTORY_ID}`);

    if (!personalInfo || !yourPlan || !billingHistory) {
      console.warn("One or more elements could not be found");
      return;
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          switch (entry.target.id) {
            case PERSONAL_INFO_ID:
              setActiveLink(PERSONAL_INFO_ID);
              break;
            case YOUR_PLAN_ID:
              setActiveLink(YOUR_PLAN_ID);
              break;
            case BILLING_HISTORY_ID:
              setActiveLink(BILLING_HISTORY_ID);
              break;
            default:
              break;
          }
        }
      },
      {
        root: null,
        threshold: 0.85, // trigger if atleast 85% of element in viewport
      }
    );

    // Observe the elements
    [personalInfo, yourPlan, billingHistory].forEach((element) => {
      observer.observe(element);
    });

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className=" hidden lg:block  sticky top-[94px] left-0 z-10 h-fit">
      <ul>
        <SideBarList
          icon={<PencilLine size={24} color={activeLink === PERSONAL_INFO_ID ? "#125B54" : "#667085"} />}
          label={"Personal Info"}
          active={activeLink === PERSONAL_INFO_ID}
          onClick={() => onClick(PERSONAL_INFO_ID)}
        />
        <SideBarList
          onClick={() => onClick(YOUR_PLAN_ID)}
          active={activeLink === YOUR_PLAN_ID}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.7 18.98H7.3C6.88 18.98 6.41 18.65 6.27 18.25L2.13 6.67C1.54 5.01 2.23 4.5 3.65 5.52L7.55 8.31C8.2 8.76 8.94 8.53 9.22 7.8L10.98 3.11C11.54 1.61 12.47 1.61 13.03 3.11L14.79 7.8C15.07 8.53 15.81 8.76 16.45 8.31L20.11 5.7C21.67 4.58 22.42 5.15 21.78 6.96L17.74 18.27C17.59 18.65 17.12 18.98 16.7 18.98Z"
                stroke="#667085"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.5 22H17.5"
                stroke="#667085"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.5 14H14.5"
                stroke="#667085"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          label={"Your Plan"}
        />
        <SideBarList
          onClick={() => onClick(BILLING_HISTORY_ID)}
          active={activeLink === BILLING_HISTORY_ID}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                stroke="#667085"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                stroke="#667085"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="M7 13H13" stroke="#667085" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7 17H11" stroke="#667085" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          }
          label="Billing History"
        />
      </ul>
    </div>
  );
}
