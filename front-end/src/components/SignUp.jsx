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

    try {
      const response = await axios.post('http://localhost:5001/api/users/signup', formData);

      if (response.status === 201) {
        setAlertMessage('Thank you for signing up!');
        setShowAlert(true);
        setError(null);

        setTimeout(() => {
          setShowAlert(false);
          navigate('/profile'); // Redirect to the profile page after signup
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        setAlertMessage(error.response.data.message || 'Server error');
      } else if (error.request) {
        setAlertMessage('Network error. Please check your connection.');
      } else {
        setAlertMessage('An unexpected error occurred.');
      }
      setShowAlert(true);
      console.error('Sign up error:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-dark-blue-50 to-indigo-50 p-4">
      {showAlert && (
        <div className={`alert ${alertMessage.includes('error') ? 'alert-error' : 'alert-success'} mb-4 shadow-lg rounded-lg`}>
          <div>
            <span>{alertMessage}</span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Sign Up</h2>
        {/* Input fields */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 pr-12"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825L12 16.125l-1.875 2.7a10 10 0 01-7.372-9.372m15.496-.001a10.001 10.001 0 01-7.373 9.373M12 6.125L13.875 3.75M12 6.125L10.125 3.75M9 12h6"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12h.01M19.07 4.93a10 10 0 010 14.14M12 9a3 3 0 100 6 3 3 0 000-6zm0 10.93A10 10 0 014.93 4.93M12 2v.01"
                  />
                </svg>
              )}
            </span>
          </div>
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
            Password Strength: {passwordStrength.feedback ? passwordStrength.feedback.suggestions.join(' ') : 'N/A'}
          </div>
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white ${
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
