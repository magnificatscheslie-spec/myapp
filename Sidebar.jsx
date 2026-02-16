import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBars,FaCaretDown, FaCaretRight, FaThLarge, FaTools, FaUserFriends, FaAddressBook} from 'react-icons/fa';
import { useLocale } from '../../context/LocaleContext'
import { AuthContext } from '../../context/AuthContext';
import { sidebarConfig } from '../../config/roleConfig';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!isSidebarOpen) {
      setOpenMenu(null);
    }
  }, [isSidebarOpen]);

  const handleMenuClick = (menuItem) => {
    // Si le menu a un path, naviguer directement
    if (menuItem.path) {
      return; // Le Link va gérer la navigation
    }
    // Si le menu a un submenu, naviguer vers le premier submenu
    if (menuItem.submenu && menuItem.submenu.length > 0) {
      window.location.href = menuItem.submenu[0].path;
    }
  };

  const { t } = useLocale();
  return (
    <div className={`relative ${isSidebarOpen ? 'w-64' : 'w-16'} bg-[var(--color-surface)] dark:bg-gray-900 text-[var(--color-text)] dark:text-gray-200 flex flex-col shadow-xl  duration-300`}>
      {/* Bouton Hamburger pour cacher/afficher la sidebar */}
      <div className={`absolute top-4 ${isSidebarOpen ? '-right-10' : '-right-10'} p-2 cursor-pointer bg-none text-[var(--color-text)] dark:text-gray-200 z-20`} onClick={toggleSidebar}>
        <FaBars />
      </div>
      <div className="p-4 overflow-visible">
        {/* Logo et titre */}
        <div className="flex items-center justify-center mb-6 border-b border-[var(--color-surface-secondary)] dark:border-gray-700 pb-4">
          <img src="/logo.png" alt="Logo" className={`h-8 w-8 mr-2 ${!isSidebarOpen && 'mx-auto'}`} />
          {isSidebarOpen && <span className="text-xl font-bold text-[var(--color-text)]">IncidAPP</span>}
        </div>
        {/* Role indicator */}
        {isSidebarOpen && (
          <div className="text-xs text-[var(--color-text-secondary)] dark:text-gray-400 mb-4 text-center font-semibold">
            {user.role}
          </div>
        )}
        <nav className="flex-1">
          <ul>
            {sidebarConfig[user.role]?.map((menuItem, index) => (
              <li key={index} className="mb-2 mt-4 group relative">
                {menuItem.submenu ? (
                  // Menu with submenu - toggle submenu
                  <>
                    <div 
                      className="flex items-center justify-between p-2 rounded transition-colors duration-200 cursor-pointer group bg-transparent hover:bg-[var(--color-surface-secondary)] dark:hover:bg-gray-800"
                      onClick={() => setOpenMenu(openMenu === menuItem.label ? null : menuItem.label)}
                    >
                      <span className="flex-shrink-0 text-3xl text-gray-500 dark:text-gray-200">
                        {menuItem.icon === 'FaThLarge' && <FaThLarge className="text-xl md:text-2xl" />}
                        {menuItem.icon === 'FaTools' && <FaTools className="text-xl md:text-2xl" />}
                        {menuItem.icon === 'FaUserFriends' && <FaUserFriends className="text-xl md:text-2xl" />}
                        {menuItem.icon === 'FaAddressBook' && <FaAddressBook className="text-xl md:text-2xl" />}
                      </span>
                      {!isSidebarOpen && (
                        <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-800 text-white text-sm rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[9999] top-1/2 -translate-y-1/2">
                          {t(menuItem.label)}
                        </span>
                      )}
                      {isSidebarOpen && (
                        <>
                          <h3 className="ml-3 text-gray-400 dark:text-gray-300 uppercase tracking-wide font-bold">
                            {t(menuItem.label)}
                          </h3>
                          {openMenu === menuItem.label ? <FaCaretDown /> : <FaCaretRight />}
                        </>
                      )}
                    </div>
                    {openMenu === menuItem.label && isSidebarOpen && (
                      <ul className="ml-6 mt-2">
                        {menuItem.submenu.map((sub, subIndex) => (
                          <li key={subIndex} className="mb-1">
                            <Link 
                              to={sub.path} 
                              className="flex items-center p-2 rounded transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 text-base text-gray-600 dark:text-gray-400 font-medium"
                            >
                              {t(sub.label)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  // Direct link
                  <Link 
                    to={menuItem.path} 
                    className="flex items-center p-2 rounded transition-colors duration-200 cursor-pointer group"
                  >
                    <span className="flex-shrink-0 text-3xl text-gray-500 dark:text-gray-200">
                      {menuItem.icon === 'FaThLarge' && <FaThLarge className='text-current text-xl md:text-2xl' />}
                      {menuItem.icon === 'FaTools' && <FaTools className='text-current text-xl md:text-2xl' />}
                      {menuItem.icon === 'FaUserFriends' && <FaUserFriends className='text-current text-xl md:text-2xl' />}
                      {menuItem.icon === 'FaAddressBook' && <FaAddressBook className='text-current text-xl md:text-2xl' />}
                    </span>
                    {!isSidebarOpen && (
                      <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-800 text-white text-sm rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[9999] top-1/2 -translate-y-1/2">
                        {t(menuItem.label)}
                      </span>
                    )}
                    {isSidebarOpen && <h3 className="ml-2 text-gray-700 dark:text-gray-200 uppercase tracking-wide font-bold">{t(menuItem.label)}</h3>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;