import { useEffect } from 'react'
import { CalendarDays, Package, X } from 'lucide-react'
import { formatCustomerCurrency, getCustomerActivity } from '../../data/customerDemo.js'
import { formatSalesCurrency, getSalesOrderTotal, getSalesOutstanding } from '../../data/salesDemo.js'
import './CustomerDetails.css'

const paymentKeys = { Paid: 'paid', 'Partially paid': 'partial', Unpaid: 'unpaid', 'Not billed': 'unbilled' }

function CustomerDetails({ customer, onClose }) {
  useEffect(() => {
    if (!customer) return undefined
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
  }, [customer, onClose])

  if (!customer) return null
  const activity = getCustomerActivity(customer)

  return (
    <div className="customer-detail-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <aside className="customer-detail" role="dialog" aria-modal="true" aria-labelledby="customer-detail-title">
        <header className="customer-detail__header"><div><p className="eyebrow">Customer account</p><h2 id="customer-detail-title">{customer.name}</h2></div><button type="button" className="icon-button" aria-label="Close customer details" onClick={onClose}><X size={17} /></button></header>
        <span className={`customer-activity customer-activity--${activity.key}`}>{activity.label}</span>
        <div className="customer-detail__metrics"><div><strong>{customer.orders.length}</strong><span>Sample orders</span></div><div><strong>{formatCustomerCurrency(customer.billedValue)}</strong><span>Billed value</span></div><div><strong>{formatCustomerCurrency(customer.outstandingBalance)}</strong><span>Balance due</span></div></div>
        <section className="customer-detail__section"><div className="customer-detail__section-title"><Package size={16} /><h3>Material categories</h3></div><div className="customer-detail__categories">{customer.categories.map((category) => <span key={category}>{category}</span>)}</div></section>
        <section className="customer-detail__section"><div className="customer-detail__section-title"><CalendarDays size={16} /><h3>Sales history</h3></div><div className="customer-detail__orders">{customer.orders.map((order) => <article key={order.number}><div className="customer-detail__order-heading"><span><strong>{order.number}</strong><small>{new Date(`${order.soldAt}T00:00:00`).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })} · {order.status}</small></span><span className={`customer-payment customer-payment--${paymentKeys[order.paymentStatus]}`}>{order.paymentStatus}</span></div><div className="customer-detail__order-items">{order.items.map((item) => <div key={item.sku}><span>{item.name}</span><strong>{item.quantity.toLocaleString()} {item.unit}</strong></div>)}</div><div className="customer-detail__order-total"><span>Total {formatSalesCurrency(getSalesOrderTotal(order))}</span><span>Due {formatSalesCurrency(getSalesOutstanding(order))}</span></div></article>)}</div></section>
        <div className="customer-detail__notice">Read-only customer sample derived from demo sales. Contact details and live account service are not configured.</div>
      </aside>
    </div>
  )
}

export default CustomerDetails