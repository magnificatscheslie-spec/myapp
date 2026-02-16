import React, { createContext, useState, useCallback } from 'react';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now();
    const newNotification = {
      id,
      timestamp: new Date(),
      isRead: false,
      ...notification,
    };
    setNotifications(prev => [newNotification, ...prev]);
    
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif)
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const getUnreadCount = () => {
    return notifications.filter(n => !n.isRead).length;
  };

  return (
    <NotificationsContext.Provider 
      value={{
        notifications,
        addNotification,
        removeNotification,
        markAsRead,
        clearAll,
        getUnreadCount,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContext;
