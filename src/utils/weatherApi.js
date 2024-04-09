import { request } from "./api";
import mapApiConditionToType from "../utils/mapApiConditionToType";

const latitude = 39.19;
const longitude = -94.56;
const APIkey = "7bc2cc6d77e4d14c92c883e6ee28dd61";

export const getForecastWeather = () => {
  return request(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  );
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const cityName = data.name;
  const weatherCondition = mapApiConditionToType(data.weather[0].main);
  const weather = {
    temperature: {
      F: `${Math.round(temperature)}°F`,
      C: `${Math.round(((temperature - 32) * 5) / 9)}°C`,
    },
    city: cityName,
    condition: weatherCondition,
  };
  return weather;
};
