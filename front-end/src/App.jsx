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
import UserProfile from './components/UserProfile'; // Import UserProfile
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import './index.css';
import { useAuth } from './context/AuthContext'; // Import useAuth

function App() {
  const { logout } = useAuth();

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
      </Routes>
      <Footer />
      <button onClick={logout} className="logout-button">Logout</button> {/* Logout Button */}
    </>
  );
}

export default App;
