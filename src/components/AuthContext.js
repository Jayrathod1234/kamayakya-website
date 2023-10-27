import { GET_USER, VERIFY_TOKEN_URL } from "@/pages/api/URLs";
import React, { createContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext({
  isLoggedIn: false,
  isSubscribed: false,
  children: null,
});

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const refreshToken = localStorage.getItem("refresh");

  useEffect(() => {
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

  useEffect(() => {
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

  return (
    <AuthContext.Provider value={{ isLoggedIn, isSubscribed }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
