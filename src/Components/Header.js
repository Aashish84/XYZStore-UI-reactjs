import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [searchKey, setSearchKey] = useState("");

  let navigate = useNavigate();

  function handleChange(event) {
    setSearchKey(event.target.value);
  }

  function handleClickSearch() {
    navigate(`/items/${searchKey}`);
  }
  function handleSearch(e) {
    if (e.key === "Enter") {
      navigate(`/items/${searchKey}`);
    }
  }

  return (
    <header className="header">
      <div className="logo">
        <h1>
          <Link to="/">XYZstore</Link>
        </h1>
      </div>
      <div className="search">
        <input
          type="text"
          value={searchKey}
          onChange={handleChange}
          onKeyDown={handleSearch}
        />
        <button onClick={handleClickSearch}>search</button>
      </div>
      <div className="icon">
        <span>
          <Link to="/cart">cart</Link>
        </span>
      </div>
    </header>
  );
}
