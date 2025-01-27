
import React from 'react';
import ReactDOM from 'react-dom/client';
import {ContextProvider} from './context/Context';
import App from './App';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);