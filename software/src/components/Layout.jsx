import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LogOut, Menu, X, RotateCcw } from 'lucide-react'
import { useBank } from '../store/BankContext'

const NAV = [
  { to: '/', label: 'Dashboard', roles: ['customer', 'staff', 'manager', 'admin'] },
  { to: '/accounts', label: 'Accounts', roles: ['customer', 'staff', 'manager', 'admin'] },
  { to: '/transactions', label: 'Transactions', roles: ['customer', 'staff', 'manager', 'admin'] },
  { to: '/loans', label: 'Loans', roles: ['customer', 'staff', 'manager', 'admin'] },
  { to: '/cards', label: 'Cards', roles: ['customer', 'staff', 'manager', 'admin'] },
  { to: '/customers', label: 'Customers', roles: ['staff', 'manager', 'admin'] },
  { to: '/branches', label: 'Branches', roles: ['staff', 'manager', 'admin'] },
  { to: '/staff', label: 'Staff', roles: ['manager', 'admin'] },
  { to: '/reports', label: 'Reports', roles: ['manager', 'admin', 'staff'] },
]

export default function Layout() {
  const { currentUser, dispatch, flash, getBranch } = useBank()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const role = currentUser?.role
  const branch = getBranch(currentUser?.branchId)
  const links = NAV.filter((n) => n.roles.includes(role))

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  function logout() {
    setOpen(false)
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }

  return (
    <div className={`app-shell ${open ? 'drawer-open' : ''}`}>
      <header className="mobile-topbar">
        <button
          className="icon-btn"
          onClick={() => setOpen(true)}
          type="button"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div className="mobile-brand">
          <img className="brand-logo sm" src="/alegria-logo.png" alt="Alegria Pay" />
        </div>
        <button className="icon-btn ghost" onClick={logout} type="button" aria-label="Logout">
          <LogOut size={18} />
        </button>
      </header>

      {open && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <img className="brand-logo" src="/alegria-logo.png" alt="Alegria Pay" />
          <button
            className="icon-btn sidebar-close"
            onClick={() => setOpen(false)}
            type="button"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="nav" onClick={() => setOpen(false)}>
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-user">
          <strong>{currentUser?.name}</strong>
          <small>
            {role}
            {branch ? ` / ${branch.location}` : ''}
          </small>
          <div className="sidebar-actions">
            <button className="btn-sidebar" onClick={logout} type="button">
              <LogOut size={13} /> Logout
            </button>
            <button
              className="btn-sidebar"
              onClick={() => {
                dispatch({ type: 'RESET_DATA' })
                setOpen(false)
              }}
              title="Reset demo data"
              type="button"
            >
              <RotateCcw size={13} /> Reset
            </button>
          </div>
        </div>
      </aside>

      <main className="main">
        {flash && (
          <div className="flash">
            <span>{flash}</span>
            <button onClick={() => dispatch({ type: 'CLEAR_ERROR' })} type="button">
              Close
            </button>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  )
}
