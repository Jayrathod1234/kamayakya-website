import React, { useEffect, useState, useContext } from "react";
// import { BILLING_DETAILS_URL, GET_USER, INVOICE_UPLOAD } from "./api/URLs";
import { Button, Loading, Text } from "@nextui-org/react";
import AuthContext from "@/components/AuthContext";
import { useRouter } from "next/router";

const paymentfailed = () => {
	const [countdown, setCountdown] = useState(4);
	const [showMessage, setShowMessage] = useState(false);
	const [message, setMessage] = useState("");
	const [retryPayment, setRetryPayment] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// if (retryPayment) {
			setIsLoading(true);
			const interval = setInterval(() => {
				setCountdown((prevCountdown) => prevCountdown - 1);
			}, 1000);

			return () => clearInterval(interval);
		// }
	}, []);
	useEffect(() => {
		if (countdown === -1) {
			setShowMessage(true);
			setTimeout(() => {
			router.push("/purchase"); // Redirect the user to the purchase page.
			}, 1000);
			// setMessage("Taking longer than usual please wait...");
		}
	}, [countdown]);

	const handleRetryPayment = () => {
		setRetryPayment(true);
		setIsLoading(true);

		// You can perform any additional actions here before redirecting the user.

		// After some actions, you can redirect the user.
		setTimeout(() => {
			router.push("/purchase"); // Redirect the user to the purchase page.
		}, 1000); // Adjust the delay as needed.
	};

	// const handleToHome = () => {
	// 	setIsLoading(true);
	// 	router.push("/");
	// };

	return (
		<div
			style={{
				width: "100vw",
				minHeight: "50vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				textAlign: "center",
				gap: "10px",
			}}
		>
			<img
				src="./kmk-logo (1).png"
				alt="KamayaKya Logo"
				style={{ width: "220px", height: "60px", alignSelf: "center" }}
			/>
			<Text b size={34}>
				Payment Failed!
			</Text>

			{/* <Button
				onPress={handleRetryPayment}
				css={{
					alignSelf: "center",
					width: "250px",
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
				Retry Payment
			</Button>

			<Button
				onPress={handleToHome}
				css={{
					alignSelf: "center",
					width: "250px",
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
				Back to Home
			</Button> */}
			{isLoading ? <Loading size="lg" color={"error"} type="gradient" /> : ""}
			{/* {retryPayment ? ( */}
				{showMessage ? (
					<Text b size={20}>
						{message}
					</Text>
				) : (
					<Text b size={20}>
						You will be redirected in {countdown} seconds
					</Text>
				)}
			{/* ) : null} */}
		</div>
	);
};

export default paymentfailed;
