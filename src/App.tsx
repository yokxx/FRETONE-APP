import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from './components/common/LoadingSpinner';
import { UserProvider } from './context/UserContext';

// Lazy load components for better performance
const LandingPage = React.lazy(() => import('./pages/landing/LandingPage'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const OnboardingFlow = React.lazy(() => import('./pages/onboarding/OnboardingFlow'));
const OAuth2Callback = React.lazy(() => import('./pages/auth/OAuth2Callback'));
const SpotifyAuthSuccess = React.lazy(() => import('./pages/auth/SpotifyAuthSuccess'));

const App: React.FC = () => {
  const { i18n } = useTranslation();

  // Update document direction based on language
  React.useEffect(() => {
    document.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <UserProvider>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <React.Suspense fallback={<LoadingSpinner message="Loading FRETONE..." size="large" fullScreen />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/onboarding/*" element={<OnboardingFlow />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/oauth2callback" element={<OAuth2Callback />} />
            <Route path="/callback" element={<OAuth2Callback />} />
            <Route path="/spotify-success" element={<SpotifyAuthSuccess />} />
          </Routes>
        </React.Suspense>
      </Box>
    </UserProvider>
  );
};

export default App;