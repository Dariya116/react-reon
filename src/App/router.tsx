import { Route, Routes } from 'react-router';
import { Project, Registration } from '../pages';


export const AppRouter = () => (
  <Routes>
    <Route element={<Registration />} path="/" />
    <Route element={<Project />} path="/project" />
  </Routes>
);
