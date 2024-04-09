import "./WeatherCard.css";
import React, { useContext } from "react";
import { weatherOptions } from "../../../utils/constants";
import defaultImg from "../../../images/day/sunny-day.svg";
import { CurrentTemperatureUnitContext } from "../../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const weatherOption = weatherOptions.find(
    (option) => option.day === day && option.type === type
  );
  // const imgSrc = weatherOptions.filter((i) => {
  //   return i.day === day && i.type === type;
  // });

  const imgSrcUrl = weatherOption ? weatherOption.url : defaultImg;

  // const imgSrcUrl = imgSrc[0].url || "";

  return (
    <section className="weather" id="weather">
      <div className="weather_info">{weatherTemp}</div>
      <div>
        <img src={imgSrcUrl} alt={type} className="weather_image" />
      </div>
    </section>
  );
};

export default WeatherCard;
