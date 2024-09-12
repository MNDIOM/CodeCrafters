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
    <div className="sign-up-container flex justify-center items-center h-screen bg-gradient-to-r from-dark-blue-500 to-indigo-600 dark:from-midnight dark:to-midnight-dark relative overflow-hidden">
      {showAlert && (
        <div className={`alert ${alertMessage.includes('error') ? 'alert-error' : 'alert-success'} mb-4 absolute top-4`}>
          <div>
            <span>{alertMessage}</span>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-3xl transform transition-all duration-500 hover:scale-105 w-full max-w-md"
        style={{ 
          boxShadow: '0 15px 30px rgba(0, 234, 255, 0.3), 0 5px 15px rgba(0, 234, 255, 0.2)',
          transform: 'translateY(-10px)', 
          backdropFilter: '(10px)', 
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white futuristic-title">Sign Up</h2>
        {/* Input fields */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-3 py-3 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-transform duration-300 transform hover:scale-105 futuristic-input"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-3 py-3 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-transform duration-300 transform hover:scale-105 futuristic-input"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full px-3 py-3 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-transform duration-300 transform hover:scale-105 futuristic-input"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-3 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-transform duration-300 transform hover:scale-105 futuristic-input pr-12"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer transition-transform duration-300 hover:scale-125 dark:text-white"
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? '🙈' : '👁️'}
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
          className={`w-full py-3 px-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 ${
            loading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white text-sm font-medium`}
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
