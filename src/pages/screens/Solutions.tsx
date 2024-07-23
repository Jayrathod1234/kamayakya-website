import React, { useRef } from "react";
import Slider from "react-slick";
import SliderRef from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Avatar, Card, Text } from "@nextui-org/react";
import { Box, IconButton } from "@mui/material";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
// import ReactStars from "react-stars";

const Solutions = () => {
  const sliderRef = useRef<SliderRef>(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    variableWidth: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          variableWidth: false,
        },
      },
    ],
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <section
      id="solutions"
      // style={{
      //   backgroundColor: "#fff",
      //   padding: "60px 30px",
      //   width: "100vw",
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      //   justifyContent: "center",
      //   paddingTop: "10vh",
      //   paddingBottom: "10vh",
      // }}
      className="solutions"
    >
      <div style={{ maxWidth: "80rem", width: "100%" }}>
        {/*<div className="testimonialHeader">*/}
        {/*  <Text*/}
        {/*    b*/}
        {/*    size={70}*/}
        {/*    css={{*/}
        {/*      color: "#25262c",*/}
        {/*      width: "100%",*/}
        {/*      lineHeight: "1.1",*/}
        {/*      textWrap: "normal",*/}
        {/*      textAlign: "center",*/}

        {/*      "@media only screen and (max-width: 764px)": {*/}
        {/*        fontSize: "45px",*/}
        {/*        width: "90vw",*/}
        {/*        paddingLeft: "30px",*/}
        {/*        textAlign: "left",*/}
        {/*      },*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    See what other investors are saying*/}
        {/*  </Text>*/}
        {/*</div>*/}
        <Box
          style={{
            paddingTop: "20px",
            width: "100%",
            maxWidth: "80rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "70px",
            padding: "0 15px",
            // "@media only screen and (max-width: 768px)": {
            //   paddingTop: "0vh",
            //   width: "100vw",
            //   paddingLeft: "15px",
            //   paddingRight: "15px",
            //   // marginBottom: "10vh !important",
            // },
          }}
          className="subscriptionPlansHeader"
        >
          <Text
            b
            size={70}
            css={{
              "@media only screen and (max-width: 768px)": {
                textAlign: "left",
                fontSize: 45,
                lineHeight: 1.1,
                maxWidth: "100%",
                width: "100%",
              },
            }}
          >
            Our Testimonials
          </Text>
          <Text
            b
            size={25}
            css={{
              textAlign: "center",
              "@media only screen and (max-width: 768px)": {
                marginTop: "10px",
                textAlign: "left",
                fontSize: 20,
                lineHeight: 1.1,
                width: "100%",
              },
            }}
          >
            See what other investors are saying, they're our best ads!
          </Text>
        </Box>

        <Slider {...settings} ref={sliderRef} className="testimonialSection">
          {/*<Card*/}
          {/*  variant="flat"*/}
          {/*  isHoverable*/}
          {/*  css={{*/}
          {/*    padding: 20,*/}
          {/*    width: "580px",*/}
          {/*    height: 360,*/}
          {/*    marginLeft: "30px",*/}
          {/*    // marginRight: 90,*/}
          {/*    marginBottom: 40,*/}
          {/*    marginTop: 40,*/}
          {/*    backgroundColor: "#f3f3f3",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <div style={{ marginTop: 10 }}>*/}
          {/*    <Text b size={24}></Text>*/}
          {/*    <div*/}
          {/*      style={{*/}
          {/*        display: "flex",*/}
          {/*        alignItems: "center",*/}
          {/*        marginTop: 5,*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      <Avatar*/}
          {/*        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"*/}
          {/*        alt="Avatar"*/}
          {/*        style={{*/}
          {/*          width: 95,*/}
          {/*          height: 90,*/}
          {/*          marginRight: 20,*/}
          {/*          marginLeft: 20,*/}
          {/*        }}*/}
          {/*      />*/}
          {/*      <div>*/}
          {/*        <Text b size={30}>*/}
          {/*          {" "}*/}
          {/*          Ramuel Smith{" "}*/}
          {/*        </Text>*/}
          {/*        <div*/}
          {/*          style={{*/}
          {/*            display: "flex",*/}
          {/*            flexDirection: "column",*/}
          {/*            marginTop: 5,*/}
          {/*          }}*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div style={{ marginTop: 30, marginLeft: 20 }}>*/}
          {/*      <Text size={30} color="#919192">*/}
          {/*        You will target the unanimity with a clear division and target*/}
          {/*        with a very clear set time*/}
          {/*      </Text>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</Card>*/}

          <div className="testimonialOuterBox">
            <div className="testimonialCard">
              <Text className={"testimonialCard-review"}>
                Lately, been playing w/ stocks & wealth mgmt apps. Amongst all,
                @kamayakya is the shining star. Absolute recco on 💻 & 📱
              </Text>
              <div className="testimonialCard-userDetail">
                <img
                  src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
                  className="testimonialCard-userDetail-image"
                />
                <Text className="testimonialCard-userDetail-name">Jack Ma</Text>
              </div>
            </div>
          </div>

          <div className="testimonialOuterBox">
            <div className="testimonialCard">
              <Text className={"testimonialCard-review"}>
                @kamayakya is one of the best new products that I've tried 😍
              </Text>
              <div className="testimonialCard-userDetail">
                <img
                  src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
                  className="testimonialCard-userDetail-image"
                />
                <Text className="testimonialCard-userDetail-name">Jack Ma</Text>
              </div>
            </div>
          </div>

          <div className="testimonialOuterBox">
            <div className="testimonialCard">
              <Text className={"testimonialCard-review"}>
                No matter how much I praise @kamayakya It will still be less for
                them. Fantastic App, they have made investing so much simple and
                sharing your fav stocks too. Gamechanger in the fintech
                ecosystem.
              </Text>
              <div className="testimonialCard-userDetail">
                <img
                  src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
                  className="testimonialCard-userDetail-image"
                />
                <Text className="testimonialCard-userDetail-name">Jack Ma</Text>
              </div>
            </div>
          </div>

          <div className="testimonialOuterBox">
            <div className="testimonialCard">
              <Text className={"testimonialCard-review"}>
                Lately, been playing w/ stocks & wealth mgmt apps. Amongst all,
                @kamayakya is the shining star. Absolute recco on 💻 & 📱
              </Text>
              <div className="testimonialCard-userDetail">
                <img
                  src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
                  className="testimonialCard-userDetail-image"
                />
                <Text className="testimonialCard-userDetail-name">Jack Ma</Text>
              </div>
            </div>
          </div>

          <div className="testimonialOuterBox">
            <div className="testimonialCard">
              <Text className={"testimonialCard-review"}>
                One product that impressed me a lot in last 1 yr & also
                benefitted me personally is @kamayakya - never got interested in
                markets earlier 🥇
              </Text>
              <div className="testimonialCard-userDetail">
                <img
                  src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
                  className="testimonialCard-userDetail-image"
                />
                <Text className="testimonialCard-userDetail-name">Jack Ma</Text>
              </div>
            </div>
          </div>
        </Slider>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            backgroundColor: "#185B54",
            color: "white",
            marginRight: 2,
            marginTop: 4,
            marginBottom: 4,
            "&:hover": { backgroundColor: "#25262c" },
            width: "50px",
            height: "50px",
            "@media only screen and (max-width: 764px)": {
              width: "60px",
              height: "60px",
              marginLeft: "25px",
            },
          }}
        >
          <AiOutlineLeft size={30} />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            backgroundColor: "#185B54",
            color: "white",
            marginRight: 0,
            marginTop: 4,
            marginBottom: 4,
            "&:hover": { backgroundColor: "#25262c" },
            width: "50px",
            height: "50px",
            "@media only screen and (max-width: 764px)": {
              width: "60px",
              height: "60px",
              marginLeft: "0px",
              marginRight: "25px",
            },
          }}
        >
          <AiOutlineRight size={30} />
        </IconButton>
      </div>
    </section>
  );
};

export default Solutions;
