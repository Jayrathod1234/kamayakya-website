import { getBillingDetails, getSelectedPlanDates, getUserKycStatus } from "@/api/payment";
import AuthContext from "@/components/AuthContext";
import { format } from "date-fns";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

export interface IPlanDetails {
  basePrice: string;
  discount: string;
  taxableAmount: string;
  taxAmount: string;
  totalPayable: string;
}

export interface IPlanDates {
  start: string;
  end: string;
}

export interface IUserDetails {
  pan: string;
  address: string;
  name: string;
  phone: string;
  email: string;
}

export interface ICurrentPlan {
  planName: string;
  planId: string;
}

export interface IPaymentContext {
  planDetails: IPlanDetails;
  planDates: IPlanDates;
  userDetails: IUserDetails;
  currentPlan: ICurrentPlan;
  isAadharAlreadyVerified: boolean;
  isPanAlreadyVerified:boolean;
  setUserDetails: Dispatch<
    SetStateAction<{
      pan: string;
      address: string;
      name: string;
      phone: string;
      email: string;
    }>
  >;
}

const PaymentContext = createContext<IPaymentContext | null>(null);

export const PaymentContextProvider = ({ children }: { children: React.ReactElement }) => {
  const [currentPlan, setCurrentPlan] = useState({
    planName: "",
    planId: "",
  });
  const [planDates, setPlanDates] = useState({
    start: "",
    end: "",
  });
  const [planDetails, setPlanDetails] = useState({
    basePrice: "",
    discount: "",
    taxableAmount: "",
    taxAmount: "",
    totalPayable: "",
  });
  const [userDetails, setUserDetails] = useState({
    pan: "",
    address: "",
    name: "",
    phone: "",
    email: "",
  });
  const {user} = useContext(AuthContext)
  const [isAadharAlreadyVerified, setIsAadharAlreadyVerified] = useState(false);
  const [isPanAlreadyVerified,setIsPanAlreadyVerified] = useState(false);

  const fetchPlanDetails = async () => {
    try {
      const res = await getSelectedPlanDates({ subscription: currentPlan.planId });
      setPlanDates({
        start: format(new Date(res?.start_date), "dd MMM yyyy"),
        end: format(new Date(res?.end_date), "dd MMM yyyy"),
      });
    } catch (e) {}
  };

  const fetchPlanSummary = async () => {
    try {
      const res = await getBillingDetails({ subscription_id: currentPlan.planId });
      setPlanDetails({
        basePrice: res?.base_price,
        taxableAmount: res?.taxable_amount,
        taxAmount: res?.tax_amount,
        totalPayable: res?.total_payable,
        discount: res?.discount?.includes("NA") ? null : res?.discount,
      });
    } catch (e) {}
  };

  const checkUserKycStatus = async () => {
    try {
      const res = await getUserKycStatus();
      setIsAadharAlreadyVerified(res?.is_aadhar_verified);
      setIsPanAlreadyVerified(res?.is_pan_verified)
      setUserDetails((prev) => ({
        ...prev,
        name: res?.name,
        email: res?.email,
        phone: res?.mobile,
      }));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setCurrentPlan((prev) => ({
      ...prev,
      planId: sessionStorage.getItem("planId") as string,
      planName: sessionStorage.getItem("planName") as string,
    }));
  }, []);

  useEffect(() => {
    if (!currentPlan.planId) return;
    setUserDetails((prev)=>({...prev, phone:user.mobile}))
    fetchPlanDetails();
    fetchPlanSummary();
    checkUserKycStatus();
  }, [currentPlan.planId]);

  return (
    <PaymentContext.Provider
      value={{ planDetails, planDates, userDetails, currentPlan, isAadharAlreadyVerified, setUserDetails, isPanAlreadyVerified }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => useContext(PaymentContext);
