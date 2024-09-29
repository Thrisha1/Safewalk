import React, {useState} from "react";
import AddFriendModal from './AddFriendModal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-4 py-2 bg-gray-100">
      <div className="text-purple-600 text-2xl font-bold">
        SafeWalk
      </div>
      <div className="flex flex-col items-end">
        <button className="bg-purple-600 text-white py-2 px-4 rounded-md" onClick={() => setIsModalOpen(true)}>
          Add Friends
        </button>
        <AddFriendModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <p className="text-xs text-gray-500 mt-1">Add a friend to use SOS and Track Me</p>
      </div>
    </header>
  );
};

export default Header;