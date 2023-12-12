// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold">
          NYC Violations
        </Link>
        <div className="space-x-4">
          <Link to="/dob" className="nav-link">
            DOB Violations
          </Link>
          <Link to="/ecb" className="nav-link">
            ECB Violations
          </Link>
          <Link to="/fdny" className="nav-link">
            FDNY Violations
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
