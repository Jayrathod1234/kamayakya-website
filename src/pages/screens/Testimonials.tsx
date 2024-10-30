import React, { useEffect, useRef } from "react";
import { Box, Avatar } from "@mui/material";
import { Text } from "@nextui-org/react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Testimonials = () => {
	return (
		<section
		id="testimonials"
			style={{
				backgroundColor: "#fff",
				// paddingTop: "10vh",
				paddingBottom: "4vh",
				display: "flex",
				flexWrap: "wrap",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				alignContent: "center",
			}}
		>
			<div
				style={{
					display: "flex",
					// flexWrap: "wrap",
					// width: "100lvw",
					maxWidth: "2000px",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						// maxWidth: "1300px",
						textAlign: "center",
						marginBottom: "50px",
						justifyContent: "center",
						"@media only screen and (max-width: 600px)": {
							// width: '40%',
							display: "flex",
							flexWrap: "wrap",
							marginBottom: "10px",
						},
					}}
				>
					<Text
						b
						size={60}
						css={{
							"@media only screen and (max-width: 768px)": {
								fontSize: 30,
								width: "70%",
								display: "flex",
								alignContent: "center",
								justifyContent: "center",
								flexWrap: "wrap",
								alignSelf: "center",
							},
						}}
					>
						Satisfied Customers Are Our Best Ads
					</Text>
				</Box>

				{/* <div
						style={{
							display: "flex",
							alignItems: "start",
							// justifyContent: "start",
						}}
						className="scroll-box"
					> */}
				{/* <Marquee
					delay={2}
					speed={50}
					style={{ paddingTop: "50px", paddingBottom: "15px" }}
					pauseOnHover={true}
					pauseOnClick={true}
				> */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent:"center",
						gap:"50px",
						flexWrap: "wrap",
						padding: "0px",
						"@media only screen and (max-width: 768px)": {
							justifyContent: 'center'
						},
						"@media only screen and (max-width: 1380px)": {
							justifyContent: 'center',
							gap: "50px"
						}
					}}
				>
					<Box
						sx={{
							display: "flex",
							minWidth: 500,
							maxWidth: 500,
							marginRight: "20px",
							height: 300,
							// mt: "20px",
							borderRadius: "15px",
							padding: "20px",
							boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)",
							gap: "25px",
							"@media only screen and (max-width: 768px)": {
								marginRight: "0px",
								marginBottom: "50px",
								marginTop: "50px",
								minWidth: '380px',
								maxWidth: '380px',
								height: "100%"
							},
						}}
					>
						<Box
							sx={{
								position: "absolute",
								marginLeft: "185px",
								marginTop: "-65px",
								"@media only screen and (max-width: 768px)": {
									marginLeft: "125px",
								},
							}}
						>
							<img
								src="/userFeedback_1.jpg"
								style={{
									width: "95px",
									height: "95px",
									borderRadius: "1000px",
									boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
								}}
							/>
						</Box>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<FaQuoteLeft
								color="#0f734d"
								size={20}
								style={{ marginTop: "20px", marginLeft: "-10px" }}
							/>
							<Text
								b
								css={{
									display: "flex",
									whiteSpace: "normal",
									// marginTop: "35px",
									paddingBottom: "10px",
									lineHeight: 1.2,
									textAlign: "justify",
									maxWidth: "95%",
									alignSelf: "center",
									"@media only screen and (max-width: 768px)": {
										fontSize: "10px",
									},
								}}
							>
								My experience with Kamayakya in both their smallcase and VIP+
								website subscription has been great so far. Their in depth
								analysis of stocks, understanding the market scenario and
								balancing the risk reward ratio are unmatched in the industry.
								Some of their small cap picks are truly gems that have created
								huge wealth for their investors. I would highly recommend
								investors to take their services to achieve their long term
								financial goals.
							</Text>
							<FaQuoteRight
								color="#0f734d"
								size={20}
								style={{
									marginTop: 0,
									marginRight: 0,
									alignSelf: "flex-end",
								}}
							/>
							<Text b css={{ textAlign: "center", marginTop: "10px" }}>
								Kiran Sanghvi, Indus Properties
							</Text>
						</div>
					</Box>
					<Box
						sx={{
							// display: "flex",
							minWidth: 500,
							maxWidth: 500,
							marginRight: "20px",
							height: 300,
							// mt: "20px",
							borderRadius: "15px",
							padding: "20px",
							boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)",
							gap: "25px",
							"@media only screen and (max-width: 768px)": {
								marginRight: "0px",
								minWidth: '380px',
								maxWidth: '380px',
								height: "100%",
								alignSelf: 'center',
								marginBottom: "50px",
							},
						}}
					>
						<Box
							sx={{
								position: "absolute",
								marginLeft: "185px",
								marginTop: "-65px",
								"@media only screen and (max-width: 768px)": {
									marginLeft: "125px"
								},
							}}
						>
							<img
								src="/userFeedback_2.jpg"
								style={{
									width: "95px",
									height: "95px",
									borderRadius: "1000px",
									boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
								}}
							/>
						</Box>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<FaQuoteLeft
								color="#0f734d"
								size={20}
								style={{ marginTop: "20px", marginLeft: "-10px" }}
							/>
							<Text
								b
								css={{
									display: "flex",
									whiteSpace: "normal",
									// marginTop: "35px",
									paddingBottom: "10px",
									lineHeight: 1.2,
									textAlign: "justify",
									maxWidth: "95%",
									alignSelf: "center",
									"@media only screen and (max-width: 768px)": {
										fontSize: "10px",
									},
								}}
							>
								I have been investing with KamayaKya since over a year now and I
								only have good things to say. Very good returns, transparency
								and a team of market experts with amazing investment strategies.
								I plan to invest with the firm for a long time and I would
								highly recommend it too.
							</Text>
							<FaQuoteRight
								color="#0f734d"
								size={20}
								style={{
									marginTop: 0,
									marginRight: 0,
									alignSelf: "flex-end",
								}}
							/>
							<Text b css={{ textAlign: "center", marginTop: "10px" }}>
								Tanish Mittal, Hindustan Pressings Pvt. Ltd
							</Text>
						</div>
					</Box>
					<Box
						sx={{
							// display: "flex",
							minWidth: 500,
							maxWidth: 500,
							marginRight: "20px",
							height: 300,
							// mt: "20px",
							borderRadius: "15px",
							padding: "20px",
							boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)",
							gap: "25px",
							"@media only screen and (max-width: 768px)": {
								marginRight: "0px",
								minWidth: '380px',
								maxWidth: '380px',
								height: "100%",
								alignSelf: 'center'
							},
						}}
					>
						<Box
							sx={{
								position: "absolute",
								marginLeft: "185px",
								marginTop: "-65px",
								"@media only screen and (max-width: 768px)": {
									marginLeft: "125px"
								},
							}}
						>
							<img
								src="/atharva-agashe.jpeg"
								style={{
									width: "95px",
									height: "95px",
									borderRadius: "1000px",
									boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
									objectFit:'cover'
								}}
							/>
						</Box>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<FaQuoteLeft
								color="#0f734d"
								size={20}
								style={{ marginTop: "20px", marginLeft: "-10px" }}
							/>
							<Text
								b
								css={{
									display: "flex",
									whiteSpace: "normal",
									// marginTop: "35px",
									paddingBottom: "10px",
									lineHeight: 1.2,
									textAlign: "justify",
									maxWidth: "95%",
									alignSelf: "center",
									"@media only screen and (max-width: 768px)": {
										fontSize: "10px",
									},
								}}
							>
								I have been thoroughly impressed with Kamayakya.com's stock recommendations. Their picks have been spot on, and the inclusion of a specified time period for each recommendation provides a clear understanding of when to exit. This level of detail is invaluable for any investor! Additionally, I apply my own technical analysis to their selected stocks, which adds an extra layer of confidence to my investments. I highly recommend Kamayakya.com's subscription to any medium to long-term investor.
							</Text>
							<FaQuoteRight
								color="#0f734d"
								size={20}
								style={{
									marginTop: 0,
									marginRight: 0,
									alignSelf: "flex-end",
								}}
							/>
							<Text b css={{ textAlign: "center", marginTop: "10px" }}>
							Atharva Agashe
							Associated Director - FIS
							</Text>
						</div>
					</Box>
						{/*<Box 
							sx={{
								// display: "flex",
								minWidth: 500,
								maxWidth: 500,
								marginRight: "20px",
								height: 300,
								// mt: "20px",
								borderRadius: "15px",
								padding: "20px",
								boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)",
								gap: "25px",
							}}
						>
							<div
								style={{
									position: "absolute",
									marginLeft: "185px",
									marginTop: "-65px",
								}}
							>
								<img
									src="/userFeedback_2.jpg"
									style={{
										width: "95px",
										height: "95px",
										borderRadius: "1000px",
										boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
									}}
								/>
							</div>
							<div style={{ display: "flex", flexDirection: "column" }}>
								<FaQuoteLeft
									color="#0f734d"
									size={20}
									style={{ marginTop: "20px", marginLeft: "-10px" }}
								/>
								<Text
									b
									css={{
										display: "flex",
										whiteSpace: "normal",
										// marginTop: "35px",
										paddingBottom: "10px",
										lineHeight: 1.2,
										textAlign: "justify",
										maxWidth: "95%",
										alignSelf: "center",
										"@media only screen and (max-width: 768px)": {
											fontSize: "10px",
										},
									}}
								>
									I have been investing with KamayaKya since over a year now and
									I only have good things to say. Very good returns,
									transparency and a team of market experts with amazing
									investment strategies. I plan to invest with the firm for a
									long time and I would highly recommend it too.
								</Text>
								<FaQuoteRight
									color="#0f734d"
									size={20}
									style={{
										marginTop: 0,
										marginRight: 0,
										alignSelf: "flex-end",
									}}
								/>
								<Text b css={{ textAlign: "end", marginTop: "10px" }}>
									{" "}
									- Tanish Mittal, Hindustan Pressings Pvt. Ltd
								</Text>
							</div>
						</Box> */}
				</Box>
				{/* </Marquee> */}
				{/* </div> */}
				{/* <div
						style={{
							display: "flex",
							alignItems: "start",
							// justifyContent: "center",
						}}
						className="scroll-box"
						// aria-hidden="true"
					>
						<Box
							sx={{
								// display: "flex",
								minWidth: 500,
								maxWidth: 500,
								marginRight: "20px",
								// height: "100%",
								// mt: "20px",
								borderRadius: "15px",
								padding: "20px",
								boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)",
								gap: "25px",
							}}
						>
							<div
								style={{
									position: "absolute",
									marginLeft: "185px",
									marginTop: "-65px",
								}}
							>
								<img
									src="/userFeedback_1.jpg"
									style={{
										width: "95px",
										height: "95px",
										borderRadius: "1000px",
										boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
									}}
								/>
							</div>
							<div style={{ display: "flex", flexDirection: "column" }}>
								<FaQuoteLeft
									color="#0f734d"
									size={20}
									style={{ marginTop: "20px", marginLeft: "-10px" }}
								/>
								<Text
									b
									css={{
										display: "flex",
										whiteSpace: "normal",
										// marginTop: "35px",
										paddingBottom: "10px",
										lineHeight: 1.2,
										textAlign: "justify",
										maxWidth: "95%",
										alignSelf: "center",
										"@media only screen and (max-width: 768px)": {
											fontSize: "10px",
										},
									}}
								>
									My experience with Kamayakya in both their smallcase and VIP+
									website subscription has been great so far. Their in depth
									analysis of stocks, understanding the market scenario and
									balancing the risk reward ratio are unmatched in the industry.
									Some of their small cap picks are truly gems that have created
									huge wealth for their investors. I would highly recommend
									investors to take their services to achieve their long term
									financial goals.
								</Text>
								<FaQuoteRight
									color="#0f734d"
									size={20}
									style={{
										marginTop: 0,
										marginRight: 0,
										alignSelf: "flex-end",
									}}
								/>
								<Text b css={{ textAlign: "end", marginTop: "10px" }}>
									{" "}
									- Kiran Sanghvi, Indus Properties
								</Text>
							</div>
						</Box>
						<Box
							sx={{
								// display: "flex",
								minWidth: 500,
								maxWidth: 500,
								marginRight: "20px",
								// height: 250,
								// mt: "20px",
								borderRadius: "15px",
								padding: "20px",
								boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)",
								gap: "25px",
							}}
						>
							<div
								style={{
									position: "absolute",
									marginLeft: "185px",
									marginTop: "-65px",
								}}
							>
								<img
									src="/userFeedback_2.jpg"
									style={{
										width: "95px",
										height: "95px",
										borderRadius: "1000px",
										boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
									}}
								/>
							</div>
							<div style={{ display: "flex", flexDirection: "column" }}>
								<FaQuoteLeft
									color="#0f734d"
									size={20}
									style={{ marginTop: "20px", marginLeft: "-10px" }}
								/>
								<Text
									b
									css={{
										display: "flex",
										whiteSpace: "normal",
										// marginTop: "35px",
										paddingBottom: "10px",
										lineHeight: 1.2,
										textAlign: "justify",
										maxWidth: "95%",
										alignSelf: "center",
										"@media only screen and (max-width: 768px)": {
											fontSize: "10px",
										},
									}}
								>
									I have been investing with KamayaKya since over a year now and
									I only have good things to say. Very good returns,
									transparency and a team of market experts with amazing
									investment strategies. I plan to invest with the firm for a
									long time and I would highly recommend it too.
								</Text>
								<FaQuoteRight
									color="#0f734d"
									size={20}
									style={{
										marginTop: 0,
										marginRight: 0,
										alignSelf: "flex-end",
									}}
								/>
								<Text b css={{ textAlign: "end", marginTop: "10px" }}>
									{" "}
									- Tanish Mittal, Hindustan Pressings Pvt. Ltd
								</Text>
							</div>
						</Box>
						<Box
							sx={{
								// display: "flex",
								minWidth: 500,
								maxWidth: 500,
								marginRight: "20px",
								// height: "100%",
								// mt: "20px",
								borderRadius: "15px",
								padding: "20px",
								boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)",
								gap: "25px",
							}}
						>
							<div
								style={{
									position: "absolute",
									marginLeft: "185px",
									marginTop: "-65px",
								}}
							>
								<img
									src="/userFeedback_1.jpg"
									style={{
										width: "95px",
										height: "95px",
										borderRadius: "1000px",
										boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
									}}
								/>
							</div>
							<div style={{ display: "flex", flexDirection: "column" }}>
								<FaQuoteLeft
									color="#0f734d"
									size={20}
									style={{ marginTop: "20px", marginLeft: "-10px" }}
								/>
								<Text
									b
									css={{
										display: "flex",
										whiteSpace: "normal",
										// marginTop: "35px",
										paddingBottom: "10px",
										lineHeight: 1.2,
										textAlign: "justify",
										maxWidth: "95%",
										alignSelf: "center",
										"@media only screen and (max-width: 768px)": {
											fontSize: "10px",
										},
									}}
								>
									My experience with Kamayakya in both their smallcase and VIP+
									website subscription has been great so far. Their in depth
									analysis of stocks, understanding the market scenario and
									balancing the risk reward ratio are unmatched in the industry.
									Some of their small cap picks are truly gems that have created
									huge wealth for their investors. I would highly recommend
									investors to take their services to achieve their long term
									financial goals.
								</Text>
								<FaQuoteRight
									color="#0f734d"
									size={20}
									style={{
										marginTop: 0,
										marginRight: 0,
										alignSelf: "flex-end",
									}}
								/>
								<Text b css={{ textAlign: "end", marginTop: "10px" }}>
									{" "}
									- Kiran Sanghvi, Indus Properties
								</Text>
							</div>
						</Box>
						<Box
							sx={{
								// display: "flex",
								minWidth: 500,
								maxWidth: 500,
								marginRight: "20px",
								// height: 250,
								// mt: "20px",
								borderRadius: "15px",
								padding: "20px",
								boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)",
								gap: "25px",
							}}
						>
							<div
								style={{
									position: "absolute",
									marginLeft: "185px",
									marginTop: "-65px",
								}}
							>
								<img
									src="/userFeedback_2.jpg"
									style={{
										width: "95px",
										height: "95px",
										borderRadius: "1000px",
										boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
									}}
								/>
							</div>
							<div style={{ display: "flex", flexDirection: "column" }}>
								<FaQuoteLeft
									color="#0f734d"
									size={20}
									style={{ marginTop: "20px", marginLeft: "-10px" }}
								/>
								<Text
									b
									css={{
										display: "flex",
										whiteSpace: "normal",
										// marginTop: "35px",
										paddingBottom: "10px",
										lineHeight: 1.2,
										textAlign: "justify",
										maxWidth: "95%",
										alignSelf: "center",
										"@media only screen and (max-width: 768px)": {
											fontSize: "10px",
										},
									}}
								>
									I have been investing with KamayaKya since over a year now and
									I only have good things to say. Very good returns,
									transparency and a team of market experts with amazing
									investment strategies. I plan to invest with the firm for a
									long time and I would highly recommend it too.
								</Text>
								<FaQuoteRight
									color="#0f734d"
									size={20}
									style={{
										marginTop: 0,
										marginRight: 0,
										alignSelf: "flex-end",
									}}
								/>
								<Text b css={{ textAlign: "end", marginTop: "10px" }}>
									{" "}
									- Tanish Mittal, Hindustan Pressings Pvt. Ltd
								</Text>
							</div>
						</Box>
					</div> */}
				{/* </Box> */}
			</div>
		</section>
	);
};

export default Testimonials;
