import React, { useState } from "react";
import "./Staff_login.css";
const Signup = () => {
  const [staffID, setStaffID] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const stateChange = () => {
    setPwd(e.target.value);
    console.log(pwd);
  };
  const state2Change = () => {
    setPwd2(e.target.value);
    console.log(pwd2);
  };
  const staffChange = () => {
    setStaffID(e.target.value);
    console.log(staffID);
  };

  return (
    <div className="signin_form">
      <h2>Sign Up</h2>
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
        <button className="btn">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
