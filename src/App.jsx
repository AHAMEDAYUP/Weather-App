import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./App.css";
import search from "./assets/search.png";
import Wind from "./assets/wind.png";
import Humidity from "./assets/humidity.png";
import clearDay from "./assets/clearD.png";
import clearNight from "./assets/clearN.png";
import showerNight from "./assets/showerrainN.png";
import showerDay from "./assets/showerrainD.png";
import heavyrainDay from "./assets/heavyrainD.png";
import heavyrainNight from "./assets/heavyrainN.png";
import thunderDay from "./assets/thunderstromD.png";
import thunderNight from "./assets/thunderstromN.png";
import snowDay from "./assets/snowD.png";
import snowNight from "./assets/snowN.png";
import cloudDay from "./assets/fewcloudD.png";
import cloudNight from "./assets/fewcloudN.png";

const Weather = ({ sky, temp, city, country, lat, long, humidity, wind }) => {
  return (
    <>
      <div className="weather">
        <img src={sky} alt="" />
      </div>
      <div className="temp">
        <span>{temp}</span>°C
      </div>
      <div className="city">{city}</div>
      <div className="country">{country}</div>
      <div className="cords">
        <div className="lat">
          <span>Latitude</span>
          <span>{lat}</span>
        </div>
        <div className="long">
          <span>longitude</span>
          <span>{long}</span>
        </div>
      </div>
      <div className="elements">
        <div className="element">
          <div className="elementImg">
            <img src={Humidity} alt="" />
          </div>

          <div className="data">
            <div>{humidity} %</div>
            <div>HUMIDITY</div>
          </div>
        </div>
        <div className="element">
          <div className="elementImg">
            <img src={Wind} alt="" />
          </div>

          <div className="data">
            <div>{wind} Km/h</div>
            <div>WIND</div>
          </div>
        </div>
      </div>
    </>
  );
};
const App = () => {
  const [text, settext] = useState("chennai");
  const [sky, setsky] = useState(clearDay);
  const [temp, settemp] = useState(0);
  const [city, setcity] = useState("london");
  const [country, setcountry] = useState("IN");
  const [lat, setlat] = useState(0);
  const [long, setlong] = useState(0);
  const [humidity, sethumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [loading, setloading] = useState(false);
  const [dataNotFound, setdataNotFound] = useState(false);
  const [error, seterror] = useState(null);

  let weatherIcon = {
    "01d": clearDay,
    "01n": clearNight,
    "02d": cloudDay,
    "02n": cloudNight,
    "03d": cloudDay,
    "03n": cloudNight,
    "04d": cloudDay,
    "04n": cloudNight,
    "09d": showerDay,
    "09n": showerNight,
    "10d": heavyrainDay,
    "10n": heavyrainNight,
    "11d": thunderDay,
    "11n": thunderNight,
    "13d": snowDay,
    "13n": snowNight,
    "50d": snowDay,
    "50n": snowNight,
  };

  Weather.propTypes = {
    sky: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    long: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    wind: PropTypes.number.isRequired,
  };
  async function searching() {
    setloading(true);
    seterror(null)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=3220cfe642f298982e0b4e2734455b8b&units=Metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      if (data.cod === "404") {
        console.log("city not found");
        setdataNotFound(true);
        setloading(false);
        return;
      }
      setcity(data.name);
      setWind(data.wind.speed);
      sethumidity(data.main.humidity);
      setcountry(data.sys.country);
      setlat(data.coord.lat);
      setlong(data.coord.lon);
      settemp(Math.floor(data.main.temp));
      const iconcode = data.weather[0].icon;
      setsky(weatherIcon[iconcode] || clearDay);
      setdataNotFound(false);
    } catch (error) {
      console.log("error:", error);
      seterror("error occur while fetching data");
    } finally {
      setloading(false);
    }
  }
  function handleTextbox(e) {
    settext(e.target.value);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      searching();
    }
  }
  useEffect(function () {
    searching();
  }, []);

  return (
    <div className="main-container">
      <div className="input-container">
        <input
          className="input"
          type="text"
          placeholder="Enter Your City"
          value={text}
          onChange={handleTextbox}
          onKeyDown={handleKeyDown}
        />

        <div className="search">
          <img src={search} alt="" onClick={() => searching()} />
        </div>
      </div>

      {error && <div className="error-container">{error}</div>}
      {loading && <div className="loading-container">Loading...</div>}
      {dataNotFound && (
        <div className="datanotfound-container">City Not Found</div>
      )}
      {!loading && !dataNotFound && !error && (
        <Weather
          sky={sky}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          long={long}
          humidity={humidity}
          wind={wind}
        />
      )}
      <footer>@ Designed By Ahamed</footer>
    </div>
  );
};

export default App;
