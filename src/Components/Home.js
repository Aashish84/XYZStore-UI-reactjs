import React, { useEffect, useState } from "react";
import HomeCard from "./fragments/HomeCard";

export default function Home() {
  const [getData, setAllData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8181/api/category")
      .then((res) => res.json())
      .then((data) => setAllData(data));
  }, []);

  const homeCardJSX = getData.map((elem) => {
    return <HomeCard {...elem} key={elem.id} />;
  });

  return (
    <main className="home--wrapper">
      <div className="home--title">
        <span>Shop by Category</span>
      </div>
      <div className="items">
        <div className="row">{homeCardJSX}</div>
      </div>
    </main>
  );
}
