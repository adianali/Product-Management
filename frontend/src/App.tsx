import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './component/home';
import View from './component/view';
import Edit from './component/edit';
import Login from './component/login';
import Register from './component/register';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);  
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');  
    setIsAuthenticated(false);  
  };

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="/login" element={<Navigate to="/" />} />  
        ) : (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} /> 
          </>
        )}

        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home onLogout={handleLogout} />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/edit/:id" element={<Edit />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />  
        )}
      </Routes>
    </Router>
  );
};

export default App;
