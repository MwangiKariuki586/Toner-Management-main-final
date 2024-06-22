import React, { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./Staff_login.css";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
const Staff_login = () => {
  const { setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const { authtoken } = useContext(UserContext);
  const { setAuthtoken } = useContext(UserContext);
  const [staffID, setStaffID] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);
  const [errmmsg, setErrmsg] = useState("");
  const { refreshToken } = useContext(UserContext);
  const { logoutUser } = useContext(UserContext);
  const { isloading } = useContext(UserContext);
  const { setIsloading } = useContext(UserContext);
  const stateChange = (e) => {
    setPwd(e.target.value);
  };
  const staffChange = (e) => {
    setStaffID(e.target.value);
  };
  const navigate = useNavigate();
  const signinUser = (event) => {
    event.preventDefault();
    if (!pwd || !staffID) {
      alert("Please enter yor staffid and password");
      return; // Exit the function early if fields are empty
    } else {
      setIsloading(true);
    }
    axios
      .post(`https://mwangialex.pythonanywhere.com/api/login/`, {
        staffid: staffID,
        password: pwd,
      })
      .then((response) => {
        if (response.status == 200) {
          setIsloading(false);
          setAuthtoken(response);
          setUser(jwtDecode(response.data.access));
          localStorage.setItem("access", response.data.access);
          localStorage.setItem("refresh", response.data.refresh);
          // Set a timeout for logout when the access token expires
          const decodedToken = jwtDecode(response.data.access);
          const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
          const currentTime = new Date().getTime();
          const timeUntilExpiration = expirationTime - currentTime;

          console.log("Timeout set for", timeUntilExpiration, "milliseconds");

          setTimeout(() => {
            console.log("Logout timeout reached. Logging out...");

            logoutUser();
            navigate("/");
          }, timeUntilExpiration);

          navigate("/toner_request");
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setIsloading(false);
          alert("Invalid StaffID");
        } else {
          setIsloading(false);
          alert("Login Failed");
        }
      });
  };
  return (
    <div>
      {isloading ? (
        <Loading />
      ) : (
        <div className="signin_form">
          <h2>Sign in to your account</h2>
          <form className="formsignin">
            <div className="captions">
              <label className="inputlabels" htmlFor="">
                <h4>Staff id</h4>
              </label>
              <input
                className="keyinputs no_spinner"
                type="number"
                placeholder="enter your staffID"
                onChange={staffChange}
              />
            </div>
            <div className="captions">
              <label className="inputlabels" htmlFor="">
                <h4>Password</h4>
              </label>
              <input
                className="keyinputs"
                type="password"
                placeholder="enter your password"
                onChange={stateChange}
              />
            </div>
            <button className="btn" onClick={signinUser}>
              Sign in
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Staff_login;
