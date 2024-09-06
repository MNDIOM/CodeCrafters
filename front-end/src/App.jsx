import { Route, Routes } from 'react-router-dom';
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
import RoofInfo from './components/RoofInfo';

import './index.css';
import { useAuth } from './context/AuthContext'; 
import { useState } from 'react'; 
import axios from 'axios';

function App() {
  const { logout } = useAuth();
  const [solarData, setSolarData] = useState(null);

  const handleAddressSelect = async (place) => {
    console.log('Selected Address:', place);

    try {
      const response = await axios.post('/api/v1/fetch-solar-data', { address: place });
      setSolarData(response.data);
      console.log('Solar Data:', response.data);
    } catch (error) {
      console.error('Error fetching solar data:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/solarInfos" element={<SolarInfos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/solar-cost-calculator" element={<SolarCostCalculator />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/SunRoofInfo" element={<RoofInfo />} />
      </Routes>
      <Footer />
      <button onClick={logout} className="logout-button">Logout</button>
    </>
  );
}

export default App;
