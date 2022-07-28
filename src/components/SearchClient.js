import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchClient(props) {
  console.log(props.result);
  const [client, setClient] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`https://foodstrap-berlin.herokuapp.com/api/auth/${props.result}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response);
        const data = response.data;
        console.log(`this is data: ${data}`);
        setClient(data);
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  });
  console.log(`this is client: ${client}`);

  return (
    <>
      {client === null ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <h1>Client Details</h1>
          <h3>{client.username}</h3>
          <h5>{client.email}</h5>
          <h5>{client}</h5>
        </>
      )}
    </>
  );
}

export default SearchClient;
