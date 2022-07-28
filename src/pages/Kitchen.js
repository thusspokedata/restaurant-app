import React, { useState, useEffect } from "react";
import axios from "axios";

function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get("/api/order/kitchen", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, []);

  const order = orders.map((ord) => {
    return <h1>{ord.total}</h1>;
  });

  return (
    <>
      <h1>this is working now I need just active orders: </h1>
      <h2>{order}</h2>
    </>
  );
}

export default Kitchen;
