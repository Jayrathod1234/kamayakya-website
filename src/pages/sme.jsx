import { useContext } from "react";
import NavBar2 from "../components/Navbar2";
import NavBar from "../components/Navbar";
import StockCard from "../components/StockCard";
import FaqsNew from "./screens/FaqsNew";
import Footer from "./screens/Footer";
import AuthContext from "../components/AuthContext";
import StockCardSME from "../components/StockCardSME";
import PageVisibility from "../components/PageVisibility";

const SME = () => {
	const { isLoggedIn } = useContext(AuthContext);

	return (
		<PageVisibility>
			{(isPageVisible) => (
				<>
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
