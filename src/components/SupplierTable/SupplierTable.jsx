import { ArrowUpRight } from 'lucide-react'
import { getSupplierActivity } from '../../data/supplierDemo.js'
import './SupplierTable.css'

function SupplierTable({ suppliers, onSelect }) {
  if (!suppliers.length) return <div className="supplier-empty"><strong>No suppliers match those filters.</strong><span>Try another search or reset your filters.</span></div>

  return (
    <div className="supplier-table-scroll">
      <table className="supplier-table">
        <thead><tr><th scope="col">Supplier</th><th scope="col">Materials supplied</th><th scope="col">Products</th><th scope="col">Sample orders</th><th scope="col">Open orders</th><th scope="col">Last order</th><th scope="col">Activity</th><th scope="col">Details</th></tr></thead>
        <tbody>
          {suppliers.map((supplier) => {
            const activity = getSupplierActivity(supplier)
            return (
              <tr key={supplier.name}>
                <td data-label="Supplier"><strong className="supplier-table__name">{supplier.name}</strong><small>{supplier.products.length} linked catalog {supplier.products.length === 1 ? 'item' : 'items'}</small></td>
                <td data-label="Materials supplied" className="supplier-table__categories">{supplier.categories.join(', ')}</td>
                <td data-label="Products">{supplier.products.length}</td>
                <td data-label="Sample orders">{supplier.purchaseOrders.length}</td>
                <td data-label="Open orders">{supplier.openOrderCount}</td>
                <td data-label="Last order">{supplier.lastOrderAt ? new Date(`${supplier.lastOrderAt}T00:00:00`).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' }) : 'No sample order'}</td>
                <td data-label="Activity"><span className={`supplier-activity supplier-activity--${activity.key}`}>{activity.label}</span></td>
                <td data-label="Details"><button type="button" className="supplier-table__view" onClick={() => onSelect(supplier)} aria-label={`View ${supplier.name} details`}><ArrowUpRight size={16} /></button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default SupplierTable