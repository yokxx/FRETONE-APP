import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import theme from './theme'
import App from './App'
import './index.css'
import { connectToDatabase } from './db/connection'

// Polyfill for Buffer in browser
if (typeof window !== 'undefined') {
  window.global = window;
  window.process = { env: {} };
  // בדפדפן אנחנו לא צריכים את Buffer
}

// בסביבת דפדפן אנחנו משתמשים במודלים מדומים שמתנהגים כמו מסד נתונים
console.log('Running in browser environment, using database models with localStorage backend');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>
)
