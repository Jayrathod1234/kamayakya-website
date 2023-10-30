import React, { useState, useEffect, useContext } from "react";
import { GET_USER } from "@/pages/api/URLs";
// import { loadStripe } from "@stripe/stripe-js";
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
// import { Elements } from "@stripe/react-stripe-js";
import NavBar2 from "@/components/Navbar2";
import FaqsNew from "../pages/screens/FaqsNew";
import Footer from "../pages/screens/Footer";
import AuthContext from "@/components/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import Login from "../components/Login";
import PhoneInput from "react-phone-input-2";
import pincodeData from "../Data/pincode_db.json";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";
// import indiaPincodeSearch from "india-pincode-search";

// const stripePromise = loadStripe(
// 	"pk_test_51N3dAPSFPooNZtZaCwGwRUC1IHpC4HqARVbxMBia13Fqan4H6SoLZUhLz21xqqMhtDU5Kiurtzia2uznSEbGSADk00LRBh1V2p"
// );
// const Stripe_Key = process.env.NEXT_PUBLIC_STRIPE_KEY;

// const stripePromise = loadStripe(Stripe_Key);
// const indiaPincodeSearch = require('india-pincode-search');

export default function PreviewPage() {
	// const [productID, setProductID] = useState("");
	const router = useRouter();
	const { isLoggedIn } = useContext(AuthContext);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [openBillingModal, setOpenBillingModal] = useState(true);
	const [billingNumber, setBillingNumber] = useState("");
	const [gstNo, setGstNo] = useState("");
	const [referralCode, setReferralCode] = useState("");
	const [userCity, setUserCity] = useState("");
	const [userState, setUserState] = useState("");
	const [userPincode, setUserPincode] = useState("");
	const [discountCode, setDiscountCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const [userInvoiceDetails, setUserInvoiceDetails] = useState([]);
	const [billingName, setBillingName] = useState("");
	const [billingEmail, setBillingEmail] = useState("");
	const refreshToken = localStorage.getItem("refresh");

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
					setUserInvoiceDetails(data);
					setBillingName(data.username || "");
					setBillingEmail(data.email || "");
					setBillingNumber(data.mobile) || "";
				} catch (error) {
					console.error("Error verifying tokens:", error);
				}
			}
		};

		getUserDetails();
	}, []);


	useEffect(() => {
		// Define a function to update form validity
		updateFormValidity();

	  }, [billingNumber, billingEmail, billingName, userPincode]);

	const handleOpenBillingModal = () => {
		setOpenBillingModal(true);
	};
	const handleCloseBillingModal = () => {
		setOpenBillingModal(false);
	};
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

	// const handleCityChange = (e) => {
	// 	setUserCity(e.target.value);
	// 	setIsFormValid(
	// 		e.target.value !== "" &&
	// 			billingNumber &&
	// 			billingEmail &&
	// 			userState &&
	// 			userCity &&
	// 			userPincode !== ""
	// 	);
	// };

	// const handleStateChange = (e) => {
	// 	setUserState(e.target.value);
	// 	setIsFormValid(
	// 		e.target.value !== "" &&
	// 			billingNumber &&
	// 			billingEmail &&
	// 			userState &&
	// 			userCity &&
	// 			userPincode !== ""
	// 	);
	// };

	const handleInputChange = (value) => {
		// setBillingNumber(value.replace(/-/g, " "));
		// setIsFormValid(billingNumber !== "" && value && billingEmail !== "");
		updateFormValidity();
	};

	const handleEmailChange = (e) => {
		const email = e.target.value;
		setBillingEmail(e.target.value);
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
		  const result = pincodeData.find(
			(entry) => entry.pincode === pincode
		  );
		  if (result) {
			setUserCity(result.city);
			setUserState(result.state);
		  }
		} else {
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

	// useEffect(() => {
	// 	const handleGetProduct = async () => {
	// 		try {
	// 			const refreshToken = localStorage.getItem("refresh");
	// 			const response = await fetch(GET_PRODUCT, {
	// 				headers: {
	// 					Authorization: `token ${refreshToken}`,
	// 				},
	// 			});
	// 			const data = await response.json();
	// 			// console.log(data);
	// 			const kamayaKyaProduct = data.find(
	// 				(product) => product.name === "KamayaKya"
	// 			);
	// 			const kamayaKyaProductID = kamayaKyaProduct?.stripe_product_id || "";
	// 			setProductID(kamayaKyaProductID);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};
	// 	handleGetProduct();
	// }, []);

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
				// referral: referralCode ? referralCode : "",
				discount_code: discountCode,
			};

			// Make API call to BILLING_URL
			const billingResponse = await fetch(
				"https://test-server.kamayakya.in/user/subscribe/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `token ${refreshToken}`,
					},
					body: JSON.stringify(billingData),
				}
			);
			console.log(billingResponse);
			if (billingResponse.ok) {
				const responseData = await billingResponse.json();
				console.log(responseData);
				window.open(responseData, "_self");
			}

			// if (billingResponse.ok) {
			// 	// Billing API call was successful
			// 	// Perform subsequent API call
			// 	try {
			// 		const response = await fetch(PAYMENT_URL, {
			// 			method: "POST",
			// 			headers: {
			// 				// "Content-Type": "application/x-www-form-urlencoded",
			// 				"Content-Type": "application/json",
			// 				Authorization: `token ${refreshToken}`, // Set the Authorization header with the refresh token
			// 			},
			// 			body: JSON.stringify({ product_id: productID }),
			// 		});
			// 		// Process the response
			// 		if (response.ok) {
			// 			console.log(response);
			// 			const data = await response.json();
			// 			console.log(data);
			// 			console.log(data.session_url);
			// 			window.location.href = data.session_url;
			// 		} else {
			// 			// Handle error response
			// 			console.log(response);
			// 		}
			// 	} catch (error) {
			// 		// Handle network or other errors
			// 		console.log(error);
			// 	}
			// } else {
			// 	// Subsequent API call failed
			// 	// Handle the error
			// 	console.log("After 1st Call");
			// }
			// Billing API call failed
			// console.log("Billing API call failed");

			setLoading(false);
		} catch (error) {
			console.error("Error:", error);
			setLoading(false);
		}
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
		<section
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				background: "#fff",
			}}
		>
			<NavBar2 />

			{/* <Elements stripe={stripePromise}>
				
				<form
				> */}
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "500px",
					maxWidth: "80rem",
					// height: "300px",
					alignContent: "center",
					padding: "15px",
					marginTop: "30px",
				}}
				className="paymentsPage-box"
			>
				<img src={"Card UI.png"} style={{ width: "100%", height: "auto" }} />
				<Button
					auto
					onPress={handleOpenBillingModal}
					css={{
						// width: "100%",
						height: "50px",
						fontSize: 23,
						marginTop: "20px",
						// marginLeft: "20px",
						borderRadius: "7000.5px",
						// border: "2.5px solid #440886",
						backgroundImage:
							"linear-gradient(to right , #51168C, #3C4AB3, #32C0C8)",
					}}
				>
					Subscribe Now
				</Button>
			</Box>
			{/* </form>
			</Elements> */}

			<Modal
				blur
				open={openBillingModal}
				// onClose={handleCloseBillingModal}
				css={{
					alignSelf: "center",
					background: "transparent",
					boxShadow: "none",
					borderRadius: "15px",
					// width: '420px',
					"@media only screen and (max-width: 764px)": {
						width: "95vw !important",
						maxWidth: "95vw !important",
					},
				}}
			>
				{/* <img src="kmk-k.png" style={{ width: "50px" }} /> */}

				<Card
					css={{
						width: "380px",
						// height: "620px",
						alignSelf: "center",
						borderRadius: "24px",
						"@media only screen and (max-width: 764px)": {
							width: "95vw !important",
							maxWidth: "380px !important",
						},
					}}
				>
					{/* <IconButton
						sx={{
							position: "absolute",
							width: "40px",
							"&:hover": { background: "#fff" },
							top: "5px",
							right: "0px",
							paddingRight: "30px",
							"@media only screen and (max-width: 764px)": {
								top: "5px",
								right: "0px",
							},
						}}
						onClick={() => router.back()}
					>
						<ArrowBack sx={{ color: "#e81123" }} />
					</IconButton> */}
					<Text
						b
						color="#000"
						css={{
							fontSize: 40,
							lineHeight: 1.2,
							marginTop: "40px",
							marginBottom: "0px",
							"@media only screen and (max-width: 764px)": {
								fontSize: 32,
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
							fontSize: 15,
							lineHeight: 1.2,
							marginTop: "0px",
							marginBottom: "25px",
							"@media only screen and (max-width: 764px)": {
								fontSize: 13,
								width: "100%",
							},
						}}
					>
						You will receive your invoice via email
					</Text>
					<Text
						b
						css={{
							alignSelf: "start",
							marginLeft: "50px",
							// position: 'absolute',
							marginBottom: "5px",
							fontSize: 14,
							color: "#125a54",
							"@media only screen and (max-width: 764px)": {
								fontSize: 13,
								// width: "50%",
							},
						}}
					>
						NAME * required
					</Text>
					<Input
						required
						type="text"
						placeholder="eg: Aniket Kulkarni"
						clearable
						size="lg"
						value={billingName}
						onChange={handleNameChange}
						css={{
							marginBottom: "15px",
							alignSelf: "center",
							width: "300px",
							height: "40px",
							borderRadius: "1000px",
							// paddingRight: '10px'
						}}
						className="countryPhone"
					/>
					<Text
						b
						css={{
							alignSelf: "start",
							marginLeft: "50px",
							// marginBottom: "5px",
							fontSize: 14,
							color: "#125a54",
							"@media only screen and (max-width: 764px)": {
								fontSize: 13,
								// width: "50%",
							},
						}}
					>
						WHATSAPP NUMBER * required
					</Text>
					<PhoneInput
						containerStyle={{
							marginBottom: "10px",
							marginRight: "5px",
							alignSelf: "center",
							width: "316px",
						}}
						dropdownStyle={{ height: "250px", zIndex: 10 }}
						countryCodeEditable={false}
						country="in"
						placeholder="eg: 9012345678"
						value={billingNumber}
						
						onChange={handleInputChange}
						inputProps={{
							
							required: true,
							autoFocus: true,
						}}
						inputExtraProps={{
							mask: "+(999) 999 9999",
						}}
						containerClass="countryPhone"
					/>
					<Text
						b
						css={{
							alignSelf: "start",
							marginLeft: "50px",
							marginBottom: "5px",
							fontSize: 14,
							color: "#125a54",
							"@media only screen and (max-width: 764px)": {
								fontSize: 13,
								// width: "50%",
							},
						}}
					>
						EMAIL ID * required
					</Text>
					<Input
						required
						type="email"
						placeholder="eg: support@kamayakya.com"
						clearable
						size="lg"
						value={billingEmail}
						onChange={handleEmailChange}
						css={{
							marginBottom: "15px",
							alignSelf: "center",
							width: "300px",
							height: "40px",
							borderRadius: "1000px",
						}}
						className="countryPhone"
					/>
					{/* <Text
						b
						css={{
							alignSelf: "start",
							marginLeft: "50px",
							fontSize: 12,
							color: "#125a54",
						}}
					>
						CITY * required
					</Text>
					<Input
						required
						type="text"
						placeholder="eg: Pune"
						clearable
						size="lg"
						value={userCity}
						onChange={handleCityChange}
						css={{
							marginBottom: "10px",
							alignSelf: "center",
							width: "300px",
							height: "50px",
							borderRadius: "1000px",
						}}
						className="countryPhone"
					/> */}
					{/* <Text
						b
						css={{
							alignSelf: "start",
							marginLeft: "50px",
							fontSize: 12,
							color: "#125a54",
						}}
					>
						STATE * required
					</Text>
					<Input
						required
						type="text"
						placeholder="eg: MAHARASHTRA"
						clearable
						size="lg"
						value={userState}
						onChange={handleStateChange}
						css={{
							marginBottom: "10px",
							alignSelf: "center",
							width: "300px",
							height: "50px",
							borderRadius: "1000px",
						}}
						className="countryPhone"
					/> */}
					<Text
						b
						css={{
							alignSelf: "start",
							marginLeft: "50px",
							marginBottom: "5px",
							fontSize: 14,
							color: "#125a54",
							"@media only screen and (max-width: 764px)": {
								fontSize: 13,
								// width: "50%",
							},
						}}
					>
						PINCODE * required
					</Text>
					<Input
						required
						type="text"
						placeholder="eg: 411001"
						clearable
						size="lg"
						value={userPincode}
						onChange={handlePincodeChange}
						css={{
							marginBottom: "15px",
							alignSelf: "center",
							width: "300px",
							height: "40px",
							borderRadius: "1000px",
						}}
						className="countryPhone"
					/>
					<Text
						b
						css={{
							alignSelf: "start",
							marginLeft: "50px",
							marginBottom: "5px",
							fontSize: 14,
							color: "grey",
							"@media only screen and (max-width: 764px)": {
								fontSize: 13,
								// width: "50%",
							},
						}}
					>
						GSTIN (optional)
					</Text>
					<Input
						placeholder="eg: 22AAAAA0000A1Z5"
						clearable
						size="lg"
						value={gstNo}
						maxLength={15}
						minLength={15}
						onChange={handleGSTChange}
						css={{
							marginBottom: "15px",
							alignSelf: "center",
							width: "300px",
							height: "40px",
							borderRadius: "1000px",
						}}
						className="countryPhone"
					/>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							gap: "15px",
							// marginTop: "20px",
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-evenly",
								// marginTop: "20px",
								// alignContent: 'start',
								width: "140px",
							}}
						>
							<Text
								b
								css={{
									alignSelf: "start",
									marginLeft: "10px",
									// marginBottom: "5px",
									fontSize: 14,
									color: "grey",
									"@media only screen and (max-width: 764px)": {
										fontSize: 13,
										// width: "50%",
									},
								}}
							>
								REFERRAL CODE
							</Text>
							<Text
								b
								css={{
									alignSelf: "start",
									marginLeft: "10px",
									marginBottom: "5px",
									fontSize: 13,
									color: "grey",
									"@media only screen and (max-width: 764px)": {
										fontSize: 12,
										// width: "50%",
									},
								}}
							>
								(optional)
							</Text>
							<Input
								placeholder="eg: KMK007"
								clearable
								size="lg"
								maxLength={6}
								minLength={6}
								value={referralCode}
								onChange={handleReferralChange}
								css={{
									marginBottom: "10px",
									alignSelf: "center",
									// width: "300px",
									height: "40px",
									borderRadius: "1000px",
								}}
								className="countryPhone"
							/>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-evenly",
								// marginTop: "20px",
								width: "140px",
							}}
						>
							<Text
								b
								css={{
									alignSelf: "start",
									marginLeft: "10px",
									fontSize: 14,
									color: "grey",
									"@media only screen and (max-width: 764px)": {
										fontSize: 13,
										// width: "50%",
									},
								}}
							>
								DISCOUNT CODE
							</Text>
							<Text
								b
								css={{
									alignSelf: "start",
									marginLeft: "10px",
									marginBottom: "5px",
									fontSize: 13,
									color: "grey",
									"@media only screen and (max-width: 764px)": {
										fontSize: 12,
										// width: "50%",
									},
								}}
							>
								(optional)
							</Text>
							<Input
								placeholder="eg: KMK007"
								clearable
								size="lg"
								maxLength={6}
								minLength={6}
								value={discountCode}
								onChange={handleDiscountChange}
								css={{
									marginBottom: "10px",
									alignSelf: "center",
									// width: "300px",
									height: "40px",
									borderRadius: "1000px",
								}}
								className="countryPhone"
							/>
						</Box>
					</Box>

					<Button
						auto
						onPress={handleSaveAndPay}
						css={{
							width: "50%",
							marginBottom: "15px",
							marginTop: "10px",
							fontSize: 18,
							borderRadius: "1000px",
							alignSelf: "center",
							background: "linear-gradient(to top , #fb7716,#fe9807)",
						}}
						disabled={!isFormValid}
					>
						{loading ? (
							<Loading color={"white"} css={{ background: "transparent" }} />
						) : (
							"Proceed"
						)}
					</Button>
					{/* <Text
						b
						css={{
							alignSelf: "center",
							// marginLeft: "50px",
							fontSize: 12,
							color: "grey",
							opacity: isFormValid ? 0 : 1,
						}}
					>
						fill required field/s to proceed
					</Text> */}
					{/* </Box> */}
				</Card>
			</Modal>
			<br />
			<Divider
				css={{
					width: "500px",
					maxWidth: "80rem",
				}}
			></Divider>
			<FaqsNew />
			<Footer />
		</section>
	);
}
