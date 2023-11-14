import React from "react";
import ItemCard from "../../Main/ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({ onCreateModal, onSelectCard, clothingItems }) => {
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
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;
