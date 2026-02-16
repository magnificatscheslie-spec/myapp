import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import AuthPage from './pages/AuthPage';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);

  const handleLogin = () => {
    // Cette fonction est appelée lorsque l'utilisateur se connecte.
    // Elle met à jour l'état isAuthenticated à `true`.
    login();
    console.log("Utilisateur connecté ! isAuthenticated est maintenant à true.");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Router>
      <div className="font-sans antialiased">
        {isAuthenticated ? (
          <MainLayout onLogout={handleLogout} />
        ) : (
          <AuthPage onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
};

export default App;