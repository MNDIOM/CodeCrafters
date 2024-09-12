// EditProfile.jsx
import React, { useState } from 'react';
import axios from 'axios';

const EditProfile = ({ userData, setUserData, setEditMode, setPhotoPreview }) => {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [username, setUsername] = useState(userData.username);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('username', username);
    if (photo) formData.append('photo', photo);

    try {
      const response = await axios.put('/api/users/UserProfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUserData(response.data);
      setPhotoPreview(response.data.photo);
      setEditMode(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Profile Photo</label>
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          Save
        </button>
        <button
          type="button"
          onClick={() => setEditMode(false)}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
        >
          Cancel
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default EditProfile;
