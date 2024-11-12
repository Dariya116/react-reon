import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import './style/index';

export const App = () => (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);
