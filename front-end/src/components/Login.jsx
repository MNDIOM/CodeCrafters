import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic, e.g., send password reset email
    alert(`Password reset link sent to ${forgotPasswordEmail}`);
  };

  return (
    <div className="login-container flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      </form>
    </div>
  );
};

export default Login;
