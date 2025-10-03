import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { AuthProvider } from './context/AuthContext';
import { DarkThemeProvider } from './context/DarkThemeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <DarkThemeProvider>
        <App />
      </DarkThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
