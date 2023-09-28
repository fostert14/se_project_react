import "./App.css";
import Header from "../Header/Header";
import WeatherCard from "../Main/WeatherCard/WeatherCard";
import ItemCard from "../Main/ItemCard/ItemCard";
import Main from "../Main/Main";

function App() {
  const weatherTemp = "65°F";

  return (
    <div>
      <Header />
      <Main weatherTemp={weatherTemp} />
    </div>
  );
}

export default App;
