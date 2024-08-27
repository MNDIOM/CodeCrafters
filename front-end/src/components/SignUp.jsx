import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import zxcvbn from 'zxcvbn';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', username: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      const result = zxcvbn(value);
      setPasswordStrength(result);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('Form Data:', formData);

    try {
      const response = await axios.post('http://localhost:5001/api/users/signup', formData);

      if (response.status === 201) {
        setAlertMessage('Thank you for signing up!');
        setShowAlert(true);
        setError(null);

        setTimeout(() => {
          setShowAlert(false);
          navigate('/solar-cost-calculator'); // Redirect to the solar cost calculator page
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        setAlertMessage(error.response.data.message || 'Server error');
      } else if (error.request) {
        // Request was made but no response received
        setAlertMessage('Network error. Please check your connection.');
      } else {
        // Something else happened
        setAlertMessage('An unexpected error occurred.');
      }
      setShowAlert(true);
      console.error('Sign up error:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
      {showAlert && (
        <div className={`alert ${alertMessage.includes('error') ? 'alert-error' : 'alert-success'} mb-4`}>
          <div>
            <span>{alertMessage}</span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-base-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {showPassword ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3.98 8.15A9.953 9.953 0 0112 4.5c5.25 0 9.75 4.5 9.75 10S17.25 25 12 25a9.953 9.953 0 01-8.02-4.85M4.5 12a7.5 7.5 0 0114 0 7.5 7.5 0 01-14 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm4.2 3.8a8.4 8.4 0 10-11.4 0M19 19L5 5"
                />
              )}
            </svg>
          </button>
        </div>
        <div className="mb-6">
          <progress
            className={`progress ${
              passwordStrength.score === 0
                ? 'progress-error'
                : passwordStrength.score <= 2
                ? 'progress-warning'
                : 'progress-success'
            } w-full`}
            value={passwordStrength.score * 25}
            max="100"
          ></progress>
          <div className="text-xs mt-1">
            Password Strength:  {passwordStrength.feedback ? passwordStrength.feedback.suggestions.join(' ') : 'N/A'}
          </div>
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading ? 'bg-gray-600' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
