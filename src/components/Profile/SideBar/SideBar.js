import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

const SideBar = ({ onEdit, onLogout }) => {
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
        <button onClick={onEdit}>Change Profile Data</button>
        <button onClick={onLogout}>Log Out</button>
      </div>
      <h2 className="sideBar__name">{userName}</h2>
    </section>
  );
};

export default SideBar;
