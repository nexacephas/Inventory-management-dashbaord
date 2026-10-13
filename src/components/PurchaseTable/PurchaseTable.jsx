import { ArrowUpRight } from 'lucide-react'
import { formatPurchaseCurrency, getPurchaseTotal } from '../../data/purchaseDemo.js'
import './PurchaseTable.css'

const statusKeys = {
  'Awaiting approval': 'pending',
  'In transit': 'transit',
  Received: 'received',
  Draft: 'draft',
}

function PurchaseTable({ orders, onSelect }) {
  if (!orders.length) {
    return <div className="purchase-empty"><strong>No purchase orders match those filters.</strong><span>Try a different search or reset the current filters.</span></div>
  }

  return (
    <div className="purchase-table-scroll">
      <table className="purchase-table">
        <thead><tr>
          <th scope="col">Purchase order</th><th scope="col">Supplier</th><th scope="col">Items</th><th scope="col">Ordered</th><th scope="col">Expected</th><th scope="col">Order value</th><th scope="col">Status</th><th scope="col">Details</th>
        </tr></thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.number}>
              <td data-label="Purchase order"><strong className="purchase-table__number">{order.number}</strong><small>{order.requestedBy}</small></td>
              <td data-label="Supplier">{order.supplier}</td>
              <td data-label="Items"><strong>{order.items.length}</strong> <span>{order.items.length === 1 ? 'line item' : 'line items'}</span></td>
              <td data-label="Ordered">{new Date(`${order.orderedAt}T00:00:00`).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}</td>
              <td data-label="Expected">{new Date(`${order.expectedAt}T00:00:00`).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}</td>
              <td data-label="Order value">{formatPurchaseCurrency(getPurchaseTotal(order))}</td>
              <td data-label="Status"><span className={`purchase-status purchase-status--${statusKeys[order.status]}`}>{order.status}</span></td>
              <td data-label="Details"><button type="button" className="purchase-table__view" onClick={() => onSelect(order)} aria-label={`View purchase order ${order.number}`}><ArrowUpRight size={16} /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PurchaseTable