import React, { useState, useContext, useEffect } from "react";

export default function MenuItem(props) {
  const [quantity, setQuantity] = useState(0);
  //   [finalPrice, setFinalPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const handleQuantityChange = (e, subtotal) => {
    setQuantity(e.target.value);
    setSubtotal(props.item.price * e.target.value);
    props.calcFinalPrice(props.item.price * e.target.value - subtotal);
  };

  return (
    <>
      <ul>
        <td className="col-4">
          <option
            value={props.item.productID}
            key={props.item._id}
            className="text-start"
          >
            {`${props.item.productName} $${props.item.price}`}
          </option>
        </td>
        <td className="col-1 text-end">
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="0"
            max="25"
            className="col-11 text-end"
            value={quantity}
            onChange={(e) => {
              handleQuantityChange(e, subtotal);
            }}
          />
        </td>
        <td className="col-1 text-end">
          <input
            type=""
            id="quantity"
            name="quantity"
            min="0"
            max="25"
            className="col-11 text-end"
            value={subtotal}
          />
        </td>
      </ul>
    </>
  );
}
