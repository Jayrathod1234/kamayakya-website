import React, { useContext } from "react";
import BSection1 from "./BlogsPages/BSection1";
// import BSection2 from './BlogsPages/BSection2';
// import NavBar from "../components/Navbar";
// import NavBar2 from "../components/Navbar2";
import FaqsNew from "./screens/FaqsNew";
// import Footer from "./screens/Footer";
import AuthContext from "../components/AuthContext";
import BlogSection2 from "./BlogsPages/BlogSection2";
import { Footer, Navbar } from "../components.v2/index.components";
import { GET_BLOGS } from "./api/URLs";
import { TBlog } from "@/types";
const BlogsPage = ({ blogs, next, prev }: { blogs: Array<TBlog>; next: string | null; prev: string | null }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="relative  bg-white pricing bg-[url('/blogs/blog-bg.webp')] bg-[length:100vw] bg-no-repeat bg-[top_center]">
      <Navbar />
      <main className="  main-container">
        {/* {isLoggedIn ? <NavBar2 /> : <NavBar />} */}
        {/*<BSection1 />*/}
        {/* <BSection2 /> */}
        <BlogSection2 blogs={blogs} next={next} prev={prev} />
        {/* <FaqsNew /> */}
      </main>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch(`${GET_BLOGS}?limit=10&offset=0`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    
  });
  const data = await response.json();
  // console.log(data);
  return {
    props: {
      next: data?.next,
      prev: data?.previous,
      blogs: data.results,
    },
    revalidate: 500,
  };
}

export default BlogsPage;
