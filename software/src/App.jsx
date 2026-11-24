import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { BankProvider, useBank } from './store/BankContext'
import Layout from './components/Layout'
import RequireRole from './components/RequireRole'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Accounts from './pages/Accounts'
import Transactions from './pages/Transactions'
import Loans from './pages/Loans'
import Cards from './pages/Cards'
import Customers from './pages/Customers'
import Branches from './pages/Branches'
import Staff from './pages/Staff'
import Reports from './pages/Reports'

function PrivateRoute({ children, roles }) {
  const { currentUser } = useBank()
  if (!currentUser) return <Navigate to="/login" replace />
  if (roles && !roles.includes(currentUser.role)) return <Navigate to="/" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="loans" element={<Loans />} />
        <Route path="cards" element={<Cards />} />
        <Route
          path="customers"
          element={
            <RequireRole roles={['staff', 'manager', 'admin']}>
              <Customers />
            </RequireRole>
          }
        />
        <Route
          path="branches"
          element={
            <RequireRole roles={['staff', 'manager', 'admin']}>
              <Branches />
            </RequireRole>
          }
        />
        <Route
          path="staff"
          element={
            <RequireRole roles={['manager', 'admin']}>
              <Staff />
            </RequireRole>
          }
        />
        <Route
          path="reports"
          element={
            <RequireRole roles={['staff', 'manager', 'admin']}>
              <Reports />
            </RequireRole>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BankProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </BankProvider>
  )
}
