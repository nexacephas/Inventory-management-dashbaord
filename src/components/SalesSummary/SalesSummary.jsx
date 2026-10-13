import { CircleDollarSign, ClipboardList, CreditCard, WalletCards } from 'lucide-react'
import { formatSalesCurrency, getSalesOrderTotal, getSalesOutstanding } from '../../data/salesDemo.js'
import './SalesSummary.css'

function SalesSummary({ orders }) {
  const billableOrders = orders.filter((order) => order.status !== 'Draft' && order.status !== 'Cancelled')
  const salesValue = billableOrders.reduce((total, order) => total + getSalesOrderTotal(order), 0)
  const collected = billableOrders.reduce((total, order) => total + order.amountPaid, 0)
  const outstanding = billableOrders.reduce((total, order) => total + getSalesOutstanding(order), 0)
  const metrics = [
    { label: 'Sales in view', value: orders.length, note: 'Sample sales records', icon: ClipboardList, tone: 'green' },
    { label: 'Recorded sales value', value: formatSalesCurrency(salesValue), note: 'Excludes drafts and cancelled', icon: CircleDollarSign, tone: 'blue' },
    { label: 'Recorded collections', value: formatSalesCurrency(collected), note: 'Illustrative payments only', icon: WalletCards, tone: 'neutral' },
    { label: 'Outstanding balance', value: formatSalesCurrency(outstanding), note: 'Sample balance for follow-up', icon: CreditCard, tone: 'amber' },
  ]

  return (
    <section className="sales-summary" aria-label="Sales summary">
      {metrics.map(({ label, value, note, icon: Icon, tone }) => (
        <article className="sales-summary__card" key={label}>
          <span className={`sales-summary__icon sales-summary__icon--${tone}`}><Icon size={18} /></span>
          <div className="sales-summary__copy"><span>{label}</span><strong>{typeof value === 'number' ? value.toLocaleString() : value}</strong><small>{note}</small></div>
        </article>
      ))}
    </section>
  )
}

export default SalesSummary