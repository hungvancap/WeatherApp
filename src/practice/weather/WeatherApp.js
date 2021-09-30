import React, { useState, useEffect } from "react";
import "./style.css";

const API = {
  key: "8d8a7e300ffe83bbdd8278f8c4cf4ad0",
  base: "https://api.openweathermap.org/data/2.5/",
};

const TEMP_THRESHOLD = 20;

function WeatherApp() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [bgImage, setBgImage] = useState([]);

  function setImage(img) {
    setBgImage(img);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(
        `${API.base}weather?q=${query}&lang=vi&units=metric&APPID=${API.key}`
      )
        .then((res) => res.json())
        .then((re) => {
          if (re.main) {
            setWeather(re);
            setBgImage(re.weather[0].main);
          } else {
            alert("Không tìm thấy địa điểm, vui lòng nhập lại");
          }
          setQuery("");
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "Tháng một",
      "Tháng hai",
      "Tháng ba",
      "Tháng tư",
      "Tháng năm",
      "Tháng sáu",
      "Tháng bảy",
      "Tháng tám",
      "Tháng chín",
      "Tháng mười",
      "Tháng mười một",
      "Tháng mười hai",
    ];
    let days = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    <div className={`app ${bgImage}`}>
      <main>
        <div className="container">
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Nhập địa điểm..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
        </div>

        <div className="container">
          {typeof weather.main != "undefined" ? (
            <>
              <div className="location-box">
                <div className="location">
                  {weather.name},{weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°C</div>
                <div className="weather">
                  {capitalizeFirstLetter(weather.weather[0].description)}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </main>
    </div>
  );
}

export default WeatherApp;
