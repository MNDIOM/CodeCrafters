import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Questionnaire from './components/Questionnaire';
import Footer from './components/Footer';
import Login from './components/Login'; // Import the Login component
import About from './pages/About';
import SolarInfos from './pages/SolarInfos';
import Contact from './pages/Contact';
import SignUp from './components/SignUp';
import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/solarInfos" element={<SolarInfos />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
