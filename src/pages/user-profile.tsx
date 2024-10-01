import React, {useContext} from 'react'
import AuthContext from '@/components/AuthContext';
import UserDetails from "./UserDetails/UserDetails";
import NavBar from "@/components/Navbar";
import NavBar2 from "@/components/Navbar2";
import FaqsNew from "./screens/FaqsNew";
import Footer from "./screens/Footer";
import { Navbar } from '@/components.v2/navbar';
// import {Navbar,Footer} from "@/components.v2/index.components";

const UserProfile = () => {
    const {isLoggedIn} = useContext(AuthContext);
    return (
        <div
            style={{
                // maxWidth: "2000px",
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                // alignItems: "center",
            }}
        >
            {/* {isLoggedIn ? <NavBar2/> : <NavBar/>} */}
            <Navbar/>
            <UserDetails/>
            <FaqsNew/>
            <Footer/>
        </div>
    );
};

export default UserProfile;
