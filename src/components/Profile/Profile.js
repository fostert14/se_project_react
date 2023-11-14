import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({ onCreateModal, onSelectCard }) => {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        onCreateModal={onCreateModal}
        onSelectCard={onSelectCard}
      />
    </section>
  );
};

export default Profile;
