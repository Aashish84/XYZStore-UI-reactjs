import React from "react";
import { Link } from "react-router-dom";

export default function HomeCard(props) {
  return (
    <div className="col-3">
      <div className="card">
        <Link to={`/items/${props.id}`}>
          <div>
            <h1 className="card--title">{props.name}</h1>
            <img
              src={`http://localhost:8181/api/product/image/${props.image}`}
              alt="deer"
              className="card--img"
            />
          </div>
        </Link>
        {props.topProductName !== "new category" && (
          <a href={`/items/${props.topProductName}`}>
            <h3>best of category :): {props.topProductName}</h3>
          </a>
        )}
      </div>
    </div>
  );
}
