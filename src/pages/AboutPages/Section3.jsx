import { Box, IconButton } from "@mui/material";
import {
	Button,
	Card,
	Modal,
	Text,
	Divider,
	useModal,
} from "@nextui-org/react";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const Section3 = () => {
	const { setVisible, bindings } = useModal();
	const [selectedPDF, setSelectedPDF] = useState(new Set(["SampleReport.pdf"]));
	const [showIframe, setShowIframe] = useState(false);

	const handleCloseIframe = () => {
		setShowIframe(false);
	};

	const handleIonOnePage = () => {
		var win = window.open(
			"Ion Exchange (India) Ltd. (IEIL) - 1 Page Report.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
	};
	const handleIonDetailed = () => {
		var win = window.open(
			"Ion Exchange (India) Ltd. (IEIL) - Detailed Report.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
	};
	const handleHGOnePage = () => {
		var win = window.open(
			"H.G. Infra Engineering Ltd (HGIEL) - 1 Page Report.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
	};
	const handleHGDetailed = () => {
		var win = window.open(
			"H.G. Infra Engineering Ltd (HGIEL) - Detailed Report.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
	};
	const handleGravitaOnePage = () => {
		var win = window.open(
			"Gravita India Ltd. (GIL) - 1 Page Report.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
	};
	const handleGravitaDetailed = () => {
		var win = window.open(
			"Gravita India Ltd. (GIL) - Detailed Report.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
	};

  const handleGuficOnePage = () => {
		var win = window.open(
			"Gufic Bioscience - One Page Report.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
	};

	const handleGuficDetailed = () => {
		var win = window.open(
			"Gufic BioSciences - Detailed Report.pdf#toolbar=0&fitH=1",
			"_blank",
			"fullscreen=yes"
		);
	};

  return (
    <section
      style={{
        width: "100vw",
        backgroundColor: "#fafafa",
        paddingTop: "100px",
        paddingBottom: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "80rem",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          paddingLeft: "20px",
          paddingRight: "20px",
          "@media only screen and (max-width: 764px)": {
            width: "100%",
            paddingLeft: "15px",
            paddingRight: "15px",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            alignSelf: "flex-start",
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{ width: "50%", height: "auto" }}
          className="aboutSectionGifAndText"
        >
          <video
            muted
            autoPlay
            loop
            src="KMK-V1.mp4"
            style={{ borderRadius: "20px", width: "100%", height: "100%" }}
          />
        </Box>
        <Box
          className="aboutSectionGifAndText mobileAboutText"
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            paddingLeft: "75px",
            // paddingRight: "75px",
          }}
        >
          <Text
            b
            size={26}
            css={{
              lineHeight: 1.4,
              textAlign: "left",
              paddingBottom: "35px",
              paddingTop: "35px",
              "@media only screen and (max-width: 764px)": {
                textAlign: "left",
                fontSize: 25,
                lineHeight: 1.2,
                paddingLeft: "10px",
                paddingRight: "10px",
              },
            }}
          >
            <span style={{ fontSize: "18px", opacity: "0.75" }}>
              Our methodology
            </span>
            <br />
            <span style={{ fontSize: "22px", opacity: "1" }}>
              One of our primary goals is to minimize risks for our clients. To
              achieve this, we filter out the noise of the market and focus
              solely on reliable data and research. By doing so, we ensure that
              our recommendations are based on solid foundations, reducing the
              potential risks associated with investing in these hidden gems.
            </span>
          </Text>
          <Button
            auto
            // size={"xl"}/
            onPress={() => setVisible(true)}
            css={{
              borderRadius: "10000px",
              marginTop: 0,
              backgroundColor: "#ff9f24",
              zIndex: 0,
              paddingLeft: 50,
              paddingRight: 50,
              height: "55px",
              width: "80px",
              "@media only screen and (max-width: 764px)": {
                borderRadius: "15px",
                paddingLeft: 15,
                paddingRight: 15,
                marginLeft: 0,
                marginBottom: 0,
                marginTop: "10px",
                height: "55px",
                width: "250px",
              },
            }}
          >
            <Text
              b
              size={18}
              color="White"
              css={{
                "@media only screen and (max-width: 764px)": {
                  fontSize: 18,
                  // padding: "1px 5px",
                  width: "auto",
                },
              }}
            >
              Sample Reports
            </Text>
          </Button>
          <Modal
            blur
            aria-labelledby="modal-pdf"
            aria-describedby="pdf-description"
            open={showIframe}
            onClose={handleCloseIframe}
            css={{
              width: "65vw",
              maxWidth: "65vw",
              alignSelf: "flex-end",
              background: "transparent",
              boxShadow: "none",
              borderRadius: "15px",
              alignItems: "center",
              "@media only screen and (max-width: 764px)": {
                width: "95vw !important",
                maxWidth: "95vw !important",
              },
            }}
          >
            {selectedPDF && (
              <iframe
                src={`${selectedPDF}#view=FitH&toolbar=0`}
                style={{
                  width: "100%",
                  height: "75vh",
                  borderColor: "transparent",
                  borderRadius: "15px",
                  borderWidth: "0px",
                  zoom: "1",
                }}
                className="iframePdfMobile"
              />
            )}
            <Button
              flat
              onPress={handleCloseIframe}
              css={{
                alignSelf: "center",
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
          <Modal
            blur
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            {...bindings}
            css={{
              width: "65vw",
              maxWidth: "65vw",
              alignSelf: "flex-end",
              background: "transparent",
              boxShadow: "none",
              borderRadius: "15px",
              alignItems: "center",
              "@media only screen and (max-width: 764px)": {
                width: "95vw !important",
                maxWidth: "95vw !important",
              },
            }}
          >
            <Card
              css={{
                height: "fit-content",
                width: "fit-content",
                maxWidth: "80rem",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                padding: "50px 30px",
                borderRadius: "25px",
                // backgroundImage: "url(symbol-scatter-haikei-3.svg)",
                objectPosition: "center",
                backgroundPositionY: "center",
                backgroundSize: "cover",
                "@media only screen and (max-width: 764px)": {
                  width: "100vw !important",
                },
              }}
            >
              <IconButton
                sx={{ position: "absolute", top: "5px", right: "5px" }}
                onClick={() => setVisible(false)}
              >
                <CloseIcon color="error" />
              </IconButton>
              <Text b size={40} css={{ alignSelf: "center" }}>
                Sample Reports
              </Text>
              <br />
              <Divider
                css={{
                  width: "50px",
                  height: "4px",
                  borderRadius: "1000px",
                  backgroundColor: "#FF9E24",
                }}
              />
              <br />
              <Text b size={21} css={{ alignSelf: "center" }}>
                Ion Exchange (India) Ltd.
              </Text>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  css={{
                    background: "transparent",
                    paddingLeft: "0px",
                    marginTop: "0px",
                    width: "auto",
                  }}
                  onPress={handleIonOnePage}
                >
                  <Text b size={21} color="#18501E">
                    1-Page Report
                  </Text>
                </Button>
                <Button
                  css={{
                    background: "transparent",
                    paddingLeft: "0px",
                    marginTop: "0px",
                    width: "auto",
                  }}
                  onPress={handleIonDetailed}
                >
                  <Text b size={21} color="#18501E">
                    Detailed Report
                  </Text>
                </Button>
              </div>
              <br />
              <Divider
                css={{
                  width: "50px",
                  height: "4px",
                  borderRadius: "1000px",
                  backgroundColor: "#FF9E24",
                }}
              />
              <br />
              <Text b size={21} css={{ alignSelf: "center" }}>
                H.G. Infra Engineering Ltd.
              </Text>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  css={{
                    background: "transparent",
                    paddingLeft: "0px",
                    marginTop: "0px",
                    width: "auto",
                  }}
                  onPress={handleHGOnePage}
                >
                  <Text b size={21} color="#18501E">
                    1-Page Report
                  </Text>
                </Button>
                <Button
                  css={{
                    background: "transparent",
                    paddingLeft: "0px",
                    marginTop: "0px",
                    width: "auto",
                  }}
                  onPress={handleHGDetailed}
                >
                  <Text b size={21} color="#18501E">
                    Detailed Report
                  </Text>
                </Button>
              </div>
              <br />
              <Divider
                css={{
                  width: "50px",
                  height: "4px",
                  borderRadius: "1000px",
                  backgroundColor: "#FF9E24",
                }}
              />
              <br />
              <Text b size={21} css={{ alignSelf: "center" }}>
                Gravita India Ltd.
              </Text>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  css={{
                    background: "transparent",
                    paddingLeft: "0px",
                    marginTop: "0px",
                    width: "auto",
                  }}
                  onPress={handleGravitaOnePage}
                >
                  <Text b size={21} color="#18501E">
                    1-Page Report
                  </Text>
                </Button>
                <Button
                  css={{
                    background: "transparent",
                    paddingLeft: "0px",
                    marginTop: "0px",
                    width: "auto",
                  }}
                  onPress={handleGravitaDetailed}
                >
                  <Text b size={21} color="#18501E">
                    Detailed Report
                  </Text>
                </Button>
              </div>
              <br />
              <Divider
                css={{
                  width: "50px",
                  height: "4px",
                  borderRadius: "1000px",
                  backgroundColor: "#FF9E24",
                }}
              />
              <br />
              <Text b size={21} css={{ alignSelf: "center" }}>
              Gufic BioSciences Ltd.
              </Text>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  css={{
                    background: "transparent",
                    paddingLeft: "0px",
                    marginTop: "0px",
                    width: "auto",
                  }}
                  onPress={handleGuficOnePage}
                >
                  <Text b size={21} color="#18501E">
                    1-Page Report
                  </Text>
                </Button>
                <Button
                  css={{
                    background: "transparent",
                    paddingLeft: "0px",
                    marginTop: "0px",
                    width: "auto",
                  }}
                  onPress={handleGuficDetailed}
                >
                  <Text b size={21} color="#18501E">
                    Detailed Report
                  </Text>
                </Button>
              </div>
            </Card>
          </Modal>
        </Box>
      </Box>
    </section>
  );
};

export default Section3;
