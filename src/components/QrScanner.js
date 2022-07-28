import React, { Component, useState } from "react";
import QrReader from "react-qr-reader";
import SearchClient from "./SearchClient";

export default function QrCode() {
  const [result, setResult] = useState("");

  const HandleScan = (event) => {
    if (event) {
      setResult(event);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-sm-6">
            <section className="qrcode">
              <QrReader
                delay={300}
                onError={handleError}
                onScan={HandleScan}
                style={{ width: "50%" }}
              />
              <p className="m-5">{`ClientID: ${result}`}</p>
            </section>

            {/* <button class="" onClick={handleClick} value={result}>
              Scanned Code: {result}
            </button> */}
          </div>
          <div>
            <SearchClient result={result} />
          </div>
        </div>
      </div>
    </>
  );
}
