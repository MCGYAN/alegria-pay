import { useMemo, useState } from 'react'
import { useBank, formatMoney, formatDate } from '../store/BankContext'

export default function Transactions() {
  const { currentUser, accounts, transactions, dispatch, getCustomerAccounts, getUserName } =
    useBank()
  const isCustomer = currentUser.role === 'customer'
  const myAccounts = isCustomer ? getCustomerAccounts(currentUser.customerId) : accounts
  const visible = useMemo(() => {
    if (!isCustomer) return transactions
    const nums = new Set(myAccounts.map((a) => a.accountNumber))
    return transactions.filter((t) => nums.has(t.fromAccount) || nums.has(t.toAccount))
  }, [isCustomer, myAccounts, transactions])

  const [tab, setTab] = useState('deposit')
  const [form, setForm] = useState({
    accountNumber: myAccounts[0]?.accountNumber || '',
    fromAccount: myAccounts[0]?.accountNumber || '',
    toAccount: '',
    amount: '',
    reference: '',
  })

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function submit(e) {
    e.preventDefault()
    if (tab === 'deposit') {
      dispatch({
        type: 'DEPOSIT',
        payload: {
          accountNumber: form.accountNumber,
          amount: form.amount,
          reference: form.reference,
          branchId: currentUser.branchId,
        },
      })
    } else if (tab === 'withdraw') {
      dispatch({
        type: 'WITHDRAW',
        payload: {
          accountNumber: form.accountNumber,
          amount: form.amount,
          reference: form.reference,
        },
      })
    } else {
      dispatch({
        type: 'TRANSFER',
        payload: {
          fromAccount: form.fromAccount,
          toAccount: form.toAccount,
          amount: form.amount,
          reference: form.reference,
        },
      })
    }
    setForm((f) => ({ ...f, amount: '', reference: '', toAccount: tab === 'transfer' ? '' : f.toAccount }))
  }

  return (
    <div className="stack">
      <div className="topbar">
        <div>
<h1>Transactions</h1>
          <p>Deposits, withdrawals, and transfers, including inter-branch movement</p>
        </div>
      </div>

      <div className="grid grid-2">
        <section className="panel">
          <div className="panel-head">
            <h2>New transaction</h2>
            <div className="row-actions">
              {['deposit', 'withdraw', 'transfer'].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`btn btn-sm ${tab === t ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <form className="form-grid" onSubmit={submit}>
            {tab !== 'transfer' ? (
              <label className="field">
                Account
                <select name="accountNumber" value={form.accountNumber} onChange={onChange} required>
                  {myAccounts.map((a) => (
                    <option key={a.accountNumber} value={a.accountNumber}>
                      {a.accountNumber} ({a.type}) {formatMoney(a.balance)}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <>
                <label className="field">
                  From account
                  <select name="fromAccount" value={form.fromAccount} onChange={onChange} required>
                    {myAccounts.map((a) => (
                      <option key={a.accountNumber} value={a.accountNumber}>
                        {a.accountNumber} ({formatMoney(a.balance)})
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  To account number
                  <input
                    name="toAccount"
                    required
                    placeholder="ACC-..."
                    value={form.toAccount}
                    onChange={onChange}
                  />
                </label>
              </>
            )}
            <label className="field">
              Amount (GH₵)
              <input
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                required
                value={form.amount}
                onChange={onChange}
              />
            </label>
            <label className="field">
              Reference
              <input name="reference" value={form.reference} onChange={onChange} placeholder="Optional note" />
            </label>
            <button className="btn btn-primary" type="submit">
              Post {tab}
            </button>
          </form>
        </section>

        <section className="panel">
          <h2>Transaction history</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>From / To</th>
                  <th>By</th>
                  <th>When</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((t) => (
                  <tr key={t.txnId}>
                    <td data-label="ID">{t.txnId}</td>
                    <td data-label="Type">
                      <span className="badge active">{t.type}</span>
                    </td>
                    <td data-label="Amount">{formatMoney(t.amount)}</td>
                    <td data-label="From / To" style={{ fontSize: '0.82rem' }}>
                      {t.fromAccount || 'Cash'} to {t.toAccount || 'Cash'}
                      <div style={{ color: 'var(--muted)' }}>{t.reference}</div>
                    </td>
                    <td data-label="By">{getUserName(t.performedBy)}</td>
                    <td data-label="When">{formatDate(t.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
