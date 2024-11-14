import { Navigate, Outlet } from 'react-router-dom';

type PropsRoute = {
  isAllowed: string | null;
};

export const ProtectedRoute = ({ isAllowed }: PropsRoute) => {
  if (!isAllowed) {
    return <Navigate to="/registration" replace />;
  }
  return <Outlet />;
};
