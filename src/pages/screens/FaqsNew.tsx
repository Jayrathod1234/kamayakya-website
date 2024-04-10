import React, { useState } from "react";
import {
	Collapse,
	Text,
	Grid,
	Input,
	Button,
	Divider,
} from "@nextui-org/react";
import { AiOutlineRightCircle, AiOutlineDownCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import { Box } from "@mui/material";
import { borderTop } from "@mui/system";

const FaqsNew = () => {
	const [expandedIndex, setExpandedIndex] = useState(-1);

	const handleCollapseToggle = (index: number) => {
		setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
	};

	return (
		<section
		id="FAQs"
			style={{
				backgroundColor: "#195B54",
				display: "flex",
				flexWrap: "wrap",
				paddingTop: "10vh",
				paddingBottom: "10vh",
				width: "100%",
				height: "100%",
				justifyContent: "center",
				alignContent: "center",
				borderRadius: "0px",
			}}
			className="faq-section-mobile"
		>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					// paddingTop: 50,
					paddingBottom: 25,
					maxWidth: "80rem",
					width: "100vw",
					// backgroundColor: "",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						flexDirection: "column-reverse",
						justifyContent: "space-between",
						maxWidth: "80rem",
						// gap: "10%",
						paddingLeft: "25px",
						paddingRight: "25px",
						alignItems: "start",
					}}
				>
					<Box
						sx={{
							width: "100%",
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							justifyContent: "space-evenly",
							alignItems: "center",
							alignContent: "center",
							alignSelf: "center",
							"@media only screen and (max-width: 764px)": {
								justifyContent: "center",
								width: "auto",
								textAlign: "center",
							},
						}}
					>
						<Divider
							css={{
								width: "100%",
								backgroundColor: "#fff",
								height: "10px",
								borderRadius: "200px",
								mb: "55px",
								mt: "20px",
								opacity: "0.05",
							}}
						/>
						<Text
							b
							size={50}
							color="#fff"
							css={{
								lineHeight: 1.2,
								marginBottom: 10,
								"@media only screen and (max-width: 764px)": {
									fontSize: 35,
									marginBottom: 30,
									width: "100%",
								},
							}}
						>
							Still got a question?
						</Text>
						<Button
							auto
							size={"lg"}
							css={{
								backgroundImage: "linear-gradient(to top , #FF9D28, #ffa736)",
								borderRadius: "50px",
								marginTop: "0px",
								width: "350px",
								marginBottom: 10,
								"@media only screen and (max-width: 764px)": {
									width: "60%",
									alignSelf: "flex-start",
								},
							}}
						>
							<a href="mailto:contact@kamayakya.com" target="_blank">
								<Text b size={20} color="white">
									Send an email
								</Text>
							</a>
						</Button>
						<Input
							size="xl"
							rounded={true}
							css={{
								// paddingLeft: 5,
								display: "none",
								marginTop: 30,
								borderRadius: "10000px",
								"& .nextui-c-eXOOPO": {
									backgroundColor: "white",
								},
							}}
							contentRightStyling={false}
							placeholder="   eg: +919087654321"
							contentRight={
								<Button auto size={"lg"} css={{ borderRadius: "50px" }}>
									Submit
								</Button>
							}
						/>
					</Box>
					<Box
						sx={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							flexWrap: "wrap",
							justifyContent: "center",
							"@media only screen and (max-width: 764px)": {
								width: "auto",
								mb: 0,
							},
						}}
					>
						<Box
							style={{
								paddingTop: "20px",
								width: "100%",
								maxWidth: "80rem",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								marginBottom: "20px",
								padding: "0 15px",
							}}
							className="subscriptionPlansHeader"
						>
							<Text
								b
								size={70}
								color="white"
								css={{
									textAlign: "center",
									"@media only screen and (max-width: 768px)": {
										textAlign: "left",
										fontSize: 45,
										lineHeight: 1.1,
										maxWidth: "100%",
										width: "100%",
									},
								}}
							>
								FAQs
							</Text>
							<Text
								b
								size={25}
								color="white"
								css={{
									textAlign: "center",
									"@media only screen and (max-width: 768px)": {
										marginTop: "10px",
										textAlign: "left",
										fontSize: 20,
										lineHeight: 1.1,
									},
								}}
							>
								Everything you need to know about the product and billing
							</Text>
						</Box>
						<Grid.Container
							gap={2}
							css={{ marginTop: 0, marginBottom: "30px" }}
						>
							<Grid style={{ padding: "0px 0px", gap: "100px" }}>
								<Collapse.Group splitted>
									<Collapse
										title="How to start with KamayaKya?"
										arrowIcon={
											expandedIndex === 0 ? (
												<RxCrossCircled size={34} />
											) : (
												<AiOutlineDownCircle size={34} />
											)
										}
										expanded={expandedIndex === 0}
										onChange={() => handleCollapseToggle(0)}
										className="custom-collapse"
										css={{
											"& h3": { letterSpacing: 0.5, fontSize: 20 },
											color: "#000",
											minHeight: "50px",
											border: "2px solid #125A55",
										}}
									>
										<Text
											size={21}
											color="#000"
											// align="center"
											css={{
												lineHeight: 1.3,
												alignText: "center",
											}}
										>
											Slide into our website like a pro!
											<br />
											<br />
											<b>Log In:</b> Use your phone number or email ID to log
											in. No pesky registrations needed!
											<br />
											<br />
											<b>Freebies:</b> Enjoy your warm welcome with three free
											stock recommendations immediately after logging in.
											<br />
											<br />
											<b>Go VIP+:</b> To unlock the ultimate KamayaKya
											experience, become a KamayaKya VIP+ by subscribing and
											paying the annual fee.
											<br />
											<br />
										</Text>
									</Collapse>
									<Collapse
										title="Are there any fees or charges involved?"
										arrowIcon={
											expandedIndex === 1 ? (
												<RxCrossCircled size={34} />
											) : (
												<AiOutlineDownCircle size={34} />
											)
										}
										expanded={expandedIndex === 1}
										onChange={() => handleCollapseToggle(1)}
										className="custom-collapse"
										css={{
											"& h3": { letterSpacing: 0.5, fontSize: 20 },
											color: "#000",
											minHeight: "50px",
											border: "2px solid #125A55",
										}}
									>
										<Text
											size={21}
											color="#000"
											// align="center"
											css={{
												lineHeight: 1.3,
												alignText: "center",
											}}
										>
											Once you've logged in, voila! You're instantly rewarded
											with three FREE stock recommendations. Want more perks and
											access to the grand buffet of features? No problem! For an
											investment of just Rs 15,000 per annum (taxes included),
											you can ascend to the ranks of our elite VIP+ members.
											This golden ticket unlocks a treasure trove of features
											and stocks. Just think of it as the premium lounge access
											of the investment world! Who doesn't love a bit of VIP
											treatment, right?
											<br />
											<br />
										</Text>
									</Collapse>
									<Collapse
										title="Why does KamayaKya focus on SMEs, Micro-Caps, and Small-Caps?"
										arrowIcon={
											expandedIndex === 2 ? (
												<RxCrossCircled size={34} />
											) : (
												<AiOutlineDownCircle size={34} />
											)
										}
										expanded={expandedIndex === 2}
										onChange={() => handleCollapseToggle(2)}
										className="custom-collapse"
										css={{
											"& h3": { letterSpacing: 0.5, fontSize: 20 },
											color: "#000",
											minHeight: "50px",
											border: "2px solid #125A55",
										}}
									>
										<Text
											size={21}
											color="#000"
											// align="center"
											css={{
												lineHeight: 1.3,
												alignText: "center",
											}}
										>
											Picture this, you stumble upon a hidden gem, nurture it
											with care, and voila, you're rich! That's what SME,
											Micro-Cap and Small-cap companies can be - undiscovered
											treasures! Companies like Reliance and Infosys started as
											smallcaps and rose to become the titans they are today.
											We're here to help you spot these future multibaggers and
											accelerate your wealth-building journey.
											<br />
											<br />
										</Text>
									</Collapse>
									<Collapse
										title="What is KamayaKya's investment strategy?"
										arrowIcon={
											expandedIndex === 3 ? (
												<RxCrossCircled size={34} />
											) : (
												<AiOutlineDownCircle size={34} />
											)
										}
										expanded={expandedIndex === 3}
										onChange={() => handleCollapseToggle(3)}
										className="custom-collapse"
										css={{
											"& h3": { letterSpacing: 0.5, fontSize: 20 },
											color: "#000",
											minHeight: "50px",
											border: "2px solid #125A55",
										}}
									>
										<Text
											size={21}
											color="#000"
											// align="center"
											css={{
												lineHeight: 1.3,
												alignText: "center",
											}}
										>
											Our stock selection process is as meticulous as a master
											watchmaker assembling a timepiece. Rooted in a philosophy
											that considers a myriad of factors – cash flow, growth,
											promoter holdings, management quality, and valuations – we
											approach stock picking with due diligence. We keep an
											eagle's eye on potential triggers like capacity expansion,
											debt reduction, change in management, and favourable
											government policies. Our motto? Find those hidden gems,
											backed with solid data and research, minimize the noise,
											and expertly navigate the risk landscape for you!
											<br />
											<br />
										</Text>
									</Collapse>
									<Collapse
										title="Who's behind these Stock Ideas?"
										arrowIcon={
											expandedIndex === 4 ? (
												<RxCrossCircled size={34} />
											) : (
												<AiOutlineDownCircle size={34} />
											)
										}
										expanded={expandedIndex === 4}
										onChange={() => handleCollapseToggle(4)}
										className="custom-collapse"
										css={{
											"& h3": { letterSpacing: 0.5, fontSize: 20 },
											color: "#000",
											minHeight: "50px",
											border: "2px solid #125A55",
										}}
									>
										<Text
											size={21}
											color="#000"
											// align="center"
											css={{
												lineHeight: 1.3,
												alignText: "center",
											}}
										>
											We have an in-house squadron of financial wizards and
											engineering gurus that bring you these insights. Boasting
											a combined experience of 25 years, our top 1% talent in
											finance and engineering works tirelessly to deliver the
											best to you.
											<br />
											<br />
										</Text>
									</Collapse>
									<Collapse
										title="What exactly are “Stocks to Buy”?"
										arrowIcon={
											expandedIndex === 5 ? (
												<RxCrossCircled size={34} />
											) : (
												<AiOutlineDownCircle size={34} />
											)
										}
										expanded={expandedIndex === 5}
										onChange={() => handleCollapseToggle(5)}
										className="custom-collapse"
										css={{
											"& h3": { letterSpacing: 0.5, fontSize: 20 },
											color: "#000",
											minHeight: "50px",
											border: "2px solid #125A55",
										}}
									>
										<Text
											size={21}
											color="#000"
											// align="center"
											css={{
												lineHeight: 1.3,
												alignText: "center",
											}}
										>
											"Stocks to Buy" are your treasure maps! They're stock
											recommendations, carefully curated by our equity research
											team. You can follow these maps to make your investments
											with your broker. We'll keep you in the loop so that you
											can exit the investment when the timing is perfect. This
											ensures you potentially maximize your profits and keep the
											losses to a minimum.
											<br />
											<br />
										</Text>
									</Collapse>
									<Collapse
										title="What do the research reports contain?"
										arrowIcon={
											expandedIndex === 6 ? (
												<RxCrossCircled size={34} />
											) : (
												<AiOutlineDownCircle size={34} />
											)
										}
										expanded={expandedIndex === 6}
										onChange={() => handleCollapseToggle(6)}
										className="custom-collapse"
										css={{
											"& h3": { letterSpacing: 0.5, fontSize: 20 },
											color: "#000",
											minHeight: "50px",
											border: "2px solid #125A55",
										}}
									>
										<Text
											size={21}
											color="#000"
											// align="center"
											css={{
												lineHeight: 1.3,
												alignText: "center",
											}}
										>
											Our research reports are like your personal finance
											encyclopedias. We offer two options (1-page report and
											detailed report) containing all vital details like Entry
											Price, Target Price, Risk, Market Capitalisation, Holding
											Period or Duration, and the thought process behind
											choosing a particular company as our stock pick.
											<br />
											<br />
										</Text>
									</Collapse>
									<Collapse
										title="When should I exit an investment?"
										arrowIcon={
											expandedIndex === 7 ? (
												<RxCrossCircled size={34} />
											) : (
												<AiOutlineDownCircle size={34} />
											)
										}
										expanded={expandedIndex === 7}
										onChange={() => handleCollapseToggle(7)}
										className="custom-collapse"
										css={{
											"& h3": { letterSpacing: 0.5, fontSize: 20 },
											color: "#000",
											minHeight: "50px",
											border: "2px solid #125A55",
										}}
									>
										<Text
											size={21}
											color="#000"
											// align="center"
											css={{
												lineHeight: 1.3,
												alignText: "center",
											}}
										>
											Fear not! You'll receive an exit notification via WhatsApp
											and Email for every idea you've invested in. We'll tell
											you when it's time to pack up and leave the investment
											party.
											<br />
											<br />
										</Text>
									</Collapse>
									<Collapse
										title="What are the various Subscription Plans of KamayaKya?"
										arrowIcon={
											expandedIndex === 8 ? (
												<RxCrossCircled size={34} />
											) : (
												<AiOutlineDownCircle size={34} />
											)
										}
										expanded={expandedIndex === 8}
										onChange={() => handleCollapseToggle(8)}
										className="custom-collapse"
										css={{
											"& h3": { letterSpacing: 0.5, fontSize: 20 },
											color: "#000",
											minHeight: "50px",
											border: "2px solid #125A55",
										}}
									>
										<Text
											size={21}
											color="#000"
											// align="center"
											css={{
												lineHeight: 1.3,
												alignText: "center",
											}}
										>
											<b>Free Tier:</b> We like to give our users a taste of the
											good stuff! Hence, we grant lifetime access to 3
											system-generated stock picks that span both NSE and BSE.
											But let's not get too carried away. This tier, while
											generous, doesn't include SME stock picks or those handy
											updates via WhatsApp and Email. It's like a free sample at
											a bakery - delicious, but it leaves you craving for the
											full treat!
											<br />
											<br />
											<b>KamayaKya VIP+ Subscription:</b> For investing
											aficionados ready to take their investments to new
											heights, our VIP+ subscription has got you covered. With
											2-4 curated stock picks each month spanning NSE, BSE, and
											SME, this is your VIP pass to a broader spectrum of
											opportunities. And the cherry on top? Regular updates via
											WhatsApp and Email to keep you ahead of the curve. It's
											like upgrading to first-class in your investing journey!
											<br />
											<br />
											<b>Smallcase Subscription:</b> Tailored for those
											preferring a diversified approach with a basket of NSE
											stocks, it marries convenience with connectivity, offering
											execution via broker connect and keeping you in the loop
											with WhatsApp & Email updates. It's your financial feast,
											dished up with variety and backed by sound investing
											principles! party.
											<br />
											<br />
										</Text>
									</Collapse>
									<Collapse
										title="How does the billing work?"
										arrowIcon={
											expandedIndex === 9 ? (
												<RxCrossCircled size={34} />
											) : (
												<AiOutlineDownCircle size={34} />
											)
										}
										expanded={expandedIndex === 9}
										onChange={() => handleCollapseToggle(9)}
										className="custom-collapse"
										css={{
											"& h3": { letterSpacing: 0.5, fontSize: 20 },
											color: "#000",
											minHeight: "50px",
											border: "2px solid #125A55",
										}}
									>
										<Text
											size={21}
											color="#000"
											// align="center"
											css={{
												lineHeight: 1.3,
												alignText: "center",
											}}
										>
											We understand that effective investing requires time and
											patience, which is why we exclusively offer an annual
											plan. Our strategy reflects our ethos that long-term
											commitment is key to unlocking the true potential of your
											investments. For your convenience, we accept payments
											through various methods including Credit/Debit Card, UPI,
											Net-Banking, or Cheque. Our goal is to keep the process
											straightforward and hassle-free for you.
											<br />
											<br />
										</Text>
									</Collapse>
									<Collapse
										title="What is the cancellation policy?"
										arrowIcon={
											expandedIndex === 10 ? (
												<RxCrossCircled size={34} />
											) : (
												<AiOutlineDownCircle size={34} />
											)
										}
										expanded={expandedIndex === 10}
										onChange={() => handleCollapseToggle(10)}
										className="custom-collapse"
										css={{
											"& h3": { letterSpacing: 0.5, fontSize: 20 },
											color: "#000",
											minHeight: "50px",
											border: "2px solid #125A55",
										}}
									>
										<Text
											size={21}
											color="#000"
											// align="center"
											css={{
												lineHeight: 1.3,
												alignText: "center",
											}}
										>
											As much as we hate to see you go, we respect your
											decision. However, do note that we do not offer refunds.
											You can cancel at any time though.
											<br />
											<br />
										</Text>
									</Collapse>
								</Collapse.Group>
							</Grid>
						</Grid.Container>
					</Box>
				</div>
			</div>
		</section>
	);
};

export default FaqsNew;
