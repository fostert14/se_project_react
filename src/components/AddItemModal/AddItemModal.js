import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ onClose, onAddItem }) => {
  const [name, setName] = useState("");
  const [link, setUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };
  const handleWeatherChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link: link, weather: weatherType });
    onClose();
  };

  return (
    <ModalWithForm
      title="New Garment"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="modal__form-fieldset">
        <label>
          Name
          <input
            className="modal__form-input"
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label>
          Image
          <input
            className="modal__form-input"
            type="url"
            name="link"
            minLength="1"
            maxLength="30"
            placeholder="Image URL"
            value={link}
            onChange={handleUrlChange}
          />
        </label>
      </fieldset>
      <p className="modal__subheading">Select the weather type</p>
      <div>
        <div className="modal__radio-button">
          <input
            name="weatherType"
            type="radio"
            id="hot"
            value="hot"
            onChange={handleWeatherChange}
          />
          <label htmlFor="hot">Hot</label>
        </div>
        <div className="modal__radio-button">
          <input
            name="weatherType"
            type="radio"
            id="warm"
            value="warm"
            onChange={handleWeatherChange}
          />
          <label htmlFor="warm">Warm</label>
        </div>
        <div className="modal__radio-button">
          <input
            name="weatherType"
            type="radio"
            id="cold"
            value="cold"
            onChange={handleWeatherChange}
          />
          <label htmlFor="cold">Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
