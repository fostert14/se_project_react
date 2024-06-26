import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile.js";
import Footer from "../Footer/Footer.js";
import RegisterModal from "../RegisterModal/RegisterModal.js";
import LoginModal from "../LoginModal/LoginModal.js";
import { useState, useEffect } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min.js";
import AddItemModal from "../AddItemModal/AddItemModal.js";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import {
  register,
  login,
  editProfile,
  getCurrentUser,
} from "../../utils/auth.js";
import EditProfileModal from "../Profile/EditProfileModal/EditProfileModal.js";
import ProtectedRoute from "../ProtectedRoute.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [weatherCondition, setWeatherCondition] = useState("");

  const history = useHistory();

  const handleUserRegister = ({ name, email, password, avatar }) => {
    setIsLoading(true);
    register({ name, email, password, avatar })
      .then((data) => {
        console.log("Full registration response", data);
        localStorage.setItem("jwt", data.token);
        console.log("Registration token:", data.token);
        console.log("Data.data.token", data.data.token);
        setIsLoggedIn(true);
        return getCurrentUser(data.token);
      })
      .then((userData) => {
        console.log("UserData", userData);
        setCurrentUser(userData);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        setLoginFailed(true);
        //Improvement: Handle registration failure (display error message to user)
      })
      .finally(() => setIsLoading(false));
  };

  const handleProfileEdit = ({ name, avatar }) => {
    setIsLoading(true);
    editProfile({ name, avatar })
      .then((userData) => {
        setCurrentUser(userData);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        //Improvement: Handle registration failure (display error message to user)
      })
      .finally(() => setIsLoading(false));
  };

  const handleUserLogin = ({ email, password }) => {
    setIsLoading(true);
    login({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        return getCurrentUser(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setLoginFailed(true);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser(null);

    history.push("/");
  };

  //modal functionsj

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
  const handleEditModal = () => {
    setActiveModal("edit profile");
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

  //Add new clothing item
  const onAddItem = (newItem) => {
    setIsLoading(true);

    addItem(newItem)
      .then((addedItem) => {
        setClothingItems([addedItem.data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error adding item", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //toggle degree switch on Header
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "C" ? "F" : "C");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((c) => (c._id === id ? updatedCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((c) => (c._id === id ? updatedCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  //useEffects

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
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsLoggedIn(true);
      getCurrentUser(token)
        .then((userData) => {
          setCurrentUser(userData);
          console.log(userData);
        })
        .catch((error) => {
          console.error("Failed to fetch user data", error);
        });
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const weather = parseWeatherData(data);
        setTemp(weather.temperature);
        setCityName(weather.city);
        setWeatherCondition(weather.condition);
        console.log(weatherCondition);
      })
      .catch((error) => {
        console.error("Error fetching weather data", error);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        {!isLoggedIn && <Redirect to="/" />}
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
              weatherCondition={weatherCondition}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
              onCardLike={handleCardLike}
            />
          </Route>
          <ProtectedRoute path="/profile">
            <Profile
              onCreateModal={handleCreateModal}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
              onEdit={handleEditModal}
              onCardLike={handleCardLike}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
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
            onSwitchModal={() => setActiveModal("login")}
          />
        )}
        {activeModal === "login" && (
          <LoginModal
            onLogin={handleUserLogin}
            onClose={handleCloseModal}
            onSwitchModal={() => setActiveModal("sign up")}
            loginFailed={loginFailed}
          />
        )}
        {activeModal === "edit profile" && (
          <EditProfileModal
            onEdit={handleProfileEdit}
            onClose={handleCloseModal}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
