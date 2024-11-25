import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Auth0Provider } from '@auth0/auth0-react';
import "@madzadev/audio-player/dist/index.css";

// Obtener las variables de entorno de Auth0
const domain = "dev-x5fnre53nw3j4xy8.us.auth0.com";
const clientID = "VXd1Y1k3ofHg1bxd7qEs4HvS6UjrA4gC";
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={domain}
        clientId={clientID}
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);