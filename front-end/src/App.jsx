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
import AddressAutocomplete from './components/AddressAutocomplete'; // Add this line
import MapComponent from './components/MapComponent'; // Add this line
import './index.css';
import { useAuth } from './context/AuthContext'; 

function App() {
  const { logout } = useAuth();
  const handleAddressSelect = (place) => {
    console.log('Selected Address:', place);
    
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
        <Route path="/user-profile" element={<ProtectedRoute element={<UserProfile />} />} /> {/* Protected Route */}
        <Route path="/roof-info" element={<RoofInfo />} /> {/* New route for roof info */}
      </Routes>
      <AddressAutocomplete onAddressSelect={handleAddressSelect} /> {/* Add this line */}
      <MapComponent /> {/* Add this line */}
      <Footer />
      <button onClick={logout} className="logout-button">Logout</button> {/* Logout Button */}
    </>
  );
}

export default App;
