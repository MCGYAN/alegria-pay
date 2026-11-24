import { useState } from 'react'
import { useBank } from '../store/BankContext'

export default function Staff() {
  const { staffMembers, branches, transactions, dispatch, getBranch } = useBank()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Teller',
    role: 'staff',
    branchId: 'BR-ACC',
    password: 'teller123',
  })

  function submit(e) {
    e.preventDefault()
    dispatch({ type: 'ADD_STAFF', payload: form })
    setForm({
      name: '',
      email: '',
      phone: '',
      position: 'Teller',
      role: 'staff',
      branchId: 'BR-ACC',
      password: 'teller123',
    })
  }

  return (
    <div className="stack">
      <div className="topbar">
        <div>
<h1>Staff</h1>
          <p>Branch personnel and activity metrics</p>
        </div>
      </div>

      <div className="grid grid-2">
        <section className="panel">
          <h2>Staff directory</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Role</th>
                  <th>Branch</th>
                  <th>Txns posted</th>
                </tr>
              </thead>
              <tbody>
                {staffMembers.map((s) => (
                  <tr key={s.id}>
                    <td data-label="Employee">
                      <strong>{s.name}</strong>
                      <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
                        {s.employeeNo || s.id}, {s.email}
                      </div>
                    </td>
                    <td data-label="Role">
                      {s.position || s.role}
                      <div>
                        <span className="badge active">{s.role}</span>
                      </div>
                    </td>
                    <td data-label="Branch">{getBranch(s.branchId)?.name || 'Unassigned'}</td>
                    <td data-label="Txns posted">
                      {transactions.filter((t) => t.performedBy === s.id).length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <h2>Add staff member</h2>
          <form className="form-grid" onSubmit={submit}>
            <label className="field">
              Full name
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label className="field">
              Email
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label className="field">
              Phone
              <input
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </label>
            <label className="field">
              Position
              <input
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
              />
            </label>
            <label className="field">
              System role
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="staff">Staff / Teller</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label className="field">
              Branch
              <select
                value={form.branchId}
                onChange={(e) => setForm({ ...form, branchId: e.target.value })}
              >
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </label>
            <button className="btn btn-primary" type="submit">
              Add staff
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
