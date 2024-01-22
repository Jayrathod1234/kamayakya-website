import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Button, Loading, Text } from "@nextui-org/react";
import { BiChevronRight } from "react-icons/bi";
import { GET_BLOGS } from "../api/URLs";
import { useRouter } from "next/router";
import Markdown from "markdown-to-jsx";

const BlogSection2 = () => {
	const [blogs, setBlogs] = useState([]);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);

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
			console.log(data);
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
      <section
        style={{
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "80rem",
          paddingTop: "10vh",
          paddingBottom: "10vh",
          margin: "0 auto",
        }}
      >
        {isLoadingBlogs && (
          <Loading type={"gradient"} style={{ marginBottom: "50px" }} />
        )}
        <Box
          sx={{
            width: "100%",
            maxWidth: "80rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "15px",
            paddingRight: "15px",
            // flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: ["column", "row"],
              flexWrap: "wrap",
              gap: "30px",
              "@media only screen and (max-width: 764px)": {
                gap: "0px",
              },
            }}
          >
            {blogs.map((blog) => (
              <Box
                onClick={() => router.push(`${blog.slug}`)}
                key={blog.id}
                sx={{
                  width: "280px",
                  height: "450px",
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginBottom: "50px",
                  "@media only screen and (max-width: 764px)": {
                    width: "100%",
                    height: "auto",
                    gap: "0px",
                  },
                }}
              >
                <div>
                  <Box sx={{ width: "100%", position: "relative" }}>
                    {isLoading && (
                      <Box
                        sx={{
                          width: "100%",
                          height: "190px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#fefefe",
                          zIndex: 1,
                          transition: "opacity 0.5s",
                        }}
                      >
                        <Loading type={"gradient"} />
                      </Box>
                    )}
                    <img
                      src={blog.image1}
                      alt="Blog image"
                      width={"100%"}
                      height={"180px"}
                      style={{
                        objectFit: "cover",
                        marginBottom: "15px",
                        borderRadius: "2.5px",
                        display: isLoading ? "none" : "block",
                        opacity: isLoading ? 0 : 1,
                        transition: "opacity 0.5s",
                        backgroundColor: "#f3f3f3",
                      }}
                      onLoad={handleImageLoad}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      "@media only screen and (max-width: 764px)": {
                        width: "90%",
                      },
                    }}
                  >
                    {/*<Text b size={15} css={{ lineHeight: 1 }}>*/}
                    {/*	Team KamayaKya*/}
                    {/*</Text>*/}
                    <div
                      style={{
                        width: "20px",
                        height: "5px",
                        backgroundColor: "#FF9E24",
                        marginTop: "4px",
                        marginRight: "7.5px",
                        borderRadius: "10000px",
                      }}
                    ></div>
                    <Text
                      b
                      size={14}
                      css={{ lineHeight: 1, paddingBottom: "0px" }}
                    >
                      {new Date(blog.created).toLocaleDateString()}
                    </Text>
                  </Box>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Text
                      b
                      size={24}
                      css={{
                        lineHeight: 1.1,
                        marginTop: "10px",
                        "@media only screen and (max-width: 764px)": {
                          width: "90%",
                        },
                      }}
                    >
                      {blog.title}
                    </Text>
                    {/*<Text*/}
                    {/*  b*/}
                    {/*  size={14}*/}
                    {/*  css={{ lineHeight: 1.2, marginTop: "5px" }}*/}
                    {/*>*/}
                    {/*  {blog.description.length > 200*/}
                    {/*    ? `${blog.description.substring(0, 100)}...`*/}
                    {/*    : blog.description}*/}
                    {/*</Text>*/}
                    <span style={{ height: "10px" }} />
                      {/* <Markdown>
                      {blog.description.length > 200
                        ? `${blog.description.substring(0, 100)}...`
                        : blog.description}
                    </Markdown> */}
										<span
											dangerouslySetInnerHTML={{
												__html:
													blog.description.length > 200
														? `${blog.description.substring(0, 100)}...`
														: blog.description,
											}}
										/>
									</div>
								</div>

								<Button
									css={{
										width: "100%",
										borderRadius: "5px",
										// marginTop: "25px",
										backgroundColor: "#125b54",
										color: "#fff",
									}}
									onClick={() => router.push(`${blog.slug}`)}
								>
									Read More
									<BiChevronRight
										color="#fff"
										size={20}
										style={{ marginLeft: "20px" }}
									/>
								</Button>
							</Box>
						))}
					</Box>
				</Box>
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
