import './ReorderRecommendationTable.css'

function ReorderRecommendationTable({ rows }) {
  return (
    <div className="card table-card">
      <div className="card__header">
        <div>
          <h3>Replenishment threshold review</h3>
          <p>Calculated quantity gap to the saved threshold; not an order recommendation</p>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Available</th>
              <th>Reorder point</th>
              <th>Gap to threshold</th>
              <th>Supplier</th>
              <th>Location</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.product}>
                <td>{row.product}</td>
                <td>{row.currentStock} {row.unit}</td>
                <td>{row.reorderPoint} {row.unit}</td>
                <td>{row.shortfall} {row.unit}</td>
                <td>{row.supplier}</td>
                <td>{row.location}</td>
                <td><span className="chip chip-warning">Manual review</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReorderRecommendationTable
