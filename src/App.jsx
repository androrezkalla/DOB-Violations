// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DobViolations from './DobViolations';
import EcbViolations from './EcbViolations';
import FDNYViolations from './FDNYViolations';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Footer from './Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dob" element={<DobViolations />} />
            <Route path="/ecb" element={<EcbViolations />} />
            <Route path="/fdny" element={<FDNYViolations />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
