import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isCompanyFormOpen, setIsCompanyFormOpen] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({
    companyName: '',
    businessNature: '',
    companyAddress: '',
    companyCity: '',
    companyPhoneNo: '',
    totalAmount: '',
    companyWebsite: '',
  });
  const [customerCount, setCustomerCount] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  axios.defaults.withCredentials = true;

  // Verify user by checking JWT in localStorage
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/login'); // Redirect to login if no token is found
    } else {
      axios.get('https://authentication-black.vercel.app/companies')
        .then(res => {
          setCustomerCount(res.data.data.length);
        })
        .catch(err => {
          console.error('Error fetching companies:', err);
        });
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails({
      ...companyDetails,
      [name]: value,
    });
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    axios.post('https://authentication-black.vercel.app/companies', companyDetails)
      .then(res => {
        setCompanyDetails({
          companyName: '',
          businessNature: '',
          companyAddress: '',
          companyCity: '',
          companyPhoneNo: '',
          totalAmount: '',
          companyWebsite: '',
        });
        setIsCompanyFormOpen(false);
        setCustomerCount(prevCount => prevCount + 1);
        setSuccessMessage('Company data added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(err => {
        console.error('Error submitting company details:', err);
      });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Dashboard</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          onClick={() => setIsCompanyFormOpen(true)}
        >
          Add Company Data
        </button>
      </header>

      <div className="flex justify-around p-6">
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-lg p-6 w-80">
          <Link to={"/allcustomer"} className="block text-center">
            <h1 className="text-2xl font-bold text-white">Total Customers</h1>
            <p className="text-5xl font-extrabold text-white mt-2">{customerCount}</p>
            <div className="mt-4">
              <span className="inline-block bg-white text-blue-600 rounded-full px-4 py-2 font-semibold text-sm shadow-md hover:bg-gray-200 transition duration-300">
                View Customers
              </span>
            </div>
          </Link>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-lg p-6 w-80">
          <Link to={"/allproducts"} className="block text-center">
            <h1 className="text-2xl font-bold text-white">Total Products</h1>
            <p className="text-5xl font-extrabold text-white mt-2">0</p>
            <div className="mt-4">
              <span className="inline-block bg-white text-green-600 rounded-full px-4 py-2 font-semibold text-sm shadow-md hover:bg-gray-200 transition duration-300">
                View Products
              </span>
            </div>
          </Link>
        </div>

        <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg shadow-lg p-6 w-80">
          <Link to={"/favorites"} className="block text-center">
            <h1 className="text-2xl font-bold text-white">Total Favorites</h1>
            <p className="text-5xl font-extrabold text-white mt-2">0</p>
            <div className="mt-4">
              <span className="inline-block bg-white text-purple-600 rounded-full px-4 py-2 font-semibold text-sm shadow-md hover:bg-gray-200 transition duration-300">
                View Favorites
              </span>
            </div>
          </Link>
        </div>
      </div>

      {successMessage && (
        <div className="bg-green-200 text-green-800 p-4 rounded-lg text-center mb-4">
          {successMessage}
        </div>
      )}

      {isCompanyFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Add Company Information</h2>
            <form onSubmit={handleCompanySubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={companyDetails.companyName}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-md w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Business Nature</label>
                <input
                  type="text"
                  name="businessNature"
                  value={companyDetails.businessNature}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-md w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Company Address</label>
                <input
                  type="text"
                  name="companyAddress"
                  value={companyDetails.companyAddress}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-md w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Company City</label>
                <input
                  type="text"
                  name="companyCity"
                  value={companyDetails.companyCity}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-md w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Company Phone Number</label>
                <input
                  type="tel"
                  name="companyPhoneNo"
                  value={companyDetails.companyPhoneNo}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-md w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Total Amount</label>
                <input
                  type="number"
                  name="totalAmount"
                  value={companyDetails.totalAmount}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-md w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Company Website</label>
                <input
                  type="url"
                  name="companyWebsite"
                  value={companyDetails.companyWebsite}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded-md w-full p-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsCompanyFormOpen(false)}
                  className="ml-2 px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-gray-500 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
