import { Box } from "@mui/material";
import { Card, Text } from "@nextui-org/react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';

const TestimonialsNew = () => {
	const cards = [
		{
			quote:
				"My experience with Kamayakya in both their smallcase and VIP+ website subscription has been great so far. Their in depth analysis of stocks, understanding the market scenario and balancing the risk reward ratio are unmatched in the industry. Some of their small cap picks are truly gems that have created huge wealth for their investors. I would highly recommend investors to take their services to achieve their long term financial goals.",
			author: "Kiran Sanghvi, Indus Properties",
			rating: "⭐⭐⭐⭐⭐",
			image: "/userFeedback_1.jpg",
		},
		{
			quote:
				"I have been investing with KamayaKya since over a year now and I only have good things to say. Very good returns, transparency and a team of market experts with amazing investment strategies. I plan to invest with the firm for a long time and I would highly recommend it too.",
			author: "Tanish Mittal, Hindustan Pressings Pvt. Ltd",
			rating: "⭐⭐⭐⭐⭐",
			image: "/userFeedback_2.jpg",
		},
		{
			quote:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer urna magna, porttitor vel nisi et, fringilla pellentesque enim. Nunc facilisis tincidunt accumsan. Vestibulum non erat vel ipsum viverra gravida. Maecenas vestibulum magna ante, sed tincidunt metus iaculis eu. Curabitur aliquam consectetur ligula ut efficitur",
			author: "Ken Adams, KIDA Studios Pvt. Ltd",
			rating: "⭐⭐⭐⭐",
			image: "/UserAvatar-lion.png",
		},
	];

	const CardItems = [
		<Card
			data-value="1"
			variant="flat"
			css={{
				background: "#fff",
				boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)",
				padding: "15px",
				borderRadius: "20px",
				maxWidth: "450px",
				// marginRight: "15px",
				// "@media only screen and (max-width: 768px)": {
				// 	width: "100%",
				// },
			}}
		>
			<div
				style={{
					background: "#fff",
					display: "flex",
					flexDirection: "column",
					borderTopRightRadius: "15px",
					borderTopLeftRadius: "15px",
					padding: "8px",
				}}
			>
				<FaQuoteLeft
					color="#0f734d"
					size={20}
					style={{ marginTop: "0px", marginLeft: "0px" }}
				/>
				<Text
					b
					css={{
						display: "flex",
						whiteSpace: "normal",
						marginTop: "10px",
						paddingBottom: "10px",
						lineHeight: 1.2,
						textAlign: "center",
						maxWidth: "95%",
						alignSelf: "center",
						"@media only screen and (max-width: 768px)": {
							fontSize: "10px",
						},
					}}
				>
					My experience with Kamayakya in both their smallcase and VIP+ website
					subscription has been great so far. Their in depth analysis of stocks,
					understanding the market scenario and balancing the risk reward ratio
					are unmatched in the industry. Some of their small cap picks are truly
					gems that have created huge wealth for their investors. I would highly
					recommend investors to take their services to achieve their long term
					financial goals.
				</Text>
				<FaQuoteRight
					color="#0f734d"
					size={20}
					style={{
						marginTop: 0,
						marginRight: 0,
						alignSelf: "flex-end",
					}}
				/>
			</div>
			<img
				src="/userFeedback_1.jpg"
				style={{
					width: "80px",
					height: "80px",
					borderRadius: "1000px",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
					alignSelf: "center",
					marginTop: "-30px",
				}}
			/>
			<Text b css={{ marginTop: "10px", textAlign: "center" }}>
				Kiran Sanghvi, Indus Properties
			</Text>
			{/* <Text
				css={{
					marginTop: "10px",
					textAlign: "center",
					color: "#f5c813",
				}}
			>
				⭐⭐⭐⭐
			</Text> */}
		</Card>,
		<Card
		data-value="2"
			variant="flat"
			css={{
				background: "#fff",
				boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)",
				padding: "15px",
				borderRadius: "20px",
				maxWidth: "450px",
			}}
		>
			<div
				style={{
					background: "#f0f0f0",
					display: "flex",
					flexDirection: "column",
					borderTopRightRadius: "15px",
					borderTopLeftRadius: "15px",
					padding: "8px",
				}}
			>
				<FaQuoteLeft
					color="#0f734d"
					size={20}
					style={{ marginTop: "0px", marginLeft: "0px" }}
				/>
				<Text
					b
					css={{
						display: "flex",
						whiteSpace: "normal",
						marginTop: "10px",
						paddingBottom: "10px",
						lineHeight: 1.2,
						textAlign: "center",
						maxWidth: "95%",
						alignSelf: "center",
						"@media only screen and (max-width: 768px)": {
							fontSize: "10px",
						},
					}}
				>
					I have been investing with KamayaKya since over a year now and I only
					have good things to say. Very good returns, transparency and a team of
					market experts with amazing investment strategies. I plan to invest
					with the firm for a long time and I would highly recommend it too.
				</Text>
				<FaQuoteRight
					color="#0f734d"
					size={20}
					style={{
						marginTop: 0,
						marginRight: 0,
						alignSelf: "flex-end",
					}}
				/>
			</div>
			<img
				src="/userFeedback_2.jpg"
				style={{
					width: "80px",
					height: "80px",
					borderRadius: "1000px",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
					alignSelf: "center",
					marginTop: "-30px",
				}}
			/>
			<Text b css={{ marginTop: "10px", textAlign: "center" }}>
				Tanish Mittal, Hindustan Pressings Pvt. Ltd
			</Text>
			<Text
				css={{
					marginTop: "10px",
					textAlign: "center",
					color: "#f5c813",
				}}
			>
				⭐⭐⭐⭐⭐
			</Text>
		</Card>,
		// <Card
		// data-value="3"
		// 	variant="flat"
		// 	css={{
		// 		background: "#fff",
		// 		boxShadow: "0 10px 26px rgba(0, 0, 0, 0.1)",
		// 		padding: "15px",
		// 		borderRadius: "20px",
		// 		maxWidth: "450px",
		// 	}}
		// >
		// 	<div
		// 		style={{
		// 			background: "#fff",
		// 			display: "flex",
		// 			flexDirection: "column",
		// 			borderTopRightRadius: "15px",
		// 			borderTopLeftRadius: "15px",
		// 			padding: "8px",
		// 		}}
		// 	>
		// 		<FaQuoteLeft
		// 			color="#0f734d"
		// 			size={20}
		// 			style={{ marginTop: "0px", marginLeft: "0px" }}
		// 		/>
		// 		<Text
		// 			b
		// 			css={{
		// 				display: "flex",
		// 				whiteSpace: "normal",
		// 				marginTop: "10px",
		// 				paddingBottom: "10px",
		// 				lineHeight: 1.2,
		// 				textAlign: "center",
		// 				maxWidth: "95%",
		// 				alignSelf: "center",
		// 				"@media only screen and (max-width: 768px)": {
		// 					fontSize: "10px",
		// 				},
		// 			}}
		// 		>
		// 			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer urna
		// 			magna, porttitor vel nisi et, fringilla pellentesque enim. Nunc
		// 			facilisis tincidunt accumsan. Vestibulum non erat vel ipsum viverra
		// 			gravida. Maecenas vestibulum magna ante, sed tincidunt metus iaculis
		// 			eu. Curabitur aliquam consectetur ligula ut efficitur
		// 		</Text>
		// 		<FaQuoteRight
		// 			color="#0f734d"
		// 			size={20}
		// 			style={{
		// 				marginTop: 0,
		// 				marginRight: 0,
		// 				alignSelf: "flex-end",
		// 			}}
		// 		/>
		// 	</div>
		// 	<img
		// 		src="/UserAvatar-lion.png"
		// 		style={{
		// 			width: "80px",
		// 			height: "80px",
		// 			borderRadius: "1000px",
		// 			boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
		// 			alignSelf: "center",
		// 			marginTop: "-30px",
		// 		}}
		// 	/>
		// 	<Text b css={{ marginTop: "10px", textAlign: "center" }}>
		// 		Ken Adams, YRF Pvt. Ltd
		// 	</Text>
		// 	{/* <Text
		// 		css={{
		// 			marginTop: "10px",
		// 			textAlign: "center",
		// 			color: "#f5c813",
		// 		}}
		// 	>
		// 		⭐⭐⭐
		// 	</Text> */}
		// </Card>,
	];

	const responsive = {
		0: { 
			items: 1
		},
		568: { 
			items: 2
		},
		1024: {
			items: 2,
			// itemsFit: 'cover'
		},
	};

	return (
		<main
			style={{
				backgroundColor: "#fff",
				paddingTop: "0vh",
				paddingBottom: "5vh",
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
					width: "100lvw",
					maxWidth: "2000px",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<Text
					b
					size={60}
					css={{
						"@media only screen and (max-width: 768px)": {
							fontSize: 30,
							width: "70%",
							display: "flex",
							flexWrap: "wrap",
							alignSelf: "center",
							textAlign: "center",
							lineHeight: 1.2,
						},
					}}
				>
					Satisfied Customers Are Our Best Ads
				</Text>

				<Box sx={{ maxWidth: "1300px", display: "flex", alignSelf: "center", marginTop: "25px", width: "98lvw" }}>
					<AliceCarousel
						mouseTracking
						items={CardItems}
						responsive={responsive}
						disableButtonsControls
						infinite
						autoPlay={true}
						autoPlayInterval={3000}
						controlsStrategy="alternate"
					/>
				</Box>
			</div>
		</main>
	);
};

export default TestimonialsNew;
