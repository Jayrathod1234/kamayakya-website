import NavBar from "@/components/Navbar";
import React, { useContext } from "react";
import FaqsNew from "./screens/FaqsNew";
import { Footer } from "@/components.v2/footer";
import AuthContext from "@/components/AuthContext";
// import NavBar2 from "@/components/Navbar2";
import { Text } from "@nextui-org/react";
import { Box } from "@mui/material";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";
import { Navbar } from "@/components.v2/navbar";

const InvestorCharter = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Head>
        {generateNextSeo({
          title: "KamayaKya | Investor Charter",
          description: "Explore the Kamayakya's investor charter for unparalleled insights and expert guidance, empowering you to make informed financial decisions.",
          canonical: "https://www.kamayakya.com/investor-charter",
          openGraph: {
            url: "https://www.kamayakya.com/investor-charter",
            title: "KamayaKya | Investor Charter",
            description: "Explore the Kamayakya's investor charter for unparalleled insights and expert guidance, empowering you to make informed financial decisions.",
          },
        })}
      </Head>
      {/* {isLoggedIn ? <NavBar2/> : <NavBar/>} */}
      <Navbar className=" bg-white open_sans" />
      <div className="prose prose-neutral max-w-none main-container open_sans pb-8">
        <h2 className=" text-center">Investor Charter</h2>

        <h3>A. Vision and Mission Statements for Investors</h3>
        <p>
          <strong>Vision:</strong> Invest with knowledge &amp; safety.
        </p>
        <p>
          <strong>Mission:</strong> Every investor should be able to invest in right investment products based on their
          needs, manage and monitor them to meet their goals, access reports and enjoy financial wellness.
        </p>

        <h3>B. Details of business transacted by the Research Analyst with respect to the
