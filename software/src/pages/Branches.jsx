import { useBank, formatMoney } from '../store/BankContext'

export default function Branches() {
  const { branches, accounts, staffMembers, customers, transactions } = useBank()

  return (
    <div className="stack">
      <div className="topbar">
        <div>
<h1>Branches</h1>
          <p>Accra Head Office, Kumasi, and Tema operations</p>
        </div>
      </div>

      <div className="grid grid-3">
        {branches.map((b) => {
          const ba = accounts.filter((a) => a.branchId === b.id)
          const bs = staffMembers.filter((s) => s.branchId === b.id)
          const bc = customers.filter((c) => c.branchId === b.id)
          const bt = transactions.filter((t) => t.branchId === b.id)
          const book = ba.reduce((s, a) => s + a.balance, 0)
          return (
            <section className="panel branch-card" key={b.id}>
              <div>
                <h2>{b.name}</h2>
                <p className="meta">
                  {b.location} ({b.code})
                  <br />
                  {b.phone}
                </p>
              </div>
              <div className="metric-row">
                <div className="metric-tile">
                  <label>Customers</label>
                  <strong>{bc.length}</strong>
                </div>
                <div className="metric-tile">
                  <label>Staff</label>
                  <strong>{bs.length}</strong>
                </div>
                <div className="metric-tile">
                  <label>Accounts</label>
                  <strong>{ba.length}</strong>
                </div>
                <div className="metric-tile">
                  <label>Posted txns</label>
                  <strong>{bt.length}</strong>
                </div>
              </div>
              <div className="stat" style={{ animation: 'none' }}>
                <label>Book balances</label>
                <strong className="money">{formatMoney(book)}</strong>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
