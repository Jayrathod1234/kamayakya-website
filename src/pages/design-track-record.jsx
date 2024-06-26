import { Box } from "@mui/material";
import { Button, Loading, Text } from "@nextui-org/react";
import React, { useState, useContext, useEffect } from "react";
import Design1 from "./TrackDesigns/Design1";
import Design2 from "./TrackDesigns/Design2";
import Design3 from "./TrackDesigns/Design3";
import AuthContext from "@/components/AuthContext";
import { TRACK_RECORD_FOR_ALL, TRACK_RECORD_FOR_USER } from "@/pages/api/URLs";
import NavBar2 from "@/components/Navbar2";
import NavBar from "@/components/Navbar";
import PageVisibility from "@/components/PageVisibility";

const DesignTrackRecord = () => {
	const [designActive, setDesignActive] = useState(1);
	const [record, setRecord] = useState([]);
	const { isLoggedIn } = useContext(AuthContext);
	const { isSubscribed } = useContext(AuthContext);
	const [isLoadingTrackRecord, setisLoadingTrackRecord] = useState(true);

	const handleDesignActive = (designNumber) => {
		setDesignActive(designNumber);
	};

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
				console.log(data);
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
		handleTrackRecord();
	}, [isLoggedIn]);

	return (
		// <PageVisibility>
		// 	{(isPageVisible) => (
		<div style={{ background: "#fff" }}>
			{isLoggedIn ? <NavBar2 /> : <NavBar />}
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
                    alignItems: 'center'
				}}
			>
				<Text
					b
					size={70}
					css={{
						marginTop: "0px",
						marginBottom: "0px",
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
					We present our scorecard. Our victories, our misses - all in the open.
					<br />
					Your trust is earned, not assumed.
				</Text>
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
                    ""
				)}
			</Box>
			
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					flexDirection: "row",
					justifyContent: "center",
					marginTop: "15px",
					gap: "10px",
				}}
			>
				<Button
					auto
					style={{
						backgroundColor: designActive === 1 ? "#125b54" : "#ffa230",
						borderRadius: "10000px",
						fontSize: 15,
						height: '45px',
					}}
					onClick={() => handleDesignActive(1)}
				>
					1
				</Button>
				<Button
					auto
					style={{
						backgroundColor: designActive === 2 ? "#125b54" : "#ffa230",
						borderRadius: "10000px",
						fontSize: 15,
						height: '45px',
					}}
					onClick={() => handleDesignActive(2)}
				>
					2
				</Button>
				<Button
					auto
					style={{
						backgroundColor: designActive === 3 ? "#125b54" : "#ffa230",
						borderRadius: "10000px",
						fontSize: 15,
						height: '45px',
					}}
					onClick={() => handleDesignActive(3)}
				>
					3
				</Button>
			</Box>
			<Box sx={{ textAlign: "center"}}>Select a design to view</Box>
			{isLoadingTrackRecord && (
				<Loading
					type={"gradient"}
					style={{
						display: "flex",
						marginBottom: "15px",
						marginTop: "15px",
						alignSelf: "center",
					}}
				/>
			)}
			<Box>
				{designActive === 1 && <Design1 record={record} isLoggedIn={isLoggedIn} isSubscribed={isSubscribed} />}
				{designActive === 2 && <Design2 record={record} isLoggedIn={isLoggedIn} isSubscribed={isSubscribed}/>}
				{designActive === 3 && <Design3 record={record} isLoggedIn={isLoggedIn} isSubscribed={isSubscribed}/>}
			</Box>
		</div>
		// 	)}
		// </PageVisibility>
	);
};

export default DesignTrackRecord;
