import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, GET_BLOGS, GET_SPECIFIC_BLOG } from "./api/URLs";
import { Box } from "@mui/material";
import AuthContext from "../components/AuthContext";
import { useContext } from "react";
import NavBar2 from "../components/Navbar2";
import NavBar from "../components/Navbar";
import FaqsNew from "./screens/FaqsNew";
// import Footer from "./screens/Footer";
import { Loading, Text } from "@nextui-org/react";
import Markdown from "markdown-to-jsx";
import styles from "./blog.module.css";
import { Navbar } from "@/components.v2/navbar";
import { Footer } from "@/components.v2/footer";
import { Line, Meta } from "@/components.v2/blogs/blog-card-sm";
import { format } from "date-fns";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { Share } from "lucide-react";
import { CustomCSSProperties, TBlog } from "@/types/shared";
import Head from "next/head";
import { GetStaticProps } from "next";
// import { ReactQuill } from "react-quill";

// import Markdown from "markdown-to-jsx";

export const getStaticPaths = async () => {
  const response = await fetch(`${GET_BLOGS}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  const paths = data.map((blog) => ({
    params: { slug: blog.slug },
  }));
  console.log(paths)
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = (async (context) => {
  const response = await fetch(`${GET_SPECIFIC_BLOG}${context.params.slug}`, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Token ${refresh}`,
    },
    next: { revalidate: 3600 },
  });
  const data = await response.arrayBuffer();
  const textData = decoder.decode(data);
  const jsonData = JSON.parse(textData);
  const blog = data;
  return { props: { blog } }
}) 

const BlogPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState<null | TBlog>(null);
  const { isLoggedIn } = useContext(AuthContext);
  const decoder = new TextDecoder("utf-8");
  const customCss: CustomCSSProperties = {
    "--image-url": `url(${blog?.image1})`,
  };
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
        <Loading size={"lg"} css={{ paddingTop: "20vh", paddingBottom: "20vh" }} />
        <FaqsNew />
        <Footer />
      </Box>
    );
  }

  return (
    <div className="pricing" style={{ backgroundColor: "#fff" }}>
      {/* {isLoggedIn ? <NavBar2 /> : <NavBar />} */}
      <Head>
        <title>Kamayakya | {blog.title}</title>
        {/* <meta name="title" content={blog.title} />
        <meta name="description" content={blog.description.substring(10)} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://www.kamayakya.com/"} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description.substring(10)} />
        <meta property="og:image" content={blog.image1} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={"https://www.kamayakya.com/"} />
        <meta property="twitter:title" content={blog.title} />
        <meta property="twitter:description" content={blog.description.substring(10)} />
        <meta property="twitter:image" content={blog.image1} /> */}
        <title>Meta Tags — Preview, Edit and Generate</title>
        <meta name="title" content="Meta Tags — Preview, Edit and Generate" />
        <meta
          name="description"
          content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Meta Tags — Preview, Edit and Generate" />
        <meta
          property="og:description"
          content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
        />
        <meta property="og:image" content="https://metatags.io/images/meta-tags.png" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:width" content="200" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Meta Tags — Preview, Edit and Generate" />
        <meta
          property="twitter:description"
          content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
        />
        <meta property="twitter:image" content="https://metatags.io/images/meta-tags.png" />
      </Head>
      <div className=" w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto">
        <Navbar />
      </div>
      <div
        // style={{
        //   backgroundImage: `url('https://kamayakya.s3.amazonaws.com/blogs/tourism.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240619%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240619T050238Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=7a462fea25dc56f3015dd30e1fd6d2e91085eca86d0df70e71c1a0f1f952837b')`,
        // }}
        // linear-gradient(to_top,rgba(0,0,0,1),rgba(0,0,0,.45)),
        style={customCss}
        className={` mb-8 p-[3vw] bg-[rgba(0,0,0,.80)] py-[10vw] relative before:absolute before:content-[""] before:h-full before:w-full before:top-0 before:left-0 before:opacity-70 before:z-[1]  before:bg-cover before:bg-[image:var(--image-url)] `}
      >
        <h1 className=" relative z-10 text-center font-bold text-display-lg text-white">{blog.title}</h1>
        <div className=" relative z-10 flex items-center justify-center gap-x-3">
          <Meta
            icon={"Calendar"}
            label={`By ${blog.author}`}
            variant="lg"
            fontColor={"!text-gray-200"}
            iconColor={"#E4E7EC"}
          />
          <Line />
          <Meta
            icon={"Calendar"}
            label={format(new Date(blog?.created), "dd MMM, yyyy")}
            variant="lg"
            fontColor={"!text-gray-200"}
            iconColor={"#E4E7EC"}
          />
          <Line />
          <Meta
            icon={"Clock"}
            label={blog.read_time + " min read"}
            variant="lg"
            fontColor={"!text-gray-200"}
            iconColor={"#E4E7EC"}
          />
        </div>
      </div>
      <div className=" relative ">
        <div className=" hidden lg:flex sticky top-[25dvh] ml-6  flex-col w-fit float-left gap-y-3">
          <button
            onClick={() => {
              window.open(`https://x.com/intent/post?text=${"TEST SHARING ON X"}+${"https://www.kamayakya.com/"}`);
            }}
            className=" border border-gray-100 rounded-full p-3"
          >
            <BsWhatsapp size={16} fontSize={16} />
          </button>
          <button
            onClick={() => {
              window.open(
                `https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=${"https://www.kamayakya.com/"}`,
                "targetWindow",
                "toolbar=no"
              );
            }}
            className=" border border-gray-100 rounded-full p-3"
          >
            <BsLinkedin size={16} fontSize={16} />
          </button>
          <button className=" border border-gray-100 rounded-full p-3">
            <BsInstagram size={16} fontSize={16} />
          </button>
          <button className=" border border-gray-100 rounded-full p-3">
            <BsTwitter size={16} fontSize={16} />
          </button>
          <button className=" border border-gray-100 rounded-full p-3">
            <BsFacebook size={16} fontSize={16} />
          </button>
        </div>
        <div className=" block lg:hidden fixed left-4 bottom-10 z-40 ">
          <button className=" border border-gray-100 bg-white  rounded-full p-3">
            <Share size={16} color="black" />
          </button>
          <p className=" text-sm font-medium text-gray-700">Share</p>
        </div>
        {/* <div
          // style={{
          //   backgroundImage: `url('https://kamayakya.s3.amazonaws.com/blogs/tourism.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240619%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240619T050238Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=7a462fea25dc56f3015dd30e1fd6d2e91085eca86d0df70e71c1a0f1f952837b')`,
          // }}
          className={` mb-8 p-[3vw] py-[6vw] bg-opacity-5 bg-cover bg-[linear-gradient(to_top,rgba(0,0,0,.5),rgba(0,0,0,.5)),url('https://kamayakya.s3.amazonaws.com/blogs/tourism.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240619%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240619T050238Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=7a462fea25dc56f3015dd30e1fd6d2e91085eca86d0df70e71c1a0f1f952837b')] `}
        >
          <h1 className="text-center font-bold text-display-lg text-white">{blog.title}</h1>
          <p className=" font-bold text-center text-slate-100">
            by <span className="  text-brand-200">{blog.author}</span>
          </p>
        </div> */}
        {/* <div
          // style={{
          //   backgroundImage: `url('https://kamayakya.s3.amazonaws.com/blogs/tourism.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240619%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240619T050238Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=7a462fea25dc56f3015dd30e1fd6d2e91085eca86d0df70e71c1a0f1f952837b')`,
          // }}
          className={` p-[3vw]  rounded-xl bg-opacity-5 bg-cover  `}
        >
          <h1 className="text-center font-bold text-display-lg ">{blog.title}</h1>
          <p className=" font-bold text-center ">
            by <span className="  text-brand-400">{blog.author}</span>
          </p>
        </div> 
         <div>
          <img
            // placeholder={<Loading />}
            height={393}
            width={500}
            src={"https://kamayakya.s3.amazonaws.com/blogs/tourism.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2SGK27ISPC7RDHGX%2F20240619%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240619T050238Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=7a462fea25dc56f3015dd30e1fd6d2e91085eca86d0df70e71c1a0f1f952837b"}
            alt="Blog Image"
            className=" max-h-[393.75px] w-full max-w-full object-cover mb-24 "
          />
        </div> */}

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
          className="w-[min(840px,calc(100%-32px))] min-w-[328px] mx-auto relative"
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
          <div
            className={`prose pricing blog !max-w-none pb-[10%] ${styles.blog}`}
            dangerouslySetInnerHTML={{ __html: blog.description }}
          ></div>
          {/* </Markdown> */}
        </div>
      </div>
      {/* <div className=" pb-[10%]">
      <FaqsNew />
      </div> */}
      <Footer />
    </div>
  );
};

export default BlogPage;
