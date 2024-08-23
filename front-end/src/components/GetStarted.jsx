import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function GetStarted() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStartedClick = () => {
    navigate('/questionnaire'); // Navigate to the Questionnaire page
  };

  return (
    <div>
      <h1>Get Started with SunVolt</h1>
      <p>Start your journey to clean energy by following these steps.</p>
      <button onClick={handleGetStartedClick}>Get Started</button> {/* Button to navigate */}
    </div>
  );
}

export default GetStarted;
