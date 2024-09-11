import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const formData = {
      identifier,
      password
    };

    try {
      const response = await axios.post('http://localhost:5001/api/users/login', formData);

      if (response.status === 200) {
        setAlertMessage('Login successful!');
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
          navigate('/profile'); 
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        setAlertMessage(error.response.data.message || 'Server error');
        console.error('Server error:', error.response.data);
      } else if (error.request) {
        setAlertMessage('Network error. Please check your connection.');
        console.error('Network error:', error.request);
      } else {
        setAlertMessage('An unexpected error occurred.');
        console.error('Error:', error.message);
      }
      setShowAlert(true);
    }
  };

  const handleForgotPassword = () => {
    alert(`Password reset link sent to ${forgotPasswordEmail}`);
  };

  return (
    <div className="login-container flex justify-center items-center h-screen bg-gradient-to-r from-dark-blue-500 to-indigo-600 dark:from-midnight dark:to-midnight-dark relative overflow-hidden">
      
      {/* Alert Message */}
      {showAlert && (
        <div className={`alert ${alertMessage.includes('error') ? 'alert-error' : 'alert-success'} mb-4 absolute top-4`}>
          <div>
            <span>{alertMessage}</span>
          </div>
        </div>
      )}

      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-3xl transform transition-all duration-500 hover:scale-105 w-full max-w-md"
        style={{ 
          boxShadow: '0 15px 30px rgba(0, 234, 255, 0.3), 0 5px 15px rgba(0, 234, 255, 0.2)',
          transform: 'translateY(-10px)', 
          backdropFilter: '(10px)', 
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white futuristic-title">Login</h2>
        
        {/* Identifier (Email or Username) */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Email or Username</label>
          <input
            type="text"
            placeholder="Enter your email or username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-3 py-3 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-transform duration-300 transform hover:scale-105 futuristic-input"
            required
          />
        </div>
        
        {/* Password */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-3 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-transform duration-300 transform hover:scale-105 futuristic-input pr-12"
            required
          />
          <span
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer transition-transform duration-300 hover:scale-125 dark:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        
        {/* Forgot Password */}
        <div className="mb-4 text-right">
          <button
            type="button"
            className="text-blue-500 dark:text-blue-400 hover:underline text-sm"
            onClick={() => setForgotPasswordVisible(!forgotPasswordVisible)}
          >
            Forgot Password?
          </button>
        </div>
        
        {/* Forgot Password Section */}
        {forgotPasswordVisible && (
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Enter your email to reset password</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              className="w-full px-3 py-3 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-transform duration-300 transform hover:scale-105 futuristic-input"
            />
            <button
              type="button"
              className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 shadow-lg transition-transform duration-300 transform hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
              onClick={handleForgotPassword}
            >
              Reset Password
            </button>
          </div>
        )}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 shadow-lg transition-transform duration-300 transform hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 dark:text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
