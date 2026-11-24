import { useState } from 'react'
import { useBank, formatMoney } from '../store/BankContext'

export default function Loans() {
  const {
    currentUser,
    loans,
    repayments,
    customers,
    accounts,
    dispatch,
  } = useBank()
  const isCustomer = currentUser.role === 'customer'
  const canApprove = ['manager', 'admin'].includes(currentUser.role)
  const list = isCustomer ? loans.filter((l) => l.customerId === currentUser.customerId) : loans

  const [apply, setApply] = useState({
    customerId: isCustomer ? currentUser.customerId : customers[0]?.customerId || '',
    productType: 'Personal Loan',
    principal: 5000,
    interestRate: 18,
    termMonths: 12,
    branchId: currentUser.branchId || 'BR-ACC',
  })
  const [repay, setRepay] = useState({ loanId: '', amount: '', method: 'bank_transfer' })
  const [approveAcct, setApproveAcct] = useState({})

  function submitApply(e) {
    e.preventDefault()
    dispatch({ type: 'APPLY_LOAN', payload: apply })
  }

  function submitRepay(e) {
    e.preventDefault()
    dispatch({ type: 'REPAY_LOAN', payload: repay })
  }

  return (
    <div className="stack">
      <div className="topbar">
        <div>
<h1>Loans</h1>
          <p>Applications, approvals, disbursement, and repayments</p>
        </div>
      </div>

      <section className="panel">
        <h2>Loan register</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Principal</th>
                <th>Remaining</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((l) => {
                const cust = customers.find((c) => c.customerId === l.customerId)
                const custAccounts = accounts.filter((a) => a.customerId === l.customerId)
                return (
                  <tr key={l.loanId}>
                    <td data-label="ID">{l.loanId}</td>
                    <td data-label="Customer">{cust?.name || l.customerId}</td>
                    <td data-label="Product">{l.productType}</td>
                    <td data-label="Principal">{formatMoney(l.principal)}</td>
                    <td data-label="Remaining">{formatMoney(l.balanceRemaining)}</td>
                    <td data-label="Status">
                      <span className={`badge ${l.status}`}>{l.status}</span>
                    </td>
                    <td data-label="Actions">
                      {canApprove && l.status === 'pending' ? (
                        <div className="row-actions">
                          <select
                            value={approveAcct[l.loanId] || custAccounts[0]?.accountNumber || ''}
                            onChange={(e) =>
                              setApproveAcct((s) => ({ ...s, [l.loanId]: e.target.value }))
                            }
                          >
                            {custAccounts.map((a) => (
                              <option key={a.accountNumber} value={a.accountNumber}>
                                {a.accountNumber}
                              </option>
                            ))}
                          </select>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() =>
                              dispatch({
                                type: 'APPROVE_LOAN',
                                payload: {
                                  loanId: l.loanId,
                                  accountNumber:
                                    approveAcct[l.loanId] || custAccounts[0]?.accountNumber,
                                },
                              })
                            }
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => dispatch({ type: 'REJECT_LOAN', loanId: l.loanId })}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--faint)' }}>None</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-2">
        <section className="panel">
          <h2>Apply for loan</h2>
          <form className="form-grid" onSubmit={submitApply}>
            {!isCustomer && (
              <label className="field">
                Customer
                <select
                  value={apply.customerId}
                  onChange={(e) => setApply({ ...apply, customerId: e.target.value })}
                >
                  {customers.map((c) => (
                    <option key={c.customerId} value={c.customerId}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label className="field">
              Product
              <select
                value={apply.productType}
                onChange={(e) => setApply({ ...apply, productType: e.target.value })}
              >
                <option>Personal Loan</option>
                <option>SME Business Loan</option>
                <option>Home Improvement Loan</option>
                <option>Education Loan</option>
              </select>
            </label>
            <div className="form-grid two">
              <label className="field">
                Principal (GH₵)
                <input
                  type="number"
                  min="100"
                  value={apply.principal}
                  onChange={(e) => setApply({ ...apply, principal: e.target.value })}
                />
              </label>
              <label className="field">
                Term (months)
                <input
                  type="number"
                  min="1"
                  value={apply.termMonths}
                  onChange={(e) => setApply({ ...apply, termMonths: e.target.value })}
                />
              </label>
            </div>
            <label className="field">
              Interest rate (%)
              <input
                type="number"
                step="0.1"
                value={apply.interestRate}
                onChange={(e) => setApply({ ...apply, interestRate: e.target.value })}
              />
            </label>
            <button className="btn btn-primary" type="submit">
              Submit application
            </button>
          </form>
        </section>

        <section className="panel">
          <h2>Record repayment</h2>
          <form className="form-grid" onSubmit={submitRepay}>
            <label className="field">
              Loan
              <select
                required
                value={repay.loanId}
                onChange={(e) => setRepay({ ...repay, loanId: e.target.value })}
              >
                <option value="">Select active loan</option>
                {list
                  .filter((l) => l.status === 'active')
                  .map((l) => (
                    <option key={l.loanId} value={l.loanId}>
                      {l.loanId} (remaining {formatMoney(l.balanceRemaining)})
                    </option>
                  ))}
              </select>
            </label>
            <label className="field">
              Amount (GH₵)
              <input
                type="number"
                min="0.01"
                step="0.01"
                required
                value={repay.amount}
                onChange={(e) => setRepay({ ...repay, amount: e.target.value })}
              />
            </label>
            <label className="field">
              Method
              <select
                value={repay.method}
                onChange={(e) => setRepay({ ...repay, method: e.target.value })}
              >
                <option value="bank_transfer">Bank transfer</option>
                <option value="mobile_money">Mobile money</option>
                <option value="cash">Cash</option>
              </select>
            </label>
            <button className="btn btn-gold" type="submit">
              Post repayment
            </button>
          </form>

          <h2 style={{ marginTop: '1.5rem' }}>Recent repayments</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Loan</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {repayments.slice(0, 5).map((r) => (
                  <tr key={r.repaymentId}>
                    <td data-label="ID">{r.repaymentId}</td>
                    <td data-label="Loan">{r.loanId}</td>
                    <td data-label="Amount">{formatMoney(r.amount)}</td>
                    <td data-label="Date">{r.date}</td>
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
