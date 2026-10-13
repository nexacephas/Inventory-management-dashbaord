import { CircleDollarSign, ClipboardList, ContactRound, WalletCards } from 'lucide-react'
import { formatCustomerCurrency } from '../../data/customerDemo.js'
import './CustomerSummary.css'

function CustomerSummary({ customers }) {
  const orderCount = customers.reduce((total, customer) => total + customer.orders.length, 0)
  const collections = customers.reduce((total, customer) => total + customer.collectedValue, 0)
  const outstanding = customers.reduce((total, customer) => total + customer.outstandingBalance, 0)
  const metrics = [
    { label: 'Customers in view', value: customers.length, note: 'From sample sales records', icon: ContactRound, tone: 'green' },
    { label: 'Sales orders', value: orderCount, note: 'Including draft and cancelled', icon: ClipboardList, tone: 'blue' },
    { label: 'Recorded collections', value: formatCustomerCurrency(collections), note: 'Illustrative payments only', icon: WalletCards, tone: 'neutral' },
    { label: 'Outstanding balance', value: formatCustomerCurrency(outstanding), note: 'Sample balances for review', icon: CircleDollarSign, tone: 'amber' },
  ]

  return (
    <section className="customer-summary" aria-label="Customer summary">
      {metrics.map(({ label, value, note, icon: Icon, tone }) => (
        <article className="customer-summary__card" key={label}>
          <span className={`customer-summary__icon customer-summary__icon--${tone}`}><Icon size={18} /></span>
          <div className="customer-summary__copy"><span>{label}</span><strong>{typeof value === 'number' ? value.toLocaleString() : value}</strong><small>{note}</small></div>
        </article>
      ))}
    </section>
  )
}

export default CustomerSummary