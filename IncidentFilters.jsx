import React, { useState } from 'react';
import { FaFilter, FaChevronDown } from 'react-icons/fa';

const IncidentFilters = ({ onFilterChange, groups }) => {
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showAssignmentDropdown, setShowAssignmentDropdown] = useState(false);

  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedAssignment, setSelectedAssignment] = useState('All');

  const priorities = ['All', 'Low', 'Medium', 'High', 'Critical'];
  const statuses = ['All', 'Open', 'In Progress', 'Closed', 'Waiting'];

  const handlePrioritySelect = (priority) => {
    setSelectedPriority(priority);
    setShowPriorityDropdown(false);
    onFilterChange({ priority });
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setShowStatusDropdown(false);
    onFilterChange({ status });
  };

  const handleAssignmentSelect = (group) => {
    setSelectedAssignment(group);
    setShowAssignmentDropdown(false);
    onFilterChange({ assignment: group });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaFilter className="text-blue-600 dark:text-blue-400" />
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Priority Filter */}
        <div className="relative">
          <button
            onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
            className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="text-sm font-medium">By Priority: <strong>{selectedPriority}</strong></span>
            <FaChevronDown size={14} className={`transition-transform ${showPriorityDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showPriorityDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
              {priorities.map((priority) => (
                <button
                  key={priority}
                  onClick={() => handlePrioritySelect(priority)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                    selectedPriority === priority ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-semibold' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status Filter */}
        <div className="relative">
          <button
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="text-sm font-medium">By Status: <strong>{selectedStatus}</strong></span>
            <FaChevronDown size={14} className={`transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showStatusDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusSelect(status)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                    selectedStatus === status ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-semibold' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Assignment Filter */}
        <div className="relative">
          <button
            onClick={() => setShowAssignmentDropdown(!showAssignmentDropdown)}
            className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="text-sm font-medium">By Assignment: <strong>{selectedAssignment}</strong></span>
            <FaChevronDown size={14} className={`transition-transform ${showAssignmentDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showAssignmentDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
              <button
                onClick={() => handleAssignmentSelect('All')}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                  selectedAssignment === 'All' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-semibold' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                All Groups
              </button>
              {groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => handleAssignmentSelect(group.id)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                    selectedAssignment === group.id ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-semibold' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {group.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentFilters;
