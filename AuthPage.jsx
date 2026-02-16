import React, { useContext, useState } from 'react';
import loginBackground from '../assets/login-bg.jpg'; // Assurez-vous que le chemin est correct
import { useLocale } from '../context/LocaleContext'
import { AuthContext } from '../context/AuthContext'

const AuthPage = ({ onLogin }) => {
  const { t } = useLocale()
  const { user, updateUserRole } = useContext(AuthContext)

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState(false);

  const determineRoleFromUser = (name) => {
    if (!name) return 'USER';
    const n = name.toLowerCase();
    if (n.includes('admin') || n.includes('administrator')) return 'ADMIN';
    if (n.includes('tech') || n.includes('technician')) return 'TECHNICIAN';
    return 'USER';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = determineRoleFromUser(username);
    updateUserRole(role);
    onLogin();
  }

  const isActive = focused || username.length > 0 || password.length > 0;

  return (
    <div className="relative w-screen h-screen">
      {/* Background image - natural, no blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${loginBackground})` }}
      ></div>

      {/* Overlay with electric purple color */}
      <div className="absolute inset-0 bg-violet-600/30"></div>

      {/* Content - fixed to viewport and centered */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={`w-full max-w-md p-10 rounded-xl shadow-lg transition-colors duration-200 border border-white/20 backdrop-blur-md ${isActive ? 'bg-gray-700/85 dark:bg-gray-800/80' : 'bg-gray-600/75 dark:bg-gray-800/70'}`}
        >
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="Logo de l'application" className="h-24" />
          </div>

          <h2 className="text-4xl font-bold text-center mb-3 text-white dark:text-white">{t('welcome')}</h2>
          <h3 className="text-lg font-light text-center mb-8 text-sky-300 dark:text-sky-300"><i>{t('auth_note')}</i></h3>

          {/* Single user input replaces role selection */}
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-white dark:text-gray-300 text-lg font-medium mb-3" htmlFor="username">
                {t('singleUser')}
              </label>
              <input
                className="shadow-sm border rounded w-full py-3 px-4 text-lg text-body dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                id="username"
                type="text"
                placeholder={t('singleUser')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
            </div>
            <div className="mb-7">
              <label className="block text-white dark:text-gray-300 text-lg font-medium mb-3" htmlFor="password">
                {t('password')}
              </label>
              <input
                className="shadow-sm border rounded w-full py-3 px-4 text-lg text-body dark:text-gray-200 dark:bg-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                id="password"
                type="password"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
            </div>
            <div className="flex items-center justify-center mt-8">
              <button
                className={`w-full font-semibold py-3 rounded focus:outline-none transition text-lg ${isActive ? 'bg-sky-600 text-white hover:bg-sky-500' : 'bg-sky-700/90 text-white hover:bg-sky-600'}`}
                type="submit"
              >
                {t('loginButton')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;