import { useState } from 'react'
import { useBank, formatMoney } from '../store/BankContext'

export default function Accounts() {
  const { currentUser, accounts, customers, branches, dispatch, getCustomerAccounts, getBranch } =
    useBank()
  const isCustomer = currentUser.role === 'customer'
  const list = isCustomer ? getCustomerAccounts(currentUser.customerId) : accounts
  const [form, setForm] = useState({
    customerId: isCustomer ? currentUser.customerId : customers[0]?.customerId || '',
    type: 'savings',
    branchId: currentUser.branchId || 'BR-ACC',
    initialDeposit: 100,
  })

  function submit(e) {
    e.preventDefault()
    dispatch({ type: 'OPEN_ACCOUNT', payload: form })
  }

  return (
    <div className="stack">
      <div className="topbar">
        <div>
<h1>Accounts</h1>
          <p>Savings, current, and fixed deposit accounts</p>
        </div>
      </div>

      <div className="grid grid-2">
        <section className="panel">
          <h2>Account register</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Type</th>
                  <th>Customer</th>
                  <th>Branch</th>
                  <th>Balance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {list.map((a) => {
                  const cust = customers.find((c) => c.customerId === a.customerId)
                  return (
                    <tr key={a.accountNumber}>
                      <td data-label="Number">{a.accountNumber}</td>
                      <td data-label="Type">
                        <span className={`badge ${a.type}`}>{a.type}</span>
                      </td>
                      <td data-label="Customer">{cust?.name || a.customerId}</td>
                      <td data-label="Branch">{getBranch(a.branchId)?.location}</td>
                      <td data-label="Balance">{formatMoney(a.balance)}</td>
                      <td data-label="Status">
                        <span className={`badge ${a.status}`}>{a.status}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <h2>Open account</h2>
          <form className="form-grid" onSubmit={submit}>
            {!isCustomer && (
              <label className="field">
                Customer
                <select
                  value={form.customerId}
                  onChange={(e) => setForm({ ...form, customerId: e.target.value })}
                >
                  {customers.map((c) => (
                    <option key={c.customerId} value={c.customerId}>
                      {c.name} ({c.customerId})
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label className="field">
              Account type
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
                <option value="fixed">Fixed deposit</option>
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
            <label className="field">
              Opening deposit (GH₵)
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.initialDeposit}
                onChange={(e) => setForm({ ...form, initialDeposit: e.target.value })}
              />
            </label>
            <button className="btn btn-primary" type="submit">
              Open account
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
