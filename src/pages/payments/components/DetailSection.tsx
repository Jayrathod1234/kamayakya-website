import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { IconButton, InputAdornment, OutlinedInput, styled, TextField, TextFieldProps } from "@mui/material";
import { ArrowLeft, Check, Loader, Mail } from "lucide-react";
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Checkbox } from "@/components.v2/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components.v2/ui/dialog";
import OtpInput from "react-otp-input";
import { blockInvalidChar } from "@/components/LoginCard";
import AadhaVerifyModal from "./AadhaVerifyModal";
import ConfirmDetailsModal from "./ConfirmDetailsModal";
import {
  getAadharOtp,
  getAddress,
  getDigioIdandSendPdf,
  getSelectedPlanDates,
  getUserDetailsForPdf,
  getUserKycStatus,
  postAadharOtp,
  postCheckout,
} from "../../../api/payment/index";
import { toast } from "@/components.v2/ui/use-toast";
import { IPaymentContext, usePaymentContext } from "@/contexts/PaymentContext";
import AuthContext from "@/components/AuthContext";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import VerifyTag from "./VerifyTag";
import axios from "axios";
import Tooltip from "@/components.v3/common/Tooltip";
import { useRouter } from "next/router";
import { Document, Page, Text, View, StyleSheet, pdf, Font } from "@react-pdf/renderer";
import { PLAN_FREQUENCY_MAP } from "@/constants/pricing/plans";

type CustomTextFieldProps = TextFieldProps & {
  confirmAddress?: boolean;
  sendotp?: boolean;
};

type ParamsType = {
  base_amount: string;
  subscription: string;
  final_amount: string | number;
  discount_code: string;
  discount_amount: string;
  address: string;
  name: string;
  user_email: string;
  user_contact: string;
  gst_number?: string; // Optional property
};

// Register fonts if needed
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf",
      fontWeight: 100,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf",
      fontWeight: 200,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf",
      fontWeight: 300,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
      fontWeight: 500,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
      fontWeight: 600,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
      fontWeight: 700,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf",
      fontWeight: 800,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf",
      fontWeight: 900,
    },
  ],
});

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 10,
    padding: 30,
    lineHeight: 1.5,
  },
  header: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: 700,
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 500,
  },
  semibold: {
    fontWeight: 600,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  listItem: {
    marginLeft: 10,
    marginBottom: 5,
  },
  subListItem: {
    marginLeft: 20,
    marginBottom: 3,
  },
  contactInfo: {
    marginTop: 10,
    fontSize: 9,
    textAlign: "center",
  },
  disclaimer: {
    fontSize: 8,
    marginTop: 10,
    textAlign: "center",
    color: "#666",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    padding: 5,
  },
  labelCell: {
    width: "40%",
    fontWeight: "bold",
    padding: 5,
    backgroundColor: "#f2f2f2",
  },
  valueCell: {
    width: "60%",
    padding: 5,
  },
  // subListItem:{
  //   textAlign:'center'
  // }
});
const entityDetails = {
  fullName: "John Doe",
  entityType: "Private Limited",
  registrationNo: "123456789",
  bseEnlistmentNo: "BSE123456",
  tradeName: "JD Enterprises",
  registeredAddress: "123, Business Street, Mumbai, India",
  correspondenceAddress: "456, Corporate Avenue, Delhi, India",
  contactNo: "+91 9876543210",
  email: "john.doe@example.com",
  cin: "U12345MH2000PTC123456",
  complianceOfficer: "Jane Smith",
  grievanceOfficer: "Robert Johnson",
};
const TableRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.labelCell}>{label}</Text>
    <Text style={styles.valueCell}>{value}</Text>
  </View>
);

