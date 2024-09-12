import React, { useState, useEffect } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RoofInfo from './RoofInfo';

const fetchUserData = async () => {
  const { data } = await axios.get('/api/users/profile');
  return data;
};

const UserProfile = () => {
  const navigate = useNavigate();
  const { data: userData, error, isLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [roofData, setRoofData] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    profilePicture: '',
  });

  // Populate user data when fetched
  useEffect(() => {
    if (userData) {
      setProfile({
        name: userData.name || '',
        email: userData.email || '',
        profilePicture: userData.profilePicture || '',
      });
    }
  }, [userData]);

  if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading user data</div>;

  const handleFindRoof = async () => {
    try {
      const { data } = await axios.get(`/api/sunroof?address=${address}&zipcode=${zipcode}`);
      setRoofData(data);
    } catch (error) {
      console.error('Error fetching roof data:', error);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile((prev) => ({ ...prev, profilePicture: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/users/profile', profile);
      navigate('/profile'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('authToken'); 
      await axios.post('/logout'); 
      alert('Successfully logged out'); 
      navigate('/login'); 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-purple-400 via-blue-500 to-teal-500 text-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-center">My Profile</h1>

      {/* Toggle Edit Profile */}
      <div className="text-center mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          onClick={() => setIsEditingProfile(!isEditingProfile)}
        >
          {isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Information */}
      {!isEditingProfile ? (
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 mb-4">
            <img
              src={profile.profilePicture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-full h-full rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
          <h2 className="text-2xl font-semibold">{profile.name}</h2>
          <p className="text-lg">{profile.email}</p>
        </div>
      ) : (
        <form onSubmit={handleProfileUpdate} className="mb-8 space-y-4">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <div className="relative w-32 h-32">
              <img
                src={profile.profilePicture || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-full h-full rounded-full border-4 border-white shadow-lg object-cover"
              />
              <label htmlFor="profilePicture" className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100">
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleProfilePictureChange}
                />
                <div className="bg-black bg-opacity-50 p-2 rounded-full text-white">Change</div>
              </label>
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              value={profile.name}
              onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-64 border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={profile.email}
              onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
              className="mt-1 block w-64 border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </form>
      )}

      {/* Address and Roof Info Section */}
      <div className="p-6 bg-white text-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Find Your Roof Data</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-64 border border-gray-300 rounded-md p-2"
              placeholder="Enter your address"
            />
          </div>
          <div>
            <label htmlFor="zipcode" className="block text-sm font-medium">Zipcode</label>
            <input
              type="text"
              id="zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              className="mt-1 block w-64 border border-gray-300 rounded-md p-2"
              placeholder="Enter your zipcode"
            />
          </div>
          <button
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            onClick={handleFindRoof}
          >
            Let's Find Your Roof
          </button>
        </div>

        {/* Display Roof Information */}
        {roofData && (
          <div className="mt-4">
            <RoofInfo roofData={roofData} />
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="text-center mt-6">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
