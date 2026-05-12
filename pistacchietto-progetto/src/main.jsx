import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Window storage shim - per ora salva in localStorage del browser
if (!window.storage) {
  window.storage = {
    get: async (key, shared) => {
      try {
        const v = localStorage.getItem(key);
        if (v === null) return null;
        return { key, value: v, shared: !!shared };
      } catch (e) { return null; }
    },
    set: async (key, value, shared) => {
      try {
        localStorage.setItem(key, value);
        return { key, value, shared: !!shared };
      } catch (e) { return null; }
    },
    delete: async (key, shared) => {
      try {
        localStorage.removeItem(key);
        return { key, deleted: true, shared: !!shared };
      } catch (e) { return null; }
    },
    list: async (prefix, shared) => {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!prefix || k.startsWith(prefix)) keys.push(k);
      }
      return { keys, prefix, shared: !!shared };
    }
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
