import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import SearchClient from "./SearchClient";
import QrScanner from "./QrScanner";
// import SearchClient from "../components/SearchClient";

import Table from "react-bootstrap/Table";
import MenuItem from "./MenuItem";

function Orders() {
  const [menus, setMenus] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [finalPrice, setFinalPrice] = useState(0);
  const [orderToKitchen, setOrderToKitchen] = useState([]);
  const [totalToBill, setTotaltoBill] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get("https://foodstrap-berlin.herokuapp.com/api/products", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setMenus(response.data);
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, []);

  function calcFinalPrice(subtotal) {
    setFinalPrice(finalPrice + subtotal);
  }

  ///////////////////////////////////////////////////
  ///////////////// KITCHEN ////////////////////////
  //////////////////////////////////////////////////
  function toKitchen(subtotal) {
    setOrderToKitchen(orderToKitchen + subtotal);
  }

  const optionsDrinks = menus.map((item, i) => {
    if (item.category === "drink") {
      return (
        <MenuItem
          calcFinalPrice={calcFinalPrice}
          toKitchen={toKitchen}
          item={item}
        />
      );
    }
  });

  const optionsDessert = menus.map((item, i) => {
    if (item.category === "dessert") {
      return (
        <MenuItem
          calcFinalPrice={calcFinalPrice}
          toKitchen={toKitchen}
          item={item}
        />
      );
    }
  });

  const optionsMeat = menus.map((item, i) => {
    if (item.category === "dish") {
      return (
        <MenuItem
          calcFinalPrice={calcFinalPrice}
          toKitchen={toKitchen}
          item={item}
        />
      );
    }
  });

  let pedido = [];
  if (orderToKitchen.length > 0) {
    const Arr = orderToKitchen.split("&&");
    pedido = Arr.map((e) => {
      return <h3>{e}</h3>;
    });
  }
  ///// not working ////////////
  const user = useContext(UserContext);
  console.log(useContext(UserContext));

  // const createBill = (event) => {
  //   event.preventDefault();

  //   const requestBody = {
  //     email,
  //     password,
  //   };
  //   console.log(requestBody);
  //   axios
  //     .post("/api/resto/login", requestBody)
  //     .then((response) => {
  //       console.log(response.data);
  //       const token = response.data.authToken;
  //       // store the token
  //       storeToken(token);
  //       verifyStoredToken().then(() => {
  //         // redirect to homepage
  //         navigate("/");
  //       });
  //     })
  //     .catch((err) => {
  //       const errorDescription = err.response.data.message;
  //       setErrorMessage(errorDescription);
  //     });

  //   setPassword("");
  //   setEmail("");
  // };

  console.log(totalToBill);

  const handleTotaltoBillChange = (e) => setTotaltoBill(e.target.value);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <UserContext.Provider value={user}>
          <QrScanner />
          {/* <SearchClient /> */}
        </UserContext.Provider>
      </div>
      <div className="container col-12 col-sm-7 col-lg-8">
        <form name="tblform">
          <Table striped responsive size="sm">
            <thead>
              <tr>
                <th className="">Menu </th>
                <th className="text-end">Quantity</th>
                <th className="">Price</th>
              </tr>
            </thead>
          </Table>
          <Table striped responsive size="sm">
            <tbody>
              <tr>{optionsMeat}</tr>
            </tbody>
          </Table>
          <Table striped responsive variant="dark" size="sm">
            <tbody>
              <tr>{optionsDrinks}</tr>
            </tbody>
          </Table>
          <Table striped responsive size="sm">
            <tbody>
              <tr>{optionsDessert}</tr>
            </tbody>
          </Table>
          <Table striped responsive size="sm">
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Send Bill"
                    // onclick={createBill}
                  />
                </td>
                <td className="text-end">
                  <input
                    type="text"
                    className="btn fw-bold"
                    onChange={handleTotaltoBillChange}
                    value={`Total: $${finalPrice.toFixed(2)}`}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </form>
        <h2>
          {pedido}
          <hr></hr>
        </h2>
      </div>
    </>
  );
}

export default Orders;
