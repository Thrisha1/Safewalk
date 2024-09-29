import {  useState } from 'react';
import supabase from '../../supabase'; // Adjust the path as needed
import toast from 'react-hot-toast';

const AddFriendModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [relation, setRelation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!name || !contactNumber || !relation) {
      toast.error("All fields are required.");
      return;
    }

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('friends') // Ensure this matches your Supabase table name
      .upsert([
        { name, contactNumber, relation } // Ensure these field names match your Supabase table
      ])
      .select()

    if (error) {
      toast.error("Error adding friend: " + error.message);
    } else {
      toast.success("Friend added successfully!");
      onClose(); // Close the modal
      setName('');
      setContactNumber('');
      setRelation('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-black p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4 text-black">Add Friend for SOS</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Contact Number</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Relation</label>
            <input
              type="text"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black rounded px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Add Friend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFriendModal;