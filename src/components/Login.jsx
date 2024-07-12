import React, { useState } from "react";
import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";
import { Text } from "@nextui-org/react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { FaLandmark } from "react-icons/fa";

const Login = () => {
	const [showRegisterCard, setShowRegisterCard] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleClose = () => {
		setShowModal(false);
	};

	const handleShowRegister = () => {
		setShowRegisterCard(true);
	};

	const handleShowLogin = () => {
		setShowRegisterCard(false);
	};

	return (
		<div>
			<Box sx={{ display: "flex", flexDirection: "column", width: "100%"}}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						width: "100%",
						// gap: "5px",
					}}
				>
					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
						}}
					>
						{showRegisterCard ? <RegisterCard /> : <LoginCard />}
						<div style={{ textAlign: "center", marginTop: "0px" }}>
							{showRegisterCard ? (
								<Text b size={16}>
									Get OTP via
									<span
										style={{
											color: "#0a5b53",
											cursor: "pointer",
											marginLeft: "3px",
										}}
										onClick={handleShowLogin}
									>
										Mobile?
									</span>
								</Text>
							) : (
								<Text b size={16}>
									Get OTP via
									<span
										style={{
											color: "#0a5b53",
											cursor: "pointer",
											marginLeft: "3px",
										}}
										onClick={handleShowRegister}
									>
										Email?
									</span>
								</Text>
							)}
						</div>
					</div>
				</Box>
			</Box>
		</div>
	);
};

export default Login;
