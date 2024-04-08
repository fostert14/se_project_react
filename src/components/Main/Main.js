import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { useMemo, useContext } from "react";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const Main = ({ weatherTemp, onSelectCard, clothingItems, onCardLike }) => {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);
  const tempValue = weatherTemp?.[currentTempUnit];

  const weatherType = useMemo(() => {
    const tempInFahrenheit = weatherTemp?.F
      ? parseInt(weatherTemp.F, 10)
      : null;
    if (tempInFahrenheit) {
      if (tempInFahrenheit >= 86) {
        return "hot";
      } else if (tempInFahrenheit >= 66 && tempInFahrenheit <= 85) {
        return "warm";
      } else if (tempInFahrenheit <= 65) {
        return "cold";
      }
    }
    return undefined;
  }, [weatherTemp, currentTempUnit]);

  const filteredCards = clothingItems.filter((item) => {
    return item?.weather?.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={true} type="sunny" weatherTemp={tempValue} />
      <section className="card_section" id="card-section">
        Today is {tempValue} / You may want to wear:
        <div className="card_items">
          {filteredCards.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onSelectCard={onSelectCard}
              onCardLike={onCardLike}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;
