import { Route, Routes } from 'react-router';
import { Profile, Project, Registration, Tasks } from '../pages';
import { ProtectedRoute } from './ProtectedRoute';
import { useLocalStorage } from 'usehooks-ts';

export const AppRouter = () => (
  <Routes>
    <Route element={<Registration />} path="/registration" />
    <Route element={<ProtectedRoute isAllowed={useLocalStorage('user', { email: '' })[0].email} />}>
      <Route element={<Project />} path="/project" />
      <Route element={<Tasks />} path="/tasks/:id" />
      <Route element={<Profile />} path="/profile" />
    </Route>
  </Routes>
);
