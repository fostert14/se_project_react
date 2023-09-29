import "./ItemModal.css";
import { useEffect } from "react";

const ItemModal = ({ selectedCard, onClose }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <>
      <div className={`modal`} onClick={handleBackgroundClick}>
        <div className="modal__popup-container">
          <button
            className="modal__exit-button"
            type="button"
            onClick={onClose}
          ></button>
          <img className="modal__poupup-image" src={selectedCard.link} />
          <div className="modal__caption">
            <div>{selectedCard.name}</div>
            <div> Weather type: {selectedCard.weather}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemModal;
