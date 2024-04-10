import React, { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../../src/hooks/useForm";

const LoginModal = ({ onClose, onLogin, onSwitchModal, loginFailed }) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({ email: values.email, password: values.password });
  };

  return (
    <ModalWithForm
      title="Login"
      buttonText="Log In"
      onClose={onClose}
      onSubmit={handleSubmit}
      name="login"
      onSecondaryButtonClick={onSwitchModal}
      secondaryButtonText={"or Sign  Up"}
    >
      <fieldset className="modal__form-fieldset">
        <label>
          Email
          <input
            className="modal__form-input"
            type="email"
            name="email"
            value={values.name}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </label>
        <label className={loginFailed ? "modal__message" : ""}>
          {loginFailed ? "Incorrect Password" : "Password"}
          <input
            className={`modal__form-input ${loginFailed ? "input-error" : ""}`}
            type="password"
            name="password"
            value={values.name}
            onChange={handleChange}
            placeholder="Pasword"
            required
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default LoginModal;
