import React, { useState } from 'react';
import axios from 'axios';

const SolarEstimate = () => {
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [solarEstimate, setSolarEstimate] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/profile/solar-estimate', {
        address,
        zipcode,
      });
      setSolarEstimate(response.data.solarEstimate);
    } catch (err) {
      console.error('Error fetching solar estimate:', err);
      setError('Failed to fetch solar estimate.');
    }
  };

  return (
    <div className="solar-estimate mt-6">
      <h2 className="text-xl font-bold mb-4">Get Solar Estimate</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          placeholder="Zipcode"
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Get Estimate
        </button>
      </form>
      {solarEstimate && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Solar Estimate</h3>
          <p>{JSON.stringify(solarEstimate)}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default SolarEstimate;
