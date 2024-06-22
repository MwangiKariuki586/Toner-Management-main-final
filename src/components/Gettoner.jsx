import axios from "../hooks/axios";
import React, { useEffect, useState } from "react";

export const Gettoner = () => {
  const [tonerlist, setTonerlist] = useState([]);

  useEffect(() => {
    getToners();
  }, []);

  const getToners = () => {
    axios
      // .get(`http://localhost:8000/toner/toners/`)
      .get(`https://mwangialex.pythonanywhere.com/toner/toners/`)
      .then((result) => {
        console.log(result);
        setTonerlist(result.data.Toners);
        console.log(tonerlist ? tonerlist : null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const maptoners = tonerlist?.map((res) => {
    return (
      <option key={res.id} value={res.id} className="text_input">
        {res.Toner_name}
      </option>
    );
  });
  return <>{maptoners}</>;
};
