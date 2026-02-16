import React, { useContext } from 'react';
import { FaCheckCircle, FaClock, FaTimesCircle, FaUsers, FaChartPie, FaChartLine } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const OverallDashboard = () => {
  const { user } = useContext(AuthContext);

  // Mock data for overall statistics
  const stats = {
    totalIncidents: 127,
    resolvedIncidents: 95,
    pendingIncidents: 22,
    inProgressIncidents: 10,
    resolutionRate: 74.8,
    avgResolutionTime: '2.5 days',
  };

  const groupStats = [
    {
      id: 'manager',
      label: 'Manager',
      color: 'from-red-500 to-red-600',
      members: 1,
      resolvedIncidents: 45,
      totalIncidents: 50,
      resolutionRate: 90,
      avgTime: '1.8 days',
    },
    {
      id: 'network',
      label: 'Network Technician',
      color: 'from-blue-500 to-blue-600',
      members: 4,
      resolvedIncidents: 28,
      totalIncidents: 35,
      resolutionRate: 80,
      avgTime: '2.2 days',
    },
    {
      id: 'application',
      label: 'Application Technician',
      color: 'from-green-500 to-green-600',
      members: 4,
      resolvedIncidents: 15,
      totalIncidents: 25,
      resolutionRate: 60,
      avgTime: '3.1 days',
    },
    {
      id: 'database',
      label: 'Database Technician',
      color: 'from-purple-500 to-purple-600',
      members: 4,
      resolvedIncidents: 7,
      totalIncidents: 17,
      resolutionRate: 41.2,
      avgTime: '3.5 days',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Here's an overview of your incident management system
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Incidents */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Total Incidents
            </h3>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <FaChartPie className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.totalIncidents}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            All time incidents
          </p>
        </div>

        {/* Resolved Incidents */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Resolved
            </h3>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
              <FaCheckCircle className="text-green-600 dark:text-green-400" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.resolvedIncidents}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Successfully closed
          </p>
        </div>

        {/* In Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              In Progress
            </h3>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg">
              <FaClock className="text-yellow-600 dark:text-yellow-400" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.inProgressIncidents}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Currently being handled
          </p>
        </div>

        {/* Resolution Rate */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Resolution Rate
            </h3>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
              <FaChartLine className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.resolutionRate}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Overall efficiency
          </p>
        </div>
      </div>

      {/* Technician Groups Performance */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Performance by Technician Group
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groupStats.map((group) => (
            <div
              key={group.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
            >
              {/* Header with gradient */}
              <div className={`bg-gradient-to-r ${group.color} p-6 text-white`}>
                <h3 className="text-xl font-bold">{group.label}</h3>
                <p className="text-sm opacity-90 mt-1">
                  <FaUsers className="inline mr-2" />
                  {group.members} team member{group.members > 1 ? 's' : ''}
                </p>
              </div>

              {/* Stats */}
              <div className="p-6 space-y-4">
                {/* Resolution Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Resolution Rate
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {group.resolutionRate}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${group.color} h-2 rounded-full`}
                      style={{ width: `${group.resolutionRate}%` }}
                    />
                  </div>
                </div>

                {/* Incidents Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Resolved</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {group.resolvedIncidents}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      of {group.totalIncidents} incidents
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Time</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {group.avgTime}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      per resolution
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Incidents */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FaTimesCircle className="text-red-500" />
            Pending Incidents
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Waiting</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.pendingIncidents}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Incidents awaiting action or customer response
            </p>
          </div>
        </div>

        {/* Average Resolution Time */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FaClock className="text-blue-500" />
            Average Resolution Time
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Overall Average</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.avgResolutionTime}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Average time from creation to resolution
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallDashboard;
