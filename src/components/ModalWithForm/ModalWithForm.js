import "./ModalWithForm.css";
import { useEffect } from "react";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  onClose,
  name,
  onSubmit,
  secondaryButtonText,
  onSecondaryButtonClick,
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
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__button-container">
            <button className="modal__submit-button" type="submit">
              {buttonText}
            </button>
            {secondaryButtonText && (
              <button
                className="modal__secondary-button"
                type="button"
                onClick={onSecondaryButtonClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
