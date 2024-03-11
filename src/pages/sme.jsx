import { useContext } from "react";
import NavBar2 from "../components/Navbar2";
import NavBar from "../components/Navbar";
import StockCard from "../components/StockCard";
import FaqsNew from "./screens/FaqsNew";
import Footer from "./screens/Footer";
import AuthContext from "../components/AuthContext";
import StockCardSME from "../components/StockCardSME";
import PageVisibility from "../components/PageVisibility";
import Head from "next/head";

const SME = () => {
	const { isLoggedIn } = useContext(AuthContext);

	return (
		<PageVisibility>
			{(isPageVisible) => (
				<>
					<Head>
						<title>KamayaKya | SME Stocks Recommendations</title>
						<meta
							name="description"
							content="Checkout KamayaKya's SME stocks recommendations and get maximum benefits and subscribe now to fuel your financial growth."
						/>
					</Head>
					{isLoggedIn ? <NavBar2 /> : <NavBar />}
					<div
						style={{
							background: "#fff",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						<StockCardSME />
						{/* <StockCardBlur /> */}
						<FaqsNew />
						<Footer />
					</div>
				</>
			)}
		</PageVisibility>
	);
};

export default SME;
