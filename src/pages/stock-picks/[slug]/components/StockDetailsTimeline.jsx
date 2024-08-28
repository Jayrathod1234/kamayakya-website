import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { styled } from "@mui/system";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { getMixPanelClient } from "@/externals/mixpanel";

const CustomStepConnector = styled(Box)(({ theme }) => ({
  borderLeft: `2px solid #00bfa5`,
  height: "110px",
  marginLeft: "6px",
  marginTop: "-5px",
}));

export default function StockDetailsTimeline({ timeline }) {
  const [reportOpen, setReportOpen] = useState(false); // State to manage modal visibility
  const [reportDetail, setReportDetail] = useState(null); // State to store the PDF URL
  const [openReportTime, setOpenReportTime] = useState(null);
  const [visibleSteps, setVisibleSteps] = useState(3);
  const mp = getMixPanelClient();

  const handleTimeButtonClick = (step) => {
    if (step.type == "report") {
      const currentTime = new Date().getTime();
      setOpenReportTime(currentTime); // Set the open time
      mp.track("stock_report_clicked", {
        page: "StockPicksDetail_Page",
        report_details: step,
      });
      setReportDetail(step); // Set the PDF URL
      setReportOpen(true); // Open the modal
    } else {
      mp.track("youtube_video_clicked", {
        page: "StockPicksDetail_Page",
        youtube_details: step,
      });
      window.open(step.youtube_link, "_blank");
    }
  };

  const handleClose = () => {
    if (openReportTime) {
      const closeTime = new Date().getTime();
      const timeSpent = (closeTime - openReportTime) / 1000; // Calculate time spent in seconds
      mp.track("stock_report_closed", {
        page: "StockPicksDetail_Page",
        timeSpent: timeSpent,
        report_details: reportDetail,
      }); // Track the event when the PDF is closed
    }
    setReportOpen(false);
    setReportDetail(null); // Set the PDF URL
  };

  // Function to format date
  const formatDate = (dateString) => {
    // Convert the input date string to a Date object
    const date = new Date(dateString);

    // Define an array of month names
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Get the day, month, and year from the Date object
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year

    // Format the date in '12 Jun 23' format
    return `${day} ${month} ${year}`;
  };
  // const handleLoadMore = () => {
  //   setVisibleSteps((prev) => prev + 2);
  // };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", pt: 4, backgroundColor: "white" }}>
      {timeline.map((step, index) => (
        <Box key={index} display="flex" alignItems="flex-start">
          <Box width="80px" textAlign="center" mr={2}>
            <Typography variant="body2" color="textSecondary" fontFamily="Open Sans">
              {formatDate(
                step.type == "report" ? step.report_date : step.youtube_date
              )}
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            position="relative"
            mr={2}
          >
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: index === 0 ? "#00bfa5" : "#9e9e9e",
                position: "relative",
                zIndex: 1,
                mb: "-6px",
                mr: "-5px",
              }}
            />
            <CustomStepConnector />
          </Box>

          <Box
            borderRadius="10px"
            bgcolor="background.paper"
            maxWidth={{ xs: "100%", sm: "450px" }}
            width="100%"
            p={"5px"}
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)" // Small shadow on the bottom side
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              color='#475467'
              fontFamily="Open Sans"
            >
              {step.type == "report"
                ? step.report_action_text
                : "Video Released"}

              {index == 0 && (
                <Box
                  ml={1}
                  px={1}
                  py={0.5}
                  borderRadius="9999px"
                  bgcolor="#FFF6EE"
                >
                  <Typography color="orange" fontFamily="Open Sans">Active</Typography>
                </Box>
              )}
            </Typography>

            {step.youtube_title && (
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" color="black" fontWeight="bold" fontFamily="Open Sans">
                  {step.youtube_title}
                </Typography>
              </Box>
            )}

            <Button
              size="small"
              sx={{
                mt: 1,
                color: "#344054",
                padding: "8px 16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)", // Small box shadow
                textTransform: "none",
                minWidth: "100px",
                flexShrink: 0,
                fontFamily:"Open Sans",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                transition: "background-color 0.3s, color 0.3s, filter 0.3s",
                "&:hover": {
                  backgroundColor: "#125B54",
                  color: "white",
                  "& img": {
                    filter: "invert(1)",
                  },
                },
              }}
              onClick={() => {
                handleTimeButtonClick(step);
              }}
            >
              <img
                src={`/assets/${step.type === "report" ? "file" : "video"}.svg`}
                alt={step.label}
                style={{ width: "20px", height: "20px" }}
              />
              {step.type == "report" ? step.report_name : "Watch Video"}
            </Button>
          </Box>
        </Box>
      ))}

      <Modal open={reportOpen} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            width: "95%",
            height: "95%",
            overflow: "auto",
          }}
        >
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <iframe
            src={reportDetail?.document}
            title="Report Document"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        </Box>
      </Modal>
      {/* <Button
        variant="outlined"
        onClick={handleLoadMore}
        sx={{
          color: "#344054",
          borderColor: "#D0D5DD",
          borderRadius: "999px",
          padding: "8px 16px",
          textTransform: "none",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          marginLeft: "50px",
          gap: "8px",
          "&:hover": {
            backgroundColor: "#F9FAFB",
            borderColor: "#D0D5DD",
          },
        }}
      >
        <MoreHorizIcon sx={{ fontSize: "16px" }} />
        Load More
      </Button> */}
    </Box>
  );
}
