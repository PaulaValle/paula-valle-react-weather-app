import "./styles.css";
import Footer from "./footer.js";
import Head from "./head.js";
import React from "react";
import ReactDOM from "react-dom";

export default function App() {
  return (
    <div className="App">
      <Head />
      <div class="container">
        <form id="search-bar">
          <input
            type="text"
            placeholder="Search a city"
            class="searchbar col-7"
            id="search-city-input"
          />
          <input type="submit" value="Search" class="searchbutton col-2" />
          <input type="button" value="Current" class="currentbutton col-2" />
        </form>

        <div>
          <section class="firstgradeinfo positionInfo">
            <p>
              <strong class="highlight">
                <span id="city">Granada</span>{" "}
              </strong>
              <br />
              <span id="date-month"> Monday (i), Monthday </span>
              <br />
              <span class="smaller">Wind speed: </span>
              <span class="smaller" id="wind">
                20 km/h
              </span>
              <br />
              <span class="smaller" id="description">
                {" "}
                Celsius{" "}
              </span>
            </p>
          </section>
          <section class="firstgradeinfo temperature">
            <p>
              <span class="todaytemperature" id="today-temperature">
                20º
              </span>
              <br />
              <span class="averagetemperature" id="average-temperature">
                5º/ 25º
              </span>
            </p>
          </section>
          <section class="todayicon firstgradeinfo">
            <img
              src="https://openweathermap.org/img/wn/01d@2x.png"
              id="big-icon"
              alt="Clear sky"
            />
          </section>
        </div>

        <hr class="spacing" />

        <div id="spacing">
          <section id="forecast"></section>
        </div>
      </div>
      <Footer />
      <script src="src/weatherappscript.js"></script>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
