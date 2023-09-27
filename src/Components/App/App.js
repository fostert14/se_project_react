import "./App.css";
import Header from "../Header/Header";
import WeatherCard from "../Main/WeatherCard/WeatherCard";

function App() {
  return (
    <div>
      <Header />
      <main className="main">
        <WeatherCard day={true} type="sunny" />
        <section id="card-section">card Section</section>
      </main>
    </div>
  );
}

export default App;
