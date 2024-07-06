import React, { useState, useEffect } from "react";
// import { div } from "@mui/material";
import { Loading, Text } from "@nextui-org/react";
import { BiChevronRight } from "react-icons/bi";
import { GET_BLOGS, SEARCH_BLOG } from "../api/URLs";
import { useRouter } from "next/router";
import Markdown from "markdown-to-jsx";
import { BlogCardLg, BlogCardSm } from "@/components.v2/blogs";
import { Input } from "@/components.v2/ui/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { TBlog } from "@/types";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import axios from "axios";
import Lottie from "lottie-react";
import LOADING_GIF from "../../../public/blogs/loading.json";
import { debounce } from "@/lib/debounce";

const BlogSection2 = ({ blogs, next, prev }: { blogs: Array<TBlog>; next: string | null; prev: string | null }) => {
  const [filteredblogs, setFilteredBlogs] = useState(blogs);
  const [nextPage, setNextPage] = useState(next);
  const [prevPage, setPrevPage] = useState(prev);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [noBlogs, setNoBlogs] = useState(false);
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  // let timeout;
  // let lastExec = 0;

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleSearch = async (e:React.ChangeEvent<HTMLInputElement>) => {
    try {
      // setIsLoadingBlogs(true)
      setSearch(e.target.value);
      const response = await axios.get(SEARCH_BLOG, { params: { title: e.target.value } });
      setFilteredBlogs(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setSearchLoading(false);
    }
  };

  const handlePrevNext = async (url: string) => {
    try {
      setIsLoadingBlogs(true);
      const response = await axios.get(url);
      // console.log(response)
      setFilteredBlogs(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(`/blogs/${search}`);
  //   router.push(`/blogs/${search}`);
  // };

  // const fetchBlogs = async () => {
  //   try {
  //     setIsLoadingBlogs(true);
  //     const response = await fetch(`${GET_BLOGS}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // Authorization: `token ${refresh}`,
  //       },
  //     });
  //     const data = await response.json();
  //     setBlogs(data);
  //     // console.log(data);
  //     if (data.length === 0) {
  //       setNoBlogs(true);
  //     } else {
  //       setNoBlogs(false);
  //     }
  //     setIsLoadingBlogs(false);
  //   } catch (error) {
  //     console.log("Error fetching blogs:", error);
  //   }
  // };

  useEffect(() => {
    // fetchBlogs();
    if (filteredblogs && filteredblogs.length == 0 && !search) {
      setFilteredBlogs(blogs);
    }
  }, [filteredblogs, search]);
  console.log(filteredblogs)
  return (
    <main>
      <section className="flex flex-col items-center ">
        {isLoadingBlogs && <Loading type={"gradient"} style={{ marginBottom: "50px" }} />}
        {noBlogs && (
          <>
            <img src="no-data.svg" width={"300px"} height={"100%"} />
            <div style={{ fontSize: 30 }}>No Blogs yet!</div>
          </>
        )}
        <div className="  w-full">
          <div className=" text-center mt-9 mb-10 text-gray-950">
            <h1 className=" font-bold text-display-lg mb-3">Blogs</h1>
            <p className=" text-lg text-gray-800">Deep dives into market trends and data</p>
          </div>
          <form
            // onSubmit={handleSubmit}
            className=" mx-auto w-full  max-w-[426.67px] mb-10 py-[10px] px-[14px] border border-gray-200 bg-white rounded-[6px] flex items-center gap-x-2"
          >
            <Search size={16} color="#667085" />
            <Input
              onChange={(e) => {
                setSearchLoading(true);
                debounce(() => handleSearch(e), 500);
              }}
              className=" border-none p-0 h-auto autofill:bg-white auto placeholder:text-gray-400 placeholder:font-normal px-0 text-md outline-none border-0 focus:outline-none focus:border-0 focus:ring-0 bg-transparent ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Search for blogs"
            />
            <div className=" h-8 aspect-square">
              {searchLoading && <Lottie className=" h-full" animationData={LOADING_GIF} />}
            </div>
            {/* <Input className=" h-0 w-0" type="submit" value={""} /> */}
          </form>

          <div className=" place-content-center justify-items-center grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-y-14 gap-x-8 w-full pb-16 ">
            {search && filteredblogs?.length == 0 ? <h1 className=" col-span-full">No Blogs Found</h1> : null}
            {filteredblogs.map((blog: TBlog, index) =>
              index === 0 ? (
                <>
                  <BlogCardLg key={blog.id} blog={blog} />
                  <BlogCardSm className=" md:hidden" key={blog.id+index} blog={blog} />
                </>
              ) : (
                <BlogCardSm key={blog.id} blog={blog} />
              )
            )}
          </div>
        </div>
        <div className=" flex items-center justify-center gap-x-4 mt-[5.375rem]">
          {prevPage && (
            <Button
              onClick={() => handlePrevNext(prevPage as string)}
              startIcon={<ChevronLeft />}
              variant={ButtonVariant.tertiary}
              customStyle=" !w-10 !aspect-square min-w-10 !px-0 !py-0"
            ></Button>
          )}
          {nextPage && (
            <Button
              onClick={() => handlePrevNext(nextPage as string)}
              startIcon={<ChevronRight />}
              variant={ButtonVariant.tertiary}
              customStyle=" !w-10 !aspect-square min-w-10 !px-0 !py-0"
            ></Button>
          )}
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
