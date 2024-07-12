import {Box} from "@mui/material";
import {Text} from "@nextui-org/react";
import React from "react";
import {GrNotes} from "react-icons/gr";
import {AiFillClockCircle} from "react-icons/ai";
import {BsFileBarGraphFill} from "react-icons/bs";
import {IoSettingsSharp} from "react-icons/io5";

const Process = () => {
    return (
        <section
            style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "#fff",
                paddingBottom: 100,
                paddingLeft: 50,
                paddingRight: 50,
            }}
        >
            <div style={{maxWidth: "70%"}}>
                <Text b size={45}>
                    Why should you trust us with your money?
                </Text>
            </div>
            <div
                style={{
                    marginTop: 30,
                    marginLeft: 20,
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    gap: 10,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        border: "Solid 1px",
                        // borderRadius: "12px",
                        padding: 1,
                        paddingTop: 10,
                        width: "300px",
                        height: "350px",
                        textAlign: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "inline-block",
                            height: "80px",
                            width: "80px",
                            borderRadius: "50%",
                            backgroundColor: "#59eab5",
                        }}
                    >
                        <GrNotes style={{fontSize: "30px", margin: "25px"}}/>
                    </div>
                    <Text b size={24}>
                        Business idea
                    </Text>
                    <Text size={12} css={{marginTop: 10}}>
                        A business concept describes and clearly defines a new idea for a
                        business initiative, whether that be creating a new company or
                        producing a new product for the consumer market.
                    </Text>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        border: "Solid 1px",
                        // borderRadius: "12px",
                        padding: 1,
                        paddingTop: 10,
                        width: "300px",
                        height: "350px",
                        textAlign: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "inline-block",
                            height: "80px",
                            width: "80px",
                            borderRadius: "50%",
                            backgroundColor: "#968cfd",
                        }}
                    >
                        <AiFillClockCircle style={{fontSize: "38px", margin: "21px"}}/>
                    </div>
                    <Text b size={24}>
                        Planning
                    </Text>
                    <Text size={12} css={{marginTop: 10}}>
                        A company description is an overview of the company plan, vision and
                        relationships. These documents typically include the company name,
                        business structure, misson statement and an overview of the target
                        market.
                    </Text>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        border: "Solid 1px",
                        // borderRadius: "12px",
                        padding: 1,
                        paddingTop: 10,
                        width: "300px",
                        height: "350px",
                        textAlign: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "inline-block",
                            height: "80px",
                            width: "80px",
                            borderRadius: "50%",
                            backgroundColor: "#e9bf5b",
                        }}
                    >
                        <BsFileBarGraphFill style={{fontSize: "30px", margin: "25px"}}/>
                    </div>
                    <Text b size={24}>
                        Business Structure
                    </Text>
                    <Text size={12} css={{marginTop: 10}}>
                        Corporations offer the strongest protection to its owners from
                        personal liability, but the cost to form a corporation is higher
                        than other structures. Corporations also require more extensive
                        record keeping, operational processes and reporting.
                    </Text>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        border: "Solid 1px",
                        // borderRadius: "12px",
                        padding: 1,
                        paddingTop: 10,
                        width: "300px",
                        height: "350px",
                        textAlign: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "inline-block",
                            height: "80px",
                            width: "80px",
                            borderRadius: "50%",
                            backgroundColor: "#5991ed",
                        }}
                    >
                        <IoSettingsSharp style={{fontSize: "38px", margin: "21px"}}/>
                    </div>
                    <Text b size={24}>
                        Develop
                    </Text>
                    <Text size={12} css={{marginTop: 10}}>
                        A business development manager is responsible for helping
                        organizations obtain better brand recognition and financial growth.
                        They coordinate with company executives and sales and marketing
                        professionals to review current market trends in order to propose
                        new business ideas that can improve revenue margins.
                    </Text>
                </Box>
            </div>
        </section>
    );
};

export default Process;