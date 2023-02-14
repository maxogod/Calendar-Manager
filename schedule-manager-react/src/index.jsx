import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index'
import { HashRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Research proxy url (port 8000)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
              <App />
        </GoogleOAuthProvider>

      </HashRouter>
    </Provider>
  </React.StrictMode>
);

