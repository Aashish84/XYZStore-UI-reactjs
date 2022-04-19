import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ItemCard from "./fragments/ItemCard";

export default function Items(props) {
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);

  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("welcome");
  const [range, setRange] = useState(max);
  const param = useParams();

  useEffect(() => {
    allItems.forEach((elem) => {
      if (min > elem.price) {
        setMin(elem.price);
      }
      if (max < elem.price) {
        setMax(elem.price);
      }
    });
    setRange(max);
  }, [allItems, min, max, param.id]);

  function rangeChange(event) {
    setRange(event.target.value);
  }

  function handleFilter() {
    let xar = [];
    allItems.forEach((elem) => {
      const actualPrice = elem.price - (elem.discount / 100) * elem.price;
      if (actualPrice <= range) {
        xar.push(elem);
      }
    });
    setItems(xar);
  }

  const categoryList = props.category.map((elem) => {
    return (
      <div key={elem.id}>
        <Link to={`/items/${elem.id}`}>
          <li> {elem.name} </li>
        </Link>
      </div>
    );
  });

  useEffect(() => {
    let url = "";

    isNaN(param.id)
      ? (url = `http://localhost:8181/api/search?searchKey=${param.id}`)
      : (url = `http://localhost:8181/api/product/category/${param.id}`);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAllItems(data);
        setItems(data);
        fetch(`http://localhost:8181/api/category/${param.id}`)
          .then((res) => res.json())
          .then((data) => setTitle("category :" + data.name))
          .catch(setTitle("search key : " + param.id));
      })
      .catch(setTitle("product notFound for key :" + param.id));
  }, [param.id]);

  const itemCard = items.map((elem) => {
    return <ItemCard key={elem.id} {...elem} handleClick={props.handleClick} />;
  });

  return (
    <main className="home--wrapper">
      <div className="home--title"></div>
      <div className="items ">
        <div className="row">
          <div className="col-3 filter--section bg scroll--hidden">
            <aside className="item--filter">
              <h2>select maximum value</h2>
              <input
                type="range"
                min={min}
                max={max}
                value={range}
                onChange={rangeChange}
              />
              <span>{range}</span>
              <br />
              <button onClick={handleFilter}>filter</button>
              <hr />
              <h2>categories : </h2>
              <ol>{categoryList}</ol>
            </aside>
          </div>
          <div className="col-9 content--section y bg">
            <div className="content--title">
              <span>{title}</span>
            </div>
            <div className="row">{itemCard}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
