import { Box, Divider } from "@mui/material";
import { Button, Dropdown, Modal, Text } from "@nextui-org/react";
import React from "react";

const HeaderCards = () => {
  return (
    <section
    id="whyUs"
      style={{
        width: "100vw",
        // backgroundColor: "#fafafa",
        backgroundColor: "#fafafa",
        // paddingTop: "100px",
        paddingBottom: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100vw",
          maxWidth: "80rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          padding: "0 15px",
        }}
      >
        <Text
          b
          size={60}
          css={{
            textAlign: "center",
            paddingBottom: "30px",
            "@media only screen and (max-width: 764px)": {
              textAlign: "left",
              fontSize: 45,
              lineHeight: 1,
              paddingBottom: "10px",
              alignSelf: "flex-start",
              marginTop: "-30px",
            },
          }}
        >
          Why should you trust us with your money?
        </Text>
        <Text
          b
          size={25}
          css={{
            textAlign: "center",
            "@media only screen and (max-width: 764px)": {
              textAlign: "left",
              fontSize: 20,
              lineHeight: 1.1,
            },
          }}
        >
          Trust is an investment, earned with honesty, paid in consistency, and
          yielding dividends of reliability.
        </Text>
      </div>
    </section>
  );
};

export default HeaderCards;
