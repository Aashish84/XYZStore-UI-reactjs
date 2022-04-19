import React, { useState } from "react";

export default function CartQuantity(props) {
  const [qty, setQty] = useState(props.quantity);
  const product = props.product;

  function handleChange(event) {
    setQty(parseInt(event.target.value));

    props.handleQuantity({
      quantity: parseInt(event.target.value),
      productId: product,
    });
  }

  function handleDelete() {
    props.handleDelete({
      productId: product,
      remove: true,
    });
  }

  return (
    <>
      <input
        type="number"
        value={qty}
        onChange={handleChange}
        className="cart--input"
        min="1"
        max="10"
        maxLength={2}
        size="100"
        onKeyDown={(e) => e.preventDefault()}
      />
      <button onClick={handleDelete}>remove</button>
    </>
  );
}
