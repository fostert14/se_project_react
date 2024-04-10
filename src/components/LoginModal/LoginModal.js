import React, { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ onClose, onLogin, onSwitchModal, loginFailed }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({ email, password });
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
          Email *
          <input
            className="modal__form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </label>
        <label className={loginFailed ? "modal__message" : ""}>
          {loginFailed ? "Incorrect Password" : "Password"} *
          <input
            className={`modal__form-input ${loginFailed ? "input-error" : ""}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Pasword"
            required
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default LoginModal;
