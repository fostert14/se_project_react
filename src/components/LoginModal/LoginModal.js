import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ onClose, onLogin }) => {
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
    >
      <fieldset className="modal__form-fieldset">
        <input
          className="modal__form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="modal__form-input"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </fieldset>
    </ModalWithForm>
  );
};

export default LoginModal;
