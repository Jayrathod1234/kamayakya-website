import React from "react";
import {VscWorkspaceTrusted} from "react-icons/vsc";
import {GiArchiveResearch} from "react-icons/gi";
import {BsStars} from "react-icons/bs";
import {Text} from "@nextui-org/react";

const Process2 = () => {
    return (
        <section
            style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "#fff",
                paddingTop: 50,
                paddingBottom: 100,
                paddingLeft: 50,
                paddingRight: 50,
            }}
        >
            <div
                style={{display: "flex", flexDirection: "row", width: "75%", gap: 20}}
            >
                <div
                    style={{display: "flex", flexDirection: "column", width: "100%"}}
                >
                    <Text b size={45}>
                        Why Trust Us?
                    </Text>
                    <Text b size={20} color="#b9c1ca">
                        We only recommend stocks that we personally are willing to invest
                        in.
                    </Text>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <VscWorkspaceTrusted size={50} style={{marginBottom: 18}}/>
                    <Text b size={28} css={{lineHeight: 1.2}}>
                        We are trusted by SEBI
                    </Text>
                    <Text b size={20} color="#b9c1ca" css={{lineHeight: 1.2}}>
                        Our certification by the Securities and Exchange Board of India
                        (SEBI) as one of the 890 trusted research analyst firms demonstrates
                        our commitment to following compliances and our competence in the
                        stock market industry.
                    </Text>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <GiArchiveResearch size={50} style={{marginBottom: 18}}/>
                    <Text b size={28} css={{lineHeight: 1.2}}>
                        We Research
                    </Text>
                    <Text b size={28} css={{lineHeight: 1.2}}>
                        A Lot
                    </Text>
                    <Text b size={20} color="#b9c1ca" css={{lineHeight: 1.2}}>
                        Our structured research approach allows us to accurately identify
                        potential multibaggers. We analyze the company's finances,
                        communicate with management, and conduct on-site observations for an
                        unbiased and comprehensive report.
                    </Text>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <BsStars size={50} style={{marginBottom: 18}}/>
                    <Text b size={28} css={{lineHeight: 1.2}}>
                        Our team is packed with stars
                    </Text>
                    <Text b size={20} color="#b9c1ca" css={{lineHeight: 1.2}}>
                        We've handpicked the top 1% of finance, engineering, and economics
                        talent with 25 years of combined experience to manage your
                        investments.
                    </Text>
                </div>
            </div>
        </section>
    );
};

export default Process2;
