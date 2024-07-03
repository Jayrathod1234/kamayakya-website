import React, {useContext} from "react";
// import BSection2 from './BlogsPages/BSection2';
// import NavBar from "../components/Navbar";
// import NavBar2 from "../components/Navbar2";
// import Footer from "./screens/Footer";
import AuthContext from "../components/AuthContext";
import BlogSection2 from "./BlogsPages/BlogSection2";
import {Footer, Navbar} from "../components.v2/index.components";

const BlogsPage = () => {
    const {isLoggedIn} = useContext(AuthContext);

    return (
        <div className="  bg-white pricing">
            <main className="  main-container">
                <Navbar/>
                {/* {isLoggedIn ? <NavBar2 /> : <NavBar />} */}
                {/*<BSection1 />*/}
                {/* <BSection2 /> */}
                <BlogSection2/>
                {/* <FaqsNew /> */}
            </main>
            <Footer/>
        </div>
    );
};

export default BlogsPage;
