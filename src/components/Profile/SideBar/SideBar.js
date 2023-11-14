import avatar from "../../../images/avatar.svg";
import "./SideBar.css";

const SideBar = () => {
  return (
    <section className="sideBar">
      <div>
        <img className="header__avatar-img" src={avatar} alt="avatar profile" />
      </div>
      <h2 className="sideBar__name">Trevor Foster</h2>
    </section>
  );
};

export default SideBar;
