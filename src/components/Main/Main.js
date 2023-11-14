import "./Main.css";
import { defaultClothingItems } from "../../utils/constants";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { useMemo, useContext } from "react";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const Main = ({ weatherTemp, onSelectCard }) => {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(currentTempUnit);
  const tempValue = weatherTemp?.temperature?.[currentTempUnit];
  const numericTemp = tempValue ? parseInt(tempValue, 10) : null;

  const weatherType = useMemo(() => {
    if (typeof numericTemp === "number") {
      const tempInFahrenheit =
        currentTempUnit === "C" ? (numericTemp * 9) / 5 + 32 : numericTemp;

      if (tempInFahrenheit >= 86) {
        return "hot";
      } else if (tempInFahrenheit >= 66 && tempInFahrenheit <= 85) {
        return "warm";
      } else if (tempInFahrenheit <= 65) {
        return "cold";
      }
    }
    return undefined;
  }, [numericTemp, currentTempUnit]);

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={true} type="sunny" weatherTemp={tempValue} />
      <section className="card_section" id="card-section">
        Today is {tempValue} / You may want to wear:
        <div className="card_items">
          {filteredCards.map((item) => (
            <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;
