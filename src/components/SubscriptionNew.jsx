import { Card, Divider, Text, Modal } from "@nextui-org/react";
import React, { useState, useContext, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import Login from "./Login";
import AuthContext from "./AuthContext";
import { useRouter } from "next/router";
import LoginForSubsribe from "@/components/LoginForSubsribe";

const SubscriptionNew = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLoginModalForSubscribe, setShowLoginModalForSubscribe] =
    useState(false);
  const router = useRouter();
  const { isSubscribed } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showPricing, setShowPricing] = useState(true);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (isLoggedIn && isSubscribed) {
      setShowPricing(false);
    }
  }, [showPricing, isLoggedIn, isSubscribed]);

	const handleLoginOrSub = () => {
		const location = router.asPath;
		localStorage.setItem("location", location);
		if (isLoggedIn === true && isSubscribed === false) {
			router.push("/purchase");
		}
		if (isLoggedIn === true && isSubscribed === true) {
			router.push("/stock-picks");
		}
		if (isLoggedIn === false) {
			setShowLoginModal(true);
		}
	};

	const handleLoginOrSubForSubscribeNow = () => {
		if (isLoggedIn === true && isSubscribed === false) {
			const location = router.asPath;
      localStorage.setItem("location", location);
			router.push("/purchase");
		}
		if (isLoggedIn === true && isSubscribed === true) {
			router.push("/stock-picks");
		}
		if (isLoggedIn === false) {
			setShowLoginModalForSubscribe(true);
		}
	};

  const handleCloseLoginModalForSubscribeNow = () => {
    setShowLoginModalForSubscribe(false);
  };

  const handleLogin = () => {
    if (isLoggedIn) {
      router.push("/stock-picks");
    } else {
      setShowLoginModal(true);
    }
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

	return (
		<main
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: "#fff",
			}}
		>
			<section
				style={{
					display: "flex",
					flexDirection: "column",
					maxWidth: "80rem",
					backgroundColor: "#fff",
					justifyContent: "center",
					alignItems: "center",
					paddingLeft: "15px",
					paddingRight: "15px",
					paddingTop: "10vh",
					paddingBottom: "15vh",
					"@media only screen and (max-width: 768px)": {
						// paddingTop: "10000px",
						width: "100vw",
						paddingBottom: "10vh",
					},
				}}
				className="subscriptionSection-mobile"
			>
				<Box
					style={{
						width: "100%",
						maxWidth: "80rem",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						marginBottom: "80px",
						padding: "0 15px",
						// "@media only screen and (max-width: 768px)": {
						//   paddingTop: "0vh",
						//   width: "100vw",
						//   paddingLeft: "15px",
						//   paddingRight: "15px",
						//   // marginBottom: "10vh !important",
						// },
					}}
					className="subscriptionPlansHeader"
				>
					<Text
						b
						size={70}
						css={{
							"@media only screen and (max-width: 768px)": {
								textAlign: "left",
								fontSize: 45,
								lineHeight: 1.1,
								maxWidth: "100%",
								width: "100%",
							},
						}}
					>
						Subscription Plans
					</Text>
					<Text
						b
						size={25}
						css={{
							textAlign: "center",
							"@media only screen and (max-width: 768px)": {
								marginTop: "10px",
								textAlign: "left",
								fontSize: 20,
								lineHeight: 1.1,
								marginBottom: "20px",
							},
						}}
					>
						Unravel our offerings - Elevate your wealth journey with KamayaKya
						VIP!
					</Text>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						gap: "40px",
						alignItems: "center",
						justifyContent: "center",
						"@media only screen and (max-width: 768px)": {
							alignItems: "center",
							justifyContent: "center",
							gap: "20px",
						},
					}}
				>
					<Card
						css={{
							height: "450px",
							width: "320px",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							borderRadius: "35px",
							background: "#fff",
							filter: "none",
							border: "4px solid #fda629",
							justifyContent: "center",
							paddingTop: "48px",
							paddingBottom: "0px",
							paddingLeft: "15px",
							paddingRight: "15px",
							"@media only screen and (max-width: 768px)": {
								order: 0,
								width: "95%",
							},
						}}
					>
						<div className="cr cr-top cr-right cr-sticky cr-blue">FREE</div>

						<img
							src="./kmk-logo-free.png"
							style={{ marginTop: "5px", width: "65%" }}
						/>
						<Divider
							css={{
								background: "#000000",
								width: "30px",
								height: "3px",
								marginTop: "20px",
							}}
						/>
						<Box
							sx={{
								width: "100%",
								alignSelf: "start",
								marginTop: "20px",
								marginBottom: "10px",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								paddingLeft: "30px",
								paddingRight: "30px",
							}}
						>
							<CheckCircleIcon
								sx={{
									marginRight: "10px",
									fontSize: 20,
									alignSelf: "start",
									marginTop: "5px",
									opacity: 0.9,
								}}
							/>
							<Text b size={18} css={{ lineHeight: 1.2, opacity: 0.9 }}>
								3 - system-generated stock picks accessible lifetime (NSE + BSE)
							</Text>
						</Box>
						<Box
							sx={{
								width: "100%",
								alignSelf: "start",
								// marginTop: "20px",
								marginBottom: "10px",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								paddingLeft: "30px",
								paddingRight: "30px",
							}}
						>
							<CloseIcon
								sx={{
									marginRight: "10px",
									fontSize: 20,
									alignSelf: "start",
									marginTop: "5px",
									opacity: 0.9,
								}}
							/>
							<Text b size={18} css={{ lineHeight: 1.2, opacity: 0.9 }}>
								No SME stock picks
							</Text>
						</Box>
						<Box
							sx={{
								width: "100%",
								alignSelf: "start",
								// marginTop: "20px",
								marginBottom: "10px",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								paddingLeft: "30px",
								paddingRight: "30px",
							}}
						>
							<CloseIcon
								sx={{
									marginRight: "10px",
									fontSize: 20,
									alignSelf: "start",
									marginTop: "5px",
									opacity: 0.9,
								}}
							/>
							<Text b size={18} css={{ lineHeight: 1.2, opacity: 0.9 }}>
								No WhatsApp & Email updates
							</Text>
						</Box>
						<Divider
							css={{
								background: "#000000",
								width: "30px",
								height: "3px",
								marginTop: "20px",
								marginBottom: "20px",
							}}
						/>
						<Button
							onClick={handleLogin}
							variant="contained"
							// disabled={isLoggedIn ? true : false}
							sx={{
								width: "75%",
								backgroundImage:
									"linear-gradient(to top , #105B54, #0F734D, #0F734D)",
								paddingTop: "5px",
								paddingBottom: "5px",
								borderRadius: "10000px",
								boxShadow: "none",
								"&:hover": {
									backgroundImage:
										"linear-gradient(to top , #105B54, #0F734D, #0F734D)",
								},
								// opacity: isLoggedIn ? 0 : 1,
							}}
						>
							<Text b size={18} color="#fff">
								{isLoggedIn ? "Stocks to buy" : "Login"}
							</Text>
						</Button>
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
						<Text b size={20} css={{ marginTop: "10px", opacity: 0 }}>
							for ₹<span style={{ fontSize: 28, opacity: 0 }}>15,000/year</span>
						</Text>
					</Card>
					<Card
						isHoverable
						css={{
							// height: "650px",
							width: "350px",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							borderRadius: "35px",
							background: "#fff",
							filter: "none",
							justifyContent: "center",
							paddingTop: "80px",
							paddingBottom: "80px",
							paddingLeft: "15px",
							paddingRight: "15px",
							backgroundImage:
								"linear-gradient(to top , #105B54, #0F734D, #0F734D)",
							"@media only screen and (max-width: 672px)": {
								order: 1,
								width: "100%",
							},
						}}
					>
						<div className="cr cr-top cr-right cr-sticky cr-subscription">
							VIP+
						</div>
						<img
							src="kamayakya-logo-white-vip.png"
							style={{ marginTop: "5px", width: "75%" }}
						/>

						<Divider
							css={{
								background: "#fff",
								opacity: "0.5",
								width: "30px",
								height: "3px",
								marginTop: "20px",
							}}
						/>

						<Box
							sx={{
								width: "100%",
								alignSelf: "start",
								marginTop: "20px",
								marginBottom: "10px",
								// marginLeft: "5%",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								paddingLeft: "30px",
								paddingRight: "30px",
							}}
						>
							<CheckCircleIcon
								sx={{
									marginRight: "10px",
									color: "#fff",
									fontSize: 20,
									alignSelf: "start",
									marginTop: "5px",
									opacity: 0.9,
								}}
							/>
							<Text
								b
								color="#fff"
								size={20}
								css={{ lineHeight: 1.2, opacity: 0.9 }}
							>
								2-4 individual stock picks every month
							</Text>
						</Box>
						<Box
							sx={{
								width: "100%",
								alignSelf: "start",
								// marginTop: "20px",
								marginBottom: "10px",
								// marginLeft: "5%",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								paddingLeft: "30px",
								paddingRight: "30px",
							}}
						>
							<CheckCircleIcon
								sx={{
									marginRight: "10px",
									color: "#fff",
									fontSize: 20,
									alignSelf: "start",
									marginTop: "5px",
									opacity: 0.9,
								}}
							/>
							<Text
								b
								color="#fff"
								size={20}
								css={{ lineHeight: 1.2, opacity: 0.9 }}
							>
								NSE + BSE + SME stock picks
							</Text>
						</Box>
						<Box
							sx={{
								width: "100%",
								alignSelf: "start",
								// marginTop: "20px",
								marginBottom: "10px",
								// marginLeft: "5%",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								paddingLeft: "30px",
								paddingRight: "30px",
							}}
						>
							<CheckCircleIcon
								sx={{
									marginRight: "10px",
									color: "#fff",
									fontSize: 20,
									alignSelf: "start",
									marginTop: "5px",
									opacity: 0.9,
								}}
							/>
							<Text
								b
								color="#fff"
								size={20}
								css={{ lineHeight: 1.2, opacity: 0.9 }}
							>
								WhatsApp & Email updates
							</Text>
						</Box>

						<Divider
							css={{
								background: "#fff",
								opacity: "0.5",
								width: "30px",
								height: "3px",
								marginTop: "20px",
								marginBottom: "20px",
							}}
						/>
						<Button
							variant="contained"
							sx={{
								width: "75%",
								background: "linear-gradient(to top , #fb7716,#fe9807)",
								paddingTop: "5px",
								paddingBottom: "5px",
								borderRadius: "10000px",
								boxShadow: "none",
								"&:hover": {
									background: "linear-gradient(to top , #fb7716,#fe9807)",
								},
							}}
							onClick={handleLoginOrSubForSubscribeNow}
						>
							<Text b color="#FFF" size={18}>
								{isLoggedIn ? (
									isSubscribed ? (
										<Text b color="#FFF" size={18}>
											Stocks to buy
										</Text>
									) : (
										<Text b color="#FFF" size={18}>
											Subscribe Now
										</Text>
									)
								) : (
									<Text b color="#FFF" size={18}>
										Subscribe Now
									</Text>
								)}
							</Text>
						</Button>

            <Modal
              width="450px"
              open={showLoginModalForSubscribe}
              onClose={handleCloseLoginModalForSubscribeNow}
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
                  onClick={() => handleCloseLoginModalForSubscribeNow()}
                >
                  <CloseIcon sx={{ color: "#e81123" }} />
                </IconButton>
              </Box>

              <Modal.Body>
                <LoginForSubsribe />
              </Modal.Body>
            </Modal>

            <Text
              b
              size={26}
              color="#fff"
              css={{
                textAlign: "center",
                marginTop: "10px",
                opacity: showPricing ? 1 : 0,
              }}
            >
              for ₹
              <span
                style={{
                  color: "#fff",
                  fontSize: 36,
                  lineHeight: 1.2,
                  opacity: showPricing ? 1 : 0,
                }}
              >
                15,000/year
              </span>
            </Text>

						<Text
							b
							size={20}
							color="#FFF"
							css={{
								mt: "0px",
								lineHeight: 1,
								opacity: showPricing ? 0.75 : 0,
							}}
						>
							inclusive of taxes
						</Text>
						<Text
							b
							size={14}
							color="#FFF"
							css={{
								textDecoration: 'underline',
								position: 'absolute',
								bottom: '35px',
								cursor: "pointer",
								// mt: "10px",
								lineHeight: 1,
								opacity: showPricing ? 1 : 0,
							}}
							onClick={handleShowModal}
						>
							Why do we charge annually?
						</Text>
						<Modal
							open={showModal}
							onClose={handleModalClose}
							css={{
								justifyContent: "center",
								background: "transparent",
								alignItems: "center",
								boxShadow: "none",
							}}
						>
							<Card
								css={{
									padding: "50px 50px",
									width: "550px",
									"@media only screen and (max-width: 672px)": {
										width: "95%",
									},
								}}
							>
								<IconButton
									sx={{ position: "absolute", top: "5px", right: "5px" }}
									onClick={handleModalClose}
								>
									<CloseIcon color="error" />
								</IconButton>
							    <Text b size={21} css={{ textAlign: 'start' }}>Why do we charge annually?</Text>
								<br />
								<Text b css={{ lineHeight: 1.2, textAlign: 'start' }}>
									We understand that effective investing requires time and
									patience, which is why we exclusively offer an annual plan.
									Our strategy reflects our ethos that long-term commitment is
									key to unlocking the true potential of your investments.
								</Text>

							</Card>
						</Modal>
					</Card>
					<Card
						css={{
							height: "450px",
							width: "320px",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							borderRadius: "35px",
							background: "#fff",
							filter: "none",
							border: "4px solid #1877f2",
							justifyContent: "center",
							paddingTop: "50px",
							paddingBottom: "50px",
							paddingLeft: "15px",
							paddingRight: "15px",
							"@media only screen and (max-width: 672px)": {
								order: 2,
								width: "95%",
							},
						}}
					>
						<img
							src="smallcase-full-logo.svg"
							style={{ marginTop: "5px", width: "65%" }}
						/>
						<Divider
							css={{
								background: "#000000",
								width: "30px",
								height: "3px",
								marginTop: "20px",
							}}
						/>
						<Box
							sx={{
								width: "100%",
								alignSelf: "start",
								marginTop: "20px",
								marginBottom: "10px",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								paddingLeft: "30px",
								paddingRight: "30px",
							}}
						>
							<CheckCircleIcon
								sx={{
									marginRight: "10px",
									fontSize: 20,
									alignSelf: "start",
									marginTop: "5px",
									opacity: 0.9,
								}}
							/>
							<Text b size={18} css={{ lineHeight: 1.2, opacity: 0.9 }}>
								Basket of stocks (only NSE)
							</Text>
						</Box>
						<Box
							sx={{
								width: "100%",
								alignSelf: "start",
								marginBottom: "10px",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								paddingLeft: "30px",
								paddingRight: "30px",
							}}
						>
							<CheckCircleIcon
								sx={{
									marginRight: "10px",
									fontSize: 20,
									alignSelf: "start",
									marginTop: "5px",
									opacity: 0.9,
								}}
							/>
							<Text b size={18} css={{ lineHeight: 1.2, opacity: 0.9 }}>
								Execution via broker connect
							</Text>
						</Box>
						<Box
							sx={{
								width: "100%",
								alignSelf: "start",
								marginBottom: "10px",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								paddingLeft: "30px",
								paddingRight: "30px",
							}}
						>
							<CheckCircleIcon
								sx={{
									marginRight: "10px",
									fontSize: 20,
									alignSelf: "start",
									marginTop: "5px",
									opacity: 0.9,
								}}
							/>
							<Text b size={18} css={{ lineHeight: 1.2, opacity: 0.9 }}>
								WhatsApp & Email updates
							</Text>
						</Box>
						<Divider
							css={{
								background: "#000000",
								width: "30px",
								height: "3px",
								marginTop: "20px",
								marginBottom: "20px",
							}}
						/>
						<Button
							variant="contained"
							sx={{
								width: "75%",
								background: "#1877f2",
								paddingTop: "5px",
								paddingBottom: "5px",
								borderRadius: "10000px",
								boxShadow: "none",
								"&:hover": {
									background: "#1877f2",
								},
							}}
							onClick={() =>
								window.open(
									"https://kamayakya.smallcase.com/#portfolios",
									"_blank"
								)
							}
						>
							<Text b size={18} color="#fff">
								Subscribe Now
							</Text>
						</Button>
						{/* <Text b size={20} css={{ marginTop: "10px" }}>
							for ₹<span style={{ fontSize: 28 }}>11,800/year</span>
						</Text> */}

						{/* <Text
							b
							size={17}
							color="#000"
							css={{ mt: "0px", opacity: 0.95, lineHeight: 1 }}
						>
							inclusive of taxes
						</Text> */}
						{/* <Text
							b
							size={14}
							color="#000000"
							css={{
								textDecoration: 'underline',
								position: 'absolute',
								bottom: '22px',
								cursor: "pointer",
								// mt: "10px",
								lineHeight: 1,
								opacity: showPricing ? 1 : 0,
							}}
							onClick={handleShowModal}
						>
							Why do we charge annually?
						</Text> */}
					</Card>
				</Box>
			</section>
		</main>
	);
};

export default SubscriptionNew;
