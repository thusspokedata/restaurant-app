import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "react-bootstrap/Table";
import MenuItem from "../components/MenuItem";

function Orders() {
  const [menus, setMenus] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get("/api/products", {
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

  const optionsDrinks = menus.map((item, i) => {
    if (item.category === "drink") {
      return <MenuItem calcFinalPrice={calcFinalPrice} item={item} />;
    }
  });

  const optionsDessert = menus.map((item, i) => {
    if (item.category === "dessert") {
      return <MenuItem calcFinalPrice={calcFinalPrice} item={item} />;
    }
  });

  const optionsMeat = menus.map((item, i) => {
    if (item.category === "dish") {
      return <MenuItem calcFinalPrice={calcFinalPrice} item={item} />;
    }
  });

  return (
    <>
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
                    // onclick="createBill()"
                  />
                </td>
                <td className="text-end">
                  <input
                    type="text"
                    className="btn fw-bold"
                    value={`Total: $${finalPrice}`}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </form>
      </div>
    </>
  );
}

export default Orders;
