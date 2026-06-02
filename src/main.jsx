import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Shim window.storage to use localStorage
// The component was built for Claude's artifact storage API (window.storage.get/set)
// This makes it work standalone with the same interface
if (!window.storage) {
  window.storage = {
    async get(key) {
      try {
        const value = localStorage.getItem('seccert_' + key);
        if (value === null) throw new Error('Key not found');
        return { key, value };
      } catch (e) {
        throw e;
      }
    },
    async set(key, value) {
      try {
        localStorage.setItem('seccert_' + key, value);
        return { key, value };
      } catch (e) {
        return null;
      }
    },
    async delete(key) {
      try {
        localStorage.removeItem('seccert_' + key);
        return { key, deleted: true };
      } catch (e) {
        return null;
      }
    },
    async list(prefix) {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith('seccert_' + (prefix || ''))) {
          keys.push(k.replace('seccert_', ''));
        }
      }
      return { keys };
    }
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
