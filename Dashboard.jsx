import React, { useState, useMemo } from 'react';
import { useLocale } from '../../../../context/LocaleContext';
import { FaExclamationTriangle, FaClock, FaCheckCircle, FaList } from 'react-icons/fa';
import { PriorityChart, StatusChart, TrendChart } from './Charts.jsx';

// Simuler des données d'incidents pour le dashboard
const generateIncidentData = () => {
  return Array.from({ length: 100 }, (_, i) => {
    const id = 1000 + i;
    const now = new Date();
    const priorites = ['Basse', 'Moyenne', 'Haute', 'Critique'];
    const status = ['Ouvert', 'En cours', 'Fermé', 'En attente'];

    return {
      idIncident: id,
      titre: `Incident #${id}: Problème de connexion`,
      description: `La description détaillée de l'incident #${id}.`,
      attribuerA: `Utilisateur ${Math.floor(Math.random() * 10) + 1}`,
      dateCreation: new Date(now.setDate(now.getDate() - i)).toLocaleDateString(),
      dateResolution: i % 5 === 0 ? new Date(now.setDate(now.getDate() + 2)).toLocaleDateString() : 'N/A',
      priorite: priorites[Math.floor(Math.random() * priorites.length)],
      statut: status[Math.floor(Math.random() * status.length)],
    };
  });
};

// Générer les données de tendance des 7 derniers jours
const generateTrendData = (incidents) => {
  const trendData = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' });
    
    // Simuler des données de tendance
    const totalIncidents = Math.floor(Math.random() * 15) + 8;
    const resolvedIncidents = Math.floor(totalIncidents * (Math.random() * 0.6 + 0.2));
    
    trendData.push({
      jour: dateStr,
      incidents: totalIncidents,
      resolus: resolvedIncidents,
    });
  }
  
  return trendData;
};

const Dashboard = () => {
  const { t } = useLocale();
  const [incidents] = useState(generateIncidentData());

  // Calculer les statistiques en temps réel
  const stats = useMemo(() => {
    const total = incidents.length;
    const enCours = incidents.filter(inc => inc.statut === 'En cours').length;
    const fermes = incidents.filter(inc => inc.statut === 'Fermé').length;
    const ouverts = incidents.filter(inc => inc.statut === 'Ouvert').length;
    const enAttente = incidents.filter(inc => inc.statut === 'En attente').length;
    const priorityStats = {
      basse: incidents.filter(inc => inc.priorite === 'Basse').length,
      moyenne: incidents.filter(inc => inc.priorite === 'Moyenne').length,
      haute: incidents.filter(inc => inc.priorite === 'Haute').length,
      critique: incidents.filter(inc => inc.priorite === 'Critique').length,
    };
    const resolutionRate = total > 0 ? ((fermes / total) * 100).toFixed(1) : 0;
    return {
      total,
      enCours,
      fermes,
      ouverts,
      enAttente,
      priorityStats,
      resolutionRate,
    };
  }, [incidents]);

  const trendData = useMemo(() => generateTrendData(incidents), [incidents]);

  const StatCard = ({ icon: Icon, title, value, bgColor, textColor }) => (
    <div className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg text-gray-900 dark:text-gray-100 flex items-center space-x-4 border border-gray-100 dark:border-none`}>
      <Icon className={`text-2xl md:text-3xl text-gray-500 dark:text-gray-300`} />
      <div>
        <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl md:text-3xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
          {t('priorityBreakdown') || 'Répartition par Priorité'}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-body dark:text-gray-100 mb-2">
          {t('dashboard') || 'Tableau de Bord'}
        </h1>
        <p className="text-sub dark:text-gray-400">
          {t('dashboardSubtitle') || 'Suivi en temps réel des incidents'}
        </p>
      </div>

      {/* Cartes de statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FaList}
          title={t('totalIncidents') || 'Total Incidents'}
          value={stats.total}
          bgColor="bg-blue-500"
          textColor="text-blue-200"
        />
        <StatCard
          icon={FaClock}
          title={t('inProgress') || 'En Cours'}
          value={stats.enCours}
          bgColor="bg-yellow-500"
          textColor="text-yellow-200"
        />
        <StatCard
          icon={FaCheckCircle}
          title={t('resolved') || 'Fermés'}
          value={stats.fermes}
          bgColor="bg-green-500"
          textColor="text-green-200"
        />
        <StatCard
          icon={FaExclamationTriangle}
          title={t('openIncidents') || 'Ouverts'}
          value={stats.ouverts}
          bgColor="bg-red-500"
          textColor="text-red-200"
        />
      </div>

      {/* Cartes KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-100 dark:border-none">
          <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t('resolutionRate') || 'Taux de Résolution'}</p>
          <p className="text-3xl md:text-4xl font-bold text-green-500">{stats.resolutionRate}%</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{stats.fermes}/{stats.total} incidents fermés</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-100 dark:border-none">
          <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t('criticalIncidents') || 'Incidents Critiques'}</p>
          <p className="text-3xl md:text-4xl font-bold text-red-500">{stats.priorityStats.critique}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Nécessite une attention immédiate</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-100 dark:border-none">
          <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t('pendingIncidents') || 'En Attente'}</p>
          <p className="text-3xl md:text-4xl font-bold text-orange-500">{stats.enAttente}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Incidents en attente de traitement</p>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PriorityChart data={stats.priorityStats} />
        <StatusChart data={{
          ouvert: stats.ouverts,
          enCours: stats.enCours,
          ferme: stats.fermes,
          enAttente: stats.enAttente,
        }} />
      </div>

      {/* Graphique de tendance */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        <TrendChart data={trendData} />
      </div>

      {/* Tableau récapitulatif des priorités */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-100 dark:border-none">
        <h2 className="text-xl font-bold text-body dark:text-gray-200 mb-4">
          {t('priorityBreakdown') || 'Répartition par Priorité'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-blue-100 dark:bg-blue-900 rounded">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <div>
              <p className="text-xs text-sub dark:text-gray-400">Basse</p>
              <p className="text-lg font-bold text-body dark:text-gray-200">{stats.priorityStats.basse}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-yellow-100 dark:bg-yellow-900 rounded">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <div>
              <p className="text-xs text-sub dark:text-gray-400">Moyenne</p>
              <p className="text-lg font-bold text-body dark:text-gray-200">{stats.priorityStats.moyenne}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-orange-100 dark:bg-orange-900 rounded">
            <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
            <div>
              <p className="text-xs text-sub dark:text-gray-400">Haute</p>
              <p className="text-lg font-bold text-body dark:text-gray-200">{stats.priorityStats.haute}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-red-100 dark:bg-red-900 rounded">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <div>
              <p className="text-xs text-sub dark:text-gray-400">Critique</p>
              <p className="text-lg font-bold text-body dark:text-gray-200">{stats.priorityStats.critique}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
