import React, { useState } from 'react';
import supabase from '../../supabase'; // Ensure Supabase is correctly initialized
import CrimePointSelector from './CrimePointSelector';
import toast, { Toaster } from 'react-hot-toast';

const ReportCrimeModal = ({ isOpen, onClose, onSave }) => {
  const [crimeName, setCrimeName] = useState('');
  const [crimePlace, setCrimePlace] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSubmit = async () => {
    if (!crimeName || !crimePlace || !district || !selectedLocation) {
      alert("Please fill in all fields and select a location.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('crimeReports') // Table name in Supabase
        .insert([{
          crime_name: crimeName,
          crime_place: crimePlace,
          district,
          long: selectedLocation.lat,
          lat: selectedLocation.lng,
        }]);

      if (error) {
        console.error('Error saving crime report:', error);
      } else {
        toast.success("Crime report added successfully!");
        onSave(); // Call callback to close the modal after saving
      }
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    // Modal container that overlays the entire screen
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'} flex items-center justify-center`}>
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black opacity-50"></div>
      
      {/* Modal content */}
      <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg z-50 p-6 relative h-54 text-black overflow-auto">
        <h2 className="text-xl font-bold mb-4">Report a Crime</h2>
        <div className="mb-4">
          <label>Crime Name:</label>
          <input
            type="text"
            value={crimeName}
            onChange={(e) => setCrimeName(e.target.value)}
            className="border w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label>Crime Place:</label>
          <input
            type="text"
            value={crimePlace}
            onChange={(e) => setCrimePlace(e.target.value)}
            className="border w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label>District:</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="border w-full p-2"
          />
        </div>
        
        {/* MapView Component for Location Selection */}
        <div className="mb-4 h-44">
          <h3 className="text-lg">Select Crime Location on Map:</h3>
          <div className="h-20">
            <CrimePointSelector onLocationSelect={(loc) => setSelectedLocation(loc)} />
          </div>
        </div>

        <div className="flex justify-between z-10">
          <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
            Submit Report
          </button>
          <button onClick={onClose} className="bg-red-500 text-white p-2 rounded">
            Close
          </button>
        </div>
      </div>
      {/* Toaster for showing toast messages */}
      <Toaster position="top-right" />
    </div>
  );
};

export default ReportCrimeModal;
