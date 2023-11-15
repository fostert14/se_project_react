import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile.js";
import Footer from "../Footer/Footer.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useMemo, useEffect } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min.js";
import AddItemModal from "../AddItemModal/AddItemModal.js";
import { getItems, addItem, deleteItem } from "../../utils/api.js";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTempUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cityName, setCityName] = useState("");

  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const deleteCard = (card) => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== card._id));
      })
      .catch((error) => {
        console.error("Error deleting item", error);
      });
  };

  const onAddItem = (newItem) => {
    setIsLoading(true);

    addItem(newItem)
      .then(() => {
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error adding item", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTempUnit === "C" ? "F" : "C");
  };

  useEffect(() => {
    getItems()
      .then((fetchedItems) => {
        if (fetchedItems) {
          setClothingItems(fetchedItems);
        }
      })
      .catch((error) => {
        console.error("Error fetching items", error);
      });
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const weather = parseWeatherData(data);
        setTemp(weather.temperature);
        setCityName(weather.city);
      })
      .catch((error) => {
        console.error("Error fetching weather data", error);
      });
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTempUnit, handleToggleSwitchChange }}
    >
      <Header onCreateModal={handleCreateModal} cityName={cityName} />

      <Switch>
        <Route exact path="/">
          <Main
            weatherTemp={temp}
            onSelectCard={handleSelectedCard}
            clothingItems={clothingItems}
          />
        </Route>
        <Route path="/profile">
          <Profile
            onCreateModal={handleCreateModal}
            onSelectCard={handleSelectedCard}
            clothingItems={clothingItems}
          />
        </Route>
      </Switch>
      <Footer />
      {activeModal === "create" && (
        <AddItemModal
          selectedCard={selectedCard}
          onClose={handleCloseModal}
          onAddItem={onAddItem}
          isLoading={isLoading}
        />
      )}
      {activeModal === "preview" && (
        <ItemModal
          selectedCard={selectedCard}
          onClose={handleCloseModal}
          onDelete={deleteCard}
        />
      )}
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
