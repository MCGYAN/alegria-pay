import { useState } from 'react'
import { useBank, formatMoney } from '../store/BankContext'

export default function Cards() {
  const { currentUser, creditCards, customers, accounts, dispatch, getCustomerAccounts } = useBank()
  const isCustomer = currentUser.role === 'customer'
  const canIssue = !isCustomer
  const list = isCustomer
    ? creditCards.filter((c) => c.customerId === currentUser.customerId)
    : creditCards

  const [form, setForm] = useState({
    customerId: customers[0]?.customerId || '',
    accountId: '',
    limit: 3000,
  })

  const custAccounts = isCustomer
    ? getCustomerAccounts(currentUser.customerId)
    : accounts.filter((a) => a.customerId === form.customerId)

  function submit(e) {
    e.preventDefault()
    dispatch({
      type: 'ISSUE_CARD',
      payload: {
        customerId: isCustomer ? currentUser.customerId : form.customerId,
        accountId: form.accountId || custAccounts[0]?.accountNumber,
        limit: form.limit,
      },
    })
  }

  return (
    <div className="stack">
      <div className="topbar">
        <div>
<h1>Credit cards</h1>
          <p>Card issuance and available credit tracking</p>
        </div>
      </div>

      <div className="grid grid-2">
        <section className="panel">
          <h2>Cards on file</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Card</th>
                  <th>Customer</th>
                  <th>Number</th>
                  <th>Limit</th>
                  <th>Available</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {list.map((c) => {
                  const cust = customers.find((x) => x.customerId === c.customerId)
                  return (
                    <tr key={c.cardId}>
                      <td data-label="Card">{c.cardId}</td>
                      <td data-label="Customer">{cust?.name || c.customerId}</td>
                      <td data-label="Number">{c.cardNumber}</td>
                      <td data-label="Limit">{formatMoney(c.limit)}</td>
                      <td data-label="Available">{formatMoney(c.availableCredit)}</td>
                      <td data-label="Status">
                        <span className={`badge ${c.status}`}>{c.status}</span>
                      </td>
                    </tr>
                  )
                })}
                {list.length === 0 && (
                  <tr>
                    <td colSpan={6} className="empty">
                      No cards yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {canIssue && (
          <section className="panel">
            <h2>Issue credit card</h2>
            <form className="form-grid" onSubmit={submit}>
              <label className="field">
                Customer
                <select
                  value={form.customerId}
                  onChange={(e) => setForm({ ...form, customerId: e.target.value, accountId: '' })}
                >
                  {customers.map((c) => (
                    <option key={c.customerId} value={c.customerId}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                Linked account
                <select
                  value={form.accountId || custAccounts[0]?.accountNumber || ''}
                  onChange={(e) => setForm({ ...form, accountId: e.target.value })}
                  required
                >
                  {custAccounts.map((a) => (
                    <option key={a.accountNumber} value={a.accountNumber}>
                      {a.accountNumber} ({a.type})
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                Credit limit (GH₵)
                <input
                  type="number"
                  min="500"
                  value={form.limit}
                  onChange={(e) => setForm({ ...form, limit: e.target.value })}
                />
              </label>
              <button className="btn btn-primary" type="submit">
                Issue card
              </button>
            </form>
          </section>
        )}
      </div>
    </div>
  )
}
