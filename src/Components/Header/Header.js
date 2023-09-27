import "./Header.css";

const Header = () => {
  console.log("Header");

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={require("../../images/logo.svg").default} alt="wtwr logo" />
        </div>
        <div>Date</div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button type="text"> Add New Clothes </button>
        </div>
        <div>Name</div>
        <div>
          <img
            src={require("../../images/avatar.svg").default}
            alt="avatar profile"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
