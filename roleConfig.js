/**
 * Role-based Configuration
 * Defines permissions and sidebar menu items for each role
 */

export const ROLES = {
  ADMIN: 'ADMIN',
  TECHNICIAN: 'TECHNICIAN',
  USER: 'USER',
};

/**
 * Sidebar configuration for each role
 */
export const sidebarConfig = {
  ADMIN: [
    {
      label: 'menuDashboard',
      icon: 'FaThLarge',
      path: '/dashboard',
      submenu: null,
    },
    {
      label: 'menuGestionIncident',
      icon: 'FaTools',
      path: null,
      submenu: [
        { label: 'listTitle', path: '/liste-incidents' },
        { label: 'Dashboard', path: '/incident-dashboard' },
      ],
    },
    {
      label: 'menuGestionHabilitation',
      icon: 'FaUserFriends',
      path: null,
      submenu: [
        { label: 'Role', path: '/role-management' },
        { label: 'Permissions', path: '/permissions' },
      ],
    },
    {
      label: 'menuAnnuaires',
      icon: 'FaAddressBook',
      path: null,
      submenu: [
        { label: 'Directories', path: '/directories' },
      ],
    },
  ],
  TECHNICIAN: [
    {
      label: 'menuDashboard',
      icon: 'FaThLarge',
      path: '/dashboard',
      submenu: null,
    },
    {
      label: 'menuGestionIncident',
      icon: 'FaTools',
      path: null,
      submenu: [
        { label: 'listTitle', path: '/liste-incidents' },
        { label: 'Dashboard', path: '/incident-dashboard' },
      ],
    },
    {
      label: 'menuAnnuaires',
      icon: 'FaAddressBook',
      path: null,
      submenu: [
        { label: 'Directories', path: '/directories' },
      ],
    },
  ],
  USER: [
    {
      label: 'menuDashboard',
      icon: 'FaThLarge',
      path: '/dashboard',
      submenu: null,
    },
    {
      label: 'menuGestionIncident',
      icon: 'FaTools',
      path: '/liste-incidents',
      submenu: null,
    },
    {
      label: 'menuAnnuaires',
      icon: 'FaAddressBook',
      path: null,
      submenu: [
      ],
    },
  ],
};

/**
 * Permissions for incident actions by role
 */
export const incidentPermissions = {
  ADMIN: {
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canViewDetails: true,
    canAssignToTechnician: true,
  },
  TECHNICIAN: {
    canAdd: false,
    canEdit: true,
    canDelete: false,
    canViewDetails: true,
    canAssignToTechnician: false,
  },
  USER: {
    canAdd: true,
    canEdit: false,
    canDelete: false,
    canViewDetails: true,
    canAssignToTechnician: false,
  },
};

/**
 * Get permissions for a specific role
 */
export const getPermissions = (role) => {
  return incidentPermissions[role] || incidentPermissions.USER;
};

/**
 * Check if a role can perform a specific action
 */
export const canUserAction = (role, action) => {
  const permissions = getPermissions(role);
  return permissions[`can${action.charAt(0).toUpperCase() + action.slice(1)}`] || false;
};
