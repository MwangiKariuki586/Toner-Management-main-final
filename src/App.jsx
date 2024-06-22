import { useState } from "react";
import UserContextProvider from "./context/UserContextProvider";
import UserContext from "./context/UserContext";
import "./App.css";
import Homepage from "./components/Homepage";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Requisitionform from "./components/Requisitionform";

import Staff_login from "./components/auth/Staff_login";
import Navbar from "./components/Navbar";
import Signup from "./components/auth/Signup";
import Landing from "./components/Landing";
import Loading from "./components/Loading";
import Success from "./components/Success";
import NotFound from "./components/not found/NotFound";

function App() {
  const Mainlayout = () => {
    return (
      <div className="container">
        <Navbar />
        <Outlet />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/toner_request",
          element: <Landing />,
        },

        {
          path: "/staff_login",
          element: <Staff_login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/loading",
          element: <Loading />,
        },
        {
          path: "/success",
          element: <Success />,
        },
      ],
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);
  return (
    <div className="main">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
