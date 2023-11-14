import "./WeatherCard.css";
import { weatherOptions } from "../../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imgSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imgSrcUrl = imgSrc[0].url || "";

  return (
    <section className="weather" id="weather">
      <div className="weather_info">{weatherTemp}</div>
      <div>
        <img src={imgSrcUrl} alt="weather tile" className="weather_image" />
      </div>
    </section>
  );
};

export default WeatherCard;
