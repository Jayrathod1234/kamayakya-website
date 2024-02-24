import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Card,
  Divider,
  Text,
  Loading,
  Modal,
  Dropdown,
} from "@nextui-org/react";
import { ArrowCircleUp, DocumentText, Lock, Lock1 } from "iconsax-react";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  GET_ALL_SME_URL,
  GET_ALL_URL,
  GET_SPECIFIC_STOCK_URL,
  TRACK_RECORD_FOR_ALL,
  TRACK_RECORD_FOR_USER,
} from "../pages/api/URLs";
import {
  Box,
  Grid,
  Alert,
  IconButton,
  TextField,
  InputBase,
  SwipeableDrawer,
  List,
  ListItemButton,
  ListItemText,
  ListItem,
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  RadioGroup,
  Radio,
} from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import { AiOutlineFieldTime } from "react-icons/ai";
import { FaIndustry, FaRegArrowAltCircleUp } from "react-icons/fa";
import { MdOutlineLock, MdFilterList } from "react-icons/md";
import { BiChevronRight } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr";
import { useRouter } from "next/router";
import ReactCardFlip from "react-card-flip";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { DocumentAskPasswordEvent } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import packageJson from "../../package.json";
import AuthContext from "./AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import Login from "./Login";
import { SearchNormal, Filter } from "iconsax-react";
import Marquee from "react-fast-marquee";
import LoginForSubsribe from "./LoginForSubsribe";

