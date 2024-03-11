import NavBar from "@/components/Navbar";
import React, { useContext } from "react";
import FaqsNew from "./screens/FaqsNew";
import Footer from "./screens/Footer";
import AuthContext from "@/components/AuthContext";
import NavBar2 from "@/components/Navbar2";
import { Text } from "@nextui-org/react";
import { Box } from "@mui/material";
import Head from "next/head";

const InvestorCharter = () => {
	const { isLoggedIn } = useContext(AuthContext);
	return (
		<div style={{ backgroundColor: "#fff" }}>
			<Head>
				<title>KamayaKya | Investor Charter</title>
				<meta
					name="description"
					content="Explore the Kamayakya's investor charter for unparalleled insights and expert guidance, empowering you to make informed financial decisions."
				/>
			</Head>
			{isLoggedIn ? <NavBar2 /> : <NavBar />}
			<Box
				sx={{
					// paddingTop: "30px",
					display: "flex",
					// flexWrap: "wrap",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					width: "100vw",
					paddingLeft: "15px",
					paddingRight: "15px",
					background: "#fff",
					"@media only screen and (min-width: 672px)": {
						paddingTop: "2.5vh",
						paddingBottom: "10vh",
					},
					"@media only screen and (max-width: 672px)": {
						// maxHeight: "100vh",
						marginTop: "0px",
						justifyContent: "flex-start",
						alignItems: "flex-start",
						paddingLeft: "15px",
						paddingRight: "15px",
					},
				}}
			>
				<Text
					b
					size={60}
					css={{
						marginTop: "0px",
						width: "100%",
						maxWidth: "80rem" /* 1280px */,
						textAlign: "center",
						lineHeight: 1.2,
						paddingLeft: "15px",
						paddingRight: "15px",
						"@media only screen and (max-width: 764px)": {
							fontSize: 45,
							marginTop: "35px",
							maxWidth: "100%",
							textAlign: "left",
						},
					}}
				>
					Investor Charter in respect of Research Analyst (RA)
				</Text>
				<Text
					size={20}
					css={{
						marginTop: "2.5vh",
						width: "100%",
						maxWidth: "80rem" /* 1280px */,
						textAlign: "left",
						lineHeight: 1.4,
						paddingLeft: "15px",
						paddingRight: "15px",
						"@media only screen and (max-width: 764px)": {
							fontSize: 15,
							marginTop: "35px",
							marginBottom: "35px",
							maxWidth: "100%",
							textAlign: "left",
						},
					}}
				>
					<br />
					<br />
					<b>Vision and Mission Statements for investors.</b> <br /> Vision:
					Invest with knowledge & safety. <br />
					Mission: Every investor should be able to invest in right investment
					products based on their needs, manage and monitor them to meet their
					goals, access reports and enjoy financial wellness
					<br />
					<br />
					<b>
						Details of business transacted by the Research Analyst with respect
						to the investors.
					</b>{" "}
					<br /> • To publish research report based on the research activities
					of the RA. <br />• To provide an independent unbiased view on
					securities.
					<br /> • To offer unbiased recommendation, disclosing the financial
					interests in recommended securities.
					<br /> • To provide research recommendation, based on analysis of
					publicly available information and known observations.
					<br /> • To conduct audit annually.
					<br />
					<br />
					<b>
						Details of services provided to investors (No Indicative Timelines)
					</b>{" "}
					<br /> Onboarding of Clients of the RA. <br />
					Disclosure to Clients:
					<br /> • To distribute research reports and recommendations to the
					clients without discrimination.
					<br /> • To maintain confidentiality w.r.t publication of the research
					report until made available in the public domain.
					<br />
					<br />
					<b>
						Details of grievance redressal mechanism and how to access it
					</b>{" "}
					<br /> In case of any grievance / complaint, an investor should
					approach the concerned research analyst and shall ensure that the
					grievance is resolved within 30 days. <br />
					If the investor’s complaint is not redressed satisfactorily, one may
					lodge a complaint with SEBI on SEBI’s SCORES portal which is a
					centralized web based complaints redressal system. SEBI takes up the
					complaints registered via SCORES with the concerned intermediary for
					timely redressal. SCORES facilitates tracking the status of the
					complaint.
					<br /> With regard to physical complaints, investors may send their
					complaints to: Office of Investor Assistance and Education, Securities
					and Exchange Board of India, SEBI Bhavan. Plot No. C4-A, ‘G’ Block,
					Bandra-Kurla Complex, Bandra (E), Mumbai - 400 051.
					<br />
					<br />
					<b>SEBI SCORES Links :</b>
					<br />
					SEBI SCORES link to register complaints :<br />
					<a href="https://scores.gov.in/scores/Welcome.html" target="_blank">
						https://scores.gov.in/scores/Welcome.html
					</a>
					<br />
					SEBI SCORES app link to register complaints :<br />
					<a
						href="https://play.google.com/store/apps/details?id=com.ionicframework.sebi236330&hl=en_IN&gl=US"
						target="_blank"
					>
						https://play.google.com/store/apps/details?id=com.ionicframework.sebi236330&hl=en_IN&gl=US
					</a>
					<br />
					<br />
					<b>
						Expectations from the investors (Responsibilities of investors).
					</b>{" "}
					<br />
					<br />
					<b>Do’s</b> <br /> i. Always deal with SEBI registered Research
					Analyst. <br />
					ii. Ensure that the Research Analyst has a valid registration
					certificate.
					<br /> iii. Check for SEBI registration number.
					<br /> iv. Please refer to the list of all SEBI registered Research
					Analysts which is available on SEBI website in the following link:
					<a href="" target="_blank">
						https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=14
					</a>
					<br /> v. Always pay attention towards disclosures made in the
					research reports before investing
					<br /> vi. Pay your Research Analyst through banking channels only and
					maintain duly signed receipts mentioning the details of your payments.
					<br /> vii. Before buying securities or applying in public offer,
					check for the research recommendation provided by your research
					Analyst.
					<br /> viii. Ask all relevant questions and clear your doubts with
					your Research Analyst before acting on the recommendation.
					<br /> ix. Inform SEBI about Research Analyst offering assured or
					guaranteed returns.
					<br />
					<b>Don’ts</b> <br /> i. Do not provide funds for investment to the
					Research Analyst. <br />
					ii. Don’t fall prey to luring advertisements or market rumours.
					<br /> iii. Do not get attracted to limited period discount or other
					incentive, gifts, etc. offered by Research Analyst.
					<br /> iv. Do not share login credentials and password of your trading
					and demat accounts with the Research Analyst.
				</Text>
			</Box>
			<FaqsNew />
			<Footer />
		</div>
	);
};

export default InvestorCharter;
