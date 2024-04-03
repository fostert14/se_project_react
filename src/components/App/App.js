import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile.js";
import Footer from "../Footer/Footer.js";
import RegisterModal from "../RegisterModal/RegisterModal.js";
import LoginModal from "../LoginModal/LoginModal.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useMemo, useEffect } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min.js";
import AddItemModal from "../AddItemModal/AddItemModal.js";
import {
  getItems,
  addItem,
  deleteItem,
  register,
  login,
} from "../../utils/api.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTempUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cityName, setCityName] = useState("");

  const handleUserRegister = ({ name, email, password, avatar }) => {
    register({ name, email, password, avatar })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        //Improvement: Handle registration failure (display error message to user)
      });
  };

  const handleUserLogin = ({ email, password }) => {
    login({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        //Improvement: Handle registration failure (display error message to user)
      });
  };

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
  const handleSignUpModal = () => {
    setActiveModal("sign up");
  };
  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const deleteCard = (card) => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== card._id));
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error deleting item", error);
      });
  };

  const onAddItem = (newItem) => {
    setIsLoading(true);

    addItem(newItem)
      .then((addedItem) => {
        setClothingItems([addedItem, ...clothingItems]);
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
      <Header
        onCreateModal={handleCreateModal}
        cityName={cityName}
        isLoggedIn={isLoggedIn}
        onSignUp={handleSignUpModal}
        onLogin={handleLoginModal}
      />

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
      {activeModal === "sign up" && (
        <RegisterModal
          onRegister={handleUserRegister}
          onClose={handleCloseModal}
        />
      )}
      {activeModal === "login" && (
        <LoginModal onLogin={handleUserLogin} onClose={handleCloseModal} />
      )}
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
