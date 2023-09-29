import "./ModalWithForm.css";
import { useEffect } from "react";

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
}) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`modal modal_type_${name}`} onClick={handleBackgroundClick}>
      <div className="modal__content">
        <button
          className="modal__exit-button"
          type="button"
          onClick={onClose}
        />
        <h3 className="modal__title"> {title} </h3>
        <form className="modal__form">
          {children}
          <button className="modal__submit-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
