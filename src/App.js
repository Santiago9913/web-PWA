import React from "react";
import { useEffect } from "react";
import md5 from "md5";
import "./App.css";
import HeroCard from "./components/HeroCard";

const ts = String(10000);
const preHash = ts + process.env.REACT_APP_MARVEL_PK + process.env.REACT_APP_MARVEL_PUK;
const URL = "https://gateway.marvel.com:443/v1/public/characters?";
let data;

function App() {
  useEffect(() => {
    const hash = md5(preHash);
    if (navigator.onLine) {
      fetch(
        URL +
          new URLSearchParams({
            ts,
            apikey: process.env.REACT_APP_MARVEL_PUK,
            hash,
            limit: 1,
          })
      )
        .then((res) => res.json())
        .then((results) => {
          data = results.data.results;
          console.log(data);
          localStorage.setItem("heroes", data);
        });
    }
  }, []);

  if (navigator.onLine) {
    console.log("Online");
    return (
      <React.Fragment>
        <div className="grid grid-cols-4 gap-4 m-5">
          <HeroCard
            name="Test"
            description="Description Test"
            image="https://www.fdd.cl/wp-content/uploads/2017/09/Test.jpg"
          />
        </div>
      </React.Fragment>
    );
  } else {
    if (localStorage.getItem("heroes") === null) {
      return <h1> No Heroes available</h1>;
    } else {
      data = localStorage.getItem("heroes");
      return (
        <React.Fragment>
          <div className="grid grid-cols-4 gap-4 m-5">
            {data.map((hero, key) => {
              console.log(hero);
              return (
                <HeroCard
                  name={hero.name}
                  description={hero.description}
                  image="https://www.fdd.cl/wp-content/uploads/2017/09/Test.jpg"
                  key={key}
                />
              );
            })}
          </div>
        </React.Fragment>
      );
    }
  }
}

export default App;
