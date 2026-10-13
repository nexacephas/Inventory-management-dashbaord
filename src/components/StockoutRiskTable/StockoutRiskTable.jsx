import './StockoutRiskTable.css'

function StockoutRiskTable({ rows }) {
  return (
    <div className="card table-card">
      <div className="card__header">
        <div>
          <h3>Reorder-threshold review</h3>
          <p>Direct comparison of sample stock against saved reorder points</p>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Current stock</th>
              <th>Reorder point</th>
              <th>Gap to threshold</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.product}>
                <td><strong>{row.product}</strong><small className="stock-risk-table__meta">{row.sku} · {row.location}</small></td>
                <td>{row.currentStock} {row.unit}</td>
                <td>{row.reorderPoint} {row.unit}</td>
                <td>{row.shortfall} {row.unit}</td>
                <td><span className={`threshold-state ${row.currentStock <= 0 ? 'threshold-state--out' : 'threshold-state--below'}`}>{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StockoutRiskTable
