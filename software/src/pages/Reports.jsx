import { useBank, formatMoney } from '../store/BankContext'

export default function Reports() {
  const { accounts, transactions, loans, customers, branches, staffMembers, getBranch, getUserName } =
    useBank()

  const totalBook = accounts.reduce((s, a) => s + a.balance, 0)
  const activeLoans = loans.filter((l) => l.status === 'active').length
  const pendingLoans = loans.filter((l) => l.status === 'pending').length
  const txnCount = transactions.length

  const balances = customers.map((c) => {
    const bal = accounts
      .filter((a) => a.customerId === c.customerId)
      .reduce((s, a) => s + a.balance, 0)
    return { customer: c.name, id: c.customerId, bal }
  })

  const loanPerf = loans.map((l) => ({
    id: l.loanId,
    customer: customers.find((c) => c.customerId === l.customerId)?.name || l.customerId,
    status: l.status,
    principal: l.principal,
    remaining: l.balanceRemaining,
    repaidPct: l.principal
      ? Math.round(((l.principal - l.balanceRemaining) / l.principal) * 100)
      : 0,
  }))

  const branchProfit = branches.map((b) => {
    const deposits = transactions
      .filter((t) => t.branchId === b.id && t.type === 'deposit')
      .reduce((s, t) => s + t.amount, 0)
    const withdrawals = transactions
      .filter((t) => t.branchId === b.id && t.type === 'withdrawal')
      .reduce((s, t) => s + t.amount, 0)
    const book = accounts.filter((a) => a.branchId === b.id).reduce((s, a) => s + a.balance, 0)
    return { branch: b.name, deposits, withdrawals, net: deposits - withdrawals, book }
  })

  const topStaff = staffMembers
    .map((s) => ({
      name: s.name,
      role: s.position || s.role,
      branch: getBranch(s.branchId)?.name || 'Unassigned',
      count: transactions.filter((t) => t.performedBy === s.id).length,
      volume: transactions
        .filter((t) => t.performedBy === s.id)
        .reduce((sum, t) => sum + t.amount, 0),
    }))
    .sort((a, b) => b.count - a.count)

  return (
    <div className="stack">
      <div className="topbar">
        <div>
<h1>Reports</h1>
          <p>
            Case Study 6 query views for balances, loan performance, branch cash flow, and staff
            activity
          </p>
        </div>
      </div>

      <div className="report-hero">
        <section className="report-banner">
          <h2>Portfolio at a glance</h2>
          <p>
            Consolidated book balances and operational volume across Accra Head Office, Kumasi, and
            Tema.
          </p>
        </section>
        <div className="report-kpis">
          <div className="stat">
            <label>Total book</label>
            <strong className="money">{formatMoney(totalBook)}</strong>
          </div>
          <div className="stat">
            <label>Transactions logged</label>
            <strong>{txnCount}</strong>
          </div>
          <div className="stat">
            <label>Active loans</label>
            <strong>{activeLoans}</strong>
          </div>
          <div className="stat">
            <label>Pending approvals</label>
            <strong>{pendingLoans}</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <section className="panel">
          <h2>Customer account balances</h2>
          <p className="panel-intro">Combined holdings per customer profile</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>ID</th>
                  <th>Total balance</th>
                </tr>
              </thead>
              <tbody>
                {balances.map((r) => (
                  <tr key={r.id}>
                    <td data-label="Customer">{r.customer}</td>
                    <td data-label="ID">{r.id}</td>
                    <td className="money" data-label="Total balance">
                      {formatMoney(r.bal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <h2>Loan repayment performance</h2>
          <p className="panel-intro">Progress against principal for each facility</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Loan</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Repaid</th>
                  <th>Remaining</th>
                </tr>
              </thead>
              <tbody>
                {loanPerf.map((r) => (
                  <tr key={r.id}>
                    <td data-label="Loan">{r.id}</td>
                    <td data-label="Customer">{r.customer}</td>
                    <td data-label="Status">
                      <span className={`badge ${r.status}`}>{r.status}</span>
                    </td>
                    <td data-label="Repaid">
                      <strong>{r.repaidPct}%</strong>
                      <div className="meter">
                        <span style={{ width: `${Math.min(r.repaidPct, 100)}%` }} />
                      </div>
                    </td>
                    <td className="money" data-label="Remaining">
                      {formatMoney(r.remaining)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <h2>Branch profitability snapshot</h2>
          <p className="panel-intro">Deposit and withdrawal flows versus book balances</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Branch</th>
                  <th>Deposits</th>
                  <th>Withdrawals</th>
                  <th>Net cash flow</th>
                  <th>Book balances</th>
                </tr>
              </thead>
              <tbody>
                {branchProfit.map((r) => (
                  <tr key={r.branch}>
                    <td data-label="Branch">{r.branch}</td>
                    <td className="money" data-label="Deposits">
                      {formatMoney(r.deposits)}
                    </td>
                    <td className="money" data-label="Withdrawals">
                      {formatMoney(r.withdrawals)}
                    </td>
                    <td className="money" data-label="Net cash flow">
                      {formatMoney(r.net)}
                    </td>
                    <td className="money" data-label="Book balances">
                      {formatMoney(r.book)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <h2>Top performing staff</h2>
          <p className="panel-intro">Posted transactions and handled volume</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Staff</th>
                  <th>Role</th>
                  <th>Branch</th>
                  <th>Txns</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                {topStaff.map((r) => (
                  <tr key={r.name}>
                    <td data-label="Staff">{r.name}</td>
                    <td data-label="Role">{r.role}</td>
                    <td data-label="Branch">{r.branch}</td>
                    <td data-label="Txns">{r.count}</td>
                    <td className="money" data-label="Volume">
                      {formatMoney(r.volume)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section className="panel">
        <h2>Full transaction history</h2>
        <p className="panel-intro">Export style ledger for audit and classroom demonstration</p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Txn</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Accounts</th>
                <th>Branch</th>
                <th>Performed by</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.txnId}>
                  <td data-label="Txn">{t.txnId}</td>
                  <td data-label="Type">
                    <span className="badge active">{t.type}</span>
                  </td>
                  <td className="money" data-label="Amount">
                    {formatMoney(t.amount)}
                  </td>
                  <td data-label="Accounts">
                    {t.fromAccount || 'Cash'} to {t.toAccount || 'Cash'}
                  </td>
                  <td data-label="Branch">{getBranch(t.branchId)?.location || t.branchId}</td>
                  <td data-label="Performed by">{getUserName(t.performedBy)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
