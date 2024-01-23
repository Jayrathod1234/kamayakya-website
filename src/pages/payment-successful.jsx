import React, { useEffect, useState, useContext } from "react";
import {
	BILLING_DETAILS_URL,
	BILLING_INFO_URL,
	GET_USER,
	INVOICE_UPLOAD,
} from "./api/URLs";
import { Loading, Text } from "@nextui-org/react";
import AuthContext from "@/components/AuthContext";
import { useRouter } from "next/router";
import { pdf } from "@react-pdf/renderer";
import InvoicePDF from "./UserDetails/InvoicePDF";

const paymentsuccessful = () => {
	// const { isLoggedIn } = useContext(AuthContext);
	// const [user, setUser] = useState(null);
	// const [UserDetails, setUserDetails] = useState(null);
	const [countdown, setCountdown] = useState(5);
	const [showMessage, setShowMessage] = useState(false);
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [billingData, setBillingData] = useState({});
	const router = useRouter();

	useEffect(() => {
		const refreshToken = localStorage.getItem("refresh");
		const GetPaymentInfo = async () => {
			try {
				const billingInfo = await fetch(BILLING_INFO_URL, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `token ${refreshToken}`,
					},
				});
				console.log(billingInfo);
				if (billingInfo.ok) {
					const billingInfoResponse = await billingInfo.json();
					console.log(billingInfoResponse);
					setBillingData(billingInfoResponse);
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};

		GetPaymentInfo();
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setCountdown((prevCountdown) => prevCountdown - 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	useEffect(() => {
		if (countdown === -1) {
			setShowMessage(true);
			// console.log('window.history.previous.href', window.history.back)
			const redirect = localStorage.getItem("location");
			router.push(redirect ? redirect : "/");
			// setMessage("Taking longer than usual please wait...");
			setIsLoading(false);
			localStorage.removeItem("location");
		}
	}, [countdown]);

	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				textAlign: "center",
				gap: "10px",
				backgroundColor: "white",
				background: "white",
			}}
		>
			<img
				src="./kmk-logo (1).png"
				alt="KamayaKya Logo"
				style={{ width: "220px", height: "60px", alignSelf: "center" }}
			/>
			<Text b size={34}>
				Payment Successful!
			</Text>
			<Text
				b
				size={22}
				css={{
					"@media only screen and (max-width: 764px)": {
						fontSize: 18,
					},
				}}
			>
				Order Number:{billingData?.order_number}
			</Text>
			{showMessage ? (
				""
			) : (
				<Text
					b
					size={22}
					css={{
						"@media only screen and (max-width: 764px)": {
							fontSize: 18,
						},
					}}
				>
					Success! Your payment has rocketed into our account. Buckle up and get
					ready, your financial exploration is about to take off!
					{/* <br /> */}
					{/* Please wait while your invoice is being generated... */}
				</Text>
			)}
			<Text b size={34}>
				Amount: ₹ {billingData?.amount}/-
			</Text>
			{isLoading ? <Loading size="lg" color={"success"} type="gradient" /> : ""}
			{showMessage ? (
				<Text b size={20}>
					{message}
				</Text>
			) : (
				<Text b size={20}>
					You will be redirected in {countdown} seconds
				</Text>
			)}
			{isLoading ? (
				""
			) : (
				<Text b size={20}>
					Redirecting Now...
				</Text>
			)}
		</div>
	);
};

export default paymentsuccessful;
