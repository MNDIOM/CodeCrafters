import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({ name: '', email: '', username: '' });
  const [photo, setPhoto] = useState(null); // State for profile photo
  const [photoPreview, setPhotoPreview] = useState(null); // State for photo preview
  const [zipcode, setZipcode] = useState(''); // State for zipcode
  const [address, setAddress] = useState(''); // State for address
  const [solarEstimate, setSolarEstimate] = useState(null); // State for solar estimate
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get the logout function from AuthContext

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/profile'); // Adjust the API endpoint as needed
        setUserData(response.data);
        setUpdatedData({ 
          name: response.data.name, 
          email: response.data.email, 
          username: response.data.username 
        });
        setPhotoPreview(response.data.photo); // Set initial photo preview
      } catch (err) {
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append('name', updatedData.name);
      formData.append('email', updatedData.email);
      formData.append('username', updatedData.username);
      if (photo) {
        formData.append('photo', photo);
      }
      const response = await axios.put('/api/users/profile/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUserData(response.data);
      setEditMode(false);
    } catch (err) {
      setError('Failed to update user data.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleLogout = () => {
    logout(); // Log out the user
    navigate('/'); // Redirect to home page
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete('/api/users/profile/delete'); // Delete account API
      logout();
      navigate('/');
    } catch (err) {
      setError('Failed to delete account.');
    }
  };

  const handleFetchSolarEstimate = async () => {
    try {
      const response = await axios.post('/api/users/profile/solar-estimate', { zipcode, address });
      setSolarEstimate(response.data.solarEstimate);
    } catch (err) {
      setError('Failed to fetch solar estimate.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-profile p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {userData && !editMode ? (
        <div className="profile-details">
          {userData.photo && (
            <img
              src={userData.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
          )}
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          {/* Add more user details as needed */}
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="profile-edit">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="mt-1 block w-full"
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover mt-2"
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={updatedData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={updatedData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={updatedData.username}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <button
            onClick={handleSave}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      )}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Account Statistics</h2>
        <p><strong>Last Login:</strong> {userData.lastLogin}</p>
        <p><strong>Total Logins:</strong> {userData.totalLogins}</p>
        {/* Add more stats as needed */}
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Get Solar Estimate</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Zipcode</label>
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <button
          onClick={handleFetchSolarEstimate}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Get Solar Estimate
        </button>
        {solarEstimate && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Solar Estimate:</h3>
            <pre>{JSON.stringify(solarEstimate, null, 2)}</pre>
          </div>
        )}
      </div>
      <button
        onClick={() => navigate('/solar-cost-calculator')}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Go to Solar Calculator
      </button>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Logout
      </button>
      <button
        onClick={handleDeleteAccount}
        className="mt-4 bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800"
      >
        Delete Account
      </button>
    </div>
  );
};

export default UserProfile;
