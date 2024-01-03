import React, { useContext } from "react";
import AuthContext from "@/components/AuthContext";
import NavBar2 from "@/components/Navbar2";
import NavBar from "@/components/Navbar";
// import { Text } from "@nextui-org/react";
import TrackPage from "../components/TrackPage";
import PageVisibility from "@/components/PageVisibility";

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
						{isLoggedIn ? <NavBar2 /> : <NavBar />}

						<TrackPage />
					</section>
				</>
			)}
		</PageVisibility>
	);
};

export default TrackRecord;
