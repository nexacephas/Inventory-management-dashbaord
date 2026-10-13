import { useEffect } from 'react'
import { CalendarDays, UserRound, X } from 'lucide-react'
import { formatSalesCurrency, getSalesOrderTotal, getSalesOutstanding } from '../../data/salesDemo.js'
import './SalesDetails.css'

const orderStatusKeys = { Completed: 'completed', Processing: 'processing', 'Awaiting payment': 'awaiting', Draft: 'draft', Cancelled: 'cancelled' }
const paymentStatusKeys = { Paid: 'paid', 'Partially paid': 'partial', Unpaid: 'unpaid', 'Not billed': 'unbilled' }

function SalesDetails({ order, onClose }) {
  useEffect(() => {
    if (!order) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function closeOnEscape(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [order, onClose])

  if (!order) return null
  const total = getSalesOrderTotal(order)
  const outstanding = getSalesOutstanding(order)

  return (
    <div className="sales-detail-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <aside className="sales-detail" role="dialog" aria-modal="true" aria-labelledby="sales-detail-title">
        <header className="sales-detail__header">
          <div><p className="eyebrow">Sales record</p><h2 id="sales-detail-title">{order.number}</h2></div>
          <button type="button" className="icon-button" aria-label="Close sale details" onClick={onClose}><X size={17} /></button>
        </header>
        <div className="sales-detail__badges"><span className={`sales-status sales-status--${orderStatusKeys[order.status]}`}>{order.status}</span><span className={`sales-status sales-status--${paymentStatusKeys[order.paymentStatus]}`}>{order.paymentStatus}</span></div>
        <div className="sales-detail__customer"><strong>{order.customer}</strong><span>Recorded by {order.recordedBy}</span></div>
        <div className="sales-detail__items">
          {order.items.map((item) => (
            <article className="sales-detail__item" key={item.sku}>
              <div><strong>{item.name}</strong><small>{item.sku}</small></div>
              <div className="sales-detail__item-cost"><strong>{item.quantity.toLocaleString()} {item.unit}</strong><small>{formatSalesCurrency(item.quantity * item.unitPrice)}</small></div>
            </article>
          ))}
        </div>
        <div className="sales-detail__totals">
          <div><span>Sale total</span><strong>{formatSalesCurrency(total)}</strong></div>
          <div><span>Recorded collection</span><strong>{formatSalesCurrency(order.amountPaid)}</strong></div>
          <div><span>Outstanding demo balance</span><strong>{formatSalesCurrency(outstanding)}</strong></div>
        </div>
        <dl className="sales-detail__list"><div><dt><CalendarDays size={15} /> Sale date</dt><dd>{new Date(`${order.soldAt}T00:00:00`).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</dd></div><div><dt><UserRound size={15} /> Recorded by</dt><dd>{order.recordedBy}</dd></div></dl>
        <div className="sales-detail__notice">Read-only demo transaction. Invoicing, payment collection, and inventory deductions require connected services.</div>
      </aside>
    </div>
  )
}

export default SalesDetails