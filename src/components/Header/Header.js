import "./Header.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../../images/logo.svg";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";

const getCurrentDate = () => {
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const day = today.getDate();
  return `${month} ${day}`;
};

const Header = ({ onCreateModal, cityName, isLoggedIn, onSignUp, onLogin }) => {
  const currentUser = useContext(CurrentUserContext);

  const userName = currentUser ? currentUser.name : "";
  const userInitial =
    currentUser && currentUser.name ? currentUser.name[0].toUpperCase() : "";
  const userAvatar = currentUser ? currentUser.avatar : null;

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logo} alt="wtwr logo" />
          </Link>
        </div>
        <div>
          {getCurrentDate()}, {cityName}
        </div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              className="header__avatar-logo-button"
              type="text"
              onClick={onCreateModal}
            >
              + Add Clothes
            </button>
            <Link to="/profile">{userName}</Link>
            {userAvatar ? (
              <img
                className="header__avatar-img"
                src={userAvatar}
                alt="avatar profile"
              />
            ) : (
              <div className="header__avatar-intial">{userInitial}</div>
            )}
          </>
        ) : (
          <>
            <button className="header__login-signup-button" onClick={onSignUp}>
              Sign Up
            </button>
            <button className="header__login-signup-button" onClick={onLogin}>
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
