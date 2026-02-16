import React, { useContext, useState } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { NotificationsContext } from '../context/NotificationsContext';

const NotificationDropdown = ({ isOpen }) => {
  const { notifications, markAsRead, removeNotification, clearAll } = useContext(NotificationsContext);
  const [filter, setFilter] = useState('all');

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  if (!isOpen) return null;

  const getNotificationColor = (type) => {
    switch(type) {
      case 'critical': return 'border-l-4 border-red-500 bg-red-50 dark:bg-red-900';
      case 'warning': return 'border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900';
      case 'success': return 'border-l-4 border-green-500 bg-green-50 dark:bg-green-900';
      default: return 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900';
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-surface dark:bg-gray-800 rounded-lg shadow-xl z-30 max-h-96 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-surface dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-bold text-body dark:text-gray-200">Notifications</h3>
        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 p-2 gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-xs rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'text-body dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1 text-xs rounded ${filter === 'unread' ? 'bg-blue-500 text-white' : 'text-body dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
          Unread ({notifications.filter(n => !n.isRead).length})
        </button>
      </div>

      {/* Notifications list */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {filteredNotifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No notifications
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 ${getNotificationColor(notification.type)} ${!notification.isRead ? 'font-semibold' : ''}`}
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <p className="text-sm font-bold text-body dark:text-gray-200">{notification.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    {notification.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400"
                      title="Mark as read"
                    >
                      <FaCheck size={12} />
                    </button>
                  )}
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400"
                    title="Remove"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
