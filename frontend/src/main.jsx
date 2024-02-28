import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';

import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer/>
  </React.StrictMode>,
)
