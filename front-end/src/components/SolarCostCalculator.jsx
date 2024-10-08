

import React, { useState } from 'react';
import axios from 'axios';

const SolarCostCalculator = () => {
  const [address, setAddress] = useState('');
  const [solarEstimate, setSolarEstimate] = useState(null);
  const [error, setError] = useState(null);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCalculate = async () => {
    try {
      // Fetch latitude and longitude from the backend API
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/SolarData`, {
        address: address,
      });

      const { data } = response;

      if (data) {
        // Assuming the solar cost is returned from the backend based on lat/long
        setSolarEstimate(data.estimatedCost);
        setError(null); // Clear any previous errors
      } else {
        setError('No data found for the given address.');
      }
    } catch (error) {
      console.error('Error calculating solar cost:', error);
      setError('Failed to calculate solar cost. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Solar Cost Calculator</h1>
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Enter Your Address:
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={handleAddressChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <button
        onClick={handleCalculate}
        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Calculate Solar Cost
      </button>

      {error && (
        <div className="mt-4 text-red-500">
          <h2 className="text-xl">Error: {error}</h2>
        </div>
      )}

      {solarEstimate && (
        <div className="mt-4">
          <h2 className="text-xl">Estimated Solar Cost: ${solarEstimate}</h2>
        </div>
      )}
    </div>
  );
};

export default SolarCostCalculator;



















// import React, { useState } from 'react';

// const SolarCostCalculator = () => {
//   const [address, setAddress] = useState('');
//   const [solarEstimate, setSolarEstimate] = useState(null);

//   const handleAddressChange = (e) => {
//     setAddress(e.target.value);
//   };

//   const handleCalculate = async () => {
//     try {
//       // Here you would use Google API (like Google Maps Geocoding API) to calculate solar costs
//       // For demonstration purposes, we'll just set a dummy estimate
//       const estimate = 10000; // Replace this with the actual calculation
//       setSolarEstimate(estimate);
//     } catch (error) {
//       console.error('Error calculating solar cost:', error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Solar Cost Calculator</h1>
//       <div className="mb-4">
//         <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//           Enter Your Address:
//         </label>
//         <input
//           type="text"
//           id="address"
//           name="address"
//           value={address}
//           onChange={handleAddressChange}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//         />
//       </div>
//       <button
//         onClick={handleCalculate}
//         className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
//       >
//         Calculate Solar Cost
//       </button>
//       {solarEstimate && (
//         <div className="mt-4">
//           <h2 className="text-xl">Estimated Solar Cost: ${solarEstimate}</h2>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SolarCostCalculator;
