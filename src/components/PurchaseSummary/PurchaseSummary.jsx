import { CircleDollarSign, ClipboardList, Clock3, Truck } from 'lucide-react'
import { formatPurchaseCurrency, getPurchaseTotal } from '../../data/purchaseDemo.js'
import './PurchaseSummary.css'

function PurchaseSummary({ orders }) {
  const awaitingApproval = orders.filter((order) => order.status === 'Awaiting approval').length
  const inTransit = orders.filter((order) => order.status === 'In transit').length
  const openValue = orders.filter((order) => order.status !== 'Received').reduce((total, order) => total + getPurchaseTotal(order), 0)
  const metrics = [
    { label: 'Orders in view', value: orders.length, note: 'Sample purchase orders', icon: ClipboardList, tone: 'green' },
    { label: 'Awaiting approval', value: awaitingApproval, note: 'Manual review required', icon: Clock3, tone: 'amber' },
    { label: 'In transit', value: inTransit, note: 'Sample deliveries underway', icon: Truck, tone: 'blue' },
    { label: 'Open order value', value: formatPurchaseCurrency(openValue), note: 'Excludes received orders', icon: CircleDollarSign, tone: 'neutral' },
  ]

  return (
    <section className="purchase-summary" aria-label="Purchase order summary">
      {metrics.map(({ label, value, note, icon: Icon, tone }) => (
        <article className="purchase-summary__card" key={label}>
          <span className={`purchase-summary__icon purchase-summary__icon--${tone}`}><Icon size={18} /></span>
          <div className="purchase-summary__copy"><span>{label}</span><strong>{typeof value === 'number' ? value.toLocaleString() : value}</strong><small>{note}</small></div>
        </article>
      ))}
    </section>
  )
}

export default PurchaseSummary