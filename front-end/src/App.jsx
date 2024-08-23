import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Headerstyle from './components/Headerstyle';
import Hero from './components/Hero';
import Questionnaire from './components/Questionnaire';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <Router>
      <Headerstyle />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        {/* Add other routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
