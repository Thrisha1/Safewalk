import React,{useState} from "react";
import Header from "./Header.jsx";
import MapView from "./MapView";
import BottomNav from "./BottomNav";
import TrackMeButton from "./TrackmeButton.jsx";
import ReportCrimeModal from "./ReportCrimeModal";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  // reportmodal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="dashboard-container h-screen flex flex-col justify-between">
      <Header />
      <MapView />
      <div className="fixed bottom-0 w-full z-10">
        <TrackMeButton />
        <BottomNav openModal={openModal} />
      </div>
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
