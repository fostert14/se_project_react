import React, { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({ onClose, onRegister, onSwitchModal }) => {
  const { values, handleChange } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
      avatar: values.avatar,
    });
  };

  return (
    <ModalWithForm
      title="Register"
      buttonText="Sign Up"
      onClose={onClose}
      onSubmit={handleSubmit}
      name="register"
      secondaryButtonText={"or Log In"}
      onSecondaryButtonClick={onSwitchModal}
    >
      <fieldset className="modal__form-fieldset">
        <label>
          Email *
          <input
            className="modal__form-input"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </label>
        <label>
          Password *
          <input
            className="modal__form-input"
            type="text"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </label>
        <label>
          Confrm Password *
          <input
            className="modal__form-input"
            type="text"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </label>
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
          Avatar
          <input
            className="modal__form-input"
            type="url"
            name="avatar"
            value={values.avatar}
            onChange={handleChange}
            placeholder="Avatar URL"
            required
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default RegisterModal;
