import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { LocaleProvider } from './context/LocaleContext'
import { AuthProvider } from './context/AuthContext'
import { NotificationsProvider } from './context/NotificationsContext'
import { MessagesProvider } from './context/MessagesContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <LocaleProvider>
          <NotificationsProvider>
            <MessagesProvider>
              <App />
            </MessagesProvider>
          </NotificationsProvider>
        </LocaleProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
