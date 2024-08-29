import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Hero from './pages/Hero';
import Questionnaire from './components/Questionnaire';
import Footer from './components/Footer';
import Login from './components/Login'; 
import About from './pages/About';
import SolarInfos from './pages/SolarInfos';
import Contact from './pages/Contact';
import SignUp from './components/SignUp';
import SolarCostCalculator from './components/SolarCostCalculator';
import UserProfile from './components/UserProfile'; 
import ProtectedRoute from './components/ProtectedRoute'; 
import RoofInfo from './components/RoofInfo'; // Import the new component
import './index.css';
import { useAuth } from './context/AuthContext'; 

function App() {
  const { logout } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function handleAddress(query) {
    try {
      setQuery(query);
      
      const longLatData = await axios.get(`https://solar.googleapis.com/v1/buildingInsights:findClosest?address=${encodeURIComponent(query)}&apikey=AIzaSyBnBCLNcR_2aqPmcazGCg3XC1sitaFZGpU`);
      const lat = longLatData.data.results[0].geometry.location.lat;
      const lng = longLatData.data.results[0].geometry.location.lng;
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=50000&type=tourist_attraction&key=YOUR_GOOGLE_API_KEY`);
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
    }
  }
  

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/questionnaire" element={<Questionnaire handleAddressSubmit={handleAddress} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/solarInfos" element={<SolarInfos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/solar-cost-calculator" element={<SolarCostCalculator />} />
        <Route path="/user-profile" element={<ProtectedRoute element={<UserProfile />} />} /> {/* Protected Route */}
        <Route path="/roof-info" element={<RoofInfo />} /> {/* New route for roof info */}
      </Routes>
      <Footer />
      <button onClick={logout} className="logout-button">Logout</button> {/* Logout Button */}
    </>
  );
}

export default App;
