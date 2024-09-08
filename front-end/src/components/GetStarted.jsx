import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function GetStarted() {
  const navigate = useNavigate(); 

  const handleGetStartedClick = () => {
    navigate('/questionnaire'); 
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
