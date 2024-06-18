import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, GET_SPECIFIC_BLOG } from "./api/URLs";
import { Box } from "@mui/material";
import AuthContext from "../components/AuthContext";
import { useContext } from "react";
import NavBar2 from "../components/Navbar2";
import NavBar from "../components/Navbar";
import FaqsNew from "./screens/FaqsNew";
import Footer from "./screens/Footer";
import { Loading, Text } from "@nextui-org/react";
import Markdown from "markdown-to-jsx";
import styles from  './blog.module.css'
// import { ReactQuill } from "react-quill";

// import Markdown from "markdown-to-jsx";

const BlogPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);
  const decoder = new TextDecoder("utf-8");

  useEffect(() => {
    const fetchBlogData = async () => {
      if (slug) {
        try {
          const refresh = localStorage.getItem("refresh");
          // console.log(
          //   `https://api-server.kamayakya.in/user/specificStock/${slug}`
          // );

          const response = await fetch(`${GET_SPECIFIC_BLOG}${slug}`, {
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Token ${refresh}`,
            },
            next: { revalidate: 3600 },
          });
          const data = await response.arrayBuffer();
          const textData = decoder.decode(data);
          const jsonData = JSON.parse(textData);
          setBlog(jsonData);
        } catch (error) {
          console.error("Error fetching blog data:", error);
        }
      }
    };
    fetchBlogData();
  }, [slug]);

  if (!blog) {
    return (
      <Box
        sx={{
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // maxWidth: "80rem",
          // paddingTop: "10vh",
          paddingBottom: "10vh",
          margin: "0 auto",
          fontSize: 30,
        }}
      >
        {isLoggedIn ? <NavBar2 /> : <NavBar />}
        <Loading
          size={"lg"}
          css={{ paddingTop: "20vh", paddingBottom: "20vh" }}
        />
        <FaqsNew />
        <Footer />
      </Box>
    );
  }

  return (
    <div  className='pricing' style={{ backgroundColor: "#fff" }}>
      {isLoggedIn ? <NavBar2 /> : <NavBar />}
      <div
      className=" w-[min(1200px,calc(100%-32px))] min-w-[328px] mx-auto"
      >
        <div >
          <img
            placeholder={<Loading />}
            src={blog.image1}
            alt="Blog Image"
            width={"100%"}
            height={"500px"}
            style={{
              objectFit: "cover",
              marginBottom: "15px",
              borderRadius: "0px",
              backgroundColor: "lightgray",
            }}
          />
        </div>
        <h1 className="text-center">{blog.title}</h1>
        {/* <Text
          className=" !pricing"
          b
          size={55}
          css={{
            textAlign: "left",
            padding: "15px",
            lineHeight: "1.1",
            "@media only screen and (maxWidth: : 724px)": {
              fontSize: "35px",
              lineHeight: "1.2",
            },
          }}
        >
          {blog.title}
        </Text> */}
        <div
        className=""
          // style={{
          //   fontSize: 19,
          //   textAlign: "left",
          //   padding: "15px",
          //   // fontWeight: "normal",
          //   // fontFamily: "Arial",
          //   "@media only screen and (maxWidth: : 724px)": {
          //     fontSize: "18px",
          //     lineHeight: "1.2",
          //   },
          // }}
        >
          {/* <Markdown> */}
           <div className={`prose pricing blog ${styles.blog}`}  dangerouslySetInnerHTML={{__html: blog.description}}></div>
            {/* </Markdown> */}
        </div>
      </div>
      <FaqsNew />
      <Footer />
    </div>
  );
};

export default BlogPage;
