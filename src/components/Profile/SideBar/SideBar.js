import { useContext } from "react";
import avatar from "../../../images/avatar.svg";
import "./SideBar.css";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

const SideBar = () => {
  const currentUser = useContext(CurrentUserContext);

  const userName = currentUser ? currentUser.name : "";
  const userInitial =
    currentUser && currentUser.name ? currentUser.name[0].toUpperCase() : "";
  const userAvatar = currentUser ? currentUser.avatar : null;

  return (
    <section className="sideBar">
      <div>
        {userAvatar ? (
          <img
            className="sidebar__avatar-img"
            src={userAvatar}
            alt="avatar profile"
          />
        ) : (
          <div className="sidebar__avatar-intial">{userInitial}</div>
        )}
      </div>
      <h2 className="sideBar__name">{userName}</h2>
    </section>
  );
};

export default SideBar;
