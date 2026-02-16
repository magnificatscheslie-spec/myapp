import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaUser } from 'react-icons/fa';
import { useLocale } from '../../../../context/LocaleContext';
import AddTechnicianModal from './AddTechnicianModal';

const TechnicianGroups = () => {
  const { t } = useLocale();
  const { group } = useParams();
  const navigate = useNavigate();

  const groupConfig = {
    manager: {
      label: 'Manager',
      description: 'Management Group',
      maxMembers: 1,
      idPrefix: 'MGR'
    },
    network: {
      label: 'Network Technician',
      description: 'Network Infrastructure Team',
      minMembers: 4,
      idPrefix: 'NET'
    },
    application: {
      label: 'Application Technician',
      description: 'Application Support Team',
      minMembers: 4,
      idPrefix: 'APP'
    },
    database: {
      label: 'Database Technician',
      description: 'Database Administration Team',
      minMembers: 4,
      idPrefix: 'DB'
    }
  };

  const [technicians, setTechnicians] = useState({
    manager: [
      { id: 'MGR001', name: 'Jean Dupont', email: 'jean.dupont@example.com' }
    ],
    network: [
      { id: 'NET001', name: 'Pierre Martin', email: 'pierre.martin@example.com' },
      { id: 'NET002', name: 'Claire Bernard', email: 'claire.bernard@example.com' },
      { id: 'NET003', name: 'Michel Blanc', email: 'michel.blanc@example.com' },
      { id: 'NET004', name: 'Sophie Durand', email: 'sophie.durand@example.com' }
    ],
    application: [
      { id: 'APP001', name: 'David Leclerc', email: 'david.leclerc@example.com' },
      { id: 'APP002', name: 'Marie Garnier', email: 'marie.garnier@example.com' },
      { id: 'APP003', name: 'Thomas Petit', email: 'thomas.petit@example.com' },
      { id: 'APP004', name: 'Julie Fontaine', email: 'julie.fontaine@example.com' }
    ],
    database: [
      { id: 'DB001', name: 'Laurent Mercier', email: 'laurent.mercier@example.com' },
      { id: 'DB002', name: 'Anne Dufour', email: 'anne.dufour@example.com' },
      { id: 'DB003', name: 'Pascal Renard', email: 'pascal.renard@example.com' },
      { id: 'DB004', name: 'Nicole Martin', email: 'nicole.martin@example.com' }
    ]
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTechnician, setEditingTechnician] = useState(null);

  const currentGroupConfig = groupConfig[group];
  const currentGroupTechnicians = technicians[group] || [];

  const handleAddTechnician = (technicianData) => {
    const nextId = currentGroupTechnicians.length + 1;
    const paddedId = String(nextId).padStart(3, '0');
    const newTechnician = {
      id: `${currentGroupConfig.idPrefix}${paddedId}`,
      ...technicianData
    };

    setTechnicians(prev => ({
      ...prev,
      [group]: [...prev[group], newTechnician]
    }));
    setShowAddModal(false);
  };

  const handleEditTechnician = (technician) => {
    setEditingTechnician(technician);
    setShowAddModal(true);
  };

  const handleDeleteTechnician = (technicianId) => {
    if (window.confirm('Are you sure you want to delete this technician?')) {
      setTechnicians(prev => ({
        ...prev,
        [group]: prev[group].filter(t => t.id !== technicianId)
      }));
    }
  };

  const handleTechnicianClick = (technician) => {
    navigate('/directories', { state: { selectedTechnicianId: technician.id } });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {currentGroupConfig?.label}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {currentGroupConfig?.description}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <FaPlus size={18} />
          Add {currentGroupConfig?.label}
        </button>
      </div>

      {/* Members Count */}
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
        <p className="text-sm text-blue-900 dark:text-blue-300">
          <strong>{currentGroupTechnicians.length}</strong> member{currentGroupTechnicians.length !== 1 ? 's' : ''} 
          {currentGroupConfig?.minMembers && ` (minimum ${currentGroupConfig.minMembers} required)`}
        </p>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentGroupTechnicians.map((technician) => (
          <div
            key={technician.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="flex items-center gap-3 flex-1 cursor-pointer"
                onClick={() => handleTechnicianClick(technician)}
              >
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <FaUser className="text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate hover:underline">
                    {technician.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {technician.id}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 break-all">
                {technician.email}
              </p>
            </div>

            <div className="flex gap-2 border-t border-gray-200 dark:border-gray-700 pt-3">
              <button
                onClick={() => handleEditTechnician(technician)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors text-sm"
              >
                <FaEdit size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDeleteTechnician(technician.id)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors text-sm"
              >
                <FaTrash size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {currentGroupTechnicians.length === 0 && (
        <div className="text-center py-12">
          <FaUser className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
          <p className="text-gray-600 dark:text-gray-400">
            No technicians in this group yet. Add one to get started!
          </p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <AddTechnicianModal
          group={group}
          technician={editingTechnician}
          onSave={handleAddTechnician}
          onClose={() => {
            setShowAddModal(false);
            setEditingTechnician(null);
          }}
        />
      )}
    </div>
  );
};

export default TechnicianGroups;
