import { Box, IconButton } from "@mui/material";
import { Divider, Text } from "@nextui-org/react";
import React from "react";
import Navbar from "../../components/Navbar";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { Link } from "@nextui-org/react";
import Head from "next/head";
import { SocialIcon } from "react-social-icons";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";

const Footer = () => {
  return (
    <header>
      <div>
        <nav>
          <Link href={"/"}>
            <a>
              <img
                src="./kmk-logo (1).png"
                className="kamayakyaLogoBottomNavbar"
                alt="kamayakya"
              />
            </a>
          </Link>
        </nav>
        {/* Pages */}
        <div>
          <nav className="bottomNavbarPageLinks">
            <Link href={"/terms-conditions"}>
              <a>
                <Text className="bottomNavbarPageLinks-text">
                  Terms & Conditions
                </Text>
              </a>
            </Link>
          </nav>
          <nav className="bottomNavbarPageLinks">
            <Link href={"/disclaimer"}>
              <a>
                <Text className="bottomNavbarPageLinks-text">Disclosures</Text>
              </a>
            </Link>
          </nav>
          <nav className="bottomNavbarPageLinks">
            <Link href={"/investor-charter"}>
              <a>
                <Text className="bottomNavbarPageLinks-text">
                  Investor Charter
                </Text>
              </a>
            </Link>
          </nav>
          <nav className="bottomNavbarPageLinks">
            <Link href={"/complaints"}>
              <a>
                <Text className="bottomNavbarPageLinks-text">Complaints</Text>
              </a>
            </Link>
          </nav>
          <nav className="bottomNavbarPageLinks">
            <Link href={"/privacy-policy"}>
              <a>
                <Text className="bottomNavbarPageLinks-text">
                  Privacy Policy
                </Text>
              </a>
            </Link>
          </nav>
        </div>
        {/* Social Links */}
        <div>
          <nav className="bottomNavbarPageLinks socialDesign">
            <SocialIcon
              className="socialIcons"
              url="https://www.facebook.com/KamayaKya"
              target="_blank"
              style={{ height: "30px", width: "30px" }}
            />
          </nav>
          <nav className="bottomNavbarPageLinks socialDesign">
            <SocialIcon
              className="socialIcons"
              url="https://instagram.com/kamayakyaofficial?igshid=YmMyMTA2M2Y="
              target="_blank"
              style={{ height: "30px", width: "30px" }}
            />
          </nav>
          <nav className="bottomNavbarPageLinks socialDesign">
            <SocialIcon
              className="socialIcons"
              url="https://www.linkedin.com/company/kamayakya/"
              target="_blank"
              style={{ height: "30px", width: "30px" }}
            />
          </nav>
          <nav className="bottomNavbarPageLinks socialDesign">
            <SocialIcon
              className="socialIcons"
              url="https://twitter.com/KamayaKyaIndia?s=20&t=LGnZi-Xq9J6m993h9E7BCw"
              target="_blank"
              style={{ height: "30px", width: "30px" }}
            />
          </nav>
          <nav className="bottomNavbarPageLinks socialDesign">
            <SocialIcon
              className="socialIcons"
              url="https://t.me/+5ZpxedvOoothOWZl"
              target="_blank"
              style={{ height: "30px", width: "30px" }}
            />
          </nav>
        </div>
      </div>
      <div className="padding-top-header">
        <Text className="copyright warning">
          Kamayakya Wealth Management Pvt. Ltd makes no warranties or
          representations, express or implied, on products and services offered
          through the platform. It accepts no liability for any damages or
          losses, however, caused in connection with the use of, or on the
          reliance of its research and recommendation services. Past performance
          is not indicative of future returns. Please consider your specific
          investment requirements, risk tolerance, goal, time frame, risk and
          reward balance and the cost associated with the investment before
          choosing a fund, or designing a portfolio that suits your needs.
          Performance and returns of any investment portfolio can neither be
          predicted nor guaranteed.
        </Text>
      </div>
      <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: "0px",
            paddingBottom: "0px",
          }}
      >
        <div>
          <MailOutlineIcon style={{ height: "30px", width: "30px" }} /> :
          contact@kamayakya.com
        </div>
        <div>
          <PhoneIcon style={{ height: "28px", width: "30px" }} /> :
          (+91)9175939641
        </div>
      </div>
      {/* Divider */}
      <div className="bottomNavbar-dividerSection padding-top-divider">
        <span className="bottomNavbar-divider" />
      </div>
      {/* Logos */}
      <div className="registrationLogos-div" style={{ padding: "0px 15px" }}>
        <div
          className="registrationLogosIndividualCard"
          onClick={() =>
            window.open(
              "Kamayakya-SEBI-License.pdf#toolbar=0&fitH=1",
              "_blank",
              "fullscreen=yes"
            )
          }
          style={{ cursor: "pointer" }}
        >
          <div style={{ fontSize: 40, lineHeight: 1, marginRight: "2px" }}>
            {/* <img
							className="registrationLogosIndividualCard-row-logo"
							src="./SEBI.png"
							alt="SEBI NUMBER INH000009843"
						/> */}
            SEBI
          </div>
          <div className="registrationLogosIndividualCard-column">
            <Text className="registrationLogosIndividualCard-column-header">
              Registration No.
            </Text>
            <Text className="registrationLogosIndividualCard-column-number">
              INH000009843
            </Text>
          </div>
        </div>
        <div
          className="registrationLogosIndividualCard"
          onClick={() =>
            window.open(
              "KMK_MSME_Registration.pdf#toolbar=0&fitH=1",
              "_blank",
              "fullscreen=yes"
            )
          }
          style={{ cursor: "pointer" }}
        >
          <div className="registrationLogosIndividualCard-row" style={{ marginRight:"4px" }}>
            <img
              className="registrationLogosIndividualCard-row-logo"
              src="./MSME logo.png"
              alt="SEBI NUMBER INH000009843"
            />
          </div>
          <div className="registrationLogosIndividualCard-column">
            <Text className="registrationLogosIndividualCard-column-header">
              Udyam Registration No.
            </Text>
            <Text className="registrationLogosIndividualCard-column-number">
              UDYAM-MH-26-0204983
            </Text>
          </div>
        </div>
        <div
          className="registrationLogosIndividualCard"
          onClick={() =>
            window.open(
              "KMK_Startup_India_Registration.pdf#toolbar=0&fitH=1",
              "_blank",
              "fullscreen=yes"
            )
          }
          style={{ cursor: "pointer" }}
        >
          <div className="registrationLogosIndividualCard-row" style={{ marginRight:"1px" }}>
            <img
              className="registrationLogosIndividualCard-row-logo"
              src="./Startup India Logo.png"
              alt="SEBI NUMBER INH000009843"
            />
          </div>
          <div className="registrationLogosIndividualCard-column">
            <Text className="registrationLogosIndividualCard-column-header">
              Certificate No.
            </Text>
            <Text className="registrationLogosIndividualCard-column-number">
              DIPP95081
            </Text>
          </div>
        </div>
      </div>
      <div className="copyright-box">
        <Text className="copyright">
          © 2023 KamayaKya Wealth Management Pvt. Ltd., all rights reserved.
        </Text>
      </div>
    </header>
  );
};

export default Footer;
