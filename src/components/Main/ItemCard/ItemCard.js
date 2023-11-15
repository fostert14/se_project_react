import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card">
      <div>
        <img
          className="card_image"
          src={item.link}
          alt={item.name}
          onClick={(e) => {
            onSelectCard(item);
          }}
        />
      </div>
      <div className="card__elements">
        <p className="card__elements-name">{item.name}</p>
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
