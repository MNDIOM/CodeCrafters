import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RoofInfo = () => {
  const [roofData, setRoofData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoofData = async () => {
      const savedData = localStorage.getItem('questionnaireData');
      if (!savedData) {
        navigate('/'); 
        return;
      }

      const { roofLocation } = JSON.parse(savedData);
      try {
        
        const response = await axios.get(`https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=37.27AIzaSyA5trK873b55Yt3pmo1Z3rlrG9LITTEy46464&location.longitude=-121.7530949&key=iU`);
        setRoofData(response.data);
      } catch (error) {
        console.error("Error fetching roof data: ", error);
      }
    };

    fetchRoofData();
  }, [navigate]);

  return (
    <div>
      <h1>Roof Information</h1>
      {roofData ? (
        <div>
          <h2>Roof Size: {roofData.size} square feet</h2>
          {/* Render more details about the roof here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RoofInfo;
