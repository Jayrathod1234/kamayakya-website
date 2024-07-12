import { Box } from "@mui/material";
import { Button, Text } from "@nextui-org/react";
import React from "react";

const Section1 = () => {
	return (
		<main style={{backgroundColor: "#fff"}}>
		<section
			style={{
				zIndex: 0,
				backgroundColor: "#fff",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				maxWidth: "80rem",
				paddingTop: "10vh",
				paddingBottom: "25px",
				margin: "0 auto",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap-reverse",
					flexDirection: "row",
					width: "100%",
					justifyContent: "center",
					paddingLeft: "15px",
					paddingRight: "15px",
					"@media only screen and (max-width: 764px)": {
						width: "100%",
						marginTop: "-30px",
					},
				}}
			>
				<Box
					sx={{
						width: "35%",
						"@media only screen and (max-width: 764px)": {
							width: "100%",
						},
					}}
				>
					<Box
						sx={{
							display: "flex",
							height: "500px",
							// maxHeight: "480px",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
							backgroundColor: "#142d51",
							padding: "50px",
						}}
					>
						<Text
							b
							size={35}
							color="#fff"
							css={{
								lineHeight: 1.1,
								marginBottom: "20px",
								"@media only screen and (max-width: 764px)": {
									fontSize: 38
								},
							}}
						>
							Will the Travel & Tourism industry take-off in the coming years?
						</Text>
						{/*<Text*/}
						{/*	b*/}
						{/*	size={15}*/}
						{/*	color="#fff"*/}
						{/*	css={{*/}
						{/*		lineHeight: 1.1,*/}
						{/*		marginBottom: "20px",*/}
						{/*		"@media only screen and (max-width: 764px)": {*/}
						{/*			fontSize: 38*/}
						{/*		},*/}
						{/*	}}*/}
						{/*>*/}
						{/*	The Indian tourism industry has been growing at an impressive pace in recent years, and this growth is only set to accelerate...*/}
						{/*</Text>*/}
						{/*<Box*/}
						{/*	sx={{*/}
						{/*		width: "100%",*/}
						{/*		display: "flex",*/}
						{/*		flexDirection: "row",*/}
						{/*		justifyContent: "space-between",*/}
						{/*		alignItems: "center",*/}
						{/*	}}*/}
						{/*>*/}
						{/*	<Text b size={14} color="#fff">*/}
						{/*		Team KamayaKya*/}
						{/*	</Text>*/}
						{/*	<Text b size={14} color="#fff">*/}
						{/*		09-Jan-2023*/}
						{/*	</Text>*/}
						{/*</Box>*/}
						<Button
							css={{
								borderRadius: "10000px",
								alignSelf: "flex-start",
								marginTop: "10px",
								backgroundColor: "#FF9E24",
								height: "40px",
								width: "30%",
							}}
						>
							<Text b size={15} color="#FFF">
								Read More
							</Text>
						</Button>
					</Box>
				</Box>
				<Box
					sx={{
						width: "65%",
						height: "100%",
						// marginTop: "5px",
						"@media only screen and (max-width: 764px)": {
							width: "100%",
							height: '300px',
							marginTop: "0",
							marginBottom: "-10px",
						},
					}}
				>
					<img
						width={"100%"}
						height={"500px"}
						style={{
							objectFit: "cover",
							objectPosition: "center",
							// height: '455px',
							// maxHeight: "500px",
						}}
						src="http://kk-cms-dev.mitplindia.com/uploads/pngtree_business_blue_airplane_travel_advertising_background_picture_image_1008129_8f2d8a28ae.jpg"
						alt="Blog Image"
					/>
				</Box>
			</Box>
		</section>
		</main>
	);
};

export default Section1;