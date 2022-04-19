import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Items from "./Components/Items";
import Cart from "./Components/Cart";

import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  const [cartItem, setCartItem] = useState([]);
  const [category, setCategory] = useState([]);

  function removeAllCartItem() {
    setCartItem([]);
  }

  function insertCustomer(data) {
    let tmp = [];
    for (let elem of cartItem) {
      elem = {
        ...elem,
        customer: data,
      };
      tmp.push(elem);
    }
    return tmp;
  }

  function addIdOnCart(data) {
    setCartItem((prev) => {
      let f = false;
      let tmp = [];

      for (let elem of prev) {
        if (elem.product.id === data.product.id) {
          f = true;
          break;
        }
      }

      f ? (tmp = prev) : (tmp = [...prev, data]);

      return tmp;
    });
    alert("item added go to cart section to view items");
  }

  function changeQuantity(data) {
    setCartItem((prev) => {
      let tmp = [];
      for (let elem of prev) {
        if (elem.product.id === data.productId) {
          let qty = data.quantity;
          elem = {
            ...elem,
            quantity: qty,
          };
        }
        tmp.push(elem);
      }
      return tmp;
    });
  }

  function deleteFromCart(data) {
    setCartItem((prev) => {
      let tmp = [];
      for (let elem of prev) {
        if (elem.product.id !== data.productId) {
          tmp.push(elem);
        }
      }
      return tmp;
    });
  }

  useEffect(() => {
    fetch("http://localhost:8181/api/category")
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/items/:id"
          element={<Items category={category} handleClick={addIdOnCart} />}
        />
        <Route path="/items" element={<Items category={category} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItem={cartItem}
              handleQuantity={changeQuantity}
              handleDelete={deleteFromCart}
              insertCustomer={insertCustomer}
              removeAllCartItem={removeAllCartItem}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
