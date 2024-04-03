import { useContext } from "react";
import avatar from "../../../images/avatar.svg";
import "./SideBar.css";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

const SideBar = () => {
  const currentUser = useContext(CurrentUserContext);
  const userInitial =
    currentUser && currentUser.name ? currentUser.name[0].toUpperCase() : "";

  return (
    <section className="sideBar">
      <div>
        {currentUser.avatar ? (
          <img
            className="sidebar__avatar-img"
            src={avatar}
            alt="avatar profile"
          />
        ) : (
          <div className="sidebar__avatar-intial">{userInitial}</div>
        )}
      </div>
      <h2 className="sideBar__name">{currentUser.name}</h2>
    </section>
  );
};

export default SideBar;
