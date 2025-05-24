import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'; // ou qualquer rota após login

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}
