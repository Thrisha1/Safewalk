import React,{useState} from "react";
import Header from "./Header.jsx";
import MapView from "./MapView";
import BottomNav from "./BottomNav";
import TrackMeButton from "./TrackmeButton.jsx";
import ReportCrimeModal from "./ReportCrimeModal";

const Dashboard = () => {
  // reportmodal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="dashboard-container">
      <Header />
      <MapView hgt="h-[400px]" />
      <TrackMeButton />
      <BottomNav openModal={openModal} />
      {/* Render the modal */}
      {isModalOpen && (
        <ReportCrimeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={closeModal} // You can adjust this for saving crime reports
        />
      )}
    </div>
  );
};

export default Dashboard;
