import { Navbar, Link, Text, Button, Modal } from "@nextui-org/react";
import {
	IconButton,
	Box,
	List,
	ListItemText,
	ListItemButton,
	useMediaQuery,
	SwipeableDrawer,
	ListItemIcon,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RxHamburgerMenu } from "react-icons/rx";
import Login from "./Login";
import CloseIcon from "@mui/icons-material/Close";
import { Book, Home2 } from "iconsax-react";
import { AiFillHome } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { BsGraphUpArrow } from "react-icons/bs";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import MoneyRoundedIcon from "@mui/icons-material/MoneyRounded";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

export default function App() {
	const [activeLink, setActiveLink] = useState("home");

	const isMobile = useMediaQuery("(max-width:1280px)");

	const router = useRouter();

	const [showModal, setShowModal] = useState(false);

	const handleLogin = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	// const handleLoginClick = () => {
	// 	router.push("/login");
	// };

	const ourStockPicks = () => {
		router.push("/stock-picks");
	};

	const trackRecord = () => {
		router.push("/track-record");
	};
	const smeCorner = () => {
		router.push("/sme");
	};

	// const handleAboutUs = () => {
	// 	router.push("/about-company");
	// };

	const handleHome = () => {
		router.push("/");
	};

	const handleBlog = () => {
		router.push("/blogs-page");
	};

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const scrolltoHash = function (element_id: string) {
		const element = document.getElementById(element_id);

		if (window.location.pathname !== "/" && element_id === "philosophy") {
			router.push("/#philosophy");
		} else if (window.location.pathname !== "/" && element_id === "pricing") {
			// Redirect to home page
			router.push("/#pricing");
		} else if (window.location.pathname !== "/" && element_id === "home") {
			// Redirect to home page
			router.push("/");
		}
		 else if (window.location.pathname === "/" && element_id === "home") {
			window.scrollTo({
				top: 0,
				behavior: "smooth", // Optional: Smooth scrolling behavior
			});
		}
		else {
			element?.scrollIntoView({ behavior: "smooth" });
		}
	};

	function updateActiveLink() {
		const sections = document.querySelectorAll("section[id]");

		// Check if there are sections with id attribute
		if (sections.length === 0) {
			return;
		}

		let closestSection = sections[0];
		let shortestDistance = Math.abs(sections[0].getBoundingClientRect().top);

		sections.forEach((section) => {
			const distance = Math.abs(section.getBoundingClientRect().top);
			if (distance < shortestDistance) {
				shortestDistance = distance;
				closestSection = section;
			}
		});

		const activeLinkId = closestSection.getAttribute("id");
		if (window.location.pathname === "/") {
			setActiveLink(activeLinkId || "");
		} else {
			setActiveLink("");
		}
	}

	// Attach scroll event listener to window
	window.addEventListener("scroll", updateActiveLink);

	useEffect(() => {
		updateActiveLink();
	}, []);

	return (
		<>
			<Navbar
				variant="sticky"
				maxWidth={"fluid"}
				disableShadow={true}
				height={100}
				css={{
					marginTop: 0,
					zIndex: 1,
					$$navbarBackgroundColor: "transparent",
					$$navbarBlurBackgroundColor: "none",
					".nextui-navbar-container": {
						backgroundColor: "#fff",
						backdropFilter: "none",
						boxShadow: "none",
						boxSizing: "content-box",
					},
					".nextui-c-hhqfap-kAwfsS-disableShadow-false": {
						boxShadow: "none",
					},
					".nextui-c-dGYPDG": { height: "0%" },
					// ".nextui-c-hhqfap-idKuEpT-css .nextui-c-dGYPDG": {
					// 	 height: "100%",
					// },
					"@media only screen and (max-width: 764px)": {
						// w: "195px",
						height: "80px",
						// left: 15,
					},
				}}
			>
				<Navbar.Brand
					css={{
						cursor: "pointer",
						// w: "350px",
						zIndex: 99,
						"@media only screen and (max-width: 764px)": {
							// w: "195px",
							//  h: '55px',
							h: "50px",
							// w: "122%",
							left: 15,
						},
						// position: "fixed",
					}}
				>
					<img
						onClick={() => handleHome()}
						// src={
						// 	activeLink === "whyUs"
						// 		? "./kamayakya-logo-white.png"
						// 		: "./kmk-logo.png"
						// }
						src="./kmk-logo (1).png"
						alt="logo"
						className="logoNavbar"
					/>
				</Navbar.Brand>
				{/* <Navbar.Toggle
					aria-label="toggle navigation"
					showIn="md"
					// className="modal-open"
					css={{
						// zIndex: 9999,
						height: "100vh",
						position: "fixed",
						right: "20px",
						// boxSizing: 'unset',
					}}
					// onClick={toggleMenu}
				>
					<RxHamburgerMenu size={24} />
				</Navbar.Toggle> */}
				{isMobile && (
					<IconButton
						aria-label="toggle navigation"
						onClick={toggleDrawer}
						sx={{
							position: "fixed",
							top: "20px",
							right: "20px",
							zIndex: 9999,
						}}
					>
						<RxHamburgerMenu size={24} />
					</IconButton>
				)}
				<SwipeableDrawer
					anchor="right"
					open={isDrawerOpen}
					onOpen={() => setIsDrawerOpen(true)}
					onClose={toggleDrawer}
					sx={{
						width: "100vw",
						maxWidth: "100%",
						"& .MuiDrawer-paper": {
							width: "100vw",
							maxWidth: "100%",
						},
					}}
				>
					<List>
						<ListItemButton
							onClick={() => {
								toggleDrawer();
							}}
							sx={{ justifyContent: "end" }}
						>
							<CloseIcon />
						</ListItemButton>
						<ListItemButton
							onClick={() => {
								handleHome();
								toggleDrawer();
							}}
						>
							<ListItemIcon sx={{ paddingLeft: "4px" }}>
								<Home2 size={30} style={{ color: "#FB9E29" }} />
							</ListItemIcon>
							<Text b className="drawerElementText">
								Home
							</Text>
						</ListItemButton>
						<ListItemButton
							onClick={() => {
								// handleAboutUs();
								scrolltoHash("philosophy");
								toggleDrawer();
							}}
						>
							<ListItemIcon sx={{ paddingLeft: "4px" }}>
								<GroupsOutlinedIcon
									sx={{ fontSize: 30 }}
									style={{ color: "#FB9E29" }}
								/>
							</ListItemIcon>
							<Text b className="drawerElementText">
								About Us
							</Text>
						</ListItemButton>
						{/* <ListItemButton
							onClick={() => {
								handleBlog();
								toggleDrawer();
							}}
						>
							<ListItemIcon sx={{ paddingLeft: "4px" }}>
								<Book size={30} style={{ color: "#FB9E29" }} />
							</ListItemIcon>
							<Text b className="drawerElementText">
								Blogs
							</Text>
						</ListItemButton> */}
						<ListItemButton
							onClick={() => {
								scrolltoHash("pricing");
								toggleDrawer();
							}}
						>
							<ListItemIcon sx={{ paddingLeft: "4px" }}>
								<Book size={30} style={{ color: "#FB9E29" }} />
							</ListItemIcon>
							<Text b className="drawerElementText">
								Pricing
							</Text>
						</ListItemButton>
						<ListItemButton
							onClick={() => {
								trackRecord();
								toggleDrawer();
							}}
						>
							<ListItemIcon sx={{ paddingLeft: "4px" }}>
								<TrendingUpRoundedIcon
									sx={{ fontSize: 30 }}
									style={{ color: "#FB9E29" }}
								/>
							</ListItemIcon>
							<Text b className="drawerElementText">
								Track Record
							</Text>
						</ListItemButton>
						<ListItemButton
							onClick={() => {
								smeCorner();
								toggleDrawer();
							}}
						>
							<ListItemIcon sx={{ paddingLeft: "4px" }}>
								<MoneyRoundedIcon
									sx={{ fontSize: 30 }}
									style={{ color: "#FB9E29" }}
								/>
							</ListItemIcon>
							<Text b className="drawerElementText">
								SME Corner
							</Text>
						</ListItemButton>
						<ListItemButton
							onClick={() => {
								ourStockPicks();
								toggleDrawer();
							}}
						>
							<ListItemIcon sx={{ paddingLeft: "4px" }}>
								<MoneyRoundedIcon
									sx={{ fontSize: 30 }}
									style={{ color: "#FB9E29" }}
								/>
							</ListItemIcon>
							<Text b className="drawerElementText">
								Stocks To Buy
							</Text>
						</ListItemButton>
						<ListItemButton
							onClick={() => {
								handleLogin();
								toggleDrawer();
							}}
						>
							<ListItemIcon>
								<BiLogIn size={30} style={{ color: "#FB9E29" }} />
							</ListItemIcon>
							<Text b className="drawerElementText">
								Login
							</Text>
						</ListItemButton>
					</List>
				</SwipeableDrawer>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						// width: "100%",
						// marginLeft: "-16%",
					}}
				>
					<Navbar.Content
						activeColor="warning"
						hideIn="md"
						variant="underline-rounded"
						// css={{
						// 	"@media only screen and (max-width: 1000px)": {
						// 		display: "none",
						// 	},
						// }}
					>
						<Navbar.Link
							// isActive={
							// 	typeof window !== "undefined" &&
							// 	window.location.pathname === "/"
							// }
							// onClick={() => handleHome()}
							isActive={
								typeof window !== "undefined" && activeLink === "home"
									? true
									: false
							}
							onClick={() => scrolltoHash("home")}
						>
							<Text b size={16} css={{ lineHeight: 5 }}>
								Home
							</Text>
						</Navbar.Link>
						<Navbar.Link
							isActive={
								typeof window !== "undefined" && activeLink === "philosophy"
									? true
									: false
							}
							onClick={() => scrolltoHash("philosophy")}
						>
							<Text b size={16} css={{ lineHeight: 5 }}>
								About Us
							</Text>
						</Navbar.Link>
						{/* <Navbar.Link
							// isActive={
							// 	typeof window !== "undefined" &&
							// 	window.location.pathname === "/about-company"
							// }
							// onClick={handleAboutUs}
							isActive={
								typeof window !== "undefined" && activeLink === "team"
									? true
									: false
							}
							onClick={() => scrolltoHash("team")}
						>
							<Text b size={16} css={{ lineHeight: 5 }}>
								Team
							</Text>
						</Navbar.Link> */}
						{/* <Navbar.Link
							// isActive={
							// 	typeof window !== "undefined" &&
							// 	window.location.pathname === "/about-company"
							// }
							// onClick={handleAboutUs}
							isActive={
								typeof window !== "undefined" && activeLink === "whyUs"
									? true
									: false
							}
							onClick={() => scrolltoHash("whyUs")}
						>
							<Text b size={16} css={{ lineHeight: 5 }}>
								Why Us
							</Text>
						</Navbar.Link> */}
						{/* <Navbar.Link
							isActive={
								typeof window !== "undefined" && activeLink === "howItWorks"
									? true
									: false
							}
							onClick={() => scrolltoHash("howItWorks")}
						>
							<Text b size={16} css={{ lineHeight: 5 }}>
								How it works
							</Text>
						</Navbar.Link> */}
						{/* <Navbar.Link
							// isActive={
							// 	typeof window !== "undefined" &&
							// 	window.location.pathname === "/about-company"
							// }
							// onClick={handleAboutUs}
							isActive={
								typeof window !== "undefined" && activeLink === "testimonials"
									? true
									: false
							}
							onClick={() => scrolltoHash("testimonials")}
						>
							<Text b size={16} css={{ lineHeight: 5 }}>
								Testimonials
							</Text>
						</Navbar.Link> */}
						<Navbar.Link
							// isActive={
							// 	typeof window !== "undefined" &&
							// 	window.location.pathname === "/about-company"
							// }
							// onClick={handleAboutUs}
							isActive={
								typeof window !== "undefined" && activeLink === "pricing"
									? true
									: false
							}
							onClick={() => scrolltoHash("pricing")}
						>
							<Text b size={16} css={{ lineHeight: 5 }}>
								Pricing
							</Text>
						</Navbar.Link>
						{/* <Navbar.Link
							// isActive={
							// 	typeof window !== "undefined" &&
							// 	window.location.pathname === "/about-company"
							// }
							// onClick={handleAboutUs}
							isActive={
								typeof window !== "undefined" && activeLink === "FAQs"
									? true
									: false
							}
							onClick={() => scrolltoHash("FAQs")}
						>
							<Text b size={16} css={{ lineHeight: 5 }}>
								FAQs
							</Text>
						</Navbar.Link> */}
						{/* {console.log(activeLink)} */}
						{/* <Navbar.Link
              // isActive={activeLink === "aboutUs"}
              isActive={
                typeof window !== "undefined" &&
                window.location.pathname === "/about-company"
              }
              onClick={handleAboutUs}
            >
              <Text b size={16} css={{ lineHeight: 5 }}>
                About Us
              </Text>
            </Navbar.Link> */}
						{/* <Navbar.Link
             // isActive={activeLink === "blogs"}
             isActive={
               typeof window !== "undefined" &&
               window.location.pathname === "/blogs-page"
             }
             onClick={handleBlog}
            >
             <Text b size={16} css={{ lineHeight: 5 }}>
               Blogs
             </Text>
            </Navbar.Link> */}
						<Navbar.Link
							// isActive={activeLink === "blogs"}
							// isActive={
							// 	typeof window !== "undefined" &&
							// 	window.location.pathname === "/track-record"
							// }
							onClick={trackRecord}
						>
							<Box
								sx={{
									border: "2px solid #094f48",
									borderRadius: "1000px",
									padding: "0px 8px",
									lineHeight: 2,
									background:
										window.location.pathname === "/track-record"
											? "#094f48"
											: "#fff",
									color:
										window.location.pathname === "/track-record"
											? "#fff"
											: "#000",
								}}
							>
								Track Record
							</Box>
							{/* <Text b size={16} css={{ lineHeight: 5 }}>
								.
							</Text> */}
						</Navbar.Link>
						<Navbar.Link
							// isActive={activeLink === "blogs"}
							// isActive={
							//   typeof window !== "undefined" &&
							//   window.location.pathname === "/sme"
							// }
							onClick={smeCorner}
						>
							<Box
								sx={{
									border: "2px solid #094f48",
									borderRadius: "1000px",
									padding: "0px 8px",
									lineHeight: 2,
									display: "flex",
									gap: "5px",
									alignItems: "center",
									background:
										window.location.pathname === "/sme" ? "#094f48" : "#fff",
									color: window.location.pathname === "/sme" ? "#fff" : "#000",
								}}
							>
								<TrendingUpRoundedIcon
									sx={{ fontSize: 30, color: "#FB9E29" }}
								/>
								{/* <Text b size={16} css={{ lineHeight: 5, paddingLeft: "5px" }}> */}
								SME Corner
								{/* </Text> */}
							</Box>
						</Navbar.Link>
					</Navbar.Content>
				</div>
				<Navbar.Content
					hideIn={"md"}
					css={{
						"@xs": {
							w: "12%",
							jc: "flex-end",
						},
						// position: "fixed",
						// right: 20,
					}}
				>
					{router.pathname !== "/login" && (
						<Navbar.Item hideIn={"sm"}>
							<Button
								size={"lg"}
								auto
								color={"warning"}
								// onPress={handleLoginClick}
								onPress={handleLogin}
								css={{
									backgroundColor: "#ff9f24",
									borderRadius: "10000px",
									// border: "1px solid white",
									boxShadow: "0px 0px 0px 2px rgba(255,255,255,0.15)",
								}}
							>
								<span style={{ fontSize: 20 }}>Login</span>
							</Button>
						</Navbar.Item>
					)}
					<Modal
						width="450px"
						blur
						open={showModal}
						onClose={handleCloseModal}
						css={{
							// marginLeft: "2.5vw",
							marginLeft: "0",
							"@media only screen and (max-width: 764px)": {
								width: "100vw",
								alignSelf: "center",
								// marginLeft: "2.5vw",
							},
						}}
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
							<img src="kmk-k.png" style={{ width: "50px" }} />
							<IconButton
								sx={{
									width: "40px",
									"&:hover": { background: "#fff" },
									// alignSelf: "end",
									right: "0px",
									paddingTop: "20px",
									paddingRight: "30px",
								}}
								onClick={() => handleCloseModal()}
							>
								<CloseIcon sx={{ color: "#e81123" }} />
							</IconButton>
						</Box>

						<Modal.Body>
							<Login />
						</Modal.Body>
					</Modal>
					<Navbar.Item>
						<Button
							auto
							size={"lg"}
							color={"success"}
							onPress={ourStockPicks}
							css={{
								backgroundImage: "linear-gradient(to top , #106052, #0f734d)",
								borderRadius: "10000px",
								fontSize: "large",
								// border: "1px solid white",
								boxShadow: "0px 0px 0px 2px rgba(255,255,255,0.15)",
							}}
						>
							<span style={{ fontSize: 20 }}>Stocks to buy</span>
						</Button>
					</Navbar.Item>
				</Navbar.Content>
				{/* <Navbar.Collapse css={{ position: "fixed" }}>
					<Navbar.CollapseItem onClick={handleHome}>Home</Navbar.CollapseItem>
					<Navbar.CollapseItem onClick={handleAboutUs}>
						About Us
					</Navbar.CollapseItem>
					<Navbar.CollapseItem onClick={handleBlog}>Blogs</Navbar.CollapseItem>
					<Navbar.CollapseItem onClick={ourStockPicks}>
						Stock Picks
					</Navbar.CollapseItem>
					<Navbar.CollapseItem onClick={trackRecord}>
						Track Record
					</Navbar.CollapseItem>
					<Navbar.CollapseItem onClick={handleLoginClick}>
						Login
					</Navbar.CollapseItem>
				</Navbar.Collapse> */}
			</Navbar>
			{/* </div> */}
		</>
	);
}