const StockCardSME = () => {
  const router = useRouter();
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [flipStates, setFlipStates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReportUrl, setSelectedReportUrl] = useState("");
  const pdfjsVersion = packageJson.dependencies["pdfjs-dist"];
  const { isLoggedIn } = useContext(AuthContext);
  const { isSubscribed } = useContext(AuthContext);
  // console.log(pdfjsVersion);
  const [selectedStock, setSelectedStock] = useState(null);
  const [showReportsModal, setShowReportsModal] = useState(false);

  const staticNumbers = [93, 87, 87];
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [showSMENote, setShowSMENote] = useState(false);

  const [record, setRecord] = useState([]);

  const [showLoginModalForSubscribe, setShowLoginModalForSubscribe] =
    useState(false);

  const handleShowWhyModal = () => {
    setShowWhyModal(true);
  };

  const handleWhyModalClose = () => {
    setShowWhyModal(false);
  };

  const handleShowSMENoteForUser = () => {
    setShowSMENote(true);
  };

  const handleCloseSMENoteForUser = () => {
    setShowSMENote(false);
  };

  const handleOpenModal = (documentUrl) => {
    setSelectedReportUrl(documentUrl);
    // console.log(selectedReportUrl);
    setShowModal(true);
  };

  const handleOpenDisclosure = (stock) => {
    if (stock?.stock_disclosures?.length > 0) {
      const disclosureUrl = stock.stock_disclosures[0].document;
      window.open(`${disclosureUrl}#toolbar=0`, "_blank", "fullscreen=yes");
    } else {
      // If no disclosures available, open the dummy URL
      window.open(
        "https://6c20e9b8-4436-474a-a31f-665d7b41553d.usrfiles.com/ugd/6c20e9_b05424ae64794ddc84905b8a57e161a4.pdf#toolbar=0",
        "_blank",
        "fullscreen=yes"
      );
    }
  };

  const handleOpenReports = (stock) => {
    setSelectedStock(stock);
    // console.log(selectedStock);
    setShowReportsModal(true);
  };
  const handleCloseReports = () => {
    setSelectedStock(null);
    setShowReportsModal(false);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // const handleTrackRecord = async () => {
  //   try {
  //     const refreshToken = localStorage.getItem("refresh");
  //
  //     const url = isLoggedIn ? TRACK_RECORD_FOR_USER : TRACK_RECORD_FOR_ALL;
  //
  //     const headers = {
  //       "Content-Type": "application/json",
  //     };
  //
  //     if (isLoggedIn) {
  //       headers.Authorization = `token ${refreshToken}`;
  //     }
  //
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers,
  //     });
  //
  //     if (response.ok) {
  //       const data = await response.json();
  //       setRecord(data);
  //       console.log(data);
  //     } else {
  //       // Handle API call error
  //       console.error("Error Getting Track Records | Track Record Page");
  //     }
  //   } catch (error) {
  //     // Handle any other error
  //     console.error(error);
  //     // console.log("no call");
  //   }
  // };
  //
  // useEffect(() => {
  //   handleTrackRecord();
  // }, [isLoggedIn]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [showCert, setShowCert] = useState(false);

  const handleCert = () => {
    // setShowCert(true);
    var win = window.open(
      "Kamayakya-SEBI-License.pdf#toolbar=0&fitH=1",
      "_blank",
      "fullscreen=yes"
    );
    // win.document.write('<PdfViewer pdf={PDF}/>');
  };

  const handleCertClose = () => {
    setShowCert(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPDF("");
  };

  const handleCloseLoginModalForSubscribeNow = () => {
    setShowLoginModalForSubscribe(false);
  };

  const handleAskPassword = (e) => {
    e.verifyPassword("$420%69#kamayakya#69%420$");
  };

  const handleClick = (index) => {
    const newFlipStates = flipStates.map((state, i) =>
      i == index ? !state : false
    );
    setFlipStates(newFlipStates);
  };

  const [industries, setIndustries] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const handleIndustrySelection = (industry) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(
        selectedIndustries.filter((item) => item !== industry)
      );
    } else {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };
  const selectedValue = React.useMemo(
    () => Array.from(selectedIndustries).join(", ").replaceAll("_", " "),
    [selectedIndustries]
  );

  useEffect(() => {
    const uniqueIndustries = [
      ...new Set(stocks.map((stock) => stock.stock_industry)),
    ];
    setIndustries(uniqueIndustries);
  }, [filteredStocks]);

  // const [timeSort, setTimeSort] = useState(new Set([""]));
  const [timeSort, setTimeSort] = useState("");
  // const [upsideSort, setUpsideSort] = useState(new Set([""]));
  const [upsideSort, setUpsideSort] = useState("");
  const [selectedPDF, setSelectedPDF] = useState(new Set([selectedReportUrl]));

  const PdfValue = React.useMemo(
    () => Array.from(selectedPDF)[0] || "",
    [selectedPDF]
  );

  const timeSortValue = (event) => {
    setTimeSort(event.target.value);
    setUpsideSort("");
  };
  // React.useMemo(
  // 	() => Array.from(timeSort)[0]?.replaceAll("_", " ") || "",
  // 	[timeSort]
  // );

  const upsideSortValue = (event) => {
    setUpsideSort(event.target.value);
    setTimeSort("");
  };

  // React.useMemo(
  // 	() => Array.from(upsideSort)[0]?.replaceAll("_", " ") || "",
  // 	[upsideSort]
  // );

  useEffect(() => {
    // console.log(selectedIndustries);
    const filteredAndSortedStocks = stocks
      .filter((stock) => {
        let passTimeFilter = true;
        let passUpsideFilter = true;
        let passSearchFilter = true;

        if (timeSort === "ascending") {
          passTimeFilter = stock.time_left > 0;
        } else if (timeSort === "descending") {
          passTimeFilter = stock.time_left >= 0;
        }

        if (upsideSort === "ascending") {
          passUpsideFilter = stock.upside_left > 0;
        } else if (upsideSort === "descending") {
          passUpsideFilter = stock.upside_left >= 0;
        }

				if (searchQuery.trim() !== "") {
					// passSearchFilter =
					//   stock.stock_name
					//     .toLowerCase()
					//     .includes(searchQuery.toLowerCase()) ||
					//   stock.stock_symbol ? stock.stock_symbol.includes(searchQuery) : "";

					// const regex = new RegExp(searchQuery.toLowerCase()); // 'i' flag for case-insensitive search
					// passSearchFilter =
					// 	regex.test(stock.stock_name.toLowerCase()) || stock.stock_symbol ? regex.test(stock.stock_symbol?.toLowerCase()) : "";

          const lowercaseSearchQuery = searchQuery.toLowerCase();
          const lowercaseStockName = stock.stock_name.toLowerCase();
          const lowercaseStockSymbol = stock.stock_symbol
            ? stock.stock_symbol.toLowerCase()
            : null; // Ensure it's either a string in lowercase or null

          passSearchFilter =
            lowercaseStockName.includes(lowercaseSearchQuery) ||
            (lowercaseStockSymbol !== null &&
              lowercaseStockSymbol.includes(lowercaseSearchQuery));

					// console.log(searchQuery)
				}

        return passTimeFilter && passUpsideFilter && passSearchFilter;
      })
      .filter((stock) => {
        if (selectedValue.length === 0) {
          return true; // Include all stocks if no industries are selected
        } else {
          return selectedValue.includes(stock.stock_industry);
        }
      })
      .sort((stockA, stockB) => {
        if (timeSort === "ascending") {
          return stockA.time_left - stockB.time_left;
        } else if (timeSort === "descending") {
          return stockB.time_left - stockA.time_left;
        } else if (upsideSort === "ascending") {
          return stockA.upside_left - stockB.upside_left;
        } else if (upsideSort === "descending") {
          return stockB.upside_left - stockA.upside_left;
        }

        return 0;
      });
    // console.log(filteredAndSortedStocks);
    setFilteredStocks(filteredAndSortedStocks);
  }, [stocks, timeSort, upsideSort, searchQuery, selectedIndustries]);

  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (isLoggedIn === true) {
      setShowLoginModal(false);
    }
  }, [isLoggedIn]);
  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginOrSubForSubscribeNow = () => {
    if (isLoggedIn === true && isSubscribed === false) {
      const location = router.asPath;
      localStorage.setItem("location", location);
      router.push("/purchase");
    }
    if (isLoggedIn === true && isSubscribed === true) {
      router.push("/sme");
    }
    if (isLoggedIn === false) {
      setShowLoginModalForSubscribe(true);
    }
  };

  const handleFirstCard = () => {
    if (isLoggedIn) {
      const location = router.asPath;
      localStorage.setItem("location", location);
      router.push("/purchase");
    } else {
      handleLogin();
    }
  };

  const showAlert = () => {
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 10000);
  };

  useEffect(() => {
    if (error) {
      showAlert();
    }
  }, [error]);

	useEffect(() => {
		if (isLoggedIn) {
			const refresh = localStorage.getItem("refresh");
			setIsLoading(true);
			const fetchData = async () => {
				try {
					const response = await axios.get(GET_ALL_SME_URL, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `token ${refresh}`,
						},
					});
					setStocks(response.data);
					// console.log(response.data);
					setFlipStates(new Array(response.data.length).fill(false));
				} catch (error) {
					setError("Please Login First to see our stock picks!");
					showAlert();
				} finally {
					setIsLoading(false);
				}
			};
			fetchData();
		}
	}, [isLoggedIn]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const refresh = localStorage.getItem("refresh");
  //     setIsLoading(true);
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(GET_SPECIFIC_STOCK_URL, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `token ${refresh}`,
  //           },
  //         });
  //         setStocks(response.data);
  //         console.log(response.data);
  //         setFlipStates(new Array(response.data.length).fill(false));
  //       } catch (error) {
  //         setError("Please Login First to see our stock picks!");
  //         showAlert();
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [isLoggedIn]);

  const handleClearSelection = () => {
    setSelectedIndustries([]);
    setTimeSort("");
    setUpsideSort("");
  };

  return (
    <div
      style={{
        // maxWidth: "80rem",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        paddingBottom: 100,
        backgroundColor: "#fff",
        alignItems: "center",
        // backgroundImage: "url(coral_texture.svg)",
        objectPosition: "center",
        backgroundPositionY: "center",
        backgroundPositionX: "center",
        backgroundSize: "cover",
        backgroundRepeat: "none",
      }}
    >
      <Box
        sx={{
          width: "95%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
          paddingTop: "5vh",
          paddingBottom: "20px",
          "@media only screen and (max-width: 764px)": {
            // maxHeight: "100vh",
            marginTop: "0px",
            paddingTop: "0px",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingLeft: "5px",
            paddingRight: "5px",
            paddingBottom: "10px",
          },
        }}
      >
        <Box
          sx={{
            cursor: "pointer",
            // paddingLeft: "40px",
            // paddingRight: "40px",
            // paddingTop: "15px",
            // paddingBottom: "15px",
            padding: "0",
            // marginTop: "25px",
            display: "flex",
            flexDirection: "column",
            // backgroundImage: "linear-gradient(to top , #0d2c7b, #6067b5)",
            // backgroundImage: "linear-gradient(to top , #fff, #fff)",
            alignItems: "center",
            // backgroundImage: "linear-gradient(to top , #106052, #0f734d)",
            borderRadius: "1200.5px",
            "@media only screen and (max-width: 764px)": {
              paddingLeft: "5px",
              paddingRight: "5px",
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
              alignItems: "flex-start",
              backgroundImage: "linear-gradient(to top , #fff, #fff)",
            },
          }}
        >
          <Text
            b
            size={18}
            color="#FFF"
            css={{
              fontWeight: "bolder",
              color: "#021C61",
              "@media only screen and (max-width: 764px)": {
                fontSize: 18,
                width: "100%",
                textAlign: "left",
                color: "#021C61",
              },
            }}
            onClick={handleCert}
          >
            SEBI Registered: INH000009843
          </Text>
        </Box>
        <Modal
          // width="790px"
          blur
          open={showCert}
          onClose={handleCertClose}
          css={{
            width: "65vw",
            maxWidth: "65vw",
            alignSelf: "flex-end",
            background: "transparent",
            boxShadow: "none",
            borderRadius: "15px",
            "@media only screen and (max-width: 764px)": {
              width: "95vw !important",
              maxWidth: "95vw !important",
            },
          }}
        >
          <iframe
            src="Kamayakya-SEBI-License.pdf#view=FitH&toolbar=0"
            alt="SEBI Certificate"
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
          {/* <Modal.Footer justify="center"> */}
          <Button
            auto
            onClick={handleCertClose}
            css={{
              // alignSelf: "end",
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
          {/* </Modal.Footer> */}
        </Modal>
        <Text
          b
          size={70}
          css={{
            marginTop: "0px",
            marginBottom: "0px",
            // width: "90%",
            maxWidth: "80rem" /* 1280px */,
            textAlign: "center",
            lineHeight: 1.2,
            paddingLeft: "15px",
            paddingRight: "15px",
            "@media only screen and (max-width: 764px)": {
              fontSize: 45,
              lineHeight: 1.1,
              paddingLeft: "5px",
              paddingRight: "5px",
              marginTop: "0px",
              marginBottom: "10px",
              maxWidth: "100%",
              textAlign: "left",
            },
          }}
        >
          SME Corner
        </Text>
        <Text
          b
          size={18}
          css={{
            marginTop: 0,
            marginBottom: "10px",
            maxWidth: "50rem" /* 1280px */,
            textAlign: "center",
            color: "#000",
            lineHeight: 1.2,
            paddingLeft: "15px",
            paddingRight: "15px",
            "@media only screen and (max-width: 764px)": {
              fontSize: 20,
              maxWidth: "100%",
              paddingLeft: "5px",
              paddingRight: "5px",
              marginTop: "0px",
              marginBottom: "10px",
              textAlign: "left",
              color: "#000",
            },
          }}
        >
          Unlocking Potential, Fuelling Growth – Your One-Stop Resource for SME
          Success
        </Text>
      </Box>
      {isLoggedIn ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: "5px",
            marginBottom: "40px",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="stockPicks-searchBar-box"
        >
          {/* Search Bar */}
          <Box
            sx={{
              border: "1px solid #125a54",
              borderRadius: "10000px",
              padding: "0px 15px",
              paddingTop: "2px",
              display: "flex",
              alignItems: "center",
              // "@media only screen and (max-width: 768px)": {
              //   padding: "0px 15px",
              //   width: "500px",
              // },
            }}
            className="stockPicks-searchBar"
          >
            <IconButton>
              <SearchNormal size={25} color="#125a54" />
            </IconButton>
            <InputBase
              placeholder="Ion Exchange (OR) IONEXCHANG"
              variant="standard"
              // size="large"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: 18,
                lineHeight: 1,
                textAlign: "center",
                width: "80vw",
                maxWidth: "60rem",
                padding: "10px 10px",
                backgroundColor: "#fff",
                borderRadius: "10000px",
                "@media only screen and (max-width: 768px)": {
                  width: "100vw",
                  fontSize: 15,
                  backgroundColor: "transparent",
                },
              }}
            />
          </Box>

          <IconButton
            onClick={toggleDrawer}
            css={{
              width: "30px !important",
              maxWidth: "30px !important",
              backgroundColor: "red",
              "@media only screen and (max-width: 768px)": {
                width: "30px",
                maxWidth: "30px",
              },
            }}
          >
            <Filter size={25} color="#125a54" />
          </IconButton>
          {/* Side Drawer Filtering & Sorting */}
          <SwipeableDrawer
            anchor="right"
            open={isDrawerOpen}
            onOpen={() => setIsDrawerOpen(true)}
            onClose={toggleDrawer}
            sx={{
              width: {
                xs: "100vw",
                sm: "500px",
              },
              maxWidth: {
                xs: "100%",
                sm: "500px",
              },
              "& .MuiDrawer-paper": {
                borderRadius: { xs: "0px", sm: "25px 0px 0px 25px" },
                padding: "15px",
                width: {
                  xs: "100vw",
                  sm: "500px",
                },
                maxWidth: {
                  xs: "100%",
                  sm: "500px",
                },
              },
            }}
          >
            <List>
              <ListItemButton
                onClick={() => {
                  toggleDrawer();
                }}
                sx={{
                  justifyContent: "end",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                }}
              >
                <CloseIcon />
              </ListItemButton>
              {/*<Text b size={21} css={{ paddingLeft: "30px" }}>*/}
              {/*  Filter by industries :*/}
              {/*</Text>*/}
              <ListItem>
                <FormControl
                  sx={{ mt: "5px", ml: "15px" }}
                  component="fieldset"
                  variant="standard"
                >
                  <Text
                    b
                    size={19}
                    css={{ paddingLeft: "30px", marginBottom: "15px" }}
                  >
                    Filter by industries:
                  </Text>
                  <FormGroup>
                    {/* <Grid container spacing={2}> */}
                    {industries.map((industry, index) => (
                      // <Grid item xs={6} key={industry}>
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={selectedIndustries.includes(industry)}
                            onChange={() => handleIndustrySelection(industry)}
                          />
                        }
                        label={industry}
                      />
                      // </Grid>
                    ))}
                    {/* </Grid> */}
                  </FormGroup>
                  {/*<FormHelperText>Multiple Selection</FormHelperText>*/}
                </FormControl>
              </ListItem>
              {/* <ListItem sx={{ justifyContent: "center" }}>
								<Dropdown>
									<Dropdown.Button
										flat
										css={{
											// height: "70px",
											// marginLeft: "20px",
											width: "250px",
											backgroundColor: "#fff",
											borderRadius: "10000px",
											border: "2px solid #ffa12e",
											color: "#202020",
											fontSize: 16,
											"@media only screen and (max-width: 768px)": {
												width: "70%",
												"& span": {
													// display: "none",
												},
											},
										}}
									>
										<FaIndustry size={20} style={{ marginRight: "0px" }} />
										<span
											style={{
												marginLeft: "10px",
												"@media only screen and (maxWidth: 600px)": {
													marginLeft: "0px",
												},
											}}
										>
											Industries
										</span>
									</Dropdown.Button>
									<Dropdown.Menu
										selectionMode="multiple"
										selectedKeys={selectedIndustries}
										onSelectionChange={(keys) => setSelectedIndustries(keys)}
									>
										{industries.map((industry) => (
											<Dropdown.Item
												key={industry}
												onClick={() => handleIndustrySelection(industry)}
											>
												{industry}
											</Dropdown.Item>
										))}
									</Dropdown.Menu>
								</Dropdown>
							</ListItem> */}

              <Divider
                css={{
                  width: "50%",
                  height: "4px",
                  borderRadius: "1000px",
                  backgroundColor: "#FF9E24",
                  margin: "20px 25px 15px",
                }}
              />
              {/*<Text b size={21} css={{ paddingLeft: "30px" }}>*/}
              {/*  Sort by time left:*/}
              {/*</Text>*/}
              <ListItem>
                <FormControl sx={{ mt: "5px", ml: "15px" }}>
                  {/*<FormLabel*/}
                  {/*  id="demo-controlled-radio-buttons-group"*/}
                  {/*  style={{*/}
                  {/*    fontSize: "15px",*/}
                  {/*    fontWeight: "bold",*/}
                  {/*    color: "#106352",*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  Time left*/}
                  {/*</FormLabel>*/}
                  <Text b size={19} css={{ paddingLeft: "30px" }}>
                    Sort by time left:
                  </Text>
                  <RadioGroup value={timeSort} onChange={timeSortValue}>
                    <FormControlLabel
                      value="descending"
                      control={<Radio />}
                      label="Most Time Remaining (This means the stocks with the most time left are at the top)"
                      style={{ paddingTop: "20px" }}
                    />
                    <FormControlLabel
                      value="ascending"
                      control={<Radio />}
                      label="Least Time Remaining (This means the stocks with the least time left are at the top)"
                      style={{ paddingTop: "20px" }}
                    />
                  </RadioGroup>
                </FormControl>
              </ListItem>
              {/* <ListItem sx={{ justifyContent: "center" }}>
								<Dropdown>
									<Dropdown.Button
										flat
										css={{
											width: "250px",
											backgroundColor: "#fff",
											borderRadius: "10000px",
											border: "2px solid #ffa12e",
											color: "#202020",
											fontSize: 16,
											"@media only screen and (max-width: 768px)": {
												width: "70%",
												"& span": {
													// display: "none",
												},
											},
										}}
									>
										<AiOutlineFieldTime
											size={22}
											style={{ marginRight: "0px" }}
										/>
										<span
											style={{
												marginLeft: "10px",
												"@media only screen and (max-width: 768px)": {
													marginLeft: "0px",
												},
											}}
										>
											Time Left
										</span>
									</Dropdown.Button>
									<Dropdown.Menu
										aria-label="TimeActions"
										selectionMode="single"
										selectedKeys={timeSort}
										onSelectionChange={(key) => setTimeSort(key)}
									>
										<Dropdown.Item key="ascending">
											Earliest First
										</Dropdown.Item>
										<Dropdown.Item key="descending">Latest First</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</ListItem> */}
              <ListItem>
                <FormControl sx={{ ml: "15px" }}>
                  {/*<FormLabel*/}
                  {/*  id="controlled-radio-buttons"*/}
                  {/*  style={{*/}
                  {/*    fontSize: "15px",*/}
                  {/*    fontWeight: "bold",*/}
                  {/*    color: "#106352",*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  Potential upside*/}
                  {/*</FormLabel>*/}
                  <Text b size={19} css={{ paddingLeft: "30px" }}>
                    Sort by potential upside:
                  </Text>
                  <RadioGroup value={upsideSort} onChange={upsideSortValue}>
                    <FormControlLabel
                      value="descending"
                      control={<Radio />}
                      label="Highest to Lowest (This means the stocks with the greatest potential upside are at the top)"
                      style={{ paddingTop: "20px" }}
                    />
                    <FormControlLabel
                      value="ascending"
                      control={<Radio />}
                      label="Lowest to Highest (This means the stocks with the least potential upside are at the top)"
                      style={{ paddingTop: "20px" }}
                    />
                  </RadioGroup>

                  {/* {upsideSort !== "" && (
										<Button variant="contained" onClick={handleClearSelection}>
											Clear Selection
										</Button>
									)}
									{selectedIndustries.length > 0 && (
										<Button variant="contained" onClick={handleClearSelection}>
											Clear Selection
										</Button>
									)}
									{timeSort !== "" && (
										<Button variant="contained" onClick={handleClearSelection}>
											Clear Selection
										</Button>
									)} */}
                </FormControl>
              </ListItem>
              <ListItem sx={{ justifyContent: "center" }}>
                {upsideSort !== "" ||
                selectedIndustries.length > 0 ||
                timeSort !== "" ? (
                  <Button
                    auto
                    onPress={handleClearSelection}
                    css={{
                      background: "#ffa12e",
                      fontSize: 17,
                      width: "100%",
                      borderRadius: "10000px",
                      marginTop: "20px",
                    }}
                  >
                    Clear Selection
                  </Button>
                ) : null}
              </ListItem>
              {/* <ListItem sx={{ justifyContent: "center" }}>
								<Dropdown>
									<Dropdown.Button
										flat
										css={{
											width: "250px",
											backgroundColor: "#fff",
											borderRadius: "10000px",
											border: "2px solid #ffa12e",
											color: "#202020",
											fontSize: 16,
											"@media only screen and (max-width: 768px)": {
												width: "70%",
												"& span": {
													// display: "none",
												},
											},
										}}
									>
										<Filter size={20} />
										<span
											style={{
												marginLeft: "10px",
												"@media only screen and (max-width: 768px)": {
													marginLeft: "0px",
												},
											}}
										>
											Upside Left
										</span>
									</Dropdown.Button>
									<Dropdown.Menu
										aria-label="UpsideActions"
										selectionMode="single"
										selectedKeys={upsideSort}
										onSelectionChange={setUpsideSort}
									>
										<Dropdown.Item key="ascending">
											Lowest to Highest
										</Dropdown.Item>
										<Dropdown.Item key="descending">
											Highest To Lowest
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</ListItem> */}
            </List>
          </SwipeableDrawer>
        </Box>
      ) : (
        <></>
      )}
      {isLoading && (
        <Loading type={"gradient"} style={{ marginBottom: "50px" }} />
      )}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid
          container
          justifyContent={"center"}
          gap={"20px"}
          sx={{
            // background: "#fff",
            boxShadow: "none",
            "@media only screen and (max-width: 768px)": {
              gap: "20px",
            },
          }}
        >
          {filteredStocks.map((stock, index) => (
            <Grid
              key={stock.id}
              item
              xs={"auto"}
              sm={"auto"}
              md={"auto"}
              lg={"auto"}
            >
              {/* <ReactCardFlip
                isFlipped={flipStates[index]}
                flipDirection="horizontal"
              > */}
              {/* Front face */}
              <Card
                isHoverable
                css={{
                  // height: "630px",
                  width: "285px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  borderRadius: "40px",
                  border: "4px solid",
                  borderColor: "#ffa12e",
                  marginBottom: "0px",
                  boxShadow: "none",
                  filter: "none",
                  "@media only screen and (max-width: 768px)": {
                    width: "92.5vw",
                    maxWidth: "620px",
                    // height: "690px",
                    borderRadius: "35px",
                  },
                }}
              >
                <Box
                  sx={{
                    marginLeft: "5%",
                    marginRight: "5%",
                    marginTop: "20px",
                    marginBottom: "20px",
                    minWidth: "90%",
                    maxWidth: "90%",
                    // height: "600px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "@media only screen and (max-width: 768px)": {
                      marginLeft: "5px",
                      marginRight: "5px",
                    //   height: "auto",
                      marginBottom: "30px",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                      backgroundColor: "#fff",
                      marginBottom: "15px",
                      width: "90%",
                      "@media only screen and (max-width: 768px)": {
                        width: "100%",
                      },
                    }}
                  >
                      <div className="cr cr-top cr-right cr-sticky cr-subscription">
                          {/*{stock.action === "SELL" ? "SELL" : ""}*/}
                          {/*{stock.action === "BUY" ? "BUY" : ""}*/}
                          {/*{stock.action === "HOLD" ? "HOLD" : ""}*/}
                          {stock.action === "SELL" ? "SELL" : stock.action === "BUY" ? "BUY" : stock.action === "HOLD" ? "HOLD" : ""}
                      </div>
                    {/*<div className="sme sme-top sme-right sme-sticky sme-subscription">*/}
                    {/*  SME*/}
                    {/*</div>*/}
                    <Box
                      sx={{
                        width: "100%",
                        height: "30px",
                        paddingTop: "7.5px",
                        paddingBottom: "7.5px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                        backgroundImage:
                          "linear-gradient(to top , #FF9D28, #ffa736)",
                        marginBottom: "15px",
                        marginTop: "5px",
                        borderRadius: "10000px",
                        lineHeight: 1,
                      }}
                      className="stockCardMobile-industry"
                    >
                      <Text
                        b
                        size={14}
                        color="Black"
                        css={{
                          lineHeight: 1.2,
                          "@media only screen and (max-width: 768px)": {
                            fontSize: "16px",
                          },
                        }}
                      >
                        {stock.stock_industry.length > 29 ? (
                          <Marquee
                            delay={2}
                            speed={30}
                            style={{ marginRight: "20px" }}
                          >
                            <span style={{ paddingRight: "20px" }}>
                              {stock.stock_industry}
                            </span>
                          </Marquee>
                        ) : (
                          <>{stock.stock_industry}</> || <Loading /> || "-"
                        )}
                      </Text>
                    </Box>
                    <Text
                      b
                      size={26}
                      css={{
                        minWidth: "100%",
                        maxWidth: "100%",
                        textAlign: "center",
                        lineHeight: 1.2,
                        "@media only screen and (max-width: 768px)": {
                          fontSize: 25,
                          paddingTop: "5px",
                          paddingBottom: "5px",
                        },
                      }}
                    >
                      {stock.stock_name.length > 18 ? (
                        <Marquee
                          delay={2}
                          speed={30}
                          style={{ marginRight: "20px" }}
                        >
                          <span style={{ paddingRight: "40px" }}>
                            {stock.stock_name}
                          </span>
                        </Marquee>
                      ) : (
                        <>{stock.stock_name}</>
                      )}
                    </Text>
                  </Box>
                  <Box
                    sx={{
                      width: "90%",
                      backgroundImage:
                        "linear-gradient(to top , #106052, #0f734d)",
                      borderRadius: "17.5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingTop: "20px",
                      paddingBottom: "20px",
                      "@media only screen and (max-width: 768px)": {
                        width: "100%",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                      },
                    }}
                  >
                    <Text
                      b
                      size={20}
                      color="#fff"
                      css={{
                        lineHeight: 1.5,
                        "@media only screen and (max-width: 768px)": {
                          fontSize: 19,
                        },
                      }}
                    >
                      Upside Left
                    </Text>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ArrowCircleUp size={25} color="#fff" />
                      <Text
                        b
                        size={48}
                        color="#fff"
                        css={{
                          lineHeight: 1,
                          marginLeft: "3px",
                          marginRight: "3px",
                          "@media only screen and (max-width: 768px)": {
                            fontSize: 60,
                          },
                        }}
                      >
                        {`${Math.ceil(stock.upside_left)}` || <Loading /> ||
                          "-"}
                      </Text>
                      <span
                        style={{
                          fontSize: 25,
                          color: "#FFF",
                          "@media only screen and (max-width: 768px)": {
                            fontSize: 10,
                          },
                        }}
                      >
                        %
                      </span>
                    </div>
                  </Box>
                  <Box
                    sx={{
                      mt: "20px",
                      width: "90%",
                      "@media only screen and (max-width: 768px)": {
                        width: "100%",
                      },
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {/*<div style={{ display: "flex", flexDirection: "column" }}>*/}
                      {/*  <Text*/}
                      {/*    b*/}
                      {/*    css={{*/}
                      {/*      lineHeight: 1.1,*/}
                      {/*      "@media only screen and (max-width: 768px)": {*/}
                      {/*        fontSize: 21,*/}
                      {/*      },*/}
                      {/*    }}*/}
                      {/*    size={15}*/}
                      {/*  >*/}
                      {/*    MKT. CAP.*/}
                      {/*  </Text>*/}
                      {/*  <Text*/}
                      {/*    b*/}
                      {/*    size={15}*/}
                      {/*    css={{*/}
                      {/*      lineHeight: 1.1,*/}
                      {/*      "@media only screen and (max-width: 768px)": {*/}
                      {/*        fontSize: 15,*/}
                      {/*      },*/}
                      {/*    }}*/}
                      {/*  >*/}
                      {/*    (IN Cr.)*/}
                      {/*  </Text>*/}
                      {/*</div>*/}
                      {/*<Text*/}
                      {/*  b*/}
                      {/*  css={{*/}
                      {/*    flex: 1,*/}
                      {/*    textAlign: "right",*/}
                      {/*    "@media only screen and (max-width: 768px)": {*/}
                      {/*      fontSize: 30,*/}
                      {/*    },*/}
                      {/*  }}*/}
                      {/*  size={22}*/}
                      {/*>*/}
                      {/*  {`${stock.market_cap}` || <Loading /> || "-"}*/}
                      {/*</Text>*/}
                    </div>
                    {/*<Divider*/}
                    {/*  height={2}*/}
                    {/*  style={{*/}
                    {/*    backgroundColor: "#ffa12e",*/}
                    {/*    marginTop: "10px",*/}
                    {/*    marginBottom: "10px",*/}
                    {/*  }}*/}
                    {/*/>*/}
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Text
                            b
                            css={{
                              lineHeight: 1.1,
                              "@media only screen and (max-width: 768px)": {
                                fontSize: 21,
                              },
                            }}
                            size={15}
                          >
                            MKT. CAP.
                          </Text>
                          <Text
                            b
                            size={15}
                            css={{
                              lineHeight: 1.1,
                              "@media only screen and (max-width: 768px)": {
                                fontSize: 15,
                              },
                            }}
                          >
                            (IN Cr.)
                          </Text>
                        </div>
                        <Text
                          b
                          css={{
                            flex: 1,
                            textAlign: "right",
                            "@media only screen and (max-width: 768px)": {
                              fontSize: 30,
                            },
                          }}
                          size={22}
                        >
                          {`${stock.market_cap}` || <Loading /> || "-"}
                        </Text>
                      </div>
                      <Divider
                        height={2}
                        style={{
                          backgroundColor: "#ffa12e",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Text
                            b
                            css={{
                              lineHeight: 1.1,
                              "@media only screen and (max-width: 768px)": {
                                fontSize: 21,
                              },
                            }}
                            size={15}
                          >
                            ENTRY PRICE
                          </Text>
                          <Text
                            b
                            size={15}
                            css={{
                              lineHeight: 1.1,
                              "@media only screen and (max-width: 768px)": {
                                fontSize: 15,
                              },
                            }}
                          >
                            (IN ₹)
                          </Text>
                        </div>
                        <Text
                          b
                          css={{
                            flex: 1,
                            textAlign: "right",
                            "@media only screen and (max-width: 768px)": {
                              fontSize: 30,
                            },
                          }}
                          size={22}
                        >
                          {`${stock.entry_price}` || <Loading /> || "-"}
                        </Text>
                      </div>
                      <Divider
                        height={2}
                        style={{
                          backgroundColor: "#ffa12e",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Text
                            b
                            css={{
                              lineHeight: 1.1,
                              "@media only screen and (max-width: 768px)": {
                                fontSize: 21,
                              },
                            }}
                            size={15}
                          >
                            CMP
                          </Text>
                          <Text
                            b
                            size={15}
                            css={{
                              lineHeight: 1.1,
                              "@media only screen and (max-width: 768px)": {
                                fontSize: 15,
                              },
                            }}
                          >
                            (in ₹)
                          </Text>
                        </div>
                        <Text
                          b
                          css={{
                            flex: 1,
                            textAlign: "right",
                            "@media only screen and (max-width: 768px)": {
                              fontSize: 30,
                            },
                          }}
                          size={22}
                        >
                          {`${stock.live_price}` || <Loading /> || "-"}
                        </Text>
                      </div>
                      <Divider
                        height={2}
                        style={{
                          backgroundColor: "#ffa12e",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Text
                            b
                            css={{
                              lineHeight: 1.1,
                              "@media only screen and (max-width: 768px)": {
                                fontSize: 21,
                              },
                            }}
                            size={15}
                          >
                            TARGET PRICE
                          </Text>
                          <Text
                            b
                            size={15}
                            css={{
                              lineHeight: 1.1,
                              "@media only screen and (max-width: 768px)": {
                                fontSize: 15,
                              },
                            }}
                          >
                            (IN ₹)
                          </Text>
                        </div>
                        <Text
                          b
                          css={{
                            flex: 1,
                            textAlign: "right",
                            "@media only screen and (max-width: 768px)": {
                              fontSize: 30,
                            },
                          }}
                          size={22}
                        >
                            {/* {stock.stock_targets.length > 0
														? `${
																stock.stock_targets[
																	stock.stock_targets.length - 1
																].target_price
														  }`
														: `${stock.target_price}`} */}
                            {stock.latest_target_price}
                            {/* {console.log(stock.latest_target_price)} */}
                        </Text>
                      </div>
                      <Divider
                        height={2}
                        style={{
                          backgroundColor: "#ffa12e",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                      />

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Text
                            b
                            css={{
                              lineHeight: 1.1,
                              "@media only screen and (max-width: 768px)": {
                                fontSize: 21,
                              },
                            }}
                            size={15}
                          >
                            TIME LEFT
                          </Text>
                          <Text
                            b
                            size={15}
                            css={{
                              lineHeight: 1.1,
                              "@media only screen and (max-width: 768px)": {
                                fontSize: 15,
                              },
                            }}
                          >
                            (IN DAYS)
                          </Text>
                        </div>
                        <Text
                          b
                          css={{
                            flex: 1,
                            textAlign: "right",
                            "@media only screen and (max-width: 768px)": {
                              fontSize: 30,
                            },
                          }}
                          size={22}
                        >
                          {`${Math.ceil(stock.time_left)}` || <Loading /> ||
                            "-"}
                        </Text>
                      </div>
                    </div>
                  </Box>

                  <Modal
                    open={showSMENote}
                    onClose={handleCloseSMENoteForUser}
                    css={{
                      justifyContent: "center",
                      background: "transparent",
                      alignItems: "center",
                      boxShadow: "none",
                    }}
                  >
                    <Card
                      css={{
                        padding: "50px 50px",
                        width: "550px",
                        "@media only screen and (max-width: 768px)": {
                          width: "95%",
                        },
                      }}
                    >
                      <IconButton
                        sx={{ position: "absolute", top: "5px", right: "5px" }}
                        onClick={handleCloseSMENoteForUser}
                      >
                        <CloseIcon color="error" />
                      </IconButton>
                      <Text b size={21} css={{ textAlign: "start" }}>
                        Note:
                      </Text>
                      <br />
                      <Text
                        b
                        css={{
                          lineHeight: 1.2,
                          textAlign: "start",
                          fontSize: "17.5px",
                        }}
                      >
                        SME shares can be traded on the stock exchanges via your
                        stock broker in a similar way as the mainboard shares
                        are traded.
                        <br />
                        <br />
                        A few of the differences are:
                        <br />
                        <br />
                        1. SME shares can be traded only on the exchanges where
                        they are listed i.e. BSE or NSE.
                        <br />
                        <br />
                        2. Lot-Based Investing: SME shares are traded in lots
                        instead of any numbers. For example:
                        <br />
                        <span style={{ marginLeft: "20px", display: "block" }}>
                          • Mainboard share of Reliance Industries Ltd. can be
                          traded in a minimum quantity of 1 share.
                        </span>
                        <span
                          style={{
                            marginLeft: "20px",
                            display: "block",
                          }}
                        >
                          • SME share of Timescan Logistics is traded in the lot
                          size of 2000 shares. This means you can buy/sell a
                          minimum of 2000 shares in one order.
                        </span>
                        <br />
                        3. Higher Volatility: SME stocks are generally more
                        volatile compared to mainboard stocks. This elevated
                        volatility translates into higher risk, but also higher
                        potential returns.
                        <br />
                        <br />
                        4. Limited Liquidity: Due to the lot-size requirement,
                        liquidity can be relatively lower for SME shares.
                        However, liquidity generally improves once the company
                        graduates to the mainboard.
                        <br />
                        <br />
                        Understanding these nuances can help you make
                        well-informed decisions when it comes to investing in
                        SME shares. As always, due diligence and proper risk
                        assessment are strongly advised.
                        <br />
                        <br />
                      </Text>
                    </Card>
                  </Modal>
                </Box>

                <Box
                  sx={{
                    bottom: "5px",
                    width: "85%",
                    marginBottom: "25px",
                    "@media only screen and (max-width: 768px)": {
                      width: "90%",
                    //   height: "50px",
                      justifyContent: "center",
                    },
                  }}
                >
                    <Button
                        auto
                        onPress={() => handleShowSMENoteForUser()}
                        css={{
                            // top: "40px",
                            // marginTop: "10%",
                            marginBottom: "5px",
                            color: "white",
                            width: "100%",
                            borderRadius: "10000px",
                            // backgroundColor: "#fff",
                            padding: "20px",
                            // backgroundImage:
                            //   "linear-gradient(to top , #106052, #0f734d)",
                            backgroundColor: "#041C61",
                            fontSize: 18,
                            height: "20px",
                            "@media only screen and (max-width: 768px)": {
                                // top: "20px",
                                lineHeight: 1,
                                height: "20px",
                                fontSize: 18,
                                width: "100%",
                            },
                        }}
                    >
                        SME - Note
                    </Button>
                  <Button
                    auto
                    onPress={() => handleOpenReports(stock)}
                    css={{
                      top: "0px",
                      alignSelf: "center",
                      width: "100%",
                      borderRadius: "10000px",
                      backgroundImage:
                        "linear-gradient(to top , #FF9D28, #ffa736)",
                      fontSize: 18,
                      "@media only screen and (max-width: 768px)": {
                        fontSize: 18,
                        lineHeight: 1,
                        height: "40px",
                        color: "black",
                      },
                    }}
                  >
                    View reports
                  </Button>
                  <Button
                    auto
                    onPress={() => handleOpenDisclosure(stock)}
                    css={{
                      top: "10px",
                      // marginTop: "10%",
                      color: "#106052",
                      width: "100%",
                      borderRadius: "10000px",
                      backgroundColor: "#fff",
                      // backgroundImage:
                      //   "linear-gradient(to top , #106052, #0f734d)",
                      fontSize: 15,
                      height: "20px",
                      "@media only screen and (max-width: 768px)": {
                        top: "10px",
                        lineHeight: 1,
                        height: "20px",
                        fontSize: 15,
                      },
                    }}
                  >
                    Disclosure
                  </Button>
                </Box>
              </Card>
              <Modal
                // blur
                open={showReportsModal}
                onClose={handleCloseReports}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                css={{
                  width: "100%",
                  borderRadius: "15px",
                  background: "transparent",
                  boxShadow: "none",
                  // backdropFilter: "blur(8px)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="iframePdfMobile"
              >
                <Card
                  css={{
                    height: "fit-content",
                    width: "fit-content",
                    maxWidth: "80rem",
                    minWidth: "100%",
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
                      minWidth: "100px",
                      width: "100vw !important",
                    },
                  }}
                >
                  <IconButton
                    sx={{ position: "absolute", top: "5px", right: "5px" }}
                    onClick={handleCloseReports}
                  >
                    <CloseIcon color="error" />
                  </IconButton>
                  <Box
                    sx={{
                      width: "100%",
                      // height: "350px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <Text b size={27}>
                      {selectedStock?.stock_name}
                    </Text>

                    {selectedStock?.stock_reports?.length > 0 ? (
                      selectedStock.stock_reports.map((report) => (
                        <div key={report.report_name} style={{}}>
                          <IconButton
                            key={report.report_name}
                            onClick={() =>
                              window.open(
                                `${report.document}#view=FitH&toolbar=0`,
                                "_blank",
                                "fullscreen=yes"
                              )
                            }
                            // onClick={() => handleOpenModal(report.document)}
                            sx={{
                              "&:hover": { background: "#fff" },
                              borderRadius: "0px",
                              paddingLeft: "0px",
                            }}
                          >
                            <DocumentText size={25} />
                            <Text
                              b
                              size={21}
                              css={{
                                marginLeft: "5px",
                                alignSelf: "start",
                                lineHeight: 1.5,
                              }}
                            >
                              {report.report_name}
                            </Text>
                          </IconButton>
                        </div>
                      ))
                    ) : (
                      <Text
                        b
                        size={20}
                        css={{
                          // position: "absolute",
                          paddingTop: "50px",
                          paddingBottom: "50px",
                          // left: "22.5%",
                        }}
                      >
                        No Reports Available!
                      </Text>
                    )}
                  </Box>
                </Card>
                {/* <Button
									flat
									onPress={handleCloseReports}
									css={{
										alignSelf: "center",
										// width: "100%",
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
								</Button> */}
              </Modal>
              <Modal
                // blur
                open={showModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                css={{
                  height: "95vh",
                  borderRadius: "15px",
                  background: "transparent",
                  boxShadow: "none",
                  alignSelf: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  // backdropFilter: "blur(8px)",
                }}
                className="iframePdfMobile"
              >
                <Worker
                  // workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`}
                  workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
                >
                  <Box
                    sx={{
                      height: "75vh",
                      borderRadius: "15px",
                    }}
                  >
                    {/* {console.log(PdfValue)} */}
                    <Viewer
                      fileUrl={`${
                        PdfValue ? PdfValue : selectedReportUrl
                      }#view=FitH&toolbar=0`}
                      onDocumentAskPassword={handleAskPassword}
                    />
                  </Box>
                </Worker>
                <Button
                  flat
                  onPress={handleCloseModal}
                  css={{
                    alignSelf: "center",
                    // width: "100%",
                    backgroundColor: "#ffa12e",
                    color: "#fff",
                    fontSize: 19,
                    marginTop: "20px",
                    borderRadius: "10px",
                    height: "50px",
                    width: "100%",
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
            </Grid>
          ))}
          {!isLoggedIn || !isSubscribed ? (
            <Grid>
              <Card
                isHoverable
                css={{
                  height: "575px",
                  width: "285px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "35px",
                  background: "#fff",
                  filter: "none",
                  justifyContent: "center",
                  paddingTop: "50px",
                  paddingBottom: "50px",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  backgroundImage:
                    "linear-gradient(to top , #105B54, #0F734D, #0F734D)",
                }}
                className="stocksPage-subscribe-mobile"
              >
                <div className="cr cr-top cr-right cr-sticky cr-subscription">
                  VIP+
                </div>
                <img
                  src="kamayakya-logo-white-vip.png"
                  style={{ marginTop: "5px", width: "75%" }}
                  alt="kamayakya"
                />

                <Divider
                  css={{
                    background: "#fff",
                    opacity: "0.5",
                    width: "30px",
                    height: "3px",
                    marginTop: "20px",
                  }}
                />

                <Box
                  sx={{
                    width: "100%",
                    alignSelf: "start",
                    marginTop: "20px",
                    marginBottom: "10px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      marginRight: "10px",
                      color: "#fff",
                      fontSize: 20,
                      alignSelf: "start",
                      marginTop: "5px",
                      opacity: 0.9,
                    }}
                  />
                  <Text
                    b
                    color="#fff"
                    size={20}
                    css={{ lineHeight: 1.2, opacity: 0.9 }}
                  >
                    2-4 individual stock picks every month
                  </Text>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    alignSelf: "start",
                    marginBottom: "10px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      marginRight: "10px",
                      color: "#fff",
                      fontSize: 20,
                      alignSelf: "start",
                      marginTop: "5px",
                      opacity: 0.9,
                    }}
                  />
                  <Text
                    b
                    color="#fff"
                    size={20}
                    css={{ lineHeight: 1.2, opacity: 0.9 }}
                  >
                    NSE + BSE + SME stock picks
                  </Text>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    alignSelf: "start",
                    // marginTop: "20px",
                    marginBottom: "10px",
                    // marginLeft: "5%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      marginRight: "10px",
                      color: "#fff",
                      fontSize: 20,
                      alignSelf: "start",
                      marginTop: "5px",
                      opacity: 0.9,
                    }}
                  />
                  <Text
                    b
                    color="#fff"
                    size={20}
                    css={{ lineHeight: 1.2, opacity: 0.9 }}
                  >
                    WhatsApp & Email updates
                  </Text>
                </Box>
                <Divider
                  css={{
                    background: "#fff",
                    opacity: "0.5",
                    width: "30px",
                    height: "3px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                />
                <Button
                  // variant="contained"
                  css={{
                    width: "75%",
                    background: "linear-gradient(to top , #fb7716,#fe9807)",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    borderRadius: "10000px",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundImage:
                        "linear-gradient(to top , #FF9D28, #ffa736)",
                    },
                  }}
                  onClick={handleLoginOrSubForSubscribeNow}
                >
                  <Text b color="#FFF" size={18}>
                    Subscribe Now
                  </Text>
                </Button>
                <Modal
                  width="450px"
                  open={showLoginModalForSubscribe}
                  onClose={handleCloseLoginModalForSubscribeNow}
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
                      onClick={() => handleCloseLoginModalForSubscribeNow()}
                    >
                      <CloseIcon sx={{ color: "#e81123" }} />
                    </IconButton>
                  </Box>

                  <Modal.Body>
                    <LoginForSubsribe />
                  </Modal.Body>
                </Modal>

                <Text
                  b
                  size={20}
                  color="#fff"
                  css={{
                    textAlign: "center",
                    marginTop: "10px",
                    "@media only screen and (max-width: 768px)": {
                      fontSize: "20px",
                    },
                  }}
                >
                  for ₹
                  <span
                    style={{ color: "#fff", fontSize: 30, lineHeight: 1.2 }}
                  >
                    15,000/year
                  </span>
                </Text>

                <Text
                  b
                  size={18}
                  color="#FFF"
                  css={{ mt: "0px", opacity: 0.75, lineHeight: 1 }}
                >
                  inclusive of taxes
                </Text>
                <Text
                  b
                  size={14}
                  color="#fff"
                  css={{
                    textDecoration: "underline",
                    position: "absolute",
                    bottom: "35px",
                    cursor: "pointer",
                    // mt: "10px",
                    lineHeight: 1,
                    opacity: 1,
                    "@media only screen and (max-width: 768px)": {
                      marginTop: "20px",
                      marginBottom: "20px",
                      bottom: "0px",
                    },
                  }}
                  onClick={handleShowWhyModal}
                >
                  Why do we charge annually?
                </Text>
                <Modal
                  open={showWhyModal}
                  onClose={handleWhyModalClose}
                  css={{
                    justifyContent: "center",
                    background: "transparent",
                    alignItems: "center",
                    boxShadow: "none",
                  }}
                >
                  <Card
                    css={{
                      padding: "50px 50px",
                      width: "550px",
                      "@media only screen and (max-width: 768px)": {
                        width: "95%",
                      },
                    }}
                  >
                    <IconButton
                      sx={{ position: "absolute", top: "5px", right: "5px" }}
                      onClick={handleWhyModalClose}
                    >
                      <CloseIcon color="error" />
                    </IconButton>
                    <Text b size={21} css={{ textAlign: "start" }}>
                      Why do we charge annually?
                    </Text>
                    <br />
                    <Text b css={{ lineHeight: 1.2, textAlign: "start" }}>
                      We understand that effective investing requires time and
                      patience, which is why we exclusively offer an annual
                      plan. Our strategy reflects our ethos that long-term
                      commitment is key to unlocking the true potential of
                      your investments.
                    </Text>
                  </Card>
                </Modal>
              </Card>
              <Modal
                blur
                width="450px"
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
            </Grid>
          ) : (
            ""
          )}
          {/* {stocks.length <= 3 && stocks.map((stock) => ( */}
          {/* {stocks.length <= 3 &&
					Array.from({ length: 4 }).map((_, index) => ( */}
          {!isLoggedIn || !isSubscribed
            ? staticNumbers.map((number, index) => (
                <Grid
                  // key={stock.id}
                  key={index}
                  item
                  xs={"auto"}
                  sm={"auto"}
                  md={"auto"}
                  lg={"auto"}
                  style={{ alignItems: "center" }}
                >
                  <Card
                    variant="flat"
                    css={{
                      height: "575px",
                      width: "285px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      borderRadius: "40px",
                      border: "4px solid",
                      borderColor: "#ffa12e",
                      marginBottom: "20px",
                      boxShadow: "none",
                      filter: "none",
                      "@media only screen and (max-width: 768px)": {
                        width: "95vw",
                        maxWidth: "620px",
                        height: "auto",
                        borderRadius: "35px",
                        border: "4px solid",
                        borderColor: "#ffa12e",
                        paddingBottom: "30px",
                        marginBottom: "0px",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        marginLeft: "5%",
                        marginRight: "5%",
                        marginTop: "20px",
                        marginBottom: "20px",
                        width: "90%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          marginTop: "5px",
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "center",
                          backgroundColor: "#fff",
                          marginBottom: "15px",
                          width: "90%",
                          "@media only screen and (max-width: 768px)": {
                            width: "100%",
                          },
                        }}
                      >
                        <div
                          className="cr cr-top cr-right cr-sticky cr-subscription"
                          style={{ zIndex: 10 }}
                        >
                          SME
                        </div>
                        <Box
                          sx={{
                            zIndex: 0,
                            width: "100%",
                            paddingTop: "7.5px",
                            paddingBottom: "7.5px",
                            paddingLeft: "5px",
                            paddingRight: "5px",
                            backgroundImage:
                              "linear-gradient(to top , #FF9D28, #ffa736)",
                            marginBottom: "15px",
                            marginTop: "5px",
                            borderRadius: "10000px",
                            lineHeight: 1,
                          }}
                        >
                          <Text
                            b
                            size={14}
                            color="Black"
                            css={{ lineHeight: 1 }}
                          >
                            {/* {stock.stock_industry} */}
                            {`<Industry>`}
                          </Text>
                        </Box>
                        <Text
                          b
                          size={26}
                          css={{
                            minWidth: "100%",
                            maxWidth: "100%",
                            textAlign: "center",
                            lineHeight: 1.2,
                            position: "relative",
                            zIndex: 0,
                            "@media only screen and (max-width: 768px)": {
                              fontSize: 20,
                            },
                          }}
                        >
                          {`KamayaKya`}
                        </Text>
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backdropFilter: "blur(8px)",
                            zIndex: 0,
                            WebkitBackdropFilter: "blur(8px)",
                            margin: "15px",
                            "@media only screen and (max-width: 768px)": {
                              margin: "0px",
                            },
                          }}
                        >{` `}</Box>
                      </Box>
                      <Box
                        sx={{
                          zIndex: 1,
                          width: "90%",
                          backgroundImage:
                            "linear-gradient(to top , #106052, #0f734d)",
                          borderRadius: "17.5px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          "@media only screen and (max-width: 768px)": {
                            width: "100%",
                          },
                        }}
                      >
                        <Text
                          b
                          size={20}
                          color="#fff"
                          css={{
                            lineHeight: 1.5,
                          }}
                        >
                          Upside Left
                        </Text>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <ArrowCircleUp size={25} color="#fff" />
                          <Text
                            b
                            size={48}
                            color="#fff"
                            css={{
                              lineHeight: 1,
                              marginLeft: "3px",
                              marginRight: "3px",
                              "@media only screen and (max-width: 768px)": {
                                fontSize: 55,
                              },
                            }}
                          >
                            {`${number}`}
                          </Text>
                          <span style={{ fontSize: 25, color: "#FFF" }}>%</span>
                        </div>
                      </Box>

                      <Box sx={{ minWidth: "90%", maxWidth: "90%" }}>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            flexDirection: "column",
                          }}
                        >
                          <Divider
                            height={4}
                            style={{
                              backgroundColor: "#ffa736",
                              marginTop: "30px",
                              marginBottom: "10px",
                              width: "50px",
                              alignSelf: "center",
                            }}
                          />

                          <div
                            style={{
                              zIndex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column",
                              marginTop: "0px",
                            }}
                          >
                            <MdOutlineLock color="#ffa12e" size={50} />
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                marginTop: "20px",
                              }}
                              className="stocksPage-card-loginSection"
                            >
                              {/* <Button
																on
																onPress={handleFirstCard}
																css={{
																	backgroundColor: "transparent",
																}}
															> */}
                              {isLoggedIn ? (
                                <div
                                  style={{
                                    justifyContent: "center",
                                    textAlign: "center",
                                    // height: "fit-content",
                                    // maxWidth: "220px",
                                    // maxHeight: "220px",
                                  }}
                                >
                                  <Text
                                    b
                                    size={16}
                                    css={{
                                      // maxWidth: "220px",
                                      // lineHeight: 1
                                      textAlign: "center",
                                      marginBottom: "15px",
                                    }}
                                  >
                                    Unlock a world of wealth with just a click.
                                    {/* Log in, and three free stock picks */}
                                    {/* are your key to potential prosperity. It's */}
                                    {/* like finding hidden gems without the */}
                                    {/* digging! */}
                                  </Text>
                                  <Button
                                    // variant="contained"
                                    css={{
                                      width: "100%",
                                      marginTop: "10px",
                                      background:
                                        "linear-gradient(to top , #fb7716,#fe9807)",
                                      paddingTop: "5px",
                                      paddingBottom: "5px",
                                      borderRadius: "10000px",
                                      boxShadow: "none",
                                      "&:hover": {
                                        backgroundImage:
                                          "linear-gradient(to top , #FF9D28, #ffa736)",
                                      },
                                    }}
                                    onPress={handleFirstCard}
                                  >
                                    <Text b color="#FFF" size={18}>
                                      Subscribe to unlock
                                    </Text>
                                  </Button>
                                </div>
                              ) : (
                                <div
                                  style={{
                                    justifyContent: "center",
                                    textAlign: "center",
                                    // height: "fit-content",
                                    // maxWidth: "220px",
                                    // maxHeight: "220px",
                                  }}
                                >
                                  <Text
                                    b
                                    size={16}
                                    css={{
                                      // maxWidth: "220px",
                                      // lineHeight: 1
                                      textAlign: "center",
                                      marginBottom: "15px",
                                    }}
                                  >
                                    Unlock a world of wealth with just a click.
                                    {/* Log in, and three free stock picks */}
                                    {/* are your key to potential prosperity. It's */}
                                    {/* like finding hidden gems without the */}
                                    {/* digging! */}
                                  </Text>
                                  <Button
                                    // variant="contained"
                                    css={{
                                      width: "100%",
                                      marginTop: "10px",
                                      background:
                                        "linear-gradient(to top , #fb7716,#fe9807)",
                                      paddingTop: "5px",
                                      paddingBottom: "5px",
                                      borderRadius: "10000px",
                                      boxShadow: "none",
                                      "&:hover": {
                                        backgroundImage:
                                          "linear-gradient(to top , #FF9D28, #ffa736)",
                                      },
                                    }}
                                    onPress={handleFirstCard}
                                  >
                                    <Text b color="#FFF" size={18}>
                                      Subscribe to unlock
                                    </Text>
                                  </Button>
                                </div>
                              )}

                              {/*<BiChevronRight size={24} color="#000000" />*/}
                              {/* </Button> */}
                            </div>
                          </div>
                          <Divider
                            height={4}
                            style={{
                              backgroundColor: "#ffa736",
                              marginTop: "30px",
                              marginBottom: "10px",
                              width: "50px",
                              alignSelf: "center",
                            }}
                          />
                        </div>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))
            : ""}
        </Grid>
      </Box>
    </div>
  );
};

export default StockCardSME;