// Main PDF Component
const KamayakyaPDFDocument = ({ clientData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Client Details</Text>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Customer Name:</Text>
          <Text>{clientData.customer_name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Plan Name:</Text>
          <Text>{clientData.plan_name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Plan Start Date:</Text>
          <Text>{clientData.start_date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Plan End Date:</Text>
          <Text>{clientData.end_date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Membership Plan Frequency:</Text>
          <Text>{PLAN_FREQUENCY_MAP[clientData.subscription_frequency]}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>User Email:</Text>
          <Text>{clientData.customer_email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>User Mobile Number:</Text>
          <Text>{clientData.customer_mobile}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>User Pan Number:</Text>
          <Text>{clientData.customer_pan}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Membership Amount (inc of taxes):</Text>
          <Text>₹{clientData.amount_to_be_paid}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Age:</Text>
          <Text>{clientData.customer_age}</Text>
        </View>
      </View>
      <Text style={styles.header}>KamayaKya Research Analyst User Agreement</Text>
      <Text style={styles.sectionTitle}>1. Acceptance of Research Services</Text>
      <Text>
        By subscribing to the research service, the Client confirms that they have elected to avail of the research
        service at their sole discretion. The Research Analyst (RA) shall render research services in accordance with
        the applicable provisions of SEBI (Research Analyst) Regulations, 2014.
      </Text>
      <Text style={styles.sectionTitle}>2. Obligations of RA and Client</Text>
      <Text>
        The RA and the Client shall be bound by the SEBI Act and all applicable SEBI regulations, including relevant
        government notifications, as may be in force from time to time.
      </Text>
      <Text style={styles.sectionTitle}>3. Client Information and KYC</Text>
      <Text>
        The Client shall furnish all mandatory details required by the RA, along with supporting documents, as per
        SEBI/RAASB guidelines. The RA shall collect, store, and verify KYC records through the KYC Registration Agency
        (KRA) as specified by SEBI.
      </Text>
      <Text style={styles.sectionTitle}>4. Standard Terms of Service</Text>
      <Text>Client Consent:</Text>
      <Text style={styles.semibold}>
        "I / We have read and understood the terms and conditions applicable to a research analyst as defined under
        regulation 2(1)(u) of the SEBI (Research Analyst) Regulations, 2014, including the fee structure.
      </Text>
      <Text style={styles.semibold}>
        I/We are subscribing to the research services for our own benefits and consumption, and any reliance placed on
        the research report provided by the research analyst shall be as per our own judgment and assessment of the
        conclusions contained in the research report.
      </Text>
      <Text style={styles.semibold}>I/We understand that:</Text>
      <Text style={styles.listItem}>
        • Any investment made based on the recommendations in the research report is subject to market risk.
      </Text>
      <Text style={styles.listItem}>
        • Recommendations in the research report do not provide any assurance of returns.
      </Text>
      <Text style={styles.listItem}>
        • There is no recourse to claim any losses incurred on the investments made based on the recommendations in the
        research report."
      </Text>
      <Text style={styles.listItem}>
        • <Text style={styles.semibold}>Declaration of the RA that:</Text> It is duly registered with SEBI as an RA
        under SEBI (Research Analysts) Regulations, 2014, and its registration details are:
      </Text>
      <Text style={[styles.subListItem, { marginLeft: 80 }]}>Registration No: INH000009843</Text>
      <Text style={[styles.subListItem, { marginLeft: 80 }]}>Registration date: 13 June 2022</Text>
      <Text style={[styles.subListItem, { marginLeft: 80 }]}>BSE Enlistment no.: 5583</Text>
      <Text style={styles.listItem}>
        • It has registration and qualifications required to render the services contemplated under the RA Regulations,
        and the same are valid and subsisting;.
      </Text>
      <Text style={styles.listItem}>
        • Research analyst services provided by it do not conflict with or violate any provision of law, rule or
        regulation, contract, or other instrument to which it is a party or to which any of its property is or may be
        subjectThe maximum fee that may be charged by RA is ₹1.51 lakhs per annum per family of client.{" "}
      </Text>
      <Text style={styles.listItem}>
        • The recommendations provided by RA do not provide any assurance of returns.{" "}
      </Text>
      <Text style={styles.sectionTitle}>5. Termination and Refund</Text>
      <Text style={styles.listItem}>
        • RA services may be suspended/terminated if SEBI cancels or suspends RA registration.
      </Text>
      <Text style={styles.listItem}>• Refunds shall be made on a pro-rata basis for the unexpired period.</Text>
      <Text>
        In case of suspension of certificate of registration of the RA for more than 60 (sixty) days or cancellation of
        the RA registration, RA shall refund the fees, on a pro rata basis for the period from the effective date of
        cancellation/suspension to end of the subscription period.
      </Text>
      <Text style={styles.sectionTitle}>6. Mandatory Notice to Clients</Text>
      <Text>
        Clients are advised to review SEBI's "Do's and Don'ts" while dealing with RAs, as per SEBI Master Circular
        SEBI/HO/MIRSD-POD-1/P/CIR/2024/49 dated May 21, 2024.
      </Text>
      <Text style={styles.sectionTitle}>7. Most Important Terms and Conditions (MITC)</Text>
      <Text style={styles.listItem}>
        1. These terms and conditions, and consent thereon are for the research services provided by the Research
        Analyst (RA) and RA cannot execute/carry out any trade (purchase/sell transaction) on behalf of the client.
        Thus, the clients are advised not to permit RA to execute any trade on their behalf.
      </Text>
      <Text style={styles.listItem}>
        2. The fee charged by RA to the client will be subject to the maximum of amount prescribed by SEBI/ Research
        Analyst Administration and Supervisory Body (RAASB) from time to time (applicable only for Individual and HUF
        Clients).
      </Text>
      <Text style={styles.subListItem}>
        • The current fee limit is Rs 1,51,000/- per annum per family of client for all research services of the RA.
      </Text>
      <Text style={styles.subListItem}> • The fee limit does not include statutory charges.</Text>{" "}
      <Text style={styles.subListItem}>
        • The fee limits do not apply to a non-individual client / accredited investor.
      </Text>
      <Text style={styles.listItem}>
        3. RA may charge fees in advance if agreed by the client. Such advance shall not exceed the period stipulated by
        SEBI; presently it is one quarter. In case of premature termination of the RA services by either the client or
        the RA, the client shall be entitled to seek a refund of proportionate fees only for the unexpired period.
      </Text>
      <Text style={styles.listItem}>
        4. Fees to RA may be paid by the client through any of the specified modes like cheque, online bank transfer,
        UPI, etc. Cash payment is not allowed. Optionally the client can make payments through Centralized Fee
        Collection Mechanism (CeFCoM) managed by BSE Limited (i.e. currently recognized RAASB).
      </Text>
      <Text style={styles.listItem}>
        5. The RA is required to abide by the applicable regulations/ circulars/ directions specified by SEBI and RAASB
        from time to time in relation to disclosure and mitigation of any actual or potential conflict of interest. The
        RA will endeavor to promptly inform the client of any conflict of interest that may affect the services being
        rendered to the client.
      </Text>
      <Text style={styles.listItem}>
        6. Any assured/guaranteed/fixed returns schemes or any other schemes of similar nature are prohibited by law. No
        scheme of this nature shall be offered to the client by the RA.
      </Text>
      <Text style={styles.listItem}>
        7. The RA cannot guarantee returns, profits, accuracy, or risk-free investments from the use of the RA’s
        research services. All opinions, projections, and estimates of the RA are based on the analysis of available
        data under certain assumptions as of the date of preparation/publication of the research report.
      </Text>
      <Text style={styles.listItem}>
        8.Any investment made based on recommendations in research reports is subject to market risks, and
        recommendations do not provide any assurance of returns. There is no recourse to claim any losses incurred on
        the investments made based on the recommendations in the research report. Any reliance placed on the research
        report provided by the RA shall be as per the client’s own judgment and assessment of the conclusions contained
        in the research report.
      </Text>
      <Text style={styles.listItem}>
        9. The SEBI registration, Enlistment with RAASB, and NISM certification do not guarantee the performance of the
        RA or assure any returns to the client.
      </Text>
      <Text style={styles.listItem}>
        10. <Text style={styles.semibold}>For any grievances:</Text>
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.semibold}>• Step 1:</Text> The client should first contact the RA using the details on
        www.kamayakya.com or via: Email: contact@kamayakya.com or Phone: +91 9175939641
      </Text>{" "}
      <Text style={styles.listItem}>
        <Text style={styles.semibold}>• Step 2:</Text> If the resolution is unsatisfactory, the client can also lodge
        grievances through SEBI’s SCORES platform at www.scores.sebi.gov.in
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.semibold}>• Step 3:</Text> The client may also consider Online Dispute Resolution (ODR)
        through the Smart ODR portal at https://smartodr.in
      </Text>
      <Text style={styles.listItem}>
        11. Clients are required to keep contact details, including email ID and mobile numbers, updated with the RA at
        all times.
      </Text>
      <Text style={styles.listItem}>
        12. The RA shall never ask for the client’s login credentials and OTPs for the client’s Trading Account, Demat
        Account, or Bank Account. Clients should never share such information with anyone, including RA.
      </Text>
      <Text style={styles.sectionTitle}>8. Additional Clauses</Text>
      <Text style={styles.listItem}>
        • Any additional voluntary clauses added by the RA shall not contravene SEBI regulations.
      </Text>
      <Text style={styles.listItem}>• Any changes to voluntary clauses shall be preceded by a 15-day notice.</Text>
      <Text style={styles.listItem}>
        • Investment in securities market are subject to market risks. Read all the related documents carefully before
        investing.
      </Text>
    </Page>
    <Page size={"A4"} style={styles.page}>
      <Text style={styles.header}>DETAILS OF RESEARCH ANALYST</Text>
      <View style={styles.table}>
        <TableRow label="Full Name" value={""} />
        <TableRow label="Entity Type" value={""} />
        <TableRow label="Registration No." value={""} />
        <TableRow label="BSE Enlistment No." value={""} />
        <TableRow label="Trade Name" value={""} />
        <TableRow label="Residential/ Registered Address" value={""} />
        <TableRow label="Correspondence Address" value={""} />
        <TableRow label="Contact No." value={""} />
        <TableRow label="Email No." value={""} />
        <TableRow label="CIN" value={""} />
        <TableRow label="Compliance Officer" value={""} />
        <TableRow label="Grievance Officer" value={""} />
      </View>
    </Page>
  </Document>
);
// Custom styled OutlinedInput
export const CustomTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "error" && prop !== "confirmAddress" && prop !== "sendotp", // Prevents passing `error` to the DOM
})<CustomTextFieldProps>(({ error, confirmAddress, sendotp }) => ({
  "& .MuiOutlinedInput-root": {
    paddingRight: sendotp ? "6px" : "11px",
    "& fieldset": {
      borderColor: error ? "#FDA29B" : "#0000000F",
      borderRadius: confirmAddress ? "8px 8px 0 0" : "6.2px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00645A", // Focus color
      borderWidth: 1,
    },
    "& input:valid + fieldset": {
      borderColor: error ? "red" : "green",
      borderWidth: 1,
    },
    "& input": {
      fontSize: "14px",
      padding: "9px !important",
      paddingRight: "10px !important",
      paddingLeft: "12px",
    },
    "& input::placeholder": {
      fontSize: "14px",
    },
    // "& input:focus": {
    //   backgroudColor:"transparent"
    // },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 1,
    },
  },
}));

interface IFormInput {
  aadhar: string;
  fullname: string;
  pan: string;
  address: string;
  email: string;
  phone: string;
  gstin: string;
}

export default function DetailSection({ activeTab, setActiveTab }: { setActiveTab: any; activeTab: string }) {
  const [gstChecked, setGstChecked] = useState(false);
  // const [aadhar, setAadhar] = useState("");
  const [billingSameAsAadhar, setBillingSameAsAadhar] = useState(true);
  const [aadharRequestId, setAadharRequestId] = useState("");
  const [displayModal, setDisplayModal] = useState("AADHAR");
  const [openDialog, setOpenDialog] = useState(false);
  const [aadharOtpLoading, setAadharOtpLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkingPincode, setCheckingPincode] = useState(false);
  const [pincodeVerified, setPincodeVerified] = useState(false);
  const [pincodeBasedAddress, setPincodeBasedAddress] = useState("");
  const {
    isAadharAlreadyVerified,
    userDetails,
    setUserDetails,
    planDetails,
    currentPlan,
    isPanAlreadyVerified,
    isAadharVintage,
    aadharVerified,
    setAadharVerified,
    setPlanDetails,
  } = usePaymentContext() as IPaymentContext;
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      aadhar: "",
      fullname: "",
      pan: "",
      phone: "",
      email: "",
      gstin: "",
      address: "",
    },
  });
  const {
    control: control2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2, isValid },
    setError: setError2,
    getValues: getValues2,
    setValue: setValue2,
  } = useForm({
    defaultValues: {
      aadhar: "",
    },
  });
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [displayFailedAddharModal, setDisplayFailedAddharModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchAadharFailed, setFetchAadharFailed] = useState(false);
  const [testFile, setTestFile] = useState("");
  const { planDates } = usePaymentContext() as IPaymentContext;
  const aadhar = getValues2("aadhar");
  const preExistingAddress = getValues("address");
  const email = watch("email");
  const mobile = watch("phone");
  const address = watch("address");

  const handleAadharOtp: SubmitHandler<Pick<IFormInput, "aadhar">> = async (data) => {
    try {
      setAadharOtpLoading(true);

      const res = await getAadharOtp({ aadhaar: data?.aadhar });
      // { result: { requestId: "dklsjfklsdlkfjdf" } };
      //  await getAadharOtp({ aadhaar: data?.aadhar });
      // { result: { requestId: "dklsjfklsdlkfjdf" } };
      //
      setAadharRequestId(res?.result?.requestId);
      setOpenDialog(true);
      // setAadharRequestId(res?.)
    } catch (e: any) {
      if (e?.response?.data?.message?.includes("Invalid Aadhaar")) {
        toast({
          variant: "warn",
          title: "",
          description: "Invalid Aadhaar Number. Please check and re-enter a valid Aadhaar Number.",
        });
        return;
      }
      if (e?.response?.data?.message?.includes("Source down")) {
        setDisplayFailedAddharModal(true);
        setOpenDialog(true);
        return;
      }

      if (e?.response?.data?.detail?.includes("Token ")) {
        toast({
          variant: "warn",
          title: "",
          description: "Session Expired! Please relogin and try again. ",
        });
      }

      toast({
        variant: "warn",
        title: "",
        description: e?.response?.data?.message || e?.response?.data?.detail || "Something went wrong.",
      });
    } finally {
      setAadharOtpLoading(false);
    }
  };

  const handleVerifyAadharOtp = async () => {
    try {
      setLoading(true);
      const res = await postAadharOtp({ aadhar, is_encrypted: true });
      let address = res?.address;
      if (res?.is_aadhar_verified) {
        setOpenDialog(false);
        toast({
          variant: "warn",
          description: res?.message,
        });
        return;
      }
      setUserDetails((prev) => ({
        ...prev,
        pan: res?.pan_number,
        name: res?.name,
        address: address,
        // aadhar: res?.masked_aadhar,
        maskedPan: res?.masked_pan_number,
      }));
      // setDisplayModal("CONFIRM");
    } catch (e: any) {
      if (e?.response?.data?.message?.includes("Source down")) {
        setDisplayFailedAddharModal(true);
        setOpenDialog(true);
        return;
      }

      if (e?.response?.data?.detail?.includes("Token ")) {
        toast({
          variant: "warn",
          title: "",
          description: "Session Expired! Please relogin and try again. ",
        });
      }

      toast({
        variant: "warn",
        title: "",
        description: e?.response?.data?.message || e?.response?.data?.detail || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayScreen = (options: any) => {
    console.log("OPETIOS", options)
    let paymentFailed = false;
    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response: any) {
      if (!paymentFailed) {
        paymentFailed = true;
        alert(response.error.description);
        // Optionally, reset the flag after a certain time if needed
        setTimeout(() => {
          paymentFailed = false;
        }, 5000);
      }
    });
    paymentObject.open();
  };
  
  // const convertBlobToBase64 = (blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result.split(',')[1]); // Extract only the Base64 string
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsDataURL(blob);
  //   });
  // };
  const generatePdf = async (userDetailsForPdf) => {
    const blob = await pdf(<KamayakyaPDFDocument clientData={userDetailsForPdf} />).toBlob();
    const url = URL.createObjectURL(blob);

    // Open the URL in a new tab
    window.open(url, '_blank');
    return blob;

  };

  const disableProceedButton = () => {
    const intervalId = setInterval(() => {
      const button = document.querySelector("button[type='button']");
      if (button && button.innerText === "Proceed to Sign") {
        button.disabled = true; // Disable the button initially
        button.style.opacity = "0.5";
        clearInterval(intervalId);
      }
    }, 500);
  };
  
  const enableButtonOnScroll = () => {
    const iframe = document.querySelector('iframe'); // If Digio SDK renders inside an iframe
  
    if (iframe) {
      iframe.contentWindow.addEventListener('scroll', () => {
        const scrollHeight = iframe.contentDocument.body.scrollHeight;
        const scrollTop = iframe.contentWindow.pageYOffset || iframe.contentDocument.documentElement.scrollTop;
        const clientHeight = iframe.contentDocument.documentElement.clientHeight;
  
        if (scrollTop + clientHeight >= scrollHeight - 20) { // User has scrolled to bottom
          const button = iframe.contentDocument.querySelector("button[type='button']");
          if (button && button.innerText === "Proceed to Sign") {
            button.disabled = false; // Enable the button
            button.style.opacity = "1";
          }
        }
      });
    }
  };
  

  const handleDigio = async (orderId, userDetailsForPdf,orderDetails) => {
    try {
      const pdf = await generatePdf(userDetailsForPdf);
      const res = await getDigioIdandSendPdf({ order_id: orderId, user_agreement_pdf: pdf });
      console.log(res);
      var options = {
        environment: "sandbox",
        is_iframe:false,
        callback: function (response) {
          if (response.hasOwnProperty("error_code")) {
            return console.log("error occurred in process", response);
          }
          // downloadAndSendPDF();
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
            amount:orderDetails.data.final_amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "KamayaKya", //your business name
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: orderDetails.data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response: unknown) {
              router.push("/payments/successful");
            },
            prefill: {
              //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
              name: userDetails.name, //your customer's name
              email: userDetails.email,
              contact: userDetails.phone?.slice(3), //Provide the customer's phone number for better conversion rates
            },
            notes: {
              address:
                "Flat No 6, New Nirmal Apartments, Balkrishna Sakharam Dhole Patil Rd, near Akshay Complex Road, Pune, Maharashtra 411001",
            },
            theme: {
              color: "#0b3a36",
              backdrop_color: "#ea3546",
            },
          };
          handleRazorpayScreen(options);
          console.log("Signing;completed;successfully:", response);
        },
        logo: "https://www.mylogourl.com/image.jpeg",
        theme: {
          primaryColor: "#AB3498",
          secondaryColor: "#000000",
        },
      };
      var digio = new window.Digio(options);
      digio.init();
      digio.submit(res?.id, res?.user_mobile);

  // Run these functions after the SDK is loaded
  disableProceedButton();
  enableButtonOnScroll();
    } catch (e) {
      console.log("ERORRO", e);
    }
  };

  const handleCheckout: SubmitHandler<IFormInput> = async (data) => {
    if (!aadharVerified && !isAadharAlreadyVerified) {
      setError2("aadhar", { message: "Verify Aadhar to continue" });
      return;
    }
    if (!Number.isNaN(Number(data.address)) && !pincodeBasedAddress) {
      setError("address", { message: "Verify pincode to continue" });
      return;
    }
    setCheckoutLoading(true);
    try {
      let params: ParamsType = {
        base_amount: planDetails.totalPayable,
        subscription: currentPlan.planId,
        final_amount: planDetails.discount
          ? Number(planDetails.totalPayable) - Number(planDetails.discount)
          : planDetails.totalPayable,
        // tax_amount: planDetails.taxAmount,
        discount_code: planDetails.discountCode,
        // "discount_percentage":0,
        discount_amount: planDetails.discount,
        address: !pincodeBasedAddress && Number.isNaN(Number(data.address)) ? data.address : pincodeBasedAddress,
        name: data.fullname,
        user_email: data.email,
        user_contact: data.phone.slice(3),
      };
      if (data?.gstin) {
        params = { ...params, gst_number: data.gstin };
      }
      const res = await postCheckout(params);
     
      setPlanDetails((prev) => ({ ...prev, orderId: res.data.order_id }));
      sessionStorage.setItem("orderId", res.data.order_id);
      const userDetailsForPdf = await getUserDetailsForPdf(res.data.order_id, {
        start_date: planDates.start,
        end_date: planDates.end,
      });
      console.log("USER DETAILS", userDetailsForPdf);
      handleDigio(res.data.order_id, userDetailsForPdf, res);
      // handleRazorpayScreen(options);
    } catch (e) {
      console.error(e);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handlePincode = async (pincode: string) => {
    try {
      setError("address", { message: "" });
      setCheckingPincode(true);
      const res = await getAddress(pincode);
      if (res?.results && res?.status === "OK") {
        if (Array.isArray(res?.results)) {
          setPincodeVerified(true);
          setPincodeBasedAddress(res?.results[0].formatted_address);
        }
      } else {
        toast({
          variant: "warn",
          description: "Invalid Pin Code. Please check and re-enter a valid Pin Code.",
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCheckingPincode(false);
    }
  };

  useEffect(() => {
    setValue("fullname", userDetails.name);
    setValue("phone", userDetails.phone);
    setValue("address", userDetails.address);
    setValue("pan", userDetails.maskedPan);
    setValue("email", userDetails.email);
    setValue2("aadhar", userDetails.aadhar);
  }, [userDetails, activeTab]);

  useEffect(() => {
    if (isAadharAlreadyVerified) {
      setValue2("aadhar", userDetails?.aadhar);
    }
  }, [isAadharAlreadyVerified]);

  useEffect(() => {
    if (errors.email || errors.address || errors.fullname || errors.phone || errors.pan) {
      if (!aadhar || !isValid) {
        setError2("aadhar", { message: "Enter Aadhar to continue" });
      } else {
        setError2("aadhar", { message: "" });
      }
    }
  }, [errors]);

  useEffect(() => {
    if (isAadharAlreadyVerified) {
      setBillingSameAsAadhar(false);
    }
  }, [isAadharAlreadyVerified]);

  useEffect(() => {
    if (!openDialog && displayFailedAddharModal) {
      setDisplayFailedAddharModal(false);
    }
  }, [openDialog]);

  return (
    <div className="mt-9">
      <Dialog onOpenChange={setOpenDialog} open={openDialog}>
        <button onClick={() => setActiveTab("review")} className=" hidden sm:flex items-center mb-7 cursor-pointer">
          <button>
            <ArrowLeft size={18} />
          </button>
          <p className="group ml-[5px] text-xs text-gray-600 relative">
            Go Back to Previous Page
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#475467] transition-all duration-300 group-hover:w-full"></div>
          </p>
        </button>
        <div className="p-3 bg-[#EFF7FF] border border-[#A6D3FF] rounded-lg flex items-center gap-x-[10px] mb-7">
          <img height={24} width={24} alt="info-icon" src="/info-fill.svg" />
          <p className=" m-0 text-xs">
            Your Aadhaar and PAN are collected securely for SEBI KYC compliance. They’re encrypted, masked, and never
            shared. Your data's privacy and security are our top priorities.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-y-4 sm:gap-y-7 gap-x-[22px]">
          {!isAadharAlreadyVerified || !isAadharVintage ? (
            <div className="col-span-2">
              <div className=" flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  Aadhar Card Number<span className="text-error-500">*</span>
                </p>
                {/* {aadharVerified && (
                  <button
                    onClick={handleAadharEditClick}
                    className=" text-xs text-brand-500 font-bold border-b border-b-brand-500 border-dashed"
                  >
                    Edit Aadhar
                  </button>
                )} */}
              </div>
              <Controller
                name="aadhar"
                control={control2}
                rules={{
                  required: "Enter aadhar to continue",
                  pattern: {
                    value: aadharVerified ? /^XXXXXXXX\d{4}$/ : /^\d{4}\d{4}\d{4}$/,
                    message: "Enter a valid Aadhar number in the format XXXX XXXX XXXX (excluding spaces).",
                  },
                }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    sendotp={(!aadharVerified && !isAadharAlreadyVerified) || !isAadharVintage}
                    error={errors2.aadhar?.message && !aadharVerified && !isAadharAlreadyVerified ? true : false}
                    type={aadharVerified ? "text" : "number"}
                    id="aadhar-number"
                    // onChange={(e) => setAadhar(e.target.value)}
                    variant="outlined"
                    fullWidth
                    placeholder="Enter your Aadhar Card Number"
                    InputProps={{
                      readOnly: (aadharVerified || isAadharAlreadyVerified) && isAadharVintage,
                      className: (aadharVerified || isAadharAlreadyVerified) && isAadharVintage ? "bg-[#F4F7FA99]" : "",
                      endAdornment: (
                        <InputAdornment className="!pr-0 flex items-center gap-x-[10px]" position="end">
                          {errors2.aadhar?.message && !aadharVerified && !isAadharAlreadyVerified && (
                            <Tooltip
                              tooltipContent={<p className=" text-2xs">{errors2.aadhar.message}</p>}
                              tooltipTrigger={
                                <svg
                                  width="16"
                                  height="17"
                                  viewBox="0 0 16 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.00016 5.98334V8.65M8.00016 11.3167H8.00683M14.6668 8.65C14.6668 12.3319 11.6821 15.3167 8.00016 15.3167C4.31826 15.3167 1.3335 12.3319 1.3335 8.65C1.3335 4.96811 4.31826 1.98334 8.00016 1.98334C11.6821 1.98334 14.6668 4.96811 14.6668 8.65Z"
                                    stroke="#F04438"
                                    stroke-width="1.33333"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              }
                            />
                          )}
                          {(aadharVerified || isAadharAlreadyVerified) && isAadharVintage ? (
                            <VerifyTag />
                          ) : (
                            <DialogTrigger disabled={field.value.length == 0}>
                              <Button
                                disabled={field.value.length == 0}
                                loading={aadharOtpLoading}
                                onClick={handleSubmit2(handleAadharOtp)}
                                className="min-w-fit !p-3 !py-[6px] !h-fit max-h-[32px]"
                                variant={ButtonVariant.primary}
                              >
                                <p className="text-sm font-semibold">Send OTP</p>
                              </Button>
                            </DialogTrigger>
                          )}
                        </InputAdornment>
                      ),
                    }}
                    className="!mt-[6px]"
                  />
                )}
              />

              <p className="text-3xs text-gray-500 mt-[6px]">
                OTP will be sent to the mobile no. linked to your Aadhaar Card
              </p>
            </div>
          ) : null}

          {userDetails?.name && isAadharVintage ? (
            <div className="col-span-2">
              <p className="text-xs text-gray-500">
                Full Name<span className="text-error-500">*</span>
              </p>
              <Controller
                name="fullname"
                control={control}
                rules={{
                  required: "Enter Name to continue",
                }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    error={errors.fullname?.message ? true : false}
                    id="full-name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      readOnly: (aadharVerified || isAadharAlreadyVerified) && isAadharVintage,
                      className: (aadharVerified || isAadharAlreadyVerified) && isAadharVintage ? "bg-[#F4F7FA99]" : "",
                      endAdornment: (
                        <InputAdornment position="end">
                          {userDetails.name && (isAadharAlreadyVerified || aadharVerified) ? <VerifyTag /> : null}
                          {errors.fullname?.message && (
                            <Tooltip
                              tooltipContent={<p className=" text-2xs">{errors.fullname.message}</p>}
                              tooltipTrigger={
                                <svg
                                  width="16"
                                  height="17"
                                  viewBox="0 0 16 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.00016 5.98334V8.65M8.00016 11.3167H8.00683M14.6668 8.65C14.6668 12.3319 11.6821 15.3167 8.00016 15.3167C4.31826 15.3167 1.3335 12.3319 1.3335 8.65C1.3335 4.96811 4.31826 1.98334 8.00016 1.98334C11.6821 1.98334 14.6668 4.96811 14.6668 8.65Z"
                                    stroke="#F04438"
                                    stroke-width="1.33333"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              }
                            />
                          )}
                          {/* <Button className="min-w-fit !p-3 !py-[6px] !h-fit" variant={ButtonVariant.primary}>
                    <p className="text-sm font-semibold">Send OTP</p>
                  </Button> */}
                        </InputAdornment>
                      ),
                    }}
                    className="!mt-[6px] "
                  />
                )}
              />
              {/* <p className="text-3xs text-gray-500 mt-[6px]">
            Mandatory as per SEBI rules (OTP will be sent to the mobile no. linked to your Aadhar Card)
          </p> */}
            </div>
          ) : null}
          {(isAadharAlreadyVerified && isAadharVintage && !isPanAlreadyVerified) ||
          userDetails.pan ||
          (userDetails.aadhar && !userDetails.pan) ? (
            <>
              <div className="col-span-2">
                <p className="text-xs text-gray-500">
                  PAN Number<span className="text-error-500">*</span>
                </p>
                <Controller
                  name="pan"
                  control={control}
                  rules={{
                    required: "Enter PAN to continue",
                    pattern: {
                      value: userDetails.maskedPan ? /^XXXXXX[0-9]{3}[A-Z]{1}$/ : /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                      message: "Enter a valid Pan number in the format XXXXX0000X",
                    },
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      id="pan-number"
                      type="text"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                        className: (userDetails.pan ? true : false) || isPanAlreadyVerified ? "bg-[#F4F7FA99]" : "",
                        endAdornment: (
                          <InputAdornment position="end">
                            {isPanAlreadyVerified || userDetails.pan ? (
                              <VerifyTag />
                            ) : (
                              <button
                                className=" "
                                onClick={() => {
                                  // setOpenDialog(true);
                                  handleVerifyAadharOtp();
                                }}
                              >
                                {loading ? (
                                  <span className=" inline-flex items-center justify-center gap-x-1">
                                    <Loader color="#12B76A" fontSize={12} height={12} width={12} />
                                    <p className=" text-2xs text-[#12B76A]">Verifying</p>
                                  </span>
                                ) : (
                                  <p className=" text-2xs text-brand-500 border-b border-dashed border-b-brand-500">
                                    Verify Pan
                                  </p>
                                )}
                              </button>
                            )}
                            {/* <Button className="min-w-fit !p-3 !py-[6px] !h-fit" variant={ButtonVariant.primary}>
                    <p className="text-sm font-semibold">Send OTP</p>
                  </Button> */}
                          </InputAdornment>
                        ),
                      }}
                      className="!mt-[6px] "
                    />
                  )}
                />
              </div>
            </>
          ) : null}
          {/* || isAadharAlreadyVerified */}
          {/* || userDetails.address */}
          {/* {(aadharVerified || userDetails.address) && (
            <div className="col-span-2">
              <p className="text-xs text-gray-500">
                Billing Address<span className="text-error-500">*</span>
              </p>
              <Controller
                name="address"
                control={control}
                rules={{
                  required: "Enter address to continue",
                }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    id="address"
                    type="text"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      className: (userDetails.address ? true : false) ? "bg-[#F4F7FA99]" : "",
                      endAdornment: <InputAdornment position="end"></InputAdornment>,
                    }}
                    className="!mt-[6px]  !py-[9px] !pr-[6px] !rounded-[6.2px] !border-[#0000000F]"
                  />
                )}
              />
            </div>
          )} */}
          {(aadharVerified || userDetails.address) && (
            <div className="col-span-2">
              <div>
                <p className="text-xs text-gray-500">
                  Billing Address<span className="text-error-500">*</span>
                </p>
                <Controller
                  name="address"
                  control={control}
                  rules={{
                    required: "Enter address to continue",
                    minLength: {
                      value: 3,
                      message: "Enter valid address",
                    },
                    pattern: {
                      value:
                        (billingSameAsAadhar && !isAadharAlreadyVerified) ||
                        (isAadharAlreadyVerified && preExistingAddress === userDetails.address)
                          ? /^[\s\S]*$/
                          : /^\d{6}$/,
                      message: "Enter a valid pincode.",
                    },
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      id="address"
                      error={errors.address?.message ? true : false}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          if (Number.isNaN(Number(field.value))) {
                            setValue("address", "");
                          }
                          setPincodeVerified(false);
                          setPincodeBasedAddress("");
                        }
                      }}
                      placeholder="Enter Pincode"
                      confirmAddress={pincodeBasedAddress ? true : false}
                      type={
                        (billingSameAsAadhar && !isAadharAlreadyVerified) ||
                        (isAadharAlreadyVerified && field.value === userDetails.address)
                          ? "text"
                          : "number"
                      }
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        readOnly: billingSameAsAadhar && !isAadharAlreadyVerified ? true : false,
                        // billingSameAsAadhar ? true : false,
                        className: (billingSameAsAadhar && !isAadharAlreadyVerified ? true : false)
                          ? "bg-[#F4F7FA99]"
                          : "",
                        endAdornment: (
                          <InputAdornment position="end">
                            {(billingSameAsAadhar && !isAadharAlreadyVerified) ||
                            (isAadharAlreadyVerified && field.value === userDetails.address) ? null : (
                              <>
                                {errors.address?.message && (
                                  <Tooltip
                                    tooltipContent={<p className=" text-2xs">{errors.address?.message}</p>}
                                    tooltipTrigger={
                                      <svg
                                        width="16"
                                        height="17"
                                        viewBox="0 0 16 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M8.00016 5.98334V8.65M8.00016 11.3167H8.00683M14.6668 8.65C14.6668 12.3319 11.6821 15.3167 8.00016 15.3167C4.31826 15.3167 1.3335 12.3319 1.3335 8.65C1.3335 4.96811 4.31826 1.98334 8.00016 1.98334C11.6821 1.98334 14.6668 4.96811 14.6668 8.65Z"
                                          stroke="#F04438"
                                          stroke-width="1.33333"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    }
                                  />
                                )}
                                <button
                                  disabled={checkingPincode || (pincodeBasedAddress ? true : false)}
                                  className=" ml-[10px] "
                                  onClick={() => {
                                    if (!/^\d{6}$/.test(field.value)) {
                                      setError("address", { message: "Enter valid pincode to continue." });
                                      return;
                                    }
                                    handlePincode(field.value);
                                    // setOpenDialog(true);
                                  }}
                                >
                                  {pincodeBasedAddress && !errors.address?.message ? (
                                    <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon" />
                                  ) : checkingPincode ? (
                                    <span className=" inline-flex items-center justify-center gap-x-1">
                                      <Loader color="#12B76A" fontSize={12} height={12} width={12} />
                                      <p className=" text-2xs text-[#12B76A]">Checking</p>
                                    </span>
                                  ) : (
                                    <p className=" text-2xs text-brand-500 border-b border-dashed border-b-brand-500">
                                      Check
                                    </p>
                                  )}
                                </button>
                              </>
                            )}
                          </InputAdornment>
                        ),
                      }}
                      className={`!mt-[6px]  ${
                        pincodeBasedAddress ? " [&>.fieldset]:!rounded-t-lg pb-0" : " !rounded-[6.2px]"
                      }    !border-[#0000000F]`}
                    />
                  )}
                />
                {pincodeBasedAddress && !billingSameAsAadhar && (
                  <div
                    id="pincode-address"
                    className="  text-sm py-[9px] px-[11px] rounded-b-lg border border-[#0000000F] bg-[#F9FAFC]"
                  >
                    {pincodeBasedAddress}
                  </div>
                )}

                {!isAadharAlreadyVerified ? (
                  <div className=" flex items-center gap-x-2 mt-3">
                    <Checkbox
                      checked={billingSameAsAadhar}
                      onCheckedChange={(checked) => {
                        if (!checked) {
                          setValue("address", "");
                        } else {
                          setError("address", { message: "" });
                          setPincodeVerified(false);
                          setPincodeBasedAddress("");
                        }
                        setValue("address", userDetails?.address);

                        setBillingSameAsAadhar(checked as boolean);
                      }}
                      id="billingAadharAddress"
                    />

                    <p className=" text-sm text-[#475467]">Billing address is the same as Aadhar address</p>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          <div className=" col-span-full sm:col-span-1">
            <p className="text-xs text-gray-500">
              Email ID<span className="text-error-500">*</span>
            </p>
            <div className="flex">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Enter email to continue",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter a valid email",
                  },
                }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    error={
                      errors.email?.message || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(field.value) ? true : false
                    }
                    id="email"
                    type="text"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail size={15} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          {errors.email?.message || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(field.value) ? (
                            <Tooltip
                              tooltipContent={
                                <p className=" text-2xs">{errors.email?.message ?? "Enter valid email"}</p>
                              }
                              tooltipTrigger={
                                <svg
                                  width="16"
                                  height="17"
                                  viewBox="0 0 16 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.00016 5.98334V8.65M8.00016 11.3167H8.00683M14.6668 8.65C14.6668 12.3319 11.6821 15.3167 8.00016 15.3167C4.31826 15.3167 1.3335 12.3319 1.3335 8.65C1.3335 4.96811 4.31826 1.98334 8.00016 1.98334C11.6821 1.98334 14.6668 4.96811 14.6668 8.65Z"
                                    stroke="#F04438"
                                    stroke-width="1.33333"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              }
                            />
                          ) : field.value ? (
                            <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon" />
                          ) : null}
                        </InputAdornment>
                      ),
                    }}
                    className="!mt-[6px]"
                  />
                )}
              />
            </div>
            <p className="text-3xs text-gray-500 mt-[6px]">You will get your invoice on email</p>
          </div>
          <div className="col-span-full sm:col-span-1">
            <p className="text-xs text-gray-500">
              Mobile Number<span className="text-error-500">*</span>
            </p>
            <div className="flex">
              <div
                className={`  w-full !mt-[6px] flex items-center border hover:border-black ${
                  phoneFocused ? " border-[1px] hover:border-[#00645A] border-[#00645A] border-collapse" : ""
                }  ${
                  errors.phone?.message ? "border-[#FDA29B]" : "border-[#0000000F]"
                }  rounded-[6.2px] py-[9px] px-[14px] pr-[11px] flex items-center "
                `}
              >
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Enter phone to continue",
                    validate: (value) => {
                      return isPossiblePhoneNumber(value) && value.slice(3).length === 10
                        ? true
                        : "Enter valid mobile number";
                    },
                  }}
                  render={({ field: { value, onChange } }) => (
                    <>
                      {" "}
                      <PhoneInput
                        onFocus={() => setPhoneFocused(true)}
                        onBlur={() => setPhoneFocused(false)}
                        value={value}
                        onChange={onChange}
                        defaultCountry="IN"
                        placeholder="Enter phone number"
                        className=" border-green-400 text-sm"
                      />
                      <InputAdornment position="end">
                        {errors.phone?.message || !isPossiblePhoneNumber(value) || value.slice(3).length != 10 ? (
                          <Tooltip
                            tooltipContent={
                              <p className=" text-2xs">{errors.phone?.message || "Enter valid phone number."}</p>
                            }
                            tooltipTrigger={
                              <svg
                                width="16"
                                height="17"
                                viewBox="0 0 16 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.00016 5.98334V8.65M8.00016 11.3167H8.00683M14.6668 8.65C14.6668 12.3319 11.6821 15.3167 8.00016 15.3167C4.31826 15.3167 1.3335 12.3319 1.3335 8.65C1.3335 4.96811 4.31826 1.98334 8.00016 1.98334C11.6821 1.98334 14.6668 4.96811 14.6668 8.65Z"
                                  stroke="#F04438"
                                  stroke-width="1.33333"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            }
                          />
                        ) : isPossiblePhoneNumber(value) ? (
                          <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon" />
                        ) : null}
                      </InputAdornment>
                    </>
                  )}
                />
              </div>

              {/* <CustomTextField
              id="phone"
              type="text"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment:(
                  <InputAdornment position="start">
                  <Mail size={15}/>
                </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon"/>
                  </InputAdornment>
                ),
              }}
              className="!mt-[6px]  !pr-[6px] !rounded-[6.2px]"
            /> */}
            </div>
            <p className="text-3xs text-gray-500 mt-[6px]">You will get stock action calls on WhatsApp</p>
          </div>

          <div className="col-span-2 mt-5 ">
            {/* <p className=" text-display-sm text-red-500 flex-1">{(!aadharVerified && !isAadharAlreadyVerified) || email?.length === 0 || mobile?.length === 0 || (!Number.isNaN(Number(address)) && !pincodeBasedAddress) ? "true": "false"}</p> */}
            <Button
              disabled={
                (!aadharVerified && !isAadharAlreadyVerified) ||
                email?.length === 0 ||
                mobile?.length === 0 ||
                (!Number.isNaN(Number(address)) && !pincodeBasedAddress) ||
                (!isPanAlreadyVerified && !userDetails.maskedPan)
              }
              loading={checkoutLoading}
              onClick={handleSubmit(handleCheckout)}
              className=" w-full"
              variant={ButtonVariant.primary}
            >
              <p className=" text-sm font-medium">Proceed to Checkout</p>
            </Button>
          </div>
        </div>
        {displayModal.includes("AADHAR") && !displayFailedAddharModal ? (
          <AadhaVerifyModal
            setAadharRequestId={setAadharRequestId}
            setOpenDialog={setOpenDialog}
            setDisplayModal={setDisplayModal}
            displayModal={displayModal}
            openDialog={openDialog}
            aadhar={aadhar}
            requestId={aadharRequestId}
            setBillingSameAsAadhar={setBillingSameAsAadhar}
            setDisplayFailedAddharModal={setDisplayFailedAddharModal}
          />
        ) : null}
        {displayModal.includes("CONFIRM") && !displayFailedAddharModal ? (
          <ConfirmDetailsModal
            setDisplayModal={setDisplayModal}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        ) : null}
        {displayFailedAddharModal ? (
          <DialogContent
            closeClassName=" -right-2 -top-[12px] opacity-100"
            className=" !p-6 !rounded-[20px] w-[calc(100%-32px)]  md:min-w-[400px] max-w-[400px] open_sans"
          >
            <div>
              <img src="/assets/failed_aadhar_fetch.svg" alt="error-image" />
              <h2 className=" font-bold text-xl mt-6">We’re having trouble fetching your Aadhaar details!</h2>
              <p className=" text-sm text-[#737373] mt-3">
                Oops! 🚧
                <br />
                Our system’s having a coffee break while fetching Aadhaar details. Please try again a few times or check
                back in 15-20 minutes. Thanks for understanding and for being awesome!
              </p>
              <div className=" flex  items-center gap-x-[10px] mt-6 ml-auto w-fit">
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      setDisplayFailedAddharModal(false);
                    }}
                    variant={ButtonVariant.tertiary}
                  >
                    Close
                  </Button>
                </DialogClose>
                <Button
                  loading={aadharOtpLoading}
                  onClick={() => {
                    if (isAadharAlreadyVerified || aadharVerified) {
                      handleVerifyAadharOtp();
                    } else {
                      handleAadharOtp({ aadhar });
                    }
                    setDisplayFailedAddharModal(false);
                    // handleAadharOtp({ aadhar });
                  }}
                  variant={ButtonVariant.primary}
                >
                  Try again
                </Button>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
}

