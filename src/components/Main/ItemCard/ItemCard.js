import "./ItemCard.css";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import { useContext } from "react";

const ItemCard = ({ item, onSelectCard, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);
  const isLikedByCurrentUser = item.likes.includes(currentUser._id);
  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: !isLikedByCurrentUser });
  };
  const likeButtonClass = `card__like-button ${
    isLikedByCurrentUser ? "card__like-button_liked" : "card__like-button"
  }`;

  return (
    <div className="card">
      <div>
        <img
          className="card_image"
          src={item.imageUrl}
          alt={item.name}
          onClick={() => {
            onSelectCard(item);
          }}
        />
      </div>
      <div className="card__elements">
        <p className="card__elements-name">{item.name}</p>
        <button
          className={likeButtonClass}
          type="button"
          aria-label="Like Button"
          onClick={handleLike}
        ></button>
      </div>
    </div>
  );
};

export default ItemCard;
