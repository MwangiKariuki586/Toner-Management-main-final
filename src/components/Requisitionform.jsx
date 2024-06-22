import React, { useContext, useEffect, useState } from "react";
import "./Requisitionform.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Gettoner } from "./Gettoner";

import { Getprinter } from "./Getprinter";
import UserContext from "../context/UserContext";
import Loading from "./Loading";

const Requisitionform = () => {
  const [toner_name, setToner_name] = useState("");

  const [printer, setPrinter] = useState("");

  const { logoutUser } = useContext(UserContext);
  const { authtoken } = useContext(UserContext);
  const { refreshToken } = useContext(UserContext);
  const { isloading } = useContext(UserContext);
  const { setIsloading } = useContext(UserContext);
  const tonerValue = (e) => {
    setToner_name(e.target.value);
  };

  const printerValue = (e) => {
    setPrinter(e.target.value);
  };
  const toner2Value = (e) => {
    console.log("Toner Value:", e.target.value);
    setToner_name(e.target.value);
  };
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access");
  const postToner = (event) => {
    event.preventDefault();

    if (!toner_name || !printer) {
      alert("Please select a toner and a printer.");
      return; // Exit the function early if fields are empty
    } else {
      setIsloading(true);
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: accessToken
        ? `Bearer ${accessToken.replace(/"/g, "")}`
        : console.log("token not found"),
    };

    // console.log("Headers:", headers);
    axios
      .post(
        `https://mwangialex.pythonanywhere.com/toner/toner_requests/`,
        {
          toner: toner_name,
          printer_name: printer,
        },
        {
          headers,
        }
      )

      .then((response) => {
        console.log(toner_name);
        setIsloading(false);
        if (response.request.status === 201) {
          // alert("Toner request sent successfully");
          logoutUser();
          navigate("/success");
        }
      })
      .catch((err) => {
        // if (err.response?.status === 400) {
        //   alert("Make sure you entered all the fields");
        // } else {
        //   alert("Error encountered on submition");
        // }
        alert("Error encountered on submition");
      });
  };
  //refreshToken()
  return (
    <div>
      {isloading ? (
        <Loading />
      ) : (
        <div className="request_page">
          <h1>Request Form</h1>
          <form className="request_form">
            <div className="captions">
              <label className="inputlabels" htmlFor="">
                <h4>Toner name</h4>
              </label>
              <select
                value={toner_name}
                className="text_input"
                onChange={(e) => setToner_name(e.target.value)}
              >
                <option className="text_input" value="">
                  Select a toner
                </option>
                <Gettoner />
              </select>
            </div>
            <div className="captions">
              <label className="inputlabels" htmlFor="">
                <h4>Printer name</h4>
              </label>
              <select
                value={printer}
                className="text_input"
                onChange={(e) => setPrinter(e.target.value)}
              >
                <option value="">Select a printer</option>
                <Getprinter />
              </select>
            </div>
            <button className="btn" onClick={postToner}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Requisitionform;
