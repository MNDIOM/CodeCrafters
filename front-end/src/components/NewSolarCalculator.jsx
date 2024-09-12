import React, { useState } from 'react';

const NewSolarCalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState('');
  const [savings, setSavings] = useState(null);

  const handleCalculate = () => {
    
    const averageSavingsRate = 0.20; 
    const estimatedSavings = monthlyBill * averageSavingsRate * 12; // Annual savings

    setSavings(estimatedSavings.toFixed(2));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Solar Savings Calculator</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">Enter your monthly electric bill to estimate potential annual savings with solar energy.</p>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="monthlyBill">Monthly Electric Bill ($)</label>
        <input
          type="number"
          id="monthlyBill"
          value={monthlyBill}
          onChange={(e) => setMonthlyBill(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Enter your monthly bill"
        />
      </div>
      <button
        onClick={handleCalculate}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Calculate Savings
      </button>
      {savings !== null && (
        <div className="mt-4 text-gray-900 dark:text-white">
          <h3 className="text-lg font-semibold">Estimated Annual Savings</h3>
          <p className="text-xl font-bold">${savings}</p>
        </div>
      )}
    </div>
  );
};

export default NewSolarCalculator;

