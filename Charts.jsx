import React from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export const PriorityChart = ({ data }) => {
  const chartData = [
    { name: 'Basse', value: data.basse },
    { name: 'Moyenne', value: data.moyenne },
    { name: 'Haute', value: data.haute },
    { name: 'Critique', value: data.critique },
  ];

  return (
    <div className="bg-surface dark:bg-gray-800 rounded-lg p-4 shadow">
      <h3 className="text-lg font-bold text-body dark:text-gray-200 mb-4">Incidents par Priorité</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const StatusChart = ({ data }) => {
  const chartData = [
    { name: 'Ouvert', value: data.ouvert },
    { name: 'En cours', value: data.enCours },
    { name: 'Fermé', value: data.ferme },
    { name: 'En attente', value: data.enAttente },
  ];

  return (
    <div className="bg-surface dark:bg-gray-800 rounded-lg p-4 shadow">
      <h3 className="text-lg font-bold text-body dark:text-gray-200 mb-4">Incidents par Statut</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
            labelStyle={{ color: '#e5e7eb' }}
          />
          <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const TrendChart = ({ data }) => {
  return (
    <div className="bg-surface dark:bg-gray-800 rounded-lg p-4 shadow">
      <h3 className="text-lg font-bold text-body dark:text-gray-200 mb-4">Tendance des Incidents</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jour" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
            labelStyle={{ color: '#e5e7eb' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="incidents" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ fill: '#3B82F6', r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line 
            type="monotone" 
            dataKey="resolus" 
            stroke="#10B981" 
            strokeWidth={2}
            dot={{ fill: '#10B981', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
