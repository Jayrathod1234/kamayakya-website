import {
	Text,
	Button,
	Modal,
	Card,
	useModal,
	Divider,
} from "@nextui-org/react";
import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Section1 = () => {
	const { setVisible, bindings } = useModal();

	const handleIonOnePage = () => {
		var win = window.open(
			"Ion Exchange (India) Ltd. (IEIL) - 1 Page Report.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
	};
	const handleIonDetailed = () => {
		var win = window.open(
			"Ion Exchange (India) Ltd. (IEIL) - Detailed Report.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
	};
	const handleHGOnePage = () => {
		var win = window.open(
			"H.G. Infra Engineering Ltd (HGIEL) - 1 Page Report.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
	};
	const handleHGDetailed = () => {
		var win = window.open(
			"H.G. Infra Engineering Ltd (HGIEL) - Detailed Report.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
	};
	const handleGravitaOnePage = () => {
		var win = window.open(
			"Gravita India Ltd. (GIL) - 1 Page Report.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
	};
	const handleGravitaDetailed = () => {
		var win = window.open(
			"Gravita India Ltd. (GIL) - Detailed Report.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
	};

	const handleGuficOnePage = () => {
		var win = window.open(
			"Gufic BioScience - One Page Report.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
	};

	const handleGuficDetailed = () => {
		var win = window.open(
			"Gufic BioSciences - Detailed Report.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
	};

	return (
		<section
			id="philosophy"
			style={{
				width: "100vw",
				background: "#fff",
				padding: "90px 15px",
				paddingBottom: "120px",
				display: "flex",
				flexDirection: "column",
				flexWrap: "wrap",
				justifyContent: "center",
        alignItems: 'center',
			}}
			className="researchSection"
		>
			<div
				style={{
					width: "100%",
					maxWidth: "80rem",
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					justifyContent: "space-between",
				}}
			>
				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						flexWrap: "wrap",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Text
						b
						size={60}
						css={{
							textAlign: "center",
							"@media only screen and (max-width: 764px)": {
								textAlign: "left",
								fontSize: 45,
								lineHeight: 1,
								paddingBottom: "0px",
								alignSelf: "flex-start",
								marginTop: "0px",
							},
						}}
					>
						Research methodology
					</Text>
				</div>
				<div style={{ width: "100%", paddingTop: "25px" }}>
					<Text
						size={25}
						b
						css={{
							textAlign: "center",
							lineHeight: 1.25,
							"@media only screen and (max-width: 764px)": {
								textAlign: "left",
								fontSize: 23,
								lineHeight: 1.5,
							},
						}}
					>
						{/*We emphasize deep and thorough examination of each company,*/}
						{/*encompassing vital aspects such as capacity expansion, debt*/}
						{/*reduction, changes in management, industry tailwinds, favorable*/}
						{/*government policies, structural stories, and turnaround plays. These*/}
						{/*fundamental triggers serve as guideposts, enabling us to pinpoint*/}
						{/*companies poised for growth and success. Unlike traditional*/}
						{/*technical analysis approaches, we steer clear of relying solely on*/}
						{/*charts and graphs. Instead, our investment philosophy is rooted in a*/}
						{/*robust foundation of fundamental research. We believe that a*/}
						{/*thorough understanding of a company's financial health, growth*/}
						{/*potential, and market positioning is the key to making informed*/}
						{/*investment decisions.*/}
						We carefully select stocks after studying factors such as{" "}
						<b>
							<span
								style={{
									// background: "#125a54",
									color: "#ff8516",
									// color: '#f2982a',
									// textDecoration: 'underline #FF9E24',
									// textDecorationThickness: '3px',
									padding: "0px 0px",
									borderRadius: "1000px",
								}}
							>
								cash flow, top-line and bottom-line growth, promoter holding,
								management quality, valuations
							</span>{" "}
							and more.
						</b>{" "}
						Some of the fundamental triggers we focus on are{" "}
						<b>
							<span
								style={{
									// background: "#125a54",
									color: "#ff8516",
									// color: '#000',
									// textDecoration: 'underline #FF9E24',
									padding: "0px 0px",
									borderRadius: "1000px",
								}}
							>
								capacity expansion, debt reduction, change in management,
								industry tailwinds, favorable government policies, structural
								stories, turnaround plays and more
							</span>
							.
						</b>{" "}
						These <b>hidden gems</b> (emerging companies that have enormous
						potential but overlooked by the market participants) are backed by
						solid data and research, including{" "}
						<b>
							{" "}
							<span
								style={{
									// background: "#125a54",
									color: "#ff8516",
									// color: '#000',
									// textDecoration: 'underline #FF9E24',
									padding: "0px 0px",
									borderRadius: "1000px",
								}}
							>
								management interactions and channel checks
							</span>{" "}
						</b>
						, minus the market noise to minimize risks for you. Instead of
						conducting technical analysis of stocks, our approach focuses on
						conducting extensive and meticulous research that is solely based on
						fundamental factors.
					</Text>
				</div>
			</div>
			<Button
				auto
				size={"xl"}
				onPress={() => setVisible(true)}
				css={{
          width: "250px",
					borderRadius: "10000px",
					marginTop: 10,
					backgroundColor: "#ff9f24",
					zIndex: 0,
					paddingLeft: 50,
					paddingRight: 50,
					"@media only screen and (max-width: 764px)": {
						borderRadius: "15px",
						paddingLeft: 15,
						paddingRight: 15,
						marginLeft: 0,
						marginRight: "10px",
						marginBottom: 0,
						marginTop: "25px",
						height: "55px",
					},
				}}
			>
				<Text
					b
					size={28}
					color="White"
					css={{
						"@media only screen and (max-width: 764px)": {
							fontSize: 18,
							// padding: "1px 5px",
							width: "auto",
						},
					}}
				>
					Sample Reports
				</Text>
			</Button>
			<Modal
				blur
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
				{...bindings}
				css={{
					width: "65vw",
					maxWidth: "65vw",
					alignSelf: "flex-end",
					background: "transparent",
					boxShadow: "none",
					borderRadius: "15px",
					alignItems: "center",
					"@media only screen and (max-width: 764px)": {
						width: "95vw !important",
						maxWidth: "95vw !important",
					},
				}}
			>
				<Card
					css={{
						height: "fit-content",
						width: "fit-content",
						maxWidth: "80rem",
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
						padding: "50px 30px",
						borderRadius: "25px",
						// backgroundImage: "url(symbol-scatter-haikei-3.svg)",
						objectPosition: "center",
						backgroundPositionY: "center",
						backgroundSize: "cover",
						"@media only screen and (max-width: 764px)": {
							width: "100vw !important",
						},
					}}
				>
					<IconButton
						sx={{ position: "absolute", top: "5px", right: "5px" }}
						onClick={() => setVisible(false)}
					>
						<CloseIcon color="error" />
					</IconButton>
					<Text b size={40} css={{ alignSelf: "center" }}>
						Sample Reports
					</Text>
					<br />
					<Divider
						css={{
							width: "50px",
							height: "4px",
							borderRadius: "1000px",
							backgroundColor: "#FF9E24",
						}}
					/>
					<br />
					<Text b size={21} css={{ alignSelf: "center" }}>
						Ion Exchange (India) Ltd.
					</Text>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							alignContent: "center",
							justifyContent: "center",
						}}
					>
						<Button
							css={{
								background: "transparent",
								paddingLeft: "0px",
								marginTop: "0px",
								width: "auto",
							}}
							onPress={handleIonOnePage}
						>
							<Text b size={21} color="#18501E">
								1-Page Report
							</Text>
						</Button>
						<Button
							css={{
								background: "transparent",
								paddingLeft: "0px",
								marginTop: "0px",
								width: "auto",
							}}
							onPress={handleIonDetailed}
						>
							<Text b size={21} color="#18501E">
								Detailed Report
							</Text>
						</Button>
					</div>
					<br />
					<Divider
						css={{
							width: "50px",
							height: "4px",
							borderRadius: "1000px",
							backgroundColor: "#FF9E24",
						}}
					/>
					<br />
					<Text b size={21} css={{ alignSelf: "center" }}>
						H.G. Infra Engineering Ltd.
					</Text>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							alignContent: "center",
							justifyContent: "center",
						}}
					>
						<Button
							css={{
								background: "transparent",
								paddingLeft: "0px",
								marginTop: "0px",
								width: "auto",
							}}
							onPress={handleHGOnePage}
						>
							<Text b size={21} color="#18501E">
								1-Page Report
							</Text>
						</Button>
						<Button
							css={{
								background: "transparent",
								paddingLeft: "0px",
								marginTop: "0px",
								width: "auto",
							}}
							onPress={handleHGDetailed}
						>
							<Text b size={21} color="#18501E">
								Detailed Report
							</Text>
						</Button>
					</div>
					<br />
					<Divider
						css={{
							width: "50px",
							height: "4px",
							borderRadius: "1000px",
							backgroundColor: "#FF9E24",
						}}
					/>
					<br />
					<Text b size={21} css={{ alignSelf: "center" }}>
						Gravita India Ltd.
					</Text>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							alignContent: "center",
							justifyContent: "center",
						}}
					>
						<Button
							css={{
								background: "transparent",
								paddingLeft: "0px",
								marginTop: "0px",
								width: "auto",
							}}
							onPress={handleGravitaOnePage}
						>
							<Text b size={21} color="#18501E">
								1-Page Report
							</Text>
						</Button>
						<Button
							css={{
								background: "transparent",
								paddingLeft: "0px",
								marginTop: "0px",
								width: "auto",
							}}
							onPress={handleGravitaDetailed}
						>
							<Text b size={21} color="#18501E">
								Detailed Report
							</Text>
						</Button>
					</div>
					<br />
					<Divider
						css={{
							width: "50px",
							height: "4px",
							borderRadius: "1000px",
							backgroundColor: "#FF9E24",
						}}
					/>
					<br />
					<Text b size={21} css={{ alignSelf: "center" }}>
						Gufic BioSciences Ltd.
					</Text>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							alignContent: "center",
							justifyContent: "center",
						}}
					>
						<Button
							css={{
								background: "transparent",
								paddingLeft: "0px",
								marginTop: "0px",
								width: "auto",
							}}
							onPress={handleGuficOnePage}
						>
							<Text b size={21} color="#18501E">
								1-Page Report
							</Text>
						</Button>
						<Button
							css={{
								background: "transparent",
								paddingLeft: "0px",
								marginTop: "0px",
								width: "auto",
							}}
							onPress={handleGuficDetailed}
						>
							<Text b size={21} color="#18501E">
								Detailed Report
							</Text>
						</Button>
					</div>
				</Card>
			</Modal>
		</section>
	);
};

export default Section1;
