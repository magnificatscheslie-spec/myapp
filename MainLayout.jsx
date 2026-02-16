import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar'; // Importez le nouveau composant Navbar
import Dashboard from '../../pages/Dashboard';
import IncidentDashboard from '../../pages/IncidentDashboard';
import IncidentList from '../../components/Modules/GestionIncident/ListeIncidents/IncidentList';
import RoleManager from '../../components/Modules/GestionHabilitation/RoleManager/RoleManager';
import TechnicianGroups from '../../components/Modules/GestionHabilitation/TechnicianGroups/TechnicianGroups';
import Directories from '../../components/Modules/Annuaires/Directories/Directories';

const MainLayout = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Gère l'état de la sidebar ici

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-muted dark:bg-gray-900">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onToggleSidebar={toggleSidebar} onLogout={onLogout} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/liste-incidents" element={<IncidentList />} />
            <Route path="/incident-dashboard" element={<IncidentDashboard />} />
            <Route path="/role-management" element={<RoleManager />} />
            <Route path="/technician-groups/:group" element={<TechnicianGroups />} />
            <Route path="/directories" element={<Directories />} />
            {/* Ajoutez les routes pour Profil, Langue, etc. ici si nécessaire */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;