import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import './style/index';

export const App = () => (
  <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
    <AppRouter />
  </BrowserRouter>
);
