import { Box } from "@mui/material";
import { Card, Text } from "@nextui-org/react";
import React from "react";

const SubscriptionCards = () => {
  return (
    <section>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        <Box>
          <Card
            variant="flat"
            isHoverable
            css={{
              width: "280px",
              maxWidth: "300px",
              backgroundColor: "#fff",
              padding: "15px",
              border: "2px solid #0f734d",
              borderRadius: "25px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text b size={26} color="#bb8141">
              Bronze Package
            </Text>
            <Box>
              <Text b size={22} color="#ffa12e">
                3 MONTHS
              </Text>
            </Box>
            <Text
              b
              size={18}
              style={{
                lineHeight: 1.2,
                textDecoration: "line-through",
                textDecorationColor: "#ef4958",
                textDecorationThickness: "2px",
              }}
            >
              ₹ 1,179
            </Text>
            <Text b size={28}>
              ₹ 589
            </Text>
            <ul style={{ listStyleType: "disc" }}>
              <li>
                <Text b size={20} css={{ textAlign: "center" }}>
                  Unlimited Stock Picks
                </Text>
              </li>
              <li>
                <Text
                  b
                  size={20}
                  css={{ textAlign: "center", lineHeight: 1.2 }}
                >
                  Previous Picks's Reports
                </Text>
              </li>
              <li>
                <Text b size={20}>
                  Detailed Analysis
                </Text>
              </li>
              <li>
                <Text b size={20}>
                  Reports in 3 Languages
                </Text>
              </li>
            </ul>
          </Card>
        </Box>
        <Box>
          <Card
            variant="shadow"
            isHoverable
            css={{
              width: "280px",
              maxWidth: "300px",
              backgroundColor: "#fff",
              padding: "15px",
              border: "2px solid #0f734d",
              display: "flex",
              alignItems: "center",
              boxShadow: "0px 16px 32px rgba(218, 165, 32, 0.3)",
            }}
          >
            <Text b size={26} color="#8a95a7">
              Platinum Package
            </Text>
            <Text b size={22} color="#ffa12e">
              12 MONTHS
            </Text>
            <Text
              b
              size={18}
              style={{
                lineHeight: 1.2,
                textDecoration: "line-through",
                textDecorationColor: "#ef4958",
                textDecorationThickness: "2px",
              }}
            >
              ₹ 3,540
            </Text>
            <Text b size={28}>
              ₹ 1,179
            </Text>
            <ul style={{ listStyleType: "disc" }}>
              <li>
                <Text b size={20} css={{ textAlign: "center" }}>
                  Unlimited Stock Picks
                </Text>
              </li>
              <li>
                <Text
                  b
                  size={20}
                  css={{ textAlign: "center", lineHeight: 1.2 }}
                >
                  Previous Picks's Reports
                </Text>
              </li>
              <li>
                <Text b size={20}>
                  Detailed Analysis
                </Text>
              </li>
              <li>
                <Text b size={20}>
                  Reports in 3 Languages
                </Text>
              </li>
            </ul>
          </Card>
        </Box>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "30px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text b size={15}>
          *Subscription renews automatically on the first of every month.
        </Text>
        <Text b size={15}>
          You can canel at any time from your account.
        </Text>
      </div>
    </section>
  );
};

export default SubscriptionCards;