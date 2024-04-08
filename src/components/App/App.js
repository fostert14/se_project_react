import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile.js";
import Footer from "../Footer/Footer.js";
import RegisterModal from "../RegisterModal/RegisterModal.js";
import LoginModal from "../LoginModal/LoginModal.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
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
  register,
  login,
  getCurrentUser,
  editProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import EditProfileModal from "../Profile/EditProfileModal/EditProfileModal.js";
import ProtectedRoute from "../../utils/ProtectedRoute.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTempUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cityName, setCityName] = useState("");

  const history = useHistory();

  const handleUserRegister = ({ name, email, password, avatar }) => {
    register({ name, email, password, avatar })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .then((userData) => {
        setCurrentUser(userData);
        setActiveModal("");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        //Improvement: Handle registration failure (display error message to user)
      });
  };

  const handleProfileEdit = ({ name, avatar }) => {
    editProfile({ name, avatar })
      .then((userData) => {
        setCurrentUser(userData);
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
        return getCurrentUser(data.token);
      })
      .then((userData) => {
        console.log("User Data", userData);
        setCurrentUser(userData);
        setActiveModal("");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        //Improvement: Handle registration failure (display error message to user)
      });
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

  //toggle degree switch on Header
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTempUnit === "C" ? "F" : "C");
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
      })
      .catch((error) => {
        console.error("Error fetching weather data", error);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
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
          />
        )}
        {activeModal === "login" && (
          <LoginModal onLogin={handleUserLogin} onClose={handleCloseModal} />
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
