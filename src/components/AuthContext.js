import { GET_USER, VERIFY_TOKEN_URL } from "@/pages/api/URLs";
import React, { createContext, useState, useLayoutEffect } from "react";

// Create the context
const AuthContext = createContext({
  isLoggedIn: false,
  isSubscribed: false,
  user: {
    id: "",
    username: "",
    mobile: "",
    subscription: [{ plan: "" }],
    created: "",
    email:"",
    fullname:'',
    is_onboard:false
  },
  children: null,
  showLoginModal: false,
  handleLogin: () => {},
  handleCloseLoginModal: () => {},
});

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [user, setUser] = useState({
    id: "",
    username: "",
    mobile: "",
    subscription: [{ plan: "" }],
    created: "",
    email:"",
    fullname:"",
    is_onboard:false,
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const refreshToken = localStorage.getItem("refresh");


  useLayoutEffect(()=>{
      // Check for tokens and logout status
      const refresh = localStorage.getItem("refresh");
      const access = localStorage.getItem("access");
      const hasToken = refresh || access;
      const hasManuallyLoggedOut = localStorage.getItem("hasManuallyLoggedOut");
  
      // If the user has manually logged out, skip further processing
      if (hasManuallyLoggedOut === "true") {
        return;
      }
  
      // If no token exists and logout hasn't been flagged
      if (!hasToken && hasManuallyLoggedOut === null) {
        localStorage.setItem("hasManuallyLoggedOut", "true");
      }
  
      // If tokens exist but logout hasn't been flagged
      if (hasToken && hasManuallyLoggedOut !== "true") {
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        localStorage.setItem("hasManuallyLoggedOut", "true");
      }
  },[])

  useLayoutEffect(() => {
  
    const verifyTokens = async () => {
      if (refreshToken) {
        try {
          const response = await fetch(VERIFY_TOKEN_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: refreshToken }),
          });

          if (response.ok) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error("Error verifying tokens:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    verifyTokens();
  }, [localStorage.getItem("access"), localStorage.getItem("refresh")]);

  useLayoutEffect(() => {
    const getUserDetails = async () => {
      if (refreshToken) {
        try {
          const response = await fetch(GET_USER, {
            method: "GET",
            headers: {
              Authorization: `Token ${refreshToken}`,
            },
          });
          const data = await response.json();
          if (data.is_subscribed === true) {
            setIsSubscribed(true);
          } else {
            setIsSubscribed(false);
          }
          console.log("USER DATA==>", data)
          setUser(data);
        } catch (error) {
          console.error("Error verifying tokens:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    getUserDetails();
  }, [localStorage.getItem("access"), localStorage.getItem("refresh")]);

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isSubscribed,
        user,
        showLoginModal,
        handleLogin,
        handleCloseLoginModal,
        setUser,
        setShowLoginModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
