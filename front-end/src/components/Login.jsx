import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios'; 

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

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
    <div className="login-container flex justify-center items-center h-screen">
      {showAlert && (
        <div className={`alert ${alertMessage.includes('error') ? 'alert-error' : 'alert-success'} mb-4`}>
          <div>
            <span>{alertMessage}</span>
          </div>
        </div>
      )}
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email or Username</label>
          <input
            type="text"
            placeholder="Enter your email or username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <span
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        
        <div className="mb-4 text-right">
          <button
            type="button"
            className="text-blue-500 hover:underline text-sm"
            onClick={() => setForgotPasswordVisible(!forgotPasswordVisible)}
          >
            Forgot Password?
          </button>
        </div>
        
        {forgotPasswordVisible && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Enter your email to reset password</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleForgotPassword}
            >
              Reset Password
            </button>
          </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
