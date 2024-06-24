import React, { useState, useEffect } from "react";
// import { div } from "@mui/material";
import { Button, Loading, Text } from "@nextui-org/react";
import { BiChevronRight } from "react-icons/bi";
import { GET_BLOGS } from "../api/URLs";
import { useRouter } from "next/router";
import Markdown from "markdown-to-jsx";
import { BlogCardLg, BlogCardSm } from "@/components.v2/blogs";
import { Input } from "@/components.v2/ui/input";
import { Search } from "lucide-react";
import { TBlog } from "@/types";

const BlogSection2 = () => {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [noBlogs, setNoBlogs] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const fetchBlogs = async () => {
    try {
      setIsLoadingBlogs(true);
      const response = await fetch(`${GET_BLOGS}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `token ${refresh}`,
        },
      });
      const data = await response.json();
      setBlogs(data);
      // console.log(data);
      if (data.length === 0) {
        setNoBlogs(true);
      } else {
        setNoBlogs(false);
      }
      setIsLoadingBlogs(false);
    } catch (error) {
      console.log("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <main style={{ backgroundColor: "#fff" }}>
      <section className='flex flex-col items-center '>
        {isLoadingBlogs && <Loading type={"gradient"} style={{ marginBottom: "50px" }} />}
        {noBlogs && (
          <>
            <img src="no-data.svg" width={"300px"} height={"100%"} />
            <div style={{ fontSize: 30 }}>No Blogs yet!</div>
          </>
        )}
        <div className="">
          <div className=" text-center mt-9 mb-10 text-gray-950">
            <h1 className=" font-bold text-display-lg mb-3">Blogs</h1>
            <p className=" text-lg text-gray-800">Deep dives into market trends and data</p>
          </div>
          <div className=" mx-auto w-full  max-w-[426.67px] mb-10 py-[10px] px-[14px] border border-gray-200 rounded-[6px] flex items-center gap-x-2">
            <Search size={16} color="#667085"/>
            <Input className=" border-none p-0 h-auto autofill:bg-white auto placeholder:text-gray-400 placeholder:font-normal px-0 text-md outline-none border-0 focus:outline-none focus:border-0 focus:ring-0 bg-transparent ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Search for blogs"/>
          </div>
          
          <div className=" place-content-center justify-items-center grid grid-cols-[repeat(auto-fill,minmax(358px,1fr))] gap-y-14 gap-x-8 w-full">
            <BlogCardLg />
            {/* <div className=" flex row-start-2 gap-x-8"> */}
            {blogs.map((blog: TBlog) => (
              <BlogCardSm key={blog.id} blog={blog} />
              // <div
              //   onClick={() => router.push(`${blog.slug}`)}
              //   key={blog.id}
              //   // sx={{
              //   //   width: "280px",
              //   //   height: "450px",
              //   //   display: "flex",
              //   //   flexWrap: "wrap",
              //   //   flexDirection: "column",
              //   //   justifyContent: "space-between",
              //   //   marginBottom: "50px",
              //   //   "@media only screen and (max-width: 764px)": {
              //   //     width: "100%",
              //   //     height: "auto",
              //   //     gap: "0px",
              //   //   },
              //   // }}
              // >
              //   <div>
              //     <div sx={{ width: "100%", position: "relative" }}>
              //       {isLoading && (
              //         <div
              //           // sx={{
              //           //   width: "100%",
              //           //   height: "190px",
              //           //   display: "flex",
              //           //   justifyContent: "center",
              //           //   alignItems: "center",
              //           //   backgroundColor: "#fefefe",
              //           //   zIndex: 1,
              //           //   transition: "opacity 0.5s",
              //           // }}
              //         >
              //           <Loading type={"gradient"} />
              //         </div>
              //       )}
              //       <img
              //         src={blog.image1}
              //         alt="Blog image"
              //         width={"100%"}
              //         height={"180px"}
              //         style={{
              //           objectFit: "cover",
              //           marginBottom: "15px",
              //           borderRadius: "2.5px",
              //           display: isLoading ? "none" : "block",
              //           opacity: isLoading ? 0 : 1,
              //           transition: "opacity 0.5s",
              //           backgroundColor: "#f3f3f3",
              //         }}
              //         onLoad={handleImageLoad}
              //       />
              //     </div>
              //     <div
              //       sx={{
              //         display: "flex",
              //         flexWrap: "wrap",
              //         flexDirection: "row",
              //         justifyContent: "flex-start",
              //         "@media only screen and (max-width: 764px)": {
              //           width: "90%",
              //         },
              //       }}
              //     >
              //       {/*<Text b size={15} css={{ lineHeight: 1 }}>*/}
              //       {/*	Team KamayaKya*/}
              //       {/*</Text>*/}
              //       <div
              //         style={{
              //           width: "20px",
              //           height: "5px",
              //           backgroundColor: "#FF9E24",
              //           marginTop: "4px",
              //           marginRight: "7.5px",
              //           borderRadius: "10000px",
              //         }}
              //       ></div>
              //       <Text
              //         b
              //         size={14}
              //         css={{ lineHeight: 1, paddingBottom: "0px" }}
              //       >
              //         {new Date(blog.created).toLocaleDateString()}
              //       </Text>
              //     </div>
              //     <div style={{ display: "flex", flexDirection: "column" }}>
              //       <Text
              //         b
              //         size={24}
              //         css={{
              //           lineHeight: 1.1,
              //           marginTop: "10px",
              //           "@media only screen and (max-width: 764px)": {
              //             width: "90%",
              //           },
              //         }}
              //       >
              //         {blog.title}
              //       </Text>
              //       {/*<Text*/}
              //       {/*  b*/}
              //       {/*  size={14}*/}
              //       {/*  css={{ lineHeight: 1.2, marginTop: "5px" }}*/}
              //       {/*>*/}
              //       {/*  {blog.description.length > 200*/}
              //       {/*    ? `${blog.description.substring(0, 100)}...`*/}
              //       {/*    : blog.description}*/}
              //       {/*</Text>*/}
              //       <span style={{ height: "10px" }} />
              //         {/* <Markdown>
              //         {blog.description.length > 200
              //           ? `${blog.description.substring(0, 100)}...`
              //           : blog.description}
              //       </Markdown> */}
              // 			<span
              // 				dangerouslySetInnerHTML={{
              // 					__html:
              // 						blog.description.length > 200
              // 							? `${blog.description.substring(0, 100)}...`
              // 							: blog.description,
              // 				}}
              // 			/>
              // 		</div>
              // 	</div>

              // 	<Button
              // 		css={{
              // 			width: "100%",
              // 			borderRadius: "5px",
              // 			// marginTop: "25px",
              // 			backgroundColor: "#303d6a",
              // 			color: "#fff",
              // 		}}
              // 		onClick={() => router.push(`${blog.slug}`)}
              // 	>
              // 		Read More
              // 		<BiChevronRight
              // 			color="#fff"
              // 			size={20}
              // 			style={{ marginLeft: "20px" }}
              // 		/>
              // 	</Button>
              // </div>
            ))}
            {/* </div> */}
          </div>
        </div>
        {/* <iframe
					src="https://docs.google.com/document/d/e/2PACX-1vRKruCKKwxPDEUaTzG6Noq-tB-HNb5YoFEwSgurv9jfOLfk9U3I04ncHGhpmxjKHw/pub?embedded=true"
					allowFullScreen="true"
          width={"100%"}
          style={{ border: "none", overflowY: "scroll", height: "85vh"}}
				></iframe> */}
      </section>
    </main>
  );
};

export default BlogSection2;
