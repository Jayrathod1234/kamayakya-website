import { Box, IconButton, useMediaQuery } from "@mui/material";
import { Text } from "@nextui-org/react";
import React, { useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

const Section2 = () => {
	const carousel = useRef<AliceCarousel>(null);
	const isMobile = useMediaQuery("(max-width:780px)");

	const TeamCards = [
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
			}}
		>
			<Box
				sx={{
					alignSelf: "center",
					display: "flex",
					flexDirection: "column",
					// marginBottom: "50px",
					// maxWidth: "300px",
					// width: "100%",
					alignItems: "flex-start",
					// marginRight: "8px",
					"@media only screen and (max-width: 764px)": {
						width: "100%",
						// height: "500px",
						marginBottom: "20px",
						maxWidth: "350px",
					},
				}}
			>
				<img
					// src="https://www.greenapplewellness.com.au/wp-content/uploads/image-placeholder-350x350-1.png"
					src="kmk-dhiren-shah.jpeg"
					alt="Dhiren Shah | KamayaKya Wealth Management"
					// width="100%";
					className="pfpTeam-mobile"
					style={{
						height: "265px",
						// maxHeight: "350px",
						// maxWidth: "265pxpx",
						width: "265px",
						objectFit: "cover",
						objectPosition: "top",
					}}
				/>
				<div
					style={{
						width: "40px",
						height: "4px",
						backgroundColor: "#FF9E24",
						marginTop: "20px",
						marginBottom: "7.5px",
						borderRadius: "1000px",
					}}
				/>
				<Text
					b
					size={28}
					css={{
						marginTop: 0,
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.1,
							fontSize: 35,
							marginTop: "5px",
						},
					}}
				>
					Dhiren Shah
				</Text>
				<Text
					b
					size={16}
					css={{
						lineHeight: 1,
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.1,
							fontSize: 17.5,
						},
					}}
				>
					(Director & Co-Founder)
				</Text>
				<Text
					size={15}
					css={{
						lineHeight: 1.2,
						maxWidth: "265px",
						marginTop: "10px",
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.2,
							fontSize: 17.5,
							maxWidth: "100%",
							marginTop: "10px",
						},
					}}
				>
					For the past 25 years, Dhiren has been an enthusiastic equity investor
					who possesses a strong passion for small-cap stocks. Additionally, he
					manages well-established businesses within the e-Commerce, Animation
					Software, and Media sectors.
				</Text>
			</Box>
		</Box>,
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
			}}
		>
			<Box
				sx={{
					alignSelf: "center",
					display: "flex",
					flexDirection: "column",
					// marginBottom: "50px",
					maxWidth: "300px",
					alignItems: "flex-start",
					"@media only screen and (max-width: 764px)": {
						width: "100%",
						// height: "500px",
						marginBottom: "20px",
						maxWidth: "350px",
					},
				}}
			>
				<img
					// src="https://www.greenapplewellness.com.au/wp-content/uploads/image-placeholder-350x350-1.png"
					src="anandShah.jpg"
					alt="Anand Shah | KamayaKya Wealth Management"
					// width="100%";
					className="pfpTeam-mobile"
					style={{
						height: "265px",
						// maxHeight: "350px",
						// maxWidth: "265pxpx",
						width: "265px",
						objectFit: "cover",
						objectPosition: "top",
					}}
				/>
				<div
					style={{
						width: "40px",
						height: "4px",
						backgroundColor: "#FF9E24",
						marginTop: "20px",
						marginBottom: "7.5px",
						borderRadius: "1000px",
					}}
				/>
				<Text
					b
					size={28}
					css={{
						marginTop: 0,
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.1,
							fontSize: 35,
							marginTop: "5px",
						},
					}}
				>
					Anand Shah
				</Text>
				<Text
					b
					size={16}
					css={{
						lineHeight: 1,
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.1,
							fontSize: 17.5,
						},
					}}
				>
					(Director & Co-Founder)
				</Text>
				<Text
					size={15}
					css={{
						lineHeight: 1.2,
						maxWidth: "265px",
						marginTop: "10px",
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.2,
							fontSize: 17.5,
							maxWidth: "100%",
							marginTop: "10px",
						},
					}}
				>
					With over 25 years of expertise in system integration for media,
					entertainment, and technology products, Anand possesses extensive
					experience in online and offline distribution. Additionally, he has
					actively invested in startups within the gaming & equity research
					industries.
				</Text>
			</Box>
		</Box>,
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
			}}
		>
			<Box
				sx={{
					alignSelf: "center",
					display: "flex",
					flexDirection: "column",
					// marginBottom: "50px",
					maxWidth: "300px",
					alignItems: "flex-start",
					"@media only screen and (max-width: 764px)": {
						width: "100%",
						// height: "500px",
						marginBottom: "20px",
						maxWidth: "350px",
					},
				}}
			>
				<img
					src="/nityaShah.jpg"
					alt="Nitya Shah | KamayaKya Wealth Management"
					// width="100%";
					className="pfpTeam-mobile"
					style={{
						height: "265px",
						// maxHeight: "350px",
						// maxWidth: "265pxpx",
						width: "265px",
						objectFit: "cover",
						objectPosition: "top",
					}}
				/>
				<div
					style={{
						width: "40px",
						height: "4px",
						backgroundColor: "#FF9E24",
						marginTop: "20px",
						marginBottom: "7.5px",
						borderRadius: "1000px",
					}}
				/>
				<Text
					b
					size={28}
					css={{
						marginTop: 0,
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.1,
							fontSize: 35,
							marginTop: "5px",
						},
					}}
				>
					Nitya Shah
				</Text>
				<Text
					b
					size={16}
					css={{
						lineHeight: 1,
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.1,
							fontSize: 17.5,
						},
					}}
				>
					(Director & Co-Founder)
				</Text>
				<Text
					size={15}
					css={{
						lineHeight: 1.2,
						maxWidth: "265px",
						marginTop: "10px",
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.2,
							fontSize: 17.5,
							maxWidth: "100%",
							marginTop: "10px",
						},
					}}
				>
					{/* Nitya has cleared CFA Level 1 and NISM Research Analyst exam. He
has an investing experience of 5 years and has worked for 2 years
in product development and investment research at an Investment
Advisory in the past. */}
					Nitya has cleared CFA Level 1, M.Com from Pune University and NISM
					Research Analyst exam. He has an investing experience of 5 years and
					has worked for 2 years in product development and investment research
					at an Investment Advisory in the past.
				</Text>
			</Box>
		</Box>,
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
			}}
		>
			<Box
				sx={{
					alignSelf: "center",
					display: "flex",
					flexDirection: "column",
					// marginBottom: "50px",
					maxWidth: "300px",
					alignItems: "flex-start",
					"@media only screen and (max-width: 764px)": {
						width: "100%",
						// height: "500px",
						marginBottom: "20px",
						maxWidth: "350px",
					},
				}}
			>
				<img
					src="/aniketKulkarni.JPG"
					alt="Aniket Kulkarni | KamayaKya Wealth Management"
					// width="100%";
					className="pfpTeam-mobile"
					style={{
						height: "265px",
						// maxHeight: "350px",
						// maxWidth: "265pxpx",
						width: "265px",
						objectFit: "cover",
						objectPosition: "top",
					}}
				/>
				<div
					style={{
						width: "40px",
						height: "4px",
						backgroundColor: "#FF9E24",
						marginTop: "20px",
						marginBottom: "7.5px",
						borderRadius: "1000px",
					}}
				/>
				<Text
					b
					size={28}
					css={{
						marginTop: 0,
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.1,
							fontSize: 35,
							marginTop: "5px",
						},
					}}
				>
					Aniket Kulkarni
				</Text>
				<Text
					b
					size={16}
					css={{
						lineHeight: 1,
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.1,
							fontSize: 17.5,
						},
					}}
				>
					(Director & Co-Founder)
				</Text>
				<Text
					size={15}
					css={{
						lineHeight: 1.2,
						maxWidth: "265px",
						marginTop: "10px",
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.2,
							fontSize: 17.5,
							maxWidth: "100%",
							marginTop: "10px",
						},
					}}
				>
					With a wealth of entrepreneurial experience spanning over 10 years in
					sports and internet businesses, Aniket also possesses more than 3
					years of specialized expertise in equity research and over 5 years in
					the field of investing, wherein he discovered several multibaggers. As
					a testament to his continuous pursuit of growth and learning, he is
					also an alumnus of GrowthX.
				</Text>
			</Box>
		</Box>,
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
			}}
		>
			<Box
				sx={{
					alignSelf: "center",
					display: "flex",
					flexDirection: "column",
					// marginBottom: "50px",
					maxWidth: "300px",
					alignItems: "flex-start",
					"@media only screen and (max-width: 764px)": {
						width: "100%",
						// height: "500px",
						marginBottom: "20px",
						maxWidth: "350px",
					},
				}}
			>
				<img
					src="/tusharRaghate.jpg"
					alt="Tushar Raghatate | KamayaKya Wealth Management"
					// width="100%";
					className="pfpTeam-mobile"
					style={{
						height: "265px",
						// maxHeight: "350px",
						// maxWidth: "265pxpx",
						width: "265px",
						objectFit: "cover",
					}}
				/>
				<div
					style={{
						width: "40px",
						height: "4px",
						backgroundColor: "#FF9E24",
						marginTop: "20px",
						marginBottom: "7.5px",
						borderRadius: "1000px",
					}}
				/>
				<Text
					b
					size={28}
					css={{
						marginTop: 0,
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.1,
							fontSize: 35,
							marginTop: "5px",
						},
					}}
				>
					Tushar Raghatate
				</Text>
				<Text
					b
					size={16}
					css={{
						lineHeight: 1,
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.1,
							fontSize: 17.5,
						},
					}}
				>
					(Equity Research Analyst)
				</Text>
				<Text
					size={15}
					css={{
						lineHeight: 1.2,
						maxWidth: "265px",
						marginTop: "10px",
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.2,
							fontSize: 17.5,
							maxWidth: "100%",
							marginTop: "10px",
						},
					}}
				>
					Tushar, brings a comprehensive skill set to the table. With a solid
					background of over 2 years of experience, Tushar possesses a deep
					understanding of diverse sectors such as capital goods, building
					materials, infrastructure, cement, steel, power, and consumer
					durables.
				</Text>
			</Box>
		</Box>,
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
			}}
		>
			<Box
				sx={{
					alignSelf: "center",
					display: "flex",
					flexDirection: "column",
					// marginBottom: "50px",
					maxWidth: "300px",
					alignItems: "flex-start",
					"@media only screen and (max-width: 764px)": {
						width: "100%",
						// height: "500px",
						marginBottom: "20px",
						maxWidth: "350px",
					},
				}}
			>
				<img
					src="/kmk-pratik.jpg"
					alt="Pratik Kulkarni | KamayaKya Wealth Management"
					// width="100%";
					className="pfpTeam-mobile"
					style={{
						height: "265px",
						// maxHeight: "350px",
						// maxWidth: "265pxpx",
						width: "265px",
						objectFit: "cover",
						objectPosition: "top",
					}}
				/>
				<div
					style={{
						width: "40px",
						height: "4px",
						backgroundColor: "#FF9E24",
						marginTop: "20px",
						marginBottom: "7.5px",
						borderRadius: "1000px",
					}}
				/>
				<Text
					b
					size={28}
					css={{
						marginTop: 0,
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.1,
							fontSize: 35,
							marginTop: "5px",
						},
					}}
				>
					Pratik Kulkarni
				</Text>
				<Text
					b
					size={16}
					css={{
						lineHeight: 1,
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.1,
							fontSize: 17.5,
						},
					}}
				>
					(Equity Research Analyst)
				</Text>
				<Text
					size={15}
					css={{
						lineHeight: 1.2,
						maxWidth: "265px",
						marginTop: "10px",
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.2,
							fontSize: 17.5,
							maxWidth: "100%",
							marginTop: "10px",
						},
					}}
				>
					He possesses a strong academic background, holding a B.E. in
					Electronics & Telecommunication and an M.B.A. in Finance. With over
					2.5 years of equity research experience, he deeply understands diverse
					sectors, including automobiles & ancillaries, capital goods,
					chemicals, FMCG and engineering. This expertise enhances the value of
					our extensive research process at Kamayakya.
				</Text>
			</Box>
		</Box>,
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
			}}
		>
			<Box
				sx={{
					alignSelf: "center",
					display: "flex",
					flexDirection: "column",
					// marginBottom: "50px",
					maxWidth: "300px",
					alignItems: "flex-start",
					"@media only screen and (max-width: 764px)": {
						width: "100%",
						// height: "500px",
						marginBottom: "20px",
						maxWidth: "350px",
					},
				}}
			>
				<img
					src="/kmk-manan.jpg"
					alt="Manan Madlani | KamayaKya Wealth Management"
					// width="100%";
					className="pfpTeam-mobile"
					style={{
						height: "265px",
						// maxHeight: "350px",
						// maxWidth: "265pxpx",
						width: "265px",
						objectFit: "cover",
						objectPosition: "top",
					}}
				/>
				<div
					style={{
						width: "40px",
						height: "4px",
						backgroundColor: "#FF9E24",
						marginTop: "20px",
						marginBottom: "7.5px",
						borderRadius: "1000px",
					}}
				/>
				<Text
					b
					size={28}
					css={{
						marginTop: 0,
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.1,
							fontSize: 35,
							marginTop: "5px",
						},
					}}
				>
					Manan Madlani
				</Text>
				<Text
					b
					size={16}
					css={{
						lineHeight: 1,
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.1,
							fontSize: 17.5,
						},
					}}
				>
					(Associate)
				</Text>
				<Text
					size={15}
					css={{
						lineHeight: 1.2,
						maxWidth: "265px",
						marginTop: "10px",
						"@media only screen and (max-width: 764px)": {
							lineHeight: 1.2,
							fontSize: 17.5,
							maxWidth: "100%",
							marginTop: "10px",
						},
					}}
				>
					He is a B.com (Advanced Accounting & Auditing) graduate and CFA Level
					2 candidate with a proven track record of 4 years in equity research.
					Specializing in diverse sectors like Building Material, BFSI, Textile,
					Consumer Staple, and Consumer Discretionary, his expertise is further
					bolstered by the NISM Research Analyst Certification.
				</Text>
			</Box>
		</Box>,
	];

	const responsive = {
		0: {
			items: 1,
		},
		730: {
			items: 2,
		},
		800: {
			items: 3,
		},
		1024: {
			items: 4,
			// itemsFit: 'cover'
		},
	};

	return (
		<section
			id="team"
			style={{
				width: "100%",
				backgroundColor: "#fff",
				paddingTop: "60px",
				paddingBottom: "60px",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					width: "100vw",
					maxWidth: "85rem",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					margin: "0 auto",
					padding: "0 15px",
				}}
			>
				<Text
					b
					size={60}
					css={{
						textAlign: "center",
						paddingBottom: "30px",
						"@media only screen and (max-width: 764px)": {
							textAlign: "left",
							fontSize: 45,
							lineHeight: 1,
							paddingBottom: "10px",
							alignSelf: "flex-start",
							marginTop: "-30px",
						},
					}}
				>
					Meet The Team
				</Text>
				<Text
					b
					size={25}
					css={{
						textAlign: "center",
						marginBottom: "70px",
						"@media only screen and (max-width: 764px)": {
							textAlign: "left",
							fontSize: 20,
							lineHeight: 1.1,
						},
					}}
				>
					Introducing our team of seasoned equity research analysts and
					investors, driven by a passion for delivering unparalleled financial
					insights.
					<br />
					We eat, drink and breathe equities!
				</Text>
				{/* <Box
					sx={{
						marginTop: "70px",
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						width: "100%",
						maxWidth: "80rem",
						justifyContent: "center",
						gap: "50px",
						"@media only screen and (max-width: 764px)": {
							gap: "10px",
							marginTop: "50px",
							justifyContent: "center",
						},
					}}
				>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							marginBottom: "50px",
							maxWidth: "300px",
							alignItems: "flex-start",
							"@media only screen and (max-width: 764px)": {
								width: "100%",
								// height: "500px",
								marginBottom: "20px",
								maxWidth: "350px",
							},
						}}
					>
						<img
							// src="https://www.greenapplewellness.com.au/wp-content/uploads/image-placeholder-350x350-1.png"
							src="kmk-dhiren-shah.jpeg"
							alt="Dhiren Shah | KamayaKya Wealth Management"
							// width="100%";
							className="pfpTeam-mobile"
							style={{
								height: "265px",
								// maxHeight: "350px",
								// maxWidth: "265pxpx",
								width: "265px",
								objectFit: "cover",
								objectPosition: "top",
							}}
						/>
						<div
							style={{
								width: "40px",
								height: "4px",
								backgroundColor: "#FF9E24",
								marginTop: "20px",
								marginBottom: "7.5px",
								borderRadius: "1000px",
							}}
						/>
						<Text
							b
							size={28}
							css={{
								marginTop: 0,
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.1,
									fontSize: 35,
									marginTop: "5px",
								},
							}}
						>
							Dhiren Shah
						</Text>
						<Text
							b
							size={16}
							css={{
								lineHeight: 1,
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.1,
									fontSize: 17.5,
								},
							}}
						>
							(Director & Co-Founder)
						</Text>
						<Text
							size={15}
							css={{
								lineHeight: 1.2,
								maxWidth: "265px",
								marginTop: "10px",
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.2,
									fontSize: 17.5,
									maxWidth: "100%",
									marginTop: "10px",
								},
							}}
						>
							For the past 25 years, Dhiren has been an enthusiastic equity
							investor who possesses a strong passion for small-cap stocks.
							Additionally, he manages well-established businesses within the
							e-Commerce, Animation Software, and Media sectors.
						</Text>
					</Box>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							marginBottom: "50px",
							maxWidth: "300px",
							alignItems: "flex-start",
							"@media only screen and (max-width: 764px)": {
								width: "100%",
								// height: "500px",
								marginBottom: "20px",
								maxWidth: "350px",
							},
						}}
					>
						<img
							// src="https://www.greenapplewellness.com.au/wp-content/uploads/image-placeholder-350x350-1.png"
							src="anandShah.jpg"
							alt="Anand Shah | KamayaKya Wealth Management"
							// width="100%";
							className="pfpTeam-mobile"
							style={{
								height: "265px",
								// maxHeight: "350px",
								// maxWidth: "265pxpx",
								width: "265px",
								objectFit: "cover",
								objectPosition: "top",
							}}
						/>
						<div
							style={{
								width: "40px",
								height: "4px",
								backgroundColor: "#FF9E24",
								marginTop: "20px",
								marginBottom: "7.5px",
								borderRadius: "1000px",
							}}
						/>
						<Text
							b
							size={28}
							css={{
								marginTop: 0,
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.1,
									fontSize: 35,
									marginTop: "5px",
								},
							}}
						>
							Anand Shah
						</Text>
						<Text
							b
							size={16}
							css={{
								lineHeight: 1,
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.1,
									fontSize: 17.5,
								},
							}}
						>
							(Director & Co-Founder)
						</Text>
						<Text
							size={15}
							css={{
								lineHeight: 1.2,
								maxWidth: "265px",
								marginTop: "10px",
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.2,
									fontSize: 17.5,
									maxWidth: "100%",
									marginTop: "10px",
								},
							}}
						>
							With over 25 years of expertise in system integration for media,
							entertainment, and technology products, Anand possesses extensive
							experience in online and offline distribution. Additionally, he
							has actively invested in startups within the gaming & equity
							research industries.
						</Text>
					</Box>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							marginBottom: "50px",
							maxWidth: "300px",
							alignItems: "flex-start",
							"@media only screen and (max-width: 764px)": {
								width: "100%",
								// height: "500px",
								marginBottom: "20px",
								maxWidth: "350px",
							},
						}}
					>
						<img
							src="/nityaShah.jpg"
							alt="Nitya Shah | KamayaKya Wealth Management"
							// width="100%";
							className="pfpTeam-mobile"
							style={{
								height: "265px",
								// maxHeight: "350px",
								// maxWidth: "265pxpx",
								width: "265px",
								objectFit: "cover",
								objectPosition: "top",
							}}
						/>
						<div
							style={{
								width: "40px",
								height: "4px",
								backgroundColor: "#FF9E24",
								marginTop: "20px",
								marginBottom: "7.5px",
								borderRadius: "1000px",
							}}
						/>
						<Text
							b
							size={28}
							css={{
								marginTop: 0,
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.1,
									fontSize: 35,
									marginTop: "5px",
								},
							}}
						>
							Nitya Shah
						</Text>
						<Text
							b
							size={16}
							css={{
								lineHeight: 1,
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.1,
									fontSize: 17.5,
								},
							}}
						>
							(Director & Co-Founder)
						</Text>
						<Text
							size={15}
							css={{
								lineHeight: 1.2,
								maxWidth: "265px",
								marginTop: "10px",
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.2,
									fontSize: 17.5,
									maxWidth: "100%",
									marginTop: "10px",
								},
							}}
						>
							Nitya has cleared CFA Level 1, M.Com from Pune University and NISM
							Research Analyst exam. He has an investing experience of 5 years
							and has worked for 2 years in product development and investment
							research at an Investment Advisory in the past.
						</Text>
					</Box>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							marginBottom: "50px",
							maxWidth: "300px",
							alignItems: "flex-start",
							"@media only screen and (max-width: 764px)": {
								width: "100%",
								// height: "500px",
								marginBottom: "20px",
								maxWidth: "350px",
							},
						}}
					>
						<img
							src="/aniketKulkarni.JPG"
							alt="Aniket Kulkarni | KamayaKya Wealth Management"
							// width="100%";
							className="pfpTeam-mobile"
							style={{
								height: "265px",
								// maxHeight: "350px",
								// maxWidth: "265pxpx",
								width: "265px",
								objectFit: "cover",
								objectPosition: "top",
							}}
						/>
						<div
							style={{
								width: "40px",
								height: "4px",
								backgroundColor: "#FF9E24",
								marginTop: "20px",
								marginBottom: "7.5px",
								borderRadius: "1000px",
							}}
						/>
						<Text
							b
							size={28}
							css={{
								marginTop: 0,
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.1,
									fontSize: 35,
									marginTop: "5px",
								},
							}}
						>
							Aniket Kulkarni
						</Text>
						<Text
							b
							size={16}
							css={{
								lineHeight: 1,
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.1,
									fontSize: 17.5,
								},
							}}
						>
							(Director & Co-Founder)
						</Text>
						<Text
							size={15}
							css={{
								lineHeight: 1.2,
								maxWidth: "265px",
								marginTop: "10px",
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.2,
									fontSize: 17.5,
									maxWidth: "100%",
									marginTop: "10px",
								},
							}}
						>
							With a wealth of entrepreneurial experience spanning over 10 years
							in sports and internet businesses, Aniket also possesses more than
							3 years of specialized expertise in equity research and over 5
							years in the field of investing, wherein he discovered several
							multibaggers. As a testament to his continuous pursuit of growth
							and learning, he is also an alumnus of GrowthX.
						</Text>
					</Box>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							marginBottom: "50px",
							maxWidth: "300px",
							alignItems: "flex-start",
							"@media only screen and (max-width: 764px)": {
								width: "100%",
								// height: "500px",
								marginBottom: "20px",
								maxWidth: "350px",
							},
						}}
					>
						<img
							src="/tusharRaghate.jpg"
							alt="Tushar Raghatate | KamayaKya Wealth Management"
							// width="100%";
							className="pfpTeam-mobile"
							style={{
								height: "265px",
								// maxHeight: "350px",
								// maxWidth: "265pxpx",
								width: "265px",
								objectFit: "cover",
							}}
						/>
						<div
							style={{
								width: "40px",
								height: "4px",
								backgroundColor: "#FF9E24",
								marginTop: "20px",
								marginBottom: "7.5px",
								borderRadius: "1000px",
							}}
						/>
						<Text
							b
							size={28}
							css={{
								marginTop: 0,
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.1,
									fontSize: 35,
									marginTop: "5px",
								},
							}}
						>
							Tushar Raghatate
						</Text>
						<Text
							b
							size={16}
							css={{
								lineHeight: 1,
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.1,
									fontSize: 17.5,
								},
							}}
						>
							(Equity Research Analyst)
						</Text>
						<Text
							size={15}
							css={{
								lineHeight: 1.2,
								maxWidth: "265px",
								marginTop: "10px",
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.2,
									fontSize: 17.5,
									maxWidth: "100%",
									marginTop: "10px",
								},
							}}
						>
							Tushar, brings a comprehensive skill set to the table. With a
							solid background of over 2 years of experience, Tushar possesses a
							deep understanding of diverse sectors such as capital goods,
							building materials, infrastructure, cement, steel, power, and
							consumer durables.
						</Text>
					</Box>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							marginBottom: "50px",
							maxWidth: "300px",
							alignItems: "flex-start",
							"@media only screen and (max-width: 764px)": {
								width: "100%",
								// height: "500px",
								marginBottom: "20px",
								maxWidth: "350px",
							},
						}}
					>
						<img
							src="/kmk-pratik.jpg"
							alt="Pratik Kulkarni | KamayaKya Wealth Management"
							// width="100%";
							className="pfpTeam-mobile"
							style={{
								height: "265px",
								// maxHeight: "350px",
								// maxWidth: "265pxpx",
								width: "265px",
								objectFit: "cover",
								objectPosition: "top",
							}}
						/>
						<div
							style={{
								width: "40px",
								height: "4px",
								backgroundColor: "#FF9E24",
								marginTop: "20px",
								marginBottom: "7.5px",
								borderRadius: "1000px",
							}}
						/>
						<Text
							b
							size={28}
							css={{
								marginTop: 0,
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.1,
									fontSize: 35,
									marginTop: "5px",
								},
							}}
						>
							Pratik Kulkarni
						</Text>
						<Text
							b
							size={16}
							css={{
								lineHeight: 1,
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.1,
									fontSize: 17.5,
								},
							}}
						>
							(Equity Research Analyst)
						</Text>
						<Text
							size={15}
							css={{
								lineHeight: 1.2,
								maxWidth: "265px",
								marginTop: "10px",
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.2,
									fontSize: 17.5,
									maxWidth: "100%",
									marginTop: "10px",
								},
							}}
						>
							He possesses a strong academic background, holding a B.E. in
							Electronics & Telecommunication and an M.B.A. in Finance. With
							over 2.5 years of equity research experience, he deeply
							understands diverse sectors, including automobiles & ancillaries,
							capital goods, chemicals, FMCG and engineering. This expertise
							enhances the value of our extensive research process at Kamayakya.
						</Text>
					</Box>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							marginBottom: "50px",
							maxWidth: "300px",
							alignItems: "flex-start",
							"@media only screen and (max-width: 764px)": {
								width: "100%",
								// height: "500px",
								marginBottom: "20px",
								maxWidth: "350px",
							},
						}}
					>
						<img
							src="/kmk-manan.jpg"
							alt="Manan Madlani | KamayaKya Wealth Management"
							// width="100%";
							className="pfpTeam-mobile"
							style={{
								height: "265px",
								// maxHeight: "350px",
								// maxWidth: "265pxpx",
								width: "265px",
								objectFit: "cover",
								objectPosition: "top",
							}}
						/>
						<div
							style={{
								width: "40px",
								height: "4px",
								backgroundColor: "#FF9E24",
								marginTop: "20px",
								marginBottom: "7.5px",
								borderRadius: "1000px",
							}}
						/>
						<Text
							b
							size={28}
							css={{
								marginTop: 0,
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.1,
									fontSize: 35,
									marginTop: "5px",
								},
							}}
						>
							Manan Madlani
						</Text>
						<Text
							b
							size={16}
							css={{
								lineHeight: 1,
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.1,
									fontSize: 17.5,
								},
							}}
						>
							(Associate)
						</Text>
						<Text
							size={15}
							css={{
								lineHeight: 1.2,
								maxWidth: "265px",
								marginTop: "10px",
								"@media only screen and (max-width: 764px)": {
									lineHeight: 1.2,
									fontSize: 17.5,
									maxWidth: "100%",
									marginTop: "10px",
								},
							}}
						>
							He is a B.com (Advanced Accounting & Auditing) graduate and CFA
							Level 2 candidate with a proven track record of 4 years in equity
							research. Specializing in diverse sectors like Building Material,
							BFSI, Textile, Consumer Staple, and Consumer Discretionary, his
							expertise is further bolstered by the NISM Research
							Analyst Certification.
						</Text>
					</Box>
				</Box> */}
				<Box
					sx={{
						display: "flex",
						width: "90%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{!isMobile && (
						<IconButton onClick={(e) => carousel?.current?.slidePrev(e)}>
							<CiCircleChevLeft size={40} color="#094f48" />
						</IconButton>
					)}
					<AliceCarousel
						mouseTracking
						items={TeamCards}
						responsive={responsive}
						disableButtonsControls
						infinite
						autoPlay={true}
						autoPlayInterval={5000}
						controlsStrategy="alternate"
						ref={carousel}

					/>
					{!isMobile && (
						<IconButton onClick={(e) => carousel?.current?.slideNext(e)}>
							<CiCircleChevRight size={40} color="#094f48" />
						</IconButton>
					)}
				</Box>
			</div>
		</section>
	);
};

export default Section2;
