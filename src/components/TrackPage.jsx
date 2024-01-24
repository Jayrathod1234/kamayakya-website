import {
	Text,
	Button,
	Card,
	Modal,
	Divider,
	Progress,
	Dropdown,
	useModal,
	Loading,
} from "@nextui-org/react";
import Marquee from "react-fast-marquee";
import React, { useState, useContext, useEffect } from "react";
import { Box, Grid, IconButton, LinearProgress } from "@mui/material";
import ReactCardFlip from "react-card-flip";
import {
	ArrowCircleRight,
	ArrowCircleUp,
	DocumentText,
	LockCircle,
} from "iconsax-react";
import FaqsNew from "@/pages/screens/FaqsNew";
import AuthContext from "@/components/AuthContext";
import { TRACK_RECORD_FOR_ALL, TRACK_RECORD_FOR_USER } from "@/pages/api/URLs";
import Footer from "@/pages/screens/Footer";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { DocumentAskPasswordEvent } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import packageJson from "../../package.json";
import CloseIcon from "@mui/icons-material/Close";
import Login from "@/components/Login";

const WhyUs = () => {
	// const { setVisible, bindings } = useModal();
	const [flipStates, setFlipStates] = useState(Array(8).fill(false));
	const [record, setRecord] = useState([]);
	const { isLoggedIn } = useContext(AuthContext);
	const { isSubscribed } = useContext(AuthContext);
	// const pdfjsVersion = packageJson.dependencies["pdfjs-dist"];
	// const { setVisible, bindings } = useModal();

	const [isLoadingTrackRecord, setisLoadingTrackRecord] = useState(true);

	const handleTrackRecord = async () => {
		try {
			setisLoadingTrackRecord(true);
			const refreshToken = localStorage.getItem("refresh");

			const url = isLoggedIn ? TRACK_RECORD_FOR_USER : TRACK_RECORD_FOR_ALL;

			const headers = {
				"Content-Type": "application/json",
			};

			if (isLoggedIn) {
				headers.Authorization = `token ${refreshToken}`;
			}

			const response = await fetch(url, {
				method: "GET",
				headers,
			});

			if (response.ok) {
				const data = await response.json();
				setRecord(data);
				// console.log(data);
				// await delay(3);
				setisLoadingTrackRecord(false);
			} else {
				// Handle API call error
				console.error("Error Getting Track Records | Track Record Page");
			}
		} catch (error) {
			// Handle any other error
			console.error(error);
			// console.log("no call");
		}
	};

	useEffect(() => {
		handleTrackRecord().then((r) => console.log(record));
	}, [isLoggedIn]);

	const handleClick = (index) => {
		const newFlipStates = flipStates.map((state, i) =>
			i == index ? !state : false
		);
		setFlipStates(newFlipStates);
	};
	const [showPDF, setShowPDF] = useState(false);

	const handlePDF = () => {
		setShowPDF(true);
	};

	const handlePDFClose = () => {
		setShowPDF(false);
	};

	const [showCert, setShowCert] = useState(false);

	const handleCert = () => {
		// setShowCert(true);
		var win = window.open(
			"Kamayakya-SEBI-License.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
		// win.document.write('<PdfViewer pdf={PDF}/>');
	};

	const handleCertClose = () => {
		setShowCert(false);
	};

	const [showTargets, setShowTargets] = useState(false);
	const [showReports, setShowReports] = useState(false);
	const [selectedCardIndex, setSelectedCardIndex] = useState([]);
	const [selectedReportUrl, setSelectedReportUrl] = useState("");
	const [showLoginModal, setShowLoginModal] = useState(false);

	const handleLogin = () => {
		setShowLoginModal(true);
	};
	const handleCloseLoginModal = () => {
		setShowLoginModal(false);
	};

	const handleCloseTargets = () => {
		setShowTargets(false);
	};
	const handleOpenTargets = (index) => {
		setSelectedCardIndex(index);
		setShowTargets(true);
	};

	const [selectedPDF, setSelectedPDF] = useState(new Set([""]));

	const PdfValue = React.useMemo(
		() => Array.from(selectedPDF)[0],
		[selectedPDF]
	);

	const handleCloseReports = () => {
		setShowReports(false);
		setSelectedPDF("");
	};
	const handleOpenReports = (index) => {
		setSelectedCardIndex(index);
		setShowReports(true);

		if (record[index].stock_reports && record[index].stock_reports.length > 0) {
			const firstReportUrl = record[index].stock_reports[0].document;
			setSelectedReportUrl(firstReportUrl);
			// setSelectedPDF(firstReportUrl);
			// console.log(selectedPDF);
			// console.log(selectedReportUrl);
		}
	};

	// const PdfURL =
	// 	selectedPDF === "" || selectedPDF === undefined
	// 		? selectedReportUrl
	// 		: PdfValue;

	const PdfURL =
		selectedPDF === "" || selectedPDF === undefined
			? selectedReportUrl
			: PdfValue;

	const handleAskPassword = (e) => {
		e.verifyPassword("$420%69#kamayakya#69%420$");
	};

	const outerData = [
		{ value: 60, name: "Hits" },
		{ value: 10, name: "Miss" },
	];

	const innerData = [
		{ value: 10, name: "Miss" },
		{ value: 60, name: "" },
	];

	const options = {
		//   title: {
		// 	text: "Call History",
		// 	x: "center",
		//   },
		//   tooltip: {
		// 	trigger: "item",
		//   },
		//   legend: {
		// 	orient: "vertical",
		// 	left: "left",
		// 	data: ["Outer", "Inner"],
		//   },
		series: [
			{
				name: "Hits",
				type: "pie",
				radius: ["50%", "65%"],
				avoidLabelOverlap: false,
				itemStyle: {
					borderWidth: 0, // Remove border
					borderRadius: 20,
					color: "#125a54",
					// background:
				},
				label: {
					show: false,
					position: "center",
				},
				emphasis: {
					label: {
						show: false,
						fontSize: "20",
						fontWeight: "bold",
					},
				},
				labelLine: {
					show: false,
				},
				data: outerData.map((item) => ({
					...item,
					itemStyle: {
						color: item.name === "Miss" ? "rgba(255, 255, 255, 0.5)" : null,
					},
					label: {
						show: true,
						position: "center",
						formatter: item.name === "Hits" ? "{d}%" : "",
						textStyle: {
							fontSize: 24,
							fontWeight: "bold",
							color: "#125a54", // Set the color of the percentage text
						},
					},
				})),
			},
			{
				name: "Miss",
				type: "pie",
				radius: ["35%", "47%"],
				avoidLabelOverlap: false,
				itemStyle: {
					borderWidth: 0, // Remove border
					borderRadius: 20,
					color: "#ffa12e",
				},
				label: {
					show: false,
					position: "center",
				},
				emphasis: {
					label: {
						show: false,
						fontSize: "14",
						fontWeight: "bold",
					},
				},
				labelLine: {
					show: false,
				},
				data: innerData.map((item) => ({
					...item,
					itemStyle: {
						color: item.name === "" ? "rgba(255,255,255, 0.5)" : null,
					},
				})),
			},
		],
	};

	return (
		<section
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
				backgroundColor: "#fff",
			}}
		>
			<Box
				sx={{
					width: "95%",
					display: "flex",
					flexDirection: "column",
					flexWrap: "wrap",
					alignItems: "center",
					paddingTop: "5vh",
					paddingBottom: "10vh",
					"@media only screen and (max-width: 764px)": {
						// maxHeight: "100vh",
						marginTop: "0px",
						paddingTop: "0px",
						justifyContent: "flex-start",
						alignItems: "flex-start",
						paddingLeft: "5px",
						paddingRight: "5px",
					},
				}}
			>
				<Box
					sx={{
						cursor: "pointer",
						// paddingLeft: "40px",
						// paddingRight: "40px",
						// paddingTop: "15px",
						// paddingBottom: "15px",
						padding: "0",
						// marginTop: "25px",
						display: "flex",
						flexDirection: "column",
						// backgroundImage: "linear-gradient(to top , #0d2c7b, #6067b5)",
						// backgroundImage: "linear-gradient(to top , #fff, #fff)",
						alignItems: "center",
						// backgroundImage: "linear-gradient(to top , #106052, #0f734d)",
						borderRadius: "1200.5px",
						"@media only screen and (max-width: 764px)": {
							paddingLeft: "5px",
							paddingRight: "5px",
							marginTop: "10px",
							marginBottom: "10px",
							borderRadius: "10px",
							alignItems: "flex-start",
							backgroundImage: "linear-gradient(to top , #fff, #fff)",
						},
					}}
				>
					<Text
						b
						size={18}
						color="#FFF"
						css={{
							fontWeight: "bolder",
							color: "#021C61",
							"@media only screen and (max-width: 764px)": {
								fontSize: 18,
								width: "100%",
								textAlign: "left",
								color: "#021C61",
							},
						}}
						onClick={handleCert}
					>
						SEBI Registered: INH000009843
					</Text>
				</Box>
				<Modal
					// width="790px"
					blur
					open={showCert}
					onClose={handleCertClose}
					css={{
						width: "65vw",
						maxWidth: "65vw",
						alignSelf: "flex-end",
						background: "transparent",
						boxShadow: "none",
						borderRadius: "15px",
						"@media only screen and (max-width: 764px)": {
							width: "95vw !important",
							maxWidth: "95vw !important",
						},
					}}
				>
					<iframe
						src="Kamayakya-SEBI-License.pdf#view=FitH&toolbar=0"
						alt="SEBI Certificate"
						style={{
							width: "100%",
							height: "75vh",
							borderColor: "transparent",
							borderRadius: "15px",
							borderWidth: "0px",
							zoom: "1",
						}}
						className="iframePdfMobile"
					/>
					{/* <Modal.Footer justify="center"> */}
					<Button
						auto
						onClick={handleCertClose}
						css={{
							// alignSelf: "end",
							width: "100%",
							backgroundColor: "#ffa12e",
							color: "#fff",
							fontSize: 19,
							marginTop: "20px",
							borderRadius: "10px",
							height: "50px",
							"@media only screen and (max-width: 768px)": {
								width: "100%",
								fontSize: 15,
								height: "50px",
								marginTop: "0px",
								borderRadius: "0px 0px 10px",
								"& span": {
									// display: "none",
								},
							},
						}}
					>
						Close
					</Button>
					{/* </Modal.Footer> */}
				</Modal>
				<Text
					b
					size={70}
					css={{
						marginTop: "0px",
						marginBottom: "0px",
						// width: "90%",
						maxWidth: "80rem" /* 1280px */,
						textAlign: "center",
						lineHeight: 1.2,
						paddingLeft: "15px",
						paddingRight: "15px",
						"@media only screen and (max-width: 764px)": {
							fontSize: 45,
							lineHeight: 1.1,
							paddingLeft: "5px",
							paddingRight: "5px",
							marginTop: "0px",
							marginBottom: "10px",
							maxWidth: "100%",
							textAlign: "left",
						},
					}}
				>
					Track Record
				</Text>

				{isLoggedIn && (
					<Text
						b
						size={18}
						css={{
							marginTop: 0,
							marginBottom: "10px",
							maxWidth: "50rem" /* 1280px */,
							textAlign: "center",
							color: "#000",
							lineHeight: 1.2,
							paddingLeft: "15px",
							paddingRight: "15px",
							"@media only screen and (max-width: 764px)": {
								fontSize: 20,
								maxWidth: "100%",
								paddingLeft: "5px",
								paddingRight: "5px",
								marginTop: "0px",
								marginBottom: "10px",
								textAlign: "left",
								color: "#000",
							},
						}}
					>
						We present our scorecard. Our victories, our misses - all in the
						open.
						<br />
						Your trust is earned, not assumed.
					</Text>
				)}
				{!isLoggedIn ? (
					<Text
						b
						size={18}
						css={{
							marginTop: 0,
							marginBottom: "40px",
							maxWidth: "50rem" /* 1280px */,
							textAlign: "center",
							color: "#FB7D15",
							lineHeight: 1.2,
							paddingLeft: "15px",
							paddingRight: "15px",
							"@media only screen and (max-width: 764px)": {
								fontSize: 20,
								maxWidth: "100%",
								paddingLeft: "5px",
								paddingRight: "5px",
								marginTop: "0px",
								marginBottom: "40px",
								textAlign: "left",
								color: "#FB7D15",
							},
						}}
					>
						NOTE: SEBI regulations restrict sharing past performance data with
						non-clients.
					</Text>
				) : (
					<span style={{ height: "30px" }} />
				)}
				{/* <Grid
					  xs={"auto"}
					  sm={"auto"}
					  md={"auto"}
					  lg={"auto"}
					  container
					  justifyContent={"center"}
					  gap={"20px"}
					  sx={{
						  background: "#fff",
						  boxShadow: "none",
						  "@media only screen and (max-width: 600px)": {
							  gap: "5px",
						  },
					  }}
				  > */}
				{isLoadingTrackRecord && (
					<Loading type={"gradient"} style={{ marginBottom: "50px" }} />
				)}

				<Grid item container gap={"20px"} justifyContent={"center"}>
					{record.map((item, index) => (
						// <ReactCardFlip
						// 	key={index}
						// 	isFlipped={flipStates[index]}
						// 	flipDirection="horizontal"
						// >
						<>
							<Card
								key={index}
								isHoverable
								css={{
									width: "450px",
									height: "380px",
									// padding: "40px",
									paddingTop: "30px",
									paddingBottom: "30px",
									backgroundImage:
										"linear-gradient(to top , #0F734D, #0F734D, #105B54)",
									borderRadius: "30px",
									borderBottomRightRadius: "5px",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									"@media only screen and (max-width: 764px)": {
										width: "95vw",
										height: "380px",
										paddingTop: "30px",
										paddingBottom: "30px",
									},
								}}
							>
								{isLoggedIn === false && (
									<Box
										sx={{
											position: "absolute",
											top: 0,
											left: 0,
											right: 0,
											bottom: 0,
											backdropFilter: "blur(10px)",
											WebkitBackdropFilter: "blur(10px)",
											margin: "0px",
											alignItems: "center",
											zIndex: "100",
											"@media only screen and (max-width: 768px)": {
												margin: "0px",
											},
										}}
									>
										<IconButton
											onClick={handleLogin}
											sx={{ top: "35%", left: "43.5%" }}
										>
											<LockCircle
												size={55}
												color={"white"}
												style={{
													top: "35%",
													left: "43.5%",
													background:
														"linear-gradient(to top , #fb7716,#fe9807)",
													paddingTop: "5px",
													paddingBottom: "5px",
													borderRadius: "10000px",
													boxShadow: "none",
													"&:hover": {
														background:
															"linear-gradient(to top , #ffa736, #ffa736)",
													},
													position: "absolute",
													alignSelf: "center",
												}}
											/>
										</IconButton>
										<Button
											// variant="contained"
											css={{
												width: "50%",
												top: "55.5%",
												left: "25%",
												background: "linear-gradient(to top , #fb7716,#fe9807)",
												paddingTop: "5px",
												paddingBottom: "5px",
												borderRadius: "10000px",
												boxShadow: "none",
												"&:hover": {
													backgroundImage:
														"linear-gradient(to top , #ffa736, #ffa736)",
												},
												position: "absolute",
												alignSelf: "center",
											}}
											onPress={handleLogin}
										>
											<Text b color="#FFF" size={18}>
												Login to unlock
											</Text>
										</Button>
										<Modal
											width="450px"
											// blur
											open={showLoginModal}
											onClose={handleCloseLoginModal}
										>
											<Box
												sx={{
													display: "flex",
													flexDirection: "row",
													width: "100%",
													justifyContent: "space-between",
													alignItems: "center",
												}}
											>
												<img src="kmk-k.png" style={{ maxWidth: "260px" }} />
												<IconButton
													sx={{
														width: "40px",
														"&:hover": { background: "#fff" },
														// alignSelf: "end",
														right: "20px",
													}}
													onClick={() => handleCloseLoginModal()}
												>
													<CloseIcon sx={{ color: "#e81123" }} />
												</IconButton>
											</Box>

											<Modal.Body>
												<Login />
											</Modal.Body>
										</Modal>
									</Box>
								)}
								<Box
									sx={{
										padding: "5px",
										paddingTop: "0px",
										paddingLeft: "15px",
										display: "flex",
										flexDirection: "column",
										// alignItems: "center",
										// background: 'rgba(255, 255, 255, 0.15) url("LineChartGreen.png")',
										backgroundSize: "cover",
										height: "auto",
										width: "410px",
										"@media only screen and (max-width: 764px)": {
											width: "100%",
											paddingLeft: "20px",
											paddingRight: "20px",
										},
									}}
								>
									<div
										style={{
											width: "100%",
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											flexDirection: "row",
											// paddingTop: "5%",
											paddingBottom: "5px",
										}}
									>
										<div style={{ display: "flex", flexDirection: "column" }}>
											<Text
												b
												size={15}
												color="#fff"
												css={{
													lineHeight: 1,
													opacity: 0.7,
													zIndex: "0",
													"@media only screen and (max-width: 764px)": {
														fontSize: "14px",
													},
												}}
											>
												STATUS: {item.status.toUpperCase()}
											</Text>
											<Text
												b
												size={22}
												color="#fff"
												css={{
													lineHeight: 1.5,
													"@media only screen and (max-width: 764px)": {
														paddingTop: "5px",
														fontSize: "22px",
														lineHeight: 1.1,
													},
													// filter:
													// 	!isLoggedIn || !isSubscribed
													// 		? "blur(10px)"
													// 		: "none",
													filter:
														((!isLoggedIn || !isSubscribed) && item.action) ===
														"BUY"
															? "blur(10px)"
															: "none",
												}}
											>
												{/* {console.log((!isLoggedIn || !isSubscribed) && item.action === "BUY" ? true : false,)} */}
												{item.stock_name.length > 28 ? (
													<Marquee delay={5} speed={30}>
														<span style={{ paddingRight: "40px" }}>
															{item.stock_name}
														</span>
													</Marquee>
												) : (
													<>{item.stock_name}</>
												)}
											</Text>
											<Text
												b
												size={16.5}
												color="#fff"
												css={{
													lineHeight: 1,
													opacity: 0.7,
													zIndex: "0",
													"@media only screen and (max-width: 764px)": {
														paddingTop: "5px",
														fontSize: "15px",
														lineHeight: 1.1,
													},
												}}
											>
												{item.tag1.toUpperCase()}
												{item.tag2 ? (
													<span> | {item.tag2.toUpperCase()}</span>
												) : (
													""
												)}
											</Text>
										</div>
										<img
											src={
												item.action === "HOLD"
													? "HoldBubbleYellow.png"
													: item.action === "SELL"
													? "SellBubbleRed.png"
													: item.action === "BUY"
													? "BuyBubbleBlue.png"
													: "HoldBubbleYellow.png"
											}
											style={{
												width: "55px",
												height: "55px",
												alignSelf: "start",
											}}
										/>
										<img
											src="trackRecord-lion.png"
											height={"120px"}
											// width={"610px"}
											style={{
												position: "absolute",
												right: "25px",
												top: "80px",
												zIndex: "0",
											}}
										/>
									</div>
									<Divider
										css={{
											height: "3px",
											width: "70%",
											background: "#fff",
											borderRadius: "20px",
											opacity: 0.5,
											alignSelf: "start",
											marginTop: "10px",
											zIndex: "0",
										}}
									/>
									<div
										style={{
											width: "95%",
											display: "flex",
											flexDirection: "row",
											marginTop: "15px",
											gap: "20px",
										}}
									>
										<Box sx={{ display: "flex", flexDirection: "column" }}>
											<Text
												b
												size={16}
												color="#fff"
												css={{
													opacity: 1,
													lineHeight: 1,
													"@media only screen and (max-width: 764px)": {
														paddingTop: "0px",
														fontSize: "14.5px",
													},
												}}
											>
												ENTRY PRICE
											</Text>
											<Text
												b
												size={22}
												color="#fff"
												css={{
													display: "flex",
													flexDirection: "row",
													alignItems: "center",
													zIndex: "0",
													"@media only screen and (max-width: 764px)": {
														paddingTop: "0px",
														fontSize: "20px",
													},
												}}
											>
												<span style={{ fontSize: 16, opacity: 0.75 }}>₹</span>
												{/* hard coding ion exchange price to 469, problem is that its giving buy rating for cmp<ep of target 2 */}
												{/*{item?.id == "25bb9fba-5b3a-4156-bcae-b504f352d980" ? (*/}
												{/*	"469"*/}
												{/*) : (*/}
													<>
														{
															item?.stock_targets[
																item?.stock_targets.length - 1
															]?.entry_price
														}
													</>
												{/*)}*/}
											</Text>
											<Text
												b
												size={16}
												color="#fff"
												css={{
													opacity: 0.7,
													lineHeight: 1,
													zIndex: "0",
													"@media only screen and (max-width: 764px)": {
														paddingTop: "0px",
														fontSize: "14.5px",
													},
												}}
											>
												{item?.stock_targets.length > 1
													? `${new Date(
															item?.stock_targets[
																item?.stock_targets.length - 1
															].created
													  ).getDate()} ${new Date(
															item?.stock_targets[
																item?.stock_targets.length - 1
															].created
													  ).toLocaleString("default", {
															month: "short",
													  })} ${new Date(
															item?.stock_targets[
																item?.stock_targets.length - 1
															].created
													  ).getFullYear()}`
													: `${new Date(item?.start_date).getDate()} ${new Date(
															item.start_date
													  ).toLocaleString("default", {
															month: "short",
													  })} ${new Date(item?.start_date).getFullYear()}`}
											</Text>
										</Box>
										<Box sx={{ display: "flex", flexDirection: "column" }}>
											<Text
												b
												size={16}
												color="#fff"
												css={{
													opacity: 1,
													lineHeight: 1,
													"@media only screen and (max-width: 764px)": {
														paddingTop: "0px",
														fontSize: "14.5px",
													},
												}}
											>
												{item.action == "SELL" ? "EXIT PRICE" : "CMP"}
											</Text>
											<Text
												b
												size={22}
												color="#fff"
												css={{
													display: "flex",
													flexDirection: "row",
													alignItems: "center",
													zIndex: "0",
													"@media only screen and (max-width: 764px)": {
														paddingTop: "0px",
														fontSize: "20px",
													},
												}}
											>
												<span style={{ fontSize: 16, opacity: 0.75 }}>₹</span>

												{item.action == "SELL" ? (
													<>{item.exit_price}</>
												) : (
													<>{item.live_price}</>
												)}
											</Text>
											<Text
												b
												size={16}
												color="#fff"
												css={{
													opacity: 0.7,
													lineHeight: 1,
													zIndex: "0",
													"@media only screen and (max-width: 764px)": {
														paddingTop: "0px",
														fontSize: "14.5px",
													},
												}}
											>
												{item.action == "SELL"
													? `${new Date(item.exit_date).getDate()} ${new Date(
															item.exit_date
													  ).toLocaleString("default", {
															month: "short",
													  })} ${new Date(item.exit_date).getFullYear()}`
													: `${new Date().getDate()} ${new Date().toLocaleString(
															"default",
															{
																month: "short",
															}
													  )} ${new Date().getFullYear()}`}

												{/*{item.end_date*/}
												{/*  ? `${new Date(item.end_date).getDate()} ${new Date(*/}
												{/*      item.end_date*/}
												{/*    ).toLocaleString("default", {*/}
												{/*      month: "short",*/}
												{/*    })} ${new Date(item.end_date).getFullYear()}`*/}
												{/*  : "--"}*/}
											</Text>
										</Box>
										{/* <Box
											sx={{
												display: "flex",
												flexDirection: "column",
												alignSelf: "center",
												marginLeft: "28%",
											}}
										>
											<Button
												auto
												onPress={() => handleClick(index)}
												css={{
													borderRadius: "10000px",
													background: "transparent",
													fontSize: 18,
													color: "#fff",
													padding: "0px",
												}}
											>
												<ArrowCircleRight size={30} />
											</Button>
										</Box> */}
									</div>
									<Divider
										css={{
											height: "3px",
											width: "40%",
											background: "#fff",
											borderRadius: "20px",
											opacity: 0.5,
											alignSelf: "start",
											marginTop: "15px",
											zIndex: "0",
										}}
									/>
									<Box
										sx={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
											marginTop: "15px",
											zIndex: "0",
										}}
									>
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												alignSelf: "flex-start",
											}}
										>
											<Text
												b
												size={16}
												color="#fff"
												css={{
													opacity: 1,
													lineHeight: 1,
													"@media only screen and (max-width: 764px)": {
														paddingTop: "0px",
														fontSize: "14.5px",
													},
												}}
											>
												RETURNS
											</Text>
											<Text
												b
												size={22}
												color="#fff"
												css={{
													display: "flex",
													// justifyContent: 'center',
													flexDirection: "row",
													alignItems: "center",
													textAlign: "center",
													// background: '#125a54',
													borderRadius: "10px",
													background: "transparent",
													"@media only screen and (max-width: 764px)": {
														paddingTop: "0px",
														fontSize: "20px",
													},
												}}
											>
												{item?.gain_loss}%
											</Text>
											<Text
												b
												size={16}
												color="#fff"
												css={{
													width: "120px",
													opacity: 0.7,
													lineHeight: 1,
													"@media only screen and (max-width: 764px)": {
														paddingTop: "0px",
														fontSize: "14.5px",
													},
												}}
											>
												{item.action == "SELL"
													? `${new Date(item.end_date).getDate()} ${new Date(
															item.end_date
													  ).toLocaleString("default", {
															month: "short",
													  })} ${new Date(item.end_date).getFullYear()}`
													: `${new Date().getDate()} ${new Date().toLocaleString(
															"default",
															{
																month: "short",
															}
													  )} ${new Date().getFullYear()}`}
											</Text>
										</Box>
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												width: "70%",
												marginLeft: "20px",
											}}
										>
											<Text
												b
												size={16}
												color="#fff"
												css={{
													opacity: 1,
													lineHeight: 1,
													marginBottom: "8px",
													"@media only screen and (max-width: 764px)": {
														paddingTop: "0px",
														fontSize: "14.5px",
													},
												}}
											>
												{item.action === "SELL" ? (
													<span>
														{item.gain_loss > 0 ? (
															<span>Profit booked in </span>
														) : item.gain_loss == 0 ? (
															<span>Exit call given in </span>
														) : (
															<span>Loss booked in </span>
														)}{" "}
														{Math.ceil(
															(new Date(item.end_date) -
																new Date(item.start_date)) /
																(1000 * 60 * 60 * 24)
														)}{" "}
														days
													</span>
												) : (
													<span>Time left: {item.time_left} days</span>
												)}
											</Text>
											<Progress
												value={Math.floor(
													(new Date() - new Date(item.start_date)) /
														(1000 * 60 * 60 * 24)
												)}
												max={
													item.stock_targets.length > 0
														? Math.round(
																(new Date(
																	item.stock_targets[
																		item.stock_targets.length - 1
																	].target_date
																).getTime() -
																	new Date(item.start_date).getTime()) /
																	(1000 * 60 * 60 * 24)
														  )
														: Math.ceil(
																(new Date(item.end_date) -
																	new Date(item.start_date)) /
																	(1000 * 60 * 60 * 24)
														  )
												}
												css={{
													width: "80%",
													opacity: 1,
													height: "22.5px",
													color: "#fff",
													backgroundColor: "rgba(255, 255, 255, 0.3)",
													".nextui-c-dwnaVv": { background: "#fff" },
												}}
											/>
											{/* {console.log(
												"Curr",
												new Date()
													.toLocaleDateString("en-GB", {
														year: "numeric",
														month: "2-digit",
														day: "2-digit",
													})
													.split("/")
													.reverse()
													.join("-"),
												"Start Date",
												item.start_date,
												"End Date",
												item.end_date,
											)} */}
											{/* {console.log(
												"Progress",
												Math.floor(
													(new Date() - new Date(item.start_date)) /
													  (1000 * 60 * 60 * 24)
												  )
											)} */}
											<Box
												sx={{
													display: "flex",
													flexDirection: "row",
													justifyContent: "space-between",
													//   justifyContent: 'center',
													width: "80%",
												}}
											>
												<Text
													b
													size={12}
													color="#fff"
													css={{ marginTop: "5px", opacity: 1 }}
												>
													0
												</Text>
												<Text
													b
													size={12}
													color="#fff"
													css={{ marginTop: "5px", opacity: 1 }}
												>
													{item.end_date ? (
														<Text
															b
															size={12}
															color="#fff"
															css={{ marginTop: "5px", opacity: 1 }}
														>
															{item.stock_targets.length > 0
																? Math.round(
																		(new Date(
																			item.stock_targets[
																				item.stock_targets.length - 1
																			].target_date
																		).getTime() -
																			new Date(item.start_date).getTime()) /
																			(1000 * 60 * 60 * 24)
																  )
																: Math.ceil(
																		(new Date(item.end_date) -
																			new Date(item.start_date)) /
																			(1000 * 60 * 60 * 24)
																  )}
														</Text>
													) : (
														<Text
															b
															size={12}
															color="#fff"
															css={{ marginTop: "5px", opacity: 1 }}
														>
															365 days
														</Text>
													)}
												</Text>
											</Box>
										</Box>
									</Box>
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											flexDirection: "row",
											gap: "5%",
											mt: "15px",
											zIndex: "0",
										}}
									>
										{isSubscribed === true ? (
											<Button
												auto
												onPress={() => handleOpenReports(index)}
												css={{
													alignSelf: "center",
													borderRadius: "11px 11px 1px 11px",
													width: "47.5%",
													fontSize: 18,
													backgroundImage:
														"linear-gradient(to top , #FF9D28, #ffa736)",
												}}
											>
												Reports
											</Button>
										) : (
											""
										)}
										{item.stock_targets.length > 1 ? (
											<Button
												auto
												onPress={() => handleOpenTargets(index)}
												css={{
													borderRadius: "11px 11px 1px 11px",
													width: "47.5%",
													fontSize: 18,
													backgroundImage:
														"linear-gradient(to top , #FF9D28, #ffa736)",
												}}
											>
												Previous Targets
											</Button>
										) : (
											""
										)}
									</Box>
								</Box>
							</Card>
							{/* Targets Modal */}

							<Modal
								// blur
								scroll
								fullScreen
								closeButton
								noPadding
								// flat
								open={showTargets}
								onClose={handleCloseTargets}
								aria-describedby="modal-description"
								css={{
									display: "flex",
									// background: "transparent !important",
									background: "#000",
									boxShadow: "none",
									alignItems: "center",
									borderRadius: "0px",
									position: "fixed",
									top: "0px",
									bottom: "10px",
									left: "0px",
									right: "10px",
									// width: "100%",
									"@media only screen and (max-width: 764px)": {
										flexWrap: "wrap",
										width: "100vw",
										height: "100vh",
									},
									// "& .nextui-c-csEDlc-ivNdeP-css": {
									// 	"--nextui--backdropOpacity": 0.2,
									//   },
									"& .nextui-c-iDzHRq": {
										padding: "$0 !important",
										// paddingLeft: "10px !important",
									},
								}}
							>
								<Modal.Body
									style={{
										width: "100vw",
										justifyContent: "flex-start",
										alignItems: "center",
										marginTop: "0px",
									}}
								>
									{record[selectedCardIndex] && (
										<Box
											sx={{
												display: "flex",
												flexDirection: "column", //change back to row
												gap: "15px",
												// flexWrap: "wrap",
												// width: "100vw",
												justifyContent: "center",
												// overflowY: "scroll",
												"@media only screen and (max-width: 764px)": {
													// flexWrap: "wrap",
													// overflowY: "scroll",
												},
											}}
										>
											{/* Main Target Card  */}
											<Card
												key={record[selectedCardIndex].id}
												css={{
													width: "450px",
													// height: "218px",
													paddingTop: "20px",
													paddingBottom: "20px",
													backgroundImage:
														"linear-gradient(to top , #0F734D, #0F734D, #105B54)",
													borderRadius: "30px",
													// borderBottomRightRadius: "5px",
													// border: "4px solid #ffa230",
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
													filter: "none",
													boxShadow: "none",
													"@media only screen and (max-width: 764px)": {
														width: "95vw",
														paddingTop: "30px",
														paddingBottom: "30px",
													},
												}}
											>
												<Box
													sx={{
														padding: "5px",
														paddingTop: "0px",
														paddingLeft: "15px",
														display: "flex",
														flexDirection: "column",
														// alignItems: "center",
														// background: 'rgba(255, 255, 255, 0.15) url("LineChartGreen.png")',
														backgroundSize: "cover",
														height: "auto",
														width: "410px",
														"@media only screen and (max-width: 764px)": {
															width: "100%",
															paddingLeft: "20px",
															paddingRight: "20px",
														},
													}}
												>
													<div
														style={{
															width: "100%",
															display: "flex",
															justifyContent: "space-between",
															alignItems: "center",
															flexDirection: "row",
															// paddingTop: "5%",
															paddingBottom: "5px",
														}}
													>
														<div
															style={{
																display: "flex",
																flexDirection: "column",
															}}
														>
															<Text
																b
																size={22}
																color="#fff"
																css={{
																	lineHeight: 1.5,
																	"@media only screen and (max-width: 764px)": {
																		paddingTop: "5px",
																		fontSize: "22px",
																		lineHeight: 1.1,
																	},
																}}
															>
																{record[selectedCardIndex].stock_name.length >
																28 ? (
																	<Marquee delay={5} speed={30}>
																		<span
																			style={{
																				paddingRight: "40px",
																				// filter:
																				// 	isSubscribed === false
																				// 		? "blur(8px)" //8px blur
																				// 		: "blur(0px)",
																				filter:
																					((!isLoggedIn || !isSubscribed) &&
																						record[selectedCardIndex]
																							.action) === "BUY"
																						? "blur(10px)"
																						: "none",
																			}}
																		>
																			{record[selectedCardIndex].stock_name}
																		</span>
																	</Marquee>
																) : (
																	<div
																		style={{
																			// filter:
																			// 	isSubscribed === false
																			// 		? "blur(8px)" //8px Blur
																			// 		: "blur(0px)",
																			filter:
																				((!isLoggedIn || !isSubscribed) &&
																					record[selectedCardIndex].action) ===
																				"BUY"
																					? "blur(10px)"
																					: "none",
																		}}
																	>
																		{record[selectedCardIndex].stock_name}
																	</div>
																)}
															</Text>
														</div>
														<img
															src={
																record[selectedCardIndex].action === "HOLD"
																	? "HoldBubbleYellow.png"
																	: record[selectedCardIndex].action === "SELL"
																	? "SellBubbleRed.png"
																	: record[selectedCardIndex].action === "BUY"
																	? "BuyBubbleBlue.png"
																	: "HoldBubbleYellow.png"
															}
															style={{
																width: "55px",
																height: "55px",
																alignSelf: "start",
															}}
														/>
													</div>
													<Divider
														css={{
															height: "3px",
															width: "100%",
															background: "#fff",
															borderRadius: "20px",
															opacity: 0.5,
															alignSelf: "start",
															// marginTop: "10px",
														}}
													/>
													<Box
														sx={{
															width: "100%",
															display: "flex",
															flexDirection: "row",
															marginTop: "15px",
															gap: "15px",
															"@media only screen and (max-width: 764px)": {
																gap: "15px",
																width: "100%",
																// justifyContent: 'space-evenly',
															},
														}}
													>
														<Box
															sx={{
																display: "flex",
																flexDirection: "column",
																width: "35%",
															}}
														>
															<Text
																b
																size={16}
																color="#fff"
																css={{
																	opacity: 1,
																	lineHeight: 1,
																	// width: "100%",
																	alignSelf: "start",
																	"@media only screen and (max-width: 764px)": {
																		paddingTop: "0px",
																		fontSize: "13.5px",
																		width: "100%",
																	},
																}}
															>
																ENTRY PRICE 1
															</Text>
															<Text
																b
																size={22}
																color="#fff"
																css={{
																	display: "flex",
																	flexDirection: "row",
																	alignItems: "center",
																	"@media only screen and (max-width: 764px)": {
																		paddingTop: "0px",
																		fontSize: "20px",
																	},
																}}
															>
																<span style={{ fontSize: 16, opacity: 0.75 }}>
																	₹
																</span>
																{
																	record[selectedCardIndex].stock_targets[
																		record[selectedCardIndex].stock_targets
																			.length - 1
																	].entry_price
																}
															</Text>
															<Text
																b
																size={16}
																color="#fff"
																css={{
																	opacity: 0.7,
																	lineHeight: 1,
																	alignSelf: "start",
																	"@media only screen and (max-width: 764px)": {
																		paddingTop: "0px",
																		fontSize: "14.5px",
																	},
																}}
															>
																{`${new Date(
																	record[selectedCardIndex].start_date
																).getDate()} ${new Date(
																	record[selectedCardIndex].start_date
																).toLocaleString("default", {
																	month: "short",
																})} ${new Date(
																	record[selectedCardIndex].start_date
																).getFullYear()}`}
															</Text>
														</Box>
														<Box
															sx={{
																display: "flex",
																flexDirection: "column",
																width: "30%",
															}}
														>
															<Text
																b
																size={16}
																color="#fff"
																css={{
																	opacity: 1,
																	lineHeight: 1,
																	alignSelf: "start",
																	"@media only screen and (max-width: 764px)": {
																		paddingTop: "0px",
																		fontSize: "13.5px",
																	},
																}}
															>
																CMP
															</Text>
															<Text
																b
																size={22}
																color="#fff"
																css={{
																	display: "flex",
																	flexDirection: "row",
																	alignItems: "center",
																	alignSelf: "start",
																	"@media only screen and (max-width: 764px)": {
																		paddingTop: "0px",
																		fontSize: "20px",
																	},
																}}
															>
																<span style={{ fontSize: 16, opacity: 0.75 }}>
																	₹
																</span>
																{record[selectedCardIndex].live_price}
															</Text>
															{
																<Text
																	b
																	size={16}
																	color="#fff"
																	css={{
																		opacity: 0.7,
																		lineHeight: 1,
																		alignSelf: "start",
																		"@media only screen and (max-width: 764px)":
																			{
																				paddingTop: "0px",
																				fontSize: "14.5px",
																			},
																	}}
																>
																	{`${
																		new Date().getDate()
																		// record[selectedCardIndex].target_met
																	} ${new Date().toLocaleString("default", {
																		// target.target_met
																		month: "short",
																	})} ${
																		new Date().getFullYear()
																		// target.target_met
																	}`}
																</Text>
															}
														</Box>
														<Box
															sx={{
																display: "flex",
																flexDirection: "column",
																width: "35%",
																alignSelf: "flex-start",
															}}
														>
															<Text
																b
																size={16}
																color="#ffa230"
																css={{
																	opacity: 1,
																	lineHeight: 1,
																	alignSelf: "start",
																	"@media only screen and (max-width: 764px)": {
																		paddingTop: "0px",
																		fontSize: "13.5px",
																	},
																}}
															>
																TOTAL RETURNS
															</Text>
															<Text
																b
																size={22}
																color="#fff"
																css={{
																	display: "flex",
																	flexDirection: "row",
																	alignItems: "center",
																	"@media only screen and (max-width: 764px)": {
																		paddingTop: "0px",
																		fontSize: "20px",
																	},
																}}
															>
																{`${record[selectedCardIndex].gain_loss} %`}
															</Text>
															<Text
																b
																size={16}
																color="#fff"
																css={{
																	// width: "120px",
																	opacity: 0.7,
																	lineHeight: 1,
																	alignSelf: "start",
																	"@media only screen and (max-width: 764px)": {
																		paddingTop: "0px",
																		fontSize: "14.5px",
																	},
																}}
															>
																{/* {`Target ${record[selectedCardIndex].stock_targets.length} Active`} */}
																{/* {`Target ${
																	record[selectedCardIndex].stock_targets.length
																} ${
																	record[selectedCardIndex].action === "SELL"
																		? "Met"
																		: "Active"
																}`} */}
																{record[selectedCardIndex].action === "SELL"
																	? `${new Date(
																			record[selectedCardIndex].exit_date
																	  ).getDate()} ${new Date(
																			record[selectedCardIndex].exit_date
																	  ).toLocaleString("default", {
																			month: "short",
																	  })} ${new Date(
																			record[selectedCardIndex].exit_date
																	  ).getFullYear()}`
																	: `Target ${record[selectedCardIndex].stock_targets.length} Active`}
															</Text>
														</Box>
													</Box>
												</Box>
											</Card>
											<Divider
												style={{
													height: "5px",
													width: "30%",
													alignSelf: "center",
													background: "#fff",
													borderRadius: "10px",
												}}
											/>

											{/* Mapping of Previous Targets  */}
											{record[selectedCardIndex].stock_targets.length > 1 ? (
												record[selectedCardIndex].stock_targets.map(
													(target, index) => (
														<Card
															key={target.id}
															css={{
																width: "450px",
																// height: "218px",
																paddingTop: "20px",
																paddingBottom: "20px",
																backgroundImage:
																	"linear-gradient(to top , #0F734D, #0F734D, #105B54)",
																borderRadius: "30px",
																// borderBottomRightRadius: "5px",
																display: "flex",
																flexDirection: "column",
																// overflowY: "scroll",
																alignItems: "center",
																filter: "none",
																boxShadow: "none",
																"@media only screen and (max-width: 764px)": {
																	width: "95vw",
																	paddingTop: "20px",
																	paddingBottom: "20px",
																	// overflowY: "scroll",
																},
															}}
														>
															<Box
																sx={{
																	padding: "5px",
																	paddingTop: "0px",
																	paddingLeft: "15px",
																	display: "flex",
																	flexDirection: "column",
																	// alignItems: "center",
																	// background: 'rgba(255, 255, 255, 0.15) url("LineChartGreen.png")',
																	backgroundSize: "cover",
																	height: "auto",
																	width: "410px",
																	"@media only screen and (max-width: 764px)": {
																		width: "100%",
																		paddingLeft: "20px",
																		paddingRight: "20px",
																	},
																}}
															>
																<div
																	style={{
																		width: "100%",
																		display: "flex",
																		justifyContent: "space-between",
																		alignItems: "center",
																		flexDirection: "row",
																		// paddingTop: "5%",
																		paddingBottom: "5px",
																	}}
																>
																	<div
																		style={{
																			display: "flex",
																			flexDirection: "column",
																		}}
																	>
																		<Text
																			b
																			size={22}
																			color="#fff"
																			css={{
																				lineHeight: 1.5,
																				"@media only screen and (max-width: 764px)":
																					{
																						paddingTop: "5px",
																						fontSize: "22px",
																						lineHeight: 1.1,
																					},
																			}}
																		>
																			{/* {record[selectedCardIndex].stock_name.length >
																	28 ? (
																		<Marquee delay={5} speed={30}>
																			<span
																				style={{
																					paddingRight: "40px",
																					filter:
																						isSubscribed === false
																							? "blur(0px)" //8px blur
																							: "blur(0px)",
																				}}
																			>
																				{record[selectedCardIndex].stock_name}
																			</span>
																		</Marquee>
																	) : (
																		<div
																			style={{
																				filter:
																					isSubscribed === false
																						? "blur(0px)" //8px Blur
																						: "blur(0px)",
																			}}
																		>
																			{record[selectedCardIndex].stock_name}
																		</div>
																	)}*/}
																			{index === 0
																				? `Target ${
																						record[selectedCardIndex]
																							.stock_targets.length - index
																				  } ${
																						record[selectedCardIndex].action ===
																						"SELL"
																							? "Met"
																							: "Active"
																				  }`
																				: `Target ${
																						record[selectedCardIndex]
																							.stock_targets.length - index
																				  } Met`}
																		</Text>
																	</div>
																	{/* <img
																src={
																	record[selectedCardIndex].action === "HOLD"
																		? "HoldBubbleYellow.png"
																		: record[selectedCardIndex].action ===
																		  "SELL"
																		? "SellBubbleRed.png"
																		: record[selectedCardIndex].action === "BUY"
																		? "BuyBubbleBlue.png"
																		: "HoldBubbleYellow.png"
																}
																style={{
																	width: "55px",
																	height: "55px",
																	alignSelf: "start",
																}}
															/> */}
																</div>
																<Divider
																	css={{
																		height: "3px",
																		width: "100%",
																		background: "#fff",
																		borderRadius: "20px",
																		opacity: 0.5,
																		alignSelf: "start",
																		// marginTop: "10px",
																	}}
																/>
																<Box
																	sx={{
																		width: "100%",
																		display: "flex",
																		flexDirection: "row",
																		marginTop: "15px",
																		gap: "15px",
																		"@media only screen and (max-width: 764px)":
																			{
																				gap: "15px",
																				width: "100%",
																				// justifyContent: 'space-evenly',
																			},
																	}}
																>
																	<Box
																		sx={{
																			display: "flex",
																			flexDirection: "column",
																			width: "30%",
																		}}
																	>
																		<Text
																			b
																			size={16}
																			color="#fff"
																			css={{
																				opacity: 1,
																				lineHeight: 1,
																				// width: "100%",
																				alignSelf: "start",
																				"@media only screen and (max-width: 764px)":
																					{
																						paddingTop: "0px",
																						fontSize: "13.5px",
																						width: "100%",
																					},
																			}}
																		>
																			{target.target_action === "BUY" ||
																			index ==
																				record[selectedCardIndex].stock_targets
																					.length -
																					1
																				? "ENTRY"
																				: "HOLD"}{" "}
																			{`PRICE ${
																				record[selectedCardIndex].stock_targets
																					.length - index
																			}`}
																		</Text>

																		<Text
																			b
																			size={22}
																			color="#fff"
																			css={{
																				display: "flex",
																				flexDirection: "row",
																				alignItems: "center",
																				"@media only screen and (max-width: 764px)":
																					{
																						paddingTop: "0px",
																						fontSize: "20px",
																					},
																			}}
																		>
																			<span
																				style={{ fontSize: 16, opacity: 0.75 }}
																			>
																				₹
																			</span>
																			{/* {record[selectedCardIndex].entry_price} */}
																			{target.entry_price}
																		</Text>
																		<Text
																			b
																			size={16}
																			color="#fff"
																			css={{
																				opacity: 0.7,
																				lineHeight: 1,
																				alignSelf: "start",
																				"@media only screen and (max-width: 764px)":
																					{
																						paddingTop: "0px",
																						fontSize: "14.5px",
																					},
																			}}
																		>
																			{`${new Date(
																				target.created
																			).getDate()} ${new Date(
																				target.created
																			).toLocaleString("default", {
																				month: "short",
																			})} ${new Date(
																				target.created
																			).getFullYear()}`}
																		</Text>
																	</Box>
																	<Box
																		sx={{
																			display: "flex",
																			flexDirection: "column",
																			width: "35%",
																		}}
																	>
																		<Text
																			b
																			size={16}
																			color="#fff"
																			css={{
																				opacity: 1,
																				lineHeight: 1,
																				alignSelf: "start",
																				"@media only screen and (max-width: 764px)":
																					{
																						paddingTop: "0px",
																						fontSize: "13.5px",
																					},
																			}}
																		>
																			{/* EXIT PRICE */}
																			{`TARGET PRICE ${
																				record[selectedCardIndex].stock_targets
																					.length - index
																			}`}
																		</Text>
																		<Text
																			b
																			size={22}
																			color="#fff"
																			css={{
																				display: "flex",
																				flexDirection: "row",
																				alignItems: "center",
																				alignSelf: "start",
																				"@media only screen and (max-width: 764px)":
																					{
																						paddingTop: "0px",
																						fontSize: "20px",
																					},
																			}}
																		>
																			<span
																				style={{ fontSize: 16, opacity: 0.75 }}
																			>
																				₹
																			</span>
																			{target.target_price}
																		</Text>
																		{target.target_met ? (
																			<Text
																				b
																				size={16}
																				color="#fff"
																				css={{
																					opacity: 0.7,
																					lineHeight: 1,
																					alignSelf: "start",
																					"@media only screen and (max-width: 764px)":
																						{
																							paddingTop: "0px",
																							fontSize: "14.5px",
																						},
																				}}
																			>
																				{`${new Date(
																					target.target_met
																				).getDate()} ${new Date(
																					target.target_met
																				).toLocaleString("default", {
																					month: "short",
																				})} ${new Date(
																					target.target_met
																				).getFullYear()}`}
																			</Text>
																		) : (
																			""
																		)}
																	</Box>
																	<Box
																		sx={{
																			display: "flex",
																			flexDirection: "column",
																			// width: "40%",
																			alignSelf: "flex-start",
																		}}
																	>
																		<Text
																			b
																			size={16}
																			color="#fff"
																			css={{
																				opacity: 1,
																				lineHeight: 1,
																				alignSelf: "start",
																				"@media only screen and (max-width: 764px)":
																					{
																						paddingTop: "0px",
																						fontSize: "13.5px",
																					},
																			}}
																		>
																			RETURNS
																		</Text>
																		<Text
																			b
																			size={22}
																			color="#fff"
																			css={{
																				display: "flex",
																				flexDirection: "row",
																				alignItems: "center",
																				"@media only screen and (max-width: 764px)":
																					{
																						paddingTop: "0px",
																						fontSize: "20px",
																					},
																			}}
																		>
																			{/* {target.gain_loss}% */}
																			{index === 0
																				? `${target.gain_loss}%`
																				: `${(
																						((target.target_price -
																							target.entry_price) /
																							target.entry_price) *
																						100
																				  ).toFixed(2)}%`}
																		</Text>
																		<Text
																			b
																			size={16}
																			color="#fff"
																			css={{
																				// width: "120px",
																				opacity: 0.7,
																				lineHeight: 1,
																				alignSelf: "start",
																				"@media only screen and (max-width: 764px)":
																					{
																						paddingTop: "0px",
																						fontSize: "14.5px",
																					},
																			}}
																		>
																			{/* {`${new Date(
                                    target.target_met
                                  ).getDate()} ${new Date(
                                    target.target_met
                                  ).toLocaleString("default", {
                                    month: "short",
                                  })} ${new Date(
                                    target.target_met
                                  ).getFullYear()}`} */}

																			{/* {target.target_met
																		? `${new Date(
																				target.target_met
																		  ).getDate()} ${new Date(
																				target.target_met
																		  ).toLocaleString("default", {
																				month: "short",
																		  })} ${new Date(
																				target.target_met
																		  ).getFullYear()}`
																		: `${new Date().getDate()} ${new Date().toLocaleString(
																				"default",
																				{ month: "short" }
																		  )} ${new Date().getFullYear()}`} */}
																			{target.target_met
																				? `In ${Math.round(
																						Math.abs(
																							(new Date(target.target_met) -
																								new Date(target.created)) /
																								(24 * 60 * 60 * 1000)
																						)
																				  )} Days`
																				: `${new Date().getDate()} ${new Date().toLocaleString(
																						"default",
																						{ month: "short" }
																				  )} ${new Date().getFullYear()}`}
																		</Text>
																	</Box>
																</Box>
																{/* <Divider
															css={{
																height: "3px",
																width: "40%",
																background: "#fff",
																borderRadius: "20px",
																opacity: 0.5,
																alignSelf: "start",
																marginTop: "15px",
															}}
														/> */}
															</Box>
														</Card>
													)
												)
											) : (
												<></>
											)}
										</Box>
									)}
								</Modal.Body>
								{/* <Modal.Footer>
								<Button
									flat
									onPress={handleCloseTargets}
									css={{
										alignSelf: "center",
										// width: "100%",
										backgroundColor: "#ffa12e",
										color: "#fff",
										fontSize: 19,
										marginTop: "10px",
										marginBottom: "20px",
										borderRadius: "10px",
										height: "50px",
										"@media only screen and (max-width: 768px)": {
											width: "100%",
											fontSize: 15,
											height: "50px",
											marginTop: "20px",
											borderRadius: "0px 0px 10px",
											"& span": {
												// display: "none",
											},
										},
									}}
								>
									Close
								</Button>
								</Modal.Footer> */}
							</Modal>

							{/* Reports Modal */}

							<Modal
								// blur
								open={showReports}
								onClose={handleCloseReports}
								css={{
									justifyContent: "center",
									alignItems: "center",
									// width: "800px",
									background: "transparent",
									boxShadow: "none",
									"@media only screen and (max-width: 764px)": {
										width: "100vw",
										height: "95vh",
										// paddingLeft: "15px",
										// paddingRight: "15px",
									},
								}}
							>
								{record[selectedCardIndex] &&
								record[selectedCardIndex].stock_reports &&
								record[selectedCardIndex].stock_reports.length > 0 ? (
									<>
										{/* <Dropdown>
											<Dropdown.Button
												flat
												css={{
													alignSelf: "center",
													width: "100%",
													backgroundColor: "#125a54",
													color: "#fff",
													fontSize: 19,
													marginBottom: "20px",
													borderRadius: "10px",
													height: "50px",
													"@media only screen and (max-width: 768px)": {
														width: "100%",
														fontSize: 15,
														height: "50px",
														marginBottom: "0px",
														borderRadius: "10px 0 0",
														"& span": {
															// display: "none",
														},
													},
												}}
											> */}
										{/* {selectedPDF === "" || selectedPDF === undefined
											? "Reports"
											: record[selectedCardIndex].stock_reports.find(
													(report) =>
														report.document === Array.from(selectedPDF)[0]
											  )?.report_name} */}
										<Card
											css={{
												width: "100%",
												// height: "218px",
												paddingTop: "50px",
												paddingBottom: "50px",
												background: "#fff",
												borderRadius: "30px",
												// borderBottomRightRadius: "5px",
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
												filter: "none",
												boxShadow: "none",
												"@media only screen and (max-width: 764px)": {
													width: "100vw",
													paddingTop: "30px",
													paddingBottom: "30px",
												},
											}}
										>
											<IconButton
												sx={{ position: "absolute", top: "5px", right: "5px" }}
												onClick={handleCloseReports}
											>
												<CloseIcon color="error" />
											</IconButton>
											<Text
												b
												size={27}
												css={{ color: "#000000", marginBottom: "20px" }}
											>
												{record[selectedCardIndex].stock_name}
											</Text>
											{record[selectedCardIndex].stock_reports.map((report) => (
												<IconButton
													key={report.document}
													sx={{
														color: "#000000",
														"&:hover": { background: "transparent" },
														borderRadius: "0px",
														paddingLeft: "0px",
														marginBottom: "20px",
													}}
													onClick={() =>
														window.open(
															`${report.document}#view=FitH&toolbar=0&password=$420%69#kamayakya#69%420$`,
															"_blank",
															"fullscreen=yes"
														)
													}
												>
													<DocumentText size={25} />
													<Text b size={18} css={{ color: "#000000" }}>
														{report.report_name}
													</Text>
												</IconButton>
											))}
										</Card>
										{/* </Dropdown.Button> */}
										{/* <Dropdown.Menu
												// defaultSelectedKeys={'SampleReport.pdf'}
												aria-label="TractReports"
												selectionMode="single"
												selectedKeys={selectedPDF}
												onSelectionChange={(key) => setSelectedPDF(key)}
												// defaultSelectedKeys={[record[selectedCardIndex].stock_reports[0]?.document]}
												style={{ width: "100%" }}
											> */}
										{/* {record[selectedCardIndex].stock_reports.map(
													(report) => (
														<Dropdown.Item key={report.document}>
															{report.report_name}
														</Dropdown.Item>
													)
												)} */}
										{/* </Dropdown.Menu> */}
										{/* </Dropdown> */}
										{/* {console.log(PdfURL)}
											{console.log(selectedReportUrl)} */}
										{/* <Worker
											workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
										>
											<Box
												sx={{
													height: "75vh",
													"@media only screen and (max-width: 768px)": {
														// width: '500px',
														// height: '80%',
													},
												}}
											>
												<Viewer
													fileUrl={`${
														PdfURL ? PdfURL : selectedReportUrl
													}#view=FitH&toolbar=0`}
													onDocumentAskPassword={handleAskPassword}
												/>
											</Box>
										</Worker> */}
									</>
								) : (
									<Text b size={22} color="#fff">
										No Reports Available
									</Text>
								)}
								{/* <Button
									flat
									auto
									onPress={handleCloseReports}
									css={{
										alignSelf: "center",
										// width: "100%",
										backgroundColor: "#ffa12e",
										color: "#fff",
										fontSize: 19,c
										marginTop: "20px",
										borderRadius: "14px",
										height: "50px",
										"@media only screen and (max-width: 768px)": {
											width: "100%",
											fontSize: 15,
											height: "50px",
											marginTop: "0px",
											borderRadius: "0px 0px 10px",
										},
									}}
								>
									Close
								</Button> */}
							</Modal>
						</>
					))}
				</Grid>
				{/* </Grid> */}
			</Box>
			<FaqsNew />
			<Footer />
		</section>
	);
};

export default WhyUs;
