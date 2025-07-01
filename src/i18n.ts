import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to FRETONE',
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      or: 'OR',
      signUpWithGoogle: 'Sign up with Google',
      signInWithGoogle: 'Sign in with Google',
      artistName: 'Artist Name',
      fullName: 'Full Name',
      contactDetails: 'Contact Details',
      socialLinks: 'Social Media Links',
      streamingLinks: 'Streaming Platform Links',
      connectStorage: 'Connect Cloud Storage',
      connectGmail: 'Connect Gmail',
      connectStreaming: 'Connect Streaming Platforms',
      next: 'Next',
      back: 'Back',
      finish: 'Finish',
      cancel: 'Cancel',
      settings: {
        title: 'Settings',
        profile: 'Profile Information',
        language: 'Language',
        notifications: 'Notification Preferences',
        integrations: 'Platform Integrations',
        security: 'Account Security',
        logout: {
          title: 'Logout from your account',
          description: 'This will log you out from your account on this device.',
          button: 'Logout'
        },
        connect: 'Connect',
        connectToManagePage: 'Connect to manage your artist page',
        connectToShare: 'Connect to share updates',
        connectToAnalytics: 'Connect to view analytics',
        connectToStats: 'Connect to view streaming stats'
      }
    }
  },
  he: {
    translation: {
      welcome: 'ברוכים הבאים ל-FRETONE',
      login: 'התחברות',
      register: 'הרשמה',
      email: 'דוא"ל',
      password: 'סיסמה',
      or: 'או',
      signUpWithGoogle: 'הרשמה עם גוגל',
      signInWithGoogle: 'התחברות עם גוגל',
      artistName: 'שם אמן',
      fullName: 'שם מלא',
      contactDetails: 'פרטי התקשרות',
      socialLinks: 'קישורי מדיה חברתית',
      streamingLinks: 'קישורי פלטפורמות הזרמה',
      connectStorage: 'חיבור אחסון בענן',
      connectGmail: 'חיבור Gmail',
      connectStreaming: 'חיבור לפלטפורמות הזרמה',
      next: 'הבא',
      back: 'חזור',
      finish: 'סיום',
      cancel: 'ביטול',
      settings: {
        title: 'הגדרות',
        profile: 'פרטי פרופיל',
        language: 'שפה',
        notifications: 'העדפות התראות',
        integrations: 'חיבור פלטפורמות',
        security: 'אבטחת חשבון',
        logout: {
          title: 'התנתק מהחשבון שלך',
          description: 'פעולה זו תנתק אותך מהחשבון שלך במכשיר זה.',
          button: 'התנתק'
        },
        connect: 'חיבור',
        connectToManagePage: 'התחבר כדי לנהל את דף האמן שלך',
        connectToShare: 'התחבר כדי לשתף עדכונים',
        connectToAnalytics: 'התחבר כדי לצפות בנתונים',
        connectToStats: 'התחבר כדי לצפות בנתוני הזרמה'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    supportedLngs: ['en', 'he'],
    react: {
      useSuspense: false
    }
  });

export default i18n;