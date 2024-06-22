import axios from "../hooks/axios";
import React, { useEffect, useState } from "react";

export const Getprinter = () => {
  const [printers, setPrinters] = useState([]);

  useEffect(() => {
    getToners();
  }, []);

  const getToners = () => {
    axios
      // .get(`http://localhost:8000/toner/printers/`)
      .get(`https://mwangialex.pythonanywhere.com/toner/printers/`)
      .then((result) => {
        console.log(result);
        setPrinters(result.data.Printer);
        console.log(printers ? printers : null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const mapPrinters = printers.map((res) => {
    return (
      <option key={res.id} value={res.id}>
        {res.Printer_name}
      </option>
    );
  });
  return <>{mapPrinters}</>;
};
