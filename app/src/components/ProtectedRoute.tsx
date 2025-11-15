import { Navigate, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'
import { isAuthenticated } from '@/services/auth';
import { Role } from '@/types';
import { useUser } from '@/context/user.context';


export default function ProtectedRoute({ children, roles }: { children: ReactNode , roles: Array<Role> }) {
  const location = useLocation();
  const {role} = useUser();
  const isPermitted = roles.includes(role);
  if (!isAuthenticated() || !isPermitted) {
    return <Navigate to="/login?adminAccessRequired=true" state={{ from: location }} replace />
  }

  return <>{children}</>
}1