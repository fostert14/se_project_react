import "./Main.css";
import { defaultClothingItems } from "../../utils/constants";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";

const Main = ({ weatherTemp, onSelectCard }) => (
  <main className="main">
    <WeatherCard day={true} type="sunny" weatherTemp={weatherTemp} />
    <section className="card_section" id="card-section">
      Today is {weatherTemp} / You may want to wear:
      <div className="card_items">
        {defaultClothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
        ))}
      </div>
    </section>
  </main>
);

export default Main;
