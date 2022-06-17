import React, { useState } from "react";
import CartQuantity from "./fragments/CartQuantity";

export default function Cart(props) {
  const [formData, setFormData] = useState({
    contact: "",
    name: "",
    email: "",
  });

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const requestOpt = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    fetch("http://localhost:8181/api/customer", requestOpt)
      .then((res) => res.json())
      .then((data) => {
        const reqOpn = {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(props.insertCustomer(data)),
        };
        fetch("http://localhost:8181/api/ordereditem/multiple", reqOpn).then(
          (res) => {
            if (res) {
              alert("successfully placed order");
              props.removeAllCartItem();
            } else alert("error");
          }
        );
      });
    setFormData({
      contact: "",
      name: "",
      email: "",
    });
  }

  const cartList = props.cartItem.map((elem) => {
    return (
      <li key={elem.product.id}>
        {elem.name}
        <CartQuantity
          quantity={elem.quantity}
          handleQuantity={props.handleQuantity}
          handleDelete={props.handleDelete}
          product={elem.product.id}
        />
        {/* <input type="number" value={elem.quantity} onChange={()=>props.changeQuantity()} /> */}
        price : {elem.actualPrice}
      </li>
    );
  });
  return (
    <>
      <div>
        <h1>this is cart</h1>
        <ol className="cart--item">{cartList}</ol>
      </div>
      <hr />
      <div>
        <form onSubmit={handleSubmit}>
          email :{" "}
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
          />
          <span
            style={{ color: "red" }}
            title="this is required field and should not be empty"
          >
            *
          </span>
          <br />
          <br />
          name :{" "}
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />
          <span
            style={{ color: "red" }}
            title="this is required field and should not be empty"
          >
            *
          </span>
          <br />
          <br />
          number :{" "}
          <input
            required
            type="number"
            name="contact"
            value={formData.contact}
            onChange={handleFormChange}
          />
          <span
            style={{ color: "red" }}
            title="this is required field and should not be empty"
          >
            *
          </span>
          <br />
          <br />
          <button>submit</button>
        </form>
      </div>
    </>
  );
}
