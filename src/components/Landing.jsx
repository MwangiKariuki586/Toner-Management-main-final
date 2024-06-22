import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import Staff_login from "./auth/Staff_login";
import Requisitionform from "../components/Requisitionform";
const Landing = () => {
  const { user } = useContext(UserContext);
  return <div>{user ? <Requisitionform /> : <Staff_login />}</div>;
};

export default Landing;
