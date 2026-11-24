import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useBank } from '../store/BankContext'

const DEMOS = [
  { label: 'Admin', email: 'admin@alegriapay.gh', password: 'admin123' },
  { label: 'Manager', email: 'manager@alegriapay.gh', password: 'manager123' },
  { label: 'Teller', email: 'teller@alegriapay.gh', password: 'teller123' },
  { label: 'Customer', email: 'akosua@email.com', password: 'customer123' },
]

export default function Login() {
  const { currentUser, dispatch, authError, branches } = useBank()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    nationalId: '',
    branchId: 'BR-ACC',
  })

  if (currentUser) return <Navigate to="/" replace />

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function login(e) {
    e.preventDefault()
    dispatch({ type: 'CLEAR_ERROR' })
    dispatch({ type: 'LOGIN', email: form.email, password: form.password })
  }

  function register(e) {
    e.preventDefault()
    dispatch({ type: 'CLEAR_ERROR' })
    dispatch({ type: 'REGISTER_CUSTOMER', payload: form })
  }

  function quick(demo) {
    setForm((f) => ({ ...f, email: demo.email, password: demo.password }))
    dispatch({ type: 'CLEAR_ERROR' })
    dispatch({ type: 'LOGIN', email: demo.email, password: demo.password })
  }

  return (
    <div className="login-page">
      <section className="login-hero">
        <div>
          <img className="brand-logo hero login-logo" src="/alegria-logo.png" alt="Alegria Pay" />
          <div className="login-kicker">Ghana online banking</div>
          <h1 className="brand-font">Banking made simple</h1>
          <p>
            Check balances, send money, apply for loans, and manage branch services in Accra,
            Kumasi, and Tema.
          </p>
        </div>
        <div className="login-meta">
          <span>3 branches</span>
          <span>Currency GH₵</span>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <h2 className="brand-font">{mode === 'login' ? 'Sign in' : 'Register'}</h2>
          <p className="sub">
            {mode === 'login'
              ? 'Enter your credentials or launch a demo role.'
              : 'Create a customer profile to explore the ledger.'}
          </p>

          {authError && <div className="error">{authError}</div>}

          {mode === 'login' ? (
            <form className="form-grid" onSubmit={login}>
              <label className="field">
                Email
                <input name="email" type="email" required value={form.email} onChange={onChange} />
              </label>
              <label className="field">
                Password
                <input
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={onChange}
                />
              </label>
              <button className="btn btn-primary" type="submit">
                Sign in
              </button>
            </form>
          ) : (
            <form className="form-grid" onSubmit={register}>
              <label className="field">
                Full name
                <input name="name" required value={form.name} onChange={onChange} />
              </label>
              <label className="field">
                Email
                <input name="email" type="email" required value={form.email} onChange={onChange} />
              </label>
              <label className="field">
                Password
                <input
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={onChange}
                />
              </label>
              <label className="field">
                Phone
                <input name="phone" required value={form.phone} onChange={onChange} />
              </label>
              <label className="field">
                National ID
                <input name="nationalId" required value={form.nationalId} onChange={onChange} />
              </label>
              <label className="field">
                Address
                <input name="address" required value={form.address} onChange={onChange} />
              </label>
              <label className="field">
                Home branch
                <select name="branchId" value={form.branchId} onChange={onChange}>
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </label>
              <button className="btn btn-primary" type="submit">
                Create profile
              </button>
            </form>
          )}

          <button
            className="btn btn-ghost"
            style={{ width: '100%', marginTop: '0.85rem' }}
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            type="button"
          >
            {mode === 'login' ? 'Need an account? Register' : 'Already registered? Sign in'}
          </button>

          <div className="demo-box">
            <strong>Quick demo logins</strong>
            <div className="demo-actions">
              {DEMOS.map((d) => (
                <button
                  key={d.label}
                  className="btn btn-sm btn-ghost"
                  type="button"
                  onClick={() => quick(d)}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
