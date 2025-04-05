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
    fontSize: 14,
    marginBottom: 8,
    // textAlign: "center",
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
    fontWeight: "bold",
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
      <Text style={styles.header}>Terms and Conditions for KamayaKya Research Services</Text>
      <Text style={styles.sectionTitle}>Scope of Services (Research Only, No Trade Execution)</Text>
      <Text>
        KamayaKya Wealth Management (the "Research Analyst" or "RA") provides{" "}
        <Text style={styles.semibold}>research services only.</Text> The RA will offer investment research, analysis,
        and recommendations as per SEBI (Research Analyst) Regulations, 2014, but{" "}
        <Text style={styles.semibold}>will NOT execute any trades or transactions on your behalf.</Text> The Client is
        solely responsible for making their own investment decisions and placing any trade orders through their own
        brokerage or trading accounts.
        <Text style={styles.semibold}> Do not share your trading account credentials or OTPs with the RA,</Text> and
        never permit the RA to execute trades for you​. The RA’s role is limited to giving research-based advice in good
        faith; all trading and investment decisions are made by you at your own risk.
      </Text>
      <Text style={styles.sectionTitle}>Fees, Charges, and Payment Terms</Text>
      <Text>
        <Text style={styles.semibold}>Fee Structure: </Text>
        All fees for research services will be communicated to you before subscription. The RA abides by SEBI’s fee
        limits for individual clients –
        <Text style={styles.semibold}>
          {" "}
          the maximum fee chargeable is ₹1,51,000 per annum per “family” of a client (for individual or HUF clients)
          across all services​.
        </Text>{" "}
        This regulatory cap excludes applicable taxes and statutory levies, and it does not apply to non-individual
        clients or accredited investors​. KamayaKya will not charge more than this limit in aggregate in any year for
        you and your family as defined by SEBI.
      </Text>
      <Text>
        <Text style={styles.semibold}>Advance Payment Policy: </Text>
        Fees are typically collected in advance as per the subscription plan you choose. However, as per SEBI
        guidelines, the RA{" "}
        <Text style={styles.semibold}>cannot collect advance fees for a period exceeding one year </Text>(12 months) of
        services​. Any advance amount received for future services beyond the current year will be appropriately
        adjusted or refunded if services are terminated early (see <Text style={styles.semibold}>Refund Policy</Text>{" "}
        below). If you are on an <Text style={styles.semibold}>auto-renewal plan</Text>, you authorize the RA to
        automatically charge the applicable fee at the end of each subscription period for the next period, unless you
        cancel the service before the renewal date. Auto-renewal ensures uninterrupted access to research, and you can
        opt out of it at any time by providing notice or via the provided platform settings (no questions asked).
      </Text>
      <Text>
        <Text style={styles.semibold}>Payment Modes: </Text>
        The Client shall pay the subscription fees using approved, traceable payment methods only. We accept payments
        via<Text style={styles.semibold}> online bank transfer (NEFT/IMPS/RTGS), UPI, cheque/Demand Draft</Text>, or
        other digital payment gateways.{" "}
        <Text style={styles.semibold}>Cash payments are not accepted under any circumstances​</Text>. Additionally, you
        have the option to pay through the
        <Text style={styles.semibold}>Centralized Fee Collection Mechanism (CeFCoM)</Text> managed by BSE (the RAASB)​,
        which is a SEBI-recognized system for fee payments. All payments should be made to the designated account or
        channel as informed to you. We do not ask you to pay to any third-party or personal accounts; if anyone solicits
        such payments claiming to be from KamayaKya, please inform us immediately. Receipts or invoices for payments
        will be provided via email or through the platform for your records.
      </Text>
      <Text>
        <Text style={styles.semibold}>Statutory and Other Charges: </Text>
        The fees quoted are exclusive of any taxes or statutory charges unless stated otherwise. Applicable{" "}
        <Text style={styles.semibold}>Goods and Services Tax (GST)</Text> or other taxes will be added to the fee and
        communicated in the invoice. The RA does not charge any performance fees or hidden charges. Any third-party
        charges (for payment processing, etc.) will be disclosed or borne as per agreement. The RA’s fee structure will
        always comply with SEBI regulations and any RAASB directives, and any revision of fees or limits by regulators
        will be adopted in these Terms​.
      </Text>
      <Text style={styles.sectionTitle}>Refund Policy</Text>
      <Text>
        We strive for client satisfaction, but since market research is an intellectual service, refunds are subject to
        specific conditions. Refunds will be provided on a{" "}
        <Text style={styles.semibold}>pro-rata basis for any unused service period</Text> only in certain justified
        cases, as outlined below, and after assessing the circumstances in line with SEBI guidelines​. Please note that
        some scenarios do <Text style={styles.semibold}>not entitle the client to a refund.</Text> Below we clarify both
        non-refundable scenarios and eligible refund scenarios:
      </Text>
      <Text style={styles.sectionTitle}>Cases Where No Refund Will Be Provided:</Text>
      <View style={{ paddingLeft: 16 }}>
        <Text>
          <Text style={styles.listItem}>• Services Delivered as Agreed: </Text>
          If the RA has provided all research reports and services as per the agreed terms and there is no deficiency or
          breach from the RA’s side, mere dissatisfaction of the client with outcomes is not grounds for a refund.
          Research recommendations are not guaranteed to succeed (investments are subject to market risk), so a
          difference in expectations is not refundable.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Disruptions Beyond RA’s Control: </Text>
          If the RA is temporarily unable to deliver services due to reasons beyond its control – for example, technical
          issues, server downtime, telecom failures, or other operational impediments – a refund will generally not be
          issued. However, if a major disruption occurs, the RA may extend the subscription period to compensate for
          downtime, at its sole discretion​. No refund is due in such force majeure situations (including natural
          disasters, pandemics, or other events outside RA’s control) so long as the RA makes good-faith efforts to
          resume services.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Full Subscription Consumed: </Text>
          If you have utilized the research service for the entire subscribed tenure (e.g., you subscribed for 3 months
          and that period has concluded), then no refund is applicable for that completed term​. Refunds, if any, only
          apply to unutilized remaining time on a subscription.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Partial Use Without Formal Termination: </Text>
          If you stop using the services or ignore the research advice but do not formally cancel or request termination
          in writing with valid reason, the RA is not obliged to offer any refund for the period of non-usage​. To be
          eligible for a refund upon early exit, you must notify the RA in writing (email is acceptable) at least 10
          days in advance with your intent to terminate and the reason​. Without such notice, unused time will not be
          refunded.
        </Text>
        <Text>
          <Text style={styles.listItem}>• No Refund for Partial Month: </Text>
          The RA will not prorate fees for parts of a month that have already started. Refunds, if applicable, are
          calculated only for full months/quarters that are completely unutilized. For example, if you paid for a
          quarter (3 months) starting February 1 and decide to terminate on March 10, the service for February and March
          is considered started/used, so no refund for March; only the full unused month of April would be eligible for
          refund​.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Market Losses or Adverse Performance: </Text>
          If your portfolio incurs losses or does not perform as expected based on the RA’s recommendations, this is not
          a valid reason for a refund​. The RA does not guarantee any returns (see Disclaimers section), and the client
          bears responsibility for investment outcomes. Refunds are not a remedy for poor market performance.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Client Violation of Terms: </Text>
          If you (the client) breach any of these Terms & Conditions or engage in misconduct, the RA reserves the right
          to deny refunds. For instance, if a client is found misusing the research (unauthorized sharing, plagiarism)
          or provided false information during signup (e.g., fraudulent KYC documents), no refund will be given and the
          service may be terminated immediately​. Similarly, any fraudulent activity or illegal use of the service by
          the client voids any refund claim.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Regulatory Non-Compliance by Client: </Text>If the client is found to be
          violating any laws or regulations in relation to the RA’s services – for example, misusing research reports in
          a manner forbidden by SEBI regulations or circulating them without authorization – the RA may terminate the
          service without refund​. No refund will be granted if termination is due to the client’s unlawful actions or
          regulatory breaches.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Non-Refundable Charges: </Text>Certain one-time charges, such as onboarding or
          administrative fees (if explicitly stated at the time of subscription as non-refundable), will not be refunded
          in any case. These would be clearly identified to you before payment, and by subscribing you acknowledge that
          such charges are final and not subject to return​.
        </Text>
      </View>
      <Text style={styles.sectionTitle}>Cases Where the Client is Entitled to a Refund:</Text>
      <View style={{ paddingLeft: 16 }}>
        <Text>
          <Text style={styles.listItem}>• Client’s Early Termination (Voluntary): </Text>You are free to terminate the
          service before the end of your subscription term, if desired. Provided you have given the required notice as
          described above and none of the “No Refund” scenarios apply, you will be entitled to a pro-rata refund of the
          fee for the remaining unused period of your subscription​. For example, if you paid for 6 months and decide to
          exit after 4 months with proper notice, you would receive a refund for the last 2 months. (Note: If any part
          of a quarter/month is ineligible as explained above, that portion won’t be counted for refund calculation.)
        </Text>
        <Text>
          <Text style={styles.listItem}>• RA’s Inability to Continue (RA’s Early Termination): </Text>If the RA itself
          terminates or suspends the service before your subscription period is over (for reasons other than your
          breach), you will receive a pro-rata refund for the unexpired portion of the subscription that you had paid
          for​. This includes scenarios where the RA voluntarily discontinues the service or cannot service you for any
          reason within their control.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Regulatory Action on RA: </Text>If the RA’s SEBI registration is suspended for
          more than 60 days or cancelled due to regulatory action, or if any government/regulatory order restrains the
          RA from providing services, the agreement will be terminated and the RA shall refund the balance fees for the
          remaining period on a pro-rata basis​. In other words, from the effective date of such suspension/cancellation
          until the end of your paid term, fees will be returned to you. Similarly, if the RA is barred from operating
          (e.g., SEBI or RAASB suspends the RA’s license), you are entitled to a refund for the unused period​. We
          prioritize client interest in such cases of regulatory intervention.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Overcharging or Double Payment: </Text>In the unlikely event that you were
          charged fees in excess of the regulatory limit or charged twice by mistake, any excess amount will be fully
          refunded​. For instance, if you accidentally made a duplicate payment or if fees charged exceeded ₹1.51 lakhs
          per annum (contrary to SEBI’s limit), the extra payment will be returned to you. The RA regularly audits
          billing to prevent this, but clients should report any suspected overcharge for prompt correction.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Centralized Payment (CeFCoM) Refunds: </Text>If you paid via the CeFCoM system
          and later the service is terminated (either by you or by the RA), any eligible refund will be processed
          through the same CeFCoM mechanism​. This ensures compliance with BSE/RAASB protocols and a proper audit trail.
          The refund amount and process will follow CeFCoM’s standard procedure so that the money is credited back to
          your linked bank account or wallet as per that system’s design.
        </Text>
      </View>
      <Text>
        <Text style={styles.listItem}>Refund Process: </Text>To request a refund, the client must send a formal
        communication to the RA – for example, an email to our official support or compliance email – clearly stating
        the reason for termination and refund request. The RA will acknowledge and review the request against the
        conditions above. If approved, refunds are processed within 30 days from approval of the request​. Refunds will
        be credited by NEFT or cheque. For compliance reasons, cash refunds are not provided and the RA will not refund
        to third-party accounts or in someone else’s name​. All refund calculations are done in good faith, on a
        pro-rated (time-apportioned) basis, rounding down to the nearest full unused month or quarter as applicable.
      </Text>
      <Text style={styles.sectionTitle}>Client Responsibilities and Conduct</Text>
      <Text>
        By subscribing to KamayaKya’s research services, you agree to certain responsibilities as a client to ensure a
        fair and compliant use of our offerings:
      </Text>
      <View style={{ paddingLeft: 16 }}>
        <Text>
          <Text style={styles.listItem}>• Personal Use of Advice: </Text>The research reports, stock recommendations,
          model portfolios, and other content we provide are for your personal use only as the subscribing client. You
          must not duplicate, distribute, or share our paid research materials with others (whether publicly or
          privately) without explicit permission. Unauthorized sharing or reselling of our intellectual property is a
          breach of this Agreement and SEBI regulations.
        </Text>
        <Text>
          <Text style={styles.listItem}>• No Misrepresentation: </Text>You shall not misrepresent yourself as an agent,
          employee, or representative of the RA. You are a client, and you cannot make any commitments or statements to
          third parties on behalf of KamayaKya. You must not use the RA’s name or logo except in a truthful manner (for
          instance, you may say you are a client, but you cannot give investment advice to others under our name).{" "}
        </Text>
        <Text>
          <Text style={styles.listItem}>• Provide Accurate Information: </Text>All information that you provide to the
          RA (contact details, financial details if any, suitability-related info, etc.) must be true, accurate, and
          complete. If there are updates (change of address, email, phone, marital status affecting “family” definition,
          etc.), you should inform us promptly. The RA is not liable for any service issues or compliance issues arising
          from outdated or incorrect information provided by the client​.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Abide by Market Regulations: </Text>If there is an online platform or
          community aspect to the service (forums, chat groups, etc.), you agree to conduct yourself respectfully. Do
          not engage in abusive, hateful, or illegal communications. The RA may revoke access if a client is found
          spreading false information, rumors, or performing misconduct such as unauthorized publishing of our research
          content​.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Consent and Understanding: </Text>By accepting these Terms, you confirm that
          you have read and understood all conditions, including the fee structure and risks involved, as required under
          SEBI’s regulations​. You acknowledge the Do’s and Don’ts for clients dealing with Research Analysts as
          published by SEBI (see Investor Charter section below) and agree to adhere to those guidelines​. Your
          agreement to these Terms is taken as your informed consent to avail the research services under the stated
          conditions​.
        </Text>
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
      </View>
      <Text>
        Failure to uphold the above responsibilities may lead to suspension or termination of your access to the
        services, and in serious cases, regulatory reporting. We value fair use and compliance to protect all clients
        and the integrity of our service.
      </Text>
      <Text style={styles.sectionTitle}>Research Analyst’s Responsibilities and Commitments</Text>
      <Text>
        KamayaKya, as a SEBI-registered Research Analyst, commits to maintaining the highest standards of integrity and
        compliance. Our key responsibilities to you include:
      </Text>
      <View style={{ paddingLeft: 16 }}>
        <Text>
          <Text style={styles.listItem}>• Regulatory Compliance: </Text>We confirm that we are duly registered with SEBI
          as a Research Analyst (Registration No. INH000009843), and we possess the necessary qualifications and
          certifications to offer these services​. We will comply with all provisions of the SEBI (Research Analyst)
          Regulations, 2014, and all circulars/guidelines issued thereunder, as well as any rules imposed by the RAASB
          (currently BSE)​. Any material changes (such as suspension or cancellation of our SEBI registration) will be
          promptly communicated to clients, and necessary actions (including refunds if applicable) will be taken as per
          regulations.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Ethical Conduct and Conflict of Interest: </Text>The RA will abide by the Code
          of Conduct as prescribed by SEBI. We will act honestly and in good faith in our dealings with you. If we
          identify any actual or potential conflict of interest in giving you advice (for example, if our analysts hold
          a position in a stock being recommended), we will disclose such conflicts to you and take steps to mitigate
          them​. The RA will not put its own interests above the client’s interests and will ensure fairness in all
          recommendations. We also strictly follow trading restrictions – for instance, our team is typically barred
          from trading ahead on a recommendation we are about to release, as per regulations.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Service Quality and Transparency: </Text>We strive to provide research that is
          thorough, up-to-date, and compliant with SEBI’s research analyst guidelines. All reports will include
          necessary disclosures (such as holding or interest of the RA in the securities, if any, and detailed rationale
          for recommendations). We do not guarantee that our research will always be profitable (see Disclaimer below),
          but we assure that it will be prepared with due care, skill, and diligence. We will not knowingly hide
          material facts or mislead the client. If at any time we discover an error in our published research or a
          needed update (e.g., a drastic change in market conditions affecting a recommendation), we will inform clients
          as soon as possible.
        </Text>
        <Text>
          <Text style={styles.listItem}>• No Inducement or Unlawful Offers: </Text>The RA will never offer any
          inducement or promise of assured returns to solicit clients. We do not run any schemes that are prohibited,
          such as guaranteed profit plans or quick-rich tips. Any such representation, if made by any employee or
          associate of the RA, should be reported and is against our policy. We uphold SEBI’s prohibition on
          assured/guaranteed returns or fixed return schemes​. All performance examples provided (if any) are for
          illustration and are not promises of future results.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Confidentiality: </Text>Except as required to perform the services or by law,
          the RA will keep all your personal and financial information confidential. We have internal controls to ensure
          that client information is not misused. We will not divulge your identity or personal data in our public
          research reports. Data sharing, if any, will only be done with your consent and with reliable service
          providers as mentioned in the Data Privacy section. We will never sell your data to third-party marketers.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Continuous Compliance and Improvement: </Text>The regulatory environment may
          evolve, and the RA will adapt to all new compliance requirements. For example, we adhere to the latest SEBI
          circulars including the Master Circular of May 21, 2024 and the Feb 17, 2025 circular (MITC). We will also
          implement any directives from the RAASB or stock exchanges related to research analysts. Clients will be
          notified of any significant change in regulations that impacts the terms of our services. Any voluntary
          additional clauses or features we introduce will not contravene SEBI regulations, and we will give you prior
          notice before making material changes to these Terms (see Amendments section below)​.
        </Text>
      </View>
      <Text>
        In summary, KamayaKya pledges to uphold all its duties as a registered RA, putting client interests first,
        avoiding conflicts, and operating in a transparent, lawful manner. Our SEBI registration, RAASB (BSE)
        enlistment, and NISM certifications affirm our credentials but, as required by SEBI, we clarify that these do
        not guarantee the performance of our recommendations or any returns to you​.
      </Text>
      <Text style={styles.sectionTitle}>Disclaimers and Risk Acknowledgment</Text>
      <Text>
        <Text style={styles.semibold}>Market Risks: </Text>
        All investments in the securities markets are subject to market risks, and the value or returns of investments
        can fluctuate. Past performance of any security or strategy is not indicative of future performance. Any
        investments made based on the RA’s recommendations are at the sole risk of the client​. The client should be
        prepared for the possibility of loss of capital and must invest only after considering their own risk tolerance.
        The RA’s research is one of the inputs in your decision-making; you should carefully evaluate each
        recommendation in light of your personal financial situation and do your own due diligence where necessary.
      </Text>
      <Text>
        <Text style={styles.semibold}>No Assurance of Returns: </Text>
        KamayaKya does not guarantee any fixed returns or profit from following our research advice​. We make no
        warranties that any recommendation will result in a profit or will not result in a loss. There is no assurance
        of any return, profit, or yield and no “recourse to claim losses” from the RA if investments do not perform as
        expected​. By accepting our services, you acknowledge that you cannot hold the RA responsible for market losses
        incurred based on our recommendations. All recommendations are our analysis and opinion, not a promise.
      </Text>
      <Text>
        <Text style={styles.semibold}>Information Accuracy: </Text>
        The information, analysis, and opinions presented by the RA are based on sources believed to be reliable and on
        our best professional judgment. However, the RA does not warrant the completeness or accuracy of the
        information. There may be errors or omissions, or the information may become outdated. We will try to update our
        research when new information emerges, but we do not guarantee real-time updates for all recommendations. The
        services are provided on an “as is” and “as available” basis without any express or implied warranties of any
        kind​. We specifically disclaim any warranties of merchantability or fitness for a particular purpose with
        respect to the research provided​.
      </Text>
      <Text>
        <Text style={styles.semibold}>No Fiduciary Relationship: </Text>
        The RA provides research recommendations to clients on a subscription basis. This does not create a personalized
        investment adviser-client fiduciary relationship in the legal sense (Research Analysts differ from Investment
        Advisers). While we strive to serve your best interests, the ultimate decision and responsibility lies with you,
        and we are not managing your portfolio or personal financial plan under these Terms.
      </Text>
      <Text>
        <Text style={styles.semibold}>No Liability for Outcomes: </Text>
        The RA, its directors, employees, and affiliates shall not be liable for any direct or indirect damages or
        losses arising from your use of the research services. This includes (but is not limited to) trading losses,
        lost profits, lost opportunities, or any incidental/consequential damages in connection with the use of our
        recommendations​. The entire risk of using the service lies with the client​. In any scenario, the maximum
        liability of the RA (if determined by a competent authority or court) will be limited to the fees paid by the
        client for the preceding few months of service. We will not be liable for matters beyond our control (see Force
        Majeure in Termination section). By agreeing to these Terms, you accept that KamayaKya will not be held
        responsible for trading decisions you make, and you release us from any claims or damages for outcomes
        experienced.
      </Text>
      <Text>
        <Text style={styles.semibold}>Regulatory Credentials Not an Endorsement: </Text>
        Our SEBI registration and certifications indicate authorization to operate and our adherence to competency
        requirements, but they do not imply SEBI’s endorsement of guaranteed success. SEBI or RAASB (BSE) does not
        certify the quality of our advice, and having a valid registration is not a warranty of performance​. Investors
        should not equate registration or certifications with assured gains. We include these disclaimers to ensure you
        clearly understand the risks and limitations inherent in our services. Always invest carefully and, if needed,
        seek independent financial advice to complement our research.
      </Text>
      <Text style={styles.sectionTitle}>Data Privacy and Consent</Text>
      <Text>
        Your privacy is important to us. KamayaKya collects and uses your personal information only for legitimate
        purposes connected with our services. By agreeing to these Terms, you consent to the following uses of your
        data:
      </Text>
      <View style={{ paddingLeft: 16 }}>
        <Text>
          <Text style={styles.listItem}>• Usage of Data: </Text>The personal and financial information you provide (such
          as contact details, PAN, KYC documents, etc.) will be used to onboard you, provide you with research reports,
          process payments, and comply with legal/regulatory requirements. We may also use your contact information to
          send service-related communications, account statements, subscription reminders, or important announcements.
          We will not use your data for any purpose that is not relevant to the services we offer or as required for
          compliance.
        </Text>
        <Text>
          <Text style={styles.listItem}>• RA’s Inability to Continue (RA’s Early Termination): </Text>If the RA itself
          terminates or suspends the service before your subscription period is over (for reasons other than your
          breach), you will receive a pro-rata refund for the unexpired portion of the subscription that you had paid
          for​. This includes scenarios where the RA voluntarily discontinues the service or cannot service you for any
          reason within their control.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Third-Party Sharing: </Text>The RA may need to share certain information with
          authorized third-party service providers or partners to effectively deliver services. For example, we might
          share data with a SEBI-registered KYC Registration Agency to verify your KYC, with payment gateways/banks to
          process transactions, or with email/SMS service providers to send you reports and alerts. Such sharing will be
          done on a need-to-know basis and in compliance with applicable privacy laws. By accepting these Terms, you
          consent to the RA sharing your information with such authorized agents or third-party vendors who are
          contractually bound to handle your data securely​. We do not sell or rent your personal information to any
          third party for marketing or any unrelated purposes.
        </Text>

        <Text>
          <Text style={styles.listItem}>• Exclusions: </Text>We will not share your data with any other entity for their
          own use without your consent. We also do not share your confidential information with other clients or
          unauthorized parties.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Legal Compliance and Disclosures: </Text>The RA may disclose your information
          if required by law, regulation, or governmental request, or to protect our rights or comply with judicial
          proceedings. For instance, we will cooperate with regulators like SEBI or law enforcement if they demand
          information, and we may share data to prevent fraud or to enforce these Terms (for example, to investigate a
          breach)​. Any such disclosure will be done only to the extent necessary and as per legal requirements.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Data Security: </Text>We implement standard security measures to protect your
          data from unauthorized access or leakage. However, you understand that no data transmission over the internet
          can be guaranteed 100% secure. We continuously review and update our security practices. In the unfortunate
          event of any data breach or security incident, we will inform affected clients and take remedial measures as
          required by law.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Retention and Deletion: </Text>We will retain your personal data for as long
          as you are our client and as needed to comply with record-keeping regulations (which may require us to keep
          certain records for a number of years even after you stop using the service). When no longer required, we will
          securely dispose of or anonymize your data. If you wish to withdraw consent or request deletion of your data,
          you can contact us. We will accommodate requests to the extent possible, provided it does not conflict with
          legal obligations.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Consent for Communication: </Text>You consent to receive communications from
          us or our partners related to the service. This includes emails, SMS, calls, or notifications about your
          subscription, research reports, payment alerts, or service updates. We may also send occasional updates about
          new features or products. You can opt out of non-essential communications by notifying us, but certain
          transactional or compliance-related communications cannot be opted out of.
        </Text>
      </View>
      <Text>
        For more details, please refer to our Privacy Policy (if provided separately). In summary, we respect your
        privacy and will only use your data to support your relationship with us, in line with applicable laws. If you
        have any concerns about your data, you may reach out to our Compliance/Grievance Officer (see Grievance
        Redressal section).
      </Text>
      <Text style={styles.sectionTitle}>Grievance Redressal and Dispute Resolution</Text>
      <Text>
        We are committed to addressing any grievances or issues you might face. If you have a complaint or feedback
        regarding our services, please follow these steps for resolution:
      </Text>
      <Text>
        <Text style={styles.semibold}>Step 1: Contact the RA: </Text>
        In case of any grievance (e.g., non-receipt of a report, incomplete information, service downtime, billing
        issues, etc.), you should first report it to our team. You can email our Grievance Officer (Nitya Shah) at
        nitya@kamayakya.com or call us at the phone number provided on our website​. Please provide details of your
        issue and any relevant information. We will acknowledge your complaint and strive to resolve it in a transparent
        and timely manner, typically within 21 calendar days of receiving it​. Our goal is to satisfactorily address
        your concern as quickly as possible.
      </Text>
      <Text>
        <Text style={styles.semibold}>Step 2: Escalation to SEBI SCORES: </Text>
        If you are not satisfied with our response, or if your complaint is not resolved within the promised timeframe,
        you have the right to escalate the matter. You can lodge a complaint on SEBI’s SCORES (SEBI Complaints Redress
        System) platform​. SCORES is an online portal (at scores.sebi.gov.in) where investors can file complaints
        against SEBI-registered intermediaries. When submitting a complaint on SCORES, select “Research Analyst” as the
        intermediary type and provide the required details (including our SEBI Registration number). We are obligated to
        respond to and address complaints forwarded through SCORES as well.
      </Text>
      <Text>
        <Text style={styles.semibold}>Step 3: Online Dispute Resolution (ODR): </Text>
        In the unlikely event that your grievance remains unresolved even after Step 2, you may seek redressal through
        SEBI’s approved Online Dispute Resolution mechanism​. SEBI has facilitated ODR which may involve mediation,
        conciliation, and/or arbitration as means to settle disputes. One such platform is the Smart ODR portal
        (smartodr.in)​. Through ODR, an independent mediator/arbitrator can help resolve the dispute in a binding manner
        without the need for court litigation. The procedure will be as specified by SEBI’s circulars. If both parties
        agree, the decision from the ODR process (especially arbitration awards) can be final and enforceable. Choosing
        ODR does not prejudice your rights to seek other legal remedies, but it is a faster and investor-friendly option
        encouraged by SEBI.
      </Text>
      <Text>
        <Text style={styles.semibold}>Jurisdiction: </Text>
        This Agreement is governed by the laws of India. Subject to the above ODR process, any legal action or
        proceeding arising out of these Terms that requires adjudication by courts shall be subject to the jurisdiction
        of the appropriate courts in Pune, Maharashtra, India (the location of the RA’s registered office). We encourage
        resolving matters amicably or through the mechanisms above before resorting to litigation.
      </Text>
      <Text>
        We hope to never reach Step 2 or 3 and will work hard to resolve issues at the first level. Your feedback and
        satisfaction are important to us. Also, clients are encouraged to read the SEBI Investor Charter for Research
        Analysts, which includes important "Dos and Don’ts" for grievance redressal and dealing with RAs​– following
        those guidelines will help in smoother resolution of issues.
      </Text>
      <Text style={styles.sectionTitle}>Termination of Services</Text>
      <Text>
        Either party (you or the RA) may terminate the research service engagement under the following conditions:
      </Text>
      <View style={{ paddingLeft: 16 }}>
        <Text>
          <Text style={styles.listItem}>• Voluntary Termination by Client: </Text>You have the right to terminate your
          subscription to the research service at any time by giving us written notice (an email is acceptable). We
          request at least 30 days’ notice if possible, so we can process your termination smoothly (especially for
          auto-renewing plans)​. Upon termination, your access to future research reports will cease at the end of the
          paid period or immediately if you request immediate termination. Any eligible refund for the remaining period
          will be handled as per the Refund Policy above. If you terminate and have an ongoing auto-renew mandate, we
          will cancel the mandate to prevent any further charges. There are no penalties for terminating the service;
          however, remember to cancel before your next billing date to avoid being charged for the next period.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Termination by RA (With Notice): </Text>he RA may terminate or suspend your
          subscription by giving you at least 15 days prior notice (except in cases of your misconduct, where immediate
          termination may occur). Such a scenario might occur if we decide to discontinue a particular research service
          or plan, or if serving you becomes impossible due to regulatory changes or other valid reasons. In such cases,
          we will either provide a pro-rata refund for any remaining period..
        </Text>
        <Text>
          <Text style={styles.listItem}>• Suspension/Termination for Client Breach: </Text>f you violate any material
          terms of this Agreement, engage in fraud, or misuse the services in a manner that is illegal or harms the RA’s
          interests or reputation, the RA reserves the right to suspend or terminate your access immediately, without
          prior notice​. For example, unauthorized sharing of our reports, harassment of our staff, or spreading
          misinformation can lead to such action​. In case of such termination due to your misconduct, you will not be
          entitled to any refund for the remaining period (as noted in the Refund Policy). Additionally, the RA may take
          legal action if required by law (for instance, if the breach involved infringement or fraud).
        </Text>
        <Text>
          <Text style={styles.listItem}>• Regulatory or Force Majeure Termination: </Text>The Agreement will be
          automatically terminated if the RA ceases to hold the requisite license/registration (e.g., our SEBI
          registration is cancelled) or if any law or government authority prohibits us from operating​. Similarly, the
          service may be terminated if unforeseen force majeure events (natural disasters, war, widespread
          internet/power failure, etc.) make it impossible for us to continue operations beyond a reasonable period. In
          case of RA’s registration being suspended beyond 60 days or cancelled by SEBI, we will initiate refunds for
          the unused period as described earlier​. If a force majeure event only causes temporary interruption, we may
          suspend services and resume when possible (with an extension of your subscription to compensate for the lost
          time rather than a refund).
        </Text>
        <Text>
          <Text style={styles.listItem}>• Death or Incapacitation: </Text>If the Client passes away or is rendered
          legally incapable of contracting during the subscription period, the service will terminate upon such event.
          The Client’s legal heirs or representatives may contact us to claim any refund for the remaining period (if
          the subscription was paid beyond the month of demise/incapacity), which we will consider on a case-by-case
          compassionate basis, notwithstanding the general No Refund policy for mid-term termination.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Outstanding Payments: </Text>Upon termination, the Client must settle any dues
          for services already rendered. For instance, if you subscribed on a post-paid arrangement (rare for RAs, but
          hypothetically) or there are any pending fee installments for the period you used, those become payable
          immediately. We will provide a statement of any such dues if applicable. Conversely, any refund due to you
          will be processed promptly.
        </Text>
      </View>
      <Text>
        After termination, you will no longer receive any research communication from us, and you are expected to delete
        or archive any confidential materials received (you may retain records for personal use, but all usage must
        still conform to the intellectual property terms—no sharing, etc.). The clauses regarding confidentiality,
        disclaimers, and liability in this Agreement survive the termination.
      </Text>
      <Text style={styles.sectionTitle}>Investor Charter and Client Guidelines</Text>
      <Text>
        In addition to the terms laid out above, clients should be aware of the broader guidelines and investor
        education materials provided by SEBI for those availing research analyst services:
      </Text>
      <View style={{ paddingLeft: 16 }}>
        <Text>
          <Text style={styles.listItem}>• SEBI Investor Charter for Research Analysts: </Text>SEBI has published an
          “Investor Charter” for Research Analyst services which outlines, in simple terms, what clients can expect,
          their rights, responsibilities, and the Do’s and Don’ts while dealing with RAs. We strongly advise you to read
          this charter. It covers best practices like carefully reading terms and conditions, not getting lured by high
          returns promises, and verifying the RA’s credentials, among others. The Client agrees to refer to and abide by
          the Do’s and Don’ts issued by SEBI​ as they are incorporated by reference into these Terms. Key points from
          the Do’s and Don’ts include: always take informed decisions, do not share your account details, do not trust
          assured returns, report misconduct, etc. Familiarizing yourself with these will enhance your service
          experience and safety.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Educational Materials: </Text>The RA may provide clients with certain
          educational content or links (for example, how to use our research, understanding risk, etc.). These are for
          informational purposes and should not be construed as part of the contractual terms, but following them can
          help you make better use of our services. SEBI’s website and the RAASB (BSE) website also have useful FAQs and
          guidance for investors dealing with research analysts – we encourage you to utilize those resources.
        </Text>
        <Text>
          <Text style={styles.listItem}>• Regulatory Updates: </Text>From time to time, SEBI or other regulators may
          introduce changes affecting RAs or clients (for example, changes in fee caps, new compliance requirements,
          etc.). KamayaKya will do its best to inform you of any such significant changes that could impact your
          engagement with us. We also commit to implement all regulatory directives in the spirit of investor
          protection. Clients are expected to cooperate in compliance efforts (for instance, providing additional info
          if needed due to a new rule).
        </Text>

        <Text>
          <Text style={styles.listItem}>• No Waiver of Rights: </Text>Nothing in these Terms is meant to restrict the
          client’s rights under law or SEBI’s investor protection framework. In case any part of this Agreement is found
          inconsistent with SEBI regulations or guidelines, the regulatory provisions will prevail, and the conflicting
          part of the Agreement will be modified to comply. Our aim is to be fully SEBI-compliant and client-friendly.
        </Text>
      </View>
      <Text>
        By proceeding with KamayaKya’s services, you acknowledge that you have read and understood this Terms and
        Conditions section (including the important points summarized in the MITC), and the SEBI Investor Charter’s
        guidelines. These measures are in place to safeguard your interests and ensure a transparent, fair relationship
        between you (the client) and us (the research analyst).
      </Text>
      <Text style={styles.sectionTitle}>Amendments and General Provisions</Text>
      <Text>
        <Text style={styles.semibold}>Amendment of Terms: </Text>
        The RA reserves the right to amend or update these Terms and Conditions from time to time. If we make material
        changes, we will provide you with 15 days’ prior notice of the revised terms​, either by email to your
        registered address or by notification on our website/app. It is your responsibility to review such changes.
        Continued use of the services after the notice period constitutes your acceptance of the updated Terms. If you
        do not agree with the changes, you may terminate the services before the new terms take effect (and receive any
        applicable refund for the remaining period). We will not make changes that have a retrospective negative effect
        on your rights unless required by law.
      </Text>
      <Text>
        <Text style={styles.semibold}>Severability: </Text>
        If any provision of these Terms is held to be invalid or unenforceable by any law or regulation or court, that
        provision shall be deemed modified to the minimum extent necessary to make it valid and enforceable, and if it
        cannot be made valid, it shall be severed, and the remaining provisions shall continue in full force and effect.
      </Text>
      <Text>
        <Text style={styles.semibold}>No Transfer of Membership: </Text>
        Your subscription is personal to you. You cannot transfer or assign your rights or obligations under this
        Agreement to anyone else without our consent. The RA similarly will not transfer your contract to another entity
        without notifying you (except perhaps an internal restructuring or change of control, in which case the
        succeeding entity will honor the existing terms).
      </Text>
      <Text>
        <Text style={styles.semibold}>Force Majeure: </Text>
        The RA shall not be liable for any delay or failure in performance (including sending of research reports) due
        to events outside our reasonable control, such as acts of God, fire, flood, terrorism, internet outages,
        strikes, pandemic lockdowns, or governmental restrictions​ We will, however, make reasonable efforts to resume
        service as soon as possible after such an event and may extend your subscription or issue appropriate
        adjustments if the disruption is significant.
      </Text>
      <Text>
        <Text style={styles.semibold}>Entire Agreement: </Text>
        This Terms and Conditions section, along with any other sections of the User Agreement or disclosures provided
        to you (and any order forms or plan details you agreed to), constitute the entire agreement between you and
        KamayaKya with respect to the research services. It supersedes any prior discussions or communications
        (electronic, verbal, or written) regarding the same subject matter. Any additional voluntary clauses, if agreed
        separately, shall not override these standard terms or contravene SEBI rules​.
      </Text>
      <Text>
        By accepting these Terms, both parties acknowledge and agree to abide by all the above conditions. This
        comprehensive Terms and Conditions aims to protect your interests as a client and ensure compliance with all
        SEBI (Research Analyst) Regulations, 2014 and the relevant SEBI circulars (including the Master Circular of May
        21, 2024 and Circular dated Feb 17, 2025). We thank you for trusting KamayaKya and are dedicated to providing
        you with valuable research services in an accountable and user-friendly manner.
      </Text>
    </Page>
    <Page size={"A4"} style={styles.page}>
      <Text style={styles.header}>DETAILS OF RESEARCH ANALYST</Text>
      <View style={styles.table}>
        <TableRow label="License Holder Name" value={"Kamayakya Wealth Management Private Limited"} />
        <TableRow label="Entity Type" value={"Corporate"} />
        <TableRow label="Brand/Trade Name" value={"KamayaKya"} />
        <TableRow label="Registration No." value={"INH000009843"} />
        <TableRow label="BSE Enlistment No." value={"5583"} />
        <TableRow
          label="Registered Address"
          value={"S. No. 347/A/16, F.P.189, FL NO. 6, Dhole Patil Road, Sangamwadi, Pune - 411001, Maharashtra"}
        />
        <TableRow
          label="Correspondence Address"
          value={
            "Flat No 11, New Nirmal Apartments, Dhole Patil Road, Near Akshay Complex, Sangamwadi, Pune - 411001, Maharashtra"
          }
        />
        <TableRow label="Contact No." value={"+91 9175939641"} />
        <TableRow label="Email No." value={"contact@kamayakya.com"} />
        <TableRow label="CIN" value={"U74999PN2021PTC205529"} />
        <TableRow label="Compliance Officer" value={"Aniket Kulkarni"} />
        <TableRow label="Email ID" value={"aniket@kamayakya.com"} />
        <TableRow label="Grievance Officer" value={"Nitya Shah"} />
        <TableRow label="Email ID" value={"nitya@kamayakya.com"} />
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
    console.log("OPETIOS", options);
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
    window.open(url, "_blank");
    return blob;
  };

  const handleDigio = async (orderId, userDetailsForPdf, orderDetails) => {
    try {
      const pdf = await generatePdf(userDetailsForPdf);
      const res = await getDigioIdandSendPdf({ order_id: orderId, user_agreement_pdf: pdf });
      // console.log(res);
      var options = {
        environment: process.env.NEXT_PUBLIC_DIGIO_ENVIRONMENT,
        is_iframe: false,
        callback: function (response) {
          if (response.hasOwnProperty("error_code")) {
            return console.log("error occurred in process", response);
          }
          // downloadAndSendPDF();
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
            amount: orderDetails.data.final_amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
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
        logo: "https://i.ibb.co/nMLcz99K/kmk-k.png",
        theme: {
          primaryColor: "#0b3a36",
          secondaryColor: "#000000",
        },
      };
      var digio = new window.Digio(options);
      digio.init();
      digio.submit(res?.id, res?.user_mobile);
      if (checkoutLoading) {
        setCheckoutLoading(false);
      }
    } catch (e) {
      console.log("ERORRO", e);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleCheckout: SubmitHandler<IFormInput> = async (data) => {
    if (!aadharVerified && !isAadharAlreadyVerified && !isAadharVintage) {
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
      setCheckoutLoading(false);
      console.error(e);
    } finally {
      // setCheckoutLoading(false);
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

  console.log("IS AADHAR VINTAGE:", isAadharVintage);
  console.log("AADHAR VERIFED", aadharVerified);
  console.log("IS AADHAR ALREADY VERIFIED", isAadharAlreadyVerified);
  console.log(
    "AADHAR NOT VERIFIED AND NOT ALREADY VERIFIED AND NOT VINTAGE:",
    !aadharVerified && !isAadharAlreadyVerified && !isAadharVintage
  );
  console.log("EMAIL IS EMPTY:", email?.length === 0);
  console.log("MOBILE IS EMPTY:", mobile?.length === 0);
  console.log("ADDRESS IS A NUMBER AND NOT PINCODE BASED:", !Number.isNaN(Number(address)) && !pincodeBasedAddress);
  console.log("PAN NOT ALREADY VERIFIED AND MASKED PAN IS MISSING:", !isPanAlreadyVerified && !userDetails.maskedPan);

  const finalCondition =
    ((!aadharVerified || !isAadharAlreadyVerified) && !isAadharVintage) ||
    email?.length === 0 ||
    mobile?.length === 0 ||
    (!Number.isNaN(Number(address)) && !pincodeBasedAddress) ||
    (!isPanAlreadyVerified && !userDetails.maskedPan);

  console.log("FINAL CONDITION:", finalCondition);

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
                (!aadharVerified && !isAadharAlreadyVerified && !isAadharVintage) ||
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
