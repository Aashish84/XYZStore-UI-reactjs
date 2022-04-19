import React from "react";
import { Link } from "react-router-dom";

export default function HomeCard(props) {
  return (
    <div className="col-3">
      <div className="card">
        <h1 className="card--title">{props.name}</h1>
        <Link to={`/items/${props.id}`}>
          <img
            src="http://localhost:8181/api/product/image/deer.jpg"
            alt="deer"
            className="card--img"
          />
          <div className="card--info">seemore</div>
        </Link>
      </div>
    </div>
  );
}
