"use client";
import { TrackRecordCommonProvider } from "@/contexts/TrackRecordCommonContext";
import React, { useContext, useEffect, useRef } from "react";
import { useNavBar } from "@/contexts/NavBarContext";
import Layout from "@/layout/Layout";
import { TrackRecordProvider, useTrackRecord } from "@/contexts/TrackRecordContext";
import { onScrollPaginationFunction } from "@/utils/onScrollPaginationFunction";
import LegendSection from "./components/LegendSection";
import ElevateSection from "../stock-picks/components/ElevateSection";
import TrackRecordList from "./components/TrackRecordList";
import TrackRecordHero from "./components/TrackRecordHero";
import TrackRecordTabSection from "./components/TrackRecordTabSection";
import Filters from "./components/Filters";
import { Box, IconButton } from "@mui/material";
import Login from "@/components/Login";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@nextui-org/react";
import AuthContext from "@/components/AuthContext";
import TrackRecordMain from "./components/TrackRecordMain";
import { StockPicksProvider } from "@/contexts/StockPicksContext";
const MyObserver = () => {
  const { fetchNextPage } = useTrackRecord();
  const myObserver = useRef();
  useEffect(() => {
    // Start observing the element referenced by observerElem.current
    if (myObserver.current) {
      onScrollPaginationFunction(fetchNextPage).observe(myObserver.current);
    }
    // Clean up function to stop observing when component unmounts
    return () => {
      if (myObserver.current) {
        onScrollPaginationFunction(fetchNextPage).unobserve(myObserver.current);
      }
    };
  }, [fetchNextPage]);
  return <div className=" h-1 w-full " ref={myObserver}></div>;
};

export default function TrackRecord() {
  const showFilterRef = useRef(null);
  const { setShowFilterHeader } = useNavBar();
  const {showLoginModal,handleCloseLoginModal} = useContext(AuthContext)

  useEffect(() => {
    const handleScroll = () => {
      if (showFilterRef.current) {
        const rect = showFilterRef.current?.getBoundingClientRect();
        setShowFilterHeader(rect.top <= 110);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <TrackRecordCommonProvider>
      <TrackRecordProvider>
      <StockPicksProvider>
        <div className=" relative open_sans">
          <TrackRecordMain/>
        </div>
        <Modal
        width="450px"
        blur
        open={showLoginModal}
        onClose={handleCloseLoginModal}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src="kmk-k.png" style={{ maxWidth: "260px" }} />
          <IconButton
            sx={{
              width: "40px",
              "&:hover": { background: "#fff" },
              // alignSelf: "end",
              right: "20px",
            }}
            onClick={() => handleCloseLoginModal()}
          >
            <CloseIcon sx={{ color: "#e81123" }} />
          </IconButton>
        </Box>

        <Modal.Body>
          <Login />
        </Modal.Body>
      </Modal>
      </StockPicksProvider>
      </TrackRecordProvider>
    </TrackRecordCommonProvider>
  );
}
