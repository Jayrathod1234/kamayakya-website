import React, {useContext} from "react";
import AuthContext from "@/components/AuthContext";
import { Navbar } from "@/components.v2/navbar";
import TrackPage from "../components/TrackPage";
import PageVisibility from "@/components/PageVisibility";
import Head from "next/head";

const TrackRecord = () => {
    const {isLoggedIn} = useContext(AuthContext);
    return (
        <PageVisibility>
            {() => (
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
                        <Navbar className=" bg-white"/>
                        <TrackPage/>
                    </section>
                </>
            )}
        </PageVisibility>
    );
};

export default TrackRecord;
