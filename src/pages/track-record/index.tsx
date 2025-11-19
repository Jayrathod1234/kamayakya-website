"use client";
import { TrackRecordCommonProvider } from "@/contexts/TrackRecordCommonContext";
import React, { useContext, useEffect, useRef } from "react";
import { useNavBar } from "@/contexts/NavBarContext";
import { TrackRecordProvider, useTrackRecord } from "@/contexts/TrackRecordContext";
import { onScrollPaginationFunction } from "@/utils/onScrollPaginationFunction";
import { Box, IconButton } from "@mui/material";
import Login from "@/components/Login";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@nextui-org/react";
import AuthContext from "@/components/AuthContext";
import TrackRecordMain from "./components/TrackRecordMain";
import { getMixPanelClient } from "@/externals/mixpanel";
import { ACTIVE_PLAN_URL, GET_USER } from "../api/URLs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";

import ContactUsBtn from "@/components.v2/contact-us-btn";
const MyObserver = () => {
  const { fetchNextPage } = useTrackRecord();
  const myObserver = useRef();
  // useEffect(() => {
  //   // Start observing the element referenced by observerElem.current
  //   if (myObserver.current) {
  //     onScrollPaginationFunction(fetchNextPage).observe(myObserver.current);
  //   }
  //   // Clean up function to stop observing when component unmounts
  //   return () => {
  //     if (myObserver.current) {
  //       onScrollPaginationFunction(fetchNextPage).unobserve(myObserver.current);
  //     }
  //   };
  // }, [fetchNextPage]);
  return <div className=" h-1 w-full " ref={myObserver}></div>;
};

export default function TrackRecord() {
  const { showLoginModal, handleCloseLoginModal, isLoggedIn } = useContext(AuthContext);
  const pathname = usePathname();

  const refreshToken = localStorage.getItem("refresh");
  const fetchUser = async () => {
    try {
      const response = await fetch(GET_USER, {
        method: "GET",
        headers: {
          Authorization: `Token ${refreshToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (e) {
      return null;
    }
  };
  const fetchActivePlan = async () => {
    try {
      const response = await axios.get(ACTIVE_PLAN_URL, {
        headers: {
          Authorization: `token ${refreshToken}`,
        },
      });
      if (response.data) {
        const days = response.data.current_active_subscription.days;
        const duration = days > 90 ? "1year" : days > 365 ? "3year" : days > 0 ? "3months" : "";
        return { ...response.data.current_active_subscription, duration };
      }
    } catch (e) {
      return null;
    }
  };

  const handlePageLoadEvent = async () => {
    const mp = getMixPanelClient();

    const user = await fetchUser();
    const activePlan = await fetchActivePlan();
    if (user && activePlan) {
      mp.track("track_record_loaded", {
        id: uuidv4(),
        Session_id: "",
        time: new Date().toUTCString(),
        source_page: "",
        current_url: pathname,
        account_created_at: user.created,
        customer_id: user?.id,
        Curr_Subscription_Type: activePlan.plan,
        Curr_Plan_Duration: activePlan.duration,
        Curr_Subscription_Start_date: activePlan.start_date,
        Curr_Subscription_End_date: activePlan.end_date,
        usertype: activePlan.plan ? (activePlan.plan.toLowerCase() === "free" ? "Free" : "Paid") : null,
        browser_version: "",
        browser_name: "",
        device_type: "",
        device_name: "",
        utm_campaign: "",
        utm_content: "",
        utm_source: "",
        utm_medium: "",
        utm_terms: "",
      });
    }
  };

  useEffect(() => {
    const mp = getMixPanelClient();

    if (isLoggedIn) {
      handlePageLoadEvent();
    } else if (!isLoggedIn && !refreshToken) {
      mp.track("track_record_loaded", {
        id: uuidv4(),
        Session_id: "",
        time: new Date().toUTCString(),
        source_page: "",
        current_url: pathname,
        account_created_at: null,
        customer_id: null,
        Curr_Subscription_Type: null,
        Curr_Plan_Duration: null,
        Curr_Subscription_Start_date: null,
        Curr_Subscription_End_date: null,
        usertype: null,
        browser_version: "",
        browser_name: "",
        device_type: "",
        device_name: "",
        utm_campaign: "",
        utm_content: "",
        utm_source: "",
        utm_medium: "",
        utm_terms: "",
      });
    }
  }, [isLoggedIn]);

  return (
    <TrackRecordCommonProvider>
      <TrackRecordProvider>
        {/* <StockPicksProvider> */}
        <div className=" relative open_sans">
          <TrackRecordMain />
        </div>
        {/* <Modal width="450px" blur open={showLoginModal} onClose={handleCloseLoginModal}>
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
        </Modal> */}
        {/* </StockPicksProvider> */}
        <ContactUsBtn />
      </TrackRecordProvider>
    </TrackRecordCommonProvider>
  );
}
