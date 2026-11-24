import { useBank, formatMoney } from '../store/BankContext'

export default function Customers() {
  const { customers, accounts, loans, getBranch } = useBank()

  return (
    <div className="stack">
      <div className="topbar">
        <div>
<h1>Customers</h1>
          <p>Customer relationship profiles across branches</p>
        </div>
      </div>

      <section className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Branch</th>
                <th>Accounts</th>
                <th>Total balance</th>
                <th>Loans</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => {
                const ca = accounts.filter((a) => a.customerId === c.customerId)
                const cl = loans.filter((l) => l.customerId === c.customerId)
                return (
                  <tr key={c.id}>
                    <td data-label="ID">{c.customerId}</td>
                    <td data-label="Name">
                      <strong>{c.name}</strong>
                      <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{c.nationalId}</div>
                    </td>
                    <td data-label="Contact">
                      {c.email}
                      <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{c.phone}</div>
                    </td>
                    <td data-label="Branch">{getBranch(c.branchId)?.name}</td>
                    <td data-label="Accounts">{ca.length}</td>
                    <td data-label="Total balance">{formatMoney(ca.reduce((s, a) => s + a.balance, 0))}</td>
                    <td data-label="Loans">{cl.length}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
