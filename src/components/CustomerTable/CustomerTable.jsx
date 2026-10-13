import { ArrowUpRight } from 'lucide-react'
import { formatCustomerCurrency, getCustomerActivity } from '../../data/customerDemo.js'
import './CustomerTable.css'

function CustomerTable({ customers, onSelect }) {
  if (!customers.length) return <div className="customer-empty"><strong>No customers match those filters.</strong><span>Try another search or reset the current filters.</span></div>

  return (
    <div className="customer-table-scroll">
      <table className="customer-table">
        <thead><tr><th scope="col">Customer</th><th scope="col">Materials purchased</th><th scope="col">Orders</th><th scope="col">Billed value</th><th scope="col">Collected</th><th scope="col">Balance due</th><th scope="col">Last order</th><th scope="col">Account activity</th><th scope="col">Details</th></tr></thead>
        <tbody>
          {customers.map((customer) => {
            const activity = getCustomerActivity(customer)
            return (
              <tr key={customer.name}>
                <td data-label="Customer"><strong className="customer-table__name">{customer.name}</strong><small>{customer.products.length} linked catalog products</small></td>
                <td data-label="Materials purchased" className="customer-table__categories">{customer.categories.join(', ')}</td>
                <td data-label="Orders">{customer.orders.length}</td>
                <td data-label="Billed value">{formatCustomerCurrency(customer.billedValue)}</td>
                <td data-label="Collected">{formatCustomerCurrency(customer.collectedValue)}</td>
                <td data-label="Balance due">{formatCustomerCurrency(customer.outstandingBalance)}</td>
                <td data-label="Last order">{customer.lastOrderAt ? new Date(`${customer.lastOrderAt}T00:00:00`).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' }) : 'No sample order'}</td>
                <td data-label="Account activity"><span className={`customer-activity customer-activity--${activity.key}`}>{activity.label}</span></td>
                <td data-label="Details"><button type="button" className="customer-table__view" onClick={() => onSelect(customer)} aria-label={`View ${customer.name} details`}><ArrowUpRight size={16} /></button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CustomerTable