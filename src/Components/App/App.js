import "./App.css";
import Header from "../Header/Header";

function App() {
  return (
    <div>
      <Header />
      <main className="main">
        <section className="weather" id="weather">
          <div className="weather_info">75F</div>
          <div>
            <img
              src="/images/day/sunny-day.svg"
              alt="weather tile"
              className="weather_image"
            />
          </div>
        </section>
        <section id="card-section">card Section</section>
      </main>
    </div>
  );
}

export default App;
