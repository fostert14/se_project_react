import "./Header.css";

const Header = () => {
  console.log("Header");

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src="/images/logo.svg" alt="wtwr logo" />
        </div>
        <div>Date</div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button type="text"> Add New Clothes </button>
        </div>
        <div>Name</div>
        <div>
          <img src="/images/avatar.svg" alt="wtwr logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
