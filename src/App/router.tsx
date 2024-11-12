import { Route, Routes } from 'react-router';
import { Registration } from '../pages';


export const AppRouter = () => (
  <Routes>
    <Route element={<Registration />} path="/" />
  </Routes>
);
