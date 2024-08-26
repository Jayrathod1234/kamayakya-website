import { useContext } from "react";
// import NavBar2 from "../components/Navbar2";
// import NavBar from "../components/Navbar";
import StockCard from "../components/StockCard";
import FaqsNew from "./screens/FaqsNew";
// import Footer from "./screens/Footer";
import AuthContext from "../components/AuthContext";
import PageVisibility from "../components/PageVisibility";
import { Navbar } from "../components.v2/navbar";
import { Footer } from "../components.v2/footer";

const StockPicks = () => {
	const { isLoggedIn } = useContext(AuthContext);

	return (
		<PageVisibility>
			{() => (
				<>
					{/* {isLoggedIn ? <NavBar2 /> : <NavBar />} */}
					<Navbar className=" bg-white"/>
					<div
						style={{
							background: "#fff",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						<StockCard />
						<FaqsNew />
						{/* <Footer /> */}
						<Footer/>
					</div>
				</>
			)}
		</PageVisibility>
	);
};

export default StockPicks;
