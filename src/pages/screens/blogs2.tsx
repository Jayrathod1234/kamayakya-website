import React, { useState } from "react";
import { Card, Text, Button } from "@nextui-org/react";
import { Box } from "@mui/material";

const Blogs2 = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseEnter = (cardId: number) => {
    setHoveredCard(cardId);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section
      style={{
        backgroundColor: "#fff",
        paddingBottom: 50,
        paddingLeft: 50,
        paddingRight: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 50,
        }}
      >
        <Text b size={50} css={{ color: "#25262c" }}>
          Some of our blogs
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Card
          variant="flat"
          css={{
            width: "100%",
            maxWidth: "500px",
            marginBottom: 20,
            backgroundColor: "#fff",
          }}
        >
          <Card.Image
            src="/blog1.jpg"
            alt="Blog 1"
            height="250px"
            width="100%"
            objectFit="cover"
            css={{ borderRadius: "14px" }}
          />
          <Card.Body
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
          >
            <Text b color="#888888">
              21 January, 2023
            </Text>
            <Text b color="#25262c" size={16}>
              Team KamayaKya
            </Text>
            <Text b color="#25262c" size={24}>
              What is Equity Research?
            </Text>
            <Text b>
              KamayaKya is your friendly investment guru who will assist you in
              finding the best SME, MicroCap and SmallCap stocks to invest,
              backed by solid research.
            </Text>
            {hoveredCard === 1 && (
              <Box
                sx={{
                  position: "absolute", // add position absolute to Box
                  top: "0",
                  left: "0",
                  height: "100%",
                  width: "100%",
                  backdropFilter: "blur(5px)",
                }}
              >
                <Button
                  css={{ backgroundColor: "#ff9f24", width: "100%", top: 20 }}
                >
                  Read More
                </Button>
              </Box>
            )}
          </Card.Body>
        </Card>
        <Card
          variant="flat"
          css={{
            width: "100%",
            maxWidth: "500px",
            marginBottom: 20,
            backgroundColor: "#fff",
          }}
        >
          <Card.Image
            src="/blog2.jpg"
            alt="Blog 1"
            height="250px"
            width="100%"
            objectFit="cover"
            css={{ borderRadius: "14px" }}
          />
          <Card.Body
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
          >
            <Text b color="#888888">
              21 January, 2023
            </Text>
            <Text b color="#25262c" size={16}>
              Team KamayaKya
            </Text>
            <Text b color="#25262c" size={24}>
              What is Equity Research?
            </Text>
            <Text b>
              KamayaKya is your friendly investment guru who will assist you in
              finding the best SME, MicroCap and SmallCap stocks to invest,
              backed by solid research.
            </Text>
            {hoveredCard === 2 && (
              <Box
                sx={{
                  position: "absolute", // add position absolute to Box
                  top: "0",
                  left: "0",
                  height: "100%",
                  width: "100%",
                  backdropFilter: "blur(5px)",
                }}
              >
                <Button
                  css={{ backgroundColor: "#ff9f24", width: "100%", top: 20 }}
                >
                  Read More
                </Button>
              </Box>
            )}
          </Card.Body>
        </Card>
        <Card
          variant="flat"
          css={{
            width: "100%",
            maxWidth: "500px",
            marginBottom: 20,
            backgroundColor: "#fff",
          }}
        >
          <Card.Image
            src="/blog3.jpg"
            alt="Blog 1"
            height="250px"
            width="100%"
            objectFit="cover"
            css={{ borderRadius: "14px" }}
          />
          <Card.Body
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={handleMouseLeave}
          >
            <Text b color="#888888">
              21 January, 2023
            </Text>
            <Text b color="#25262c" size={16}>
              Team KamayaKya
            </Text>
            <Text b color="#25262c" size={24}>
              What is Equity Research?
            </Text>
            <Text b>
              KamayaKya is your friendly investment guru who will assist you in
              finding the best SME, MicroCap and SmallCap stocks to invest,
              backed by solid research.
            </Text>
            {hoveredCard === 3 && (
              <Box
                sx={{
                  position: "absolute", // add position absolute to Box
                  top: "0",
                  left: "0",
                  height: "100%",
                  width: "100%",
                  backdropFilter: "blur(5px)",
                }}
              >
                <Button
                  css={{ backgroundColor: "#ff9f24", width: "100%", top: 20 }}
                >
                  Read More
                </Button>
              </Box>
            )}
          </Card.Body>
        </Card>
      </div>
    </section>
  );
};

export default Blogs2;