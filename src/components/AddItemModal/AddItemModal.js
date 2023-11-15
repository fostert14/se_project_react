import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../hooks/useForm";

const AddItemModal = ({ onClose, onAddItem }) => {
  const { values, handleChange } = useForm({
    name: "",
    link: "",
    weatherType: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({
      name: values.name,
      imageUrl: values.link,
      weather: values.weatherType,
    });
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
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Image
          <input
            className="modal__form-input"
            type="url"
            name="link"
            minLength="1"
            maxLength="3000"
            placeholder="Image URL"
            value={values.link}
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <label htmlFor="hot">Hot</label>
        </div>
        <div className="modal__radio-button">
          <input
            name="weatherType"
            type="radio"
            id="warm"
            value="warm"
            onChange={handleChange}
          />
          <label htmlFor="warm">Warm</label>
        </div>
        <div className="modal__radio-button">
          <input
            name="weatherType"
            type="radio"
            id="cold"
            value="cold"
            onChange={handleChange}
          />
          <label htmlFor="cold">Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
