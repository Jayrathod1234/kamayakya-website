// import { useRouter } from "next/router";
// import {  useState } from "react";
// import axios from "axios";
import { BASE_URL, GET_BLOGS, GET_SPECIFIC_BLOG } from "./api/URLs";
import { Box } from "@mui/material";
import AuthContext from "../components/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
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
import { Link, Share, Share2, X } from "lucide-react";
import { CustomCSSProperties, TBlog } from "@/types/shared";
import Head from "next/head";
import { GetStaticProps } from "next";
import Image from "next/image";
import { Avatar, AvatarVariant } from "@/components.v2/avatar";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from "@/components.v2/ui/drawer";
import { Newsletter, BlogHero, BlogSocialList } from "@/components.v2/index.components";
import CopyToClipboard from "react-copy-to-clipboard";
import { useToast } from "@/components.v2/ui/use-toast";
import { BlogShareDrawer } from "@/components.v2/blogs";
import { useRouter } from "next/router";
// import { ReactQuill } from "react-quill";

// import Markdown from "markdown-to-jsx";

// export const getStaticPaths = async () => {
//   const response = await fetch(`${GET_BLOGS}?limit=1000`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     next:{revalidate:500}
//   });
//   const data = await response.json();
//   const paths = data.results.map((blog: TBlog) => ({
//     params: { slug: blog.slug },
//   }));
//   // console.log(paths);
//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps = (async (context) => {
//   const response = await fetch(`${GET_SPECIFIC_BLOG}${context.params?.slug}`, {
//     headers: {
//       "Content-Type": "application/json",
//       // Authorization: `Token ${refresh}`,
//     },
//     next: { revalidate: 500 },
//   });
//   const data = await response.arrayBuffer();
//   const decoder = new TextDecoder("utf-8");
//   const textData = decoder.decode(data);
//   const jsonData = JSON.parse(textData);
//   const blog = jsonData;

//   return { props: { blog }, revalidate: 500 };
// }) satisfies GetStaticProps<{
//   blog: TBlog;
// }>;
// { blog }: { blog: TBlog }
const BlogPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState<null | TBlog>(null);

  const { isLoggedIn } = useContext(AuthContext);
  const [displayShare, setDisplayShare] = useState(false);
  const decoder = new TextDecoder("utf-8");

  const ref = useRef<HTMLDivElement | null>(null);
  const url = "https://dev-website.kamayakya.in/";

  useEffect(() => {
    const fetchBlogData = async () => {
      if (slug) {
        try {
          const response = await fetch(`${GET_SPECIFIC_BLOG}${slug}`, {
            headers: {
              "Content-Type": "application/json",
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

  useEffect(() => {
    if (ref.current) {
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setDisplayShare(false);
            return;
          }
          setDisplayShare(true);
        },
        {
          root: null,
          threshold: 0.1, // set offset 0.1 means trigger if atleast 10% of element in viewport
        }
      );

      observer.observe(ref.current);
    }
  }, []);

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
  // console.log(blog.slug, blog.slug, router.basePath, router.route);
  return (
    <div className="pricing" style={{ backgroundColor: "#fff" }}>
      {/* {isLoggedIn ? <NavBar2 /> : <NavBar />} */}
      <Head>
        <title>Kamayakya | {blog.title}</title>
        <meta name="title" content={blog.title} />
        <meta name="description" content={blog.description.substring(10)} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={blog.slug} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description.substring(10)} />
        <meta property="og:image" content={blog.image1} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${url + blog.slug}`} />
        <meta property="twitter:title" content={blog.title} />
        <meta property="twitter:description" content={blog.description.substring(10)} />
        <meta property="twitter:image" content={blog.image1} />
      </Head>
      <div className=" w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto">
        <Navbar />
      </div>
      <div ref={ref}>
        <BlogHero blog={blog} />
      </div>
      <div className=" relative ">
        <div className=" hidden lg:flex  z-30 sticky lg:top-[25dvh] ml-6 flex-col items-center  justify-center w-fit float-left gap-3 h-fit">
          <BlogSocialList blog={blog} />
        </div>
        {displayShare && <BlogShareDrawer blog={blog} />}
        <div className="w-[min(840px,calc(100%-32px))] min-w-[328px] mx-auto relative">
          <div
            className={`prose pricing blog !max-w-none pb-[10%] ${styles.blog}`}
            dangerouslySetInnerHTML={{ __html: blog.description }}
          ></div>
        </div>
      </div>
      <Newsletter page="Blogs" />
      <Footer />
    </div>
  );
};

export default BlogPage;
