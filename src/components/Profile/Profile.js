import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({ onCreateModal, onSelectCard, clothingItems, onEdit }) => {
  return (
    <section className="profile">
      <SideBar onEdit={onEdit} />
      <ClothesSection
        onCreateModal={onCreateModal}
        onSelectCard={onSelectCard}
        clothingItems={clothingItems}
      />
    </section>
  );
};

export default Profile;
