import "./Header.css";

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
          <img src={require("../../images/logo.svg").default} alt="wtwr logo" />
        </div>
        <div>{getCurrentDate()}, Kansas City</div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button
            className="header__avatar-logo-button"
            type="text"
            onClick={onCreateModal}
          >
            + Add Clothes
          </button>
        </div>
        <div>Trevor Foster</div>
        <div>
          <img
            className="header__avatar-img"
            src={require("../../images/avatar.svg").default}
            alt="avatar profile"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
