import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '@fontsource-variable/figtree';
import './styles/globals.css';

const app = (
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const root = document.getElementById('root');
// Pages are pre-rendered to HTML at build time; hydrate them. In dev, render normally.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
