import { useEffect } from 'react'
import { CalendarClock, MapPin, UserRound, X } from 'lucide-react'
import { formatPurchaseCurrency, getPurchaseTotal } from '../../data/purchaseDemo.js'
import './PurchaseDetails.css'

const statusKeys = { 'Awaiting approval': 'pending', 'In transit': 'transit', Received: 'received', Draft: 'draft' }

function PurchaseDetails({ order, onClose }) {
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

  return (
    <div className="purchase-detail-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <aside className="purchase-detail" role="dialog" aria-modal="true" aria-labelledby="purchase-detail-title">
        <header className="purchase-detail__header">
          <div><p className="eyebrow">Purchase order</p><h2 id="purchase-detail-title">{order.number}</h2></div>
          <button type="button" className="icon-button" aria-label="Close purchase details" onClick={onClose}><X size={17} /></button>
        </header>
        <span className={`purchase-status purchase-status--${statusKeys[order.status]}`}>{order.status}</span>
        <div className="purchase-detail__supplier"><strong>{order.supplier}</strong><span>{order.items.length} {order.items.length === 1 ? 'line item' : 'line items'}</span></div>
        <div className="purchase-detail__items">
          {order.items.map((item) => (
            <article className="purchase-detail__item" key={item.sku}>
              <div><strong>{item.name}</strong><small>{item.sku}</small></div>
              <div className="purchase-detail__item-cost"><strong>{item.quantity.toLocaleString()} {item.unit}</strong><small>{formatPurchaseCurrency(item.quantity * item.unitCost)}</small></div>
            </article>
          ))}
        </div>
        <div className="purchase-detail__total"><span>Demo order total</span><strong>{formatPurchaseCurrency(getPurchaseTotal(order))}</strong></div>
        <dl className="purchase-detail__list">
          <div><dt><CalendarClock size={15} /> Order date</dt><dd>{new Date(`${order.orderedAt}T00:00:00`).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</dd></div>
          <div><dt><CalendarClock size={15} /> Expected delivery</dt><dd>{new Date(`${order.expectedAt}T00:00:00`).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</dd></div>
          <div><dt><MapPin size={15} /> Delivery location</dt><dd>{order.destination}</dd></div>
          <div><dt><UserRound size={15} /> Requested by</dt><dd>{order.requestedBy}</dd></div>
        </dl>
        <div className="purchase-detail__notice">Read-only demo purchase order. Approval, supplier dispatch, and receiving actions require a connected purchasing service.</div>
      </aside>
    </div>
  )
}

export default PurchaseDetails