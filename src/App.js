import React from "react";
import { useEffect, useState } from "react";
import md5 from "md5";
import "./App.css";
import HeroCard from "./components/HeroCard";

const ts = String(10000);
const preHash = ts + process.env.REACT_APP_MARVEL_PK + process.env.REACT_APP_MARVEL_PUK;
const URL = "https://gateway.marvel.com:443/v1/public/characters?";
const placeHolder = "https://www.fdd.cl/wp-content/uploads/2017/09/Test.jpg";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const hash = md5(preHash);
    if (!navigator.onLine) {
      if (localStorage.getItem("heroes") === null) {
        setData([]);
      } else {
        setData(JSON.parse(localStorage.getItem("heroes")));
      }
    } else {
      fetch(
        URL +
          new URLSearchParams({
            ts,
            apikey: process.env.REACT_APP_MARVEL_PUK,
            hash,
            limit: 100,
          })
      )
        .then((res) => res.json())
        .then((results) => {
          setData(results);
          localStorage.setItem("heroes", JSON.stringify(results));
        });
    }
  }, []);

  if (data.data === undefined) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <React.Fragment>
        <div className="grid grid-cols-4 gap-4 m-5">
          {data.data.results.map((hero, key) => {
            return (
              <HeroCard
                name={hero.name}
                description={hero.description === "" ? "No description" : hero.description}
                image={
                  hero.thumbnail === undefined
                    ? placeHolder
                    : `${hero.thumbnail.path}.${hero.thumbnail.extension}`
                }
                key={key}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
