import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
}) => {
  console.log("ModalWithForm");
  return (
    <div className={`modal modal_type_${name}`}>
      <form className="modal__form">
        <div className="modal__content">
          <button
            className="modal__exit-button"
            type="button"
            onClick={onClose}
          ></button>
          <h3 className="modal__title"> {title} </h3>
          <form className="modal__form">{children}</form>
          <button className="modal__submit-button" type="submit">
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalWithForm;
