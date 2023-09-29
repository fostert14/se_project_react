import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card">
      <div>
        <img
          className="card_image"
          src={item.link}
          onClick={(e) => {
            onSelectCard(item);
          }}
        />
      </div>
      <div className="card__elements">
        <div className="card__elements-name">{item.name}</div>
        <button
          className="card__like-button"
          type="button"
          aria-label="Like Button"
        ></button>
      </div>
    </div>
  );
};

export default ItemCard;
