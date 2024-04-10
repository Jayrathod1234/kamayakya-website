import { Box, Divider } from "@mui/material";
import { Button, Dropdown, Modal, Text } from "@nextui-org/react";
import React from "react";

const HeaderFuture = () => {
  return (
    <section
    id="howItWorks"
      style={{
        width: "100vw",
        // backgroundColor: "#fafafa",
        backgroundColor: "#fff",
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
          Welcome to the future of stock investing
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
          Picking a stock to invest can be a very overwhelming process.
          KamayaKya aims to make the process easier, more transparent and
          rewarding. So how do we do it?
        </Text>
      </div>
    </section>
  );
};

export default HeaderFuture;
