import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gray-100 blur-sm" style={{ backdropFilter: 'blur(100px)' }}></div>
      <div className="absolute inset-0" style={{ backgroundImage: `url('https://wallpapers.com/images/featured/new-york-city-5oaa14h4mw6w3o71.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl text-center relative z-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">NYC Violations App</h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore and manage various violations data in New York City.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/dob" className="bg-blue-500 text-white px-6 py-4 rounded hover:bg-green-600">
            Explore DOB Violations
          </Link>
          <Link to="/ecb" className="bg-blue-500 text-white px-6 py-4 rounded hover:bg-green-600">
            Explore ECB Violations
          </Link>
          <Link to="/fdny" className="bg-blue-500 text-white px-6 py-4 rounded hover:bg-green-600">
            Explore FDNY Violations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
