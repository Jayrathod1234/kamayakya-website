import { Divider } from "@mui/material";
import { Text } from "@nextui-org/react";
import React from "react";

const Section1 = () => {
  return (
    <section
    id="philosophy"
      style={{
        width: "100vw",
        // background: "#edf6f8",
        background: "#fff",
        padding: "90px 15px",
        paddingBottom: "120px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
      className="researchSection"
    >
      <div
        style={{
          width: "100%",
          maxWidth: "80rem",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            b
            size={60}
            css={{
              textAlign: "center",
              "@media only screen and (max-width: 764px)": {
                textAlign: "left",
                fontSize: 45,
                lineHeight: 1,
                paddingBottom: "0px",
                alignSelf: "flex-start",
                marginTop: "0px",
              },
            }}
          >
            Research methodology
          </Text>
        </div>
        <div style={{ width: "100%", paddingTop: "25px" }}>
          <Text
            size={25}
            b
            css={{
              textAlign: "center",
              lineHeight: 1.25,
              "@media only screen and (max-width: 764px)": {
                textAlign: "left",
                fontSize: 23,
                lineHeight: 1.5,
              },
            }}
          >
            {/*We emphasize deep and thorough examination of each company,*/}
            {/*encompassing vital aspects such as capacity expansion, debt*/}
            {/*reduction, changes in management, industry tailwinds, favorable*/}
            {/*government policies, structural stories, and turnaround plays. These*/}
            {/*fundamental triggers serve as guideposts, enabling us to pinpoint*/}
            {/*companies poised for growth and success. Unlike traditional*/}
            {/*technical analysis approaches, we steer clear of relying solely on*/}
            {/*charts and graphs. Instead, our investment philosophy is rooted in a*/}
            {/*robust foundation of fundamental research. We believe that a*/}
            {/*thorough understanding of a company's financial health, growth*/}
            {/*potential, and market positioning is the key to making informed*/}
            {/*investment decisions.*/}
            We carefully select stocks after studying factors such as{" "}
            <b>
              <span
                style={{
                  // background: "#125a54",
                  color: "#ff8516",
                  // color: '#f2982a',
                  // textDecoration: 'underline #FF9E24',
                  // textDecorationThickness: '3px',
                  padding: "0px 0px",
                  borderRadius: "1000px",
                }}
              >
                cash flow, top-line and bottom-line growth, promoter holding,
                management quality, valuations
              </span>{" "}
              and more.
            </b>{" "}
            Some of the fundamental triggers we focus on are{" "}
            <b>
              <span
                style={{
                  // background: "#125a54",
                  color: "#ff8516",
                  // color: '#000',
                  // textDecoration: 'underline #FF9E24',
                  padding: "0px 0px",
                  borderRadius: "1000px",
                }}
              >
                capacity expansion, debt reduction, change in management,
                industry tailwinds, favorable government policies, structural
                stories, turnaround plays and more
              </span>
              .
            </b>{" "}
            These <b>hidden gems</b> (emerging companies that have enormous
            potential but overlooked by the market participants) are backed by
            solid data and research, including{" "}
            <b>
              {" "}
              <span
                style={{
                  // background: "#125a54",
                  color: "#ff8516",
                  // color: '#000',
                  // textDecoration: 'underline #FF9E24',
                  padding: "0px 0px",
                  borderRadius: "1000px",
                }}
              >
                management interactions and channel checks
              </span>{" "}
            </b>
            , minus the market noise to minimize risks for you. Instead of
            conducting technical analysis of stocks, our approach focuses on
            conducting extensive and meticulous research that is solely based on
            fundamental factors.
          </Text>
        </div>
      </div>
    </section>
  );
};

export default Section1;
