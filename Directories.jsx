import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSearch, FaEdit, FaPhone } from 'react-icons/fa';
import { useLocale } from '../../../../context/LocaleContext';
import DirectoryEditModal from './DirectoryEditModal';

const Directories = () => {
  const { t } = useLocale();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTechnician, setEditingTechnician] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Mock data combining all technicians from different groups
  const [technicians, setTechnicians] = useState([
    // Manager
    { id: 'MGR001', name: 'Jean Dupont', email: 'jean.dupont@example.com', group: 'Manager', serviceNumber: 'SVC-001', personalNumber: '+33612345678', phone: '+33123456789' },
    
    // Network Technicians
    { id: 'NET001', name: 'Pierre Martin', email: 'pierre.martin@example.com', group: 'Network Technician', serviceNumber: 'SVC-002', personalNumber: '+33687654321', phone: '+33123456790' },
    { id: 'NET002', name: 'Claire Bernard', email: 'claire.bernard@example.com', group: 'Network Technician', serviceNumber: 'SVC-003', personalNumber: '+33612345679', phone: '+33123456791' },
    { id: 'NET003', name: 'Michel Blanc', email: 'michel.blanc@example.com', group: 'Network Technician', serviceNumber: 'SVC-004', personalNumber: '+33612345680', phone: '+33123456792' },
    { id: 'NET004', name: 'Sophie Durand', email: 'sophie.durand@example.com', group: 'Network Technician', serviceNumber: 'SVC-005', personalNumber: '+33612345681', phone: '+33123456793' },
    
    // Application Technicians
    { id: 'APP001', name: 'David Leclerc', email: 'david.leclerc@example.com', group: 'Application Technician', serviceNumber: 'SVC-006', personalNumber: '+33612345682', phone: '+33123456794' },
    { id: 'APP002', name: 'Marie Garnier', email: 'marie.garnier@example.com', group: 'Application Technician', serviceNumber: 'SVC-007', personalNumber: '+33612345683', phone: '+33123456795' },
    { id: 'APP003', name: 'Thomas Petit', email: 'thomas.petit@example.com', group: 'Application Technician', serviceNumber: 'SVC-008', personalNumber: '+33612345684', phone: '+33123456796' },
    { id: 'APP004', name: 'Julie Fontaine', email: 'julie.fontaine@example.com', group: 'Application Technician', serviceNumber: 'SVC-009', personalNumber: '+33612345685', phone: '+33123456797' },
    
    // Database Technicians
    { id: 'DB001', name: 'Laurent Mercier', email: 'laurent.mercier@example.com', group: 'Database Technician', serviceNumber: 'SVC-010', personalNumber: '+33612345686', phone: '+33123456798' },
    { id: 'DB002', name: 'Anne Dufour', email: 'anne.dufour@example.com', group: 'Database Technician', serviceNumber: 'SVC-011', personalNumber: '+33612345687', phone: '+33123456799' },
    { id: 'DB003', name: 'Pascal Renard', email: 'pascal.renard@example.com', group: 'Database Technician', serviceNumber: 'SVC-012', personalNumber: '+33612345688', phone: '+33123456800' },
    { id: 'DB004', name: 'Nicole Martin', email: 'nicole.martin@example.com', group: 'Database Technician', serviceNumber: 'SVC-013', personalNumber: '+33612345689', phone: '+33123456801' },
  ]);

  // Highlight technician if coming from TechnicianGroups
  useEffect(() => {
    if (location.state?.selectedTechnicianId) {
      const tech = technicians.find(t => t.id === location.state.selectedTechnicianId);
      if (tech) {
        setEditingTechnician(tech);
      }
    }
  }, [location.state]);

  const filteredTechnicians = technicians.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (technician) => {
    setEditingTechnician(technician);
    setShowEditModal(true);
  };

  const handleSaveChanges = (updatedData) => {
    setTechnicians(prev =>
      prev.map(t => t.id === editingTechnician.id ? { ...t, ...updatedData } : t)
    );
    setShowEditModal(false);
  };

  const getGroupColor = (group) => {
    const colors = {
      'Manager': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Network Technician': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Application Technician': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Database Technician': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    };
    return colors[group] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Directories
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Complete list of all technicians and managers
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email, ID, or group..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{technicians.length}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Staff</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-red-600">1</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Manager</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">4</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Network</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600">4</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Application</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">4</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Database</p>
        </div>
      </div>

      {/* Technicians Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Group</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Service #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Personal #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {filteredTechnicians.map((technician) => (
                <tr key={technician.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono font-semibold text-gray-900 dark:text-gray-100">
                    {technician.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 font-medium">
                    {technician.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {technician.email}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getGroupColor(technician.group)}`}>
                      {technician.group}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                    {technician.serviceNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                    {technician.personalNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {technician.phone}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEditClick(technician)}
                      className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                    >
                      <FaEdit size={16} />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredTechnicians.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <FaSearch className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
          <p className="text-gray-600 dark:text-gray-400">
            No technicians found matching your search.
          </p>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingTechnician && (
        <DirectoryEditModal
          technician={editingTechnician}
          onSave={handleSaveChanges}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default Directories;
