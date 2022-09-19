import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const RequiredAuth = ({ children }) => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/signin" />;
  }
  return <div></div>;
};
