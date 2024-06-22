import React, { useState, useContext } from "react";
import logo from "../assets/logo.png";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDropdown } from "react-icons/io";
import UserContext from "../context/UserContext";
const Navbar = () => {
  const { user } = useContext(UserContext);
  const { logoutUser } = useContext(UserContext);
  const [hide, setHide] = useState(true);
  const hideLogin = () => {
    setHide(!hide);
  };
  return (
    <nav className="navbar">
      <div className="logo_div">
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/toner_request">
          <li>Toner Request</li>
        </Link>
        {user ? (
          <li onClick={logoutUser}>Logout</li>
        ) : (
          <li className="login">
            <div onClick={hideLogin} className="login_options">
              <span>Login</span>
              <IoIosArrowDropdown style={{ width: "18px" }} />
            </div>
            <div className={hide ? "options hide" : "options"}>
              <Link
                className="link"
                onClick={hideLogin}
                style={{ color: "inherit" }}
                to="/staff_login"
              >
                Staff
              </Link>
              <Link
                className="link"
                onClick={hideLogin}
                style={{ color: "inherit" }}
                to="http://localhost:8000/admin"
                target="_blank"
              >
                Admin
              </Link>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
