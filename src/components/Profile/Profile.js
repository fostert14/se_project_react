import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  onCreateModal,
  onSelectCard,
  clothingItems,
  onEdit,
  onCardLike,
  onLogout,
}) => {
  return (
    <section className="profile">
      <SideBar onEdit={onEdit} onLogout={onLogout} />
      <ClothesSection
        onCreateModal={onCreateModal}
        onSelectCard={onSelectCard}
        clothingItems={clothingItems}
        onCardLike={onCardLike}
      />
    </section>
  );
};

export default Profile;
