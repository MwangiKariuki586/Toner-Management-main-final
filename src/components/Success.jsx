import React, { useContext } from "react";
import "./success.css";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Success = () => {
  const { logoutUser } = useContext(UserContext);
  return (
    <div className="success_wrapper">
      <div className="card">
        <div className="checkmark_wrapper">
          <i className="checkmark">✓</i>
        </div>
        <h1 className="h1">Success</h1>
        <p className="p">Toner request sent successfully</p>
        <Link to={"/"}>
          <button className="btn">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
