import React, { useContext, useState } from "react";
import ModalWithForm from "../../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

const EditProfileModal = ({ onClose, onEdit }) => {
  const currentUser = useContext(CurrentUserContext);

  const userName = currentUser ? currentUser.name : "";
  const userAvatar = currentUser ? currentUser.avatar : null;

  const [name, setName] = useState(userName);
  const [avatar, setAvatar] = useState(userAvatar);

  const handleSubmit = (e) => {
    e.preventDefault();

    onEdit({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Save Changes"
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit profile"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="url"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        placeholder="Avatar URL"
      />
    </ModalWithForm>
  );
};

export default EditProfileModal;
