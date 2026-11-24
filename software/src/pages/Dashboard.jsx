import { useBank, formatMoney } from '../store/BankContext'

export default function Dashboard() {
  const {
    currentUser,
    accounts,
    transactions,
    loans,
    customers,
    branches,
    getCustomerAccounts,
    getBranch,
  } = useBank()

  const isCustomer = currentUser.role === 'customer'
  const myAccounts = isCustomer ? getCustomerAccounts(currentUser.customerId) : accounts
  const myTxns = isCustomer
    ? transactions.filter((t) =>
        myAccounts.some((a) => a.accountNumber === t.fromAccount || a.accountNumber === t.toAccount),
      )
    : transactions
  const myLoans = isCustomer
    ? loans.filter((l) => l.customerId === currentUser.customerId)
    : loans
  const totalBalance = myAccounts.reduce((s, a) => s + a.balance, 0)
  const pendingLoans = loans.filter((l) => l.status === 'pending').length
  const managed = accounts.reduce((s, a) => s + a.balance, 0)

  return (
    <div className="stack">
      <div className="topbar">
        <div>
          <h1>Dashboard</h1>
          <p>
            {isCustomer
              ? `${getBranch(currentUser.branchId)?.name || 'Your branch'} workspace for ${currentUser.name.split(' ')[0]}`
              : 'Branch operations overview for Alegria Pay'}
          </p>
        </div>
      </div>

      <div className="metrics">
        <div className="stat">
          <label>{isCustomer ? 'Total balance' : 'Book under management'}</label>
          <strong className="money">{formatMoney(isCustomer ? totalBalance : managed)}</strong>
        </div>
        <div className="stat">
          <label>{isCustomer ? 'Accounts' : 'Active accounts'}</label>
          <strong>{myAccounts.length}</strong>
        </div>
        <div className="stat">
          <label>{isCustomer ? 'Loans' : 'Pending approvals'}</label>
          <strong>{isCustomer ? myLoans.length : pendingLoans}</strong>
        </div>
        <div className="stat">
          <label>{isCustomer ? 'Transactions' : 'Customers'}</label>
          <strong>{isCustomer ? myTxns.length : customers.length}</strong>
        </div>
      </div>

      <div className="grid grid-2">
        <section className="panel">
          <h2>Recent activity</h2>
          <p className="panel-intro">Latest posted movements</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {myTxns.slice(0, 6).map((t) => (
                  <tr key={t.txnId}>
                    <td className="money" data-label="ID">
                      {t.txnId}
                    </td>
                    <td data-label="Type">
                      <span className="badge active">{t.type}</span>
                    </td>
                    <td className="money" data-label="Amount">
                      {formatMoney(t.amount)}
                    </td>
                    <td data-label="Date">{new Date(t.timestamp).toLocaleDateString('en-GB')}</td>
                  </tr>
                ))}
                {myTxns.length === 0 && (
                  <tr>
                    <td colSpan={4} className="empty">
                      No transactions yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <h2>{isCustomer ? 'Holdings' : 'Branches'}</h2>
          <p className="panel-intro">
            {isCustomer ? 'Open products and balances' : 'Book by location'}
          </p>
          {isCustomer ? (
            <div>
              {myAccounts.map((a) => (
                <div className="account-chip" key={a.accountNumber}>
                  <div>
                    <strong>{a.accountNumber}</strong>
                    <div style={{ marginTop: '0.35rem' }}>
                      <span className={`badge ${a.type}`}>{a.type}</span>
                    </div>
                  </div>
                  <strong className="money">{formatMoney(a.balance)}</strong>
                </div>
              ))}
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Branch</th>
                    <th>Accounts</th>
                    <th>Balances</th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((b) => {
                    const ba = accounts.filter((a) => a.branchId === b.id)
                    return (
                      <tr key={b.id}>
                        <td data-label="Branch">{b.name}</td>
                        <td data-label="Accounts">{ba.length}</td>
                        <td className="money" data-label="Balances">
                          {formatMoney(ba.reduce((s, a) => s + a.balance, 0))}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
