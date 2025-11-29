import React from 'react';
import ReactDOM from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import './app.css';

// Import page components
import Home from './pages/Home';

createInertiaApp({
  resolve: (name) => {
    const pages = {
      Home,
    };
    return pages[name];
  },
  setup({ el, App, props }) {
    ReactDOM.createRoot(el).render(<App {...props} />);
  },
});

