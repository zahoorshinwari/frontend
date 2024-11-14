import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check for admin token in localStorage
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin'); // Redirect to login page if no token
    }
  }, [navigate]);

  // Fetch users data from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://authentication-black.vercel.app/users'); // Your API endpoint here
        console.log(response);
        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  // Approve a user
  const approveUser = async (userId) => {
    try {
      await axios.post(`https://authentication-black.vercel.app/admins/approve-user/${userId}`); // Approve route
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isApproved: true } : user
      ));
    } catch (err) {
      setError('Failed to approve user');
    }
  };

  // Reject a user
  const rejectUser = async (userId) => {
    try {
      await axios.post(`https://authentication-black.vercel.app/admins/reject-user/${userId}`); // Reject route
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      setError('Failed to reject user');
    }
  };

  // Admin logout
  const logoutAdmin = () => {
    localStorage.removeItem('adminToken'); // Clear the admin token
    navigate("/admin"); // Redirect to login page
  };

  return (
    <div className="p-6 sm:p-8 lg:p-12">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Admin Dashboard</h2>

      <div className="text-right mb-4">
        <button 
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={logoutAdmin}
        >
          Logout
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading users...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="overflow-x-auto mt-6 rounded-lg shadow-lg">
          <table className="min-w-full bg-white rounded-lg border border-gray-200 shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Username</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Address</th>
                <th className="px-4 py-3 text-left text-sm font-medium">City</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Profession</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="px-4 py-2 text-sm text-gray-800">{user._id}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.username}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.phoneNumber}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.address}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.city}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{user.profession}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ 
                      user.isApproved ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600' }`}>
                      {user.isApproved ? 'Approved' : 'Pending Approval'}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {!user.isApproved && (
                      <div className="space-x-2">
                        <button 
                          className="text-green-600 font-semibold hover:underline" 
                          onClick={() => approveUser(user._id)}
                        >
                          Approve
                        </button>
                        <button 
                          className="text-red-600 font-semibold hover:underline" 
                          onClick={() => rejectUser(user._id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    {user.isApproved && (
                      <span className="text-green-600 font-semibold">User Approved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
