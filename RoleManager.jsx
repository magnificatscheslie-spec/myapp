import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const RoleManager = () => {
  const navigate = useNavigate();

  const groups = [
    {
      id: 'manager',
      label: 'Manager',
      description: 'Management Group',
      color: 'from-red-500 to-red-600',
      count: 1,
    },
    {
      id: 'network',
      label: 'Network Technician',
      description: 'Network Infrastructure Team',
      color: 'from-blue-500 to-blue-600',
      count: 4,
    },
    {
      id: 'application',
      label: 'Application Technician',
      description: 'Application Support Team',
      color: 'from-green-500 to-green-600',
      count: 4,
    },
    {
      id: 'database',
      label: 'Database Technician',
      description: 'Database Administration Team',
      color: 'from-purple-500 to-purple-600',
      count: 4,
    },
  ];

  const handleGroupClick = (groupId) => {
    navigate(`/technician-groups/${groupId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Role Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage technician groups and their members
        </p>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => handleGroupClick(group.id)}
            className={`bg-gradient-to-br ${group.color} rounded-lg shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-105`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {group.label}
                </h2>
                <p className="text-white/90 text-sm">
                  {group.description}
                </p>
              </div>
              <FaArrowRight className="text-white text-xl mt-1" />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/20">
              <div>
                <p className="text-white/80 text-sm">Members</p>
                <p className="text-3xl font-bold text-white">{group.count}</p>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm">Click to manage</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleManager;
