import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { styled } from "@mui/system";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { getMixPanelClient } from "@/externals/mixpanel";
import { steps } from "framer-motion";

const CustomStepConnector = styled(Box)(({ theme }) => ({
  borderLeft: `2px solid #75CDC5`,
  height: "100%",
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
    console.log(step?.document)
    if (step.type == "report") {
      const currentTime = new Date().getTime();
      setOpenReportTime(currentTime); // Set the open time
      mp.track("stock_report_clicked", {
        page: "StockPicksDetail_Page",
        report_details: step,
      });
      console.log("LINK ", step.document)
      window.open(step?.document, "_blank");
      setReportDetail(step); // Set the PDF URL
      // setReportOpen(true); // Open the modal
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
    // setReportOpen(false);
    setReportDetail(null); // Set the PDF URL
  };

  // Function to format date
  const formatDate = (dateString) => {
    // Convert the input date string to a Date object
    const date = new Date(dateString);

    // Define an array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Get the day, month, and year from the Date object
    const day = date.getDate().toString().padStart(2,"0") 
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year

    // Format the date in '12 Jun 23' format
    return `${day} ${month} ${year}`;
  };
  // const handleLoadMore = () => {
  //   setVisibleSteps((prev) => prev + 2);
  // };

  // useEffect(()=>{
  //   console.log("REPORT DETIAL",reportDetail)
  //   let report = document.querySelector("#report");
  //   const pdf = report ? report.contents().find('body') : null;
  //   // const embed = report.querySelector("embed")
  //   // console.log(report)
  //   // console.log(embed)
  //   if(pdf && pdf.querySelector('#password')){
  //     pdf.querySelector('#password').value = 'yourPassword';
  //     pdf.querySelector('#password')?.dispatchEvent(new Event('input'));
      
  //     // If there's a submit button, click it
  //     pdf.querySelector('#submit')?.click();
  //   }
   

  // },[reportDetail])
  
  return (
    <div className="flex flex-col justify-center pt-[30.8px] bg-white min-w-0 items-center" >
      {timeline.map((step, index) => (
        <div className=" relative grid grid-cols-[minmax(70px,.1fr)_10px_1fr] md:grid-cols-[26px_1fr] lg:grid-cols-[74px_10px_1fr] w-full min-w-0" key={index} >
          {/* Date component for large screen */}
          <Box textAlign={"left"} className="block justify-self-start pr-[21px] lg:justify-self-start lg:pr-0 md:hidden lg:block " position="relative" top="0px">
            <Typography
              variant="body2"
              color="textSecondary"
              fontFamily="Open Sans"
              fontSize="12px"
              sx={{ whiteSpace: "nowrap", marginTop: "-2px !important" }}
            >
              {formatDate(step.type === "report" ? step.report_date : step.youtube_date)}
            </Typography>
          </Box>
          {/* Date component end */}
          
          <Box display="flex" flexDirection="column" alignItems="center" position="relative" >
          {/* Marker component */}
            <Box
              className=""
              sx={{
                width: "13px",
                height: "13px",
                borderRadius: "50%",
                backgroundColor: index === 0 ? "#ffff" : "#125B54",
                border: index === 0 ? "3px solid #17756C" : "3px solid #fff",
                position: "relative",
                zIndex: 1,
                // mb: "-6px",
                // mr: "-5px",
              }}
            />
            {index !== timeline.length - 1 && (
            <div className=" absolute w-[2px] h-full  bg-brand-300">{/*line*/}</div>
          )}
          </Box>
          {/* Marker component end */}
          <div className=" flex flex-col gap-y-1 w-full min-w-0 pl-[21px] md:pl-3 lg:pl-[21px]">
            <Box className="hidden md:block lg:hidden" textAlign={"left"} mr={2} position="relative" top="0px">
              <Typography
                variant="body2"
                color="textSecondary"
                fontFamily="Open Sans"
                fontSize="12px"
                sx={{ whiteSpace: "nowrap", marginTop: "-2px !important" }}
              >
                {formatDate(step.type === "report" ? step.report_date : step.youtube_date)}
              </Typography>
            </Box>
            <Box
              className=" -mt-4 max-md:max-w-fit md:mt-0 lg:-mt-4 "
              borderRadius="8px"
              bgcolor="#FCFCFD"
              // maxWidth={{ xs: "100%" }}
              width={"100%"}
              p={"8px"}
              mb={"28px"}              
              // mt={"4px"}
              position="relative"
              // top="-13px"
              border="1px solid white"
              boxShadow="0px 2px 6px 0px rgba(2, 15, 35, 0.06)" // Small shadow on the bottom side
            >
              <Typography
                className="flex flex-wrap  "
                variant="subtitle1"
                fontWeight="500 !important"
                // display="flex"
                // alignItems="center"
                width={"100%"}
                // minWidth={"155px"}
                color="#475467"
                marginTop="3px"
                fontFamily="Open Sans"
                fontSize="0.875rem"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  font: "500 !important",
                }}
              >
                {step.type == "report" ? step.report_action_text : "Video Released"}

                {index == 0 && step.type === "report" && (
                  <Box ml={1} px={1} py={0.5} borderRadius="9999px" bgcolor="#FFF6EE">
                    <Typography color="orange" fontFamily="Open Sans" fontSize="10px" fontWeight={700}>
                      Active
                    </Typography>
                  </Box>
                )}
              </Typography>

              {step.youtube_title && (
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="body2"
                    color="black"
                    fontWeight="bold"
                    fontSize="12px"
                    fontFamily="Open Sans"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {step.youtube_title}
                  </Typography>
                </Box>
              )}

              <Button
                className="  min-w-0 max-w-full"
                size="small"
                sx={{
              
                  mt: 1,
                  color: "#344054",
                  padding: "7px 14px 7px 12px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1px solid  #E4E7EC;",
                  textTransform: "none",
                  // minWidth: "0px",
                  // flexShrink: 0,
                  backgroundColor: "white",
                  fontFamily: "Open Sans",
                  // whiteSpace: "nowrap",
                  // overflow: "hidden",
                  fontSize: "12px",
                  // textOverflow: "ellipsis",
                  transition: "background-color 0.3s, color 0.3s, filter 0.3s, transform 0.3s",
                  "&:hover": {
                    backgroundColor: "#CBF3F0",
                    transform: "scale(0.95)", // Decrease size to 95% on hover
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
                <p className=" text-2xs font-medium truncate flex-1">{step.type == "report" ? step.report_name : "Watch Video"}</p>
              </Button>
            </Box>
          </div>
        </div>
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
            id="report"
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
    </div>
  );
}
