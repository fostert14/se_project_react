import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
          src={selectedCard.link}
          alt={selectedCard.name}
        />
        <div className="modal__caption">
          <p>{selectedCard.name}</p>
          <div> Weather type: {selectedCard.weather}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
