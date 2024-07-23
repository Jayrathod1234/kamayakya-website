import {Box, Button} from "@mui/material";
import {Card, Text} from "@nextui-org/react";
import React from "react";
import {TbAppsFilled, TbCrosshair} from "react-icons/tb";
import {GiMagnifyingGlass} from "react-icons/gi";
import {RiShieldKeyholeFill} from "react-icons/ri";

const AboutUs = () => (
    <section
        id="aboutUs"
        style={{
            backgroundColor: "#f7f6f9",
            paddingBottom: 50,
            // paddingLeft: 50,
            // paddingRight: 50,
        }}
    >
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
                // gap: 5,
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 50,
                marginLeft: 50,
                paddingBottom: 60,
            }}
        >
            <Box sx={{marginRight: "10px"}}>
                <div style={{maxWidth: "700px"}}>
                    <Text b size={50} color="#25262c">
                        KamayaKya aims to make Picking a stock to invest easier
                    </Text>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 50,
                        marginTop: 25,
                    }}
                >
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Text b size={56} color="#76c061">
                            2.1M +
                        </Text>
                        <Text size={30} color="#888888">
                            Downloaded
                        </Text>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Text b size={56} color="#76c061">
                            4.6
                        </Text>
                        <Text size={30} color="#888888">
                            Ratings
                        </Text>
                    </div>
                </div>
            </Box>
            <Box
                sx={{
                    backgroundColor: "#f7f6f9",
                    marginTop: 10,
                    marginRight: 10,
                    // marginLeft: 10,
                    marginBottom: 10,
                    maxWidth: "700px",
                }}
            >
                <div
                    style={{display: "flex", flexDirection: "column", flexWrap: "wrap"}}
                >
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <TbCrosshair size={50}/>
                        <Text b size={32} css={{color: "#25262c", marginLeft: 10}}>
                            Clear Targets
                        </Text>
                    </Box>
                    <Text b size={22} color="#b1b0b2" css={{marginTop: 10}}>
                        Our methodology does not include doing technical analysis of stocks,
                        rather we do research that is deep, thorough and entirely
                        fundamentals based.
                    </Text>
                </div>
                <Card.Divider
                    style={{color: "#e9e7ef", marginTop: 20, marginBottom: 20}}
                />
                <div
                    style={{display: "flex", flexDirection: "column", flexWrap: "wrap"}}
                >
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                        <GiMagnifyingGlass size={40}/>
                        <Text b size={32} css={{color: "#25262c", marginLeft: 20}}>
                            Certified
                        </Text>
                    </Box>
                    <Text b size={22} color="#b1b0b2" css={{marginTop: 10}}>
                        We are one of the 890 research analyst firms certified by Securities
                        and Exchange Board of India.
                    </Text>
                </div>
            </Box>
        </div>

        <div
            style={{
                borderTopLeftRadius: "40px",
                borderTopRightRadius: "40px",
                height: "100%",
                marginTop: 5,
                marginLeft: 30,
                marginRight: 30,
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#25262c",
            }}
        >
            <div
                style={{
                    backgroundColor: "#f7f6f9",
                    borderRadius: "10px",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                    padding: 10,
                    paddingLeft: 50,
                    paddingRight: 50,
                }}
            >
                <Text b color="#76c061" size={24}>
                    Monitor Easily
                </Text>
            </div>
        </div>
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                // gap: 30,
                flexDirection: 'row',
                justifyContent: "space-between",
                paddingTop: 30,
                paddingBottom: 50,
                paddingLeft: 30,
                paddingRight: 30,
                marginLeft: 30,
                marginRight: 30,
                backgroundColor: "#25262c",
            }}
        >
            <div
                style={{
                    maxWidth: "800px",
                    marginLeft: 50,
                    marginTop: 30,
                    display: "flex",
                    // flexWrap: "wrap",
                }}
            >
                <div
                    style={{display: "flex", flexDirection: "column", marginBottom: 20}}
                >
                    <Text b color="#fafafa" size={56}>
                        We promise 100% transparency
                    </Text>
                    <Text color="#888888" size={28}>
                        With KamayaKya you get all the information you need to establish
                        context, enabling you to make better investments.
                    </Text>
                    <div
                        style={{display: "flex", justifyContent: "start", marginTop: 50}}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                borderRadius: "20px",
                                backgroundColor: "#8cd252",
                                marginBottom: 2,
                                padding: 2,
                                paddingLeft: 5,
                                paddingRight: 5,
                                fontSize: 24,
                                "&:hover": {
                                    backgroundColor: "#ff9f24",
                                },
                            }}
                        >
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{position: "relative"}}>
                <video
                    muted
                    loop
                    autoPlay
                    src={"/transparent.mp4"}
                    style={{
                        maxHeight: "450px",
                        maxWidth: "100%",
                        borderRadius: "40px",
                        marginRight: 70,
                    }}
                />
            </div>
        </div>
        <div
            style={{display: "flex", justifyContent: "space-between", gap: "25px",}}
        >
            <Box
                sx={{
                    width: "50%",
                    marginTop: 5,
                    marginLeft: "30px",
                    paddingTop: 3,
                    paddingBottom: 6,
                    paddingLeft: 10,
                    paddingRight: 15,
                    borderBottomLeftRadius: "40px",
                    backgroundColor: "#ebeaf1",
                }}
            >
                <Box
                    sx={{
                        padding: 2,
                        margin: 2,
                        width: "90px",
                        paddingBottom: 1,
                        backgroundColor: "#25262c",
                        borderRadius: "20px",
                    }}
                >
                    <RiShieldKeyholeFill size={60} color="#7c7d80"/>
                </Box>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Text b color="#25262c" size={32} css={{marginLeft: 15}}>
                        We are trusted by SEBI ❤️
                    </Text>
                    <Text color="#a4a4a6" size={24} css={{marginLeft: 15}}>
                        We are one of the 890 research analyst firms certified by Securities
                        and Exchange Board of India.
                    </Text>
                </div>
            </Box>
            <Box
                sx={{
                    width: "50%",
                    marginTop: 5,
                    marginRight: "30px",
                    paddingTop: 3,
                    paddingRight: 10,
                    paddingLeft: 10,
                    paddingBottom: 5,
                    borderBottomRightRadius: "40px",
                    backgroundColor: "#ebeaf1",
                }}
            >
                <Box
                    sx={{
                        padding: 2,
                        margin: 2,
                        width: "90px",
                        paddingBottom: 1,
                        backgroundColor: "#25262c",
                        borderRadius: "20px",
                    }}
                >
                    <TbAppsFilled size={60} color="#7c7d80"/>
                </Box>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Text b color="#25262c" size={32} css={{marginLeft: 15}}>
                        Subscribe to our best picks
                    </Text>
                    <Text color="#a4a4a6" size={24} css={{marginLeft: 15}}>
                        We Research. A Lot. Our structured approach to research enables us
                        to pick potential multibaggers with greater accuracy.
                    </Text>
                </div>
            </Box>
        </div>
    </section>
);

export default AboutUs;
