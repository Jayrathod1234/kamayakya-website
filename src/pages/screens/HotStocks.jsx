import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Divider, Text, Loading, Modal } from "@nextui-org/react";
import { ArrowCircleUp } from "iconsax-react";
import AuthProvider from "@/components/AuthContext";
import { Box, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Marquee from "react-fast-marquee";
import { BsFire } from "react-icons/bs";
import { MdOutlineLock } from "react-icons/md";
import { useRouter } from "next/router";
import { GET_ALL_URL } from "../api/URLs";
import Login from "@/components/Login";
import axios from "axios";

const HotStocks = () => {
	const router = useRouter();
	const { isLoggedIn, isSubscribed } = useContext(AuthProvider);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [stocks, setStocks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const staticNumbers = [70, 68, 61];

	useEffect(() => {
		if (isLoggedIn) {
			const refresh = localStorage.getItem("refresh");
			setIsLoading(true);
			const fetchData = async () => {
				try {
					const response = await fetch(GET_ALL_URL, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `token ${refresh}`,
						},
					});
					const data = await response.json();
					const sortedStocks = data.sort((a, b) => {
						if (a.recommended_stock && !b.recommended_stock) return -1;
						if (!a.recommended_stock && b.recommended_stock) return 1;

						// Then check for new stocks
						const isNewStockA = isNewStock(a.created);
						const isNewStockB = isNewStock(b.created);
						if (isNewStockA && !isNewStockB) return -1;
						if (!isNewStockA && isNewStockB) return 1;
					});
					setStocks(sortedStocks);
				} catch (error) {
					setIsLoading(false);
				} finally {
					setIsLoading(false);
				}
			};
			fetchData();
		}
	}, [isLoggedIn]);

	const isNewStock = (createdDateString) => {
		const createdDate = new Date(createdDateString);
		const twoMonthsAgo = new Date();
		twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

		const today = new Date();
		// console.log(
		// 	createdDate,
		// 	createdDate >= twoMonthsAgo && createdDate <= today
		// );
		return createdDate >= twoMonthsAgo && createdDate <= today;
	};

	const handleFirstCard = () => {
		if (isLoggedIn) {
			const location = router.asPath;
			localStorage.setItem("location", location);
			router.push("/purchase");
		} else {
			handleLogin();
		}
	};
	const handleLogin = () => {
		setShowLoginModal(true);
	};

	const handleCloseLoginModal = () => {
		setShowLoginModal(false);
	};

	return (
		<section
			id="hotStocks"
			style={{
				backgroundColor: "#fff",
				// paddingTop: "10vh",
				paddingBottom: "10vh",
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
					flexDirection: "column",
					maxWidth: "2000px",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						width: "95%",
						display: "flex",
						flexDirection: "column",
						flexWrap: "wrap",
						alignItems: "center",
						// paddingTop: "5vh",
						paddingBottom: "20px",
						"@media only screen and (max-width: 764px)": {
							// maxHeight: "100vh",
							marginTop: "0px",
							paddingTop: "0px",
							justifyContent: "flex-start",
							alignItems: "flex-start",
							paddingLeft: "5px",
							paddingRight: "5px",
							paddingBottom: "10px",
						},
					}}
				>
					<Text
						b
						size={70}
						css={{
							// width: "90%",
							maxWidth: "80rem" /* 1280px */,
							textAlign: "center",
							lineHeight: 1.2,
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
						Hot Stocks
					</Text>
				</Box>
				<Grid
					container
					justifyContent={"center"}
					gap={"20px"}
					sx={{
						// background: "#fff",
						boxShadow: "none",
						"@media only screen and (max-width: 768px)": {
							gap: "20px",
						},
					}}
				>
					{isLoggedIn && !isSubscribed
						? stocks.map((stock) => (
								<Grid
									key={stock.id}
									item
									xs={"auto"}
									sm={"auto"}
									md={"auto"}
									lg={"auto"}
								>
									{stock.recommended_stock === true ? (
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												width: "100%",
											}}
										>
											<Box
												sx={{
													position: "absolute",
													zIndex: 99,
													padding: "2px 20px",
													borderRadius: "20px",
													background: "#fff",
													border: "4px solid #ff9702",
													alignSelf: "center",
													color: "#cc0000",
													display: "flex",
													alignItems: "center",
													fontSize: 18,
												}}
											>
												<BsFire style={{ marginRight: "5px" }} /> Hot Stock{" "}
												<BsFire style={{ marginLeft: "5px" }} />
											</Box>
										</Box>
									) : (
										""
									)}
									<Card
										isHoverable
										css={{
											// height: "650px",
											width: "285px",
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											backgroundColor: "#fff",
											borderRadius: "40px",
											border: "4px solid",
											borderColor: "#ffa12e",
											marginBottom: "0px",
											boxShadow: "none",
											filter: "none",
											"@media only screen and (max-width: 768px)": {
												width: "92.5vw",
												maxWidth: "620px",
												// height: "650px",
												borderRadius: "35px",
											},
										}}
									>
										<Box
											sx={{
												marginLeft: "5%",
												marginRight: "5%",
												marginTop: "20px",
												marginBottom: "20px",
												minWidth: "90%",
												maxWidth: "90%",
												// height: "600px",
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
												"@media only screen and (max-width: 768px)": {
													marginLeft: "5px",
													marginRight: "5px",
													height: "auto",
													marginBottom: "30px",
												},
											}}
										>
											<Box
												sx={{
													display: "flex",
													flexDirection: "column",
													textAlign: "center",
													backgroundColor: "#fff",
													marginBottom: "15px",
													width: "90%",
													"@media only screen and (max-width: 768px)": {
														width: "100%",
													},
												}}
											>
												<Box
													sx={{
														width: "100%",
														height: "30px",
														paddingTop: "7.5px",
														paddingBottom: "7.5px",
														paddingLeft: "5px",
														paddingRight: "5px",
														backgroundImage:
															"linear-gradient(to top , #FF9D28, #ffa736)",
														marginBottom: "15px",
														marginTop: "5px",
														borderRadius: "10000px",
														lineHeight: 1,
													}}
													className="stockCardMobile-industry"
												>
													<Text
														b
														size={14}
														color="Black"
														css={{
															zIndex: 9999,
															lineHeight: 1.2,
															"@media only screen and (max-width: 768px)": {
																fontSize: "16px",
															},
														}}
													>
														{stock.stock_industry.length > 29 ? (
															<Marquee
																delay={2}
																speed={30}
																style={{ marginRight: "20px" }}
															>
																<span style={{ paddingRight: "20px" }}>
																	{stock.stock_industry}
																</span>
															</Marquee>
														) : (
															<>{stock.stock_industry}</> || <Loading /> || "-"
														)}
													</Text>
												</Box>
												<Text
													b
													size={26}
													css={{
														minWidth: "100%",
														maxWidth: "100%",
														textAlign: "center",
														lineHeight: 1.2,
														"@media only screen and (max-width: 768px)": {
															fontSize: 25,
															paddingTop: "5px",
															paddingBottom: "5px",
														},
													}}
												>
													{stock.stock_name.length > 17 ? (
														<Marquee
															delay={2}
															speed={30}
															style={{ marginRight: "20px" }}
														>
															<span style={{ paddingRight: "40px" }}>
																{stock.stock_name}
															</span>
														</Marquee>
													) : (
														<>{stock.stock_name}</>
													)}
												</Text>
											</Box>
											<Box
												sx={{
													width: "90%",
													backgroundImage:
														"linear-gradient(to top , #106052, #0f734d)",
													borderRadius: "17.5px",
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
													justifyContent: "center",
													paddingTop: "20px",
													paddingBottom: "20px",
													"@media only screen and (max-width: 768px)": {
														width: "100%",
														paddingTop: "20px",
														paddingBottom: "20px",
													},
												}}
											>
												{isSubscribed && isNewStock(stock.created) ? (
													<Box
														sx={{
															display: "flex",
															justifyContent: "center",
															width: "100%",
														}}
													>
														<div
															style={{
																position: "absolute",
																width: "80px",
																marginTop: "-30px",
																background: "#cc0000",
																color: "#fff",
																height: "20px",
																display: "flex",
																alignItems: "center",
																justifyContent: "center",
																borderRadius: "10px",
															}}
														>
															{isNewStock(stock.created) && <div>NEW</div>}
														</div>
													</Box>
												) : (
													""
												)}
												<Text
													b
													size={20}
													color="#fff"
													css={{
														lineHeight: 1.5,
														"@media only screen and (max-width: 768px)": {
															fontSize: 19,
														},
													}}
												>
													Upside Left
												</Text>
												<div style={{ display: "flex", alignItems: "center" }}>
													<ArrowCircleUp size={25} color="#fff" />
													<Text
														b
														size={48}
														color="#fff"
														css={{
															lineHeight: 1,
															marginLeft: "3px",
															marginRight: "3px",
															"@media only screen and (max-width: 768px)": {
																fontSize: 60,
															},
														}}
													>
														{`${Math.ceil(stock.upside_left)}` || <Loading /> ||
															"-"}
													</Text>
													<span
														style={{
															fontSize: 25,
															color: "#FFF",
															"@media only screen and (max-width: 768px)": {
																fontSize: 10,
															},
														}}
													>
														%
													</span>
												</div>
											</Box>
											<Box
												sx={{
													mt: "20px",
													width: "90%",
													"@media only screen and (max-width: 768px)": {
														width: "100%",
													},
												}}
											>
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
														alignItems: "center",
													}}
												>
													<div
														style={{ display: "flex", flexDirection: "column" }}
													>
														<Text
															b
															css={{
																lineHeight: 1.1,
																"@media only screen and (max-width: 768px)": {
																	fontSize: 21,
																},
															}}
															size={15}
														>
															MKT. CAP.
														</Text>
														<Text
															b
															size={15}
															css={{
																lineHeight: 1.1,
																"@media only screen and (max-width: 768px)": {
																	fontSize: 15,
																},
															}}
														>
															(IN Cr.)
														</Text>
													</div>
													<Text
														b
														css={{
															flex: 1,
															textAlign: "right",
															"@media only screen and (max-width: 768px)": {
																fontSize: 30,
															},
														}}
														size={22}
													>
														{`${stock.market_cap}` || <Loading /> || "-"}
													</Text>
												</div>
												<Divider
													height={2}
													style={{
														backgroundColor: "#ffa12e",
														marginTop: "10px",
														marginBottom: "10px",
													}}
												/>
												<div
													style={{
														display: "flex",
														width: "100%",
														flexDirection: "column",
													}}
												>
													<div
														style={{
															display: "flex",
															justifyContent: "space-between",
															alignItems: "center",
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
																css={{
																	lineHeight: 1.1,
																	"@media only screen and (max-width: 768px)": {
																		fontSize: 21,
																	},
																}}
																size={15}
															>
																ENTRY PRICE
															</Text>
															<Text
																b
																size={15}
																css={{
																	lineHeight: 1.1,
																	"@media only screen and (max-width: 768px)": {
																		fontSize: 15,
																	},
																}}
															>
																(in ₹)
															</Text>
														</div>
														<Text
															b
															css={{
																flex: 1,
																textAlign: "right",
																"@media only screen and (max-width: 768px)": {
																	fontSize: 30,
																},
															}}
															size={22}
														>
															{`${stock.entry_price}` || <Loading /> || "-"}
														</Text>
													</div>
													<Divider
														height={2}
														style={{
															backgroundColor: "#ffa12e",
															marginTop: "10px",
															marginBottom: "10px",
														}}
													/>
													<div
														style={{
															display: "flex",
															justifyContent: "space-between",
															alignItems: "center",
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
																css={{
																	lineHeight: 1.1,
																	"@media only screen and (max-width: 768px)": {
																		fontSize: 21,
																	},
																}}
																size={15}
															>
																CMP
															</Text>
															<Text
																b
																size={15}
																css={{
																	lineHeight: 1.1,
																	"@media only screen and (max-width: 768px)": {
																		fontSize: 15,
																	},
																}}
															>
																(in ₹)
															</Text>
														</div>
														<Text
															b
															css={{
																flex: 1,
																textAlign: "right",
																"@media only screen and (max-width: 768px)": {
																	fontSize: 30,
																},
															}}
															size={22}
														>
															{`${stock.live_price}` || <Loading /> || "-"}
														</Text>
													</div>
													<Divider
														height={2}
														style={{
															backgroundColor: "#ffa12e",
															marginTop: "10px",
															marginBottom: "10px",
														}}
													/>
													<div
														style={{
															display: "flex",
															justifyContent: "space-between",
															alignItems: "center",
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
																css={{
																	lineHeight: 1.1,
																	"@media only screen and (max-width: 768px)": {
																		fontSize: 21,
																	},
																}}
																size={15}
															>
																TARGET PRICE
															</Text>
															<Text
																b
																size={15}
																css={{
																	lineHeight: 1.1,
																	"@media only screen and (max-width: 768px)": {
																		fontSize: 15,
																	},
																}}
															>
																(IN ₹)
															</Text>
														</div>
														<Text
															b
															css={{
																flex: 1,
																textAlign: "right",
																"@media only screen and (max-width: 768px)": {
																	fontSize: 30,
																},
															}}
															size={22}
														>
															{stock.latest_target_price}
														</Text>
													</div>
													<Divider
														height={2}
														style={{
															backgroundColor: "#ffa12e",
															marginTop: "10px",
															marginBottom: "10px",
														}}
													/>

													<div
														style={{
															display: "flex",
															justifyContent: "space-between",
															alignItems: "center",
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
																css={{
																	lineHeight: 1.1,
																	"@media only screen and (max-width: 768px)": {
																		fontSize: 21,
																	},
																}}
																size={15}
															>
																TIME TO
															</Text>
															<Text
																b
																size={15}
																css={{
																	lineHeight: 1.1,
																	"@media only screen and (max-width: 768px)": {
																		fontSize: 15,
																	},
																}}
															>
																TARGET
															</Text>
														</div>
														<Text
															b
															css={{
																flex: 1,
																textAlign: "right",
																"@media only screen and (max-width: 768px)": {
																	fontSize: 30,
																},
															}}
															size={22}
														>
															{(() => {
																const timeLeft = Math.ceil(stock.time_left);
																const years = Math.floor(timeLeft / 365);
																const months = Math.floor(
																	(timeLeft % 365) / 30
																);
																const days = Math.floor((timeLeft % 365) % 30);

																if (timeLeft < 30) {
																	return `${days} days`;
																} else if (years === 0) {
																	return `${months} month${
																		months !== 1 ? "s" : ""
																	}`;
																} else {
																	return `${years} yr ${months} mo.`;
																}
															})() || <Loading /> ||
																"-"}
														</Text>
													</div>
												</div>
											</Box>
										</Box>
										<Box
											sx={{
												bottom: "5px",
												width: "85%",
												marginBottom: "25px",
												"@media only screen and (max-width: 768px)": {
													width: "90%",
													justifyContent: "center",
												},
											}}
										>
											<Button
												auto
												// onPress={() => handleOpenReports(stock)}
												css={{
													top: "0px",
													alignSelf: "center",
													width: "100%",
													borderRadius: "10000px",
													color: "#000",
													backgroundImage:
														"linear-gradient(to top , #FF9D28, #ffa736)",
													fontSize: 18,
													"@media only screen and (max-width: 768px)": {
														fontSize: 18,
														lineHeight: 1,
														height: "40px",
														color: "black",
													},
												}}
											>
												View reports
											</Button>
											<Button
												auto
												// onPress={() => handleOpenDisclosure(stock)}
												css={{
													top: "10px",
													color: "#106052",
													width: "100%",
													borderRadius: "10000px",
													backgroundColor: "#fff",
													fontSize: 15,
													height: "20px",
													"@media only screen and (max-width: 768px)": {
														top: "10px",
														lineHeight: 1,
														height: "20px",
														fontSize: 15,
													},
												}}
											>
												Disclosure
											</Button>
										</Box>
									</Card>
									<Modal
										// blur
										// open={showReportsModal}
										// onClose={handleCloseReports}
										aria-labelledby="modal-title"
										aria-describedby="modal-description"
										css={{
											width: "100%",
											borderRadius: "15px",
											background: "transparent",
											boxShadow: "none",
											alignItems: "center",
											justifyContent: "center",
										}}
										className="iframePdfMobile"
									>
										<Card
											css={{
												height: "fit-content",
												width: "fit-content",
												maxWidth: "80rem",
												minWidth: "100%",
												display: "flex",
												alignItems: "center",
												flexDirection: "column",
												padding: "50px 30px",
												borderRadius: "25px",
												objectPosition: "center",
												backgroundPositionY: "center",
												backgroundSize: "cover",
												"@media only screen and (max-width: 764px)": {
													minWidth: "100px",
													width: "100vw !important",
												},
											}}
										>
											<IconButton
												sx={{ position: "absolute", top: "5px", right: "5px" }}
												// onClick={handleCloseReports}
											>
												<CloseIcon color="error" />
											</IconButton>
											{/* <Box
									sx={{
										width: "100%",
										display: "flex",
										flexDirection: "column",
										gap: "20px",
									}}
								>
									<Text b size={27}>
										{selectedStock?.stock_name}
									</Text>

									{selectedStock?.stock_reports?.length > 0 ? (
										selectedStock.stock_reports.map((report) => (
											<div key={report.report_name} style={{}}>
												<IconButton
													key={report.report_name}
													onClick={() =>
														window.open(
															`${report.document}#view=FitH&toolbar=0`,
															"_blank",
															"fullscreen=yes"
														)
													}
													sx={{
														"&:hover": { background: "#fff" },
														borderRadius: "0px",
														paddingLeft: "0px",
													}}
												>
													<DocumentText size={25} />
													<Text
														b
														size={21}
														css={{
															marginLeft: "5px",
															alignSelf: "start",
															lineHeight: 1.5,
														}}
													>
														{report.report_name}
													</Text>
												</IconButton>
											</div>
										))
									) : (
										<Text
											b
											size={20}
											css={{
												paddingTop: "50px",
												paddingBottom: "50px",
											}}
										>
											No Reports Available!
										</Text>
									)}
								</Box> */}
										</Card>
									</Modal>
									<Modal
										// blur
										// open={showModal}
										// onClose={handleCloseModal}
										aria-labelledby="modal-title"
										aria-describedby="modal-description"
										css={{
											height: "95vh",
											borderRadius: "15px",
											background: "transparent",
											boxShadow: "none",
											alignSelf: "center",
											alignContent: "center",
											justifyContent: "center",
											// backdropFilter: "blur(8px)",
										}}
										className="iframePdfMobile"
									>
										<Button
											flat
											// onPress={handleCloseModal}
											css={{
												alignSelf: "center",
												// width: "100%",
												backgroundColor: "#ffa12e",
												color: "#fff",
												fontSize: 19,
												marginTop: "20px",
												borderRadius: "10px",
												height: "50px",
												width: "100%",
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
									</Modal>
								</Grid>
						  ))
						: ""}
					{!isLoggedIn
						? staticNumbers.map((number, index) => (
								<Grid
									// key={stock.id}
									key={index}
									item
									xs={"auto"}
									sm={"auto"}
									md={"auto"}
									lg={"auto"}
									style={{ alignItems: "center" }}
								>
									<Card
										variant="flat"
										css={{
											height: "617px",
											width: "285px",
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											backgroundColor: "#fff",
											borderRadius: "40px",
											border: "4px solid",
											borderColor: "#ffa12e",
											marginBottom: "20px",
											boxShadow: "none",
											filter: "none",
											"@media only screen and (max-width: 768px)": {
												width: "95vw",
												maxWidth: "620px",
												height: "auto",
												borderRadius: "35px",
												border: "4px solid",
												borderColor: "#ffa12e",
												paddingBottom: "30px",
												marginBottom: "0px",
											},
										}}
									>
										<Box
											sx={{
												marginLeft: "5%",
												marginRight: "5%",
												marginTop: "20px",
												marginBottom: "20px",
												width: "90%",
												display: "flex",
												flexDirection: "column",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<Box
												sx={{
													marginTop: "5px",
													display: "flex",
													flexDirection: "column",
													textAlign: "center",
													backgroundColor: "#fff",
													marginBottom: "15px",
													width: "90%",
													"@media only screen and (max-width: 768px)": {
														width: "100%",
													},
												}}
											>
												<Box
													sx={{
														zIndex: 0,
														width: "100%",
														paddingTop: "7.5px",
														paddingBottom: "7.5px",
														paddingLeft: "5px",
														paddingRight: "5px",
														backgroundImage:
															"linear-gradient(to top , #FF9D28, #ffa736)",
														marginBottom: "15px",
														marginTop: "5px",
														borderRadius: "10000px",
														lineHeight: 1,
													}}
												>
													<Text
														b
														size={14}
														color="Black"
														css={{ lineHeight: 1 }}
													>
														{/* {stock.stock_industry} */}
														{`<Industry>`}
													</Text>
												</Box>
												<Text
													b
													size={26}
													css={{
														minWidth: "100%",
														maxWidth: "100%",
														textAlign: "center",
														lineHeight: 1.2,
														position: "relative",
														zIndex: 0,
														"@media only screen and (max-width: 768px)": {
															fontSize: 20,
														},
													}}
												>
													{`KamayaKya`}
												</Text>
												<Box
													sx={{
														position: "absolute",
														top: 0,
														left: 0,
														right: 0,
														bottom: 0,
														backdropFilter: "blur(8px)",
														zIndex: 0,
														WebkitBackdropFilter: "blur(8px)",
														margin: "15px",
														"@media only screen and (max-width: 768px)": {
															margin: "0px",
														},
													}}
												>{` `}</Box>
											</Box>
											<Box
												sx={{
													zIndex: 1,
													width: "90%",
													backgroundImage:
														"linear-gradient(to top , #106052, #0f734d)",
													borderRadius: "17.5px",
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
													justifyContent: "center",
													paddingTop: "20px",
													paddingBottom: "20px",
													"@media only screen and (max-width: 768px)": {
														width: "100%",
													},
												}}
											>
												<Text
													b
													size={20}
													color="#fff"
													css={{
														lineHeight: 1.5,
													}}
												>
													Upside Left
												</Text>
												<div style={{ display: "flex", alignItems: "center" }}>
													<ArrowCircleUp size={25} color="#fff" />
													<Text
														b
														size={48}
														color="#fff"
														css={{
															lineHeight: 1,
															marginLeft: "3px",
															marginRight: "3px",
															"@media only screen and (max-width: 768px)": {
																fontSize: 55,
															},
														}}
													>
														{`${number}`}
													</Text>
													<span style={{ fontSize: 25, color: "#FFF" }}>%</span>
												</div>
											</Box>

											<Box sx={{ minWidth: "90%", maxWidth: "90%" }}>
												<div
													style={{
														display: "flex",
														width: "100%",
														flexDirection: "column",
													}}
												>
													<Divider
														height={4}
														style={{
															backgroundColor: "#ffa736",
															marginTop: "30px",
															marginBottom: "10px",
															width: "50px",
															alignSelf: "center",
														}}
													/>

													<div
														style={{
															zIndex: 1,
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
															flexDirection: "column",
															marginTop: "0px",
														}}
													>
														<MdOutlineLock color="#ffa12e" size={50} />
														<div
															style={{
																display: "flex",
																alignItems: "center",
																flexDirection: "row",
																marginTop: "20px",
															}}
															className="stocksPage-card-loginSection"
														>
															{/* <Button
																on
																onPress={handleFirstCard}
																css={{
																	backgroundColor: "transparent",
																}}
															> */}
															{isLoggedIn ? (
																<div
																	style={{
																		justifyContent: "center",
																		textAlign: "center",
																		// height: "fit-content",
																		// maxWidth: "220px",
																		// maxHeight: "220px",
																	}}
																>
																	<Text
																		b
																		size={16}
																		css={{
																			// maxWidth: "220px",
																			// lineHeight: 1
																			textAlign: "center",
																			marginBottom: "15px",
																		}}
																	>
																		Unlock a world of wealth with just a click.
																		{/* Log in, and three free stock picks */}
																		{/* are your key to potential prosperity. It's */}
																		{/* like finding hidden gems without the */}
																		{/* digging! */}
																	</Text>
																	<Button
																		// variant="contained"
																		css={{
																			width: "100%",
																			marginTop: "10px",
																			background:
																				"linear-gradient(to top , #fb7716,#fe9807)",
																			paddingTop: "5px",
																			paddingBottom: "5px",
																			borderRadius: "10000px",
																			boxShadow: "none",
																			"&:hover": {
																				backgroundImage:
																					"linear-gradient(to top , #FF9D28, #ffa736)",
																			},
																		}}
																		onPress={handleFirstCard}
																	>
																		<Text b color="#FFF" size={18}>
																			Subscribe to unlock
																		</Text>
																	</Button>
																</div>
															) : (
																<div
																	style={{
																		justifyContent: "center",
																		textAlign: "center",
																		// height: "fit-content",
																		// maxWidth: "220px",
																		// maxHeight: "220px",
																	}}
																>
																	<Text
																		b
																		size={16}
																		css={{
																			// maxWidth: "220px",
																			// lineHeight: 1
																			textAlign: "center",
																			marginBottom: "15px",
																		}}
																	>
																		Unlock a world of wealth with just a click.
																		{/* Log in, and three free stock picks */}
																		{/* are your key to potential prosperity. It's */}
																		{/* like finding hidden gems without the */}
																		{/* digging! */}
																	</Text>
																	<Button
																		// variant="contained"
																		css={{
																			width: "100%",
																			marginTop: "10px",
																			background:
																				"linear-gradient(to top , #fb7716,#fe9807)",
																			paddingTop: "5px",
																			paddingBottom: "5px",
																			borderRadius: "10000px",
																			boxShadow: "none",
																			"&:hover": {
																				backgroundImage:
																					"linear-gradient(to top , #FF9D28, #ffa736)",
																			},
																		}}
																		onPress={handleFirstCard}
																	>
																		<Text b color="#FFF" size={18}>
																			Unlock for Free
																		</Text>
																	</Button>
																</div>
															)}

															{/*<BiChevronRight size={24} color="#000000" />*/}
															{/* </Button> */}
														</div>
													</div>
													<Divider
														height={4}
														style={{
															backgroundColor: "#ffa736",
															marginTop: "30px",
															marginBottom: "10px",
															width: "50px",
															alignSelf: "center",
														}}
													/>
												</div>
											</Box>
										</Box>
									</Card>
									<Modal
										width="450px"
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
								</Grid>
						  ))
						: ""}
				</Grid>
			</div>
		</section>
	);
};

export default HotStocks;
