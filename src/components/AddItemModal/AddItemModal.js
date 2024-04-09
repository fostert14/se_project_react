import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../../src/hooks/useForm";

const AddItemModal = ({ onClose, onAddItem, isLoading }) => {
  const { values, handleChange } = useForm({
    name: "",
    link: "",
    weatherType: "",
  });

  const isFormValid = values.name && values.link && values.weatherType;

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
      buttonText={isLoading ? "Saving..." : "Add garment"}
      isFormValid={isFormValid}
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
            required
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
            required
          />
        </label>
      </fieldset>
      <p className="modal__subheading">Select the weather type</p>
      <div>
        <div className="modal__radio-button" required>
          <input
            name="weatherType"
            type="radio"
            id="hot"
            value="hot"
            onChange={handleChange}
          />
          <label
            htmlFor="hot"
            className={
              values.weatherType === "hot"
                ? "modal__radio-button_selected"
                : "modal__radio-button"
            }
          >
            Hot
          </label>
        </div>
        <div className="modal__radio-button">
          <input
            name="weatherType"
            type="radio"
            id="warm"
            value="warm"
            onChange={handleChange}
          />
          <label
            htmlFor="warm"
            className={
              values.weatherType === "warm"
                ? "modal__radio-button_selected"
                : "modal__radio-button"
            }
          >
            Warm
          </label>
        </div>
        <div className="modal__radio-button">
          <input
            name="weatherType"
            type="radio"
            id="cold"
            value="cold"
            onChange={handleChange}
          />
          <label
            htmlFor="cold"
            className={
              values.weatherType === "cold"
                ? "modal__radio-button_selected"
                : "modal__radio-button"
            }
          >
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
