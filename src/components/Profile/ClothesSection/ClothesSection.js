import React, { useContext } from "react";
import ItemCard from "../../Main/ItemCard/ItemCard";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import "./ClothesSection.css";

const ClothesSection = ({
  onCreateModal,
  onSelectCard,
  clothingItems,
  onCardLike,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothesSection">
      <div className="clothesSection__header">
        <h2 className="clothesSection__title">Your items</h2>
        <button
          className="clothesSection__button"
          type="text"
          onClick={onCreateModal}
        >
          + Add New
        </button>
      </div>
      <div className="clothesSection__cards">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onSelectCard={onSelectCard}
            onCardLike={onCardLike}
          />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;
