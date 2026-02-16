import React, { useState, useContext } from 'react';
import { useLocale } from '../../../../context/LocaleContext'
import { AuthContext } from '../../../../context/AuthContext';
import { NotificationsContext } from '../../../../context/NotificationsContext';
import { MessagesContext } from '../../../../context/MessagesContext';
import { getPermissions } from '../../../../config/roleConfig';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Modal from './Modal.jsx';
import Form from './Form.jsx';
import IncidentFilters from './IncidentFilters';

// Données simulées pour 100 incidents
const initialIncidents = Array.from({ length: 100 }, (_, i) => {
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
    createdBy: i % 3 === 0 ? 'John Doe' : `Utilisateur ${Math.floor(Math.random() * 10) + 1}`,
  };
});

const IncidentList = () => {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [currentPage, setCurrentPage] = useState(1);
  const [incidentsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedForDelete, setSelectedForDelete] = useState(new Set());
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterAssignedTo, setFilterAssignedTo] = useState('');

  // Technician groups for filter
  const technicianGroups = [
    { id: 'manager', label: 'Manager' },
    { id: 'network', label: 'Network Technician' },
    { id: 'application', label: 'Application Technician' },
    { id: 'database', label: 'Database Technician' },
  ];

  const { t } = useLocale()
  const { user } = useContext(AuthContext);
  const { addNotification } = useContext(NotificationsContext);
  const { sendMessage } = useContext(MessagesContext);
  const permissions = getPermissions(user.role);

  // Check if USER created the selected incident
  const canEditSelectedIncident = user.role === 'USER' && selectedIncident ? selectedIncident.createdBy === user.name : permissions.canEdit;
  const canDeleteSelectedIncident = user.role === 'USER' && selectedForDelete.size > 0 ? true : permissions.canDelete;

  // Logique de filtrage
  const filteredIncidents = incidents.filter(incident => {
    const matchPriority = !filterPriority || incident.priorite === filterPriority;
    const matchStatus = !filterStatus || incident.statut === filterStatus;
    const matchAssignedTo = !filterAssignedTo || incident.attribuerA === filterAssignedTo;
    return matchPriority && matchStatus && matchAssignedTo;
  });

  // Logique de pagination
  const indexOfLastIncident = currentPage * incidentsPerPage;
  const indexOfFirstIncident = indexOfLastIncident - incidentsPerPage;
  const currentIncidents = filteredIncidents.slice(indexOfFirstIncident, indexOfLastIncident);
  const totalPages = Math.ceil(filteredIncidents.length / incidentsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 4;
    let startPage = 1;
    if (currentPage > Math.floor(maxPagesToShow / 2) && totalPages > maxPagesToShow) {
      startPage = currentPage - Math.floor(maxPagesToShow / 2);
    }
    if (startPage + maxPagesToShow > totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
    }
    if (startPage < 1) startPage = 1;

    for (let i = startPage; i < startPage + maxPagesToShow && i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToPreviousRange = () => {
    setCurrentPage(prev => Math.max(prev - 4, 1));
  };

  const goToNextRange = () => {
    setCurrentPage(prev => Math.min(prev + 4, totalPages));
  };

  // Logique du formulaire et des boutons
  const openModal = (type, incident = null) => {
    setIsModalOpen(true);
    setModalType(type);
    setSelectedIncident(incident);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedIncident(null);
  };

  const handleAddIncident = (newIncident) => {
    // Correction de la génération d'ID
    const lastIncidentId = incidents.length > 0 ? Math.max(...incidents.map(inc => parseInt(String(inc.idIncident), 10))) : 0;
    const newId = lastIncidentId + 1;
    const formattedId = String(newId).padStart(3, '0');
    
    const dateCreation = new Date().toLocaleDateString();
    const createdIncident = { ...newIncident, idIncident: formattedId, dateCreation: dateCreation, dateResolution: 'N/A', statut: 'Ouvert', createdBy: user.name };
    setIncidents([...incidents, createdIncident]);
    
    // Send notification to ADMIN and TECHNICIAN
    if (user.role === 'USER') {
      addNotification({
        type: 'info',
        title: 'Incident Créé',
        message: `Nouvel incident créé: ${newIncident.titre}`,
      });
      
      // Send message to admin
      sendMessage({
        fromUser: user.name,
        toUser: 'Admin',
        toRole: 'ADMIN',
        subject: newIncident.titre,
        content: `Nouveau incident créé: ${newIncident.titre}. Priorité: ${newIncident.priorite}`,
        thread: Date.now(),
      });
    } else if (user.role === 'TECHNICIAN') {
      addNotification({
        type: 'info',
        title: 'Incident Créé',
        message: `Vous avez créé: ${newIncident.titre}`,
      });
    } else if (user.role === 'ADMIN') {
      addNotification({
        type: 'info',
        title: 'Incident Créé',
        message: `Nouvel incident: ${newIncident.titre}`,
      });
    }
    
    closeModal();
  };

  const handleEditIncident = (updatedIncident) => {
    setIncidents(incidents.map(inc => String(inc.idIncident) === String(updatedIncident.idIncident) ? updatedIncident : inc));
    
    // Send notification
    addNotification({
      type: 'warning',
      title: 'Incident Modifié',
      message: `Incident #${updatedIncident.idIncident} a été modifié`,
    });
    
    closeModal();
  };

  const handleDelete = () => {
    const idsToDelete = Array.from(selectedForDelete);
    setIncidents(incidents.filter(inc => !idsToDelete.includes(String(inc.idIncident))));
    
    // Send notification
    addNotification({
      type: 'critical',
      title: 'Incidents Supprimés',
      message: `${idsToDelete.length} incident(s) ont été supprimés`,
    });
    
    setSelectedForDelete(new Set());
    setSelectedIncident(null);
    closeModal();
  };

  const toggleSelectForDelete = (incidentId) => {
    const newSelected = new Set(selectedForDelete);
    if (newSelected.has(String(incidentId))) {
      newSelected.delete(String(incidentId));
    } else {
      newSelected.add(String(incidentId));
    }
    setSelectedForDelete(newSelected);
  };

  const handleFilterChange = (filterData) => {
    if (filterData.priority) {
      setFilterPriority(filterData.priority === 'All' ? '' : filterData.priority);
    }
    if (filterData.status) {
      setFilterStatus(filterData.status === 'All' ? '' : filterData.status);
    }
    if (filterData.assignment) {
      setFilterAssignedTo(filterData.assignment === 'All' ? '' : filterData.assignment);
    }
    setCurrentPage(1);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'add':
        return <Form onSubmit={handleAddIncident} onClose={closeModal} />;
      case 'edit':
        return <Form onSubmit={handleEditIncident} initialData={selectedIncident} onClose={closeModal} />;
      case 'delete':
        return (
          <div className="p-4">
            <h3 className="text-lg text-body dark:text-gray-200 font-bold mb-4">{t('confirmDeleteTitle')}</h3>
            <p className="mb-4 text-sub dark:text-gray-300">{t('confirmDeleteText')} ({selectedForDelete.size} incident{selectedForDelete.size > 1 ? 's' : ''})</p>
            <div className="flex justify-end space-x-2">
              <button onClick={closeModal} className="bg-muted hover:bg-gray-400 text-body font-bold py-2 px-4 rounded-md text-sm">{t('cancel')}</button>
              <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md text-sm">{t('delete')}</button>
            </div>
          </div>
        );
      case 'details':
        return (
          <div className="p-4">
            <h3 className="text-lg text-body dark:text-gray-200 font-bold mb-4">{t('detailsTitle', { id: selectedIncident.idIncident })}</h3>
            <ul className="space-y-2 text-sub dark:text-gray-300">
              <li><span className="font-bold">{t('detailId')}:</span> {selectedIncident.idIncident}</li>
              <li><span className="font-bold">{t('detailTitle')}:</span> {selectedIncident.titre}</li>
              <li><span className="font-bold">{t('detailDescription')}:</span> {selectedIncident.description}</li>
              <li><span className="font-bold">{t('detailAssignedTo')}:</span> {selectedIncident.attribuerA}</li>
              <li><span className="font-bold">{t('detailCreationDate')}:</span> {selectedIncident.dateCreation}</li>
              <li><span className="font-bold">{t('detailResolutionDate')}:</span> {selectedIncident.dateResolution}</li>
              <li><span className="font-bold">{t('detailPriority')}:</span> {selectedIncident.priorite}</li>
              <li><span className="font-bold">{t('detailStatus')}:</span> {selectedIncident.statut}</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface shadow-lg rounded-lg p-6 dark:text-gray-200">
      <h2 className="text-2xl font-bold text-center mb-6 text-body">{t('listTitle')}</h2>

      {/* Filtres */}
      <div className="bg-muted dark:bg-gray-700 p-4 rounded-lg shadow-inner mb-4">
        <h3 className="text-lg font-bold text-body dark:text-gray-200 mb-4">{t('filters') || 'Filtres'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sub dark:text-gray-300 font-medium mb-2">{t('filterPriority') || 'Priorité'}</label>
            <select 
              value={filterPriority} 
              onChange={(e) => {
                setFilterPriority(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-body dark:text-gray-200"
            >
              <option value="">Tous</option>
              <option value="Basse">Basse</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Haute">Haute</option>
              <option value="Critique">Critique</option>
            </select>
          </div>
          <div>
            <label className="block text-sub dark:text-gray-300 font-medium mb-2">{t('filterStatus') || 'Statut'}</label>
            <select 
              value={filterStatus} 
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-body dark:text-gray-200"
            >
              <option value="">Tous</option>
              <option value="Ouvert">Ouvert</option>
              <option value="En cours">En cours</option>
              <option value="Fermé">Fermé</option>
              <option value="En attente">En attente</option>
            </select>
          </div>
          <div>
            <label className="block text-sub dark:text-gray-300 font-medium mb-2">{t('filterAssignedTo') || 'Attribué à'}</label>
            <select 
              value={filterAssignedTo} 
              onChange={(e) => {
                setFilterAssignedTo(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-body dark:text-gray-200"
            >
              <option value="">Tous</option>
              {[...new Set(incidents.map(inc => inc.attribuerA))].map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="bg-muted dark:bg-gray-700 p-4 rounded-lg shadow-inner mb-4 flex justify-center items-center">
        <div className="flex space-x-2justify-center items-center">
          <button onClick={goToPreviousRange} disabled={currentPage <= 4} className="px-2 py-1 rounded-md text-body hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
            <FaChevronLeft />
          </button>
            {renderPageNumbers().map(number => (
            <button key={number} onClick={() => paginate(number)} className={`px-3 py-1 rounded-md text-sm font-medium  ${currentPage === number ? 'bg-blue-400 text-white' : 'bg-muted dark:bg-gray-600 text-body dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600'}`}>
              {number}
            </button>
          ))}
          <button onClick={goToNextRange} disabled={currentPage > totalPages - 4} className="px-2 py-1 rounded-md text-body hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
            <FaChevronRight />
          </button>
        </div>
        <span className="text-sub dark:text-gray-300 font-medium">{t('paginationInfo', { count: filteredIncidents.length })}</span>
      </div>

      <hr className="my-4 border-gray-300 dark:border-gray-700" />

      {/* Boutons d'action en haut du tableau */}
      <div className="flex justify-center space-x-2 mb-6">
        {permissions.canAdd && (
          <button onClick={() => openModal('add')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm">{t('add')}</button>
        )}
        {user.role === 'USER' ? (
          <>
            {canEditSelectedIncident && selectedIncident && (
              <button onClick={() => openModal('edit', selectedIncident)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md text-sm">{t('edit')}</button>
            )}
            {canDeleteSelectedIncident && selectedForDelete.size > 0 && (
              <button onClick={() => openModal('delete')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md text-sm">{t('delete')} ({selectedForDelete.size})</button>
            )}
          </>
        ) : (
          <>
            {permissions.canEdit && (
              <button onClick={() => selectedIncident && openModal('edit', selectedIncident)} disabled={!selectedIncident} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed">{t('edit')}</button>
            )}
            {permissions.canDelete && (
              <button onClick={() => selectedForDelete.size > 0 && openModal('delete')} disabled={selectedForDelete.size === 0} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed">{t('delete')} ({selectedForDelete.size})</button>
            )}
          </>
        )}
        {permissions.canViewDetails && (
          <button onClick={() => selectedIncident && openModal('details', selectedIncident)} disabled={!selectedIncident} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed">{t('details')}</button>
        )}
      </div>

      {/* Filter Card */}
      <IncidentFilters onFilterChange={handleFilterChange} groups={technicianGroups} />

      {/* Tableau des incidents */}
      <div className="overflow-x-auto">
        <table border="1" className="min-w-full table-auto">
          <thead className="bg-muted dark:bg-gray-700 text-sub dark:text-gray-300 uppercase text-sm">
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Titre</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Attribué à</th>
              <th className="px-4 py-2">Date de création</th>
              <th className="px-4 py-2">Date de résolution</th>
              <th className="px-4 py-2">Priorité</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Créé par</th>
            </tr>
          </thead>
          <tbody className="text-sub dark:text-gray-300 text-sm font-light">
            {currentIncidents.map(incident => (
              <tr 
                key={incident.idIncident} 
                className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${selectedIncident && String(selectedIncident.idIncident) === String(incident.idIncident) ? 'bg-blue-200 dark:bg-blue-600' : ''}`}
                onClick={() => setSelectedIncident(incident)}
              >
                <td className="px-4 py-2">
                  <input 
                    type="checkbox" 
                    checked={selectedForDelete.has(String(incident.idIncident))}
                    onChange={() => toggleSelectForDelete(incident.idIncident)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{incident.idIncident}</td>
                <td className="px-4 py-2">{incident.titre}</td>
                <td className="px-4 py-2">{incident.description}</td>
                <td className="px-4 py-2">{incident.attribuerA}</td>
                <td className="px-4 py-2 whitespace-nowrap">{incident.dateCreation}</td>
                <td className="px-4 py-2 whitespace-nowrap">{incident.dateResolution}</td>
                <td className="px-4 py-2">{incident.priorite}</td>
                <td className="px-4 py-2">{incident.statut}</td>
                <td className="px-4 py-2">{incident.createdBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-muted dark:bg-gray-700 p-4 rounded-lg shadow-inner mb-4 flex justify-center items-center">
        <div className="flex space-x-2justify-center items-center">
          <button onClick={goToPreviousRange} disabled={currentPage <= 4} className="px-2 py-1 rounded-md text-body hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
            <FaChevronLeft />
          </button>
          {renderPageNumbers().map(number => (
            <button key={number} onClick={() => paginate(number)} className={`px-3 py-1 rounded-md text-sm font-medium  ${currentPage === number ? 'bg-blue-400 text-white' : 'bg-muted dark:bg-gray-600 text-body dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600'}`}>
              {number}
            </button>
          ))}
          <button onClick={goToNextRange} disabled={currentPage > totalPages - 4} className="px-2 py-1 rounded-md text-body hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
            <FaChevronRight />
          </button>
        </div>
        <span className="text-sub dark:text-gray-300 font-medium">Affichage de {filteredIncidents.length} incidents</span>
      </div>
      </div>

      {/* Modal pour le formulaire ou la confirmation de suppression */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default IncidentList;