investors</h3>
        <ul>
          <li>To publish research report based on the research activities of the RA</li>
          <li>To provide an independent unbiased view on securities.</li>
          <li>To offer unbiased recommendation, disclosing the financial interests in recommended securities.</li>
          <li>
            To provide research recommendation, based on analysis of publicly available information and known
            observations.
          </li>
          <li>To conduct audit annually</li>
          <li>
            To ensure that all advertisements are in adherence to the provisions of the Advertisement Code for Research
            Analysts.
          </li>
          <li>
            To maintain records of interactions with all clients including prospective clients (prior to onboarding),
            where any conversation related to the research services has taken place.
          </li>
        </ul>

        <h3>C. Details of Services Provided to Investors (No Indicative Timelines)</h3>
        <ul>
          <li>
            Onboarding of Clients
            <ul>
              <li>Sharing of terms and conditions of research services</li>
              <li>Completing KYC of fee paying clients</li>
            </ul>
          </li>
          <li>
            Disclosure to Clients:
            <ul>
              <li>
                To disclose information that is material for the client to make an informed decision, including details
                of its business activity, disciplinary history, the terms and conditions of research services, details
                of associates, risks and conflicts of interest, if any
              </li>
              <li>To disclose the extent of use of Artificial Intelligence tools in providing research services</li>
              <li>
                To disclose, while distributing a third-party research report, any material conflict of interest of such
                third-party research provider or provide web address that directs a recipient to the relevant
                disclosures
              </li>
              <li>
                To disclose any conflict of interest of the activities of providing research services with other
                activities of the research analyst
              </li>
            </ul>
          </li>
          <li>To distribute research reports and recommendations to the clients without discrimination</li>
          <li>
            To maintain confidentiality with respect to publication of the research report until made available in the
            public domain
          </li>
          <li>
            To respect data privacy rights of clients and take measures to protect unauthorized use of their
            confidential information
          </li>
          <li>
            To disclose the timelines for the services provided by the research analyst to clients and ensure adherence
            to the said timelines
          </li>
          <li>
            To provide clear guidance and adequate caution notice to clients when providing recommendations for dealing
            in complex and high-risk financial products/services
          </li>
          <li>To treat all clients with honesty and integrity</li>
          <li>
            To ensure confidentiality of information shared by clients unless such information is required to be
            provided in furtherance of discharging legal obligations or a client has provided specific consent to share
            such information
          </li>
        </ul>

        <h3>D. Details of grievance redressal mechanism and how to access it</h3>
        <ul>
          <li>
            Investor can lodge complaint/grievance against Research Analyst in the following ways:
            <ul>
              <li>
                <strong>Mode of filing the complaint with Research Analyst:</strong>
                <ul>
                  <li>
                    In case of any grievance / complaint, an investor may approach the concerned Research Analyst who
                    shall strive to redress the grievance immediately, but not later than 21 days of the receipt of the
                    grievance.
                  </li>
                </ul>
              </li>
              <li>
                <strong>
                  Mode of filing the complaint on SCORES or with Research Analyst Administration and Supervisory Body
                  (RAASB):
                </strong>
                <ul>
                  <li>
                    <strong>SCORES 2.0</strong> (a web-based centralized grievance redressal system of SEBI for
                    facilitating effective grievance redressal in a time-bound manner) –
                    <a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer">
                      https://scores.sebi.gov.in
                    </a>
                  </li>
                  <li>
                    <strong>Two level review for complaint/grievance against Research Analyst:</strong>
                    <ul>
                      <li>First review done by designated body (RAASB)</li>
                      <li>Second review done by SEBI</li>
                    </ul>
                  </li>
                  <li>Email to designated email ID of RAASB</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            If the Investor is not satisfied with the resolution provided by the Market Participants, then the Investor
            has the option to file the complaint/grievance on SMARTODR platform for its resolution through online
            conciliation or arbitration.
          </li>
          <p>Two-level review: First by RAASB, then by SEBI.</p>
          <ul>
            <li>Email to designated RAASB email ID is also accepted.</li>
            <li>If unresolved, complaints can be escalated via SMARTODR for online conciliation/arbitration.</li>
          </ul>
          <li>
            <strong>With regard to physical complaints, investors may send their complaints to:</strong>
            <br />
            Office of Investor Assistance and Education, Securities and Exchange Board of India, SEBI Bhavan, Plot No.
            C4-A, ‘G’ Block, Bandra-Kurla Complex, Bandra (E), Mumbai - 400 051
          </li>
        </ul>

        <h3>E. Rights of Investors</h3>
        <ul>
          <li>Right to Privacy and Confidentiality</li>
          <li>Right to Transparent Practices</li>
          <li>Right to Fair and Equitable Treatment</li>
          <li>Right to Adequate Information</li>
          <li>Right to Initial and Continuing Disclosure</li>
          <li>Right to Awareness of Service Parameters and Turnaround Times</li>
          <li>Right to be informed of the timelines for each service</li>
          <li>Right to be Heard and Satisfactory Grievance Redressal</li>
          <li>Right to have timely redressal</li>
          <li>
            Right to Exit from Financial product or service in accordance with the terms and conditions agreed with the
            research analyst
          </li>
          <li>
            Right to receive clear guidance and caution notice when dealing in Complex and High-Risk Financial Products
            and Services
          </li>
          <li>
            Additional Rights to vulnerable consumers
            <ul>
              <li>Right to get access to services in a suitable manner even if differently abled</li>
            </ul>
          </li>
          <li>Right to provide feedback on the financial products and services used</li>
          <li>Right against coercive, unfair, and one-sided clauses in financial agreements</li>
        </ul>

        <h3>F. Expectations from the investors (Responsibilities of investors)</h3>
        <h4>Do’s</h4>
        <ul>
          <li>Always deal with SEBI registered Research Analyst.</li>
          <li>Ensure that the Research Analyst has a valid registration certificate.</li>
          <li>Pay only via banking channels</li>
          <li>
            Check for SEBI registration number. Please refer to the list of all SEBI registered Research Analyst which
            is available on SEBI website in the following link:{" "}
            <a
              href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=14"
              target="_blank"
              rel="noopener"
            >
              SEBI's official list
            </a>
          </li>
          <li>Always pay attention towards disclosures made in the research reports before investing.</li>
          <li>
            Pay your Research Analyst through banking channels only and maintain duly signed receipts mentioning the
            details of your payments. You may make payment of fees through Centralized Fee Collection Mechanism (CeFCoM)
            of RAASB if research analyst has opted for the mechanism. (Applicable for fee paying clients only)
          </li>
          <li>
            Before buying/ selling securities or applying in public offer, check for the research recommendation
            provided by your Research Analyst.
          </li>
          <li>
            Ask all relevant questions and clear your doubts with your Research Analyst before acting on recommendation.
          </li>
          <li>
            Seek clarifications and guidance on research recommendations from your Research Analyst, especially if it
            involves complex and high risk financial products and services.
          </li>
          <li>
            Always be aware that you have the right to stop availing the service of a Research Analyst as per the terms
            of service agreed between you and your Research Analyst.
          </li>
          <li>
            Always be aware that you have the right to provide feedback to your Research Analyst in respect of the
            services received.
          </li>
          <li>
            Always be aware that you will not be bound by any clause, prescribed by the research analyst, which is
            contravening any regulatory provisions.
          </li>
          <li>Inform SEBI about Research Analyst offering assured or guaranteed returns</li>
        </ul>

        <h4>Don’ts</h4>
        <ul>
          <li>Do not provide funds for investment to the Research Analyst.</li>
          <li>Don’t fall prey to luring advertisements or market rumors.</li>
          <li>Do not get attracted to limited period discount or other incentive, gifts, etc. offered by
Research Analyst.</li>
          <li>Do not share login credential and password of your trading, demat or bank accounts with
the Research Analyst.</li>
        </ul>
      </div>

      <FaqsNew />
      <Footer />
    </div>
  );
};

export default InvestorCharter;
