import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

function App() {
  const { logout } = useAuth();
  const [solarData, setSolarData] = useState(null);

  const handleAddressSelect = async (place) => {
    console.log('Selected Address:', place);
  };

  return (
    <QueryClientProvider client={queryClient}>
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
        <Route path="/profile" element={<UserProfile />} />
        {/* <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/SunRoofInfo" element={<RoofInfo />} />
      </Routes>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
