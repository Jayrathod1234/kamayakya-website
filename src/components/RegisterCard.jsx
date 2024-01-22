import { Button, Card, Input, Modal, Text, Loading } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Alert, Box } from "@mui/material";
import {
  REG_USER_EMAIL,
  REG_USER_MOBILE,
  VERIFY_USER,
} from "../pages/api/URLs";
import OtpInput from "react-otp-input";
import { useRouter } from "next/router";
import { BiLockAlt } from "react-icons/bi";
import PhoneInput from "react-phone-input-2";
import { blockInvalidChar } from "@/components/LoginCard";

const RegisterCard = () => {
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setMobile("");
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    setEmail("");
  };

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
    let URLs = email !== "" ? REG_USER_EMAIL : REG_USER_MOBILE;
    setIsLoading(true);
    try {
      const response = await fetch(URLs, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: mobile,
          // password: password,
          email: email,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setOtp(data.otp);
        setShowOtpModal(true);
      } else {
        console.log("RESPONSE NOT OK");
        setError("Failed to Register. Please try again.");
        showAlert();
      }
    } catch (e) {
      console.log(e);
      setError("An error occurred. Please try again later.");
      showAlert();
    }
    setIsLoading(false);
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
          mobile: mobile !== "" ? mobile : undefined,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setShowOtpModal(false);
        router.push("/stock-picks");
      } else {
        console.log("RESPONSE NOT OK");
        setError("Failed to verify OTP. Please try again.");
        setShowOtpModal(true);
        showAlert();
      }
    } catch (e) {
      console.log(e);
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

              <Input
                // labelLeft="Email"
                placeholder="eg: support@kamayakya.com"
                clearable
                size="lg"
                value={email}
                onChange={handleEmailChange}
                css={{
                  marginBottom: "10px",
                  alignSelf: "center",
                  width: "300px",
                  height: "50px",
                  borderRadius: "1000px",
                }}
                className="countryPhone"
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
                  backgroundImage: "linear-gradient(to top , #106052, #0f734d)",
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
      >
        {isAlertVisible && (
          <Alert severity="error" onClose={() => setIsAlertVisible(false)}>
            {error}
          </Alert>
        )}

        {/* <Text b size={30} css={{ marginTop: "35px", marginBottom: "0px" }}>
          Enter the OTP
        </Text> */}
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
              marginLeft: 2,
              marginRight: 2,
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
              backgroundImage: "linear-gradient(to top , #106052, #0f734d)",
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

export default RegisterCard;
