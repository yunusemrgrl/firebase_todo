import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//Context

import { FirebaseProvider } from './context/FirebaseContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseProvider>
    <App />
  </FirebaseProvider>,
);
