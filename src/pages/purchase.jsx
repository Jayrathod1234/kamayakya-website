import React, { useState, useEffect, useContext } from "react";
import { GET_USER } from "@/pages/api/URLs";
import {
	Button,
	Card,
	Divider,
	Input,
	Loading,
	Modal,
	Text,
} from "@nextui-org/react";
import { Box, IconButton } from "@mui/material";
import NavBar2 from "@/components/Navbar2";
import FaqsNew from "../pages/screens/FaqsNew";
import Footer from "../pages/screens/Footer";
import AuthContext from "@/components/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import Login from "../components/Login";
import PhoneInput from "react-phone-input-2";
import pincodeData from "../Data/pincode_db.json";
import { ArrowBack, TaskAltOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import Confetti from "react-confetti";
// import { TextInput } from "@mantine/core";
import { CODE_VALID, SUBSCRIBE_RAZORPAY, SUBSCRIBE_URL, RAZORPAY_CALLBACK } from "./api/URLs";
import PageVisibility from "../components/PageVisibility";

export default function PreviewPage() {
	// const [productID, setProductID] = useState("");
	const router = useRouter();
	const { isLoggedIn } = useContext(AuthContext);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showDiscountConfirmation, setShowDiscountConfirmation] =
		useState(false);
	const [billingNumber, setBillingNumber] = useState("");
	const [gstNo, setGstNo] = useState("");
	const [referralCode, setReferralCode] = useState("");
	const [userCity, setUserCity] = useState("");
	const [userState, setUserState] = useState("");
	const [userPincode, setUserPincode] = useState("");
	const [discountCode, setDiscountCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const [emailValid, setEmailValid] = useState(true);
	const [validNumber, setValidNumber] = useState(true);
	const [billingName, setBillingName] = useState("");
	const [billingEmail, setBillingEmail] = useState("");
	const refreshToken = localStorage.getItem("refresh");
	const [step, setStep] = useState(1);

	const handleNextStep = () => {
		setStep(step + 1);
	};

	const handlePrevStep = () => {
		setStep(step - 1);
	};

	const handleDiscountConfirmationOpen = () => {
		setShowDiscountConfirmation(true);
	};

	const handleDiscountConfirmationClose = () => {
		setShowDiscountConfirmation(false);
	};

	useEffect(() => {
		const getUserDetails = async () => {
			if (refreshToken) {
				try {
					const response = await fetch(GET_USER, {
						method: "GET",
						headers: {
							Authorization: `Token ${refreshToken}`,
						},
					});
					const data = await response.json();
					// setUserInvoiceDetails(data);
					setBillingName(data.username || "");
					setBillingEmail(data.email || "");
					setBillingNumber(data.mobile || "");
					setReferralCode(data.admin_referral_code || "");
				} catch (error) {
					console.error("Error verifying tokens:", error);
				}
			}
		};

		getUserDetails();
	}, []);

	useEffect(() => {
		updateFormValidity();
	}, [billingNumber, billingEmail, billingName, userPincode]);


	const handleLogin = () => {
		setShowLoginModal(true);
	};

	const handleCloseLoginModal = () => {
		setShowLoginModal(false);
	};

	const handleNameChange = (e) => {
		const name = e.target.value;
		// Use a regular expression to check if the name contains only letters and spaces
		const isValidName = /^[A-Za-z\s]*$/.test(name);
		setBillingName(name);
		if (isValidName) {
			updateFormValidity();
		}
	};

	const handleInputChange = (value) => {
		const lengthNumber = value.length;
		if (value !== "" && lengthNumber === 12) {
			setValidNumber(true);
			setBillingNumber(value);
		} else {
			setValidNumber(false);
		}
		updateFormValidity();
	};

	const handleEmailChange = (e) => {
		const email = e.target.value;
		setBillingEmail(email);

		// Define a regular expression for email validation
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (emailPattern.test(email)) {
			// Email is valid, set the border color to light grey
			setEmailValid(true);
		} else {
			// Email is not valid, set the border color to red
			setEmailValid(false);
		}

		updateFormValidity();
	};

	const handlePincodeChange = (e) => {
		const pincode = e.target.value;
		setUserPincode(pincode);
		// Check if the pincode is a 6-digit number
		const isSixDigitPincode = /^\d{6}$/.test(pincode);

		if (isSixDigitPincode) {
			updateFormValidity();
			// Find the pincode entry in the pincodeData array
			const result = pincodeData.find((entry) => entry.pincode === pincode);
			if (result) {
				setUserCity(result.city);
				setUserState(result.state);
			}
		} else {
			setUserCity("");
			setUserState("");
			// Handle invalid pincode input, e.g., display an error message.
		}
	};

	const updateFormValidity = () => {
		setIsFormValid(
			billingNumber !== "" &&
				billingEmail !== "" &&
				billingName !== "" &&
				userState !== "" &&
				userCity !== "" &&
				userPincode !== ""
		);
	};

	const handleGSTChange = (e) => {
		setGstNo(e.target.value.toUpperCase());
	};

	const handleReferralChange = (e) => {
		setReferralCode(e.target.value.toUpperCase());
	};

	const handleDiscountChange = (e) => {
		setDiscountCode(e.target.value.toUpperCase());
	};

	 const handleSaveAndPay = async () => {
		try {
			setLoading(true);

			const billingData = {
				name: billingName,
				whatsapp_no: billingNumber,
				email: billingEmail,
				pincode: userPincode,
				city: userCity,
				state: userState,
				gst_number: gstNo ? gstNo : "",
				referral_code: referralCode ? referralCode : "",
				discount_code: discountCode,
			};

			// Make API call to BILLING_URL
			const billingResponse = await fetch(SUBSCRIBE_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `token ${refreshToken}`,
				},
				body: JSON.stringify(billingData),
			});
			console.log(billingResponse);
			if (billingResponse.ok) {
				const responseData = await billingResponse.json();
				console.log(responseData);
				window.open(responseData, "_self");
			}

			setLoading(false);
		} catch (error) {
			console.error("Error:", error);
			setLoading(false);
		}
	};

	const loadScript = (src) => {
		return new Promise((resolve) => {
		  const script = document.createElement("script");
		  script.src = src;
		  script.onload = () => {
			resolve(true);
		  };
		  script.onerror = () => {
			resolve(false);
		  };
		 document.body.appendChild(script);
	   });
	};

	/*useEffect(() => {
		loadScript("https://checkout.razorpay.com/v1/checkout.js");
	},[]);*/

	/*const handleSaveAndPay = async () => {
		try {
			setLoading(true);

			const billingData = {
				name: billingName,
				whatsapp_no: billingNumber,
				email: billingEmail,
				pincode: userPincode,
				city: userCity,
				state: userState,
				gst_number: gstNo ? gstNo : "",
				referral_code: referralCode ? referralCode : "",
				discount_code: discountCode,
			};

			// Make API call to create a Razorpay order
			const orderResponse = await fetch(SUBSCRIBE_RAZORPAY, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `token ${refreshToken}`, // Use your Razorpay API key here
				},
				body: JSON.stringify(billingData),
			});

			if (!orderResponse.ok) {
				throw new Error("Failed to create Razorpay order");
			}

			const orderData = await orderResponse.json();
			console.log(orderData, "ID", orderData.order_id);
			// Initialize Razorpay
			const options = {
				key: 'rzp_live_XxyaONaRC20Cra', //'rzp_test_YteVuBPrLvOKSg',  // Your Razorpay API key
				amount: orderData.amount * 100,
				currency: orderData.currency,
				order_id: orderData.order_id,
				redirect: true,
				callback_url: RAZORPAY_CALLBACK,
				handler: function (response) {
					// Handle success callback
					console.log("Payment successful:", response);
					// Redirect to success page or perform further actions
					// router.push("/payment-successful");
				},
				prefill: {
					name: billingName,
					email: billingEmail,
					contact: billingNumber,
				},
			};

			const rzp = new Razorpay(options);

			// Open Razorpay checkout form
			rzp.open();

			setLoading(false);
		} catch (error) {
			console.error("Error:", error);
			setLoading(false);
		}
	};*/


	const [discountAmount, setDiscountAmount] = useState("");
	const [totalAmount, setTotalAmount] = useState("");
	const [discountApplied, setDiscountApplied] = useState(false);

	const validateDiscountCode = async () => {
		// console.log(discountCode);
		setLoading(true);
		try {
			const discountCodeValidation = await fetch(CODE_VALID, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `token ${refreshToken}`,
				},
				body: JSON.stringify({
					discount_code: discountCode,
				}),
			});
			if (discountCodeValidation.ok) {
				const responseData = await discountCodeValidation.json();
				// console.log(responseData);
				setLoading(false);
				setDiscountAmount(responseData.discount);
				setTotalAmount(responseData.total_amount);
				setDiscountApplied(true);
				handleDiscountConfirmationOpen();
			} else if (discountCodeValidation.status === 400) {
				setDiscountCode("");
				alert("Code not applicable");
				setLoading(false);
			} else if (discountCodeValidation.status === 404) {
				setDiscountCode("");
				alert("Code not found");
				setLoading(false);
			} else if (!discountCodeValidation.ok) {
				setDiscountCode("");
				alert("Error applying the code");
				setLoading(false);
			}
		} catch (error) {
			console.error("Error:", error);
			setLoading(false);
		}
		setLoading(false);
	};

	const handleRemoveDiscount = () => {
		setDiscountAmount("");
		setDiscountCode("");
		setDiscountApplied(false);
	};

	if (!isLoggedIn) {
		return (
			<section
				style={{
					// height: "35vh",
					display: "flex",
					justifyContent: "center",
					backgroundColor: "#fff",
					padding: "50px",
				}}
			>
				<Box
					sx={{
						width: "100%",
						maxWidth: "80rem",
						display: "flex",
						flexDirection: "column",
						flexWrap: "wrap",
						alignContent: "center",
						justifyContent: "center",
						alignItems: "center",
						alignSelf: "center",
						paddingLeft: "20px",
						paddingRight: "20px",
						"@media only screen and (max-width: 764px)": {
							width: "100%",
							paddingLeft: "15px",
							paddingRight: "15px",
							alignContent: "flex-start",
							justifyContent: "flex-start",
							alignItems: "flex-start",
							alignSelf: "flex-start",
							flexDirection: "column-reverse",
						},
					}}
				>
					<Box
						sx={{ width: "50%", height: "auto" }}
						className="aboutSectionGifAndText"
					>
						<video
							muted
							autoPlay
							loop
							src="https://kamayakya.com/In%20Depth%20Research%20-%20Why%20Us.mp4"
							style={{ borderRadius: "30px", width: "100%", height: "100%" }}
						/>
					</Box>
					<Box
						className="aboutSectionGifAndText mobileAboutText"
						sx={{
							width: "50%",
							display: "flex",
							flexDirection: "column",
							alignSelf: "center",
							paddingRight: "0px",
						}}
					>
						<Button
							auto
							onPress={handleLogin}
							css={{
								borderRadius: "10000px",
								marginTop: 30,
								backgroundColor: "#ff9f24",
								zIndex: 0,
								paddingLeft: 50,
								paddingRight: 50,
								height: "50px",
								width: "90px",
								alignSelf: "center",
								// marginBottom: "15px",
								"@media only screen and (max-width: 764px)": {
									borderRadius: "15px",
									paddingLeft: 15,
									paddingRight: 15,
									marginLeft: 0,
									marginBottom: 0,
									marginTop: "10px",
									height: "55px",
									width: "250px",
								},
							}}
						>
							<Text
								b
								size={20}
								color="White"
								css={{
									"@media only screen and (max-width: 764px)": {
										fontSize: 18,
										// padding: "1px 5px",
										width: "auto",
									},
								}}
							>
								Login
							</Text>
						</Button>
					</Box>
					<Modal
						width="450px"
						blur
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
			</section>
		);
	}

	return (
		// <PageVisibility>
		// 	{(isPageVisible) => (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					background: "#fff",
					"@media only screen and (maxWidth: 764px)": {
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
				<NavBar2 />
				<Text
					b
					color="#000"
					css={{
						fontSize: 70,
						lineHeight: 1.2,
						marginTop: "30px",
						marginBottom: "0px",
						textAlign: "center",
						"@media only screen and (max-width: 764px)": {
							fontSize: 45,
							width: "100%",
						},
					}}
				>
					Invoice Details
				</Text>
				<Text
					b
					color="#000"
					css={{
						fontSize: 25,
						lineHeight: 1.2,
						marginTop: "0px",
						marginBottom: "25px",
						textAlign: "center",
						"@media only screen and (max-width: 764px)": {
							fontSize: 20,
							width: "100%",
						},
					}}
				>
					You will receive your invoice via email
				</Text>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap-reverse",
						// width: "60%",
						maxWidth: "80rem",
						// justifyContent: "space-between",
						justifyContent: "center",
						gap: "15px",
						// alignItems: "center",
						// paddingBottom: "30px",
						marginBottom: "100px",
						marginTop: "15px",
						"@media only screen and (max-width: 1269px)": {
							justifyContent: "center",
							gap: "10px",
						},
						"@media only screen and (max-width: 764px)": {
							justifyContent: "center",
							alignItems: "center",
							width: "98vw !important",
							maxWidth: "380px !important",
							gap: "10px",
						},
					}}
				>
					<Card
						variant="bordered"
						css={{
							shadow: "none",
							width: "370px",
							// background: "#f4f4f5",
							background: "#fff",
							borderRadius: "10px",
							paddingTop: "25px",
							"@media only screen and (max-width: 764px)": {
								width: "98vw !important",
								maxWidth: "380px !important",
							},
						}}
					>
						{step === 1 && (
							<>
								<Text
									b
									css={{
										alignSelf: "start",
										marginLeft: "50px",
										marginBottom: "3px",
										fontSize: 14,
										color: "#125a54",
										"@media only screen and (max-width: 764px)": {
											fontSize: 13,
											// width: "50%",
										},
									}}
								>
									FULL NAME *
								</Text>
								<Input
									required
									type="text"
									placeholder="eg: Nitya Shah"
									clearable
									animated={false}
									size="lg"
									value={billingName}
									onChange={handleNameChange}
									css={{
										marginBottom: "15px",
										alignSelf: "center",
										width: "300px",
										height: "47px",
										borderRadius: "10px",
										border: "1px solid",
										borderColor: billingName === "" ? "red" : "lightgrey",
										// paddingRight: '10px'
									}}
								/>
								<Text
									b
									css={{
										alignSelf: "start",
										marginLeft: "50px",
										marginBottom: "1px",
										fontSize: 14,
										color: "#125a54",
										"@media only screen and (max-width: 764px)": {
											fontSize: 13,
											// width: "50%",
										},
									}}
								>
									WHATSAPP NUMBER *
								</Text>
								<PhoneInput
									containerStyle={{
										marginBottom: "10px",
										// marginRight: "5px",
										alignSelf: "center",
										width: "302px",
										border: validNumber ? "" : "1px solid",
										borderRadius: "10px",
										borderColor: validNumber ? "lightgrey" : "red",
									}}
									disableDropdown={true}
									dropdownStyle={{ height: "250px", zIndex: 10 }}
									countryCodeEditable={false}
									country="in"
									onlyCountries={["in"]}
									placeholder="9175939641"
									value={billingNumber}
									onChange={handleInputChange}
									inputProps={{
										required: true,
										autoFocus: true,
									}}
									inputExtraProps={{
										mask: "+(999) 999 9999",
									}}
									containerClass="billingForm"
								/>
							</>
						)}
						{step === 1 && (
							<>
								<Text
									b
									css={{
										alignSelf: "start",
										marginLeft: "50px",
										marginBottom: "3px",
										fontSize: 14,
										color: "#125a54",
										"@media only screen and (max-width: 764px)": {
											fontSize: 13,
											// width: "50%",
										},
									}}
								>
									EMAIL ID *
								</Text>
								<Input
									required
									type="email"
									placeholder="eg: contact@kamayakya.com"
									clearable
									size="lg"
									value={billingEmail}
									onChange={handleEmailChange}
									animated={false}
									css={{
										marginBottom: "15px",
										alignSelf: "center",
										width: "300px",
										height: "47px",
										border: "1px solid",
										borderColor: emailValid ? "lightgrey" : "red",
										borderRadius: "10px",
									}}
								/>
								<Text
									b
									css={{
										alignSelf: "start",
										marginLeft: "50px",
										marginBottom: "3px",
										fontSize: 14,
										color: "#125a54",
										"@media only screen and (max-width: 764px)": {
											fontSize: 13,
											// width: "50%",
										},
									}}
								>
									PINCODE *
								</Text>
								<Input
									required
									type="text"
									placeholder="eg: 411001"
									clearable
									animated={false}
									size="lg"
									value={userPincode}
									onChange={handlePincodeChange}
									css={{
										marginBottom: "15px",
										alignSelf: "center",
										width: "300px",
										height: "47px",
										border: "1px solid",
										borderColor:
											userCity && userState !== "" ? "lightgrey" : "red",
										borderRadius: "10px",
									}}
								/>
							</>
						)}
						{step === 1 && (
							<>
								<Text
									b
									css={{
										alignSelf: "start",
										marginLeft: "50px",
										marginBottom: "3px",
										fontSize: 14,
										color: "grey",
										"@media only screen and (max-width: 764px)": {
											fontSize: 13,
											// width: "50%",
										},
									}}
								>
									GSTIN
								</Text>
								<Input
									placeholder="eg: 27AAJCK1075B1ZS"
									clearable
									animated={false}
									size="lg"
									value={gstNo}
									maxLength={15}
									minLength={15}
									onChange={handleGSTChange}
									css={{
										marginBottom: "15px",
										alignSelf: "center",
										width: "300px",
										// height: "46px",
										border: "1px solid lightgrey",
										borderRadius: "10px",
									}}
								/>
								{/*<Text
									b
									css={{
										textAlign: "start",
										marginLeft: "50px",
										marginBottom: "3px",
										fontSize: 14,
										color: "grey",
										"@media only screen and (max-width: 764px)": {
											fontSize: 13,
											// width: "50%",
										},
									}}
								>
									REFERRAL CODE
								</Text> */}
								{/* <Input
									clearable
									animated={false}
									size="lg"
									maxLength={6}
									minLength={6}
									value={referralCode}
									onChange={handleReferralChange}
									css={{
										marginBottom: "10px",
										alignSelf: "center",
										width: "300px",
										// height: "46px",
										border: "1px solid lightgrey",
										borderRadius: "10px",
										// transition: "none !important",
									}}
								/> */}
							</>
						)}
						{/* {step === 2 && (
						<div style={{ display: 'flex', flexDirection: 'column', gap: "14px" }}>
							<TextInput
								label="NAME"
								required
								radius={"xl"}
								size="md"
								style={{ width: "300px", alignSelf: "center" }}
								value={billingName}
								onChange={handleNameChange}
							/>
							<TextInput
								label="EMAIL ID"
								required
								radius={"xl"}
								size="md"
								style={{ width: "300px", alignSelf: "center" }}
								error
								// value={billingName}
								// onChange={handleNameChange}
							/>
							<TextInput
								label="PINCODE"
								required
								radius={"xl"}
								size="md"
								style={{ width: "300px", alignSelf: "center" }}
								value={"411028"}
								// onChange={handleNameChange}
							/>
							<TextInput
								label="GSTIN"
								required
								radius={"xl"}
								size="md"
								style={{ width: "300px", alignSelf: "center" }}
								// value={billingName}
								// onChange={handleNameChange}
							/>
							<TextInput
								label="REFERRAL CODE"
								required
								radius={"xl"}
								size="md"
								style={{ width: "300px", alignSelf: "center" }}
								// value={billingName}
								// onChange={handleNameChange}
							/>
						</div>
					)} */}
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-evenly",
							}}
						>
							{/* {step > 1 && (
										<Button
											auto
											onPress={handlePrevStep}
											css={{
												marginBottom: "20px",
												marginTop: "10px",
												width: "33%",
												borderRadius: "10000px",
											}}
										>
											Previous
										</Button>
									)} */}

							{/* {step < 1 && (
										<Button
											auto
											onPress={handleNextStep}
											css={{
												marginBottom: "20px",
												marginTop: "10px",
												width: "33%",
												borderRadius: "10000px",
											}}
										>
											Next
										</Button>
									)} */}

							{step === 1 && (
								<Button
									auto
									onPress={handleSaveAndPay}
									disabled={!isFormValid}
									css={{
										background: "linear-gradient(to top , #fb7716,#fe9807)",
										marginBottom: "20px",
										borderRadius: "10px",
										marginTop: "10px",
										width: "33%",
									}}
								>
									{loading ? <Loading color={"white"} /> : "Proceed"}
								</Button>
							)}
						</Box>
					</Card>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							width: "382px",
							alignContent: "center",
						}}
						className="paymentsPage-box"
					>
						{discountApplied === false && (
							<Box
								sx={{
									background: "#fff",
									borderRadius: "5px",
									display: "flex",
									justifyContent: "center",
									gap: "2px",
									flexDirection: "row",
								}}
							>
								<Input
									placeholder="Have a discount code?"
									clearable
									animated={false}
									size="lg"
									value={discountCode}
									onChange={handleDiscountChange}
									css={{
										alignSelf: "center",
										height: "46px",
										border: "1px solid lightgrey",
										borderRadius: "10px",
									}}
								/>
								<Button
									auto
									css={{
										alignSelf: "center",
										maxWidth: "262px",
										borderRadius: "10px",
										fontSize: 16,
										// backgroundImage:
										// 	"linear-gradient(to right , #51168C, #3C4AB3, #32C0C8)",
										backgroundColor: "#ff9f24",
									}}
									onClick={validateDiscountCode}
									disabled={discountCode === "" || loading}
								>
									{loading ? <Loading color={"white"} /> : "Apply Code"}
								</Button>
							</Box>
						)}
						{discountApplied === true && (
							<Box
								sx={{
									border: "1px dashed #bebfc5",
									borderRadius: "5px",
									marginTop: discountApplied ? "0px" : "15px",
									padding: "15px",
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									textAlign: "center",
								}}
							>
								<div
									style={{
										fontSize: "16px",
										display: "flex",
										flexDirection: "column",
										alignItems: "start",
									}}
								>
									<span style={{ color: "#3d4152", fontWeight: 500 }}>
										Code : {discountCode}
									</span>
									<span
										style={{
											color: "#93959f",
											fontSize: "14px",
											lineHeight: 1,
										}}
									>
										saved on base value ₹12711.86/-
									</span>
								</div>
								<span
									onClick={handleRemoveDiscount}
									className="discount-remove"
									style={{
										"@media only screen and (maxWidth: 764px)": {
											color: "#ff9e29 !important",
										},
									}}
								>
									Remove
								</span>
							</Box>
						)}
						<Box
							sx={{
								display: "flex",
								paddingTop: "15px",
								flexDirection: "column",
								gap: "8px",
							}}
						>
							<Box sx={{ textAlign: "center" }}>Billing Details</Box>
							<Divider css={{ marginTop: "5px", marginBottom: "5px" }} />
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Box>Subscription Plan</Box>
								<Box>KamayaKya VIP+</Box>
							</Box>
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Box>Base Price</Box>
								<Box>₹12711.86/-</Box>
							</Box>
							{discountApplied === true && (
								<Box sx={{ display: "flex", justifyContent: "space-between" }}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											color: "#37b24d",
										}}
									>
										Discount
										{/* <img src="discount-img.png" alt="discount-png" width={20} height={20} /> */}
									</Box>
									<Box sx={{ color: "#37b24d" }}> - ₹{discountAmount}/- </Box>
								</Box>
							)}
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Box>Taxable Amount</Box>
								<Box>₹{(12711.86 - discountAmount).toFixed(2)}/- </Box>
							</Box>
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Box>Tax</Box>
								<Box>₹{((12711.86 - discountAmount) * 0.18).toFixed(2)}/- </Box>
							</Box>
							<hr
								style={{
									marginTop: "5px",
									marginBottom: "5px",
									border: "1px dashed #e7e7e8",
								}}
							/>
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Box>Total Amount</Box>
								<Box>
									₹
									{discountApplied === false
										? `15000.00`
										: ((12711.86 - discountAmount) * 1.18).toFixed(2)}
									/-{" "}
								</Box>
							</Box>
							<hr
								style={{
									marginTop: "5px",
									marginBottom: "5px",
									border: "1px dashed #e7e7e8",
								}}
							/>
						</Box>
					</Box>
				</Box>
				<Modal
					open={showDiscountConfirmation}
					onClose={handleDiscountConfirmationClose}
					width="350px"
				>
					<Confetti width={"350px"} height={"300px"} numberOfPieces={50} />
					<Modal.Header
						css={{ textAlign: "center", color: "#ff9e29", fontSize: 28 }}
					>
						Discount Applied!
					</Modal.Header>
					<Modal.Body css={{ alignItems: "center" }}>
						<TaskAltOutlined
							sx={{
								fontSize: 100,
								color: "#37b24d",
							}}
						/>
						<Box sx={{ fontSize: 24, color: "#282c3f" }}>
							Code: {discountCode}
						</Box>
						<Box sx={{ fontSize: 20, marginTop: "-10px" }}>
							Original Price:{" "}
							<span
								style={{
									textDecoration: "2px line-through red",
								}}
							>
								₹{totalAmount}/-
							</span>
						</Box>
						<Box sx={{ fontSize: 20, marginTop: "-20px" }}>
							Discounted Price: ₹
							{((12711.86 - discountAmount) * 1.18).toFixed(2)}/-
						</Box>

						<Box sx={{ fontSize: 24, marginTop: "-10px", color: "#37b24d" }}>
							You saved: ₹{discountAmount}/-
						</Box>
					</Modal.Body>
					<Modal.Footer>
						<Button
							css={{
								width: "100%",
								backgroundImage: "linear-gradient(to top , #106052, #0f734d)",
								fontSize: 20,
							}}
							onClick={handleDiscountConfirmationClose}
						>
							Yay!
						</Button>
					</Modal.Footer>
				</Modal>

				<FaqsNew />
				<Footer />
			</Box>
		</>
		// 	)}
		// </PageVisibility>
	);
}
