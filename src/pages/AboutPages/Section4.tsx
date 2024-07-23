import {Box} from "@mui/material";
import {Card, Text} from "@nextui-org/react";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import React from "react";

const Section4 = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                padding: "25px",
                paddingBottom: "140px",
                backgroundColor: "#fafafa",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: "100%",
                    maxWidth: "80rem",
                    justifyContent: "center",
                    gap: "25px",
                    "@media only screen and (max-width: 764px)": {
                        gap: "2%",
                    },
                }}
            >
                <Card
                    isHoverable
                    css={{
                        // background: "#e1ecfb",
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "0px",
                        width: "31%",
                        alignItems: "center",
                        padding: "20px",
                        paddingBottom: "40px",
                        borderRadius: "30px",
                        filter: 'none',
                        // boxShadow: 'none',
                        "@media only screen and (max-width: 764px)": {
                            width: "100%",
                            marginBottom: "20px",
                        },
                    }}
                >
                    <video
                        muted
                        autoPlay
                        loop
                        src="/kmk-sebi.mp4"
                        width="100%"
                        style={{width: "100%", borderRadius: "20px"}}
                    />
                    <Text
                        b
                        size={25}
                        css={{
                            width: "95%",
                            textAlign: "center",
                            marginTop: "30px",
                            marginBottom: "0px",
                            "@media only screen and (max-width: 764px)": {
                                // lineHeight: 1.5,
                                fontSize: 22,
                            },
                        }}
                    >
                        We are SEBI Registered ❤️
                    </Text>
                    <Text
                        b
                        size={15}
                        css={{
                            width: "95%",
                            textAlign: "center",
                            lineHeight: 1.2,
                            "@media only screen and (max-width: 764px)": {
                                lineHeight: 1.2,
                                fontSize: 16,
                            },
                        }}
                    >
                        Counted among the select group of certified research analyst firms
                        by the Securities and Exchange Board of India, we proudly offer our
                        expertise and services.
                    </Text>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            alignSelf: "start",
                            marginTop: "30px",
                        }}
                    >
                        <CheckBoxRoundedIcon
                            sx={{color: "#00d784", marginLeft: "30px"}}
                        />
                        <Text
                            b
                            size={17}
                            css={{
                                textAlign: "left",
                                lineHeight: 1.2,
                                marginLeft: "10px",
                                "@media only screen and (max-width: 764px)": {
                                    lineHeight: 1.2,
                                    fontSize: 16,
                                },
                            }}
                        >
                            We follow compliances
                        </Text>
                    </Box>
                    {/* <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "start",
              marginTop: "30px",
              marginRight: "30px",
            }}
          >
            <CheckBoxRoundedIcon
              sx={{ color: "#00d784", marginLeft: "30px" }}
            />
            <Text
              b
              size={17}
              css={{
                textAlign: "left",
                lineHeight: 1.2,
                marginLeft: "10px",
                "@media only screen and (max-width: 764px)": {
                  lineHeight: 1.2,
                  fontSize: 16,
                },
              }}
            >
              Our competence is trusted by the governing body of the stock
              markets
              We are registered with the governing body of the Indian stock market - SEBI
            </Text>
          </Box> */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            alignSelf: "start",
                            marginTop: "30px",
                            marginRight: "30px",
                        }}
                    >
                        <CheckBoxRoundedIcon
                            sx={{color: "#00d784", marginLeft: "30px"}}
                        />
                        <Text
                            b
                            size={17}
                            css={{
                                textAlign: "left",
                                lineHeight: 1.2,
                                marginLeft: "10px",
                                "@media only screen and (max-width: 764px)": {
                                    lineHeight: 1.2,
                                    fontSize: 16,
                                },
                            }}
                        >
                            We are not like your rishtedar who keeps giving random financial
                            advice
                        </Text>
                    </Box>
                </Card>
                <Card
                    isHoverable
                    css={{
                        // background: "#ffe5c5",
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "0px",
                        width: "31%",
                        alignItems: "center",
                        padding: "20px",
                        paddingBottom: "40px",
                        borderRadius: "30px",
                        // paddingBottom: "40px",
                        filter: 'none',
                        // boxShadow: 'none',
                        "@media only screen and (max-width: 764px)": {
                            width: "100%",
                            marginBottom: "20px",
                        },
                    }}
                >
                    <video
                        muted
                        autoPlay
                        loop
                        src="/kmk-research.mp4"
                        width="100%"
                        style={{width: "100%", borderRadius: "20px"}}
                    />
                    <Text
                        b
                        size={25}
                        css={{
                            width: "95%",
                            textAlign: "center",
                            marginTop: "30px",
                            marginBottom: "0px",
                            "@media only screen and (max-width: 764px)": {
                                // lineHeight: 1.5,
                                fontSize: 22,
                            },
                        }}
                    >
                        We Research. A Lot.
                    </Text>
                    <Text
                        b
                        size={15}
                        css={{
                            width: "95%",
                            textAlign: "center",
                            lineHeight: 1.2,
                            "@media only screen and (max-width: 764px)": {
                                lineHeight: 1.2,
                                fontSize: 16,
                            },
                        }}
                    >
                        Our structured approach to research enables us to pick potential
                        multibaggers with greater accuracy.
                    </Text>
                    <Text
                        b
                        size={22}
                        css={{
                            width: "90%",
                            textAlign: "center",
                            lineHeight: 1.2,
                            marginTop: "30px",
                            "@media only screen and (max-width: 764px)": {
                                lineHeight: 1.2,
                                fontSize: 16,
                            },
                        }}
                    >
                        How do we pick the best stocks?
                    </Text>
                    <Text
                        b
                        size={17}
                        css={{
                            textAlign: "center",
                            lineHeight: 1.3,
                            marginTop: "5px",
                            "@media only screen and (max-width: 764px)": {
                                lineHeight: 1.2,
                                fontSize: 16,
                            },
                        }}
                    >
                        We study their finances, talk to their management and go on the
                        ground to see their operations in real time to produce a
                        comprehensive and unbiased report.
                    </Text>
                </Card>
                <Card
                    isHoverable
                    css={{
                        // background: "#bfe8c5",
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "0px",
                        width: "31%",
                        alignItems: "center",
                        borderRadius: "30px",
                        // paddingBottom: "40px",
                        padding: "20px",
                        paddingBottom: "40px",
                        filter: 'none',
                        // boxShadow: 'none',
                        "@media only screen and (max-width: 764px)": {
                            width: "100%",
                            marginBottom: "20px",
                        },
                    }}
                >
                    <video
                        muted
                        autoPlay
                        loop
                        src="/kmk-starsTeam.mp4"
                        width="100%"
                        style={{width: "100%", borderRadius: "20px"}}
                    />
                    <Text
                        b
                        size={25}
                        css={{
                            width: "95%",
                            textAlign: "center",
                            marginTop: "30px",
                            marginBottom: "0px",
                            "@media only screen and (max-width: 764px)": {
                                // lineHeight: 1.5,
                                fontSize: 22,
                            },
                        }}
                    >
                        Our team is packed with ⭐s
                    </Text>
                    <Text
                        b
                        size={15}
                        css={{
                            width: "95%",
                            textAlign: "center",
                            lineHeight: 1.2,
                            "@media only screen and (max-width: 764px)": {
                                lineHeight: 1.2,
                                fontSize: 16,
                            },
                        }}
                    >
                        Investment is a serious decision and you want only the best people
                        behind the wheel taking shots for you.
                    </Text>
                    <Text
                        b
                        size={22}
                        css={{
                            width: "90%",
                            textAlign: "center",
                            lineHeight: 1.2,
                            marginTop: "30px",
                            "@media only screen and (max-width: 764px)": {
                                lineHeight: 1.2,
                                fontSize: 16,
                            },
                        }}
                    >
                        We have curated the top 1% talent in finance, engineering, and
                        business with 25 years of combined experience to ensure we deliver
                        the best for you.
                    </Text>
                </Card>
            </Box>
        </Box>
    );
};

export default Section4;
