import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App/style';
import { App } from './App/App';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
