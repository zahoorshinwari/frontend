/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Send login request to the backend
      const response = await axios.post('https://authentication-black.vercel.app/users/login', { email, password });
      
      if (response.status === 200) {
        // Store the JWT token in localStorage or sessionStorage for authentication
        localStorage.setItem('userToken', response.data.data.jwtToken);
        setSuccessMessage(response.data.message);  // Success message
        setTimeout(() => {
          navigate('/dashboard');  // Redirect to the dashboard after successful login
        }, 1500);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);  // Display error message from server
      } else {
        setErrorMessage('An error occurred while logging in. Please try again later.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Log In</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Email" 
              autoComplete="off"
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input 
              type="password" 
              id="password" 
              placeholder="******"
              className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          
          {/* Error Message Display */}
          {errorMessage && (
            <div className="p-2 mt-2 text-center text-red-600 bg-red-100 border border-red-400 rounded">
              {errorMessage}
            </div>
          )}
          
          {/* Success Message Display */}
          {successMessage && (
            <div className="p-2 mt-2 text-center text-green-600 bg-green-100 border border-green-400 rounded">
              {successMessage}
            </div>
          )}

          <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Log In
          </button>

          <div className="flex justify-between mt-4 text-sm text-blue-600">
            <p className="text-gray-600">Don't have an account? 
              <Link to='/signup' className="ml-1 text-blue-600 hover:underline">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
