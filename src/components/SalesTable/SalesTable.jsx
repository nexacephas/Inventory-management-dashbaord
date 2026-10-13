import { ArrowUpRight } from 'lucide-react'
import { formatSalesCurrency, getSalesOrderTotal } from '../../data/salesDemo.js'
import './SalesTable.css'

const orderStatusKeys = { Completed: 'completed', Processing: 'processing', 'Awaiting payment': 'awaiting', Draft: 'draft', Cancelled: 'cancelled' }
const paymentStatusKeys = { Paid: 'paid', 'Partially paid': 'partial', Unpaid: 'unpaid', 'Not billed': 'unbilled' }

function SalesTable({ orders, onSelect }) {
  if (!orders.length) return <div className="sales-empty"><strong>No sales match those filters.</strong><span>Try a different search or reset the current filters.</span></div>

  return (
    <div className="sales-table-scroll">
      <table className="sales-table">
        <thead><tr><th scope="col">Sale</th><th scope="col">Customer</th><th scope="col">Items</th><th scope="col">Date</th><th scope="col">Sale value</th><th scope="col">Payment</th><th scope="col">Order status</th><th scope="col">Details</th></tr></thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.number}>
              <td data-label="Sale"><strong className="sales-table__number">{order.number}</strong><small>{order.recordedBy}</small></td>
              <td data-label="Customer">{order.customer}</td>
              <td data-label="Items"><strong>{order.items.length}</strong> <span>{order.items.length === 1 ? 'line item' : 'line items'}</span></td>
              <td data-label="Date">{new Date(`${order.soldAt}T00:00:00`).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}</td>
              <td data-label="Sale value">{formatSalesCurrency(getSalesOrderTotal(order))}</td>
              <td data-label="Payment"><span className={`sales-status sales-status--${paymentStatusKeys[order.paymentStatus]}`}>{order.paymentStatus}</span></td>
              <td data-label="Order status"><span className={`sales-status sales-status--${orderStatusKeys[order.status]}`}>{order.status}</span></td>
              <td data-label="Details"><button type="button" className="sales-table__view" onClick={() => onSelect(order)} aria-label={`View sale ${order.number}`}><ArrowUpRight size={16} /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SalesTable