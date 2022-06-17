import React from "react";

export default function ItemCard(props) {
  const actualPrice = props.price - (props.discount / 100) * props.price;

  const tmp = {
    product: {
      id: props.id,
    },
    customer: {
      id: 0,
    },
    quantity: 1,
    name: props.name,
    actualPrice: actualPrice,
  };

  return (
    <div className="col-4">
      <div className="card">
        <img
          src={`http://localhost:8181/api/product/image/${props.image}`}
          alt="deer"
          className="card--img"
        />
        <div>
          <h1 className="card--title--two">{props.name}</h1>
          <div className="card--info">
            <h4 className="card--price">
              Rs{actualPrice}
              <strike>Rs{props.price}</strike>
            </h4>
            <button
              className="addtocart"
              onClick={() => props.handleClick(tmp)}
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
