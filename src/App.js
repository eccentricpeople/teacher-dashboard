// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './index.css';  // Import the CSS file

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → Signup */}
        <Route path="/" element={<Signup />} />
        
        {/* Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard after login */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Optional: catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;



