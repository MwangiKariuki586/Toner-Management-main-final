import { createContext, useCallback, useState } from "react";

import UserContext from "./UserContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useEffect } from "react";

const UserContextProvider = ({ children }) => {
  const auth = localStorage.getItem("access")
    ? localStorage.getItem("access")
    : null;
  const authenticate = localStorage.getItem("access")
    ? jwtDecode(localStorage.getItem("access"))
    : null;
  const accessrefresh = localStorage.getItem("refresh")
    ? localStorage.getItem("refresh")
    : null;
  const [user, setUser] = useState(authenticate);
  const [authtoken, setAuthtoken] = useState(auth);
  const [isloading, setIsloading] = useState(false);

  const logoutUser = () => {
    setAuthtoken(null);
    setUser(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };
  const refreshToken = () => {
    axios
      .post(`http://localhost:8000/api/refresh/`, { refresh: accessrefresh })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("access", JSON.stringify(res.data.access));
        } else {
          logoutUser();
        }
      })
      .catch((error) => {
        console.error("Error refreshing token:", error);
        logoutUser();
      });
  };
  const memoizedRefreshToken = useCallback(() => {
    refreshToken();
  }, [refreshToken]);

  useEffect(() => {
    // Check if the user is logged in before setting up the interval
    if (accessrefresh) {
      const intervalId = setInterval(() => {
        memoizedRefreshToken();
      }, 120000);

      return () => clearInterval(intervalId);
    }

    // Cleanup function (clearInterval) will run immediately if the user is not logged in
  }, [accessrefresh, memoizedRefreshToken]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        authtoken,
        setAuthtoken,
        logoutUser,
        refreshToken,
        isloading,
        setIsloading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
