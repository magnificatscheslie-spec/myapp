import React, { createContext, useContext, useEffect, useState } from 'react'

const translations = {
  fr: {
    profile: 'Profil',
    language: 'Langue',
    display: 'Affichage',
    logout: 'Déconnexion',
    searchPlaceholder: 'Rechercher...',

    welcome: 'Bienvenue!',
    auth_note: '(Authentification)',
    loginButton: 'Se connecter',
    singleUser: 'SingleUser',
    password: 'Mot de passe',

    dashboardTitle: 'Tableau de bord général',
    dashboardWelcome: "Bienvenue sur le tableau de bord de l'application de gestion d'incidents.",
    totalIncidents: "Total d'incidents",
    incidentsInProgress: "Incidents en cours",
    statsTitle: 'Statistiques des incidents',
    chartsPlaceholder: 'Les graphiques seront affichés ici.',

    listTitle: 'Liste des incidents',
    paginationInfo: 'Affichage de {count} incidents',
    add: 'Ajouter',
    edit: 'Modifier',
    delete: 'Supprimer',
    details: 'Détails',
    confirmDeleteTitle: 'Confirmation de suppression',
    confirmDeleteText: "Voulez-vous vraiment supprimer cet incident ?",
    cancel: 'Annuler',
    detailsTitle: "Détails de l'incident #{id}",
    detailId: 'ID',
    detailTitle: 'Titre',
    detailDescription: 'Description',
    detailAssignedTo: 'Attribué à',
    detailCreationDate: 'Date de création',
    detailResolutionDate: 'Date de résolution',
    detailPriority: 'Priorité',
    detailStatus: 'Statut',

    formAddTitle: 'Ajouter un incident',
    formEditTitle: 'Modifier un incident',
    labelTitle: 'Titre',
    labelDescription: 'Description',
    labelAssignedTo: 'Attribué à',
    labelPriority: 'Priorité',
    priorityLow: 'Basse',
    priorityMedium: 'Moyenne',
    priorityHigh: 'Haute',
    priorityCritical: 'Critique',

    usersTitle: 'Gestion des utilisateurs',

    menuDashboard: 'Dashboard',
    menuGestionIncident: 'Gestion d\'incident',
    menuGestionHabilitation: 'Gestion Habilitation',
    menuAnnuaires: 'Annuaires',
    menuContacts: 'Contacts',
    menuUsers: 'Users',
    menuRoles: 'Rôles',
    menuPermissions: 'Permissions'
  },
  en: {
    profile: 'Profile',
    language: 'Language',
    display: 'Display',
    logout: 'Logout',
    searchPlaceholder: 'Search...',

    welcome: 'Welcome!',
    auth_note: '(Authentication)',
    loginButton: 'Sign in',
    singleUser: 'SingleUser',
    password: 'Password',

    dashboardTitle: 'General dashboard',
    dashboardWelcome: 'Welcome to the incidents management dashboard.',
    totalIncidents: 'Total incidents',
    incidentsInProgress: 'Incidents in progress',
    statsTitle: 'Incident statistics',
    chartsPlaceholder: 'Charts will be displayed here.',

    listTitle: 'Incidents list',
    paginationInfo: 'Showing {count} incidents',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    details: 'Details',
    confirmDeleteTitle: 'Delete confirmation',
    confirmDeleteText: 'Do you really want to delete this incident?',
    cancel: 'Cancel',
    detailsTitle: 'Incident details #{id}',
    detailId: 'ID',
    detailTitle: 'Title',
    detailDescription: 'Description',
    detailAssignedTo: 'Assigned to',
    detailCreationDate: 'Creation date',
    detailResolutionDate: 'Resolution date',
    detailPriority: 'Priority',
    detailStatus: 'Status',

    formAddTitle: 'Add an incident',
    formEditTitle: 'Edit an incident',
    labelTitle: 'Title',
    labelDescription: 'Description',
    labelAssignedTo: 'Assigned to',
    labelPriority: 'Priority',
    priorityLow: 'Low',
    priorityMedium: 'Medium',
    priorityHigh: 'High',
    priorityCritical: 'Critical',

    usersTitle: 'User management',

    menuDashboard: 'Dashboard',
    menuGestionIncident: 'Incident Management',
    menuGestionHabilitation: 'Authorization Management',
    menuAnnuaires: 'Directories',
    menuContacts: 'Contacts',
    menuUsers: 'Users',
    menuRoles: 'Roles',
    menuPermissions: 'Permissions'
  }
}

const LocaleContext = createContext()


export const LocaleProvider = ({ children }) => {
  const getDefaultLocale = () => {
    try {
      const stored = localStorage.getItem('locale');
      if (stored) return stored;
    } catch (e) {
      // ignore
    }
    // Detect browser language
    const browserLang = navigator.language?.slice(0, 2).toLowerCase();
    if (browserLang && Object.keys(translations).includes(browserLang)) {
      return browserLang;
    }
    return 'fr';
  };

  const [locale, setLocale] = useState(getDefaultLocale);

  useEffect(() => {
    try {
      localStorage.setItem('locale', locale);
    } catch (e) {
      // ignore
    }
  }, [locale]);

  const t = (key, vars) => {
    const val = translations[locale]?.[key] ?? translations['en']?.[key] ?? key;
    if (!vars) return val;
    return Object.keys(vars).reduce((s, k) => s.replace(`{${k}}`, vars[k]), val);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}

export default LocaleContext
