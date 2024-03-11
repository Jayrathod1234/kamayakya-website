import React, { useContext } from "react";
import AuthContext from "@/components/AuthContext";
import NavBar2 from "@/components/Navbar2";
import NavBar from "@/components/Navbar";
// import { Text } from "@nextui-org/react";
import TrackPage from "../components/TrackPage";
import PageVisibility from "@/components/PageVisibility";
import Head from "next/head";

const TrackRecord = () => {
	const { isLoggedIn } = useContext(AuthContext);
	return (
		<PageVisibility>
			{(isPageVisible: any) => (
				<>
					<section
						style={{
							background: "#fff",
						}}
					>
						<Head>
							<title>
							KamayaKya | Track Record in Stock Market Advisory
							</title>
							<meta
								name="description"
								content="Explore Kamayakya's impressive track record, with a proven history of strategic insight and successful results, trust us to guide your investments to sustainable financial growth and prosperity."
							/>
						</Head>
						{isLoggedIn ? <NavBar2 /> : <NavBar />}

						<TrackPage />
					</section>
				</>
			)}
		</PageVisibility>
	);
};

export default TrackRecord;
