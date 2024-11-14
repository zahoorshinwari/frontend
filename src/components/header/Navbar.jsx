import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaBars, FaTimes } from 'react-icons/fa'; 
import axios from 'axios';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Logout function
  const handleLogout = () => {
    // Remove the auth token (or any other user data) from local storage
    localStorage.removeItem('userToken'); // Change 'token' to your token key if it's different

    // Redirect the user to the login page
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-10 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-blue-400">
            Demo
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/admin" className="hover:text-blue-400">
            Admin
          </Link> 
          <button onClick={handleLogout} className="hover:text-blue-400">
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="bg-gray-700">
          <Link to="/admin" className="block px-4 py-2 text-white hover:bg-gray-600">
            Admin
          </Link> 
          <button onClick={handleLogout} className="block px-4 py-2 text-white hover:bg-gray-600">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
