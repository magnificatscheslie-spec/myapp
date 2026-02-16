import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaEnvelope, FaUserCircle, FaAngleDown, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext'
import { useLocale } from '../../context/LocaleContext'
import { NotificationsContext } from '../../context/NotificationsContext';
import { MessagesContext } from '../../context/MessagesContext';
import NotificationDropdown from '../NotificationDropdown';
import MessageDropdown from '../MessageDropdown';

const Navbar = ({ onToggleSidebar, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const { t, locale, setLocale } = useLocale()
  const { getUnreadCount: getNotificationCount } = useContext(NotificationsContext);
  const { messages } = useContext(MessagesContext);

  return (
    <nav className="flex items-center justify-between p-4 bg-surface shadow-md border-b-1 border-cyan-200">
      <div className="flex items-center space-x-4">
        {/* Bouton Hamburger pour basculer la sidebar */}
    //
        {/* Barre de recherche (pour l'instant, c'est un placeholder) */}
        <div className="relative pl-50">
          <span className="absolute inset-y-0 left-0 flex items-center pl-55">
            <svg className="h-5 w-5 text-sub" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>
          <input
            type="text"
            className="w-100 pl-10 pr-4 py-2 text-body dark:text-gray-200 bg-muted dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
            placeholder={t('searchPlaceholder')}
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Icône de notification avec badge */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotificationOpen(!isNotificationOpen);
              setIsMessageOpen(false);
            }}
            className="relative text-sub dark:text-gray-200 hover:text-blue-500"
          >
            <FaBell size={20} />
            {getNotificationCount() > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full">
                {getNotificationCount()}
              </span>
            )}
          </button>
          <NotificationDropdown isOpen={isNotificationOpen} />
        </div>

        {/* Icône de messagerie */}
        <div className="relative">
          <button
            onClick={() => {
              setIsMessageOpen(!isMessageOpen);
              setIsNotificationOpen(false);
            }}
            className="relative text-sub dark:text-gray-200 hover:text-blue-500"
          >
            <FaEnvelope size={20} />
            {messages.filter(m => !m.isRead).length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                {messages.filter(m => !m.isRead).length}
              </span>
            )}
          </button>
          <MessageDropdown isOpen={isMessageOpen} />
        </div>

        {/* Theme toggle */}
        <ThemeToggle />
        {/* Language toggle */}
        <LanguageToggle />

        {/* Menu utilisateur avec dropdown */}
        <div className="relative">
            <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center text-body focus:outline-none"
          >
            <FaUserCircle size={24} className="mr-2" />
            <span className='font-bold'>Djuikom Scheslie</span>
            <FaAngleDown className="ml-2" />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-surface rounded-md shadow-xl z-20">
              <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-body hover:bg-gray-200 dark:hover:bg-gray-700">{t('profile')}</Link>
              <hr className="my-1 border-gray-200 dark:border-gray-700" />
              <div onClick={onLogout} className=" block px-4 py-2 text-lg text-bold text-body hover:bg-gray-200 dark:hover:bg-gray-700">{t('logout')}</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

function ThemeToggle () {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="ml-2 p-2 rounded-md text-body dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
    >
      {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  )
}

function LanguageToggle () {
  const { locale, setLocale, t } = useLocale()
  return (
    <button
      onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
      aria-label="Toggle language"
      title={t('language')}
      className="ml-2 p-2 rounded-md text-body hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
    >
      {locale === 'fr' ? 'EN' : 'FR'}
    </button>
  )
}