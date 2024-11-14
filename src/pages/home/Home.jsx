import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-gray-800 text-4xl font-bold mb-4">Welcome to Our Dashboard!</h1>
      <p className="text-gray-600 text-lg mb-8 text-center">
        Manage your company data efficiently and effortlessly. 
        <br />
        Explore the features and start adding your customers today!
      </p>
      <Link to={"/dashboard"} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
        Dashboard
      </Link>
    </div>
  );
}

export default Home;
