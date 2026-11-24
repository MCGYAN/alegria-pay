import { Navigate } from 'react-router-dom'
import { useBank } from '../store/BankContext'

export default function RequireRole({ roles, children }) {
  const { currentUser } = useBank()
  if (!currentUser) return <Navigate to="/login" replace />
  if (!roles.includes(currentUser.role)) return <Navigate to="/" replace />
  return children
}
