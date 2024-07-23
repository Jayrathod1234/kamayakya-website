import {Button, Card, Divider, Dropdown, Modal, Progress, Text,} from "@nextui-org/react";
import React, {useContext, useEffect, useState} from "react";
import Marquee from "react-fast-marquee";
import {Box} from "@mui/material";
import {useRouter} from "next/router";
import {TRACK_RECORD_FOR_ALL, TRACK_RECORD_FOR_USER} from "@/pages/api/URLs";
import AuthContext from "@/components/AuthContext";
import {Viewer, Worker} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const WhyUs = () => {
    const router = useRouter();
    const {isLoggedIn} = useContext(AuthContext);
    const [record, setRecord] = useState([]);
    const [showTargets, setShowTargets] = useState(false);
    const [showReports, setShowReports] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [selectedReportUrl, setSelectedReportUrl] = useState("");
    const [selectedPDF, setSelectedPDF] = useState(new Set([""]));

    const PdfValue = React.useMemo(
        () => Array.from(selectedPDF)[0],
        [selectedPDF]
    );

    const handleCloseTargets = () => {
        setShowTargets(false);
    };
    const handleOpenTargets = (index) => {
        setSelectedCardIndex(index);
        setShowTargets(true);
    };

    const handleCloseReports = () => {
        setShowReports(false);
    };

    const handleOpenReports = (index) => {
        setSelectedCardIndex(index);
        setShowReports(true);
        if (record[index].stock_reports && record[index].stock_reports.length > 0) {
            const firstReportUrl = record[index].stock_reports[0].document;
            setSelectedReportUrl(firstReportUrl);
        }
    };

    const PdfURL =
        selectedPDF === "" || selectedPDF === undefined
            ? selectedReportUrl
            : PdfValue;

    const handleAskPassword = (e) => {
        e.verifyPassword("$420%69#kamayakya#69%420$");
    };

    const handleTrackRecord = async () => {
        try {
            const refreshToken = localStorage.getItem("refresh");

            const url = isLoggedIn ? TRACK_RECORD_FOR_USER : TRACK_RECORD_FOR_ALL;

            const headers = {
                "Content-Type": "application/json",
            };

            if (isLoggedIn) {
                headers.Authorization = `token ${refreshToken}`;
            }

            const response = await fetch(url, {
                method: "GET",
                headers,
            });

            if (response.ok) {
                const data = await response.json();
                const filteredData = data.filter((record) =>
                    ["HOLD", "SELL"].includes(record.action)
                );

                setRecord(filteredData);
                // console.log(data);
            } else {
                // Handle API call error
                console.error("Error Getting Track Records | Home Page");
            }
        } catch (error) {
            // Handle any other error
            console.error(error);
            // console.log("no call");
        }
    };

    useEffect(() => {
        handleTrackRecord();
    }, [isLoggedIn]);

    const trackRecord = () => {
        router.push("/track-record");
    };

    const outerData = [
        {value: 60, name: "Hits"},
        {value: 10, name: "Miss"},
    ];

    const innerData = [
        {value: 10, name: "Miss"},
        {value: 60, name: ""},
    ];

    const options = {
        //   title: {
        // 	text: "Call History",
        // 	x: "center",
        //   },
        //   tooltip: {
        // 	trigger: "item",
        //   },
        //   legend: {
        // 	orient: "vertical",
        // 	left: "left",
        // 	data: ["Outer", "Inner"],
        //   },
        series: [
            {
                name: "Hits",
                type: "pie",
                radius: ["50%", "65%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderWidth: 0, // Remove border
                    borderRadius: 20,
                    color: "#125a54",
                    // background:
                },
                label: {
                    show: false,
                    position: "center",
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: "20",
                        fontWeight: "bold",
                    },
                },
                labelLine: {
                    show: false,
                },
                data: outerData.map((item) => ({
                    ...item,
                    itemStyle: {
                        color: item.name === "Miss" ? "rgba(255, 255, 255, 0.5)" : null,
                    },
                    label: {
                        show: true,
                        position: "center",
                        formatter: item.name === "Hits" ? "{d}%" : "",
                        textStyle: {
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#125a54", // Set the color of the percentage text
                        },
                    },
                })),
            },
            {
                name: "Miss",
                type: "pie",
                radius: ["35%", "47%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderWidth: 0, // Remove border
                    borderRadius: 20,
                    color: "#ffa12e",
                },
                label: {
                    show: false,
                    position: "center",
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: "14",
                        fontWeight: "bold",
                    },
                },
                labelLine: {
                    show: false,
                },
                data: innerData.map((item) => ({
                    ...item,
                    itemStyle: {
                        color: item.name === "" ? "rgba(255,255,255, 0.5)" : null,
                    },
                })),
            },
        ],
    };

    return (
        <main
            id="whyUs"
            style={{
                width: "100vw",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                paddingTop: "10vh",
            }}
        >
            <div className="trackRecordMobile">
                <Text
                    b
                    size={70}
                    css={{
                        lineHeight: 1,
                        marginBottom: "0px",
                        width: "100vw",
                        textAlign: "center",
                        "@media only screen and (max-width: 764px)": {
                            fontSize: 50,
                            marginLeft: "10px",
                            marginRight: "10px",
                            textAlign: "left",
                        },
                    }}
                >
                    Track Record
                </Text>
                <Text
                    b
                    size={25}
                    css={{
                        textAlign: "center",
                        marginBottom: "70px",
                        maxWidth: "80rem",
                        alignSelf: "center",
                        "@media only screen and (max-width: 764px)": {
                            marginTop: "10px",
                            marginBottom: "50px",
                            marginLeft: "10px",
                            marginRight: "10px",
                            textAlign: "left",
                            fontSize: 20,
                            lineHeight: 1.1,
                        },
                    }}
                >
                    Our methodology does not include doing technical analysis of stocks,
                    rather we do research that is deep, thorough and entirely fundamentals
                    based
                </Text>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "0px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            alignContent: "center",
                            width: "100vw",
                            gap: "20px",
                        }}
                    >
                        {record.slice(0, 3).map((item, index) => (
                            <Card
                                key={index}
                                isHoverable
                                css={{
                                    width: "450px",
                                    // height: "330px",
                                    // padding: "40px",
                                    paddingTop: "30px",
                                    paddingBottom: "30px",
                                    backgroundImage:
                                        "linear-gradient(to top , #0F734D, #0F734D, #105B54)",
                                    borderRadius: "30px",
                                    borderBottomRightRadius: "5px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    "@media only screen and (max-width: 764px)": {
                                        width: "100%",
                                        // height: "350px",
                                        paddingTop: "30px",
                                        paddingBottom: "30px",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        padding: "5px",
                                        paddingTop: "0px",
                                        paddingLeft: "15px",
                                        display: "flex",
                                        flexDirection: "column",
                                        // alignItems: "center",
                                        // background: 'rgba(255, 255, 255, 0.15) url("LineChartGreen.png")',
                                        backgroundSize: "cover",
                                        height: "auto",
                                        width: "410px",
                                        "@media only screen and (max-width: 764px)": {
                                            width: "100%",
                                            paddingLeft: "20px",
                                            paddingRight: "20px",
                                        },
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            flexDirection: "row",
                                            // paddingTop: "5%",
                                            paddingBottom: "5px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Text
                                                b
                                                size={15}
                                                color="#fff"
                                                css={{
                                                    lineHeight: 1,
                                                    opacity: 0.7,
                                                    "@media only screen and (max-width: 764px)": {
                                                        fontSize: "14px",
                                                    },
                                                }}
                                            >
                                                STATUS: {item.status.toUpperCase()}
                                            </Text>
                                            <Text
                                                b
                                                size={22}
                                                color="#fff"
                                                css={{
                                                    // width: "80%",
                                                    lineHeight: 1.5,
                                                    maxLines: 1,
                                                    "@media only screen and (max-width: 764px)": {
                                                        paddingTop: "5px",
                                                        fontSize: "22px",
                                                        lineHeight: 1.1,
                                                        maxLines: 1,
                                                    },
                                                }}
                                            >
                                                {item.stock_name.length > 28 ? (
                                                    <Marquee delay={5} speed={30}>
                            <span style={{paddingRight: "40px"}}>
                              {item.stock_name}
                            </span>
                                                    </Marquee>
                                                ) : (
                                                    <>{item.stock_name}</>
                                                )}
                                            </Text>
                                            <Text
                                                b
                                                size={16.5}
                                                color="#fff"
                                                css={{
                                                    lineHeight: 1,
                                                    opacity: 0.7,
                                                    "@media only screen and (max-width: 764px)": {
                                                        paddingTop: "5px",
                                                        fontSize: "15px",
                                                        lineHeight: 1.1,
                                                    },
                                                }}
                                            >
                                                TARGET {item.tag1.toUpperCase()} |{" "}
                                                {item.tag2 ? item.tag2.toUpperCase() : ""}
                                            </Text>
                                        </div>
                                        <img
                                            src={
                                                item.action === "HOLD"
                                                    ? "HoldBubbleYellow.png"
                                                    : item.action === "SELL"
                                                        ? "SellBubbleRed.png"
                                                        : // : item.action === "BUY"
                                                          // ? "BuyBubbleBlue.png"
                                                        "HoldBubbleYellow.png"
                                            }
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                                alignSelf: "start",
                                                // zIndex: 2
                                            }}
                                        />
                                        <img
                                            src="kmk-LionFace.png"
                                            // height={'80px'}
                                            width={"60px"}
                                            style={{
                                                position: "absolute",
                                                right: "20px",
                                                top: "75px",
                                            }}
                                        />
                                    </div>
                                    <Divider
                                        css={{
                                            height: "3px",
                                            width: "70%",
                                            background: "#fff",
                                            borderRadius: "20px",
                                            opacity: 0.5,
                                            alignSelf: "start",
                                            marginTop: "10px",
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: "95%",
                                            display: "flex",
                                            flexDirection: "row",
                                            marginTop: "15px",
                                            gap: "20px",
                                        }}
                                    >
                                        <Box sx={{display: "flex", flexDirection: "column"}}>
                                            <Text
                                                b
                                                size={16}
                                                color="#fff"
                                                css={{
                                                    opacity: 1,
                                                    lineHeight: 1,
                                                    "@media only screen and (max-width: 764px)": {
                                                        paddingTop: "0px",
                                                        fontSize: "14.5px",
                                                    },
                                                }}
                                            >
                                                Entry Price
                                            </Text>
                                            <Text
                                                b
                                                size={22}
                                                color="#fff"
                                                css={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    "@media only screen and (max-width: 764px)": {
                                                        paddingTop: "0px",
                                                        fontSize: "20px",
                                                    },
                                                }}
                                            >
                                                <span style={{fontSize: 16, opacity: 0.75}}>₹</span>
                                                {item.entry_price}
                                            </Text>
                                            <Text
                                                b
                                                size={16}
                                                color="#fff"
                                                css={{
                                                    opacity: 0.7,
                                                    lineHeight: 1,
                                                    "@media only screen and (max-width: 764px)": {
                                                        paddingTop: "0px",
                                                        fontSize: "13.5px",
                                                    },
                                                }}
                                            >
                                                {item.start_date
                                                    ? `${new Date(item.start_date).getDate()} ${new Date(
                                                        item.start_date
                                                    ).toLocaleString("default", {
                                                        month: "short",
                                                    })} ${new Date(item.start_date).getFullYear()}`
                                                    : "03 Nov 2022"}
                                            </Text>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Text
                                                b
                                                size={16}
                                                color="#fff"
                                                css={{
                                                    opacity: 1,
                                                    lineHeight: 1,
                                                    "@media only screen and (max-width: 764px)": {
                                                        paddingTop: "0px",
                                                        fontSize: "14.5px",
                                                    },
                                                }}
                                            >
                                                CMP
                                            </Text>
                                            <Text
                                                b
                                                size={22}
                                                color="#fff"
                                                css={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    "@media only screen and (max-width: 764px)": {
                                                        paddingTop: "0px",
                                                        fontSize: "20px",
                                                    },
                                                }}
                                            >
                                                <span style={{fontSize: 16, opacity: 0.75}}>₹</span>
                                                {item.live_price}
                                            </Text>
                                            <Text
                                                b
                                                size={16}
                                                color="#fff"
                                                css={{
                                                    opacity: 0.7,
                                                    lineHeight: 1,
                                                    "@media only screen and (max-width: 764px)": {
                                                        paddingTop: "0px",
                                                        fontSize: "13.5px",
                                                    },
                                                }}
                                            >
                                                {`${new Date().getDate()} ${new Date().toLocaleString(
                                                    "default",
                                                    {
                                                        month: "short",
                                                    }
                                                )} ${new Date().getFullYear()}`}
                                            </Text>
                                        </Box>
                                    </div>
                                    <Divider
                                        css={{
                                            height: "3px",
                                            width: "40%",
                                            background: "#fff",
                                            borderRadius: "20px",
                                            opacity: 0.5,
                                            alignSelf: "start",
                                            marginTop: "15px",
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            width: "95%",
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginTop: "15px",
                                            gap: "20px",
                                            // justifyContent: 'space-evenly'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignSelf: "flex-start",
                                                width: "120px",
                                            }}
                                        >
                                            <Text
                                                b
                                                size={16}
                                                color="#fff"
                                                css={{
                                                    opacity: 1,
                                                    lineHeight: 1,
                                                    "@media only screen and (max-width: 764px)": {
                                                        paddingTop: "0px",
                                                        fontSize: "14.5px",
                                                    },
                                                }}
                                            >
                                                Returns
                                            </Text>
                                            <Text
                                                b
                                                size={22}
                                                color="#fff"
                                                css={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    "@media only screen and (max-width: 764px)": {
                                                        paddingTop: "0px",
                                                        fontSize: "26.5px",
                                                    },
                                                }}
                                            >
                                                {item.gain_loss}%
                                            </Text>
                                            <Text
                                                b
                                                size={16}
                                                color="#fff"
                                                css={{
                                                    opacity: 0.7,
                                                    lineHeight: 1,
                                                    "@media only screen and (max-width: 764px)": {
                                                        // width: "100%",
                                                        // paddingLeft: "20px",
                                                        // paddingRight: "20px",
                                                        paddingTop: "0px",
                                                        fontSize: "13.5px",
                                                    },
                                                }}
                                            >
                                                {`${new Date().getDate()} ${new Date().toLocaleString(
                                                    "default",
                                                    {
                                                        month: "short",
                                                    }
                                                )} ${new Date().getFullYear()}`}
                                            </Text>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "70%",
                                                marginLeft: "20px",
                                            }}
                                        >
                                            <Text
                                                b
                                                size={16}
                                                color="#fff"
                                                css={{
                                                    opacity: 1,
                                                    lineHeight: 1,
                                                    marginBottom: "8px",
                                                    "@media only screen and (max-width: 764px)": {
                                                        // width: "100%",
                                                        // paddingLeft: "20px",
                                                        // paddingRight: "20px",
                                                        paddingTop: "0px",
                                                        fontSize: "14.5px",
                                                    },
                                                }}
                                            >
                                                Time Left: {item.time_left} days
                                            </Text>
                                            <Progress
                                                value={Math.floor(
                                                    (new Date() - new Date(item.start_date)) /
                                                    (1000 * 60 * 60 * 24)
                                                )}
                                                max={Math.floor(
                                                    (new Date(item.end_date) -
                                                        new Date(item.start_date)) /
                                                    (1000 * 60 * 60 * 24)
                                                )}
                                                // status={"default"}
                                                // color={'warning'}
                                                css={{
                                                    width: "80%",
                                                    opacity: 1,
                                                    height: "22.5px",
                                                    color: "#fff",
                                                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                                                    "@media only screen and (max-width: 764px)": {
                                                        height: "25px",
                                                    },
                                                }}
                                            />
                                            {/* {console.log( Math.ceil( (new Date() - new
											Date(item.start_date)) / (1000 * 60 * 60 * 24) ) + item.stock_name )} */}
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    width: "80%",
                                                }}
                                            >
                                                <Text
                                                    b
                                                    size={12}
                                                    color="#fff"
                                                    css={{marginTop: "5px", opacity: 1}}
                                                >
                                                    0
                                                </Text>
                                                <Text
                                                    b
                                                    size={12}
                                                    color="#fff"
                                                    css={{marginTop: "5px", opacity: 1}}
                                                >
                                                    {item.end_date ? (
                                                        <Text
                                                            b
                                                            size={12}
                                                            color="#fff"
                                                            css={{marginTop: "5px", opacity: 1}}
                                                        >
                                                            {`${Math.ceil(
                                                                (new Date(item.end_date) -
                                                                    new Date(item.start_date)) /
                                                                (1000 * 60 * 60 * 24)
                                                            )}`}
                                                        </Text>
                                                    ) : (
                                                        <Text
                                                            b
                                                            size={12}
                                                            color="#fff"
                                                            css={{marginTop: "5px", opacity: 1}}
                                                        >
                                                            365 days
                                                        </Text>
                                                    )}
                                                </Text>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "5%",
                                            mt: "15px",
                                        }}
                                    >
                                        <Button
                                            auto
                                            onPress={() => handleOpenReports(index)}
                                            css={{
                                                alignSelf: "flex-end",
                                                borderRadius: "1000px",
                                                width: "47.5%",
                                                fontSize: 18,
                                                backgroundImage:
                                                    "linear-gradient(to top , #FF9D28, #ffa736)",
                                            }}
                                        >
                                            Reports
                                        </Button>
                                        {item.stock_targets.length > 0 ? (
                                            <Button
                                                auto
                                                onPress={() => handleOpenTargets(index)}
                                                css={{
                                                    borderRadius: "1000px",
                                                    width: "47.5%",
                                                    fontSize: 18,
                                                    backgroundImage:
                                                        "linear-gradient(to top , #FF9D28, #ffa736)",
                                                }}
                                            >
                                                Previous Targets
                                            </Button>
                                        ) : (
                                            ""
                                        )}
                                    </Box>
                                </Box>

                                {/* Targets Modal */}

                                <Modal
                                    open={showTargets}
                                    onClose={handleCloseTargets}
                                    // width="21%"
                                    css={{
                                        // width: "450px",
                                        background: "transparent",
                                        boxShadow: "none",
                                        alignItems: "center",
                                        "@media only screen and (max-width: 764px)": {
                                            width: "100vw",
                                            height: "95vh",
                                            paddingLeft: "15px",
                                            paddingRight: "15px",
                                        },
                                    }}
                                >
                                    {record[selectedCardIndex] && (
                                        <Card
                                            key={selectedCardIndex}
                                            css={{
                                                width: "450px",
                                                height: "300px",
                                                // padding: "40px",
                                                paddingTop: "30px",
                                                paddingBottom: "30px",
                                                backgroundImage:
                                                    "linear-gradient(to top , #0F734D, #0F734D, #105B54)",
                                                borderRadius: "30px",
                                                borderBottomRightRadius: "5px",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                "@media only screen and (max-width: 764px)": {
                                                    width: "95vw",
                                                    height: "380px",
                                                    paddingTop: "30px",
                                                    paddingBottom: "30px",
                                                },
                                            }}
                                        >
                                            {record[selectedCardIndex].stock_targets.length > 0 ? (
                                                record[selectedCardIndex].stock_targets.map(
                                                    (target) => (
                                                        <div key={target.id}>
                                                            <Box
                                                                sx={{
                                                                    padding: "5px",
                                                                    paddingTop: "0px",
                                                                    paddingLeft: "15px",
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    // alignItems: "center",
                                                                    // background: 'rgba(255, 255, 255, 0.15) url("LineChartGreen.png")',
                                                                    backgroundSize: "cover",
                                                                    height: "auto",
                                                                    width: "410px",
                                                                    "@media only screen and (max-width: 764px)": {
                                                                        width: "100%",
                                                                        paddingLeft: "20px",
                                                                        paddingRight: "20px",
                                                                    },
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        width: "100%",
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                        alignItems: "center",
                                                                        flexDirection: "row",
                                                                        // paddingTop: "5%",
                                                                        paddingBottom: "5px",
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            display: "flex",
                                                                            flexDirection: "column",
                                                                        }}
                                                                    >
                                                                        <Text
                                                                            b
                                                                            size={22}
                                                                            color="#fff"
                                                                            css={{
                                                                                lineHeight: 1.5,
                                                                                "@media only screen and (max-width: 764px)":
                                                                                    {
                                                                                        paddingTop: "5px",
                                                                                        fontSize: "22px",
                                                                                        lineHeight: 1.1,
                                                                                    },
                                                                            }}
                                                                        >
                                                                            {item.stock_name.length > 28 ? (
                                                                                <Marquee delay={5} speed={30}>
                                          <span
                                              style={{paddingRight: "40px"}}
                                          >
                                            {
                                                record[selectedCardIndex]
                                                    .stock_name
                                            }
                                          </span>
                                                                                </Marquee>
                                                                            ) : (
                                                                                <>
                                                                                    {record[selectedCardIndex].stock_name}
                                                                                </>
                                                                            )}
                                                                        </Text>
                                                                    </div>
                                                                </div>
                                                                <Divider
                                                                    css={{
                                                                        height: "3px",
                                                                        width: "70%",
                                                                        background: "#fff",
                                                                        borderRadius: "20px",
                                                                        opacity: 0.5,
                                                                        alignSelf: "start",
                                                                        marginTop: "10px",
                                                                    }}
                                                                />
                                                                <div
                                                                    style={{
                                                                        width: "95%",
                                                                        display: "flex",
                                                                        flexDirection: "row",
                                                                        marginTop: "15px",
                                                                        gap: "20px",
                                                                    }}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            display: "flex",
                                                                            flexDirection: "column",
                                                                        }}
                                                                    >
                                                                        <Text
                                                                            b
                                                                            size={16}
                                                                            color="#fff"
                                                                            css={{
                                                                                opacity: 1,
                                                                                lineHeight: 1,
                                                                                "@media only screen and (max-width: 764px)":
                                                                                    {
                                                                                        paddingTop: "0px",
                                                                                        fontSize: "14.5px",
                                                                                    },
                                                                            }}
                                                                        >
                                                                            HOLD PRICE
                                                                        </Text>
                                                                        <Text
                                                                            b
                                                                            size={22}
                                                                            color="#fff"
                                                                            css={{
                                                                                display: "flex",
                                                                                flexDirection: "row",
                                                                                alignItems: "center",
                                                                                "@media only screen and (max-width: 764px)":
                                                                                    {
                                                                                        paddingTop: "0px",
                                                                                        fontSize: "20px",
                                                                                    },
                                                                            }}
                                                                        >
                                      <span
                                          style={{fontSize: 16, opacity: 0.75}}
                                      >
                                        ₹
                                      </span>
                                                                            {target.hold_price}
                                                                        </Text>
                                                                        {/* <Text
																			b
																			size={16}
																			color="#fff"
																			css={{
																				opacity: 0.7,
																				lineHeight: 1,
																				"@media only screen and (max-width: 764px)":
																					{
																						paddingTop: "0px",
																						fontSize: "14.5px",
																					},
																			}}
																		>
																			{record[selectedCardIndex].start_date
																				? `${new Date(
																						item.start_date
																				  ).getDate()} ${new Date(
																						item.start_date
																				  ).toLocaleString("default", {
																						month: "short",
																				  })} ${new Date(
																						item.start_date
																				  ).getFullYear()}`
																				: "03 Nov 2022"}
																		</Text> */}
                                                                    </Box>
                                                                    <Box
                                                                        sx={{
                                                                            display: "flex",
                                                                            flexDirection: "column",
                                                                        }}
                                                                    >
                                                                        <Text
                                                                            b
                                                                            size={16}
                                                                            color="#fff"
                                                                            css={{
                                                                                opacity: 1,
                                                                                lineHeight: 1,
                                                                                alignSelf: "start",
                                                                                "@media only screen and (max-width: 764px)":
                                                                                    {
                                                                                        paddingTop: "0px",
                                                                                        fontSize: "14.5px",
                                                                                    },
                                                                            }}
                                                                        >
                                                                            TARGET
                                                                        </Text>
                                                                        <Text
                                                                            b
                                                                            size={22}
                                                                            color="#fff"
                                                                            css={{
                                                                                display: "flex",
                                                                                flexDirection: "row",
                                                                                alignItems: "center",
                                                                                alignSelf: "start",
                                                                                "@media only screen and (max-width: 764px)":
                                                                                    {
                                                                                        paddingTop: "0px",
                                                                                        fontSize: "20px",
                                                                                    },
                                                                            }}
                                                                        >
                                      <span
                                          style={{fontSize: 16, opacity: 0.75}}
                                      >
                                        ₹
                                      </span>
                                                                            {target.target_price}
                                                                        </Text>
                                                                        <Text
                                                                            b
                                                                            size={16}
                                                                            color="#fff"
                                                                            css={{
                                                                                opacity: 0.7,
                                                                                lineHeight: 1,
                                                                                alignSelf: "start",
                                                                                "@media only screen and (max-width: 764px)":
                                                                                    {
                                                                                        paddingTop: "0px",
                                                                                        fontSize: "14.5px",
                                                                                    },
                                                                            }}
                                                                        >
                                                                            {`${new Date(
                                                                                target.target_date
                                                                            ).getDate()} ${new Date(
                                                                                target.target_date
                                                                            ).toLocaleString("default", {
                                                                                month: "short",
                                                                            })} ${new Date().getFullYear()}`}
                                                                        </Text>
                                                                    </Box>
                                                                </div>
                                                                <Divider
                                                                    css={{
                                                                        height: "3px",
                                                                        width: "40%",
                                                                        background: "#fff",
                                                                        borderRadius: "20px",
                                                                        opacity: 0.5,
                                                                        alignSelf: "start",
                                                                        marginTop: "15px",
                                                                    }}
                                                                />
                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        flexDirection: "row",
                                                                        alignItems: "center",
                                                                        marginTop: "15px",
                                                                    }}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            display: "flex",
                                                                            flexDirection: "column",
                                                                            alignSelf: "flex-start",
                                                                        }}
                                                                    >
                                                                        <Text
                                                                            b
                                                                            size={16}
                                                                            color="#fff"
                                                                            css={{
                                                                                opacity: 1,
                                                                                lineHeight: 1,
                                                                                alignSelf: "start",
                                                                                "@media only screen and (max-width: 764px)":
                                                                                    {
                                                                                        paddingTop: "0px",
                                                                                        fontSize: "14.5px",
                                                                                    },
                                                                            }}
                                                                        >
                                                                            RETURNS
                                                                        </Text>
                                                                        <Text
                                                                            b
                                                                            size={22}
                                                                            color="#fff"
                                                                            css={{
                                                                                display: "flex",
                                                                                flexDirection: "row",
                                                                                alignItems: "center",
                                                                                "@media only screen and (max-width: 764px)":
                                                                                    {
                                                                                        paddingTop: "0px",
                                                                                        fontSize: "20px",
                                                                                    },
                                                                            }}
                                                                        >
                                                                            {target.gain_loss}%
                                                                        </Text>
                                                                        <Text
                                                                            b
                                                                            size={16}
                                                                            color="#fff"
                                                                            css={{
                                                                                // width: "120px",
                                                                                opacity: 0.7,
                                                                                lineHeight: 1,
                                                                                alignSelf: "start",
                                                                                "@media only screen and (max-width: 764px)":
                                                                                    {
                                                                                        paddingTop: "0px",
                                                                                        fontSize: "14.5px",
                                                                                    },
                                                                            }}
                                                                        >
                                                                            {`${new Date().getDate()} ${new Date().toLocaleString(
                                                                                "default",
                                                                                {
                                                                                    month: "short",
                                                                                }
                                                                            )} ${new Date().getFullYear()}`}
                                                                        </Text>
                                                                    </Box>
                                                                </Box>
                                                            </Box>

                                                            {/* <Text color="#fff">
																Hold Price: ₹{target.hold_price}
															</Text>
															<Text color="#fff">
																Target Price: ₹{target.target_price}
															</Text>
															<Text color="#fff">
																Target Date: {target.target_date}
															</Text>
															<Text color="#fff">
																Profit/Loss: {target.gain_loss}%
															</Text> */}
                                                        </div>
                                                    )
                                                )
                                            ) : (
                                                <Text>No targets available</Text>
                                            )}
                                        </Card>
                                    )}

                                    <Button
                                        flat
                                        onPress={handleCloseTargets}
                                        css={{
                                            alignSelf: "center",
                                            // width: "100%",
                                            backgroundColor: "#ffa12e",
                                            color: "#fff",
                                            fontSize: 19,
                                            marginTop: "20px",
                                            borderRadius: "10px",
                                            height: "50px",
                                            "@media only screen and (max-width: 768px)": {
                                                width: "100%",
                                                fontSize: 15,
                                                height: "50px",
                                                marginTop: "0px",
                                                borderRadius: "0px 0px 10px",
                                                "& span": {
                                                    // display: "none",
                                                },
                                            },
                                        }}
                                    >
                                        Close
                                    </Button>
                                </Modal>

                                {/* Reports Modal */}

                                <Modal
                                    blur
                                    // fullScreen
                                    open={showReports}
                                    onClose={handleCloseReports}
                                    css={{
                                        // width: "800px",
                                        background: "transparent",
                                        boxShadow: "none",
                                        filter: "none",
                                        "@media only screen and (max-width: 764px)": {
                                            width: "100vw",
                                            height: "95vh",
                                            paddingLeft: "15px",
                                            paddingRight: "15px",
                                        },
                                    }}
                                >
                                    {record[selectedCardIndex] &&
                                    record[selectedCardIndex].stock_reports &&
                                    record[selectedCardIndex].stock_reports.length > 0 ? (
                                        <>
                                            <Dropdown>
                                                <Dropdown.Button
                                                    flat
                                                    css={{
                                                        alignSelf: "center",
                                                        width: "100%",
                                                        backgroundColor: "#125a54",
                                                        color: "#fff",
                                                        fontSize: 19,
                                                        marginBottom: "20px",
                                                        borderRadius: "10px",
                                                        height: "50px",
                                                        "@media only screen and (max-width: 768px)": {
                                                            width: "100%",
                                                            fontSize: 15,
                                                            height: "50px",
                                                            marginBottom: "0px",
                                                            borderRadius: "10px 0 0",
                                                            "& span": {
                                                                // display: "none",
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <Text>
                                                        {selectedPDF === "" || selectedPDF === undefined
                                                            ? "Reports"
                                                            : record[selectedCardIndex].stock_reports.find(
                                                                (report) =>
                                                                    report.document ===
                                                                    Array.from(selectedPDF)[0]
                                                            )?.report_name}
                                                    </Text>
                                                </Dropdown.Button>
                                                <Dropdown.Menu
                                                    // defaultSelectedKeys={'SampleReport.pdf'}
                                                    aria-label="TractReports"
                                                    selectionMode="single"
                                                    selectedKeys={selectedPDF}
                                                    onSelectionChange={(key) => setSelectedPDF(key)}
                                                    // defaultSelectedKeys={[record[selectedCardIndex].stock_reports[0]?.document]}
                                                    style={{width: "100%"}}
                                                >
                                                    {record[selectedCardIndex].stock_reports.map(
                                                        (report) => (
                                                            <Dropdown.Item key={report.document}>
                                                                {report.report_name}
                                                            </Dropdown.Item>
                                                        )
                                                    )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            {/* {console.log(PdfURL)}
											{console.log(selectedReportUrl)} */}
                                            <Worker
                                                workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.worker.min.js`}
                                            >
                                                <Box
                                                    sx={{
                                                        height: "75vh",
                                                        "@media only screen and (max-width: 768px)": {
                                                            // width: '500px',
                                                            // height: '80%',
                                                        },
                                                    }}
                                                >
                                                    <Viewer
                                                        fileUrl={`${
                                                            PdfURL ? PdfURL : selectedReportUrl
                                                        }#view=FitH&toolbar=0`}
                                                        onDocumentAskPassword={handleAskPassword}
                                                    />
                                                </Box>
                                            </Worker>
                                        </>
                                    ) : (
                                        <Text b size={22} color="#fff">
                                            No Reports Available
                                        </Text>
                                    )}
                                    <Button
                                        flat
                                        onPress={handleCloseReports}
                                        css={{
                                            alignSelf: "end",
                                            width: "100%",
                                            backgroundColor: "#ffa12e",
                                            color: "#fff",
                                            fontSize: 19,
                                            marginTop: "20px",
                                            borderRadius: "10px",
                                            height: "50px",
                                            "@media only screen and (max-width: 768px)": {
                                                width: "100%",
                                                fontSize: 15,
                                                height: "50px",
                                                marginTop: "0px",
                                                borderRadius: "0px 0px 10px",
                                                "& span": {
                                                    // display: "none",
                                                },
                                            },
                                        }}
                                    >
                                        Close
                                    </Button>
                                </Modal>
                            </Card>
                        ))}
                    </div>
                </Box>

                <Button
                    auto
                    css={{
                        background: "#FD9800",
                        // backgroundImage:
                        //   "linear-gradient(to top , #0F734D, #0F734D, #105B54)",
                        color: "#fff",
                        fontSize: 30,
                        marginTop: "10vh",
                        padding: "40px 40px",
                        width: "764px",
                        alignSelf: "center",
                        borderRadius: "10000px",
                        // maxWidth: "80rem",
                        "@media only screen and (max-width: 764px)": {
                            width: "100%",
                            // paddingLeft: "20px",
                            // paddingRight: "20px",
                            padding: "30px 10px",
                            marginTop: "20px",
                            fontSize: "20px",
                            borderRadius: "10px",
                        },
                    }}
                    onPress={trackRecord}
                >
                    {`Full track record`}
                </Button>
            </div>
        </main>
    );
};

export default WhyUs;
