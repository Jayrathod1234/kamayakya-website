import { Button, Card, Divider, Modal, Text, useModal } from "@nextui-org/react";
import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type TSampleReportsModal = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  bindings: ReturnType<typeof useModal>["bindings"];
};

export default function SampleReportsModal({ setVisible, bindings }: TSampleReportsModal) {
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
    var win = window.open("Gravita India Ltd. (GIL) - 1 Page Report.pdf#toolbar=0&fitH=1", "_blank", "fullscreen=yes");
  };
  const handleGravitaDetailed = () => {
    var win = window.open(
      "Gravita India Ltd. (GIL) - Detailed Report.pdf#toolbar=0&fitH=1",
      "_blank",
      "fullscreen=yes"
    );
  };
  const handleVirOnePage = () => {
    var win = window.open("Virtuso_main.pdf#toolbar=0&fitH=1", "_blank", "fullscreen=yes");
  };
  const handleVirDetailed = () => {
    var win = window.open("virtuso_single.pdf#toolbar=0&fitH=1", "_blank", "fullscreen=yes");
  };

  const handleGuficOnePage = () => {
    var win = window.open("Gufic BioScience - One Page Report.pdf#toolbar=0&fitH=1", "_blank", "fullscreen=yes");
  };

  const handleGuficDetailed = () => {
    var win = window.open("Gufic BioSciences - Detailed Report.pdf#toolbar=0&fitH=1", "_blank", "fullscreen=yes");
  };
  return (
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
        <IconButton sx={{ position: "absolute", top: "5px", right: "5px" }} onClick={() => setVisible(false)}>
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
        <Text b size={21} css={{ alignSelf: "center", color: "#18501E" }}>
          SME
        </Text>
        <Text b size={21} css={{ alignSelf: "center" }}>
          Virtuoso Optoelectronics Ltd.
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
            onPress={handleVirOnePage}
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
            onPress={handleVirDetailed}
          >
            <Text b size={21} color="#18501E">
              Detailed Report
            </Text>
          </Button>
        </div>
      </Card>
    </Modal>
  );
}
