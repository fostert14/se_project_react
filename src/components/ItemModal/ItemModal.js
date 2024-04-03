import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose, onDelete }) => {
  const currentUser = useContext(CurrentUserContext);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDelete = () => {
    onDelete(selectedCard);
  };

  const isOwn = selectedCard.owner === currentUser?._id;

  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn
      ? "modal__footer-delete-button_visible"
      : "modal__footer-delete-button_hidden"
  }`;

  return (
    <div className={`modal`} onClick={handleBackgroundClick}>
      <div className="modal__popup-container">
        <button
          className="modal__exit-button"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="modal__popup-image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />
        <div className="modal__footer">
          <div className="modal__footer-caption">
            <p className="modal__footer-caption-item">{selectedCard.name}</p>
            <div> Weather type: {selectedCard.weather}</div>
          </div>
          <button className={itemDeleteButtonClassName} onClick={handleDelete}>
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
