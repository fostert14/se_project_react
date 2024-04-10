import React, { useContext, useState } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import { useForm } from "../../../hooks/useForm";

const EditProfileModal = ({ onClose, onEdit }) => {
  const currentUser = useContext(CurrentUserContext);

  const userName = currentUser ? currentUser.name : "";
  const userAvatar = currentUser ? currentUser.avatar : null;

  const { values, handleChange } = useForm({
    name: userName,
    avatar: userAvatar,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onEdit({ name: values.name, avatar: values.avatar });
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Save Changes"
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit profile"
    >
      <fieldset className="modal__form-fieldset">
        <label>
          Name *
          <input
            className="modal__form-input"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </label>
        <label>
          Avatar *
          <input
            className="modal__form-input"
            type="url"
            name="avatar"
            value={values.avatar}
            onChange={handleChange}
            placeholder="Avatar URL"
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default EditProfileModal;
