import { ArrowUpRight } from 'lucide-react'
import { formatInventoryCurrency, getInventoryStatus } from '../../data/inventoryDemo.js'
import './InventoryTable.css'

function InventoryTable({ items, onSelect }) {
  if (!items.length) {
    return (
      <div className="inventory-empty">
        <strong>No inventory items match those filters.</strong>
        <span>Try another search or reset the current filters.</span>
      </div>
    )
  }

  return (
    <div className="inventory-table-scroll">
      <table className="inventory-table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Category</th>
            <th scope="col">On hand</th>
            <th scope="col">Reorder at</th>
            <th scope="col">Est. value</th>
            <th scope="col">Location</th>
            <th scope="col">Status</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const status = getInventoryStatus(item)
            return (
              <tr key={item.sku}>
                <td data-label="Product">
                  <strong className="inventory-table__product">{item.name}</strong>
                  <small className="inventory-table__sku">{item.sku}</small>
                </td>
                <td data-label="Category">{item.category}</td>
                <td data-label="On hand"><strong>{item.onHand.toLocaleString()}</strong> <span>{item.unit}</span></td>
                <td data-label="Reorder at">{item.reorderPoint.toLocaleString()} {item.unit}</td>
                <td data-label="Estimated value">{formatInventoryCurrency(item.onHand * item.unitCost)}</td>
                <td data-label="Location">{item.location}</td>
                <td data-label="Status"><span className={`inventory-status inventory-status--${status.key}`}>{status.label}</span></td>
                <td data-label="Details"><button type="button" className="inventory-table__view" onClick={() => onSelect(item)} aria-label={`View ${item.name} details`}><ArrowUpRight size={16} /></button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default InventoryTable