import { Navigate, useLocation } from 'react-router-dom'
import { ReactNode, useContext } from 'react'
import { isAuthenticated } from '@/services/auth';
import { useUser } from '@/context/user.context';
import { Role } from '@/types';


export default function AdminRoute({ children }: { children: ReactNode }) {
    const location = useLocation();
    const { role } = useUser();
    const isAdmin = role === Role.User;
    if (!isAuthenticated() || !isAdmin) {
        return <Navigate to="/login?adminAccessRequired=true" state={{ from: location }} replace />
    }
    return <>{children}</>
}