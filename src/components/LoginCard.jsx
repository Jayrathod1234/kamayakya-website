import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Button,
  Input,
  Card,
  Text,
  Modal,
  Loading,
  Divider,
} from "@nextui-org/react";
import { Box, Alert } from "@mui/material";
import {
  REG_USER_EMAIL,
  REG_USER_MOBILE,
  VERIFY_USER,
} from "../pages/api/URLs";
import OtpInput from "react-otp-input";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BiLockAlt } from "react-icons/bi";

const LoginCard = () => {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(30);

  useEffect(() => {
    if (showOtpModal) {
      setSecondsRemaining(30); // Start the countdown timer when the modal is shown
    }
  }, [showOtpModal]);

  useEffect(() => {
    if (secondsRemaining > 0) {
      const timer = setTimeout(() => {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [secondsRemaining]);
  const isMobileValid = mobile.replace(/\D/g, "").length === 12;

  const handleInputChange = (value) => {
    // const inputValue = e.target.value;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmail(isEmail ? value : "");
    setMobile(isEmail ? "" : value);
  };
  var in30Minutes = 1 / 48;
  const showAlert = () => {
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 5000);
  };

  useEffect(() => {
    if (error) {
      showAlert();
    }
  }, [error]);

  const handleRegister = async () => {
    console.log(mobile);
    setSecondsRemaining(30);
    let URLs = email !== "" ? REG_USER_EMAIL : REG_USER_MOBILE;
    setIsLoading(true);
    try {
      const response = await fetch(URLs, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: email !== "" ? undefined : "+" + mobile,
          email: email !== "" ? email : undefined,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setOtp(data.otp);
        setShowOtpModal(true);
      } else {
        setError("Failed to Login. Please try again.");
        showAlert();
      }
    } catch (e) {
      setError("An error occurred. Please try again later.");
      showAlert();
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(VERIFY_USER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: otp,
          email: email !== "" ? email : undefined,
          mobile: mobile !== "" ? "+" + mobile : undefined,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        const location = router.asPath;
        // Cookies.set("location", location, {expires: in30Minutes});
        // console.log( location, "login done from CArd" );
        router.push(location);
        // Cookies.set("refresh", data.refresh, { expires: in30Minutes });
        // if (router.pathname !== "/track-record") {
        //   router.push("/stock-picks");
        // } else {
        setShowOtpModal(false);
        if(router.pathname === "/") {
          window.location.reload();
        }

      } else {
        setError("Failed to verify OTP. Please try again.");
        setShowOtpModal(true);
        showAlert();
      }
    } catch (e) {
      setError("An error occurred. Please try again later.");
      showAlert();
    }
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        // display: "flex",flex
        // maxWidth: "2000px",
        // flexDirection: "row",
        // padding: "50px",
        // alignItems: "center",
        padding: "15px",

        "@media only screen and (max-width: 764px)": {
          // padding: "5px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            height: "400px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                "@media only screen and (max-width: 764px)": {
                  // fontSize: 28,
                  width: "100%",
                },
              }}
            >
              <Text
                b
                color="#000"
                css={{
                  fontSize: 58,
                  lineHeight: 1.2,
                  "@media only screen and (max-width: 764px)": {
                    fontSize: 55,
                    width: "100%",
                  },
                }}
              >
                Login!
              </Text>
              <Text
                b
                size={17.5}
                color="#ffa12e"
                css={{
                  lineHeight: 1.1,
                  marginTop: "5px",
                  marginBottom: "20px",
                  width: "100%",
                  padding: "0px 10px",
                  opacity: "0.95",
                  "@media only screen and (max-width: 764px)": {
                    fontSize: 17.5,
                    width: "100%",
                  },
                }}
              >
                Ready to conquer the stock market? Skip the hassle of
                registration and jump right in!
              </Text>
            </Box>
            <Card
              variant="flat"
              css={{
                borderRadius: "0px",
                display: "flex",
                alignItems: "center",
                paddingTop: "20px",
                // width: "450px",
                height: "250px",
                backgroundColor: "#fff",
                "@media only screen and (max-width: 764px)": {
                  width: "100%",
                },
              }}
            >
              {isAlertVisible && (
                <Alert
                  severity="error"
                  onClose={() => setIsAlertVisible(false)}
                >
                  {error}
                </Alert>
              )}
              <PhoneInput
                containerStyle={{
                  marginBottom: "10px",
                  alignSelf: "center",
                  width: "300px",
                }}
                dropdownStyle={{ height: "250px", zIndex: 10 }}
                countryCodeEditable={false}
                country="in"
                placeholder="eg: 9012345678"
                value={mobile}
                onChange={handleInputChange}
                inputProps={{
                  required: true,
                  autoFocus: true,
                }}
                inputExtraProps={{
                  mask: "+(999) 999 9999",
                }}
                containerClass="countryPhone"
              />
              <Text
                b
                size={13}
                css={{
                  marginTop: "0px",
                  marginBottom: "30px",
                  maxWidth: "200px",
                  textAlign: "center",
                }}
              >
                By logging in you agree to all our{" "}
                <a className="linkColor" href="/TermsAndCond" target="=_blank">
                  terms & conditions
                </a>
              </Text>
              <Button
                auto
                onPress={handleRegister}
                disabled={isLoading || (!email && !mobile)}
                loading={isLoading}
                css={{
                  background: "linear-gradient(to top , #106052, #0f734d)",
                  padding: "0px 30px",
                  borderRadius: "1000px",
                  alignSelf: "center",
                  zIndex: 0,
                }}
              >
                <BiLockAlt size={18} style={{ marginRight: "5px" }} />
                LOGIN
              </Button>
            </Card>
            {isLoading && <Loading type={"gradient"} />}
          </div>
        </Box>
      </Box>

      <Modal
        width="450px"
        open={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
        className="otpBox"
      >
        {isAlertVisible && (
          <Alert severity="error" onClose={() => setIsAlertVisible(false)}>
            {error}
          </Alert>
        )}

        <Text b size={30} css={{ marginTop: "35px", marginBottom: "0px", lineHeight: 1.1, textAlign: 'center' }}>
          Enter the OTP
        </Text>
        <Text b size={15} css={{ marginTop: "5px", lineHeight: 1.1, textAlign: 'center' }}>
          sent to {mobile ? `+${mobile}` : email}
        </Text>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
            paddingBottom: "25px",
          }}
        >
          <OtpInput
            inputType="number"
            value={otp}
            numInputs={6}
            containerStyle={{
              marginTop: "20px",
              marginBottom: "30px",
              justifyContent: "center",
              gap: "1px",
            }}
            inputStyle={{
              height: "55px",
              width: "40px",
              marginLeft: 1,
              marginRight: 1,
              border: "2px solid #ffa12e",
              borderRadius: "1000px",
              background: "#fff",
              "-moz-appearance": "textfield",
            }}
            renderInput={(props) => (
              <input
                {...props}
                type="number"
                onKeyDown={(e) => blockInvalidChar(e, props.onKeyDown)}
              />
            )}
            onChange={setOtp}
            renderSeparator={<span></span>}
            shouldAutoFocus={true}
            disabled={isLoading}
          />
          <Button
            auto
            onPress={handleOtpSubmit}
            disabled={isLoading || (!email && !mobile)}
            loading={isLoading}
            css={{
              background: "linear-gradient(to top , #106052, #0f734d)",
              padding: "0px 30px",
              borderRadius: "1000px",
              alignSelf: "center",
              zIndex: 0,
            }}
          >
            <BiLockAlt size={18} style={{ marginRight: "5px" }} />
            LOGIN
          </Button>
          {secondsRemaining <= 0 ? (
            <Button css={{ backgroundColor: "white" }} onPress={handleRegister}>
              <Text size={15} b css={{ paddingTop: "20px" }}>
                {`resend OTP`}
              </Text>
            </Button>
          ) : (
            <Text size={15} b css={{ fontsize: 15, paddingTop: "20px" }}>
              {`resend OTP in ${secondsRemaining} seconds`}
            </Text>
          )}
        </div>
      </Modal>
    </Box>
  );
};

export default LoginCard;

export const blockInvalidChar = (e, keydownFunction) => {
  if (e.key.match(/^[^\n]{1}$/)) {
    // Matching single character
    !e.key.match(/^[0-9]$/) && e.preventDefault(); // Prevent non-numeric characters
  }
  keydownFunction(e); // Execute package's onKeyDown function
};