//GSTIN

{
  /* <div className="col-span-2 flex space-x-2 items-center">
            <Checkbox
              checked={gstChecked}
              onCheckedChange={(checked) => setGstChecked(checked as boolean)}
              id="GSTIN"
            />
            <p className=" text-sm text-gray-950">Use GSTIN for this order</p>
          </div>

          {gstChecked && (
            <div className="col-span-2 p-4 border rounded-xl border-gray-150">
              <p className="text-xs text-gray-500">
                GST Details<span className="text-error-500">*</span>
              </p>
              <div className="flex">
                <Controller
                  name="gstin"
                  control={control}
                  rules={{
                    required: { value: gstChecked ? true : false, message: "Enter Gst Details to continue." },
                    pattern: {
                      value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                      message: "Enter valid gst",
                    },
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      id="gst"
                      error={errors.gstin?.message ? true : false}
                      type="text"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {errors.gstin?.message ? (
                              <Tooltip
                                tooltipContent={<p className=" text-2xs">{errors.gstin.message}</p>}
                                tooltipTrigger={
                                  <svg
                                    width="16"
                                    height="17"
                                    viewBox="0 0 16 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.00016 5.98334V8.65M8.00016 11.3167H8.00683M14.6668 8.65C14.6668 12.3319 11.6821 15.3167 8.00016 15.3167C4.31826 15.3167 1.3335 12.3319 1.3335 8.65C1.3335 4.96811 4.31826 1.98334 8.00016 1.98334C11.6821 1.98334 14.6668 4.96811 14.6668 8.65Z"
                                      stroke="#F04438"
                                      stroke-width="1.33333"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                }
                              />
                            ) : field.value ? (
                              <img height={15} width={15} src="/assets/check_icon.svg" alt="check_icon" />
                            ) : null}
                          </InputAdornment>
                        ),
                      }}
                      className="!mt-[6px]  !pr-[6px] !rounded-[6.2px]"
                    />
                  )}
                />
              </div>
            </div>
          )} */
}
