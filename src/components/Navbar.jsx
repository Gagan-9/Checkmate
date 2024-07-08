import React from 'react';

const Navbar = ({ setShowFinished, tasksData }) => {
  const handleShowAll = () => {
    setShowFinished(false);
  };

  const handleShowFinished = () => {
    setShowFinished(true);
  };

  return (
    <nav className="flex items-center justify-between bg-red-700 text-white px-8 py-4">
      <div className="flex items-center">
        <div className="logo mr-3">
          {/* Your logo code here */}
          <span className="font-bold text-2xl">Checkmate</span>
        </div>
      </div>
      <ul className="flex gap-5 text-lg">
        <li className="cursor-pointer hover:font-bold transition-all" onClick={handleShowAll}>Home</li>
        <li className="cursor-pointer hover:font-bold transition-all" onClick={handleShowFinished}>Finished Tasks</li>
      </ul>
    </nav>
  );
};

export default Navbar;
