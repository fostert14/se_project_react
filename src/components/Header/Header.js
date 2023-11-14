import "./Header.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";

const getCurrentDate = () => {
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const day = today.getDate();
  return `${month} ${day}`;
};

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logo} alt="wtwr logo" />
          </Link>
        </div>
        <div>{getCurrentDate()}, Kansas City</div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        <div>
          <button
            className="header__avatar-logo-button"
            type="text"
            onClick={onCreateModal}
          >
            + Add Clothes
          </button>
        </div>
        <Link to="/profile">Trevor Foster</Link>
        <div>
          <img
            className="header__avatar-img"
            src={avatar}
            alt="avatar profile"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
